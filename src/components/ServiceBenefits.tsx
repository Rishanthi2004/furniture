import React from 'react';
import { Truck, ShieldCheck, Tag } from 'lucide-react';
import { motion } from 'motion/react';

export const ServiceBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Free Delivery',
      subtitle: 'White-glove unboxing on all standard orders'
    },
    {
      icon: ShieldCheck,
      title: 'High Quality',
      subtitle: '10-year warranty on timber frames & joinery'
    },
    {
      icon: Tag,
      title: 'Best Prices',
      subtitle: 'Direct atelier craftsmanship without middlemen'
    }
  ];

  return (
    <section className="py-6 sm:py-8 border-y border-[#EAE2D8]/70 bg-[#F7F3EC]/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2D8CC]"
        >
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center justify-center gap-3.5 py-3 md:py-1 px-4 ${
                  idx === 0 ? 'md:pl-0' : ''
                } ${idx === 2 ? 'md:pr-0' : ''}`}
              >
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#EAE2D8] flex items-center justify-center text-[#C86428] shrink-0">
                  <Icon className="w-4 h-4 stroke-[1.8]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-[#26211E] tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#786E66] hidden sm:block">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
