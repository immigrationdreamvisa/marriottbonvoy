export interface JobOpening {
  id: string;
  jobId: string;
  title: string;
  department: 'Culinary & F&B' | 'Hotel Operations' | 'Guest Services & Concierge' | 'Sales & Marketing' | 'Management' | 'Technology & Corporate';
  property: string;
  location: string;
  country: string;
  brand: string;
  employmentType: 'Full-Time' | 'Part-Time' | 'Executive';
  experienceLevel: 'Entry Level' | 'Mid-Career' | 'Leadership';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  postedDate: string;
  applyUrl: string;
}

export const CAREER_CATEGORIES = [
  {
    id: 'hotel-ops',
    title: 'Hotel Operations',
    description: 'Lead front desk, housekeeping, engineering, and guest service teams ensuring flawless daily hotel operations.',
    icon: 'Building2',
    openingsCount: 14
  },
  {
    id: 'culinary-fb',
    title: 'Food & Beverage / Culinary',
    description: 'Craft Michelin-starred culinary artistry, sommelier wine programs, and signature banquet dining.',
    icon: 'UtensilsCrossed',
    openingsCount: 22
  },
  {
    id: 'guest-services',
    title: 'Guest Services & Concierge',
    description: 'Deliver anticipatory Les Clefs d’Or concierge guidance, bespoke butler care, and memorable arrivals.',
    icon: 'Sparkles',
    openingsCount: 18
  },
  {
    id: 'sales-marketing',
    title: 'Sales & Marketing',
    description: 'Drive luxury global brand campaigns, high-profile gala events, and corporate client partnerships.',
    icon: 'TrendingUp',
    openingsCount: 9
  },
  {
    id: 'management',
    title: 'Management & Leadership',
    description: 'General Management, Director of Operations, and Department Heads steering 5-star hospitality flagships.',
    icon: 'Award',
    openingsCount: 12
  },
  {
    id: 'corporate-tech',
    title: 'Corporate & Technology',
    description: 'Software engineering, digital guest key innovation, cloud architecture, and global brand strategy at HQ.',
    icon: 'Globe2',
    openingsCount: 15
  }
];

