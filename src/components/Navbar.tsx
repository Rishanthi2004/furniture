import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onNavigateCatalog: () => void;
  onOpenSearch: () => void;
  activeView: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAbout,
  onOpenContact,
  onNavigateCatalog,
  onOpenSearch,
  activeView
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/90 backdrop-blur-md shadow-xs border-b border-[#EAE2D8]/80 py-3.5'
            : 'bg-[#FAF7F2] py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Brand Logo - exactly matching reference image typography */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-baseline gap-1"
          >
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#26211E] group-hover:text-[#C86428] transition-colors">
              Furniture
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86428] opacity-80 group-hover:scale-125 transition-transform" />
          </a>

          {/* Center Navigation Links - minimal, elegant, unboxed text */}
          <nav className="hidden md:flex items-center gap-9 text-[15px] font-medium text-[#4A433E]">
            <button
              onClick={onOpenAbout}
              className="hover:text-[#C86428] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#C86428] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              About
            </button>
            <button
              onClick={onNavigateCatalog}
              className={`hover:text-[#C86428] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#C86428] ${
                activeView === 'catalog'
                  ? 'text-[#C86428] after:scale-x-100'
                  : 'after:scale-x-0 hover:after:scale-x-100'
              } after:transition-transform`}
            >
              Catalog
            </button>
            <button
              onClick={onOpenContact}
              className="hover:text-[#C86428] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#C86428] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Contacts
            </button>
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenSearch}
              aria-label="Search furniture"
              className="p-2 text-[#4A433E] hover:text-[#C86428] hover:bg-[#F2ECE4] rounded-full transition-colors"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="relative p-2 text-[#4A433E] hover:text-[#C86428] hover:bg-[#F2ECE4] rounded-full transition-colors"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C86428] text-white text-[10px] font-semibold flex items-center justify-center rounded-full animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon - matching reference image */}
            <button
              onClick={onOpenCart}
              aria-label={`Shopping Cart (${cartCount} items)`}
              className="relative p-2 text-[#4A433E] hover:text-[#C86428] hover:bg-[#F2ECE4] rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C86428] text-white text-[10px] font-semibold flex items-center justify-center rounded-full animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4A433E] hover:text-[#26211E] rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-xs top-[60px]" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="bg-[#FAF7F2] border-b border-[#EAE2D8] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                onOpenAbout();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-base font-medium text-[#26211E] hover:text-[#C86428]"
            >
              About
            </button>
            <button
              onClick={() => {
                onNavigateCatalog();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-base font-medium text-[#26211E] hover:text-[#C86428]"
            >
              Catalog
            </button>
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-base font-medium text-[#26211E] hover:text-[#C86428]"
            >
              Contacts
            </button>
            <div className="pt-3 border-t border-[#EAE2D8] flex items-center justify-between text-sm text-[#786E66]">
              <span>Curated Showrooms</span>
              <span className="text-xs uppercase tracking-wider text-[#C86428]">In Stock & Ready</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
