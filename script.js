// ======================================================================
// Main site script for Sayli Zinge portfolio
// ----------------------------------------------------------------------
// Features:
// - Mobile navigation toggle
// - Smooth-scrolling enhancement for older browsers
// - Simple "reveal on scroll" animations using IntersectionObserver
// - Dynamic current year in the footer
// ======================================================================

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------- Mobile navigation -----------------------
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");

  // Create a mobile nav list based on the existing desktop nav links
  const desktopNavList = document.querySelector(".nav-list");
  if (desktopNavList && header) {
    const mobileNav = document.createElement("nav");
    mobileNav.className = "mobile-nav";
    const mobileList = desktopNavList.cloneNode(true);
    mobileList.className = "mobile-nav-list";
    mobileNav.appendChild(mobileList);
    header.insertAdjacentElement("afterend", mobileNav);
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      body.classList.toggle("nav-open");
    });

    // Close mobile menu when a link is clicked
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (
        body.classList.contains("nav-open") &&
        target instanceof HTMLElement &&
        target.closest(".mobile-nav-list a")
      ) {
        body.classList.remove("nav-open");
      }
    });
  }

  // --------------------------- Smooth scrolling ------------------------
  // Native CSS smooth-scrolling is enabled, but we add a simple JS
  // fallback for browsers that don't fully support it.
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = (event.currentTarget as HTMLAnchorElement).getAttribute(
        "href"
      );
      if (!href || href === "#" || href === "#0") return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();

      // Scroll into view with smooth behavior where supported
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // --------------------------- Reveal on scroll ------------------------
  const revealElements = document.querySelectorAll<HTMLElement>(".reveal");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.classList.add("reveal--visible");
            obs.unobserve(element);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: if IntersectionObserver is not available,
    // just make everything visible.
    revealElements.forEach((el) => {
      el.classList.add("reveal--visible");
    });
  }

  // --------------------------- Footer year -----------------------------
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // --------------------------- Contact form stub -----------------------
  // This keeps the demo form from actually submitting and gives
  // a friendly message in the console instead.
  const contactForm = document.querySelector<HTMLFormElement>(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.info(
        "Contact form submitted (demo). Wire this up to a backend or email service to receive messages."
      );
    });
  }
});

