import React from 'react';

interface MarriottLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'burgundy' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSignature?: boolean;
}

export const MarriottLogo: React.FC<MarriottLogoProps> = ({
  className = '',
  variant = 'white',
  size = 'md',
  showSignature = true
}) => {
  const isLight = variant === 'light' || variant === 'white';
  
  // Pick matching official asset based on variant
  const logoSrc = isLight
    ? '/marriott-bonvoy-white.png'
    : variant === 'burgundy'
    ? '/marriott-bonvoy-burgundy.png'
    : '/marriott-bonvoy-dark.png';

  // Responsive height and width constraints with increased text prominence
  const sizeClasses = {
    sm: 'h-9 sm:h-10 w-auto max-w-[150px]',
    md: 'h-13 sm:h-14 md:h-[58px] lg:h-[62px] w-auto max-w-[210px] md:max-w-[235px]',
    lg: 'h-16 sm:h-18 md:h-20 w-auto max-w-[280px]',
    xl: 'h-20 sm:h-24 w-auto max-w-[340px]'
  }[size];

  return (
    <div className={`inline-flex items-center justify-center select-none shrink-0 ${className}`}>
      <img
        src={logoSrc}
        alt="Marriott Bonvoy"
        className={`object-contain block pointer-events-none transition-all ${sizeClasses}`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

// Official Brand Logos for Featured Brands & Catalogue
export const BrandLogo: React.FC<{ brandId: string; className?: string; light?: boolean }> = ({
  brandId,
  className = '',
  light = false
}) => {
  const color = light ? '#ffffff' : '#1c1917';
  const subColor = light ? '#d1d5db' : '#6b7280';

  if (brandId === 'the-ritz-carlton') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <img
          src="/brands/the-ritz-carlton-logo.png"
          alt="The Ritz-Carlton"
          className={`h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-[230px] object-contain transition-all ${
            light ? 'brightness-0 invert' : ''
          }`}
          loading="lazy"
        />
      </div>
    );
  }

  if (brandId === 'jw-marriott') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <img
          src="/brands/jw-marriott-logo.png"
          alt="JW Marriott"
          className={`h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-[230px] object-contain transition-all ${
            light ? 'brightness-0 invert' : ''
          }`}
          loading="lazy"
        />
      </div>
    );
  }

  if (brandId === 'st-regis') {
    return (
      <div className={`flex flex-col items-center justify-center text-center py-0.5 ${className}`}>
        <div className="font-serif text-base tracking-widest font-black text-[#8a1538] leading-none mb-1 select-none">
          ✦
        </div>
        <span className="font-serif tracking-[0.3em] font-semibold uppercase text-xs sm:text-sm" style={{ color }}>
          ST. REGIS
        </span>
        <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-medium mt-0.5" style={{ color: subColor }}>
          HOTELS & RESORTS
        </span>
      </div>
    );
  }

  if (brandId === 'luxury-collection') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-serif tracking-[0.22em] font-semibold uppercase text-xs" style={{ color }}>
          THE LUXURY COLLECTION
        </span>
      </div>
    );
  }

  if (brandId === 'w-hotels') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-sans font-black tracking-widest text-base leading-none" style={{ color }}>
          W
        </span>
        <span className="text-[8px] tracking-[0.3em] uppercase mt-0.5" style={{ color: subColor }}>
          HOTELS
        </span>
      </div>
    );
  }

  if (brandId === 'edition') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-serif italic tracking-[0.2em] font-bold text-sm uppercase" style={{ color }}>
          EDITION
        </span>
      </div>
    );
  }

  if (brandId === 'ritz-carlton-reserve') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-serif tracking-[0.25em] font-medium uppercase text-xs" style={{ color }}>
          RITZ-CARLTON RESERVE
        </span>
      </div>
    );
  }

  if (brandId === 'bvlgari') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-serif tracking-[0.35em] font-bold text-xs uppercase" style={{ color }}>
          BVLGARI
        </span>
        <span className="text-[8px] tracking-[0.2em] uppercase mt-0.5" style={{ color: subColor }}>
          HOTELS & RESORTS
        </span>
      </div>
    );
  }

  if (brandId === 'marriott-hotels') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-sans font-black tracking-[0.24em] text-xs uppercase" style={{ color }}>
          MARRIOTT
        </span>
        <span className="text-[8px] tracking-[0.2em] uppercase font-semibold text-[#8a1538]">
          HOTELS & RESORTS
        </span>
      </div>
    );
  }

  if (brandId === 'sheraton') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-serif tracking-[0.28em] font-extrabold text-xs uppercase" style={{ color }}>
          SHERATON
        </span>
      </div>
    );
  }

  if (brandId === 'westin') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-sans font-light tracking-[0.32em] text-xs uppercase" style={{ color }}>
          WESTIN
        </span>
        <span className="text-[7.5px] tracking-[0.2em] uppercase text-stone-500">
          HOTELS & RESORTS
        </span>
      </div>
    );
  }

  if (brandId === 'autograph-collection') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-serif tracking-[0.22em] font-bold text-xs uppercase" style={{ color }}>
          AUTOGRAPH COLLECTION
        </span>
        <span className="text-[7.5px] tracking-[0.18em] uppercase text-stone-500">
          HOTELS
        </span>
      </div>
    );
  }

  if (brandId === 'le-meridien') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-sans font-medium tracking-[0.22em] text-xs uppercase" style={{ color }}>
          LE MÉRIDIEN
        </span>
      </div>
    );
  }

  if (brandId === 'renaissance') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-serif tracking-[0.28em] font-bold text-xs uppercase" style={{ color }}>
          RENAISSANCE
        </span>
        <span className="text-[7.5px] tracking-[0.2em] uppercase text-stone-500">
          HOTELS
        </span>
      </div>
    );
  }

  if (brandId === 'courtyard') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-sans font-extrabold tracking-[0.2em] text-xs uppercase" style={{ color }}>
          COURTYARD
        </span>
        <span className="text-[7.5px] tracking-[0.18em] uppercase text-stone-500">
          BY MARRIOTT
        </span>
      </div>
    );
  }

  if (brandId === 'fairfield') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-serif tracking-[0.22em] font-bold text-xs uppercase" style={{ color }}>
          FAIRFIELD
        </span>
        <span className="text-[7.5px] tracking-[0.18em] uppercase text-stone-500">
          BY MARRIOTT
        </span>
      </div>
    );
  }

  if (brandId === 'ac-hotels') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-sans font-bold tracking-[0.3em] text-xs uppercase" style={{ color }}>
          AC HOTELS
        </span>
        <span className="text-[7.5px] tracking-[0.18em] uppercase text-stone-500">
          MARRIOTT
        </span>
      </div>
    );
  }

  if (brandId === 'aloft') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-sans font-black tracking-[0.25em] text-xs uppercase text-[#7c3aed]">
          aloft
        </span>
        <span className="text-[7.5px] tracking-[0.2em] uppercase text-stone-500">
          HOTELS
        </span>
      </div>
    );
  }

  if (brandId === 'moxy') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-sans font-black tracking-[0.25em] text-xs uppercase text-[#db2777]">
          MOXY
        </span>
        <span className="text-[7.5px] tracking-[0.2em] uppercase text-stone-500">
          HOTELS
        </span>
      </div>
    );
  }

  if (brandId === 'residence-inn') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-sans font-bold tracking-[0.2em] text-xs uppercase" style={{ color }}>
          Residence Inn
        </span>
        <span className="text-[7.5px] tracking-[0.18em] uppercase text-stone-500">
          BY MARRIOTT
        </span>
      </div>
    );
  }

  if (brandId === 'element') {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <span className="font-sans font-medium tracking-[0.25em] text-xs lowercase text-[#16a34a]">
          element
        </span>
        <span className="text-[7.5px] tracking-[0.2em] uppercase text-stone-500">
          BY WESTIN
        </span>
      </div>
    );
  }

  return (
    <span className="font-serif font-bold tracking-wider text-xs uppercase" style={{ color }}>
      {brandId.replace(/-/g, ' ').toUpperCase()}
    </span>
  );
};
