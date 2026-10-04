import React, { useState } from 'react';
import { X, Star, Upload, CheckCircle2, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';
import { BUSHBUCKRIDGE_AREAS, WASH_PRODUCTS, PHONE_RAW, ReviewItem } from '../data/carWashData';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ReviewItem) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [name, setName] = useState('');
  const [village, setVillage] = useState('Dwarsloop');
  const [vehicle, setVehicle] = useState('VW Polo TSI');
  const [washType, setWashType] = useState('Vehicle A (Sedan/Hatch) - R70');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [sendToWhatsApp, setSendToWhatsApp] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image is too large. Please select a photo under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: ReviewItem = {
      id: `user-rev-${Date.now()}`,
      name: name.trim(),
      location: village,
      vehicle: vehicle.trim() || 'Customer Vehicle',
      comment: comment.trim(),
      rating,
      washType,
      image: imagePreview || undefined,
      imageCaption: `${vehicle} washed in ${village}`,
      date: 'Just now'
    };

    onSubmitReview(newReview);
    setIsSuccess(true);

    if (sendToWhatsApp) {
      const starText = '⭐'.repeat(rating);
      const text = encodeURIComponent(
`*NEW SPARK & SHINE CUSTOMER REVIEW* ${starText}
-----------------------------------------
*Customer:* ${name.trim()}
*Location:* ${village}
*Vehicle:* ${vehicle.trim()} (${washType})
*Rating:* ${rating} / 5 Stars
*Review:* "${comment.trim()}"
-----------------------------------------
Thank you Spark & Shine for the mobile wash!`
      );
      window.open(`https://wa.me/${PHONE_RAW}?text=${text}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setImagePreview(null);
    setName('');
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-amber-500/40 text-white rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <div className="bg-black text-amber-400 p-1.5 rounded-lg">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="font-black text-lg tracking-tight uppercase">
                Write A Customer Review
              </div>
              <div className="text-xs font-bold text-slate-900">
                Share your Spark & Shine experience in Bushbuckridge
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-black/15 text-black transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white">
                Review Published!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you for reviewing Spark & Shine Mobile Car Wash. Your review has been added to our live reviews wall!
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-400/20"
                >
                  Close & View Reviews
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Star Rating Selector */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-amber-400 mb-1.5">
                  1. Overall Rating
                </label>
                <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                        aria-label={`${star} star rating`}
                      >
                        <Star
                          className={`w-7 h-7 ${
                            (hoverRating || rating) >= star
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="ml-3 font-bold text-sm text-white">
                    {rating === 5 ? '5.0 - Excellent Shine!' : `${rating}.0 Stars`}
                  </span>
                </div>
              </div>

              {/* Name & Village */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sipho Ndlovu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Bushbuckridge Village / Area
                  </label>
                  <select
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {BUSHBUCKRIDGE_AREAS.map((area) => (
                      <option key={area.name} value={area.name}>
                        {area.name}
                      </option>
                    ))}
                    <option value="Other Area in Bushbuckridge">Other Area</option>
                  </select>
                </div>
              </div>

              {/* Vehicle & Wash Package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Vehicle Model
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VW Polo, Hilux, Jimny, Quantum"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Wash Package
                  </label>
                  <select
                    value={washType}
                    onChange={(e) => setWashType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {WASH_PRODUCTS.map((p) => (
                      <option key={p.id} value={`${p.vehicleCode} - R${p.price}`}>
                        {p.vehicleCode} ({p.name}) - R{p.price}
                      </option>
                    ))}
                    <option value="Multi-Car Combo">Multi-Car Combo</option>
                  </select>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Your Review / Wash Experience
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the wash quality, shine on rims/tyres, snow foam, customer loyalty, or punctuality..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Photo Upload (Optional) */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Upload Wash Photo (Optional)</span>
                  <span className="text-[10px] text-amber-400 font-normal">Show your car’s shine</span>
                </label>
                
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black aspect-video max-h-40">
                    <img 
                      src={imagePreview} 
                      alt="Upload preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/80 text-white hover:bg-rose-500 text-xs"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-800 hover:border-amber-400/60 rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 transition-colors">
                    <Upload className="w-5 h-5 text-amber-400 mb-1" />
                    <span className="text-slate-300 font-bold">Tap to upload a photo of your clean car</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">JPG, PNG (up to 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Share to WhatsApp option */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="sendWhatsApp"
                  checked={sendToWhatsApp}
                  onChange={(e) => setSendToWhatsApp(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-amber-400 focus:ring-0 w-4 h-4"
                />
                <label htmlFor="sendWhatsApp" className="text-[11px] text-slate-300 cursor-pointer select-none">
                  Also send copy to Spark & Shine WhatsApp (+27 64 656 2391)
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 active:scale-98 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Post Review Now</span>
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
