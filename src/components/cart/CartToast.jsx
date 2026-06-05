import { useEffect } from 'react';
import { CheckCircle, X } from '@phosphor-icons/react';
import { useCartStore } from '../../lib/cart-store';

export default function CartToast() {
  const toast = useCartStore((s) => s.toast);
  const hideToast = useCartStore((s) => s.hideToast);

  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(hideToast, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.open, hideToast]);

  if (!toast.open) return null;

  return (
    <div className="fixed top-24 right-4 z-[100] animate-slide-in">
      <div className="bg-white/90 backdrop-blur-xl backdrop-saturate-150 border border-white/20 border-l-4 border-l-brand-fresh rounded-2xl shadow-xl shadow-black/15 ring-1 ring-black/5 p-4 flex items-center gap-3 min-w-[280px]">
        <div className="w-10 h-10 rounded-xl bg-brand-fresh/10 flex items-center justify-center">
          <CheckCircle size={24} className="text-brand-fresh" weight="fill" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-brand-charcoal">Agregado al pedido</p>
          <p className="text-xs text-brand-charcoal-soft truncate">{toast.productName}</p>
        </div>
        <button onClick={hideToast} className="p-1 text-brand-charcoal-soft/40 hover:text-brand-charcoal transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
