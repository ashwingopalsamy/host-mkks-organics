const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Keep the footer date current without manual edits.
document.getElementById("year").textContent = new Date().getFullYear();

const revealElements = [...document.querySelectorAll(".reveal")];

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  revealElements.forEach((element, index) => {
    if (!element.classList.contains("visible")) {
      element.style.transitionDelay = `${Math.min((index % 4) * 60, 180)}ms`;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -7% 0px"
    }
  );

  revealElements.forEach((element) => {
    if (!element.classList.contains("visible")) {
      observer.observe(element);
    }
  });
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Smooth anchor scrolling with a sticky-header offset.
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
    const headerOffset = topbar ? topbar.offsetHeight + 12 : 0;
    const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });

    history.replaceState(null, "", id);
  });
});

// Lightweight parallax shift on hero media.
const hero = document.querySelector(".hero");
if (hero && !prefersReducedMotion) {
  let ticking = false;

  const updateParallax = () => {
    const heroShift = Math.min(window.scrollY * 0.25, 70);
    hero.style.setProperty("--hero-shift", `${heroShift.toFixed(2)}px`);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateParallax();
}

// Keep floating WhatsApp CTA out of the initial hero focus zone.
const floatingWhatsApp = document.querySelector(".whatsapp-float");
if (floatingWhatsApp) {
  const toggleFloatingCTA = () => {
    const showAfter = Math.max(window.innerHeight * 0.45, 240);
    floatingWhatsApp.classList.toggle("is-visible", window.scrollY > showAfter);
  };

  if (prefersReducedMotion) {
    floatingWhatsApp.classList.add("is-visible");
  } else {
    let floatingTicking = false;

    window.addEventListener(
      "scroll",
      () => {
        if (!floatingTicking) {
          window.requestAnimationFrame(() => {
            toggleFloatingCTA();
            floatingTicking = false;
          });
          floatingTicking = true;
        }
      },
      { passive: true }
    );

    window.addEventListener("resize", toggleFloatingCTA, { passive: true });
    toggleFloatingCTA();
  }
}

// Subtle liquid ripple for button interactions.
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const rect = button.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;

    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  });
});
