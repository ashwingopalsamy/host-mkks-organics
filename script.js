/* ═══════════════════════════════════════════════════════════════
   MKKS Organics — Interaction Layer
   Scroll reveal · Smooth scroll · Hero parallax · WhatsApp FAB
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ── Footer year ──────────────────────────────────────────────
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Scroll Reveal (IntersectionObserver) ─────────────────────
  const revealElements = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    // Immediately show everything
    revealElements.forEach((el) => el.classList.add("visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // ── Smooth Anchor Scroll with Header Offset ──────────────────
  const topbar = document.querySelector(".topbar");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      const headerOffset = topbar ? topbar.offsetHeight + 12 : 0;
      const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top: targetY, behavior: "smooth" });
      history.replaceState(null, "", id);
    });
  });

  // ── Hero Parallax (subtle, GPU-accelerated) ──────────────────
  const heroMedia = document.querySelector(".hero-media img");

  if (heroMedia && !prefersReducedMotion) {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (scrollY < heroHeight) {
        const shift = scrollY * 0.08;
        heroMedia.style.transform = `scale(1.04) translate3d(0, ${shift}px, 0)`;
      }
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // ── WhatsApp Float (delayed entrance) ────────────────────────
  const floatingWhatsApp = document.querySelector(".whatsapp-float");

  if (floatingWhatsApp) {
    if (prefersReducedMotion) {
      floatingWhatsApp.classList.add("is-visible");
    } else {
      setTimeout(() => {
        floatingWhatsApp.classList.add("is-visible");
      }, 800);
    }
  }
})();
