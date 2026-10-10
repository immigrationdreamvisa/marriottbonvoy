import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { PROPERTIES } from '../data/properties';
import { BRANDS } from '../data/brands';
import { RoomType, RatePlan } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import {
  ArrowLeft,
  Star,
  MapPin,
  Check,
  ShieldCheck,
  Calendar,
  Users,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';

export const HotelDetailPage: React.FC = () => {
  const {
    selectedPropertyId,
    goToSearchResults,
    searchParams,
    nightsCount,
    startBookingFlow
  } = useBooking();

  const property = PROPERTIES.find(p => p.id === selectedPropertyId) || PROPERTIES[0];
  const brand = BRANDS.find(b => b.id === property.brandId);

  // Selected Room and Rate Plan
  const [selectedRoomId, setSelectedRoomId] = useState<string>(property.rooms[0]?.id || '');
  const activeRoom: RoomType = property.rooms.find(r => r.id === selectedRoomId) || property.rooms[0];

  const [selectedRatePlanId, setSelectedRatePlanId] = useState<string>(
    activeRoom?.ratePlans[0]?.id || ''
  );
  const activeRatePlan: RatePlan =
    activeRoom?.ratePlans.find(rp => rp.id === selectedRatePlanId) || activeRoom?.ratePlans[0];

  // Fullscreen photo lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Curated 3+ images for the gallery grid
  const allImages = React.useMemo(() => {
    const list = [...(property.images || [])];
    if (property.heroImage && !list.includes(property.heroImage)) {
      list.push(property.heroImage);
    }
    if (list.length < 3 && property.rooms) {
      for (const r of property.rooms) {
        if (r.images) {
          for (const rImg of r.images) {
            if (!list.includes(rImg)) list.push(rImg);
          }
        }
      }
    }
    return list;
  }, [property]);

  // Price calculations
  const nightlyPrice = activeRatePlan ? activeRatePlan.pricePerNight : property.startingPrice;
  const subtotal = nightlyPrice * nightsCount;
  const taxes = Math.round(subtotal * 0.12);
  const resortFee = 50 * nightsCount;
  const grandTotal = subtotal + taxes + resortFee;

  const handleSelectRoomAndRate = (roomId: string, ratePlanId: string) => {
    setSelectedRoomId(roomId);
    setSelectedRatePlanId(ratePlanId);
    const panel = document.getElementById('booking-panel');
    panel?.scrollIntoView({ behavior: 'smooth' });
  };

  const proceedToCheckout = () => {
    if (activeRoom && activeRatePlan) {
      startBookingFlow(property.id, activeRoom.id, activeRatePlan.id);
    }
  };

  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen pb-24">
      
      {/* 1. Header Bar with Back Button and Official URL Display */}
      <div className="bg-white border-b border-stone-200 sticky top-20 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => goToSearchResults()}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-600 hover:text-[#8a1538] font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#8a1538]" />
              <span>Back to Hotels</span>
            </button>

            <span className="text-stone-300">|</span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 hidden sm:inline">{brand?.name}</span>
              <span className="font-bold text-stone-900">{property.name}</span>
            </div>
          </div>

          {/* Official Property Overview Slug Badge */}
          <div className="flex items-center gap-2 text-xs">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-600 font-mono text-[11px] border border-stone-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>/en-us/hotels/{property.slug}/overview/</span>
            </div>
            {property.officialUrl && (
              <a
                href={property.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#8a1538] hover:underline flex items-center gap-1"
              >
                <span>Live Site</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 2. Photo Gallery Showcase Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[400px] sm:h-[480px] rounded-2xl overflow-hidden shadow-xs">
          {/* Main Hero Photo (2 cols) */}
          <div
            onClick={() => setLightboxIndex(0)}
            className="md:col-span-2 relative h-full cursor-pointer group overflow-hidden bg-stone-100"
          >
            <ImageWithFallback
              src={allImages[0] || property.heroImage}
              alt={property.name}
              fallbackTitle={property.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1.5 rounded-lg text-stone-900 text-xs font-semibold flex items-center gap-2 shadow-sm border border-stone-200">
              <Maximize2 className="w-3.5 h-3.5 text-[#8a1538]" />
              <span>View Gallery ({allImages.length} Photos)</span>
            </div>
          </div>

          {/* Supporting Photos (2 cols split - 2 images side-by-side filling the remaining 2 columns) */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-3 h-full">
            {allImages.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx + 1)}
                className="relative h-full cursor-pointer group overflow-hidden bg-stone-100"
              >
                <ImageWithFallback
                  src={img}
                  alt={`${property.name} ${idx + 2}`}
                  fallbackTitle={`${property.name} View ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Content Columns: Left (Details & Rooms) + Right (Sticky Booking Module) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (8 cols): Architecture, Amenities, Rooms, Reviews, Policies */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Property Title & Overview */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#8a1538] font-bold mb-2">
                <span>{brand?.name}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{property.setting}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 mb-3">
                {property.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-600 mb-6">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8a1538]" />
                  <span>{property.address}</span>
                </span>
                <span className="flex items-center gap-1 font-mono font-bold text-stone-900">
                  <Star className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]" />
                  <span>{property.guestRating.toFixed(2)} ({property.reviewCount} verified reviews)</span>
                </span>
              </div>

              <p className="font-serif italic text-lg text-stone-800 leading-relaxed mb-6 font-medium">
                "{property.tagline}"
              </p>

              <p className="text-stone-700 text-sm sm:text-base font-light leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Signature Amenities & Services */}
            <div className="pt-8 border-t border-stone-200">
              <h2 className="font-serif text-2xl text-stone-900 font-normal mb-6">
                Property Amenities & Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-stone-800">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                    <div className="w-6 h-6 rounded-full bg-[#8a1538]/10 text-[#8a1538] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>



            {/* Guest Reviews Section */}
            <div className="pt-8 border-t border-stone-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.22em] text-[#8a1538] font-bold block mb-1">
                    Verified Guest Reviews
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">
                    Guest Experiences
                  </h2>
                </div>
                <div className="flex items-center gap-1 font-mono text-base font-bold text-stone-900">
                  <Star className="w-5 h-5 text-[#c5a059] fill-[#c5a059]" />
                  <span>{property.guestRating.toFixed(2)} / 5.0</span>
                </div>
              </div>

              <div className="space-y-6">
                {property.reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">{rev.guestName}</h4>
                        <span className="text-[11px] text-stone-400">{rev.location} · {rev.date}</span>
                      </div>
                      <div className="flex text-[#c5a059]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059]" />
                        ))}
                      </div>
                    </div>
                    <p className="font-serif italic text-sm font-semibold text-stone-800 mb-2">
                      "{rev.title}"
                    </p>
                    <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mb-3">
                      {rev.comment}
                    </p>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block">
                      Room: {rev.roomStayed}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Policies */}
            <div className="pt-8 border-t border-stone-200">
              <h2 className="font-serif text-xl text-stone-900 font-normal mb-6">
                Hotel Policies & Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-stone-700 bg-white p-6 rounded-xl border border-stone-200">
                <div>
                  <span className="font-bold text-stone-900 block mb-1">Check-in & Check-out</span>
                  <p className="text-stone-600">Check-in from {property.checkInTime} · Check-out until {property.checkOutTime}.</p>
                </div>
                <div>
                  <span className="font-bold text-stone-900 block mb-1">Cancellation Guarantee</span>
                  <p className="text-stone-600">{property.policies.cancellation}</p>
                </div>
                <div>
                  <span className="font-bold text-stone-900 block mb-1">Pet Policy</span>
                  <p className="text-stone-600">{property.policies.pets}</p>
                </div>
                <div>
                  <span className="font-bold text-stone-900 block mb-1">Age & Non-Smoking</span>
                  <p className="text-stone-600">Minimum check-in age {property.policies.checkInAge}. {property.policies.smoking}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Sticky Desktop Booking Panel */}
          <div id="booking-panel" className="lg:col-span-4 sticky top-36 z-10">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xl space-y-6">
              
              <div className="pb-4 border-b border-stone-100">
                <span className="text-[10px] uppercase tracking-wider text-[#8a1538] font-bold block">
                  Marriott Bonvoy Direct Rate
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-serif text-3xl font-bold text-stone-900">
                    ${nightlyPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-500 font-normal">/ night</span>
                </div>
                <span className="text-xs text-emerald-700 font-semibold mt-1 block">
                  Best Rate Guaranteed · No Online Booking Fees
                </span>
              </div>

              {/* Selected Dates & Guests Summary */}
              <div className="bg-[#faf9f6] p-4 rounded-xl border border-stone-200/80 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                  <span className="text-stone-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8a1538]" />
                    <span>Dates</span>
                  </span>
                  <span className="font-semibold text-stone-900">
                    {searchParams.checkIn} to {searchParams.checkOut} ({nightsCount} nights)
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                  <span className="text-stone-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#8a1538]" />
                    <span>Occupancy</span>
                  </span>
                  <span className="font-semibold text-stone-900">
                    {searchParams.rooms} Room, {searchParams.adults + searchParams.children} Guests
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Accommodation:</span>
                  <span className="font-semibold text-stone-900 text-right truncate max-w-[160px]">
                    {activeRoom?.name}
                  </span>
                </div>
              </div>

              {/* Transparent Price Breakdown */}
              <div className="space-y-2.5 text-xs text-stone-600 pt-2">
                <div className="flex justify-between">
                  <span>${nightlyPrice} × {nightsCount} nights</span>
                  <span className="font-mono text-stone-900 font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes (12%)</span>
                  <span className="font-mono text-stone-900 font-semibold">${taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Resort & Amenity Fee</span>
                  <span className="font-mono text-stone-900 font-semibold">${resortFee.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-stone-900">Total Stay Amount</span>
                  <span className="font-serif text-xl font-bold text-stone-900">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Reserve Button */}
              <button
                onClick={proceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#8a1538] hover:bg-[#6e0f2b] active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Proceed to Guest Details</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="text-center">
                <p className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Free cancellation up to 48 hours prior</span>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-stone-300 p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-5xl max-h-[85vh] relative">
            <ImageWithFallback
              src={allImages[lightboxIndex]}
              alt={property.name}
              fallbackTitle={property.name}
              className="max-h-[85vh] w-auto object-contain mx-auto rounded-xl"
            />
            <div className="text-center text-stone-300 text-xs mt-4">
              Photo {lightboxIndex + 1} of {allImages.length} · {property.name}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
