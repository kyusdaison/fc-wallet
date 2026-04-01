# FC Wallet 设计审核报告
**日期**: 2026-03-31
**审核范围**: Citizen Mode + Organization Mode 全部页面

---

## 一、整体评价

当前钱包已建立了一套较为完整的 glass morphism 深色主题设计系统，Citizen Home 页面作为设计标杆，在视觉层次、信息密度和交互反馈上都达到了较高水准。经过本轮 CSS 统一化后，各页面的视觉一致性已大幅提升。

以下是基于代码审核发现的 **优化建议**，按优先级排列。

---

## 二、结构性问题（高优先级）

### 1. CSS 冗余与重复定义
**问题**: `index.css` 已超过 13,700 行，存在多处重复样式定义。例如 `.bottom-nav` 在第 305 行和第 1395 行各定义了一次，`.nav-item` 在第 310、605、1409 行有三处定义。这不仅增大文件体积，也容易造成样式冲突和维护困难。

**建议**:
- 清理所有重复的选择器，保留最新的版本
- 将通用 glass morphism 属性提取为可复用的 CSS 变量或 utility class，例如:
  ```css
  :root {
    --glass-bg: rgba(20,24,34,0.4);
    --glass-blur: blur(20px);
    --glass-border: 1px solid rgba(255,255,255,0.08);
    --glass-shadow: 0 6px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
    --glass-radius: 16px;
  }
  ```
- 考虑按模块拆分 CSS（每个 module 一个 `.css` 文件），用 Vite 的 CSS modules 或简单 import 管理

### 2. App.jsx 状态管理过度集中
**问题**: `App.jsx` 从 zustand store 中逐行解构了 30+ 个状态变量，承担了过多的"状态中转站"角色。虽然 zustand 已在使用，但大量 `const x = useAppStore(s => s.x)` 使得文件冗长且每次 store 变化都可能触发不必要的重渲染。

**建议**:
- 使用 zustand 的 `useShallow` 或选择器分组，减少解构行数
- 将 overlay/sheet 管理抽成独立的 `<OverlayManager />` 组件
- Header 和 BottomNav 可抽为独立组件，各自订阅需要的 store 切片

### 3. 缺少 Loading / Empty / Error 状态
**问题**: 所有页面都假设数据一定存在（直接从 mockData 读取），没有空状态、加载态或错误态的 UI 处理。在向真实 API 迁移时会直接崩溃。

**建议**:
- 为每个列表组件设计空状态 UI（如"暂无数据"图示 + 描述文字）
- 添加骨架屏(skeleton)加载动画，与 glass morphism 风格匹配
- 在关键区域加入错误边界（ErrorBoundary）

---

## 三、视觉与交互优化（中优先级）

### 4. Header 设计可进一步提升
**问题**: Header 当前使用 `background: var(--surface-1)` 实色背景，与页面内容的 glass morphism 卡片风格不一致。作为用户最先看到的区域，缺少品牌辨识度和高级感。

**建议**:
- Header 背景改为 glass morphism 风格：`background: rgba(10,11,15,0.85); backdrop-filter: blur(20px)`
- `hdr-rule` 底部分割线可用更细腻的渐变：增加 gold 光晕宽度
- 考虑在滚动时给 Header 添加 `box-shadow` 变化（scroll elevation）

### 5. Bottom Nav 缺少模式区分
**问题**: 无论 Citizen 还是 Organization 模式，底部导航栏的外观完全一致。用户切换模式后缺少视觉反馈来强化"当前模式"的感知。

**建议**:
- Organization 模式下，active nav-item 使用 gold 色调（而非白色）
- 可在 bottom-nav 顶部加一条 2px 的模式指示条（Citizen = blue, Org = gold）
- active 状态添加微妙的图标发光效果

### 6. 页面间过渡动效不统一
**问题**: 各模块的 framer-motion 过渡参数不一致：
- HomeModule: `y: 15` 垂直滑入
- ServicesModule: `x: 20` 水平滑入
- OrgIdentityModule: `x: 20, duration: 0.3`
- OrgServicesModule: `x: 20, duration: 0.4`

**建议**:
- 统一为一套过渡标准，例如 tab 切换用 `x` 方向，overlay 弹出用 `y` 方向
- 定义共享过渡常量：
  ```js
  const TAB_TRANSITION = { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -16 }, transition: { duration: 0.3, ease: 'easeOut' } };
  ```

