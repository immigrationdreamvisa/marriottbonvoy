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
  
  hotels.push({ id, brandId, name, city, country, officialUrl, heroImage });
}

console.log('ALL PROPERTIES in properties.ts:');
hotels.forEach((h, i) => {
  console.log(`${i + 1}. [${h.brandId}] ${h.name} (${h.city}, ${h.country}) - ID: ${h.id}`);
  console.log(`   Official: ${h.officialUrl}`);
  console.log(`   Hero: ${h.heroImage}`);
});
