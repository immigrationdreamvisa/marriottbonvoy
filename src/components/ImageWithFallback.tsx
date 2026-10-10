import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Marriott Bonvoy Hotel & Resort',
  fallbackTitle,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 flex flex-col items-center justify-center p-6 text-center select-none text-stone-300 ${className}`}
      >
        <div className="w-10 h-10 rounded-full border border-stone-700/60 flex items-center justify-center mb-2.5 text-amber-500 bg-stone-800/80 shadow-xs">
          <Compass className="w-5 h-5" />
        </div>
        <span className="font-serif text-xs sm:text-sm tracking-wider uppercase text-stone-200 font-semibold line-clamp-1">
          {fallbackTitle || 'Marriott Bonvoy Property'}
        </span>
        <span className="text-[10px] sm:text-[11px] text-stone-400 mt-0.5 uppercase tracking-wider">Official Hotel & Resort</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-900 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-850 animate-pulse flex items-center justify-center">
          <span className="text-[10px] tracking-widest uppercase text-stone-500">Loading sanctuary...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
