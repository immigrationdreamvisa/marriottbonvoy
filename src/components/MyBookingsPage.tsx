import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { Reservation } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import {
  Search,
  MapPin,
  AlertTriangle,
  X,
  Printer,
  Compass
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { reservations, cancelReservation, findReservationByCode } = useAuth();
  const { goToHome, goToSearchResults } = useBooking();

  // Search/Lookup State
  const [lookupCode, setLookupCode] = useState('');
  const [lookupLastName, setLookupLastName] = useState('');
  const [lookupResult, setLookupResult] = useState<Reservation | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Cancellation Modal State
  const [cancellingRes, setCancellingRes] = useState<Reservation | null>(null);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    setLookupResult(null);

    if (!lookupCode.trim()) {
      setLookupError('Please enter a valid Confirmation Number.');
      return;
    }

    const found = findReservationByCode(lookupCode, lookupLastName || undefined);
    if (found) {
      setLookupResult(found);
    } else {
      setLookupError('No reservation matched that confirmation number and surname. Please double check your voucher.');
    }
  };

  const confirmCancellation = () => {
    if (cancellingRes) {
      cancelReservation(cancellingRes.id);
      setCancelSuccessMsg(`Reservation ${cancellingRes.confirmationCode} has been successfully cancelled.`);
      setCancellingRes(null);
      if (lookupResult && lookupResult.id === cancellingRes.id) {
        setLookupResult({ ...lookupResult, status: 'cancelled' });
      }
    }
  };

  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.22em] text-[#8a1538] font-bold block mb-2">
            Marriott Bonvoy Trips
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mb-3">
            My Trips & Reservation Lookup
          </h1>
          <p className="text-stone-600 text-sm max-w-xl font-normal">
            Manage your upcoming stays, view itinerary vouchers, or look up a reservation using your confirmation number.
          </p>
        </div>

        {cancelSuccessMsg && (
          <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
            <span>{cancelSuccessMsg}</span>
            <button onClick={() => setCancelSuccessMsg(null)} className="text-amber-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 1. Quick Reservation Lookup Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs mb-12">
          <h2 className="font-serif text-xl font-bold text-stone-900 mb-2">
            Find a Specific Reservation
          </h2>
          <p className="text-xs text-stone-500 mb-6 font-normal">
            Enter your confirmation reference and guest last name to locate your stay.
          </p>

          <form onSubmit={handleLookup} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
            <div className="sm:col-span-5">
              <label className="block text-stone-700 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Confirmation Number *
              </label>
              <input
                type="text"
                placeholder="e.g. MB-892401 or AUR-892401"
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 uppercase font-mono focus:outline-none focus:border-[#8a1538]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-stone-700 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Guest Surname (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Rostova"
                value={lookupLastName}
                onChange={(e) => setLookupLastName(e.target.value)}
                className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-[#8a1538]"
              />
            </div>

            <div className="sm:col-span-3 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Locate Stay</span>
              </button>
            </div>
          </form>

          {lookupError && (
            <p className="mt-4 text-xs text-red-600 font-medium">{lookupError}</p>
          )}

          {/* Lookup Found Result Preview */}
          {lookupResult && (
            <div className="mt-6 pt-6 border-t border-stone-100">
              <span className="text-[11px] text-emerald-700 uppercase tracking-wider font-bold block mb-3">
                Found Reservation:
              </span>
              <ReservationCard
                reservation={lookupResult}
                onCancelRequest={() => setCancellingRes(lookupResult)}
              />
            </div>
          )}
        </div>

        {/* 2. List of All Active Reservations in Account */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-normal text-stone-900">
              Your Reserved Itineraries ({reservations.length})
            </h2>
          </div>

          {reservations.length > 0 ? (
            <div className="space-y-6">
              {reservations.map((res) => (
                <ReservationCard
                  key={res.id}
                  reservation={res}
                  onCancelRequest={() => setCancellingRes(res)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center shadow-xs">
              <Compass className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">No Upcoming Trips Found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
                You do not have any active itineraries booked. Explore our hotel brands and plan your next journey.
              </p>
              <button
                onClick={() => goToSearchResults()}
                className="px-5 py-2.5 bg-[#8a1538] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs"
              >
                Find Hotels & Resorts
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Cancellation Confirmation Modal */}
      {cancellingRes && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-stone-900 space-y-4 border border-stone-200 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h3 className="font-serif text-xl font-bold">Cancel Reservation?</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you wish to cancel reservation{' '}
              <strong className="font-mono text-stone-900">{cancellingRes.confirmationCode}</strong> at{' '}
              <strong className="text-stone-900">{cancellingRes.propertyName}</strong>?
            </p>

            <div className="p-3 bg-stone-50 rounded-lg text-stone-600 text-[11px]">
              {cancellingRes.cancellationPolicy}
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCancellingRes(null)}
                className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-bold text-stone-700 hover:bg-stone-50"
              >
                Keep Reservation
              </button>
              <button
                type="button"
                onClick={confirmCancellation}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

interface ReservationCardProps {
  reservation: Reservation;
  onCancelRequest: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation: res, onCancelRequest }) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
      <div className="p-6 flex flex-col sm:flex-row gap-6">
        
        {/* Photo */}
        <div className="sm:w-48 h-36 rounded-xl overflow-hidden bg-stone-100 shrink-0">
          <ImageWithFallback
            src={res.propertyImage}
            alt={res.propertyName}
            fallbackTitle={res.propertyName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider text-[#8a1538] font-bold">
                {res.brandName}
              </span>
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-mono font-bold ${
                res.status === 'confirmed'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-stone-100 text-stone-500'
              }`}>
                {res.status.toUpperCase()}
              </span>
            </div>

            <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
              {res.propertyName}
            </h3>

            <p className="text-xs text-stone-500 flex items-center gap-1 mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#8a1538]" />
              <span>{res.propertyCity}, {res.propertyCountry}</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-600 bg-[#faf9f6] p-3 rounded-lg">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Dates</span>
                <span className="font-semibold text-stone-900">{res.checkIn} → {res.checkOut}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Code</span>
                <span className="font-mono font-bold text-stone-900">{res.confirmationCode}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Total Amount</span>
                <span className="font-semibold text-stone-900">${res.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 mt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-stone-500 text-[11px]">
              Guest: {res.guest.firstName} {res.guest.lastName} ({res.guest.email})
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Printer className="w-3 h-3" />
                <span>Voucher</span>
              </button>

              {res.status === 'confirmed' && (
                <button
                  onClick={onCancelRequest}
                  className="px-3 py-1.5 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold transition-colors"
                >
                  Cancel Stay
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
