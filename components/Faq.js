import { html } from "../lib/html.js";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

/** @type {{ question: string, answer: string }[]} */
const questions = [
  { question: "Wie kan mijn gegevens inzien?", answer: LOREM },
  { question: "Kan iedereen een medicatiepas krijgen?", answer: LOREM },
  { question: "Hoe vraag ik een pas aan?", answer: LOREM },
  { question: "Moet ik betalen voor een pas?", answer: `${LOREM}\n${LOREM}` },
  { question: "Is mijn kaart beveiligd?", answer: LOREM },
];

/**
 * "Veelgestelde Vragen" block, identical on the patients and professionals
 * pages. The open/close behaviour lives in lib/accordion.js.
 */
export default function Faq() {
  return html`
    <section id="veelgestelde-vragen">
        <div>
            <h2>Veelgestelde Vragen</h2>
            <div>
                <p class="h2-caption">
                    Meer vragen?
                </p>
                <p class="h2-caption">
                    Neem contact op met het team via consortium@dnamedicatiepas.nl
                </p>
            </div>
        </div>
        <div id="accordion-menu">
            ${questions.map(
              ({ question, answer }) => html`
            <button class="accordion">${question}</button>
            <div class="panel">
            <p class="stap-body">${answer}</p>
            </div>
            `
            )}

            <a href="#" class="faq-button">
                <span class="faq-button__label">Bekijk alle veelgestelde vragen</span>
                <span class="faq-button__icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
                        <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                    </svg>
                </span>
            </a>
        </div>
    </section>
  `;
}
