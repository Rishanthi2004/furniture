import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { CartItem, OrderDetails, formatPrice } from '../types/furniture';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderDetails: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [formData, setFormData] = useState({
    name: 'Aarav Mehta',
    phone: '+91 98765 43210',
    email: 'aarav.mehta@example.com',
    address: 'B-402, Lotus Greens, Sector 78',
    city: 'New Delhi',
    postalCode: '110001',
    paymentMethod: 'upi'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = Math.round(subtotal * 0.1); // default showroom preview benefit
  const delivery = subtotal >= 40000 ? 0 : 2500;
  const total = subtotal - discount + delivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order: OrderDetails = {
        orderId: `AURA-${Math.floor(10000 + Math.random() * 90000)}`,
        items: [...items],
        subtotal,
        discount,
        deliveryCharge: delivery,
        total,
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        paymentMethod:
          formData.paymentMethod === 'upi'
            ? 'Instant UPI'
            : formData.paymentMethod === 'card'
            ? 'Card Payment'
            : formData.paymentMethod === 'netbanking'
            ? 'Net Banking'
            : 'Cash on Delivery',
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      };
      setConfirmedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 1200);
  };

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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#FAF7F2] text-left shadow-2xl border border-[#EAE2D8]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-[#786E66] hover:text-[#26211E] shadow-2xs flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {confirmedOrder ? (
              /* Order Confirmation State */
              <div className="p-8 sm:p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 animate-scale-in">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-xs uppercase font-semibold tracking-wider text-[#C86428]">
                  Order Successfully Placed
                </span>
                <h2 className="font-serif text-3xl text-[#26211E] mt-1 mb-2">
                  Thank You for Your Order!
                </h2>
                <p className="text-sm text-[#786E66] max-w-md mb-6">
                  Your reference ID is{' '}
                  <strong className="text-[#26211E] font-mono">
                    #{confirmedOrder.orderId}
                  </strong>
                  . Our white-glove concierge will call you within 24 hours to schedule precision delivery.
                </p>

                {/* Receipt Card */}
                <div className="w-full max-w-lg bg-white p-6 rounded-2xl border border-[#EAE2D8] text-xs text-left mb-8 shadow-xs space-y-3">
                  <div className="flex justify-between pb-2 border-b border-[#EAE2D8]">
                    <span className="text-[#786E66]">Delivery Address</span>
                    <span className="text-[#26211E] font-medium text-right max-w-xs">
                      {confirmedOrder.customerName}, {confirmedOrder.address}, {confirmedOrder.city} - {confirmedOrder.postalCode}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#EAE2D8]">
                    <span className="text-[#786E66]">Payment Method</span>
                    <span className="text-[#26211E] font-medium">
                      {confirmedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#EAE2D8]">
                    <span className="text-[#786E66]">Items Ordered</span>
                    <span className="text-[#26211E] font-medium">
                      {confirmedOrder.items.length} piece(s)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#26211E] pt-1">
                    <span>Total Paid</span>
                    <span className="font-mono text-base text-[#C86428] tabular-nums">
                      {formatPrice(confirmedOrder.total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#26211E] hover:bg-[#3B3632] text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Return to Showroom
                </button>
              </div>
            ) : (
              /* Active Checkout Form */
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Form Inputs (7 cols) */}
                <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 sm:p-8 space-y-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C86428]">
                      Checkout
                    </span>
                    <h2 className="font-serif text-2xl text-[#26211E] tracking-tight">
                      Delivery & Contact Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#4A433E] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4A433E] mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A433E] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A433E] mb-1">
                      Street Address & Apartment *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#4A433E] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4A433E] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({ ...formData, postalCode: e.target.value })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-[#EAE2D8] rounded-xl focus:outline-none focus:border-[#C86428]"
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#26211E] mb-2.5">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      {[
                        { id: 'upi', label: 'UPI / QR Code', icon: QrCode },
                        { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                        { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                        { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
                      ].map((pm) => {
                        const Icon = pm.icon;
                        const isSelected = formData.paymentMethod === pm.id;
                        return (
                          <button
                            type="button"
                            key={pm.id}
                            onClick={() =>
                              setFormData({ ...formData, paymentMethod: pm.id })
                            }
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'border-[#C86428] bg-white text-[#26211E] shadow-2xs ring-1 ring-[#C86428]'
                                : 'border-[#EAE2D8] bg-white/70 text-[#786E66] hover:bg-white'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-[#C86428]' : ''}`} />
                            <span className="font-medium">{pm.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#C86428] hover:bg-[#B2531D] text-white font-medium text-sm shadow-xs transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Securing Order...</span>
                    ) : (
                      <>
                        <span>Place Order — {formatPrice(total)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Order Summary (5 cols) */}
                <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F4EFEB] border-t lg:border-t-0 lg:border-l border-[#EAE2D8] flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#26211E] mb-4">
                      Order Summary ({items.length} items)
                    </h3>

                    {/* Preview item thumbnails */}
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#EAE2D8]/70"
                        >
                          <img
                            src={item.product.image}
                            alt=""
                            className="w-12 h-12 object-contain bg-[#FAF7F2] rounded-lg p-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-medium text-[#26211E] truncate">
                              {item.product.name}
                            </h5>
                            <p className="text-[11px] text-[#786E66]">
                              Qty: {item.quantity} · {item.selectedColor.name}
                            </p>
                          </div>
                          <span className="font-mono text-xs font-semibold text-[#26211E] tabular-nums">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Calculation breakdown */}
                    <div className="mt-6 pt-4 border-t border-[#EAE2D8] space-y-2 text-xs text-[#786E66]">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-mono text-[#26211E] tabular-nums">
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#C86428]">
                        <span>VIP Showroom Benefit</span>
                        <span className="font-mono tabular-nums">
                          -{formatPrice(discount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>White-Glove Delivery</span>
                        <span className="font-mono tabular-nums">
                          {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-semibold text-[#26211E] pt-3 border-t border-[#EAE2D8]">
                        <span>Total Payable</span>
                        <span className="font-mono text-lg text-[#C86428] tabular-nums">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EAE2D8] flex items-center gap-2 text-[11px] text-[#786E66]">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>256-bit Bank Grade Encrypted · 100% Secure Checkout</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
