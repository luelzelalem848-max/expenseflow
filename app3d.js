/* v3 — WebGL particle nebula behind the app screen (real 3D in the app) */
(function () {
  if (typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
  var anchor = document.querySelector('.fx-bg') || document.body.firstElementChild;
  if (anchor && anchor.parentNode) { anchor.after(canvas); }
  else { document.body.prepend(canvas); }

  var renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); }
  catch (e) { canvas.remove(); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 9;

  /* drifting particles */
  var N = 420;
  var geo = new THREE.BufferGeometry();
  var pos = new Float32Array(N * 3);
  var spd = new Float32Array(N);
  for (var i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - .5) * 24;
    pos[i * 3 + 1] = (Math.random() - .5) * 15;
    pos[i * 3 + 2] = -2 - Math.random() * 9;
    spd[i] = 0.004 + Math.random() * 0.008;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var pts = new THREE.Points(geo, new THREE.PointsMaterial({
    color: 0xE8B84B, size: 0.06, transparent: true, opacity: 0.55, depthWrite: false
  }));
  scene.add(pts);

  /* soft glow sprites */
  var c = document.createElement('canvas'); c.width = c.height = 128;
  var g = c.getContext('2d');
  var gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(.3, 'rgba(255,255,255,.5)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  var tex = new THREE.CanvasTexture(c);
  function glow(color, x, y, s, op) {
    var sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex, color: color, transparent: true, opacity: op,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    sp.position.set(x, y, -6);
    sp.scale.setScalar(s);
    scene.add(sp);
  }
  glow(0x818cf8, -7, 3.5, 8, 0.35);
  glow(0xc084fc, 7, -3, 7, 0.3);

  var tx = 0, ty = 0;
  window.addEventListener('pointermove', function (e) {
    tx = (e.clientX / window.innerWidth - .5) * 2;
    ty = (e.clientY / window.innerHeight - .5) * 2;
  }, { passive: true });

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  var visible = true;
  document.addEventListener('visibilitychange', function () { visible = !document.hidden; });

  (function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    var p = geo.attributes.position.array;
    for (var i = 0; i < N; i++) {
      p[i * 3 + 1] += spd[i];
      if (p[i * 3 + 1] > 8) p[i * 3 + 1] = -8;
    }
    geo.attributes.position.needsUpdate = true;
    camera.position.x = tx * 0.9;
    camera.position.y = -ty * 0.6;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  })();
})();
