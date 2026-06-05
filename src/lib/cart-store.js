import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Carrito de Apolonia — Store con persistencia en localStorage
 *
 * Cada item:
 * {
 *   id: string,
 *   nombre: string,
 *   precio: number,
 *   unidad: string,
 *   cantidad: number,
 *   imagen?: string,
 * }
 */

export const useCartStore = create(
  persist(
    (set, get) => ({
      // Estado
      items: [],
      toast: { open: false, productName: '' },

      // Acciones
      addItem: (producto) => {
        const items = get().items;
        const existente = items.find((item) => item.id === producto.id);

        if (existente) {
          set({
            items: items.map((item) =>
              item.id === producto.id
                ? { ...item, cantidad: item.cantidad + (producto.cantidad || 1) }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                unidad: producto.unidad,
                cantidad: producto.cantidad || 1,
                imagen: producto.imagen || null,
              },
            ],
          });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateCantidad: (id, cantidad) => {
        if (cantidad <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, cantidad } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Toast
      showToast: (productName) => set({ toast: { open: true, productName } }),
      hideToast: () => set({ toast: { open: false, productName: '' } }),

      // Computed
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.precio * item.cantidad,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.cantidad, 0);
      },

      // Generar mensaje para WhatsApp
      generateWhatsAppMessage: (telefono, notas = '') => {
        const items = get().items;
        const ahora = new Date();
        const fecha = ahora.toLocaleString('es-AR', {
          day: '2-digit', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        });

        let mensaje = '';
        mensaje += '🍊 *NUEVO PEDIDO — Apolonia*\n';
        mensaje += `📅 ${fecha}\n`;
        mensaje += `─────────────────\n\n`;

        mensaje += '*📍 DETALLE DEL PEDIDO*\n';
        mensaje += `━━━━━━━━━━━━━━━━\n`;

        items.forEach((item, i) => {
          const subtotal = item.precio * item.cantidad;
          mensaje += `${i + 1}. ${item.nombre}\n`;
          mensaje += `   ${item.cantidad} × $${item.precio.toLocaleString('es-AR')} = *$${subtotal.toLocaleString('es-AR')}*\n`;
        });

        mensaje += `\n━━━━━━━━━━━━━━━━\n`;
        mensaje += `*TOTAL: $${get().getTotal().toLocaleString('es-AR')}*\n`;
        mensaje += `━━━━━━━━━━━━━━━━\n\n`;

        if (notas.trim()) {
          mensaje += `*📝 Notas del cliente:*\n${notas.trim()}\n\n`;
        }

        mensaje += `*🚚 Delivery:* Sin cargo\n`;
        mensaje += `*💳 Paga al recibir*\n\n`;
        mensaje += `_Gracias por elegir Apolonia, nos contactamos a la brevedad._`;

        const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
        return url;
      },
    }),
    {
      name: 'apolonia-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
