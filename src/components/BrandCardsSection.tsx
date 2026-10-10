import React from 'react';
import { BRANDS } from '../data/brands';
import { useBooking } from '../context/BookingContext';
import { ImageWithFallback } from './ImageWithFallback';
import { BrandLogo } from './MarriottLogo';
import { Brand } from '../types';
import { ExternalLink, Compass, BookOpen } from 'lucide-react';

export const BrandCardsSection: React.FC = () => {
  const { goToBrandDetail } = useBooking();

  // Handle brand website navigation
  const handleBrandNavigation = (brand: Brand) => {
    try {
      const stored = localStorage.getItem('bonvoy_recently_viewed');
      const list = stored ? JSON.parse(stored) : [];
      const filtered = list.filter((item: any) => item.id !== brand.id);
      const updated = [{ id: brand.id, name: brand.name, brandId: brand.id }, ...filtered].slice(0, 5);
      localStorage.setItem('bonvoy_recently_viewed', JSON.stringify(updated));
    } catch {}
    if (brand.websiteUrl && brand.websiteUrl.trim() !== '') {
      window.open(brand.websiteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGoToBrand = (brand: Brand) => {
    try {
      const stored = localStorage.getItem('bonvoy_recently_viewed');
      const list = stored ? JSON.parse(stored) : [];
      const filtered = list.filter((item: any) => item.id !== brand.id);
      const updated = [{ id: brand.id, name: brand.name, brandId: brand.id }, ...filtered].slice(0, 5);
      localStorage.setItem('bonvoy_recently_viewed', JSON.stringify(updated));
    } catch {}
    goToBrandDetail(brand.id);
  };

  return (
    <section id="brands-section" className="py-16 sm:py-20 bg-[#faf9f6] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#8a1538] font-bold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Our Brands</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-stone-900">
              The Marriott Bonvoy Brand Portfolio
            </h2>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm font-light max-w-md">
            Explore our world-renowned luxury brands and visit their official websites.
          </p>
        </div>

        {/* 3 Clean Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 border border-stone-200 hover:border-stone-300"
            >
              {/* Brand Cover Image */}
              <div 
                className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-900 cursor-pointer"
                onClick={() => handleBrandNavigation(brand)}
                title={`Visit ${brand.name} official website`}
              >
                <ImageWithFallback
                  src={brand.coverImage}
                  alt={brand.name}
                  fallbackTitle={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Visual Gradient */}
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

                {/* Prominent Brand Logo Showcase centered on the image section */}
                <div className="absolute inset-0 flex items-center justify-center p-6 z-10 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-xl border border-white/80 group-hover:scale-105 group-hover:shadow-2xl transition-all duration-300 flex items-center justify-center max-w-[88%]">
                    <BrandLogo brandId={brand.id} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 bg-white flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleBrandNavigation(brand)}
                  className="w-full sm:w-1/2 py-2.5 px-3 bg-[#8a1538] hover:bg-[#6e0f2b] active:scale-[0.98] text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  title={brand.websiteUrl ? `Open official ${brand.name} website` : 'Official brand destination'}
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleGoToBrand(brand)}
                  className="w-full sm:w-1/2 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs uppercase tracking-wider font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                  <span>Brand Story</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
