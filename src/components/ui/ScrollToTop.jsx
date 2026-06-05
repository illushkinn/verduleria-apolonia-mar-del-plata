import { useState, useEffect } from 'react';
import { CaretUp } from '@phosphor-icons/react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl backdrop-saturate-150 border border-white/20 shadow-lg shadow-black/5 flex items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 active:scale-95 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <CaretUp size={20} className="text-brand-red" weight="bold" />
    </button>
  );
}
