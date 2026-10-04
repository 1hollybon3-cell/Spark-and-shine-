import React from 'react';
import { Droplets, Zap, ShieldCheck, HeartHandshake, Clock, Sparkles } from 'lucide-react';

export const ServiceFeatures: React.FC = () => {
  const features = [
    {
      icon: Droplets,
      title: 'Active Snow-Foam Bath',
      badge: 'Touchless Dirt Lift',
      description: 'Mpumalanga red dust and road grime are lifted safely with dense snow foam pre-wash before hand scrubbing, preventing micro-scratches.',
      accent: 'text-blue-400 bg-blue-400/10'
    },
    {
      icon: Zap,
      title: 'Equipped Mobile Wash Van',
      badge: 'High-Pressure Power',
      description: 'Our mobile unit arrives fully outfitted with commercial pressure washers, specialized foam cannons, and detailing equipment.',
      accent: 'text-amber-400 bg-amber-400/10'
    },
    {
      icon: ShieldCheck,
      title: 'Scratch-Free Microfiber Tech',
      badge: 'Safe On Clear-Coats',
      description: 'Bushbuckridge red road dust scratches paint if washed with ordinary sponges. We use two-bucket grit guards and ultra-plush microfibres.',
      accent: 'text-emerald-400 bg-emerald-400/10'
    },
    {
      icon: HeartHandshake,
      title: 'Pay Only When Satisfied',
      badge: 'Cash · Capitec · Card',
      description: 'Zero upfront deposit required. You inspect your car’s sparkling rims, windows, and paintwork first, then pay via Cash, Capitec Pay, or Card.',
      accent: 'text-purple-400 bg-purple-400/10'
    },
    {
      icon: Clock,
      title: 'Save 2 Hours of Your Weekend',
      badge: 'Relax At Home',
      description: 'Why waste your Saturday standing in long car wash queues? Relax with your family while we wash your vehicle in your own driveway.',
      accent: 'text-rose-400 bg-rose-400/10'
    },
    {
      icon: Sparkles,
      title: 'Long-Lasting Tyre & Trim Shine',
      badge: 'Silicone Slick Coating',
      description: 'We apply commercial-grade weather-resistant silicone polish to all tyres and exterior plastics, keeping that wet jet-black finish for days.',
      accent: 'text-cyan-400 bg-cyan-400/10'
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Spark & Shine Difference</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display">
            Built For Bushbuckridge Roads
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            We engineered our mobile wash unit specifically to handle local Mpumalanga dirt roads, dust, water cuts, and busy schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-400/40 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.accent} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950 text-slate-300 border border-slate-800 px-2.5 py-1 rounded-md">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
