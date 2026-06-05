import React from 'react';
import { useCartStore } from '../../lib/cart-store';

const WA_NUMBER = '5492235833114';

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateCantidad, getTotal, getItemCount, clearCart, generateWhatsAppMessage } = useCartStore();
  const total = getTotal();
  const count = getItemCount();

  const handleCheckout = () => {
    const url = generateWhatsAppMessage(WA_NUMBER);
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-cream z-50 shadow-2xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-brand-cream-dark">
            <div>
              <h2 className="font-serif text-xl font-bold text-brand-red-dark">
                Tu Pedido
              </h2>
              <p className="text-xs text-brand-charcoal-soft">
                {count} {count === 1 ? 'producto' : 'productos'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-brand-charcoal-soft hover:text-brand-charcoal transition-colors"
              aria-label="Cerrar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-4xl mb-4 block">🛒</span>
                <p className="text-brand-charcoal-soft text-sm">
                  Tu pedido está vacío
                </p>
                <p className="text-xs text-brand-charcoal-soft/60 mt-1">
                  Agregá productos del catálogo para empezar
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-white p-3 rounded-[--radius-brand] shadow-sm"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-cream-dark to-brand-cream flex items-center justify-center flex-shrink-0 text-xl">
                    🍎
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-brand-charcoal truncate">
                      {item.nombre}
                    </h4>
                    <p className="text-xs text-brand-charcoal-soft">
                      ${item.precio.toLocaleString('es-AR')} / {item.unidad}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-brand-cream-dark rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateCantidad(item.id, item.cantidad - 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm text-brand-charcoal-soft hover:text-brand-charcoal hover:bg-brand-cream-dark transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-xs font-medium">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => updateCantidad(item.id, item.cantidad + 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm text-brand-charcoal-soft hover:text-brand-charcoal hover:bg-brand-cream-dark transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-bold text-brand-charcoal ml-auto">
                        ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-brand-charcoal-soft/40 hover:text-brand-terracotta transition-colors flex-shrink-0"
                    aria-label={`Eliminar ${item.nombre}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-brand-cream-dark p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-charcoal-soft">Subtotal</span>
                <span className="text-lg font-bold text-brand-charcoal">
                  ${total.toLocaleString('es-AR')}
                </span>
              </div>
              <p className="text-xs text-brand-fresh">
                🚚 Delivery sin cargo
              </p>
              <button
                onClick={handleCheckout}
                className="w-full py-3 px-4 bg-[#25D366] text-white font-medium rounded-[--radius-button] hover:bg-[#22c35e] transition-all flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enviar pedido por WhatsApp
              </button>
              <button
                onClick={clearCart}
                className="w-full text-xs text-brand-charcoal-soft/60 hover:text-brand-terracotta transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
