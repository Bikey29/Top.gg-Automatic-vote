const puppeteer = require('puppeteer');
const { BOT_ID, COOKIE } = require('./config.json');
if (!BOT_ID) throw new Error('BOT_ID not provided');
if (!COOKIE) throw new Error('COOKIE not provided');

const vote = async () => {
	console.log('Trying to vote');

	const browser = await puppeteer.launch({ headless: false, args: ['--window-size=0,120'] });
	const page = (await browser.pages())[0];

	await page.setCookie({ name: 'connect.sid', value: COOKIE, domain: 'top.gg', path: '/' });
	await page.goto(`https://top.gg/bot/${BOT_ID}/vote`);
	await page.click('#votingvoted');

	console.log('Successfully voted');

	setTimeout(() => browser.close(), 1000);
	setTimeout(vote, 1000 * 60 * 60 * 12);
	console.log('Waiting 12 hours');
};
vote();