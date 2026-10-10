import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { ImageWithFallback } from './ImageWithFallback';
import {
  Gift,
  CreditCard,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  Calendar,
  DollarSign,
  Heart,
  Search,
  Check,
  Award,
  Clock
} from 'lucide-react';

export const GiftCardsPage: React.FC = () => {
  const { goToHome, goToOffers } = useBooking();

  // Card configuration
  const [cardType, setCardType] = useState<'egift' | 'physical'>('egift');
  const [selectedDesign, setSelectedDesign] = useState<string>('burgundy');
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Recipient details
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('Now');

  // Checkout modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Balance Check Tool
  const [checkCardNumber, setCheckCardNumber] = useState('');
  const [checkPin, setCheckPin] = useState('');
  const [balanceResult, setBalanceResult] = useState<string | null>(null);

  const cardDesigns = [
    {
      id: 'burgundy',
      title: 'Signature Marriott Bonvoy',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=85',
      badge: 'Most Popular'
    },
    {
      id: 'gold',
      title: 'Ritz-Carlton Luxury Gold',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85',
      badge: 'Luxury'
    },
    {
      id: 'resort',
      title: 'Global Escapes & Resorts',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=85',
      badge: 'Resorts'
    },
    {
      id: 'celebrate',
      title: 'Celebration & Romance',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=85',
      badge: 'Special Occasion'
    }
  ];

  const presetAmounts = [50, 100, 250, 500, 1000];

  const finalAmount = isCustom && customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleBalanceCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkCardNumber.trim().length >= 8) {
      setBalanceResult(`Card ending in •••• ${checkCardNumber.slice(-4)} has an active balance of $350.00 USD. Valid at all 8,900+ participating hotels.`);
    } else {
      setBalanceResult('Please enter a valid 16-digit gift card number.');
    }
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen">
      
      {/* Hero Header */}
      <section className="relative bg-[#1c1917] text-white py-16 sm:py-24 border-b border-stone-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#8a1538] rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#ee5a24] rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-stone-200 text-xs font-semibold tracking-widest uppercase mb-6">
            <Gift className="w-3.5 h-3.5 text-[#ee5a24]" />
            <span>Official Marriott Bonvoy Gift Cards</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-6 leading-tight">
            Give the Gift of Extraordinary Travel
          </h1>

          <p className="text-stone-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Redeemable toward stays, luxury spa rituals, Michelin-recognized dining, and unforgettable experiences across our global portfolio.
          </p>
        </div>
      </section>

      {/* Main Gift Card Customizer */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Card Customization Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-sm">
            
            {/* Step 1: Format Selector */}
            <div className="mb-8 pb-6 border-b border-stone-100">
              <label className="text-xs uppercase tracking-wider text-stone-500 font-bold block mb-3">
                1. Select Delivery Format
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCardType('egift')}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    cardType === 'egift'
                      ? 'border-[#8a1538] bg-[#8a1538]/5 text-stone-900 ring-1 ring-[#8a1538]'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <Send className={`w-5 h-5 ${cardType === 'egift' ? 'text-[#8a1538]' : 'text-stone-400'}`} />
                  <div>
                    <div className="font-bold text-xs sm:text-sm">eGift Card</div>
                    <div className="text-[11px] text-stone-500">Instant Email Delivery</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setCardType('physical')}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    cardType === 'physical'
                      ? 'border-[#8a1538] bg-[#8a1538]/5 text-stone-900 ring-1 ring-[#8a1538]'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 ${cardType === 'physical' ? 'text-[#8a1538]' : 'text-stone-400'}`} />
                  <div>
                    <div className="font-bold text-xs sm:text-sm">Physical Card</div>
                    <div className="text-[11px] text-stone-500">Premium Gift Box by Mail</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Choose Design */}
            <div className="mb-8 pb-6 border-b border-stone-100">
              <label className="text-xs uppercase tracking-wider text-stone-500 font-bold block mb-3">
                2. Choose Card Design
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cardDesigns.map((design) => (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setSelectedDesign(design.id)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all group text-left ${
                      selectedDesign === design.id
                        ? 'border-[#8a1538] ring-2 ring-[#8a1538]/20 shadow-md'
                        : 'border-transparent hover:border-stone-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="h-20 w-full overflow-hidden bg-stone-100">
                      <ImageWithFallback
                        src={design.image}
                        alt={design.title}
                        fallbackTitle={design.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-2 bg-white text-[10px] font-medium text-stone-800 truncate">
                      {design.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Value */}
            <div className="mb-8 pb-6 border-b border-stone-100">
              <label className="text-xs uppercase tracking-wider text-stone-500 font-bold block mb-3">
                3. Select Card Amount (USD)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setIsCustom(false);
                    }}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                      !isCustom && selectedAmount === amt
                        ? 'bg-[#8a1538] text-white border-[#8a1538] shadow-xs'
                        : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsCustom(true)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                    isCustom
                      ? 'bg-[#8a1538] text-white border-[#8a1538] shadow-xs'
                      : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  Custom
                </button>
              </div>

              {isCustom && (
                <div className="relative mt-3">
                  <span className="absolute left-4 top-3 text-stone-400 font-bold">$</span>
                  <input
                    type="number"
                    min="25"
                    max="5000"
                    placeholder="Enter amount between $25 and $5,000"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#8a1538] focus:ring-1 focus:ring-[#8a1538]"
                  />
                </div>
              )}
            </div>

            {/* Step 4: Recipient Details */}
            <form onSubmit={handlePurchase} className="space-y-4">
              <label className="text-xs uppercase tracking-wider text-stone-500 font-bold block">
                4. Recipient & Message
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-stone-600 font-medium mb-1">Recipient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#8a1538]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-stone-600 font-medium mb-1">Recipient Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#8a1538]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-stone-600 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#8a1538]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-600 font-medium mb-1">Personal Message (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Wishing you unforgettable journeys and relaxing getaways!"
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#8a1538]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-4 bg-[#8a1538] hover:bg-[#6e0f2b] text-white text-xs uppercase tracking-widest font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout · ${finalAmount.toLocaleString()} USD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>

          {/* Right Column: Live Card Preview & Balance Checker */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Live Card Preview Box */}
            <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl border border-stone-800 shadow-xl relative overflow-hidden">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#ee5a24] font-bold mb-4">
                Live Card Preview
              </div>

              {/* Card Surface */}
              <div className="relative h-56 rounded-xl overflow-hidden shadow-2xl border border-white/20 p-6 flex flex-col justify-between">
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={cardDesigns.find(d => d.id === selectedDesign)?.image || cardDesigns[0].image}
                    alt="Gift Card"
                    fallbackTitle="Marriott Bonvoy Gift Card"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/30" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                    MARRIOTT BONVOY™
                  </span>
                  <span className="font-mono text-xs text-white/80">
                    {cardType === 'egift' ? 'eGift Card' : 'Physical Card'}
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-white mb-1">
                    ${finalAmount.toLocaleString()} USD
                  </div>
                  <div className="text-xs text-stone-200">
                    {recipientName ? `For: ${recipientName}` : 'For: Lucky Traveler'}
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ee5a24]" />
                  <span>Never expires · No maintenance fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ee5a24]" />
                  <span>Valid for stays, dining, spa treatments, and golf</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#ee5a24]" />
                  <span>Redeemable worldwide across 30+ hotel brands</span>
                </div>
              </div>
            </div>

            {/* Check Gift Card Balance Tool */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-900 font-bold mb-3">
                <Search className="w-4 h-4 text-[#8a1538]" />
                <span>Check Gift Card Balance</span>
              </div>
              <p className="text-xs text-stone-500 mb-4">
                Already have a Marriott Bonvoy gift card? Check your remaining balance anytime.
              </p>

              <form onSubmit={handleBalanceCheck} className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="16-digit Card Number"
                    value={checkCardNumber}
                    onChange={(e) => setCheckCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#8a1538]"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="4-digit Security PIN"
                    value={checkPin}
                    onChange={(e) => setCheckPin(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#8a1538]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Check Balance
                </button>
              </form>

              {balanceResult && (
                <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs leading-relaxed">
                  {balanceResult}
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl border border-stone-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              Gift Card Order Confirmed!
            </h3>

            <p className="text-stone-600 text-xs mb-6 leading-relaxed">
              Thank you! Your Marriott Bonvoy ${finalAmount.toLocaleString()} USD Gift Card has been issued for <strong>{recipientName || 'the recipient'}</strong>. A confirmation and digital receipt have been sent to {recipientEmail || 'your email'}.
            </p>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700 mb-6 text-left space-y-1 font-mono">
              <div>Card: •••• •••• •••• 8842</div>
              <div>Amount: ${finalAmount.toLocaleString()} USD</div>
              <div>Status: Active & Ready to Redeem</div>
            </div>

            <button
              onClick={() => {
                setIsSuccessModalOpen(false);
                goToHome();
              }}
              className="w-full py-3 bg-[#8a1538] hover:bg-[#6e0f2b] text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors cursor-pointer"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
