import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
        className="md:hidden p-3 text-brand-charcoal"
        aria-label="Abrir menú"
      >
        <List size={24} weight="bold" />
      </button>

      {/*
        Overlay — portaled to document.body with SSR guard.
        This keeps the backdrop + panel above everything regardless of DOM nesting.
      */}
      {typeof document !== 'undefined' ? createPortal(
        <div
          className={`fixed inset-0 transition-opacity duration-300 ease-out ${
            isOpen ? 'z-50 visible opacity-100' : 'z-0 invisible opacity-0'
          }`}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          {/* Backdrop — always rendered, opacity controlled via parent */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgb(0,0,0)', opacity: isOpen ? 0.65 : 0 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel — slides from left */}
          <div
            className="absolute top-0 left-0 h-full w-72"
            style={{
              backgroundColor: 'rgba(253, 251, 247, 0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRight: '1px solid rgba(245, 240, 232, 0.6)',
              transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
              willChange: 'transform, backdrop-filter',
              WebkitBackfaceVisibility: 'hidden',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            {/* Header */}
            <div className="flex items-center justify-end px-6 pt-6 pb-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-lg"
                aria-label="Cerrar menú"
                type="button"
              >
                <X size={22} weight="bold" style={{ color: '#2C2420' }} />
              </button>
            </div>

            {/* Nav links */}
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

            {/* Footer */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6"
              style={{ borderTop: '1px solid #F5F0E8' }}
            >
              <p className="text-base" style={{ color: '#5C5248' }}>
                Frutería & Verdulería
              </p>
              <p className="text-sm mt-1" style={{ color: '#5C5248', opacity: 0.7 }}>
                Playa Grande, Mar del Plata
              </p>
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </>
  );
}
