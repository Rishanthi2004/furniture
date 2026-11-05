import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface FeaturedCollectionProps {
  onExploreCollection: () => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  onExploreCollection
}) => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[500px] flex items-center justify-center p-8 sm:p-14 shadow-md"
        >
          {/* Full-width living room photograph with slow scaling hover/scroll effect */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/src/assets/images/hero_living_room_1793872982731.jpg"
              alt="Living room interior with warm cream sofa and wooden furniture"
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-106 filter brightness-95"
            />
            {/* Elegant warm overlay scrim for crisp typography contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 backdrop-blur-[0.5px]" />
          </div>

          {/* Minimal Text Overlay */}
          <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xs uppercase tracking-[0.25em] text-[#EFE7DE] font-medium mb-3"
            >
              2026 Master Series
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-4 text-balance"
            >
              Designed for Living
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[#EFE7DE] text-base sm:text-lg font-normal max-w-lg mb-8 leading-relaxed"
            >
              Comfort, elegance, and timeless design.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onClick={onExploreCollection}
              className="group/btn inline-flex items-center gap-3 px-8 py-3.5 bg-white text-[#26211E] hover:bg-[#C86428] hover:text-white rounded-xl font-medium text-sm sm:text-base shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
