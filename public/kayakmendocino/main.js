/* Kayak Mendocino — shared behavior */
(function () {
  // mobile nav toggle
  var burger = document.querySelector('.hamburger');
  var nav = document.querySelector('nav.primary');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  }

  // dropdowns: tap-to-open (mobile + touch), close on outside click
  document.querySelectorAll('.navdrop > button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var drop = btn.parentElement;
      var wasOpen = drop.classList.contains('open');
      document.querySelectorAll('.navdrop.open').forEach(function (d) { d.classList.remove('open'); });
      if (!wasOpen) drop.classList.add('open');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.navdrop.open').forEach(function (d) { d.classList.remove('open'); });
  });

  // current year in footer
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
