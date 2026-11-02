/* Investments journey: staggered scroll-in. Hover/focus effects are pure CSS. */
(function () {
  var list = document.querySelector('.inv-journey');
  if (!list) return;
  for (var i = 0; i < list.children.length; i++) list.children[i].style.setProperty('--i', i);
  if (!('IntersectionObserver' in window) || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  list.classList.add('js-anim');
  new IntersectionObserver(function (en, ob) {
    if (en[0].isIntersecting) { list.classList.add('in'); ob.disconnect(); }
  }, { threshold: .2 }).observe(list);
})();
