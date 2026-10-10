import React from 'react';
import { BookingWidget } from './BookingWidget';

export const Hero: React.FC = () => {
  return (
    <div className="relative z-30 min-h-[460px] lg:min-h-[500px] flex items-center justify-center bg-stone-100 text-stone-900 border-b border-stone-200">
      {/* Luxury Hotel Resort Image Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Hotel & Resort"
          className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
        />
        {/* Soft luxury cinematic gradient overlay for optimal text contrast and crisp booking widget focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 w-full flex flex-col items-center text-center">




        {/* Primary Headline */}
        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white max-w-3xl leading-[1.15] text-balance mb-6 sm:mb-8 md:mb-10 drop-shadow-md">
          Your Next Trip Starts Here
        </h1>


        {/* The Central Hotel Booking Engine */}
        <div className="w-full max-w-5xl relative z-40">
          <BookingWidget />
        </div>

        {/* Clean Typographic Proof Metadata */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] text-stone-200 font-medium tracking-wide drop-shadow-sm">
          <span>Best Rate Guarantee</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>Earn & Redeem Marriott Bonvoy Points</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>Complimentary Wi-Fi for Members</span>
          <span aria-hidden="true" className="text-stone-400">·</span>
          <span>Flexible Cancellation Policies</span>
        </div>

      </div>
    </div>
  );
};
