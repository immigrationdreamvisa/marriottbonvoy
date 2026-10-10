import React, { useState, useMemo } from 'react';
import { useBooking } from '../context/BookingContext';
import { VERIFIED_DESTINATIONS, VerifiedDestination } from '../data/destinations';
import { ImageWithFallback } from './ImageWithFallback';
import {
  MapPin,
  Search,
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
  Building,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const DestinationsPage: React.FC = () => {
  const { goToSearchResults, goToPropertyDetails } = useBooking();
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions = ['All', 'Americas', 'Europe', 'Asia Pacific'];

  const filteredDestinations = useMemo(() => {
    return VERIFIED_DESTINATIONS.filter(dest => {
      const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
      const matchesQuery =
        searchQuery.trim() === '' ||
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.topAttractions.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesRegion && matchesQuery;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      {/* Editorial Header */}
      <div className="bg-stone-900 text-white relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
            alt="World Destinations"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-radial from-transparent to-stone-900/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-amber-400 mb-3 block">
            Verified Global Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-4">
            Explore Extraordinary Destinations
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-8">
            Immerse yourself in legendary addresses across 139 countries and territories. Every property is an authentic landmark offering verified local luxury and Marriott Bonvoy loyalty rewards.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto bg-white rounded-2xl p-2 shadow-2xl flex items-center gap-2 text-stone-900">
            <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search by city, country, or attraction (e.g. Kyoto, Paris, Venice)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2 py-3 text-xs sm:text-sm bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-stone-400 hover:text-stone-700 text-xs px-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Region Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedRegion === region
                    ? 'bg-[#8a1538] text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-500 font-medium">
            Showing <span className="font-bold text-stone-900">{filteredDestinations.length}</span> verified destinations
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(dest => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <ImageWithFallback
                  src={dest.image}
                  alt={dest.name}
                  fallbackTitle={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {dest.region}
                  </span>
                  <span className="bg-[#8a1538] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {dest.hotelCount} Properties
                  </span>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-serif text-2xl font-bold">{dest.name}</h3>
                  <p className="text-xs text-stone-200 font-light truncate">{dest.tagline}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {dest.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1.5">
                      Highlights
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.highlightBadges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-50 border border-stone-200 text-stone-700 text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Best Time & Top Attractions */}
                  <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3 mb-4">
                    <div className="flex items-start gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8a1538] shrink-0 mt-0.5" />
                      <span><strong>Best Season:</strong> {dest.bestTimeToVisit}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8a1538] shrink-0 mt-0.5" />
                      <span className="truncate"><strong>Attractions:</strong> {dest.topAttractions.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>

                  {/* Featured Property Link */}
                  {dest.featuredPropertyId && (
                    <div className="bg-[#8a1538]/5 border border-[#8a1538]/20 rounded-xl p-3 mb-4">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#8a1538] block mb-0.5">
                        Featured Luxury Landmark
                      </span>
                      <button
                        onClick={() => goToPropertyDetails(dest.featuredPropertyId!)}
                        className="text-xs font-serif font-bold text-stone-900 hover:text-[#8a1538] text-left flex items-center justify-between w-full group/btn"
                      >
                        <span className="truncate">{dest.featuredPropertyName}</span>
                        <ChevronRight className="w-4 h-4 text-[#8a1538] group-hover/btn:translate-x-1 transition-transform shrink-0" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={() => goToSearchResults({ destination: dest.city })}
                  className="w-full py-2.5 bg-stone-900 hover:bg-[#8a1538] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 group-hover:bg-[#8a1538]"
                >
                  <span>Explore Hotels in {dest.city}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
