/**
 * <faq-section>: the "Veelgestelde Vragen" block, identical on the patients and
 * professionals pages. Each question is a native <details>/<summary>, so the
 * open/closed state, keyboard support and hiding closed answers from screen
 * readers come from the browser.
 */

const FAQ_LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

/** @type {{ question: string, answer: string }[]} */
const FAQ_ITEMS = [
  { question: "Wie kan mijn gegevens inzien?", answer: FAQ_LOREM },
  { question: "Kan iedereen een medicatiepas krijgen?", answer: FAQ_LOREM },
  { question: "Hoe vraag ik een pas aan?", answer: FAQ_LOREM },
  { question: "Moet ik betalen voor een pas?", answer: `${FAQ_LOREM} ${FAQ_LOREM}` },
  { question: "Is mijn kaart beveiligd?", answer: FAQ_LOREM },
];

class FaqSection extends HTMLElement {
  connectedCallback() {
    if (this.hasChildNodes()) return;

    this.innerHTML = `
      <section id="veelgestelde-vragen" aria-labelledby="faq-title">
        <div class="faq-intro">
          <h2 id="faq-title">Veelgestelde Vragen</h2>
          <div>
            <p class="h2-caption">Meer vragen?</p>
            <p class="h2-caption">
              Neem contact op met het team via
              <a href="mailto:consortium@mijndnamedicatiepas.nl">consortium@mijndnamedicatiepas.nl</a>
            </p>
          </div>
        </div>
        <div class="faq-list"></div>
      </section>
    `;

    const list = this.querySelector(".faq-list");
    if (!list) return;

    for (const { question, answer } of FAQ_ITEMS) {
      const item = document.createElement("details");
      item.className = "faq-item";

      const summary = document.createElement("summary");
      summary.className = "faq-item__question";
      summary.textContent = question;

      const body = document.createElement("div");
      body.className = "faq-item__answer";
      const text = document.createElement("p");
      text.className = "body-text";
      text.textContent = answer;
      body.append(text);

      item.append(summary, body);
      list.append(item);
    }

    const allQuestions = document.createElement("cta-button");
    allQuestions.setAttribute("label", "Bekijk alle veelgestelde vragen");
    allQuestions.setAttribute("href", "#");
    allQuestions.setAttribute("variant", "dark");
    allQuestions.setAttribute("icon", "plus");
    list.append(allQuestions);
  }
}

customElements.define("faq-section", FaqSection);
