export interface BonvoyTierDetail {
  id: string;
  name: string;
  nightsRequired: string;
  spendRequired?: string;
  bonusPointsPercent: number;
  multiplier: number;
  color: string;
  badgeBg: string;
  tagline: string;
  keyBenefits: string[];
}

export const BONVOY_TIERS: BonvoyTierDetail[] = [
  {
    id: 'member',
    name: 'Member',
    nightsRequired: '0–24 Nights / Year',
    bonusPointsPercent: 0,
    multiplier: 10,
    color: '#1c1917',
    badgeBg: 'bg-stone-100 text-stone-800 border-stone-200',
    tagline: 'Your gateway to exclusive rates and instant perks',
    keyBenefits: [
      'Marriott Bonvoy Member Exclusive Rates',
      'Complimentary In-Room Standard Wi-Fi',
      'Mobile Check-In & Contactless Mobile Key',
      'Earn points toward free nights across 8,000+ hotels'
    ]
  },
  {
    id: 'gold-elite',
    name: 'Gold Elite',
    nightsRequired: '25 Nights / Year',
    bonusPointsPercent: 25,
    multiplier: 12.5,
    color: '#b45309',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    tagline: 'Enhanced room upgrades and guaranteed 2 PM checkout',
    keyBenefits: [
      '25% Bonus Points on qualifying hotel purchases',
      'Guaranteed 2:00 PM Late Checkout (subject to availability at resorts)',
      'Enhanced Room Upgrade (based on availability at check-in)',
      '250 or 500 Points Elite Welcome Gift per stay'
    ]
  },
  {
    id: 'platinum-elite',
    name: 'Platinum Elite',
    nightsRequired: '50 Nights / Year',
    bonusPointsPercent: 50,
    multiplier: 15,
    color: '#8a1538',
    badgeBg: 'bg-[#8a1538]/10 text-[#8a1538] border-[#8a1538]/30',
    tagline: 'Lounge access, suite upgrades, and 4 PM late checkout',
    keyBenefits: [
      '50% Bonus Points on qualifying hotel purchases',
      'Guaranteed 4:00 PM Late Checkout',
      'Complimentary Room Upgrade, including Select Suites',
      'Executive Club Lounge Access & daily breakfast',
      'Elite Welcome Gift: choice of breakfast, points, or local amenity',
      'Annual Choice Benefit (5 Suite Night Awards or charitable gift)'
    ]
  },
  {
    id: 'titanium-elite',
    name: 'Titanium Elite',
    nightsRequired: '75 Nights / Year',
    bonusPointsPercent: 75,
    multiplier: 17.5,
    color: '#0f172a',
    badgeBg: 'bg-stone-900 text-amber-300 border-amber-400/40',
    tagline: '75% point bonus and 48-hour guaranteed room availability',
    keyBenefits: [
      '75% Bonus Points on qualifying hotel purchases',
      '48-Hour Guaranteed Room Availability',
      'Second Annual Choice Benefit (e.g. Free Night Award up to 40k points)',
      'United Airlines MileagePlus Premier Status match',
      'All Platinum Elite privileges and priority suite upgrades'
    ]
  },
  {
    id: 'ambassador-elite',
    name: 'Ambassador Elite',
    nightsRequired: '100 Nights + $23,000 USD Annual Spend',
    spendRequired: '$23,000 USD qualifying spend',
    bonusPointsPercent: 75,
    multiplier: 17.5,
    color: '#4c0519',
    badgeBg: 'bg-rose-950 text-white border-rose-800',
    tagline: 'The pinnacle of bespoke luxury with personal Ambassador service',
    keyBenefits: [
      'Dedicated Personal Ambassador to coordinate all global travel',
      'Your24™: Choose your exact 24-hour check-in and check-out times',
      'All Titanium Elite privileges and highest upgrade priority',
      'VIP personalized culinary and room amenities at every stay'
    ]
  }
];

export interface BonvoyMoment {
  id: string;
  title: string;
  category: 'Culinary' | 'Sports' | 'Arts & Lifestyle' | 'Music & Entertainment';
  location: string;
  image: string;
  pointsStartingBid: number;
  date: string;
  description: string;
  verifiedPartner: string;
}

export const BONVOY_MOMENTS: BonvoyMoment[] = [
  {
    id: 'moment-f1-paddock',
    title: 'Mercedes-AMG PETRONAS F1 Team VIP Paddock Club Access',
    category: 'Sports',
    location: 'Monaco / Montreal / Austin',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    pointsStartingBid: 125000,
    date: 'Exclusive Race Weekends',
    description: 'Experience the exhilarating world of Formula 1 with VIP pit lane walks, driver meet-and-greets, and gourmet catering directly above the team garages.',
    verifiedPartner: 'Official Marriott Bonvoy Team Partner'
  },
  {
    id: 'moment-paris-michelin',
    title: 'Private 3-Star Michelin Kitchen Counter Tasting with Chef Master',
    category: 'Culinary',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    pointsStartingBid: 65000,
    date: 'Year-Round Availability',
    description: 'An intimate 9-course gastronomic experience seated directly inside the historic kitchen, paired with grand cru Burgundies from the private cellar.',
    verifiedPartner: 'Marriott Bonvoy Fine Dining Guild'
  },
  {
    id: 'moment-kyoto-zen',
    title: 'Private Sunrise Meditation & Tea Ceremony at UNESCO Temple',
    category: 'Arts & Lifestyle',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    pointsStartingBid: 45000,
    date: 'Exclusive Monthly Bookings',
    description: 'Enter a closed-door Kyoto Zen temple before public hours for private meditation guided by the Head Abbot, followed by an authentic seasonal matcha ritual.',
    verifiedPartner: 'Curated by The Ritz-Carlton, Kyoto'
  }
];
