const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join('public', 'hotels');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Map hotel ID to verified Wikimedia Commons original photos
const HOTEL_PHOTOS = {
  // 1. The Ritz-Carlton, Kyoto
  'ritz-carlton-kyoto': [
    { name: 'rc-kyoto-exterior.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/The_Ritz-Carton_Kyoto.jpg' },
    { name: 'rc-kyoto-garden.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/The_Ritz-Carton_Kyoto_2.jpg' }
  ],

  // 2. The Ritz-Carlton, Half Moon Bay
  'ritz-carlton-half-moon-bay': [
    { name: 'rc-hmb-lodge.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/HalfMoonBayCalifornia.RitzCarlton.jpg' },
    { name: 'rc-hmb-lawn.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Ritz-Carlton_Half_Moon_Bay_Ocean_Lawn.jpg' },
    { name: 'rc-hmb-cliffs.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/32/The_Ritz-Carlton%2C_Half_Moon_Bay%2C_CA_USA_%28San_Matteo_Coast%29_-_panoramio_%287%29.jpg' }
  ],

  // 3. The Ritz-Carlton, Tokyo
  'ritz-carlton-tokyo': [
    { name: 'rc-tokyo-midtown.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Ritz-carlton_01.jpg' },
    { name: 'rc-tokyo-tower-top.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Tokyo_Midtown_top_floors.jpg' },
    { name: 'rc-tokyo-residences.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/0/02/The_Park_Residences_at_the_Ritz-Carlton_Tokyo_2012.JPG' }
  ],

  // 4. The Ritz-Carlton, Hong Kong
  'ritz-carlton-hong-kong': [
    { name: 'rc-hkg-entrance.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Ritz-Carlton_Hotel_Hong_Kong-1.jpg' },
    { name: 'rc-hkg-exterior.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/HK_The_Ritz-Carlton_hotel_b.JPG' },
    { name: 'rc-hkg-icc-tower.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/International_Commerce_Centre_201408.jpg' }
  ],

  // 5. The Ritz-Carlton, Dubai
  'ritz-carlton-dubai': [
    { name: 'rc-dubai-jbr-beach.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Beach_%40_Jumeirah_Beach_Residence_%40_Dubai_Marina_%2815664747178%29.jpg' },
    { name: 'rc-dubai-coastline.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Beach_%40_Jumeirah_Beach_Residence_%40_Dubai_Marina_%2815664760698%29.jpg' },
    { name: 'rc-dubai-shoreline.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Beach_%40_Jumeirah_Beach_Residence_%40_Dubai_Marina_%2815664734188%29.jpg' }
  ],

  // 6. The Ritz-Carlton Maui, Kapalua
  'ritz-carlton-kapalu-maui': [
    { name: 'rc-maui-resort.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Kapalua%2C_Maui_ritz-carlton_%2815500353096%29.jpg' },
    { name: 'rc-maui-ocean-walk.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Maui_Ritz_Carlton_-_panoramio.jpg' },
    { name: 'rc-maui-pools.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Ritz_Carlton_Maui_-_panoramio.jpg' }
  ],

  // 7. The Ritz-Carlton, Vienna
  'ritz-carlton-vienna': [
    { name: 'rc-vienna-palace-facade.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/The_Ritz-Carlton_%2849981388897%29.jpg' },
    { name: 'rc-vienna-palais-gutmann.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Palais_Gutmann_18464_in_A-1010_Wien.jpg' }
  ],

  // 8. The Ritz-Carlton New York, Central Park
  'ritz-carlton-new-york-central-park': [
    { name: 'rc-nycp-facade.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Ritz-Carlton_New_York%2C_Central_Park%2C_Manhattan%2C_New_York%2C_US.jpg' },
    { name: 'rc-nycp-entrance.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Ritz_Carlton%2C_New_York_%288402710911%29.jpg' },
    { name: 'rc-nycp-central-park-view.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Hotel_St_Moritz_NYC_002.JPG' }
  ],

  // 9. The Ritz-Carlton, Grand Cayman
  'ritz-carlton-grand-cayman': [
    { name: 'rc-cayman-beach-resort.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Resorts_on_Seven_Mile_Beach%2C_Grand_Cayman.jpg' },
    { name: 'rc-cayman-sailboats.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Sailboats%2C_Seven_Mile_Beach%2C_Grand_Cayman.jpg' },
    { name: 'rc-cayman-seven-mile-sun.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Seven_Mile_Beach_cayman_sun.jpg' }
  ],

  // 10. JW Marriott Venice Resort & Spa
  'jw-marriott-venice': [
    { name: 'jw-venice-resort-spa.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/JW_Marriott_Venice_Resort_%26_Spa_2023.jpeg' },
    { name: 'jw-venice-private-island.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Sacca_Sessola.jpg' },
    { name: 'jw-venice-lagoon-boat.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/VE7724_Vaporetto_31_e_Alilaguna_VE8716.JPG' }
  ],

  // 11. JW Marriott Marquis Hotel Dubai
  'jw-marriott-dubai-marquis': [
    { name: 'jw-dubai-marquis-towers.jpg', url: 'https://upload.wikimedia.org/wikipedia/en/d/dc/JW_Marriott_Marquis_Dubai2.jpg' },
    { name: 'jw-dubai-marquis-waterway.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Safa_Dubai_%28104780299%29.jpeg' },
    { name: 'jw-dubai-marquis-skyline.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/%D0%97%D0%B8%D0%BC%D0%BD%D0%B8%D0%B9_%D0%94%D1%83%D0%B1%D0%B0%D0%B8_-_panoramio.jpg' }
  ],

  // 12. JW Marriott Hotel Singapore South Beach
  'jw-marriott-singapore-south-beach': [
    { name: 'jw-singapore-south-beach-tower.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Singapore_%28SG%29%2C_JW_Marriott_Hotel_Singapore_South_Beach_--_2019_--_4432.jpg' },
    { name: 'jw-singapore-south-beach-avenue.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/South_Beach_Avenue_%E2%80%94_JW_Marriott_Hotel_and_South_Beach_Tower.jpg' },
    { name: 'jw-singapore-nicoll-highway.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Hotel_Marriott%2C_Nicoll_Highway%2C_Singapur%2C_2023-08-16%2C_DD_05.jpg' }
  ],

  // 13. JW Marriott Masai Mara Lodge
  'jw-marriott-masai-mara': [
    { name: 'jw-mara-river.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mara_River_Massai_Mara.jpg' },
    { name: 'jw-mara-waters.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Reflection_Masai_Mara.jpg' },
    { name: 'jw-mara-sunset.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Masai_Mara_at_Sunset.jpg' }
  ],

  // 14. JW Marriott Cannes
  'jw-marriott-cannes': [
    { name: 'jw-cannes-croisette-facade.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Cannes_JWMarriott2.JPG' },
    { name: 'jw-cannes-entrance.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/JW_Marriott%2C_Cannes_%2820260619-IMG_3788%29.jpg' },
    { name: 'jw-cannes-seafront.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Mobeye-%C3%89t%C3%A9DesVilles-Cannes-46.jpg' }
  ],

  // 15. JW Marriott Auckland
  'jw-marriott-auckland': [
    { name: 'jw-auckland-tower.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/JW_Marriott_Auckland_PA01.jpg' },
    { name: 'jw-auckland-entrance.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/JW_Marriott_Auckland_PA02.jpg' },
    { name: 'jw-auckland-streetscape.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Albert_Street%2C_Auckland_PA04.jpg' }
  ],

  // 16. JW Marriott Essex House New York
  'jw-marriott-essex-house-new-york': [
    { name: 'jw-essex-house-rooftop-sign.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/JW_Marriott_Essex_House_in_New_York_City_2015.JPG' },
    { name: 'jw-essex-house-facade.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Essex_House_New_York.jpg' },
    { name: 'jw-essex-house-central-park-view.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Essex_House..._%2899517750%29.jpg' }
  ],

  // 17. JW Marriott Marco Island Beach Resort
  'jw-marriott-marco-island': [
    { name: 'jw-marco-island-beachfront.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Marco_Island_Beach%2C_Marco_Island%2C_Florida_-_panoramio.jpg' }
  ],

  // 18. JW Marriott Grosvenor House London
  'jw-marriott-grosvenor-house': [
    { name: 'jw-grosvenor-house-park-lane.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Grosvenor_House_Hotel%2C_Park_Lane.jpg' },
    { name: 'jw-grosvenor-house-facade.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Grosvenor_House_facade.jpg' },
    { name: 'jw-grosvenor-house-mayfair-view.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Park_Lane_view.jpg' }
  ]
};

function download(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(dir, filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log('Already exists:', filename);
      return resolve(dest);
    }
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'MarriottSiteBot/1.0 (contact: admin@marriott-bonvoy.test)' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, filename).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed ${url}: HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => {
        console.log('Downloaded:', filename, fs.statSync(dest).size, 'bytes');
        resolve(dest);
      }));
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  const downloadedMap = {};
  for (const [hotelId, photos] of Object.entries(HOTEL_PHOTOS)) {
    console.log(`\nProcessing ${hotelId}...`);
    downloadedMap[hotelId] = [];
    for (const p of photos) {
      try {
        await download(p.url, p.name);
        downloadedMap[hotelId].push(`/hotels/${p.name}`);
        await sleep(800);
      } catch (err) {
        console.error('Error downloading', p.name, err.message);
      }
    }
  }
  fs.writeFileSync('scripts/downloaded-photos.json', JSON.stringify(downloadedMap, null, 2));
  console.log('\nAll done! Output written to scripts/downloaded-photos.json');
}

run();
