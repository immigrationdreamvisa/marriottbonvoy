import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { ImageWithFallback } from './ImageWithFallback';
import {
  Flag,
  Calendar,
  Users,
  Award,
  Clock,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Compass,
  X,
  Star,
  Check,
  Sliders,
  Gift,
  DollarSign
} from 'lucide-react';

interface GolfResort {
  id: string;
  name: string;
  location: string;
  region: 'North America' | 'Europe' | 'Caribbean & Latin America';
  courseDesigner: string;
  holesCount: number;
  par: number;
  yardage: string;
  slopeRating: string;
  image: string;
  description: string;
  amenities: string[];
  signatureHole: string;
  packagePrice: number;
  officialPropertyId?: string;
}

const GOLF_RESORTS: GolfResort[] = [
  {
    id: 'rc-grande-lakes-orlando',
    name: 'The Ritz-Carlton Golf Club, Grande Lakes',
    location: 'Orlando, Florida, USA',
    region: 'North America',
    courseDesigner: 'Greg Norman',
    holesCount: 18,
    par: 72,
    yardage: '7,122 yds',
    slopeRating: '138 / 74.3',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    description: 'Home of the annual PGA Tour PNC Championship. Norman designed this course with wide pine corridors, strategically placed water hazards, and pristine Bermuda greens enveloped by natural Florida live oaks.',
    amenities: ['Caddie Concierge Program', 'TaylorMade Qi10 Rental Clubs', 'Grande Lakes Golf Academy', 'Fairways Clubhouse Restaurant'],
    signatureHole: 'Hole 18 – 448-yard Par 4 guarded by lake hazards and grandstands',
    packagePrice: 385,
    officialPropertyId: 'jw-marriott-marco-island'
  },
  {
    id: 'rc-half-moon-bay-golf',
    name: 'The Ritz-Carlton, Half Moon Bay - Ocean & Old Courses',
    location: 'Half Moon Bay, California, USA',
    region: 'North America',
    courseDesigner: 'Arthur Hills & Arnold Palmer',
    holesCount: 36,
    par: 72,
    yardage: '6,854 yds',
    slopeRating: '133 / 73.1',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    description: 'Dramatic championship golf hugging two miles of sheer Pacific Ocean bluffs. Play classic Scottish links with ocean winds, cypress groves, and bagpipers serenading sunset on the 18th lawn.',
    amenities: ['36 Oceanfront Holes', 'Titleist Performance Fitting', 'Ocean Lawn Putting Green', 'The Conservatory 19th Hole'],
    signatureHole: 'Ocean Hole 18 – 405-yard Par 4 perched high above crashing waves',
    packagePrice: 420,
    officialPropertyId: 'ritz-carlton-half-moon-bay'
  },
  {
    id: 'jw-desert-ridge-wildfire',
    name: 'Wildfire Golf Club at JW Marriott Desert Ridge',
    location: 'Phoenix, Arizona, USA',
    region: 'North America',
    courseDesigner: 'Arnold Palmer & Nick Faldo',
    holesCount: 36,
    par: 71,
    yardage: '7,149 yds',
    slopeRating: '135 / 73.8',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80',
    description: 'Surrounded by the majestic McDowell Mountains and ancient Saguaro desert cactus. Features two distinct 18-hole championship courses: the picturesque Palmer and the strategic Faldo.',
    amenities: ['Palmer & Faldo Dual Courses', 'PGA Certified Instructors', 'TrackMan Range Technology', 'Meritage Steakhouse at Clubhouse'],
    signatureHole: 'Faldo Hole 2 – Strategic bunker complex with desert mountain backdrop',
    packagePrice: 295
  },
  {
    id: 'turnberry-ailsa',
    name: 'Turnberry, A Luxury Collection Resort - The Ailsa Course',
    location: 'Ayrshire, Scotland, UK',
    region: 'Europe',
    courseDesigner: 'Willie Fernie / Martin Ebert',
    holesCount: 36,
    par: 71,
    yardage: '7,448 yds',
    slopeRating: '141 / 76.2',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    description: 'Four-time host to The Open Championship. Legendary coastal links where historic dunes wind around the iconic Turnberry Lighthouse and towering granite cliffs of Ailsa Craig.',
    amenities: ['Historic Open Championship Links', 'Turnberry Lighthouse Halfway House', 'Links Golf Academy', 'Duel in the Sun Restaurant'],
    signatureHole: 'Hole 9 – 448-yard Par 4 hugging the Atlantic cliff edge and lighthouse',
    packagePrice: 510
  },
  {
    id: 'jw-marco-island-rookery',
    name: 'The Rookery at Marco & Hammock Bay Golf Clubs',
    location: 'Marco Island, Florida, USA',
    region: 'North America',
    courseDesigner: 'Robert Cupp Jr. & Peter Jacobsen',
    holesCount: 36,
    par: 72,
    yardage: '7,180 yds',
    slopeRating: '137 / 74.4',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1200&q=80',
    description: 'Nestled amidst lush Southwest Florida wetlands and mangrove forests. Certified Audubon Cooperative Sanctuaries with bald eagles, alligators, and scenic water carries on every hole.',
    amenities: ['Audubon Certified Sanctuary', 'Private Marco Island Golf Clinic', 'GPS-Equipped Golf Carts', 'Clubhouse Veranda Dining'],
    signatureHole: 'Hammock Bay Hole 18 – Island green approach surrounded by water',
    packagePrice: 275,
    officialPropertyId: 'jw-marriott-marco-island'
  },
  {
    id: 'rc-dove-mountain-golf',
    name: 'The Ritz-Carlton Golf Club, Dove Mountain',
    location: 'Marana (Tucson), Arizona, USA',
    region: 'North America',
    courseDesigner: 'Jack Nicklaus',
    holesCount: 27,
    par: 72,
    yardage: '7,349 yds',
    slopeRating: '140 / 75.1',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80',
    description: 'Former home of the WGC-Accenture Match Play Championship. Features 27 holes of Jack Nicklaus Signature desert mountain championship golf with sweeping elevation changes.',
    amenities: ['27-Hole Nicklaus Layout', 'Tortolita Mountain Vistas', 'Championship Practice Facility', 'Cayton’s Burger Bistro & Patio'],
    signatureHole: 'Saguaro Hole 9 – Dramatic 463-yard dogleg uphill into the Tortolitas',
    packagePrice: 320
  },
  {
    id: 'westin-kierland-golf',
    name: 'The Kierland Golf Club at The Westin Kierland Resort',
    location: 'Scottsdale, Arizona, USA',
    region: 'North America',
    courseDesigner: 'Scott Miller',
    holesCount: 27,
    par: 72,
    yardage: '6,956 yds',
    slopeRating: '131 / 73.0',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    description: 'Troon-managed resort golf featuring three distinct nine-hole championship layouts (Acacia, Ironwood, and Mesquite). Known for innovative golf experiences including Segway Golf and air-conditioned carts.',
    amenities: ['Troon Golf Management', 'GolfBoard & Segway Golf Rentals', 'Climate-Controlled Carts', 'Brittlebush Bar & Grill'],
    signatureHole: 'Acacia Hole 9 – Stunning approach over desert washes to the resort lake',
    packagePrice: 280
  },
  {
    id: 'st-regis-bahia-beach-golf',
    name: 'Bahia Beach Golf Club at The St. Regis Bahia Beach',
    location: 'Rio Grande, Puerto Rico',
    region: 'Caribbean & Latin America',
    courseDesigner: 'Robert Trent Jones Jr.',
    holesCount: 18,
    par: 72,
    yardage: '7,014 yds',
    slopeRating: '136 / 74.2',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    description: 'Certified Silver Audubon Signature Sanctuary routed along two miles of pure Caribbean beach and the foothills of El Yunque National Rainforest. 15 holes feature water views or Atlantic breezes.',
    amenities: ['Audubon Gold Signature Status', 'Oceanfront Closing Holes', 'Paspalum Grass Turf', 'St. Regis Butler Cart Service'],
    signatureHole: 'Hole 18 – 440-yard Par 4 hugging the Caribbean shoreline and palms',
    packagePrice: 340
  }
];

