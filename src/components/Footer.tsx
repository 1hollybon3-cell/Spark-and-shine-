import React from 'react';
import { Sparkles, Phone, MessageSquare, MapPin, Clock, Shield, Facebook } from 'lucide-react';
import { PHONE_NUMBER, PHONE_RAW, WHATSAPP_URL, FACEBOOK_URL, WASH_PRODUCTS, BRAND_LOGO } from '../data/carWashData';

interface FooterProps {
  onOpenBooking: (productId?: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigateSection }) => {
  return (
    <footer className="bg-black text-white border-t border-amber-500/20 pt-16 pb-28 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={BRAND_LOGO} 
                alt="Spark & Shine Logo" 
                className="w-11 h-11 rounded-xl object-cover shadow-lg border border-amber-400"
              />
              <span className="font-display font-black text-xl text-white tracking-tight">
                SPARK & SHINE
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bushbuckridge’s premier mobile door-to-door car wash service. Equipped with high-pressure washers, rich active snow foam, and premium tyre polish. We wash your vehicle at your yard, workplace, or rank.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#1877F2] text-white hover:bg-[#166fe5] transition-colors"
                title="Follow us on Facebook"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors"
                title="WhatsApp Us"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:+${PHONE_RAW}`}
                className="p-2.5 rounded-xl bg-slate-800 text-amber-400 hover:bg-slate-700 transition-colors"
                title="Call Us"
                aria-label="Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Pricing Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Wash Packages
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {WASH_PRODUCTS.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onOpenBooking(p.id)}
                    className="hover:text-amber-400 transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>{p.vehicleCode} ({p.name})</span>
                    <span className="font-black text-amber-400 font-display">R{p.price}</span>
                  </button>
                </li>
              ))}
              <li className="pt-1 text-[11px] text-slate-500">
                *Multi-vehicle combo: Save R20 on 2+ cars!
              </li>
            </ul>
          </div>

          {/* Key Service Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Areas in Bushbuckridge
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-300">
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigateSection('coverage')}>• Thulamahashe</span>
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigateSection('coverage')}>• Dwarsloop</span>
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigateSection('coverage')}>• Acornhoek</span>
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigateSection('coverage')}>• Shatale</span>
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigateSection('coverage')}>• Maviljan</span>
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigateSection('coverage')}>• Casteel</span>
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigateSection('coverage')}>• Agincourt</span>
              <span className="hover:text-white cursor-pointer" onClick={() => onNavigateSection('coverage')}>• Marite</span>
            </div>
            <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-400" />
              <span>We come to your exact home address</span>
            </div>
          </div>

          {/* Operating hours & Dispatch contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Mobile Dispatch
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Monday - Sunday: 07:00 - 18:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:+${PHONE_RAW}`} className="hover:text-white underline font-bold">
                  {PHONE_NUMBER}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Wash 4x & get 5th Wash FREE!</span>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="mt-3 w-full bg-amber-400 hover:bg-amber-300 text-black py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider"
            >
              Book Mobile Wash
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Spark & Shine Mobile Car Wash. Bushbuckridge, Mpumalanga, South Africa.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer" onClick={() => onNavigateSection('pricing')}>Prices</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer" onClick={() => onNavigateSection('coverage')}>Coverage</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer" onClick={() => onNavigateSection('faq')}>FAQ</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
