/**
 * <site-footer>: the page footer and the gradient bar that closes the page.
 */
class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) return;

    this.innerHTML = `
      <footer class="site-footer shell">
        <div>
          <p class="body-text">© Consortium B.V.</p>
        </div>
        <div class="logo">
          <a href="/">
            <img src="/images/logo.svg" alt="DNAmedicatiepas, naar de homepage">
          </a>
        </div>
        <div>
          <cta-button label="Informatie aanvragen" href="#"></cta-button>
        </div>
      </footer>

      <div class="border-bottom"></div>
    `;
  }
}

customElements.define("site-footer", SiteFooter);
