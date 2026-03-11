import { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle.jsx';

const NAV_ITEMS = [
  {
    href: '#varieties',
    label: 'Varieties',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    href: '#philosophy',
    label: 'Method',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </svg>
    ),
  },
  {
    href: '#contact',
    label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function Topbar() {
  const topbarRef = useRef(null);
  const [activeHref, setActiveHref] = useState(NAV_ITEMS[0].href);
  const [pastHero, setPastHero] = useState(false);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const topbar = topbarRef.current;
    const offset = topbar ? topbar.offsetHeight + 16 : 0;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    history.replaceState(null, '', href);
    if (href === '#top') {
      setActiveHref(NAV_ITEMS[0].href);
      return;
    }
    setActiveHref(href);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const topbar = topbarRef.current;
      const offset = (topbar ? topbar.offsetHeight : 0) + 28;
      const marker = window.scrollY + offset;
      let currentHref = NAV_ITEMS[0].href;

      for (const { href } of NAV_ITEMS) {
        const section = document.querySelector(href);
        if (!section) continue;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (marker >= sectionTop) {
          currentHref = href;
        }
      }

      setActiveHref((prev) => (prev === currentHref ? prev : currentHref));

      // Show reserve CTA after scrolling past hero
      const hero = document.getElementById('home');
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        setPastHero(heroBottom < 0);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <motion.header
      className="topbar"
      id="top"
      ref={topbarRef}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container topbar-inner">
        <a
          className="brand"
          href="#top"
          aria-label="MKKS Organics Home"
          onClick={(e) => handleNavClick(e, '#top')}
        >
          <img
            className="brand-logo"
            src="/assets/images/mkks-organics-logo.png"
            width="320"
            height="320"
            alt="MKKS Organics logo"
          />
          <span className="brand-word">MKKS Organics</span>
        </a>

        <nav className="topnav" id="primary-nav" aria-label="Primary">
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <a
              key={href}
              className={activeHref === href ? 'is-active' : undefined}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              aria-label={label}
              aria-current={activeHref === href ? 'location' : undefined}
            >
              <span className="nav-icon" aria-hidden="true">{icon}</span>
              <span className="nav-text">{label}</span>
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <a
            className={`topbar-reserve-cta${pastHero ? ' is-visible' : ''}`}
            href="#varieties"
            onClick={(e) => handleNavClick(e, '#varieties')}
          >
            Reserve
          </a>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}

