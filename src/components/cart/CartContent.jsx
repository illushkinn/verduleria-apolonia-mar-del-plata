import React from 'react';
import { ShoppingCart, Basket, Trash, Truck } from '@phosphor-icons/react';
import { useCartStore } from '../../lib/cart-store';

const WA_NUMBER = '5492235833114';

export default function CartContent() {
  const { items, removeItem, updateCantidad, getTotal, clearCart, generateWhatsAppMessage } = useCartStore();
  const total = getTotal();

  const handleCheckout = () => {
    const url = generateWhatsAppMessage(WA_NUMBER);
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-6">
          <ShoppingCart size={64} className="text-brand-charcoal-soft/30" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-brand-charcoal mb-2">
          Tu pedido está vacío
        </h2>
        <p className="text-brand-charcoal-soft mb-8">
          Agregá productos del catálogo para empezar
        </p>
        <a
          href="/catalogo"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-medium rounded-[--radius-button] hover:bg-brand-red-light transition-all"
        >
          Ver catálogo
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 bg-white p-4 rounded-[--radius-brand] shadow-sm border border-brand-cream-dark"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-cream-dark to-brand-cream flex items-center justify-center flex-shrink-0">
            <Basket size={28} className="text-brand-charcoal-soft/40" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-serif font-semibold text-brand-charcoal">{item.nombre}</h4>
            <p className="text-sm text-brand-charcoal-soft">
              ${item.precio.toLocaleString('es-AR')} / {item.unidad}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center border border-brand-cream-dark rounded-lg overflow-hidden">
                <button
                  onClick={() => updateCantidad(item.id, item.cantidad - 1)}
                  className="w-8 h-8 flex items-center justify-center text-brand-charcoal-soft hover:bg-brand-cream-dark transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-medium">{item.cantidad}</span>
                <button
                  onClick={() => updateCantidad(item.id, item.cantidad + 1)}
                  className="w-8 h-8 flex items-center justify-center text-brand-charcoal-soft hover:bg-brand-cream-dark transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-bold text-brand-charcoal">
              ${(item.precio * item.cantidad).toLocaleString('es-AR')}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1 text-brand-charcoal-soft/40 hover:text-brand-terracotta transition-colors"
              aria-label="Eliminar"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* Summary */}
      <div className="bg-white rounded-[--radius-brand] p-6 shadow-sm border border-brand-cream-dark mt-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-brand-charcoal-soft">
            <span>Subtotal</span>
            <span>${total.toLocaleString('es-AR')}</span>
          </div>
          <div className="flex justify-between text-sm text-brand-fresh items-center">
            <span className="flex items-center gap-1">
              <Truck size={16} />
              Delivery
            </span>
            <span>Sin cargo</span>
          </div>
          <div className="border-t border-brand-cream-dark pt-3 flex justify-between font-bold text-lg text-brand-charcoal">
            <span>Total</span>
            <span>${total.toLocaleString('es-AR')}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full mt-6 py-3.5 px-4 bg-[#25D366] text-white font-medium rounded-[--radius-button] hover:bg-[#22c35e] transition-all flex items-center justify-center gap-2 text-lg"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Enviar pedido por WhatsApp
        </button>

        <button
          onClick={clearCart}
          className="w-full mt-3 text-sm text-brand-charcoal-soft/50 hover:text-brand-terracotta transition-colors"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}
