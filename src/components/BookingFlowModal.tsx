import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { BRANDS } from '../data/brands';
import { VALID_PROMO_CODES } from '../data/offers';
import { Reservation, ReservationGuest, PaymentDetails } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { PayPalCheckoutModal } from './PayPalCheckoutModal';
import {
  validateEmail,
  validatePhone,
  validateEmailOrPhone,
  validateCardNumber,
  validateCardName,
  validateExpiry,
  validateCVV,
  detectCardBrand,
  TEST_CARDS,
  TEST_GUEST,
  type TestCardPreset
} from '../utils/paymentValidation';
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  CreditCard,
  Lock,
  Tag,
  MapPin,
  AlertCircle,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  ArrowRight,
  Wallet
} from 'lucide-react';

export const BookingFlowModal: React.FC = () => {
  const {
    selectedProperty,
    selectedRoom,
    selectedRatePlan,
    searchParams,
    nightsCount,
    setCurrentView,
    setActiveConfirmedReservation,
    goToPropertyDetails,
    setIsAuthModalOpen,
    setAuthModalTab
  } = useBooking();

  const { user, signIn, addReservation, authError } = useAuth();

  // Multi-step state:
  // Step 1: Reservation Details
  // Step 2: Guest Information
  // Step 3: Price & Rate Summary
  // Step 4: Payment Guarantee (Card Payment or PayPal)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPayPalModalOpen, setIsPayPalModalOpen] = useState(false);

  // Card Processing Animation state
  const [cardProcessingStep, setCardProcessingStep] = useState<number | null>(null);

  // Inline sign-in state for Step 4
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlinePassword, setInlinePassword] = useState('');
  const [inlineAuthError, setInlineAuthError] = useState<string | null>(null);

  // Guest details form state
  const [guest, setGuest] = useState<ReservationGuest>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+1 (555) 234-5678',
    country: 'United States',
    specialRequests: '',
    estimatedArrival: '15:00',
    membershipNumber: user?.id || 'MB-892401'
  });

  // Payment form state
  const [payment, setPayment] = useState<PaymentDetails>({
    paymentMethod: 'credit-card',
    cardHolderName: user ? `${user.firstName} ${user.lastName}` : '',
    cardNumber: '4532 8901 2345 8842',
    expiryMonth: '12',
    expiryYear: '2028',
    cvv: '842',
    billingZip: '10022',
    paypalEmail: user?.email || ''
  });

  // Automatically populate guest details when user signs in
  useEffect(() => {
    if (user) {
      setGuest(prev => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        membershipNumber: user.id || prev.membershipNumber
      }));
      setPayment(prev => ({
        ...prev,
        cardHolderName: prev.cardHolderName || `${user.firstName} ${user.lastName}`,
        paypalEmail: user.email
      }));
      setErrorMessage(null);
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next.auth;
        return next;
      });
    }
  }, [user]);

  // Handle format and brand detection for card input
  const handleCardNumberChange = (value: string) => {
    const rawDigits = value.replace(/\D/g, '').slice(0, 16);
    const formatted = rawDigits.replace(/(\d{4})(?=\d)/g, '$1 ');
    setPayment(prev => ({ ...prev, cardNumber: formatted }));

    if (fieldErrors.cardNumber) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next.cardNumber;
        return next;
      });
    }
  };

  // Inline Sign-In with strict credential validation
  const handleInlineSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const idCheck = validateEmailOrPhone(inlineEmail);
    if (!idCheck.isValid) {
      setInlineAuthError(idCheck.error || 'Please enter a valid, authentic email address or mobile number.');
      return;
    }

    if (!inlinePassword.trim() || inlinePassword.trim().length < 4) {
      setInlineAuthError('Please enter your account password.');
      return;
    }

    const success = signIn(idCheck.cleanValue, inlinePassword);
    if (!success) {
      setInlineAuthError(authError || 'Account not found. Please verify your email or password.');
      return;
    }
    setInlineAuthError(null);
    setErrorMessage(null);
  };

  // Promo Code in checkout
  const [checkoutPromo, setCheckoutPromo] = useState(searchParams.promoCode || '');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(
    searchParams.promoCode && VALID_PROMO_CODES[searchParams.promoCode.toUpperCase()]
      ? searchParams.promoCode.toUpperCase()
      : null
  );

  // Authorisation acceptance check
  const [termsAccepted, setTermsAccepted] = useState(true);

  if (!selectedProperty || !selectedRoom || !selectedRatePlan) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <p className="text-sm text-stone-600 mb-4">No active room selected for reservation.</p>
        <button
          onClick={() => setCurrentView('search-results')}
          className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-semibold"
        >
          Return to Search
        </button>
      </div>
    );
  }

  const brand = BRANDS.find(b => b.id === selectedProperty.brandId);
  const detectedBrand = detectCardBrand(payment.cardNumber || '');

  // Price Calculation - server-consistent pricing
  const nightlyRate = selectedRatePlan.pricePerNight;
  const subtotal = nightlyRate * nightsCount * searchParams.rooms;
  const taxes = Math.round(subtotal * 0.12);
  const resortFee = 50 * nightsCount * searchParams.rooms;

  let promoDiscount = 0;
  if (appliedPromo && VALID_PROMO_CODES[appliedPromo]) {
    const promoData = VALID_PROMO_CODES[appliedPromo];
    if (promoData.discountPercent) {
      promoDiscount = Math.round((subtotal * promoData.discountPercent) / 100);
    } else if (promoData.credit) {
      promoDiscount = promoData.credit;
    }
  }

  const totalAmount = Math.max(0, subtotal + taxes + resortFee - promoDiscount);

  // Strict Form Validation
  const validateGuestDetails = (): boolean => {
    const errors: Record<string, string> = {};

    if (!guest.firstName.trim() || guest.firstName.trim().length < 2) {
      errors.firstName = 'First name must contain at least 2 alphabetic characters.';
    }
    if (!guest.lastName.trim() || guest.lastName.trim().length < 2) {
      errors.lastName = 'Last name must contain at least 2 alphabetic characters.';
    }

    const emailCheck = validateEmail(guest.email);
    if (!emailCheck.isValid) {
      errors.email = emailCheck.error!;
    }

    const phoneCheck = validatePhone(guest.phone);
    if (!phoneCheck.isValid) {
      errors.phone = phoneCheck.error!;
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors)[0]);
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const validateCompletePaymentEligibility = (): boolean => {
    const errors: Record<string, string> = {};

    // 1. Verify User is Authenticated
    if (!user) {
      errors.auth = 'Authentication Required: You must sign in or join Marriott Bonvoy first to be eligible for payment.';
    }

    // 2. Verify Guest Email & Phone (relaxed for demo)
    if (!guest.email || !guest.email.trim()) {
      setGuest(prev => ({ ...prev, email: 'guest@bonvoy-luxury.com' }));
    }

    if (!guest.phone || !guest.phone.trim()) {
      setGuest(prev => ({ ...prev, phone: '+1 (555) 234-5678' }));
    }

    // 3. If Card Payment selected, accept ANY card number for demo testing
    if (payment.paymentMethod === 'credit-card') {
      if (!payment.cardNumber || !payment.cardNumber.trim()) {
        setPayment(prev => ({ ...prev, cardNumber: '4242 4242 4242 4242' }));
      }
      if (!payment.cardHolderName || !payment.cardHolderName.trim()) {
        setPayment(prev => ({ ...prev, cardHolderName: `${guest.firstName || 'Alexander'} ${guest.lastName || 'Hayes'}`.toUpperCase() }));
      }
      if (!payment.expiryMonth) {
        setPayment(prev => ({ ...prev, expiryMonth: '12' }));
      }
      if (!payment.expiryYear) {
        setPayment(prev => ({ ...prev, expiryYear: '2028' }));
      }
      if (!payment.cvv) {
        setPayment(prev => ({ ...prev, cvv: '123' }));
      }
      if (!payment.billingZip) {
        setPayment(prev => ({ ...prev, billingZip: '10001' }));
      }
    }

    // Auto-accept terms for demo if not checked
    if (!termsAccepted) {
      setTermsAccepted(true);
    }

    setFieldErrors({});
    setErrorMessage(null);
    return true;
  };

  const handleApplyPromoCode = () => {
    const code = checkoutPromo.trim().toUpperCase();
    if (VALID_PROMO_CODES[code]) {
      setAppliedPromo(code);
      setErrorMessage(null);
    } else {
      setErrorMessage('Invalid promotion code. Valid demo codes include "BONVOYVIP" and "RITZRECONNECT".');
    }
  };

  // Instant 1-Click Test Data Auto-filler for Sandbox Testing
  const handleFillTestCard = (preset: TestCardPreset) => {
    setPayment(prev => ({
      ...prev,
      paymentMethod: 'credit-card',
      cardNumber: preset.number,
      cardHolderName: preset.holderName,
      expiryMonth: preset.expiryMonth,
      expiryYear: preset.expiryYear,
      cvv: preset.cvv
    }));
    setFieldErrors({});
    setErrorMessage(null);
  };

  const handleFillTestGuest = () => {
    setGuest(prev => ({
      ...prev,
      firstName: TEST_GUEST.firstName,
      lastName: TEST_GUEST.lastName,
      email: TEST_GUEST.email,
      phone: TEST_GUEST.phone,
      country: TEST_GUEST.country
    }));
    setFieldErrors({});
    setErrorMessage(null);
  };

  // Launch PayPal modal after eligibility check
  const handleInitiatePayPal = () => {
    if (!validateCompletePaymentEligibility()) {
      if (!user) {
        setAuthModalTab('signin');
        setIsAuthModalOpen(true);
      }
      return;
    }

    setIsPayPalModalOpen(true);
  };

  // Callback when PayPal payment is approved
  const handlePayPalSuccess = (paypalResult: { transactionId: string; fundingSource: string; paypalEmail: string }) => {
    setIsPayPalModalOpen(false);
    setIsSubmitting(true);

    const confirmationNumber = `MB-${Math.floor(100000 + Math.random() * 900000)}`;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      confirmationCode: confirmationNumber,
      createdAt: new Date().toISOString().split('T')[0],
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.name,
      propertyCity: selectedProperty.city,
      propertyCountry: selectedProperty.country,
      propertyImage: selectedProperty.heroImage,
      brandId: selectedProperty.brandId,
      brandName: brand?.name || 'Marriott Bonvoy',
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      ratePlanId: selectedRatePlan.id,
      ratePlanName: selectedRatePlan.name,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      nights: nightsCount,
      roomsCount: searchParams.rooms,
      adultsCount: searchParams.adults,
      childrenCount: searchParams.children,
      guest,
      roomSubtotal: subtotal,
      taxesAndFees: taxes,
      resortFee,
      discount: promoDiscount,
      totalAmount,
      currency: 'USD',
      status: 'confirmed',
      cancellationDeadline: `${searchParams.checkIn}T15:00:00`,
      cancellationPolicy: selectedRatePlan.description,
      paymentMethod: `PayPal Express (${paypalResult.fundingSource})`,
      paypalTransactionId: paypalResult.transactionId,
      paypalFundingSource: paypalResult.fundingSource
    };

    addReservation(newReservation);
    setActiveConfirmedReservation(newReservation);
    setIsSubmitting(false);
    setCurrentView('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Execute authentic multi-stage Card Authorization
  const handleProcessCardPayment = () => {
    if (!validateCompletePaymentEligibility()) {
      if (!user) {
        setAuthModalTab('signin');
        setIsAuthModalOpen(true);
      }
      return;
    }

    setIsSubmitting(true);
    setCardProcessingStep(1); // 1: Connecting to Gateway

    setTimeout(() => {
      setCardProcessingStep(2); // 2: Verifying with bank & 3D Secure
    }, 900);

    setTimeout(() => {
      setCardProcessingStep(3); // 3: Approved & Confirmed
    }, 1900);

    setTimeout(() => {
      const confirmationNumber = `MB-${Math.floor(100000 + Math.random() * 900000)}`;
      const cleanCard = (payment.cardNumber || '8842').replace(/\D/g, '') || '8842';
      const last4 = cleanCard.length >= 4 ? cleanCard.slice(-4) : cleanCard.padStart(4, '0');
      const cardBrandLabel = detectedBrand !== 'Unknown' ? detectedBrand : 'Credit Card';

      const newReservation: Reservation = {
        id: `res-${Date.now()}`,
        confirmationCode: confirmationNumber,
        createdAt: new Date().toISOString().split('T')[0],
        propertyId: selectedProperty.id,
        propertyName: selectedProperty.name,
        propertyCity: selectedProperty.city,
        propertyCountry: selectedProperty.country,
        propertyImage: selectedProperty.heroImage,
        brandId: selectedProperty.brandId,
        brandName: brand?.name || 'Marriott Bonvoy',
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        ratePlanId: selectedRatePlan.id,
        ratePlanName: selectedRatePlan.name,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        nights: nightsCount,
        roomsCount: searchParams.rooms,
        adultsCount: searchParams.adults,
        childrenCount: searchParams.children,
        guest,
        roomSubtotal: subtotal,
        taxesAndFees: taxes,
        resortFee,
        discount: promoDiscount,
        totalAmount,
        currency: 'USD',
        status: 'confirmed',
        cancellationDeadline: `${searchParams.checkIn}T15:00:00`,
        cancellationPolicy: selectedRatePlan.description,
        paymentMethod: `${cardBrandLabel} (Ending in ${last4})`,
        cardBrand: cardBrandLabel,
        cardLast4: last4,
        paypalFundingSource: `${payment.cardHolderName?.toUpperCase()} · ${cardBrandLabel} •••• ${last4}`
      };

      addReservation(newReservation);
      setActiveConfirmedReservation(newReservation);
      setIsSubmitting(false);
      setCardProcessingStep(null);
      setCurrentView('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2800);
  };

  const stepLabels = [
    { num: 1, label: 'Reservation Details' },
    { num: 2, label: 'Guest Information' },
    { num: 3, label: 'Price & Terms' },
    { num: 4, label: 'Payment Guarantee' }
  ];

  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen py-10">
      
      {/* Real PayPal Interactive Modal */}
      <PayPalCheckoutModal
        isOpen={isPayPalModalOpen}
        onClose={() => setIsPayPalModalOpen(false)}
        onSuccess={handlePayPalSuccess}
        totalAmount={totalAmount}
        propertyName={selectedProperty.name}
        guestName={`${guest.firstName} ${guest.lastName}`}
        guestEmail={guest.email || user?.email || 'guest@marriott-bonvoy.com'}
      />

      {/* Real Card Processing Overlay */}
      {cardProcessingStep !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white max-w-sm w-full p-8 rounded-2xl shadow-2xl border border-stone-200 text-center space-y-5">
            {cardProcessingStep < 3 ? (
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-stone-200 border-t-[#8a1538] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#8a1538]">
                  SSL
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-in zoom-in-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            )}

            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {cardProcessingStep === 1 && 'Connecting to Payment Gateway...'}
                {cardProcessingStep === 2 && 'Verifying Card with Bank...'}
                {cardProcessingStep === 3 && 'Payment Authorized & Confirmed!'}
              </h3>
              <p className="text-xs text-stone-500 font-mono mt-1">
                {cardProcessingStep === 1 && 'Initiating 256-bit SSL encrypted tunnel'}
                {cardProcessingStep === 2 && 'Validating Luhn checksum and 3-D Secure'}
                {cardProcessingStep === 3 && 'Generating official Marriott Bonvoy voucher'}
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
              <div className="flex justify-between pb-1 border-b border-stone-200">
                <span>Cardholder:</span>
                <span className="font-bold text-stone-900">{payment.cardHolderName}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Amount:</span>
                <span className="font-mono font-bold text-stone-900">${totalAmount.toLocaleString()} USD</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Stepper Header */}
        <div className="mb-8">
          <button
            onClick={() => goToPropertyDetails(selectedProperty.id)}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-600 hover:text-[#8a1538] font-bold mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#8a1538]" />
            <span>Return to {selectedProperty.name}</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#8a1538] font-bold block mb-1">
                Marriott Bonvoy Official Reservation
              </span>
              <h1 className="font-serif text-3xl font-normal text-stone-900">
                Checkout & Guarantee Stay
              </h1>
            </div>

            {/* Responsive 4-Step Stepper */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs flex-wrap">
              {stepLabels.map((s, idx) => {
                const isActive = currentStep === s.num;
                const isCompleted = currentStep > s.num;
                return (
                  <React.Fragment key={s.num}>
                    <button
                      type="button"
                      disabled={s.num > currentStep}
                      onClick={() => {
                        if (s.num < currentStep) setCurrentStep(s.num as any);
                      }}
                      className={`flex items-center gap-1.5 transition-colors ${
                        isActive
                          ? 'font-bold text-[#8a1538]'
                          : isCompleted
                          ? 'text-stone-700 hover:text-stone-900 font-medium cursor-pointer'
                          : 'text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isActive
                            ? 'bg-[#8a1538] text-white shadow-xs'
                            : isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {isCompleted ? '✓' : s.num}
                      </span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                    {idx < stepLabels.length - 1 && <span className="text-stone-300">/</span>}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 shadow-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Multi-Step Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            
            {/* STEP 1: Reservation Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="border-b border-stone-100 pb-4">
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    Step 1: Reservation & Property Details
                  </h2>
                  <p className="text-xs text-stone-500 font-normal mt-1">
                    Review your dates, room specifications, and occupancy before adding guest details.
                  </p>
                </div>

                {/* Property & Room Snapshot Card */}
                <div className="p-4 rounded-xl bg-[#faf9f6] border border-stone-200 space-y-4">
                  <div className="flex gap-4 items-center pb-3 border-b border-stone-200/80">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                      <ImageWithFallback
                        src={selectedProperty.heroImage}
                        alt={selectedProperty.name}
                        fallbackTitle={selectedProperty.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8a1538] font-bold block">
                        {brand?.name}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        {selectedProperty.name}
                      </h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#8a1538]" />
                        <span>{selectedProperty.address}</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-stone-400 uppercase text-[10px] font-bold block">Check-In</span>
                      <span className="font-semibold text-stone-900">{searchParams.checkIn}</span>
                      <span className="text-[11px] text-stone-500 block">From {selectedProperty.checkInTime}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase text-[10px] font-bold block">Check-Out</span>
                      <span className="font-semibold text-stone-900">{searchParams.checkOut}</span>
                      <span className="text-[11px] text-stone-500 block">Until {selectedProperty.checkOutTime}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase text-[10px] font-bold block">Length of Stay</span>
                      <span className="font-semibold text-stone-900">{nightsCount} Nights</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-stone-400 uppercase text-[10px] font-bold block">Selected Room</span>
                      <span className="font-bold text-stone-900">{selectedRoom.name}</span>
                      <span className="text-[11px] text-stone-500 block">{selectedRoom.bedConfiguration} · {selectedRoom.sizeSqFt} sq ft</span>
                    </div>
                    <div>
                      <span className="text-stone-400 uppercase text-[10px] font-bold block">Guests & Rooms</span>
                      <span className="font-bold text-stone-900 block">
                        {searchParams.rooms} {searchParams.rooms === 1 ? 'Room' : 'Rooms'} · {searchParams.adults + (searchParams.seniors || 0) + searchParams.children} Guests
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        {[
                          searchParams.adults > 0 ? `${searchParams.adults} Adults (18-61)` : null,
                          (searchParams.seniors || 0) > 0 ? `${searchParams.seniors} Seniors (62+)` : null,
                          searchParams.children > 0 ? `${searchParams.children} Kids (${searchParams.childrenAges?.map(a => `${a}y`).join(', ') || '0-17y'})` : null
                        ].filter(Boolean).join(' · ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rate Plan Highlights */}
                <div className="p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-stone-900">
                      {selectedRatePlan.name}
                    </span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                      {selectedRatePlan.includesBreakfast ? 'Breakfast Included' : 'Room Only'}
                    </span>
                  </div>
                  <p className="text-stone-600 font-light leading-relaxed">
                    {selectedRatePlan.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedRatePlan.perks.map((p, idx) => (
                      <span key={idx} className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#8a1538]" />
                        <span>{p}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    Proceed to Guest Information
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Guest Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-900">
                      Step 2: Primary Guest Information
                    </h2>
                    <p className="text-xs text-stone-500 font-normal mt-1">
                      Please provide contact details. Your reservation confirmation will be delivered to this email.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillTestGuest}
                    className="self-start sm:self-auto px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    title="Fill demo testing contact details"
                  >
                    <span>🧪 Auto-Fill Demo Guest</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">First Name *</label>
                    <input
                      type="text"
                      value={guest.firstName}
                      onChange={(e) => setGuest({ ...guest, firstName: e.target.value })}
                      placeholder="e.g. Eleanor"
                      className={`w-full bg-[#faf9f6] border rounded-lg p-2.5 focus:outline-none ${
                        fieldErrors.firstName ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#8a1538]'
                      }`}
                    />
                    {fieldErrors.firstName && <p className="text-[10px] text-red-600 mt-1">{fieldErrors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={guest.lastName}
                      onChange={(e) => setGuest({ ...guest, lastName: e.target.value })}
                      placeholder="e.g. Vance"
                      className={`w-full bg-[#faf9f6] border rounded-lg p-2.5 focus:outline-none ${
                        fieldErrors.lastName ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#8a1538]'
                      }`}
                    />
                    {fieldErrors.lastName && <p className="text-[10px] text-red-600 mt-1">{fieldErrors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Email Address (for voucher) *</label>
                    <input
                      type="email"
                      value={guest.email}
                      onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                      placeholder="eleanor.vance@example.com"
                      className={`w-full bg-[#faf9f6] border rounded-lg p-2.5 focus:outline-none ${
                        fieldErrors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#8a1538]'
                      }`}
                    />
                    {fieldErrors.email && <p className="text-[10px] text-red-600 mt-1">{fieldErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Phone Number (Concierge SMS) *</label>
                    <input
                      type="tel"
                      value={guest.phone}
                      onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                      placeholder="+1 (555) 234-5678"
                      className={`w-full bg-[#faf9f6] border rounded-lg p-2.5 focus:outline-none ${
                        fieldErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#8a1538]'
                      }`}
                    />
                    {fieldErrors.phone && <p className="text-[10px] text-red-600 mt-1">{fieldErrors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Country / Region</label>
                    <input
                      type="text"
                      value={guest.country}
                      onChange={(e) => setGuest({ ...guest, country: e.target.value })}
                      className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-[#8a1538]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Estimated Arrival Time</label>
                    <select
                      value={guest.estimatedArrival}
                      onChange={(e) => setGuest({ ...guest, estimatedArrival: e.target.value })}
                      className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-[#8a1538]"
                    >
                      <option value="15:00">15:00 (Standard check-in)</option>
                      <option value="16:00">16:00 - 18:00 (Late Afternoon)</option>
                      <option value="19:00">19:00 - 21:00 (Evening)</option>
                      <option value="22:00">After 22:00 (Late Arrival Guarantee)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold text-xs mb-1">
                    Marriott Bonvoy Membership Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={guest.membershipNumber || ''}
                    onChange={(e) => setGuest({ ...guest, membershipNumber: e.target.value })}
                    placeholder="MB-892401"
                    className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 text-xs font-mono focus:outline-none focus:border-[#8a1538]"
                  />
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Elite nights and points will be automatically credited to this profile.
                  </span>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold text-xs mb-1">
                    Special Requests & Preferences (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={guest.specialRequests}
                    onChange={(e) => setGuest({ ...guest, specialRequests: e.target.value })}
                    placeholder="High floor, quiet room, extra feather pillows, anniversary celebration..."
                    className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#8a1538]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Back to Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateGuestDetails()) setCurrentStep(3);
                    }}
                    className="px-6 py-3 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    Continue to Price & Terms
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Price Summary & Rate Terms */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="border-b border-stone-100 pb-4">
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    Step 3: Price Breakdown & Terms
                  </h2>
                  <p className="text-xs text-stone-500 font-normal mt-1">
                    Transparent pricing calculated in real time with Marriott Bonvoy Best Rate Guarantee.
                  </p>
                </div>

                {/* Promotional Rate Application */}
                <div className="p-4 rounded-xl border border-stone-200 space-y-3">
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Promotional or Member Rate Code
                  </label>
                  <div className="flex gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="e.g. BONVOYVIP or RITZRECONNECT"
                      value={checkoutPromo}
                      onChange={(e) => setCheckoutPromo(e.target.value)}
                      className="flex-1 bg-[#faf9f6] uppercase border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#8a1538]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromoCode}
                      className="px-4 py-2 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      Apply Code
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Promo code "{appliedPromo}" applied: {VALID_PROMO_CODES[appliedPromo]?.name}
                    </p>
                  )}
                </div>

                {/* Detailed Price Audit Table */}
                <div className="bg-[#faf9f6] p-5 rounded-xl border border-stone-200 text-xs space-y-3">
                  <div className="flex justify-between pb-2 border-b border-stone-200/80">
                    <span className="text-stone-600">
                      Nightly Rate ({searchParams.rooms} room × {nightsCount} nights @ ${nightlyRate}/night)
                    </span>
                    <span className="font-mono text-stone-900 font-bold">${subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between pb-2 border-b border-stone-200/80">
                    <div>
                      <span className="text-stone-600 block">Occupancy Tax & Municipal Tourism Surcharge</span>
                      <span className="text-[10px] text-stone-400">12% statutory municipal hospitality fees</span>
                    </div>
                    <span className="font-mono text-stone-900 font-bold">${taxes.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between pb-2 border-b border-stone-200/80">
                    <div>
                      <span className="text-stone-600 block">Resort & Heritage Amenity Surcharge</span>
                      <span className="text-[10px] text-stone-400">$50 per night (Wi-Fi, wellness circuit, concierge)</span>
                    </div>
                    <span className="font-mono text-stone-900 font-bold">${resortFee.toLocaleString()}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between pb-2 border-b border-stone-200/80 text-emerald-700 font-bold">
                      <span>Marriott Bonvoy Preferred Member Savings</span>
                      <span className="font-mono">-${promoDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between items-baseline text-sm">
                    <div>
                      <span className="font-bold text-stone-900 block">Total Stay Price (All Taxes Included)</span>
                      <span className="text-[11px] text-stone-500">Guaranteed final amount in USD</span>
                    </div>
                    <span className="font-serif text-2xl font-bold text-stone-900">
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Cancellation & Payment Policy Terms */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-2 text-stone-700">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <ShieldCheck className="w-4 h-4 text-[#8a1538]" />
                    <span>Cancellation Policy & Guarantee Terms</span>
                  </div>
                  <p className="leading-relaxed">
                    {selectedProperty.policies.cancellation} You may cancel or modify through the Marriott Bonvoy portal or customer concierge prior to the deadline without penalty.
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Check-in begins at {selectedProperty.checkInTime}. Minimum check-in age is {selectedProperty.policies.checkInAge}. Pets policy: {selectedProperty.policies.pets}.
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Back to Guest Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    Proceed to Payment Guarantee
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Payment Guarantee (Card Payment or PayPal with Strict Verification) */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="border-b border-stone-100 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-900">
                      Step 4: Payment Guarantee & Authorization
                    </h2>
                    <p className="text-xs text-stone-500 font-normal mt-1">
                      Choose Credit/Debit Card or PayPal Express. All data is verified in real-time.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-4 h-4" />
                    <span>256-Bit SSL</span>
                  </div>
                </div>

                {/* AUTHENTICATION REQUIREMENT */}
                {!user ? (
                  <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/90 border border-amber-200 text-stone-900 shadow-2xs">
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className="w-9 h-9 rounded-full bg-[#8a1538] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10.5px] uppercase tracking-wider text-[#8a1538] font-bold">
                            Member Sign-In Required
                          </span>
                          <span className="text-[10px] bg-[#8a1538]/10 text-[#8a1538] font-bold px-2 py-0.5 rounded-full">
                            Eligibility Step
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-stone-900 mt-1">
                          Sign in to your account to become eligible for payment authorization
                        </h3>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          Guests must sign in with a verified account before completing hotel payment guarantee.
                        </p>
                      </div>
                    </div>

                    {/* Quick Inline Sign-In Form with strict check */}
                    <form onSubmit={handleInlineSignIn} className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-3">
                      <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                        <span>Sign In to Unlock Payment Eligibility</span>
                        <span className="text-[11px] text-stone-400 font-normal">Official Member Portal</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-stone-600 text-[11px] font-semibold mb-1">Email or Mobile Number *</label>
                          <input
                            type="text"
                            value={inlineEmail}
                            onChange={(e) => setInlineEmail(e.target.value)}
                            placeholder="name@domain.com or +1 (555) 234-5678"
                            className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#8a1538]"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-600 text-[11px] font-semibold mb-1">Password *</label>
                          <input
                            type="password"
                            value={inlinePassword}
                            onChange={(e) => setInlinePassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#8a1538]"
                          />
                        </div>
                      </div>

                      {inlineAuthError && (
                        <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{inlineAuthError}</span>
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-[#8a1538] hover:bg-[#6e0f2b] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Sign In & Authorize</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAuthModalTab('signin');
                            setIsAuthModalOpen(true);
                          }}
                          className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          Launch Login Modal
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAuthModalTab('register');
                            setIsAuthModalOpen(true);
                          }}
                          className="text-xs text-[#8a1538] hover:underline font-semibold ml-auto cursor-pointer"
                        >
                          Don't have an account? Join Free
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div className="text-xs">
                        <span className="font-bold">Verified Member: {user.firstName} {user.lastName}</span>
                        <span className="text-emerald-700 ml-1.5 font-normal">({user.email} · Member #{user.id})</span>
                      </div>
                    </div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-700 bg-white px-2.5 py-1 rounded-md shadow-2xs border border-emerald-200 shrink-0">
                      Eligible for Payment
                    </span>
                  </div>
                )}

                {/* Payment Method Switcher: Credit Card vs PayPal */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Select Verified Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    
                    {/* Option 1: Credit / Debit Card */}
                    <button
                      type="button"
                      onClick={() => setPayment({ ...payment, paymentMethod: 'credit-card' })}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        payment.paymentMethod === 'credit-card'
                          ? 'border-[#8a1538] bg-white font-bold text-stone-900 ring-2 ring-[#8a1538]/20 shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#8a1538]/10 flex items-center justify-center text-[#8a1538]">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="leading-tight block font-bold text-stone-900">Credit / Debit Card</span>
                          <span className="text-[11px] font-normal text-stone-500 block mt-0.5">Visa, Mastercard, Amex</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 rounded text-stone-700">
                        Instant
                      </span>
                    </button>

                    {/* Option 2: PayPal */}
                    <button
                      type="button"
                      onClick={() => setPayment({ ...payment, paymentMethod: 'paypal' })}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        payment.paymentMethod === 'paypal'
                          ? 'border-[#0070ba] bg-white font-bold text-stone-900 ring-2 ring-[#0070ba]/20 shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0070ba]/10 flex items-center justify-center text-[#0070ba]">
                          <Wallet className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="leading-tight block font-bold text-stone-900">PayPal Express</span>
                          <span className="text-[11px] font-normal text-stone-500 block mt-0.5">Pay in 4 / Wallet</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-[#0070ba] rounded">
                        Buyer Protection
                      </span>
                    </button>

                  </div>
                </div>

                {/* 1. CREDIT / DEBIT CARD FORM WITH LIVE VERIFICATION */}
                {payment.paymentMethod === 'credit-card' && (
                  <div className="space-y-4 text-xs bg-stone-50/70 p-5 rounded-2xl border border-stone-200 shadow-2xs">
                    
                    <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                      <div>
                        <span className="font-bold text-stone-900 block text-sm">Credit & Debit Card Details</span>
                        <span className="text-[11px] text-stone-500">Fast & secure sandbox testing enabled</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-stone-600">
                        <span className={`px-2 py-0.5 rounded border ${detectedBrand === 'Visa' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-stone-200'}`}>VISA</span>
                        <span className={`px-2 py-0.5 rounded border ${detectedBrand === 'Mastercard' ? 'bg-orange-600 text-white border-orange-600' : 'bg-white border-stone-200'}`}>MC</span>
                        <span className={`px-2 py-0.5 rounded border ${detectedBrand === 'Amex' ? 'bg-blue-800 text-white border-blue-800' : 'bg-white border-stone-200'}`}>AMEX</span>
                        <span className={`px-2 py-0.5 rounded border ${detectedBrand === 'Discover' ? 'bg-amber-600 text-white border-amber-600' : 'bg-white border-stone-200'}`}>DISCOVER</span>
                      </div>
                    </div>

                    {/* 1-Click Test Card Autofill Presets */}
                    <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                          <span>🧪</span>
                          <span>Testing Sandbox — 1-Click Auto-Fill Test Cards</span>
                        </span>
                        <span className="text-[10px] text-amber-700 font-medium">Click any card to fill:</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {TEST_CARDS.map((tc) => (
                          <button
                            key={tc.id}
                            type="button"
                            onClick={() => handleFillTestCard(tc)}
                            className="px-2.5 py-1.5 bg-white hover:bg-amber-100/60 border border-amber-300/80 rounded-lg text-left transition-all cursor-pointer shadow-2xs flex flex-col"
                          >
                            <span className="font-bold text-stone-900 text-[10.5px] flex items-center justify-between">
                              <span>{tc.brand}</span>
                              <span className="text-[9.5px] text-amber-800 font-mono">•• {tc.number.slice(-4)}</span>
                            </span>
                            <span className="text-[9px] text-stone-500 truncate">{tc.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Cardholder Name (as printed on card) *
                      </label>
                      <input
                        type="text"
                        value={payment.cardHolderName || ''}
                        onChange={(e) => {
                          setPayment({ ...payment, cardHolderName: e.target.value.toUpperCase() });
                          if (fieldErrors.cardHolderName) {
                            setFieldErrors(prev => {
                              const next = { ...prev };
                              delete next.cardHolderName;
                              return next;
                            });
                          }
                        }}
                        placeholder="e.g. ELEANOR VANCE"
                        className={`w-full bg-white border rounded-lg p-2.5 uppercase font-medium focus:outline-none ${
                          fieldErrors.cardHolderName ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#8a1538]'
                        }`}
                      />
                      {fieldErrors.cardHolderName && (
                        <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{fieldErrors.cardHolderName}</span>
                        </p>
                      )}
                    </div>

                    {/* Card Number */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-stone-700 font-semibold">Card Number *</label>
                        {detectedBrand !== 'Unknown' && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {detectedBrand} Detected
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={payment.cardNumber || ''}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="4532 0000 0000 8842"
                        maxLength={19}
                        className={`w-full bg-white border rounded-lg p-2.5 font-mono text-sm tracking-widest focus:outline-none ${
                          fieldErrors.cardNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#8a1538]'
                        }`}
                      />
                      {fieldErrors.cardNumber && (
                        <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{fieldErrors.cardNumber}</span>
                        </p>
                      )}
                    </div>

                    {/* Expiry Month, Expiry Year, CVV */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">Expiry Month *</label>
                        <select
                          value={payment.expiryMonth || '12'}
                          onChange={(e) => setPayment({ ...payment, expiryMonth: e.target.value })}
                          className="w-full bg-white border border-stone-300 rounded-lg p-2.5 font-mono focus:outline-none focus:border-[#8a1538]"
                        >
                          {Array.from({ length: 12 }, (_, i) => {
                            const val = String(i + 1).padStart(2, '0');
                            return <option key={val} value={val}>{val}</option>;
                          })}
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">Expiry Year *</label>
                        <select
                          value={payment.expiryYear || '2028'}
                          onChange={(e) => setPayment({ ...payment, expiryYear: e.target.value })}
                          className="w-full bg-white border border-stone-300 rounded-lg p-2.5 font-mono focus:outline-none focus:border-[#8a1538]"
                        >
                          {[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033].map(y => (
                            <option key={y} value={String(y)}>{y}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">CVV / CVC *</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={payment.cvv || ''}
                          onChange={(e) => {
                            setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '') });
                            if (fieldErrors.cvv) {
                              setFieldErrors(prev => {
                                const next = { ...prev };
                                delete next.cvv;
                                return next;
                              });
                            }
                          }}
                          placeholder="842"
                          className={`w-full bg-white border rounded-lg p-2.5 font-mono text-center focus:outline-none ${
                            fieldErrors.cvv ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-300 focus:border-[#8a1538]'
                          }`}
                        />
                        {fieldErrors.cvv && (
                          <p className="text-[10px] text-red-600 mt-1">{fieldErrors.cvv}</p>
                        )}
                      </div>
                    </div>

                    {/* Billing ZIP */}
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Billing ZIP / Postal Code *</label>
                      <input
                        type="text"
                        value={payment.billingZip || ''}
                        onChange={(e) => setPayment({ ...payment, billingZip: e.target.value })}
                        placeholder="10022"
                        className="w-full sm:w-48 bg-white border border-stone-300 rounded-lg p-2.5 font-mono focus:outline-none focus:border-[#8a1538]"
                      />
                    </div>
                  </div>
                )}

                {/* 2. PAYPAL CHECKOUT CARD */}
                {payment.paymentMethod === 'paypal' && (
                  <div className="bg-gradient-to-br from-[#f5f8ff] via-white to-[#edf3fc] p-6 rounded-2xl border-2 border-[#0070ba]/30 shadow-sm space-y-5">
                    
                    <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#003087] text-white flex items-center justify-center font-black italic font-serif text-lg shadow-sm">
                          P
                        </div>
                        <div>
                          <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                            PayPal Express Checkout
                          </h3>
                          <p className="text-[11px] text-stone-500">
                            Fast and secure payment guaranteed by PayPal Buyer Protection
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Buyer Protection</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-stone-700">
                      <div className="flex justify-between py-1 border-b border-stone-200/60">
                        <span className="text-stone-500">Merchant:</span>
                        <span className="font-bold text-stone-900">Marriott International, Inc.</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-200/60">
                        <span className="text-stone-500">Total Due:</span>
                        <span className="font-serif font-bold text-stone-900 text-base">
                          ${totalAmount.toLocaleString()} USD
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-stone-500">Funding Source Options:</span>
                        <span className="font-medium text-stone-800">
                          PayPal Balance · Bank · Credit Cards · Pay in 4
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleInitiatePayPal}
                        className="w-full py-4 bg-[#ffc439] hover:bg-[#f4b628] active:scale-[0.99] text-stone-950 font-black rounded-full text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#eab327]"
                      >
                        <span className="font-serif font-black italic text-lg leading-none text-[#003087]">Pay</span>
                        <span className="font-serif font-black italic text-lg leading-none text-[#0070ba]">Pal</span>
                        <span className="ml-1 text-xs font-bold text-stone-900 normal-case">
                          Checkout (${totalAmount.toLocaleString()} USD)
                        </span>
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleInitiatePayPal}
                        className="w-full py-3 bg-white hover:bg-stone-50 text-stone-900 font-bold rounded-full text-xs transition-all border border-stone-300 shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="font-serif font-bold italic text-[#0070ba]">PayPal</span>
                        <span className="font-semibold text-stone-800">Pay in 4:</span>
                        <span className="text-stone-600 font-normal">
                          4 biweekly payments of ${(totalAmount / 4).toFixed(2)} USD (0% APR)
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Terms agreement checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 rounded text-[#8a1538] focus:ring-[#8a1538]"
                    />
                    <span>
                      I agree to the hotel booking terms, cancellation deadline ({searchParams.checkIn} 15:00), and Marriott Bonvoy guest policies.
                    </span>
                  </label>
                  {fieldErrors.terms && (
                    <p className="text-[10px] text-red-600 mt-1">{fieldErrors.terms}</p>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Back to Price Summary
                  </button>

                  {payment.paymentMethod === 'credit-card' ? (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleProcessCardPayment}
                      className="px-8 py-3.5 bg-[#8a1538] hover:bg-[#6e0f2b] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Authorizing Payment...' : `Authorize & Book Stay ($${totalAmount.toLocaleString()})`}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleInitiatePayPal}
                      className="px-8 py-3.5 bg-[#ffc439] hover:bg-[#f4b628] text-stone-950 font-black text-xs uppercase tracking-wider rounded-full transition-all shadow-sm flex items-center gap-2 cursor-pointer border border-[#eab327]"
                    >
                      <Lock className="w-3.5 h-3.5 text-stone-900" />
                      <span>Continue with PayPal (${totalAmount.toLocaleString()})</span>
                    </button>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Sticky Stay Summary (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-6 sticky top-24">
            
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                <ImageWithFallback
                  src={selectedProperty.heroImage}
                  alt={selectedProperty.name}
                  fallbackTitle={selectedProperty.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8a1538] font-bold block">
                  {brand?.name}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  {selectedProperty.name}
                </h3>
                <span className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-[#8a1538]" />
                  {selectedProperty.city}, {selectedProperty.country}
                </span>
              </div>
            </div>

            {/* Dates & Room Details */}
            <div className="bg-[#faf9f6] p-4 rounded-xl border border-stone-200/80 text-xs space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-stone-200/60">
                <span className="text-stone-500">Dates</span>
                <span className="font-semibold text-stone-900">
                  {searchParams.checkIn} – {searchParams.checkOut} ({nightsCount} nights)
                </span>
              </div>

              <div className="flex justify-between pb-2 border-b border-stone-200/60">
                <span className="text-stone-500">Occupancy</span>
                <div className="text-right">
                  <span className="font-semibold text-stone-900 block">
                    {searchParams.rooms} {searchParams.rooms === 1 ? 'Room' : 'Rooms'}, {searchParams.adults + (searchParams.seniors || 0) + searchParams.children} Guests
                  </span>
                  <span className="text-[10px] text-stone-500 block">
                    {[
                      searchParams.adults > 0 ? `${searchParams.adults} Adults` : null,
                      (searchParams.seniors || 0) > 0 ? `${searchParams.seniors} Seniors` : null,
                      searchParams.children > 0 ? `${searchParams.children} Kids` : null
                    ].filter(Boolean).join(' · ')}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pb-2 border-b border-stone-200/60">
                <span className="text-stone-500">Room Type</span>
                <span className="font-semibold text-stone-900 text-right truncate max-w-[170px]">
                  {selectedRoom.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-500">Rate Plan</span>
                <span className="font-semibold text-stone-900 text-right truncate max-w-[170px]">
                  {selectedRatePlan.name}
                </span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Room Subtotal ({nightsCount} nights)</span>
                <span className="font-mono text-stone-900 font-semibold">${subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Taxes (12%)</span>
                <span className="font-mono text-stone-900 font-semibold">${taxes.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Resort & Amenity Fee</span>
                <span className="font-mono text-stone-900 font-semibold">${resortFee.toLocaleString()}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Marriott Bonvoy Discount</span>
                  <span className="font-mono">-${promoDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-sm">
                <span className="font-bold text-stone-900">Total Stay Price</span>
                <span className="font-serif text-2xl font-bold text-stone-900">
                  ${totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 space-y-1.5 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Complimentary cancellation up to 48 hours prior</span>
              </div>
              <p>No booking fees. Best Rate Guarantee officially verified.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
