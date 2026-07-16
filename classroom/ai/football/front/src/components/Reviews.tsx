import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../data';

export default function Reviews() {
  return (
    <section className="bg-[#070b16] py-16 px-6 md:px-12 lg:px-24 border-t border-white/5" id="reviews-section">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        {/* Title Group */}
        <div className="space-y-3">
          <span className="text-[10px] text-[#edbb00] uppercase font-mono tracking-widest font-semibold block">
            WHAT FANS SAY
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-sans">
            Customer Reviews
          </h2>
          {/* General rating bar */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex text-[#edbb00]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#edbb00] text-[#edbb00]" />
              ))}
            </div>
            <span className="text-white font-bold text-sm">4.9</span>
            <span className="text-gray-400 text-xs font-medium">from 1,200+ reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left" id="reviews-grid">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/15 transition-colors"
              id={`review-card-${review.id}`}
            >
              <div className="space-y-4">
                {/* Individual Stars */}
                <div className="flex text-[#edbb00]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < review.rating ? 'fill-[#edbb00] text-[#edbb00]' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                {/* Comment */}
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author badge footer */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
                <div className={`w-8 h-8 rounded-full ${review.avatarBg} flex items-center justify-center text-white text-xs font-extrabold`}>
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs">{review.name}</h4>
                  <span className="text-[10px] text-gray-400 font-medium">{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
