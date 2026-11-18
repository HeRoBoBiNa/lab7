document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('#track');
  const slides = [...document.querySelectorAll('.item')];
  const currentLabel = document.querySelector('#current-page');
  const totalLabel = document.querySelector('#total-pages');
  const dots = document.querySelector('#dots');
  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const dialog = document.querySelector('#lightbox');
  const large = document.querySelector('#large-photo');
  let page = 0;
  let perPage = 3;
  const pages = () => Math.ceil(slides.length / perPage);
  function update() {
    page = Math.max(0, Math.min(page, pages() - 1));
    // The final desktop page intentionally contains only Top 2 and Top 1.
    const start = page * perPage;
    track.style.transform = `translateX(-${start * (100 / perPage)}%)`;
    currentLabel.textContent = String(page + 1);
    totalLabel.textContent = String(pages());
    prev.disabled = page === 0;
    next.disabled = page === pages() - 1;
    dots.replaceChildren();
    for (let i = 0; i < pages(); i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot' + (i === page ? ' active' : '');
      dot.setAttribute('aria-label', `Страница ${i + 1}`);
      dot.setAttribute('aria-current', String(i === page));
      dot.addEventListener('click', () => { page = i; update(); });
      dots.append(dot);
    }
  }
  function resize() {
    const newPerPage = window.matchMedia('(max-width: 768px)').matches ? 1 : 3;
    if (newPerPage !== perPage) { page = 0; perPage = newPerPage; }
    update();
  }
  prev.addEventListener('click', () => { page--; update(); });
  next.addEventListener('click', () => { page++; update(); });
  window.addEventListener('resize', resize);
  slides.forEach(slide => slide.querySelector('button').addEventListener('click', () => {
    const img = slide.querySelector('img');
    large.src = img.src;
    large.alt = img.alt;
    dialog.showModal();
  }));
  document.querySelector('#close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  resize();
});
