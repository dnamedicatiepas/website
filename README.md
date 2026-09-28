# mijndnamedicatiepas.nl

A static website with no framework, no build step and no dependencies. Every
page is its own HTML file; the parts that repeat across pages (header, footer,
FAQ, CTA buttons) are small [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
in `components/`.

## Running it

All paths are root-absolute (`/styles.css`, `/images/...`), so the site must be
served over HTTP from its root. Opening `index.html` by double-clicking will
load it without styles.

Use the Live Server extension (right-click `index.html` → **Open with Live
Server**), or any static server:

```bash
npx serve .          # also serves 404.html for unknown paths
# or
python -m http.server 8000
```

## Layout

```
index.html                     Voor Patiënten                /
voor-professionals/index.html  Voor Professionals            /voor-professionals/
404.html                       Not found (served by the host for any unknown URL)
styles.css                     Shared: tokens, reset, layout, nav, CTA button, typography, FAQ, Meer weten, logos, footer
styles/<page>.css              Page-only rules, linked by that page after styles.css
components/site-header.js      <site-header>  top bar, DNA backdrop, nav
components/site-footer.js      <site-footer>  footer and closing bar
components/faq-section.js      <faq-section>  "Veelgestelde Vragen"
components/cta-button.js       <cta-button>   every call-to-action button
images/                        All images; logos/on-dark and logos/on-light hold the hospital logos
```

## Components

Each component is a classic script that defines a custom element and renders
its markup into itself when it is added to the page. The scripts are loaded in
`<head>` without `defer`: the elements are then defined before the parser
reaches them, so they are present on first paint instead of popping in. They
render into the page's own DOM (no shadow DOM), so the rules in `styles.css`
apply to them as usual.

| Element | Attributes |
| --- | --- |
| `<site-header>` | `current="patienten"` or `"professionals"` marks that nav tab as the current page. Leave it off on pages that aren't in the nav. |
| `<site-footer>` | none |
| `<faq-section>` | none; the questions are the `FAQ_ITEMS` array in `components/faq-section.js` |
| `<cta-button>` | see below |

### `<cta-button>`

```html
<cta-button label="Informatie aanvragen" href="/contact/"></cta-button>
<cta-button label="Bekijk hoe het werkt" href="#section42" variant="dark" icon="arrow-down"></cta-button>
<cta-button label="Bron: PubMed" href="https://pubmed.ncbi.nlm.nih.gov/..." target="_blank"></cta-button>
```

| Attribute | Values | Default |
| --- | --- | --- |
| `label` | button text | required |
| `href` | link target | required; a missing `href` renders `#` and logs a console warning |
| `variant` | `default` (translucent), `invert` (light), `dark` | `default` |
| `icon` | `arrow-up-right`, `arrow-down`, `plus` | `arrow-up-right` |
| `target` | e.g. `_blank` (adds `rel="noopener noreferrer"`) | none |

To add an icon, add an SVG string to `CTA_ICONS` in `components/cta-button.js`.
To add a variant, add its name to `CTA_VARIANTS` and a `.cta-button--<name>`
rule in `styles.css` that sets `--cta-bg` and `--cta-fg`.

The label is an attribute rather than the element's text because the script
runs before the parser has read the element's children.

## Adding a page

1. Copy `404.html` (the smallest page) to `<name>/index.html`, so the page is
   served at `/<name>/`.
2. Update `<title>`, the description, and add `<link rel="canonical">` and the
   `og:` tags (see `index.html`). Remove `<meta name="robots" content="noindex">`.
3. Put page-only CSS in `styles/<name>.css` and link it after `styles.css`.
4. Include the component scripts the page uses in `<head>`.
5. To add the page to the nav toggle, add it to `SITE_NAV_TABS` in
   `components/site-header.js` and give the page `<site-header current="<name>">`.

## CSS conventions

- **Shared vs page CSS.** Anything used on more than one page goes in
  `styles.css`. A page's stylesheet holds only what is specific to it; since it
  loads after `styles.css`, its rules win over shared rules of equal
  specificity.
- **Tokens.** Colours, the brand gradient, fonts and the focus ring are custom
  properties on `:root` in `styles.css`. Use them instead of hex values.
- **Fonts.** `body` sets the font family; don't repeat `font-family` per rule.
- **Breakpoints.** 1200px, 1000px and 800px (listed at the top of
  `styles.css`). Media queries can't use custom properties, so stick to these.
- **Layout.** `.page` wraps everything and clips anything that bleeds past
  the screen edge. `.shell` is the 90%-wide content column used by the header,
  `main` and the footer. Spacing between those blocks is set with margins in
  `styles.css`, and a page can override one distance on its own (see
  `styles/professionals.css`).

## Checks

`jsconfig.json` enables `checkJs` and `strict`, so the components are
type-checked from their JSDoc comments:

```bash
npx -p typescript tsc -p jsconfig.json
```

## Deployment notes

- `404.html` must stay at the site root; GitHub Pages, Netlify and Cloudflare
  Pages serve it automatically for unknown URLs.
- Without a build step, file names never change between deploys. Configure the
  host to revalidate HTML, CSS and JS (e.g. `Cache-Control: no-cache` with
  ETags) so visitors don't keep stale files after an update.
