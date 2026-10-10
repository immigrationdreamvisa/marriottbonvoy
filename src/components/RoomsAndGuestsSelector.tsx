import React, { useState } from 'react';
import { Minus, Plus, Users, Check, AlertCircle, Heart, User, Baby } from 'lucide-react';

interface RoomsAndGuestsSelectorProps {
  rooms: number;
  adults: number;
  seniors?: number;
  childrenCount: number;
  childrenAges: number[];
  onChange: (data: {
    rooms: number;
    adults: number;
    seniors?: number;
    children: number;
    childrenAges: number[];
  }) => void;
  onClose: () => void;
}

export const RoomsAndGuestsSelector: React.FC<RoomsAndGuestsSelectorProps> = ({
  rooms,
  adults,
  seniors = 0,
  childrenCount,
  childrenAges,
  onChange,
  onClose
}) => {
  const [localRooms, setLocalRooms] = useState(rooms);
  const [localAdults, setLocalAdults] = useState(adults);
  const [localSeniors, setLocalSeniors] = useState(seniors);
  const [localChildren, setLocalChildren] = useState(childrenCount);
  const [localAges, setLocalAges] = useState<number[]>(() => {
    if (childrenAges && childrenAges.length === childrenCount) {
      return childrenAges;
    }
    return Array.from({ length: childrenCount }, (_, i) => childrenAges[i] ?? 7);
  });

  // Occupancy rules:
  // - Minimum 1 room, maximum 5 rooms
  // - Minimum 1 responsible adult or senior (localAdults + localSeniors >= 1)
  // - Maximum total adults/seniors: localRooms * 4 (capped at 10)
  // - Maximum children: localRooms * 3 (capped at 6)
  const totalAdultsAndSeniors = localAdults + localSeniors;
  const maxAdultsAndSeniorsAllowed = Math.min(10, localRooms * 4);
  const maxChildrenAllowed = Math.min(6, localRooms * 3);
  const totalGuests = totalAdultsAndSeniors + localChildren;

  const handleUpdateChildren = (newCount: number) => {
    setLocalChildren(newCount);
    setLocalAges(prev => {
      if (newCount > prev.length) {
        const added = Array.from({ length: newCount - prev.length }, () => 7);
        return [...prev, ...added];
      } else {
        return prev.slice(0, newCount);
      }
    });
  };

  const handleAgeChange = (index: number, age: number) => {
    setLocalAges(prev => {
      const updated = [...prev];
      updated[index] = age;
      return updated;
    });
  };

  const handleDone = () => {
    onChange({
      rooms: localRooms,
      adults: localAdults,
      seniors: localSeniors,
      children: localChildren,
      childrenAges: localAges
    });
    onClose();
  };

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="bg-white border border-stone-200 rounded-2xl shadow-2xl p-5 w-full sm:w-[410px] text-stone-900 animate-in fade-in zoom-in-95 select-none font-sans"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#8a1538]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
            Rooms & Guests Selection
          </h4>
        </div>
        <span className="text-[11px] font-semibold text-[#8a1538] bg-[#8a1538]/10 px-2 py-0.5 rounded-full">
          {localRooms} {localRooms === 1 ? 'Room' : 'Rooms'} · {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
        </span>
      </div>

      <div className="space-y-3.5 text-xs">
        
        {/* 1. Rooms */}
        <div className="flex items-center justify-between py-1 border-b border-stone-100 pb-3">
          <div>
            <p className="font-bold text-stone-900 text-sm">Rooms</p>
            <p className="text-[11px] text-stone-500">Up to 5 rooms per reservation</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={localRooms <= 1}
              onClick={() => {
                const nextRooms = localRooms - 1;
                setLocalRooms(nextRooms);
                if (localAdults + localSeniors > nextRooms * 4) {
                  setLocalAdults(Math.max(1, nextRooms * 4 - localSeniors));
                }
                if (localChildren > nextRooms * 3) {
                  handleUpdateChildren(nextRooms * 3);
                }
              }}
              className="w-8 h-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Decrease Rooms"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-sm font-bold text-stone-900 w-4 text-center">
              {localRooms}
            </span>
            <button
              type="button"
              disabled={localRooms >= 5}
              onClick={() => setLocalRooms(r => r + 1)}
              className="w-8 h-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Increase Rooms"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Adults (Ages 18-61) */}
        <div className="flex items-center justify-between py-1 border-b border-stone-100 pb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-900 text-sm">Adults</span>
              <span className="text-[10px] text-stone-500 font-medium">(Ages 18–61)</span>
            </div>
            <p className="text-[11px] text-stone-500">Standard adult occupancy</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={localAdults <= 0 || (localAdults === 1 && localSeniors === 0)}
              onClick={() => setLocalAdults(a => Math.max(0, a - 1))}
              className="w-8 h-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Decrease Adults"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-sm font-bold text-stone-900 w-4 text-center">
              {localAdults}
            </span>
            <button
              type="button"
              disabled={totalAdultsAndSeniors >= maxAdultsAndSeniorsAllowed}
              onClick={() => setLocalAdults(a => a + 1)}
              className="w-8 h-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Increase Adults"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. Seniors / Older Adults (Ages 62+) */}
        <div className="flex items-center justify-between py-1 border-b border-stone-100 pb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-900 text-sm">Seniors / Older Adults</span>
              <span className="text-[10px] text-[#8a1538] font-bold bg-[#8a1538]/10 px-1.5 py-0.5 rounded">
                62+ Yrs
              </span>
            </div>
            <p className="text-[11px] text-stone-500">Eligible for special Senior Member discounts</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={localSeniors <= 0 || (localSeniors === 1 && localAdults === 0)}
              onClick={() => setLocalSeniors(s => Math.max(0, s - 1))}
              className="w-8 h-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Decrease Seniors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-sm font-bold text-stone-900 w-4 text-center">
              {localSeniors}
            </span>
            <button
              type="button"
              disabled={totalAdultsAndSeniors >= maxAdultsAndSeniorsAllowed}
              onClick={() => setLocalSeniors(s => s + 1)}
              className="w-8 h-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Increase Seniors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4. Children / Kids (Ages 0-17) */}
        <div className="flex items-center justify-between py-1">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-900 text-sm">Children & Kids</span>
              <span className="text-[10px] text-stone-500 font-medium">(Ages 0–17)</span>
            </div>
            <p className="text-[11px] text-stone-500">Specify ages for complimentary bedding</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={localChildren <= 0}
              onClick={() => handleUpdateChildren(Math.max(0, localChildren - 1))}
              className="w-8 h-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Decrease Children"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-sm font-bold text-stone-900 w-4 text-center">
              {localChildren}
            </span>
            <button
              type="button"
              disabled={localChildren >= maxChildrenAllowed}
              onClick={() => handleUpdateChildren(Math.min(maxChildrenAllowed, localChildren + 1))}
              className="w-8 h-8 rounded-full border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Increase Children"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Individual Children Ages (Required when children > 0) */}
        {localChildren > 0 && (
          <div className="pt-3 border-t border-stone-100 bg-[#faf9f6] p-3 rounded-xl border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-700">
                Children's Ages (at check-in)
              </span>
              <span className="text-[10px] text-stone-500">Required for bedding & breakfast</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {Array.from({ length: localChildren }).map((_, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs shadow-2xs">
                  <span className="text-stone-600 font-medium">Child {idx + 1}</span>
                  <select
                    value={localAges[idx] ?? 7}
                    onChange={(e) => handleAgeChange(idx, Number(e.target.value))}
                    className="bg-stone-50 border border-stone-200 rounded px-2 py-0.5 text-stone-900 font-semibold focus:outline-none focus:border-[#8a1538] text-xs cursor-pointer"
                  >
                    <option value={0}>Under 1 yr (Infant)</option>
                    <option value={1}>1 yr (Toddler)</option>
                    <option value={2}>2 yrs (Toddler)</option>
                    <option value={3}>3 yrs</option>
                    <option value={4}>4 yrs</option>
                    <option value={5}>5 yrs</option>
                    <option value={6}>6 yrs</option>
                    <option value={7}>7 yrs</option>
                    <option value={8}>8 yrs</option>
                    <option value={9}>9 yrs</option>
                    <option value={10}>10 yrs</option>
                    <option value={11}>11 yrs</option>
                    <option value={12}>12 yrs</option>
                    <option value={13}>13 yrs (Teen)</option>
                    <option value={14}>14 yrs (Teen)</option>
                    <option value={15}>15 yrs (Teen)</option>
                    <option value={16}>16 yrs (Teen)</option>
                    <option value={17}>17 yrs (Teen)</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Occupancy notice */}
        <div className="pt-2 text-[11px] text-stone-500 flex items-start gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-[#8a1538] shrink-0 mt-0.5" />
          <span>Maximum occupancy varies by room type. Rates reflect total occupancy across all selected rooms.</span>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setLocalRooms(1);
            setLocalAdults(2);
            setLocalSeniors(0);
            handleUpdateChildren(0);
          }}
          className="text-xs text-stone-500 hover:text-stone-900 font-semibold transition-colors cursor-pointer"
        >
          Reset to Default
        </button>

        <button
          type="button"
          onClick={handleDone}
          className="px-6 py-2 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Apply Selection</span>
        </button>
      </div>
    </div>
  );
};

