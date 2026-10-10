import React, { useState } from 'react';
import { VERIFIED_VENUES, EVENT_SERVICES, VenueSpace } from '../data/meetings';
import { ImageWithFallback } from './ImageWithFallback';
import {
  Users,
  Maximize2,
  Calendar,
  Building,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Mail,
  Phone,
  Check,
  X,
  FileCheck
} from 'lucide-react';

export const MeetingsPage: React.FC = () => {
  const [calcAttendees, setCalcAttendees] = useState<number>(150);
  const [calcSetup, setCalcSetup] = useState<'banquet' | 'theater' | 'classroom' | 'reception'>('banquet');

  // RFP Form State
  const [rfpEventType, setRfpEventType] = useState('Business Conference');
  const [rfpDestination, setRfpDestination] = useState('London, United Kingdom');
  const [rfpAttendees, setRfpAttendees] = useState('100');
  const [rfpRoomsNeeded, setRfpRoomsNeeded] = useState('50');
  const [rfpStartDate, setRfpStartDate] = useState('2026-11-15');
  const [rfpEndDate, setRfpEndDate] = useState('2026-11-18');
  const [rfpCatering, setRfpCatering] = useState(true);
  const [rfpContactName, setRfpContactName] = useState('');
  const [rfpEmail, setRfpEmail] = useState('');
  const [rfpPhone, setRfpPhone] = useState('');
  const [rfpCompany, setRfpCompany] = useState('');
  const [rfpSuccessCode, setRfpSuccessCode] = useState<string | null>(null);

  // Sq footage requirement calculation
  const getRequiredSqFt = () => {
    switch (calcSetup) {
      case 'banquet':
        return calcAttendees * 14;
      case 'theater':
        return calcAttendees * 10;
      case 'classroom':
        return calcAttendees * 16;
      case 'reception':
        return calcAttendees * 9;
      default:
        return calcAttendees * 12;
    }
  };

  const requiredSqFt = getRequiredSqFt();

  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rfpCode = 'RFP-MB-' + Math.floor(100000 + Math.random() * 900000);
    setRfpSuccessCode(rfpCode);
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      {/* Hero Header */}
      <div className="bg-stone-900 text-white relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
            alt="Meetings Header"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-radial from-transparent to-stone-900/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-amber-400 mb-3 block">
            Marriott Bonvoy Events
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-4">
            Meetings, Conferences & Celebrations
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            From iconic ballrooms on London’s Park Lane to private island retreats in the Venetian Lagoon, create extraordinary moments with state-of-the-art audiovisual solutions and certified event planners.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Interactive Space & Capacity Calculator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-wider font-bold text-[#8a1538] block mb-1">
              Event Planning Tool
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              Meeting Space & Capacity Calculator
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Calculate the required square footage and explore matching venues across our luxury portfolio based on your expected attendance and preferred room layout.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-stone-50 rounded-2xl p-6 border border-stone-200">
            {/* Input 1: Attendees */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                Expected Attendees: <span className="text-[#8a1538] font-mono text-base">{calcAttendees}</span>
              </label>
              <input
                type="range"
                min="20"
                max="1500"
                step="10"
                value={calcAttendees}
                onChange={(e) => setCalcAttendees(Number(e.target.value))}
                className="w-full accent-[#8a1538] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                <span>20 guests</span>
                <span>500</span>
                <span>1,500+ guests</span>
              </div>
            </div>

            {/* Input 2: Layout Style */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
                Room Layout Style
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['banquet', 'theater', 'classroom', 'reception'] as const).map(style => (
                  <button
                    key={style}
                    onClick={() => setCalcSetup(style)}
                    className={`py-2 px-3 rounded-xl font-semibold capitalize transition-all border ${
                      calcSetup === style
                        ? 'bg-[#8a1538] text-white border-[#8a1538]'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Box */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 text-center shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                Recommended Area
              </span>
              <div className="font-serif text-3xl font-bold text-stone-900 mb-1">
                {requiredSqFt.toLocaleString()} <span className="text-sm font-sans font-normal text-stone-500">sq ft</span>
              </div>
              <p className="text-[11px] text-stone-500">
                (~{Math.round(requiredSqFt * 0.0929).toLocaleString()} sq meters required)
              </p>
            </div>
          </div>
        </div>

        {/* Featured Venues Showcase */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8a1538] block mb-2">
              Verified Event Spaces
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">
              Iconic Luxury Venues
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Explore actual meeting and event spaces available across our verified hotel inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VERIFIED_VENUES.map(venue => (
              <div
                key={venue.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <ImageWithFallback
                    src={venue.image}
                    alt={venue.name}
                    fallbackTitle={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-black/20" />

                  <div className="absolute top-3 left-3">
                    <span className="bg-[#8a1538] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {venue.sqFt.toLocaleString()} sq ft
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-[10px] uppercase font-semibold text-stone-300">{venue.propertyName}</p>
                    <h3 className="font-serif text-xl font-bold">{venue.name}</h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-stone-500 mb-4">{venue.location}</div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-xl border border-stone-100 mb-4 font-mono">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase block">Banquet</span>
                        <strong className="text-stone-800">{venue.maxBanquet} guests</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase block">Theater</span>
                        <strong className="text-stone-800">{venue.maxTheater} guests</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase block">Classroom</span>
                        <strong className="text-stone-800">{venue.maxClassroom} guests</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase block">Reception</span>
                        <strong className="text-stone-800">{venue.maxReception} guests</strong>
                      </div>
                    </div>

                    <ul className="space-y-1 text-xs text-stone-600 mb-4">
                      {venue.features.slice(0, 2).map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8a1538] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#rfp-form-section"
                    className="w-full py-2.5 bg-stone-900 hover:bg-[#8a1538] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors text-center block"
                  >
                    Request Proposal for Venue
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request for Proposal (RFP) Form Section */}
        <div id="rfp-form-section" className="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-md scroll-mt-24">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8a1538] block mb-1">
              Direct Event Inquiry
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">
              Submit a Request for Proposal (RFP)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Connect with our dedicated luxury event concierge team. We respond within 24 hours with custom quotes, floor plans, and group room rates.
            </p>
          </div>

          {!rfpSuccessCode ? (
            <form onSubmit={handleRfpSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Event Type *</label>
                  <select
                    value={rfpEventType}
                    onChange={(e) => setRfpEventType(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-[#8a1538]"
                  >
                    <option>Business Conference</option>
                    <option>Executive Board Meeting</option>
                    <option>Luxury Wedding</option>
                    <option>Social Gala & Charity Event</option>
                    <option>Incentive Group Room Block</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Target Destination *</label>
                  <select
                    value={rfpDestination}
                    onChange={(e) => setRfpDestination(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-[#8a1538]"
                  >
                    <option>London, United Kingdom (JW Marriott Grosvenor House)</option>
                    <option>Marco Island, Florida (JW Marriott Marco Island)</option>
                    <option>Venice, Italy (JW Marriott Venice Resort)</option>
                    <option>Aspen, Colorado (The St. Regis Aspen)</option>
                    <option>Half Moon Bay, California (The Ritz-Carlton)</option>
                    <option>Kyoto, Japan (The Ritz-Carlton, Kyoto)</option>
                    <option>Paris, France (The Paris EDITION)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Estimated Attendees *</label>
                  <input
                    type="number"
                    required
                    min="10"
                    max="5000"
                    value={rfpAttendees}
                    onChange={(e) => setRfpAttendees(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8a1538]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Guest Rooms Needed (Peak) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={rfpRoomsNeeded}
                    onChange={(e) => setRfpRoomsNeeded(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8a1538]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Proposed Start Date *</label>
                  <input
                    type="date"
                    required
                    value={rfpStartDate}
                    onChange={(e) => setRfpStartDate(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8a1538]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Proposed End Date *</label>
                  <input
                    type="date"
                    required
                    value={rfpEndDate}
                    onChange={(e) => setRfpEndDate(e.target.value)}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8a1538]"
                  />
                </div>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-4">Organizer Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jonathan Sterling"
                      value={rfpContactName}
                      onChange={(e) => setRfpContactName(e.target.value)}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8a1538]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Organization / Company</label>
                    <input
                      type="text"
                      placeholder="e.g. Sterling Capital Group"
                      value={rfpCompany}
                      onChange={(e) => setRfpCompany(e.target.value)}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8a1538]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. j.sterling@sterling.com"
                      value={rfpEmail}
                      onChange={(e) => setRfpEmail(e.target.value)}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8a1538]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 212-555-0199"
                      value={rfpPhone}
                      onChange={(e) => setRfpPhone(e.target.value)}
                      className="w-full border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8a1538]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#8a1538] hover:bg-[#6e0f2b] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
                >
                  Submit RFP to Event Concierge
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">Request for Proposal Submitted!</h3>
              <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                Thank you, <strong>{rfpContactName}</strong>. Your event proposal request for <strong>{rfpEventType}</strong> at {rfpDestination} has been received. A Senior Marriott Bonvoy Event Sales Director will contact you within 24 business hours.
              </p>

              <div className="bg-white border border-stone-200 rounded-xl p-4 inline-block mb-6 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Official RFP Reference</span>
                <span className="font-mono text-xl font-bold text-[#8a1538] tracking-widest">{rfpSuccessCode}</span>
              </div>

              <div>
                <button
                  onClick={() => setRfpSuccessCode(null)}
                  className="px-6 py-2.5 bg-stone-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-stone-800"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
