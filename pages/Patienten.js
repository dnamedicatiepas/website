import { html } from "../lib/html.js";
import CtaButton from "../components/CtaButton.js";
import Faq from "../components/Faq.js";
import Footer from "../components/Footer.js";

// Decorative DNA sequence behind the "Meer weten" panel (a different run than
// the one behind the hero in index.html).
const MEER_WETEN_SEQUENCE =
  "T - A - C G - - A - T G - - C - A - - - T G C - - T - A - - C G - - - T - A C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G T - A - C G - - A - T G - - C - A - - - T G C - - T - A - - C G - - - T - A C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G T - A - C G - - A - T G - - C - A - - - T G C - - T - A - - C G - - - T - A C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G - - T - - A - C - - G - - T - A C G - - T - - A - C G - - T - - A - C G - - T - - A - C - - G - - T A - - C - - - T G - A C - - T - - - G - - A - C - - T G - - A - - C - T G - - - A - - C - - T G - - A - - - C - - T G - - A - - C - T G - - - A - - C - - T G A - - - C - T G - - A - - C - - T G - - - A - - C G";

/** @type {{ badge: string, title: string, body: string, image: string, alt: string }[]} */
const stappen = [
  {
    badge: "001",
    title: "De arts vraagt de DNAmedicatiepas aan voor jou als patiënt.",
    body: "De arts vraagt de DNA-medicatiepas aan, die wordt verstrekt door aangesloten instellingen. Je ontvangt je eigen pas met je persoonlijke QR-code.",
    image: "images/how-it-works/stap-1.png",
    alt: "DNAmedicatiepas met persoonlijke QR-code",
  },
  {
    badge: "002",
    title: "De QR-code wordt gescand bij de arts en/of apotheker.",
    body: "Elke smartphone of tablet kan uw persoonlijke QR-code scannen. Hierdoor is uw pas bij elk ziekenhuis, apotheek of zorginstelling eenvoudig te gebruiken.",
    image: "images/how-it-works/stap-2.png",
    alt: "Smartphone die de QR-code op de DNAmedicatiepas scant",
  },
  {
    badge: "003",
    title: "Persoonlijke medicatie adviezen verschijnen op uw telefoon of tablet.",
    body: "Dit ondersteunt uw klinische besluitvorming, verbetert de patiëntveiligheid en maakt precisiegeneeskunde praktisch toepasbaar in de dagelijkse workflow.",
    image: "images/how-it-works/stap-3.png",
    alt: "Medicatieoverzicht met adviezen op een smartphone",
  },
];

/** @type {{ icon: string, title: string, body: string }[]} */
const features = [
  {
    icon: "fa-regular fa-credit-card",
    title: "Altijd bij de hand",
    body: "Met de DNAmedicatiepas heb je je persoonlijke medicatie-informatie veilig op zak.",
  },
  {
    icon: "fa-regular fa-pills",
    title: "Minder bijwerkingen",
    body: "Het advies houdt rekening met jouw DNA, zodat medicijnen beter bij jou passen.",
  },
  {
    icon: "fa-regular fa-clock",
    title: "Sneller de juiste medicatie",
    body: "Artsen en apothekers zien meteen wat voor jou werkt, zonder trial & error.",
  },
  {
    icon: "fa-sharp fa-thin fa-sparkles",
    title: "Altijd up-to-date",
    body: "Nieuwe inzichten of aanpassingen worden direct via je pas beschikbaar.",
  },
];

