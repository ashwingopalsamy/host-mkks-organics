import { useCallback, useMemo, useRef, useState } from 'react';
import Topbar from './components/Topbar.jsx';
import Hero from './components/Hero.jsx';
import VarietyAccordion from './components/VarietyAccordion.jsx';
import Contact from './components/Contact.jsx';
import Story from './components/Story.jsx';
import Maintenance from './components/Maintenance.jsx';
import Gallery from './components/Gallery.jsx';
import Footer from './components/Footer.jsx';
import CartBar from './components/CartBar.jsx';
import CombinedFAB from './components/CombinedFAB.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import { getCartItemCount } from './order.js';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [cart, setCart] = useState({});
  const lastTriggerRef = useRef(null);

  const hasItems = Object.keys(cart).length > 0;
  const cartItemCount = useMemo(() => getCartItemCount(cart), [cart]);

  const handleReserveOpen = useCallback((trigger) => {
    if (trigger?.focus) {
      lastTriggerRef.current = trigger;
    }
    setIsReservationOpen(true);
  }, []);

  const handleReserveClose = useCallback(() => {
    setIsReservationOpen(false);
    requestAnimationFrame(() => {
      lastTriggerRef.current?.focus?.();
    });
  }, []);

  const handleClearCart = useCallback(() => {
    setCart({});
  }, []);

  return (
    <>
      <div className="site-shell" aria-hidden="true" />

      <Topbar
        onReserveClick={handleReserveOpen}
        cartItemCount={cartItemCount}
      />

      <main>
        <Hero onReserveClick={handleReserveOpen} />
        <VarietyAccordion cart={cart} onCartChange={setCart} />
        <Contact />
        <Story />
        <Maintenance />
        <Gallery />
      </main>

      <Footer />

      {hasItems ? (
        <CartBar cart={cart} onReserveClick={handleReserveOpen} onClearCart={handleClearCart} />
      ) : (
        <CombinedFAB hide={isReservationOpen} />
      )}

      <ReservationForm
        isOpen={isReservationOpen}
        onClose={handleReserveClose}
        cart={cart}
        onCartChange={setCart}
      />
    </>
  );
}
