import { firefox } from "playwright"

const URLS = {
  barbacue: "https://www.prozis.com/es/es/prozis/zero-barbecue-355-g",
  chocobutter400:
    "https://www.prozis.com/es/es/prozis/whey-choco-butter-400-g-nutchoc",
  chocobutter200:
    "https://www.prozis.com/es/es/prozis/whey-choco-butter-200-g-nutchoc",
}

async function getStatus(url, page) {
  try {
    await page.goto(url)

    await page.waitForSelector(".stock-info")
    const state = await page.$eval(".stock-info", (el) => el.textContent)

    return state
  } catch (err) {
    console.error("Errror: " + err)
    await getStatus(url, page)
  }
}

console.log("Initializing the script!!! 🚀🚀🚀")

const browser = await firefox.launch({ headless: true, slowMo: 200 })
const page = await browser.newPage()

for (const url in URLS) {
  const state = await getStatus(URLS[url], page)
  console.log(`State ${url}: ${state}`)
}

await browser.close()
