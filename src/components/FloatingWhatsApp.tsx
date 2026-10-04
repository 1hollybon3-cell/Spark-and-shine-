import React from 'react';
import { MessageSquare, Phone, Sparkles } from 'lucide-react';
import { PHONE_NUMBER, PHONE_RAW, WHATSAPP_URL } from '../data/carWashData';

interface FloatingWhatsAppProps {
  onOpenBooking: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenBooking }) => {
  return (
    <>
      {/* Floating Desktop / Tablet Bubble (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3 pointer-events-auto">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20"
          aria-label="Chat on WhatsApp"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 fill-white text-transparent" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">
              Bushbuckridge Dispatch
            </div>
            <div className="text-xs font-black">
              WhatsApp: +27 64 656 2391
            </div>
          </div>
        </a>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-lg border-t border-amber-500/30 p-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:+${PHONE_RAW}`}
          className="p-3 bg-slate-900 border border-slate-700 text-amber-400 rounded-xl flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          aria-label="Call Dispatch"
        >
          <Phone className="w-5 h-5" />
        </a>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-3 bg-[#25D366] active:bg-[#20ba59] text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
        >
          <MessageSquare className="w-4 h-4 fill-white text-transparent" />
          <span>WhatsApp Us</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-1 py-3 px-3 bg-amber-400 active:bg-amber-300 text-black rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-amber-400/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>BOOK R70</span>
        </button>
      </div>
    </>
  );
};
