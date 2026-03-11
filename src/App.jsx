import { useState, useCallback, useMemo } from 'react';
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
import SeasonBadge from './components/SeasonBadge.jsx';

export default function App() {
  // selections: { [varietyName]: { weight: '2 kg', price: 500, qty: 1 } | null }
  const [selections, setSelections] = useState({});

  const handleSelect = useCallback((name, weight, price) => {
    setSelections((prev) => {
      const current = prev[name];
      // Toggle off if same weight tapped again
      if (current && current.weight === weight) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return { ...prev, [name]: { weight, price, qty: 1 } };
    });
  }, []);

  const handleQtyChange = useCallback((name, delta) => {
    setSelections((prev) => {
      const current = prev[name];
      if (!current) return prev;
      const newQty = Math.max(1, (current.qty || 1) + delta);
      return { ...prev, [name]: { ...current, qty: newQty } };
    });
  }, []);

  const hasItems = useMemo(
    () => Object.keys(selections).length > 0,
    [selections]
  );

  return (
    <>
      {/* Subtle grain texture overlay */}
      <div className="site-shell" aria-hidden="true" />

      <Topbar />

      <main>
        <Hero />
        <Story />
        <Varieties selections={selections} onSelect={handleSelect} onQtyChange={handleQtyChange} />
        <Philosophy />
        <Maintenance />
        <Gallery />
        <Benefits />
        <Contact />
      </main>

      <Footer />
      <ReserveBar selections={selections} />
      <WhatsAppFloat hide={hasItems} />
    </>
  );
}
