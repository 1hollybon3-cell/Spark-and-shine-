import React, { useState } from 'react';
import { Gift, Sparkles, Check, Phone, Search, History, UserCheck, Award, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { 
  CustomerRecord, 
  getCustomerRecords, 
  findCustomerByPhone, 
  normalizePhone 
} from '../utils/customerRecords';
import { BRAND_LOGO, PHONE_RAW } from '../data/carWashData';

interface LoyaltyTrackerProps {
  onOpenBookingWithCustomer?: (customer: CustomerRecord) => void;
  onOpenGeneralBooking?: () => void;
}

export const LoyaltyTracker: React.FC<LoyaltyTrackerProps> = ({
  onOpenBookingWithCustomer,
  onOpenGeneralBooking
}) => {
  const [phoneSearch, setPhoneSearch] = useState('');
  const [activeCustomer, setActiveCustomer] = useState<CustomerRecord | null>(() => {
    // Default show Mama Joyce as preview of the 4/4 stamp card
    const list = getCustomerRecords();
    return list.find(c => c.currentStamps === 4) || list[0] || null;
  });
  const [showAllRecords, setShowAllRecords] = useState(false);
  const [records, setRecords] = useState<CustomerRecord[]>(getCustomerRecords());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneSearch.trim()) return;
    const found = findCustomerByPhone(phoneSearch);
    if (found) {
      setActiveCustomer(found);
    } else {
      alert(`No wash records found yet for "${phoneSearch}". When you complete your first wash, your record and loyalty stamps will automatically start here!`);
    }
  };

  const handleSelectDemo = (phone: string) => {
    setPhoneSearch(phone);
    const found = findCustomerByPhone(phone);
    if (found) {
      setActiveCustomer(found);
    }
  };

  const stampsCount = activeCustomer ? activeCustomer.currentStamps : 0;
  const isFifthFreeReady = stampsCount === 4;

  return (
    <section id="loyalty" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-yellow-300 px-4 py-1.5 rounded-full mb-3 shadow-lg shadow-amber-400/20">
            <Gift className="w-4 h-4 fill-current" />
            <span>VIP Returning Customer Rewards</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display">
            Wash 4 Times, Get Your 5th Free! 🎁
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            We value our loyal Bushbuckridge drivers. Every wash earns a digital stamp. 
            Complete 4 washes and your <strong className="text-amber-400">5th wash is 100% on the house</strong>! We keep full records of all your visits.
          </p>
        </div>

        {/* Loyalty Stamp Card UI */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1e1b18] via-slate-900 to-black border-2 border-amber-400/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Top Badge of the Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-400/20 pb-6">
              <div className="flex items-center gap-3">
                <img 
                  src={BRAND_LOGO} 
                  alt="Spark & Shine" 
                  className="w-12 h-12 rounded-xl object-cover border border-amber-400/50 shadow" 
                />
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-amber-400">
                    Official Digital Loyalty Card
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {activeCustomer ? activeCustomer.name : 'Your Name'}
                  </h3>
                  {activeCustomer && (
                    <div className="text-xs text-slate-400 font-mono">
                      Phone: {activeCustomer.phone} · {activeCustomer.village}
                    </div>
                  )}
                </div>
              </div>

              {/* Status pill */}
              <div className="sm:text-right">
                {isFifthFreeReady ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-[#25D366] text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    <span>5th Wash is 100% FREE!</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-xs">
                    <span>{stampsCount} of 4 Stamps Collected</span>
                  </div>
                )}
                <div className="text-[11px] text-slate-400 mt-1">
                  {4 - stampsCount > 0 ? `${4 - stampsCount} more wash until FREE wash` : 'Ready to claim on next wash!'}
                </div>
              </div>
            </div>

            {/* The 5 Stamp Slots */}
            <div className="py-8">
              <div className="grid grid-cols-5 gap-2 sm:gap-4">
                {[1, 2, 3, 4, 5].map((slotNumber) => {
                  const isStampCollected = slotNumber <= stampsCount;
                  const isFreeSlot = slotNumber === 5;
                  const isNextUp = slotNumber === stampsCount + 1;

                  return (
                    <div 
                      key={slotNumber}
                      className={`relative flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-2xl border-2 transition-all ${
                        isFreeSlot
                          ? isFifthFreeReady
                            ? 'bg-gradient-to-b from-emerald-950 to-emerald-900/60 border-emerald-400 shadow-xl shadow-emerald-500/20 scale-105'
                            : 'bg-amber-400/5 border-dashed border-amber-400/40'
                          : isStampCollected
                            ? 'bg-amber-400/15 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10'
                            : isNextUp
                              ? 'bg-slate-900 border-slate-700 hover:border-amber-400/40 text-slate-400'
                              : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}
                    >
                      {/* Stamp Circle Icon */}
                      <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-sm sm:text-base font-black transition-transform ${
                        isFreeSlot
                          ? isFifthFreeReady
                            ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/30 animate-bounce'
                            : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : isStampCollected
                            ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {isFreeSlot ? (
                          <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : isStampCollected ? (
                          <Check className="w-6 h-6 stroke-[3]" />
                        ) : (
                          slotNumber
                        )}
                      </div>

                      {/* Slot Label */}
                      <div className="mt-2 text-center">
                        <div className={`text-[10px] sm:text-xs font-black uppercase tracking-tight ${
                          isFreeSlot 
                            ? isFifthFreeReady ? 'text-emerald-400' : 'text-amber-400'
                            : isStampCollected ? 'text-amber-300' : 'text-slate-400'
                        }`}>
                          {isFreeSlot ? '5th FREE' : `Wash #${slotNumber}`}
                        </div>
                        <div className="text-[9px] text-slate-400 hidden sm:block">
                          {isStampCollected ? 'Completed ✓' : isFreeSlot ? '100% Free' : 'Upcoming'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action & Re-book Button */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                {activeCustomer ? (
                  <span>
                    Last washed: <strong className="text-white">{activeCustomer.lastWashDate}</strong> ({activeCustomer.vehicleModel || 'Vehicle'})
                  </span>
                ) : (
                  <span>Enter your phone number below to check your stamps:</span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    if (activeCustomer && onOpenBookingWithCustomer) {
                      onOpenBookingWithCustomer(activeCustomer);
                    } else if (onOpenGeneralBooking) {
                      onOpenGeneralBooking();
                    }
                  }}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                    isFifthFreeReady
                      ? 'bg-gradient-to-r from-emerald-400 to-[#25D366] hover:from-emerald-300 hover:to-emerald-400 text-black shadow-emerald-500/25'
                      : 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isFifthFreeReady ? 'Claim 5th Free Wash Now' : 'Book Next Wash & Add Stamp'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Customer Search & Quick Demo Profiles */}
        <div className="max-w-4xl mx-auto mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Enter phone number to check your stamps (e.g. 072 123 4567)..."
                value={phoneSearch}
                onChange={(e) => setPhoneSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black uppercase tracking-wider border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <span>Check Stamps</span>
            </button>
          </form>

          {/* Quick Demo Pre-fills */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-[11px] font-semibold text-slate-400">Try returning clients:</span>
            <button
              type="button"
              onClick={() => handleSelectDemo('0721234567')}
              className="text-[11px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-medium transition-colors"
            >
              🎁 Mama Joyce (4/4 Stamps - FREE 5th Ready!)
            </button>
            <button
              type="button"
              onClick={() => handleSelectDemo('0839876543')}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 px-2.5 py-1 rounded-lg font-medium transition-colors"
            >
              ⭐ Sipho (3/4 Stamps)
            </button>
            <button
              type="button"
              onClick={() => handleSelectDemo('0645551234')}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-lg font-medium transition-colors"
            >
              🚕 Brother Themba (Taxi Operator)
            </button>
          </div>

          {/* Past Wash History for Selected Customer */}
          {activeCustomer && activeCustomer.history && activeCustomer.history.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" />
                  <span>Wash Record History ({activeCustomer.name})</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-bold">
                  Total Completed: {activeCustomer.totalWashesCount} washes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {activeCustomer.history.slice(0, 4).map((h, i) => (
                  <div key={h.id || i} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-400 text-[10px]">
                      <span>{h.date}</span>
                      <span className="font-mono text-amber-400">{h.reference}</span>
                    </div>
                    <div className="font-bold text-white truncate">
                      {h.vehicleName}
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-400 truncate">{h.village}</span>
                      <span className={`font-black ${h.isFreeWash ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {h.isFreeWash ? 'FREE 🎁' : `R${h.price}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Returning Customer Records Book Toggle (For Dispatcher / Operator View) */}
        <div className="max-w-4xl mx-auto mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setRecords(getCustomerRecords());
              setShowAllRecords(!showAllRecords);
            }}
            className="text-xs font-bold text-slate-400 hover:text-amber-400 underline transition-colors"
          >
            {showAllRecords ? 'Hide Returning Customers Database' : '📋 Spark & Shine Dispatcher: View All Returning Customer Records'}
          </button>

          {showAllRecords && (
            <div className="mt-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left text-xs animate-in fade-in">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <div className="font-black text-amber-400 uppercase tracking-wider text-xs">
                  Active Returning Customer Book (Bushbuckridge)
                </div>
                <div className="text-slate-400">
                  {records.length} registered profiles
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="py-2">Customer</th>
                      <th className="py-2">Contact</th>
                      <th className="py-2">Area</th>
                      <th className="py-2">Car Model</th>
                      <th className="py-2 text-center">Stamps</th>
                      <th className="py-2 text-center">Total</th>
                      <th className="py-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {records.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-850">
                        <td className="py-2.5 font-bold text-white">{c.name}</td>
                        <td className="py-2.5 font-mono text-slate-300">{c.phone}</td>
                        <td className="py-2.5 text-slate-300">{c.village}</td>
                        <td className="py-2.5 text-slate-300">{c.vehicleModel || '-'}</td>
                        <td className="py-2.5 text-center font-bold text-amber-400">
                          {c.currentStamps}/4
                        </td>
                        <td className="py-2.5 text-center font-mono text-slate-300">{c.totalWashesCount}</td>
                        <td className="py-2.5 text-right">
                          {c.currentStamps === 4 ? (
                            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-black border border-emerald-500/30">
                              5TH FREE READY
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">
                              {4 - c.currentStamps} away
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
