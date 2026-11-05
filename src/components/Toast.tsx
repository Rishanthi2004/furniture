import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Heart, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'cart' | 'wishlist' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto bg-[#26211E] text-white px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-3 text-xs"
          >
            {toast.type === 'cart' && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            {toast.type === 'wishlist' && (
              <Heart className="w-4 h-4 text-[#C86428] fill-[#C86428] shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
            )}

            <span className="flex-1 font-medium">{toast.message}</span>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </aside>
  );
};
