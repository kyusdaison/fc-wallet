#!/usr/bin/env node
/**
 * FC Wallet 链接检查工具
 * 扫描项目中所有文件，提取 URL 并检查其可访问性
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

// 文件扩展名到检查类型的映射
const FILE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.md', '.json', '.cjs'];

// 排除的目录
const EXCLUDE_DIRS = ['node_modules', 'dist', '.git', '.wrangler', 'tmp'];

// URL 正则表达式模式
const URL_PATTERNS = [
  // 完整的 HTTP/HTTPS URL
  /https?:\/\/[^\s"'<>()\]\}]+/gi,
  // Markdown 链接 [text](url)
  /\[.*?\]\((https?:\/\/[^\s"'<>()]+)\)/gi,
  // 单引号中的 URL
  /'https?:\/\/[^']+'/gi,
  // 双引号中的 URL
  /"https?:\/\/[^"]+"/gi,
];

// 结果存储
const results = {
  total: 0,
  unique: new Set(),
  byFile: {},
  checked: [],
};

/**
 * 递归遍历目录查找文件
 */
function findFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // 跳过排除的目录
      if (!EXCLUDE_DIRS.includes(item)) {
        findFiles(fullPath, files);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (FILE_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * 从文件内容中提取 URL
 */
function extractUrls(content, filePath) {
  const urls = new Set();
  const fileResults = [];
  
  // 使用所有模式匹配
  for (const pattern of URL_PATTERNS) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      let url = match[0];
      
      // 清理 URL (移除引号、括号等)
      url = url.replace(/^['"(]+|['")]+$/g, '');
      
      // 提取 markdown 链接中的 URL
      const markdownMatch = url.match(/\[.*?\]\((https?:\/\/[^\s"'<>()]+)\)/);
      if (markdownMatch) {
        url = markdownMatch[1];
      }
      
      // 过滤掉不完整的 URL
      if (url && url.startsWith('http') && !url.includes('${') && !url.includes('{{')) {
        try {
          // 验证 URL 格式
          new URL(url);
          urls.add(url);
          
          // 找到行号
          const lines = content.substring(0, match.index).split('\n');
          const lineNum = lines.length;
          
          fileResults.push({
            url,
            line: lineNum,
            context: lines[lines.length - 1].trim().substring(0, 80)
          });
        } catch (e) {
          // 无效的 URL，跳过
        }
      }
    }
  }
  
  return { urls: Array.from(urls), details: fileResults };
}

/**
 * 检查 URL 是否可访问
 */
function checkUrl(url) {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const client = parsed.protocol === 'https:' ? https : http;
    
    const timeout = setTimeout(() => {
      resolve({
        url,
        status: 'TIMEOUT',
        statusCode: null,
        error: 'Request timeout (10s)'
      });
    }, 10000);
    
    const req = client.request(url, { method: 'HEAD', timeout: 10000 }, (res) => {
      clearTimeout(timeout);
      
      // 处理重定向
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve({
          url,
          status: 'REDIRECT',
          statusCode: res.statusCode,
          redirectTo: res.headers.location,
          error: null
        });
        return;
      }
      
      resolve({
        url,
        status: res.statusCode >= 200 && res.statusCode < 400 ? 'OK' : 'ERROR',
        statusCode: res.statusCode,
        error: null
      });
    });
    
    req.on('error', (err) => {
      clearTimeout(timeout);
      resolve({
        url,
        status: 'ERROR',
        statusCode: null,
        error: err.message
      });
    });
    
    req.on('timeout', () => {
      clearTimeout(timeout);
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        statusCode: null,
        error: 'Request timeout'
      });
    });
    
    req.end();
  });
}

/**
 * 打印报告头部
 */
function printHeader() {
  console.log('\n' + colors.cyan + '='.repeat(80) + colors.reset);
  console.log(colors.cyan + '  FC Wallet 项目链接检查报告' + colors.reset);
  console.log(colors.cyan + '='.repeat(80) + colors.reset);
  console.log(`\n扫描时间: ${new Date().toLocaleString()}`);
  console.log(`项目路径: ${process.cwd()}`);
  console.log('');
}

/**
 * 主函数
 */
async function main() {
  printHeader();
  
  console.log(colors.blue + '📁 扫描文件中...' + colors.reset);
  
  // 查找所有文件
  const files = findFiles(process.cwd());
  console.log(`找到 ${files.length} 个文件需要检查\n`);
  
  // 提取所有 URL
  console.log(colors.blue + '🔗 提取链接中...' + colors.reset);
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const { urls, details } = extractUrls(content, file);
      
      if (urls.length > 0) {
        const relativePath = path.relative(process.cwd(), file);
        results.byFile[relativePath] = details;
        
        for (const url of urls) {
          results.unique.add(url);
        }
      }
    } catch (err) {
      console.error(`读取文件失败: ${file}`, err.message);
    }
  }
  
  results.total = results.unique.size;
  
  console.log(`发现 ${results.total} 个唯一链接\n`);
  
  // 检查每个 URL
  if (results.total > 0) {
    console.log(colors.blue + '🌐 检查链接可访问性...' + colors.reset);
    console.log(colors.gray + '(这可能需要一些时间...)\n' + colors.reset);
    
    const uniqueUrls = Array.from(results.unique);
    let checked = 0;
    
    // 并发检查 (每次 5 个)
    const CONCURRENCY = 5;
    for (let i = 0; i < uniqueUrls.length; i += CONCURRENCY) {
      const batch = uniqueUrls.slice(i, i + CONCURRENCY);
      const batchResults = await Promise.all(batch.map(url => checkUrl(url)));
      results.checked.push(...batchResults);
      
      checked += batch.length;
      process.stdout.write(`\r  进度: ${checked}/${uniqueUrls.length}`);
    }
    
    console.log('\n');
  }
  
  // 生成报告
  generateReport();
}

