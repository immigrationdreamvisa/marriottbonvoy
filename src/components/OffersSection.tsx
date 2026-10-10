import React, { useState, useMemo } from 'react';
import { PROPERTIES } from '../data/properties';
import { OFFERS } from '../data/offers';
import { useBooking } from '../context/BookingContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Property, Offer } from '../types';
import { 
  Tag, 
  ArrowRight, 
  MapPin, 
  Star, 
  Gift, 
  Check, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export const OffersSection: React.FC = () => {
  const { 
    goToPropertyDetails, 
    goToSearchResults,
    startBookingFlow, 
    updateSearchParams,
    setIsAuthModalOpen,
    setAuthModalTab
  } = useBooking();

  // Unified Expansion State: show 10 initially
  const [showAllHotels, setShowAllHotels] = useState(false);
  const INITIAL_DISPLAY_COUNT = 10;

  // Filter properties belonging to Ritz-Carlton and JW Marriott
  const luxuryProperties = useMemo(() => {
    return PROPERTIES.filter(p => p.brandId === 'the-ritz-carlton' || p.brandId === 'jw-marriott');
  }, []);

  // Helper to find matching offer for a property
  const getOfferForProperty = (property: Property): Offer | undefined => {
    return OFFERS.find(o => 
      (o.propertyIds && o.propertyIds.includes(property.id)) ||
      (o.brandId && o.brandId === property.brandId)
    );
  };

  const handleBookNow = (property: Property, offer?: Offer) => {
    if (offer) {
      updateSearchParams({ promoCode: offer.code, destination: property.city });
    } else {
      updateSearchParams({ destination: property.city });
    }
    goToSearchResults({ destination: property.city, promoCode: offer?.code });
  };

  const visibleProperties = showAllHotels ? luxuryProperties : luxuryProperties.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <section id="exclusive-packages-offers" className="relative z-10 py-12 lg:py-16 bg-[#faf9f6] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Single Main Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8a1538] font-bold mb-1.5">
            <Gift className="w-3.5 h-3.5" />
            <span>Featured Luxury Portfolio</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-stone-900">
            All Hotels
          </h2>
        </div>

        {/* Compact Hotel Cards Grid with Member Benefits Card filling white space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {visibleProperties.map((property) => {
            const offer = getOfferForProperty(property);
            return (
              <CompactHotelCard
                key={property.id}
                property={property}
                offer={offer}
                onViewHotel={() => handleBookNow(property, offer)}
                onBookNow={() => handleBookNow(property, offer)}
              />
            );
          })}

          {/* Member Benefits Promo Card (Fills row 4 empty white space next to card #10) */}
          {!showAllHotels && (
            <MemberBenefitsPromoCard
              className="sm:col-span-2 lg:col-span-2"
              onJoin={() => {
                setAuthModalTab('register');
                setIsAuthModalOpen(true);
              }}
              onSignIn={() => {
                setAuthModalTab('signin');
                setIsAuthModalOpen(true);
              }}
            />
          )}

          {showAllHotels && (
            <MemberBenefitsPromoCard
              className="col-span-1"
              onJoin={() => {
                setAuthModalTab('register');
                setIsAuthModalOpen(true);
              }}
              onSignIn={() => {
                setAuthModalTab('signin');
                setIsAuthModalOpen(true);
              }}
            />
          )}
        </div>

        {/* Single Show All Hotels Button */}
        {luxuryProperties.length > INITIAL_DISPLAY_COUNT && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAllHotels(!showAllHotels)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.16em] font-bold rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>{showAllHotels ? 'Show Less Hotels' : `Show All ${luxuryProperties.length} Hotels`}</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform ${showAllHotels ? '-rotate-90' : ''}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

/* ─── MEMBER BENEFITS PROMO CARD (EXACTLY MATCHING USER SCREENSHOT) ─── */
interface MemberBenefitsPromoCardProps {
  className?: string;
  onJoin: () => void;
  onSignIn: () => void;
}

const MemberBenefitsPromoCard: React.FC<MemberBenefitsPromoCardProps> = ({
  className = '',
  onJoin,
  onSignIn
}) => {
  const iconColor = '#ff6b4a'; // Vibrant coral/orange matching official Marriott Bonvoy UI

  return (
    <div className={`bg-white rounded-xl border border-stone-200 shadow-2xs hover:shadow-lg transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between ${className}`}>
      
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2 tracking-tight">
          The Best Rates Are Always Here
        </h3>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Get the best prices plus free Wi-Fi when you become a Marriott Bonvoy member
        </p>
      </div>

      {/* 2x2 Grid of Icons with crisp hairline dividers */}
      <div className="grid grid-cols-2 border-t border-b border-stone-100 my-auto">
        
        {/* 1. Best Rate Guarantee */}
        <div className="p-4 sm:p-5 border-r border-b border-stone-100 flex flex-col items-center justify-center text-center">
          <svg 
            viewBox="0 0 48 48" 
            className="w-9 h-9 mb-2" 
            fill="none" 
            stroke={iconColor} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M24 6 L10 12 V22 C10 32 16 39 24 42 C32 39 38 32 38 22 V12 L24 6 Z" />
            <path d="M16 20 H32" />
            <path d="M16 26 H26" />
          </svg>
          <span className="text-[10.5px] sm:text-xs font-bold tracking-wider uppercase text-stone-700">
            BEST RATE GUARANTEE
          </span>
        </div>

        {/* 2. Earn Free Nights */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex flex-col items-center justify-center text-center">
          <div className="relative mb-2">
            <svg 
              viewBox="0 0 48 48" 
              className="w-9 h-9" 
              fill="none" 
              stroke={iconColor} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {/* Star on top */}
              <polygon points="24,4 25.5,8.5 30,8.5 26.5,11.5 28,16 24,13 20,16 21.5,11.5 18,8.5 22.5,8.5" fill={iconColor} stroke="none" />
              {/* Bed Structure */}
              <path d="M8 26 V38" />
              <path d="M40 26 V38" />
              <path d="M8 32 H40" />
              <circle cx="16" cy="27" r="3" fill={iconColor} />
              <path d="M22 32 V26 C22 23 25 21 29 21 H40 V32" />
            </svg>
          </div>
          <span className="text-[10.5px] sm:text-xs font-bold tracking-wider uppercase text-stone-700">
            EARN FREE NIGHTS
          </span>
        </div>

        {/* 3. Free Wi-Fi */}
        <div className="p-4 sm:p-5 border-r border-stone-100 flex flex-col items-center justify-center text-center">
          <svg 
            viewBox="0 0 48 48" 
            className="w-9 h-9 mb-2" 
            fill="none" 
            stroke={iconColor} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M10 16 C18 9 30 9 38 16" />
            <path d="M15 22 C20 17 28 17 33 22" />
            <path d="M20 28 C22 26 26 26 28 28" />
            <circle cx="24" cy="34" r="2.5" fill={iconColor} />
          </svg>
          <span className="text-[10.5px] sm:text-xs font-bold tracking-wider uppercase text-stone-700">
            FREE WI-FI
          </span>
        </div>

        {/* 4. Member Rates */}
        <div className="p-4 sm:p-5 flex flex-col items-center justify-center text-center">
          <svg 
            viewBox="0 0 48 48" 
            className="w-9 h-9 mb-2" 
            fill="none" 
            stroke={iconColor} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M14 8 H28 L42 22 L28 36 L14 22 Z" />
            <circle cx="20" cy="14" r="2" fill={iconColor} />
            <polygon points="28,21 29.5,25 34,25 30.5,27.5 32,31.5 28,29 24,31.5 25.5,27.5 22,25 26.5,25" fill={iconColor} stroke="none" transform="scale(0.8) translate(7, 3)" />
          </svg>
          <span className="text-[10.5px] sm:text-xs font-bold tracking-wider uppercase text-stone-700">
            MEMBER RATES
          </span>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6 pt-2">
        <button
          type="button"
          onClick={onJoin}
          className="w-full sm:w-auto min-w-[140px] px-8 py-3 bg-[#1c1917] hover:bg-black text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-xs hover:shadow-md cursor-pointer text-center"
        >
          Join Now
        </button>

        <button
          type="button"
          onClick={onSignIn}
          className="w-full sm:w-auto min-w-[140px] px-8 py-3 bg-white hover:bg-stone-50 text-stone-900 border border-stone-900 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer text-center"
        >
          Sign In
        </button>
      </div>

    </div>
  );
};

interface CompactHotelCardProps {
  property: Property;
  offer?: Offer;
  onViewHotel: () => void;
  onBookNow: () => void;
}

const CompactHotelCard: React.FC<CompactHotelCardProps> = ({
  property,
  offer,
  onViewHotel,
  onBookNow
}) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const images = property.images && property.images.length > 0 ? property.images : [property.heroImage];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  // Calculate promotional rate or standard starting price
  const basePrice = property.startingPrice;
  let discountedPrice = basePrice;
  if (offer?.discountPercentage) {
    discountedPrice = Math.round(basePrice * (1 - offer.discountPercentage / 100));
  }

  return (
    <div 
      onClick={onBookNow}
      className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      
      {/* Compact Image Section */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
        <ImageWithFallback
          src={images[currentImgIdx] || property.heroImage}
          alt={property.name}
          fallbackTitle={property.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Carousel controls if multiple images */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous Image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next Image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 z-10">
              {images.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`inline-block rounded-full transition-all ${
                    currentImgIdx === dotIdx ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hotel Name & Destination on Image Bottom */}
        <div className="absolute bottom-3 left-3 right-3 text-white z-1">
          <h3 className="font-serif text-base sm:text-lg font-bold leading-tight truncate drop-shadow-sm">
            {property.name}
          </h3>
          <p className="text-[11px] text-stone-200 flex items-center gap-1 mt-0.5 opacity-90 truncate">
            <MapPin className="w-3 h-3 text-[#ee5a24] shrink-0" />
            <span className="truncate">{property.city}, {property.country}</span>
          </p>
        </div>
      </div>

      {/* Card Content & Action Bar */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
        
        {/* Package Highlights */}
        {offer ? (
          <div className="mb-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#8a1538]">
                {offer.title}
              </span>
              <span className="bg-stone-100 text-[#8a1538] text-[9.5px] font-bold px-1.5 py-0.5 rounded border border-stone-200 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" />
                {offer.code}
              </span>
            </div>
            <p className="text-[11.5px] text-stone-600 line-clamp-1 mt-0.5">
              {offer.description}
            </p>
          </div>
        ) : (
          <div className="mb-3">
            <div className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500">
              Exclusive Member Rate
            </div>
            <p className="text-[11.5px] text-stone-600 line-clamp-1 mt-0.5">
              Complimentary Wi-Fi & Marriott Bonvoy points on official booking
            </p>
          </div>
        )}

        {/* Rate & Direct Actions */}
        <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">
              {offer?.discountPercentage ? 'Offer Rate' : 'Starting From'}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-base sm:text-lg font-bold text-stone-900">
                ${discountedPrice.toLocaleString()}
              </span>
              {offer?.discountPercentage ? (
                <span className="text-[11px] text-stone-400 line-through">
                  ${basePrice.toLocaleString()}
                </span>
              ) : null}
              <span className="text-[10px] text-stone-500">/ night</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewHotel();
              }}
              className="px-2.5 py-1.5 border border-stone-300 hover:border-stone-800 text-stone-800 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
            >
              View
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookNow();
              }}
              className="px-3 py-1.5 bg-[#8a1538] hover:bg-[#6e0f2b] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
            >
              <span>{offer ? 'View Offer' : 'Find Deals'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
