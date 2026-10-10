import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { ImageWithFallback } from './ImageWithFallback';
import {
  ShieldCheck,
  Briefcase,
  Utensils,
  Home,
  Compass,
  CreditCard,
  Sparkles,
  CheckCircle2,
  Phone,
  ArrowRight,
  ExternalLink,
  Gift,
  Award,
  Calendar,
  DollarSign,
  X,
  Star,
  MapPin,
  Clock,
  Coffee,
  Wine,
  Percent,
  FileText,
  Calculator,
  Bookmark,
  ChevronRight,
  Building,
  Users,
  Search,
  Check,
  Sliders,
  Plane,
  Heart
} from 'lucide-react';

export const ExperienceDetailPage: React.FC = () => {
  const { currentView, goToSearchResults, goToPropertyDetails, goToHotelLocations, goToGolf } = useBooking();

  // Insurance State
  const [insuranceSelectedPlan, setInsuranceSelectedPlan] = useState<'standard' | 'premium' | 'annual'>('premium');
  const [insuranceTripCost, setInsuranceTripCost] = useState(3500);
  const [insuranceTravelers, setInsuranceTravelers] = useState(2);
  const [insuranceSubmitted, setInsuranceSubmitted] = useState(false);
  const [insuranceCertificate, setInsuranceCertificate] = useState<string | null>(null);

  // Business Program State
  const [businessSubmitted, setBusinessSubmitted] = useState(false);
  const [businessCode, setBusinessCode] = useState<string | null>(null);
  const [bizEmployees, setBizEmployees] = useState(15);
  const [bizNightsPerEmployee, setBizNightsPerEmployee] = useState(12);

  // Dining State
  const [diningModalOpen, setDiningModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [tablePartySize, setTablePartySize] = useState('2 Guests');
  const [tableDate, setTableDate] = useState('2026-05-20');
  const [tableTime, setTableTime] = useState('7:30 PM');
  const [tableService, setTableService] = useState('Dinner');
  const [tableBookingSuccess, setTableBookingSuccess] = useState<string | null>(null);

  // Residences State
  const [residenceModalOpen, setResidenceModalOpen] = useState(false);
  const [selectedResidence, setSelectedResidence] = useState<any>(null);
  const [residenceInquirySent, setResidenceInquirySent] = useState(false);

  // Credit Card State
  const [selectedCardForApply, setSelectedCardForApply] = useState<any>(null);
  const [cardApplySuccess, setCardApplySuccess] = useState(false);
  const [monthlyHotelSpend, setMonthlyHotelSpend] = useState(500);
  const [monthlyDiningSpend, setMonthlyDiningSpend] = useState(400);

  // Travel Tips Article Modal
  const [activeArticle, setActiveArticle] = useState<any>(null);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);

  // Outdoor Expedition State
  const [outdoorModalOpen, setOutdoorModalOpen] = useState(false);
  const [selectedOutdoorItem, setSelectedOutdoorItem] = useState<any>(null);
  const [outdoorBookingConfirmed, setOutdoorBookingConfirmed] = useState<string | null>(null);

  /* ─────────────────────────────────────────────────────────────
     1. RESIDENCES VIEW
  ───────────────────────────────────────────────────────────── */
  if (currentView === 'residences') {
    const residencesList = [
      {
        id: 'res-waikiki',
        title: 'The Ritz-Carlton Residences, Waikiki Beach',
        location: 'Honolulu, Oahu, Hawaii',
        region: 'North America',
        price: 'From $1,850,000 (Penthouses to $12M)',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
        desc: 'Rising above iconic Waikiki with unobstructed Pacific ocean views. Features two infinity pools on the 7th and 8th floors, signature Dean & DeLuca culinary market, and 24-hour Ritz-Carlton residential concierges.',
        specs: ['Studio to 4-Bedroom Penthouses', 'Custom Italian Miele Kitchens', 'Private Ocean Balconies', 'Valet & Yacht Berths Available'],
        highlights: 'Highest infinity pool in Waikiki with private cabanas and sushi salon.'
      },
      {
        id: 'res-ny-stregis',
        title: 'The St. Regis Residences, New York',
        location: 'Fifth Avenue, Manhattan, NY',
        region: 'North America',
        price: 'From $3,400,000',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        desc: 'Unmatched Fifth Avenue heritage. Live steps from Central Park with legendary 24-hour St. Regis Butler Service, in-residence dining from the executive chef, and private access to the Astor Court and King Cole Bar.',
        specs: ['1 to 3-Bedroom Landmark Suites', 'Original Beaux-Arts Ceilings', 'Dedicated Resident Butler', 'Bentley House Car On-Demand'],
        highlights: 'Full access to legendary St. Regis Butler Service and Astor Library.'
      },
      {
        id: 'res-dubai-jw',
        title: 'JW Marriott Residences, Palm Jumeirah',
        location: 'Palm Jumeirah, Dubai, UAE',
        region: 'Middle East',
        price: 'From $2,100,000',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        desc: 'Beachfront living with breathtaking views of the Dubai Marina skyline and Arabian Gulf. Designed around mindful wellness, featuring direct beach access, private plunge pools, and wellness spa suites.',
        specs: ['2 to 5-Bedroom Waterfront Sky Villas', 'Private Pool Terraces', 'Resident Yacht Berths', 'Mindful Serenity Garden'],
        highlights: 'Private 800-meter sandy beach with dedicated residential beach club.'
      },
      {
        id: 'res-miami-rc',
        title: 'The Ritz-Carlton Residences, Miami Beach',
        location: 'Surprise Lake, Miami Beach, Florida',
        region: 'North America',
        price: 'From $2,600,000',
        image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
        desc: 'Designed by Italian master architect Piero Lissoni across seven waterfront acres. Features private marina with day yachts, rooftop pool deck with cabanas, meditation gardens, and art studio.',
        specs: ['2 to 5-Bedroom Residences & Villas', 'Private Boat Slips', 'Lissoni Custom Cabinetry', 'On-Site Medical Concierge'],
        highlights: 'Private day yacht with captain dedicated exclusively to residents.'
      },
      {
        id: 'res-bangkok-rc',
        title: 'The Ritz-Carlton Residences at MahaNakhon',
        location: 'Silom / Sathorn, Bangkok, Thailand',
        region: 'Asia Pacific',
        price: 'From $1,400,000',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        desc: 'Commanding the top floors of Thailand’s most recognizable architectural landmark. Dramatic pixelated glass skyboxes, private residents club on the 54th floor, and 360-degree views of the Chao Phraya River.',
        specs: ['2 to 5-Bedroom Duplex & Penthouses', '3.5-meter Ceiling Heights', 'Private Resident Sky Lounge', '24/7 Concierge & Valet'],
        highlights: 'Iconic cantilevered glass sky terraces 300 meters above Bangkok.'
      },
      {
        id: 'res-dubai-stregis',
        title: 'The St. Regis Residences, Downtown Dubai',
        location: 'Opera District, Downtown Dubai, UAE',
        region: 'Middle East',
        price: 'From $1,750,000',
        image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=80',
        desc: 'Situated directly in the prestigious Opera District moments from Burj Khalifa and Dubai Mall. Offers refined St. Regis residential service, private cigar lounge, infinity lap pools, and lush landscaped podium gardens.',
        specs: ['1 to 3-Bedroom Luxury Residences', 'Burj Khalifa & Fountain Views', 'Astor Boardroom & Library', 'Infinity Edge Sun Terrace'],
        highlights: 'Exclusive walking bridge connection directly to Dubai Opera.'
      }
    ];

    return (
      <div className="bg-[#faf9f6] min-h-screen">
        {/* Hero Banner */}
        <div className="relative bg-stone-900 text-white py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
              alt="Marriott Residences"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.22em] font-bold mb-4 shadow-sm">
              <Home className="w-3.5 h-3.5" />
              <span>Whole-Ownership Luxury Real Estate</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-4">
              Marriott Bonvoy Residences
            </h1>
            <p className="max-w-3xl mx-auto text-stone-200 text-sm sm:text-base font-light leading-relaxed mb-6">
              Live where legendary service is a daily reality. Explore whole-ownership luxury condominiums, townhomes, and private sky villas branded by The Ritz-Carlton, St. Regis, and JW Marriott across the world’s premier destinations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Over 130+ Residential Enclaves Worldwide
              </span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Automatic VIP Ambassador Status for Owners
              </span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                24/7 Dedicated Residential Concierge
              </span>
            </div>
          </div>
        </div>

        {/* Benefits of Ownership Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8a1538] mb-2 block">
              The Residential Privilege
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
              What It Means to Own a Marriott Residence
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Owning a branded residence combines private deeded ownership with five-star bespoke hospitality and global status.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: ShieldCheck,
                title: 'Dedicated Director of Residences',
                desc: 'A permanent, private staff managed directly by The Ritz-Carlton or St. Regis exclusively serving residence owners, separate from hotel guests.'
              },
              {
                icon: Award,
                title: 'VIP Ambassador Elite Status',
                desc: 'Owners automatically receive top-tier Marriott Bonvoy Ambassador Elite status, granting global suite upgrades, 24-hour check-in/out, and points bonuses worldwide.'
              },
              {
                icon: Utensils,
                title: 'In-Residence Private Catering',
                desc: 'Executive chefs prepare multi-course dinners directly in your private kitchen, with sommelier wine cellaring and room service dining 24/7.'
              },
              {
                icon: Sparkles,
                title: 'Global Owner Privileges & Rates',
                desc: 'Enjoy preferred owner room discounts, VIP welcome amenities, and upgrade priority at more than 8,900 Marriott Bonvoy properties across the globe.'
              }
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-[#8a1538]/10 text-[#8a1538] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-900 mb-2">{b.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Properties Grid */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Featured Residential Collections</h2>
              <p className="text-xs text-stone-500 mt-1">Available whole-ownership condominiums, townhomes & penthouses</p>
            </div>
            <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-full">
              6 Curated Global Enclaves
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {residencesList.map(res => (
              <div
                key={res.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                  <img
                    src={res.image}
                    alt={res.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-stone-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                      {res.region}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-stone-900 shadow-xs">
                    {res.price}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-[#8a1538] font-bold uppercase tracking-wider mb-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{res.location}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 group-hover:text-[#8a1538] transition-colors leading-snug">
                      {res.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {res.desc}
                    </p>

                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 mb-4">
                      <p className="text-[11px] font-semibold text-stone-900 mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#8a1538]" />
                        Key Residence Features:
                      </p>
                      <ul className="grid grid-cols-1 gap-1 text-[11px] text-stone-600">
                        {res.specs.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#8a1538]" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedResidence(res);
                        setResidenceInquirySent(false);
                        setResidenceModalOpen(true);
                      }}
                      className="w-full py-2.5 bg-[#8a1538] hover:bg-[#6b102c] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                    >
                      Request Digital Brochure & Pricing
                    </button>
                    <button
                      onClick={() => goToSearchResults({ destination: res.location })}
                      className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
                    >
                      View Neighboring Hotel Suites
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ownership Inquiry Modal */}
        {residenceModalOpen && selectedResidence && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
              <button
                onClick={() => setResidenceModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] text-[#8a1538] uppercase font-bold tracking-wider block">
                  Private Residential Inquiry
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                  {selectedResidence.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">{selectedResidence.location}</p>
              </div>

              {residenceInquirySent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">Brochure Request Confirmed</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                    The confidential residential prospectus and current floor plans have been emailed to your address. A dedicated residential sales director will follow up with private viewing availability.
                  </p>
                  <button
                    onClick={() => setResidenceModalOpen(false)}
                    className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl mt-4"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setResidenceInquirySent(true);
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">First Name *</label>
                      <input required type="text" placeholder="Eleanor" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Last Name *</label>
                      <input required type="text" placeholder="Vance" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Email Address *</label>
                    <input required type="email" placeholder="eleanor.vance@luxury.com" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Phone Number</label>
                      <input type="tel" placeholder="+1 (555) 019-2834" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Desired Layout</label>
                      <select className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
                        <option>2-Bedroom Sky Suite</option>
                        <option>3-Bedroom Residence</option>
                        <option>4-Bedroom + Penthouse</option>
                        <option>Entire Floor Villa</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Price Range Preference</label>
                    <select className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
                      <option>$1.5M - $3.0M</option>
                      <option>$3.0M - $6.0M</option>
                      <option>$6.0M - $10.0M+</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#8a1538] hover:bg-[#6b102c] text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs mt-2"
                  >
                    Send Confidential Inquiry & Download PDF
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     2. DINE & DRINK VIEW
  ───────────────────────────────────────────────────────────── */
  if (currentView === 'dine-drink') {
    const diningVenues = [
      {
        id: 'dine-mizuki',
        name: 'Tempura Mizuki (1 Michelin Star)',
        hotel: 'The Ritz-Carlton, Kyoto',
        city: 'Kyoto, Japan',
        cuisine: 'Artisanal Japanese Tempura & Kaiseki',
        chef: 'Master Chef Kenji Fujimoto',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
        rating: 4.9,
        priceTier: '$$$$',
        desc: 'Seasonal Kyoto vegetables, Matsuba crab, and Omi Wagyu fried to airy perfection in pure sesame oil, served on a 300-year-old cedar counter over looking peaceful Zen pebble gardens.',
        highlights: 'Michelin Star recipient every year since 2017. Exclusive 8-seat chef counter.'
      },
      {
        id: 'dine-king-cole',
        name: 'The King Cole Bar & Salon',
        hotel: 'The St. Regis New York',
        city: 'Manhattan, New York, USA',
        cuisine: 'Historic Cocktails & Elevated American',
        chef: 'Executive Chef Vincent Vane',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
        rating: 4.8,
        priceTier: '$$$',
        desc: 'Home of the original Red Snapper (the St. Regis Bloody Mary created in 1934 by Fernand Petiot). Sip beneath the iconic Maxfield Parrish King Cole mural amidst polished mahogany and leather booths.',
        highlights: 'The original 1934 Bloody Mary recipe with vodka, tomato, Worcestershire, and tabasco.'
      },
      {
        id: 'dine-dopolavoro',
        name: 'Dopolavoro Dining Room',
        hotel: 'JW Marriott Venice Resort & Spa',
        city: 'Venice, Italy',
        cuisine: 'Contemporary Venetian Haute Cuisine',
        chef: 'Chef Giorgio Damiani',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        rating: 4.9,
        priceTier: '$$$$',
        desc: 'Farm-to-table culinary artistry cultivated directly from Rose Island’s 100-year-old olive groves and organic herb gardens, accompanied by rare Amarone and Chianti Classico vintages.',
        highlights: 'Private island dining reached via complimentary mahogany water taxi from St. Mark’s.'
      },
      {
        id: 'dine-tin-lung-heen',
        name: 'Tin Lung Heen (2 Michelin Stars)',
        hotel: 'The Ritz-Carlton, Hong Kong',
        city: 'Kowloon, Hong Kong',
        cuisine: 'Refined Cantonese Dim Sum & Seafood',
        chef: 'Chef Paul Lau Ping-Lui',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
        rating: 4.9,
        priceTier: '$$$$',
        desc: 'Perched on the 102nd floor overlooking Victoria Harbour. Renowned worldwide for barbequed Iberian pork with honey, double-boiled sea conch soup, and vintage Pu-erh tea pairings.',
        highlights: 'Highest two-Michelin-star restaurant on Earth with sweeping cloud-level panoramas.'
      },
      {
        id: 'dine-le-bernardin-lounge',
        name: 'The Lounge at BLT Prime & The Grill',
        hotel: 'The Ritz-Carlton, Half Moon Bay',
        city: 'Northern California, USA',
        cuisine: 'California Coastal Raw Bar & Prime Steaks',
        chef: 'Executive Chef Roberto Santillan',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        rating: 4.8,
        priceTier: '$$$',
        desc: 'Overlooking crashing Pacific breakers and seaside fairways. Feast on Dungeness crab cakes, Bodega Bay oysters, and 45-day dry-aged Tomahawk ribeyes paired with Napa Valley Cabernet.',
        highlights: 'Oceanfront fire pits with artisanal s’mores and sunset bagpipe performance.'
      },
      {
        id: 'dine-living-room',
        name: 'The Living Room & Raw Bar',
        hotel: 'W South Beach',
        city: 'Miami Beach, Florida, USA',
        cuisine: 'Craft Mixology, Ceviche & Osetra Caviar',
        chef: 'Chef Andres Morales',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        rating: 4.7,
        priceTier: '$$$',
        desc: 'Chic nightlife venue featuring house-infused craft spirits, tropical botanical syrups, live DJ vinyl sets, and an extraordinary collection of museum-quality contemporary art.',
        highlights: 'Daily sunset aperitivo hour with champagne by the glass and oyster service.'
      }
    ];

    return (
      <div className="bg-[#faf9f6] min-h-screen">
        {/* Hero */}
        <div className="relative bg-stone-900 text-white py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2000&q=80"
              alt="Dine and Drink"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-500/40 text-rose-300 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.22em] font-bold mb-4 shadow-sm">
              <Utensils className="w-3.5 h-3.5" />
              <span>Epicurean Excellence Worldwide</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-4">
              Dine & Drink by Marriott Bonvoy
            </h1>
            <p className="max-w-3xl mx-auto text-stone-200 text-sm sm:text-base font-light leading-relaxed mb-6">
              Over 10,000 restaurants, bars, and lounges across 139 countries. From Michelin-starred dining rooms and historic speakeasies to rooftop cocktail terraces. Earn 10 points per dollar spent without needing a room stay.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Earn 10X Points on Every Dollar Spent
              </span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Michelin-Starred & World's 50 Best Chefs
              </span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                No Hotel Stay Required to Earn Points
              </span>
            </div>
          </div>
        </div>

        {/* Earning Breakdown Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-900">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#8a1538]/10 text-[#8a1538] flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base">Earn Points Locally</h4>
                <p className="text-xs text-stone-600 mt-1">
                  Dine at participating restaurants and simply charge to your registered Bonvoy card or show your app to earn 10 points per US$1.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base">Elite Member Bonuses</h4>
                <p className="text-xs text-stone-600 mt-1">
                  Gold, Platinum, and Titanium members earn up to 75% more points, plus complimentary chef amenities and preferred seating.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base">Stack with Co-Branded Cards</h4>
                <p className="text-xs text-stone-600 mt-1">
                  Pay with the Marriott Bonvoy Brilliant or Bevy card to earn up to 16X total points per dollar spent dining.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Featured Culinary Destinations</h2>
              <p className="text-xs text-stone-500 mt-1">Reserve a table online or preview signature chef creations</p>
            </div>
            <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-full">
              Instant Online Reservations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diningVenues.map(d => (
              <div
                key={d.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-stone-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                      {d.cuisine}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full text-xs font-bold text-stone-900 shadow-xs">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{d.rating}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-xs px-2.5 py-0.5 rounded-md font-mono">
                    {d.priceTier}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-stone-500 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8a1538]" />
                      <span>{d.city} · {d.hotel}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-1 group-hover:text-[#8a1538] transition-colors leading-snug">
                      {d.name}
                    </h3>

                    <p className="text-[11px] font-semibold text-stone-400 mb-2">Led by {d.chef}</p>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {d.desc}
                    </p>

                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 mb-4 text-[11px] text-stone-700 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{d.highlights}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedRestaurant(d);
                        setTableBookingSuccess(null);
                        setDiningModalOpen(true);
                      }}
                      className="w-full py-2.5 bg-[#8a1538] hover:bg-[#6b102c] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                    >
                      Reserve Table at {d.name.split(' (')[0]}
                    </button>
                    <button
                      onClick={() => goToSearchResults({ destination: d.city })}
                      className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
                    >
                      View Hotel Stays in {d.city.split(',')[0]}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Reservation Modal */}
        {diningModalOpen && selectedRestaurant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
              <button
                onClick={() => setDiningModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] text-[#8a1538] uppercase font-bold tracking-wider block">
                  Table Reservation
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                  {selectedRestaurant.name}
                </h3>
                <p className="text-xs text-stone-500">{selectedRestaurant.hotel} · {selectedRestaurant.city}</p>
              </div>

              {tableBookingSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">Table Confirmed!</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                    Confirmation #{tableBookingSuccess} has been issued. A table for {tablePartySize} has been reserved on {tableDate} at {tableTime}. You will earn 10 points per dollar spent.
                  </p>
                  <button
                    onClick={() => setDiningModalOpen(false)}
                    className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl mt-4"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setTableBookingSuccess('DINE-' + Math.floor(100000 + Math.random() * 900000));
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Reservation Date</label>
                      <input
                        type="date"
                        value={tableDate}
                        onChange={e => setTableDate(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Party Size</label>
                      <select
                        value={tablePartySize}
                        onChange={e => setTablePartySize(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                      >
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                        <option>5-6 Guests</option>
                        <option>Private Dining (7+)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Service</label>
                      <select
                        value={tableService}
                        onChange={e => setTableService(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                      >
                        <option>Dinner</option>
                        <option>Lunch</option>
                        <option>Afternoon Tea</option>
                        <option>Late Evening Cocktail</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Preferred Time</label>
                      <select
                        value={tableTime}
                        onChange={e => setTableTime(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                      >
                        <option>6:00 PM</option>
                        <option>6:30 PM</option>
                        <option>7:00 PM</option>
                        <option>7:30 PM</option>
                        <option>8:00 PM</option>
                        <option>8:30 PM</option>
                        <option>9:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Seating Preference</label>
                    <select className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
                      <option>Main Dining Room Window</option>
                      <option>Chef's Counter Experience</option>
                      <option>Outdoor Garden Terrace</option>
                      <option>Quiet Booth</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Special Occasion or Dietary Notes</label>
                    <input
                      type="text"
                      placeholder="e.g., Anniversary, Birthday, Vegetarian, Gluten-Free"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#8a1538] hover:bg-[#6b102c] text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs mt-2"
                  >
                    Confirm Table Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     3. EXPLORE OUTDOORS VIEW
  ───────────────────────────────────────────────────────────── */
  if (currentView === 'outdoors') {
    const outdoorAdventures = [
      {
        id: 'out-aspen',
        title: 'The St. Regis Aspen Resort',
        location: 'Aspen, Colorado, USA',
        season: 'Winter & Summer',
        activity: 'Ski-in/Ski-out & Rocky Mountain Treks',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
        desc: 'Located at the base of Aspen Mountain, featuring custom ski butler services, heated outdoor mountainside pools, fat tire snow biking, and summer high-altitude wildflower hikes.',
        highlights: 'Direct base village lift access, Remède Spa heated pools, and winter snowshoe tours.'
      },
      {
        id: 'out-bachelor-gulch',
        title: 'The Ritz-Carlton, Bachelor Gulch',
        location: 'Beaver Creek / Vail Valley, Colorado',
        season: 'All-Year Alpine',
        activity: 'Ski-in/Ski-out & Beaver Creek Mountain Biking',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
        desc: 'Grand timber mountain lodge tucked on the slopes of Beaver Creek Mountain. Features ski-in/ski-out lockers, outdoor log fireplaces, fly fishing on the Eagle River, and St. Bernard dog ambassadors.',
        highlights: 'Signature fireside s’mores, guided snowshoe nature walks, and 21,000 sq ft subterranean rock spa.'
      },
      {
        id: 'out-half-moon-bay',
        title: 'The Ritz-Carlton, Half Moon Bay',
        location: 'Northern California Coast, USA',
        season: 'Coastal All-Year',
        activity: 'Coastal Bluff Hikes & Pacific Surfing',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        desc: 'Hugging miles of windswept California Coastal Trail bluffs. Watch migrating gray whales and sea otters, catch legendary Mavericks surf breaks, or cycle through fragrant coastal cypress groves.',
        highlights: 'Direct California Coastal Trail pathway access and seaside fire pits.'
      },
      {
        id: 'out-bora-bora',
        title: 'The St. Regis Bora Bora Resort',
        location: 'Bora Bora, French Polynesia',
        season: 'Tropical Year-Round',
        activity: 'Lagoonarium Snorkeling & Shark Safari',
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
        desc: 'Private overwater bungalows facing Mount Otemanu with protected coral reef diving, sailing catamarans, deep-sea marlin fishing, and Polynesian outrigger canoe expeditions.',
        highlights: 'Private Lagoonarium sanctuary curated by marine biologists with Napoleon wrasse and stingrays.'
      },
      {
        id: 'out-masai-mara',
        title: 'JW Marriott Masai Mara Lodge',
        location: 'Masai Mara National Reserve, Kenya',
        season: 'Great Migration & Safari',
        activity: 'Luxury Tented Safari & Big Five Game Drives',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        desc: 'Overlooking the banks of the Talek River within the world-renowned Masai Mara. Experience twice-daily game drives in open 4x4 Land Cruisers, hot air balloon sunrises, and stargazing from canvas decks.',
        highlights: 'Front-row view of the annual Great Wildebeest Migration and Maasai cultural village walks.'
      },
      {
        id: 'out-dove-mountain',
        title: 'The Ritz-Carlton, Dove Mountain',
        location: 'Marana (Tucson), Arizona, USA',
        season: 'Desert Oasis',
        activity: 'Tortolita Mountain Hikes & Stargazing',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
        desc: 'Enveloped by giant Saguaro cacti and the rugged Tortolita Mountains. Offers 26 miles of marked hiking trails, mountain biking, native flute twilight performances, and dark-sky astronomer sessions.',
        highlights: 'Guided night-vision desert wildlife expeditions and Jack Nicklaus 27-hole golf.'
      }
    ];

    return (
      <div className="bg-[#faf9f6] min-h-screen">
        {/* Hero */}
        <div className="relative bg-stone-900 text-white py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80"
              alt="Explore Outdoors"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.22em] font-bold mb-4 shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>Wilderness & Nature Sanctuaries</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-4">
              Explore Outdoors
            </h1>
            <p className="max-w-3xl mx-auto text-stone-200 text-sm sm:text-base font-light leading-relaxed mb-6">
              Alpine ski-in/ski-out chalets, African savannah safari lodges, private coral reef sanctuaries, and desert canyon trails. Reconnect with raw nature surrounded by five-star Marriott Bonvoy luxury.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Over 80+ National Park & Alpine Gateways
              </span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Dedicated Ski Butlers & Naturalist Guides
              </span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                Eco-Certified Conservation Stays
              </span>
            </div>
          </div>
        </div>

        {/* Adventures Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">Featured Nature & Adventure Sanctuaries</h2>
              <p className="text-xs text-stone-500 mt-1">Book mountain chalets, coastal bluffs, and African safaris</p>
            </div>
            <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-full">
              6 Curated Expeditions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outdoorAdventures.map(adv => (
              <div
                key={adv.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                  <img
                    src={adv.image}
                    alt={adv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-emerald-950/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                      {adv.season}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-lg">
                    {adv.activity}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-stone-500 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8a1538]" />
                      <span>{adv.location}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 group-hover:text-[#8a1538] transition-colors leading-snug">
                      {adv.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {adv.desc}
                    </p>

                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 mb-4 text-[11px] text-stone-700 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{adv.highlights}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedOutdoorItem(adv);
                        setOutdoorBookingConfirmed(null);
                        setOutdoorModalOpen(true);
                      }}
                      className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                    >
                      Inquire on Outdoor Package & Itinerary
                    </button>
                    <button
                      onClick={() => goToSearchResults({ destination: adv.location })}
                      className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Check Room Availability
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outdoor Inquiry Modal */}
        {outdoorModalOpen && selectedOutdoorItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
              <button
                onClick={() => setOutdoorModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] text-emerald-700 uppercase font-bold tracking-wider block">
                  Outdoor Expedition Inquiry
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                  {selectedOutdoorItem.title}
                </h3>
                <p className="text-xs text-stone-500">{selectedOutdoorItem.location}</p>
              </div>

              {outdoorBookingConfirmed ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">Expedition Itinerary Requested</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                    Confirmation #{outdoorBookingConfirmed} recorded. The resort’s outdoor concierge and naturalist team will prepare a custom expedition schedule based on your desired activity level.
                  </p>
                  <button
                    onClick={() => setOutdoorModalOpen(false)}
                    className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl mt-4"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setOutdoorBookingConfirmed('OUT-' + Math.floor(100000 + Math.random() * 900000));
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Target Travel Month</label>
                      <select className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
                        <option>June 2026</option>
                        <option>July 2026</option>
                        <option>August 2026</option>
                        <option>December 2026</option>
                        <option>January 2027</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Number of Travelers</label>
                      <select className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
                        <option>2 Adults</option>
                        <option>1 Adult</option>
                        <option>Family (2 Adults, 2 Kids)</option>
                        <option>Group (5+ Adults)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Preferred Activity Focus</label>
                    <select className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
                      <option>Alpine Skiing & Snowboarding with Ski Butler</option>
                      <option>Wildlife Safari & Professional Photography</option>
                      <option>Scuba Diving & Coral Conservation</option>
                      <option>Scenic Mountain Biking & Trail Trekking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Equipment & Rental Needs</label>
                    <input
                      type="text"
                      placeholder="e.g., Premium Demo Skis, Scuba BCD, Full Suspension Bikes"
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#8a1538] hover:bg-[#6b102c] text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs mt-2"
                  >
                    Request Custom Expedition Plan
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     4. TRAVEL INSURANCE VIEW
  ───────────────────────────────────────────────────────────── */
  if (currentView === 'insurance') {
    const plans = [
      {
        id: 'standard',
        name: 'Standard Trip Protection',
        price: Math.round(insuranceTripCost * 0.05),
        rateLabel: 'approx. 5% of trip cost',
        cancellation: '100% of Trip Cost',
        interruption: '125% of Trip Cost',
        medical: '$25,000 Emergency Medical',
        evacuation: '$100,000 Emergency Evacuation',
        baggage: '$1,000 Lost / $500 Delayed',
        pointsProtect: 'Points Redeposit Fee Reimbursement ($150)',
        popular: false
      },
      {
        id: 'premium',
        name: 'Comprehensive Global Plan',
        price: Math.round(insuranceTripCost * 0.08),
        rateLabel: 'approx. 8% of trip cost',
        cancellation: '100% of Trip Cost (plus Cancel For Any Reason 75%)',
        interruption: '150% of Trip Cost',
        medical: '$50,000 Emergency Medical & Dental',
        evacuation: '$250,000 Emergency Evacuation',
        baggage: '$2,500 Lost / $1,000 Delayed Luggage',
        pointsProtect: '100% Marriott Bonvoy Points Protection ($500 cap)',
        popular: true
      },
      {
        id: 'annual',
        name: 'Annual Multi-Trip Executive',
        price: 289,
        rateLabel: 'Flat annual fee for all trips',
        cancellation: 'Up to $5,000 per trip (Unlimited trips/year)',
        interruption: '$7,500 per trip',
        medical: '$100,000 Worldwide Emergency Medical',
        evacuation: '$500,000 Global Air Ambulance',
        baggage: '$3,000 per trip + Golf Club Coverage',
        pointsProtect: 'Unlimited Annual Points Redeposit Reimbursement',
        popular: false
      }
    ];

    const currentPlan = plans.find(p => p.id === insuranceSelectedPlan) || plans[1];

    return (
      <div className="bg-[#faf9f6] min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Marriott Bonvoy Travel Protection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
              Comprehensive Travel Insurance
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Underwritten by leading global travel insurers. Safeguard your hotel rooms, non-refundable flights, luggage, and international medical emergencies with exclusive coverage designed for Marriott Bonvoy members.
            </p>
          </div>

          {/* Interactive Calculator Controls */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm mb-12">
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#8a1538]" />
              Estimate Your Personalized Travel Protection Premium
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-stone-700">Total Trip Cost (Hotels, Flights, Tours)</label>
                  <span className="font-mono font-bold text-sm text-[#8a1538]">${insuranceTripCost.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={insuranceTripCost}
                  onChange={e => setInsuranceTripCost(Number(e.target.value))}
                  className="w-full accent-[#8a1538] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                  <span>$500</span>
                  <span>$7,500</span>
                  <span>$15,000+</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-stone-700">Number of Travelers Covered</label>
                  <span className="font-mono font-bold text-sm text-stone-900">{insuranceTravelers} Travelers</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map(num => (
                    <button
                      key={num}
                      onClick={() => setInsuranceTravelers(num)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                        insuranceTravelers === num
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {num} {num === 1 ? 'Person' : 'People'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map(p => {
              const isSelected = insuranceSelectedPlan === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setInsuranceSelectedPlan(p.id as any)}
                  className={`bg-white rounded-2xl p-6 sm:p-7 border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                    isSelected
                      ? 'border-[#8a1538] shadow-xl ring-2 ring-[#8a1538]/10'
                      : 'border-stone-200 hover:border-stone-300 shadow-xs'
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8a1538] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                      Most Recommended by Travelers
                    </span>
                  )}

                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-stone-900">{p.name}</h3>
                        <span className="text-[11px] text-stone-500">{p.rateLabel}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif font-bold text-2xl text-stone-900">${p.price}</span>
                        <span className="text-[10px] text-stone-400 block">{p.id === 'annual' ? '/year' : '/trip'}</span>
                      </div>
                    </div>

                    <div className="space-y-3 py-4 border-t border-b border-stone-100 text-xs text-stone-600">
                      <div>
                        <strong className="text-stone-900 block text-[11px]">Trip Cancellation:</strong>
                        <span>{p.cancellation}</span>
                      </div>
                      <div>
                        <strong className="text-stone-900 block text-[11px]">Emergency Medical:</strong>
                        <span>{p.medical}</span>
                      </div>
                      <div>
                        <strong className="text-stone-900 block text-[11px]">Emergency Evacuation:</strong>
                        <span>{p.evacuation}</span>
                      </div>
                      <div>
                        <strong className="text-stone-900 block text-[11px]">Baggage & Sporting Gear:</strong>
                        <span>{p.baggage}</span>
                      </div>
                      <div>
                        <strong className="text-stone-900 block text-[11px]">Bonvoy Points Protection:</strong>
                        <span className="text-emerald-700 font-semibold">{p.pointsProtect}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      className={`w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                        isSelected
                          ? 'bg-[#8a1538] text-white'
                          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? '✓ Plan Selected' : 'Select Plan'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action / Activate Policy */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm max-w-2xl mx-auto">
            {insuranceSubmitted ? (
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Insurance Policy Activated!
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Certificate #{insuranceCertificate} has been generated for {insuranceTravelers} traveler(s) covering up to ${insuranceTripCost.toLocaleString()} under the <strong>{currentPlan.name}</strong>.
                </p>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs text-stone-700 space-y-1 max-w-md mx-auto">
                  <p>• <strong>Emergency 24/7 Hotline:</strong> +1 (800) 555-0199 (Toll-Free Worldwide)</p>
                  <p>• <strong>Underwriter:</strong> Marriott Bonvoy Global Protection Syndicate</p>
                  <p>• <strong>Instant Claims Portal:</strong> marriott.com/insurance/claims</p>
                </div>
                <button
                  onClick={() => setInsuranceSubmitted(false)}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl"
                >
                  Adjust Policy / Back
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-stone-900">Confirm Policy Enrollment</h4>
                <p className="text-xs text-stone-600">
                  You are enrolling in the <strong>{currentPlan.name}</strong> for ${currentPlan.price} covering {insuranceTravelers} travelers for a trip value of ${insuranceTripCost.toLocaleString()}.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Primary Traveler Name</label>
                    <input type="text" defaultValue="Eleanor Vance" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Marriott Bonvoy Number</label>
                    <input type="text" defaultValue="982 410 882" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const cert = 'MB-INS-' + Math.floor(100000 + Math.random() * 900000);
                    setInsuranceCertificate(cert);
                    setInsuranceSubmitted(true);
                  }}
                  className="w-full py-3.5 bg-[#8a1538] hover:bg-[#6b102c] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors"
                >
                  Activate {currentPlan.name} (${currentPlan.price})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     5. SMALL & MIDSIZE BUSINESS PROGRAM VIEW
  ───────────────────────────────────────────────────────────── */
  if (currentView === 'business-program') {
    const annualSpendEst = bizEmployees * bizNightsPerEmployee * 220;
    const annualSavingsEst = Math.round(annualSpendEst * 0.07);
    const bonusPointsEst = Math.round(annualSpendEst * 10);

    return (
      <div className="bg-[#faf9f6] min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-[#8a1538]/10 text-[#8a1538] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Marriott Bonvoy Business Access</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
              Small & Midsize Business Travel Program
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Empower your growing enterprise with negotiated corporate hotel savings, centralized company reporting, and automatic Elite Status upgrades for your traveling team members.
            </p>
          </div>

          {/* Three Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#8a1538]/10 text-[#8a1538] flex items-center justify-center mb-3">
                <Percent className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">Up to 7% Rate Savings</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Exclusive corporate discount rates across 8,900+ properties globally, with last-room availability and flexible 24-hour cancellation terms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">Centralized Billing & Invoicing</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Single monthly corporate statement, travel policy spend limits, and real-time electronic folio receipts delivered directly to accounting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">Automatic Elite Status</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                All traveling employees receive instant Marriott Bonvoy Elite status, priority late checkout, and accelerated points earnings.
              </p>
            </div>
          </div>

          {/* Interactive Savings Calculator */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm mb-12">
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#8a1538]" />
              Estimate Your Company’s Annual Savings
            </h3>
            <p className="text-xs text-stone-500 mb-6">See how much cash and bonus points your team can earn by booking through the official business portal.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-stone-700">Traveling Employees</label>
                  <span className="font-mono font-bold text-sm text-stone-900">{bizEmployees} Employees</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={bizEmployees}
                  onChange={e => setBizEmployees(Number(e.target.value))}
                  className="w-full accent-[#8a1538] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-stone-700">Average Hotel Nights per Employee / Year</label>
                  <span className="font-mono font-bold text-sm text-stone-900">{bizNightsPerEmployee} Nights</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="50"
                  value={bizNightsPerEmployee}
                  onChange={e => setBizNightsPerEmployee(Number(e.target.value))}
                  className="w-full accent-[#8a1538] cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-stone-50 rounded-xl border border-stone-200 text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Est. Annual Travel Spend</span>
                <span className="font-serif font-bold text-xl text-stone-900">${annualSpendEst.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Cash Savings (Up to 7%)</span>
                <span className="font-serif font-bold text-xl text-emerald-700">${annualSavingsEst.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8a1538] block">Company Points Earned</span>
                <span className="font-serif font-bold text-xl text-[#8a1538]">+{bonusPointsEst.toLocaleString()} pts</span>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm max-w-2xl mx-auto">
            {businessSubmitted ? (
              <div className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Business Account Approved!
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Your dedicated Corporate Booking Code is <strong className="font-mono text-stone-900 bg-stone-100 px-2 py-0.5 rounded">{businessCode}</strong>. Your employees can now use this code at checkout to unlock up to 7% discounts and automatic Elite status.
                </p>
                <button
                  onClick={() => goToSearchResults()}
                  className="px-6 py-2.5 bg-[#8a1538] text-white text-xs font-semibold rounded-xl"
                >
                  Test Corporate Booking Now →
                </button>
              </div>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setBusinessCode('CORP-MB-' + Math.floor(10000 + Math.random() * 90000));
                  setBusinessSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div className="border-b border-stone-100 pb-3">
                  <h4 className="font-serif font-bold text-base text-stone-900">Enroll Your Company in Minutes</h4>
                  <p className="text-xs text-stone-500">No minimum annual spend required. Free instant corporate membership.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Company Legal Name *</label>
                    <input required type="text" placeholder="Apex Innovations Global LLC" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Corporate Work Email *</label>
                    <input required type="email" placeholder="travel@apexinnovations.com" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Program Administrator Name *</label>
                    <input required type="text" placeholder="Sarah Jenkins" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Company Headquarters Country</label>
                    <select className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Germany</option>
                      <option>Japan</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#8a1538] hover:bg-[#6b102c] text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  Activate Corporate Account & Generate Booking Code
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     6. CREDIT CARDS VIEW
  ───────────────────────────────────────────────────────────── */
  if (currentView === 'credit-cards') {
    const cards = [
      {
        id: 'card-brilliant',
        title: 'Marriott Bonvoy Brilliant®',
        issuer: 'American Express',
        annualFee: '$650',
        welcomeOffer: '185,000 Bonus Points',
        welcomeDetail: 'After spending $6,000 on eligible purchases in the first 6 months.',
        tier: 'Automatic Platinum Elite Status',
        freeNight: 'Annual Free Night Award (up to 85,000 points)',
        statementCredit: '$300 Annual Dining Statement Credit (up to $25/mo)',
        lounge: 'Priority Pass™ Select Airport Lounge Access',
        multipliers: '6X at Marriott · 3X on Dining & Flights · 2X Other',
        eliteNights: '25 Elite Night Credits each calendar year'
      },
      {
        id: 'card-bevy',
        title: 'Marriott Bonvoy Bevy™',
        issuer: 'American Express',
        annualFee: '$250',
        welcomeOffer: '85,000 Bonus Points',
        welcomeDetail: 'After spending $5,000 on eligible purchases in the first 6 months.',
        tier: 'Automatic Gold Elite Status',
        freeNight: 'Free Night Award after $15,000 annual spend (up to 50,000 points)',
        statementCredit: '1,000 Bonus Points per qualifying paid stay',
        lounge: 'No airport lounge access',
        multipliers: '6X at Marriott · 4X on Restaurants & Groceries · 2X Other',
        eliteNights: '15 Elite Night Credits each calendar year'
      },
      {
        id: 'card-boundless',
        title: 'Marriott Bonvoy Boundless®',
        issuer: 'Chase Visa Signature',
        annualFee: '$95',
        welcomeOffer: '3 Free Night Awards',
        welcomeDetail: 'Each night valued up to 50,000 points after $3,000 spend in first 3 months.',
        tier: 'Automatic Gold Elite Status',
        freeNight: 'Annual Free Night Award every card anniversary (up to 35,000 points)',
        statementCredit: 'Earn 1 Elite Night Credit for every $5,000 spent',
        lounge: 'No airport lounge access',
        multipliers: 'Up to 17X total at Marriott (6X Card + 10X Base + 1X Elite bonus)',
        eliteNights: '15 Elite Night Credits each calendar year'
      },
      {
        id: 'card-bold',
        title: 'Marriott Bonvoy Bold®',
        issuer: 'Chase Visa',
        annualFee: '$0 (No Annual Fee)',
        welcomeOffer: '30,000 Bonus Points',
        welcomeDetail: 'After spending $1,000 on purchases in the first 3 months.',
        tier: 'Instant Member Rewards & Free Wi-Fi',
        freeNight: 'No annual free night award',
        statementCredit: 'No Foreign Transaction Fees abroad',
        lounge: 'No airport lounge access',
        multipliers: 'Up to 14X total at Marriott · 2X on Travel & Grocery',
        eliteNights: '5 Elite Night Credits each calendar year'
      }
    ];

    const estimatedAnnualPoints = monthlyHotelSpend * 12 * 6 + monthlyDiningSpend * 12 * 3;

    return (
      <div className="bg-[#faf9f6] min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8a1538] mb-2 block">
              Official Co-Branded Travel Cards
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
              Marriott Bonvoy Credit Cards
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Fast-track your pathway to Platinum Elite status, unlock annual Free Night Awards, and earn up to 6X points on every stay with official Chase and American Express cards.
            </p>
          </div>

          {/* Spend Calculator */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm mb-12">
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#8a1538]" />
              Calculate Your Annual Rewards Earnings
            </h3>
            <p className="text-xs text-stone-500 mb-6">See how quickly your ordinary spending translates into free luxury hotel nights.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-stone-700">Monthly Marriott Hotel Spend</label>
                  <span className="font-mono font-bold text-sm text-[#8a1538]">${monthlyHotelSpend} /mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2500"
                  step="50"
                  value={monthlyHotelSpend}
                  onChange={e => setMonthlyHotelSpend(Number(e.target.value))}
                  className="w-full accent-[#8a1538] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-stone-700">Monthly Dining & Restaurant Spend</label>
                  <span className="font-mono font-bold text-sm text-stone-900">${monthlyDiningSpend} /mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={monthlyDiningSpend}
                  onChange={e => setMonthlyDiningSpend(Number(e.target.value))}
                  className="w-full accent-[#8a1538] cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs text-stone-600 block">Est. Annual Points from Card Purchases Alone:</span>
                <strong className="text-xl font-bold font-serif text-stone-900">
                  {estimatedAnnualPoints.toLocaleString()} Marriott Bonvoy Points
                </strong>
              </div>
              <span className="text-xs font-semibold text-amber-900 bg-amber-100/80 px-3 py-1.5 rounded-full">
                Equivalent to ~{Math.floor(estimatedAnnualPoints / 25000)} Free Hotel Nights
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {cards.map(card => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{card.issuer}</span>
                      <h3 className="font-serif font-bold text-xl text-stone-900">{card.title}</h3>
                    </div>
                    <span className="text-xs font-bold text-stone-900 bg-stone-100 px-3 py-1.5 rounded-full">
                      {card.annualFee}
                    </span>
                  </div>

                  {/* Welcome Offer Callout */}
                  <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl mb-6">
                    <span className="text-[10px] text-amber-800 font-bold uppercase block tracking-wider">Welcome Offer</span>
                    <strong className="text-lg font-bold text-amber-950 block">{card.welcomeOffer}</strong>
                    <span className="text-xs text-amber-900/80 leading-snug block mt-0.5">{card.welcomeDetail}</span>
                  </div>

                  {/* Key Card Perks */}
                  <div className="space-y-3 text-xs text-stone-700 mb-6">
                    <div className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-[#8a1538] shrink-0 mt-0.5" />
                      <span><strong>Elite Status:</strong> {card.tier}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Gift className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Free Night:</strong> {card.freeNight}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CreditCard className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                      <span><strong>Earning Multipliers:</strong> {card.multipliers}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                      <span><strong>Night Credits:</strong> {card.eliteNights}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCardForApply(card);
                    setCardApplySuccess(false);
                  }}
                  className="w-full py-3 bg-[#8a1538] hover:bg-[#6b102c] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs text-center"
                >
                  Apply Now & View Terms
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Card Application Modal */}
        {selectedCardForApply && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
              <button
                onClick={() => setSelectedCardForApply(null)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] text-[#8a1538] uppercase font-bold tracking-wider block">
                  Card Pre-Qualification & Application
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                  {selectedCardForApply.title}
                </h3>
                <p className="text-xs text-stone-500">{selectedCardForApply.annualFee} Annual Fee · {selectedCardForApply.issuer}</p>
              </div>

              {cardApplySuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">Application Pre-Approved!</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                    Congratulations! Your instant pre-qualification for the {selectedCardForApply.title} has succeeded. Your new account has been linked to your Marriott Bonvoy member profile, granting your {selectedCardForApply.tier}.
                  </p>
                  <button
                    onClick={() => setSelectedCardForApply(null)}
                    className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl mt-4"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setCardApplySuccess(true);
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 space-y-1 text-[11px]">
                    <p>• <strong>Welcome Offer:</strong> {selectedCardForApply.welcomeOffer}</p>
                    <p>• <strong>Credit Pull:</strong> Soft check only for pre-approval demonstration</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">First Name *</label>
                      <input required type="text" defaultValue="Eleanor" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Last Name *</label>
                      <input required type="text" defaultValue="Vance" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Residential Street Address</label>
                    <input type="text" placeholder="742 Evergreen Terrace" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Annual Gross Income</label>
                      <select className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
                        <option>$75,000 - $125,000</option>
                        <option>$125,000 - $200,000</option>
                        <option>$200,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Bonvoy Member ID</label>
                      <input type="text" defaultValue="982 410 882" className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#8a1538] hover:bg-[#6b102c] text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs mt-2"
                  >
                    Submit Pre-Approval Check
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     7. FALLBACK / TRAVEL TIPS & IDEAS VIEW
  ───────────────────────────────────────────────────────────── */
  const articles = [
    {
      id: 'tip-suite-night',
      category: 'Loyalty Mastery',
      title: 'The Insider’s Guide to Suite Night Awards: How to Guarantee Presidential Upgrades',
      author: 'Julian Thorne, Global Luxury Concierge',
      readTime: '6 min read',
      date: 'Spring 2026',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      desc: 'Suite Night Awards (Nightly Upgrade Awards) are one of the most potent perks of Platinum and Titanium Elite status. Learn the exact 5-day confirmation mechanics, how to select target suites without diluting your odds, and which resorts in Maui, Paris, and Dubai have the highest upgrade inventory.',
      tips: [
        'Select only 1 or 2 top-tier suites rather than checking every junior room to maximize value.',
        'Midweek check-ins (Tuesday through Thursday) have an 82% higher success rate than weekend holidays.',
        'If an upgrade fails to clear, points and awards are automatically refunded to your wallet.'
      ]
    },
    {
      id: 'tip-5th-night',
      category: 'Points Optimization',
      title: 'The Art of the 5th Night Free: Maximizing Points in Maldives, Paris & Maui',
      author: 'Clara Chen, Senior Travel Editor',
      readTime: '5 min read',
      date: 'Spring 2026',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      desc: 'When you redeem Marriott Bonvoy points for a consecutive five-night stay at any standard property worldwide, you automatically receive the lowest-point night completely free of charge. Here is how to stretch your points balance by 20% on every dream redemption.',
      tips: [
        'Always book in increments of 5 nights (5, 10, or 15) to trigger the complimentary night deduction.',
        'Points and cash upgrades can be stacked with 5th Night Free reservations.',
        'Pair with off-peak point redemption calendars to lock in 5 nights for under 160,000 points total.'
      ]
    },
    {
      id: 'tip-onsen-etiquette',
      category: 'Cultural Guide',
      title: 'The Art of the Japanese Onsen: Etiquette & Rituals at The Ritz-Carlton, Kyoto',
      author: 'Hiroshi Tanaka, Master of Ceremonies',
      readTime: '7 min read',
      date: 'Japan Cultural Series',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      desc: 'Immersing yourself in Japan’s mineral hot springs is a spiritual reset. From the traditional pre-wash ritual at cedar stools to understanding yukata robe folds and privacy etiquette, master the serene customs of Japanese luxury bathing.',
      tips: [
        'Always fold the left side of your yukata robe over the right (right over left is reserved for funeral rites).',
        'Wash thoroughly before entering the mineral bath; the bathwater itself is intended solely for soaking.',
        'Tattoos can be covered with skin-tone waterproof patches available discretely at the spa reception.'
      ]
    },
    {
      id: 'tip-tokyo-48h',
      category: 'City Spotlight',
      title: '48 Hours in Tokyo: Michelin Ramen, Imperial Gardens & Sky-High Ginza Lounges',
      author: 'Elena Rostova, Tokyo Correspondent',
      readTime: '8 min read',
      date: 'City Travel Guide',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      desc: 'From sunrise tuna auctions and hidden Ginza speakeasies to panoramic views of Mount Fuji from The Tokyo EDITION, Toranomon. Your curated 48-hour itinerary through the world’s most dynamic culinary capital.',
      tips: [
        'Visit Meiji Jingu shrine before 8:00 AM to experience the sacred forest groves in total silence.',
        'Book your sushi omakase seat at least 60 days in advance via your hotel head concierge.',
        'End the night with a Japanese whisky highball 38 floors above the city at The Ritz-Carlton Bar.'
      ]
    },
    {
      id: 'tip-luxury-packing',
      category: 'Travel Advice',
      title: 'Packing for Five-Star Resorts: Alpine Chalet to Tropical Overwater Sanctuary',
      author: 'Marcus Sterling, Wardrobe Stylist',
      readTime: '4 min read',
      date: 'Practical Essentials',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      desc: 'How to pack effortlessly for five-star destinations with varying dress codes. Master breathable linen layering for St. Regis Bora Bora and smart cashmere evening attire for Aspen fireplaces without overpacking.',
      tips: [
        'Carry two tailored blazers: one unlined linen for tropical dinners and one worsted wool for mountain lounges.',
        'Bring multi-country universal GaN power adapters to charge laptops, cameras, and phones simultaneously.',
        'Take advantage of complimentary overnight pressing service included in all St. Regis Butler suites.'
      ]
    },
    {
      id: 'tip-butler-service',
      category: 'Heritage',
      title: 'The St. Regis Butler Service: History, Etiquette & How to Make the Most of Your Stay',
      author: 'Archibald Sterling, Head Butler',
      readTime: '6 min read',
      date: 'Bespoke Hospitality',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      desc: 'Introduced in 1904 by John Jacob Astor IV, the St. Regis Butler Service remains one of the world’s gold standards of luxury. Learn what services are complimentary, how to request wardrobe unpacking, and the tradition of morning tea.',
      tips: [
        'Complimentary garment pressing is included for two items per guest per day.',
        'Ask your butler to draw a custom bath with artisanal bath salts upon return from a long flight.',
        'Request morning coffee service delivered to your bedside table at your exact waking minute.'
      ]
    }
  ];

  return (
    <div className="bg-[#faf9f6] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8a1538] mb-2 block">
            Editorial & Travel Guides
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 mb-4">
            Travel Tips & Ideas
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Curated editorial guides, insider loyalty strategies, and destination secrets recommended by Marriott luxury concierges and master travelers worldwide.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(art => {
            const isSaved = savedArticles.includes(art.id);
            return (
              <div
                key={art.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-stone-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                        {art.category}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (isSaved) {
                          setSavedArticles(savedArticles.filter(id => id !== art.id));
                        } else {
                          setSavedArticles([...savedArticles, art.id]);
                        }
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/95 rounded-full text-stone-800 hover:text-[#8a1538] shadow-xs"
                      aria-label="Bookmark article"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#8a1538] text-[#8a1538]' : ''}`} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
                      <span>{art.date}</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 group-hover:text-[#8a1538] transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                      {art.desc}
                    </p>

                    <p className="text-[11px] font-semibold text-stone-500 mb-4">
                      By {art.author}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    onClick={() => setActiveArticle(art)}
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-xl transition-colors text-center"
                  >
                    Read Full Article & Tips →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] text-[#8a1538] uppercase font-bold tracking-wider block mb-1">
              {activeArticle.category} · {activeArticle.readTime}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              {activeArticle.title}
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Published by {activeArticle.author} · {activeArticle.date}
            </p>

            <div className="aspect-16/9 rounded-xl overflow-hidden mb-6 bg-stone-100">
              <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-6 font-serif">
              {activeArticle.desc}
            </p>

            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/60 mb-6">
              <h4 className="font-serif font-bold text-sm text-amber-950 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Key Takeaways & Concierge Secrets:
              </h4>
              <ul className="space-y-2 text-xs text-amber-900/90">
                {activeArticle.tips.map((tip: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-100">
              <button
                onClick={() => {
                  setActiveArticle(null);
                  goToSearchResults();
                }}
                className="py-2.5 px-5 bg-[#8a1538] hover:bg-[#6b102c] text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Find Hotels Related to this Guide
              </button>
              <button
                onClick={() => setActiveArticle(null)}
                className="py-2.5 px-5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
