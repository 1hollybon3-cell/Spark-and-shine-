import React, { useState } from 'react';
import { Sparkles, Phone, MessageSquare, Menu, X, Shield, Clock, MapPin, Facebook } from 'lucide-react';
import { PHONE_NUMBER, PHONE_RAW, WHATSAPP_URL, FACEBOOK_URL, BRAND_LOGO } from '../data/carWashData';

interface HeaderProps {
  onOpenBooking: (productId?: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-amber-500/20 text-white shadow-2xl">
      {/* Top Notice Bar */}
      <div className="bg-amber-400 text-black px-4 py-1.5 text-xs sm:text-sm font-black flex flex-wrap items-center justify-between gap-2 shadow-inner">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
          <span className="tracking-wide uppercase font-extrabold">MOBILE - WE COME TO YOUR DOOR!</span>
          <span className="hidden sm:inline font-bold text-slate-800">·</span>
          <span className="hidden sm:inline font-bold">EVERYWHERE IN BUSHBUCKRIDGE</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-bold text-slate-900">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-900" />
            Mon - Sun: 07:00 - 18:00
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-slate-900" />
            Equipped Mobile Wash Unit
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('hero')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative">
              <img 
                src={BRAND_LOGO} 
                alt="Spark & Shine Car Wash Logo" 
                className="w-12 h-12 rounded-xl object-cover shadow-lg shadow-amber-500/25 border-2 border-amber-400 group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  SPARK & SHINE
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-amber-400">
                <MapPin className="w-3 h-3 inline text-blue-400" />
                <span>Mobile Car Wash · Bushbuckridge</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <button 
              onClick={() => handleNav('pricing')} 
              className="hover:text-amber-400 transition-colors py-2"
            >
              Wash Prices
            </button>
            <button 
              onClick={() => handleNav('calculator')} 
              className="hover:text-amber-400 transition-colors py-2 flex items-center gap-1.5"
            >
              Multi-Car Combo
              <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Save R20</span>
            </button>
            <button 
              onClick={() => handleNav('loyalty')} 
              className="hover:text-amber-300 transition-colors py-2 flex items-center gap-1.5 text-amber-400 font-black"
            >
              <span>🎁 5th Wash Free</span>
            </button>
            <button 
              onClick={() => handleNav('coverage')} 
              className="hover:text-amber-400 transition-colors py-2"
            >
              Villages Covered
            </button>
            <button 
              onClick={() => handleNav('features')} 
              className="hover:text-amber-400 transition-colors py-2"
            >
              Why Choose Us
            </button>
            <button 
              onClick={() => handleNav('reviews')} 
              className="hover:text-amber-400 transition-colors py-2"
            >
              Reviews
            </button>
            <button 
              onClick={() => handleNav('faq')} 
              className="hover:text-amber-400 transition-colors py-2"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-slate-700 bg-[#1877F2]/10 hover:bg-[#1877F2] text-slate-300 hover:text-white transition-colors flex items-center justify-center"
              title="Visit our Facebook Page"
              aria-label="Facebook Page"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </a>

            <a
              href={`tel:+${PHONE_RAW}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-colors"
              title="Call Spark & Shine"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md shadow-[#25D366]/20 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-black transition-all shadow-lg shadow-amber-400/20 active:scale-95"
            >
              BOOK NOW
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-md bg-amber-400 text-black text-xs font-black"
            >
              BOOK
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950 border-b border-amber-500/30 px-5 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 pt-1 text-sm font-semibold text-slate-200">
            <button 
              onClick={() => handleNav('pricing')} 
              className="text-left py-2 border-b border-slate-900 hover:text-amber-400"
            >
              🚗 Wash Prices (R70 - R150)
            </button>
            <button 
              onClick={() => handleNav('loyalty')} 
              className="text-left py-2 border-b border-slate-900 hover:text-amber-300 flex items-center justify-between text-amber-400 font-bold"
            >
              <span>🎁 Wash 4x & Get 5th Free!</span>
              <span className="text-[10px] font-black bg-emerald-500 text-black px-2 py-0.5 rounded">FREE WASH</span>
            </button>
            <button 
              onClick={() => handleNav('calculator')} 
              className="text-left py-2 border-b border-slate-900 hover:text-amber-400 flex items-center justify-between"
            >
              <span>🧮 Multi-Car Combo Calculator</span>
              <span className="text-[10px] font-black bg-amber-400 text-black px-2 py-0.5 rounded">SAVE R20</span>
            </button>
            <button 
              onClick={() => handleNav('coverage')} 
              className="text-left py-2 border-b border-slate-900 hover:text-amber-400"
            >
              📍 Bushbuckridge Villages Covered
            </button>
            <button 
              onClick={() => handleNav('features')} 
              className="text-left py-2 border-b border-slate-900 hover:text-amber-400"
            >
              ✨ Professional Mobile Features
            </button>
            <button 
              onClick={() => handleNav('reviews')} 
              className="text-left py-2 border-b border-slate-900 hover:text-amber-400"
            >
              ⭐ Customer Reviews
            </button>
            <button 
              onClick={() => handleNav('faq')} 
              className="text-left py-2 border-b border-slate-900 hover:text-amber-400"
            >
              ❓ Frequently Asked Questions
            </button>
          </div>

          <div className="pt-3 grid grid-cols-3 gap-2">
            <a
              href={`tel:+${PHONE_RAW}`}
              className="flex items-center justify-center gap-1 py-3 rounded-lg bg-slate-900 text-slate-200 font-bold text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Call
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 py-3 rounded-lg bg-[#25D366] text-white font-bold text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 py-3 rounded-lg bg-[#1877F2] text-white font-bold text-xs"
            >
              <Facebook className="w-3.5 h-3.5 fill-current" />
              Facebook
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
