/* ============================================================
   Services page — enhancements. The page is fully readable
   without this file; it adds the service map / rail jumps,
   scroll-spy, the "find your starting point" finder, and
   live search across every scope item.
   ============================================================ */
(function () {
  var groups = [].slice.call(document.querySelectorAll('.sv-group'));
  if (!groups.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rail = document.getElementById('svRail');
  var railBtns = [].slice.call(document.querySelectorAll('.sv-rail-btn'));
  var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 84;

  /* ── counts (kept in sync with the lists) ── */
  var total = 0;
  groups.forEach(function (g) {
    var n = g.querySelectorAll('.sv-items li').length;
    total += n;
    [].forEach.call(document.querySelectorAll('[data-count-for="' + g.id + '"]'), function (el) { el.textContent = n; });
  });
  [].forEach.call(document.querySelectorAll('[data-total]'), function (el) { el.textContent = total; });

  /* ── jump navigation ── */
  function goTo(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var offset = el.classList.contains('sv-group') ? navH + (rail ? rail.offsetHeight : 0) : navH + 12;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: reduce ? 'auto' : 'smooth' });
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-go]') : null;
    if (!t) return;
    goTo(t.getAttribute('data-go'));
  });
  if (location.hash && document.getElementById(location.hash.slice(1))) {
    window.addEventListener('load', function () { setTimeout(function () { goTo(location.hash.slice(1)); }, 60); });
  }

  /* ── scroll-spy ── */
  function setActive(id) {
    railBtns.forEach(function (b) {
      var on = b.getAttribute('data-go') === id;
      b.classList.toggle('is-active', on);
      if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
      var inner = b.parentNode;
      if (on && inner.scrollWidth > inner.clientWidth) {
        inner.scrollTo({ left: b.offsetLeft - 24, behavior: reduce ? 'auto' : 'smooth' });
      }
    });
  }
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-' + (navH + 90) + 'px 0px -55% 0px', threshold: 0 });
    groups.forEach(function (g) { spy.observe(g); });
  }

  /* ── reveal the interactive blocks (hidden without JS) ── */
  ['sv-finder', 'svTools', 'heroFinder'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.hidden = false;
  });

  /* ── finder ── */
  var stages = {
    planning:   { text: 'Fix the regulatory question first: classification, predicate, and the right submission route, before any testing budget is committed.', go: ['regulatory-strategy', 'testing-strategy'] },
    evidence:   { text: 'Define what biological, chemical, and performance evidence FDA will expect for your device’s risk profile, and review CRO protocols before studies begin.', go: ['biocompatibility', 'testing-strategy'] },
    submission: { text: 'Assemble and pressure-test the submission so the risk assessment, the testing, and the claims all agree with each other.', go: ['premarket-submissions', 'biocompatibility'] },
    market:     { text: 'Keep the program in good standing: quality system, registration and listing, post-market surveillance, and change assessments.', go: ['quality-compliance', 'premarket-submissions'] },
    fda:        { text: 'Deficiency letters, Form 483 observations, warning letters, recalls: a structured, observation-by-observation response strategy.', go: ['enforcement-response', 'quality-compliance'] }
  };
  var answer = document.getElementById('svAnswer');
  var stageBtns = [].slice.call(document.querySelectorAll('.sv-stage'));
  function titleOf(id) {
    var h = document.getElementById(id + '-h');
    var n = document.getElementById(id).querySelector('.sv-bignum');
    return (n ? n.textContent + '  ' : '') + (h ? h.textContent : id);
  }
  function applyStage(key) {
    stageBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-stage') === key)); });
    groups.forEach(function (g) { g.classList.toggle('is-suggested', !!key && stages[key].go.indexOf(g.id) > -1); });
    if (!answer) return;
    answer.textContent = '';
    if (!key) { answer.hidden = true; return; }
    var p = document.createElement('p');
    p.textContent = stages[key].text;
    var links = document.createElement('div');
    links.className = 'sv-answer-links';
    stages[key].go.forEach(function (id) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-go', id);
      b.textContent = titleOf(id) + ' →';
      links.appendChild(b);
    });
    answer.appendChild(p);
    answer.appendChild(links);
    answer.hidden = false;
  }
  var current = null;
  stageBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-stage');
      current = current === k ? null : k;
      applyStage(current);
    });
  });

  /* ── search ── */
  var input = document.getElementById('svSearch');
  var clear = document.getElementById('svClear');
  var results = document.getElementById('svResults');
  var empty = document.getElementById('svEmpty');
  var items = [].slice.call(document.querySelectorAll('.sv-items li'));
  items.forEach(function (li) { li.setAttribute('data-t', li.textContent); });

  function paint(li, text, q) {
    li.textContent = '';
    if (!q) { li.textContent = text; return; }
    var lower = text.toLowerCase(), i = 0, at;
    while ((at = lower.indexOf(q, i)) > -1) {
      if (at > i) li.appendChild(document.createTextNode(text.slice(i, at)));
      var m = document.createElement('mark');
      m.textContent = text.slice(at, at + q.length);
      li.appendChild(m);
      i = at + q.length;
    }
    if (i < text.length) li.appendChild(document.createTextNode(text.slice(i)));
  }
  function search() {
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    groups.forEach(function (g) {
      var n = 0;
      [].forEach.call(g.querySelectorAll('.sv-items li'), function (li) {
        var t = li.getAttribute('data-t');
        var hit = !q || t.toLowerCase().indexOf(q) > -1;
        li.hidden = !hit;
        if (hit) { n++; paint(li, t, q); }
      });
      g.hidden = n === 0;
      shown += n;
      var btn = railBtns.filter(function (b) { return b.getAttribute('data-go') === g.id; })[0];
      if (btn) btn.classList.toggle('is-off', n === 0);
      [].forEach.call(document.querySelectorAll('[data-count-for="' + g.id + '"]'), function (el) {
        if (el.closest('.sv-group')) el.textContent = n;
      });
    });
    clear.hidden = !q;
    empty.hidden = shown > 0;
    results.textContent = q ? (shown ? 'Showing ' + shown + ' of ' + total + ' areas of support' : 'No matches for “' + input.value.trim() + '”') : '';
  }
  input.addEventListener('input', search);
  input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { input.value = ''; search(); } });
  clear.addEventListener('click', function () { input.value = ''; search(); input.focus(); });
})();
