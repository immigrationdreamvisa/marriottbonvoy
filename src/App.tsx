import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomePromotionsSection } from './components/HomePromotionsSection';
import { BrandCardsSection } from './components/BrandCardsSection';
import { BrandDetailPage } from './components/BrandDetailPage';
import { DestinationsSection } from './components/DestinationsSection';
import { DirectBenefitsSection } from './components/DirectBenefitsSection';
import { HotelSearchResults } from './components/HotelSearchResults';
import { HotelDetailPage } from './components/HotelDetailPage';
import { BookingFlowModal } from './components/BookingFlowModal';
import { ConfirmationView } from './components/ConfirmationView';
import { MyBookingsPage } from './components/MyBookingsPage';
import { OffersSection } from './components/OffersSection';
import { DestinationsPage } from './components/DestinationsPage';
import { VacationsPage } from './components/VacationsPage';
import { CareersPage } from './components/CareersPage';
import { MeetingsPage } from './components/MeetingsPage';
import { MembershipPage } from './components/MembershipPage';
import { HotelLocationsPage } from './components/HotelLocationsPage';
import { GolfPage } from './components/GolfPage';
import { ExperienceDetailPage } from './components/ExperienceDetailPage';
import { GiftCardsPage } from './components/GiftCardsPage';
import { BrandShopPage } from './components/BrandShopPage';
import { AuthModal } from './components/AuthModal';
import { TripsLookupModal } from './components/TripsLookupModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentView } = useBooking();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 selection:bg-[#e2d9cc] selection:text-stone-900">
      <Header />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <OffersSection />
            <DestinationsSection />
            <DirectBenefitsSection />
          </>
        )}

        {currentView === 'search-results' && <HotelSearchResults />}
        {currentView === 'property-details' && <HotelDetailPage />}
        {currentView === 'brand-detail' && <BrandDetailPage />}
        {currentView === 'booking-flow' && <BookingFlowModal />}
        {currentView === 'confirmation' && <ConfirmationView />}
        {currentView === 'my-bookings' && <MyBookingsPage />}
        {currentView === 'destinations' && <DestinationsPage />}
        {currentView === 'vacations' && <VacationsPage />}
        {currentView === 'careers' && <CareersPage />}
        {currentView === 'meetings' && <MeetingsPage />}
        {currentView === 'membership' && <MembershipPage />}
        {currentView === 'hotel-locations' && <HotelLocationsPage />}
        {currentView === 'golf' && <GolfPage />}
        {currentView === 'gift-cards' && <GiftCardsPage />}
        {currentView === 'shop-brand' && <BrandShopPage />}
        {(currentView === 'residences' ||
          currentView === 'dine-drink' ||
          currentView === 'outdoors' ||
          currentView === 'insurance' ||
          currentView === 'business-program' ||
          currentView === 'credit-cards' ||
          currentView === 'travel-tips') && <ExperienceDetailPage />}
        {currentView === 'offers' && <HotelSearchResults />}
      </main>

      <Footer />
      <AuthModal />
      <TripsLookupModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </AuthProvider>
  );
}
