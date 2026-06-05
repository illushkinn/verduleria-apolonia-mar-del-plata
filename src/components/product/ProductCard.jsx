import { Basket, SealCheck } from '@phosphor-icons/react';
import { useCartStore } from '../../lib/cart-store';

export default function ProductCard({ producto, destacado }) {
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useCartStore((s) => s.showToast);

  const handleAdd = () => {
    addItem({
      id: producto.id || producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio || 0,
      unidad: producto.unidad,
    });
    showToast(producto.nombre);
  };

  const precioMostrar = producto.precio
    ? `$${typeof producto.precio === 'number' ? producto.precio.toLocaleString('es-AR') : producto.precio}`
    : null;

  return (
    <article className="group bg-white rounded-[--radius-brand] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/3] bg-gradient-to-br from-brand-cream-dark to-brand-cream flex items-center justify-center relative">
        <Basket size={48} className="text-brand-charcoal-soft/30" weight="light" />
        {(destacado || producto.destacado) && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full shadow-sm flex items-center gap-1">
            <SealCheck size={12} className="text-brand-gold" weight="fill" />
            <span>Destacado</span>
          </span>
        )}
        <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-medium rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-fresh"></span>
          {producto.stock || '—'} kg
        </span>
      </div>
      <div className="p-4">
        <span className="text-[10px] font-medium text-brand-terracotta uppercase tracking-wider">{producto.categoria}</span>
        <h3 className="font-serif text-base font-semibold text-brand-charcoal group-hover:text-brand-red transition-colors mt-1">
          {producto.nombre}
        </h3>
        <div className="flex items-center justify-between mt-3">
          {precioMostrar ? (
            <span className="text-lg font-bold text-brand-charcoal">
              {precioMostrar}
              <span className="text-xs font-normal text-brand-charcoal-soft">/{producto.unidad}</span>
            </span>
          ) : (
            <span className="text-sm text-brand-charcoal-soft">
              <span className="text-xs font-normal">/{producto.unidad}</span>
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 w-full py-2.5 px-4 bg-brand-red text-white text-sm font-medium rounded-[--radius-button] hover:bg-brand-red-light transition-all cursor-pointer active:scale-[0.98]"
        >
          Agregar al pedido
        </button>
      </div>
    </article>
  );
}
