/**
 * FAQ accordion behaviour. Listens on the document instead of on each button
 * because the FAQ markup is re-rendered on every navigation; per-element
 * listeners would be lost with the old markup.
 */
export function installAccordion() {
  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest("button.accordion");
    if (!button) return;

    button.classList.toggle("active");

    const panel = button.nextElementSibling;
    if (!(panel instanceof HTMLElement)) return;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = "";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
