import React from 'react';
import { useBooking } from '../context/BookingContext';
import { BRANDS } from '../data/brands';
import { PROPERTIES } from '../data/properties';
import { ImageWithFallback } from './ImageWithFallback';
import { BrandLogo } from './MarriottLogo';
import { ArrowLeft, MapPin, Star, Check, ArrowRight } from 'lucide-react';

export const BrandDetailPage: React.FC = () => {
  const { selectedBrandId, goToHotelLocations, goToPropertyDetails, goToSearchResults } = useBooking();

  const brand = BRANDS.find(b => b.id === selectedBrandId) || BRANDS[0];
  const brandProperties = PROPERTIES.filter(p => p.brandId === brand.id);

  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen pb-20">
      
      {/* Brand Hero Header with Light Contrast */}
      <div className="relative h-[420px] lg:h-[480px] bg-stone-900 text-white flex items-end">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={brand.coverImage}
            alt={brand.name}
            fallbackTitle={brand.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-stone-950/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <button
            onClick={goToHotelLocations}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-200 hover:text-white mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span>Back to All Brands</span>
          </button>

          <div className="bg-white px-5 py-3 rounded-xl inline-block mb-4 shadow-md">
            <BrandLogo brandId={brand.id} />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white max-w-3xl mb-3 drop-shadow-sm">
            {brand.name}
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-stone-200 max-w-2xl font-light drop-shadow-xs">
            "{brand.tagline}"
          </p>
        </div>
      </div>

      {/* Brand Story & Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-stone-200">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.22em] text-[#8a1538] font-bold block mb-3">
              The Brand Heritage & Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal mb-6">
              Our Vision of Hospitality
            </h2>
            <p className="text-stone-700 text-base leading-relaxed mb-6 font-normal">
              {brand.description}
            </p>
            <p className="text-stone-600 text-sm leading-relaxed font-light">
              {brand.philosophy}
            </p>
          </div>

          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="font-serif text-lg text-stone-900 font-bold mb-4 pb-2 border-b border-stone-100">
              Signature Privileges of {brand.name}
            </h3>
            <ul className="space-y-3.5 text-xs text-stone-700">
              {brand.signaturePerks.map((perk, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#8a1538]/10 text-[#8a1538] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-medium">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Portfolio Scale</span>
                <span className="font-serif text-base font-bold text-stone-900">{brand.propertyCount} Destinations</span>
              </div>
              <button
                onClick={() => goToSearchResults({ selectedBrands: [brand.id] })}
                className="px-4 py-2.5 bg-[#8a1538] hover:bg-[#6e0f2b] text-white text-xs uppercase tracking-wider font-bold rounded-lg transition-colors shadow-xs"
              >
                Search Dates for Brand
              </button>
            </div>
          </div>
        </div>

        {/* Properties Belonging to this Brand */}
        <div className="pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#8a1538] font-bold block mb-2">
                Hotels & Resorts
              </span>
              <h2 className="font-serif text-3xl font-normal text-stone-900">
                The {brand.name} Collection
              </h2>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm">
              Discover each distinctive hotel and reserve directly with Marriott Bonvoy Member rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandProperties.map(property => (
              <div
                key={property.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <ImageWithFallback
                    src={property.heroImage}
                    alt={property.name}
                    fallbackTitle={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold text-stone-900 flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 text-[#c5a059] fill-[#c5a059]" />
                    <span>{property.guestRating.toFixed(2)}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8a1538]" />
                      {property.city}, {property.country}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-xl text-stone-900 font-bold mb-2 group-hover:text-[#8a1538] transition-colors">
                      {property.name}
                    </h3>
                    <p className="text-stone-600 text-xs leading-relaxed line-clamp-3 mb-4 font-normal">
                      {property.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">From</span>
                      <span className="text-base font-bold text-stone-900">
                        ${property.startingPrice.toLocaleString()}
                        <span className="text-xs font-normal text-stone-500"> / night</span>
                      </span>
                    </div>

                    <button
                      onClick={() => goToPropertyDetails(property.id)}
                      className="px-4 py-2 bg-stone-900 hover:bg-[#8a1538] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
