import fs from 'fs';

const files = [
  'src/data/properties.ts',
  'src/data/offers.ts',
  'src/data/vacations.ts',
  'src/data/brands.ts',
  'src/data/membership.ts',
  'src/components/HomePromotionsSection.tsx',
  'src/components/Hero.tsx',
  'src/components/Header.tsx',
  'src/components/Footer.tsx'
];

const globalCounts = new Map();
const urlToFileMap = new Map();

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const regex = /https:\/\/images\.unsplash\.com\/[^\s'"`\),]+/g;
  const urls = content.match(regex) || [];
  urls.forEach(u => {
    const base = u.split('?')[0];
    globalCounts.set(base, (globalCounts.get(base) || 0) + 1);
    if (!urlToFileMap.has(base)) urlToFileMap.set(base, []);
    urlToFileMap.get(base).push(file);
  });
});

let totalGlobalDuplicates = 0;
console.log('=== GLOBAL IMAGE UNIQUENESS AUDIT ===');
for (const [base, count] of globalCounts.entries()) {
  if (count > 1) {
    totalGlobalDuplicates++;
    console.log(`Global Duplicate [${count}x]: ${base}`);
    console.log(`  Occurs in: ${[...new Set(urlToFileMap.get(base))].join(', ')}`);
  }
}

console.log(`\nAudit Complete. Total unique images: ${globalCounts.size}, Total cross-file duplicate images: ${totalGlobalDuplicates}`);
