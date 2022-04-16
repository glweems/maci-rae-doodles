import type { LoaderFunction } from '@remix-run/node';
import { createHash } from 'node:crypto';
import os from 'os';
import path from 'path';
import type { LoaderConfig, Resolver } from 'remix-image/server';
import {
  DiskCache,
  fetchResolver,
  fsResolver,
  imageLoader,
} from 'remix-image/server';

import { selfUrl, vercelUrl } from '~/utils/env';
import { sharpTransformer } from '~/utils/sharp';
const badImageBase64 =
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

function badImageResponse() {
  const buffer = Buffer.from(badImageBase64, 'base64');
  return new Response(buffer, {
    status: 500,
    headers: {
      'Cache-Control': 'max-age=0',
      'Content-Type': 'image/gif;base64',
      'Content-Length': buffer.length.toFixed(0),
    },
  });
}
export const fetchImage: Resolver = async (asset, url, options, basePath) => {
  console.log('basePath: ', basePath);
  console.log('url: ', url);
  if (url.startsWith('/') && (url.length === 1 || url[1] !== '/')) {
    return fsResolver(asset, url, options, basePath);
  }
  return fetchResolver(asset, url, options, basePath);
};

const config: LoaderConfig = {
  selfUrl: 'http://localhost:3000/',
  cache: new DiskCache(),
  resolver: fetchImage,
  transformer: sharpTransformer,
  // basePath: '/',
};
function getIntOrNull(value: string | null) {
  if (value === null) {
    return null;
  }

  return Number.parseInt(value);
}
export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  console.log('url: ', url);

  const src = url.searchParams.get('src');
  if (!src) {
    return badImageResponse();
  }
  const width = getIntOrNull(url.searchParams.get('width'));
  const height = getIntOrNull(url.searchParams.get('height'));
  const fit = url.searchParams.get('fit') || 'cover';
  const hash = createHash('sha256');
  hash.update('v1');
  hash.update(request.method);
  hash.update(request.url);
  hash.update(width?.toString() || '0');
  hash.update(height?.toString() || '0');
  hash.update(fit);
  console.log('hash: ', hash);

  return imageLoader(
    {
      selfUrl: url.origin,
      cache: new DiskCache(),
      resolver: fetchImage,
      transformer: sharpTransformer,
      basePath: '/',
    },
    request,
  );
};

/* import type { LoaderFunction } from '@remix-run/node';
import type { Request as NodeRequest } from '@remix-run/node';
import { Response as NodeResponse } from '@remix-run/node';
import { createHash } from 'crypto';
import fs from 'fs';
import fsp from 'fs/promises';
import https from 'https';
import path from 'path';
import sharp from 'sharp';
import type { Readable } from 'stream';
import type { PassThrough } from 'stream';







export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const src = url.searchParams.get('src');
  if (!src) {
    return badImageResponse();
  }

  const width = getIntOrNull(url.searchParams.get('width'));
  const height = getIntOrNull(url.searchParams.get('height'));
  const fit: any = url.searchParams.get('fit') || 'cover';

  const hash = createHash('sha256');
  hash.update('v1');
  hash.update(request.method);
  hash.update(request.url);
  hash.update(width?.toString() || '0');
  hash.update(height?.toString() || '0');
  hash.update(fit);
  const key = hash.digest('hex');
  const cachedFile = path.resolve(path.join('.cache/images', key + '.webp'));

  try {
    const exists = await fsp
      .stat(cachedFile)
      .then((s) => s.isFile())
      .catch(() => false);

    if (exists) {
      const fileStream = fs.createReadStream(cachedFile);

      return new NodeResponse(fileStream, {
        status: 200,
        headers: {
          'Content-Type': 'image/webp',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }) as unknown as Response;
    }
    console.info('cache skipped for', src);
  } catch (error) {
    console.error(error);
  }

  try {
    let imageBody: Readable | undefined;
    let status = 200;

    if (src.startsWith('/') && (src.length === 1 || src[1] !== '/')) {
      imageBody = fs.createReadStream(path.resolve('public', src.slice(1)));
    } else {
      const imgRequest = new Request(src.toString()) as unknown as NodeRequest;
      imgRequest.agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const imageResponse = await fetch(imgRequest as unknown as Request);
      imageBody = imageResponse.body as unknown as PassThrough;
      status = imageResponse.status;
    }

    if (!imageBody) {
      return badImageResponse();
    }

    const sharpInstance = sharp();
    sharpInstance.on('error', (error) => {
      console.error(error);
    });

    if (width || height) {
      sharpInstance.resize(width, height, { fit });
    }
    sharpInstance.webp({ reductionEffort: 6 });

    const imageManipulationStream = imageBody.pipe(sharpInstance);

    await fsp
      .mkdir(path.dirname(cachedFile), { recursive: true })
      .catch(() => {});
    const cacheFileStream = fs.createWriteStream(cachedFile);

    await new Promise<void>((resolve, reject) => {
      imageManipulationStream.pipe(cacheFileStream);
      imageManipulationStream.on('end', () => {
        resolve();
        imageBody!.destroy();
      });
      imageManipulationStream.on('error', async (error) => {
        imageBody!.destroy();
        await fsp.rm(cachedFile).catch(() => {});
      });
    });

    const fileStream = fs.createReadStream(cachedFile);

    return new NodeResponse(fileStream, {
      status: status,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }) as unknown as Response;
  } catch (error) {
    console.error(error);
    return badImageResponse();
  }
};

 */
