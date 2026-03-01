/* ═══════════════════════════════════════════════════════════════
   MKKS Organics — Interaction Layer
   Instant · No scroll delay · No animation lag
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ── Footer year ──────────────────────────────────────────────
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── All content visible immediately ──────────────────────────
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));

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

  // ── WhatsApp Float (visible immediately) ─────────────────────
  const floatingWhatsApp = document.querySelector(".whatsapp-float");
  if (floatingWhatsApp) {
    floatingWhatsApp.classList.add("is-visible");
  }
})();
