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

export default function App() {
  return (
    <>
      {/* Subtle grain texture overlay */}
      <div className="site-shell" aria-hidden="true" />

      <Topbar />

      <main>
        <Hero />
        <Story />
        <Varieties />
        <Philosophy />
        <Maintenance />
        <Gallery />
        <Benefits />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
