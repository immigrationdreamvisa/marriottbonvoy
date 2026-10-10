import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { BRANDS } from '../data/brands';
import { MarriottLogo } from './MarriottLogo';
import { Phone, Mail, Check, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    goToHome,
    goToBrandDetail,
    goToSearchResults,
    goToOffers,
    goToMyBookings,
    goToDestinations,
    goToVacations,
    goToCareers,
    goToMeetings,
    goToMembership,
    goToHotelLocations,
    goToGolf,
    goToCreditCards,
    setIsAuthModalOpen,
    setAuthModalTab,
    setIsTripsModalOpen
  } = useBooking();

  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'cancellation' | null>(null);

  return (
    <footer className="bg-stone-100 text-stone-700 border-t border-stone-200 text-xs">

      {/* Main Multi-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={goToHome} className="text-left focus:outline-none">
              <MarriottLogo size="md" variant="burgundy" />
            </button>
            
            <p className="text-stone-600 font-normal leading-relaxed max-w-sm pt-2">
              Marriott Bonvoy offers the world's most extraordinary portfolio of hotel brands, award-winning loyalty benefits, and unparalleled travel experiences across 139 countries and territories.
            </p>

            <div className="pt-2 text-[11px] text-stone-600 space-y-1.5 font-medium">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8a1538]" />
                <span>Global Reservations: 1-800-MARRIOTT (24/7)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8a1538]" />
                <span>Customer Care: customer.care@marriott.com</span>
              </p>
            </div>
          </div>

          {/* Col 2: Brands */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
              Our Brands
            </h4>
            <ul className="space-y-2 text-stone-600">
              {BRANDS.map(brand => (
                <li key={brand.id}>
                  <button
                    onClick={() => goToBrandDetail(brand.id)}
                    className="hover:text-[#8a1538] transition-colors text-left"
                  >
                    {brand.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Destinations */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
              Destinations
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button
                  onClick={goToDestinations}
                  className="hover:text-[#8a1538] transition-colors text-left font-bold text-[#8a1538]"
                >
                  All Verified Destinations →
                </button>
              </li>
              {[
                { name: 'Kyoto, Japan', query: 'Kyoto' },
                { name: 'Tokyo, Japan', query: 'Tokyo' },
                { name: 'Venice, Italy', query: 'Venice' },
                { name: 'London, UK', query: 'London' },
                { name: 'Paris, France', query: 'Paris' },
                { name: 'Aspen, Colorado', query: 'Aspen' },
                { name: 'Bora Bora, Polynesia', query: 'Bora Bora' }
              ].map((dest, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => goToSearchResults({ destination: dest.query })}
                    className="hover:text-[#8a1538] transition-colors text-left"
                  >
                    {dest.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Travel & Programs */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
              Travel & Programs
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button onClick={goToMembership} className="hover:text-[#8a1538] transition-colors text-left font-medium">
                  Marriott Bonvoy® Loyalty
                </button>
              </li>
              <li>
                <button onClick={goToHotelLocations} className="hover:text-[#8a1538] transition-colors text-left">
                  All Hotel Locations
                </button>
              </li>
              <li>
                <button onClick={goToGolf} className="hover:text-[#8a1538] transition-colors text-left text-emerald-800 font-semibold">
                  Championship Golf Resorts
                </button>
              </li>
              <li>
                <button onClick={() => goToVacations()} className="hover:text-[#8a1538] transition-colors text-left">
                  Vacations & Escapes
                </button>
              </li>
              <li>
                <button
                  onClick={goToCareers}
                  className="hover:text-[#8a1538] transition-colors text-left font-bold text-stone-900 flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8a1538] group-hover:scale-125 transition-transform" />
                  <span>Marriott Careers & Culture</span>
                  <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    Hiring
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Guest Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
              Guest Services
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <button 
                  onClick={() => setIsTripsModalOpen(true)} 
                  className="hover:text-[#8a1538] transition-colors font-medium text-stone-900 cursor-pointer text-left"
                >
                  My Trips & Reservations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setAuthModalTab('signin');
                    setIsAuthModalOpen(true);
                  }} 
                  className="hover:text-[#8a1538] transition-colors cursor-pointer text-left"
                >
                  Sign In / Join Program
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('cancellation')} className="hover:text-[#8a1538] transition-colors">
                  Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('privacy')} className="hover:text-[#8a1538] transition-colors">
                  Privacy Statement
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicy('terms')} className="hover:text-[#8a1538] transition-colors">
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-10 mt-12 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © 1996 – 2026 Marriott International, Inc. All rights reserved. Marriott Proprietary Information.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActivePolicy('privacy')} className="hover:text-stone-800">
              Privacy Center
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setActivePolicy('terms')} className="hover:text-stone-800">
              Terms of Use
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => setActivePolicy('cancellation')} className="hover:text-stone-800">
              Cancellation Policy
            </button>
          </div>
        </div>
      </div>

      {/* Policy Modal Dialog */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 text-stone-900 border border-stone-200 shadow-2xl relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setActivePolicy(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {activePolicy === 'privacy' && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold">Privacy Statement</h3>
                <p className="text-stone-600 text-xs leading-relaxed font-normal">
                  Marriott International, Inc. is committed to protecting your privacy and security. We collect and process guest information strictly to manage hotel reservations, fulfill personalized requests, and provide loyalty program benefits through Marriott Bonvoy.
                </p>
                <p className="text-stone-600 text-xs leading-relaxed font-normal">
                  We adhere to global data protection laws including GDPR and CCPA. Your payment details are protected with secure encryption protocols.
                </p>
              </div>
            )}

            {activePolicy === 'terms' && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold">Terms of Use</h3>
                <p className="text-stone-600 text-xs leading-relaxed font-normal">
                  By using this website, you agree to comply with and be bound by Marriott International terms and conditions. All rates and reservations are subject to hotel availability and specific room type rules.
                </p>
                <p className="text-stone-600 text-xs leading-relaxed font-normal">
                  Guests must meet the minimum check-in age requirements (18 years, or 21 years at select U.S. properties).
                </p>
              </div>
            )}

            {activePolicy === 'cancellation' && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold">Cancellation Policy</h3>
                <p className="text-stone-600 text-xs leading-relaxed font-normal">
                  <strong>Flexible Rates:</strong> Cancellations made before the property-specific deadline (typically 48 hours prior to 15:00 local time on check-in day) incur no penalty.
                </p>
                <p className="text-stone-600 text-xs leading-relaxed font-normal">
                  <strong>Prepaid Rates:</strong> Advance purchase and non-refundable rates require prepayment and do not permit refunds upon cancellation.
                </p>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setActivePolicy(null)}
                className="px-5 py-2 bg-[#8a1538] text-white font-bold text-xs rounded-lg hover:bg-[#6e0f2b]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
