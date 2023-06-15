import { firefox } from "playwright";

const URLS = {
	barbacue: "https://www.prozis.com/es/es/prozis/zero-barbecue-355-g",
	chocobutter400:
		"https://www.prozis.com/es/es/prozis/whey-choco-butter-400-g-nutchoc",
	chocobutter200:
		"https://www.prozis.com/es/es/prozis/whey-choco-butter-200-g-nutchoc",
};

async function getStatus(url) {
	const browser = await firefox.launch({ headless: true, slowMo: 200 });
	try {
		const page = await browser.newPage();

		await page.goto(url);

		const state = await page.$eval("#noticeSection", (el) => el.textContent);

		return state;
	} catch (err) {
		await getStatus(url);
		// return null;
	} finally {
		await browser.close();
	}
}

for (const url in URLS) {
	const state = await getStatus(URLS[url]);
	console.log(`State ${url}: ${state}`);
}
