/* v3 EFFECTS PACK — preloader, cursor aura, sparks, marquee, version chip */
(function () {
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- PRELOADER ---------- */
  var pre = document.createElement('div');
  pre.id = 'fx-pre';
  pre.innerHTML = '<div class="fx-pre-logo">' + (document.body.dataset.logo || '\u2726') + '</div>' +
                  '<div class="fx-pre-bar"><i id="fxPreBar"></i></div>' +
                  '<div class="fx-pre-count" id="fxPreN">0%</div>';
  document.body.appendChild(pre);
  var n = 0, bar = document.getElementById('fxPreBar'), num = document.getElementById('fxPreN');
  setTimeout(function () { if (pre && pre.parentNode) pre.classList.add('fx-done'); }, 3000);
  setTimeout(function () { if (pre && pre.parentNode) pre.remove(); }, 3800);
  var iv = setInterval(function () {
    n = Math.min(100, n + Math.ceil(Math.random() * 14));
    if (bar) bar.style.width = n + '%';
    if (num) num.textContent = n + '%';
    if (n >= 100) {
      clearInterval(iv);
      setTimeout(function () {
        pre.classList.add('fx-done');
        setTimeout(function () { pre.remove(); }, 650);
      }, 160);
    }
  }, reduce ? 8 : 42);

  /* ---------- CLICK SPARKS ---------- */
  var COLORS = ['#34d399', '#f5b942', '#f5b942', '#ffffff', '#fd79a6', '#ff8e53'];
  document.addEventListener('pointerdown', function (e) {
    if (reduce) return;
    for (var i = 0; i < 12; i++) {
      var s = document.createElement('span');
      s.className = 'fx-spark';
      var ang = Math.random() * Math.PI * 2;
      var dist = 42 + Math.random() * 78;
      s.style.setProperty('--tx', Math.cos(ang) * dist + 'px');
      s.style.setProperty('--ty', Math.sin(ang) * dist + 'px');
      s.style.color = COLORS[(Math.random() * COLORS.length) | 0];
      s.style.left = e.clientX + 'px';
      s.style.top = e.clientY + 'px';
      document.body.appendChild(s);
      (function (el) { setTimeout(function () { el.remove(); }, 750); })(s);
    }
  }, { passive: true });

  /* ---------- MARQUEE (landings) ---------- */
  var words = (document.body.dataset.marquee || '').split(' ~ ').filter(Boolean);
  var hero = document.querySelector('.hero3d');
  if (words.length && hero && hero.parentNode) {
    var seq = [];
    for (var w = 0; w < words.length; w++) seq.push(words[w] + '  <b>\u2726</b>');
    var half = seq.join('  ') + '  ';
    var m = document.createElement('div');
    m.className = 'fx-marquee';
    m.innerHTML = '<div class="fx-marquee-track">' + half + half + '</div>';
    hero.parentNode.insertBefore(m, hero.nextSibling);
  }

  /* ---------- VERSION CHIP ---------- */
  var v = document.createElement('div');
  v.id = 'fx-ver';
  v.textContent = '\u2726 ULTRA v8';
  document.body.appendChild(v);
})();
