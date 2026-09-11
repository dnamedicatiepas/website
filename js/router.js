/*
 * Route registry.
 *
 * Navigation on this site is standard full-page loads, like any plain HTML
 * project — clicking a link just loads that page normally. This file exists
 * so the site's clean URLs (no ".html", no query strings) live in one place:
 * add a page here, point <a href> tags at the same clean path, and you're
 * done. No server rewrite rules are needed for this to work: each route's
 * `file` is a real page inside a matching folder, and every common static
 * host (GitHub Pages, Netlify, Apache, nginx, VS Code Live Server, ...)
 * already serves `folder/index.html` when a browser requests `folder` or
 * `folder/`.
 *
 * Note on links: <a href> tags in the HTML use RELATIVE paths ("./",
 * "voor-professionals/", "../"), not root-relative ones ("/voor-
 * professionals"). That's deliberate — a relative link resolves against the
 * current page's own location, so it keeps working whether the site is
 * hosted at a domain root or under a sub-path, e.g. a GitHub Pages project
 * site at "username.github.io/repo-name/". A root-relative link would break
 * under that sub-path, since it always resolves from the domain root.
 */
const ROUTES = {
    '/': 'index.html',
    '/voor-professionals': 'voor-professionals/index.html',
};

// Set this if the site is served from a sub-path (e.g. a GitHub Pages
// project site: "/repo-name"). Only used below, for the dev-time sanity
// check — it has no effect on the <a href> links themselves, since those
// are relative and adapt automatically.
const BASE_PATH = '';

// Dev-time sanity check: warn if the page you're looking at isn't a
// registered route, so a typo'd href or a missing ROUTES entry shows up in
// the console right away instead of silently producing a broken link.
(function () {
    let path = window.location.pathname;
    if (BASE_PATH && path.indexOf(BASE_PATH) === 0) path = path.slice(BASE_PATH.length) || '/';
    path = path.replace(/\/$/, '') || '/';
    if (!(path in ROUTES)) {
        console.warn('[router] "' + path + '" is not a registered route. Known routes:', Object.keys(ROUTES));
    }
})();
