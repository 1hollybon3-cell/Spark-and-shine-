import React from 'react';
import { X, Check, Clock, Car, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Droplets } from 'lucide-react';
import { WashProduct, WHATSAPP_URL } from '../data/carWashData';

interface ProductDetailModalProps {
  product: WashProduct | null;
  onClose: () => void;
  onBookNow: (product: WashProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onBookNow
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-amber-500/40 text-white rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-6 flex items-start justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-400">
              {product.vehicleCode} Package Details
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {product.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {product.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-black text-amber-400 font-display">
                R{product.price}
              </div>
              <div className="text-[11px] text-slate-400">
                {product.duration}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2">
              Package Description
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Detailed Inclusions */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Full Service Inclusions (R{product.price})</span>
            </h4>
            <div className="space-y-2.5">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suitable vehicles */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-blue-400" />
              <span>Common Vehicles In This Category</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.suitableFor.map((model, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-md border border-slate-700 font-medium"
                >
                  {model}
                </span>
              ))}
            </div>
          </div>

          {/* Loyalty Reward Note */}
          <div className="p-3.5 bg-amber-400/10 border border-amber-400/30 rounded-xl text-xs text-amber-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong>Loyalty Reward:</strong> Wash 4 times and get your 5th wash 100% FREE! We automatically track returning customer visits.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
          <button
            onClick={() => onBookNow(product)}
            className="flex-1 py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
          >
            <span>BOOK {product.vehicleCode} (R{product.price})</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-3.5 rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
