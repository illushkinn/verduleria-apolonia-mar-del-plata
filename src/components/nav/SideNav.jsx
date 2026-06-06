import { useState, useEffect } from 'react';
import { List, X } from '@phosphor-icons/react';

const NAV_LINKS = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/estacion', label: 'Estación' },
  { href: '/nosotros', label: 'Nosotros' },
];

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button - mobile only */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-3 text-brand-charcoal hover:text-brand-red transition-colors"
        aria-label="Abrir menú"
      >
        <List size={24} weight="bold" />
      </button>

      {/* Backdrop — separate from panel, fully opaque */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Panel — separate from backdrop, slides from left */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-brand-cream border-r border-brand-cream-dark shadow-2xl
          transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <span className="font-serif text-xl font-bold text-brand-red">Apolonia</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-3 text-brand-charcoal hover:text-brand-red transition-colors rounded-lg hover:bg-brand-cream-dark"
            aria-label="Cerrar menú"
          >
            <X size={22} weight="bold" />
          </button>
        </div>

        {/* Navigation links with stagger effect */}
        <nav className="px-4 mt-4">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`block px-4 py-4 text-lg font-medium text-brand-charcoal hover:text-brand-red hover:bg-brand-cream-dark rounded-xl transition-all duration-300 ease-out mb-1
                ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
              style={{ transitionDelay: isOpen ? `${(i + 1) * 70}ms` : '0ms' }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Decorative bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-brand-cream-dark">
          <p className="text-base text-brand-charcoal-soft">
            Frutería & Verdulería
          </p>
          <p className="text-sm text-brand-charcoal-soft/70 mt-1">
            Playa Grande, Mar del Plata
          </p>
        </div>
      </div>
    </>
  );
}
