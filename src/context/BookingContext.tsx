import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { SearchParams, BrandId, Property, RoomType, RatePlan, Reservation } from '../types';
import { PROPERTIES } from '../data/properties';
import { VALID_PROMO_CODES } from '../data/offers';

export type ViewType =
  | 'home'
  | 'search-results'
  | 'property-details'
  | 'brand-detail'
  | 'booking-flow'
  | 'confirmation'
  | 'my-bookings'
  | 'offers'
  | 'gift-cards'
  | 'shop-brand'
  | 'destinations'
  | 'vacations'
  | 'careers'
  | 'meetings'
  | 'membership'
  | 'hotel-locations'
  | 'golf'
  | 'residences'
  | 'dine-drink'
  | 'outdoors'
  | 'insurance'
  | 'business-program'
  | 'credit-cards'
  | 'travel-tips';

interface BookingContextType {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  updateSearchParams: (updates: Partial<SearchParams>) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  selectedRoomId: string | null;
  setSelectedRoomId: (id: string | null) => void;
  selectedRatePlanId: string | null;
  setSelectedRatePlanId: (id: string | null) => void;
  selectedBrandId: BrandId | null;
  setSelectedBrandId: (id: BrandId | null) => void;
  activeConfirmedReservation: Reservation | null;
  setActiveConfirmedReservation: (res: Reservation | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'signin' | 'register' | 'lookup';
  setAuthModalTab: (tab: 'signin' | 'register' | 'lookup') => void;
  isTripsModalOpen: boolean;
  setIsTripsModalOpen: (open: boolean) => void;
  
  // Navigation actions
  goToHome: () => void;
  goToSearchResults: (overrideParams?: Partial<SearchParams>) => void;
  goToPropertyDetails: (propertyId: string) => void;
  goToBrandDetail: (brandId: BrandId) => void;
  goToOffers: () => void;
  goToGiftCards: () => void;
  goToShopBrand: (brandSlug?: string) => void;
  goToMyBookings: () => void;
  goToDestinations: () => void;
  goToVacations: (category?: string) => void;
  goToCareers: () => void;
  goToMeetings: () => void;
  goToMembership: () => void;
  goToHotelLocations: () => void;
  goToGolf: () => void;
  goToResidences: () => void;
  goToDineDrink: () => void;
  goToOutdoors: () => void;
  goToInsurance: () => void;
  goToBusinessProgram: () => void;
  goToCreditCards: () => void;
  goToTravelTips: () => void;
  startBookingFlow: (propertyId: string, roomId: string, ratePlanId: string) => void;
  
  // Helpers
  vacationCategory: string;
  setVacationCategory: (category: string) => void;
  selectedShopBrand: string;
  setSelectedShopBrand: (brand: string) => void;
  selectedProperty: Property | null;
  selectedRoom: RoomType | null;
  selectedRatePlan: RatePlan | null;
  nightsCount: number;
  filteredProperties: Property[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Helper to get default dates (e.g. 14 days from now for 4 nights)
const getDefaultDates = () => {
  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + 14);
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + 4);

  const format = (d: Date) => d.toISOString().split('T')[0];
  return {
    checkIn: format(checkInDate),
    checkOut: format(checkOutDate)
  };
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultDates = useMemo(() => getDefaultDates(), []);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: '',
    checkIn: defaultDates.checkIn,
    checkOut: defaultDates.checkOut,
    rooms: 1,
    adults: 2,
    seniors: 0,
    children: 0,
    childrenAges: [],
    selectedBrands: [],
    promoCode: ''
  });

  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRatePlanId, setSelectedRatePlanId] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<BrandId | null>(null);
  const [activeConfirmedReservation, setActiveConfirmedReservation] = useState<Reservation | null>(null);
  const [vacationCategory, setVacationCategory] = useState<string>('All');
  const [selectedShopBrand, setSelectedShopBrand] = useState<string>('courtyard');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'register' | 'lookup'>('signin');
  const [isTripsModalOpen, setIsTripsModalOpen] = useState(false);

  // URL synchronization helper
  const syncBrowserUrl = (view: ViewType, propId?: string | null, brandId?: BrandId | null) => {
    try {
      let targetPath = '/';
      if (view === 'property-details' && propId) {
        const prop = PROPERTIES.find(p => p.id === propId);
        if (prop) {
          targetPath = `/en-us/hotels/${prop.slug}/overview/`;
        }
      } else if (view === 'search-results') {
        targetPath = '/en-us/hotels/search/';
      } else if (view === 'brand-detail' && brandId) {
        targetPath = `/en-us/marriott-brands/${brandId}/`;
      } else if (view === 'offers') {
        targetPath = '/en-us/offers/';
      } else if (view === 'destinations') {
        targetPath = '/en-us/destinations/';
      } else if (view === 'vacations') {
        targetPath = '/en-us/vacations/';
      } else if (view === 'credit-cards') {
        targetPath = '/en-us/credit-cards/';
      } else if (view === 'membership') {
        targetPath = '/en-us/loyalty/marriott-bonvoy/';
      } else if (view === 'meetings') {
        targetPath = '/en-us/meetings-events/';
      } else if (view === 'my-bookings') {
        targetPath = '/en-us/trips/';
      } else if (view === 'hotel-locations') {
        targetPath = '/en-us/hotel-locations/';
      } else if (view === 'golf') {
        targetPath = '/en-us/golf/';
      }

      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view, propId, brandId }, '', targetPath);
      }
    } catch {
      // Ignore in environments where pushState is constrained
    }
  };

  // Listen to popstate event (browser Back/Forward)
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      if (pathname.includes('/hotels/') && pathname.includes('/overview/')) {
        const parts = pathname.split('/').filter(Boolean);
        const slug = parts[parts.indexOf('hotels') + 1];
        const prop = PROPERTIES.find(p => p.slug === slug || p.id === slug);
        if (prop) {
          setSelectedPropertyId(prop.id);
          setCurrentView('property-details');
          return;
        }
      }
      if (pathname.includes('/search/')) {
        setCurrentView('search-results');
      } else if (pathname.includes('/offers/')) {
        setCurrentView('offers');
      } else if (pathname.includes('/destinations/')) {
        setCurrentView('destinations');
      } else if (pathname.includes('/vacations/')) {
        setCurrentView('vacations');
      } else if (pathname.includes('/credit-cards/')) {
        setCurrentView('credit-cards');
      } else if (pathname.includes('/marriott-bonvoy/')) {
        setCurrentView('membership');
      } else if (pathname.includes('/trips/')) {
        setCurrentView('my-bookings');
      } else {
        setCurrentView('home');
      }
    };

    // Initial check on load
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateSearchParams = (updates: Partial<SearchParams>) => {
    setSearchParams(prev => ({ ...prev, ...updates }));
  };

  const calculateNights = (inDate: string, outDate: string) => {
    try {
      const d1 = new Date(inDate);
      const d2 = new Date(outDate);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };

  const nightsCount = useMemo(() => {
    return calculateNights(searchParams.checkIn, searchParams.checkOut);
  }, [searchParams.checkIn, searchParams.checkOut]);

  const selectedProperty = useMemo(() => {
    if (!selectedPropertyId) return null;
    return PROPERTIES.find(p => p.id === selectedPropertyId) || null;
  }, [selectedPropertyId]);

  const selectedRoom = useMemo(() => {
    if (!selectedProperty || !selectedRoomId) return null;
    return selectedProperty.rooms.find(r => r.id === selectedRoomId) || null;
  }, [selectedProperty, selectedRoomId]);

  const selectedRatePlan = useMemo(() => {
    if (!selectedRoom || !selectedRatePlanId) return null;
    return selectedRoom.ratePlans.find(rp => rp.id === selectedRatePlanId) || null;
  }, [selectedRoom, selectedRatePlanId]);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(property => {
      // Destination & Brand filter
      if (searchParams.destination.trim()) {
        const query = searchParams.destination.toLowerCase().trim();

        // Check if query is searching for one of our 3 brands
        const isRitzSearch = query.includes('ritz') || query.includes('the ritz-carlton');
        const isJwSearch = query.includes('jw') || query.includes('jw marriott');
        const isStRegisSearch = query.includes('regis') || query.includes('st. regis') || query.includes('st regis');

        const matchesBrand = 
          (isRitzSearch && property.brandId === 'the-ritz-carlton') ||
          (isJwSearch && property.brandId === 'jw-marriott') ||
          (isStRegisSearch && property.brandId === 'st-regis');

        const matchesCity = property.city.toLowerCase().includes(query);
        const matchesCountry = property.country.toLowerCase().includes(query);
        const matchesRegion = property.region.toLowerCase().includes(query);
        const matchesName = property.name.toLowerCase().includes(query);

        if (!matchesBrand && !matchesCity && !matchesCountry && !matchesRegion && !matchesName) {
          return false;
        }
      }

      // Brand filter
      if (searchParams.selectedBrands.length > 0) {
        if (!searchParams.selectedBrands.includes(property.brandId)) {
          return false;
        }
      }

      // Occupancy check across available rooms
      const totalGuests = searchParams.adults + searchParams.children;
      const hasSuitableRoom = property.rooms.some(
        r => r.maxAdults >= searchParams.adults && (r.maxAdults + r.maxChildren) >= totalGuests
      );
      if (!hasSuitableRoom) {
        return false;
      }

      return true;
    });
  }, [searchParams]);

  // Navigation handlers
  const goToHome = () => {
    setCurrentView('home');
    syncBrowserUrl('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToSearchResults = (overrideParams?: Partial<SearchParams>) => {
    if (overrideParams) {
      setSearchParams(prev => ({ ...prev, ...overrideParams }));
    }
    setCurrentView('search-results');
    syncBrowserUrl('search-results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPropertyDetails = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    // Select first room and rate plan by default for smooth UX
    const prop = PROPERTIES.find(p => p.id === propertyId || p.slug === propertyId);
    if (prop) {
      setSelectedPropertyId(prop.id);
      if (prop.rooms.length > 0) {
        setSelectedRoomId(prop.rooms[0].id);
        if (prop.rooms[0].ratePlans.length > 0) {
          setSelectedRatePlanId(prop.rooms[0].ratePlans[0].id);
        }
      }
      syncBrowserUrl('property-details', prop.id);
    }
    setCurrentView('property-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToBrandDetail = (brandId: BrandId) => {
    setSelectedBrandId(brandId);
    setCurrentView('brand-detail');
    syncBrowserUrl('brand-detail', null, brandId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToOffers = () => {
    setCurrentView('offers');
    syncBrowserUrl('offers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToGiftCards = () => {
    setCurrentView('gift-cards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToShopBrand = (brandSlug: string = 'courtyard') => {
    setSelectedShopBrand(brandSlug);
    setCurrentView('shop-brand');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToMyBookings = () => {
    setCurrentView('my-bookings');
    syncBrowserUrl('my-bookings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDestinations = () => {
    setCurrentView('destinations');
    syncBrowserUrl('destinations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToVacations = (category?: string) => {
    if (category) {
      setVacationCategory(category);
    }
    setCurrentView('vacations');
    syncBrowserUrl('vacations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCareers = () => {
    setCurrentView('careers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToMeetings = () => {
    setCurrentView('meetings');
    syncBrowserUrl('meetings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToMembership = () => {
    setCurrentView('membership');
    syncBrowserUrl('membership');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHotelLocations = () => {
    setCurrentView('hotel-locations');
    syncBrowserUrl('hotel-locations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToGolf = () => {
    setCurrentView('golf');
    syncBrowserUrl('golf');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToResidences = () => {
    setCurrentView('residences');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToDineDrink = () => {
    setCurrentView('dine-drink');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToOutdoors = () => {
    setCurrentView('outdoors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToInsurance = () => {
    setCurrentView('insurance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToBusinessProgram = () => {
    setCurrentView('business-program');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCreditCards = () => {
    setCurrentView('credit-cards');
    syncBrowserUrl('credit-cards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToTravelTips = () => {
    setCurrentView('travel-tips');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startBookingFlow = (propertyId: string, roomId: string, ratePlanId: string) => {
    setSelectedPropertyId(propertyId);
    setSelectedRoomId(roomId);
    setSelectedRatePlanId(ratePlanId);
    setCurrentView('booking-flow');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BookingContext.Provider
      value={{
        searchParams,
        setSearchParams,
        updateSearchParams,
        currentView,
        setCurrentView,
        selectedPropertyId,
        setSelectedPropertyId,
        selectedRoomId,
        setSelectedRoomId,
        selectedRatePlanId,
        setSelectedRatePlanId,
        selectedBrandId,
        setSelectedBrandId,
        activeConfirmedReservation,
        setActiveConfirmedReservation,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        isTripsModalOpen,
        setIsTripsModalOpen,
        goToHome,
        goToSearchResults,
        goToPropertyDetails,
        goToBrandDetail,
        goToOffers,
        goToGiftCards,
        goToShopBrand,
        goToMyBookings,
        goToDestinations,
        goToVacations,
        goToCareers,
        goToMeetings,
        goToMembership,
        goToHotelLocations,
        goToGolf,
        goToResidences,
        goToDineDrink,
        goToOutdoors,
        goToInsurance,
        goToBusinessProgram,
        goToCreditCards,
        goToTravelTips,
        startBookingFlow,
        vacationCategory,
        setVacationCategory,
        selectedShopBrand,
        setSelectedShopBrand,
        selectedProperty,
        selectedRoom,
        selectedRatePlan,
        nightsCount,
        filteredProperties
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