/** @type {import("../lib/page.js").Page} */
export default {
  name: "patienten",
  title: "dnamedicatiepas.nl",
  // Resolved relative to this module, not the HTML document.
  styles: new URL("./Patienten.css", import.meta.url).href,

  render() {
    return html`
      <section id="in1scan">

          <div>
              <div class="in1scan-hdr">

                  <h1 class="in1scan-txt">
                  In één scan de
                  </h1> <!-- in 1 scan -->
                  <h1 class="in1scan-juiste">
                  juiste medicatie.
                  </h1> <!-- in 1 scan juiste -->
              </div> <!-- header -->

              <div class="in1scan-body">
              De DNAmedicatiepas vertaalt het DNA van de patiënt naar concrete medicatie adviezen. Veilig gedeeld via een QR-code, direct beschikbaar voor artsen en apothekers.
              </div> <!-- in 1 scan body -->

              <a style="display:block" href="#section42">
                  <div class="bekijk-frame"> <!-- frame 614 -->
                      <div class="bekijk-knop">

                          <div class="bekijk-tekst">
                          Bekijk hoe het werkt
                          </div> <!-- bekijk tekst -->
                      </div> <!-- bekijk-knop -->

                      <div class="pijl-blok">
                          <div class="pijl-tekst">
                              <i class="fa-light fa-arrow-down"> </i>
                          </div> <!-- pijl-tekst -->
                      </div> <!-- pijl-blok -->

                  </div> <!-- bekijk-frame -->
              </a>
          </div>

          <div class="hero-visual">
              <div class="gradient-pill"></div>
              <div class="photo-frame">
                  <img src="images/hero-image.svg" alt="Glimlachende patiënt" />
              </div>
              <div class="thin-pill a"></div>
              <div class="thin-pill b"></div>
              <div class="badge-frame">
                  <img src="images/dna-medicatie-pas-badge.svg" alt="DNAmedicatiepas badge houder" />
              </div>
          </div>
      </section> <!-- in1scan -->

      <section id="section42">
          <div class="sectie-intro">
              <h2>
                  Hoe het werkt!
              </h2>
              <p class="h2-caption">
                  Met de DNAmedicatiepas krijgt u direct toegang tot het DNA-profiel van uw patiënt.
                  Zo ziet u in één oogopslag welke medicatie het beste past, voorkomt u bijwerkingen
                  en verhoogt u de behandelveiligheid.
              </p>
          </div>

          <div class="stappen">
              ${stappen.map(
                stap => html`
              <article class="stap-kaart">
                  <div class="stap-tekst">
                      <div class="stap-kop">
                          <span class="stap-badge">${stap.badge}</span>
                          <h3 class="stap-titel">${stap.title}</h3>
                      </div>
                      <p class="stap-body">
                          ${stap.body}
                      </p>
                  </div>
                  <div class="stap-visual">
                      <img src="${stap.image}" alt="${stap.alt}" />
                  </div>
              </article>
              `
              )}
          </div>
      </section>

      <section id="features">
          <ul class="feature-grid">
              ${features.map(
                feature => html`
              <li class="feature-card">
                  <span class="feature-card__icon" aria-hidden="true">
                      <i class="${feature.icon}"></i>
                  </span>
                  <div class="feature-card__text">
                      <h3 class="feature-card__title">${feature.title}</h3>
                      <p class="feature-card__body">${feature.body}</p>
                  </div>
              </li>
              `
              )}
          </ul>
      </section>

      ${Faq()}

      <section id="meer-weten">
          <div class="background-text background-text--on-dark prevent-select" aria-hidden="true">
              ${MEER_WETEN_SEQUENCE}
          </div>

          <img class="mw-photo" src="images/meer-weten/person-card.svg" alt="Patiënt houdt de DNAmedicatiepas vast" />
          <div class="mw-scrim" aria-hidden="true"></div>

          <div class="mw-content">
              <h2 class="mw-title">Meer weten over de DNAmedicatiepas?</h2>
              <p class="mw-body">
                  Heeft u interesse in wat DNAmedicatiepas voor uw situatie kan betekenen?
                  Klik op het logo van uw ziekenhuis voor meer informatie of vraag direct om
                  meer informatie.
              </p>
              ${CtaButton({ label: "Informatie aanvragen", modifier: "invert" })}
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
