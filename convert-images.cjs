const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'public/Summaries');
const OUT = path.join(BASE, 'webp');

fs.mkdirSync(OUT, { recursive: true });

const files = [
  'MAT Mocup.png',
  'Mockup Collage.png',
  'Part One Embedded.jpg',
  'ISTQB FL Summary.jpg',
  'ISTQB FL Q.png',
  'Test Genius.png',
];

async function convert() {
  for (const file of files) {
    const inPath = path.join(BASE, file);
    const outName = path.parse(file).name + '.webp';
    const outPath = path.join(OUT, outName);
    try {
      const info = await sharp(inPath)
        .resize({ width: 900, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outPath);
      const orig = fs.statSync(inPath).size;
      const saved = ((1 - info.size / orig) * 100).toFixed(1);
      console.log(`✓ ${file} → ${outName} (${(info.size/1024).toFixed(0)}KB, saved ${saved}%)`);
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`);
    }
  }
  console.log('\nDone!');
}

convert();
