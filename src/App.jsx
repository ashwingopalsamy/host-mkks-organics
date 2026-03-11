import { useState } from 'react';
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

  return (
    <>
      <div className="site-shell" aria-hidden="true" />

      <Topbar onReserveClick={() => setIsReservationOpen(true)} />

      <main>
        <Hero onReserveClick={() => setIsReservationOpen(true)} />
        <Story />
        <Varieties onReserveClick={() => setIsReservationOpen(true)} />
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
        onClose={() => setIsReservationOpen(false)} 
      />
    </>
  );
}
