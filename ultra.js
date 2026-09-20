/* ULTRA LUXURY PRO MAX — interactions: tilt, magnetic, ripple, shimmer */
(function () {
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 1. Shimmer + borders + shine targets
  document.querySelectorAll('.hero-title, .section-title, h1.app-title').forEach(function (el) {
    el.classList.add('fx-shimmer');
  });
  document.querySelectorAll('.feature-card, .activity-card, .glass-card, .stat-card').forEach(function (el) {
    el.classList.add('fx-lux-card');
    if (canHover) el.classList.add('fx-tilt');
  });
  document.querySelectorAll('.btn-primary, .btn-primary.btn-lg, .btn-primary.btn-sm').forEach(function (el) {
    el.classList.add('fx-shine');
  });

  // 2. Aurora layer in heroes
  var hero = document.querySelector('.hero, .hero-section, .avatar-area');
  if (hero) {
    var aur = document.createElement('div');
    aur.className = 'fx-aurora';
    aur.innerHTML = '<i></i><i></i><i></i>';
    if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative';
    hero.prepend(aur);
  }

  // 3. 3D tilt
  if (canHover) {
    document.querySelectorAll('.fx-tilt').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5;
        var y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 9) + 'deg) rotateX(' + (-y * 9) + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transform = '';
      });
    });
  }

  // 4. Magnetic primary buttons
  if (canHover) {
    document.querySelectorAll('.fx-shine').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * .25;
        var y = (e.clientY - r.top - r.height / 2) * .35;
        btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
        btn.style.transition = 'transform .12s ease';
      });
      btn.addEventListener('pointerleave', function () {
        btn.style.transform = '';
        btn.style.transition = 'transform .35s cubic-bezier(.2,.9,.3,1.4)';
      });
    });
  }

  // 5. Ripple on every button
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn, button');
    if (!btn) return;
    if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
    if (btn.classList.contains('fx-shine')) return; // shine buttons skip ripple
    var r = btn.getBoundingClientRect();
    var s = Math.max(r.width, r.height);
    var sp = document.createElement('span');
    sp.className = 'fx-ripple';
    sp.style.width = sp.style.height = s + 'px';
    sp.style.left = (e.clientX - r.left - s / 2) + 'px';
    sp.style.top = (e.clientY - r.top - s / 2) + 'px';
    btn.appendChild(sp);
    setTimeout(function () { sp.remove(); }, 600);
  });
})();
