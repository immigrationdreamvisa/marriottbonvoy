const fs = require('fs');

const HOTEL_UPDATES = {
  'ritz-carlton-kyoto': {
    name: 'The Ritz-Carlton, Kyoto',
    city: 'Kyoto',
    region: 'Kansai',
    country: 'Japan',
    officialUrl: 'https://www.marriott.com/en-us/hotels/ukyrz-the-ritz-carlton-kyoto/overview/',
    heroImage: '/hotels/rc-kyoto-exterior.jpg',
    images: ['/hotels/rc-kyoto-exterior.jpg', '/hotels/rc-kyoto-garden.jpg'],
    roomImage: '/hotels/rc-kyoto-garden.jpg'
  },
  'ritz-carlton-half-moon-bay': {
    name: 'The Ritz-Carlton, Half Moon Bay',
    city: 'Half Moon Bay',
    region: 'California',
    country: 'United States',
    officialUrl: 'https://www.marriott.com/en-us/hotels/sforz-the-ritz-carlton-half-moon-bay/overview/',
    heroImage: '/hotels/rc-hmb-lodge.jpg',
    images: ['/hotels/rc-hmb-lodge.jpg', '/hotels/rc-hmb-lawn.jpg', '/hotels/rc-hmb-cliffs.jpg'],
    roomImage: '/hotels/rc-hmb-lawn.jpg'
  },
  'ritz-carlton-tokyo': {
    name: 'The Ritz-Carlton, Tokyo',
    city: 'Tokyo',
    region: 'Kanto',
    country: 'Japan',
    officialUrl: 'https://www.marriott.com/en-us/hotels/tyorz-the-ritz-carlton-tokyo/overview/',
    heroImage: '/hotels/rc-tokyo-midtown.jpg',
    images: ['/hotels/rc-tokyo-midtown.jpg', '/hotels/rc-tokyo-tower-top.jpg', '/hotels/rc-tokyo-residences.jpg'],
    roomImage: '/hotels/rc-tokyo-tower-top.jpg'
  },
  'ritz-carlton-hong-kong': {
    name: 'The Ritz-Carlton, Hong Kong',
    city: 'Hong Kong',
    region: 'Kowloon',
    country: 'Hong Kong SAR',
    officialUrl: 'https://www.marriott.com/en-us/hotels/hkgkw-the-ritz-carlton-hong-kong/overview/',
    heroImage: '/hotels/rc-hkg-entrance.jpg',
    images: ['/hotels/rc-hkg-entrance.jpg', '/hotels/rc-hkg-exterior.jpg', '/hotels/rc-hkg-icc-tower.jpg'],
    roomImage: '/hotels/rc-hkg-exterior.jpg'
  },
  'ritz-carlton-dubai': {
    name: 'The Ritz-Carlton, Dubai',
    city: 'Dubai',
    region: 'Dubai Marina / JBR',
    country: 'United Arab Emirates',
    officialUrl: 'https://www.marriott.com/en-us/hotels/dxbrz-the-ritz-carlton-dubai/overview/',
    heroImage: '/hotels/rc-dubai-jbr-beach.jpg',
    images: ['/hotels/rc-dubai-jbr-beach.jpg', '/hotels/rc-dubai-coastline.jpg', '/hotels/rc-dubai-shoreline.jpg'],
    roomImage: '/hotels/rc-dubai-coastline.jpg'
  },
  'ritz-carlton-kapalu-maui': {
    name: 'The Ritz-Carlton Maui, Kapalua',
    city: 'Kapalua',
    region: 'Hawaii',
    country: 'United States',
    officialUrl: 'https://www.marriott.com/en-us/hotels/jhmlz-the-ritz-carlton-maui-kapalua/overview/',
    heroImage: '/hotels/rc-maui-resort.jpg',
    images: ['/hotels/rc-maui-resort.jpg', '/hotels/rc-maui-ocean-walk.jpg', '/hotels/rc-maui-pools.jpg'],
    roomImage: '/hotels/rc-maui-ocean-walk.jpg'
  },
  'ritz-carlton-vienna': {
    name: 'The Ritz-Carlton, Vienna',
    city: 'Vienna',
    region: 'Vienna',
    country: 'Austria',
    officialUrl: 'https://www.marriott.com/en-us/hotels/vierz-the-ritz-carlton-vienna/overview/',
    heroImage: '/hotels/rc-vienna-palace-facade.jpg',
    images: ['/hotels/rc-vienna-palace-facade.jpg', '/hotels/rc-vienna-palais-gutmann.jpg'],
    roomImage: '/hotels/rc-vienna-palais-gutmann.jpg'
  },
  'ritz-carlton-new-york-central-park': {
    name: 'The Ritz-Carlton New York, Central Park',
    city: 'New York',
    region: 'New York',
    country: 'United States',
    officialUrl: 'https://www.marriott.com/en-us/hotels/nyccp-the-ritz-carlton-new-york-central-park/overview/',
    heroImage: '/hotels/rc-nycp-facade.jpg',
    images: ['/hotels/rc-nycp-facade.jpg', '/hotels/rc-nycp-entrance.jpg', '/hotels/rc-nycp-central-park-view.jpg'],
    roomImage: '/hotels/rc-nycp-entrance.jpg'
  },
  'ritz-carlton-maldives-fari-islands': {
    name: 'The Ritz-Carlton Maldives, Fari Islands',
    city: 'Fari Islands',
    region: 'North Malé Atoll',
    country: 'Maldives',
    officialUrl: 'https://www.marriott.com/en-us/hotels/mlezr-the-ritz-carlton-maldives-fari-islands/overview/',
    heroImage: '',
    images: [],
    roomImage: ''
  },
  'ritz-carlton-grand-cayman': {
    name: 'The Ritz-Carlton, Grand Cayman',
    city: 'Seven Mile Beach',
    region: 'Grand Cayman',
    country: 'Cayman Islands',
    officialUrl: 'https://www.marriott.com/en-us/hotels/gcmrz-the-ritz-carlton-grand-cayman/overview/',
    heroImage: '/hotels/rc-cayman-beach-resort.jpg',
    images: ['/hotels/rc-cayman-beach-resort.jpg', '/hotels/rc-cayman-sailboats.jpg', '/hotels/rc-cayman-seven-mile-sun.jpg'],
    roomImage: '/hotels/rc-cayman-sailboats.jpg'
  },
  'jw-marriott-venice': {
    name: 'JW Marriott Venice Resort & Spa',
    city: 'Venice',
    region: 'Veneto',
    country: 'Italy',
    officialUrl: 'https://www.marriott.com/en-us/hotels/vcejw-jw-marriott-venice-resort-and-spa/overview/',
    heroImage: '/hotels/jw-venice-resort-spa.jpg',
    images: ['/hotels/jw-venice-resort-spa.jpg', '/hotels/jw-venice-private-island.jpg', '/hotels/jw-venice-lagoon-boat.jpg'],
    roomImage: '/hotels/jw-venice-private-island.jpg'
  },
  'jw-marriott-dubai-marquis': {
    name: 'JW Marriott Marquis Hotel Dubai',
    city: 'Dubai',
    region: 'Business Bay',
    country: 'United Arab Emirates',
    officialUrl: 'https://www.marriott.com/en-us/hotels/dxbjw-jw-marriott-marquis-hotel-dubai/overview/',
    heroImage: '/hotels/jw-dubai-marquis-towers.jpg',
    images: ['/hotels/jw-dubai-marquis-towers.jpg', '/hotels/jw-dubai-marquis-waterway.jpg', '/hotels/jw-dubai-marquis-skyline.jpg'],
    roomImage: '/hotels/jw-dubai-marquis-waterway.jpg'
  },
  'jw-marriott-singapore-south-beach': {
    name: 'JW Marriott Hotel Singapore South Beach',
    city: 'Singapore',
    region: 'Downtown Core',
    country: 'Singapore',
    officialUrl: 'https://www.marriott.com/en-us/hotels/sinjw-jw-marriott-hotel-singapore-south-beach/overview/',
    heroImage: '/hotels/jw-singapore-south-beach-tower.jpg',
    images: ['/hotels/jw-singapore-south-beach-tower.jpg', '/hotels/jw-singapore-south-beach-avenue.jpg', '/hotels/jw-singapore-nicoll-highway.jpg'],
    roomImage: '/hotels/jw-singapore-south-beach-avenue.jpg'
  },
  'jw-marriott-masai-mara': {
    name: 'JW Marriott Masai Mara Lodge',
    city: 'Masai Mara National Reserve',
    region: 'Narok County',
    country: 'Kenya',
    officialUrl: 'https://www.marriott.com/en-us/hotels/nbajw-jw-marriott-masai-mara-lodge/overview/',
    heroImage: '/hotels/jw-mara-river.jpg',
    images: ['/hotels/jw-mara-river.jpg', '/hotels/jw-mara-waters.jpg', '/hotels/jw-mara-sunset.jpg'],
    roomImage: '/hotels/jw-mara-waters.jpg'
  },
  'jw-marriott-cannes': {
    name: 'JW Marriott Cannes',
    city: 'Cannes',
    region: 'Provence-Alpes-Côte d\'Azur',
    country: 'France',
    officialUrl: 'https://www.marriott.com/en-us/hotels/cewjw-jw-marriott-cannes/overview/',
    heroImage: '/hotels/jw-cannes-croisette-facade.jpg',
    images: ['/hotels/jw-cannes-croisette-facade.jpg', '/hotels/jw-cannes-entrance.jpg', '/hotels/jw-cannes-seafront.jpg'],
    roomImage: '/hotels/jw-cannes-entrance.jpg'
  },
  'jw-marriott-auckland': {
    name: 'JW Marriott Auckland',
    city: 'Auckland',
    region: 'Auckland Region',
    country: 'New Zealand',
    officialUrl: 'https://www.marriott.com/en-us/hotels/aklmc-jw-marriott-auckland/overview/',
    heroImage: '/hotels/jw-auckland-tower.jpg',
    images: ['/hotels/jw-auckland-tower.jpg', '/hotels/jw-auckland-entrance.jpg', '/hotels/jw-auckland-streetscape.jpg'],
    roomImage: '/hotels/jw-auckland-entrance.jpg'
  },
  'jw-marriott-essex-house-new-york': {
    name: 'JW Marriott Essex House New York',
    city: 'New York',
    region: 'New York',
    country: 'United States',
    officialUrl: 'https://www.marriott.com/en-us/hotels/nycex-jw-marriott-essex-house-new-york/overview/',
    heroImage: '/hotels/jw-essex-house-rooftop-sign.jpg',
    images: ['/hotels/jw-essex-house-rooftop-sign.jpg', '/hotels/jw-essex-house-facade.jpg', '/hotels/jw-essex-house-central-park-view.jpg'],
    roomImage: '/hotels/jw-essex-house-facade.jpg'
  },
  'jw-marriott-marco-island': {
    name: 'JW Marriott Marco Island Beach Resort',
    city: 'Marco Island',
    region: 'Florida',
    country: 'United States',
    officialUrl: 'https://www.marriott.com/en-us/hotels/mrkfl-jw-marriott-marco-island-beach-resort/overview/',
    heroImage: '/hotels/jw-marco-island-beachfront.jpg',
    images: ['/hotels/jw-marco-island-beachfront.jpg'],
    roomImage: '/hotels/jw-marco-island-beachfront.jpg'
  },
  'jw-marriott-grosvenor-house': {
    name: 'JW Marriott Grosvenor House London',
    city: 'London',
    region: 'England',
    country: 'United Kingdom',
    officialUrl: 'https://www.marriott.com/en-us/hotels/longh-jw-marriott-grosvenor-house-london/overview/',
    heroImage: '/hotels/jw-grosvenor-house-park-lane.jpg',
    images: ['/hotels/jw-grosvenor-house-park-lane.jpg', '/hotels/jw-grosvenor-house-facade.jpg', '/hotels/jw-grosvenor-house-mayfair-view.jpg'],
    roomImage: '/hotels/jw-grosvenor-house-facade.jpg'
  }
};

