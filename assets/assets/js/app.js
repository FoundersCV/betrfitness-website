const SUPPORT_ENDPOINT = "";

const SITE_CONFIG = {
  brandName: "BetrFitness",
  tagline: "Raise the Bar, Set the Odds",
  links: {
    home: "/index.html",
    support: "/support.html",
    privacy: "/legal/privacy-policy.html",
    terms: "/legal/terms-of-use.html",
    legalHub: "/legal/index.html",
    appStore: "#",
    googlePlay: "#",
    instagram: "#",
    tiktok: "#",
    x: "#",
    supportEmail: "mailto:support@betrfitness.com",
  },
};

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  renderSharedUI();
  initMobileNav();
  initFaqAccordions();
  initSupportForm();
  initRevealOnScroll();
});

function renderSharedUI() {
  const headerTarget = document.querySelector("[data-site-header]");
  if (headerTarget) {
    headerTarget.innerHTML = buildHeader();
  }

  const footerTarget = document.querySelector("[data-site-footer]");
  if (footerTarget) {
    footerTarget.innerHTML = buildFooter();
  }

  document.querySelectorAll("[data-store-buttons]").forEach((target) => {
    target.innerHTML = buildStoreButtons();
  });

  const yearTarget = document.querySelector("[data-current-year]");
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }
}

function buildHeader() {
  const path = normalizePath(window.location.pathname);
  const isActive = (href) => (path === normalizePath(href) ? 'aria-current="page"' : "");

  return `
    <div class="container navbar">
      <a class="nav-brand" href="${SITE_CONFIG.links.home}" aria-label="BetrFitness home">
        <img class="nav-logo" src="/assets/assets/branding/logo.png" alt="BetrFitness logo" />
        <span class="nav-brand-copy">
          <span class="nav-brand-name">${SITE_CONFIG.brandName}</span>
          <span class="nav-brand-tag">${SITE_CONFIG.tagline}</span>
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Toggle navigation">
        <span aria-hidden="true">☰</span>
      </button>
      <nav id="primary-navigation" class="nav-menu" aria-label="Primary navigation">
        <ul class="nav-links">
          <li><a class="nav-link" href="${SITE_CONFIG.links.home}" ${isActive(SITE_CONFIG.links.home)}>Home</a></li>
          <li><a class="nav-link" href="${SITE_CONFIG.links.home}#features">Features</a></li>
          <li><a class="nav-link" href="${SITE_CONFIG.links.home}#vision">Vision</a></li>
          <li><a class="nav-link" href="${SITE_CONFIG.links.home}#faq">FAQ</a></li>
          <li><a class="nav-link" href="${SITE_CONFIG.links.support}" ${isActive(SITE_CONFIG.links.support)}>Support</a></li>
          <li>
            <details class="nav-legal">
              <summary class="nav-link" role="button" aria-label="View legal links">Legal</summary>
              <div class="legal-menu">
                <a class="nav-link" href="${SITE_CONFIG.links.legalHub}" ${isActive(SITE_CONFIG.links.legalHub)}>Legal Center</a>
                <a class="nav-link" href="${SITE_CONFIG.links.privacy}" ${isActive(SITE_CONFIG.links.privacy)}>Privacy Policy</a>
                <a class="nav-link" href="${SITE_CONFIG.links.terms}" ${isActive(SITE_CONFIG.links.terms)}>Terms of Use</a>
              </div>
            </details>
          </li>
        </ul>
        <a class="nav-cta" href="${SITE_CONFIG.links.appStore}">Coming Soon</a>
      </nav>
    </div>
  `;
}

function buildStoreButtons() {
  return `
    <a class="store-btn" href="${SITE_CONFIG.links.appStore}" aria-label="Download on the App Store">
      <span class="store-icon" aria-hidden="true">iOS</span>
      <span class="store-label">
        <span class="store-overline">Download on the</span>
        <strong>App Store</strong>
      </span>
    </a>
    <a class="store-btn" href="${SITE_CONFIG.links.googlePlay}" aria-label="Get it on Google Play">
      <span class="store-icon" aria-hidden="true">▶</span>
      <span class="store-label">
        <span class="store-overline">Get it on</span>
        <strong>Google Play</strong>
      </span>
    </a>
  `;
}

