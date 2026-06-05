import { useState, useMemo } from 'react';
import { MagnifyingGlass, Funnel, X } from '@phosphor-icons/react';
import ProductCard from '../product/ProductCard';

export default function CatalogSection({ productos }) {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Extraer categorías únicas de los productos
  const categorias = useMemo(() => {
    const cats = [...new Set(productos.map((p) => p.categoria))];
    return ['Todas', ...cats.sort()];
  }, [productos]);

  // Productos filtrados
  const filtered = useMemo(() => {
    let result = productos;

    // Filtro por categoría
    if (activeCategory !== 'Todas') {
      result = result.filter((p) => p.categoria === activeCategory);
    }

    // Filtro por búsqueda
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion?.toLowerCase().includes(q) ||
          p.categoria?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [productos, activeCategory, searchQuery]);

  const totalCount = productos.length;
  const filteredCount = filtered.length;

  return (
    <>
      {/* Filters */}
      <section className="py-6 bg-white border-b border-brand-cream-dark sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-red text-white border-brand-red shadow-sm'
                    : 'border-brand-cream-dark text-brand-charcoal-soft hover:border-brand-red hover:text-brand-red'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-charcoal-soft/50"
              weight="bold"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscá tu fruta o verdura..."
              className="w-full pl-10 pr-10 py-3 bg-brand-cream rounded-[--radius-button] border border-brand-cream-dark text-sm placeholder:text-brand-charcoal-soft/50 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal-soft/40 hover:text-brand-charcoal transition-colors"
              >
                <X size={16} weight="bold" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 bg-brand-cream min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Result count */}
          <div className="flex items-center gap-2 mb-6 text-sm text-brand-charcoal-soft">
            <Funnel size={14} weight="bold" />
            <span>
              {filteredCount === totalCount
                ? `${totalCount} productos`
                : `${filteredCount} de ${totalCount} productos`}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <MagnifyingGlass size={48} className="mx-auto text-brand-charcoal-soft/20 mb-4" weight="light" />
              <p className="text-brand-charcoal-soft text-lg font-medium">No encontramos lo que buscás</p>
              <p className="text-brand-charcoal-soft/60 text-sm mt-1">
                Probá con otro término o seleccioná otra categoría
              </p>
              <button
                onClick={() => {
                  setActiveCategory('Todas');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-sm text-brand-red hover:text-brand-red-light transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  destacado={producto.destacado}
                  client:load
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
