import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Trees, Sparkles, Check } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreCatalog: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onExploreCatalog
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#FAF7F2] text-left shadow-2xl border border-[#EAE2D8]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-[#786E66] hover:text-[#26211E] shadow-2xs flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Hero */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="relative p-8 sm:p-12 bg-[#F5EFEB] border-b border-[#EAE2D8]"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C86428]">
                About Our Atelier
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#26211E] tracking-tight mt-1 mb-3">
                Crafting Calm, Living Spaces
              </h2>
              <p className="text-sm sm:text-base text-[#786E66] leading-relaxed max-w-xl">
                Founded on the belief that everyday living should feel unhurried, grounded, and surrounded by honest materials. We design modern heirloom furniture designed to endure across generations.
              </p>
            </motion.div>

            {/* Content Pillars */}
            <div className="p-8 sm:p-12 space-y-8 bg-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D8]">
                  <div className="w-9 h-9 rounded-full bg-white text-[#C86428] flex items-center justify-center mb-3 shadow-2xs">
                    <Trees className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-medium text-[#26211E] mb-1">
                    FSC-Certified Timber
                  </h4>
                  <p className="text-xs text-[#786E66] leading-relaxed">
                    Sustainably managed European white oak, American walnut, and kiln-dried birch with traceable origins.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D8]">
                  <div className="w-9 h-9 rounded-full bg-white text-[#C86428] flex items-center justify-center mb-3 shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-medium text-[#26211E] mb-1">
                    Natural Finishes
                  </h4>
                  <p className="text-xs text-[#786E66] leading-relaxed">
                    Zero-VOC organic hardwax oils and breathable plant-based pigments that deepen in character with age.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D8]">
                  <div className="w-9 h-9 rounded-full bg-white text-[#C86428] flex items-center justify-center mb-3 shadow-2xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base font-medium text-[#26211E] mb-1">
                    10-Year Guarantee
                  </h4>
                  <p className="text-xs text-[#786E66] leading-relaxed">
                    Every joint, mortise, and internal frame is stress-tested to exceed international hospitality standards.
                  </p>
                </div>
              </motion.div>

              {/* Showroom Quote */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border-l-2 border-[#C86428]">
                <blockquote className="font-serif italic text-base sm:text-lg text-[#26211E]">
                  “Simplicity is not the absence of clutter; it is the presence of intention.”
                </blockquote>
                <p className="text-xs text-[#786E66] mt-2">
                  — AURA Atelier Design Collective, 2026
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onExploreCatalog();
                  }}
                  className="px-6 py-2.5 bg-[#C86428] hover:bg-[#B2531D] text-white text-xs font-medium rounded-xl transition-colors"
                >
                  Explore Current Collection
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
