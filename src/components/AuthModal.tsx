import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { MarriottLogo } from './MarriottLogo';
import { validateEmail, validatePhone, validateEmailOrPhone, validateRealName } from '../utils/paymentValidation';
import { X, Eye, EyeOff, CheckCircle2, ShieldCheck, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalTab, setAuthModalTab, goToMyBookings } = useBooking();
  const { signIn, signUp, authError } = useAuth();

  // Sign In / Forgot Password state
  const [identifier, setIdentifier] = useState(''); // Email or Mobile Number
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPass, setIsForgotPass] = useState(false);

  // Register state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');

  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string; actionText?: string; onAction?: () => void } | null>(null);

  if (!isAuthModalOpen) return null;

  const handleFillDemoMember = () => {
    if (authModalTab === 'signin') {
      setIdentifier('alex.hayes@bonvoy-luxury.com');
      setPassword('Marriott2026!');
    } else {
      setFirstName('Alexander');
      setLastName('Hayes');
      setSignUpEmail('alex.hayes@bonvoy-luxury.com');
      setSignUpPhone('+1 (555) 234-5678');
      setPassword('Marriott2026!');
    }
    setMessage(null);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    // 1. Strict validation for original Email OR genuine Contact Number format
    const check = validateEmailOrPhone(identifier);
    if (!check.isValid) {
      setMessage({
        type: 'error',
        text: check.error || 'Please enter an authentic, original email address or valid 10-15 digit contact number.'
      });
      return;
    }

    if (!password || password.trim().length < 4) {
      setMessage({ type: 'error', text: 'Please enter your account password.' });
      return;
    }

    // 2. Perform authentication against registered accounts
    const success = signIn(check.cleanValue, password);
    if (!success) {
      setMessage({
        type: 'error',
        text: authError || 'Invalid email or contact number. Account not found with these credentials.',
        actionText: 'Join Marriott Bonvoy Free →',
        onAction: () => {
          setAuthModalTab('register');
          setSignUpEmail(identifier.includes('@') ? identifier : '');
          setSignUpPhone(!identifier.includes('@') ? identifier : '');
          setMessage(null);
        }
      });
      return;
    }

    setMessage({ type: 'success', text: 'Signed in successfully! Welcome to Marriott Bonvoy.' });
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setMessage(null);
    }, 400);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // 1. Validate Real Name
    const nameCheck = validateRealName(firstName, lastName);
    if (!nameCheck.isValid) {
      setMessage({ type: 'error', text: nameCheck.error || 'Please provide real first and last names (letters only).' });
      return;
    }

    // 2. Validate Original Email (must be valid domain & structure)
    const emailCheck = validateEmail(signUpEmail);
    if (!emailCheck.isValid) {
      setMessage({
        type: 'error',
        text: emailCheck.error || 'Please enter a valid, original email address (e.g. name@domain.com).'
      });
      return;
    }

    // 3. Validate Original Contact Number (must be 10-15 digits)
    const phoneCheck = validatePhone(signUpPhone);
    if (!phoneCheck.isValid) {
      setMessage({
        type: 'error',
        text: phoneCheck.error || 'Please enter a valid, original contact number (10 to 15 digits).'
      });
      return;
    }

    // 4. Validate Password
    if (!password || password.length < 6) {
      setMessage({ type: 'error', text: 'Password must contain at least 6 characters.' });
      return;
    }

    // 5. Register account
    const success = signUp(firstName.trim(), lastName.trim(), signUpEmail.trim(), signUpPhone.trim(), password);
    if (!success) {
      setMessage({
        type: 'error',
        text: authError || 'Failed to create account. Please check your email and contact number.'
      });
      return;
    }

    setMessage({ type: 'success', text: `Welcome, ${firstName}! Your Marriott Bonvoy membership is active.` });
    setTimeout(() => {
      setIsAuthModalOpen(false);
      setMessage(null);
    }, 500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateEmailOrPhone(identifier);
    if (!check.isValid) {
      setMessage({ type: 'error', text: check.error || 'Please enter a valid email or contact number.' });
      return;
    }
    setMessage({ type: 'success', text: `A password reset link / SMS code has been sent to ${identifier}.` });
    setTimeout(() => {
      setIsForgotPass(false);
      setMessage(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 text-stone-900 border border-stone-200 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAuthModalOpen(false);
            setMessage(null);
          }}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-800 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Title */}
        <div className="flex flex-col items-center justify-center mb-6">
          <MarriottLogo size="md" variant="burgundy" />
          <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mt-2">
            Sign In or Join to Unlock Member Rates & Rewards
          </p>
        </div>

        {/* Tabs: Sign In vs Join */}
        {!isForgotPass && (
          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 rounded-lg text-xs font-bold">
              <button
                onClick={() => {
                  setAuthModalTab('signin');
                  setMessage(null);
                }}
                className={`py-2 rounded-md transition-colors cursor-pointer ${
                  authModalTab === 'signin' ? 'bg-white shadow text-stone-900' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthModalTab('register');
                  setMessage(null);
                }}
                className={`py-2 rounded-md transition-colors cursor-pointer ${
                  authModalTab === 'register' ? 'bg-white shadow text-stone-900' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Join Marriott Bonvoy
              </button>
            </div>

            {/* Quick Demo Autofill Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleFillDemoMember}
                className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>🧪</span>
                <span>Fill Real Demo {authModalTab === 'signin' ? 'Account' : 'Profile'}</span>
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className={`mb-4 p-3 border rounded-xl text-xs flex flex-col gap-1.5 ${
            message.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
          }`}>
            <div className="flex items-center gap-2">
              {message.type === 'error' ? <Lock className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />}
              <span>{message.text}</span>
            </div>
            {message.actionText && message.onAction && (
              <button
                type="button"
                onClick={message.onAction}
                className="text-left font-bold text-[#8a1538] hover:underline text-[11.5px] mt-0.5 flex items-center gap-1 cursor-pointer"
              >
                {message.actionText}
              </button>
            )}
          </div>
        )}

        {/* 1. Forgot Password Form */}
        {isForgotPass ? (
          <form onSubmit={handleForgotPassword} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Email or Contact Number</label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@domain.com or +1 (555) 234-5678"
                className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-[#8a1538]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[#8a1538] text-white font-bold uppercase tracking-wider rounded-lg hover:bg-[#6e0f2b] cursor-pointer"
            >
              Send Reset Code / Link
            </button>
            <button
              type="button"
              onClick={() => setIsForgotPass(false)}
              className="w-full text-center text-xs text-stone-500 hover:text-stone-900 font-semibold cursor-pointer"
            >
              Back to Sign In
            </button>
          </form>
        ) : authModalTab === 'signin' ? (
          /* 2. Sign In Form */
          <form onSubmit={handleSignIn} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Email Address or Contact Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. alex.hayes@bonvoy-luxury.com or +1 (555) 234-5678"
                  className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 pl-9 focus:outline-none focus:border-[#8a1538]"
                />
                <div className="absolute left-3 top-2.5 text-stone-400">
                  {identifier.includes('@') ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                </div>
              </div>
              <span className="text-[10.5px] text-stone-400 mt-1 block">
                Requires an authentic original email address or valid 10-15 digit contact number.
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-stone-700 font-semibold">Password *</label>
                <button
                  type="button"
                  onClick={() => setIsForgotPass(true)}
                  className="text-[11px] text-[#8a1538] hover:underline font-semibold cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 pr-10 focus:outline-none focus:border-[#8a1538]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Sign In
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAuthModalOpen(false);
                  goToMyBookings();
                }}
                className="text-stone-600 hover:text-[#8a1538] text-[11px] font-semibold cursor-pointer"
              >
                Find a reservation without signing in →
              </button>
            </div>
          </form>
        ) : (
          /* 3. Register / Join Form */
          <form onSubmit={handleSignUp} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Alexander"
                  className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-[#8a1538]"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Hayes"
                  className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 focus:outline-none focus:border-[#8a1538]"
                />
              </div>
            </div>

            {/* Original Email Address */}
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Original Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="e.g. yourname@domain.com"
                  className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 pl-9 focus:outline-none focus:border-[#8a1538]"
                />
                <div className="absolute left-3 top-2.5 text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10.5px] text-stone-400 mt-1 block">
                Must be an authentic email address (e.g. user@gmail.com).
              </span>
            </div>

            {/* Original Contact Number */}
            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                Original Contact Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={signUpPhone}
                  onChange={(e) => setSignUpPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 234-5678 or 10-15 digits"
                  className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 pl-9 focus:outline-none focus:border-[#8a1538]"
                />
                <div className="absolute left-3 top-2.5 text-stone-400">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
              <span className="text-[10.5px] text-stone-400 mt-1 block">
                Must be a valid 10 to 15 digit contact phone number.
              </span>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Create Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-[#faf9f6] border border-stone-300 rounded-lg p-2.5 pr-10 focus:outline-none focus:border-[#8a1538]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg text-[11px] text-stone-600 space-y-1 border border-stone-200">
              <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8a1538]" />
                <span>Instant Member Privileges:</span>
              </span>
              <p>✓ Exclusive Member Rates & free Wi-Fi</p>
              <p>✓ Earn points toward complimentary stays</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Join Marriott Bonvoy Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
