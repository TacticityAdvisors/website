/* ============================================================
   Tacticity Advisors — Polymer scenes
   A ball-and-stick polymer model rendered with Three.js.
   Six architectures (linear, branched, network, block, helix, star)
   that morph into one another. Mounted on <canvas data-poly>.
   Requires three.js r128 (global THREE). Degrades to nothing.
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvases = [].slice.call(document.querySelectorAll('canvas[data-poly]'));
  var explorer = document.querySelector('[data-explorer]');
  if (!canvases.length) return;
  if (!window.THREE) { canvases.forEach(function (c) { c.style.display = 'none'; }); return; }

  var T = window.THREE, V3 = T.Vector3;
  var N = 140, MAXB = 300, STEP = 0.27;

  /* ---------- seeded random ---------- */
  function rng(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; }

  /* ---------- palettes (linear rgb 0..1) ---------- */
  var MINT = [0.38, 0.88, 0.68], DEEP = [0.12, 0.62, 0.5], PALE = [0.93, 0.98, 0.95], ICE = [0.7, 0.95, 0.86];
  function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

  /* ---------- helpers ---------- */
  function resample(fn, count, step, tMax) {
    var pts = [], prev = fn(0), acc = 0, next = 0, dt = tMax / 6000; pts.push(prev.clone());
    for (var i = 1; i <= 6000 && pts.length < count; i++) {
      var p = fn(i * dt); acc += p.distanceTo(prev); prev = p;
      if (acc >= step) { pts.push(p.clone()); acc = 0; }
    }
    while (pts.length < count) pts.push(prev.clone().add(new V3(.01 * pts.length, 0, 0)));
    return pts;
  }
  function chainBonds(from, to, bonds) { for (var i = from; i < to; i++) bonds.push([i, i + 1]); }
  function finish(P, bonds, cols) {
    var c = new V3(); P.forEach(function (p) { c.add(p); }); c.multiplyScalar(1 / P.length);
    var max = 0; P.forEach(function (p) { p.sub(c); max = Math.max(max, p.length()); });
    var k = 5.4 / Math.max(max, .01); if (k > 2.6) k = 2.6;
    var pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) { pos[i * 3] = P[i].x * k; pos[i * 3 + 1] = P[i].y * k; pos[i * 3 + 2] = P[i].z * k; col[i * 3] = cols[i][0]; col[i * 3 + 1] = cols[i][1]; col[i * 3 + 2] = cols[i][2]; }
    return { pos: pos, col: col, bonds: bonds.slice(0, MAXB), k: k };
  }

  /* ---------- architectures ---------- */
  var BUILD = {
    linear: function () {
      var P = resample(function (t) { return new V3(3.6 * Math.sin(1.0 * t + .4), 2.1 * Math.sin(1.7 * t + 1.3) + .6 * Math.sin(3.1 * t), 2.4 * Math.sin(2.3 * t + .2)); }, N, STEP, 40);
      var bonds = [], cols = []; chainBonds(0, N - 1, bonds);
      for (var i = 0; i < N; i++) cols.push(mix(MINT, PALE, i / (N - 1)));
      return finish(P, bonds, cols);
    },
    helix: function () {
      var P = [], bonds = [], cols = [], i, n = 70, dth = .24, rise = .115, r = 1.2;
      for (var s = 0; s < 2; s++) for (i = 0; i < n; i++) { var th = i * dth + s * Math.PI; P.push(new V3((i - n / 2) * rise, Math.cos(th) * r, Math.sin(th) * r)); cols.push(s ? mix(DEEP, ICE, i / n) : mix(MINT, PALE, i / n)); }
      chainBonds(0, n - 1, bonds); chainBonds(n, 2 * n - 1, bonds);
      for (i = 2; i < n; i += 5) bonds.push([i, n + i]);
      return finish(P, bonds, cols);
    },
    branched: function () {
      var P = [], bonds = [], cols = [], i, R = rng(5), main = 52;
      var mainPts = resample(function (t) { return new V3(Math.cos(t) * 3.1, Math.sin(t * .8) * .9, Math.sin(t) * 3.1); }, main, STEP, 4.3);
      mainPts.forEach(function (p, k) { P.push(p); cols.push(mix(MINT, ICE, k / main)); }); chainBonds(0, main - 1, bonds);
      var anchors = [7, 19, 31, 43], idx = main;
      for (var b = 0; b < 4; b++) {
        var a = anchors[b], base = mainPts[a], out = new V3(base.x, 0, base.z).normalize(), up = new V3(0, 1, 0), side = new V3().crossVectors(out, up).normalize(), sgn = b % 2 ? -1 : 1;
        var prev = a;
        for (i = 0; i < 22; i++) {
          var tt = (i + 1) * STEP, q = base.clone().add(out.clone().multiplyScalar(tt * .95)).add(up.clone().multiplyScalar(sgn * (tt * .55 + Math.sin(i * .5) * .25))).add(side.clone().multiplyScalar(Math.sin(i * .35 + b) * .35));
          P.push(q); cols.push(mix(DEEP, PALE, i / 22)); bonds.push([prev, idx]); prev = idx; idx++;
        }
      }
      while (P.length < N) { var e = P[P.length - 1].clone().add(new V3(.2, .1, 0)); P.push(e); cols.push(PALE); bonds.push([P.length - 2, P.length - 1]); }
      return finish(P, bonds, cols);
    },
    network: function () {
      var P = [], bonds = [], cols = [], R = rng(9), x, y, z, id = {}, k = 0, g = 5, sp = 1.0;
      for (x = 0; x < g; x++) for (y = 0; y < g; y++) for (z = 0; z < g; z++) { P.push(new V3((x - 2) * sp + (R() - .5) * .28, (y - 2) * sp + (R() - .5) * .28, (z - 2) * sp + (R() - .5) * .28)); id[x + ',' + y + ',' + z] = k; cols.push(mix(DEEP, MINT, R())); k++; }
      var dirs = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      for (x = 0; x < g; x++) for (y = 0; y < g; y++) for (z = 0; z < g; z++) dirs.forEach(function (d) { var nx = x + d[0], ny = y + d[1], nz = z + d[2]; if (nx < g && ny < g && nz < g && R() < .66) bonds.push([id[x + ',' + y + ',' + z], id[nx + ',' + ny + ',' + nz]]); });
      var corner = id['4,4,4'], prev = corner;
      for (var t = 0; t < N - 125; t++) { var a = t * .6; P.push(new V3(2.1 + t * .17, 2.1 + Math.sin(a) * .35, 2.1 + Math.cos(a) * .35)); cols.push(mix(PALE, ICE, t / 15)); bonds.push([prev, P.length - 1]); prev = P.length - 1; }
      return finish(P, bonds, cols);
    },
    block: function () {
      var P = [], bonds = [], cols = [], i, nA = 70, r = .52, dth = .47, rise = .13;
      for (i = 0; i < nA; i++) { var th = i * dth; P.push(new V3(-5 + i * rise, Math.cos(th) * r, Math.sin(th) * r)); cols.push(mix(MINT, ICE, i / nA)); }
      var end = P[nA - 1].clone(), nB = N - nA;
      var B = resample(function (t) { return new V3(end.x + 1.2 * t * .35 + 1.7 * Math.sin(1.3 * t) * (1 - Math.exp(-t)), 1.6 * Math.sin(1.9 * t + .5) * (1 - Math.exp(-t)), 1.6 * Math.cos(1.5 * t) * (1 - Math.exp(-t)) - 1.6 * (1 - Math.exp(-t)) + 1.6 * Math.exp(-t) * 0); }, nB + 1, STEP, 40).slice(1);
      B.forEach(function (p, j) { P.push(p); cols.push(mix(PALE, DEEP, j / nB)); });
      chainBonds(0, N - 1, bonds);
      return finish(P, bonds, cols);
    },
    star: function () {
      var P = [new V3(0, 0, 0)], bonds = [], cols = [mix(PALE, PALE, 0)], axes = [new V3(1, 0, 0), new V3(-1, 0, 0), new V3(0, 1, 0), new V3(0, -1, 0), new V3(0, 0, 1), new V3(0, 0, -1)], idx = 1, a, j;
      for (a = 0; a < 6; a++) {
        var ax = axes[a], u = Math.abs(ax.y) > .5 ? new V3(1, 0, 0) : new V3(0, 1, 0), v = new V3().crossVectors(ax, u).normalize(); u.crossVectors(v, ax).normalize();
        var prev = 0;
        for (j = 0; j < 23; j++) { var rr = .22 + j * .043, ph = j * .34 + a * 1.1, q = ax.clone().multiplyScalar(.42 + j * .255).add(u.clone().multiplyScalar(Math.cos(ph) * rr)).add(v.clone().multiplyScalar(Math.sin(ph) * rr)); P.push(q); cols.push(mix(a % 2 ? DEEP : MINT, PALE, j / 22)); bonds.push([prev, idx]); prev = idx; idx++; }
      }
      while (P.length < N) { P.push(new V3(0, .15, 0)); cols.push(PALE); bonds.push([0, P.length - 1]); }
      return finish(P, bonds, cols);
    }
  };
  var ARCH = {};
  Object.keys(BUILD).forEach(function (k) { ARCH[k] = BUILD[k](); });
  var SEQ = ['linear', 'helix', 'branched', 'network', 'block', 'star'];

  /* ---------- scene ---------- */
  function mount(canvas, opts) {
    opts = opts || {};
    var renderer;
    try { renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); } catch (e) { canvas.style.display = 'none'; return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = opts.exposure || 1.15;
    var scene = new T.Scene(), camera = new T.PerspectiveCamera(38, 1, .1, 100); camera.position.set(0, 0, 15.5);
    // lit with plain lights (an environment map is skipped: it is not reliable on every GPU)
    scene.add(new T.HemisphereLight(0xd9fff0, 0x0d2a22, .75));
    var key = new T.DirectionalLight(0xffffff, 1.9); key.position.set(5, 7, 9); scene.add(key);
    var fill = new T.DirectionalLight(0x9fe8cf, .9); fill.position.set(-8, 2, 5); scene.add(fill);
    var rim = new T.PointLight(0x5fe0b8, 2.4, 50); rim.position.set(-6, -4, -7); scene.add(rim);
    var rim2 = new T.PointLight(0xffffff, 1.4, 50); rim2.position.set(7, -5, -6); scene.add(rim2);

    var group = new T.Group(); scene.add(group);
    var beadMat = new T.MeshPhysicalMaterial({ color: 0xffffff, metalness: .05, roughness: .2, clearcoat: 1, clearcoatRoughness: .04 });
    var beads = new T.InstancedMesh(new T.SphereGeometry(.17, 28, 18), beadMat, N); beads.instanceMatrix.setUsage(T.DynamicDrawUsage);
    var colArr = new Float32Array(N * 3); beads.instanceColor = new T.InstancedBufferAttribute(colArr, 3);
    group.add(beads);
    var bondMat = new T.MeshStandardMaterial({ color: 0xcfeee2, metalness: .25, roughness: .35 });
    var bonds = new T.InstancedMesh(new T.CylinderGeometry(1, 1, 1, 10, 1, true), bondMat, MAXB); bonds.instanceMatrix.setUsage(T.DynamicDrawUsage); group.add(bonds);

    var R = rng(31), out = [], off = [], i;
    for (i = 0; i < N; i++) { out.push(R()); off.push(new V3(R() - .5, R() - .5, R() - .5).normalize()); }

    var from = ARCH[opts.arch || 'linear'], to = from, m = 1, curName = opts.arch || 'linear';
    var seqI = Math.max(0, SEQ.indexOf(curName)), holdT = 0, HOLD = opts.hold || 5.2, MORPH = reduce ? .01 : 2.4;
    var P = []; for (i = 0; i < N; i++) P.push(new V3());
    var mtx = new T.Matrix4(), q = new T.Quaternion(), sc = new V3(), pos = new V3(), up = new V3(0, 1, 0), dir = new V3(), a = new V3(), b = new V3(), a2 = new V3(), b2 = new V3(), col = new T.Color();
    var time = 0, vis = true, tiltX = 0, tiltY = 0, tx = 0, ty = 0, rot = opts.rot || 0, zoom = opts.zoom || 1;

    function setArch(name) { if (!ARCH[name] || name === curName) return; from = ARCH[curName]; to = ARCH[name]; curName = name; m = 0; canvas.dispatchEvent(new CustomEvent('polymorph', { detail: name })); }
    function resize() { var w = canvas.clientWidth || 300, h = canvas.clientHeight || 300; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); var s = (w / h < 1 ? Math.max(.5, w / h * .95) : 1) * zoom; group.scale.setScalar(s); if (opts.offsetX && w / h > 1.1) group.position.x = opts.offsetX; else group.position.x = 0; }
    resize(); if (window.ResizeObserver) new ResizeObserver(resize).observe(canvas); else window.addEventListener('resize', resize);
    if (opts.interactive !== false) window.addEventListener('pointermove', function (e) { var r = canvas.getBoundingClientRect(); tx = ((e.clientX - r.left) / Math.max(r.width, 1) - .5); ty = ((e.clientY - r.top) / Math.max(r.height, 1) - .5); tx = Math.max(-1, Math.min(1, tx)); ty = Math.max(-1, Math.min(1, ty)); }, { passive: true });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(canvas);

    var last = performance.now();
    function frame(now) {
      requestAnimationFrame(frame);
      var dt = Math.min(.05, (now - last) / 1000); last = now; if (!vis || document.hidden) return;
      time += reduce ? 0 : dt;
      if (opts.auto && m >= 1) { holdT += dt; if (holdT > HOLD) { holdT = 0; seqI = (seqI + 1) % SEQ.length; setArch(SEQ[seqI]); } }
      if (m < 1) m = Math.min(1, m + dt / MORPH);
      var jig = reduce ? 0 : .018, ci, s, e, ox;
      for (i = 0; i < N; i++) {
        s = Math.min(1, Math.max(0, m * 1.7 - out[i] * .7)); s = s * s * (3 - 2 * s);
        ci = i * 3; e = Math.sin(Math.PI * s) * 1.9;
        P[i].set(from.pos[ci] + (to.pos[ci] - from.pos[ci]) * s + off[i].x * e + Math.sin(time * 1.3 + i) * jig, from.pos[ci + 1] + (to.pos[ci + 1] - from.pos[ci + 1]) * s + off[i].y * e + Math.cos(time * 1.1 + i * 1.7) * jig, from.pos[ci + 2] + (to.pos[ci + 2] - from.pos[ci + 2]) * s + off[i].z * e + Math.sin(time * .9 + i * .6) * jig);
        mtx.makeTranslation(P[i].x, P[i].y, P[i].z); beads.setMatrixAt(i, mtx);
        colArr[ci] = from.col[ci] + (to.col[ci] - from.col[ci]) * s; colArr[ci + 1] = from.col[ci + 1] + (to.col[ci + 1] - from.col[ci + 1]) * s; colArr[ci + 2] = from.col[ci + 2] + (to.col[ci + 2] - from.col[ci + 2]) * s;
      }
      beads.instanceMatrix.needsUpdate = true; beads.instanceColor.needsUpdate = true;
      var fb = from.bonds, tb = to.bonds, ms = m * m * (3 - 2 * m), k, wA, wB, len;
      for (k = 0; k < MAXB; k++) {
        var ba = fb[k], bb = tb[k];
        if (!ba && !bb) { sc.set(0, 0, 0); mtx.compose(pos.set(0, 0, 0), q.identity(), sc); bonds.setMatrixAt(k, mtx); continue; }
        if (ba) { a.copy(P[ba[0]]); b.copy(P[ba[1]]); } else { a.copy(P[bb[0]]); b.copy(P[bb[1]]); }
        if (bb) { a2.copy(P[bb[0]]); b2.copy(P[bb[1]]); } else { a2.copy(a); b2.copy(b); }
        a.lerp(a2, ms); b.lerp(b2, ms);
        wA = ba ? 1 : 0; wB = bb ? 1 : 0; var thick = wA + (wB - wA) * ms;
        dir.subVectors(b, a); len = dir.length(); if (len < .001 || thick < .02) { sc.set(0, 0, 0); mtx.compose(pos.set(0, 0, 0), q.identity(), sc); bonds.setMatrixAt(k, mtx); continue; }
        pos.addVectors(a, b).multiplyScalar(.5); q.setFromUnitVectors(up, dir.multiplyScalar(1 / len)); sc.set(.035 * thick, len, .035 * thick); mtx.compose(pos, q, sc); bonds.setMatrixAt(k, mtx);
      }
      bonds.instanceMatrix.needsUpdate = true;
      tiltX += (ty - tiltX) * .04; tiltY += (tx - tiltY) * .04;
      rot += reduce ? 0 : dt * (opts.speed || .16);
      group.rotation.y = rot + tiltY * .9; group.rotation.x = tiltX * .5 + (opts.pitch || .12);
      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
    return { setArch: setArch, get arch() { return curName; } };
  }

  var instances = [];
  canvases.forEach(function (c) {
    var d = c.dataset;
    var inst = mount(c, { arch: d.arch || 'linear', auto: d.auto === 'true', zoom: parseFloat(d.zoom || '1'), offsetX: parseFloat(d.offsetx || '0'), speed: parseFloat(d.speed || '.16'), interactive: d.interactive !== 'false', hold: parseFloat(d.hold || '5.2') });
    c.__poly = inst; instances.push(inst);
  });

  /* ---------- services explorer ---------- */
  if (explorer) {
    var canvas = explorer.querySelector('canvas[data-poly]'), inst = canvas && canvas.__poly;
    var items = [].slice.call(explorer.querySelectorAll('.pe-item'));
    var t = explorer.querySelector('.pe-title'), meta = explorer.querySelector('.pe-meta'), sub = explorer.querySelector('.pe-sub'), pts = explorer.querySelector('.pe-points'), link = explorer.querySelector('.pe-link'), tag = explorer.querySelector('.pe-arch');
    var cur = 0, timer, userTouched = false;
    function pick(i, user) {
      cur = i; items.forEach(function (b, k) { b.setAttribute('aria-selected', k === i ? 'true' : 'false'); b.classList.toggle('on', k === i); });
      var b = items[i], d = b.dataset; if (inst) inst.setArch(d.arch);
      t.textContent = d.title; sub.textContent = d.sub; meta.textContent = d.metaphor; tag.textContent = d.archname; link.href = d.href;
      pts.innerHTML = ''; d.points.split('|').forEach(function (p) { var li = document.createElement('li'); li.textContent = p; pts.appendChild(li); });
      var card = explorer.querySelector('.pe-card'); card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap');
      if (user) { userTouched = true; clearInterval(timer); }
    }
    items.forEach(function (b, i) { b.addEventListener('click', function () { pick(i, true); }); b.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) pick(i, true); }); });
    pick(0, false);
    if (!reduce) timer = setInterval(function () { if (!document.hidden) pick((cur + 1) % items.length, false); }, 7000);
  }

  /* ---------- gentle 3D tilt on cards ---------- */
  if (!reduce && window.matchMedia('(hover:hover)').matches) {
    [].forEach.call(document.querySelectorAll('.explore-card'), function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.setProperty('--ry', ((px - .5) * 9).toFixed(2) + 'deg'); c.style.setProperty('--rx', ((.5 - py) * 7).toFixed(2) + 'deg');
        c.style.setProperty('--mx', (px * 100) + '%'); c.style.setProperty('--my', (py * 100) + '%'); c.classList.add('live');
      });
      c.addEventListener('pointerleave', function () { c.classList.remove('live'); c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
    });
  }
})();
