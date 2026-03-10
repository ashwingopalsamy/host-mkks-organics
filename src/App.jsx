import { useState, useCallback } from 'react';
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
import ReserveBar from './components/ReserveBar.jsx';

export default function App() {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = useCallback((name, value) => {
    setQuantities((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <>
      {/* Subtle grain texture overlay */}
      <div className="site-shell" aria-hidden="true" />

      <Topbar />

      <main>
        <Hero />
        <Story />
        <Varieties quantities={quantities} onQuantityChange={handleQuantityChange} />
        <Philosophy />
        <Maintenance />
        <Gallery />
        <Benefits />
        <Contact />
      </main>

      <Footer />
      <ReserveBar quantities={quantities} />
      <WhatsAppFloat />
    </>
  );
}

