import React from 'react';
import { useBooking } from '../context/BookingContext';
import { ImageWithFallback } from './ImageWithFallback';
import {
  ChevronRight,
  Sparkles,
  Clock,
  Trophy,
  Compass,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Building2,
  TreePine,
  Sun,
  Flame
} from 'lucide-react';

export const HomePromotionsSection: React.FC = () => {
  const {
    goToPropertyDetails,
    goToSearchResults,
    goToOffers,
    goToVacations,
    goToDestinations,
    goToCreditCards,
    goToMembership,
    setIsAuthModalOpen,
    setAuthModalTab
  } = useBooking();

  return (
    <section className="py-10 sm:py-14 bg-[#faf9f6] text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">

        {/* ================================================================= */}
        {/* 1. TOP HERO PROMO BANNER: "Save 15% on French Riviera Stays"     */}
        {/* ================================================================= */}
        <div
          onClick={() => {
            goToPropertyDetails('jw-marriott-cannes');
          }}
          className="relative rounded-3xl overflow-hidden cursor-pointer group min-h-[280px] sm:min-h-[340px] md:min-h-[380px] flex items-center shadow-md hover:shadow-xl transition-all"
        >
          {/* Background Image: Romantic candlelit dining on French Riviera */}
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85"
              alt="Save 15% on French Riviera Stays"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              fallbackTitle="JW Marriott Cannes"
            />
            {/* Cinematic dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-xl text-white">
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 sm:mb-3 leading-tight text-white drop-shadow-md">
              Save 15% on French Riviera Stays
            </h2>
            <p className="text-stone-200 text-xs sm:text-base mb-6 font-normal drop-shadow-sm leading-relaxed">
              Explore extraordinary coastal luxury escapes in Cannes, Venice, and Paris.
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPropertyDetails('jw-marriott-cannes');
              }}
              className="bg-white hover:bg-stone-100 text-stone-950 font-bold px-7 sm:px-9 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. THREE-COLUMN CARDS ROW (Matching Screenshot 1)                 */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Card 1: Fresh Air Finds */}
          <div
            onClick={() => {
              goToDestinations();
            }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group min-h-[220px] sm:min-h-[240px] flex flex-col justify-between p-6 bg-stone-900 text-white shadow-sm hover:shadow-lg transition-all"
          >
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=85"
                alt="Hotels Near Outdoor Adventures in the U.S."
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackTitle="Outdoor Adventures"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/40" />
            </div>

            <div className="relative z-10 flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-stone-200">
              <TreePine className="w-3.5 h-3.5" />
              <span>FRESH AIR FINDS</span>
            </div>

            <div className="relative z-10 flex items-center justify-between group-hover:translate-x-1 transition-transform">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                Hotels Near Outdoor Adventures in the U.S.
              </h3>
              <ChevronRight className="w-5 h-5 text-white shrink-0 ml-2" />
            </div>
          </div>

          {/* Card 2: Limited-Time Offer (Bonus Points) */}
          <div
            onClick={() => {
              goToOffers();
            }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group min-h-[220px] sm:min-h-[240px] flex flex-col justify-between p-6 bg-stone-900 text-white shadow-sm hover:shadow-lg transition-all"
          >
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85"
                alt="Get up to 4,500 Bonus Points on Stays"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fallbackTitle="Bonus Points Promotion"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/40" />
            </div>

            <div className="relative z-10 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-stone-200">
              <span>LIMITED-TIME OFFER</span>
            </div>

            <div className="relative z-10 space-y-2.5">
              <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                  Get up to 4,500 Bonus Points on Stays
                </h3>
                <ChevronRight className="w-5 h-5 text-white shrink-0 ml-2" />
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#e0592a] text-white px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold shadow-xs">
                <Trophy className="w-3 h-3" />
                <span>NEW PROMOTION</span>
              </div>
            </div>
          </div>

          {/* Card 3: The Best Rates Are Always Here (White Card) */}
          <div
            onClick={() => {
              setAuthModalTab('signin');
              setIsAuthModalOpen(true);
            }}
            className="rounded-2xl sm:rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 flex flex-col justify-center cursor-pointer group hover:border-stone-400 hover:shadow-md transition-all min-h-[220px] sm:min-h-[240px]"
          >
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-2.5 group-hover:text-[#8a1538] transition-colors">
              The Best Rates Are Always Here
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
              Get the best prices plus free Wi-Fi when you become a Marriott Bonvoy member.
            </p>
            <span className="text-xs font-bold text-[#8a1538] flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>Join Marriott Bonvoy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>

        {/* ================================================================= */}
        {/* 3. MULTI-COLUMN GRID WITH SHERATON TORONTO & CREDIT CARD          */}
        {/*    (Matching Screenshot 2)                                        */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Left Column (Span 4): "Chase the Sun a Little Longer" */}
          <div
            onClick={() => {
              goToOffers();
            }}
            className="lg:col-span-4 relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] flex flex-col justify-between p-6 sm:p-8 bg-stone-900 text-white shadow-sm hover:shadow-lg transition-all"
          >
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85"
                alt="Chase the Sun a Little Longer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                fallbackTitle="Chase the Sun"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/35" />
            </div>

            <div className="relative z-10 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-stone-200">
              <span>SPECIAL HOTEL DEALS</span>
            </div>

            <div className="relative z-10 flex items-center justify-between group-hover:translate-x-1 transition-transform">
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                Chase the Sun a Little Longer
              </h3>
              <ChevronRight className="w-6 h-6 text-white shrink-0 ml-2" />
            </div>
          </div>

          {/* Middle Column (Span 4): Split Top (Sheraton Toronto) + Bottom (Cabin Rentals) */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6">
            
            {/* Middle Top: "Sheraton Centre Toronto Hotel" (RECENTLY VIEWED) */}
            <div
              onClick={() => {
                goToPropertyDetails('yyztc-sheraton-centre-toronto-hotel');
              }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group flex-1 min-h-[220px] sm:min-h-[240px] flex flex-col justify-between p-6 bg-stone-900 text-white shadow-sm hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 z-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85"
                  alt="Sheraton Centre Toronto Hotel"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackTitle="Sheraton Centre Toronto Hotel Pool"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/35" />
              </div>

              <div className="relative z-10 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-stone-200">
                <span>ONTARIO, CANADA</span>
              </div>

              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                    Sheraton Centre Toronto Hotel
                  </h3>
                  <ChevronRight className="w-5 h-5 text-white shrink-0 ml-2" />
                </div>

                <div className="inline-flex items-center gap-1.5 bg-[#e0592a] text-white px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-bold shadow-xs">
                  <Clock className="w-3 h-3" />
                  <span>RECENTLY VIEWED</span>
                </div>

                <p className="text-[11px] sm:text-xs text-stone-200 font-light line-clamp-1">
                  Pick up where you left off! Continue exploring this property.
                </p>
              </div>
            </div>

            {/* Middle Bottom: "Mountainside Cabin Rentals" */}
            <div
              onClick={() => {
                goToVacations('Homes & Villas');
              }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group flex-1 min-h-[160px] sm:min-h-[190px] flex flex-col justify-between p-6 bg-stone-900 text-white shadow-sm hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 z-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85"
                  alt="Mountainside Cabin Rentals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackTitle="Mountainside Cabins"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/35" />
              </div>

              <div className="relative z-10 flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-stone-200">
                <Compass className="w-3.5 h-3.5" />
                <span>COZY NATURE RETREATS</span>
              </div>

              <div className="relative z-10 flex items-center justify-between group-hover:translate-x-1 transition-transform">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                  Mountainside Cabin Rentals
                </h3>
                <ChevronRight className="w-5 h-5 text-white shrink-0 ml-2" />
              </div>
            </div>

          </div>

          {/* Right Column (Span 4): Marriott Bonvoy Credit Card */}
          <div
            onClick={() => {
              goToCreditCards();
            }}
            className="lg:col-span-4 rounded-2xl sm:rounded-3xl bg-[#eef3f7] border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between items-center text-center cursor-pointer group hover:shadow-lg transition-all min-h-[380px] lg:min-h-[460px]"
          >
            {/* Stylized Realistic Credit Card Graphic */}
            <div className="w-full max-w-[260px] sm:max-w-[280px] pt-4 transform group-hover:scale-104 transition-transform duration-300">
              <div className="relative w-full aspect-[1.58/1] bg-gradient-to-tr from-[#121212] via-[#242424] to-[#0a0a0a] rounded-xl shadow-2xl p-4 sm:p-5 flex flex-col justify-between text-white border border-stone-700/60">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] sm:text-xs font-serif tracking-widest uppercase font-bold text-stone-200">
                    MARRIOTT BONVOY™
                  </div>
                  <div className="text-[9px] font-bold text-stone-400 tracking-wider">
                    HDFC BANK
                  </div>
                </div>

                {/* EMV Chip & Contactless */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-6 bg-gradient-to-tr from-amber-300 via-amber-200 to-amber-400 rounded-sm border border-amber-500/40" />
                  <div className="text-stone-400 text-xs">))))</div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>•••• 8826</span>
                  <span className="text-[9px] uppercase font-bold text-amber-400">DINERS CLUB</span>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="my-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-2.5 group-hover:text-[#8a1538] transition-colors">
                Earn up to 4 Free Nights and Gold Elite Status
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                Get the Marriott Bonvoy® Premier Credit Card. Spend requirements; see terms.
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToCreditCards();
              }}
              className="w-full sm:w-auto border border-stone-900 rounded-full px-8 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-2xs active:scale-95"
            >
              Apply Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
