/*
 * Lightweight SPA router (no dependencies).
 *
 * How it works: every "page" is still a real, standalone HTML file (index.html,
 * voor-professionals/index.html, ...), so the site works with JS disabled and
 * a direct link/refresh always resolves normally on any static host.
 * When JS is available, this router intercepts clicks on internal links,
 * fetches the target page's HTML, swaps its <main> content + <link id="page-style">
 * into the current document, and updates the URL with the History API - so
 * navigation feels instant and the address bar shows the clean route path
 * instead of a full page reload.
 *
 * To add a page: add one entry to ROUTES below and point <a href> tags at its
 * clean path. `file` is the real file to fetch, relative to BASE_PATH.
 */
(function () {
    // Set this if the site is served from a sub-path (e.g. GitHub Pages
    // project sites: "/my-repo"). Leave '' for a domain root deploy.
    const BASE_PATH = '';

    const ROUTES = {
        '/': { file: 'index.html', title: 'dnamedicatiepas.nl' },
        '/voor-professionals': { file: 'voor-professionals/index.html', title: 'dnamedicatiepas.nl — Voor Professionals' },
    };

    function normalizePath(pathname) {
        let path = pathname;
        if (BASE_PATH && path.indexOf(BASE_PATH) === 0) {
            path = path.slice(BASE_PATH.length) || '/';
        }
        if (path.length > 1 && path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        return path === '' ? '/' : path;
    }

    function resolveFileUrl(file) {
        return BASE_PATH + '/' + file;
    }

    function currentPath() {
        return normalizePath(window.location.pathname);
    }

    async function navigate(path, { pushHistory = true, hash = '' } = {}) {
        const route = ROUTES[path];
        if (!route) {
            window.location.href = BASE_PATH + path + hash;
            return;
        }

        try {
            const response = await fetch(resolveFileUrl(route.file), { cache: 'no-cache' });
            if (!response.ok) throw new Error('Request for ' + route.file + ' failed with ' + response.status);

            const html = await response.text();
            const parsedDoc = new DOMParser().parseFromString(html, 'text/html');

            const newMain = parsedDoc.querySelector('main');
            const currentMain = document.querySelector('main');
            if (!newMain || !currentMain) throw new Error('Page is missing a <main> element');
            currentMain.replaceWith(newMain);

            document.title = route.title || parsedDoc.title || document.title;

            const newPageStyle = parsedDoc.getElementById('page-style');
            const currentPageStyle = document.getElementById('page-style');
            if (newPageStyle && currentPageStyle) {
                const newHref = new URL(newPageStyle.getAttribute('href'), response.url).href;
                if (currentPageStyle.href !== newHref) currentPageStyle.href = newHref;
            }

            if (pushHistory) {
                history.pushState({ path }, '', BASE_PATH + path + hash);
            }

            if (hash) {
                const target = document.querySelector(hash);
                if (target) target.scrollIntoView();
            } else {
                window.scrollTo(0, 0);
            }

            if (typeof window.initAccordion === 'function') window.initAccordion();
            document.dispatchEvent(new CustomEvent('route:changed', { detail: { path } }));
        } catch (err) {
            console.error('[router] navigation failed, falling back to a full page load:', err);
            window.location.href = BASE_PATH + path + hash;
        }
    }

    function onClick(event) {
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const link = event.target.closest('a');
        if (!link || !link.href) return;
        if (link.target && link.target !== '_self') return;
        if (link.hasAttribute('download')) return;

        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) return;

        const path = normalizePath(url.pathname);

        if (path === currentPath()) {
            if (url.hash) {
                event.preventDefault();
                const target = document.querySelector(url.hash);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
                history.replaceState({ path }, '', BASE_PATH + path + url.hash);
            }
            return;
        }

        if (!(path in ROUTES)) return;

        event.preventDefault();
        navigate(path, { hash: url.hash });
    }

    window.addEventListener('popstate', () => {
        navigate(currentPath(), { pushHistory: false, hash: window.location.hash });
    });

    document.addEventListener('click', onClick);

    history.replaceState({ path: currentPath() }, '', window.location.href);
})();
