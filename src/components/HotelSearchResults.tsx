import React, { useState, useMemo } from 'react';
import { useBooking } from '../context/BookingContext';
import { HotelCard } from './HotelCard';
import { DateRangeCalendar } from './DateRangeCalendar';
import { RoomsAndGuestsSelector } from './RoomsAndGuestsSelector';
import { BRANDS } from '../data/brands';
import { BrandId, Property } from '../types';
import {
  MapPin,
  Calendar,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Check,
  Building2,
  Sparkles,
  Users,
  Plus,
  Minus
} from 'lucide-react';

export const HotelSearchResults: React.FC = () => {
  const {
    searchParams,
    updateSearchParams,
    filteredProperties,
    nightsCount
  } = useBooking();

  const [destInput, setDestInput] = useState(searchParams.destination);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isRoomsOpen, setIsRoomsOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  // Filter states
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedSetting, setSelectedSetting] = useState<string>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'distance' | 'recommended' | 'price-asc' | 'price-desc' | 'rating'>('distance');

  const availableAmenities = [
    'Private Balcony & Plunge Pool Rooms',
    'Heated Indoor Alpine View Panoramic Pool',
    'Riviera Overlooking Infinity Pool',
    'Rooftop Sky Bar & Lounge',
    'Cedar Spa by L’Occitane',
    'Signature 24-Hour St. Regis Butler Service',
    'The Ritz-Carlton Club Lounge with Skyline Views',
    'Year-Round Heated Indoor/Outdoor Swimming Pool'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams({ destination: destInput });
  };

  const handleBrandToggle = (brandId: BrandId) => {
    let updated: BrandId[];
    if (searchParams.selectedBrands.includes(brandId)) {
      updated = searchParams.selectedBrands.filter(b => b !== brandId);
    } else {
      updated = [...searchParams.selectedBrands, brandId];
    }
    updateSearchParams({ selectedBrands: updated });
  };

  const resetAllFilters = () => {
    setMaxPrice(2500);
    setMinRating(0);
    setSelectedSetting('all');
    setSelectedAmenities([]);
    setDestInput('');
    updateSearchParams({ selectedBrands: [], destination: '' });
  };

  // Format date range string (e.g. Fri, Oct 9 - Sat, Oct 10)
  const formatDateRangeDisplay = () => {
    try {
      const [y1, m1, d1] = searchParams.checkIn.split('-').map(Number);
      const [y2, m2, d2] = searchParams.checkOut.split('-').map(Number);
      const inDate = new Date(y1, m1 - 1, d1);
      const outDate = new Date(y2, m2 - 1, d2);
      const inStr = inDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const outStr = outDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      return `${inStr} - ${outStr}`;
    } catch {
      return `${searchParams.checkIn} - ${searchParams.checkOut}`;
    }
  };

  // Filtered and sorted properties list
  const results = useMemo(() => {
    let list = filteredProperties.filter(property => {
      if (property.startingPrice > maxPrice) return false;
      if (minRating > 0 && property.guestRating < minRating) return false;
      if (selectedSetting !== 'all' && property.setting !== selectedSetting) return false;
      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every(a =>
          property.amenities.some(propA => propA.toLowerCase().includes(a.toLowerCase()))
        );
        if (!hasAll) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.guestRating - a.guestRating);
    }

    return list;
  }, [filteredProperties, maxPrice, minRating, selectedSetting, selectedAmenities, sortBy]);

  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* ============================================================= */}
        {/* 1. TOP HEADER TITLE (Matching Screenshot)                     */}
        {/* ============================================================= */}
        <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-normal text-stone-900 tracking-tight mb-8 sm:mb-10">
          Search Participating Properties
        </h1>

        {/* ============================================================= */}
        {/* 2. SEARCH BAR WITH UNDERLINED INPUTS (Matching Screenshot)    */}
        {/* ============================================================= */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-6 items-end">
            
            {/* 1. Destination */}
            <div className="md:col-span-4 relative">
              <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#e0592a] font-bold mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#e0592a] stroke-[2.5]" />
                <span>DESTINATION</span>
              </label>
              <div className="relative border-b-2 border-stone-800 pb-1">
                <input
                  type="text"
                  placeholder="Where can we take you?"
                  value={destInput}
                  onChange={(e) => setDestInput(e.target.value)}
                  className="w-full bg-transparent text-base sm:text-lg font-semibold text-stone-900 placeholder:text-stone-400 focus:outline-none"
                />
                {destInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setDestInput('');
                      updateSearchParams({ destination: '' });
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Dates */}
            <div className="md:col-span-3 relative">
              <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#e0592a] font-bold mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#e0592a] stroke-[2.5]" />
                <span>{nightsCount} {nightsCount === 1 ? 'NIGHT' : 'NIGHTS'}</span>
              </label>
              <div
                onClick={() => {
                  setIsCalendarOpen(!isCalendarOpen);
                  setIsRoomsOpen(false);
                }}
                className="border-b-2 border-stone-800 pb-1 cursor-pointer flex items-center justify-between"
              >
                <span className="text-sm sm:text-base lg:text-lg font-semibold text-stone-900 whitespace-nowrap">
                  {formatDateRangeDisplay()}
                </span>
                <ChevronDown className="w-4 h-4 text-stone-600 shrink-0 ml-1" />
              </div>

              {/* Calendar Dropdown */}
              {isCalendarOpen && (
                <div className="absolute left-0 top-full mt-3 z-[999] animate-in fade-in">
                  <DateRangeCalendar
                    checkIn={searchParams.checkIn}
                    checkOut={searchParams.checkOut}
                    onChange={(checkIn, checkOut) => {
                      updateSearchParams({ checkIn, checkOut });
                      setIsCalendarOpen(false);
                    }}
                    onClose={() => setIsCalendarOpen(false)}
                  />
                </div>
              )}
            </div>

            {/* 3. Rooms & Guests */}
            <div className="md:col-span-3 relative">
              <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#e0592a] font-bold mb-1.5">
                <Users className="w-3.5 h-3.5 text-[#e0592a] stroke-[2.5]" />
                <span>ROOMS & GUESTS</span>
              </label>
              <div
                onClick={() => {
                  setIsRoomsOpen(!isRoomsOpen);
                  setIsCalendarOpen(false);
                }}
                className="border-b-2 border-stone-800 pb-1 cursor-pointer flex items-center justify-between"
              >
                <span className="text-base sm:text-lg font-semibold text-stone-900 truncate">
                  {searchParams.rooms} {searchParams.rooms === 1 ? 'Room' : 'Rooms'}, {searchParams.adults + (searchParams.seniors || 0) + searchParams.children} Guests
                </span>
                <ChevronDown className="w-4 h-4 text-stone-600 shrink-0 ml-1" />
              </div>

              {/* Rooms & Guests Popover */}
              {isRoomsOpen && (
                <div 
                  className="absolute left-0 sm:right-0 top-full mt-3 z-[999] animate-in fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  <RoomsAndGuestsSelector
                    rooms={searchParams.rooms}
                    adults={searchParams.adults}
                    seniors={searchParams.seniors || 0}
                    childrenCount={searchParams.children}
                    childrenAges={searchParams.childrenAges}
                    onChange={(data) => {
                      updateSearchParams(data);
                    }}
                    onClose={() => setIsRoomsOpen(false)}
                  />
                </div>
              )}
            </div>

            {/* 4. Find Deals Button (Right Black Pill) */}
            <div className="md:col-span-2 flex justify-start md:justify-end">
              <button
                type="submit"
                className="w-full md:w-auto bg-[#1c1917] hover:bg-black active:scale-95 text-white font-bold rounded-full px-7 py-3.5 text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                <Search className="w-4 h-4 stroke-[3]" />
                <span>Find Deals</span>
              </button>
            </div>

          </div>
        </form>

        {/* ============================================================= */}
        {/* 3. FILTER CHIP BUTTONS (Matching Screenshot)                  */}
        {/* ============================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            
            {/* All Filters Button */}
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-300 bg-white hover:border-stone-900 text-xs font-semibold text-stone-800 transition-colors shadow-2xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>All Filters</span>
              {(selectedSetting !== 'all' || selectedAmenities.length > 0 || maxPrice < 2500) && (
                <span className="w-2 h-2 rounded-full bg-[#e0592a]" />
              )}
            </button>

            {/* Brands Button */}
            <button
              type="button"
              onClick={() => setIsBrandModalOpen(true)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold transition-colors shadow-2xs cursor-pointer ${
                searchParams.selectedBrands.length > 0
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-300 bg-white hover:border-stone-900 text-stone-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>
                {searchParams.selectedBrands.length > 0
                  ? `Brands (${searchParams.selectedBrands.length})`
                  : 'Brands'}
              </span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {/* Active destination pill if present */}
            {searchParams.destination && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-800 text-xs font-medium border border-stone-200">
                <span>Destination: {searchParams.destination}</span>
                <button
                  type="button"
                  onClick={() => {
                    setDestInput('');
                    updateSearchParams({ destination: '' });
                  }}
                  className="hover:text-red-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Reset All Filters Button */}
            {(searchParams.selectedBrands.length > 0 || searchParams.destination || selectedSetting !== 'all' || selectedAmenities.length > 0) && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-xs font-bold text-[#e0592a] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}

          </div>
        </div>

        {/* ============================================================= */}
        {/* 4. RESULTS COUNTER & SORT ROW (Matching Screenshot)           */}
        {/* ============================================================= */}
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-200">
          <span className="font-sans text-sm sm:text-base font-semibold text-stone-900">
            1 - {results.length} of {results.length} Results
          </span>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-800">
            <span>Sort by:</span>
            <div className="relative inline-flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-stone-900 font-bold focus:outline-none cursor-pointer pr-5 appearance-none"
              >
                <option value="distance">Distance</option>
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Guest Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-800 absolute right-0 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* 5. HOTEL CARDS VERTICAL LIST (Matching Screenshot)            */}
        {/* ============================================================= */}
        {results.length > 0 ? (
          <div className="space-y-6">
            {results.map((property, idx) => (
              <HotelCard key={property.id} property={property} index={idx} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
            <Building2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">
              No participating hotels found
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mb-6">
              Try adjusting your destination search or removing active filters to view all available verified properties.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-6 py-2.5 bg-[#1c1917] text-white font-bold text-xs rounded-full hover:bg-black"
            >
              View All Hotels
            </button>
          </div>
        )}

      </div>

      {/* ============================================================= */}
      {/* BRAND SELECTION MODAL                                         */}
      {/* ============================================================= */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">Select Hotel Brands</h3>
              <button onClick={() => setIsBrandModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-80 overflow-y-auto mb-6 pr-1">
              {BRANDS.map((brand) => {
                const isSelected = searchParams.selectedBrands.includes(brand.id);
                return (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => handleBrandToggle(brand.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'border-[#e0592a] bg-orange-50/40 text-stone-900'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span className="text-xs font-semibold truncate">{brand.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#e0592a] shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={() => updateSearchParams({ selectedBrands: [] })}
                className="text-xs font-bold text-stone-500 hover:text-stone-900"
              >
                Clear Brands
              </button>
              <button
                type="button"
                onClick={() => setIsBrandModalOpen(false)}
                className="px-6 py-2.5 bg-[#1c1917] text-white font-bold text-xs rounded-full hover:bg-black"
              >
                Apply ({searchParams.selectedBrands.length} Selected)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* ALL FILTERS MODAL                                             */}
      {/* ============================================================= */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <h3 className="font-serif text-xl font-bold text-stone-900">All Filters</h3>
              <button onClick={() => setIsFilterModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-xs text-stone-800">
              {/* Max Price Slider */}
              <div>
                <div className="flex items-center justify-between font-bold text-stone-900 mb-2">
                  <span>Maximum Nightly Rate</span>
                  <span className="font-mono text-sm">${maxPrice} / night</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#e0592a]"
                />
              </div>

              {/* Setting / Environment */}
              <div>
                <span className="font-bold text-stone-900 block mb-2">Resort Setting</span>
                <div className="grid grid-cols-3 gap-2">
                  {['all', 'urban', 'coastal', 'mountain', 'nature'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedSetting(st)}
                      className={`p-2 rounded-lg border text-center capitalize font-semibold transition-colors ${
                        selectedSetting === st
                          ? 'border-[#e0592a] bg-orange-50/40 text-[#e0592a]'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <span className="font-bold text-stone-900 block mb-2">Signature Amenities</span>
                <div className="space-y-2">
                  {availableAmenities.map((amenity, idx) => (
                    <label key={idx} className="flex items-center gap-2.5 cursor-pointer text-stone-700 hover:text-stone-900">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => {
                          if (selectedAmenities.includes(amenity)) {
                            setSelectedAmenities(prev => prev.filter(a => a !== amenity));
                          } else {
                            setSelectedAmenities(prev => [...prev, amenity]);
                          }
                        }}
                        className="rounded text-[#e0592a] focus:ring-[#e0592a]"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-stone-100 mt-6">
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-xs font-bold text-stone-500 hover:text-stone-900"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="px-7 py-2.5 bg-[#1c1917] text-white font-bold text-xs rounded-full hover:bg-black"
              >
                View {results.length} Hotels
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
