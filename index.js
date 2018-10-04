const puppeteer = require("puppeteer");
const chromeLauncher = require("chrome-launcher");

// (async () => {
//   const browser = await puppeteer.launch();
//   console.log(await browser.version());
//   const page = await browser.newPage();
//   await page.goto("https://www.google.com", {
//     waitUntil: "networkidle2"
//   });
//   await page.pdf({ path: "page.pdf", format: "A4" });
//   await browser.close();
// })();

/**
 * Launches a debugging instance of Chrome.
 * @param {boolean=} headless True (default) launches Chrome in headless mode.
 *     False launches a full version of Chrome.
 * @return {Promise<ChromeLauncher>}
 */
function launchChrome(headless = true) {
  return chromeLauncher.launch({
    // port: 9222, // Uncomment to force a specific port of your choice.
    chromeFlags: [
      "--window-size=412,732",
      "--disable-gpu",
      headless ? "--headless" : ""
    ]
  });
}

launchChrome().then(chrome => {
  console.log(`Chrome debuggable on port: ${chrome.port}`);
  // chrome.kill();
});
