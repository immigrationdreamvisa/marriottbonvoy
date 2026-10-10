const fs = require('fs');
const content = fs.readFileSync('src/data/properties.ts', 'utf8');

// Match each top-level object in PROPERTIES array
// They start with { id: '...', brandId: '...'
const regex = /\{\s*id:\s*'([a-z0-9-]+)',\s*brandId:\s*'([a-z0-9-]+)',\s*name:\s*'([^']+)',/g;
let match;
const hotels = [];
while ((match = regex.exec(content)) !== null) {
  hotels.push({ id: match[1], brandId: match[2], name: match[3], pos: match.index });
}

console.log('Found top-level hotels:', hotels.length);
hotels.forEach((h, i) => {
  console.log(`${i + 1}. [${h.brandId}] ${h.name} (id: ${h.id})`);
});
