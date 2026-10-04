import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, CheckCircle2, X, ZoomIn, Camera, MapPin, PenTool, Sparkles, Facebook } from 'lucide-react';
import { TESTIMONIALS, ReviewItem, WHATSAPP_URL, FACEBOOK_URL } from '../data/carWashData';
import { WriteReviewModal } from './WriteReviewModal';

export const Reviews: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<{ src: string; caption: string; customer: string } | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(TESTIMONIALS);

  // Load any previously submitted customer reviews from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('spark_shine_customer_reviews');
      if (stored) {
        const parsed: ReviewItem[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge user submitted reviews at the top
          setReviewsList([...parsed, ...TESTIMONIALS]);
        }
      }
    } catch (e) {
      console.error('Error loading stored reviews', e);
    }
  }, []);

  const handleAddNewReview = (newRev: ReviewItem) => {
    setReviewsList((prev) => {
      const updated = [newRev, ...prev];
      try {
        const userRevs = updated.filter((r) => r.id.startsWith('user-rev-'));
        localStorage.setItem('spark_shine_customer_reviews', JSON.stringify(userRevs));
      } catch (err) {
        console.error('Error saving review', err);
      }
      return updated;
    });
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Write Review CTA */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Customer Reviews & Community Ratings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display">
            Bushbuckridge Customer Reviews & Photos
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Real photos sent in by our happy clients in Dwarsloop, Thulamahashe, Acornhoek, and Central Taxi Rank. Click any photo to expand.
          </p>

          {/* Write a Review Button & Social Links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-400/20 flex items-center gap-2 transition-transform active:scale-95"
            >
              <PenTool className="w-4 h-4 stroke-[2.5]" />
              <span>Write A Review</span>
            </button>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-md transition-colors"
            >
              <Facebook className="w-4 h-4 fill-current" />
              <span>Facebook Page</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Reviews Grid with Real Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviewsList.map((review) => {
            const isUserSubmitted = review.id.startsWith('user-rev-');
            return (
              <div
                key={review.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-400/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-xl group relative"
              >
                {/* Review Photo (if present) */}
                {review.image && (
                  <div 
                    className="relative aspect-video sm:aspect-[4/3] bg-black overflow-hidden cursor-pointer group/photo"
                    onClick={() => setActivePhoto({ 
                      src: review.image!, 
                      caption: review.imageCaption || review.vehicle, 
                      customer: `${review.name} (${review.location})` 
                    })}
                  >
                    <img
                      src={review.image}
                      alt={review.imageCaption || review.vehicle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Photo overlay badge */}
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-amber-400/30 text-amber-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow">
                      <Camera className="w-3 h-3 text-amber-400" />
                      <span>{isUserSubmitted ? 'User Uploaded Photo' : 'Real Customer Photo'}</span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white p-1.5 rounded-lg opacity-80 group-hover/photo:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4 text-amber-400" />
                    </div>

                    <div className="absolute bottom-2.5 left-3 text-[11px] text-slate-200 font-medium truncate max-w-[80%] drop-shadow">
                      {review.imageCaption}
                    </div>
                  </div>
                )}

                {/* Review Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating stars & verified badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {isUserSubmitted ? (
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Community Review
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified Wash
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="font-black text-white text-xs sm:text-sm">
                        {review.name}
                      </div>
                      <div className="text-[11px] text-amber-400 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-blue-400 inline" />
                        <span>{review.location}</span>
                        {review.date && <span className="text-slate-500 font-normal">· {review.date}</span>}
                      </div>
                    </div>

                    <span className="text-[10px] font-black text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800 text-right">
                      {review.washType}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* WhatsApp & Facebook Callout */}
        <div className="mt-14 text-center bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-black text-white">
              Had Your Car Washed By Spark & Shine?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Leave a review here or visit our Facebook page to see fresh weekly updates!
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md"
            >
              <Facebook className="w-4 h-4 fill-current" />
              <span>Facebook</span>
            </a>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 text-black px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-400/20"
            >
              <PenTool className="w-4 h-4 stroke-[2.5]" />
              <span>Write Review</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Photo Zoom Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-slate-950 border border-amber-400/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/80 text-white hover:bg-amber-400 hover:text-black transition-colors"
              aria-label="Close photo"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="overflow-hidden flex-1 flex items-center justify-center bg-black">
              <img
                src={activePhoto.src}
                alt={activePhoto.caption}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Customer Wash Photo
                </div>
                <div className="text-sm font-black text-white mt-0.5">
                  {activePhoto.caption}
                </div>
                <div className="text-xs text-slate-400">
                  {activePhoto.customer}
                </div>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Book This Wash</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Write A Review Modal */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onSubmitReview={handleAddNewReview}
      />
    </section>
  );
};
