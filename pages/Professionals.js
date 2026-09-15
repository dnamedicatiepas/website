import { html } from "../lib/html.js";
import CtaButton from "../components/CtaButton.js";
import Faq from "../components/Faq.js";
import Footer from "../components/Footer.js";

const MEER_WETEN_SEQUENCE =
  "T - A - C G - - A - T G - - C - A - - - T G C - - T - A - - C G - - - T - A C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G T - A - C G - - A - T G - - C - A - - - T G C - - T - A - - C G - - - T - A C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G T - A - C G - - A - T G - - C - A - - - T G C - - T - A - - C G - - - T - A C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G";

/** @type {import("../lib/page.js").Page} */


export default {
  name: "professionals",
  title: "dnamedicatiepas.nl - Voor Professionals",
  styles: new URL("./Professionals.css", import.meta.url).href,

  render() {
    return html`
      <section id="intro">
          <h1>
              Betrouwbare medicatiebeslissingen, onderbouwd door DNA.
          </h1>

          <div id="pasverstrekker">
              <div class="edge-bars edge-bars--left" aria-hidden="true">
                  <span class="edge-bar"></span>
                  <span class="edge-bar edge-bar--gradient"></span>
                  <span class="edge-bar"></span>
                  <span class="edge-bar"></span>
                  <span class="edge-bar"></span>
              </div>
              <div class="edge-bars edge-bars--right" aria-hidden="true">
                  <span class="edge-bar"></span>
                  <span class="edge-bar"></span>
                  <span class="edge-bar edge-bar--gradient"></span>
                  <span class="edge-bar edge-bar--gradient"></span>
                  <span class="edge-bar"></span>
              </div>
              <div class="pas-panel">
                  <img src="images/tablet-mockup.svg" alt="dnamedicatiepas logo"/>
              </div>
          </div>
      </section>

      <section id="explanation">
          <div id="explanation-top"> <!-- top -->
              <div id="data"> <!-- left -->
                  <div class="data-listing"> <!-- gen-data -->
                      <p class="data-bignumber">
                          30TB
                      </p>
                      <p class="data-text">
                          Aan gen-data onderzocht
                      </p>
                  </div>
                  <div class="data-listing"> <!-- geneesmiddelen -->
                      <p class="data-bignumber">
                          &gt;100
                      </p>
                      <p class="data-text">
                          Geneesmiddelen ondersteund
                      </p>
                  </div>
              </div>
              <div id="explanation-text"> <!-- right -->
                  <p class="explanation-text__primary">
                      DNAmedicatiepas is een plastic patiëntenpas,
                      die na DNA-analyse wordt uitgegeven door vier
                      samenwerkende ziekenhuizen. De QR-code bevat
                      versleutelde DNA informatie.
                  </p>

                  <p class="explanation-text__secondary">
                      De DNAmedicatie adviezen zijn opgesteld door de Dutch Working Group on Pharmacogenetics,
                      internationaal gepubliceerd en beschikbaar via de G-standaard. Het zijn dezelfde adviezen,
                      die kunnen gegenereerd in Nederlandse huisarts-, ziekenhuis- en apotheeksystemen.
                      De farmacogenetische uitslagen kunt u opslaan in uw automatiseringssysteem als contra-indicatie,
                      zodat u in het vervolg automatisch wordt gewaarschuwd.
                  </p>

                  ${CtaButton({ label: "Bekijk een advies-voorbeeld", modifier: "dark" })}
              </div>
          </div>
          <div>
              <ul class="mw-logos">
                  <li><img src="images/explanation-logos/Amsterdam-UMC-logo.svg" alt="Amsterdam UMC" /></li>
                  <li><img src="images/explanation-logos/LUMC-Logo.svg" alt="Leids Universitair Medisch Centrum" /></li>
                  <li><img src="images/explanation-logos/Maasstad-Ziekenhuis-Logo.svg" alt="Maasstad Ziekenhuis" /></li>
                  <li><img src="images/explanation-logos/Princess-Maxima-Centrum-Logo.svg" alt="Princess Maxima Centrum Logo" /></li>
              </ul>
          </div>
      </section>

      <section id="initiative">
          <div id="initiative-top">
              <div id="initiative-copy">
                  <div class="initiative-heading">
                      <p class="initiative-eyebrow">Een baanbrekend initiatief</p>
                      <h1 class="initiative-title">Minder bijwerkingen en minder zorgkosten</h1>
                  </div>
                  <p class="initiative-description">
                      Diverse studies wereldwijd tonen de voordelen aan van DNAmedicatiepassen. Deze
                      passen helpen zorgverleners om medicatie op maat te geven, gebaseerd op de genetische
                      samenstelling van de patiënt. Hierdoor kunnen bijwerkingen worden verminderd en de effectiviteit van
                      behandelingen worden verhoogd.
                  </p>
              </div>
              <div id="initiative-image">
                  <img src="images/dna-medicatie-pas-badge.svg" alt="DNAmedicatiepas badge houder" />
              </div>
          </div>
      </section>

      <section id="stats">
          <div class="stats-grid">
              <article class="stat-card stat-card--gradient">
                <div>
                    <p class="stat-card__number">-30%</p> 
                    <a class="stat-card__source" href="#">
                      Bron: PubMed
                      <i class="fa-light fa-arrow-up-right" aria-hidden="true"></i>
                    </a>
                </div>
                  <p class="stat-card__body">
                      In een grote Europese studie bleek dat de DNAmedicatiepas
                      <strong>de kans op ernstige bijwerkingen</strong>
                      met 30% kon verminderen
                  </p>
              </article>

              <article class="stat-card stat-card--quote">
                  <p class="stat-card__quote">
                      “In een Amerikaanse studie waren aanzienlijke besparingen in zorgkosten gerealiseerd.”
                  </p>
                  <a class="stat-card__source" href="#">
                      Bron: PubMed
                      <i class="fa-light fa-arrow-up-right" aria-hidden="true"></i>
                  </a>
              </article>
              
          </div>
      </section>

      ${Faq()}

      <section id="meer-weten">
                <div class="background-text background-text--on-dark prevent-select" aria-hidden="true">
                    ${MEER_WETEN_SEQUENCE}
                </div>
      
                <img class="mw-photo" src="images/meer-weten/nurse-mw.svg" alt="Een doktor" />
                <div class="mw-scrim" aria-hidden="true"></div>
      
                <div class="mw-content">
                    <h2 class="mw-title">DNAmedicatiepas aanvragen?</h2>
                    <p class="mw-body">
                        Artsen kunnen DNAmedicatiepassen aanvragen op indicatie bij het Maasstadziekenhuis in Rotterdam. 
                        De andere aangesloten ziekenhuizen geven de passen uit na diagnostiek bij de klinische genetica 
                        waarbij een Whole Genome Sequencing DNA analyse is uitgevoerd.
                    </p>
                </div>
      
                <ul class="mw-logos">
                    <li><img src="images/meer-weten/logo-amsterdam-umc.svg" alt="Amsterdam UMC" /></li>
                    <li><img src="images/meer-weten/logo-lumc.svg" alt="Leids Universitair Medisch Centrum" /></li>
                    <li><img src="images/meer-weten/logo-prinses-maxima.svg" alt="Prinses Máxima Centrum" /></li>
                    <li><img src="images/meer-weten/logo-maastad.svg" alt="Maasstad Ziekenhuis" /></li>
                </ul>
        </section>

      ${Footer()}
    `;
  },
};
