import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ 
  headless: 'shell',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();
const logs = [];
const errors = [];
page.on('console', msg => logs.push({type: msg.type(), text: msg.text()}));
page.on('pageerror', err => errors.push(err.message));
try {
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 10000 });
  await page.screenshot({ path: '/tmp/test-puppeteer-screenshot.png', fullPage: true });
  console.log('SCREENSHOT_SAVED: /tmp/test-puppeteer-screenshot.png');
  const accessibility = await page.accessibility.snapshot();
  console.log('ACCESSIBILITY:', JSON.stringify(accessibility, null, 2));
} catch(e) {
  console.log('Navigation error:', e.message);
}
console.log('CONSOLE_LOGS:', JSON.stringify(logs, null, 2));
console.log('PAGE_ERRORS:', JSON.stringify(errors, null, 2));
await browser.close();
