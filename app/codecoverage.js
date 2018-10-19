const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(100000000);
  await page.goto("https://abstract-gong360.develgs.com/v1/ui/reports/", {
    waitUntil: "networkidle0"
  });

  await Promise.all([
    page.coverage.startJSCoverage({
      resetOnNavigation: true
    }),
    page.coverage.startCSSCoverage({
      resetOnNavigation: true
    })
  ]);

  await page.type("[name='username']", "sthounaojam@gainsight.com");
  await page.type("[name='password']", "gainsight01*");

  await Promise.all([
    page.click(".auth0-lock-submit"),
    page.waitForNavigation({ waitUntil: "networkidle2" })
  ]);

  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ]);

  let totalBytes = 0;
  let usedBytes = 0;

  const coverage = [...jsCoverage, ...cssCoverage];

  for (const entry of coverage) {
    totalBytes += entry.text.length;
    for (const range of entry.ranges) usedBytes += range.end - range.start + 1;
  }

  console.log(`Bytes used ${(usedBytes / totalBytes) * 100}%`);
  // browser.close();
})();
