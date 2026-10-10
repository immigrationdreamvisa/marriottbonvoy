import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { useBooking } from '../context/BookingContext';
import { ImageWithFallback } from './ImageWithFallback';
import {
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface HotelCardProps {
  property: Property;
  index?: number;
}

export const HotelCard: React.FC<HotelCardProps> = ({ property, index = 0 }) => {
  const { goToPropertyDetails } = useBooking();
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  // Realistic distance text matching screenshot
  const distanceText = useMemo(() => {
    const distances = ['0.4 mi', '0.7 mi', '1.1 mi', '0.3 mi', '1.5 mi', '0.8 mi', '2.2 mi', '0.5 mi'];
    return `${distances[index % distances.length]} from destination`;
  }, [index]);

  return (
    <div
      onClick={() => goToPropertyDetails(property.id)}
      className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col md:flex-row md:h-[235px] lg:h-[240px]"
    >
      {/* 1. Left Column: Image Carousel (Matching Screenshot Dimensions) */}
      <div className="relative w-full md:w-[360px] lg:w-[390px] xl:w-[410px] shrink-0 aspect-[16/10] md:aspect-auto md:h-full bg-stone-100 overflow-hidden">
        <ImageWithFallback
          src={property.images[currentImgIdx] || property.heroImage}
          alt={property.name}
          fallbackTitle={property.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />


        {/* Carousel Arrow Buttons */}
        {property.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous Image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/30 hover:bg-black/60 text-white/90 hover:text-white flex items-center justify-center transition-all z-10 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next Image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/30 hover:bg-black/60 text-white/90 hover:text-white flex items-center justify-center transition-all z-10 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Carousel Pagination Dots (Matching Screenshot: 3 dots) */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
              {property.images.slice(0, 3).map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`rounded-full transition-all ${
                    currentImgIdx === dotIdx ? 'w-2 h-2 bg-white shadow-xs' : 'w-1.5 h-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 2. Right Column: Hotel Details Body */}
      <div className="p-5 sm:p-6 lg:p-6 flex flex-col justify-between flex-1 md:h-full">
        <div>
          {/* Hotel Name in Serif */}
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-[#e0592a] transition-colors leading-tight mb-1.5 cursor-pointer">
            {property.name}
          </h3>

          {/* Star Rating & Distance Meta Line */}
          <div className="flex items-center text-xs sm:text-[13px] text-stone-600 mb-2.5 flex-wrap gap-y-1">
            <Star className="w-3.5 h-3.5 text-stone-900 fill-stone-900 mr-1 shrink-0" />
            <span className="font-bold text-stone-900 mr-1">{property.guestRating.toFixed(1)}</span>
            <span className="text-stone-500 mr-2">({property.reviewCount} reviews)</span>
            <span className="text-stone-300 mr-2">|</span>
            <MapPin className="w-3.5 h-3.5 text-stone-400 mr-1 shrink-0" />
            <span className="text-stone-600">{distanceText}</span>
          </div>

          {/* Single-line Tagline / Description */}
          <p className="text-xs sm:text-[13px] text-stone-600 font-normal line-clamp-1 leading-relaxed mb-3">
            {property.tagline || property.description}
          </p>

          {/* View Details Link */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPropertyDetails(property.id);
            }}
            className="text-xs sm:text-sm font-semibold text-stone-900 hover:text-[#e0592a] inline-flex items-center gap-1 transition-colors cursor-pointer group/link self-start"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Row: Price & View Rates Button */}
        <div className="flex items-end justify-end gap-4 pt-3 mt-auto">
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-sans">
              {property.startingPrice}
            </span>
            <span className="text-xs text-stone-500 font-medium ml-1">
              USD / Night
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPropertyDetails(property.id);
            }}
            className="bg-[#1c1917] hover:bg-black active:scale-[0.98] text-white font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
          >
            View Rates
          </button>
        </div>

      </div>
    </div>
  );
};
