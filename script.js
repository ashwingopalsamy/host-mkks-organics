const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Keep the footer date current without manual edits.
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation toggle.
const topbarInner = document.querySelector(".topbar-inner");
const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.getElementById("primary-nav");

if (topbarInner && navToggle && primaryNav) {
  const closeNav = () => {
    topbarInner.classList.remove("is-nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = topbarInner.classList.toggle("is-nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (!topbarInner.contains(event.target)) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeNav();
    }
  });
}

// Seasonal timeline cue in the hero panel.
const availabilityRail = document.querySelector(".availability-rail");
const seasonRail = document.getElementById("season-rail");
const seasonStatus = document.getElementById("season-status");
const seasonToggle = document.getElementById("season-toggle");

if (availabilityRail && seasonToggle) {
  const setSeasonOpenState = (open) => {
    availabilityRail.classList.toggle("is-open", open);
    seasonToggle.classList.toggle("is-active", open);
    seasonToggle.setAttribute("aria-expanded", String(open));
    seasonToggle.textContent = open ? "Hide seasonal timeline" : "View seasonal timeline";
  };

  seasonToggle.addEventListener("click", () => {
    const open = !availabilityRail.classList.contains("is-open");
    setSeasonOpenState(open);
  });

  const syncSeasonForViewport = () => {
    const isDesktop = window.matchMedia("(min-width: 48rem)").matches;
    setSeasonOpenState(isDesktop);
  };

  window.addEventListener("resize", syncSeasonForViewport, { passive: true });
  syncSeasonForViewport();
}

if (availabilityRail && seasonRail && seasonStatus) {
  const timelineYear = new Date().getFullYear();
  const startMonth = Number(availabilityRail.dataset.seasonStart) || 3;
  const endMonth = Number(availabilityRail.dataset.seasonEnd) || 7;
  const peakMonth = Number(availabilityRail.dataset.seasonPeak) || 5;
  const nowMonth = new Date().getMonth() + 1;
  const monthName = new Intl.DateTimeFormat("en", { month: "long" });

  [...seasonRail.querySelectorAll("li")].forEach((item) => {
    const month = Number(item.dataset.month);
    const monthDate = new Date(timelineYear, Math.max(0, month - 1), 1);

    if (month < nowMonth) {
      item.classList.add("is-past");
    }

    if (month >= startMonth && month <= endMonth) {
      item.classList.add("is-open");
    }

    if (month === peakMonth) {
      item.classList.add("is-peak");
    }

    if (month === nowMonth) {
      item.classList.add("is-now");
      item.setAttribute("aria-current", "date");
    }

    item.setAttribute("title", monthName.format(monthDate));
  });

  const startDate = new Date(timelineYear, Math.max(0, startMonth - 1), 1);
  const endDate = new Date(timelineYear, Math.max(0, endMonth - 1), 1);
  const peakDate = new Date(timelineYear, Math.max(0, peakMonth - 1), 1);
  const nowDate = new Date(timelineYear, Math.max(0, nowMonth - 1), 1);
  const startLabel = monthName.format(startDate);
  const endLabel = monthName.format(endDate);
  const peakLabel = monthName.format(peakDate);

  if (nowMonth < startMonth) {
    seasonStatus.textContent = `Pre-season now. Harvest opens in ${startLabel} and peaks in ${peakLabel}.`;
  } else if (nowMonth > endMonth) {
    seasonStatus.textContent = `Season closed. Next window starts in ${startLabel}; peak lots usually move in ${peakLabel}.`;
  } else {
    seasonStatus.textContent = `${monthName.format(nowDate)} is inside the live window. Peak dispatch usually lands in ${peakLabel}.`;
  }

  seasonStatus.setAttribute(
    "aria-label",
    `Season starts in ${startLabel}, peaks in ${peakLabel}, and ends in ${endLabel}.`
  );
}

const revealElements = [...document.querySelectorAll(".reveal")];

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  revealElements.forEach((element) => {
    if (!element.classList.contains("visible")) {
      const sectionRoot = element.closest("section, footer, header") || document.body;
      const localSequence = [...sectionRoot.querySelectorAll(".reveal")];
      const position = Math.max(localSequence.indexOf(element), 0);

      let baseDelay = 40;
      if (element.matches(".section-head, .story-copy, .contact-card, .footer-card")) {
        baseDelay = 0;
      } else if (element.matches(".featured-card, .story-image")) {
        baseDelay = 70;
      }

      element.style.transitionDelay = `${Math.min(baseDelay + position * 60, 280)}ms`;
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
