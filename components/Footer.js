import { html } from "../lib/html.js";
import CtaButton from "./CtaButton.js";

/**
 * Site footer plus the gradient bar that closes the page. Both are rendered
 * here (rather than in the shell) because the professionals page has neither.
 */
export default function Footer() {
  return html`
    <footer>
        <div>
            <p class="stap-body">
                © Consortium B.V.
            </p>
        </div>
        <div class="logo">
            <a href="#/" data-link>
                <img src="images/logo.svg" alt="dnamedicatiepas logo"/>
            </a>
        </div>
        <div>
            ${CtaButton({ label: "Informatie aanvragen" })}
        </div>
    </footer>

    <div class="border-bottom"></div>
  `;
}
