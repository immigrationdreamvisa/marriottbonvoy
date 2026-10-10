const https = require('https');

const HOTELS = [
  { id: 'ritz-carlton-kyoto', search: '"Ritz-Carlton" Kyoto' },
  { id: 'ritz-carlton-half-moon-bay', search: '"Half Moon Bay" "Ritz-Carlton"' },
  { id: 'ritz-carlton-tokyo', search: '"Tokyo Midtown" "Ritz-Carlton"' },
  { id: 'ritz-carlton-hong-kong', search: '"Ritz-Carlton" "Hong Kong"' },
  { id: 'ritz-carlton-dubai', search: '"Ritz-Carlton" Dubai' },
  { id: 'ritz-carlton-kapalu-maui', search: '"Ritz-Carlton" Kapalua OR Maui' },
  { id: 'ritz-carlton-vienna', search: '"Ritz-Carlton" Vienna' },
  { id: 'ritz-carlton-new-york-central-park', search: '"Ritz-Carlton" "Central Park"' },
  { id: 'ritz-carlton-maldives-fari-islands', search: '"Ritz-Carlton" Maldives' },
  { id: 'ritz-carlton-grand-cayman', search: '"Ritz-Carlton" "Grand Cayman"' },
  { id: 'jw-marriott-venice', search: '"JW Marriott" Venice' },
  { id: 'jw-marriott-dubai-marquis', search: '"JW Marriott Marquis"' },
  { id: 'jw-marriott-singapore-south-beach', search: '"South Beach" "JW Marriott"' },
  { id: 'jw-marriott-masai-mara', search: '"Masai Mara"' },
  { id: 'jw-marriott-cannes', search: '"JW Marriott" Cannes' },
  { id: 'jw-marriott-auckland', search: '"JW Marriott" Auckland' },
  { id: 'jw-marriott-essex-house-new-york', search: '"Essex House" "JW Marriott"' },
  { id: 'jw-marriott-marco-island', search: '"Marco Island" "Marriott"' },
  { id: 'jw-marriott-grosvenor-house', search: '"Grosvenor House"' },
];

function queryCommons(term) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|size&format=json`;
    https.get(url, { headers: { 'User-Agent': 'MarriottHotelBot/1.0 (contact: info@marriott.com)' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages || {};
          const results = [];
          for (const k in pages) {
            const p = pages[k];
            const u = p.imageinfo?.[0]?.url;
            if (u && !u.endsWith('.svg') && !u.endsWith('.ogg') && !u.endsWith('.pdf')) {
              results.push({ title: p.title, url: u });
            }
          }
          resolve(results);
        } catch (e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const map = {};
  for (const h of HOTELS) {
    const imgs = await queryCommons(h.search);
    console.log(`\n=== ${h.id} === (found ${imgs.length})`);
    imgs.forEach(i => console.log('  ', i.title, '=>', i.url));
    map[h.id] = imgs;
  }
}

run();
