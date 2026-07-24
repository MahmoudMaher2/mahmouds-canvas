const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ─── Summaries ────────────────────────────────────────────────────────────────
const SUMMARIES_BASE = path.join(__dirname, 'public/Summaries');
const SUMMARIES_OUT  = path.join(SUMMARIES_BASE, 'webp');
const summaryFiles = [
  'MAT Mocup.png',
  'Mockup Collage.png',
  'Part One Embedded.jpg',
  'ISTQB FL Summary.jpg',
  'ISTQB FL Q.png',
  'Test Genius.png',
];

// ─── Projects ─────────────────────────────────────────────────────────────────
const PROJECTS_BASE = path.join(__dirname, 'public/projects');
const PROJECTS_OUT  = path.join(PROJECTS_BASE, 'webp');
// Only the images actually referenced by ProjectsSection.tsx
const projectFiles = [
  '1-HerokuApp.png',
  '2-opencart.png',
  '3-penguin.png',
  '4-talentkid.png',
  '5-dorraprint.png',
  '6-moreenglish.png',
  '7-thepass.png',
  '8-carbug.png',
  '9-cartlow.png',
  '10- SECU3.png',
  '11-loqta.png',
  '12-seen.png',
  '13-testgenius.png',
];

// ─── Certificates ─────────────────────────────────────────────────────────────
const CERTS_BASE = path.join(__dirname, 'public/Certificates');
const CERTS_OUT  = path.join(CERTS_BASE, 'webp');
const certFiles = [
  'ISTQB FL Certificate.jpg',
  'ISTQB MAT Certificate.png',
  'Azm Squad 337488.png',
  'Manual Testing Basics - Testing Bootcamp Level 1.jpg',
  'Agile Testing - Testing Bootcamp Level 2.jpg',
  'Mobile Application Testing - Testing Bootcamp Level 3.jpg',
  'Java Programming Test Automation Bootcamp Level 1 nezam.jpg',
  'ISTQB Mobile Application Testing - Become a Mobile Tester.jpg',
  'Introduction to Software Testing Concepts & Techniques.png',
  'ISTQB Foundation Level.png',
  'Effective Test Case and Bug Report Writing Techniques.png',
  'C Programming From Basics to Mastery.png',
  'Mastering Object-Oriented Programming.png',
  'Database Fundamentals.png',
  'Certificate DEPI R1 Mahmoud Maher Khater Abdel Razek.jpg',
  'Certificate DEPI R1 MAHMOUD MAHER KHATER .jpg',
  'Smart Environment Hackathon Certificate.jpg',
  'Part 1 certification_Page_1.jpg',
];

// ─── Favicon ──────────────────────────────────────────────────────────────────
const FAVICON_SRC = path.join(__dirname, 'public/Mahmoud Maher FavIcon-01.png');
const FAVICON_OUT = path.join(__dirname, 'public/favicon-192.webp');

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function convertBatch(files, baseDir, outDir, width, quality, label) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  Converting ${label} → webp  (width: ${width}px, quality: ${quality})`);
  console.log(`${'─'.repeat(60)}`);
  fs.mkdirSync(outDir, { recursive: true });

  let totalSaved = 0;
  let totalOrig  = 0;

  for (const file of files) {
    const inPath  = path.join(baseDir, file);
    const outName = path.parse(file).name + '.webp';
    const outPath = path.join(outDir, outName);

    if (!fs.existsSync(inPath)) {
      console.warn(`  ⚠  SKIP  ${file} — file not found`);
      continue;
    }

    try {
      const info = await sharp(inPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toFile(outPath);

      const orig  = fs.statSync(inPath).size;
      const saved = ((1 - info.size / orig) * 100).toFixed(1);
      totalSaved += (orig - info.size);
      totalOrig  += orig;
      console.log(`  ✓  ${file.padEnd(60)} ${(orig/1024).toFixed(0).padStart(6)}KB → ${(info.size/1024).toFixed(0).padStart(5)}KB  (saved ${saved}%)`);
    } catch (e) {
      console.error(`  ✗  ${file}: ${e.message}`);
    }
  }

  const totalPct = totalOrig > 0 ? ((1 - (totalOrig - totalSaved) / totalOrig) * 100).toFixed(1) : '0';
  console.log(`\n  Total saved: ${(totalSaved/1024/1024).toFixed(2)} MB  (${totalPct}% reduction)`);
}

async function convertFavicon() {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  Converting Favicon  (192×192, quality: 90)`);
  console.log(`${'─'.repeat(60)}`);

  try {
    const info = await sharp(FAVICON_SRC)
      .resize({ width: 192, height: 192, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90 })
      .toFile(FAVICON_OUT);

    const orig  = fs.statSync(FAVICON_SRC).size;
    const saved = ((1 - info.size / orig) * 100).toFixed(1);
    console.log(`  ✓  favicon-192.webp  — ${(orig/1024/1024).toFixed(1)}MB → ${(info.size/1024).toFixed(0)}KB  (saved ${saved}%)`);
  } catch (e) {
    console.error(`  ✗  Favicon: ${e.message}`);
  }
}

// ─── Run ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀  Image Conversion Script — Portfolio');

  await convertBatch(summaryFiles, SUMMARIES_BASE, SUMMARIES_OUT, 900,  80, 'Summaries');
  await convertBatch(projectFiles, PROJECTS_BASE,  PROJECTS_OUT,  1200, 82, 'Projects');
  await convertBatch(certFiles,    CERTS_BASE,     CERTS_OUT,     1400, 85, 'Certificates');
  await convertFavicon();

  console.log('\n\n✅  All done!\n');
}

main();
