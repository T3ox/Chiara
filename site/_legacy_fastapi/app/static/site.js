(() => {
  const THEME_STORAGE_KEY = "folderorganizer-theme";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const normalizePath = (path) => {
    if (!path) return "/";
    if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
    return path;
  };

  const mapActiveRoute = (pathname) => {
    const current = normalizePath(pathname);
    if (current === "/") return "/";
    if (current.startsWith("/account/")) return "/accedi";
    return current;
  };

  const setActiveNav = () => {
    const route = mapActiveRoute(window.location.pathname);
    document.querySelectorAll(".site-nav a[data-route]").forEach((link) => {
      const target = link.getAttribute("data-route");
      if (!target) return;
      const targetNorm = normalizePath(target);
      const active = route === targetNorm;
      link.classList.toggle("active", active);
    });
  };

  const setupMobileMenu = () => {
    const button = document.querySelector(".menu-toggle");
    const shell = document.querySelector(".mobile-menu-shell");
    const panel = document.querySelector(".mobile-panel");
    const backdrop = document.querySelector("[data-menu-backdrop]");
    const links = document.querySelectorAll("[data-mobile-link]");

    if (!button || !shell || !panel || !backdrop) {
      return;
    }

    const openMenu = () => {
      shell.classList.add("open");
      shell.setAttribute("aria-hidden", "false");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Chiudi menu");
      document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
      shell.classList.remove("open");
      shell.setAttribute("aria-hidden", "true");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Apri menu");
      document.body.classList.remove("menu-open");
    };

    button.addEventListener("click", () => {
      if (shell.classList.contains("open")) closeMenu();
      else openMenu();
    });

    backdrop.addEventListener("click", closeMenu);
    links.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("mousedown", (event) => {
      if (!shell.classList.contains("open")) return;
      if (!panel.contains(event.target) && !button.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && shell.classList.contains("open")) closeMenu();
    });
  };

  const setupAccordion = () => {
    document.querySelectorAll("[data-accordion]").forEach((container) => {
      const triggers = Array.from(container.querySelectorAll(".accordion-trigger"));
      triggers.forEach((trigger) => {
        const panel = trigger.nextElementSibling;
        if (!panel) return;

        trigger.addEventListener("click", () => {
          const isOpen = trigger.getAttribute("aria-expanded") === "true";

          triggers.forEach((item) => {
            const itemPanel = item.nextElementSibling;
            if (!itemPanel) return;
            item.setAttribute("aria-expanded", "false");
            itemPanel.style.maxHeight = "0px";
          });

          if (!isOpen) {
            trigger.setAttribute("aria-expanded", "true");
            panel.style.maxHeight = `${panel.scrollHeight}px`;
          }
        });
      });
    });
  };

  const setupReveal = () => {
    const revealItems = Array.from(document.querySelectorAll(".reveal, .reveal-on-scroll"));
    if (!revealItems.length) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("reveal--in"));
      return;
    }

    document.querySelectorAll("[data-reveal-seq]").forEach((container) => {
      const items = Array.from(container.querySelectorAll(".reveal, .reveal-on-scroll"));
      items.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
      });
    });

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal--in");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));
  };

  const setupHeaderScrollState = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const applyState = () => {
      const scrolled = window.scrollY > 10;
      header.classList.toggle("is-scrolled", scrolled);
    };

    applyState();
    window.addEventListener("scroll", applyState, { passive: true });
  };

  const setupThemeToggle = () => {
    const toggles = Array.from(document.querySelectorAll("[data-theme-toggle]"));
    if (!toggles.length) return;

    const getCurrentTheme = () =>
      document.body.classList.contains("theme-dark") ? "dark" : "light";

    const applyTheme = (theme) => {
      const isDark = theme === "dark";
      document.body.classList.toggle("theme-dark", isDark);
      document.body.classList.toggle("theme-light", !isDark);

      toggles.forEach((button) => {
        button.setAttribute("aria-pressed", isDark ? "true" : "false");
        button.textContent = isDark ? "Tema chiaro" : "Tema scuro";
      });
    };

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      applyTheme(savedTheme);
    } else {
      applyTheme(getCurrentTheme());
    }

    toggles.forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      });
    });
  };

  const boot = () => {
    setupThemeToggle();
    setActiveNav();
    setupMobileMenu();
    setupAccordion();
    setupReveal();
    setupHeaderScrollState();
  };

  document.addEventListener("DOMContentLoaded", boot);
})();