export const TAKE_CARE_PILLARS = [
  {
    title: 'Put People First',
    subtitle: 'The J.W. Marriott Philosophy',
    description: '“Take care of your associates and they will take care of the customers, and the customers will come back.” Our associates are the foundation of everything we build.'
  },
  {
    title: 'Pursue Excellence',
    subtitle: 'The Gold Standard of Service',
    description: 'We hold ourselves to uncompromising standards of craftsmanship, guest hospitality, architectural elegance, and culinary distinction worldwide.'
  },
  {
    title: 'Embrace Change',
    subtitle: 'Innovation in Travel & Tech',
    description: 'We pioneer modern digital check-in, sustainable architectural construction, and next-generation luxury travel technologies.'
  },
  {
    title: 'Act with Integrity',
    subtitle: 'Ethical Leadership',
    description: 'How we do business is just as important as the business we do. We operate with radical transparency, honesty, and fairness.'
  },
  {
    title: 'Serve Our World',
    subtitle: 'Serve 360 Sustainability',
    description: 'Committed to social impact, environmental preservation, reducing carbon footprints, and supporting disaster relief in our local communities.'
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-01',
    jobId: 'MAR-2026-8910',
    title: 'Executive Pastry Chef',
    department: 'Culinary & F&B',
    property: 'The Ritz-Carlton, Kyoto',
    location: 'Kyoto',
    country: 'Japan',
    brand: 'The Ritz-Carlton',
    employmentType: 'Full-Time',
    experienceLevel: 'Leadership',
    description: 'Lead the celebrated pastry kitchen at The Ritz-Carlton, Kyoto, collaborating with the Pierre Hermé Paris boutique and crafting seasonal afternoon teas overlooking the Kamogawa River.',
    responsibilities: [
      'Direct the creation of daily artisanal pastry and dessert presentations for Michelin-starred venues and banquet events.',
      'Maintain the legendary Gold Standards of The Ritz-Carlton kitchen hygiene, timing, and precision.',
      'Mentor and develop an international team of talented pastry chefs and apprentice patissiers.',
      'Manage food cost budgets and source seasonal local Japanese ingredients.'
    ],
    qualifications: [
      'Minimum 5 years of senior pastry management experience in luxury 5-star hotels or Michelin-starred restaurants.',
      'Mastery of French classical pastry techniques and modern Japanese confectionery artistry.',
      'Demonstrated leadership in kitchen inventory management and international HACCP hygiene protocols.',
      'Fluent English; working Japanese conversational ability preferred.'
    ],
    postedDate: 'October 2, 2026',
    applyUrl: 'https://careers.marriott.com/job/executive-pastry-chef-kyoto'
  },
  {
    id: 'job-02',
    jobId: 'MAR-2026-7442',
    title: 'Chief Sommelier & Beverage Director',
    department: 'Culinary & F&B',
    property: 'JW Marriott Venice Resort & Spa',
    location: 'Venice',
    country: 'Italy',
    brand: 'JW Marriott',
    employmentType: 'Full-Time',
    experienceLevel: 'Leadership',
    description: 'Oversee the comprehensive Venetian wine cellar and beverage program across Fiola at Dopolavoro and rooftop lounge on our private island, Isola delle Rose.',
    responsibilities: [
      'Curate a 1,200-reference wine program showcasing Italian indigenous grapes, organic producers, and international icons.',
      'Host exclusive olive grove wine tastings and masterclasses for resort guests and VIP loyalty members.',
      'Conduct regular sommelier training sessions for front-of-house service staff.',
      'Drive wine sales revenue and cellar inventory rotation.'
    ],
    qualifications: [
      'Court of Master Sommeliers Advanced or WSET Level 4 Diploma certified.',
      'At least 4 years of luxury hospitality wine director or head sommelier experience.',
      'Fluent in Italian and English; additional European languages advantageous.',
      'Deep knowledge of regional Italian viticulture and olive oil production.'
    ],
    postedDate: 'September 28, 2026',
    applyUrl: 'https://careers.marriott.com/job/chief-sommelier-venice'
  },
  {
    id: 'job-03',
    jobId: 'MAR-2026-6129',
    title: 'Director of Guest Experience & Butler Services',
    department: 'Guest Services & Concierge',
    property: 'The St. Regis Aspen Resort',
    location: 'Aspen, Colorado',
    country: 'United States',
    brand: 'The St. Regis',
    employmentType: 'Full-Time',
    experienceLevel: 'Leadership',
    description: 'Command the St. Regis Butler Service department at the base of Aspen Mountain. Deliver anticipatory service, evening champagne sabrage rituals, and ski valet arrangements.',
    responsibilities: [
      'Lead the team of St. Regis Butlers providing bespoke unpacking, garment pressing, and beverage service.',
      'Coordinate high-profile VIP guest itineraries, private mountain transport, and dining reservations.',
      'Train new associates in historic St. Regis brand heritage and butler protocols.',
      'Analyze guest satisfaction feedback to maintain top-tier Forbes 5-Star ratings.'
    ],
    qualifications: [
      'Graduate of the International Butler Academy or minimum 4 years luxury hotel butler leadership.',
      'Proven expertise in managing VIP guest relationships and discreet luxury hospitality.',
      'Exceptional communication, poise, and crisis management skills.',
      'Valid authorization to work in the United States.'
    ],
    postedDate: 'October 5, 2026',
    applyUrl: 'https://careers.marriott.com/job/director-guest-experience-aspen'
  },
  {
    id: 'job-04',
    jobId: 'MAR-2026-5581',
    title: 'Front Office Operations Manager',
    department: 'Hotel Operations',
    property: 'JW Marriott Grosvenor House London',
    location: 'London',
    country: 'United Kingdom',
    brand: 'JW Marriott',
    employmentType: 'Full-Time',
    experienceLevel: 'Mid-Career',
    description: 'Lead front-of-house operations at one of Mayfair’s largest and most prestigious luxury addresses on Park Lane, overseeing reception, guest relations, and concierge teams.',
    responsibilities: [
      'Oversee smooth check-in/check-out processes for 496 guest rooms and suites.',
      'Champion Marriott Bonvoy Elite guest recognition and priority lounge access protocols.',
      'Monitor daily room inventory and maximize room upgrade revenues.',
      'Resolve guest concerns proactively with genuine warmth and professionalism.'
    ],
    qualifications: [
      '3+ years front office managerial experience in a 400+ room upscale or luxury city hotel.',
      'Proficiency in Opera PMS / Marriott property management software systems.',
      'Demonstrated track record of improving guest engagement and loyalty enrollment scores.',
      'Right to work in the United Kingdom.'
    ],
    postedDate: 'October 1, 2026',
    applyUrl: 'https://careers.marriott.com/job/front-office-manager-london'
  },
  {
    id: 'job-05',
    jobId: 'MAR-2026-4820',
    title: 'Digital Experience & Mobile Engineering Lead',
    department: 'Technology & Corporate',
    property: 'Marriott International Global HQ',
    location: 'Bethesda, Maryland',
    country: 'United States',
    brand: 'Corporate',
    employmentType: 'Full-Time',
    experienceLevel: 'Leadership',
    description: 'Spearhead the architecture and evolution of the Marriott Bonvoy global mobile application and contactless guest digital key experiences.',
    responsibilities: [
      'Lead a high-performing software engineering pod developing iOS, Android, and web touchpoints.',
      'Architect low-latency reservation query endpoints handling over 250 million annual requests.',
      'Partner with UX design and security teams to implement biometrics and frictionless digital payment flows.',
      'Drive engineering excellence, automated CI/CD deployment, and high uptime resiliency.'
    ],
    qualifications: [
      'BS or MS in Computer Science, Software Engineering, or equivalent experience.',
      '7+ years in modern full-stack web and mobile systems (TypeScript, React, cloud microservices).',
      'Experience in high-traffic consumer platforms with millions of active users.',
      'Passion for travel, hospitality technologies, and user-centric software design.'
    ],
    postedDate: 'September 25, 2026',
    applyUrl: 'https://careers.marriott.com/job/engineering-lead-bethesda'
  },
  {
    id: 'job-06',
    jobId: 'MAR-2026-3114',
    title: 'Director of Luxury Sales & Global Partnerships',
    department: 'Sales & Marketing',
    property: 'The Paris EDITION',
    location: 'Paris',
    country: 'France',
    brand: 'EDITION',
    employmentType: 'Full-Time',
    experienceLevel: 'Leadership',
    description: 'Drive high-end leisure and corporate group sales for the iconic Paris EDITION near Place Vendôme, cultivating relationships with luxury travel advisors and fashion house partners.',
    responsibilities: [
      'Develop and execute tailored revenue strategies for Paris Fashion Week and international luxury summits.',
      'Maintain strong direct relationships with Virtuoso and Marriott STARS luxury travel networks.',
      'Lead a high-performing sales and event catering management team.',
      'Exceed annual room night quotas and catering revenue targets.'
    ],
    qualifications: [
      '5+ years senior sales leadership in Parisian 5-star boutique or palace hotels.',
      'Bilingual fluency in French and English required.',
      'Established network across European and North American luxury travel advisory firms.',
      'Bachelor’s degree in Hospitality, Business, or related discipline.'
    ],
    postedDate: 'October 4, 2026',
    applyUrl: 'https://careers.marriott.com/job/director-sales-paris'
  },
  {
    id: 'job-07',
    jobId: 'MAR-2026-2901',
    title: 'Hotel General Manager',
    department: 'Management',
    property: 'The Ritz-Carlton Maldives, Fari Islands',
    location: 'North Malé Atoll',
    country: 'Maldives',
    brand: 'The Ritz-Carlton',
    employmentType: 'Executive',
    experienceLevel: 'Leadership',
    description: 'Steer overall strategic operations, guest satisfaction, financial profitability, and brand compliance for our award-winning circular overwater villa resort.',
    responsibilities: [
      'Provide visionary executive leadership to over 350 Ladies and Gentlemen associates.',
      'Maintain flawless Forbes 5-Star inspection ratings and world-class guest satisfaction metrics.',
      'Oversee environmental sustainability initiatives in partnership with the Jean-Michel Cousteau Ocean Futures Society.',
      'Deliver robust EBITDAR returns and manage annual capital expenditure projects.'
    ],
    qualifications: [
      'Proven General Manager experience in world-class remote island or ultra-luxury resorts.',
      'Deep understanding of resort island logistics, engineering, and marine conservation standards.',
      'Exceptional international owner-relations and asset-management expertise.',
      'Inspiring leadership and dedication to The Ritz-Carlton Gold Standards.'
    ],
    postedDate: 'October 3, 2026',
    applyUrl: 'https://careers.marriott.com/job/general-manager-maldives'
  }
];
