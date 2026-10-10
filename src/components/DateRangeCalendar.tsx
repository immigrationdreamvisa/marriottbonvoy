import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DateRangeCalendarProps {
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  onChange: (checkIn: string, checkOut: string) => void;
  onClose: () => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DateRangeCalendar: React.FC<DateRangeCalendarProps> = ({
  checkIn,
  checkOut,
  onChange,
  onClose
}) => {
  // Parsing initial dates
  const parseLocalDate = (dateStr: string) => {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const initialCheckIn = parseLocalDate(checkIn);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // View month state (left month of the 2-month side-by-side view)
  const [viewYear, setViewYear] = useState(() => initialCheckIn ? initialCheckIn.getFullYear() : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => initialCheckIn ? initialCheckIn.getMonth() : today.getMonth());

  // Selection states
  const [selectedIn, setSelectedIn] = useState<string>(checkIn);
  const [selectedOut, setSelectedOut] = useState<string>(checkOut);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [pickingState, setPickingState] = useState<'selecting-in' | 'selecting-out'>('selecting-out');

  // Helpers
  const formatYMD = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const todayStr = formatYMD(today);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  // Prevent navigating to months completely in the past
  const isPrevDisabled = () => {
    const prevDate = new Date(viewYear, viewMonth, 1);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    return prevDate <= thisMonthStart;
  };

  // Generate calendar days for a specific year and month
  const getDaysInMonth = (year: number, month: number) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  // Second month calculations
  const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear;
  const nextMonthMonth = viewMonth === 11 ? 0 : viewMonth + 1;

  const leftMonthDays = getDaysInMonth(viewYear, viewMonth);
  const rightMonthDays = getDaysInMonth(nextMonthYear, nextMonthMonth);

  // Handle day click
  const handleDateClick = (dateStr: string) => {
    if (dateStr < todayStr) return; // disabled

    if (pickingState === 'selecting-in') {
      setSelectedIn(dateStr);
      setSelectedOut('');
      setPickingState('selecting-out');
    } else {
      // picking check-out
      if (!selectedIn || dateStr <= selectedIn) {
        // If clicked date is before or equal to check-in, treat as new check-in
        setSelectedIn(dateStr);
        setSelectedOut('');
        setPickingState('selecting-out');
      } else {
        // Valid checkout selected
        setSelectedOut(dateStr);
        onChange(selectedIn, dateStr);
        setPickingState('selecting-in');
      }
    }
  };

  // Calculate nights
  const calculateNights = (inStr: string, outStr: string) => {
    if (!inStr || !outStr) return 0;
    const d1 = parseLocalDate(inStr);
    const d2 = parseLocalDate(outStr);
    if (!d1 || !d2) return 0;
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights(selectedIn, selectedOut);

  // Quick presets
  const applyPreset = (daysFromNow: number, stayNights: number) => {
    const d1 = new Date(today);
    d1.setDate(d1.getDate() + daysFromNow);
    const d2 = new Date(d1);
    d2.setDate(d2.getDate() + stayNights);

    const f1 = formatYMD(d1);
    const f2 = formatYMD(d2);
    setSelectedIn(f1);
    setSelectedOut(f2);
    onChange(f1, f2);
  };

  // Day styling helper
  const getDayProps = (d: Date | null) => {
    if (!d) return null;
    const dateStr = formatYMD(d);
    const isPast = dateStr < todayStr;
    const isCheckIn = dateStr === selectedIn;
    const isCheckOut = dateStr === selectedOut;
    const isToday = dateStr === todayStr;

    // Range highlight
    const effectiveOut = selectedOut || (pickingState === 'selecting-out' && hoveredDate && hoveredDate > selectedIn ? hoveredDate : '');
    const isInRange = Boolean(
      selectedIn &&
      effectiveOut &&
      dateStr > selectedIn &&
      dateStr < effectiveOut
    );

    return {
      dateStr,
      isPast,
      isCheckIn,
      isCheckOut,
      isInRange,
      isToday,
      dayNum: d.getDate()
    };
  };

  const renderMonthGrid = (year: number, month: number, days: (Date | null)[]) => (
    <div className="flex-1 min-w-[260px]">
      <div className="text-center font-sans text-sm font-bold text-stone-900 mb-3 tracking-tight">
        {MONTH_NAMES[month]} {year}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[11px] font-semibold text-stone-400 font-sans uppercase tracking-wider">
        {DAYS_OF_WEEK.map((dw) => (
          <div key={dw} className="h-6 flex items-center justify-center">
            {dw}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center text-xs font-sans">
        {days.map((d, idx) => {
          if (!d) {
            return <div key={`empty-${idx}`} className="h-8.5" />;
          }

          const info = getDayProps(d)!;
          const { isPast, isCheckIn, isCheckOut, isInRange, isToday, dayNum, dateStr } = info;

          let btnClass = 'w-full h-8.5 rounded-full flex items-center justify-center font-semibold font-sans transition-colors text-stone-800 text-xs';
          let containerClass = 'relative flex items-center justify-center';

          if (isPast) {
            btnClass = 'w-full h-8.5 rounded-full flex items-center justify-center text-stone-300 font-sans text-xs cursor-not-allowed line-through';
          } else if (isCheckIn || isCheckOut) {
            btnClass = 'w-full h-8.5 rounded-full flex items-center justify-center bg-[#8a1538] text-white font-bold font-sans text-xs shadow-xs';
            containerClass += isCheckIn && (isInRange || selectedOut)
              ? ' bg-gradient-to-r from-transparent to-[#8a1538]/10 rounded-l-full'
              : '';
            containerClass += isCheckOut
              ? ' bg-gradient-to-l from-transparent to-[#8a1538]/10 rounded-r-full'
              : '';
          } else if (isInRange) {
            btnClass = 'w-full h-8.5 flex items-center justify-center text-[#8a1538] font-bold font-sans text-xs bg-[#8a1538]/10 rounded-none';
            containerClass += ' bg-[#8a1538]/10';
          } else {
            btnClass += ' hover:bg-stone-100 hover:text-stone-950 cursor-pointer';
          }

          return (
            <div key={dateStr} className={containerClass}>
              <button
                type="button"
                disabled={isPast}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDateClick(dateStr);
                }}
                onMouseEnter={() => !isPast && setHoveredDate(dateStr)}
                onMouseLeave={() => setHoveredDate(null)}
                className={btnClass}
                aria-label={dateStr}
              >
                <span>{dayNum}</span>
              </button>
              {isToday && !isCheckIn && !isCheckOut && (
                <span className="absolute bottom-0.5 w-1 h-1 bg-[#8a1538] rounded-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="bg-white border border-stone-200 rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-[640px] text-stone-900 animate-in fade-in zoom-in-95 select-none font-sans"
    >
      
      {/* Header bar with Status & Month Controls */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
        <div>
          <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#8a1538] block font-sans">
            {pickingState === 'selecting-out' && selectedIn
              ? 'Step 2: Select Check-Out Date'
              : 'Step 1: Select Check-In Date'}
          </span>
          <div className="flex items-baseline gap-2 mt-0.5 font-sans">
            <span className="text-sm font-semibold text-stone-900">
              {selectedIn || 'Check-in'}
            </span>
            <span className="text-stone-400">→</span>
            <span className="text-sm font-semibold text-stone-900">
              {selectedOut || (pickingState === 'selecting-out' && hoveredDate && hoveredDate > selectedIn ? hoveredDate : 'Check-out')}
            </span>
            {nights > 0 && (
              <span className="text-xs bg-[#8a1538]/10 text-[#8a1538] font-bold px-2 py-0.5 rounded-full ml-1 font-sans">
                {nights} {nights === 1 ? 'Night' : 'Nights'}
              </span>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={isPrevDisabled()}
            onClick={(e) => {
              e.stopPropagation();
              prevMonth();
            }}
            className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextMonth();
            }}
            className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-8 h-8 ml-2 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
            aria-label="Close Calendar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Length Presets */}
      <div className="flex items-center gap-1.5 mb-4 text-xs overflow-x-auto pb-1 scrollbar-none font-sans">
        <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider mr-1">Quick:</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            applyPreset(1, 2);
          }}
          className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium whitespace-nowrap transition-colors"
        >
          This Weekend (2N)
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            applyPreset(7, 3);
          }}
          className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium whitespace-nowrap transition-colors"
        >
          Next Weekend (3N)
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            applyPreset(14, 5);
          }}
          className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium whitespace-nowrap transition-colors"
        >
          5-Night Getaway
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            applyPreset(21, 7);
          }}
          className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium whitespace-nowrap transition-colors"
        >
          7-Night Retreat
        </button>
      </div>

      {/* Side-by-side Months (1 column on mobile, 2 columns on sm+) */}
      <div className="flex flex-col sm:flex-row gap-6 font-sans">
        {renderMonthGrid(viewYear, viewMonth, leftMonthDays)}
        <div className="hidden sm:block w-px bg-stone-100 self-stretch" />
        <div className="hidden sm:block flex-1">
          {renderMonthGrid(nextMonthYear, nextMonthMonth, rightMonthDays)}
        </div>
      </div>

      {/* Footer bar */}
      <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs font-sans">
        <div className="text-stone-500 text-[11px] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8a1538]" />
          <span>Flexible dates guarantee Best Rate Guarantee</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (selectedIn && selectedOut) {
                onChange(selectedIn, selectedOut);
                onClose();
              } else if (selectedIn) {
                // Auto set next day
                const d = parseLocalDate(selectedIn)!;
                d.setDate(d.getDate() + 1);
                const nextStr = formatYMD(d);
                onChange(selectedIn, nextStr);
                onClose();
              }
            }}
            disabled={!selectedIn}
            className="px-5 py-2 bg-[#8a1538] hover:bg-[#6e0f2b] disabled:opacity-40 text-white font-bold rounded-lg transition-colors shadow-xs cursor-pointer font-sans"
          >
            Confirm Dates
          </button>
        </div>
      </div>

    </div>
  );
};

