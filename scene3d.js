/* 3D hero scene — WebGL via three.js, themed objects, mouse parallax */
(function () {
  var canvas = document.getElementById('scene3d');
  if (!canvas || typeof THREE === 'undefined') return;
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); }
  catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x04070f, 0.055);
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  scene.add(new THREE.AmbientLight(0x8899bb, 0.5));
  var key = new THREE.PointLight(0x818cf8, 1.6, 60); key.position.set(6, 6, 8); scene.add(key);
  var rim = new THREE.PointLight(0xE8B84B, 1.1, 60); rim.position.set(-8, -3, 6); scene.add(rim);
  var top = new THREE.DirectionalLight(0xffffff, .5); top.position.set(0, 10, 5); scene.add(top);

  var group = new THREE.Group();
  scene.add(group);
  var floats = [];

  function reg(mesh, amp, sp, rx, ry) {
    mesh.userData = { y0: mesh.position.y, amp: amp, sp: sp, ph: Math.random() * Math.PI * 2, rx: rx || 0, ry: ry || 0 };
    group.add(mesh); floats.push(mesh);
    return mesh;
  }

  
  // golden coins
  var coinGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.12, 40);
  var gold = new THREE.MeshStandardMaterial({ color: 0xE8B84B, metalness: 0.85, roughness: 0.28 });
  var coinSpots = [[-6.2,1.4,-2],[ -3.4,-2.2,-1],[6.4,2.1,-3],[4.6,-1.6,-.5],[-1.8,3.0,-4],[2.4,3.3,-3],[7.0,-3.1,-1.5],[-5.4,-3.4,-3],[0.4,-3.8,-2],[8.2,0.4,-4]];
  coinSpots.forEach(function (s) {
    var c = new THREE.Mesh(coinGeo, gold);
    c.position.set(s[0], s[1], s[2]);
    c.rotation.set(Math.random()*1.4-.7, Math.random()*3, Math.random()*1.4-.7);
    reg(c, 0.55, .7 + Math.random()*.5, 0.004, 0.008);
  });
  // glass panels
  var panelMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, transparent: true, opacity: 0.32, metalness: 0.7, roughness: 0.2 });
  [[-7.5,2.8,-5,1.2],[6.8,3.4,-6,0.9],[3.2,-4.2,-5,1.4],[-2.8,-4.6,-4,.8]].forEach(function (s) {
    var p = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.35, 0.06), panelMat);
    p.position.set(s[0], s[1], s[2]);
    p.rotation.z = s[3] * .5;
    reg(p, 0.4, .5, 0.002, 0.004);
  });
  // big halo ring
  var ring = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.045, 16, 120),
    new THREE.MeshStandardMaterial({ color: 0xE8B84B, metalness: 0.9, roughness: 0.25 }));
  ring.position.set(0, 0.3, -4.5); ring.rotation.x = 0.5;
  reg(ring, 0.25, .35, 0.0012, 0.003);


  // dust particles
  var pGeo = new THREE.BufferGeometry();
  var pArr = new Float32Array(180 * 3);
  for (var i = 0; i < 180; i++) {
    pArr[i * 3] = (Math.random() - .5) * 24;
    pArr[i * 3 + 1] = (Math.random() - .5) * 14;
    pArr[i * 3 + 2] = (Math.random() - .5) * 12;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
  var pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xE8B84B, size: 0.05, transparent: true, opacity: 0.55 }));
  group.add(pts);

  var tx = 0, ty = 0;
  window.addEventListener('pointermove', function (e) {
    tx = (e.clientX / window.innerWidth - .5) * 2;
    ty = (e.clientY / window.innerHeight - .5) * 2;
  }, { passive: true });

  function resize() {
    var p = canvas.parentElement;
    var w = p.clientWidth, h = p.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  var visible = true;
  document.addEventListener('visibilitychange', function () { visible = !document.hidden; });

  var clock = new THREE.Clock();
  (function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    var t = clock.getElapsedTime();
    for (var i = 0; i < floats.length; i++) {
      var m = floats[i], u = m.userData;
      m.position.y = u.y0 + Math.sin(t * u.sp + u.ph) * u.amp;
      m.rotation.x = m.rotation.x + u.rx;
      m.rotation.y = m.rotation.y + u.ry;
    }
    pts.rotation.y = t * 0.03;
    group.rotation.y += (tx * 0.30 - group.rotation.y) * 0.045;
    group.rotation.x += (ty * 0.14 - group.rotation.x) * 0.045;
    camera.position.x = tx * 0.9; camera.position.y = -ty * 0.55;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  })();
})();
