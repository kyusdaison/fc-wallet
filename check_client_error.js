import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Expose a binding to push errors to Node
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') {
       console.log('CONSOLE ERROR:', msg.text());
    }
  });

  await page.goto('http://localhost:5173');
  
  // click Services tab
  await page.evaluate(() => {
    const navs = document.querySelectorAll('.nav-item');
    for (let nav of navs) {
       if (nav.textContent.includes('Services')) {
          nav.click();
       }
    }
  });
  
  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
  console.log('Done');
})();
