import sharp from 'sharp';
import fs from 'fs';

if (!fs.existsSync('public/products')) {
  fs.mkdirSync('public/products', { recursive: true });
}

const products = [
  {
    input: 'product-boucle-armchair.webp',
    output: 'boucle-armchair.webp',
    name: 'Bouclé Armchair',
    maxW: 680,
    maxH: 720,
    yOffset: 0
  },
  {
    input: 'product-couch-set.webp',
    output: 'couch-set.webp',
    name: 'Tufted Sofa Suite',
    maxW: 760,
    maxH: 640,
    yOffset: 0
  },
  {
    input: 'product-travertine-table.webp',
    output: 'travertine-table.webp',
    name: 'Travertine Coffee Table',
    maxW: 720,
    maxH: 660,
    yOffset: 0
  },
  {
    input: 'product-walnut-credenza.webp',
    output: 'walnut-credenza.webp',
    name: 'Slatted Walnut Credenza',
    maxW: 760,
    maxH: 640,
    yOffset: 0
  },
  {
    input: 'product-queen-bed.webp',
    output: 'queen-bed.webp',
    name: 'Fluted Bedstead',
    maxW: 760,
    maxH: 660,
    yOffset: 0
  },
  {
    input: 'product-velvet-chaise.webp',
    output: 'velvet-chaise.webp',
    name: 'Velvet Wave Chaise',
    maxW: 720,
    maxH: 660,
    yOffset: 0
  },
  {
    input: 'product-desk-mirror.webp',
    output: 'desk-mirror.webp',
    name: 'Vanity Mirror Desk',
    maxW: 700,
    maxH: 720,
    yOffset: 0
  },
  {
    input: 'product-dining-table.webp',
    output: 'dining-table.webp',
    name: 'Grand Dining Suite',
    maxW: 720,
    maxH: 660,
    yOffset: 0
  }
];

const cardW = 840;
const cardH = 1080;

const bgSvg = `
<svg width="${cardW}" height="${cardH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#FBF8F4" />
      <stop offset="60%" stop-color="#F0EBE1" />
      <stop offset="100%" stop-color="#E5DECf" />
    </radialGradient>
  </defs>
  <rect width="${cardW}" height="${cardH}" fill="url(#grad)" />
</svg>
`;

async function processAll() {
  const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  for (const item of products) {
    const resizedProduct = await sharp(`public/${item.input}`)
      .resize(item.maxW, item.maxH, { fit: 'inside' })
      .toBuffer();

    const meta = await sharp(resizedProduct).metadata();
    const left = Math.round((cardW - meta.width) / 2);
    const top = Math.round((cardH - meta.height) / 2) + item.yOffset;

    await sharp(bgBuffer)
      .composite([{ input: resizedProduct, left, top }])
      .webp({ quality: 92 })
      .toFile(`public/products/${item.output}`);

    console.log(`Generated: public/products/${item.output}`);
  }
}

processAll().catch(err => {
  console.error(err);
  process.exit(1);
});
