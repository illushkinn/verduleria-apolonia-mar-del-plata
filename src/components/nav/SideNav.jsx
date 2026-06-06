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

      {/* Menu overlay — only renders when open, NO transitions, solid colors */}
      {isOpen && (
        <>
          {/* Solid backdrop — inline style for guaranteed opacity */}
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Solid panel — inline style for guaranteed background */}
          <div
            className="fixed top-0 left-0 z-50 h-full w-72 shadow-2xl animate-slide-in-left"
            style={{ backgroundColor: '#FDFBF7', borderRight: '1px solid #F5F0E8' }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <span className="font-serif text-xl font-bold" style={{ color: '#9B1D20' }}>Apolonia</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-lg transition-colors"
                style={{ color: '#2C2420' }}
                aria-label="Cerrar menú"
                type="button"
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
                  className="block px-4 py-4 text-lg font-medium rounded-xl mb-1"
                  style={{
                    color: '#2C2420',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(12px)',
                    transition: `all 0.3s ease-out ${(i + 1) * 70}ms`,
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Decorative bottom section */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6 border-t"
              style={{ borderColor: '#F5F0E8' }}
            >
              <p className="text-base" style={{ color: '#5C5248' }}>
                Frutería & Verdulería
              </p>
              <p className="text-sm mt-1" style={{ color: '#5C5248', opacity: 0.7 }}>
                Playa Grande, Mar del Plata
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
