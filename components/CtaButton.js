import { html, raw } from "../lib/html.js";

/**
 * Pill button with the diagonal-arrow icon, e.g. "Informatie aanvragen".
 *
 * @param {object} options
 * @param {string} options.label
 * @param {string} [options.href]      Defaults to "#" (placeholder link).
 * @param {"invert" | "dark"} [options.modifier]  Colour variant, see styles.css.
 * @param {boolean} [options.link]     True for in-app routes ("#/..."): adds data-link
 *                                     so the router handles the click.
 */
export default function CtaButton({ label, href = "#", modifier, link = false }) {
  const classes = modifier ? `cta-button cta-button--${modifier}` : "cta-button";

  return html`
    <a href="${href}" class="${classes}" ${link ? raw("data-link") : ""}>
        <span class="cta-button__label">${label}</span>
        <span class="cta-button__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
        </span>
    </a>
  `;
}
