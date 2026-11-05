import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceBenefits } from './components/ServiceBenefits';
import { PopularProducts } from './components/PopularProducts';
import { TransformYourHome } from './components/TransformYourHome';
import { FeaturedCollection } from './components/FeaturedCollection';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ProductColor, OrderDetails } from './types/furniture';

export default function App() {
  // Catalog & Filter State
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeView, setActiveView] = useState<'home' | 'catalog'>('home');

  // Modals & Drawers State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_furniture_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('aura_furniture_wishlist');
      return saved ? new Set(JSON.parse(saved)) : new Set(['cozy-armchair', 'hero-burnt-chair']);
    } catch {
      return new Set(['cozy-armchair', 'hero-burnt-chair']);
    }
  });

  // Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('aura_furniture_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('aura_furniture_wishlist', JSON.stringify(Array.from(wishlistIds)));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const addToast = useCallback((message: string, type: 'cart' | 'wishlist' | 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, selectedColor?: ProductColor, quantity = 1) => {
    const color = selectedColor || product.colors[0];
    const cartItemId = `${product.id}-${color.name}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: cartItemId, product, quantity, selectedColor: color }];
    });

    addToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}${product.name} (${color.name}) to Bag`, 'cart');
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Removed piece from Bag', 'info');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        addToast(`Removed ${product.name} from Wishlist`, 'info');
      } else {
        next.add(product.id);
        addToast(`Saved ${product.name} to Wishlist`, 'wishlist');
      }
      return next;
    });
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product);
  };

  // Product Selection / Modal Handlers
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleExploreProductById = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
      setIsDetailOpen(true);
    }
  };

  // Immediate "Buy Now" flow
  const handleBuyNow = (product: Product, color: ProductColor, quantity: number) => {
    handleAddToCart(product, color, quantity);
    setIsDetailOpen(false);
    setIsCheckoutOpen(true);
  };

  // Navigation scroll helpers
  const scrollToCatalog = () => {
    setActiveView('catalog');
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPopular = () => {
    const el = document.getElementById('popular-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollToCatalog();
    }
  };

  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));
  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#26211E] flex flex-col font-sans selection:bg-[#C86428]/15 selection:text-[#9A4B1A]">
      {/* 1. Top Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.size}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onNavigateCatalog={scrollToCatalog}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeView={activeView}
      />

      <main className="flex-1">
        {/* 2. Hero Section - hidden until scrolled to, replays on revisit */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroSection
            onShopNow={scrollToPopular}
            onExploreProduct={handleExploreProductById}
          />
        </motion.div>

        {/* 3. Service Benefits - horizontal strip */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ServiceBenefits />
        </motion.div>

        {/* 4. Popular Products - 4 flagship cards */}
        <motion.div
          id="popular-section"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <PopularProducts
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p)}
            onSelectProduct={handleSelectProduct}
            onViewAll={scrollToCatalog}
          />
        </motion.div>

        {/* 5. Transform Your Home - 3 large image cards */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <TransformYourHome
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              scrollToCatalog();
            }}
            onExploreProduct={handleExploreProductById}
          />
        </motion.div>

        {/* 6. Featured Collection - "Designed for Living" full-width section */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <FeaturedCollection onExploreCollection={scrollToCatalog} />
        </motion.div>

        {/* 7. Comprehensive Catalog & Filters */}
        <motion.div
          id="catalog-section"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <CatalogSection
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => handleAddToCart(p)}
            onSelectProduct={handleSelectProduct}
          />
        </motion.div>
      </main>

      {/* 8. Minimal Luxury Footer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Footer
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onNavigateCatalog={scrollToCatalog}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            scrollToCatalog();
          }}
          onShowInfo={(msg) => addToast(msg, 'info')}
        />
      </motion.div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(p, c, q) => handleAddToCart(p, c, q)}
        onBuyNow={handleBuyNow}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onContinueShopping={scrollToCatalog}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={(order: OrderDetails) => {
          setCartItems([]);
          addToast(`Order #${order.orderId} placed successfully!`, 'cart');
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onSelectProduct={handleSelectProduct}
      />

      {/* About Heritage Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onExploreCatalog={scrollToCatalog}
      />

      {/* Contact & Consultation Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={handleSelectProduct}
      />

      {/* Floating Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
