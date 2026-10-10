export interface VacationPackage {
  id: string;
  category: 'All-Inclusive' | 'Homes & Villas' | 'Yacht Collection' | 'Escapes & Packages';
  title: string;
  subtitle: string;
  destination: string;
  country: string;
  description: string;
  image: string;
  duration?: string;
  startingPrice: number;
  currency: string;
  bonvoyPointsEarnable: number;
  highlights: string[];
  inclusions: string[];
  officialNotice: string;
  verifiedBrand: string;
}

export const VACATION_PACKAGES: VacationPackage[] = [
  {
    id: 'vacation-all-inclusive-cancun',
    category: 'All-Inclusive',
    title: 'Sanctuary Cap Cana, a Luxury Collection Adult All-Inclusive Resort',
    subtitle: 'Dominican Republic Architectural Wonder',
    destination: 'Punta Cana',
    country: 'Dominican Republic',
    description: 'An exclusive adults-only all-inclusive resort set along a pure white-sand beach. Features Spanish colonial fortress architecture, five swimming pools, gourmet world dining, and 24-hour room service.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    duration: '4 Nights / 5 Days',
    startingPrice: 620,
    currency: 'USD',
    bonvoyPointsEarnable: 7500,
    highlights: ['Adults-Only Luxury', 'Spanish Colonial Fortress', 'Pristine Marina & Beach'],
    inclusions: [
      'Unlimited gourmet dining across 5 specialty restaurants',
      'Premium international spirits & sommelier wines',
      'Daily curated wellness & ocean water sports',
      'Complimentary 24-hour suite dining service'
    ],
    officialNotice: 'Verified All-Inclusive by Marriott Bonvoy portfolio member. All taxes, food, and beverage included in nightly rate.',
    verifiedBrand: 'The Luxury Collection All-Inclusive'
  },
  {
    id: 'vacation-all-inclusive-costa-rica',
    category: 'All-Inclusive',
    title: 'The Westin Reserva Conchal, an All-Inclusive Golf Resort & Spa',
    subtitle: 'Eco-Luxury Rainforest & Beach Sanctuary',
    destination: 'Playa Conchal',
    country: 'Costa Rica',
    description: 'Nestled between lush exotic forests and the shimmering waters of Playa Conchal, this eco-resort features Robert Trent Jones II championship golf, Heavenly Spa treatments, and family or adults-only club suites.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    duration: '5 Nights / 6 Days',
    startingPrice: 580,
    currency: 'USD',
    bonvoyPointsEarnable: 6800,
    highlights: ['Rainforest Setting', 'Championship Golf Course', 'Heavenly Spa by Westin'],
    inclusions: [
      'Gourmet meals and artisan refreshments at 8 venues',
      'Daily eco-guided nature and mangrove trail hikes',
      'Kayaking, paddleboarding, and snorkeling gear',
      'Access to Westin Heavenly Spa thermal lagoons'
    ],
    officialNotice: 'Certified Carbon-Neutral resort in Costa Rica within the Marriott Bonvoy portfolio.',
    verifiedBrand: 'Westin Hotels & Resorts'
  },
  {
    id: 'vacation-homes-villas-tuscany',
    category: 'Homes & Villas',
    title: 'Villa Belsole: Renaissance Olive Estate in Chianti',
    subtitle: 'Homes & Villas by Marriott Bonvoy',
    destination: 'Florence / Chianti',
    country: 'Italy',
    description: 'A meticulously restored 16th-century stone villa surrounded by rolling vineyards and olive groves. Features a private heated infinity pool, authentic pizza oven, and dedicated private chef services.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    duration: 'Weekly Rental (7 Nights)',
    startingPrice: 1450,
    currency: 'USD',
    bonvoyPointsEarnable: 18000,
    highlights: ['Private 8-Bedroom Villa', 'Heated Panoramic Pool', 'Earn & Redeem Marriott Bonvoy Points'],
    inclusions: [
      'Professional cleaning & sanitization before arrival',
      'High-speed business grade Wi-Fi and air conditioning',
      '24/7 dedicated local property manager and concierge',
      'Welcome basket of estate extra virgin olive oil & Chianti wine'
    ],
    officialNotice: 'Professionally curated and verified by Homes & Villas by Marriott Bonvoy. 100% point eligible.',
    verifiedBrand: 'Homes & Villas by Marriott Bonvoy'
  },
  {
    id: 'vacation-homes-villas-aspen',
    category: 'Homes & Villas',
    title: 'Red Mountain Contemporary Ski Estate',
    subtitle: 'Homes & Villas by Marriott Bonvoy',
    destination: 'Aspen',
    country: 'United States',
    description: 'Soaring alpine glass and timber chalet commanding 180-degree panoramas of Aspen Mountain. Includes private ski equipment lockers, outdoor hot tub, billiards room, and fireplace terraces.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    duration: '5 Nights Minimum',
    startingPrice: 2200,
    currency: 'USD',
    bonvoyPointsEarnable: 25000,
    highlights: ['Ski Valet & Storage', 'Heated Driveway & Hot Tub', 'Panoramic Red Mountain Views'],
    inclusions: [
      'Dedicated local concierge for ski passes and reservations',
      'Mid-stay housekeeping and linen refreshment',
      'Complimentary airport private SUV transfer',
      'Complimentary gourmet welcome pantry'
    ],
    officialNotice: 'Fully inspected and certified by Homes & Villas by Marriott Bonvoy.',
    verifiedBrand: 'Homes & Villas by Marriott Bonvoy'
  },
  {
    id: 'vacation-yacht-mediterranean',
    category: 'Yacht Collection',
    title: 'The Ritz-Carlton Yacht Collection: Mediterranean Riviera Voyage',
    subtitle: 'Custom Superyacht Ilma & Evrima',
    destination: 'French & Italian Rivieras',
    country: 'France / Italy / Monaco',
    description: 'Designed to combine the luxury lifestyle of The Ritz-Carlton with the casual freedom of a yachting vacation. Featuring 228 terrace suites, personal concierges, Michelin-crafted dining, and an aft marina platform.',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
    duration: '7 Nights Voyage',
    startingPrice: 6400,
    currency: 'USD',
    bonvoyPointsEarnable: 45000,
    highlights: ['All-Terrace Suites', 'Aft Marina Watersports Platform', 'The Ritz-Carlton Spa at Sea'],
    inclusions: [
      'All meals and 24-hour in-suite dining aboard',
      'Beverages including fine wines and champagne in all venues',
      'All onboard gratuities and marina watersports equipment',
      'Dedicated Personal Concierge for each suite'
    ],
    officialNotice: 'Official luxury cruise line of Marriott Bonvoy. Redeem and earn Bonvoy Elite Night credits.',
    verifiedBrand: 'The Ritz-Carlton Yacht Collection'
  },
  {
    id: 'vacation-escapes-member-deals',
    category: 'Escapes & Packages',
    title: 'Marriott Bonvoy Escapes: Up to 20% Off Weekend Getaways',
    subtitle: 'Exclusive Weekly Savings for Loyalty Members',
    destination: 'Global Participating Hotels',
    country: 'Worldwide',
    description: 'Every Wednesday through Sunday, Marriott Bonvoy members receive exclusive rate discounts of up to 20% on upcoming weekend stays across top North American and European cities.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    duration: 'Flexible Stays',
    startingPrice: 280,
    currency: 'USD',
    bonvoyPointsEarnable: 3000,
    highlights: ['Up to 20% Member Discount', 'No Blackout Dates on Selected Rooms', 'Earn Elite Night Credits'],
    inclusions: [
      'Exclusive rate discounted directly at checkout',
      'High-speed in-room Wi-Fi',
      'Mobile Key & contactless check-in via Marriott Bonvoy app',
      'Standard member points earning on room rate'
    ],
    officialNotice: 'Subject to weekend availability at participating Marriott Bonvoy hotels and resorts.',
    verifiedBrand: 'Marriott Bonvoy Escapes'
  },
  {
    id: 'vacation-yacht-caribbean',
    category: 'Yacht Collection',
    title: 'The Ritz-Carlton Yacht Collection: Caribbean Jewels & Virgin Islands',
    subtitle: 'Superyacht Luminara Maiden Season',
    destination: 'St. Thomas, St. Barts & Antigua',
    country: 'Caribbean',
    description: 'Chart secluded coves and turquoise anchorages unreachable by larger cruise ships. Featuring private infinity whirlpools, five curated dining venues, and direct tender access to pristine private beaches.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    duration: '7 Nights Voyage',
    startingPrice: 5900,
    currency: 'USD',
    bonvoyPointsEarnable: 42000,
    highlights: ['Boutique 456-Guest Yacht', 'Complimentary Champagne & Caviar', 'Marina Ocean Pool'],
    inclusions: [
      'Luxurious terrace suite accommodations',
      'Custom shore experiences curated by local historians',
      'All meals, beverages, and 24/7 personal butler service',
      'Unlimited high-speed Starlink maritime connectivity'
    ],
    officialNotice: 'Official Marriott Bonvoy partner voyage. Full Elite night recognition and points redemption.',
    verifiedBrand: 'The Ritz-Carlton Yacht Collection'
  },
  {
    id: 'vacation-homes-santorini',
    category: 'Homes & Villas',
    title: 'Oia Horizon Caldera Cliffside Villa',
    subtitle: 'Homes & Villas by Marriott Bonvoy',
    destination: 'Santorini',
    country: 'Greece',
    description: 'An iconic whitewashed cycladic cave mansion perched dramatically on the Oia cliffs. Features a private plunge pool facing the Aegean sunset, volcanic rock wine cellar, and dedicated butler service.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    duration: '4 Nights Minimum',
    startingPrice: 1650,
    currency: 'USD',
    bonvoyPointsEarnable: 21000,
    highlights: ['Caldera Sunset Frontline', 'Private Heated Infinity Plunge', 'Authentic Cycladic Architecture'],
    inclusions: [
      'Full daily Greek gourmet breakfast prepared in-villa',
      'Roundtrip private airport / port executive transfers',
      'Dedicated local island insider for sailing & winery bookings',
      'Homes & Villas 24/7 guest support hotline'
    ],
    officialNotice: 'Independently audited against over 240 Marriott Bonvoy hospitality standards.',
    verifiedBrand: 'Homes & Villas by Marriott Bonvoy'
  },
  {
    id: 'vacation-all-inclusive-barbados',
    category: 'All-Inclusive',
    title: 'Turtle Beach by Elegant Hotels, an All-Inclusive Resort',
    subtitle: 'Platinum Coast Caribbean Family & Couple Sanctuary',
    destination: 'Dover Beach',
    country: 'Barbados',
    description: 'All-suite all-inclusive oceanfront haven overlooking the brilliant Caribbean sea. Enjoy non-motorized water sports, open-air beach dining, turtle nesting excursions, and complimentary tennis coaching.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    duration: '5 Nights / 6 Days',
    startingPrice: 510,
    currency: 'USD',
    bonvoyPointsEarnable: 5900,
    highlights: ['Powder White Beach', 'Complimentary Hobie Cat Sailing', 'Chef Rum Pairing Dinners'],
    inclusions: [
      'All open-air restaurant meals and craft island cocktails',
      'Kids Club with marine wildlife interactive education',
      'Complimentary water taxi to partner West Coast resorts',
      'Daily live calypso and steel pan evening performances'
    ],
    officialNotice: 'All-Inclusive by Marriott Bonvoy member with premium dining and resort gratuities included.',
    verifiedBrand: 'Elegant Hotels by Marriott'
  }
];
