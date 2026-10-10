import React, { useState } from 'react';
import { BONVOY_TIERS, BONVOY_MOMENTS, BonvoyTierDetail } from '../data/membership';
import { ImageWithFallback } from './ImageWithFallback';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Calculator,
  Gift,
  CheckCircle2,
  ArrowRight,
  Zap,
  CreditCard,
  Crown,
  ChevronRight
} from 'lucide-react';

export const MembershipPage: React.FC = () => {
  const { setIsAuthModalOpen, setAuthModalTab } = useBooking();
  const { user, isAuthenticated } = useAuth();

  const [activeTierId, setActiveTierId] = useState<string>('platinum-elite');
  const [calcNights, setCalcNights] = useState<number>(4);
  const [calcRoomRate, setCalcRoomRate] = useState<number>(750);
  const [calcTier, setCalcTier] = useState<string>('platinum-elite');

  const selectedTier = BONVOY_TIERS.find(t => t.id === activeTierId) || BONVOY_TIERS[3];
  const calculatorTier = BONVOY_TIERS.find(t => t.id === calcTier) || BONVOY_TIERS[3];

  // Point calculations
  const totalSpend = calcNights * calcRoomRate;
  const basePoints = totalSpend * 10;
  const bonusPoints = Math.round(basePoints * (calculatorTier.bonusPointsPercent / 100));
  const totalPoints = basePoints + bonusPoints;

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      {/* Hero Header */}
      <div className="bg-stone-900 text-white relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
            alt="Marriott Bonvoy Membership"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-radial from-transparent to-stone-900/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-amber-400 mb-3 block">
            The World’s Premier Travel Program
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-4">
            Marriott Bonvoy®
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-8">
            One program. Extraordinary hotel brands worldwide. Earn points on every stay, unlock complimentary room upgrades, late checkouts, and redeem for once-in-a-lifetime VIP Moments.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setAuthModalTab('register');
                  setIsAuthModalOpen(true);
                }}
                className="px-8 py-3.5 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
              >
                Join for Free
              </button>
              <button
                onClick={() => {
                  setAuthModalTab('signin');
                  setIsAuthModalOpen(true);
                }}
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all backdrop-blur-md border border-white/20"
              >
                Member Sign In
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>
                Welcome, {user?.firstName} · {user?.tier} Member ({user?.points.toLocaleString()} Points)
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Tier Hierarchy & Benefits Selector */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8a1538] block mb-2">
              Elite Status Tiers
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">
              Ascend to Extraordinary Privileges
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Select any tier to explore qualifying requirements and signature hospitality benefits.
            </p>
          </div>

          {/* Tier Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {BONVOY_TIERS.map(tier => (
              <button
                key={tier.id}
                onClick={() => setActiveTierId(tier.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                  activeTierId === tier.id
                    ? 'bg-[#8a1538] text-white shadow-md scale-105'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {tier.name}
              </button>
            ))}
          </div>

          {/* Active Tier Highlight Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-md max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6 mb-8">
              <div>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-2 ${selectedTier.badgeBg}`}>
                  {selectedTier.name}
                </span>
                <h3 className="font-serif text-3xl font-bold text-stone-900">{selectedTier.name}</h3>
                <p className="text-xs text-stone-500 font-medium">{selectedTier.tagline}</p>
              </div>

              <div className="text-left sm:text-right bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Requirement</span>
                <span className="font-serif text-lg font-bold text-stone-900 block">{selectedTier.nightsRequired}</span>
                {selectedTier.spendRequired && (
                  <span className="text-[10px] text-[#8a1538] font-semibold">{selectedTier.spendRequired}</span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-stone-900">
                Signature Member Privileges
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedTier.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-[#8a1538] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Points Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-xs max-w-4xl mx-auto">
          <div className="max-w-xl mb-8">
            <span className="text-xs uppercase tracking-wider font-bold text-[#8a1538] block mb-1">
              Rewards Calculator
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              Estimate Points Earned on Your Stays
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Calculate the total Marriott Bonvoy points you will earn on your next journey based on your Elite status level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs">
            {/* Status Level */}
            <div>
              <label className="font-bold text-stone-700 block mb-2 uppercase tracking-wider">
                Elite Status Tier
              </label>
              <select
                value={calcTier}
                onChange={(e) => setCalcTier(e.target.value)}
                className="w-full border border-stone-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-[#8a1538]"
              >
                {BONVOY_TIERS.map(t => (
                  <option key={t.id} value={t.id}>{t.name} (+{t.bonusPointsPercent}% bonus)</option>
                ))}
              </select>
            </div>

            {/* Room Rate */}
            <div>
              <label className="font-bold text-stone-700 block mb-2 uppercase tracking-wider">
                Average Nightly Rate ($ USD)
              </label>
              <input
                type="number"
                min="50"
                step="50"
                value={calcRoomRate}
                onChange={(e) => setCalcRoomRate(Number(e.target.value))}
                className="w-full border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8a1538]"
              />
            </div>

            {/* Number of Nights */}
            <div>
              <label className="font-bold text-stone-700 block mb-2 uppercase tracking-wider">
                Number of Nights
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={calcNights}
                onChange={(e) => setCalcNights(Number(e.target.value))}
                className="w-full border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8a1538]"
              />
            </div>
          </div>

          {/* Calculator Output */}
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold block mb-1">Base Points (10 pts/$)</span>
              <span className="font-serif text-xl font-bold text-stone-800">
                {basePoints.toLocaleString()}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-stone-400 uppercase font-bold block mb-1">
                Tier Bonus (+{calculatorTier.bonusPointsPercent}%)
              </span>
              <span className="font-serif text-xl font-bold text-[#8a1538]">
                +{bonusPoints.toLocaleString()}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs">
              <span className="text-[10px] text-stone-500 uppercase font-bold block mb-1">Total Points Earned</span>
              <span className="font-serif text-2xl font-bold text-[#8a1538]">
                {totalPoints.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Marriott Bonvoy Moments */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8a1538] block mb-2">
              Unrivaled Experiences
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">
              Marriott Bonvoy Moments®
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Redeem your accumulated points for money-can’t-buy access to world-class culinary, sports, and cultural spectacles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BONVOY_MOMENTS.map(moment => (
              <div
                key={moment.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <ImageWithFallback
                    src={moment.image}
                    alt={moment.title}
                    fallbackTitle={moment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-black/20" />

                  <div className="absolute top-3 left-3">
                    <span className="bg-[#8a1538] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {moment.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-[10px] uppercase font-semibold text-stone-300">{moment.location}</p>
                    <h3 className="font-serif text-lg font-bold leading-snug">{moment.title}</h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-stone-600 mb-4">{moment.description}</p>
                    <span className="text-[10px] text-stone-400 font-semibold block mb-4">
                      Partner: {moment.verifiedPartner}
                    </span>
                  </div>

                  <div className="border-t border-stone-200 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Redemption</span>
                      <span className="font-serif text-base font-bold text-stone-900">
                        {moment.pointsStartingBid.toLocaleString()} pts
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        if (!isAuthenticated) {
                          setAuthModalTab('signin');
                          setIsAuthModalOpen(true);
                        } else {
                          alert(`Thank you. You have placed an inquiry for "${moment.title}". Our Bonvoy Moments concierge will follow up!`);
                        }
                      }}
                      className="px-4 py-2 bg-stone-900 hover:bg-[#8a1538] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                    >
                      Redeem Points
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
