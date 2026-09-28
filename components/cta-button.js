/**
 * <cta-button>: the pill-shaped call-to-action link used across the site
 * ("Informatie aanvragen", "Bekijk hoe het werkt", ...). It renders into the
 * page's own DOM (no shadow root), so the shared .cta-button rules in
 * styles.css and any page-level spacing rules apply to it.
 *
 * Attributes (changing one from JS re-renders the button):
 *   label    Button text. Required.
 *   href     Link target. Required; a missing href renders "#" and warns, so a
 *            forgotten link shows up in the console instead of looking done.
 *   variant  "default" (translucent), "invert" (light) or "dark".
 *   icon     "arrow-up-right" (default), "arrow-down" or "plus".
 *   target   Optional link target; "_blank" also sets rel="noopener noreferrer".
 *
 * The label is an attribute rather than the element's text because this script
 * runs in <head>: the element is upgraded before the parser has read its
 * children, so child text would not be there yet.
 *
 * @example
 *   <cta-button label="Informatie aanvragen" href="/contact/"></cta-button>
 *   <cta-button label="Bekijk hoe het werkt" href="#section42" variant="dark" icon="arrow-down"></cta-button>
 */

/** @type {Record<string, string>} Inline SVGs; add an icon here to make it available. */
const CTA_ICONS = {
  "arrow-up-right":
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>',
  "arrow-down":
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>',
  plus:
    '<svg viewBox="0 0 640 640" fill="currentColor"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',
};

const CTA_VARIANTS = ["default", "invert", "dark"];

class CtaButton extends HTMLElement {
  static observedAttributes = ["label", "href", "variant", "icon", "target"];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    // Initial attributes are reported before connectedCallback; only re-render
    // once the button has been drawn.
    if (this.firstElementChild) this.render();
  }

  render() {
    const href = this.getAttribute("href");
    if (href === null) console.warn("<cta-button> is missing an href attribute.", this);

    const labelText = this.getAttribute("label");
    if (labelText === null) console.warn("<cta-button> is missing a label attribute.", this);

    let variant = this.getAttribute("variant") ?? "default";
    if (!CTA_VARIANTS.includes(variant)) {
      console.warn(`<cta-button> has unknown variant "${variant}"; using "default".`, this);
      variant = "default";
    }

    let icon = this.getAttribute("icon") ?? "arrow-up-right";
    if (!(icon in CTA_ICONS)) {
      console.warn(`<cta-button> has unknown icon "${icon}"; using "arrow-up-right".`, this);
      icon = "arrow-up-right";
    }

    const link = document.createElement("a");
    link.className = variant === "default" ? "cta-button" : `cta-button cta-button--${variant}`;
    link.setAttribute("href", href ?? "#");

    const target = this.getAttribute("target");
    if (target) {
      link.target = target;
      if (target === "_blank") link.rel = "noopener noreferrer";
    }

    const label = document.createElement("span");
    label.className = "cta-button__label";
    label.textContent = labelText ?? "";

    const iconBox = document.createElement("span");
    iconBox.className = "cta-button__icon";
    iconBox.setAttribute("aria-hidden", "true");
    iconBox.innerHTML = CTA_ICONS[icon];

    link.append(label, iconBox);
    this.replaceChildren(link);
  }
}

customElements.define("cta-button", CtaButton);
