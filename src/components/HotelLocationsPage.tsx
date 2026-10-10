import React from 'react';
import { useBooking } from '../context/BookingContext';
import { BRANDS } from '../data/brands';
import { ImageWithFallback } from './ImageWithFallback';
import { BrandLogo } from './MarriottLogo';
import { Brand } from '../types';
import { ExternalLink, Compass, BookOpen, ShieldCheck, Globe2, Building2 } from 'lucide-react';

export const HotelLocationsPage: React.FC = () => {
  const { goToBrandDetail } = useBooking();

  // Handle opening brand official website
  const handleBrandWebsite = (brand: Brand) => {
    if (brand.websiteUrl && brand.websiteUrl.trim() !== '') {
      window.open(brand.websiteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen">
      
      {/* Brand Portfolio Hero Banner */}
      <section className="relative bg-[#1c1917] text-white py-16 sm:py-20 border-b border-stone-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8a1538] rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#ee5a24] rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-stone-200 text-xs font-semibold tracking-widest uppercase mb-5">
            <Compass className="w-3.5 h-3.5 text-[#ee5a24]" />
            <span>Luxury Brand Portfolio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 max-w-3xl mx-auto leading-tight">
            Our Brands
          </h1>

          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Discover our world-renowned luxury brands. Click to explore each brand or visit their official website.
          </p>
        </div>
      </section>

      {/* Brand Cards Grid - Clean visual cards without heavy text */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANDS.map((brand) => (
            <article
              key={brand.id}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-200 hover:border-stone-300"
            >
              {/* Brand Cover Image Container */}
              <div 
                className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-900 cursor-pointer"
                onClick={() => handleBrandWebsite(brand)}
                title={`Visit ${brand.name} official website`}
              >
                <ImageWithFallback
                  src={brand.coverImage}
                  alt={brand.name}
                  fallbackTitle={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/85 transition-colors" />
                
                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs z-10">
                  <span className="font-bold bg-white/95 text-stone-900 px-3 py-1 rounded-full shadow-xs text-[11px] uppercase tracking-wider">
                    {brand.category}
                  </span>
                  <span className="text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[11px] border border-white/20">
                    {brand.propertyCount} Hotels
                  </span>
                </div>

                {/* Prominent Official Brand Logo centered in image section */}
                <div className="absolute inset-0 flex items-center justify-center p-6 z-10 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-xl border border-white/80 group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center max-w-[88%]">
                    <BrandLogo brandId={brand.id} />
                  </div>
                </div>
              </div>

              {/* Minimal Card Footer Actions - No Heavy Text */}
              <div className="p-5 bg-white flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleBrandWebsite(brand)}
                  className="w-full sm:w-1/2 py-2.5 px-3 bg-[#8a1538] hover:bg-[#6e0f2b] active:scale-[0.98] text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  title={brand.websiteUrl ? `Open official ${brand.name} website` : 'Official brand destination'}
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => goToBrandDetail(brand.id)}
                  className="w-full sm:w-1/2 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs uppercase tracking-wider font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                  <span>Brand Story</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

    </div>
  );
};
