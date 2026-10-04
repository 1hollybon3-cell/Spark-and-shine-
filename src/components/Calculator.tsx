import React, { useState } from 'react';
import { Plus, Minus, Calculator as CalcIcon, Sparkles, MessageSquare, Check, ArrowRight, Paperclip, CheckCircle2 } from 'lucide-react';
import { WASH_PRODUCTS, PHONE_RAW, WHATSAPP_URL } from '../data/carWashData';

export const Calculator: React.FC = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    'sedan-hatchback': 1,
    'mini-suv': 0,
    'suv-bakkie': 1,
    'taxi-minibus': 0,
    'minibus-22-seater': 0,
    'truck-wash': 0
  });

  const [engineWashCount, setEngineWashCount] = useState<number>(0);
  const [interiorVacuumCount, setInteriorVacuumCount] = useState<number>(0);
  const [address, setAddress] = useState<string>('Dwarsloop');

  const updateCount = (id: string, delta: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const totalVehicles = Object.values(counts).reduce((a, b) => a + b, 0);

  const rawVehiclesTotal = WASH_PRODUCTS.reduce((sum, prod) => {
    return sum + (counts[prod.id] || 0) * prod.price;
  }, 0);

  const addOnsTotal = (engineWashCount * 40) + (interiorVacuumCount * 40);

  // Multi-car discount: R20 off if 2 or more vehicles washed at the same address!
  const discount = totalVehicles >= 2 ? 20 : 0;
  const finalTotal = Math.max(0, rawVehiclesTotal + addOnsTotal - discount);

  const handleWhatsAppCombo = () => {
    const carBreakdown = WASH_PRODUCTS
      .filter((p) => (counts[p.id] || 0) > 0)
      .map((p) => `• ${counts[p.id]}x ${p.vehicleCode} (${p.name}) = R${counts[p.id] * p.price}`)
      .join('\n');

    const addOnText = (engineWashCount > 0 || interiorVacuumCount > 0)
      ? `\n*Add-ons:*\n${engineWashCount > 0 ? `• ${engineWashCount}x Engine Wash (+R${engineWashCount * 40})\n` : ''}${interiorVacuumCount > 0 ? `• ${interiorVacuumCount}x Deep Vacuum (+R${interiorVacuumCount * 40})\n` : ''}`
      : '';

    const text = encodeURIComponent(
`*SPARK & SHINE MULTI-VEHICLE COMBO BOOKING* 🚗🚙🚕
-----------------------------------------
*Total Vehicles:* ${totalVehicles}
${carBreakdown}${addOnText}
${discount > 0 ? `*Multi-Car Discount:* -R${discount} OFF applied! 🎉\n` : ''}*Estimated Total:* R${finalTotal} (Pay on completion)
-----------------------------------------
*Bushbuckridge Yard/Address:* ${address || 'Bushbuckridge'}
*(Customer will provide location via this WhatsApp)*
Please confirm time slot for your mobile wash team!`
    );

    window.open(`https://wa.me/${PHONE_RAW}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full mb-3">
            <CalcIcon className="w-3.5 h-3.5" />
            <span>Multi-Vehicle Yard & Fleet Specials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display">
            Household & Fleet Combo Builder
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Have multiple cars at home or managing a taxi rank queue? 
            Wash 2 or more vehicles in one visit and get an automatic <strong className="text-amber-400">R20 discount</strong>!
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Vehicle Counters */}
            <div className="lg:col-span-7 space-y-3.5">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300 mb-2">
                1. Select Number of Vehicles
              </h3>

              {WASH_PRODUCTS.map((prod) => {
                const count = counts[prod.id] || 0;
                return (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4 transition-colors hover:border-slate-700"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase text-amber-400">
                          {prod.vehicleCode}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">· R{prod.price} each</span>
                      </div>
                      <div className="font-bold text-sm sm:text-base text-white mt-0.5">
                        {prod.name}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCount(prod.id, -1)}
                        disabled={count <= 0}
                        className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        aria-label={`Decrease ${prod.name}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-black text-base text-white font-mono">
                        {count}
                      </span>
                      <button
                        onClick={() => updateCount(prod.id, 1)}
                        className="w-8 h-8 rounded-xl bg-amber-400 text-black hover:bg-amber-300 font-black flex items-center justify-center transition-colors active:scale-95"
                        aria-label={`Increase ${prod.name}`}
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Optional Quick Add-ons */}
              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                  Optional Add-Ons for any of the cars:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Engine Bay Foam</div>
                      <div className="text-[11px] text-amber-400">+R40 per car</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEngineWashCount(Math.max(0, engineWashCount - 1))}
                        disabled={engineWashCount <= 0}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                      <span className="w-4 text-center text-xs font-mono font-bold">{engineWashCount}</span>
                      <button
                        onClick={() => setEngineWashCount(engineWashCount + 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Full Interior Vacuum</div>
                      <div className="text-[11px] text-amber-400">+R40 per car</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setInteriorVacuumCount(Math.max(0, interiorVacuumCount - 1))}
                        disabled={interiorVacuumCount <= 0}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-30 flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                      <span className="w-4 text-center text-xs font-mono font-bold">{interiorVacuumCount}</span>
                      <button
                        onClick={() => setInteriorVacuumCount(interiorVacuumCount + 1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Price Summary Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 border-2 border-amber-400/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between sticky top-28 shadow-xl">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="text-xs font-black uppercase tracking-wider text-amber-400">
                    Combo Summary
                  </div>
                  <div className="text-xs font-bold text-slate-300">
                    {totalVehicles} {totalVehicles === 1 ? 'Vehicle' : 'Vehicles'}
                  </div>
                </div>

                {/* Vehicles breakdown */}
                <div className="py-3.5 space-y-1.5 text-xs">
                  {WASH_PRODUCTS.map((p) => {
                    const count = counts[p.id] || 0;
                    if (count === 0) return null;
                    return (
                      <div key={p.id} className="flex justify-between text-slate-300">
                        <span>{count}x {p.vehicleCode}</span>
                        <span className="font-bold text-white">R{count * p.price}</span>
                      </div>
                    );
                  })}

                  {engineWashCount > 0 && (
                    <div className="flex justify-between text-slate-300">
                      <span>{engineWashCount}x Engine Wash</span>
                      <span className="font-bold text-amber-300">+R{engineWashCount * 40}</span>
                    </div>
                  )}

                  {interiorVacuumCount > 0 && (
                    <div className="flex justify-between text-slate-300">
                      <span>{interiorVacuumCount}x Deep Vacuum</span>
                      <span className="font-bold text-amber-300">+R{interiorVacuumCount * 40}</span>
                    </div>
                  )}

                  {discount > 0 ? (
                    <div className="flex justify-between text-emerald-400 font-bold bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 mt-1">
                      <span>Multi-Car Yard Discount:</span>
                      <span>-R{discount}</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 italic pt-1">
                      Tip: Add 1 more vehicle to unlock R20 off combo discount!
                    </div>
                  )}
                </div>

                {/* WhatsApp Location Notice */}
                <div className="pt-2 border-t border-slate-800 pb-3">
                  <label className="block text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                    Yard / Stand Address:
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Dwarsloop Stand 412"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 mb-2.5"
                  />

                  <div className="p-2.5 bg-[#111b21] border border-[#25D366]/40 rounded-xl text-[11px] text-slate-300">
                    <div className="text-[#25D366] font-bold flex items-center gap-1 mb-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Notice for Customers</span>
                    </div>
                    <p className="leading-snug">
                      Please provide your location via WhatsApp once the chat opens so our wash team can drive straight to your yard.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="border-t border-slate-800 pt-3 flex items-baseline justify-between mb-4">
                  <span className="text-xs uppercase font-extrabold text-slate-400">Total Due On Arrival</span>
                  <div className="text-3xl font-black text-amber-400 font-display">
                    R{finalTotal}
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCombo}
                  disabled={totalVehicles === 0}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 transition-all active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Book via WhatsApp & Provide Location</span>
                </button>
                <div className="text-center text-[10px] text-slate-400 mt-2 font-medium">
                  We bring our equipped mobile team straight to your yard or home.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
