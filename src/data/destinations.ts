export interface VerifiedDestination {
  id: string;
  name: string;
  city: string;
  country: string;
  region: 'Americas' | 'Europe' | 'Asia Pacific' | 'Middle East & Africa' | 'Caribbean & Latin America';
  tagline: string;
  description: string;
  image: string;
  featuredPropertyId?: string;
  featuredPropertyName: string;
  hotelCount: number;
  highlightBadges: string[];
  bestTimeToVisit: string;
  topAttractions: string[];
}

export const VERIFIED_DESTINATIONS: VerifiedDestination[] = [
  {
    id: 'dest-kyoto',
    name: 'Kyoto, Japan',
    city: 'Kyoto',
    country: 'Japan',
    region: 'Asia Pacific',
    tagline: 'Ancient temples, Zen gardens, and sublime riverside serenity',
    description: 'Japan’s cultural heart features seventeen UNESCO World Heritage sites, historic geisha districts, serene bamboo groves, and world-class Michelin dining along the Kamogawa River.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'ritz-carlton-kyoto',
    featuredPropertyName: 'The Ritz-Carlton, Kyoto',
    hotelCount: 9,
    highlightBadges: ['Cultural Heritage', 'Michelin Dining', 'Zen Sanctuaries'],
    bestTimeToVisit: 'Spring (Cherry Blossoms) & Autumn (Foliage)',
    topAttractions: ['Fushimi Inari Shrine', 'Kinkaku-ji Golden Pavilion', 'Arashiyama Bamboo Grove', 'Gion Historic District']
  },
  {
    id: 'dest-tokyo',
    name: 'Tokyo, Japan',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia Pacific',
    tagline: 'The vibrant intersection of ultra-modern innovation and ancient traditions',
    description: 'A dazzling metropolis boasting the world’s highest concentration of Michelin stars, panoramic skyscraper skylines, cutting-edge fashion in Ginza, and sacred shrines in Roppongi and Akasaka.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'ritz-carlton-tokyo',
    featuredPropertyName: 'The Ritz-Carlton, Tokyo & The Tokyo EDITION',
    hotelCount: 22,
    highlightBadges: ['World Capital', 'Skyline Vistas', 'Gastronomy'],
    bestTimeToVisit: 'March to May & September to November',
    topAttractions: ['Tokyo Tower & Midtown', 'Meiji Jingu Shrine', 'Ginza Shopping Promenade', 'Imperial Palace Gardens']
  },
  {
    id: 'dest-venice',
    name: 'Venice, Italy',
    city: 'Venice',
    country: 'Italy',
    region: 'Europe',
    tagline: 'Romantic Venetian waterways, historic palazzos, and private island retreats',
    description: 'Built across 118 small islands, Venice is an architectural marvel of canals, Gothic marble facades, artisan glass blowing in Murano, and peaceful lagoon retreats on Isola delle Rose.',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'jw-marriott-venice',
    featuredPropertyName: 'JW Marriott Venice Resort & Spa',
    hotelCount: 14,
    highlightBadges: ['Romantic Lagoon', 'Historic Palaces', 'Private Island'],
    bestTimeToVisit: 'April to June & September to October',
    topAttractions: ['St. Mark’s Basilica & Piazza', 'Doge’s Palace', 'Grand Canal Gondola Route', 'Murano & Burano Islands']
  },
  {
    id: 'dest-london',
    name: 'London, United Kingdom',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    tagline: 'Timeless British royal heritage, West End theater, and premier Mayfair addresses',
    description: 'From historic landmarks along the Thames to the manicured expanse of Hyde Park and elite shopping on Bond Street, London is a premier destination for luxury culture and global business.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'jw-marriott-grosvenor-house',
    featuredPropertyName: 'JW Marriott Grosvenor House London',
    hotelCount: 38,
    highlightBadges: ['Royal Heritage', 'Mayfair Luxury', 'Theater District'],
    bestTimeToVisit: 'May to September',
    topAttractions: ['Hyde Park & Kensington Palace', 'British Museum', 'West End Theatres', 'Tower of London & Westminster']
  },
  {
    id: 'dest-paris',
    name: 'Paris, France',
    city: 'Paris',
    country: 'France',
    region: 'Europe',
    tagline: 'The City of Light: Haute couture, iconic architecture, and refined gastronomy',
    description: 'A global epicenter of art, fashion, gastronomy, and culture. Stroll the tree-lined Champs-Élysées, admire masterpieces in the Louvre, and savor afternoon espresso in Saint-Germain.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'edition-paris',
    featuredPropertyName: 'The Paris EDITION',
    hotelCount: 28,
    highlightBadges: ['Haute Couture', 'Eiffel Tower', 'Fine Dining'],
    bestTimeToVisit: 'April to June & September to November',
    topAttractions: ['Place Vendôme & Louvre', 'Eiffel Tower', 'Musée d’Orsay', 'Notre-Dame & Marais']
  },
  {
    id: 'dest-seville',
    name: 'Seville, Spain',
    city: 'Seville',
    country: 'Spain',
    region: 'Europe',
    tagline: 'Sun-drenched Andalusian passion, flamenco rhythms, and royal palace courtyards',
    description: 'The soul of southern Spain, celebrated for majestic Mudéjar architecture, fragrant orange blossoms, authentic flamenco performance, and historic royal palatial residences.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'luxury-collection-seville',
    featuredPropertyName: 'Hotel Alfonso XIII, a Luxury Collection Hotel',
    hotelCount: 6,
    highlightBadges: ['Royal Mudéjar', 'Flamenco Heritage', 'Courtyard Gardens'],
    bestTimeToVisit: 'March to May & October to November',
    topAttractions: ['Real Alcázar Palace', 'Seville Cathedral & Giralda', 'Plaza de España', 'Barrio Santa Cruz']
  },
  {
    id: 'dest-half-moon-bay',
    name: 'Half Moon Bay, California',
    city: 'Half Moon Bay',
    country: 'United States',
    region: 'Americas',
    tagline: 'Dramatic Pacific ocean bluffs, coastal links golf, and sunset bagpipers',
    description: 'Perched on rugged cliffs just 30 miles south of San Francisco, Half Moon Bay is Northern California’s premier oceanfront haven, surrounded by ancient redwood forests and coastal wineries.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'ritz-carlton-half-moon-bay',
    featuredPropertyName: 'The Ritz-Carlton, Half Moon Bay',
    hotelCount: 3,
    highlightBadges: ['Ocean Bluffs', 'Championship Golf', 'Fire Pit Terraces'],
    bestTimeToVisit: 'September to November & Spring',
    topAttractions: ['Coastal Ocean Trail', 'Pillar Point Harbor', 'Mavericks Beach', 'Pescadero Coastal Farmlands']
  },
  {
    id: 'dest-miami',
    name: 'Miami Beach, Florida',
    city: 'Miami Beach',
    country: 'United States',
    region: 'Americas',
    tagline: 'Art Deco glamour, azure Atlantic waters, and vibrant nightlife',
    description: 'Where world-class contemporary art meets pristine beaches and dynamic nightlife. Collins Avenue offers iconic Art Deco architecture, Michelin dining, and vibrant beach clubs.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'w-south-beach',
    featuredPropertyName: 'W South Beach',
    hotelCount: 24,
    highlightBadges: ['Atlantic Beach', 'Art Deco Historic', 'WET Deck Pool'],
    bestTimeToVisit: 'November to April',
    topAttractions: ['South Beach Ocean Drive', 'Wynwood Art District', 'Lincoln Road Promenade', 'Biscayne Bay Sailing']
  },
  {
    id: 'dest-marco-island',
    name: 'Marco Island, Florida',
    city: 'Marco Island',
    country: 'United States',
    region: 'Americas',
    tagline: 'Sugar-white Gulf Coast sands, dolphin excursions, and tranquil island luxury',
    description: 'The largest of Florida’s Ten Thousand Islands, offering miles of uncrowded beaches, warm turquoise Gulf waters, championship golf, and world-renowned shelling.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'jw-marriott-marco-island',
    featuredPropertyName: 'JW Marriott Marco Island Beach Resort',
    hotelCount: 4,
    highlightBadges: ['White Sand Beach', 'Gulf Coast Sunsets', 'Spa Wellness'],
    bestTimeToVisit: 'December to May',
    topAttractions: ['Tigertail Beach', 'Ten Thousand Islands Eco Tours', 'Marco Walk Plaza', 'Everglades National Park Gateway']
  },
  {
    id: 'dest-aspen',
    name: 'Aspen, Colorado',
    city: 'Aspen',
    country: 'United States',
    region: 'Americas',
    tagline: 'Legendary Rocky Mountain skiing, Gilded Age charm, and summer alpine culture',
    description: 'A celebrated alpine destination blending four legendary ski mountains with premier dining, luxury shopping, the Aspen Music Festival, and exhilarating outdoor adventure year-round.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'st-regis-aspen',
    featuredPropertyName: 'The St. Regis Aspen Resort',
    hotelCount: 5,
    highlightBadges: ['Alpine Skiing', 'Rocky Mountain Luxury', 'Champagne Sabrage'],
    bestTimeToVisit: 'December to April (Skiing) & July to September (Hiking)',
    topAttractions: ['Aspen Mountain Slopes', 'Maroon Bells Scenic Area', 'Wheeler Opera House', 'Aspen Art Museum']
  },
  {
    id: 'dest-bora-bora',
    name: 'Bora Bora, French Polynesia',
    city: 'Bora Bora',
    country: 'French Polynesia',
    region: 'Asia Pacific',
    tagline: 'Iconic overwater villas, Mount Otemanu, and crystal-clear turquoise lagoons',
    description: 'The jewel of the South Pacific, surrounded by a protected barrier reef and turquoise lagoon. Experience overwater living, private coral reefs, and legendary St. Regis butler service.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    featuredPropertyId: 'st-regis-borabora',
    featuredPropertyName: 'The St. Regis Bora Bora Resort',
    hotelCount: 2,
    highlightBadges: ['Overwater Bungalows', 'Mount Otemanu', 'Private Lagoonarium'],
    bestTimeToVisit: 'May to October',
    topAttractions: ['Lagoon Snorkeling with Stingrays', 'Mount Otemanu Vistas', 'Matira Beach', 'Motu Private Islets']
  }
];