export const GolfPage: React.FC = () => {
  const { goToSearchResults, goToPropertyDetails } = useBooking();
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeResortForBooking, setActiveResortForBooking] = useState<GolfResort | null>(null);

  // Booking Form State
  const [teeDate, setTeeDate] = useState('2026-05-20');
  const [teeTimeSlot, setTeeTimeSlot] = useState('8:30 AM (Prime Morning)');
  const [holesOption, setHolesOption] = useState<'18' | '9' | 'all-day'>('18');
  const [players, setPlayers] = useState(2);
  const [rentalClubs, setRentalClubs] = useState(false);
  const [caddieOption, setCaddieOption] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  const filteredResorts = GOLF_RESORTS.filter(
    r => selectedRegion === 'All' || r.region === selectedRegion
  );

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-stone-900 text-white py-24 sm:py-32 overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=2000&q=85"
            alt="Marriott Championship Golf"
            className="w-full h-full object-cover opacity-45"
            fallbackTitle="Marriott Golf"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] font-bold mb-4 shadow-sm">
            <Flag className="w-3.5 h-3.5" />
            <span>Official Marriott Golf Worldwide</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
            Championship Golf Resorts & Packages
          </h1>

          <p className="max-w-3xl mx-auto text-stone-200 text-sm sm:text-base leading-relaxed font-light mb-8">
            Tee off on legendary greens designed by Greg Norman, Arnold Palmer, Nick Faldo, Jack Nicklaus, and Robert Trent Jones Jr. Enjoy preferred resort tee times, PGA instruction, and Marriott Bonvoy point rewards.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              Over 50+ Championship Courses Globally
            </span>
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              PGA Certified Academies & TrackMan
            </span>
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              Stay & Play Unlimited Golf Packages
            </span>
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              Earn & Redeem Bonvoy Points
            </span>
          </div>
        </div>
      </div>

      {/* Stay & Play Packages Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-900">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base">Unlimited Golf Packages</h4>
              <p className="text-xs text-stone-600 mt-1">
                Complimentary same-day replay rounds, practice range balls, and $50 daily resort dining credits included.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#8a1538]/10 text-[#8a1538] flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base">Bonus 5,000 Points per Stay</h4>
              <p className="text-xs text-stone-600 mt-1">
                Book a Marriott Golf package using promo code <strong>ZJL</strong> to earn 5,000 bonus Bonvoy points on 2+ night stays.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base">Marriott Golf Academy</h4>
              <p className="text-xs text-stone-600 mt-1">
                PGA Master Instructors, high-speed TrackMan swing capture, custom Titleist fitting, and junior clinics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Region Filter */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-6 border-b border-stone-200">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">Featured Marriott Golf Resorts</h2>
            <p className="text-xs text-stone-500 mt-1">Reserve tee times directly or book full stay-and-play vacation packages</p>
          </div>

          <div className="flex items-center gap-2">
            {['All', 'North America', 'Europe', 'Caribbean & Latin America'].map(reg => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedRegion === reg
                    ? 'bg-[#8a1538] text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Golf Resorts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredResorts.map(resort => (
            <div
              key={resort.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <ImageWithFallback
                  src={resort.image}
                  alt={resort.name}
                  fallbackTitle={resort.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {resort.holesCount} Holes · Par {resort.par}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-white/95 text-[#8a1538] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {resort.courseDesigner}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md font-mono">
                  {resort.yardage} · Slope {resort.slopeRating}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8a1538]" />
                    <span>{resort.location}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#8a1538] transition-colors">
                    {resort.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {resort.description}
                  </p>

                  <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-100 mb-4 text-[11px] text-stone-700">
                    <p className="font-semibold text-emerald-800 flex items-center gap-1 mb-1">
                      <Flag className="w-3.5 h-3.5" />
                      Signature Hole:
                    </p>
                    <p className="text-stone-600">{resort.signatureHole}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {resort.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="bg-stone-100 text-stone-600 text-[10px] font-medium px-2 py-0.5 rounded-md"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-4 pt-3 border-t border-stone-100">
                    <div>
                      <span className="text-[10px] uppercase text-stone-400 block font-bold">Stay & Play From</span>
                      <span className="text-xl font-bold font-serif text-stone-900">
                        ${resort.packagePrice}
                        <span className="text-xs font-normal text-stone-500 font-sans"> /golfer</span>
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Cart & Replay Included
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setActiveResortForBooking(resort);
                        setBookingConfirmed(null);
                      }}
                      className="w-full py-2 bg-[#8a1538] hover:bg-[#6b102c] text-white text-xs font-semibold rounded-xl transition-colors text-center shadow-xs"
                    >
                      Book Tee Time
                    </button>
                    <button
                      onClick={() => {
                        if (resort.officialPropertyId) {
                          goToPropertyDetails(resort.officialPropertyId);
                        } else {
                          goToSearchResults({ destination: resort.location.split(',')[0] });
                        }
                      }}
                      className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors text-center"
                    >
                      Resort Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marriott Golf Academy Feature Section */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden mb-16">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=2000&q=80"
              alt="Golf Academy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-emerald-400 mb-2 block">
              Elevate Your Game
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-normal mb-4">
              The Marriott Golf Academy Experience
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6 font-light">
              Transform your swing with PGA Master Professionals at our Orlando and Palm Desert academies. Combining 3D high-speed video analysis, TrackMan launch monitors, on-course playing lessons, and tailored physical conditioning.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-xs">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/15">
                <strong className="block text-emerald-300 font-serif text-base mb-1">2 & 3-Day Golf Schools</strong>
                <span>All-inclusive instruction, unlimited golf, video analysis, and lunch with PGA pros.</span>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/15">
                <strong className="block text-emerald-300 font-serif text-base mb-1">Custom Club Fitting</strong>
                <span>Titleist, Callaway, and TaylorMade fitting carts with exact lie angle and shaft tuning.</span>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/15">
                <strong className="block text-emerald-300 font-serif text-base mb-1">Junior Golf Camps</strong>
                <span>Fun, engaging summer and holiday camps for aspiring junior golfers ages 7 to 17.</span>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveResortForBooking(GOLF_RESORTS[0]);
                setBookingConfirmed(null);
              }}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-colors uppercase tracking-wider"
            >
              Inquire on Golf Academy Instruction
            </button>
          </div>
        </div>
      </div>

      {/* Tee Time & Package Booking Modal */}
      {activeResortForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
            <button
              onClick={() => setActiveResortForBooking(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider block">
                Marriott Golf Reservations
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                {activeResortForBooking.name}
              </h3>
              <p className="text-xs text-stone-500">{activeResortForBooking.location}</p>
            </div>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900">Tee Time Confirmed!</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Booking #{bookingConfirmed} confirmed for {players} golfer(s) on {teeDate} at {teeTimeSlot}. Golf cart and practice range access are included.
                </p>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs text-stone-700 space-y-1">
                  <p>• <strong>Course:</strong> {activeResortForBooking.holesCount} Holes (Par {activeResortForBooking.par})</p>
                  <p>• <strong>Caddie Request:</strong> {caddieOption ? 'Yes (Pro Caddie assigned)' : 'Golf Cart Included'}</p>
                  <p>• <strong>Rental Clubs:</strong> {rentalClubs ? 'TaylorMade Qi10 Sets Reserved' : 'Bringing Own Clubs'}</p>
                </div>
                <button
                  onClick={() => setActiveResortForBooking(null)}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl mt-4"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const ref = 'GOLF-' + Math.floor(100000 + Math.random() * 900000);
                  setBookingConfirmed(ref);
                }}
                className="space-y-3.5 text-xs"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Tee Date</label>
                    <input
                      type="date"
                      value={teeDate}
                      onChange={e => setTeeDate(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Golfers (1 - 4)</label>
                    <select
                      value={players}
                      onChange={e => setPlayers(Number(e.target.value))}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    >
                      <option value={1}>1 Player (Single)</option>
                      <option value={2}>2 Players (Twosome)</option>
                      <option value={3}>3 Players (Threesome)</option>
                      <option value={4}>4 Players (Foursome)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Time of Day</label>
                    <select
                      value={teeTimeSlot}
                      onChange={e => setTeeTimeSlot(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    >
                      <option>7:30 AM (Early Bird)</option>
                      <option>8:30 AM (Prime Morning)</option>
                      <option>10:00 AM (Mid-Morning)</option>
                      <option>1:30 PM (Afternoon)</option>
                      <option>3:30 PM (Twilight Sunset)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Rounds Format</label>
                    <select
                      value={holesOption}
                      onChange={e => setHolesOption(e.target.value as any)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    >
                      <option value="18">18 Holes Championship</option>
                      <option value="9">9 Holes Executive</option>
                      <option value="all-day">Unlimited All-Day Pass</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rentalClubs}
                      onChange={e => setRentalClubs(e.target.checked)}
                      className="w-4 h-4 rounded text-[#8a1538]"
                    />
                    <span className="text-stone-700">Add Premium Demo Rental Clubs (+$75 /set)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={caddieOption}
                      onChange={e => setCaddieOption(e.target.checked)}
                      className="w-4 h-4 rounded text-[#8a1538]"
                    />
                    <span className="text-stone-700">Request Professional Caddie Concierge (+$60 /bag)</span>
                  </label>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-stone-500 block">Est. Green Fee Total:</span>
                    <strong className="text-sm font-serif text-stone-900 font-bold">
                      ${Math.round(activeResortForBooking.packagePrice * 0.6 * players + (rentalClubs ? 75 * players : 0) + (caddieOption ? 60 * players : 0))}
                    </strong>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Earn 10x Bonvoy Points
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#8a1538] hover:bg-[#6b102c] text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs mt-2"
                >
                  Reserve Preferred Tee Time
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
