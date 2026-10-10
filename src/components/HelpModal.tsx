import React from 'react';
import { useBooking } from '../context/BookingContext';
import {
  X,
  Phone,
  HelpCircle,
  FileText,
  Search,
  ShieldCheck,
  Clock,
  ExternalLink
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const { goToMyBookings, setAuthModalTab, setIsAuthModalOpen } = useBooking();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-[#8a1538]" />
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Marriott Bonvoy Guest Help
          </h3>
        </div>
        <p className="text-xs text-stone-500 mb-6">
          24/7 global customer assistance, reservation management, and member service.
        </p>

        <div className="space-y-4 text-xs">
          {/* Reservation Lookup */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <h4 className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-[#8a1538]" />
              <span>Looking for an Existing Reservation?</span>
            </h4>
            <p className="text-stone-600 mb-3">
              View, modify, or cancel your confirmed stays using your confirmation code and last name.
            </p>
            <button
              onClick={() => {
                onClose();
                goToMyBookings();
              }}
              className="px-4 py-2 bg-[#8a1538] text-white font-semibold rounded-lg hover:bg-[#6b102c] transition-colors"
            >
              Go to My Trips & Bookings
            </button>
          </div>

          {/* 24/7 Telephone Contacts */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <h4 className="font-semibold text-stone-900 mb-2 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>24/7 Global Telephone Support</span>
            </h4>
            <div className="space-y-2 text-stone-700">
              <div className="flex justify-between items-center">
                <span>US & Canada Reservations:</span>
                <a href="tel:18005354028" className="font-mono font-bold text-[#8a1538] hover:underline">
                  +1 (800) 535-4028
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span>Marriott Bonvoy Elite Desk:</span>
                <a href="tel:18002282100" className="font-mono font-bold text-[#8a1538] hover:underline">
                  +1 (800) 228-2100
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span>UK & Europe Assistance:</span>
                <a href="tel:+442070127312" className="font-mono font-bold text-[#8a1538] hover:underline">
                  +44 20 7012 7312
                </a>
              </div>
            </div>
          </div>

          {/* Member FAQ & Best Rate Guarantee */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
            <h4 className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8a1538]" />
              <span>Marriott Best Rate Guarantee</span>
            </h4>
            <p className="text-stone-600">
              Always get the lowest rate when booking directly. If you find a lower rate within 24 hours of booking, we'll match it and give you an extra 25% discount or 5,000 points.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white font-semibold text-xs rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
