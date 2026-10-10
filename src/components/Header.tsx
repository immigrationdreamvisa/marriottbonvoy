import React, { useState, useRef, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { MarriottLogo } from './MarriottLogo';
import { HelpModal } from './HelpModal';
import { LanguageModal } from './LanguageModal';
import { BRANDS } from '../data/brands';
import {
  Menu,
  X,
  User as UserIcon,
  Calendar,
  ChevronDown,
  ShieldCheck,
  Compass,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Globe,
  Briefcase,
  LogOut
} from 'lucide-react';
import { BrandId } from '../types';

export const Header: React.FC = () => {
  const {
    currentView,
    goToHome,
    goToSearchResults,
    goToBrandDetail,
    goToMyBookings,
    goToDestinations,
    goToVacations,
    goToCareers,
    goToMeetings,
    goToMembership,
    goToOffers,
    goToGiftCards,
    goToShopBrand,
    goToHotelLocations,
    goToGolf,
    goToResidences,
    goToDineDrink,
    goToOutdoors,
    goToInsurance,
    goToBusinessProgram,
    goToCreditCards,
    goToTravelTips,
    setIsAuthModalOpen,
    setAuthModalTab,
    setIsTripsModalOpen
  } = useBooking();

  const { user, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);
  const [bookMenuOpen, setBookMenuOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);

  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const bookButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        bookMenuOpen &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(target) &&
        bookButtonRef.current &&
        !bookButtonRef.current.contains(target)
      ) {
        setBookMenuOpen(false);
      }
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(target)) {
        setBrandsDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [bookMenuOpen]);

  // Safety check: ensure no legacy Elena user is retained
  useEffect(() => {
    if (user?.firstName?.toLowerCase().includes('elena') || user?.email?.toLowerCase().includes('elena')) {
      signOut();
    }
  }, [user, signOut]);

  const handleBrandSelect = (brandId: BrandId) => {
    setBrandsDropdownOpen(false);
    goToBrandDetail(brandId);
  };

  return (
    <>
      <header role="banner" className="sticky top-0 z-40 bg-white border-b border-stone-200/90 text-stone-900 transition-all shadow-xs">
        <div className="banner-row row align-items-center mx-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-6 relative">
          
          {/* Left: Official Logo (Positioned so the 'M' signature touches down right on the navbar bottom line) */}
          <div className="navigation-logo-container flex items-end self-stretch pb-0 shrink-0">
            <button
              onClick={() => {
                setBookMenuOpen(false);
                goToHome();
              }}
              className="flex items-end group focus:outline-none whitespace-nowrap hover:opacity-90 transition-opacity shrink-0 cursor-pointer translate-y-[2px]"
              aria-label="Marriott Bonvoy"
            >
              <MarriottLogo size="md" variant="dark" showSignature={true} />
            </button>
          </div>

          {/* Center-Left: Primary Navigation Links (Book, Brands, Marriott Bonvoy) */}
          <div className="primary-navigation-wrapper hidden lg:flex items-center flex-1 ml-8 sm:ml-10 xl:ml-14">
            <div data-component-name="m-common-static-Navigation" data-testid="common-static-Navigation">
              <div className="main-nav__content" data-testid="primarynavigation">
                <nav className="main-nav__nav">
                  <ul className="main-nav__nav-items main-nav flex items-center gap-7 xl:gap-9 text-[14px] xl:text-[15px] font-medium text-stone-900 tracking-normal" role="menu" aria-label="menubutton">
                    
                    {/* 1. Book (with Mega Menu) */}
                    <li className="main-nav__nav-item" role="presentation">
                      <button
                        ref={bookButtonRef}
                        role="menuitem"
                        aria-label="Book"
                        onClick={() => {
                          setBrandsDropdownOpen(false);
                          setBookMenuOpen(!bookMenuOpen);
                        }}
                        className={`m-nav-link relative py-2.5 transition-colors whitespace-nowrap hover:text-stone-600 cursor-pointer ${
                          bookMenuOpen || currentView === 'home' || currentView === 'search-results'
                            ? 'text-stone-950 font-bold'
                            : 'text-stone-800'
                        }`}
                      >
                        <span>Book</span>
                        {(bookMenuOpen || currentView === 'home') && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-stone-950" />
                        )}
                      </button>
                    </li>

                    {/* 2. Brands */}
                    <li className="main-nav__nav-item" role="presentation">
                      <button
                        role="menuitem"
                        aria-label="Brands"
                        onClick={() => {
                          setBookMenuOpen(false);
                          goToHotelLocations();
                        }}
                        className={`m-nav-link relative py-2.5 transition-colors whitespace-nowrap hover:text-stone-600 cursor-pointer ${
                          currentView === 'hotel-locations' || currentView === 'brand-detail' ? 'text-stone-950 font-bold' : 'text-stone-800'
                        }`}
                      >
                        <span>Brands</span>
                        {(currentView === 'hotel-locations' || currentView === 'brand-detail') && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-stone-950" />
                        )}
                      </button>
                    </li>

                    {/* 3. Marriott Bonvoy */}
                    <li className="main-nav__nav-item" role="presentation">
                      <button
                        role="menuitem"
                        aria-label="Marriott Bonvoy"
                        onClick={() => {
                          setBookMenuOpen(false);
                          goToMembership();
                        }}
                        className={`m-nav-link relative py-2.5 transition-colors whitespace-nowrap hover:text-stone-600 cursor-pointer ${
                          currentView === 'membership' ? 'text-stone-950 font-bold' : 'text-stone-800'
                        }`}
                      >
                        <span>Marriott Bonvoy</span>
                        {currentView === 'membership' && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-stone-950" />
                        )}
                      </button>
                    </li>

                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* Right: Utility Navigation (Help | English | Trips | Sign In or Join) */}
          <div className="utility-links-wrapper flex items-center gap-2 sm:gap-3 xl:gap-5 shrink-0">
            <ul className="flex items-center gap-2 sm:gap-3 xl:gap-5 pr-0">

              {/* Help */}
              <li className="utility-item utility-link utility-link-selector hidden lg:block">
                <button
                  onClick={() => setHelpModalOpen(true)}
                  aria-label="Help"
                  data-component-name="a-ui-library-Link"
                  data-testid="ui-library-Link"
                  className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors py-1 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-stone-700" />
                  <span className="utility-link-text d-none d-xl-inline-block">Help</span>
                </button>
              </li>

              {/* English (with Language Selector Modal) */}
              <li className="utility-item utility-language-selector hidden lg:block">
                <button
                  onClick={() => setLanguageModalOpen(true)}
                  aria-label="English"
                  data-component-name="a-ui-library-Button"
                  className="utility-language-selector-button flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors py-1 cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-stone-700" />
                  <span className="utility-link-text d-none d-xl-inline-block">English</span>
                </button>
              </li>

              {/* Trips */}
              <li className="utility-item utility-trips hidden lg:block">
                <button
                  id="utility-mytrips-trigger"
                  aria-label="Trips"
                  onClick={() => {
                    setBookMenuOpen(false);
                    setIsTripsModalOpen(true);
                  }}
                  className="utility-mytrips-button flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors py-1 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4 text-stone-700" />
                  <span className="utility-link-text d-none d-xl-inline-block">Trips</span>
                </button>
              </li>

              {/* Sign In or Join */}
              <li className="utility-item utility-sigin">
                {isAuthenticated && user ? (
                  <div ref={userDropdownRef} className="relative shrink-0">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-stone-800 border border-stone-800 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors shadow-xs whitespace-nowrap cursor-pointer hover:bg-stone-100"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#8a1538] text-white flex items-center justify-center text-[10px] font-bold">
                        {user.firstName[0]}
                      </div>
                      <span className="inline-block max-w-[80px] sm:max-w-[100px] truncate">{user.firstName}</span>
                      <ChevronDown className="w-3 h-3 text-stone-600" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2.5 w-72 bg-white border border-stone-200 rounded-2xl shadow-2xl py-3 z-50 text-stone-900 text-xs animate-in fade-in duration-150 divide-y divide-stone-100">
                        <div className="px-4 py-3 bg-[#faf9f6] rounded-t-xl">
                          <p className="font-bold text-stone-900 text-sm">{user.firstName} {user.lastName}</p>
                          <p className="text-[11px] text-stone-500 truncate mt-0.5">{user.email}</p>
                          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-[10.5px] font-bold text-[#8a1538]">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{user.tier} · {user.points.toLocaleString()} pts</span>
                          </div>
                        </div>

                        <div className="py-1">
                          <button
                            onClick={() => {
                              goToMyBookings();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-stone-50 text-stone-800 font-medium flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <Calendar className="w-4 h-4 text-[#8a1538]" />
                            <span>My Trips & Reservations</span>
                          </button>
                        </div>

                        <div className="pt-1">
                          <button
                            onClick={() => {
                              signOut();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <LogOut className="w-4 h-4 text-red-600" />
                            <span>Sign Out of Account</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    aria-label="Sign In or Join"
                    data-component-name="m-common-static-SignInDrawer"
                    data-testid="common-static-SignInDrawer"
                    onClick={() => {
                      setBookMenuOpen(false);
                      setAuthModalTab('signin');
                      setIsAuthModalOpen(true);
                    }}
                    className="shrink-0 flex items-center gap-1.5 sm:gap-2 border border-stone-800 hover:bg-stone-900 hover:text-white rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-stone-900 transition-all shadow-xs whitespace-nowrap cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span className="utility-link-text d-none d-xl-inline-block d-lg-inline-block">Sign In or Join</span>
                  </button>
                )}
              </li>

              {/* Mobile Menu Hamburger Button */}
              <li className="d-lg-none lg:hidden">
                <button
                  id="menuButton"
                  type="button"
                  data-component-name="a-ui-library-Button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="main-nav__btn main-nav__menu-btn p-2 text-stone-800 hover:bg-stone-100 rounded-lg cursor-pointer"
                  aria-label="Open menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </li>

            </ul>
          </div>

        </div>

        {/* ─── BOOK MEGA MENU ─── */}
        {bookMenuOpen && (
          <div
            ref={megaMenuRef}
            className="absolute top-full left-0 right-0 w-full bg-white border-b border-stone-200 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2"
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 flex flex-col md:flex-row gap-8 lg:gap-14">

              {/* Left Section: 2 Columns of Curated Booking Links */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-5 text-sm">

                {/* Column 1 */}
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToHotelLocations();
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Find a Hotel
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToVacations('Homes & Villas');
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Homes & Villas
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToDestinations();
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Explore Destinations
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToHotelLocations();
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Hotel Locations
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToBrandDetail('the-ritz-carlton');
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Luxury Travel
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToVacations('Yacht Collection');
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    The Ritz-Carlton Yacht Collection
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToVacations('Escapes & Packages');
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Marriott Vacation Club
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToSearchResults({ destination: 'Resorts' });
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Resorts
                  </button>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToVacations('All-Inclusive');
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    All-Inclusive Vacations
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToTravelTips();
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Travel Tips & Ideas
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToResidences();
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Residences
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToDineDrink();
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Dine & Drink
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToGolf();
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Golf
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToOutdoors();
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Explore Outdoors
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToInsurance();
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Travel Insurance
                  </button>

                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToBusinessProgram();
                    }}
                    className="block text-left text-stone-900 hover:text-[#8a1538] font-medium transition-colors cursor-pointer"
                  >
                    Small & Midsize Business Program
                  </button>
                </div>

              </div>

              {/* Right Section: Featured Card with Vertical Divider */}
              <div className="border-t md:border-t-0 md:border-l border-stone-200 pt-6 md:pt-0 md:pl-8 lg:pl-12 max-w-sm w-full shrink-0 flex flex-col justify-between">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
                    alt="Vacation Rentals Curated by Us for You"
                    className="w-full h-44 object-cover mb-4 rounded-md"
                  />
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2 leading-snug">
                    Vacation Rentals Curated by Us for You
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Spread out while you earn & redeem points at Homes & Villas by Marriott Bonvoy.
                  </p>
                  <button
                    onClick={() => {
                      setBookMenuOpen(false);
                      goToVacations('Homes & Villas');
                    }}
                    className="border border-stone-900 rounded-full px-5 py-2 text-xs font-semibold text-stone-900 hover:bg-stone-900 hover:text-white transition-colors cursor-pointer"
                  >
                    Explore Homes
                  </button>
                </div>

                <button
                  onClick={() => setBookMenuOpen(false)}
                  className="self-end text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium mt-6 cursor-pointer"
                >
                  <span>✕</span> Close
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 text-sm font-semibold text-stone-800 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2">
            <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#8a1538] font-bold">Marriott Bonvoy Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-stone-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Official Mobile Nav Items with Right Arrows */}
            <ul className="main-nav__nav-items space-y-1">
              <li>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    goToSearchResults();
                  }}
                  className="flex items-center justify-between w-full py-3 text-stone-900 hover:text-[#8a1538] border-b border-stone-100 font-semibold"
                >
                  <span>Book</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    goToHotelLocations();
                  }}
                  className="flex items-center justify-between w-full py-3 text-stone-900 hover:text-[#8a1538] border-b border-stone-100 font-semibold"
                >
                  <span>Brands</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    goToMembership();
                  }}
                  className="flex items-center justify-between w-full py-3 text-stone-900 hover:text-[#8a1538] border-b border-stone-100 font-semibold"
                >
                  <span>Marriott Bonvoy</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
              </li>
            </ul>

            {/* Mobile Utility Links */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setHelpModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-xs font-semibold text-stone-800 flex items-center justify-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Help</span>
                </button>
                <button
                  onClick={() => {
                    setLanguageModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-xs font-semibold text-stone-800 flex items-center justify-center gap-1.5"
                >
                  <Globe className="w-4 h-4" />
                  <span>English</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsTripsModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-lg font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>My Trips</span>
              </button>

              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    setAuthModalTab('signin');
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center border border-stone-800 text-stone-900 rounded-lg font-semibold text-xs"
                >
                  Sign In or Join
                </button>
              ) : (
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs text-red-600 font-semibold"
                >
                  Sign Out ({user?.firstName})
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Help Modal */}
      <HelpModal isOpen={helpModalOpen} onClose={() => setHelpModalOpen(false)} />

      {/* Language Modal */}
      <LanguageModal isOpen={languageModalOpen} onClose={() => setLanguageModalOpen(false)} />
    </>
  );
};
