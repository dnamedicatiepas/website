import Patienten from "./pages/Patienten.js";
import Professionals from "./pages/Professionals.js";
import NotFound from "./pages/NotFound.js";
import { installAccordion } from "./lib/accordion.js";

// Each page lives in its own module and exports { name, title, styles, render }.
/** @type {Record<string, import("./lib/page.js").Page>} */
const routes = {
  "/": Patienten,
  "/voor-professionals": Professionals,
};

/**
 * @param {string} id
 * @returns {HTMLElement}
 */
function mustFind(id) {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing #${id} element`);
  return element;
}

const app = mustFind("app");

/** @type {Set<string>} */
const loadedStyles = new Set();

// Page stylesheets are fetched once and then left in place; the data-page
// scoping in each file keeps inactive pages' rules from matching anything.
/**
 * @param {string} [href]
 * @returns {Promise<void>}
 */
function loadStyles(href) {
  if (!href || loadedStyles.has(href)) return Promise.resolve();
  loadedStyles.add(href);

  return new Promise(resolve => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    // Resolve on error too, so a missing file never blocks navigation.
    link.addEventListener("load", () => resolve(), { once: true });
    link.addEventListener("error", () => resolve(), { once: true });
    document.head.append(link);
  });
}

/**
 * Route path for a hash, or null when the hash is a plain in-page anchor
 * ("#section42", "#") rather than a route ("#/voor-professionals"). Plain
 * anchors are left to the browser so "Bekijk hoe het werkt" still scrolls to
 * its section and the "#" placeholder links don't change page.
 *
 * @param {string} hash
 * @returns {string | null}
 */
function routeFromHash(hash) {
  if (!hash.startsWith("#/")) return null;
  const path = hash.slice(1).replace(/\/+$/, "");
  return path || "/";
}

/** The route in the address bar; "/" when it holds no route. */
function currentPath() {
  return routeFromHash(location.hash) ?? "/";
}

/**
 * Flip the "Voor Patiënten" / "Voor Professionals" toggle to the tab whose
 * link points at `path`. On an unknown route (404) neither tab is active.
 *
 * @param {string} path
 */
function markActiveTab(path) {
  document.querySelectorAll("#nav .segmented-toggle__tab").forEach(tab => {
    const href = tab.querySelector("a")?.getAttribute("href") ?? "";
    const active = routeFromHash(href) === path;

    tab.classList.toggle("segmented-toggle__tab--active", active);
    tab.classList.toggle("segmented-toggle__tab--inactive", !active);

    const label = tab.querySelector(".segmented-toggle__label");
    label?.classList.toggle("segmented-toggle__label--active", active);
    label?.classList.toggle("segmented-toggle__label--inactive", !active);
  });
}

/**
 * @param {string} path
 * @param {() => void} [afterSwap]  Runs once the new markup is in the document.
 */
async function render(path, afterSwap) {
  const page = routes[path] ?? NotFound;

  markActiveTab(path);

  // Wait for the CSS before swapping, otherwise the new page animates in
  // unstyled and then reflows once the stylesheet lands.
  await loadStyles(page.styles);

  // A faster navigation may have overtaken this one while the CSS loaded.
  if (currentPath() !== path) return;

  const update = () => {
    document.body.dataset.page = page.name;
    document.title = page.title;
    app.innerHTML = String(page.render());
    afterSwap?.();
  };

  // Fall back to an instant swap in browsers without View Transitions support.
  if (document.startViewTransition) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

/** @param {string} id */
function scrollToAnchor(id) {
  document.getElementById(id)?.scrollIntoView();
}

// Set the hash explicitly so navigation also works in sandboxed preview environments.
document.addEventListener("click", event => {
  if (!(event.target instanceof Element)) return;
  // Leave modified clicks (new tab, etc.) to the browser.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = event.target.closest("a[data-link]");
  if (!link) return;

  event.preventDefault();
  const path = routeFromHash(link.getAttribute("href") ?? "") ?? "/";
  if (routeFromHash(location.hash) === path) {
    // Same route again (e.g. the logo on the home page): behave like a reload.
    render(path, scrollToTop);
  } else {
    location.hash = path;
  }
});

window.addEventListener("hashchange", () => {
  const path = routeFromHash(location.hash);
  if (path !== null) {
    // Like a page load: the new page starts at the top.
    render(path, scrollToTop);
    return;
  }

  // A plain anchor. Normally the browser has already scrolled to it and the
  // page stays put; the exception is an anchor that isn't on this page, which
  // was reached through history from the home page — go back there.
  const anchor = location.hash.slice(1);
  if (anchor && !document.getElementById(anchor)) {
    render("/", () => scrollToAnchor(anchor));
  }
});

installAccordion();

// On first load the browser can't scroll to a plain anchor yet, because the
// content it points at is only rendered here.
const initialAnchor = routeFromHash(location.hash) === null ? location.hash.slice(1) : "";
render(currentPath(), () => {
  if (initialAnchor) scrollToAnchor(initialAnchor);
});
