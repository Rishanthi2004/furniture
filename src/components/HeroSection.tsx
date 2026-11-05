import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreProduct: (productId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onExploreProduct
}) => {
  const headingWords = ['Stunning', '&', 'Modern', 'Furniture'];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-16">
      {/* Soft warm ambient sunlight gradient beam */}
      <div className="absolute top-0 right-0 w-3/4 h-full pointer-events-none bg-radial from-amber-100/35 via-transparent to-transparent opacity-70 blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            {/* Main Heading: Staggered Word-by-Word Reveal */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[62px] text-[#26211E] tracking-tight leading-[1.08] mb-5 text-balance">
              {headingWords.map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + index * 0.14,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
              className="text-[#786E66] text-base sm:text-lg leading-relaxed max-w-md mb-8"
            >
              Create your perfect space with our stylish and comfortable designs.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95, ease: 'easeOut' }}
              className="flex items-center gap-4"
            >
              <button
                onClick={onShopNow}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#C86428] hover:bg-[#B2531D] text-white font-medium text-sm sm:text-base rounded-xl shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onExploreProduct('hero-burnt-chair')}
                className="text-xs uppercase tracking-wider font-semibold text-[#786E66] hover:text-[#C86428] py-2 px-3 transition-colors"
              >
                View Chair Spec
              </button>
            </motion.div>
          </div>

          {/* Right Column: Visual Composition with Layered Staggered Animations */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden bg-[#FAF7F2] p-2 sm:p-4"
            >
              {/* Background ambient lighting vignette */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FAF7F2] via-transparent to-amber-50/40 pointer-events-none" />

              {/* Main Living Room Scene Composition */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
                {/* 1. Base Sofa & Living Room Scene - subtle fade and scale animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.35,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="w-full h-full relative rounded-2xl overflow-hidden shadow-xs"
                >
                  <img
                    src="/src/assets/images/hero_living_room_1793872982731.jpg"
                    alt="Stunning modern living room with cream sofa, round oak coffee table, and burnt orange accent chair"
                    className="w-full h-full object-cover object-center filter saturate-[1.03] contrast-[1.01]"
                    loading="eager"
                  />
                  {/* Subtle sunlight ray overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-amber-100/20 mix-blend-soft-light pointer-events-none" />
                </motion.div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
