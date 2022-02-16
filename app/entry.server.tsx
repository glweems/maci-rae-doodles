import type { ScreenshotOptions } from 'puppeteer';
import puppeteer from 'puppeteer';
import { renderToString } from 'react-dom/server';
import type { EntryContext } from 'remix';
import { RemixServer } from 'remix';
export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

export const scrapeEmbark = async (embarkId: string) => {
  const imgPath = `public/embark/${embarkId}.webp`;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://my.embarkvet.com/dog/${embarkId}`);

    await (
      await page.$('.breedmix-border')
    ).screenshot({
      path: imgPath,
      fullPage: false,
      type: 'webp',
    });

    await browser.close();

    return imgPath;
  } catch (error) {
    console.error(error);
    return null;
  }
};
