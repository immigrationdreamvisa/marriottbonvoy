import fs from 'fs';

function checkDuplicates(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /https:\/\/images\.unsplash\.com\/[^\s'"`\),]+/g;
  const urls = content.match(regex) || [];
  const counts = {};
  urls.forEach(u => {
    const base = u.split('?')[0];
    counts[base] = (counts[base] || 0) + 1;
  });

  const duplicates = Object.entries(counts).filter(([k, v]) => v > 1);
  console.log('File:', filePath, '| Total images:', urls.length, '| Unique:', Object.keys(counts).length, '| Duplicates:', duplicates.length);
  if (duplicates.length > 0) {
    duplicates.forEach(([url, count]) => {
      console.log(`  Duplicate [${count}x]: ${url}`);
    });
  }
}

checkDuplicates('src/data/properties.ts');
checkDuplicates('src/data/offers.ts');
checkDuplicates('src/data/vacations.ts');
checkDuplicates('src/data/brands.ts');
checkDuplicates('src/components/HomePromotionsSection.tsx');
checkDuplicates('src/components/HotelCard.tsx');
checkDuplicates('src/components/HotelSearchResults.tsx');
checkDuplicates('src/components/BrandDetailPage.tsx');
checkDuplicates('src/components/BrandCardsSection.tsx');
