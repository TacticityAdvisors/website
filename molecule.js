/* Hero 3D molecule: an aromatic ring leading into a helical polymer backbone.
   Decorative, absolutely positioned behind the hero copy; never affects layout.
   Needs three.js (loaded before this file). */
(function () {
  var root = document.documentElement;
  var canvas = document.getElementById('heroMolecule');
  var fail = function () { root.classList.add('no3d'); };
  if (!canvas) return;
  if (!window.THREE) { fail(); return; }

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); }
  catch (e) { fail(); return; }
  canvas.addEventListener('webglcontextlost', fail);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8aa898, 0.85));
  var key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(8, 10, 12); scene.add(key);
  var rim = new THREE.DirectionalLight(0xdff0e6, 0.5); rim.position.set(-10, -2, -8); scene.add(rim);

  var stage = new THREE.Group(); scene.add(stage);
  var group = new THREE.Group(); stage.add(group);

  var mats = {};
  function mat(k) {
    if (!mats[k]) mats[k] = k === 'bond'
      ? new THREE.MeshStandardMaterial({ roughness: .5, metalness: 0 })
      : new THREE.MeshPhysicalMaterial({ roughness: .28, metalness: 0, clearcoat: 1, clearcoatRoughness: .18 });
    return mats[k];
  }
  var ball = new THREE.SphereGeometry(1, 48, 32);
  var rod = new THREE.CylinderGeometry(1, 1, 1, 20);
  var UP = new THREE.Vector3(0, 1, 0);

  function atom(x, y, z, t) {
    var m = new THREE.Mesh(ball, mat(t));
    m.scale.setScalar({ c: .6, o: .55, n: .57, h: .3 }[t]);
    m.position.set(x, y, z); group.add(m);
    return { p: m.position.clone(), t: t };
  }
  function bond(a, b, off) {
    var d = new THREE.Vector3().subVectors(b.p, a.p), l = d.length();
    var m = new THREE.Mesh(rod, mat('bond'));
    m.scale.set(.09, l, .09);
    m.position.copy(a.p).add(b.p).multiplyScalar(.5);
    if (off) m.position.add(off);
    m.quaternion.setFromUnitVectors(UP, d.normalize());
    group.add(m);
  }
  function dbl(a, b) {
    var d = new THREE.Vector3().subVectors(b.p, a.p).normalize();
    var o = new THREE.Vector3(0, 0, 1).cross(d).normalize().multiplyScalar(.17);
    bond(a, b, o); bond(a, b, o.clone().negate());
  }

  var ring = [], R = 1.4, cx = -7, cy = 0, i;
  for (i = 0; i < 6; i++) { var g = Math.PI / 6 + i * Math.PI / 3; ring.push(atom(cx + R * Math.cos(g), cy + R * Math.sin(g), 0, 'c')); }
  for (i = 0; i < 6; i++) (i % 2 ? bond : dbl)(ring[i], ring[(i + 1) % 6]);
  for (i = 1; i < 6; i++) {
    var a = ring[i], v = new THREE.Vector3(a.p.x - cx, a.p.y - cy, 0).normalize().multiplyScalar(1.05);
    bond(a, atom(a.p.x + v.x, a.p.y + v.y, 0, 'h'));
  }
  var prev = ring[0], chain = [];
  for (i = 0; i < 11; i++) {
    var t = i * .75, x = -4.9 + i * 1.2;
    var el = (i === 3 || i === 8) ? 'o' : (i === 6 ? 'n' : 'c');
    var b = atom(x, Math.sin(t) * 1.1, Math.cos(t) * 1.1, el);
    bond(prev, b); prev = b; chain.push(b);
  }
  chain.forEach(function (b, i) {
    if (b.t === 'o') return;
    var out = new THREE.Vector3(0, b.p.y, b.p.z).normalize();
    if (i === 2 || i === 7 || i === 10) {
      var o = atom(b.p.x + .2, b.p.y + out.y * 1.25, b.p.z + out.z * 1.25, 'o'); dbl(b, o);
    } else if (b.t === 'n') {
      bond(b, atom(b.p.x, b.p.y + out.y, b.p.z + out.z, 'h'));
    } else {
      bond(b, atom(b.p.x + .45, b.p.y + out.y * .85, b.p.z + out.z * .85, 'h'));
      bond(b, atom(b.p.x - .45, b.p.y + out.y * .85, b.p.z + out.z * .85, 'h'));
    }
  });
  var ctr = new THREE.Box3().setFromObject(group).getCenter(new THREE.Vector3());
  group.children.forEach(function (c) { c.position.sub(ctr); });
  group.rotation.set(.25, -.35, .35);

  /* faint dust */
  var N = 140, pos = new Float32Array(N * 3);
  for (i = 0; i < N; i++) {
    var rr = 7 + Math.random() * 7, th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = rr * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = rr * Math.sin(ph) * Math.sin(th) * .7;
    pos[i * 3 + 2] = rr * Math.cos(ph) * .6;
  }
  var pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var pm = new THREE.PointsMaterial({ size: .07, transparent: true, opacity: .55, sizeAttenuation: true });
  var dust = new THREE.Points(pg, pm); stage.add(dust);

  /* colours come from the page's CSS tokens */
  var cs = getComputedStyle(document.body);
  ['c', 'o', 'n', 'h'].forEach(function (k) { var v = cs.getPropertyValue('--atom-' + k).trim(); if (v) mat(k).color.set(v).convertSRGBToLinear(); });
  var bv = cs.getPropertyValue('--bond').trim(); if (bv) mat('bond').color.set(bv).convertSRGBToLinear();
  var av = cs.getPropertyValue('--alpine').trim(); if (av) pm.color.set(av).convertSRGBToLinear();

  var drawn = false;
  function resize() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.set(0, 0, Math.max(30, 37 / camera.aspect));  /* keep the whole chain in frame at any width */
    camera.updateProjectionMatrix();
    if (drawn) renderer.render(scene, camera);
  }
  window.addEventListener('resize', resize);
  resize();

  var drag = false, lx = 0, ly = 0, vy = 0, vx = 0, base = 0, clock = 0, intro = reduce ? 1 : 0;
  canvas.addEventListener('pointerdown', function (e) { drag = true; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
    group.rotation.y += dx * .007; group.rotation.x += dy * .007; vy = dx * .0005; vx = dy * .0005;
    if (reduce) renderer.render(scene, camera);
  });
  ['pointerup', 'pointercancel'].forEach(function (n) { canvas.addEventListener(n, function () { drag = false; }); });

  var running = false, visible = true;
  function frame() {
    if (!running) return;
    clock += .008;
    if (intro < 1) intro = Math.min(1, intro + .012);
    var e = 1 - Math.pow(1 - intro, 3);
    stage.scale.setScalar(.88 + .12 * e);
    if (!drag) { vy += (base - vy) * .02; vx *= .95; group.rotation.y += vy; group.rotation.x += vx; }
    stage.position.y = Math.sin(clock) * .18;
    stage.rotation.y = Math.sin(clock * .5) * .55;   /* gentle sway keeps the chain reading left-to-right */
    dust.rotation.y = clock * .15;
    renderer.render(scene, camera); drawn = true;
    requestAnimationFrame(frame);
  }
  function start() { if (!running && visible && !reduce && !document.hidden) { running = true; requestAnimationFrame(frame); } }
  function stop() { running = false; }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; visible ? start() : stop(); }).observe(canvas);
  }
  renderer.render(scene, camera); drawn = true;   /* first frame (also the still frame for reduced motion) */
  start();
})();
