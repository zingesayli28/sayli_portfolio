// Wrapper that re-uses the existing main portfolio script.
// Keeping the logic in one place avoids code duplication.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------- Mobile navigation -----------------------
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");

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
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = event.currentTarget.getAttribute("href");
      if (!href || href === "#" || href === "#0") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // --------------------------- Reveal on scroll ------------------------
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
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
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.info(
        "Contact form submitted (demo). Wire this up to a backend or email service to receive messages."
      );
    });
  }
});

