const fs = require('fs');
const content = fs.readFileSync('src/data/properties.ts', 'utf8');

const blocks = content.split(/\{\s*id:\s*'/);
const hotels = [];
for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const id = block.split("'")[0];
  const getField = (f) => {
    const m = block.match(new RegExp(f + ":\\s*'([^']*)'"));
    return m ? m[1] : '';
  };
  const brandId = getField('brandId');
  const name = getField('name');
  const city = getField('city');
  const country = getField('country');
  const officialUrl = getField('officialUrl');
  const heroImage = getField('heroImage');
  
  const imgMatch = block.match(/images:\s*\[([\s\S]*?)\]/);
  const images = imgMatch ? imgMatch[1].match(/'([^']+)'/g)?.map(s => s.replace(/'/g, '')) || [] : [];
  
  hotels.push({ id, brandId, name, city, country, officialUrl, heroImage, images });
}

console.log('Total hotels found:', hotels.length);
console.log('\n--- The Ritz-Carlton & JW Marriott Hotels ---');
hotels.filter(h => h.brandId === 'the-ritz-carlton' || h.brandId === 'jw-marriott').forEach((h, idx) => {
  console.log(`#${idx+1}: [${h.brandId}] ${h.name} | ${h.city}, ${h.country}`);
  console.log(`   id: ${h.id}`);
  console.log(`   officialUrl: ${h.officialUrl}`);
  console.log(`   heroImage: ${h.heroImage}`);
  console.log(`   images (${h.images.length}):`, h.images);
});
