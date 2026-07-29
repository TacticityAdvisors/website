/* ============================================================
   MOBILE DRAWER — Services accordion toggle
   Append this to the END of your existing script.js
   (Paste it inside the existing (function(){ ... })(); wrapper,
   right before the final closing })();  — or as its own IIFE below it.)
   ============================================================ */

(function () {
  var toggle = document.getElementById('servicesToggle');
  var subList = document.getElementById('servicesSubList');
  if (!toggle || !subList) return;

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    var isOpen = subList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close the accordion (and the whole drawer) when a sub-link is tapped
  subList.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      var drawer = document.getElementById('drawer');
      var mainToggle = document.getElementById('toggle');
      if (drawer) drawer.classList.remove('open');
      if (mainToggle) {
        mainToggle.classList.remove('open');
        mainToggle.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    });
  });
})();
