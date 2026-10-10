import React from 'react';
import { Shield, Sparkles, Clock, Smartphone, Gem, HeartHandshake } from 'lucide-react';

export const DirectBenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Best Rate Guarantee',
      description: 'Always find our lowest rates on official Marriott channels. If you find a lower rate within 24 hours of booking, we will match it and give you an additional 25% discount or 5,000 points.'
    },
    {
      icon: Gem,
      title: 'Marriott Bonvoy Points',
      description: 'Earn points toward free hotel nights, exclusive moments, and flights every time you stay. Enjoy dedicated member rates available exclusively when booking direct.'
    },
    {
      icon: Clock,
      title: 'Flexible Cancellation',
      description: 'Changes in travel plans happen. Benefit from our flexible cancellation policies on qualified rates with hassle-free online cancellations.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Check-In & Key',
      description: 'Skip the front desk with seamless check-in and unlock your guest room directly from the Marriott Bonvoy Mobile App.'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#faf9f6] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.22em] text-[#8a1538] font-bold block mb-2.5">
            Marriott Bonvoy Privileges
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-stone-900 mb-4">
            Why Book Directly with Marriott
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            Reserving directly gives you access to member-only rates, unmatched perks, and direct communication with our hotels worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8a1538]/10 text-[#8a1538] flex items-center justify-center mb-5 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