### 7. 信息层级与留白
**问题**: 部分页面（尤其 Org Services 和 Org Identity）信息密度较高，section 与 section 之间虽已统一为 14px gap，但在小屏上仍显拥挤。section 内部的 kicker label 与内容之间的间距也偏紧。

**建议**:
- Section kicker label 下方增加 2-4px 额外 margin
- 考虑在重要 section（如 Treasury Hero、Portfolio Hero）前后增加 4px 额外间距
- Org Services 的 Charter 信息可默认折叠，减少首屏信息量

---

## 四、体验细节优化（低优先级但能显著提升质感）

### 8. 触感反馈增强
**建议**:
- 所有可点击卡片统一添加 `:active { transform: scale(0.985) }` 按压反馈（部分已有，但不全面）
- 底部导航的 active 切换可加微弹性动效 `transition: { type: 'spring', stiffness: 400, damping: 30 }`
- Toggle 开关组件可加入颜色过渡动画

### 9. 字体层级可更清晰
**问题**: 部分地方的 font-weight 使用不够一致，有些标题用 700，有些用 800。

**建议**:
- 建立字体规范：页面标题 = 800, 卡片标题 = 700, 正文 = 500, kicker = 800
- 所有 kicker label 统一为 `10px / 800 / 0.12em letter-spacing / uppercase / gold color`
- 数字金额统一用 `font-family: var(--font-mono)` + `letter-spacing: -0.02em`

### 10. 可访问性（Accessibility）
**问题**: 多处使用 `<div onClick>` 而非 `<button>`，缺少键盘导航和 ARIA 标签。

**建议**:
- 所有可交互元素改用 `<button>` 或添加 `role="button" tabIndex={0}`
- 为图标按钮添加 `aria-label`
- 确保颜色对比度满足 WCAG AA 标准（当前 `var(--text-tertiary)` 在深色背景上可能偏暗）

### 11. Org Identity Hero 布局问题
**问题**: `oi-charter-nft` 按钮放在 hero 内部的 flex 布局中，在窄屏可能与 entity name 产生挤压。

**建议**:
- 将 Charter NFT badge 移到 hero 下方独立行显示
- 或改为绝对定位在 hero 右上角

---

## 五、架构建议（面向未来）

### 12. 组件库抽象
当前每个 module 都内联定义微组件（如 Toggle、Divider、SectionTitle），建议：
- 创建 `src/components/ui/` 目录，统一管理可复用组件
- 抽取：GlassCard, SectionTitle, StatusBadge, Toggle, Avatar, SearchBar, FilterPills
- 这样新页面可以快速组装，保持一致性

### 13. 主题系统
当前 glass morphism 的颜色值散落在各处，建议：
- 在 `:root` 中定义完整的设计 token 体系
- 为未来的 light mode 或主题切换做好准备
- 关键 token：`--glass-*`, `--radius-*`, `--shadow-*`, `--space-*`

### 14. 性能优化
- `index.css` 超大单文件影响首次渲染，建议拆分 + tree-shaking
- 部分 `backdrop-filter: blur()` 在低端设备上有性能开销，可加 `@media (prefers-reduced-motion)` 降级
- framer-motion 的 AnimatePresence 包裹了大量 overlay，未显示时也占用内存，可用 lazy mount

---

## 六、优先执行清单

| 优先级 | 项目 | 预估工作量 |
|--------|------|-----------|
| P0 | 清理 CSS 重复定义，提取 glass 变量 | 2-3 小时 |
| P0 | 抽取 OverlayManager，简化 App.jsx | 1-2 小时 |
| P1 | Header glass morphism 升级 | 30 分钟 |
| P1 | Bottom Nav 模式区分 | 30 分钟 |
| P1 | 统一 framer-motion 过渡参数 | 30 分钟 |
| P2 | 共享 UI 组件库抽取 | 3-4 小时 |
| P2 | 空状态/骨架屏设计 | 2 小时 |
| P2 | 主题 token 体系 | 1-2 小时 |
| P3 | 可访问性提升 | 2 小时 |
| P3 | 性能优化（CSS拆分 + 动画降级） | 2 小时 |

---

*本报告基于源码审核生成，建议配合实机测试进行验证。*
