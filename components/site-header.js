/**
 * <site-header current="patienten|professionals">: the gradient bar at the top
 * of the page, the decorative DNA text behind it and the main nav.
 *
 * `current` marks the matching "Voor Patiënten" / "Voor Professionals" tab as
 * the page being shown. Leave it off (the 404 page) and neither tab is active.
 */

/** @type {{ page: string, href: string, label: string }[]} */
const SITE_NAV_TABS = [
  { page: "patienten", href: "/", label: "Voor Patiënten" },
  { page: "professionals", href: "/voor-professionals/", label: "Voor Professionals" },
];

class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) return;

    const current = this.getAttribute("current");
    if (current !== null && !SITE_NAV_TABS.some(tab => tab.page === current)) {
      console.warn(`<site-header> has unknown current page "${current}".`, this);
    }

    const tabs = SITE_NAV_TABS.map(tab => {
      const state = tab.page === current ? "active" : "inactive";
      const ariaCurrent = tab.page === current ? ' aria-current="page"' : "";
      return `
        <div class="segmented-toggle__tab segmented-toggle__tab--${state}">
          <a href="${tab.href}"${ariaCurrent}>
            <p class="segmented-toggle__label segmented-toggle__label--${state}">${tab.label}</p>
            <div class="segmented-toggle__pointer"></div>
          </a>
        </div>`;
    }).join("");

    this.innerHTML = `
      <div class="border-top"></div>
      <div class="background-text background-text--hero" aria-hidden="true"></div>

      <header class="site-header shell">
        <nav id="nav" aria-label="Hoofdmenu">
          <div class="logo nav-item">
            <a href="/">
              <img src="/images/logo.svg" alt="DNAmedicatiepas, naar de homepage">
            </a>
          </div>

          <div class="nav-item">
            <div class="segmented-toggle">${tabs}
            </div>
          </div>

          <div class="nav-item hide-on-mobile">
            <cta-button label="Informatie aanvragen" href="#"></cta-button>
          </div>
        </nav>
      </header>
    `;
  }
}

customElements.define("site-header", SiteHeader);
