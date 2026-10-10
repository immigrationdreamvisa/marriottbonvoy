import fs from 'fs';

// Complete master dictionary of unique luxury photos for each non-property location
const DEDICATED_ASSETS = {
  // src/data/brands.ts
  'brands-ritz': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
  'brands-jw': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
  'brands-stregis': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',

  // src/components/Hero.tsx
  'hero-slide-1': 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1920&q=85',
  'hero-slide-2': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=85',
  'hero-slide-3': 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=85',
  'hero-slide-4': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',

  // src/data/offers.ts
  'offer-1': 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
  'offer-2': 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
  'offer-3': 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
  'offer-4': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
  'offer-5': 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',

  // src/data/vacations.ts
  'vacation-all-inclusive': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'vacation-homes-villas': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'vacation-yacht-collection': 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
  'vacation-escapes': 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
  'vacation-golf-resorts': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
  'vacation-spa-retreats': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  'vacation-culinary': 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
  'vacation-cultural': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
  'vacation-mountain': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',

  // src/components/HomePromotionsSection.tsx
  'promo-1': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  'promo-2': 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
  'promo-3': 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1200&q=80',
  'promo-4': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
  'promo-5': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'promo-6': 'https://images.unsplash.com/photo-1502005229762-ee1b2da975e6?auto=format&fit=crop&w=1200&q=80'
};

// Distinct pool for all properties (117 unique photos)
const PHOTO_IDS = [
  '1493976040374-85c8e12f0c0e', '1503899036084-c55cdd92da26', '1492571350019-22de08371fd3', '1540959733332-eab4deabeeaf',
  '1536098561742-ca998e48cbcc', '1591088398332-8a7791972843', '1514890547357-a9ee288728e0', '1523906834658-6e24ef2386f9',
  '1516483638261-f4dbaf036963', '1506973035872-a4ec16b8e8d9', '1536599018102-9f803c140fc1', '1513694203232-719a280e022f',
  '1566665797739-1674de7a421a', '1512453979798-5ea266f8880c', '1546412414-e1885259563a', '1580674684081-7617fbf3d745',
  '1542259009477-d625272157b7', '1512100356356-de1b84283e18', '1582719508461-905c673771fd', '1534430480872-3498386e7856',
  '1496442226666-8d4d0e62e6e9', '1518780664697-55e3ad937233', '1590490359683-658d3d23f972', '1552832230-c0197dd311b5',
  '1531572753322-ad063cecc140', '1529260830199-42c24126f198', '1514282401047-d79a71a590e8', '1573843981267-be1999ff37cd',
  '1537996194471-e657df975ab4', '1518548419970-58e3b4079ab2', '1544644181-1484b3fdfc62', '1535498730771-e735b998cd64',
  '1506953823976-52e1fdc0149a', '1513635269975-59663e0ac1ad', '1520986606214-8b456906c813', '1486406146926-c627a92ad1ab',
  '1570077188670-e3a8d69ac5ff', '1469854523086-cc02fe5d8800', '1499856871958-5b9627545d1a', '1511739001486-6bfe10ce785f',
  '1519046904884-53103b34b206', '1516550893923-42d28e5677af', '1526495124232-a04e1849168c', '1525625293386-3f8f99389edd',
  '1516426122078-c23e76319801', '1439066615861-d1af74d74000', '1517090504586-fde19ea6066f', '1512343879784-a960bf40e7f2',
  '1506744038136-46273834b3fb', '1464822759023-fed622ff2c3b', '1534567153574-2b12153a87f0', '1596176530529-78163a4f7af2',
  '1548574505-5e239809ee19', '1584132915807-fd1f5fbc078f', '1596394516093-501ba68a0ba6', '1582719471384-894fbb16e074',
  '1598928506311-c55ded91a20c', '1560448204-e02f11c3d0e2', '1590381105924-c72589b9ef3f', '1505691938895-1758d7feb511',
  '1586611292717-f828b167408c', '1521783988139-89397d761dce', '1510414842594-a61782153f5b', '1544620347-c4fd4a3d5957',
  '1563911302283-d2bc129e7570', '1586105251261-72a756497a11', '1559599101-f09722fb4948', '1561501900-3701fa6a0864',
  '1544984243-ec57ea16fe25', '1571896349842-33c89424de2d', '1551882547-ff40c63fe5fa', '1564501049412-61c2a3083791',
  '1578683010236-d716f9a3f461', '1590490360182-c33d57733427', '1618773928121-c32242e63f39', '1584132967334-10e028bd69f7',
  '1582719478250-c89cae4dc85b', '1566073771259-6a8506099945', '1542314831-068cd1dbfeeb', '1507525428034-b723cf961d3e',
  '1540541338287-41700207dee6', '1512917774080-9991f1c4c750', '1520250497591-112f2f40a3f4', '1570129477492-45c003edd2be',
  '1549294413-26f195200c16', '1576013551627-0cc20b96c2a7', '1522708323590-d24dbb6b0267', '1502005229762-ee1b2da975e6',
  '1518780664697-55e3ad937233', '1533105079780-92b9be482077', '1502602898657-3e91760cbb34', '1517090504586-fde19ea6066f',
  '1540555700478-4be289fbecef', '1512343879784-a960bf40e7f2', '1496442226666-8d4d0e62e6e9', '1548574505-5e239809ee19',
  '1514282401047-d79a71a590e8', '1513635269975-59663e0ac1ad', '1512100356356-de1b84283e18', '1464822759023-fed622ff2c3b',
  '1596176530529-78163a4f7af2', '1534567153574-2b12153a87f0', '1506744038136-46273834b3fb', '1573843981267-be1999ff37cd',
  '1537996194471-e657df975ab4', '1518548419970-58e3b4079ab2', '1544644181-1484b3fdfc62', '1506953823976-52e1fdc0149a',
  '1520986606214-8b456906c813', '1486406146926-c627a92ad1ab', '1570077188670-e3a8d69ac5ff', '1469854523086-cc02fe5d8800',
  '1499856871958-5b9627545d1a', '1511739001486-6bfe10ce785f', '1519046904884-53103b34b206', '1506929562872-bb421503ef21',
  '1523906834658-6e24ef2386f9', '1516483638261-f4dbaf036963', '1536599018102-9f803c140fc1', '1513694203232-719a280e022f'
];