function buildFooter() {
  return `
    <div class="footer-top">
      <div class="container footer-grid">
        <section aria-labelledby="footer-brand">
          <h2 class="footer-heading" id="footer-brand">BetrFitness</h2>
          <p class="muted">Fitness that keeps you engaged. Build consistency with a system designed around accountability, momentum, and measurable progress.</p>
          <div class="store-buttons" data-store-buttons></div>
        </section>
        <section aria-labelledby="footer-company">
          <h2 class="footer-heading" id="footer-company">Company</h2>
          <ul class="footer-list">
            <li><a class="footer-link" href="${SITE_CONFIG.links.home}">Home</a></li>
            <li><a class="footer-link" href="${SITE_CONFIG.links.support}">Support</a></li>
            <li><a class="footer-link" href="${SITE_CONFIG.links.home}#features">Features</a></li>
            <li><a class="footer-link" href="${SITE_CONFIG.links.home}#vision">Vision</a></li>
          </ul>
        </section>
        <section aria-labelledby="footer-legal">
          <h2 class="footer-heading" id="footer-legal">Legal</h2>
          <ul class="footer-list">
            <li><a class="footer-link" href="${SITE_CONFIG.links.privacy}">Privacy Policy</a></li>
            <li><a class="footer-link" href="${SITE_CONFIG.links.terms}">Terms of Use</a></li>
            <li><a class="footer-link" href="${SITE_CONFIG.links.legalHub}">Legal Center</a></li>
            <li><span class="muted">Cookie Policy (coming soon)</span></li>
            <li><span class="muted">Data Request / Privacy Rights (coming soon)</span></li>
          </ul>
        </section>
        <section aria-labelledby="footer-social">
          <h2 class="footer-heading" id="footer-social">Connect With Us</h2>
          <div class="social-links">
            ${buildSocialLink("Instagram", SITE_CONFIG.links.instagram, "IG")}
            ${buildSocialLink("TikTok", SITE_CONFIG.links.tiktok, "TT")}
            ${buildSocialLink("X", SITE_CONFIG.links.x, "X")}
          </div>
          <p class="muted" style="margin-top:0.9rem;">
            Need help? <a class="footer-link" href="${SITE_CONFIG.links.support}">Visit Support</a>
            or <a class="footer-link" href="${SITE_CONFIG.links.supportEmail}">email us</a>.
          </p>
        </section>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p style="margin:0;">&copy; <span data-current-year></span> Crimson Vale, LLC. All rights reserved.</p>
      </div>
    </div>
  `;
}

function buildSocialLink(label, href, text) {
  return `
    <a class="social-link" href="${href}" aria-label="${label}" title="${label}">
      <span aria-hidden="true">${text}</span>
    </a>
  `;
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function initFaqAccordions() {
  document.querySelectorAll("[data-faq-item]").forEach((item, index) => {
    const button = item.querySelector(".faq-question");
    const panel = item.querySelector(".faq-panel");
    if (!button || !panel) return;

    const panelId = panel.id || `faq-panel-${index + 1}`;
    panel.id = panelId;
    button.setAttribute("aria-controls", panelId);

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });
}

function initSupportForm() {
  const form = document.querySelector("[data-support-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const statusEl = form.querySelector("[data-form-status]");
    const fields = [
      {
        name: "fullName",
        label: "Full Name",
        validate: (value) => value.trim().length >= 2,
        error: "Please enter your full name.",
      },
      {
        name: "email",
        label: "Email",
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
        error: "Please enter a valid email address.",
      },
      {
        name: "topic",
        label: "Topic",
        validate: (value) => value.trim().length > 0,
        error: "Please select a topic.",
      },
      {
        name: "message",
        label: "Message",
        validate: (value) => value.trim().length >= 10,
        error: "Please add at least 10 characters.",
      },
    ];

    let hasError = false;
    const payload = {};

    fields.forEach((field) => {
      const input = form.elements[field.name];
      const formField = input?.closest(".form-field");
      const errorEl = formField?.querySelector(".error-text");
      const value = input?.value ?? "";
      payload[field.name] = value.trim();

      if (!field.validate(value)) {
        hasError = true;
        formField?.classList.add("is-invalid");
        if (errorEl) errorEl.textContent = field.error;
      } else {
        formField?.classList.remove("is-invalid");
        if (errorEl) errorEl.textContent = "";
      }
    });

    if (hasError) {
      setFormStatus(statusEl, "Please fix the highlighted fields and submit again.", "error");
      return;
    }

    try {
      if (SUPPORT_ENDPOINT) {
        const response = await fetch(SUPPORT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error("Support request failed.");
        }
      }

      form.reset();
      setFormStatus(
        statusEl,
        SUPPORT_ENDPOINT
          ? "Your message has been submitted. We will be in touch soon."
          : "Form UI is ready. Connect SUPPORT_ENDPOINT in assets/assets/js/app.js to enable live submissions.",
        "success"
      );
    } catch (error) {
      setFormStatus(statusEl, "Something went wrong. Please try again later.", "error");
    }
  });
}

function setFormStatus(element, message, state) {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("is-success", "is-error");
  element.classList.add(state === "success" ? "is-success" : "is-error");
}

function initRevealOnScroll() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (!revealItems.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -20px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function normalizePath(path) {
  if (!path) return "/";
  if (path === "/") return "/index.html";
  if (path.endsWith("/") && path.length > 1) return `${path}index.html`;
  return path;
}
