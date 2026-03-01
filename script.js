// Keep the footer date current without manual edits.
document.getElementById("year").textContent = new Date().getFullYear();

// Keep reveal elements immediately visible (no scroll-delay animation).
document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));

// Instant anchor scrolling with sticky-header offset.
const topbar = document.querySelector(".topbar");
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") {
      return;
    }

    const target = document.querySelector(id);
    if (!target) {
      return;
    }

    event.preventDefault();
    const headerOffset = topbar ? topbar.offsetHeight + 10 : 0;
    const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: targetY, behavior: "auto" });
    history.replaceState(null, "", id);
  });
});

// Keep floating WhatsApp CTA visible immediately.
const floatingWhatsApp = document.querySelector(".whatsapp-float");
if (floatingWhatsApp) {
  floatingWhatsApp.classList.add("is-visible");
}
