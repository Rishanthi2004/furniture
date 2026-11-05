import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Truck,
  Sparkles,
  Check
} from 'lucide-react';
import { CartItem, formatPrice } from '../types/furniture';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  onContinueShopping
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedPromo === 'AURA10' ? Math.round(subtotal * 0.1) : 0;
  const freeShippingThreshold = 40000;
  const isFreeDelivery = subtotal >= freeShippingThreshold || items.length === 0;
  const deliveryFee = isFreeDelivery ? 0 : 2500;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURA10') {
      setAppliedPromo('AURA10');
      setPromoError(null);
    } else {
      setPromoError('Invalid code. Use code AURA10 for 10% discount.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#EAE2D8]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#EAE2D8] flex items-center justify-between bg-white/60">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#C86428]" />
                <h2 className="font-serif text-xl font-medium text-[#26211E]">
                  Your Bag
                </h2>
                <span className="text-xs bg-[#EAE2D8] text-[#4A433E] px-2 py-0.5 rounded-full font-medium">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="p-2 text-[#786E66] hover:text-[#26211E] rounded-full hover:bg-[#F2ECE4] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            <div className="px-6 py-3 bg-[#F4EFEB] border-b border-[#EAE2D8] text-xs">
              <div className="flex items-center justify-between text-[#4A433E] mb-1.5">
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck className="w-3.5 h-3.5 text-[#C86428]" />
                  {isFreeDelivery
                    ? 'Eligible for Free White-Glove Setup'
                    : `Add ${formatPrice(freeShippingThreshold - subtotal)} for Free Delivery`}
                </span>
                <span className="font-semibold">{isFreeDelivery ? '100%' : `${Math.round((subtotal / freeShippingThreshold) * 100)}%`}</span>
              </div>
              <div className="w-full bg-[#EAE2D8] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#C86428] h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`
                  }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white border border-[#EAE2D8] flex items-center justify-center text-[#786E66] mb-4 shadow-2xs">
                    <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#26211E] mb-1">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#786E66] max-w-xs mb-6">
                    Explore our hand-finished furniture pieces to begin crafting your space.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onContinueShopping();
                    }}
                    className="px-6 py-2.5 bg-[#C86428] text-white text-xs font-medium rounded-xl hover:bg-[#B2531D] transition-colors"
                  >
                    Browse Popular Pieces
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#EAE2D8]/80 shadow-2xs"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FAF7F2] p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-medium text-[#26211E] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#A09890] hover:text-rose-600 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Swatch */}
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-[#786E66]">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      </div>

                      {/* Stepper & Price */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F4EFEB]">
                        <div className="flex items-center border border-[#EAE2D8] rounded-lg bg-[#FAF7F2] px-1.5 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#786E66] hover:text-[#26211E]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold font-mono tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#786E66] hover:text-[#26211E]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-sm font-semibold text-[#26211E] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#EAE2D8] space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (try AURA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#26211E] hover:bg-[#3B3632] text-white text-xs font-medium rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedPromo && (
                  <p className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" /> Code AURA10 applied (10% off showroom discount)
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-rose-600">{promoError}</p>
                )}

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-xs text-[#786E66] pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#26211E] tabular-nums">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#C86428]">
                      <span>VIP Showroom Discount (10%)</span>
                      <span className="font-mono tabular-nums">
                        -{formatPrice(discountAmount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>White-Glove Delivery & Assembly</span>
                    <span className="font-mono tabular-nums">
                      {deliveryFee === 0 ? (
                        <strong className="text-emerald-700 font-normal">FREE</strong>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#26211E] pt-2 border-t border-[#EAE2D8]">
                    <span>Total Amount</span>
                    <span className="font-mono text-base text-[#C86428] tabular-nums">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={onProceedCheckout}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#C86428] hover:bg-[#B2531D] text-white font-medium text-sm shadow-xs transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
