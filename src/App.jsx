import { useCallback, useMemo, useRef, useState } from 'react';
import { usePostHog } from '@posthog/react';
import Topbar from './components/Topbar.jsx';
import Hero from './components/Hero.jsx';
import VarietyAccordion from './components/VarietyAccordion.jsx';
import Contact from './components/Contact.jsx';
import Story from './components/Story.jsx';
import Maintenance from './components/Maintenance.jsx';
import Footer from './components/Footer.jsx';
import CartBar from './components/CartBar.jsx';
import CombinedFAB from './components/CombinedFAB.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { getCartItemCount, getCartSubtotal } from './order.js';
import { varieties } from './content.jsx';
import { trackEvent, useScrollDepth, useSessionStart } from './analytics.js';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [cart, setCart] = useState({});
  const lastTriggerRef = useRef(null);
  const posthog = usePostHog();

  // Session-level analytics wired at the root
  useSessionStart(posthog);
  useScrollDepth(posthog);

  const hasItems = Object.keys(cart).length > 0;
  const cartItemCount = useMemo(() => getCartItemCount(cart), [cart]);

  const handleReserveOpen = useCallback((trigger) => {
    if (trigger?.focus) {
      lastTriggerRef.current = trigger;
    }
    setIsReservationOpen(true);
    const checkoutProps = {
      cart_contents: Object.entries(cart).map(([id, qty]) => ({ variety_id: id, quantity: qty })),
      total_items: getCartItemCount(cart),
      cart_value: getCartSubtotal(cart, varieties)
    };
    trackEvent('begin_checkout', checkoutProps, posthog);
  }, [cart, posthog]);

  const handleReserveClose = useCallback(() => {
    setIsReservationOpen(false);
    requestAnimationFrame(() => {
      lastTriggerRef.current?.focus?.();
    });
  }, []);

  const handleClearCart = useCallback(() => {
    trackEvent('clear_cart', {
      cleared_items_count: getCartItemCount(cart),
      cleared_value: getCartSubtotal(cart, varieties)
    }, posthog);
    setCart({});
  }, [cart, posthog]);

  return (
    <>
      <Topbar
        onReserveClick={handleReserveOpen}
        cartItemCount={cartItemCount}
      />

      <main>
        <Hero onReserveClick={handleReserveOpen} />
        <VarietyAccordion cart={cart} onCartChange={setCart} />
        <Maintenance />
        <Story />
        <Contact />
      </main>

      <Footer />

      {hasItems ? (
        <CartBar cart={cart} onReserveClick={handleReserveOpen} onClearCart={handleClearCart} />
      ) : (
        <CombinedFAB hide={isReservationOpen} onReserveClick={handleReserveOpen} />
      )}

      <ReservationForm
        isOpen={isReservationOpen}
        onClose={handleReserveClose}
        cart={cart}
        onCartChange={setCart}
        onClearCart={handleClearCart}
      />
      <Analytics />
      <SpeedInsights />
    </>
  );
}