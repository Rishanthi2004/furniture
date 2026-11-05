import React from 'react';
import { Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onNavigateCatalog: () => void;
  onSelectCategory: (categoryId: string) => void;
  onShowInfo: (infoText: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAbout,
  onOpenContact,
  onNavigateCatalog,
  onSelectCategory,
  onShowInfo
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#EAE2D8] text-[#4A433E]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#EAE2D8]">
          {/* Brand Info (5 cols) - matching reference image */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-flex items-baseline gap-1"
            >
              <span className="font-serif text-3xl font-medium tracking-tight text-[#26211E]">
                Furniture
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86428]" />
            </a>

            <p className="text-xs sm:text-sm text-[#786E66] max-w-sm leading-relaxed">
              Modern furniture showroom crafting organic, warm minimalist spaces. Mindfully designed, sustainably sourced, and made to endure.
            </p>

            {/* Social Icons matching reference image */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white border border-[#EAE2D8] flex items-center justify-center text-[#4A433E] hover:text-[#C86428] hover:border-[#C86428] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Pinterest SVG icon */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-8 h-8 rounded-full bg-white border border-[#EAE2D8] flex items-center justify-center text-[#4A433E] hover:text-[#C86428] hover:border-[#C86428] transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.05-.98-.1-2.48.02-3.55.11-.98.74-6.27.74-6.27s-.19-.38-.19-.94c0-.88.51-1.54 1.15-1.54.54 0 .8.41.8.9 0 .55-.35 1.36-.53 2.12-.15.64.32 1.16.95 1.16 1.14 0 2.02-1.2 2.02-2.93 0-1.53-1.1-2.6-2.67-2.6-1.95 0-3.09 1.46-3.09 2.97 0 .59.23 1.22.51 1.57.06.07.07.13.05.2-.05.23-.18.73-.2.83-.03.14-.11.17-.25.1-1-.46-1.62-1.92-1.62-3.09 0-2.52 1.83-4.83 5.28-4.83 2.77 0 4.93 1.97 4.93 4.62 0 2.75-1.74 4.97-4.14 4.97-.81 0-1.57-.42-1.83-.92l-.5 1.9c-.18.7-.67 1.57-1 2.1A12 12 0 1 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {/* Shop Column */}
            <div>
              <h4 className="font-semibold text-[#26211E] uppercase tracking-wider text-[11px] mb-3">
                Shop
              </h4>
              <ul className="space-y-2.5 text-[#786E66]">
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('seating');
                      onNavigateCatalog();
                    }}
                    className="hover:text-[#C86428] transition-colors"
                  >
                    Armchairs & Seating
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('sofas');
                      onNavigateCatalog();
                    }}
                    className="hover:text-[#C86428] transition-colors"
                  >
                    Living & Sofas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('tables');
                      onNavigateCatalog();
                    }}
                    className="hover:text-[#C86428] transition-colors"
                  >
                    Tables & Desks
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('lighting');
                      onNavigateCatalog();
                    }}
                    className="hover:text-[#C86428] transition-colors"
                  >
                    Lamps & Lighting
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('storage');
                      onNavigateCatalog();
                    }}
                    className="hover:text-[#C86428] transition-colors"
                  >
                    Minimalist Storage
                  </button>
                </li>
              </ul>
            </div>

            {/* Atelier Column */}
            <div>
              <h4 className="font-semibold text-[#26211E] uppercase tracking-wider text-[11px] mb-3">
                Atelier
              </h4>
              <ul className="space-y-2.5 text-[#786E66]">
                <li>
                  <button
                    onClick={onOpenAbout}
                    className="hover:text-[#C86428] transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenContact}
                    className="hover:text-[#C86428] transition-colors"
                  >
                    Private Consultation
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenContact}
                    className="hover:text-[#C86428] transition-colors"
                  >
                    Showroom Locations
                  </button>
                </li>
                <li>
                  <span className="text-[#A09890]">Sustainability & FSC</span>
                </li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-semibold text-[#26211E] uppercase tracking-wider text-[11px] mb-3">
                Client Care
              </h4>
              <ul className="space-y-2.5 text-[#786E66]">
                <li>
                  <button
                    onClick={onOpenContact}
                    className="hover:text-[#C86428] transition-colors"
                  >
                    Contact Concierge
                  </button>
                </li>
                <li>
                  <span>Free White-Glove Setup</span>
                </li>
                <li>
                  <span>10-Year Warranty</span>
                </li>
                <li>
                  <span>30-Day Atelier Trial</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar matching reference image */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786E66]">
          <p>© {new Date().getFullYear()} Furniture Atelier Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() =>
                onShowInfo('Privacy Policy: Customer information is encrypted and protected.')
              }
              className="hover:text-[#26211E] transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-[#D8CCC0]">·</span>
            <button
              onClick={() =>
                onShowInfo('Terms: Includes 10-year structural warranty & 30-day home trial.')
              }
              className="hover:text-[#26211E] transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-[#D8CCC0]">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-[#C86428] transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
