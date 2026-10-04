import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, Check, Phone, MessageSquare, MapPin, Calendar, Clock, 
  Car, Shield, AlertCircle, Copy, CheckCircle2, Gift, Award 
} from 'lucide-react';
import { 
  WASH_PRODUCTS, 
  WashProduct, 
  ADD_ONS, 
  AddOn, 
  BUSHBUCKRIDGE_AREAS, 
  PHONE_NUMBER, 
  PHONE_RAW, 
  WHATSAPP_URL,
  BRAND_LOGO 
} from '../data/carWashData';
import { 
  CustomerRecord, 
  findCustomerByPhone, 
  recordCompletedWash 
} from '../utils/customerRecords';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductId?: string;
  initialCustomer?: CustomerRecord | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialProductId = 'sedan-hatchback',
  initialCustomer = null
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProductId);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [village, setVillage] = useState<string>('Dwarsloop');
  const [addressDetails, setAddressDetails] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Today - As soon as possible');
  const [customDate, setCustomDate] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [vehicleModelNotes, setVehicleModelNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Returning Customer & Loyalty state
  const [matchedCustomer, setMatchedCustomer] = useState<CustomerRecord | null>(null);

  // Sync initial product if changed from outside
  useEffect(() => {
    if (initialProductId) {
      setSelectedProductId(initialProductId);
    }
  }, [initialProductId]);

  // Pre-populate if initial customer passed
  useEffect(() => {
    if (initialCustomer) {
      setCustomerPhone(initialCustomer.phone);
      setCustomerName(initialCustomer.name);
      setVillage(initialCustomer.village);
      setAddressDetails(initialCustomer.addressDetails);
      setVehicleModelNotes(initialCustomer.vehicleModel);
      setMatchedCustomer(initialCustomer);
    }
  }, [initialCustomer, isOpen]);

  // Auto-detect returning customer when phone is typed
  useEffect(() => {
    if (customerPhone.trim().length >= 6) {
      const found = findCustomerByPhone(customerPhone);
      if (found) {
        setMatchedCustomer(found);
        if (!customerName) setCustomerName(found.name);
        if (!village || village === 'Dwarsloop') setVillage(found.village);
        if (!addressDetails) setAddressDetails(found.addressDetails);
        if (!vehicleModelNotes) setVehicleModelNotes(found.vehicleModel);
      } else {
        setMatchedCustomer(null);
      }
    } else {
      setMatchedCustomer(null);
    }
  }, [customerPhone]);

  // Generate reference number on mount or open
  useEffect(() => {
    if (isOpen) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setBookingRef(`SNS-BBR-${randomNum}`);
      setIsSubmitted(false);
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentProduct = WASH_PRODUCTS.find((p) => p.id === selectedProductId) || WASH_PRODUCTS[0];

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Check if this booking qualifies for the 5th FREE Wash
  const isFifthWashFree = matchedCustomer ? matchedCustomer.currentStamps === 4 : false;

  // Pricing math: Base price is R0 if 5th wash is free!
  const basePrice = isFifthWashFree ? 0 : currentProduct.price;
  const addOnsTotal = selectedAddOns.reduce((acc, id) => {
    const item = ADD_ONS.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);
  const grandTotal = basePrice + addOnsTotal;

  // Build WhatsApp Message requesting location via chat and noting loyalty status
  const constructWhatsAppMessage = () => {
    const chosenAddOnsText = selectedAddOns.length > 0
      ? selectedAddOns.map(id => {
          const item = ADD_ONS.find(a => a.id === id);
          return item ? `• ${item.name} (+R${item.price})` : '';
        }).join('\n')
      : 'None (Standard Wash)';

    const timeString = timeSlot === 'Custom Date' && customDate ? `Date: ${customDate}` : timeSlot;

    const loyaltyNote = isFifthWashFree
      ? '🎁 *REWARD: 5th WASH 100% FREE REDEEMED!* (Saved R' + currentProduct.price + ')\n'
      : `⭐ *Loyalty Card:* Stamp #${(matchedCustomer ? matchedCustomer.currentStamps + 1 : 1)} of 5 towards FREE wash\n`;

    return encodeURIComponent(
`*SPARK & SHINE MOBILE CAR WASH BOOKING* 🚗✨
-----------------------------------------
*Ref #:* ${bookingRef}
*Vehicle:* ${currentProduct.vehicleCode} - ${currentProduct.name} (${isFifthWashFree ? 'FREE 🎁' : `R${currentProduct.price}`})
${vehicleModelNotes ? `*Car Model:* ${vehicleModelNotes}\n` : ''}*Add-On Upgrades:*
${chosenAddOnsText}
${loyaltyNote}
*Total Price:* R${grandTotal} (${grandTotal === 0 ? 'FREE WASH 🎁' : 'Cash / Capitec / Card on completion'})
-----------------------------------------
*Bushbuckridge Village:* ${village}
*Stand / Yard / Landmark:* ${addressDetails || 'Will provide in this chat'}
*(Location will be provided via this WhatsApp chat)*
*Preferred Time:* ${timeString}
*Customer Name:* ${customerName || 'Customer'}
*Customer Contact:* ${customerPhone || 'Via this WhatsApp'}
-----------------------------------------
Hello Spark & Shine! Please dispatch your mobile wash unit to my location.`
    );
  };

  const handleBookViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Record the wash in persistent customer database
    recordCompletedWash(
      customerPhone,
      customerName,
      village,
      addressDetails,
      vehicleModelNotes,
      currentProduct.vehicleCode,
      currentProduct.name,
      grandTotal,
      bookingRef
    );

    const encodedText = constructWhatsAppMessage();
    const targetUrl = `https://wa.me/${PHONE_RAW}?text=${encodedText}`;
    
    // Open WhatsApp in new tab
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  const handleCopySummary = () => {
    const text = decodeURIComponent(constructWhatsAppMessage());
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-amber-500/40 text-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <img 
              src={BRAND_LOGO} 
              alt="Spark & Shine Logo" 
              className="w-11 h-11 rounded-xl object-cover border-2 border-black/30 shadow-md shrink-0" 
            />
            <div>
              <div className="font-black text-lg tracking-tight uppercase">
                Instant Mobile Wash Booking
              </div>
              <div className="text-xs font-bold text-slate-900">
                Door-to-door anywhere in Bushbuckridge straight to your home or rank
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/15 text-black transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Ref: {bookingRef}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  WhatsApp Dispatch Prepared!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto mt-2">
                  Your wash booking for <strong className="text-white">{currentProduct.name}</strong> in <strong className="text-white">{village}</strong> is ready.
                </p>
              </div>

              {/* Loyalty Reward Notification */}
              {isFifthWashFree ? (
                <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 border-2 border-emerald-400 rounded-2xl p-4 text-center max-w-md mx-auto shadow-xl">
                  <div className="text-emerald-400 font-black text-sm uppercase tracking-wide flex items-center justify-center gap-1.5 mb-1">
                    <Gift className="w-5 h-5" />
                    <span>5th Wash 100% FREE Claimed!</span>
                  </div>
                  <p className="text-xs text-emerald-200">
                    Congratulations! As a returning customer who completed 4 washes, this 5th wash is on the house!
                  </p>
                </div>
              ) : (
                <div className="bg-slate-950 border border-amber-400/40 rounded-xl p-3 max-w-md mx-auto flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-300">
                      Loyalty Stamp #{((matchedCustomer?.currentStamps || 0) + 1)} of 4 Recorded!
                    </span>
                  </div>
                  <span className="text-amber-400 font-bold">
                    {3 - (matchedCustomer?.currentStamps || 0)} more to Free Wash
                  </span>
                </div>
              )}

              {/* Notice for customers to provide location via WhatsApp */}
              <div className="bg-[#111b21] border-2 border-[#25D366]/50 rounded-2xl p-4 text-left max-w-md mx-auto shadow-xl">
                <div className="flex items-center justify-between text-xs text-[#25D366] font-bold pb-2 border-b border-[#202c33]">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    Notice: Please Provide Location via WhatsApp
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                </div>
                <div className="pt-2 text-xs text-slate-300 leading-relaxed">
                  <p>
                    When WhatsApp opens with our dispatcher (+27 64 656 2391), <strong className="text-white">please send your location directly in the chat</strong> (or share your live location) so our mobile wash team can drive straight to your yard or gate!
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Vehicle:</span>
                  <span className="font-bold text-white">
                    {currentProduct.vehicleCode} - {isFifthWashFree ? 'FREE 🎁' : `R${currentProduct.price}`}
                  </span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Add-ons:</span>
                    <span className="font-bold text-amber-300">+R{addOnsTotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>Destination:</span>
                  <span className="font-bold text-white">{village} {addressDetails ? `(${addressDetails})` : ''}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Time:</span>
                  <span className="font-bold text-white">{timeSlot}</span>
                </div>
                <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-black text-amber-400">
                  <span>Total Due on Arrival:</span>
                  <span>{grandTotal === 0 ? 'FREE (R0)' : `R${grandTotal}`}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${PHONE_RAW}?text=${constructWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp & Provide Location</span>
                </a>

                <button
                  onClick={handleCopySummary}
                  className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied Details!' : 'Copy Booking Text'}</span>
                </button>

                <a
                  href={`tel:+${PHONE_RAW}`}
                  className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call {PHONE_NUMBER}</span>
                </a>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-slate-400 hover:text-white underline pt-3"
              >
                ← Edit Booking Details
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookViaWhatsApp} className="space-y-6">
              
              {/* Returning Customer Recognition Banner */}
              {matchedCustomer && (
                <div className={`p-4 rounded-2xl border text-xs flex items-start justify-between gap-3 ${
                  isFifthWashFree
                    ? 'bg-gradient-to-r from-emerald-950 to-emerald-900 border-emerald-400 text-emerald-200 shadow-lg'
                    : 'bg-slate-950 border-amber-400/40 text-slate-200'
                }`}>
                  <div>
                    <div className="font-black text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Welcome Back, {matchedCustomer.name}!</span>
                    </div>
                    <div className="mt-1 text-slate-300">
                      {isFifthWashFree ? (
                        <span className="text-emerald-300 font-bold">
                          🎉 You have completed 4 washes! This 5th wash is 100% FREE on completion.
                        </span>
                      ) : (
                        <span>
                          Loyalty Status: <strong className="text-amber-400">{matchedCustomer.currentStamps} of 4 stamps</strong> collected ({4 - matchedCustomer.currentStamps} more until your FREE wash).
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-black/40 text-[10px] font-mono border border-white/10 shrink-0">
                    {matchedCustomer.totalWashesCount} Washes Logged
                  </div>
                </div>
              )}

              {/* Step 1: Vehicle Category Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-2.5">
                  1. Select Your Vehicle Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {WASH_PRODUCTS.map((prod) => {
                    const isSelected = prod.id === selectedProductId;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => setSelectedProductId(prod.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-black border-amber-300 shadow-md font-bold'
                            : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[10px] font-black uppercase tracking-wider opacity-75">
                          {prod.vehicleCode}
                        </div>
                        <div className="text-lg font-black mt-0.5">
                          {isFifthWashFree && isSelected ? (
                            <span className="text-emerald-950 font-black">FREE 🎁</span>
                          ) : (
                            `R${prod.price}`
                          )}
                        </div>
                        <div className="text-[11px] truncate mt-0.5">
                          {prod.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customer Contact & Phone (Auto looks up loyalty record) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span>Phone Number (Tracks Loyalty Stamps)</span>
                    <span className="text-[10px] text-amber-400">Wash 4x get 5th free</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 072 123 4567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sipho / Mama Joyce"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Vehicle Model */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Vehicle Model (e.g. White Polo, Hilux Single Cab, Jimny, 22-Seater Sprinter)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Silver VW Polo TSI or Hilux 2.8"
                  value={vehicleModelNotes}
                  onChange={(e) => setVehicleModelNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Step 2: Location & Address */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-amber-400">
                    2. Location & Bushbuckridge Area
                  </label>
                  <span className="text-[10px] text-slate-400">Mobile Van Dispatched</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Village / Township
                    </label>
                    <select
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      {BUSHBUCKRIDGE_AREAS.map((area) => (
                        <option key={area.name} value={area.name}>
                          {area.name} ({area.distanceTier})
                        </option>
                      ))}
                      <option value="Other Bushbuckridge Area">Other Bushbuckridge Area</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Stand / Yard # / Gate Landmark
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Stand 412, opposite Primary School"
                      value={addressDetails}
                      onChange={(e) => setAddressDetails(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Friendly notice to send location via WhatsApp */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong className="text-white">Notice:</strong> You can also send your location directly in WhatsApp when the chat opens so our team can drive straight to your gate.
                  </p>
                </div>
              </div>

              {/* Step 3: Optional Add-on Upgrades */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                    3. Optional Add-On Upgrades
                  </label>
                  <span className="text-[11px] text-slate-400">Tap to include</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADD_ONS.map((addon) => {
                    const isChecked = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                          isChecked
                            ? 'bg-amber-400/10 border-amber-400 text-white shadow-sm'
                            : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                            isChecked
                              ? 'bg-amber-400 border-amber-300 text-black'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              {addon.name}
                            </span>
                            <span className="text-xs font-black text-amber-400">
                              +R{addon.price}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Schedule / Time Slot */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-2">
                  4. Preferred Date & Time
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Today - As soon as possible',
                    'Today - Afternoon / Evening',
                    'Tomorrow Morning (07:00 - 11:00)'
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        timeSlot === slot
                          ? 'bg-amber-400 text-black border-amber-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loyalty Reward Summary Alert */}
              {isFifthWashFree ? (
                <div className="bg-emerald-950/60 border border-emerald-500 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-200">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span><strong>5th Free Wash Applied!</strong> Base price waived (Saved R{currentProduct.price}).</span>
                  </div>
                  <span className="font-black text-emerald-400 uppercase text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">R0 Base</span>
                </div>
              ) : (
                <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-slate-300">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">No deposit required.</span> Pay {grandTotal === 0 ? 'R0' : `R${grandTotal}`} on completion via Cash, Capitec Pay, or Card after inspection. 
                    <span className="text-amber-400 block mt-0.5 font-semibold">
                      This wash earns Stamp #{matchedCustomer ? matchedCustomer.currentStamps + 1 : 1} towards your 5th FREE wash!
                    </span>
                  </div>
                </div>
              )}

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da851] text-white font-black text-base uppercase tracking-wider shadow-xl shadow-[#25D366]/25 transition-all transform active:scale-98 flex items-center justify-center gap-2.5"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>
                    {isFifthWashFree 
                      ? 'Claim FREE 5th Wash via WhatsApp (R0)'
                      : `Book via WhatsApp & Add Stamp (R${grandTotal})`}
                  </span>
                </button>
                <div className="text-center text-[11px] text-slate-400 mt-2">
                  Opens WhatsApp directly with <strong>+27 64 656 2391</strong>. Records automatically saved for returning customers.
                </div>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
