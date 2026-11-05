import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface TransformYourHomeProps {
  onSelectCategory: (categoryId: string) => void;
  onExploreProduct: (productId: string) => void;
}

export const TransformYourHome: React.FC<TransformYourHomeProps> = ({
  onSelectCategory,
  onExploreProduct
}) => {
  const cards = [
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      subtitle: 'Artisanal Rattan & Timber',
      image: '/src/assets/images/rattan_lounge_1793872986287.jpg',
      targetId: 'rattan-curve-lounge',
      category: 'seating',
      badge: 'Spring 2026'
    },
    {
      id: 'minimalist-design',
      title: 'Minimalist Design',
      subtitle: 'Sculptural Shelving & Spaces',
      image: '/src/assets/images/minimalist_shelf_1793872986427.jpg',
      targetId: 'minimalist-display-shelf',
      category: 'storage',
      badge: 'Editorial'
    },
    {
      id: 'special-offers',
      title: 'Special Offers',
      subtitle: 'Curated Terracotta Accents',
      image: '/src/assets/images/orange_ottoman_1793872986083.jpg',
      targetId: 'velvet-round-ottoman',
      category: 'seating',
      badge: 'Up to 25% Off'
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F6F1EA] border-t border-[#EAE2D8]/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#26211E] tracking-tight">
              Transform Your Home
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#786E66] font-normal leading-relaxed">
              Explore our collection and find the perfect pieces to elevate your interior.
            </p>
          </motion.div>
        </div>

        {/* 3 Large Image Cards matching reference image layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={() => onExploreProduct(card.targetId)}
              className="group cursor-pointer relative bg-white rounded-2xl overflow-hidden border border-[#EAE2D8]/80 shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image Frame with realistic zoom */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Corner quick arrow */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-[#26211E] group-hover:bg-[#C86428] group-hover:text-white transition-all shadow-xs">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Text Card Area matching reference image caption style */}
              <div className="p-5 flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#26211E] group-hover:text-[#C86428] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#786E66] mt-0.5">
                    {card.subtitle}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(card.category);
                  }}
                  className="text-xs text-[#C86428] hover:underline font-medium"
                >
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
