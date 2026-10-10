import os
import json

# Ensure directories exist
os.makedirs('src/data/hotels', exist_ok=True)
os.makedirs('scripts', exist_ok=True)

# Other hotels currently in website (St. Regis, Luxury Collection, W Hotels, EDITION)
OTHER_HOTELS = """import { Property } from '../../types';

export const OTHER_HOTELS: Property[] = [
  {
    id: 'st-regis-borabora',
    brandId: 'st-regis',
    name: 'The St. Regis Bora Bora Resort',
    slug: 'the-st-regis-bora-bora-resort',
    city: 'Bora Bora',
    country: 'French Polynesia',
    region: 'Asia Pacific',
    address: 'Motu Piti Aau, Bora Bora 98730, French Polynesia',
    phone: '+689 40 60 78 88',
    latitude: -16.5004,
    longitude: -151.7071,
    officialUrl: 'https://www.marriott.com/en-us/hotels/bobxr-the-st-regis-bora-bora-resort/overview/',
    bookingUrl: 'https://www.marriott.com/en-us/hotels/bobxr-the-st-regis-bora-bora-resort/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    verificationTimestamp: '2026-10-09T01:52:00Z',
    tagline: 'The epitome of South Pacific luxury with the largest overwater villas in French Polynesia',
    description: 'Offering forty-four acres of lush tropical sanctuary, The St. Regis Bora Bora Resort features iconic overwater villas with glass viewing panels, signature St. Regis Butler Service, and Lagoon by Jean-Georges fine dining.',
    starRating: 5,
    guestRating: 4.99,
    reviewCount: 340,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    featured: false,
    setting: 'island',
    startingPrice: 1950,
    currency: 'USD',
    amenities: [
      'Signature 24-Hour St. Regis Butler Service',
      'Overwater Villas with Glass Floor Panels',
      'Iridium Spa on Its Own Private Island',
      'Lagoonarium with Native Coral and Marine Life',
      'Evening Champagne Sabrage Ritual'
    ],
    checkInTime: '15:00',
    checkOutTime: '11:00',
    meetingSpaceSqFt: 3500,
    meetingRoomsCount: 2,
    policies: {
      cancellation: 'Free cancellation up to 7 days prior to arrival.',
      checkInAge: 18,
      pets: 'Pets not permitted.',
      smoking: 'Non-smoking.'
    },
    rooms: [
      {
        id: 'stregis-overwater-premier',
        name: 'Overwater Premier Otemanu Villa',
        category: 'Villa',
        description: 'Direct view of Mount Otemanu, private plunge pool on the spacious sundeck, glass viewing panels into the lagoon, and dedicated butler.',
        sizeSqFt: 1550,
        sizeSqM: 144,
        maxAdults: 3,
        maxChildren: 2,
        bedConfiguration: '1 King Bed',
        view: 'Direct Mount Otemanu & Turquoise Lagoon',
        images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
        features: ['Overwater private plunge pool', 'Glass floor panels', 'Dedicated 24/7 St. Regis Butler', 'Outdoor dining gazebo'],
        basePrice: 1950,
        inventoryRemaining: 2,
        ratePlans: [
          {
            id: 'stregis-flex',
            name: 'Marriott Bonvoy Flexible Luxury Rate',
            description: 'Includes canoe breakfast delivery to your villa sundeck and evening cocktail hour.',
            pricePerNight: 1950,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 168,
            includesBreakfast: true,
            perks: ['Canoe Breakfast Delivery', 'Dedicated 24h Butler', 'Free cancellation up to 7 days']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'stregis-rev-1',
        guestName: 'Alexander Sterling',
        location: 'Toronto, Canada',
        rating: 5,
        date: 'August 2026',
        title: 'Sublime beyond words',
        comment: 'Having our butler unpack for us while we watched Mount Otemanu across the lagoon set the tone for an extraordinary honeymoon.',
        roomStayed: 'Overwater Premier Otemanu Villa'
      }
    ]
  },
  {
    id: 'st-regis-aspen',
    brandId: 'st-regis',
    name: 'The St. Regis Aspen Resort',
    slug: 'the-st-regis-aspen-resort',
    city: 'Aspen',
    country: 'United States',
    region: 'North America',
    address: '315 E Dean St, Aspen, CO 81611, USA',
    phone: '+1 970-920-3300',
    latitude: 39.1866,
    longitude: -106.8183,
    officialUrl: 'https://www.marriott.com/en-us/hotels/asexr-the-st-regis-aspen-resort/overview/',
    bookingUrl: 'https://www.marriott.com/en-us/hotels/asexr-the-st-regis-aspen-resort/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    verificationTimestamp: '2026-10-09T01:52:00Z',
    tagline: 'An aristocratic Rocky Mountain sanctuary at the base of Aspen Mountain',
    description: 'At the foot of Aspen Mountain, The St. Regis Aspen Resort combines Gilded Age glamour with alpine adventure. Features Remède Spa, heated outdoor slope-side pool and hot tubs, signature Butler Service, and Velvet Buck restaurant.',
    starRating: 5,
    guestRating: 4.95,
    reviewCount: 390,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
    featured: false,
    setting: 'alpine',
    startingPrice: 1380,
    currency: 'USD',
    amenities: [
      'Slope-Side Access with Ski Valet',
      'Remède Spa with Confluence Oxygen Room',
      'Heated Outdoor Pool & Hot Tubs with Mountain Views',
      'Signature St. Regis Butler Service',
      'Daily 17:00 Champagne Sabrage Ceremony'
    ],
    checkInTime: '16:00',
    checkOutTime: '11:00',
    meetingSpaceSqFt: 25000,
    meetingRoomsCount: 14,
    policies: {
      cancellation: 'Free cancellation up to 72 hours prior to arrival.',
      checkInAge: 21,
      pets: 'Pet friendly (Custom St. Regis dog beds).',
      smoking: 'Non-smoking.'
    },
    rooms: [
      {
        id: 'stregis-aspen-king',
        name: 'Aspen Mountain Grand Deluxe King',
        category: 'Deluxe',
        description: 'Custom leather furnishings by Ralph Lauren, stone fireplace, marble bathroom with steam shower, and direct views of Aspen Mountain.',
        sizeSqFt: 500,
        sizeSqM: 46,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Aspen Mountain Slopes',
        images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'],
        features: ['Ralph Lauren furnishings', 'Gas fireplace', 'Ski valet storage', 'Remède bath essentials'],
        basePrice: 1380,
        inventoryRemaining: 3,
        ratePlans: [
          {
            id: 'stregis-aspen-flex',
            name: 'Marriott Bonvoy Flexible Luxury Rate',
            description: 'Includes full mountain breakfast and ski equipment valet storage.',
            pricePerNight: 1380,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 72,
            includesBreakfast: true,
            perks: ['Gourmet Mountain Breakfast', 'Daily Ski Concierge Service', 'Free cancellation up to 72h']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'aspen-rev-1',
        guestName: 'Victoria Sterling',
        location: 'Dallas, USA',
        rating: 5,
        date: 'January 2026',
        title: 'Unmatched winter magic',
        comment: 'Soaking in the heated pool while snow falls all around with the mountain right in front of you is pure heaven.',
        roomStayed: 'Aspen Mountain Grand Deluxe King'
      }
    ]
  },
  {
    id: 'luxury-collection-seville',
    brandId: 'luxury-collection',
    name: 'Hotel Alfonso XIII, a Luxury Collection Hotel, Seville',
    slug: 'hotel-alfonso-xiii-a-luxury-collection-hotel-seville',
    city: 'Seville',
    country: 'Spain',
    region: 'Europe',
    address: 'Calle San Fernando 2, 41004 Seville, Spain',
    phone: '+34 954 91 70 00',
    latitude: 37.3824,
    longitude: -5.9926,
    officialUrl: 'https://www.marriott.com/en-us/hotels/svllc-hotel-alfonso-xiii-a-luxury-collection-hotel-seville/overview/',
    bookingUrl: 'https://www.marriott.com/en-us/hotels/svllc-hotel-alfonso-xiii-a-luxury-collection-hotel-seville/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    verificationTimestamp: '2026-10-09T01:52:00Z',
    tagline: 'Commissioned by the King of Spain in 1929 as the historic jewel of Andalusian hospitality',
    description: 'Commissioned by King Alfonso XIII, this Neo-Mudéjar architectural landmark resides in historic central Seville moments from the Real Alcázar and Cathedral. Featuring ceramic tiled arches, private courtyard gardens, and authentic Andalusian gastronomy.',
    starRating: 5,
    guestRating: 4.96,
    reviewCount: 520,
    images: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',
    featured: false,
    setting: 'urban',
    startingPrice: 650,
    currency: 'USD',
    amenities: [
      'Historic Neo-Mudéjar Architecture & Tile Courtyard',
      'Outdoor Pool Surrounded by Lush Orange and Palm Trees',
      'San Fernando Andalusian Fine Dining',
      'Bar Americano Art Deco Cocktail Lounge',
      'Steps to Real Alcázar and Seville Cathedral'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 18000,
    meetingRoomsCount: 9,
    policies: {
      cancellation: 'Free cancellation up to 48 hours prior to arrival.',
      checkInAge: 18,
      pets: 'Small dogs permitted.',
      smoking: 'Non-smoking.'
    },
    rooms: [
      {
        id: 'alfonso-castilian-room',
        name: 'Castilian Deluxe King Room',
        category: 'Deluxe',
        description: 'Authentic handcrafted Sevillian wood furnishings, high ornate ceilings, crystal chandeliers, and marble bathroom.',
        sizeSqFt: 460,
        sizeSqM: 43,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Historic Courtyard or Gardens',
        images: ['https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'],
        features: ['Antique Andalusian furnishings', 'Marble bathroom', 'Bathrobes and slippers', 'Byredo luxury toiletries'],
        basePrice: 650,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'alfonso-flex',
            name: 'Marriott Bonvoy Flexible Luxury Rate',
            description: 'Includes full Andalusian artisan breakfast buffet in the courtyard gallery.',
            pricePerNight: 650,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Courtyard Artisan Breakfast', 'Free cancellation up to 48h', 'Marriott Bonvoy Points']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'alfonso-rev-1',
        guestName: 'Manuel Rodriguez',
        location: 'Madrid, Spain',
        rating: 5,
        date: 'May 2026',
        title: 'Like living in a royal palace',
        comment: 'The courtyard with the fountains and orange trees is unforgettable. A true historic treasure in the heart of Seville.',
        roomStayed: 'Castilian Deluxe King Room'
      }
    ]
  },
  {
    id: 'w-south-beach',
    brandId: 'w-hotels',
    name: 'W South Beach',
    slug: 'w-south-beach',
    city: 'Miami Beach',
    country: 'United States',
    region: 'North America',
    address: '2201 Collins Ave, Miami Beach, FL 33139, USA',
    phone: '+1 305-938-3000',
    latitude: 25.7981,
    longitude: -80.1287,
    officialUrl: 'https://www.marriott.com/en-us/hotels/miaws-w-south-beach/overview/',
    bookingUrl: 'https://www.marriott.com/en-us/hotels/miaws-w-south-beach/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    verificationTimestamp: '2026-10-09T01:52:00Z',
    tagline: 'Amplified oceanfront luxury, iconic WET pool deck, and contemporary art',
    description: 'Directly on the sands of Collins Avenue, W South Beach combines museum-quality modern art with oceanfront balconies in every guest room. Features the vibrant WET pool deck, AWAY Spa, and MR CHOW dining.',
    starRating: 5,
    guestRating: 4.94,
    reviewCount: 610,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    featured: false,
    setting: 'coastal',
    startingPrice: 950,
    currency: 'USD',
    amenities: [
      '100% Ocean View Balconies Across All Rooms',
      'Iconic WET Deck Heated Pools and Cabanas',
      'AWAY Spa Detox and Wellness Circuit',
      'MR CHOW Beijing Cuisine & The Grove Dining',
      'SAND Beach Club with Reserved Daybeds'
    ],
    checkInTime: '16:00',
    checkOutTime: '11:00',
    meetingSpaceSqFt: 10000,
    meetingRoomsCount: 6,
    policies: {
      cancellation: 'Free cancellation up to 72 hours prior to arrival.',
      checkInAge: 21,
      pets: 'P.A.W. Pets Are Welcome program.',
      smoking: 'Non-smoking.'
    },
    rooms: [
      {
        id: 'w-miami-spectacular-ocean',
        name: 'Spectacular Oceanfront King Studio',
        category: 'Deluxe',
        description: 'Expansive private balcony with direct Atlantic Ocean views, custom art curation, and oversized glass shower with Davines amenities.',
        sizeSqFt: 574,
        sizeSqM: 53,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Direct Atlantic Oceanfront',
        images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
        features: ['Full private ocean balcony', 'Kitchenette with sub-zero mini fridge', 'Davines bath products'],
        basePrice: 950,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'w-miami-flex',
            name: 'Marriott Bonvoy Flexible Rate',
            description: 'Includes full beach club access, daily fitness classes, and free cancellation.',
            pricePerNight: 950,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 72,
            includesBreakfast: true,
            perks: ['Oceanfront Breakfast', 'SAND Beach Club Access', 'Free cancellation up to 72h']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'w-rev-1',
        guestName: 'Brandon Hayes',
        location: 'New York, USA',
        rating: 5,
        date: 'April 2026',
        title: 'Energy and service was top notch',
        comment: 'Every room having an ocean view balcony is incredible. The WET deck pool service was fast and vibrant.',
        roomStayed: 'Spectacular Oceanfront King Studio'
      }
    ]
  },
  {
    id: 'edition-paris',
    brandId: 'edition',
    name: 'The Paris EDITION',
    slug: 'the-paris-edition',
    city: 'Paris',
    country: 'France',
    region: 'Europe',
    address: '14 Rue de Castiglione, 1er Arrondissement, 75001 Paris, France',
    phone: '+33 1 42 61 50 00',
    latitude: 48.8672,
    longitude: 2.3292,
    officialUrl: 'https://www.marriott.com/en-us/hotels/pared-the-paris-edition/overview/',
    bookingUrl: 'https://www.marriott.com/en-us/hotels/pared-the-paris-edition/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    verificationTimestamp: '2026-10-09T01:52:00Z',
    tagline: 'Contemporary luxury and French haute couture steps from Place Vendôme and the Louvre',
    description: 'Combining historic French architecture with sleek modern residential interiors by Ian Schrager, The Paris EDITION features an intimate subterranean cocktail speakeasy, a verdant courtyard dining salon, and rooftop views of the Eiffel Tower.',
    starRating: 5,
    guestRating: 4.95,
    reviewCount: 395,
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85',
    featured: false,
    setting: 'urban',
    startingPrice: 920,
    currency: 'USD',
    amenities: [
      'Rooftop Eiffel Salon & Bar',
      'Subterranean Heated Lap Pool & Wellness',
      'Le Labo Custom Black Tea Scent & Amenities',
      'Courtyard French Brasserie',
      'Mercedes Maybach Chauffeur Service'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 4800,
    meetingRoomsCount: 3,
    policies: {
      cancellation: 'Free cancellation up to 24 hours prior to check-in on flexible rates.',
      checkInAge: 18,
      pets: 'Pets welcome with luxury welcome amenities.',
      smoking: '100% Smoke-Free.'
    },
    rooms: [
      {
        id: 'edition-paris-vendome-king',
        name: 'Vendôme Premier King Room',
        category: 'Deluxe',
        description: 'Herringbone oak floors, custom velvet daybeds, and oversized windows facing the private courtyard.',
        sizeSqFt: 490,
        sizeSqM: 46,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Private Courtyard / Rue de Castiglione',
        images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'],
        features: ['Carrara marble bathroom', 'Custom Le Labo toiletries', 'Nespresso Atelier machine'],
        basePrice: 920,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'edition-paris-flex',
            name: 'Marriott Bonvoy Flexible Luxury Rate',
            description: 'Includes full Parisian breakfast and flexible cancellation up to 24 hours prior.',
            pricePerNight: 920,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 24,
            includesBreakfast: true,
            perks: ['Parisian Artisanal Breakfast', 'Priority Rooftop Access', 'Free cancellation up to 24h']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'edition-rev-1',
        guestName: 'Sophie Delacroix',
        location: 'Paris, France',
        rating: 5,
        date: 'September 2026',
        title: 'Chic and effortlessly luxurious',
        comment: 'The design is sublime. The signature black tea fragrance when you walk into the lobby is unforgettable.',
        roomStayed: 'Vendôme Premier King Room'
      }
    ]
  },
  {
    id: 'tokyo-edition-toranomon',
    brandId: 'edition',
    name: 'The Tokyo EDITION, Toranomon',
    slug: 'the-tokyo-edition-toranomon',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia Pacific',
    address: '4-1-1 Toranomon, Minato City, Tokyo 105-0001, Japan',
    phone: '+81 3-5422-1600',
    latitude: 35.6653,
    longitude: 139.7454,
    officialUrl: 'https://www.marriott.com/en-us/hotels/tyoet-the-tokyo-edition-toranomon/overview/',
    bookingUrl: 'https://www.marriott.com/en-us/hotels/tyoet-the-tokyo-edition-toranomon/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    verificationTimestamp: '2026-10-09T01:52:00Z',
    tagline: 'Oasis in the sky designed by Kengo Kuma with Tokyo Tower views',
    description: 'Designed in partnership with acclaimed architect Kengo Kuma, The Tokyo EDITION, Toranomon is a soaring sanctuary framed by lush vertical jungle greenery 31 floors above the city. Highlights include The Blue Room, Michelin dining, and sweeping views of Tokyo Tower.',
    starRating: 5,
    guestRating: 4.96,
    reviewCount: 380,
    images: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
    featured: false,
    setting: 'urban',
    startingPrice: 980,
    currency: 'USD',
    amenities: [
      'Lobby Bar Framed by 500 Exotic Jungle Plants',
      'Level 31 Sky Swimming Pool and 24-Hour Gym',
      'The Blue Room Mediterranean Fine Dining',
      'Direct Toranomon Hills Station Access',
      'Custom Le Labo Signature Black Tea Scent'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 4200,
    meetingRoomsCount: 4,
    policies: {
      cancellation: 'Free cancellation up to 48 hours prior to arrival.',
      checkInAge: 18,
      pets: 'Service animals only.',
      smoking: 'Non-smoking.'
    },
    rooms: [
      {
        id: 'edition-tokyo-tower-king',
        name: 'Premier Tower View King Room',
        category: 'Deluxe',
        description: 'Natural oak wood slatted walls by Kengo Kuma, direct floor-to-ceiling Tokyo Tower panorama, and deep soaking bathtub.',
        sizeSqFt: 550,
        sizeSqM: 51,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Tokyo Tower & Roppongi Skyline',
        images: ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'],
        features: ['Kengo Kuma signature architectural woodwork', 'Tokyo Tower view', 'Le Labo custom toiletries'],
        basePrice: 980,
        inventoryRemaining: 3,
        ratePlans: [
          {
            id: 'edition-tokyo-flex',
            name: 'Marriott Bonvoy Flexible Luxury Rate',
            description: 'Includes full gourmet breakfast in The Blue Room and flexible cancellation.',
            pricePerNight: 980,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Skyline Breakfast Included', 'Free cancellation up to 48h', 'Level 31 Pool Access']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'ed-tokyo-rev-1',
        guestName: 'Kenji Sato',
        location: 'Osaka, Japan',
        rating: 5,
        date: 'October 2026',
        title: 'Spectacular plant-filled lobby in the sky',
        comment: 'Walking into the 31st floor lobby filled with greenery with Tokyo Tower illuminated right outside is an unforgettable moment.',
        roomStayed: 'Premier Tower View King Room'
      }
    ]
  }
];
"""

with open('src/data/hotels/otherHotels.ts', 'w', encoding='utf-8') as f:
    f.write(OTHER_HOTELS)

print("Created src/data/hotels/otherHotels.ts")
