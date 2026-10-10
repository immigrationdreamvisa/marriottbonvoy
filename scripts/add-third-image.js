import fs from 'fs';

const filePath = 'src/data/properties.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Match images: [ 'url1', 'url2' ] followed by heroImage: 'urlHero'
const regex = /images:\s*\[\s*'([^']+)',\s*'([^']+)'\s*\]\s*,\s*heroImage:\s*'([^']+)'/g;

let count = 0;
const newContent = content.replace(regex, (match, img1, img2, hero) => {
  count++;
  // If hero is different from img1 and img2, use hero as the 3rd image.
  // Otherwise use another high quality luxury hotel photo.
  const thirdImg = (hero !== img1 && hero !== img2) 
    ? hero 
    : 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85';
  
  return `images: [\n      '${img1}',\n      '${img2}',\n      '${thirdImg}'\n    ],\n    heroImage: '${hero}'`;
});

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Successfully updated ${count} properties with 3 images each!`);
