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
 */
const ROUTES = {
    '/': 'index.html',
    '/voor-professionals': 'voor-professionals/index.html',
};

// Dev-time sanity check: warn if the page you're looking at isn't a
// registered route, so a typo'd href or a missing ROUTES entry shows up in
// the console right away instead of silently producing a broken link.
(function () {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    if (!(path in ROUTES)) {
        console.warn('[router] "' + path + '" is not a registered route. Known routes:', Object.keys(ROUTES));
    }
})();
