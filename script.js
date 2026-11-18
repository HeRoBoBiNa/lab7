
(function () {
  "use strict";
  function initialize() {
    const track = document.getElementById("track");
    const items = Array.from(track.querySelectorAll(".item"));
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const current = document.getElementById("current-page");
    const total = document.getElementById("total-pages");
    const dots = document.getElementById("dots");
    const dialog = document.getElementById("lightbox");
    const large = document.getElementById("large-photo");
    let page = 0;
    let perPage = 3;
    function pageCount() { return Math.ceil(items.length / perPage); }
    function update() {
      page = Math.max(0, Math.min(page, pageCount() - 1));
      const start = page * perPage;
      // Offset relative to the full track width: each item has equal width.
      track.style.transform = "translateX(-" + (start * 100 / perPage) + "%)";
      current.textContent = String(page + 1);
      total.textContent = String(pageCount());
      dots.replaceChildren();
      for (let i = 0; i < pageCount(); i += 1) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "dot" + (i === page ? " active" : "");
        dot.setAttribute("aria-label", "Перейти на страницу " + (i + 1));
        dot.setAttribute("aria-current", i === page ? "page" : "false");
        dot.addEventListener("click", function () { page = i; update(); });
        dots.appendChild(dot);
      }
    }
    function resize() {
      const count = window.matchMedia("(max-width: 768px)").matches ? 1 : 3;
      if (count !== perPage) { perPage = count; page = 0; }
      update();
    }
    prev.addEventListener("click", function () { page = (page - 1 + pageCount()) % pageCount(); update(); });
    next.addEventListener("click", function () { page = (page + 1) % pageCount(); update(); });
    window.addEventListener("resize", resize);
    items.forEach(function (item) {
      item.querySelector(".photo-button").addEventListener("click", function () {
        const photo = item.querySelector("img");
        large.src = photo.src;
        large.alt = photo.alt;
        dialog.showModal();
      });
    });
    document.getElementById("close").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (event) { if (event.target === dialog) { dialog.close(); } });
    resize();
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", initialize); }
  else { initialize(); }
}());
