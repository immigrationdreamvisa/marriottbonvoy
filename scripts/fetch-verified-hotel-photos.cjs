const https = require('https');

const HOTELS_TO_SEARCH = [
  { id: 'ritz-carlton-kyoto', q: 'Ritz-Carlton Kyoto' },
  { id: 'ritz-carlton-tokyo', q: 'Ritz-Carlton Tokyo' },
  { id: 'ritz-carlton-half-moon-bay', q: 'Ritz-Carlton Half Moon Bay' },
  { id: 'ritz-carlton-hong-kong', q: 'Ritz-Carlton Hong Kong' },
  { id: 'ritz-carlton-dubai', q: 'Ritz-Carlton Dubai' },
  { id: 'ritz-carlton-kapalu-maui', q: 'Ritz-Carlton Kapalua' },
  { id: 'ritz-carlton-vienna', q: 'Ritz-Carlton Vienna' },
  { id: 'ritz-carlton-new-york-central-park', q: 'Ritz-Carlton New York Central Park' },
  { id: 'ritz-carlton-maldives-fari-islands', q: 'Ritz-Carlton Maldives' },
  { id: 'ritz-carlton-grand-cayman', q: 'Ritz-Carlton Grand Cayman' },
  { id: 'jw-marriott-venice', q: 'JW Marriott Venice' },
  { id: 'jw-marriott-dubai-marquis', q: 'JW Marriott Marquis Dubai' },
  { id: 'jw-marriott-singapore-south-beach', q: 'JW Marriott Hotel Singapore South Beach' },
  { id: 'jw-marriott-masai-mara', q: 'JW Marriott Masai Mara' },
  { id: 'jw-marriott-cannes', q: 'JW Marriott Cannes' },
  { id: 'jw-marriott-auckland', q: 'JW Marriott Auckland' },
  { id: 'jw-marriott-essex-house-new-york', q: 'JW Marriott Essex House' },
  { id: 'jw-marriott-marco-island', q: 'JW Marriott Marco Island' },
  { id: 'jw-marriott-grosvenor-house', q: 'Grosvenor House Hotel London' },
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MarriottHotelBot/1.0 (contact: info@marriott.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const h of HOTELS_TO_SEARCH) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(h.q)}&gsrlimit=5&prop=imageinfo&iiprop=url|size&format=json`;
    const res = await fetchJson(url);
    const pages = res?.query?.pages || {};
    const images = [];
    for (const k in pages) {
      const p = pages[k];
      const imgUrl = p.imageinfo?.[0]?.url;
      if (imgUrl && !imgUrl.endsWith('.svg') && !imgUrl.endsWith('.ogg')) {
        images.push({ title: p.title, url: imgUrl.split('?')[0] });
      }
    }
    console.log(`\n=== ${h.id} (${h.q}) ===`);
    console.log(`Found ${images.length} images:`);
    images.forEach(img => console.log('  ', img.title, '->', img.url));
  }
}

run();
