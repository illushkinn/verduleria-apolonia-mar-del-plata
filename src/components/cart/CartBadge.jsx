import React from 'react';
import { useCartStore } from '../../lib/cart-store';

export default function CartBadge() {
  const count = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.cantidad, 0)
  );

  if (count === 0) return null;

  return (
    <span className="inline-flex items-center justify-center w-5 h-5 bg-brand-terracotta text-white text-xs font-bold rounded-full">
      {count > 99 ? '99+' : count}
    </span>
  );
}
