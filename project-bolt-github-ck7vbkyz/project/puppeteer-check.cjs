const puppeteer = require('puppeteer');

async function main() {
  const logs = [];
  const errors = [];
  const warnings = [];

  const browser = await puppeteer.launch({
    headless: 'shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 900 });

  // Capture all console messages
  page.on('console', msg => {
    const entry = { type: msg.type(), text: msg.text() };
    logs.push(entry);
  });

  // Capture JS page errors
  page.on('pageerror', err => {
    errors.push({ type: 'pageerror', text: err.message });
  });

  // Capture request failures
  page.on('requestfailed', req => {
    errors.push({ type: 'requestfailed', text: req.url() + ' - ' + req.failure().errorText });
  });

  // Navigate
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 15000 });

  // Wait a bit for any async activity
  await new Promise(r => setTimeout(r, 3000));

  // Screenshot
  await page.screenshot({ path: '/tmp/screenshot.png', fullPage: true });

  // Accessibility tree
  const a11y = await page.accessibility.snapshot();

  // Page info
  const title = await page.title();
  const url = page.url();

  // Count errors vs warnings
  const errorCount = logs.filter(l => l.type === 'error').length;
  const warningCount = logs.filter(l => l.type === 'warning').length;
  const logCount = logs.filter(l => l.type === 'log').length;
  const infoCount = logs.filter(l => l.type === 'info').length;
  const debugCount = logs.filter(l => l.type === 'debug').length;

  await browser.close();

  // Output JSON results
  console.log(JSON.stringify({
    url,
    title,
    counts: {
      totalLogs: logs.length,
      errors: errorCount + errors.length,
      warnings: warningCount,
      logs: logCount,
      info: infoCount,
      debug: debugCount
    },
    allLogs: logs,
    pageErrors: errors,
    accessibility: a11y
  }, null, 2));
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }));
  process.exit(1);
});
