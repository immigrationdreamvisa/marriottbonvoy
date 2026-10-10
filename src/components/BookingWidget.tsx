import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useBooking } from '../context/BookingContext';
import { PROPERTIES } from '../data/properties';
import { BRANDS } from '../data/brands';
import { VALID_PROMO_CODES } from '../data/offers';
import { BrandId } from '../types';
import { DateRangeCalendar } from './DateRangeCalendar';
import { RoomsAndGuestsSelector } from './RoomsAndGuestsSelector';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  ChevronDown,
  X,
  Check,
  Tag,
  Building2,
  Sparkles,
  Award,
  Compass,
  Navigation,
  Clock
} from 'lucide-react';

interface BookingWidgetProps {
  compact?: boolean;
  showRoomsAndGuests?: boolean;
  showBrands?: boolean;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  compact = false
}) => {
  const {
    searchParams,
    updateSearchParams,
    goToSearchResults,
    nightsCount
  } = useBooking();

  // Active dropdown popover
  const [activePopover, setActivePopover] = useState<'destination' | 'dates' | 'guests' | 'rates' | null>(null);

  // Destination autocomplete search state
  const [destQuery, setDestQuery] = useState(searchParams.destination);
  const destInputRef = useRef<HTMLInputElement>(null);

  // Points / Awards search toggle
  const [usePoints, setUsePoints] = useState(false);

  // Rate type state
  const [rateType, setRateType] = useState<'lowest' | 'senior' | 'government' | 'promo'>('lowest');
  const [promoInput, setPromoInput] = useState(searchParams.promoCode || '');
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  useEffect(() => {
    setDestQuery(searchParams.destination);
  }, [searchParams.destination]);

  // Exactly our 3 luxury brands
  const recommendedBrands = useMemo(() => {
    return [
      {
        id: 'the-ritz-carlton' as BrandId,
        name: 'The Ritz-Carlton',
        tagline: 'Legendary service & timeless luxury',
        count: 10,
        locations: 'Kyoto, Tokyo, Central Park, Grand Cayman, Half Moon Bay, Bali, Vienna, Kapalua, Hong Kong, Paris'
      },
      {
        id: 'jw-marriott' as BrandId,
        name: 'JW Marriott',
        tagline: 'Mindful luxury & restorative wellbeing',
        count: 10,
        locations: 'Auckland, Cannes, Venice, London, Marco Island, Tokyo, Singapore, Frankfurt, Maldives, Nara'
      },
      {
        id: 'st-regis' as BrandId,
        name: 'The St. Regis',
        tagline: 'Bespoke butler service & exquisite addresses',
        count: 9,
        locations: 'New York, Bal Harbour, Venice, Rome, Florence, Osaka, Toronto, Bora Bora, Aspen'
      }
    ];
  }, []);

  // User's custom or detected location ("where user lives")
  const [userLocation, setUserLocation] = useState<string>(() => {
    try {
      return localStorage.getItem('bonvoy_user_location') || '';
    } catch {
      return '';
    }
  });
  const [isLocating, setIsLocating] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [customLocationInput, setCustomLocationInput] = useState('');

  // Recent searches - starts empty or loaded from localStorage
  const [recentSearches, setRecentSearches] = useState<{ id: string; title: string; subtitle: string; brandId?: BrandId }[]>(() => {
    try {
      const stored = localStorage.getItem('bonvoy_recent_searches');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Recently viewed properties / brands - starts empty or loaded from localStorage
  // Shows ONLY if the user has actually searched or viewed a brand
  const [recentlyViewed, setRecentlyViewed] = useState<{ id: string; name: string; brandId?: BrandId }[]>(() => {
    try {
      const stored = localStorage.getItem('bonvoy_recently_viewed');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addToRecentlyViewed = (item: { id: string; name: string; brandId?: BrandId }) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter(p => p.name.toLowerCase() !== item.name.toLowerCase());
      const updated = [item, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('bonvoy_recently_viewed', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const addToRecentSearches = (item: { id: string; title: string; subtitle: string; brandId?: BrandId }) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter(p => p.title.toLowerCase() !== item.title.toLowerCase());
      const updated = [item, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('bonvoy_recent_searches', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearRecents = () => {
    setRecentSearches([]);
    setRecentlyViewed([]);
    try {
      localStorage.removeItem('bonvoy_recent_searches');
      localStorage.removeItem('bonvoy_recently_viewed');
    } catch {}
  };

  const handleSelectBrand = (brand: typeof recommendedBrands[0]) => {
    updateSearchParams({ destination: brand.name, selectedBrands: [brand.id as BrandId] });
    setDestQuery(brand.name);
    addToRecentlyViewed({
      id: brand.id,
      name: brand.name,
      brandId: brand.id as BrandId
    });
    addToRecentSearches({
      id: String(Date.now()),
      title: brand.name,
      subtitle: `${searchParams.checkIn ? formatDateDisplay(searchParams.checkIn) : 'Flexible Dates'} · ${guestsSummary}`,
      brandId: brand.id as BrandId
    });
    setActivePopover('dates');
  };

  const handleSelectHotel = (hotel: typeof PROPERTIES[0]) => {
    updateSearchParams({
      destination: hotel.name,
      selectedBrands: [hotel.brandId]
    });
    setDestQuery(hotel.name);
    const brand = recommendedBrands.find(b => b.id === hotel.brandId);
    if (brand) {
      addToRecentlyViewed({
        id: brand.id,
        name: brand.name,
        brandId: brand.id
      });
    }
    addToRecentlyViewed({
      id: hotel.id,
      name: hotel.name,
      brandId: hotel.brandId
    });
    addToRecentSearches({
      id: String(Date.now()),
      title: hotel.name,
      subtitle: `${hotel.city}, ${hotel.country}`,
      brandId: hotel.brandId
    });
    setActivePopover('dates');
  };

  const handleCurrentLocation = () => {
    if (userLocation) {
      updateSearchParams({ destination: userLocation, selectedBrands: [] });
      setDestQuery(userLocation);
      addToRecentSearches({
        id: String(Date.now()),
        title: userLocation,
        subtitle: 'Current Location',
        brandId: undefined
      });
      setActivePopover('dates');
      return;
    }

    if (!navigator.geolocation) {
      setShowLocationInput(true);
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 4000);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { signal: controller.signal }
          );
          clearTimeout(timer);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.suburb || data.address?.state || 'Current Location';
          const country = data.address?.country || '';
          const detectedLoc = country ? `${city}, ${country}` : city;
          
          setUserLocation(detectedLoc);
          try {
            localStorage.setItem('bonvoy_user_location', detectedLoc);
          } catch {}

          updateSearchParams({ destination: detectedLoc, selectedBrands: [] });
          setDestQuery(detectedLoc);
          addToRecentSearches({
            id: String(Date.now()),
            title: detectedLoc,
            subtitle: 'Current Location',
            brandId: undefined
          });
          setActivePopover('dates');
        } catch {
          setShowLocationInput(true);
        }
      },
      () => {
        setIsLocating(false);
        setShowLocationInput(true);
      },
      { timeout: 6000 }
    );
  };

  const handleSaveCustomLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLocationInput.trim()) return;
    const loc = customLocationInput.trim();
    setUserLocation(loc);
    try {
      localStorage.setItem('bonvoy_user_location', loc);
    } catch {}
    updateSearchParams({ destination: loc, selectedBrands: [] });
    setDestQuery(loc);
    addToRecentSearches({
      id: String(Date.now()),
      title: loc,
      subtitle: 'Current Location',
      brandId: undefined
    });
    setShowLocationInput(false);
    setActivePopover('dates');
  };

  // Brand search matching: client searches by brand name
  const matchedBrands = useMemo(() => {
    if (!destQuery.trim()) return recommendedBrands;
    const q = destQuery.toLowerCase().trim();
    return recommendedBrands.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q) ||
      (q.includes('ritz') && b.id === 'the-ritz-carlton') ||
      (q.includes('carlton') && b.id === 'the-ritz-carlton') ||
      (q.includes('jw') && b.id === 'jw-marriott') ||
      (q.includes('marriott') && b.id === 'jw-marriott') ||
      (q.includes('regis') && b.id === 'st-regis') ||
      (q.includes('st') && b.id === 'st-regis')
    );
  }, [destQuery, recommendedBrands]);

  // Real hotels under the matched brand or destination search
  const matchingHotelsForBrandSearch = useMemo(() => {
    if (!destQuery.trim()) return [];
    const q = destQuery.toLowerCase().trim();
    return PROPERTIES.filter(p => {
      const brandMatch =
        (p.brandId === 'the-ritz-carlton' && (q.includes('ritz') || q.includes('carlton'))) ||
        (p.brandId === 'jw-marriott' && (q.includes('jw') || q.includes('marriott'))) ||
        (p.brandId === 'st-regis' && (q.includes('regis') || q.includes('st')));
      const locMatch = p.city.toLowerCase().includes(q) || p.country.toLowerCase().includes(q);
      const nameMatch = p.name.toLowerCase().includes(q);
      return brandMatch || locMatch || nameMatch;
    });
  }, [destQuery]);

  const applyPromo = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (!upper) {
      updateSearchParams({ promoCode: '' });
      setPromoFeedback(null);
      return;
    }
    if (VALID_PROMO_CODES[upper]) {
      updateSearchParams({ promoCode: upper });
      setPromoFeedback(`Applied: ${VALID_PROMO_CODES[upper].name}`);
    } else {
      setPromoFeedback('Invalid code. Try "BONVOYVIP" or "RITZRECONNECT"');
    }
  };

  // Close popover on outside click
  const widgetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date display matching 2nd image (e.g. Fri, Oct 9 - Sat, Oct 10)
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return 'Select Date';
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Summary string for guests (e.g. 1 Room, 2 Guests)
  const guestsSummary = useMemo(() => {
    const r = searchParams.rooms;
    const a = searchParams.adults;
    const s = searchParams.seniors || 0;
    const c = searchParams.children;
    const totalGuests = a + s + c;
    const roomStr = `${r} ${r === 1 ? 'Room' : 'Rooms'}`;
    const guestStr = `${totalGuests} ${totalGuests === 1 ? 'Guest' : 'Guests'}`;
    return `${roomStr}, ${guestStr}`;
  }, [searchParams.rooms, searchParams.adults, searchParams.seniors, searchParams.children]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePopover(null);
    if (searchParams.destination.trim()) {
      const destLower = searchParams.destination.toLowerCase();
      const matchedBrand = recommendedBrands.find(b => 
        b.name.toLowerCase() === destLower ||
        destLower.includes(b.name.toLowerCase()) ||
        destLower.includes(b.id)
      );

      if (matchedBrand) {
        addToRecentlyViewed({
          id: matchedBrand.id,
          name: matchedBrand.name,
          brandId: matchedBrand.id
        });
      }

      addToRecentSearches({
        id: String(Date.now()),
        title: searchParams.destination,
        subtitle: `${searchParams.checkIn ? formatDateDisplay(searchParams.checkIn) : 'Flexible Dates'} · ${guestsSummary}`,
        brandId: matchedBrand ? matchedBrand.id : undefined
      });
    }
    goToSearchResults();
  };

  return (
    <div
      ref={widgetRef}
      className={`relative ${activePopover ? 'z-50' : 'z-30'} w-full bg-white rounded-3xl text-stone-900 ${compact ? 'border border-stone-200 p-4 shadow-sm' : 'p-5 sm:p-7 shadow-2xl border border-stone-100'
        } transition-all`}
    >
      <form onSubmit={handleSearchSubmit}>

        {/* ======================================================== */}
        {/* TOP ROW: DESTINATION | DATES | FIND HOTELS BUTTON        */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-3 md:gap-2 lg:gap-3 pb-4 border-b border-stone-200">

          {/* 1. Destination Box (Left) */}
          <div className="md:col-span-5 lg:col-span-5 relative lg:pr-3">
            <div
              onClick={() => {
                setActivePopover(activePopover === 'destination' ? null : 'destination');
                setTimeout(() => destInputRef.current?.focus(), 50);
              }}
              className="cursor-pointer group text-left transition-all py-1.5 px-2 rounded-xl hover:bg-stone-50"
            >
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#e0592a] font-bold mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#e0592a] shrink-0 stroke-[2.5]" />
                <span>DESTINATION</span>
              </div>
              <div className="flex items-center justify-between border-b-2 border-stone-900 pb-1">
                <span className={`font-sans text-sm sm:text-base lg:text-lg truncate block ${
                  searchParams.destination ? 'font-semibold text-stone-900' : 'font-normal text-stone-500'
                }`}>
                  {searchParams.destination || 'Where can we take you?'}
                </span>
                {searchParams.destination && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateSearchParams({ destination: '', selectedBrands: [] });
                      setDestQuery('');
                    }}
                    className="p-1 hover:text-stone-900 text-stone-400 ml-2 shrink-0"
                    aria-label="Clear destination"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Destination Autocomplete & Screenshot-Matched Dropdown */}
            {activePopover === 'destination' && (
              <div 
                className="absolute left-0 top-full mt-2 w-full sm:w-[420px] md:w-[450px] bg-white border border-stone-200/90 rounded-2xl shadow-2xl p-4 z-[999] animate-in fade-in zoom-in-95 max-h-[500px] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >

                {/* Search Input inside popover */}
                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    ref={destInputRef}
                    type="text"
                    placeholder="Search by brand name (Ritz-Carlton, JW Marriott, St. Regis)..."
                    value={destQuery}
                    onChange={(e) => setDestQuery(e.target.value)}
                    className="w-full bg-[#f8f8f8] text-stone-900 text-xs pl-9 pr-8 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                  />
                  {destQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setDestQuery('');
                        updateSearchParams({ destination: '', selectedBrands: [] });
                      }}
                      className="absolute right-2.5 top-2.5 p-0.5 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* WHEN NOT TYPING: Default view exactly matching the user's screenshot */}
                {!destQuery.trim() && (
                  <div>
                    {/* Current Location button - detects or allows user to set where they live */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-stone-50 transition-colors group">
                        <button
                          type="button"
                          onClick={handleCurrentLocation}
                          className="flex items-center gap-3.5 flex-1 text-left"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#f4f4f4] flex items-center justify-center shrink-0 text-stone-700 group-hover:bg-stone-200 transition-colors">
                            <Navigation className={`w-4 h-4 -rotate-45 ${isLocating ? 'animate-pulse text-[#e0592a]' : ''}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-stone-900 text-sm">Current Location</span>
                              {isLocating && <span className="text-[10px] text-[#e0592a] font-semibold animate-pulse">Detecting...</span>}
                            </div>
                            <p className="text-xs text-stone-400 truncate">
                              {userLocation ? `Live in: ${userLocation}` : 'Use current location or enter where you live'}
                            </p>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomLocationInput(userLocation || '');
                            setShowLocationInput(!showLocationInput);
                          }}
                          className="text-[11px] text-[#e0592a] hover:underline font-semibold px-2 py-1 shrink-0"
                        >
                          {userLocation ? 'Edit' : 'Set City'}
                        </button>
                      </div>

                      {/* Inline input for entering where you live */}
                      {showLocationInput && (
                        <form onSubmit={handleSaveCustomLocation} className="mt-2 p-2.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-2 animate-in fade-in">
                          <input
                            type="text"
                            placeholder="Enter city where you live (e.g. Toronto, New York)..."
                            value={customLocationInput}
                            onChange={(e) => setCustomLocationInput(e.target.value)}
                            autoFocus
                            className="flex-1 bg-white border border-stone-200 px-3 py-1.5 text-xs rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
                          />
                          <button
                            type="submit"
                            className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-black shrink-0"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowLocationInput(false)}
                            className="p-1 text-stone-400 hover:text-stone-700"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      )}
                    </div>

                    {/* Our 3 Brands Quick Selection */}
                    <div className="my-3 pt-3 border-t border-stone-100">
                      <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#e0592a]">
                          Select by Brand
                        </span>
                        <span className="text-[10px] text-stone-400 font-medium">Our 3 Luxury Brands</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {recommendedBrands.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => handleSelectBrand(b)}
                            className="p-2.5 rounded-xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 text-left transition-all group flex flex-col justify-between"
                          >
                            <span className="block font-serif font-bold text-xs text-stone-900 group-hover:text-[#e0592a] truncate">
                              {b.name}
                            </span>
                            <span className="block text-[10px] text-stone-500 mt-1 font-sans">{b.count} Hotels</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent Searches - only shows if user has searched */}
                    {recentSearches.length > 0 && (
                      <div className="my-2">
                        <div className="text-xs text-stone-500 font-normal mb-1 px-1">Recent Searches</div>
                        {recentSearches.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              updateSearchParams({
                                destination: item.title,
                                selectedBrands: item.brandId ? [item.brandId] : []
                              });
                              setDestQuery(item.title);
                              setActivePopover('dates');
                            }}
                            className="w-full flex items-center gap-3.5 p-2 rounded-xl hover:bg-stone-50 transition-colors text-left group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#f4f4f4] flex items-center justify-center shrink-0 text-stone-700 group-hover:bg-stone-200 transition-colors">
                              <Search className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-stone-900 text-sm truncate group-hover:text-[#e0592a] transition-colors">
                                {item.title}
                              </p>
                              <p className="text-xs text-stone-400 truncate">{item.subtitle}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Recently Viewed - ONLY shows if user searched any brand! */}
                    {recentlyViewed.length > 0 && (
                      <div className="my-2">
                        <div className="text-xs text-stone-500 font-normal mb-1 px-1">Recently Viewed</div>
                        {recentlyViewed.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              updateSearchParams({
                                destination: item.name,
                                selectedBrands: item.brandId ? [item.brandId] : []
                              });
                              setDestQuery(item.name);
                              setActivePopover('dates');
                            }}
                            className="w-full flex items-center gap-3.5 p-2 rounded-xl hover:bg-stone-50 transition-colors text-left group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#f4f4f4] flex items-center justify-center shrink-0 text-stone-700 group-hover:bg-stone-200 transition-colors">
                              <Clock className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-stone-900 text-sm truncate group-hover:text-[#e0592a] transition-colors">
                                {item.name}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Clear Recents Link */}
                    {(recentSearches.length > 0 || recentlyViewed.length > 0) && (
                      <div className="mt-2 pt-2 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={handleClearRecents}
                          className="text-xs font-normal underline text-stone-800 hover:text-stone-950 px-1"
                        >
                          Clear Recents
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* WHEN CLIENT IS TYPING: Search by Brand Name */}
                {destQuery.trim() && (
                  <div className="space-y-3">
                    {/* Matched Brands */}
                    {matchedBrands.length > 0 && (
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold px-1 mb-1.5 flex items-center justify-between">
                          <span>Search By Brand</span>
                          <span className="text-[#e0592a]">{matchedBrands.length} Brand{matchedBrands.length > 1 ? 's' : ''}</span>
                        </div>
                        <div className="space-y-1.5">
                          {matchedBrands.map((b) => (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => handleSelectBrand(b)}
                              className="w-full text-left p-3 rounded-xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all flex items-center justify-between group"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#e0592a] transition-colors">
                                    {b.name}
                                  </span>
                                  <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-sans font-medium">
                                    {b.count} Hotels
                                  </span>
                                </div>
                                <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{b.tagline}</p>
                              </div>
                              <span className="text-xs font-bold text-[#e0592a] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
                                Select Brand →
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Real hotels under this brand or search query */}
                    {matchingHotelsForBrandSearch.length > 0 && (
                      <div className="pt-2 border-t border-stone-100">
                        <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold px-1 mb-1.5 flex items-center justify-between">
                          <span>Hotels in Brand Portfolio ({matchingHotelsForBrandSearch.length})</span>
                        </div>
                        <div className="space-y-1 max-h-[220px] overflow-y-auto">
                          {matchingHotelsForBrandSearch.map((hotel) => (
                            <button
                              key={hotel.id}
                              type="button"
                              onClick={() => handleSelectHotel(hotel)}
                              className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-stone-50 transition-colors flex items-start gap-2.5 group"
                            >
                              <Building2 className="w-3.5 h-3.5 text-[#e0592a] mt-0.5 shrink-0" />
                              <div className="flex-1 truncate">
                                <p className="font-semibold text-stone-900 group-hover:text-[#e0592a] transition-colors truncate text-xs">
                                  {hotel.name}
                                </p>
                                <p className="text-[11px] text-stone-500 truncate">
                                  {hotel.city}, {hotel.country} · {hotel.brandId === 'the-ritz-carlton' ? 'The Ritz-Carlton' : hotel.brandId === 'jw-marriott' ? 'JW Marriott' : 'The St. Regis'}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {matchedBrands.length === 0 && matchingHotelsForBrandSearch.length === 0 && (
                      <div className="p-4 text-center text-xs text-stone-500">
                        <p className="font-medium text-stone-700">No matching luxury brand or hotel found</p>
                        <p className="text-[11px] mt-1 text-stone-400">
                          Try searching our 3 brands: "The Ritz-Carlton", "JW Marriott", or "The St. Regis".
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}
          </div>

          {/* 2. Dates Box (Middle) */}
          <div className="md:col-span-7 lg:col-span-4 relative md:border-l md:border-stone-200 md:pl-4 lg:px-4">
            <div
              onClick={() => setActivePopover(activePopover === 'dates' ? null : 'dates')}
              className="cursor-pointer group text-left transition-all py-1.5 px-2 rounded-xl hover:bg-stone-50"
            >
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#e0592a] font-bold mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#e0592a] shrink-0 stroke-[2.5]" />
                <span>{nightsCount} {nightsCount === 1 ? 'NIGHT' : 'NIGHTS'}</span>
              </div>
              <span className="font-sans text-sm sm:text-base lg:text-lg font-semibold text-stone-900 whitespace-nowrap block tracking-tight">
                {formatDateDisplay(searchParams.checkIn)} – {formatDateDisplay(searchParams.checkOut)}
              </span>
            </div>

            {/* Interactive DateRangeCalendar Dropdown */}
            {activePopover === 'dates' && (
              <div 
                className="absolute left-0 lg:-left-12 top-full mt-3 z-[999]"
                onClick={(e) => e.stopPropagation()}
              >
                <DateRangeCalendar
                  checkIn={searchParams.checkIn}
                  checkOut={searchParams.checkOut}
                  onChange={(checkIn, checkOut) => {
                    updateSearchParams({ checkIn, checkOut });
                  }}
                  onClose={() => setActivePopover(null)}
                />
              </div>
            )}
          </div>

          {/* 3. Find Hotels Button (Right Pill Button matching 2nd image) */}
          <div className="md:col-span-12 lg:col-span-3 flex justify-end shrink-0">
            <button
              type="submit"
              className="w-full lg:w-auto min-h-[48px] sm:min-h-[52px] bg-[#1c1917] hover:bg-black active:scale-[0.98] text-white font-bold rounded-full px-6 sm:px-8 py-3 text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <Search className="w-4 h-4 stroke-[3]" />
              <span>Find Hotels</span>
            </button>
          </div>

        </div>

        {/* ======================================================== */}
        {/* BOTTOM ROW: ROOMS & GUESTS | LOWEST RATE | POINTS        */}
        {/* ======================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs font-semibold text-stone-800">

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">

            {/* Rooms & Guests Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActivePopover(activePopover === 'guests' ? null : 'guests')}
                className="flex items-center gap-1.5 text-stone-800 hover:text-stone-950 transition-colors py-1 focus:outline-none"
              >
                <span>{guestsSummary}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-600 transition-transform ${activePopover === 'guests' ? 'rotate-180' : ''}`} />
              </button>

              {/* Rooms and Guests Popover */}
              {activePopover === 'guests' && (
                <div 
                  className="absolute left-0 top-full mt-2 z-[999]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <RoomsAndGuestsSelector
                    rooms={searchParams.rooms}
                    adults={searchParams.adults}
                    seniors={searchParams.seniors || 0}
                    childrenCount={searchParams.children}
                    childrenAges={searchParams.childrenAges}
                    onChange={(data) => {
                      updateSearchParams(data);
                    }}
                    onClose={() => setActivePopover(null)}
                  />
                </div>
              )}
            </div>

            {/* Lowest Regular Rate / Special Rates Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActivePopover(activePopover === 'rates' ? null : 'rates')}
                className="flex items-center gap-1.5 text-stone-800 hover:text-stone-950 transition-colors py-1 focus:outline-none"
              >
                <span>
                  {searchParams.promoCode
                    ? `Promo: ${searchParams.promoCode}`
                    : rateType === 'senior'
                      ? 'Senior Discount'
                      : rateType === 'government'
                        ? 'Gov & Military Rate'
                        : 'Lowest Regular Rate'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-600 transition-transform ${activePopover === 'rates' ? 'rotate-180' : ''}`} />
              </button>

              {/* Special Rates Dropdown Menu */}
              {activePopover === 'rates' && (
                <div 
                  className="absolute left-0 top-full mt-2 w-72 bg-white border border-stone-200 rounded-2xl shadow-2xl p-4 z-[999] text-xs animate-in fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="font-bold text-stone-900 pb-2 mb-2 border-b border-stone-100 flex items-center justify-between">
                    <span>Special Rates & Promo</span>
                    <button
                      type="button"
                      onClick={() => setActivePopover(null)}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2 mb-3">
                    {[
                      { id: 'lowest', label: 'Lowest Regular Rate' },
                      { id: 'senior', label: 'Senior Discount (62+)' },
                      { id: 'government', label: 'Government & Military' }
                    ].map((rate) => (
                      <label key={rate.id} className="flex items-center gap-2 cursor-pointer text-stone-700 hover:text-stone-900">
                        <input
                          type="radio"
                          name="rateType"
                          checked={rateType === rate.id && !searchParams.promoCode}
                          onChange={() => {
                            setRateType(rate.id as any);
                            updateSearchParams({ promoCode: '' });
                          }}
                          className="text-[#e0592a] focus:ring-[#e0592a]"
                        />
                        <span>{rate.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Promo Code Input */}
                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block mb-1.5">
                      Promotional Code
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. BONVOYVIP"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="flex-1 bg-stone-50 text-stone-900 uppercase px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs focus:outline-none focus:border-[#e0592a]"
                      />
                      <button
                        type="button"
                        onClick={() => applyPromo(promoInput)}
                        className="px-3 py-1.5 bg-[#1c1917] text-white font-semibold rounded-lg hover:bg-black"
                      >
                        Apply
                      </button>
                    </div>
                    {promoFeedback && (
                      <p className="mt-1.5 text-[11px] text-[#e0592a] font-semibold">{promoFeedback}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Use Points / Awards Checkbox matching 2nd image */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-stone-800 hover:text-stone-950">
              <input
                type="checkbox"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-[#1c1917] focus:ring-[#1c1917] accent-[#1c1917]"
              />
              <span className="font-semibold text-xs">Use Points/Awards</span>
            </label>

          </div>

        </div>

      </form>
    </div>
  );
};
