import React from 'react';
import { useBooking } from '../context/BookingContext';
import { ImageWithFallback } from './ImageWithFallback';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Printer,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ConfirmationView: React.FC = () => {
  const {
    activeConfirmedReservation,
    goToHome,
    goToMyBookings
  } = useBooking();

  if (!activeConfirmedReservation) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <p className="text-sm text-stone-600 mb-4">No active confirmed booking found.</p>
        <button
          onClick={goToHome}
          className="px-5 py-2.5 bg-[#8a1538] text-white font-bold rounded-lg text-xs"
        >
          Return to Marriott Bonvoy Home
        </button>
      </div>
    );
  }

  const res = activeConfirmedReservation;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Banner */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[#8a1538]/10 text-[#8a1538] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>
          <span className="text-xs uppercase tracking-[0.22em] text-[#8a1538] font-bold block mb-2">
            Reservation Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal mb-2">
            Your Stay is Officially Confirmed
          </h1>
          <p className="text-stone-600 text-sm max-w-lg mx-auto font-normal leading-relaxed">
            A confirmation voucher has been sent to{' '}
            <strong className="text-stone-900 font-bold">{res.guest.email}</strong>.
          </p>
        </div>

        {/* The Voucher Card */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xl mb-8">
          
          {/* Header of Voucher */}
          <div className="bg-stone-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold block mb-1">
                Marriott Bonvoy Confirmation Number
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-bold tracking-widest text-white">
                {res.confirmationCode}
              </span>
            </div>

            <div className="text-left sm:text-right text-xs text-stone-300">
              <span className="block">Booked on {res.createdAt}</span>
              <span className="text-emerald-400 font-semibold">Status: Guaranteed & Confirmed</span>
            </div>
          </div>

          {/* Property Image & Details */}
          <div className="p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row gap-5 pb-6 border-b border-stone-100">
              <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                <ImageWithFallback
                  src={res.propertyImage}
                  alt={res.propertyName}
                  fallbackTitle={res.propertyName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8a1538] font-bold block mb-1">
                  {res.brandName}
                </span>
                <h2 className="font-serif text-2xl font-bold text-stone-900 mb-1">
                  {res.propertyName}
                </h2>
                <p className="text-xs text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8a1538]" />
                  <span>{res.propertyCity}, {res.propertyCountry}</span>
                </p>
              </div>
            </div>

            {/* Stay Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#faf9f6] p-5 rounded-xl border border-stone-200/80">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block mb-1">
                  Check-in Date
                </span>
                <span className="font-bold text-stone-900 text-sm">{res.checkIn}</span>
                <span className="text-[11px] text-stone-500 block">From 15:00</span>
              </div>

              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block mb-1">
                  Check-out Date
                </span>
                <span className="font-bold text-stone-900 text-sm">{res.checkOut}</span>
                <span className="text-[11px] text-stone-500 block">Until 12:00 noon</span>
              </div>

              <div className="pt-2 border-t border-stone-200/60 sm:col-span-2 flex flex-wrap gap-x-6 gap-y-2">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Duration</span>
                  <span className="font-semibold text-stone-900">{res.nights} Nights</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Accommodation</span>
                  <span className="font-semibold text-stone-900">{res.roomName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Rate Plan</span>
                  <span className="font-semibold text-stone-900">{res.ratePlanName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Guests</span>
                  <span className="font-semibold text-stone-900">{res.adultsCount} Adults, {res.childrenCount} Children</span>
                </div>
              </div>
            </div>

            {/* Guest & Payment Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pt-2">
              <div>
                <h3 className="font-bold text-stone-900 mb-2 uppercase tracking-wider text-[11px]">
                  Guest Information
                </h3>
                <p className="text-stone-800 font-semibold">{res.guest.firstName} {res.guest.lastName}</p>
                <p className="text-stone-500">{res.guest.email}</p>
                <p className="text-stone-500">{res.guest.phone}</p>
                {res.guest.specialRequests && (
                  <p className="text-stone-600 italic mt-2 text-[11px]">
                    Requests: "{res.guest.specialRequests}"
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-bold text-stone-900 mb-2 uppercase tracking-wider text-[11px] flex items-center justify-between">
                  <span>Payment Summary</span>
                  {res.paypalTransactionId ? (
                    <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-bold">
                      PayPal Verified
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                      {res.cardBrand || 'Card'} Authorized
                    </span>
                  )}
                </h3>
                <div className="space-y-1.5 text-stone-600">
                  <div className="flex justify-between">
                    <span>Room Accommodation:</span>
                    <span className="font-mono text-stone-900 font-semibold">${res.roomSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Service Fees:</span>
                    <span className="font-mono text-stone-900 font-semibold">${res.taxesAndFees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resort Amenity Fee:</span>
                    <span className="font-mono text-stone-900 font-semibold">${res.resortFee.toLocaleString()}</span>
                  </div>
                  {res.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Privilege Discount:</span>
                      <span className="font-mono">-${res.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
                    <span>Total Paid:</span>
                    <span className="font-serif text-lg text-[#003087]">${res.totalAmount.toLocaleString()} USD</span>
                  </div>

                  {/* Payment Verification Box */}
                  {res.paypalTransactionId ? (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-blue-50/60 border border-blue-200/80 text-[11px] space-y-1">
                      <div className="flex justify-between text-stone-700">
                        <span className="font-semibold text-stone-900">Payment Gateway:</span>
                        <span className="font-bold text-[#003087]">PayPal Express</span>
                      </div>
                      <div className="flex justify-between text-stone-700">
                        <span>PayPal Trans. ID:</span>
                        <span className="font-mono font-bold text-stone-900">{res.paypalTransactionId}</span>
                      </div>
                      {res.paypalFundingSource && (
                        <div className="flex justify-between text-stone-700">
                          <span>Funding Source:</span>
                          <span className="font-medium text-stone-800">{res.paypalFundingSource}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/80 text-[11px] space-y-1">
                      <div className="flex justify-between text-stone-700">
                        <span className="font-semibold text-stone-900">Payment Method:</span>
                        <span className="font-bold text-emerald-800">{res.cardBrand || 'Credit Card'}</span>
                      </div>
                      <div className="flex justify-between text-stone-700">
                        <span>Card Guarantee:</span>
                        <span className="font-mono font-bold text-stone-900">•••• {res.cardLast4 || '8842'}</span>
                      </div>
                      {res.paypalFundingSource && (
                        <div className="flex justify-between text-stone-700">
                          <span>Cardholder:</span>
                          <span className="font-medium text-stone-800">{res.paypalFundingSource}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Policy */}
            <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Complimentary cancellation available up to 48 hours prior to arrival date.</span>
            </div>

          </div>

          {/* Action Footer */}
          <div className="bg-stone-50 p-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-lg text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Voucher</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={goToMyBookings}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                View in My Trips
              </button>

              <button
                onClick={goToHome}
                className="px-4 py-2 bg-[#8a1538] hover:bg-[#6e0f2b] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <span>Marriott Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
