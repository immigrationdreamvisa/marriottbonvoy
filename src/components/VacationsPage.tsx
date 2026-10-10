import React, { useState } from 'react';
import { VACATION_PACKAGES, VacationPackage } from '../data/vacations';
import { ImageWithFallback } from './ImageWithFallback';
import { useBooking } from '../context/BookingContext';
import {
  Palmtree,
  Home,
  Ship,
  Sparkles,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  ArrowRight,
  X,
  CreditCard,
  MapPin,
  Clock
} from 'lucide-react';

export const VacationsPage: React.FC = () => {
  const { goToSearchResults, vacationCategory, setVacationCategory } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<string>(vacationCategory || 'All');
  const [vacationSearch, setVacationSearch] = useState('');
  const [activePackageModal, setActivePackageModal] = useState<VacationPackage | null>(null);
  const [bookingSuccessCode, setBookingSuccessCode] = useState<string | null>(null);

  // Sync if vacationCategory changes in context
  React.useEffect(() => {
    if (vacationCategory) {
      setSelectedCategory(vacationCategory);
    }
  }, [vacationCategory]);

  const categories = [
    { label: 'All Vacations', value: 'All', icon: Sparkles },
    { label: 'All-Inclusive', value: 'All-Inclusive', icon: Palmtree },
    { label: 'Homes & Villas', value: 'Homes & Villas', icon: Home },
    { label: 'Yacht Collection', value: 'Yacht Collection', icon: Ship },
    { label: 'Member Escapes', value: 'Escapes & Packages', icon: Sparkles }
  ];

  const filteredPackages = VACATION_PACKAGES.filter(pkg => {
    const matchesCat = selectedCategory === 'All' || pkg.category === selectedCategory;
    const matchesQuery =
      pkg.title.toLowerCase().includes(vacationSearch.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(vacationSearch.toLowerCase()) ||
      pkg.country.toLowerCase().includes(vacationSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSimulateBooking = (pkg: VacationPackage) => {
    const code = 'VAC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingSuccessCode(code);
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      {/* Hero Header */}
      <div className="bg-stone-900 text-white relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=80"
            alt="Vacations Header"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-radial from-transparent to-stone-900/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-amber-400 mb-3 block">
            Unforgettable Curated Escapes
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-4">
            Vacations by Marriott Bonvoy
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            From all-inclusive beachfront sanctuaries and 100% verified private villas to custom luxury superyachts with The Ritz-Carlton Yacht Collection. Earn and redeem Bonvoy points across every journey.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  isSelected
                    ? 'bg-[#8a1538] text-white shadow-md'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map(pkg => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Header */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <ImageWithFallback
                  src={pkg.image}
                  alt={pkg.title}
                  fallbackTitle={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-[#8a1538] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {pkg.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="bg-stone-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-400/30">
                    +{pkg.bonvoyPointsEarnable.toLocaleString()} Points
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-semibold text-amber-300 tracking-wider">
                    {pkg.verifiedBrand}
                  </span>
                  <h3 className="font-serif text-xl font-bold leading-snug">{pkg.title}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#8a1538]" />
                    <span>{pkg.destination}, {pkg.country}</span>
                    {pkg.duration && (
                      <>
                        <span aria-hidden="true">·</span>
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{pkg.duration}</span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  {/* Inclusions */}
                  <div className="mb-4 space-y-1.5 border-t border-stone-100 pt-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                      Package Inclusions
                    </span>
                    {pkg.inclusions.slice(0, 3).map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8a1538] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-stone-500 italic mb-4">
                    {pkg.officialNotice}
                  </p>
                </div>

                {/* Bottom Pricing & Action */}
                <div className="border-t border-stone-200 pt-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block">From</span>
                    <div className="text-lg font-serif font-bold text-stone-900">
                      ${pkg.startingPrice}{' '}
                      <span className="text-xs font-sans font-normal text-stone-500">/ night</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActivePackageModal(pkg);
                      setBookingSuccessCode(null);
                    }}
                    className="px-5 py-2.5 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs"
                  >
                    View & Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Reservation Modal */}
      {activePackageModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 text-stone-900 border border-stone-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setActivePackageModal(null);
                setBookingSuccessCode(null);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingSuccessCode ? (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8a1538] block mb-1">
                  {activePackageModal.category} · {activePackageModal.verifiedBrand}
                </span>
                <h3 className="font-serif text-2xl font-bold mb-2">{activePackageModal.title}</h3>
                <p className="text-xs text-stone-600 mb-4">{activePackageModal.description}</p>

                <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 mb-6 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    All Inclusions & Privileges
                  </h4>
                  {activePackageModal.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-[#8a1538] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-stone-200 text-xs font-semibold text-[#8a1538] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Earns {activePackageModal.bonvoyPointsEarnable.toLocaleString()} Marriott Bonvoy Points</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Estimated Total</span>
                    <span className="font-serif text-2xl font-bold text-stone-900">
                      ${activePackageModal.startingPrice * 4}{' '}
                      <span className="text-xs font-sans font-normal text-stone-500">(4 nights)</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleSimulateBooking(activePackageModal)}
                    className="px-6 py-3 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
                  >
                    Confirm Vacation Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">Vacation Reservation Confirmed!</h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto mb-6">
                  Your reservation request for <strong>{activePackageModal.title}</strong> has been transmitted to our dedicated Marriott Bonvoy Vacations concierge desk.
                </p>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 inline-block mb-6">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Vacation Reference</span>
                  <span className="font-mono text-xl font-bold text-[#8a1538] tracking-widest">{bookingSuccessCode}</span>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setActivePackageModal(null);
                      setBookingSuccessCode(null);
                    }}
                    className="px-6 py-2.5 bg-stone-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-800"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
