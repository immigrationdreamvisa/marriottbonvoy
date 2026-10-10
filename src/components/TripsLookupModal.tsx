import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { X, Eye, EyeOff, ChevronDown, Check } from 'lucide-react';

export const TripsLookupModal: React.FC = () => {
  const { isTripsModalOpen, setIsTripsModalOpen, goToMyBookings, setIsAuthModalOpen, setAuthModalTab, setActiveConfirmedReservation } = useBooking();
  const { signIn, findReservationByCode, reservations, authError } = useAuth();

  // Left form state (Look Up a Reservation)
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Right form state (Sign In)
  const [emailOrMemberNumber, setEmailOrMemberNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState<string | null>(null);

  if (!isTripsModalOpen) return null;

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);

    if (!confirmationNumber.trim()) {
      setLookupError('Please enter your confirmation number.');
      return;
    }

    const found = findReservationByCode(confirmationNumber, lastName || undefined);
    if (found) {
      setActiveConfirmedReservation(found);
      setIsTripsModalOpen(false);
      goToMyBookings();
    } else {
      // Check if code matches any case-insensitive or partial
      const anyMatch = reservations.find(r => 
        r.confirmationCode.toUpperCase().includes(confirmationNumber.trim().toUpperCase())
      );
      if (anyMatch) {
        setActiveConfirmedReservation(anyMatch);
        setIsTripsModalOpen(false);
        goToMyBookings();
        return;
      }

      setLookupError('We could not locate a reservation with the details provided. Try sample code MB-892401.');
    }
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError(null);

    if (!emailOrMemberNumber.trim()) {
      setSignInError('Please enter your email or member number.');
      return;
    }

    const success = signIn(emailOrMemberNumber, password);
    if (success) {
      setIsTripsModalOpen(false);
      goToMyBookings();
    } else {
      setSignInError(authError || 'Sign in failed. Please check your credentials.');
    }
  };

  const handleForgotPassword = () => {
    if (!emailOrMemberNumber.trim()) {
      setForgotPasswordNotice('Please enter your email above to receive a password reset link.');
    } else {
      setForgotPasswordNotice(`Password reset instructions sent to ${emailOrMemberNumber}.`);
      setTimeout(() => setForgotPasswordNotice(null), 4000);
    }
  };

  const handleActivateAccount = () => {
    setIsTripsModalOpen(false);
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in-95 my-auto">
        
        {/* Top Right Close Button */}
        <button
          onClick={() => setIsTripsModalOpen(false)}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 text-stone-900 hover:text-stone-600 p-1.5 rounded-full hover:bg-stone-100 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:sm-6 stroke-[2.2]" />
        </button>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start relative">
          
          {/* Vertical Divider Line for Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -ml-px w-px bg-stone-200" />

          {/* LEFT COLUMN: Look Up a Reservation */}
          <div className="md:pr-4">
            <h2 className="text-2xl sm:text-[28px] font-normal text-stone-900 font-sans tracking-tight mb-2">
              Look Up a Reservation
            </h2>
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed mb-6 font-normal">
              Complete this form to review, modify or cancel a reservation. All fields are required.
            </p>

            {lookupError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {lookupError}
              </div>
            )}

            <form onSubmit={handleLookupSubmit} className="space-y-4">
              {/* Field 1: Confirmation Number */}
              <div className="relative border border-stone-400 rounded-md px-3.5 pt-2 pb-2 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-colors">
                <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-stone-700 font-medium">
                  Confirmation Number
                </label>
                <input
                  type="text"
                  required
                  value={confirmationNumber}
                  onChange={(e) => setConfirmationNumber(e.target.value)}
                  placeholder="e.g. MB-892401"
                  className="w-full text-sm bg-transparent outline-none text-stone-900 pt-0.5"
                />
              </div>

              {/* Field 2: Check-in Date */}
              <div className="relative border border-stone-400 rounded-md px-3.5 pt-2 pb-2 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-colors flex items-center justify-between">
                <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-stone-700 font-medium">
                  Check-in Date
                </label>
                <input
                  type={checkInDate ? "date" : "text"}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  placeholder=""
                  className="w-full text-sm bg-transparent outline-none text-stone-900 pt-0.5 cursor-pointer"
                />
                <ChevronDown className="w-4 h-4 text-stone-700 pointer-events-none shrink-0 ml-2" />
              </div>

              {/* Field 3: First Name on Reservation */}
              <div className="relative border border-stone-400 rounded-md px-3.5 pt-2 pb-2 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-colors">
                <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-stone-700 font-medium">
                  First Name on Reservation
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full text-sm bg-transparent outline-none text-stone-900 pt-0.5"
                />
              </div>

              {/* Field 4: Last Name on Reservation */}
              <div className="relative border border-stone-400 rounded-md px-3.5 pt-2 pb-2 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-colors">
                <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-stone-700 font-medium">
                  Last Name on Reservation
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full text-sm bg-transparent outline-none text-stone-900 pt-0.5"
                />
              </div>

              {/* Sample Quick Fill Button */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setConfirmationNumber('MB-892401');
                    setCheckInDate('2026-11-12');
                    setFirstName('Marriott');
                    setLastName('Member');
                  }}
                  className="text-[11px] text-stone-500 hover:text-stone-900 underline"
                >
                  Auto-fill demo reservation
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#1c1c1c] hover:bg-black text-white text-sm font-medium py-3 px-8 rounded-full transition-colors shadow-xs"
                >
                  Find Reservation
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Sign In */}
          <div className="md:pl-4">
            <h2 className="text-2xl sm:text-[28px] font-normal text-stone-900 font-sans tracking-tight mb-6">
              Sign In
            </h2>

            {signInError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {signInError}
              </div>
            )}

            {forgotPasswordNotice && (
              <div className="mb-4 p-3 bg-stone-100 border border-stone-300 text-stone-800 text-xs rounded-lg">
                {forgotPasswordNotice}
              </div>
            )}

            <form onSubmit={handleSignInSubmit} className="space-y-4">
              {/* Email or Member Number */}
              <div className="border border-stone-400 rounded-md px-3.5 py-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-colors">
                <input
                  type="text"
                  required
                  value={emailOrMemberNumber}
                  onChange={(e) => setEmailOrMemberNumber(e.target.value)}
                  placeholder="Email or Member Number"
                  className="w-full text-sm bg-transparent outline-none text-stone-900 placeholder:text-stone-500"
                />
              </div>

              {/* Password */}
              <div className="border border-stone-400 rounded-md px-3.5 py-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-colors flex items-center justify-between">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full text-sm bg-transparent outline-none text-stone-900 placeholder:text-stone-500 pr-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-stone-600 hover:text-stone-950 shrink-0"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Remember Me Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors cursor-pointer ${
                      rememberMe ? 'bg-black border-black text-white' : 'border-stone-400 bg-white'
                    }`}
                  >
                    {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs sm:text-sm text-stone-900 font-medium">
                    Remember me
                  </span>
                </label>
              </div>

              {/* Sign In Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#1c1c1c] hover:bg-black text-white text-sm font-medium py-3 px-8 rounded-full transition-colors shadow-xs"
                >
                  Sign In
                </button>
              </div>

              {/* Footer Links */}
              <div className="pt-4 space-y-2">
                <div>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs sm:text-sm text-stone-900 hover:underline font-normal text-left"
                  >
                    Forgot password
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleActivateAccount}
                    className="text-xs sm:text-sm text-stone-900 hover:underline font-normal text-left"
                  >
                    Activate online account
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
