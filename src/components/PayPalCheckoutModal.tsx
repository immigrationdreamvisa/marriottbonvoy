import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  X,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Building,
  HelpCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface PayPalCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentInfo: { transactionId: string; fundingSource: string; paypalEmail: string }) => void;
  totalAmount: number;
  propertyName: string;
  guestName: string;
  guestEmail: string;
}

export const PayPalCheckoutModal: React.FC<PayPalCheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  totalAmount,
  propertyName,
  guestName,
  guestEmail
}) => {
  const [step, setStep] = useState<'login' | 'funding' | 'processing' | 'approved'>('funding');
  const [email, setEmail] = useState(guestEmail || 'member@bonvoy-traveler.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedFunding, setSelectedFunding] = useState<'balance' | 'marriott-card' | 'chase-card' | 'pay-in-4'>('marriott-card');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('Connecting to PayPal Network...');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('funding');
  };

  const handlePayNow = () => {
    setStep('processing');
    setProcessingStatus('Connecting to PayPal Network...');

    setTimeout(() => {
      setProcessingStatus('Authorizing payment with bank...');
    }, 800);

    setTimeout(() => {
      setProcessingStatus('Payment Authorized & Confirmed!');
      setStep('approved');
    }, 1800);

    setTimeout(() => {
      const generatedTxId = `PAYID-${Math.random().toString(36).substring(2, 9).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;
      
      const fundingLabels: Record<string, string> = {
        'balance': 'PayPal Balance ($3,850.00 USD)',
        'marriott-card': 'Marriott Bonvoy Premier Card (•••• 8842)',
        'chase-card': 'Chase Sapphire Reserve (•••• 4128)',
        'pay-in-4': `PayPal Pay in 4 ($${(totalAmount / 4).toFixed(2)}/biweekly)`
      };

      onSuccess({
        transactionId: generatedTxId,
        fundingSource: fundingLabels[selectedFunding] || 'PayPal Account',
        paypalEmail: email
      });
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* PayPal Authentic Window Box */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900 flex flex-col font-sans">
        
        {/* Top Header with Authentic PayPal Brand Bar */}
        <div className="bg-[#003087] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* PayPal Dual-Tone Monogram */}
            <div className="flex items-baseline font-serif font-black text-xl italic tracking-tighter">
              <span className="text-[#0070ba]">Pay</span>
              <span className="text-[#00cfe8]">Pal</span>
            </div>
            <span className="text-white/40 text-xs">|</span>
            <div className="flex items-center gap-1 text-[11px] text-white/90 font-medium">
              <Lock className="w-3 h-3 text-[#00cfe8]" />
              <span>Checkout</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-white/80 font-mono hidden sm:inline">
              ${totalAmount.toLocaleString()} USD
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Merchant & Order Header Banner */}
        <div className="bg-[#f5f7fa] px-5 py-3 border-b border-stone-200 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Merchant</span>
              <span className="font-bold text-stone-900 text-sm">Marriott International, Inc.</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Total Due</span>
              <span className="font-serif font-bold text-base text-[#003087]">
                ${totalAmount.toLocaleString()} <span className="text-xs font-normal text-stone-500">USD</span>
              </span>
            </div>
          </div>

          {/* Toggle Order Details */}
          <button
            type="button"
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="mt-2 text-[11px] text-[#0070ba] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Hotel Stay: {propertyName}</span>
            {showOrderSummary ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showOrderSummary && (
            <div className="mt-2.5 pt-2.5 border-t border-stone-200/80 text-[11px] text-stone-600 space-y-1">
              <div className="flex justify-between">
                <span>Guest:</span>
                <span className="font-semibold text-stone-900">{guestName}</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction Type:</span>
                <span>Guaranteed Hotel Reservation</span>
              </div>
              <div className="flex justify-between">
                <span>Protection:</span>
                <span className="text-emerald-700 font-medium">PayPal Buyer Protection Eligible</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body Based on Step */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto max-h-[65vh]">
          
          {/* STEP 1: PayPal Sign-In Form */}
          {step === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="text-center pb-2">
                <h3 className="font-bold text-lg text-stone-900">Sign in to your PayPal account</h3>
                <p className="text-xs text-stone-500 mt-0.5">Enter your email and password to continue</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Email or Mobile Number</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white border border-stone-300 rounded-xl p-3 focus:outline-none focus:border-[#0070ba] focus:ring-1 focus:ring-[#0070ba]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white border border-stone-300 rounded-xl p-3 focus:outline-none focus:border-[#0070ba] focus:ring-1 focus:ring-[#0070ba]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#0070ba] focus:ring-[#0070ba]"
                  />
                  <label htmlFor="remember" className="text-[11px] text-stone-600 cursor-pointer">
                    Stay logged in for faster checkout on this device
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0070ba] hover:bg-[#003087] text-white font-bold rounded-full text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer mt-2"
              >
                Log In
              </button>

              <div className="text-center pt-2">
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#0070ba] hover:underline">
                  Having trouble logging in?
                </a>
              </div>
            </form>
          )}

          {/* STEP 2: Choose Payment Source (PayPal Wallet) */}
          {step === 'funding' && (
            <div className="space-y-4 text-xs">
              
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#003087] text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">Logged in as {email}</span>
                    <button
                      type="button"
                      onClick={() => setStep('login')}
                      className="text-[10px] text-[#0070ba] hover:underline"
                    >
                      Change Account
                    </button>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Choose a way to pay
                </label>

                {/* Funding Options List */}
                <div className="space-y-2.5">
                  
                  {/* 1. Marriott Bonvoy Preferred Card */}
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      selectedFunding === 'marriott-card'
                        ? 'border-[#0070ba] bg-blue-50/40 ring-1 ring-[#0070ba] shadow-2xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="funding"
                        checked={selectedFunding === 'marriott-card'}
                        onChange={() => setSelectedFunding('marriott-card')}
                        className="text-[#0070ba] focus:ring-[#0070ba]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#8a1538]" />
                          <span className="font-bold text-stone-900">Marriott Bonvoy Premier Visa</span>
                        </div>
                        <span className="text-[11px] text-stone-500 block">
                          Debit / Credit ···· 8842 (Earn 6x Bonvoy Points)
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#8a1538] bg-[#8a1538]/10 px-2 py-0.5 rounded">
                      Preferred
                    </span>
                  </label>

                  {/* 2. PayPal Balance */}
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      selectedFunding === 'balance'
                        ? 'border-[#0070ba] bg-blue-50/40 ring-1 ring-[#0070ba] shadow-2xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="funding"
                        checked={selectedFunding === 'balance'}
                        onChange={() => setSelectedFunding('balance')}
                        className="text-[#0070ba] focus:ring-[#0070ba]"
                      />
                      <div>
                        <span className="font-bold text-stone-900 block">PayPal Balance</span>
                        <span className="text-[11px] text-stone-500 block">$3,850.00 USD available</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700">Instant</span>
                  </label>

                  {/* 3. Chase Sapphire Reserve */}
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      selectedFunding === 'chase-card'
                        ? 'border-[#0070ba] bg-blue-50/40 ring-1 ring-[#0070ba] shadow-2xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="funding"
                        checked={selectedFunding === 'chase-card'}
                        onChange={() => setSelectedFunding('chase-card')}
                        className="text-[#0070ba] focus:ring-[#0070ba]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-blue-900" />
                          <span className="font-bold text-stone-900">Chase Sapphire Reserve</span>
                        </div>
                        <span className="text-[11px] text-stone-500 block">Visa Infinite ···· 4128</span>
                      </div>
                    </div>
                  </label>

                  {/* 4. PayPal Pay in 4 */}
                  <label
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      selectedFunding === 'pay-in-4'
                        ? 'border-[#0070ba] bg-blue-50/40 ring-1 ring-[#0070ba] shadow-2xs'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="funding"
                        checked={selectedFunding === 'pay-in-4'}
                        onChange={() => setSelectedFunding('pay-in-4')}
                        className="text-[#0070ba] focus:ring-[#0070ba]"
                      />
                      <div>
                        <span className="font-bold text-stone-900 block">PayPal Pay in 4</span>
                        <span className="text-[11px] text-stone-600 block">
                          4 interest-free payments of ${(totalAmount / 4).toFixed(2)} USD every 2 weeks
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded">
                      0% Interest
                    </span>
                  </label>

                </div>
              </div>

              {/* PayPal Protection Notice */}
              <div className="p-3 bg-[#f5f7fa] rounded-xl flex items-start gap-2.5 text-[11px] text-stone-600 border border-stone-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Your purchase is backed by <strong>PayPal Buyer Protection</strong>. If there is an issue with your hotel reservation, you are fully covered.
                </span>
              </div>

              {/* Pay Now Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePayNow}
                  className="w-full py-3.5 bg-[#ffc439] hover:bg-[#f4b628] text-stone-950 font-black rounded-full text-sm uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer border border-[#f0af20]"
                >
                  <Lock className="w-4 h-4 text-stone-900" />
                  <span>Complete Purchase · ${totalAmount.toLocaleString()} USD</span>
                </button>
              </div>

              <div className="text-center text-[10px] text-stone-400">
                By clicking Complete Purchase, you authorize PayPal to charge your selected payment method.
              </div>

            </div>
          )}

          {/* STEP 3 & 4: Processing State Animation */}
          {(step === 'processing' || step === 'approved') && (
            <div className="py-10 text-center space-y-5">
              {step === 'processing' ? (
                <div className="relative w-16 h-16 mx-auto">
                  <div className="w-16 h-16 rounded-full border-4 border-stone-200 border-t-[#0070ba] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-[#003087]">
                    P
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-in zoom-in-50 duration-300">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              )}

              <div>
                <h4 className="font-bold text-stone-900 text-base">
                  {step === 'approved' ? 'Payment Approved!' : 'Authorizing with PayPal'}
                </h4>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  {processingStatus}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 max-w-xs mx-auto">
                <div className="flex justify-between pb-1 border-b border-stone-200">
                  <span>Merchant:</span>
                  <span className="font-bold text-stone-900">Marriott Bonvoy</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Amount:</span>
                  <span className="font-mono font-bold text-stone-900">${totalAmount.toLocaleString()} USD</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-[#f5f7fa] px-5 py-2.5 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-400 font-mono">
          <span>PayPal Inc. (US) Secure SSL</span>
          <span>Terms & Privacy</span>
        </div>

      </div>

    </div>
  );
};
