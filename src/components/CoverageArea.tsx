import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, Shield, Navigation, ArrowRight, Phone } from 'lucide-react';
import { BUSHBUCKRIDGE_AREAS, CoverageArea as CoverageType, PHONE_RAW, WHATSAPP_URL } from '../data/carWashData';

interface CoverageProps {
  onSelectAreaForBooking: (areaName: string) => void;
}

export const CoverageArea: React.FC<CoverageProps> = ({ onSelectAreaForBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = BUSHBUCKRIDGE_AREAS.filter((area) =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.popularSpots.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="coverage" className="py-16 sm:py-24 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Mobile Coverage Map</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display">
            Everywhere in Bushbuckridge
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Our self-contained mobile wash vans cruise all major corridors across the municipality daily.
            Check your village below or book our team straight to your house!
          </p>

          {/* Search box */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search your village (e.g. Dwarsloop, Thulamahashe, Acornhoek)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* Coverage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {filteredAreas.map((area, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-amber-400/60 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-white group-hover:text-amber-400 transition-colors">
                        {area.name}
                      </h3>
                      <div className="text-[11px] font-semibold text-slate-400">
                        {area.zone}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Active Daily
                  </span>
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Common Landmarks:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {area.popularSpots.map((spot, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Mobile Van Dispatched
                </span>
                <button
                  onClick={() => onSelectAreaForBooking(area.name)}
                  className="text-xs font-black text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Book Here</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* If no search results */}
        {filteredAreas.length === 0 && (
          <div className="text-center py-12 bg-slate-900 rounded-2xl max-w-md mx-auto">
            <p className="text-sm text-slate-300">
              Don’t see your exact village listed?
            </p>
            <p className="text-xs text-amber-400 font-bold mt-1">
              Don’t worry! We cover ALL surrounding areas within Bushbuckridge!
            </p>
            <a
              href={`https://wa.me/${PHONE_RAW}?text=Hello%20Spark%20&%20Shine,%20do%20you%20cover%20my%20area:%20${encodeURIComponent(searchTerm)}?`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
            >
              Ask via WhatsApp
            </a>
          </div>
        )}

        {/* Self sufficiency banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-950/40 via-slate-900 to-amber-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-base text-white">
                Provide Location via WhatsApp
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Send your location directly via WhatsApp to +27 64 656 2391 and our mobile wash crew navigates straight to your gate!
              </p>
            </div>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white text-black hover:bg-slate-200 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider"
          >
            Send Location via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
