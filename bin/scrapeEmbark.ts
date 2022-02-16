import Airtable from 'airtable';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import puppeteer from 'puppeteer';
dotenv.config();
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const contentDir = 'public/embark';
export const downloadBanners = async (embarkId: string) => {
  const imgPath = `${contentDir}/${embarkId}.webp`;
  const browser = await puppeteer.launch({
    product: 'chrome',

    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    },
  });

  const page = await await browser.newPage();
  await page.goto(`https://my.embarkvet.com/dog/${embarkId}`);

  await (
    await page.$('.breedmix-border')
  ).screenshot({
    path: imgPath,
    fullPage: false,
    type: 'webp',
    quality: 100,
  });

  await browser.close();

  return imgPath;
};

const makeContentDir = async () => {
  try {
    if (!fs.pathExistsSync(contentDir)) {
      fs.mkdirSync(contentDir);
    }
    // fs.mkdirSync(contentDir);
  } catch (error) {}
  return contentDir;
};
(async () => {
  await makeContentDir().catch(console.error);

  const embarkIds = await base('dogs')
    .select({
      view: 'embarkIds',
      fields: ['embarkId'],
    })
    .all()
    .then((records) =>
      records.map(({ fields }) => fields.embarkId as string).flat(),
    )
    .catch((err) => {
      return [];
    });

  if (embarkIds?.length > 0) {
    embarkIds.forEach(async (embarkId) => {
      const assets = {
        banner: {
          url: `https://my.embarkvet.com/dog/${embarkId}`,
          selector: '.breedmix-border',
          screenshot: `${contentDir}/summery-${embarkId}`,
          viewPort: {
            width: 1920,
            height: 1080,
            deviceScaleFactor: 2,
          },
        },
        familyTree: {
          url: `https://my.embarkvet.com/dog/${embarkId}#family-tree`,
          selector: '#tab-familytree',
          screenshot: `${contentDir}/family-tree-${embarkId}`,
          viewPort: {
            width: 766,
            height: 1700,
          },
        },
      };

      Object.values(assets).forEach(async (asset) => {
        const browser = await puppeteer.launch({
          product: 'chrome',

          defaultViewport: asset.viewPort,
        });
        const page = await browser.newPage();
        await page.goto(asset.url);
        await (
          await page.$(asset.selector)
        ).screenshot({
          path: asset.screenshot + '.webp',
          fullPage: false,
          type: 'webp',
          quality: 100,
        });
        await browser.close();
      });
    });
  }
})();
