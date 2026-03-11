import { useCallback, useRef, useState } from 'react';
import Topbar from './components/Topbar.jsx';
import Hero from './components/Hero.jsx';
import Story from './components/Story.jsx';
import Varieties from './components/Varieties.jsx';
import Philosophy from './components/Philosophy.jsx';
import Maintenance from './components/Maintenance.jsx';
import Gallery from './components/Gallery.jsx';
import Benefits from './components/Benefits.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import ReservationForm from './components/ReservationForm.jsx';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const lastTriggerRef = useRef(null);

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

  return (
    <>
      <div className="site-shell" aria-hidden="true" />

      <Topbar onReserveClick={handleReserveOpen} />

      <main>
        <Hero onReserveClick={handleReserveOpen} />
        <Story />
        <Varieties onReserveClick={handleReserveOpen} />
        <Philosophy />
        <Maintenance />
        <Gallery />
        <Benefits />
        <Contact />
      </main>

      <Footer />
      
      {/* Global FAB for Mobile */}
      <WhatsAppFloat hide={isReservationOpen} />
      
      {/* Unified Ordering Form */}
      <ReservationForm 
        isOpen={isReservationOpen} 
        onClose={handleReserveClose} 
      />
    </>
  );
}
