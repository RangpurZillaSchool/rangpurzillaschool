import React, { useState } from 'react';
import { Image, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { api } from '../services/api';

export const GalleryPage: React.FC = () => {
  const photos = api.getGalleryPhotos();
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const openLightbox = (url: string) => setActivePhoto(url);
  const closeLightbox = () => setActivePhoto(null);

  const currentIndex = activePhoto ? photos.indexOf(activePhoto) : -1;

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setActivePhoto(photos[currentIndex - 1]);
    } else {
      setActivePhoto(photos[photos.length - 1]);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < photos.length - 1) {
      setActivePhoto(photos[currentIndex + 1]);
    } else {
      setActivePhoto(photos[0]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-institutional-navy mb-1">
              <Image className="w-4 h-4" />
              <span>ছবির অ্যালবাম ও স্মৃতিচারণ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              ছবির গ্যালারি
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              বিদ্যালয় প্রাঙ্গণ, সুবর্ণজয়ন্তী উৎসব, জাতীয় দিবস উদযাপন ও বার্ষিক ক্রীড়া প্রতিযোগিতার খণ্ডচিত্র
            </p>
          </div>

          <div className="bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono self-start sm:self-auto">
            মোট ছবি: {photos.length} টি
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photoUrl, index) => (
          <div
            key={index}
            onClick={() => openLightbox(photoUrl)}
            className="group relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-xs cursor-pointer hover:shadow-md transition-all"
          >
            <img
              src={photoUrl}
              alt={`রংপুর জিলা স্কুল গ্যালারি ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] rounded-lg overflow-hidden"
          >
            <img
              src={activePhoto}
              alt="গ্যালারি দৃশ্য"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="text-center text-xs text-white/70 mt-2 font-mono">
              ছবি {currentIndex + 1} / {photos.length}
            </div>
          </div>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
