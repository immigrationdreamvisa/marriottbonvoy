import { Offer } from '../types';

export const OFFERS: Offer[] = [
  {
    id: 'offer-ritz-carlton-reconnect',
    title: 'The Ritz-Carlton Reconnect & Spa Retreat',
    subtitle: 'The Ritz-Carlton Luxury Resorts',
    description: 'Indulge in an unforgettable escape with daily gourmet champagne breakfast for two, private sommelier cellar tasting, and a $150 nightly resort & spa credit.',
    code: 'RITZRECONNECT',
    creditAmount: 150,
    brandId: 'the-ritz-carlton',
    propertyIds: [
      'ritz-carlton-kyoto',
      'ritz-carlton-half-moon-bay',
      'ritz-carlton-tokyo',
      'ritz-carlton-hong-kong',
      'ritz-carlton-dubai',
      'ritz-carlton-kapalu-maui',
      'the-ritz-carlton-vienna',
      'ritz-carlton-grand-cayman',
      'ritz-carlton-maldives-fari-islands',
      'ritz-carlton-new-york-central-park'
    ],
    validUntil: 'December 31, 2027',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Daily $150 Resort & Spa Credit applied per night',
      'Daily Gourmet Champagne Breakfast for Two',
      'The Ritz-Carlton Club Concierge Welcome amenity',
      'Guaranteed Late 14:00 Check-Out upon availability'
    ],
    terms: 'Requires minimum 2-night stay. Resort credit applied at checkout toward participating dining, spa, and recreational venues.',
    eligibility: 'All Guests and Marriott Bonvoy Members',
    bookingUrl: 'https://www.marriott.com/offers/the-ritz-carlton-reconnect-OFF-0982'
  },
  {
    id: 'offer-jw-mindful-escape',
    title: 'JW Marriott Mindful Living & Spa Package',
    subtitle: 'JW Marriott Luxury Hotels & Resorts',
    description: 'Restore your equilibrium with 15% preferred stay savings, complimentary thermal hydrotherapy spa access, nourishing farm-to-table breakfast, and 5,000 bonus Marriott Bonvoy points.',
    code: 'JWMINDFUL',
    discountPercentage: 15,
    brandId: 'jw-marriott',
    propertyIds: [
      'jw-marriott-venice',
      'jw-marriott-dubai-marquis',
      'jw-marriott-singapore-south-beach',
      'jw-marriott-masai-mara',
      'jw-marriott-cannes',
      'jw-marriott-essex-house-new-york',
      'jw-marriott-marco-island',
      'jw-marriott-grosvenor-house'
    ],
    validUntil: 'November 30, 2027',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      '15% Preferred Stay Savings on Best Available Rate',
      'Daily Spa by JW Thermal Suite Pass for Two',
      'Nourishing JW Garden Farm-to-Table Breakfast',
      '5,000 Bonus Marriott Bonvoy Points per Stay'
    ],
    terms: 'Offer valid for Marriott Bonvoy members booking direct. Subject to promotional room availability at participating JW Marriott properties.',
    eligibility: 'Marriott Bonvoy Members (Free instant enrollment)',
    bookingUrl: 'https://www.marriott.com/offers/jw-marriott-mindful-living-OFF-1142'
  },
  {
    id: 'offer-ritz-carlton-bed-breakfast',
    title: 'The Ritz-Carlton Signature Bed & Breakfast',
    subtitle: 'The Ritz-Carlton Worldwide',
    description: 'Start every morning with an exquisite culinary journey. Enjoy full artisanal breakfast for two daily, premium high-speed Wi-Fi, and flexible cancellation.',
    code: 'RITZBNB',
    creditAmount: 75,
    brandId: 'the-ritz-carlton',
    propertyIds: [
      'the-ritz-carlton-vienna',
      'ritz-carlton-new-york-central-park',
      'ritz-carlton-kyoto',
      'ritz-carlton-tokyo',
      'ritz-carlton-grand-cayman',
      'ritz-carlton-half-moon-bay',
      'ritz-carlton-hong-kong'
    ],
    validUntil: 'December 31, 2027',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Full Gourmet Breakfast for Two in Hotel Restaurant or In-Room Dining',
      'Complimentary Enhanced High-Speed Wi-Fi',
      'Marriott Bonvoy Elite Night Credits and Points Earning',
      'Complimentary 48-Hour Cancellation'
    ],
    terms: 'Valid on all eligible room categories. Breakfast gratuities and service charges included.',
    eligibility: 'All Marriott Bonvoy Members and Guests',
    bookingUrl: 'https://www.marriott.com/offers/the-ritz-carlton-bed-and-breakfast-OFF-2219'
  },
  {
    id: 'offer-jw-family-culinary',
    title: 'Family by JW Culinary & Discovery Package',
    subtitle: 'JW Marriott Family Resorts',
    description: 'Designed to bring families together through immersive cooking, nature discovery, complimentary dining for kids under 12, and in-room glamping amenities.',
    code: 'JWFAMILY',
    discountPercentage: 20,
    brandId: 'jw-marriott',
    propertyIds: [
      'jw-marriott-essex-house-new-york',
      'jw-marriott-marco-island',
      'jw-marriott-venice',
      'jw-marriott-cannes',
      'jw-marriott-masai-mara'
    ],
    validUntil: 'December 31, 2027',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      'Daily Family Breakfast Buffet for 2 Adults and 2 Children',
      'Complimentary Meals for Children Under 12 from Kids Menu',
      'JW Garden Herbal Masterclass & Mocktail Workshop',
      'Family Glamping Tent Setup in Suite with Welcome Gift'
    ],
    terms: 'Valid when traveling with children under 12 years old. Subject to suite and family room inventory.',
    eligibility: 'Families & Marriott Bonvoy Members',
    bookingUrl: 'https://www.marriott.com/offers/family-by-jw-culinary-discovery-OFF-3391'
  },
  {
    id: 'offer-bonvoy-bonus-points',
    title: 'Marriott Bonvoy 5,000 Bonus Points Package',
    subtitle: 'The Ritz-Carlton & JW Marriott Collections',
    description: 'Accelerate your elite journey. Earn 5,000 bonus Marriott Bonvoy points per stay on premium luxury accommodations across both featured collections.',
    code: 'BONVOYVIP',
    creditAmount: 100,
    discountPercentage: 10,
    propertyIds: [
      'ritz-carlton-kyoto',
      'ritz-carlton-tokyo',
      'ritz-carlton-half-moon-bay',
      'ritz-carlton-hong-kong',
      'ritz-carlton-dubai',
      'ritz-carlton-kapalu-maui',
      'the-ritz-carlton-vienna',
      'ritz-carlton-new-york-central-park',
      'ritz-carlton-maldives-fari-islands',
      'ritz-carlton-grand-cayman',
      'jw-marriott-venice',
      'jw-marriott-dubai-marquis',
      'jw-marriott-singapore-south-beach',
      'jw-marriott-masai-mara',
      'jw-marriott-cannes',
      'jw-marriott-essex-house-new-york',
      'jw-marriott-marco-island',
      'jw-marriott-grosvenor-house'
    ],
    validUntil: 'December 31, 2027',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
    inclusions: [
      '5,000 Bonus Marriott Bonvoy Points per Stay',
      '10% Preferred Luxury Member Rate Discount',
      'Complimentary Enhanced High-Speed Wi-Fi',
      'Qualifying Elite Night Credit Earning'
    ],
    terms: 'Must be a Marriott Bonvoy member at time of booking and check-in. Bonus points post within 48 hours of checkout.',
    eligibility: 'Marriott Bonvoy Members',
    bookingUrl: 'https://www.marriott.com/loyalty/join/joinPromotion.mi?promotion=BONVOY5K'
  }
];

export const VALID_PROMO_CODES: Record<string, { discountPercent?: number; credit?: number; name: string }> = {
  BONVOYVIP: { discountPercent: 10, credit: 100, name: 'Marriott Bonvoy 5,000 Bonus Points Package' },
  RITZRECONNECT: { credit: 150, name: 'The Ritz-Carlton Reconnect ($150 Resort Credit)' },
  JWMINDFUL: { discountPercent: 15, name: 'JW Marriott Mindful Living (15% Off + Spa Pass)' },
  RITZBNB: { credit: 75, name: 'The Ritz-Carlton Bed & Breakfast Experience' },
  JWFAMILY: { discountPercent: 20, name: 'Family by JW Culinary Discovery (20% Off)' }
};
