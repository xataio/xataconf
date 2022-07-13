import { launchBrowser } from '../../../../utils/launchBrowser';

export async function getScreenshot(html: string, type: 'png' | 'jpeg') {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 2048, height: 1170 });
    await page.setContent(html);
    const file = await page.screenshot({ type });
    return file;
}
