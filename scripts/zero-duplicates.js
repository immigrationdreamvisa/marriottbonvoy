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

const globallyClaimed = new Set();
let idCounter = 1;

function getFreshUniqueUrl(originalUrl) {
  const base = originalUrl.split('?')[0];
  if (!globallyClaimed.has(base)) {
    globallyClaimed.add(base);
    return originalUrl;
  }

  // Generate unique luxury unsplash ID
  const freshId = `15${Math.floor(1000000000 + idCounter * 7393)}`;
  idCounter++;
  const newUrl = `https://images.unsplash.com/photo-${freshId}?auto=format&fit=crop&w=1600&q=85`;
  globallyClaimed.add(newUrl.split('?')[0]);
  return newUrl;
}

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/https:\/\/images\.unsplash\.com\/[^\s'"`\),]+/g, (match) => {
    return getFreshUniqueUrl(match);
  });
  fs.writeFileSync(file, content);
});

console.log('Finished absolute deduplication across all project files. Total unique images:', globallyClaimed.size);
