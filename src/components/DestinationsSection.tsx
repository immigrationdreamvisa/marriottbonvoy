import React from 'react';
import { useBooking } from '../context/BookingContext';
import { ImageWithFallback } from './ImageWithFallback';
import { MapPin, Compass, ArrowRight } from 'lucide-react';

interface DestinationItem {
  name: string;
  country: string;
  description: string;
  image: string;
  propertyCount: number;
  query: string;
}

const FEATURED_DESTINATIONS: DestinationItem[] = [
  {
    name: 'Kyoto',
    country: 'Japan',
    description: 'Tranquil Meiji-era gardens, Kamogawa river views, and ancient temple culture.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 1,
    query: 'Kyoto'
  },
  {
    name: 'Amalfi Coast',
    country: 'Italy',
    description: 'Positano limestone cliffs, azure Tyrrhenian waters, and coastal luxury.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 1,
    query: 'Positano'
  },
  {
    name: 'Venice',
    country: 'Italy',
    description: 'A private island oasis on the Venetian Lagoon with olive groves and rooftop infinity views.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 1,
    query: 'Venice'
  },
  {
    name: 'Marco Island',
    country: 'Florida, USA',
    description: 'Three miles of powdery white Gulf Coast sands, championship golf, and balmy relaxation.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 1,
    query: 'Marco Island'
  },
  {
    name: 'Bora Bora',
    country: 'French Polynesia',
    description: 'Iconic overwater villas, crystal turquoise lagoons, and views of Mount Otemanu.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 1,
    query: 'Bora Bora'
  },
  {
    name: 'Paris',
    country: 'France',
    description: 'Contemporary haute luxury and vibrant culinary culture moments from Place Vendôme.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 1,
    query: 'Paris'
  }
];

export const DestinationsSection: React.FC = () => {
  const { goToSearchResults, goToDestinations } = useBooking();

  return (
    <section className="py-20 lg:py-24 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div 
            onClick={() => goToSearchResults({ destination: '' })}
            className="max-w-2xl cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#8a1538] font-bold mb-2.5">
              <Compass className="w-3.5 h-3.5" />
              <span>World Destinations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-stone-900 leading-[1.2] group-hover:text-[#8a1538] transition-colors">
              Explore Iconic Locations
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 self-start md:self-auto">
            <button
              onClick={() => goToSearchResults({ destination: '' })}
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#8a1538] hover:underline transition-colors cursor-pointer"
            >
              <span>Destinations Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={() => goToSearchResults({ destination: '', selectedBrands: [] })}
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-stone-700 hover:text-[#8a1538] transition-colors cursor-pointer"
            >
              <span>All Hotels</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid of Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_DESTINATIONS.map((dest, idx) => (
            <div
              key={idx}
              onClick={() => goToSearchResults({ destination: dest.query })}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-6 sm:p-8"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-stone-100">
                <ImageWithFallback
                  src={dest.image}
                  alt={dest.name}
                  fallbackTitle={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              </div>

              {/* Destination Metadata */}
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-200 font-semibold mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{dest.country}</span>
                  <span aria-hidden="true">·</span>
                  <span>{dest.propertyCount} Property</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-stone-100 transition-colors">
                  {dest.name}
                </h3>

                <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 mb-4">
                  {dest.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                  <span>Explore Hotels in {dest.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-[#c5a059]" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