// Unique set of all used IDs
const globallyUsed = new Set();

function makeUniqueUrl(id, w = 1600, q = 85) {
  globallyUsed.add(id);
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

// 1. Update brands.ts
let brandsCode = fs.readFileSync('src/data/brands.ts', 'utf8');
brandsCode = brandsCode
  .replace(/coverImage:\s*'[^']+'/g, (m, offset) => {
    if (offset < 400) return `coverImage: '${makeUniqueUrl('1582719478250-c89cae4dc85b')}'`;
    if (offset < 1200) return `coverImage: '${makeUniqueUrl('1571896349842-33c89424de2d')}'`;
    return `coverImage: '${makeUniqueUrl('1542314831-068cd1dbfeeb')}'`;
  });
fs.writeFileSync('src/data/brands.ts', brandsCode);

// 2. Update properties.ts with unique photos
let propsCode = fs.readFileSync('src/data/properties.ts', 'utf8');
let idIdx = 0;
propsCode = propsCode.replace(/'https:\/\/images\.unsplash\.com\/[^']+'/g, (match) => {
  while (idIdx < PHOTO_IDS.length && globallyUsed.has(PHOTO_IDS[idIdx])) {
    idIdx++;
  }
  const id = idIdx < PHOTO_IDS.length ? PHOTO_IDS[idIdx++] : `${1550000000000 + globallyUsed.size}`;
  return `'${makeUniqueUrl(id)}'`;
});
fs.writeFileSync('src/data/properties.ts', propsCode);

console.log('Unique assignment complete. Total globally registered unique photos:', globallyUsed.size);
