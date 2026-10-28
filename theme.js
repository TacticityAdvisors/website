/* Theme switch — light / dark.
   Part 1 runs in <head> (sync) so the saved theme is applied before first paint.
   Part 2 builds the toggle in the header once the DOM is ready. */
(function () {
  var KEY = 'tacticity-theme', root = document.documentElement;

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function preferred() {
    var q = /[?&]theme=(dark|light)/.exec(location.search);   /* ?theme=dark previews a theme without saving it */
    if (q) return q[1];
    var s = stored();
    if (s === 'light' || s === 'dark') return s;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function apply(t) {
    root.setAttribute('data-theme', t);
    root.style.colorScheme = t;
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'dark' ? '#0c1410' : '#f8f9f6');
    document.dispatchEvent(new CustomEvent('themechange', { detail: t }));
  }
  apply(preferred());

  var SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>';

  function build() {
    var nav = document.getElementById('nav');
    if (!nav || nav.querySelector('.theme-toggle')) return;

    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'theme-toggle'; btn.setAttribute('role', 'switch');
    btn.innerHTML = '<span class="tt-icon tt-sun">' + SUN + '</span><span class="tt-icon tt-moon">' + MOON + '</span><span class="tt-knob"></span>';

    function sync() {
      var dark = root.getAttribute('data-theme') === 'dark';
      btn.setAttribute('aria-checked', dark);
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.title = dark ? 'Light mode' : 'Dark mode';
    }
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.classList.add('theme-anim');                       /* brief cross-fade, removed right after */
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      setTimeout(function () { root.classList.remove('theme-anim'); }, 500);
    });
    document.addEventListener('themechange', sync);
    sync();

    /* group toggle + CTA so the header grid keeps its three zones */
    var cta = nav.querySelector(':scope > .nav-cta');
    var wrap = document.createElement('div');
    wrap.className = 'nav-actions';
    if (cta) { cta.parentNode.insertBefore(wrap, cta); wrap.appendChild(btn); wrap.appendChild(cta); }
    else { var burger = nav.querySelector('.nav-toggle'); nav.insertBefore(wrap, burger); wrap.appendChild(btn); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();

  /* follow the OS setting until the visitor makes an explicit choice */
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) { if (!stored()) apply(e.matches ? 'dark' : 'light'); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }
})();
