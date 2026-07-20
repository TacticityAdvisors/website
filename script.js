
(function(){
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('toggle');
  const drawer = document.getElementById('drawer');
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 10); }, { passive: true });
  toggle.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open'); toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
    });
  });
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach(el => obs.observe(el));
  } else { reveals.forEach(el => el.classList.add('in')); }
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1); if (!id) return;
      const t = document.getElementById(id); if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 82, behavior: 'smooth' });
    });
  });
})();
/* ---- Typewriter effect: hero kicker ---- */
(function () {
  var el = document.querySelector('.hero-kicker');
  if (!el) return;

  // Respect reduced-motion: leave text as-is, no animation
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var full = el.textContent;
  el.classList.add('tw');

  // Keep the real text for screen readers; only hide it visually while typing
  var sr = document.createElement('span');
  sr.textContent = full;
  sr.style.position = 'absolute';
  sr.style.width = '1px'; sr.style.height = '1px';
  sr.style.overflow = 'hidden'; sr.style.clip = 'rect(0 0 0 0)';
  el.setAttribute('aria-hidden', 'false');

  el.textContent = '';        // clear visible copy
  var i = 0;
  function type() {
    if (i <= full.length) {
      el.textContent = full.slice(0, i);
      i++;
      setTimeout(type, 38);   // ~38ms per character
    } else {
      el.classList.add('done'); // cursor blinks a few times then stops
    }
  }
  setTimeout(type, 350);      // small delay after page fade-in
})();
