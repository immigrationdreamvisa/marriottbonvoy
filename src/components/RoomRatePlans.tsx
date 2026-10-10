import React, { useState } from 'react';
import { RatePlan, RoomType } from '../types';
import {
  ShieldCheck,
  Check,
  Coffee,
  Info,
  X,
  Clock,
  CheckCircle2,
  Percent
} from 'lucide-react';

interface RoomRatePlansProps {
  room: RoomType;
  selectedRoomId: string;
  selectedRatePlanId: string;
  onSelectRate: (roomId: string, ratePlanId: string) => void;
  nightsCount: number;
}

export const RoomRatePlans: React.FC<RoomRatePlansProps> = ({
  room,
  selectedRoomId,
  selectedRatePlanId,
  onSelectRate,
  nightsCount
}) => {
  const [activeDetailsPlan, setActiveDetailsPlan] = useState<RatePlan | null>(null);

  return (
    <div className="bg-[#faf9f6] p-5 sm:p-6 border-t border-stone-200/80 space-y-3 rounded-b-2xl">
      
      <div className="flex items-center justify-between pb-1">
        <span className="text-[11px] uppercase tracking-wider text-stone-600 font-bold block">
          Rate Plans for {room.name}:
        </span>
      </div>

      {/* Clean Luxury Rate Plan Cards */}
      <div className="space-y-3">
        {room.ratePlans.map((ratePlan) => {
          const isChosen = selectedRoomId === room.id && selectedRatePlanId === ratePlan.id;
          const isMemberPlan = ratePlan.originalPricePerNight || ratePlan.name.toLowerCase().includes('member');

          return (
            <div
              key={ratePlan.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isChosen
                  ? 'bg-white border-[#8a1538] ring-1 ring-[#8a1538] shadow-xs'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              {/* Left Side: Plan Title, Tags, Description & Perks */}
              <div className="space-y-1.5 max-w-xl flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-serif text-base font-bold text-stone-900">
                    {ratePlan.name}
                  </span>

                  {ratePlan.includesBreakfast && (
                    <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      <Coffee className="w-3 h-3 text-emerald-600" />
                      Breakfast Included
                    </span>
                  )}

                  {isMemberPlan && (
                    <span className="inline-flex items-center gap-1 text-amber-900 text-xs font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Percent className="w-3 h-3 text-[#8a1538]" />
                      Member Special
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {ratePlan.description}
                </p>

                {/* Inclusions Perks Row */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[11px] text-stone-500">
                  {ratePlan.perks.map((p, pIdx) => (
                    <span key={pIdx} className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#8a1538]" />
                      <span>{p}</span>
                    </span>
                  ))}
                </div>

                {/* Rate Policy Modal Link */}
                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveDetailsPlan(ratePlan)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8a1538] hover:underline cursor-pointer"
                  >
                    <Info className="w-3 h-3" />
                    <span>View Rate Policy & Terms</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Price & Action */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 min-w-[170px]">
                <div className="text-left sm:text-right">
                  {ratePlan.originalPricePerNight && (
                    <span className="text-xs text-stone-400 line-through block font-mono">
                      ${ratePlan.originalPricePerNight.toLocaleString()}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1 sm:justify-end">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                      ${ratePlan.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-stone-500">/ night</span>
                  </div>
                  <span className="text-[10px] text-stone-400 block font-normal">
                    ${(ratePlan.pricePerNight * nightsCount).toLocaleString()} total ({nightsCount}n)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectRate(room.id, ratePlan.id)}
                  className={`px-5 py-2 text-xs uppercase tracking-wider font-bold rounded-lg transition-all cursor-pointer ${
                    isChosen
                      ? 'bg-stone-900 text-white'
                      : 'bg-[#8a1538] hover:bg-[#6e0f2b] text-white shadow-xs'
                  }`}
                >
                  {isChosen ? 'Selected' : 'Select Rate'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Policy Details Modal */}
      {activeDetailsPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-serif text-base font-bold">Rate Plan Terms & Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailsPlan(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-stone-700">
              <div>
                <span className="font-bold text-stone-900 text-sm block mb-1">
                  {activeDetailsPlan.name}
                </span>
                <p className="leading-relaxed text-stone-600">
                  {activeDetailsPlan.description}
                </p>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1.5">
                <span className="font-bold text-stone-900 uppercase tracking-wider text-[10px] block flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8a1538]" />
                  Cancellation Terms
                </span>
                <p className="leading-relaxed">
                  {activeDetailsPlan.cancellationPolicy === 'free-cancellation'
                    ? `Complimentary cancellation up to ${activeDetailsPlan.cancellationDeadlineHours || 48} hours prior to 15:00 check-in time.`
                    : 'Advance purchase prepaid rate. Non-refundable upon confirmation.'}
                </p>
              </div>

              <div>
                <span className="font-bold text-stone-900 uppercase tracking-wider text-[10px] block mb-2">
                  Plan Inclusions
                </span>
                <ul className="space-y-1.5">
                  {activeDetailsPlan.perks.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{p}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Complimentary Marriott Bonvoy high-speed Wi-Fi</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveDetailsPlan(null)}
                className="px-4 py-2 text-xs font-bold text-stone-700 hover:text-stone-900 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectRate(room.id, activeDetailsPlan.id);
                  setActiveDetailsPlan(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#8a1538] text-white hover:bg-[#6e0f2b] transition-all cursor-pointer shadow-sm"
              >
                Select This Rate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
