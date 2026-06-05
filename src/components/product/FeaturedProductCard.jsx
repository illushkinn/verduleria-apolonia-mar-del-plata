import { Basket } from '@phosphor-icons/react';
import { useCartStore } from '../../lib/cart-store';

export default function FeaturedProductCard({ producto }) {
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useCartStore((s) => s.showToast);

  const handleAdd = () => {
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio ? parseInt(producto.precio.replace(/[^0-9]/g, '')) : 0,
      unidad: producto.unidad,
    });
    showToast(producto.nombre);
  };

  return (
    <article className="group bg-white rounded-[--radius-brand] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/3] bg-gradient-to-br from-brand-cream-dark to-brand-cream flex items-center justify-center relative">
        {producto.imagen ? (
          <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-cover" />
        ) : (
          <Basket size={48} className="text-brand-charcoal-soft/30 opacity-30" weight="light" />
        )}
        {producto.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full shadow-sm flex items-center gap-1">
            {producto.badgeIcon === 'sparkle' && (
              <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor" className="text-brand-gold">
                <path d="M184,128a56,56,0,0,0-55.37-48H128A56,56,0,0,0,72,128v32a8,8,0,0,0,8,8h96a8,8,0,0,0,8-8Zm-16,24H88V128a40,40,0,0,1,80,0Z"/>
              </svg>
            )}
            {producto.badgeIcon === 'star' && (
              <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor" className="text-brand-gold">
                <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.74,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a16,16,0,0,1,29.44,0l23.21,55.36,59.46,5.15a16,16,0,0,1,9.11,28.06Z"/>
              </svg>
            )}
            {producto.badgeIcon === 'leaf' && (
              <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor" className="text-brand-fresh">
                <path d="M213.66,42.34a8,8,0,0,0-7.07-2.1C132.57,54.18,92.6,83.13,74.7,130.39c-5.29,14-7.87,28.48-8.86,42.27C52.13,153.75,48,131.14,48,112c0-64,80-80,80-80a8,8,0,0,0,0-16c0,0-96,16-96,96,0,51.79,26.62,79.74,47.34,92.69L56.73,207.6a8,8,0,0,0,11.54,11.06l23.34-24.34C103.21,201.1,113.21,208,128,208a8,8,0,0,0,0-16c-33.85,0-48-28.08-48-48,0-40,40-64,80-72-30.5,58.65-15.54,101.85-2.2,118.17a8,8,0,0,0,13.59-5.74c1.32-23.24,10.91-51.53,25.35-80.35C213.68,87.32,222,55.48,218.49,44.8Z"/>
              </svg>
            )}
            {producto.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-brand-charcoal group-hover:text-brand-red transition-colors">
          {producto.nombre}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-brand-charcoal">
            {producto.precio}
            <span className="text-sm font-normal text-brand-charcoal-soft">/{producto.unidad}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-brand-fresh">
            <span className="w-2 h-2 rounded-full bg-brand-fresh"></span>
            Disponible
          </span>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 w-full py-2.5 px-4 bg-brand-red text-white text-sm font-medium rounded-[--radius-button] hover:bg-brand-red-light transition-all cursor-pointer active:scale-[0.98]"
        >
          Agregar al pedido
        </button>
      </div>
    </article>
  );
}
