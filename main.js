document.addEventListener("DOMContentLoaded", () => {
  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // =========================
  // Mobile Menu (Accessible)
  // =========================
  const menuButton = document.getElementById("mobileMenuBtn");
  const menuCloseButton = document.getElementById("closeMenuIcon");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuButton && menuCloseButton && mobileMenu) {
    let lastFocusedEl = null;

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    function openMenu() {
      lastFocusedEl = document.activeElement;
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("block");
      document.body.style.overflow = "hidden";
      menuButton.setAttribute("aria-expanded", "true");

      // Focus first focusable element inside menu
      const focusables = mobileMenu.querySelectorAll(focusableSelector);
      if (focusables.length) focusables[0].focus();
    }

    function closeMenu() {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("block");
      document.body.style.overflow = "";
      menuButton.setAttribute("aria-expanded", "false");

      // Return focus to the button
      if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
        lastFocusedEl.focus();
      } else {
        menuButton.focus();
      }
    }

    menuButton.addEventListener("click", openMenu);
    menuCloseButton.addEventListener("click", closeMenu);

    // Close on ESC + Focus trap
    document.addEventListener("keydown", (e) => {
      if (mobileMenu.classList.contains("hidden")) return;

      if (e.key === "Escape") closeMenu();

      if (e.key === "Tab") {
        const focusables = Array.from(mobileMenu.querySelectorAll(focusableSelector));
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Close menu when a link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => link.addEventListener("click", closeMenu));

    // Close if clicking outside inner content (optional)
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  // =========================
  // Scroll Reveal Animations
  // =========================
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    const revealEls = document.querySelectorAll("[data-reveal]");
    revealEls.forEach((el) => el.classList.add("reveal-init", "opacity-0", "translate-y-4"));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("opacity-0", "translate-y-4");
          entry.target.classList.add("animate-fadeUp");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // =========================
  // Back to Top Button
  // =========================
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 600) {
        backToTop.classList.remove("hidden");
      } else {
        backToTop.classList.add("hidden");
      }
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }
});