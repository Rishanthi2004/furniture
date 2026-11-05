import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ChevronDown, ChevronUp, ChevronRight, ArrowRight, Sparkles, Sliders } from 'lucide-react';
import { Product } from '../types/furniture';
import { HeroSection } from './HeroSection';
import { ServiceBenefits } from './ServiceBenefits';
import { PopularProducts } from './PopularProducts';
import { TransformYourHome } from './TransformYourHome';
import { FeaturedCollection } from './FeaturedCollection';
import { CatalogSection } from './CatalogSection';

interface CinematicScrollerProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onExploreProductById: (productId: string) => void;
}

const SLIDES = [
  { id: 'hero', number: '01', title: 'Modern Living', targetProgress: 0.05 },
  { id: 'popular', number: '02', title: 'Popular Products', targetProgress: 0.30 },
  { id: 'transform', number: '03', title: 'Transform Your Home', targetProgress: 0.54 },
  { id: 'featured', number: '04', title: 'Designed for Living', targetProgress: 0.78 },
  { id: 'catalog', number: '05', title: 'Curated Catalog', targetProgress: 0.97 }
];

export const CinematicScroller: React.FC<CinematicScrollerProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onExploreProductById
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [forceVertical, setForceVertical] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Check viewport width for responsive mobile behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set up vertical scroll tracking across 500vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Track active slide index based on progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v < 0.18) setActiveSlideIndex(0);
      else if (v < 0.42) setActiveSlideIndex(1);
      else if (v < 0.66) setActiveSlideIndex(2);
      else if (v < 0.88) setActiveSlideIndex(3);
      else setActiveSlideIndex(4);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Scroll jump helper
  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;
    const targetY = containerTop + scrollableDistance * SLIDES[index].targetProgress;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const nextSlide = () => {
    if (activeSlideIndex < SLIDES.length - 1) {
      scrollToSlide(activeSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlideIndex > 0) {
      scrollToSlide(activeSlideIndex - 1);
    }
  };

  // --- ALTERNATING SCROLL TRANSFORMS (5 Stages across 0 to 1) ---

  // Slide 0: Hero (Initial position, exits to the LEFT)
  const x0 = useTransform(scrollYProgress, [0, 0.12, 0.24], ['0%', '0%', '-100%']);
  const scale0 = useTransform(scrollYProgress, [0, 0.12, 0.24], [1, 1, 0.92]);
  const opacity0 = useTransform(scrollYProgress, [0, 0.14, 0.24], [1, 1, 0]);
  const pointerEvents0 = useTransform(scrollYProgress, (v) => (v < 0.2 ? 'auto' : 'none'));

  // Slide 1: Popular Products (Enters from the RIGHT, exits to the RIGHT)
  const x1 = useTransform(
    scrollYProgress,
    [0.12, 0.24, 0.36, 0.48],
    ['100%', '0%', '0%', '100%']
  );
  const scale1 = useTransform(
    scrollYProgress,
    [0.12, 0.24, 0.36, 0.48],
    [0.92, 1, 1, 0.92]
  );
  const opacity1 = useTransform(
    scrollYProgress,
    [0.12, 0.22, 0.38, 0.48],
    [0, 1, 1, 0]
  );
  const pointerEvents1 = useTransform(scrollYProgress, (v) =>
    v >= 0.16 && v < 0.44 ? 'auto' : 'none'
  );

  // Slide 2: Transform Your Home (Enters from the LEFT, exits to the LEFT)
  const x2 = useTransform(
    scrollYProgress,
    [0.36, 0.48, 0.60, 0.72],
    ['-100%', '0%', '0%', '-100%']
  );
  const scale2 = useTransform(
    scrollYProgress,
    [0.36, 0.48, 0.60, 0.72],
    [0.92, 1, 1, 0.92]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0.36, 0.46, 0.62, 0.72],
    [0, 1, 1, 0]
  );
  const pointerEvents2 = useTransform(scrollYProgress, (v) =>
    v >= 0.40 && v < 0.68 ? 'auto' : 'none'
  );

  // Slide 3: Featured Collection (Enters from the RIGHT, exits to the RIGHT)
  const x3 = useTransform(
    scrollYProgress,
    [0.60, 0.72, 0.84, 0.94],
    ['100%', '0%', '0%', '100%']
  );
  const scale3 = useTransform(
    scrollYProgress,
    [0.60, 0.72, 0.84, 0.94],
    [0.92, 1, 1, 0.92]
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0.60, 0.70, 0.86, 0.94],
    [0, 1, 1, 0]
  );
  const pointerEvents3 = useTransform(scrollYProgress, (v) =>
    v >= 0.64 && v < 0.90 ? 'auto' : 'none'
  );

  // Slide 4: Product Showcase / Catalog (Enters from the LEFT, rests till end)
  const x4 = useTransform(
    scrollYProgress,
    [0.84, 0.94, 1.0],
    ['-100%', '0%', '0%']
  );
  const scale4 = useTransform(
    scrollYProgress,
    [0.84, 0.94, 1.0],
    [0.92, 1, 1]
  );
  const opacity4 = useTransform(
    scrollYProgress,
    [0.84, 0.92, 1.0],
    [0, 1, 1]
  );
  const pointerEvents4 = useTransform(scrollYProgress, (v) =>
    v >= 0.86 ? 'auto' : 'none'
  );

  // Parallax layers for 3D depth
  const heroChairParallax = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const heroSofaParallax = useTransform(scrollYProgress, [0, 0.2], [0, 20]);
  const popularCardParallax = useTransform(scrollYProgress, [0.15, 0.35], [30, -30]);
  const transformCardParallax = useTransform(scrollYProgress, [0.38, 0.60], [-40, 40]);
  const featuredPhotoScale = useTransform(scrollYProgress, [0.60, 0.84], [1.08, 1]);

  // If mobile or reduced motion is preferred or user toggled vertical mode
  if (isMobile || prefersReduced || forceVertical) {
    return (
      <div className="flex flex-col">
        {/* Mode switcher notice on desktop */}
        {!isMobile && (
          <div className="sticky top-20 z-30 flex justify-center py-2">
            <button
              onClick={() => setForceVertical(false)}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#26211E] text-white text-xs font-medium rounded-full shadow-md hover:bg-[#C86428] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enable Cinematic Horizontal Scroll</span>
            </button>
          </div>
        )}

        <div id="hero-section">
          <HeroSection
            onShopNow={() => {
              document.getElementById('popular-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreProduct={onExploreProductById}
          />
        </div>

        <ServiceBenefits />

        <div id="popular-section">
          <PopularProducts
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
            onViewAll={() => {
              document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        <div id="transform-section">
          <TransformYourHome
            onSelectCategory={(catId) => {
              onSelectCategory(catId);
              document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreProduct={onExploreProductById}
          />
        </div>

        <div id="featured-section">
          <FeaturedCollection
            onExploreCollection={() => {
              document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        <div id="catalog-section">
          <CatalogSection
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            wishlistIds={wishlistIds}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
          />
        </div>
      </div>
    );
  }

  // --- FULL CINEMATIC HORIZONTAL SCROLL PRESENTATION (Desktop) ---
  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520vh] bg-[#FAF7F2]"
      style={{ perspective: 1200 }}
    >
      {/* Top Thin Horizontal Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#C86428] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Cinematic Slide Navigator (Bottom Center) */}
      <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#EAE2D8]/80 text-xs">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={activeSlideIndex === 0}
          className="p-1 rounded-lg text-[#786E66] hover:text-[#26211E] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Previous slide"
        >
          <ChevronUp className="w-4 h-4 -rotate-90" />
        </button>

        {/* Slide Dots & Chapter Title */}
        <div className="flex items-center gap-2 px-1">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to ${slide.title}`}
              className="group relative flex items-center gap-1.5 py-1"
            >
              <span
                className={`block transition-all duration-300 rounded-full ${
                  activeSlideIndex === idx
                    ? 'w-6 h-2 bg-[#C86428]'
                    : 'w-2 h-2 bg-[#D8CCC0] group-hover:bg-[#786E66]'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Active Slide Label */}
        <div className="h-4 w-px bg-[#EAE2D8] mx-1" />
        <span className="font-mono font-medium text-[#26211E] tabular-nums whitespace-nowrap">
          {SLIDES[activeSlideIndex].number} / 05
        </span>
        <span className="text-[#786E66] hidden sm:inline whitespace-nowrap">
          · {SLIDES[activeSlideIndex].title}
        </span>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={activeSlideIndex === SLIDES.length - 1}
          className="p-1 rounded-lg text-[#786E66] hover:text-[#26211E] hover:bg-[#FAF7F2] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Next slide"
        >
          <ChevronDown className="w-4 h-4 -rotate-90" />
        </button>

        {/* Mode Toggle to Continuous Vertical */}
        <div className="h-4 w-px bg-[#EAE2D8] mx-1" />
        <button
          onClick={() => setForceVertical(true)}
          className="text-[11px] text-[#786E66] hover:text-[#C86428] font-medium flex items-center gap-1 pl-1"
          title="Switch to standard vertical scroll"
        >
          <Sliders className="w-3 h-3" />
          <span className="hidden md:inline">Classic View</span>
        </button>
      </div>

      {/* Pinned Viewport Container (Sticky 100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* SLIDE 0: Hero Section (Initial, exits left) */}
        <motion.div
          style={{
            x: x0,
            scale: scale0,
            opacity: opacity0,
            pointerEvents: pointerEvents0
          }}
          className="absolute inset-0 w-full h-full flex flex-col justify-between pt-16 pb-4 px-6 sm:px-8 max-w-7xl mx-auto"
        >
          {/* Main Hero Split */}
          <div className="flex-1 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-widest text-[#C86428] font-semibold mb-2">
                  Atelier 2026 Collection
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#26211E] tracking-tight leading-[1.08] mb-4 text-balance">
                  Stunning & Modern Furniture
                </h1>
                <p className="text-[#786E66] text-base leading-relaxed max-w-md mb-6">
                  Create your perfect space with our stylish and comfortable designs.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => scrollToSlide(1)}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#C86428] hover:bg-[#B2531D] text-white font-medium text-sm rounded-xl shadow-xs transition-transform transform hover:-translate-y-0.5"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onExploreProductById('hero-burnt-chair')}
                    className="text-xs uppercase tracking-wider font-semibold text-[#786E66] hover:text-[#C86428] py-2 px-3 transition-colors"
                  >
                    View Chair Spec
                  </button>
                </div>
              </div>

              {/* Right Column: Living Room Scene with Parallax */}
              <div className="lg:col-span-7 relative">
                <div className="relative rounded-3xl overflow-hidden bg-[#FAF7F2] p-2">
                  <motion.div
                    style={{ x: heroSofaParallax }}
                    className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xs"
                  >
                    <img
                      src="/assets/images/hero_living_room_1793872982731.jpg"
                      alt="Modern living room with cream sofa and orange accent chair"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-amber-100/20 mix-blend-soft-light pointer-events-none" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Service Benefits Docked at Bottom of Slide */}
          <div className="w-full pt-2">
            <ServiceBenefits />
          </div>
        </motion.div>

        {/* SLIDE 1: Popular Products (Enters from RIGHT) */}
        <motion.div
          style={{
            x: x1,
            scale: scale1,
            opacity: opacity1,
            pointerEvents: pointerEvents1
          }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center px-6 sm:px-8 max-w-7xl mx-auto pt-16 pb-12"
        >
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C86428]">
              Flagship Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#26211E] tracking-tight mt-1">
              Popular Products
            </h2>
            <div className="w-12 h-0.5 bg-[#C86428]/60 mx-auto mt-2.5 rounded-full" />
          </div>

          {/* 4 Flagship Cards with Staggered Parallax Effect */}
          <motion.div
            style={{ y: popularCardParallax }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.filter((p) => p.isPopular).slice(0, 4).map((product, idx) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group cursor-pointer flex flex-col bg-white rounded-2xl p-4 border border-[#EAE2D8] shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF7F2] p-2 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-2xs transition-colors ${
                      wishlistIds.has(product.id)
                        ? 'bg-[#C86428] text-white'
                        : 'bg-white/90 text-[#786E66] hover:text-[#C86428]'
                    }`}
                  >
                    <span className="text-sm">♥</span>
                  </button>
                </div>

                <div className="pt-3 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-medium text-[#26211E] group-hover:text-[#C86428] transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#786E66] mt-0.5 truncate">
                      {product.materials[0]}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#F4EFEB] flex items-center justify-between">
                    <span className="font-mono font-semibold text-[#26211E] text-sm tabular-nums">
                      {'₹' + product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="px-3 py-1 bg-[#FAF7F2] hover:bg-[#C86428] text-[#26211E] hover:text-white rounded-lg text-xs font-medium border border-[#EAE2D8] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Advance to Catalog Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => scrollToSlide(4)}
              className="group inline-flex items-center gap-2 px-6 py-2.5 bg-[#EFE9DF] hover:bg-[#E5DDD0] text-[#4A433E] hover:text-[#26211E] text-sm font-medium rounded-xl transition-all"
            >
              <span>View All Pieces</span>
              <ChevronRight className="w-4 h-4 text-[#786E66] group-hover:text-[#C86428] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </motion.div>

        {/* SLIDE 2: Transform Your Home (Enters from LEFT) */}
        <motion.div
          style={{
            x: x2,
            scale: scale2,
            opacity: opacity2,
            pointerEvents: pointerEvents2
          }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center px-6 sm:px-8 max-w-7xl mx-auto pt-16 pb-12"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C86428]">
              Editorial Curation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#26211E] tracking-tight mt-1">
              Transform Your Home
            </h2>
            <p className="mt-2 text-sm text-[#786E66]">
              Explore our collection and find the perfect pieces to elevate your interior.
            </p>
          </div>

          {/* 3 Large Image Cards with Internal Parallax Depth */}
          <motion.div
            style={{ x: transformCardParallax }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                id: 'new-arrivals',
                title: 'New Arrivals',
                subtitle: 'Artisanal Rattan & Timber',
                image: '/assets/furniture/cat_new_arrivals.png',
                targetId: 'rattan-curve-lounge',
                category: 'seating'
              },
              {
                id: 'minimalist-design',
                title: 'Minimalist Design',
                subtitle: 'Sculptural Shelving & Spaces',
                image: '/assets/furniture/cat_minimalist.png',
                targetId: 'minimalist-display-shelf',
                category: 'storage'
              },
              {
                id: 'special-offers',
                title: 'Special Offers',
                subtitle: 'Curated Terracotta Accents',
                image: '/assets/furniture/cat_special_offers.png',
                targetId: 'velvet-round-ottoman',
                category: 'seating'
              }
            ].map((card) => (
              <div
                key={card.id}
                onClick={() => onExploreProductById(card.targetId)}
                className="group cursor-pointer relative bg-white rounded-2xl overflow-hidden border border-[#EAE2D8] shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 flex items-center justify-center text-[#26211E] group-hover:bg-[#C86428] group-hover:text-white transition-all shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                  </div>
                </div>

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
                      scrollToSlide(4);
                    }}
                    className="text-xs text-[#C86428] hover:underline font-medium"
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* SLIDE 3: Featured Collection (Enters from RIGHT) */}
        <motion.div
          style={{
            x: x3,
            scale: scale3,
            opacity: opacity3,
            pointerEvents: pointerEvents3
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center px-6 sm:px-8 max-w-7xl mx-auto pt-16 pb-12"
        >
          <div className="group relative w-full h-[75vh] max-h-[580px] rounded-3xl overflow-hidden flex items-center justify-center p-8 sm:p-14 shadow-xl border border-[#EAE2D8]">
            {/* Cinematic Background Image with Scroll Scale */}
            <motion.div
              style={{ scale: featuredPhotoScale }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src="/assets/furniture/designed_for_living.png"
                alt="Living room photograph"
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 backdrop-blur-[0.5px]" />
            </motion.div>

            {/* Editorial Overlay */}
            <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
              <span className="text-xs uppercase tracking-[0.25em] text-[#EFE7DE] font-medium mb-3">
                2026 Master Series
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-4 text-balance">
                Designed for Living
              </h2>
              <p className="text-[#EFE7DE] text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
                Comfort, elegance, and timeless design.
              </p>
              <button
                onClick={() => scrollToSlide(4)}
                className="group/btn inline-flex items-center gap-3 px-8 py-3.5 bg-white text-[#26211E] hover:bg-[#C86428] hover:text-white rounded-xl font-medium text-sm sm:text-base shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* SLIDE 4: Product Showcase / Full Catalog (Enters from LEFT) */}
        <motion.div
          style={{
            x: x4,
            scale: scale4,
            opacity: opacity4,
            pointerEvents: pointerEvents4
          }}
          className="absolute inset-0 w-full h-full flex flex-col justify-start px-6 sm:px-8 max-w-7xl mx-auto pt-20 pb-16 overflow-y-auto"
        >
          <CatalogSection
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            wishlistIds={wishlistIds}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
          />
        </motion.div>
      </div>
    </div>
  );
};
