import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp, { type AvailableFormatInfo } from "sharp";

type ImageConverterOptions = {
  width?: number;
  height?: number;
};

class ImageConverter {
  src: string;
  dst: string;

  format: AvailableFormatInfo;
  opts: ImageConverterOptions;

  constructor(
    src: string,
    dst: string,
    format: AvailableFormatInfo,
    opts: ImageConverterOptions,
  ) {
    this.src = src;
    this.dst = dst;
    this.format = format;
    this.opts = opts;
  }

  async run() {
    await mkdir(this.dst, { recursive: true });

    const glob = new Bun.Glob("*");
    for await (const src of glob.scan(this.src)) {
      const ext = path.extname(src);
      const name = path.basename(src, ext);
      const dst = `${this.dst}/${name}.${this.format.id}`;

      await sharp(`${this.src}/${src}`)
        .toFormat(this.format)
        .resize(this.opts)
        .toFile(dst);
    }
  }
}

const thumbConv = new ImageConverter(
  "images/",
  "static/thumbnails/",
  sharp.format.png,
  {
    width: 160,
    height: 320,
  },
);
const imageConv = new ImageConverter(
  "images/",
  "static/images/",
  sharp.format.png,
  {},
);

const ogpConv = new ImageConverter(
  "images/",
  "static/ogp/",
  sharp.format.png,
  { width: 1200, height: 630 },
);

await Promise.all([thumbConv.run(), imageConv.run(), ogpConv.run()]);
