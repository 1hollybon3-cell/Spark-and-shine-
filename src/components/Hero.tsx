import React from 'react';
import { Sparkles, Phone, MessageSquare, Droplets, Zap, ShieldCheck, MapPin, CheckCircle2, Clock, Gift } from 'lucide-react';
import { PHONE_NUMBER, PHONE_RAW, WHATSAPP_URL, WASH_PRODUCTS, BRAND_LOGO } from '../data/carWashData';

interface HeroProps {
  onOpenBooking: (productId?: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigateSection }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-slate-950 text-white">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Flyer Banner Replica / Hero Header */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Logo Thumbnail on top of the page */}
          <div className="flex justify-center mb-6">
            <div className="relative group cursor-pointer" onClick={() => onOpenBooking()}>
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-60 blur-md group-hover:opacity-100 transition duration-300" />
              <img
                src={BRAND_LOGO}
                alt="Spark & Shine Car Wash Official Logo"
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover shadow-2xl border-2 border-amber-400 transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Top Yellow Ribbon Badge */}
          <div className="inline-block bg-amber-400 text-black px-6 py-3 rounded-xl font-black text-lg sm:text-2xl shadow-xl shadow-amber-400/20 transform hover:-translate-y-0.5 transition-transform border-2 border-amber-300">
            <div className="tracking-tight uppercase">MOBILE - WE COME TO YOUR DOOR!</div>
            <div className="text-xs sm:text-sm font-bold tracking-widest text-slate-900 mt-0.5">
              EVERYWHERE IN BUSHBUCKRIDGE
            </div>
          </div>

          {/* VIP Loyalty Promo Badge */}
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => onNavigateSection('loyalty')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 via-amber-400/15 to-emerald-500/10 hover:from-emerald-500/20 hover:to-amber-400/20 text-emerald-400 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg transition-transform active:scale-95"
            >
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>Wash 4 Times & Get 5th Wash FREE!</span>
              <span className="text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded font-black">REWARD</span>
            </button>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight font-display text-white">
            SPARK & SHINE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
              MOBILE CAR WASH
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Bushbuckridge’s trusted door-to-door car wash service. 
            <strong className="text-white font-semibold"> We bring our professional mobile wash team equipped with high-pressure washers, rich snow foam, and tyre polish </strong> 
            straight to your house, yard, business, or taxi rank!
          </p>

          {/* Quick Pricing Grid directly in the hero */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 max-w-5xl mx-auto">
            {WASH_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => onOpenBooking(prod.id)}
                className="group relative bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/60 rounded-xl p-3 text-center transition-all duration-200 shadow-md hover:shadow-amber-400/10 active:scale-95 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-amber-400 transition-colors truncate">
                    {prod.vehicleCode}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                    R{prod.price}
                  </div>
                  <div className="text-[11px] text-slate-300 truncate mt-0.5">
                    {prod.name}
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black py-1 px-1.5 rounded font-mono group-hover:bg-amber-300">
                  BOOK R{prod.price} →
                </div>
              </button>
            ))}
          </div>

          {/* Direct CTA Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-base sm:text-lg tracking-wide uppercase shadow-xl shadow-amber-400/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-black" />
              <span>Book Your Wash (From R70)</span>
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-base sm:text-lg shadow-xl shadow-[#25D366]/20 active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp: +27 64 656 2391</span>
            </a>
          </div>

          {/* Micro trust indicators */}
          <div className="mt-10 pt-8 border-t border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Active Snow Foam Shampoo</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Door-to-Door Convenience</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All Bushbuckridge Areas</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Pay On Satisfied Inspection</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
