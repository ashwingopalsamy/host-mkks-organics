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
    seasonToggle.textContent = open ? "Hide season details" : "Season details";
  };

  seasonToggle.addEventListener("click", () => {
    const open = !availabilityRail.classList.contains("is-open");
    setSeasonOpenState(open);
  });

  setSeasonOpenState(false);
}

if (availabilityRail && seasonRail && seasonStatus) {
  const timelineYear = new Date().getFullYear();
  const startMonth = Number(availabilityRail.dataset.seasonStart) || 3;
  const endMonth = Number(availabilityRail.dataset.seasonEnd) || 6;
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

// Keep reveal elements immediately visible (no scroll-delay animation).
document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));

// Instant anchor scrolling with a sticky-header offset.
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

    window.scrollTo({
      top: targetY,
      behavior: "auto"
    });

    history.replaceState(null, "", id);
  });
});

// Keep floating WhatsApp CTA immediately visible.
const floatingWhatsApp = document.querySelector(".whatsapp-float");
if (floatingWhatsApp) {
  floatingWhatsApp.classList.add("is-visible");
}
