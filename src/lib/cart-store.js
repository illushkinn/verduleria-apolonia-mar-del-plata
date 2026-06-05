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
        let mensaje = '🍎 *Pedido Apolonia*\n\n';
        mensaje += '*Productos:*\n';

        items.forEach((item) => {
          mensaje += `• ${item.nombre} x${item.cantidad} — $${(item.precio * item.cantidad).toLocaleString('es-AR')}\n`;
        });

        mensaje += `\n*Total: $${get().getTotal().toLocaleString('es-AR')}*\n`;

        if (notas) {
          mensaje += `\n*Notas:* ${notas}`;
        }

        mensaje += '\n\n📍 *Delivery sin cargo*';
        mensaje += '\n💬 ¿Confirmamos?';

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
