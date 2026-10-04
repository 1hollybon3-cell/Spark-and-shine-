import React, { useState } from 'react';
import { Sparkles, Check, Clock, Car, Truck, Info, ChevronRight, MessageSquare, ArrowRight, Bus } from 'lucide-react';
import { WASH_PRODUCTS, WashProduct, WHATSAPP_URL } from '../data/carWashData';

interface PriceCardsProps {
  onSelectProduct: (product: WashProduct) => void;
  onOpenDetails: (product: WashProduct) => void;
}

export const PriceCards: React.FC<PriceCardsProps> = ({ onSelectProduct, onOpenDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'passenger' | 'passenger-transit' | 'commercial'>('all');

  const filteredProducts = WASH_PRODUCTS.filter((prod) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'passenger') return prod.id === 'sedan-hatchback' || prod.id === 'mini-suv' || prod.id === 'suv-bakkie';
    if (selectedCategory === 'passenger-transit') return prod.id === 'taxi-minibus' || prod.id === 'minibus-22-seater';
    if (selectedCategory === 'commercial') return prod.id === 'truck-wash' || prod.id === 'minibus-22-seater';
    return true;
  });

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exact Header Bar inspired by flyer: Blue text on White pill / header box */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-white text-[#1565c0] px-8 py-3.5 rounded-2xl shadow-xl border-4 border-amber-400">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-display uppercase">
              SPARK & SHINE - WASH PRICES
            </h2>
          </div>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Transparent, upfront pricing with zero hidden call-out fees anywhere in Bushbuckridge.
            Select your vehicle below to book instantly or inspect service inclusions.
          </p>

          {/* Clean Segmented category tabs */}
          <div className="mt-6 inline-flex flex-wrap justify-center p-1 bg-slate-900 border border-slate-800 rounded-xl gap-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-amber-400 text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Vehicles ({WASH_PRODUCTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('passenger')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'passenger'
                  ? 'bg-amber-400 text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cars & Bakkies (R70 - R100)
            </button>
            <button
              onClick={() => setSelectedCategory('passenger-transit')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'passenger-transit'
                  ? 'bg-amber-400 text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Taxis & 22-Seaters (R110 - R130)
            </button>
            <button
              onClick={() => setSelectedCategory('commercial')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'commercial'
                  ? 'bg-amber-400 text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Trucks (R150)
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="bg-white text-slate-900 rounded-2xl p-6 flex flex-col justify-between shadow-2xl border-2 border-slate-200 hover:border-amber-400 transition-all duration-200 group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Visual Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-blue-600" />

                <div>
                  {/* Top metadata & price line */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-extrabold uppercase tracking-wider text-blue-800">
                        {product.vehicleCode}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight mt-0.5">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium mt-0.5 line-clamp-1">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-3xl sm:text-4xl font-black text-slate-950 font-display">
                        R{product.price}
                      </div>
                      <div className="text-[11px] font-bold text-emerald-700 flex items-center justify-end gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{product.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary / description */}
                  <p className="text-xs text-slate-700 mt-3 leading-relaxed border-t border-slate-100 pt-2.5">
                    {product.description}
                  </p>

                  {/* Popular models this covers */}
                  <div className="mt-3.5 bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-blue-700" />
                      <span>Fits models like:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.suitableFor.slice(0, 3).map((car, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded"
                        >
                          {car}
                        </span>
                      ))}
                      {product.suitableFor.length > 3 && (
                        <span className="text-[10px] font-semibold text-slate-500 self-center px-1">
                          +{product.suitableFor.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Checklist of key wash steps */}
                  <div className="mt-3.5 space-y-1.5">
                    {product.features.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons: BOOK R... prominent Yellow button from prompt */}
                <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full sm:flex-1 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black py-3 px-4 rounded-xl font-black text-sm uppercase tracking-wider text-center shadow-lg shadow-amber-400/25 transition-all transform active:scale-98 flex items-center justify-center gap-1.5"
                  >
                    <span>BOOK R{product.price}</span>
                    <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
                  </button>

                  <button
                    onClick={() => onOpenDetails(product)}
                    className="w-full sm:w-auto text-xs font-bold text-slate-700 hover:text-black hover:bg-slate-100 py-3 px-3 rounded-xl transition-colors border border-slate-200 text-center"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout direct banner as in prompt: WhatsApp: +27 64 656 2391 */}
        <div className="mt-12 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-2xl font-black text-lg sm:text-xl shadow-2xl shadow-[#25D366]/30 transition-all transform hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-6 h-6" />
            <span>WhatsApp: +27 64 656 2391</span>
          </a>
          <p className="mt-2 text-xs text-slate-400">
            Click to chat directly with our Bushbuckridge dispatcher on WhatsApp. No booking fees.
          </p>
        </div>

      </div>
    </section>
  );
};
