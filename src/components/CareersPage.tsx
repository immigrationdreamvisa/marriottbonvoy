import React, { useState, useMemo } from 'react';
import { TAKE_CARE_PILLARS, JOB_OPENINGS, CAREER_CATEGORIES, JobOpening } from '../data/careers';
import { ImageWithFallback } from './ImageWithFallback';
import {
  Briefcase,
  Users,
  Globe2,
  Heart,
  Award,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  X,
  FileText,
  Upload,
  Check,
  Search,
  Building2,
  UtensilsCrossed,
  TrendingUp,
  Compass,
  GraduationCap,
  ExternalLink,
  Filter
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeJob, setActiveJob] = useState<JobOpening | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantResume, setApplicantResume] = useState<string | null>(null);
  const [applicationSuccessCode, setApplicationSuccessCode] = useState<string | null>(null);

  const departments = [
    'All',
    'Hotel Operations',
    'Culinary & F&B',
    'Guest Services & Concierge',
    'Sales & Marketing',
    'Management',
    'Technology & Corporate'
  ];

  // Filter jobs based on search, location, and department
  const filteredJobs = useMemo(() => {
    return JOB_OPENINGS.filter(job => {
      const matchesDept = selectedDept === 'All' || job.department === selectedDept;
      const matchesSearch = !searchQuery.trim() ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.property.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = !locationQuery.trim() ||
        job.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
        job.country.toLowerCase().includes(locationQuery.toLowerCase());

      return matchesDept && matchesSearch && matchesLocation;
    });
  }, [selectedDept, searchQuery, locationQuery]);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const trackingCode = 'MAR-APP-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationSuccessCode(trackingCode);
  };

  const resetApplicationForm = () => {
    setIsApplying(false);
    setActiveJob(null);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantResume(null);
    setApplicationSuccessCode(null);
  };

  const scrollToPositions = () => {
    document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen text-stone-900">
      
      {/* ============================================================= */}
      {/* 1. HERO SECTION                                               */}
      {/* ============================================================= */}
      <div className="relative bg-stone-900 text-white py-20 sm:py-28 overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
            alt="Hospitality Professionals at Marriott International"
            className="w-full h-full object-cover scale-102 opacity-40"
            fallbackTitle="Marriott International Careers"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.25em] text-amber-300 font-bold mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Careers at Marriott International</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white max-w-4xl leading-[1.15] mb-4">
            Where Belonging Begins
          </h1>

          <p className="max-w-2xl text-stone-200 text-sm sm:text-base font-light leading-relaxed mb-8">
            Join a global family of more than 400,000 passionate associates across 139 countries and territories. Grow your craft with 30 world-renowned hotel brands and an award-winning culture of opportunity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={scrollToPositions}
              className="px-7 py-3.5 bg-[#e0592a] hover:bg-[#d04a1b] text-white font-bold text-sm sm:text-base rounded-full shadow-lg transition-all flex items-center gap-2"
            >
              <span>Explore Open Positions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://careers.marriott.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-full backdrop-blur-md border border-white/30 transition-all flex items-center gap-2"
            >
              <span>Global Careers Portal</span>
              <ExternalLink className="w-4 h-4 text-stone-300" />
            </a>
          </div>

          {/* Key Global Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-white/15">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">8,000+</div>
              <div className="text-[11px] text-stone-300 uppercase tracking-wider mt-0.5">Properties Worldwide</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">139</div>
              <div className="text-[11px] text-stone-300 uppercase tracking-wider mt-0.5">Countries & Territories</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">#1</div>
              <div className="text-[11px] text-stone-300 uppercase tracking-wider mt-0.5">World's Best Workplace</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">400k+</div>
              <div className="text-[11px] text-stone-300 uppercase tracking-wider mt-0.5">Associates Worldwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 2. CAREER PATHWAYS & CATEGORIES DISCOVERY                     */}
      {/* ============================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#e0592a] block mb-2">
            Explore Opportunities
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight mb-3">
            Find Your Calling in Hospitality
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Whether your passion is culinary artistry, bespoke guest relations, general management, or cutting-edge hotel technology, discover a pathway tailored to your ambitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREER_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                const mapDept: Record<string, string> = {
                  'hotel-ops': 'Hotel Operations',
                  'culinary-fb': 'Culinary & F&B',
                  'guest-services': 'Guest Services & Concierge',
                  'sales-marketing': 'Sales & Marketing',
                  'management': 'Management',
                  'corporate-tech': 'Technology & Corporate'
                };
                setSelectedDept(mapDept[cat.id] || 'All');
                scrollToPositions();
              }}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-md hover:border-[#e0592a] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center text-[#e0592a] group-hover:bg-[#e0592a] group-hover:text-white transition-colors mb-4">
                  {cat.id === 'hotel-ops' && <Building2 className="w-5 h-5" />}
                  {cat.id === 'culinary-fb' && <UtensilsCrossed className="w-5 h-5" />}
                  {cat.id === 'guest-services' && <Sparkles className="w-5 h-5" />}
                  {cat.id === 'sales-marketing' && <TrendingUp className="w-5 h-5" />}
                  {cat.id === 'management' && <Award className="w-5 h-5" />}
                  {cat.id === 'corporate-tech' && <Globe2 className="w-5 h-5" />}
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#e0592a] transition-colors mb-1.5">
                  {cat.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#e0592a]">
                <span>{cat.openingsCount} Verified Openings</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================= */}
      {/* 3. JOB SEARCH & LISTINGS BOARD                                */}
      {/* ============================================================= */}
      <div id="open-positions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#e0592a] block mb-1">
              Verified Job Opportunities
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold">
              Explore Available Positions
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Select a position to view qualifications, responsibilities, and submit an application directly.
            </p>
          </div>

          {/* Search Inputs & Filters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6 pb-6 border-b border-stone-100">
            
            {/* Keyword Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by job title, keyword, or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 text-stone-900 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#e0592a]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Search */}
            <div className="md:col-span-6 relative">
              <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Filter by city, country, or location..."
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full bg-stone-50 text-stone-900 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-[#e0592a]"
              />
              {locationQuery && (
                <button
                  type="button"
                  onClick={() => setLocationQuery('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-bold text-stone-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Department:</span>
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-[#1c1917] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Listings Grid */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => {
                    setActiveJob(job);
                    setIsApplying(false);
                  }}
                  className="p-5 sm:p-6 rounded-2xl border border-stone-200 hover:border-[#e0592a] hover:bg-stone-50/70 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#e0592a]/10 text-[#e0592a] px-2.5 py-0.5 rounded-md">
                        {job.department}
                      </span>
                      <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        {job.employmentType}
                      </span>
                      <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        {job.experienceLevel}
                      </span>
                      <span className="text-[10px] text-stone-400 ml-auto">
                        Ref: {job.jobId}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#e0592a] transition-colors">
                      {job.title}
                    </h3>

                    <p className="text-xs text-stone-600 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-medium text-stone-800">{job.property}</span>
                      <span className="text-stone-300">·</span>
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{job.location}, {job.country}</span>
                    </p>

                    <p className="text-xs text-stone-500 line-clamp-2 pt-1 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <button
                      type="button"
                      className="px-5 py-2.5 bg-[#1c1917] hover:bg-black text-white text-xs font-bold rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs"
                    >
                      <span>View & Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Clear Empty State */
            <div className="p-12 text-center border border-dashed border-stone-200 rounded-2xl">
              <Briefcase className="w-10 h-10 text-stone-400 mx-auto mb-3 stroke-[1.5]" />
              <h3 className="font-serif text-lg font-bold text-stone-800 mb-1">
                No matching verified vacancies found
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto mb-4 leading-relaxed">
                We couldn't find openings matching your active search criteria. Try clearing your search query or department filter, or visit the global portal.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDept('All');
                    setSearchQuery('');
                    setLocationQuery('');
                  }}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
                >
                  Reset All Filters
                </button>
                <a
                  href="https://careers.marriott.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1c1917] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Search All Global Jobs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ============================================================= */}
      {/* 4. LEARNING, DEVELOPMENT & LIFE IN HOSPITALITY                */}
      {/* ============================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#e0592a] block mb-2">
              Career Growth & Development
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-stone-900 font-normal tracking-tight mb-4 leading-snug">
              Invest in Your Future with Industry-Leading Learning
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              At Marriott, careers are built through continuous learning, global mentorship, and tailored leadership development. Over 50% of our hotel General Managers began their careers in hourly associate roles.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#e0592a]/10 text-[#e0592a] flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-stone-900">Voyage Global Leadership Development</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Our flagship 12-to-18 month award-winning management training program for university graduates offering hands-on operational leadership.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#e0592a]/10 text-[#e0592a] flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-stone-900">Marriott Digital Learning University</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Access to thousands of certified courses in culinary techniques, revenue management, customer excellence, and data systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#e0592a]/10 text-[#e0592a] flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-stone-900">Associate Travel & Wellbeing Discounts</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Explore the world with special associate hotel room rates across 8,000+ participating properties worldwide for you and your family.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 aspect-[4/3]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Hotel Hospitality Associates"
              className="w-full h-full object-cover"
              fallbackTitle="Marriott Hospitality Culture"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-300 mb-1">
                Global Culture of Opportunity
              </span>
              <p className="font-serif text-lg font-normal text-stone-100">
                “Take care of your associates and they will take care of the customers.”
              </p>
              <span className="text-xs text-stone-300 mt-1">— J. Willard Marriott, Founder</span>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================= */}
      {/* 5. THE TAKECARE PHILOSOPHY PILLARS                            */}
      {/* ============================================================= */}
      <div className="bg-white border-y border-stone-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#e0592a] block mb-2">
              Our Culture & Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight mb-3">
              The TakeCare Philosophy
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Founded on the enduring belief that when we take care of our associates, they take care of our guests, and the world flourishes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {TAKE_CARE_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-[#faf9f6] rounded-2xl p-6 border border-stone-200 hover:border-[#e0592a] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#e0592a] block mb-1">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-1">{pillar.title}</h3>
                  <p className="text-[11px] font-semibold text-stone-500 mb-2">{pillar.subtitle}</p>
                  <p className="text-xs text-stone-600 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ============================================================= */}
      {/* 6. CALL TO ACTION: GLOBAL CAREER PORTAL                       */}
      {/* ============================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-[#1c1917] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-400 block mb-2">
              Join Our Global Team
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight mb-4">
              Begin Your Journey with Marriott Bonvoy
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-8">
              Explore thousands of verified hospitality, culinary, corporate, and operational positions worldwide across all 30 Marriott Bonvoy brands.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://careers.marriott.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#e0592a] hover:bg-[#d04a1b] text-white font-bold text-sm sm:text-base rounded-full transition-all inline-flex items-center gap-2 shadow-md"
              >
                <span>Search Global Positions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToPositions}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-full border border-white/20 transition-all"
              >
                View Featured Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 7. JOB DETAILS & APPLICATION MODAL                            */}
      {/* ============================================================= */}
      {activeJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={resetApplicationForm}
              className="absolute right-5 top-5 p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!applicationSuccessCode ? (
              <>
                <div className="pr-8 mb-6 pb-6 border-b border-stone-100">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold text-[#e0592a] bg-[#e0592a]/10 px-2 py-0.5 rounded">
                      {activeJob.department}
                    </span>
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {activeJob.employmentType}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      ID: {activeJob.jobId}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
                    {activeJob.title}
                  </h3>

                  <p className="text-xs text-stone-600 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-stone-400 shrink-0" />
                    <span className="font-semibold text-stone-800">{activeJob.property}</span>
                    <span className="text-stone-300">·</span>
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>{activeJob.location}, {activeJob.country}</span>
                  </p>
                </div>

                {!isApplying ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900 mb-2">Position Overview</h4>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{activeJob.description}</p>
                    </div>

                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900 mb-2">Key Responsibilities</h4>
                      <ul className="space-y-2">
                        {activeJob.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#e0592a] shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900 mb-2">Qualifications & Skills</h4>
                      <ul className="space-y-2">
                        {activeJob.qualifications.map((qual, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={activeJob.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-full transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Official Job Posting</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setIsApplying(true)}
                        className="px-7 py-3 bg-[#e0592a] hover:bg-[#d04a1b] text-white text-xs font-bold rounded-full transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>Apply for this Position</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Application Form */
                  <form onSubmit={handleSubmitApplication} className="space-y-4">
                    <h4 className="font-serif text-base font-bold text-stone-900 pb-2 border-b border-stone-100">
                      Submit Your Candidate Profile
                    </h4>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Eleanor Bennett"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#e0592a]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="e.g. eleanor@example.com"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#e0592a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="e.g. +1 (555) 019-2834"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#e0592a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                        Resume / CV Attachment
                      </label>
                      <div className="border-2 border-dashed border-stone-200 rounded-2xl p-4 text-center hover:bg-stone-50 transition-colors">
                        <Upload className="w-5 h-5 text-stone-400 mx-auto mb-1" />
                        <p className="text-xs text-stone-600 font-medium">
                          {applicantResume ? `Attached: ${applicantResume}` : 'Click to attach PDF or DOCX (Max 5MB)'}
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setApplicantResume(e.target.files[0].name);
                            }
                          }}
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="mt-2 inline-block px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 text-[11px] font-semibold rounded-md cursor-pointer transition-colors"
                        >
                          Browse Files
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setIsApplying(false)}
                        className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                      >
                        Back to Overview
                      </button>

                      <button
                        type="submit"
                        className="px-7 py-2.5 bg-[#1c1917] hover:bg-black text-white text-xs font-bold rounded-full transition-all shadow-md"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              /* Success Screen */
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  Application Submitted Successfully
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mb-4 leading-relaxed">
                  Thank you, <span className="font-semibold text-stone-900">{applicantName}</span>. Your application for <span className="font-semibold text-stone-900">{activeJob.title}</span> at {activeJob.property} has been received by our Talent Acquisition team.
                </p>
                <div className="bg-stone-100 rounded-xl p-3.5 max-w-xs mx-auto mb-6">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">Tracking Reference</span>
                  <span className="font-mono text-sm font-bold text-stone-900">{applicationSuccessCode}</span>
                </div>
                <button
                  onClick={resetApplicationForm}
                  className="px-6 py-2.5 bg-[#1c1917] text-white text-xs font-bold rounded-full hover:bg-black transition-all"
                >
                  Close & Continue Exploring
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
