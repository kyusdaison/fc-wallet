const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => {
     console.error('PAGE ERROR STR:', error.message);
     process.exit(1);
  });
  await page.goto('http://localhost:5173');
  // wait a bit
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
  console.log('No page errors detected');
})();
