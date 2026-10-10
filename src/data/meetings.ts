export interface VenueSpace {
  id: string;
  name: string;
  propertyId: string;
  propertyName: string;
  location: string;
  sqFt: number;
  sqM: number;
  ceilingHeightFt: number;
  maxBanquet: number;
  maxTheater: number;
  maxClassroom: number;
  maxReception: number;
  image: string;
  features: string[];
}

export const VERIFIED_VENUES: VenueSpace[] = [
  {
    id: 'venue-gh-great-room',
    name: 'The Great Room Ballroom',
    propertyId: 'jw-marriott-grosvenor-house',
    propertyName: 'JW Marriott Grosvenor House London',
    location: 'Park Lane, Mayfair, London, UK',
    sqFt: 20000,
    sqM: 1858,
    ceilingHeightFt: 23,
    maxBanquet: 2000,
    maxTheater: 2000,
    maxClassroom: 1000,
    maxReception: 2000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Europe’s largest five-star hotel ballroom',
      'Dedicated private Park Lane red carpet entrance',
      'Advanced built-in broadcast audio/visual lighting rigs',
      'Full banquet kitchen and private tasting salon'
    ]
  },
  {
    id: 'venue-marco-calusa',
    name: 'Calusa Grand Ballroom & Beachfront Terraces',
    propertyId: 'jw-marriott-marco-island',
    propertyName: 'JW Marriott Marco Island Beach Resort',
    location: 'Marco Island, Florida, USA',
    sqFt: 30000,
    sqM: 2787,
    ceilingHeightFt: 22,
    maxBanquet: 2100,
    maxTheater: 2300,
    maxClassroom: 1400,
    maxReception: 2400,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Panoramic Gulf of Mexico beachfront lawn access',
      'Direct outdoor terrace break-out spaces',
      'High-speed video conferencing matrix',
      'Custom beach tiki cabana reception staging'
    ]
  },
  {
    id: 'venue-aspen-grand-ballroom',
    name: 'Grand Ballroom & Courtyard',
    propertyId: 'st-regis-aspen',
    propertyName: 'The St. Regis Aspen Resort',
    location: 'Aspen, Colorado, USA',
    sqFt: 9200,
    sqM: 855,
    ceilingHeightFt: 18,
    maxBanquet: 550,
    maxTheater: 700,
    maxClassroom: 400,
    maxReception: 800,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Floor-to-ceiling windows facing Aspen Mountain',
      'Outdoor heated fountain courtyard access',
      'Ralph Lauren alpine architectural appointments',
      'Champagne sabrage celebration ceremonies'
    ]
  },
  {
    id: 'venue-venice-rose-hall',
    name: 'Isola delle Rose Pavilions & Olive Grove',
    propertyId: 'jw-marriott-venice',
    propertyName: 'JW Marriott Venice Resort & Spa',
    location: 'Venice, Italy',
    sqFt: 8500,
    sqM: 790,
    ceilingHeightFt: 16,
    maxBanquet: 380,
    maxTheater: 450,
    maxClassroom: 250,
    maxReception: 600,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Private 40-acre island seclusion in the Venetian Lagoon',
      'Centuries-old olive grove outdoor dining options',
      'Private water taxi transfers from St. Mark’s Square',
      'Historic 19th-century church venue on grounds'
    ]
  },
  {
    id: 'venue-hmb-ocean-lawn',
    name: 'Miramontes Oceanfront Lawn & Ballroom',
    propertyId: 'ritz-carlton-half-moon-bay',
    propertyName: 'The Ritz-Carlton, Half Moon Bay',
    location: 'Half Moon Bay, California, USA',
    sqFt: 7100,
    sqM: 660,
    ceilingHeightFt: 17,
    maxBanquet: 400,
    maxTheater: 500,
    maxClassroom: 300,
    maxReception: 600,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Cliffside ocean lawn with unobstructed Pacific sunsets',
      'Outdoor gas fire pit lounge break-out areas',
      'Championship golf tournament event pairings',
      'Farm-to-table coastal California banquet dining'
    ]
  }
];

export const EVENT_SERVICES = [
  {
    title: 'Certified Marriott Wedding Planners',
    description: 'Expertly trained specialists who orchestrate every detail from floral design and bridal suites to custom menus and vendor coordination.'
  },
  {
    title: 'Custom Culinary & Sommelier Banquets',
    description: 'Bespoke menus crafted by Michelin-trained executive chefs, paired with international sommelier selections and dietary customization.'
  },
  {
    title: 'Hybrid & High-Tech Audiovisual Solutions',
    description: 'State-of-the-art hybrid meeting broadcasts, LED wall displays, digital staging, and high-speed dedicated enterprise Wi-Fi.'
  },
  {
    title: 'Marriott Bonvoy Events Loyalty Points',
    description: 'Earn points and Elite Night Credits on qualifying meetings and group room blocks, redeemable for future stays and VIP experiences.'
  }
];