let content = fs.readFileSync('src/data/properties.ts', 'utf8');

// 1. Remove duplicate jw-marriott-cannes at the end
// Find second jw-marriott-cannes
const secondIndex = content.lastIndexOf("id: 'jw-marriott-cannes'");
const firstIndex = content.indexOf("id: 'jw-marriott-cannes'");

if (secondIndex !== -1 && secondIndex !== firstIndex) {
  console.log('Removing duplicate jw-marriott-cannes at position', secondIndex);
  // Find the start of the object: the last '{' before secondIndex
  const objStart = content.lastIndexOf('{', secondIndex);
  // Find the end: the matching '}' followed by '];'
  const endBracket = content.lastIndexOf('}', content.lastIndexOf('];'));
  // Remove from objStart to the closing brace before ];
  // Let's inspect the text around secondIndex
  const before = content.substring(0, objStart).trimEnd();
  // Remove trailing comma from the previous object if needed
  const cleanedBefore = before.endsWith(',') ? before.slice(0, -1) : before;
  content = cleanedBefore + '\n];\n';
}

// 2. Now update each of the 19 properties
for (const [id, update] of Object.entries(HOTEL_UPDATES)) {
  const idRegex = new RegExp(`id:\\s*'${id}'[\\s\\S]*?\\n  \\}`, 'g');
  // Match the property object
  const propMatch = content.match(idRegex);
  if (!propMatch) {
    console.warn('Could not find property block for', id);
    continue;
  }

  let propBlock = propMatch[0];

  // Update name
  propBlock = propBlock.replace(/name:\s*'[^']+'/, `name: '${update.name}'`);
  // Update city
  propBlock = propBlock.replace(/city:\s*'[^']+'/, `city: '${update.city}'`);
  // Update region
  propBlock = propBlock.replace(/region:\s*'[^']+'/, `region: '${update.region}'`);
  // Update country
  propBlock = propBlock.replace(/country:\s*'[^']+'/, `country: '${update.country}'`);
  // Update officialUrl
  propBlock = propBlock.replace(/officialUrl:\s*'[^']+'/, `officialUrl: '${update.officialUrl}'`);
  // Update heroImage
  propBlock = propBlock.replace(/heroImage:\s*'[^']*'/, `heroImage: '${update.heroImage}'`);

  // Update images: [...]
  const imagesStr = JSON.stringify(update.images, null, 6)
    .replace(/"/g, "'")
    .replace(/\n\s*\]/, '\n    ]');
  propBlock = propBlock.replace(/images:\s*\[[\s\S]*?\],/, `images: ${imagesStr},`);

  // Update room images
  if (update.roomImage !== undefined) {
    const roomImgStr = update.roomImage ? `['${update.roomImage}']` : '[]';
    propBlock = propBlock.replace(/rooms:\s*\[[\s\S]*?images:\s*\[[^\]]*\]/, (match) => {
      return match.replace(/images:\s*\[[^\]]*\]/, `images: ${roomImgStr}`);
    });
  }

  content = content.replace(propMatch[0], propBlock);
  console.log('Updated property:', id);
}

fs.writeFileSync('src/data/properties.ts', content, 'utf8');
console.log('Successfully updated src/data/properties.ts!');