/**
 * 生成并打印报告
 */
function generateReport() {
  const okUrls = results.checked.filter(r => r.status === 'OK');
  const errorUrls = results.checked.filter(r => r.status === 'ERROR');
  const timeoutUrls = results.checked.filter(r => r.status === 'TIMEOUT');
  const redirectUrls = results.checked.filter(r => r.status === 'REDIRECT');
  
  console.log(colors.cyan + '='.repeat(80) + colors.reset);
  console.log(colors.cyan + '  检查结果摘要' + colors.reset);
  console.log(colors.cyan + '='.repeat(80) + colors.reset);
  console.log('');
  
  console.log(`  ${colors.green}✓ 正常: ${okUrls.length}${colors.reset}`);
  console.log(`  ${colors.yellow}↪ 重定向: ${redirectUrls.length}${colors.reset}`);
  console.log(`  ${colors.red}✗ 错误: ${errorUrls.length}${colors.reset}`);
  console.log(`  ${colors.gray}⏱ 超时: ${timeoutUrls.length}${colors.reset}`);
  console.log(`  ───────────────────`);
  console.log(`  总计: ${results.total}`);
  console.log('');
  
  // 按文件列出链接
  console.log(colors.cyan + '='.repeat(80) + colors.reset);
  console.log(colors.cyan + '  链接分布详情' + colors.reset);
  console.log(colors.cyan + '='.repeat(80) + colors.reset);
  console.log('');
  
  for (const [file, details] of Object.entries(results.byFile)) {
    console.log(`${colors.blue}📄 ${file}${colors.reset}`);
    
    for (const detail of details) {
      const checkResult = results.checked.find(r => r.url === detail.url);
      let statusIcon = '?';
      let statusColor = colors.gray;
      
      if (checkResult) {
        if (checkResult.status === 'OK') {
          statusIcon = '✓';
          statusColor = colors.green;
        } else if (checkResult.status === 'ERROR') {
          statusIcon = '✗';
          statusColor = colors.red;
        } else if (checkResult.status === 'TIMEOUT') {
          statusIcon = '⏱';
          statusColor = colors.gray;
        } else if (checkResult.status === 'REDIRECT') {
          statusIcon = '↪';
          statusColor = colors.yellow;
        }
      }
      
      // 截断长 URL
      const displayUrl = detail.url.length > 60 
        ? detail.url.substring(0, 57) + '...' 
        : detail.url;
      
      console.log(`   ${statusColor}${statusIcon}${colors.reset} 第 ${detail.line} 行: ${colors.cyan}${displayUrl}${colors.reset}`);
      
      if (checkResult && checkResult.error) {
        console.log(`      ${colors.red}└─ ${checkResult.error}${colors.reset}`);
      }
      if (checkResult && checkResult.status === 'REDIRECT') {
        console.log(`      ${colors.yellow}└─ 重定向到: ${checkResult.redirectTo}${colors.reset}`);
      }
    }
    console.log('');
  }
  
  // 问题链接汇总
  if (errorUrls.length > 0 || timeoutUrls.length > 0) {
    console.log(colors.cyan + '='.repeat(80) + colors.reset);
    console.log(colors.red + '  ⚠️ 问题链接汇总' + colors.reset);
    console.log(colors.cyan + '='.repeat(80) + colors.reset);
    console.log('');
    
    if (errorUrls.length > 0) {
      console.log(colors.red + '  错误链接:' + colors.reset);
      for (const item of errorUrls) {
        console.log(`    ✗ ${item.url}`);
        console.log(`      错误: ${item.error}`);
      }
      console.log('');
    }
    
    if (timeoutUrls.length > 0) {
      console.log(colors.gray + '  超时链接 (可能需要手动检查):' + colors.reset);
      for (const item of timeoutUrls) {
        console.log(`    ⏱ ${item.url}`);
      }
      console.log('');
    }
  }
  
  // 保存详细报告到文件
  const reportPath = path.join(process.cwd(), 'link_check_report.json');
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.total,
      ok: okUrls.length,
      redirect: redirectUrls.length,
      error: errorUrls.length,
      timeout: timeoutUrls.length
    },
    links: results.checked,
    byFile: results.byFile
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(colors.green + `📊 详细报告已保存到: ${reportPath}${colors.reset}\n`);
}

// 运行主函数
main().catch(console.error);
