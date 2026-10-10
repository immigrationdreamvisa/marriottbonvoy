import { Property } from '../types';

export const PROPERTIES: Property[] = [
  {
    id: 'ritz-carlton-kyoto',
    brandId: 'the-ritz-carlton',
    name: 'The Ritz-Carlton, Kyoto',
    slug: 'the-ritz-carlton-kyoto',
    city: 'Kyoto',
    country: 'Japan',
    region: 'Kansai',
    address: 'Kamogawa Nijo-Ohashi Hotori, Nakagyo Ward, Kyoto 604-0902, Japan',
    phone: '+81 75-746-5555',
    latitude: 35.0116,
    longitude: 135.7702,
    officialUrl: 'https://www.marriott.com/en-us/hotels/ukyrz-the-ritz-carlton-kyoto/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Tranquil luxury set along the gentle banks of the historic Kamogawa River',
    description: 'Honoring the cultural heritage of Japan’s ancient capital, The Ritz-Carlton, Kyoto blends traditional Meiji-period craftsmanship with contemporary five-star luxury. Features tatami dining salons, Michelin-starred tempura, an underground Zen pool, and panoramic vistas of the Higashiyama mountains.',
    starRating: 5,
    guestRating: 4.98,
    reviewCount: 420,
    images: [
      '/hotels/rc-kyoto-exterior.jpg',
      '/hotels/rc-kyoto-garden.jpg'
    ],
    heroImage: '/hotels/rc-kyoto-exterior.jpg',
    featured: true,
    setting: 'coastal',
    startingPrice: 1350,
    currency: 'USD',
    amenities: [
      'Private Kamogawa River Balconies',
      'Michelin-Starred Tempura Mizuki',
      'The Ritz-Carlton Spa with Hinoki Baths',
      'Complimentary Cultural Art Tours',
      'Dedicated Omotenashi Concierge',
      'Pierre Hermé Paris Pastry Boutique'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 5400,
    meetingRoomsCount: 4,
    policies: {
      cancellation: 'Complimentary cancellation up to 48 hours prior to arrival for flexible rates.',
      checkInAge: 18,
      pets: 'Service animals welcome.',
      smoking: '100% Smoke-Free Property.'
    },
    rooms: [
      {
        id: 'rc-kyoto-deluxe-kamogawa',
        name: 'Grand Deluxe Kamogawa River View',
        category: 'Deluxe',
        description: 'Serene master bedroom featuring floor-to-ceiling windows looking directly over the Kamogawa River and Higashiyama hills, adorned with Japanese shoji screens.',
        sizeSqFt: 590,
        sizeSqM: 55,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Kamogawa River & Higashiyama Mountains',
        images: ['/hotels/rc-kyoto-garden.jpg'],
        features: ['Bonsai garden terrace view', 'Kyoto ceramic tea master set', 'Deep soaking granite tub', 'Asprey Purple Water amenities'],
        basePrice: 1350,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'rc-kyoto-flex',
            name: 'Marriott Bonvoy Flexible Luxury Rate',
            description: 'Includes daily gourmet Japanese or American breakfast and complimentary cancellation up to 48 hours before check-in.',
            pricePerNight: 1350,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Gourmet Kyoto Breakfast Buffet', 'Free cancellation up to 48h', 'Marriott Bonvoy Bonus Points']
          },
          {
            id: 'rc-kyoto-advance',
            name: 'Member Advance Purchase (15% Off)',
            description: 'Prepaid rate reserved for early planners with exclusive savings.',
            pricePerNight: 1147,
            originalPricePerNight: 1350,
            cancellationPolicy: 'non-refundable',
            cancellationDeadlineHours: 0,
            includesBreakfast: true,
            perks: ['15% Member Savings', 'Breakfast Included', 'Arrival Japanese Sweet Welcome']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rc-rev-1',
        guestName: 'William Harrison',
        location: 'London, UK',
        rating: 5,
        date: 'September 2026',
        title: 'An unmatched standard of hospitality',
        comment: 'The Ladies and Gentlemen at The Ritz-Carlton Kyoto anticipated our every wish. Looking out at the river during morning tea was transcendental.',
        roomStayed: 'Grand Deluxe Kamogawa River View'
      }
    ]
  },
  {
    id: 'ritz-carlton-half-moon-bay',
    brandId: 'the-ritz-carlton',
    name: 'The Ritz-Carlton, Half Moon Bay',
    slug: 'the-ritz-carlton-half-moon-bay',
    city: 'Half Moon Bay',
    country: 'United States',
    region: 'California',
    address: '1 Miramontes Point Rd, Half Moon Bay, CA 94019, USA',
    phone: '+1 650-712-7000',
    latitude: 37.4326,
    longitude: -122.4411,
    officialUrl: 'https://www.marriott.com/en-us/hotels/sforz-the-ritz-carlton-half-moon-bay/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Perched high on a secluded ocean bluff overlooking the rugged California coast',
    description: 'Set on rugged cliffs overlooking the Pacific Ocean, this romantic seaside resort pairs Scottish baronial architecture with Northern California wine-country warmth. Enjoy sunset bagpiper melodies by the outdoor fire pits and championship coastal links golf.',
    starRating: 5,
    guestRating: 4.96,
    reviewCount: 512,
    images: [
      '/hotels/rc-hmb-lodge.jpg',
      '/hotels/rc-hmb-lawn.jpg',
      '/hotels/rc-hmb-cliffs.jpg'
    ],
    heroImage: '/hotels/rc-hmb-lodge.jpg',
    featured: true,
    setting: 'coastal',
    startingPrice: 1150,
    currency: 'USD',
    amenities: [
      'Oceanfront Fire Pit Terraces',
      'Two Championship 18-Hole Golf Courses',
      'The Ritz-Carlton Spa with Coastal Mineral Treatments',
      'Navio Oceanview Coastal Dining',
      'Evening Scottish Bagpiper Ceremony'
    ],
    checkInTime: '16:00',
    checkOutTime: '11:00',
    meetingSpaceSqFt: 17000,
    meetingRoomsCount: 12,
    policies: {
      cancellation: 'Free cancellation up to 72 hours prior to arrival.',
      checkInAge: 21,
      pets: 'Dog friendly in terrace fire-pit rooms.',
      smoking: 'Non-smoking.'
    },
    rooms: [
      {
        id: 'rc-hmb-ocean-king',
        name: 'Ocean Bluff King with Fire Pit',
        category: 'Deluxe',
        description: 'Private ground-floor patio with gas fire pit facing the Pacific Ocean sunset, plush feather beds, and marble deep-soaking bath.',
        sizeSqFt: 550,
        sizeSqM: 51,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Pacific Ocean Bluff View',
        images: ['/hotels/rc-hmb-lawn.jpg'],
        features: ['Personal outdoor fire pit', 'Marble bathroom with soaking tub', 'Nespresso machine', 'Asprey bath amenities'],
        basePrice: 1150,
        inventoryRemaining: 3,
        ratePlans: [
          {
            id: 'rc-hmb-flex',
            name: 'Marriott Bonvoy Flexible Luxury Rate',
            description: 'Includes artisanal breakfast in Navio and flexible cancellation.',
            pricePerNight: 1150,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 72,
            includesBreakfast: true,
            perks: ['Full American Breakfast', 'Free cancellation up to 72h', 'Bonvoy Elite Night Credit']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'hmb-rev-1',
        guestName: 'Jessica Miller',
        location: 'San Francisco, USA',
        rating: 5,
        date: 'August 2026',
        title: 'Breathtaking coastal views',
        comment: 'Sitting by the private fire pit with wine while the bagpiper played at sunset was an unforgettable evening.',
        roomStayed: 'Ocean Bluff King with Fire Pit'
      }
    ]
  },
  {
    id: 'ritz-carlton-tokyo',
    brandId: 'the-ritz-carlton',
    name: 'The Ritz-Carlton, Tokyo',
    slug: 'the-ritz-carlton-tokyo',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Kanto',
    address: 'Tokyo Midtown, 9-7-1 Akasaka, Minato City, Tokyo 107-6245, Japan',
    phone: '+81 3-3423-8000',
    latitude: 35.6657,
    longitude: 139.7305,
    officialUrl: 'https://www.marriott.com/en-us/hotels/tyorz-the-ritz-carlton-tokyo/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Sky-high elegance occupying the top floors of Midtown Tower in Roppongi',
    description: 'Elevated across the top nine floors of Tokyo Midtown Tower, this urban flagship commands magnificent vistas of Tokyo Tower, Roppongi, and Mount Fuji. Features seven dining venues including Michelin-starred Azure 45 and a sky-high spa sanctuary.',
    starRating: 5,
    guestRating: 4.97,
    reviewCount: 680,
    images: [
      '/hotels/rc-tokyo-midtown.jpg',
      '/hotels/rc-tokyo-tower-top.jpg',
      '/hotels/rc-tokyo-residences.jpg'
    ],
    heroImage: '/hotels/rc-tokyo-midtown.jpg',
    featured: false,
    setting: 'urban',
    startingPrice: 1280,
    currency: 'USD',
    amenities: [
      'Level 53 The Ritz-Carlton Club Lounge',
      'Level 46 Indoor Heated Sky Pool and Jacuzzi',
      'Michelin-Starred Azure 45 French Dining',
      'Traditional Japanese Hinokizaka Teppanyaki',
      'Direct Undercover Access to Roppongi Station'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 12000,
    meetingRoomsCount: 8,
    policies: {
      cancellation: 'Free cancellation up to 48 hours prior to arrival.',
      checkInAge: 18,
      pets: 'Service animals only.',
      smoking: 'Non-smoking.'
    },
    rooms: [
      {
        id: 'rc-tokyo-club-deluxe',
        name: 'Club Deluxe Room with Tokyo Tower View',
        category: 'Deluxe',
        description: 'Level 52 panoramic room with direct views of Tokyo Tower, including exclusive Club Lounge access with five daily culinary presentations.',
        sizeSqFt: 560,
        sizeSqM: 52,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Tokyo Tower & Skyline Panorama',
        images: ['/hotels/rc-tokyo-tower-top.jpg'],
        features: ['The Ritz-Carlton Club Level privileges', 'Dual marble vanity', 'Deep soaking tub', 'Frette bed linens'],
        basePrice: 1280,
        inventoryRemaining: 3,
        ratePlans: [
          {
            id: 'rc-tokyo-flex',
            name: 'Marriott Bonvoy Flexible Club Rate',
            description: 'Includes complete Club Lounge culinary presentations (breakfast, afternoon tea, evening cocktails).',
            pricePerNight: 1280,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Level 53 Club Access Included', 'Complimentary Evening Cocktails', 'Free cancellation up to 48h']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'tokyo-rc-rev-1',
        guestName: 'Richard Tan',
        location: 'Singapore',
        rating: 5,
        date: 'July 2026',
        title: 'Unrivaled views of Tokyo',
        comment: 'The Club Lounge on the 53rd floor offers the finest afternoon tea in Tokyo. Tokyo Tower glowing at night was mesmerizing.',
        roomStayed: 'Club Deluxe Room with Tokyo Tower View'
      }
    ]
  },
  {
    id: 'jw-marriott-venice',
    brandId: 'jw-marriott',
    name: 'JW Marriott Venice Resort & Spa',
    slug: 'jw-marriott-venice-resort-and-spa',
    city: 'Venice',
    country: 'Italy',
    region: 'Veneto',
    address: 'Isola delle Rose, Laguna di San Marco, 30133 Venice, Italy',
    phone: '+39 041 852 1300',
    latitude: 45.4055,
    longitude: 12.3168,
    officialUrl: 'https://www.marriott.com/en-us/hotels/vcejw-jw-marriott-venice-resort-and-spa/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'A private island oasis of gardens, olive groves, and Michelin gastronomy in the Venetian Lagoon',
    description: 'Set on its own private 40-acre island, Isola delle Rose, JW Marriott Venice is a peaceful sanctuary minutes by private shuttle boat from St. Mark’s Square. Featuring centuries-old olive groves, the acclaimed Spa by JW, rooftop infinity pool with skyline views, and lush JW Gardens.',
    starRating: 5,
    guestRating: 4.96,
    reviewCount: 510,
    images: [
      '/hotels/jw-venice-resort-spa.jpg',
      '/hotels/jw-venice-private-island.jpg',
      '/hotels/jw-venice-lagoon-boat.jpg'
    ],
    heroImage: '/hotels/jw-venice-resort-spa.jpg',
    featured: true,
    setting: 'coastal',
    startingPrice: 890,
    currency: 'USD',
    amenities: [
      'Complimentary Private Shuttle Boat to St. Mark’s Square',
      'Rooftop Infinity Pool with Panoramic Venice Skyline Views',
      'Award-Winning Spa by JW with Heated Indoor/Outdoor Pool',
      'JW Garden Olive Grove Cooking Masterclasses',
      'Family by JW Children’s Club & Garden Maze',
      'Fiola at Dopolavoro Michelin Fine Dining'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 14000,
    meetingRoomsCount: 6,
    policies: {
      cancellation: 'Free cancellation up to 48 hours prior to arrival on flexible rates.',
      checkInAge: 18,
      pets: 'Small pets allowed with advance notice.',
      smoking: 'Non-smoking.'
    },
    rooms: [
      {
        id: 'jw-venice-deluxe-room',
        name: 'JW Rose Island Deluxe Room',
        category: 'Deluxe',
        description: 'Bathed in natural lagoon light with warm oak floors, private balcony overlooking the parklands, and luxurious marble bathroom.',
        sizeSqFt: 520,
        sizeSqM: 48,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Private Island Park & Lagoon',
        images: ['/hotels/jw-venice-private-island.jpg'],
        features: ['Private furnished balcony', 'Aromatherapy Associates bath amenities', 'Nespresso coffee machine'],
        basePrice: 890,
        inventoryRemaining: 5,
        ratePlans: [
          {
            id: 'jw-venice-flex',
            name: 'Marriott Bonvoy Flexible Luxury Rate',
            description: 'Includes full Venetian artisan breakfast buffet and complimentary private boat transfers to St. Mark’s Square.',
            pricePerNight: 890,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Venetian Artisan Breakfast', 'Free Private Boat Shuttle', 'Free cancellation up to 48h']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'jw-rev-1',
        guestName: 'Marc Dubois',
        location: 'Geneva, Switzerland',
        rating: 5,
        date: 'September 2026',
        title: 'The perfect Venetian escape',
        comment: 'Having your own private island to return to after walking through crowded Venice is heavenly. The rooftop pool at sunset is unbeatable.',
        roomStayed: 'JW Rose Island Deluxe Room'
      }
    ]
  },
  {
    id: 'ritz-carlton-hong-kong',
    brandId: 'the-ritz-carlton',
    name: 'The Ritz-Carlton, Hong Kong',
    slug: 'the-ritz-carlton-hong-kong',
    city: 'Hong Kong',
    country: 'Hong Kong SAR',
    region: 'Kowloon',
    address: 'International Commerce Centre, 1 Austin Road West, Kowloon, Hong Kong',
    phone: '+852 2263-2263',
    latitude: 22.3034,
    longitude: 114.1602,
    officialUrl: 'https://www.marriott.com/en-us/hotels/hkgkw-the-ritz-carlton-hong-kong/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'The world’s highest hotel perched atop the International Commerce Centre',
    description: 'Occupying floors 102 to 118 of the International Commerce Centre, The Ritz-Carlton, Hong Kong commands breathtaking 360-degree panoramas of Victoria Harbour and Hong Kong Island. Features Michelin two-starred Tin Lung Heen, Michelin-starred Tosca di Angelo, and Ozone rooftop lounge on the 118th floor.',
    starRating: 5,
    guestRating: 4.97,
    reviewCount: 1540,
    images: [
      '/hotels/rc-hkg-entrance.jpg',
      '/hotels/rc-hkg-exterior.jpg',
      '/hotels/rc-hkg-icc-tower.jpg'
    ],
    heroImage: '/hotels/rc-hkg-entrance.jpg',
    featured: true,
    setting: 'urban',
    startingPrice: 850,
    currency: 'USD',
    amenities: [
      'Ozone Rooftop Lounge on Level 118 (World’s Highest Bar)',
      'Tin Lung Heen Two-Michelin-Starred Cantonese Fine Dining',
      'Indoor Infinity Swimming Pool with Ceiling LED Screens on Level 118',
      'The Ritz-Carlton Spa with ESPA Caviar Treatments on Level 116',
      'Ritz-Carlton Club Lounge with 24-Hour Harbour Vistas'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 17000,
    meetingRoomsCount: 6,
    policies: {
      cancellation: 'Free cancellation up to 48 hours prior to arrival on flexible rates.',
      checkInAge: 18,
      pets: 'Service animals welcome.',
      smoking: '100% Smoke-Free Property.'
    },
    rooms: [
      {
        id: 'rc-hkg-harbour-king',
        name: 'Grand Victoria Harbour View King',
        category: 'Deluxe',
        description: 'Level 108 panoramic room commanding sweeping vistas across Victoria Harbour and the Hong Kong skyline, 600-thread-count linens, and marble deep-soaking bathtub.',
        sizeSqFt: 540,
        sizeSqM: 50,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Victoria Harbour & Hong Kong Island Skyline',
        images: ['/hotels/rc-hkg-exterior.jpg'],
        features: ['Victoria Harbour panoramic view', 'Marble bathroom with 22-inch mirror TV', 'Nespresso coffee machine', 'Asprey London toiletries'],
        basePrice: 850,
        inventoryRemaining: 3,
        ratePlans: [
          {
            id: 'rc-hkg-flex',
            name: 'Marriott Bonvoy Flexible Luxury Rate',
            description: 'Includes full gourmet breakfast and flexible 48-hour cancellation.',
            pricePerNight: 850,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Gourmet Breakfast Included', 'Free cancellation up to 48h', 'Marriott Bonvoy Elite Night Credit']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rc-hkg-rev-1',
        guestName: 'Edmund Chen',
        location: 'Singapore',
        rating: 5,
        date: 'October 2026',
        title: 'Floating above the clouds of Hong Kong',
        comment: 'Swimming in the infinity pool on the 118th floor while watching the sunset over Victoria Harbour was once in a lifetime.',
        roomStayed: 'Grand Victoria Harbour View King'
      }
    ]
  },
  {
    id: 'ritz-carlton-dubai',
    brandId: 'the-ritz-carlton',
    name: 'The Ritz-Carlton, Dubai',
    slug: 'the-ritz-carlton-dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Dubai Marina / JBR',
    address: 'The Walk, Jumeirah Beach Residence, Dubai, UAE',
    phone: '+971 4-399-4000',
    latitude: 25.0772,
    longitude: 55.1325,
    officialUrl: 'https://www.marriott.com/en-us/hotels/dxbrz-the-ritz-carlton-dubai/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Mediterranean-style beachfront oasis situated on private Arabian Gulf shores at JBR',
    description: 'Set on private white sands along the bustling JBR Walk, The Ritz-Carlton, Dubai blends low-rise Mediterranean architecture with Middle Eastern hospitality. Features six swimming pools, private cabanas, The Ritz-Carlton Spa with hammam, and beachfront dining at Tamoka.',
    starRating: 5,
    guestRating: 4.95,
    reviewCount: 1280,
    images: [
      '/hotels/rc-dubai-jbr-beach.jpg',
      '/hotels/rc-dubai-coastline.jpg',
      '/hotels/rc-dubai-shoreline.jpg'
    ],
    heroImage: '/hotels/rc-dubai-jbr-beach.jpg',
    featured: true,
    setting: 'coastal',
    startingPrice: 920,
    currency: 'USD',
    amenities: [
      'Private 350-Meter White Sand Arabian Gulf Beach',
      '6 Heated Outdoor Pools with Adult & Family Zones',
      'Tamoka Beachside Latin Coastal Dining & Bar',
      'The Ritz-Carlton Spa with Signature Rose Aromatherapy',
      'Ritz Kids Club with Dedicated Children’s Pool & Water Slide'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 22000,
    meetingRoomsCount: 8,
    policies: {
      cancellation: 'Free cancellation up to 72 hours prior to check-in.',
      checkInAge: 21,
      pets: 'No pets allowed.',
      smoking: 'Designated outdoor areas only.'
    },
    rooms: [
      {
        id: 'rc-dxb-deluxe-gulf',
        name: 'Deluxe Gulf View King Room with Balcony',
        category: 'Deluxe',
        description: 'Private furnished balcony directly facing the Arabian Gulf and Dubai Ain, marble soaking bath, and walk-in wardrobe.',
        sizeSqFt: 540,
        sizeSqM: 50,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Arabian Gulf Sea & Palm Jumeirah',
        images: ['/hotels/rc-dubai-coastline.jpg'],
        features: ['Arabian Gulf view balcony', 'Marble bathroom with soaking tub', 'Asprey bath amenities'],
        basePrice: 920,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'rc-dxb-reconnect',
            name: 'The Ritz-Carlton Reconnect Package',
            description: 'Includes daily gourmet breakfast for two and $150 daily resort and spa credit.',
            pricePerNight: 920,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 72,
            includesBreakfast: true,
            perks: ['Daily $150 Resort Credit', 'Full Breakfast Buffet', 'Private Beach Cabana Access']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rc-dxb-rev-1',
        guestName: 'Tariq Al-Mansoor',
        location: 'Riyadh, Saudi Arabia',
        rating: 5,
        date: 'October 2026',
        title: 'True beachfront tranquility in Dubai',
        comment: 'Unlike towering glass hotels, this low-rise garden resort feels like a peaceful Mediterranean paradise right on the beach.',
        roomStayed: 'Deluxe Gulf View King Room with Balcony'
      }
    ]
  },
  {
    id: 'ritz-carlton-kapalu-maui',
    brandId: 'the-ritz-carlton',
    name: 'The Ritz-Carlton Maui, Kapalua',
    slug: 'the-ritz-carlton-maui-kapalua',
    city: 'Kapalua',
    country: 'United States',
    region: 'Hawaii',
    address: '1 Ritz Carlton Dr, Kapalua, Maui, HI 96761, USA',
    phone: '+1 808-669-6200',
    latitude: 21.0028,
    longitude: -156.6542,
    officialUrl: 'https://www.marriott.com/en-us/hotels/jhmlz-the-ritz-carlton-maui-kapalua/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Sacred coastal sanctuary nestled amidst 54 oceanfront acres in Kapalua Resort',
    description: 'Surrounded by historic pine trees and protected marine sanctuaries, The Ritz-Carlton Maui, Kapalua honors Hawaiian culture with open-air architecture, three-tier heated pool, two championship golf courses including the PGA Tour Plantation Course, and the serene Spa with botanical treatments.',
    starRating: 5,
    guestRating: 4.96,
    reviewCount: 940,
    images: [
      '/hotels/rc-maui-resort.jpg',
      '/hotels/rc-maui-ocean-walk.jpg',
      '/hotels/rc-maui-pools.jpg'
    ],
    heroImage: '/hotels/rc-maui-resort.jpg',
    featured: true,
    setting: 'coastal',
    startingPrice: 1250,
    currency: 'USD',
    amenities: [
      'Three-Tier 10,000 Sq Ft Heated Oceanfront Swimming Pool',
      'Two Championship 18-Hole Golf Courses (PGA Plantation Course)',
      'The Ritz-Carlton Spa with Indigenous Hawaiian Lomilomi',
      'Direct Access to D.T. Fleming Beach',
      'Jean-Michel Cousteau’s Ambassadors of the Environment'
    ],
    checkInTime: '16:00',
    checkOutTime: '11:00',
    meetingSpaceSqFt: 30000,
    meetingRoomsCount: 14,
    policies: {
      cancellation: 'Free cancellation up to 72 hours prior to arrival.',
      checkInAge: 21,
      pets: 'Service animals only.',
      smoking: 'Non-smoking resort.'
    },
    rooms: [
      {
        id: 'rc-maui-ocean-king',
        name: 'Kapalua Ocean View Deluxe King',
        category: 'Deluxe',
        description: 'Private furnished lanai with sweeping Pacific Ocean and Molokai island vistas, dark wood island furnishings, and marble bath.',
        sizeSqFt: 520,
        sizeSqM: 48,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Pacific Ocean & Molokai Island',
        images: ['/hotels/rc-maui-ocean-walk.jpg'],
        features: ['Private furnished lanai', 'Deep soaking tub and separate shower', 'Asprey luxury bath amenities'],
        basePrice: 1250,
        inventoryRemaining: 3,
        ratePlans: [
          {
            id: 'rc-maui-reconnect',
            name: 'The Ritz-Carlton Reconnect Package',
            description: 'Includes daily gourmet island breakfast for two and $150 daily resort credit.',
            pricePerNight: 1250,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 72,
            includesBreakfast: true,
            perks: ['Daily $150 Resort Credit', 'Full Island Breakfast', 'Beach Daybed Privileges']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rc-maui-rev-1',
        guestName: 'Jonathan Davis',
        location: 'Seattle, USA',
        rating: 5,
        date: 'September 2026',
        title: 'Kapalua magic at its finest',
        comment: 'The morning cultural oli chant and the sunset views from the pool deck facing Molokai are pure Hawaiian bliss.',
        roomStayed: 'Kapalua Ocean View Deluxe King'
      }
    ]
  },
  {
    id: 'ritz-carlton-vienna',
    brandId: 'the-ritz-carlton',
    name: 'The Ritz-Carlton, Vienna',
    slug: 'the-ritz-carlton-vienna',
    city: 'Vienna',
    country: 'Austria',
    region: 'Vienna',
    address: 'Schubertring 5-7, 1010 Vienna, Austria',
    phone: '+43 1 311 88',
    latitude: 48.2018,
    longitude: 16.3754,
    officialUrl: 'https://www.marriott.com/en-us/hotels/vierz-the-ritz-carlton-vienna/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Four historic 19th-century Ringstrasse palaces combined into one aristocratic retreat',
    description: 'Located directly on Vienna’s famous Schubertring boulevard, The Ritz-Carlton, Vienna occupies four historic 19th-century heritage palaces. Features D-bar, Dstrikt Steakhouse with Austrian beef, an indoor pool with underwater music, and the panoramic Atmosphere Rooftop Bar.',
    starRating: 5,
    guestRating: 4.95,
    reviewCount: 780,
    images: [
      '/hotels/rc-vienna-palace-facade.jpg',
      '/hotels/rc-vienna-palais-gutmann.jpg'
    ],
    heroImage: '/hotels/rc-vienna-palace-facade.jpg',
    featured: false,
    setting: 'urban',
    startingPrice: 680,
    currency: 'EUR',
    amenities: [
      'Historic 19th-Century Ringstrasse Palace Setting',
      'Atmosphere Rooftop Bar with St. Stephen’s Cathedral Views',
      'Heated 18-Meter Indoor Pool with Underwater Classical Music',
      'The Ritz-Carlton Spa with Susanne Kaufmann Organic Treatments',
      'Dstrikt Farm-to-Table Steakhouse'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 11000,
    meetingRoomsCount: 6,
    policies: {
      cancellation: 'Free cancellation up to 24 hours prior to arrival on flexible rates.',
      checkInAge: 18,
      pets: 'Small pets allowed.',
      smoking: '100% Smoke-Free Property.'
    },
    rooms: [
      {
        id: 'rc-vie-palace-deluxe',
        name: 'Palace Deluxe King Room',
        category: 'Deluxe',
        description: 'Soaring ceilings, handcrafted Austrian woodwork, heated marble bathroom floors, and vistas over the Stadtpark and Ringstrasse.',
        sizeSqFt: 480,
        sizeSqM: 45,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Historic Ringstrasse Boulevard & Stadtpark',
        images: ['/hotels/rc-vienna-palais-gutmann.jpg'],
        features: ['Soaring heritage palace ceilings', 'Heated marble bathroom floors', 'Susanne Kaufmann bath amenities'],
        basePrice: 680,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'rc-vie-bnb',
            name: 'The Ritz-Carlton Bed & Breakfast Experience',
            description: 'Includes full gourmet Viennese breakfast and flexible cancellation.',
            pricePerNight: 680,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 24,
            includesBreakfast: true,
            perks: ['Viennese Artisan Breakfast', 'Free cancellation up to 24h', 'Bonvoy Elite Night Credit']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rc-vie-rev-1',
        guestName: 'Franziska Bauer',
        location: 'Munich, Germany',
        rating: 5,
        date: 'August 2026',
        title: 'Aristocratic charm in the heart of Vienna',
        comment: 'The underwater classical music in the pool is such a charming Viennese touch. The view from Atmosphere Rooftop Bar is sensational.',
        roomStayed: 'Palace Deluxe King Room'
      }
    ]
  },
  {
    id: 'jw-marriott-dubai-marquis',
    brandId: 'jw-marriott',
    name: 'JW Marriott Marquis Hotel Dubai',
    slug: 'jw-marriott-marquis-hotel-dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Business Bay',
    address: 'Sheikh Zayed Road, Business Bay, Dubai, UAE',
    phone: '+971 4-414-0000',
    latitude: 25.1856,
    longitude: 55.2575,
    officialUrl: 'https://www.marriott.com/en-us/hotels/dxbjw-jw-marriott-marquis-hotel-dubai/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Iconic twin-tower luxury landmark and world’s tallest 5-star hotel in Business Bay',
    description: 'Comprising two striking 72-story towers soaring 355 meters above Sheikh Zayed Road, JW Marriott Marquis Hotel Dubai delivers spectacular Burj Khalifa and Dubai Water Canal views, 15 award-winning restaurants and lounges, and the tranquil Saray Spa.',
    starRating: 5,
    guestRating: 4.93,
    reviewCount: 3200,
    images: [
      '/hotels/jw-dubai-marquis-towers.jpg',
      '/hotels/jw-dubai-marquis-waterway.jpg',
      '/hotels/jw-dubai-marquis-skyline.jpg'
    ],
    heroImage: '/hotels/jw-dubai-marquis-towers.jpg',
    featured: true,
    setting: 'urban',
    startingPrice: 420,
    currency: 'USD',
    amenities: [
      'World’s Tallest 5-Star Hotel with Burj Khalifa Views',
      '15 Award-Winning Restaurants, Bars & Lounges',
      'Saray Spa with Traditional Dead Sea Salt Flotation Pool',
      'Expansive Outdoor Heated Pool & Sun Deck',
      'Executive Sky Lounge on High Floors'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 86000,
    meetingRoomsCount: 32,
    policies: {
      cancellation: 'Free cancellation up to 24 hours prior to check-in.',
      checkInAge: 18,
      pets: 'Service animals only.',
      smoking: 'Designated smoking rooms available.'
    },
    rooms: [
      {
        id: 'jw-dxb-skyline-king',
        name: 'Deluxe Corner King Room with Canal View',
        category: 'Deluxe',
        description: 'Panoramic floor-to-ceiling corner windows framing the Dubai Water Canal and city skyline, deep soaking tub, and JW plush bedding.',
        sizeSqFt: 590,
        sizeSqM: 55,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Dubai Water Canal & Downtown Skyline',
        images: ['/hotels/jw-dubai-marquis-waterway.jpg'],
        features: ['Canal view corner windows', 'Freestanding bathtub', 'Aromatherapy Associates toiletries'],
        basePrice: 420,
        inventoryRemaining: 6,
        ratePlans: [
          {
            id: 'jw-dxb-mindful',
            name: 'JW Marriott Mindful Living Package',
            description: 'Includes 15% preferred stay savings, daily spa pass to Saray Spa, and full breakfast buffet.',
            pricePerNight: 357,
            originalPricePerNight: 420,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 24,
            includesBreakfast: true,
            perks: ['15% Member Savings', 'Daily Kitchen6 Buffet Breakfast', '5,000 Bonus Points']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'jw-dxb-rev-1',
        guestName: 'Rashid Al-Zahrani',
        location: 'Abu Dhabi, UAE',
        rating: 5,
        date: 'October 2026',
        title: 'Incredible scale and flawless service',
        comment: 'Kitchen6 breakfast buffet is legendary with 6 live cooking stations. The corner room view of the canal was stunning.',
        roomStayed: 'Deluxe Corner King Room with Canal View'
      }
    ]
  },
  {
    id: 'jw-marriott-singapore-south-beach',
    brandId: 'jw-marriott',
    name: 'JW Marriott Hotel Singapore South Beach',
    slug: 'jw-marriott-hotel-singapore-south-beach',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Downtown Core',
    address: '30 Beach Road, Singapore 189763',
    phone: '+65 6818-1888',
    latitude: 1.2954,
    longitude: 103.8561,
    officialUrl: 'https://www.marriott.com/en-us/hotels/sinjw-jw-marriott-hotel-singapore-south-beach/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Philippe Starck-designed artistic sanctuary in downtown Singapore with sky gardens',
    description: 'Seamlessly marrying heritage conservation buildings with contemporary Philippe Starck design, JW Marriott Hotel Singapore South Beach features two outdoor sky infinity pools overlooking Marina Bay, the award-winning Spa by JW, and celebrated Cantonese dining at Madame Fan.',
    starRating: 5,
    guestRating: 4.94,
    reviewCount: 1890,
    images: [
      '/hotels/jw-singapore-south-beach-tower.jpg',
      '/hotels/jw-singapore-south-beach-avenue.jpg',
      '/hotels/jw-singapore-nicoll-highway.jpg'
    ],
    heroImage: '/hotels/jw-singapore-south-beach-tower.jpg',
    featured: true,
    setting: 'urban',
    startingPrice: 480,
    currency: 'USD',
    amenities: [
      'Two Rooftop Sky Infinity Pools & Sky Gardens with Skyline Views',
      'Philippe Starck Artistic Contemporary Interiors',
      'Madame Fan Masterclass Chinese Gastronomy',
      'Spa by JW with Express Relaxation Pods',
      'Direct Undercover Connection to Esplanade MRT'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 18000,
    meetingRoomsCount: 15,
    policies: {
      cancellation: 'Free cancellation up to 48 hours before check-in.',
      checkInAge: 18,
      pets: 'Service animals only.',
      smoking: '100% Smoke-Free Hotel.'
    },
    rooms: [
      {
        id: 'jw-sin-premier-marina',
        name: 'Premier Marina Bay View Room',
        category: 'Deluxe',
        description: 'Designer Philippe Starck furnishings, sweeping Marina Bay skyline views, marble bathroom with Japanese bidet, and deep soaking bathtub.',
        sizeSqFt: 450,
        sizeSqM: 42,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Marina Bay & Downtown Singapore Skyline',
        images: ['/hotels/jw-singapore-south-beach-avenue.jpg'],
        features: ['Marina Bay view', 'Philippe Starck custom design', 'Aromatherapy Associates bath amenities'],
        basePrice: 480,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'jw-sin-mindful',
            name: 'JW Marriott Mindful Living Package',
            description: 'Includes 15% preferred member savings, daily buffet breakfast at Beach Road Kitchen, and Spa by JW pass.',
            pricePerNight: 408,
            originalPricePerNight: 480,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['15% Member Savings', 'Beach Road Kitchen Breakfast', '5,000 Bonus Points']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'jw-sin-rev-1',
        guestName: 'Krystal Lim',
        location: 'Kuala Lumpur, Malaysia',
        rating: 5,
        date: 'September 2026',
        title: 'Spectacular infinity pool and design',
        comment: 'The sky pool on level 18 overlooking the Marina Bay skyline is unbeatable. Breakfast at Beach Road Kitchen had endless variety.',
        roomStayed: 'Premier Marina Bay View Room'
      }
    ]
  },
  {
    id: 'jw-marriott-masai-mara',
    brandId: 'jw-marriott',
    name: 'JW Marriott Masai Mara Lodge',
    slug: 'jw-marriott-masai-mara-lodge',
    city: 'Masai Mara National Reserve',
    country: 'Kenya',
    region: 'Narok County',
    address: 'Talek River, Masai Mara National Reserve, Kenya',
    phone: '+254 709-111-000',
    latitude: -1.4502,
    longitude: 35.1984,
    officialUrl: 'https://www.marriott.com/en-us/hotels/nbajw-jw-marriott-masai-mara-lodge/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'An extraordinary luxury safari lodge perched along the Talek River in Masai Mara',
    description: 'Overlooking the famed Talek River inside the iconic Masai Mara National Reserve, JW Marriott Masai Mara Lodge offers 20 bespoke luxury tented suites with private whirlpool jacuzzis, daily Big Five game drives led by local Maasai guides, and mindful wellness at Spa by JW.',
    starRating: 5,
    guestRating: 4.99,
    reviewCount: 320,
    images: [
      '/hotels/jw-mara-river.jpg',
      '/hotels/jw-mara-waters.jpg',
      '/hotels/jw-mara-sunset.jpg'
    ],
    heroImage: '/hotels/jw-mara-river.jpg',
    featured: true,
    setting: 'nature',
    startingPrice: 2400,
    currency: 'USD',
    amenities: [
      'All-Inclusive Daily Morning & Afternoon Game Drives',
      'Private Outdoor Whirlpool Jacuzzi on Tented Deck',
      'Spa by JW with Indigenous African Healing Treatments',
      'JW Garden Farm-to-Table Bush Dinners & Boma Bonfire',
      'Photographic Studio & Lens Rental Lab'
    ],
    checkInTime: '14:00',
    checkOutTime: '10:00',
    meetingSpaceSqFt: 2500,
    meetingRoomsCount: 1,
    policies: {
      cancellation: 'Free cancellation up to 14 days prior to arrival.',
      checkInAge: 18,
      pets: 'No pets allowed.',
      smoking: 'Non-smoking.'
    },
    rooms: [
      {
        id: 'jw-mara-deluxe-tent',
        name: 'Deluxe Tented Suite with River View & Jacuzzi',
        category: 'Villa',
        description: 'Canvas-tented master suite with private wooden deck looking directly over the Talek River, outdoor private jacuzzi, canvas roll-up walls, and canvas en-suite bath.',
        sizeSqFt: 1100,
        sizeSqM: 102,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Talek River & Masai Mara Wildlife Plains',
        images: ['/hotels/jw-mara-waters.jpg'],
        features: ['Private outdoor whirlpool deck', 'Talek River wildlife view', 'Complimentary bush gear & binoculars'],
        basePrice: 2400,
        inventoryRemaining: 2,
        ratePlans: [
          {
            id: 'jw-mara-all-inclusive',
            name: 'JW Mindful Safari All-Inclusive Rate',
            description: 'Includes all gourmet meals, fine wines & spirits, twice-daily game drives, and park conservation transfers.',
            pricePerNight: 2400,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 336,
            includesBreakfast: true,
            perks: ['All Meals & Beverages Included', 'Twice-Daily Guided Game Drives', 'Bonvoy Elite Night Credit']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'jw-mara-rev-1',
        guestName: 'Eleanor Vance',
        location: 'London, UK',
        rating: 5,
        date: 'August 2026',
        title: 'The greatest safari on earth',
        comment: 'Watching elephants drink from the Talek River right from our private deck jacuzzi with a glass of champagne was unforgettable.',
        roomStayed: 'Deluxe Tented Suite with River View & Jacuzzi'
      }
    ]
  },
  {
    id: 'st-regis-borabora',
    brandId: 'st-regis',
    name: 'The St. Regis Bora Bora Resort',
    slug: 'the-st-regis-bora-bora-resort',
    city: 'Bora Bora',
    country: 'French Polynesia',
    region: 'South Pacific',
    address: 'Motu Piti Aau, Bora Bora 98730, French Polynesia',
    phone: '+689 40 60 78 88',
    latitude: -16.5004,
    longitude: -151.7071,
    officialUrl: 'https://www.marriott.com/en-us/hotels/bobxr-the-st-regis-bora-bora-resort/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'The epitome of South Pacific luxury with the largest overwater villas in French Polynesia',
    description: 'Offering forty-four acres of lush tropical sanctuary, The St. Regis Bora Bora Resort features iconic overwater villas with glass viewing panels, signature St. Regis Butler Service, and Lagoon by Jean-Georges fine dining.',
    starRating: 5,
    guestRating: 4.99,
    reviewCount: 340,
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1600&q=85',
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
        images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85'],
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
    region: 'Colorado',
    address: '315 E Dean St, Aspen, CO 81611, USA',
    phone: '+1 970-920-3300',
    latitude: 39.1866,
    longitude: -106.8183,
    officialUrl: 'https://www.marriott.com/en-us/hotels/asexr-the-st-regis-aspen-resort/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'An aristocratic Rocky Mountain sanctuary at the base of Aspen Mountain',
    description: 'At the foot of Aspen Mountain, The St. Regis Aspen Resort combines Gilded Age glamour with alpine adventure. Features Remède Spa, heated outdoor slope-side pool and hot tubs, signature Butler Service, and Velvet Buck restaurant.',
    starRating: 5,
    guestRating: 4.95,
    reviewCount: 390,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=85',
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
        images: ['https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=85'],
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
    id: 'st-regis-rome',
    brandId: 'st-regis',
    name: 'The St. Regis Rome',
    slug: 'the-st-regis-rome',
    city: 'Rome',
    country: 'Italy',
    region: 'Lazio / Historic Centre',
    address: 'Via Vittorio Emanuele Orlando 3, 00185 Rome, Italy',
    phone: '+39 06 47091',
    latitude: 41.9038,
    longitude: 12.4947,
    officialUrl: 'https://www.marriott.com/en-us/hotels/romxr-the-st-regis-rome/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Palatial Belle Époque grand dame near Piazza della Repubblica',
    description: 'Inaugurated by legendary hotelier César Ritz in 1894, The St. Regis Rome embodies Italian aristocratic grandeur with museum-grade frescoes, Murano glass chandeliers, signature St. Regis Butler Service, and Lumen Cocktails & Cuisine.',
    starRating: 5,
    guestRating: 4.96,
    reviewCount: 940,
    images: [
      'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1600&q=85',
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
        images: ['https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1600&q=85'],
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
    id: 'st-regis-bal-harbour',
    brandId: 'st-regis',
    name: 'The St. Regis Bal Harbour Resort',
    slug: 'the-st-regis-bal-harbour-resort',
    city: 'Miami Beach',
    country: 'United States',
    region: 'Florida',
    address: '9703 Collins Avenue, Bal Harbour, Miami Beach, FL 33154, USA',
    phone: '+1 305-993-3300',
    latitude: 25.8893,
    longitude: -80.1239,
    officialUrl: 'https://www.marriott.com/en-us/hotels/miabh-the-st-regis-bal-harbour-resort/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Forbes Five-Star oceanfront enclave with private ocean cabanas and signature St. Regis Butler Service',
    description: 'Rising on pristine white sands in exclusive Bal Harbour directly opposite Bal Harbour Shops, this peerless sanctuary features private beach villas, Remède Spa, oceanfront infinity pools, and Atlantikós Greek seafood restaurant.',
    starRating: 5,
    guestRating: 4.93,
    reviewCount: 880,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85',
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
        images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=85'],
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
    id: 'st-regis-venice',
    brandId: 'st-regis',
    name: 'The St. Regis Venice',
    slug: 'the-st-regis-venice',
    city: 'Venice',
    country: 'Italy',
    region: 'Veneto',
    address: 'San Marco 2159, 30124 Venice, Italy',
    phone: '+39 041 240 0001',
    latitude: 45.4319,
    longitude: 12.3364,
    officialUrl: 'https://www.marriott.com/en-us/hotels/vcexr-the-st-regis-venice/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Privileged Grand Canal location facing Santa Maria della Salute with private secluded Italian gardens',
    description: 'Combining historic heritage with contemporary Venetian elegance, The St. Regis Venice boasts a prime position on the Grand Canal, private water taxi jetty, landscaped sculpture gardens, Gio’s Restaurant, and St. Regis Butler Service.',
    starRating: 5,
    guestRating: 4.97,
    reviewCount: 760,
    images: [
      'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1521783988139-89397d761dce?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85'
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
        images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=85'],
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
    id: 'st-regis-osaka',
    brandId: 'st-regis',
    name: 'The St. Regis Osaka',
    slug: 'the-st-regis-osaka',
    city: 'Osaka',
    country: 'Japan',
    region: 'Kansai',
    address: '3-6-12 Honmachi, Chuo-ku, Osaka 541-0053, Japan',
    phone: '+81 6-6743-1111',
    latitude: 34.6837,
    longitude: 135.5009,
    officialUrl: 'https://www.marriott.com/en-us/hotels/osaxr-the-st-regis-osaka/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Refined sanctuary on prestigious Midosuji with tranquil Japanese rooftop Zen garden',
    description: 'Located in the heart of Osaka on the Champs-Élysées of Japan, The St. Regis Osaka delivers uncompromising luxury with 24-hour St. Regis Butler Service, Iridium Spa, Italian dining at La Veduta, and signature Shogun Mary cocktails at The St. Regis Bar.',
    starRating: 5,
    guestRating: 4.92,
    reviewCount: 650,
    images: [
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1600&q=85',
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
        images: ['https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=1600&q=85'],
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
  },
  {
    id: 'st-regis-toronto',
    brandId: 'st-regis',
    name: 'The St. Regis Toronto',
    slug: 'the-st-regis-toronto',
    city: 'Toronto',
    country: 'Canada',
    region: 'Ontario',
    address: '325 Bay Street, Toronto, ON M5H 4G3, Canada',
    phone: '+1 416-306-5800',
    latitude: 43.6496,
    longitude: -79.3807,
    officialUrl: 'https://www.marriott.com/en-us/hotels/yyzxr-the-st-regis-toronto/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Canada’s premier modern luxury address at the center of Toronto’s Financial & Entertainment District',
    description: 'Soaring 65 stories in downtown Toronto, The St. Regis Toronto sets the benchmark for modern Canadian glamour. Featuring residential-style suites, the iconic St. Regis Butler Service, LOUIX LOUIS 31st-floor Grand Bar & Restaurant, and luxury St. Regis Spa.',
    starRating: 5,
    guestRating: 4.91,
    reviewCount: 910,
    images: [
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=85',
    featured: true,
    setting: 'urban',
    startingPrice: 289,
    currency: 'CAD',
    amenities: [
      'Year-Round Heated Indoor/Outdoor Swimming Pool',
      '43rd-Floor Sheraton Club Lounge with Skyline Views',
      'Dual Citizen Cafe & Bar with Grab-and-Go',
      '43rd-Floor 24-Hour Sheraton Fitness Centre',
      'Direct Indoor Underground PATH Network Access',
      'Pet-Friendly Rooms & Dog Welcome Kit'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 130000,
    meetingRoomsCount: 60,
    policies: {
      cancellation: 'Free cancellation up to 48 hours prior to check-in date.',
      checkInAge: 19,
      pets: 'Pets welcome (Max 2 pets per room).',
      smoking: '100% Smoke-Free Hotel.'
    },
    rooms: [
      {
        id: 'sheraton-toronto-deluxe-king',
        name: 'Deluxe City View Guest Room, 1 King',
        category: 'Deluxe',
        description: 'Modern redesigned guest room with plush Sheraton Signature Sleep Experience bed, ergonomic work desk, high-speed Wi-Fi, and downtown Toronto city views.',
        sizeSqFt: 350,
        sizeSqM: 33,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Downtown Toronto Skyline',
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85'],
        features: ['Sheraton Signature Sleep Experience', 'Marble shower & bath', '55-inch Smart TV', 'Ergonomic workspace'],
        basePrice: 289,
        inventoryRemaining: 5,
        ratePlans: [
          {
            id: 'sheraton-toronto-member-flex',
            name: 'Marriott Bonvoy Member Flexible Rate',
            description: 'Exclusive member pricing with complimentary Wi-Fi and flexible cancellation up to 48 hours.',
            pricePerNight: 289,
            originalPricePerNight: 329,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: false,
            perks: ['Bonvoy Points & Elite Night Credits', 'Complimentary High-Speed Wi-Fi', 'Free cancellation up to 48h']
          },
          {
            id: 'sheraton-toronto-breakfast-pkg',
            name: 'Stay & Breakfast Package',
            description: 'Includes daily hot breakfast buffet for two at 43 Downtown restaurant.',
            pricePerNight: 339,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Full Hot Breakfast Buffet', 'Bonvoy Elite Night Credits', 'Flexible cancellation']
          }
        ]
      },
      {
        id: 'sheraton-toronto-club-king',
        name: 'Sheraton Club Level Room, 1 King, High Floor',
        category: 'Suite',
        description: 'Top floor room offering complimentary access to the 43rd-floor Sheraton Club Lounge with daily continental breakfast, evening hors d’oeuvres, and panoramic city vistas.',
        sizeSqFt: 380,
        sizeSqM: 35,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'High Floor Toronto Skyline & Lake Ontario',
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85'],
        features: ['43rd-Floor Sheraton Club Lounge access', 'Daily complimentary breakfast & evening drinks', 'High floor skyline view'],
        basePrice: 389,
        inventoryRemaining: 3,
        ratePlans: [
          {
            id: 'sheraton-toronto-club-rate',
            name: 'Club Lounge Access Rate',
            description: 'Includes full Sheraton Club privileges, breakfast, evening hors d’oeuvres, and high-speed Wi-Fi.',
            pricePerNight: 389,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['43rd-Floor Club Access', 'All-Day Refreshments & Evening Canapes', 'Late Check-out when available']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'sher-tor-rev-1',
        guestName: 'Marc Bouchard',
        location: 'Montreal, Canada',
        rating: 5,
        date: 'September 2026',
        title: 'Outstanding indoor/outdoor pool and central location',
        comment: 'Swimming in the heated indoor/outdoor pool with steam rising while looking at Toronto City Hall was the highlight of our stay. The newly renovated rooms are crisp and modern.',
        roomStayed: 'Deluxe City View Guest Room, 1 King'
      }
    ]
  },
  {
    id: 'jw-marriott-cannes',
    brandId: 'jw-marriott',
    name: 'JW Marriott Cannes',
    slug: 'jw-marriott-cannes',
    city: 'Cannes',
    country: 'France',
    region: "Provence-Alpes-Côte d'Azur",
    address: '50 Boulevard de la Croisette, 06400 Cannes, France',
    phone: '+33 4 92 98 70 00',
    latitude: 43.5513,
    longitude: 7.0279,
    officialUrl: 'https://www.marriott.com/en-us/hotels/cewjw-jw-marriott-cannes/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Glamorous beachfront palace overlooking the shimmering Bay of Cannes and Boulevard de la Croisette',
    description: 'Set on the legendary Boulevard de la Croisette, JW Marriott Cannes was built on the former site of the Palais des Festivals. It offers modern Mediterranean elegance, a heated rooftop pool with panoramic bay views, private beach access, and premier French Riviera luxury.',
    starRating: 5,
    guestRating: 4.91,
    reviewCount: 1650,
    images: [
      '/hotels/jw-cannes-croisette-facade.jpg',
      '/hotels/jw-cannes-entrance.jpg',
      '/hotels/jw-cannes-seafront.jpg'
    ],
    heroImage: '/hotels/jw-cannes-croisette-facade.jpg',
    featured: true,
    setting: 'coastal',
    startingPrice: 420,
    currency: 'USD',
    amenities: [
      'Heated Rooftop Pool & Solarium with Bay of Cannes Views',
      'Scalini Italian & Riviera Fine Dining',
      'Private JW Beach Club with Sun Loungers',
      '24-Hour Fitness Centre with Ocean Vistas',
      'Complimentary High-Speed Wi-Fi & Concierge'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 25000,
    meetingRoomsCount: 8,
    policies: {
      cancellation: 'Free cancellation up to 72 hours prior to arrival date.',
      checkInAge: 18,
      pets: 'Small pets allowed upon request.',
      smoking: '100% Non-Smoking Hotel.'
    },
    rooms: [
      {
        id: 'jw-cannes-deluxe-balcony',
        name: 'Deluxe Sea View Room with Private Balcony',
        category: 'Deluxe',
        description: 'Spacious 480 sq ft room with private furnished outdoor balcony facing the Mediterranean Sea, marble soaking tub, and signature aromatherapy amenities.',
        sizeSqFt: 480,
        sizeSqM: 45,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Mediterranean Sea & Boulevard de la Croisette',
        images: ['/hotels/jw-cannes-entrance.jpg'],
        features: ['Furnished private sea view balcony', 'Marble bathroom with deep soaking tub', 'JW Garden aromatherapy bath kit'],
        basePrice: 420,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'jw-cannes-riviera-saver',
            name: 'French Riviera Escapes — 15% Member Savings',
            description: 'Special 15% promotional member savings on luxury coastal stays with complimentary gourmet breakfast.',
            pricePerNight: 357,
            originalPricePerNight: 420,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 72,
            includesBreakfast: true,
            perks: ['15% Member Savings', 'Daily Riviera Gourmet Breakfast', 'Bonvoy Elite Night Credit']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'jw-cannes-rev-1',
        guestName: 'Charlotte Dupont',
        location: 'Paris, France',
        rating: 5,
        date: 'October 2026',
        title: 'Unbelievable Riviera experience on La Croisette',
        comment: 'The rooftop sunset over the Mediterranean was magical and the service was genuinely world-class. Best location in Cannes.',
        roomStayed: 'Deluxe Sea View Room with Private Balcony'
      }
    ]
  },
  {
    id: 'jw-marriott-auckland',
    brandId: 'jw-marriott',
    name: 'JW Marriott Auckland',
    slug: 'jw-marriott-auckland',
    city: 'Auckland',
    country: 'New Zealand',
    region: 'Auckland Region',
    address: '71 Mayoral Drive, Auckland CBD, Auckland 1010, New Zealand',
    phone: '+64 9-366-3000',
    latitude: -36.8524,
    longitude: 174.7645,
    officialUrl: 'https://www.marriott.com/en-us/hotels/aklmc-jw-marriott-auckland/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Mindfully crafted urban sanctuary in the vibrant heart of Auckland CBD',
    description: 'Introducing JW Marriott’s philosophy of mindful wellness to New Zealand. Located moments from Waitematā Harbour, SkyCity, and Queen Street, featuring spacious guest rooms, JW Garden dining, heated indoor pool, and rejuvenating Spa by JW experiences.',
    starRating: 5,
    guestRating: 4.88,
    reviewCount: 780,
    images: [
      '/hotels/jw-auckland-tower.jpg',
      '/hotels/jw-auckland-entrance.jpg',
      '/hotels/jw-auckland-streetscape.jpg'
    ],
    heroImage: '/hotels/jw-auckland-tower.jpg',
    featured: true,
    setting: 'urban',
    startingPrice: 220,
    currency: 'USD',
    amenities: [
      'Panoramic Eiffel Tower & City Skyline Views',
      'Kitchen & Bar Modern French Bistro',
      '24-Hour Panoramic Fitness Centre',
      'Instant Metro & High-Speed TGV Transit Hub',
      'Complimentary High-Speed Wi-Fi'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 8500,
    meetingRoomsCount: 4,
    policies: {
      cancellation: 'Free cancellation up to 48 hours before check-in.',
      checkInAge: 18,
      pets: 'Pets allowed (fee applies).',
      smoking: '100% Smoke-free property.'
    },
    rooms: [
      {
        id: 'cp-skyline-deluxe',
        name: 'Deluxe Room, Eiffel Tower & Skyline View',
        category: 'Deluxe',
        description: 'Sophisticated guest room on high floors featuring floor-to-ceiling windows overlooking the Paris skyline and monuments.',
        sizeSqFt: 360,
        sizeSqM: 33,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Paris Skyline & Eiffel Tower',
        images: ['/hotels/jw-auckland-entrance.jpg'],
        features: ['Floor-to-ceiling skyline windows', 'Rainforest shower', 'Nespresso coffee machine'],
        basePrice: 220,
        inventoryRemaining: 6,
        ratePlans: [
          {
            id: 'cp-member-rate',
            name: 'Marriott Bonvoy Member Special Rate',
            description: 'Includes Parisian artisan breakfast buffet and flexible cancellation.',
            pricePerNight: 220,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Daily Artisan Breakfast Included', 'Free cancellation up to 48h', 'Member Points']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'cp-rev-1',
        guestName: 'Alexandre Moreau',
        location: 'Lyon, France',
        rating: 5,
        date: 'September 2026',
        title: 'Outstanding views of Paris skyline',
        comment: 'Seeing the Eiffel Tower sparkling at night right from our room window was unforgettable. Impeccable cleanliness and friendly staff.',
        roomStayed: 'Deluxe Room, Eiffel Tower & Skyline View'
      }
    ]
  },
  {
    id: 'jw-marriott-essex-house-new-york',
    brandId: 'jw-marriott',
    name: 'JW Marriott Essex House New York',
    slug: 'jw-marriott-essex-house-new-york',
    city: 'New York',
    country: 'United States',
    region: 'New York',
    address: '160 Central Park South, New York, NY 10019, USA',
    phone: '+1 212-247-0300',
    latitude: 40.7663,
    longitude: -73.9787,
    officialUrl: 'https://www.marriott.com/en-us/hotels/nycex-jw-marriott-essex-house-new-york/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Art Deco luxury landmark on Central Park South with Southgate Bar & Restaurant',
    description: 'An iconic presence on Central Park South since 1931, JW Marriott Essex House New York pairs timeless Art Deco glamour with modern luxury, panoramic Central Park views, bespoke cocktails at SOUTHGATE Bar & Restaurant, and PRIMP Spa.',
    starRating: 5,
    guestRating: 4.85,
    reviewCount: 1840,
    images: [
      '/hotels/jw-essex-house-rooftop-sign.jpg',
      '/hotels/jw-essex-house-facade.jpg',
      '/hotels/jw-essex-house-central-park-view.jpg'
    ],
    heroImage: '/hotels/jw-essex-house-rooftop-sign.jpg',
    featured: true,
    setting: 'urban',
    startingPrice: 580,
    currency: 'USD',
    amenities: [
      'Direct Central Park South Location',
      'SOUTHGATE Bar & Restaurant Overlooking Central Park',
      'PRIMP Luxury Spa & Wellness Suites',
      'Historic Art Deco Grand Salon & Ballroom',
      '24-Hour Les Clefs d’Or Concierge Desk'
    ],
    checkInTime: '16:00',
    checkOutTime: '11:00',
    meetingSpaceSqFt: 17000,
    meetingRoomsCount: 6,
    policies: {
      cancellation: 'Free cancellation up to 72 hours prior to arrival.',
      checkInAge: 21,
      pets: 'Pet friendly (up to 2 pets, 50 lbs max).',
      smoking: '100% Smoke-Free Property.'
    },
    rooms: [
      {
        id: 'jw-essex-cp-king',
        name: 'Central Park View Deluxe King Room',
        category: 'Deluxe',
        description: 'Classic luxury room offering unobstructed panoramic views of Central Park, plush king bed, marble bath, and custom millwork.',
        sizeSqFt: 450,
        sizeSqM: 42,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Central Park Canopy & Manhattan Skyline',
        images: ['/hotels/jw-essex-house-facade.jpg'],
        features: ['Unobstructed Central Park views', 'Marble bath with Aromatherapy Associates', 'Custom mini-bar & Nespresso'],
        basePrice: 580,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'jw-essex-saver',
            name: 'Central Park Luxury Experience Rate',
            description: 'Includes gourmet breakfast at SOUTHGATE and flexible cancellation terms.',
            pricePerNight: 580,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 72,
            includesBreakfast: true,
            perks: ['Full American Breakfast Included', 'Central Park Concierge Tour', 'Bonvoy Points']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'jw-essex-rev-1',
        guestName: 'James Alexander',
        location: 'Chicago, USA',
        rating: 5,
        date: 'October 2026',
        title: 'Unbeatable Central Park view and classic elegance',
        comment: 'Looking out over Central Park during autumn with morning coffee in hand was breathtaking. Top tier staff and historic charm.',
        roomStayed: 'Central Park View Deluxe King Room'
      }
    ]
  },
  {
    id: 'st-regis-new-york',
    brandId: 'st-regis',
    name: 'The St. Regis New York',
    slug: 'the-st-regis-new-york',
    city: 'New York',
    country: 'United States',
    region: 'New York',
    address: 'Two East 55th Street at Fifth Avenue, New York, NY 10022, USA',
    phone: '+1 212-753-4500',
    latitude: 40.7615,
    longitude: -73.9744,
    officialUrl: 'https://www.marriott.com/en-us/hotels/nycxr-the-st-regis-new-york/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'The legendary Fifth Avenue flagship founded by John Jacob Astor IV in 1904',
    description: 'The birthplace of timeless glamour and the Red Snapper (original Bloody Mary). Situated at Fifth Avenue and 55th Street, featuring signature 24-hour St. Regis Butler Service, King Cole Bar with Maxfield Parrish mural, and Astor Court fine dining.',
    starRating: 5,
    guestRating: 4.98,
    reviewCount: 2400,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85',
    featured: true,
    setting: 'mountain',
    startingPrice: 280,
    currency: 'USD',
    amenities: [
      'Adjacent to Historic Mirabell Gardens & Palace',
      'Restaurant Mirabell Fine Alpine & Austrian Cuisine',
      'Sheraton Club Lounge with Garden Terrace',
      'Full Spa with Finnish Sauna & Steam Bath',
      'Walking Distance to Old Town Salzburg & Mozart Residence'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 12000,
    meetingRoomsCount: 5,
    policies: {
      cancellation: 'Free cancellation up to 48 hours prior to arrival date.',
      checkInAge: 18,
      pets: 'Pets welcome on request.',
      smoking: '100% Smoke-Free Property.'
    },
    rooms: [
      {
        id: 'sg-mirabell-room',
        name: 'Grand Deluxe Room, Mirabell Garden View',
        category: 'Deluxe',
        description: 'Elegant Austrian guest room with panoramic views of the landscaped Mirabell Palace gardens, king bed, and heated bathroom floors.',
        sizeSqFt: 410,
        sizeSqM: 38,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Mirabell Palace Gardens & Old Town',
        images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85'],
        features: ['Mirabell Garden views', 'Marble bath with heated floor', 'Nespresso and tea station'],
        basePrice: 280,
        inventoryRemaining: 5,
        ratePlans: [
          {
            id: 'sg-salzburg-flex',
            name: 'Salzburg Cultural Escape Flex Rate',
            description: 'Includes full Austrian buffet breakfast and flexible cancellation.',
            pricePerNight: 280,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Austrian Breakfast Buffet', 'Free cancellation up to 48h', 'Club Lounge Access']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'sg-rev-1',
        guestName: 'Maximilian Weber',
        location: 'Munich, Germany',
        rating: 5,
        date: 'August 2026',
        title: 'Superb hotel right by Mirabell Gardens',
        comment: 'Walking directly out into the Mirabell gardens every morning was magnificent. The breakfast buffet with local Austrian pastries was delicious.',
        roomStayed: 'Grand Deluxe Room, Mirabell Garden View'
      }
    ]
  },
  {
    id: 'st-regis-florence',
    brandId: 'st-regis',
    name: 'The St. Regis Florence',
    slug: 'the-st-regis-florence',
    city: 'Florence',
    country: 'Italy',
    region: 'Tuscany',
    address: 'Piazza Ognissanti 1, 50123 Florence, Italy',
    phone: '+39 055 27161',
    latitude: 43.7719,
    longitude: 11.2464,
    officialUrl: 'https://www.marriott.com/en-us/hotels/flrxr-the-st-regis-florence/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Renaissance palace designed by Brunelleschi overlooking the River Arno',
    description: 'Occupying an authentic 15th-century Renaissance palace designed by Filippo Brunelleschi along the Arno River, The St. Regis Florence features Winter Garden by Michelin-starred chef, bespoke St. Regis Butler Service, and frescoed master suites.',
    starRating: 5,
    guestRating: 4.97,
    reviewCount: 890,
    images: [
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85'
    ],
    heroImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
    featured: true,
    setting: 'urban',
    startingPrice: 480,
    currency: 'USD',
    amenities: [
      'Atmosphere Rooftop Bar & Lounge overlooking St. Stephen’s',
      'The Ritz-Carlton Spa with Susanne Kaufmann Treatments',
      '18-Metre Indoor Pool with Underwater Sound System',
      'Dstrikt Steakhouse & Pastry Lounge',
      '24-Hour Dedicated Concierge & Imperial Ringstraße Tours'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 15000,
    meetingRoomsCount: 6,
    policies: {
      cancellation: 'Free cancellation up to 48 hours prior to arrival.',
      checkInAge: 18,
      pets: 'Service animals and small pets welcome.',
      smoking: '100% Non-Smoking Hotel.'
    },
    rooms: [
      {
        id: 'rc-vie-deluxe',
        name: 'Deluxe Imperial King Room, High Floor',
        category: 'Deluxe',
        description: 'Opulent master guest room with marble soaking bathtub, Diptyque luxury amenities, and skyline views of the historic Ringstraße.',
        sizeSqFt: 520,
        sizeSqM: 48,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Vienna Ringstraße & Historic Palaces',
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85'],
        features: ['Marble bath with deep soaking tub', 'Diptyque Paris toiletries', 'Nespresso coffee machine'],
        basePrice: 480,
        inventoryRemaining: 3,
        ratePlans: [
          {
            id: 'rc-vie-flex',
            name: 'The Ritz-Carlton Flexible Luxury Rate',
            description: 'Includes gourmet Viennese breakfast buffet and flexible cancellation.',
            pricePerNight: 480,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Gourmet Breakfast Included', 'Free cancellation up to 48h', 'Elite Night Credit']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rc-vie-rev-1',
        guestName: 'Elena Rostova',
        location: 'Geneva, Switzerland',
        rating: 5,
        date: 'September 2026',
        title: 'Timeless imperial luxury and unparalleled service',
        comment: 'The rooftop sunset at Atmosphere Bar and the indoor spa pool were exceptional. Truly the finest hotel in Vienna.',
        roomStayed: 'Deluxe Imperial King Room, High Floor'
      }
    ]
  },
  {
    id: 'ritz-carlton-new-york-central-park',
    brandId: 'the-ritz-carlton',
    name: 'The Ritz-Carlton New York, Central Park',
    slug: 'the-ritz-carlton-new-york-central-park',
    city: 'New York',
    country: 'United States',
    region: 'New York',
    address: '50 Central Park South, New York, NY 10019, USA',
    phone: '+1 212-308-9100',
    latitude: 40.7656,
    longitude: -73.9763,
    officialUrl: 'https://www.marriott.com/en-us/hotels/nyccp-the-ritz-carlton-new-york-central-park/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Timeless Manhattan luxury with iconic direct Central Park panoramic views',
    description: 'Commanding a premier Manhattan address on Central Park South, this landmark Forbes Five-Star hotel offers legendary service, La Prairie Spa, bespoke Contour lounge, and sweeping greenery vistas overlooking Central Park.',
    starRating: 5,
    guestRating: 4.96,
    reviewCount: 920,
    images: [
      '/hotels/rc-nycp-facade.jpg',
      '/hotels/rc-nycp-entrance.jpg',
      '/hotels/rc-nycp-central-park-view.jpg'
    ],
    heroImage: '/hotels/rc-nycp-facade.jpg',
    featured: true,
    setting: 'urban',
    startingPrice: 1450,
    currency: 'USD',
    amenities: [
      'Central Park Direct Panoramic Views',
      'La Prairie Swiss Luxury Spa',
      'Contour All-Day Gastro Lounge & Bar',
      'Ritz-Carlton Club Lounge with 5 Daily Food Presentations',
      'Dedicated Manhattan House Car Chauffeur'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 6000,
    meetingRoomsCount: 4,
    policies: {
      cancellation: 'Free cancellation up to 48 hours before arrival.',
      checkInAge: 21,
      pets: 'Pets under 60 lbs welcome.',
      smoking: '100% Smoke-Free Hotel.'
    },
    rooms: [
      {
        id: 'rc-ny-park-view',
        name: 'Central Park View King Suite',
        category: 'Suite',
        description: 'Unrivaled floor-to-ceiling vistas directly over Central Park, custom Italian linens, and marble deep-soaking bath.',
        sizeSqFt: 750,
        sizeSqM: 70,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Direct Central Park View',
        images: ['/hotels/rc-nycp-entrance.jpg'],
        features: ['Central Park panorama', 'La Prairie bath products', 'Marble bathroom with soaking tub'],
        basePrice: 1450,
        inventoryRemaining: 3,
        ratePlans: [
          {
            id: 'rc-ny-flex',
            name: 'The Ritz-Carlton Flexible Luxury Rate',
            description: 'Includes full American breakfast and flexible cancellation.',
            pricePerNight: 1450,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 48,
            includesBreakfast: true,
            perks: ['Full Breakfast Included', 'Free cancellation up to 48h', 'Elite Night Credit']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rc-ny-rev-1',
        guestName: 'David Sterling',
        location: 'Chicago, USA',
        rating: 5,
        date: 'October 2026',
        title: 'Best view in New York City',
        comment: 'Watching the leaves change in Central Park right from our bed with a morning latte was perfection.',
        roomStayed: 'Central Park View King Suite'
      }
    ]
  },
  {
    id: 'ritz-carlton-maldives-fari-islands',
    brandId: 'the-ritz-carlton',
    name: 'The Ritz-Carlton Maldives, Fari Islands',
    slug: 'the-ritz-carlton-maldives-fari-islands',
    city: 'Fari Islands',
    country: 'Maldives',
    region: 'North Malé Atoll',
    address: 'Fari Islands, North Malé Atoll 20013, Maldives',
    phone: '+960 400-0999',
    latitude: 4.5828,
    longitude: 73.5414,
    officialUrl: 'https://www.marriott.com/en-us/hotels/mlezr-the-ritz-carlton-maldives-fari-islands/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Circular overwater architectural marvel designed by Kerry Hill in the turquoise Maldivian lagoon',
    description: 'Set within the pristine North Malé Atoll, The Ritz-Carlton Maldives presents minimalist spherical overwater villas with private infinity pools, Aris Meeha island butler service, and overwater ring spa designed by Kerry Hill Architects.',
    starRating: 5,
    guestRating: 4.99,
    reviewCount: 410,
    images: [],
    heroImage: '',
    featured: true,
    setting: 'island',
    startingPrice: 2200,
    currency: 'USD',
    amenities: [
      'Private Ocean Infinity Pool in Every Villa',
      'Dedicated Aris Meeha Island Butler Service',
      'The Ritz-Carlton Ring Spa Overwater',
      '7 Culinary Venues Including Iwau Teppanyaki',
      'Jean-Michel Cousteau’s Ambassadors of the Environment'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 4000,
    meetingRoomsCount: 2,
    policies: {
      cancellation: 'Free cancellation up to 14 days prior to arrival.',
      checkInAge: 18,
      pets: 'No pets permitted.',
      smoking: 'Outdoor areas only.'
    },
    rooms: [
      {
        id: 'rc-mld-ocean-pool-villa',
        name: 'Ocean Pool Villa, 1 King, Water View',
        category: 'Villa',
        description: 'Iconic curved overwater villa with private sundeck, personal infinity plunge pool, outdoor rain shower, and direct lagoon access.',
        sizeSqFt: 1614,
        sizeSqM: 150,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Panoramic Turquoise Coral Lagoon',
        images: [],
        features: ['Private infinity pool', 'Overwater hammock', 'Aris Meeha butler service', 'Bamford organic amenities'],
        basePrice: 2200,
        inventoryRemaining: 2,
        ratePlans: [
          {
            id: 'rc-mld-reconnect',
            name: 'The Ritz-Carlton Reconnect & Spa Retreat',
            description: 'Includes daily gourmet champagne breakfast at La Locanda, $150 daily resort credit, and return luxury speedboat transfer.',
            pricePerNight: 2200,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 336,
            includesBreakfast: true,
            perks: ['Daily $150 Resort Credit', 'Full Champagne Breakfast', 'Speedboat Airport Transfer Assistance']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rc-mld-rev-1',
        guestName: 'Elena Rostova',
        location: 'Geneva, Switzerland',
        rating: 5,
        date: 'October 2026',
        title: 'Pure architectural paradise',
        comment: 'The circular design of the villa and the crystal turquoise lagoon with stingrays swimming right under the deck is magical.',
        roomStayed: 'Ocean Pool Villa, 1 King, Water View'
      }
    ]
  },
  {
    id: 'ritz-carlton-grand-cayman',
    brandId: 'the-ritz-carlton',
    name: 'The Ritz-Carlton, Grand Cayman',
    slug: 'the-ritz-carlton-grand-cayman',
    city: 'Seven Mile Beach',
    country: 'Cayman Islands',
    region: 'Grand Cayman',
    address: 'Seven Mile Beach, KY1-1209, Cayman Islands',
    phone: '+1 345-943-9000',
    latitude: 19.3364,
    longitude: -81.3828,
    officialUrl: 'https://www.marriott.com/en-us/hotels/gcmrz-the-ritz-carlton-grand-cayman/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Seven Mile Beach paradise with Blue by Eric Ripert and Greg Norman golf',
    description: 'Spanning 144 beachfront acres along world-famous Seven Mile Beach, this Caribbean crown jewel features Blue by Chef Eric Ripert, Greg Norman-designed golf course, and La Prairie Spa.',
    starRating: 5,
    guestRating: 4.94,
    reviewCount: 880,
    images: [
      '/hotels/rc-cayman-beach-resort.jpg',
      '/hotels/rc-cayman-sailboats.jpg',
      '/hotels/rc-cayman-seven-mile-sun.jpg'
    ],
    heroImage: '/hotels/rc-cayman-beach-resort.jpg',
    featured: true,
    setting: 'coastal',
    startingPrice: 1180,
    currency: 'USD',
    amenities: [
      'Seven Mile Beachfront Private Cabanas',
      'Blue by Eric Ripert (Triple AAA Five Diamond)',
      'Greg Norman-Designed 9-Hole Golf Course',
      'The Ritz-Carlton Spa with Swiss therapies',
      'Starfish Cay Waterpark'
    ],
    checkInTime: '16:00',
    checkOutTime: '11:00',
    meetingSpaceSqFt: 18000,
    meetingRoomsCount: 6,
    policies: {
      cancellation: 'Free cancellation up to 72 hours before arrival.',
      checkInAge: 18,
      pets: 'Service animals only.',
      smoking: '100% Smoke-Free Property.'
    },
    rooms: [
      {
        id: 'rc-cayman-ocean-front',
        name: 'Ocean Front King Guest Room',
        category: 'Deluxe',
        description: 'Private balcony facing turquoise Caribbean waters and Seven Mile Beach coral sands, marble bath, and feather beds.',
        sizeSqFt: 480,
        sizeSqM: 45,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Caribbean Sea & Seven Mile Beach',
        images: ['/hotels/rc-cayman-sailboats.jpg'],
        features: ['Seven Mile Beach view balcony', 'Marble bathroom', 'Asprey Purple Water amenities'],
        basePrice: 1180,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'rc-cayman-reconnect',
            name: 'The Ritz-Carlton Reconnect Package',
            description: 'Includes daily gourmet breakfast for two and $150 daily resort credit.',
            pricePerNight: 1180,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 72,
            includesBreakfast: true,
            perks: ['Daily $150 Resort Credit', 'Full Breakfast Buffet', 'Seven Mile Beach Cabana Access']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'rc-cay-rev-1',
        guestName: 'Robert Vance',
        location: 'Miami, USA',
        rating: 5,
        date: 'September 2026',
        title: 'Pure Caribbean elegance',
        comment: 'Dinner at Blue by Eric Ripert was sensational, and the sunset over Seven Mile Beach was unforgettable.',
        roomStayed: 'Ocean Front King Guest Room'
      }
    ]
  },
  {
    id: 'jw-marriott-marco-island',
    brandId: 'jw-marriott',
    name: 'JW Marriott Marco Island Beach Resort',
    slug: 'jw-marriott-marco-island-beach-resort',
    city: 'Marco Island',
    country: 'United States',
    region: 'Florida',
    address: '400 S Collier Blvd, Marco Island, FL 34145, USA',
    phone: '+1 239-394-2511',
    latitude: 25.9328,
    longitude: -81.7289,
    officialUrl: 'https://www.marriott.com/en-us/hotels/mrkfl-jw-marriott-marco-island-beach-resort/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Gulf Coast paradise featuring 3 miles of white sugar sands and championship golf',
    description: 'Immerse in tropical Florida elegance on Marco Island’s Gulf of Mexico coastline. Features 12 dining venues, Spa by JW, adult-exclusive Sirene tower, and championship golf at The Rookery.',
    starRating: 5,
    guestRating: 4.88,
    reviewCount: 1650,
    images: [
      '/hotels/jw-marco-island-beachfront.jpg'
    ],
    heroImage: '/hotels/jw-marco-island-beachfront.jpg',
    featured: true,
    setting: 'coastal',
    startingPrice: 580,
    currency: 'USD',
    amenities: [
      '3 Miles of Private Gulf Coast Beach',
      'Spa by JW with Heated Mineral Pools',
      'The Rookery Championship Golf Course',
      '12 Waterfront Restaurants & Tiki Bars',
      'Sirene Exclusive Adult Rooftop Pool'
    ],
    checkInTime: '16:00',
    checkOutTime: '11:00',
    meetingSpaceSqFt: 100000,
    meetingRoomsCount: 40,
    policies: {
      cancellation: 'Free cancellation up to 72 hours before check-in.',
      checkInAge: 21,
      pets: 'No pets allowed.',
      smoking: '100% Smoke-Free Property.'
    },
    rooms: [
      {
        id: 'jw-marco-gulf-view',
        name: 'Gulf View King Room with Balcony',
        category: 'Deluxe',
        description: 'Private furnished balcony with direct Gulf of Mexico sunset vistas, plush pillowtop bed, and spacious marble bath.',
        sizeSqFt: 460,
        sizeSqM: 43,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Gulf of Mexico Sunset View',
        images: ['/hotels/jw-marco-island-beachfront.jpg'],
        features: ['Gulf-facing balcony', 'Spa by JW bath amenities', 'Mini-refrigerator and Illy coffee'],
        basePrice: 580,
        inventoryRemaining: 5,
        ratePlans: [
          {
            id: 'jw-marco-mindful',
            name: 'JW Marriott Mindful Living Package',
            description: 'Includes 15% preferred stay savings, daily spa pass, and daily buffet breakfast for two.',
            pricePerNight: 493,
            originalPricePerNight: 580,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 72,
            includesBreakfast: true,
            perks: ['15% Member Discount', 'Daily Buffet Breakfast', '5,000 Bonus Bonvoy Points']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'jw-mrk-rev-1',
        guestName: 'Carolyn Hayes',
        location: 'Atlanta, USA',
        rating: 5,
        date: 'October 2026',
        title: 'Heavenly Gulf sunsets',
        comment: 'The soft white beach is endless. Sitting by Quinn’s On the Beach watching the fire dancers at sunset was unforgettable.',
        roomStayed: 'Gulf View King Room with Balcony'
      }
    ]
  },
  {
    id: 'jw-marriott-grosvenor-house',
    brandId: 'jw-marriott',
    name: 'JW Marriott Grosvenor House London',
    slug: 'jw-marriott-grosvenor-house-london',
    city: 'London',
    country: 'United Kingdom',
    region: 'England',
    address: '86-90 Park Lane, Mayfair, London W1K 7TN, UK',
    phone: '+44 20-7499-6363',
    latitude: 51.5098,
    longitude: -0.1548,
    officialUrl: 'https://www.marriott.com/en-us/hotels/longh-jw-marriott-grosvenor-house-london/overview/',
    verifiedSource: 'Official Marriott Bonvoy Directory (Verified Property)',
    tagline: 'Historic Mayfair landmark on prestigious Park Lane facing Hyde Park',
    description: 'Since 1929, JW Marriott Grosvenor House London has welcomed kings, celebrities, and discerning travelers on prestigious Park Lane in Mayfair. Highlights include the Great Room, JW Steakhouse, and traditional Afternoon Tea at The Park Room.',
    starRating: 5,
    guestRating: 4.91,
    reviewCount: 2200,
    images: [
      '/hotels/jw-grosvenor-house-park-lane.jpg',
      '/hotels/jw-grosvenor-house-facade.jpg',
      '/hotels/jw-grosvenor-house-mayfair-view.jpg'
    ],
    heroImage: '/hotels/jw-grosvenor-house-park-lane.jpg',
    featured: true,
    setting: 'urban',
    startingPrice: 620,
    currency: 'GBP',
    amenities: [
      'Park Lane Mayfair Address Facing Hyde Park',
      'JW Steakhouse & Legendary Cheesecake',
      'The Park Room Afternoon Tea Lounge',
      'Executive Lounge with Daily Canapes',
      '24-Hour State-of-the-Art Fitness Centre'
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    meetingSpaceSqFt: 60000,
    meetingRoomsCount: 25,
    policies: {
      cancellation: 'Free cancellation up to 24 hours prior to arrival.',
      checkInAge: 18,
      pets: 'Guide dogs only.',
      smoking: '100% Smoke-Free Property.'
    },
    rooms: [
      {
        id: 'jw-lon-park-view',
        name: 'Superior Park View King Room',
        category: 'Deluxe',
        description: 'Elegant Mayfair room overlooking leafy Hyde Park, plush king bed, marble bathroom, and Aromatherapy Associates bath amenities.',
        sizeSqFt: 380,
        sizeSqM: 35,
        maxAdults: 2,
        maxChildren: 1,
        bedConfiguration: '1 King Bed',
        view: 'Hyde Park & Mayfair',
        images: ['/hotels/jw-grosvenor-house-facade.jpg'],
        features: ['Hyde Park greenery views', 'Marble bath with rain shower', 'Nespresso coffee maker'],
        basePrice: 620,
        inventoryRemaining: 4,
        ratePlans: [
          {
            id: 'jw-lon-bnb',
            name: 'Bed & Breakfast Mayfair Rate',
            description: 'Includes full English breakfast in The Park Room and flexible cancellation.',
            pricePerNight: 620,
            cancellationPolicy: 'free-cancellation',
            cancellationDeadlineHours: 24,
            includesBreakfast: true,
            perks: ['Full English Breakfast', 'Free cancellation up to 24h', 'Hyde Park Access']
          }
        ]
      }
    ],
    reviews: [
      {
        id: 'jw-lon-rev-1',
        guestName: 'James Montgomery',
        location: 'Edinburgh, UK',
        rating: 5,
        date: 'October 2026',
        title: 'The quintessential Mayfair hotel',
        comment: 'Outstanding location right on Park Lane. The steakhouse was exceptional and the concierge secured impossible West End tickets.',
        roomStayed: 'Superior Park View King Room'
      }
    ]
  }
];
