import { html } from "../lib/html.js";
import CtaButton from "../components/CtaButton.js";
import Footer from "../components/Footer.js";

/** @type {import("../lib/page.js").Page} */
export default {
  name: "not-found",
  title: "Pagina niet gevonden — dnamedicatiepas.nl",
  styles: new URL("./NotFound.css", import.meta.url).href,

  render() {
    return html`
      <section id="not-found">
          <div class="in1scan-hdr">
              <h1 class="in1scan-txt">404 —</h1>
              <h1 class="in1scan-juiste">pagina niet gevonden.</h1>
          </div>

          <p class="h2-caption">
              De pagina die u zoekt bestaat niet (meer) of is verplaatst. Controleer de link of ga terug naar de homepage.
          </p>

          ${CtaButton({ label: "Terug naar de homepage", href: "#/", link: true })}
      </section>

      ${Footer()}
    `;
  },
};
