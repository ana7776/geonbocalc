import { createHash } from "node:crypto";
import path from "node:path";
import process from "node:process";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as cheerio from "cheerio";
import sharp from "sharp";

const config = {
  accountId: requiredEnv("R2_ACCOUNT_ID"),
  accessKeyId: requiredEnv("R2_ACCESS_KEY_ID"),
  secretAccessKey: requiredEnv("R2_SECRET_ACCESS_KEY"),
  bucket: requiredEnv("R2_BUCKET"),
  publicBaseUrl: stripTrailingSlash(requiredEnv("R2_PUBLIC_BASE_URL")),
  prefix: stripSlashes(process.env.R2_PREFIX || "site-images"),
  quality: Number.parseInt(process.env.IMAGE_QUALITY || "80", 10),
  userAgent: process.env.USER_AGENT || "Mozilla/5.0 (compatible; R2ImagePipeline/1.0)"
};

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
  }
});

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.url) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const pageUrl = new URL(args.url);
  const imageUrls = await crawlImageUrls(pageUrl, {
    selector: args.selector,
    limit: args.limit
  });

  if (imageUrls.length === 0) {
    console.log(JSON.stringify({ sourceUrl: pageUrl.href, images: [] }, null, 2));
    return;
  }

  const uploaded = [];

  for (const imageUrl of imageUrls) {
    try {
      const result = await processAndUploadImage(imageUrl, pageUrl);
      uploaded.push(result);
      console.error(`Uploaded: ${result.url}`);
    } catch (error) {
      uploaded.push({
        source: imageUrl,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  console.log(
    JSON.stringify(
      {
        sourceUrl: pageUrl.href,
        count: uploaded.filter((item) => item.url).length,
        images: uploaded
      },
      null,
      2
    )
  );
}

async function crawlImageUrls(pageUrl, options = {}) {
  const html = await fetchText(pageUrl.href);
  const $ = cheerio.load(html);
  const selector = options.selector || "img";
  const urls = new Set();

  $(selector).each((_, element) => {
    const src =
      $(element).attr("src") ||
      $(element).attr("data-src") ||
      $(element).attr("data-original") ||
      firstSrcsetUrl($(element).attr("srcset") || $(element).attr("data-srcset"));

    if (!src || src.startsWith("data:") || src.startsWith("blob:")) {
      return;
    }

    urls.add(new URL(src, pageUrl).href);
  });

  return [...urls].slice(0, options.limit || Number.POSITIVE_INFINITY);
}

async function processAndUploadImage(imageUrl, pageUrl) {
  const response = await fetch(imageUrl, {
    headers: {
      "user-agent": config.userAgent,
      accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      referer: pageUrl.href
    }
  });

  if (!response.ok) {
    throw new Error(`Image download failed (${response.status})`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`URL is not an image: ${contentType || "unknown content-type"}`);
  }

  const input = Buffer.from(await response.arrayBuffer());
  const webp = await sharp(input)
    .rotate()
    .webp({
      quality: config.quality,
      effort: 5
    })
    .toBuffer();

  const key = buildObjectKey(imageUrl, webp);

  await s3.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: webp,
      ContentType: "image/webp",
      CacheControl: "public, max-age=31536000, immutable"
    })
  );

  return {
    source: imageUrl,
    key,
    url: `${config.publicBaseUrl}/${key}`,
    bytes: webp.length
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": config.userAgent,
      accept: "text/html,application/xhtml+xml"
    }
  });

  if (!response.ok) {
    throw new Error(`Page fetch failed (${response.status})`);
  }

  return response.text();
}

function buildObjectKey(imageUrl, buffer) {
  const url = new URL(imageUrl);
  const originalName = path.basename(url.pathname).replace(/\.[^.]+$/, "");
  const safeName = slugify(originalName || "image");
  const hash = createHash("sha256").update(imageUrl).update(buffer).digest("hex").slice(0, 12);
  const date = new Date().toISOString().slice(0, 10);
  return `${config.prefix}/${date}/${safeName}-${hash}.webp`;
}

function firstSrcsetUrl(srcset) {
  if (!srcset) {
    return "";
  }

  return srcset
    .split(",")
    .map((entry) => entry.trim().split(/\s+/)[0])
    .filter(Boolean)[0];
}

function parseArgs(args) {
  const parsed = {};

  for (let index = 0; index < args.length; index += 1) {
    const current = args[index];

    if (current === "--url") {
      parsed.url = args[++index];
    } else if (current === "--selector") {
      parsed.selector = args[++index];
    } else if (current === "--limit") {
      parsed.limit = Number.parseInt(args[++index], 10);
    }
  }

  return parsed;
}

function printUsage() {
  console.error(`
Usage:
  npm run images:r2 -- --url https://example.com/page

Options:
  --url       Required. Page URL to crawl.
  --selector  Optional. CSS selector for target images. Default: img
  --limit     Optional. Maximum number of images to process.
`);
}

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

function stripSlashes(value) {
  return value.replace(/^\/+|\/+$/g, "");
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
