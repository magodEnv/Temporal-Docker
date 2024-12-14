import dotenv from "dotenv";
import puppeteer from "puppeteer";
import { NextResponse } from "next/server.js";

dotenv.config();

const scrapePage = async (page, delay) => {
	const button = await page.$('[data-testid="caret"]');
	if (!button) {
		console.log("No buttons found.");
		return null;
	}

	const box = await button.boundingBox();
	if (!box) {
		console.log("Button is not visible or interactable.");
		return null;
	}

	console.log(`Button position: x=${box.x}, y=${box.y}`);

	await button.hover();
	await delay(500);
	await button.evaluate((btn) => btn.click());

	const containerSelector =
		"a.css-175oi2r.r-18u37iz.r-1mmae3n.r-3pj75a.r-13qz1uu.r-o7ynqc.r-6416eg.r-1ny4l3l.r-1loqt21";

	await page.waitForSelector(containerSelector, {
		timeout: 5000,
	});

	const anchorElements = await page.$$(containerSelector);
	if (anchorElements.length < 2) {
		console.log("Not enough anchors to select the second one.");
		return null;
	}

	const secondAnchor = anchorElements[1];
	const href = await page.evaluate((anchor) => anchor.href, secondAnchor);

	const idMatch = href.match(/status\/(\d+)/);
	if (idMatch && idMatch[1]) {
		const id = idMatch[1];
		console.log("Found ID:", id);
		return [id];
	} else {
		console.log("No ID found in href:", href);
		return null;
	}
};

export const GET = async () => {
	console.log(" --- Starting X scraping ---");
	const browser = await puppeteer.launch({
		headless: true,
        executablePath: '/usr/bin/google-chrome',
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});
	const page = await browser.newPage();

	const authTokenCookie = {
		name: "auth_token",
		value: "6d94c2a37741b0d88020e43ac04bdae2f6a35e20",
		domain: "x.com",
		path: "/",
		httpOnly: true,
		secure: true,
	};
	await page.setCookie(authTokenCookie);

	const url = "https://x.com/Tempora72704468";
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	try {
		await page.goto(url, { waitUntil: "networkidle2" });
		await delay(500);

		let ids = null;
		const maxRetries = 5;
		for (let attempt = 0; attempt < maxRetries; attempt++) {
			console.log(`Attempt ${attempt + 1} to scrape the page...`);
			ids = await scrapePage(page, delay);
			if (ids) break;

			console.log("No buttons found. Retrying...");
			await delay(1000); // Wait before retrying
		}

		if (!ids) {
			console.log("Failed to scrape any IDs after multiple attempts.");
			return NextResponse.json([]);
		}

		console.log("Scraping completed. IDs:", ids);
		return NextResponse.json(ids);
	} catch (error) {
		console.error("Error during scraping:", error);
	} finally {
		await browser.close();
	}
};
