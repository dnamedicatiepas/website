# dnamedicatiepas.nl

A single-page app with no framework and no build step. Routing is the hash
API (`#/voor-professionals`), pages are ES modules that return HTML, and the
nav is shared chrome that follows the current route.

## Running it

ES modules are blocked on `file://`, so the app must be served over HTTP.
Opening `index.html` by double-clicking will fail with a CORS error.

Use the Live Server extension (right-click `index.html` → **Open with Live
Server**), or any static server:

```bash
npx serve .
# or
python -m http.server 8000
```

## Editor setup

Install the recommended extensions when VS Code prompts, or:

```
ext install runem.lit-plugin
```

This validates the HTML inside `` html`...` `` templates — unclosed tags,
unknown tag names, bad attributes — and adds highlighting and autocomplete.

`jsconfig.json` enables `checkJs` and `strict`, so the JavaScript is
type-checked from JSDoc comments. To run the same check in a terminal:

```bash
npx -p typescript tsc -p jsconfig.json
```

## Layout

```
index.html                 Entry point: decorative hero, nav, #app container, module script
app.js                     Router: route table, CSS loading, nav state, view swapping
styles.css                 Shared base: reset, shell layout, nav, buttons, typography, FAQ
lib/html.js                html`` tagged template (auto-escaping) + raw()
lib/page.js                Page typedef used by every page module
lib/accordion.js           FAQ open/close behaviour (delegated, survives page swaps)
components/CtaButton.js    "Informatie aanvragen"-style pill button
components/Faq.js          "Veelgestelde Vragen" block, shared by both pages
components/Footer.js       Footer + closing gradient bar
pages/Patienten.js, .css   Voor Patiënten            #/
pages/Professionals.js     Voor Professionals        #/voor-professionals
pages/NotFound.js, .css    404 for any other route
images/                    All images, both pages
```

## Routes

| Route                   | Page                    | Nav tab            |
| ----------------------- | ----------------------- | ------------------ |
| `#/` (or no hash)       | `pages/Patienten.js`    | Voor Patiënten     |
| `#/voor-professionals`  | `pages/Professionals.js`| Voor Professionals |
| anything else           | `pages/NotFound.js`     | neither            |

Only hashes that start with `#/` are routes. A plain anchor such as
`#section42` ("Bekijk hoe het werkt") or the `#` placeholder links are left to
the browser, so they scroll without changing page.

## Adding a page

**1. Create `pages/Contact.js`:**

```js
import { html } from "../lib/html.js";

/** @type {import("../lib/page.js").Page} */
export default {
  name: "contact",
  title: "dnamedicatiepas.nl - Contact",
  styles: new URL("./Contact.css", import.meta.url).href,

  render() {
    return html`
      <section id="contact">
        <h2>Contact</h2>
      </section>
    `;
  },
};
```

`name` is what lands in `body[data-page]`. `styles` is optional — omit it and
the page just uses the shared base.

**2. Create `pages/Contact.css`,** scoping every selector to the page:

```css
body[data-page="contact"] #contact {
  padding: 140px 24px;
}
```

**3. Register the route in `app.js`:**

```js
import Contact from "./pages/Contact.js";

const routes = {
  // ...
  "/contact": Contact,
};
```

**4. Link to it** with `data-link` so the router handles the click:

```html
<a href="#/contact" data-link>Contact</a>
```

Links inside the segmented toggle in `index.html` are matched against the
current route to decide which tab is active.

## Conventions

**Import paths need the `.js` extension.** Browsers don't resolve
`./pages/Patienten` the way a bundler would.

**Build markup with the `html` tag, not bare template literals.** Interpolated
values are escaped automatically, so user data can't inject markup:

```js
html`<p>${userInput}</p>`   // escaped
```

Values that are already `html` results pass through unescaped, so components
nest without double-escaping. To insert trusted markup from a plain string, opt
out explicitly with `raw()` — never pass user input to it.

**Scope page CSS under `body[data-page="..."]`.** Stylesheets are loaded once
and stay in the document; the attribute is what keeps one page's rules from
matching another's elements. Because the attribute sits on `<body>`, page CSS
can also override the shell — `pages/Professionals.css` removes the section
gap and tightens the nav spacing for that page only.

**Put anything shared in `styles.css`** — reset, shell layout, nav, buttons,
typography, the FAQ block.

**Image paths are relative to `index.html`** (`images/...`), since every page
is rendered into that one document.

## How the router works

`render(path)` in `app.js`:

1. Looks up the page, falling back to `NotFound`.
2. Flips the segmented toggle to the tab whose link matches the route.
3. Awaits that page's stylesheet — loading it *before* the swap, otherwise the
   page renders unstyled and reflows once the stylesheet lands. Each file
   loads once.
4. Bails out if a newer navigation started while the CSS was loading.
5. Sets `body[data-page]` and `document.title`, swaps `#app.innerHTML` inside
   `document.startViewTransition()` (instant swap where unsupported), then
   scrolls to the top like a page load would.

## Known limitations

- **Hash-based routing** (`#/voor-professionals`), chosen so the app works from
  any static host and in sandboxed preview environments. Switching to the
  History API means adding a server rewrite so deep links don't 404.
- **Full re-render on navigation.** Every swap replaces all of `#app`; there is
  no diffing and no component state (an open FAQ panel closes on navigation).
- **View Transitions are progressive enhancement.** The router already wraps
  the swap in `startViewTransition`; the `::view-transition-*` animation rules
  have not been added yet.
- **Formatters skip template contents.** Prettier only formats `html` templates
  it recognizes as lit's, so indentation inside them is manual.
