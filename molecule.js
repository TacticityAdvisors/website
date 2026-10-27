/* ============================================================
   Tacticity Advisors — Molecule scenes
   Ball-and-stick models of real medical-device materials, drawn with
   Three.js in the style of the reference polymer segment: carbon in
   alpine green, oxygen in sage, hydrogen in white, double bonds as
   twin sticks. Atoms assemble one by one ("polymerisation").
   Hexagon markers on the model open short notes in the caption plate.
   Mounts on <figure data-mol-stage>. Needs three.js r128 (THREE).
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stages = [].slice.call(document.querySelectorAll('[data-mol-stage]'));
  var T = window.THREE;
  var V = T && T.Vector3;

  /* ---------------- molecule builder ---------------- */
  function Mol(name, role) { this.name = name; this.role = role; this.atoms = []; this.bonds = []; this.notes = []; }
  Mol.prototype.atom = function (x, y, z, t) { this.atoms.push({ p: new V(x, y, z), t: t }); return this.atoms.length - 1; };
  Mol.prototype.bond = function (a, b, o) { this.bonds.push({ a: a, b: b, o: o || 1 }); };
  Mol.prototype.note = function (atom, title, text) { this.notes.push({ atom: atom, title: title, text: text }); };
  Mol.prototype.methyl = function (c, dir) {
    var P = this.atoms[c].p, d = dir.clone().normalize(), u = Math.abs(d.y) < .9 ? new V(0, 1, 0).cross(d).normalize() : new V(1, 0, 0).cross(d).normalize(), v = new V().crossVectors(d, u).normalize();
    for (var k = 0; k < 3; k++) { var a = k * 2.0944 + .5, q = P.clone().add(d.clone().multiplyScalar(.38)).add(u.clone().multiplyScalar(Math.cos(a) * .92)).add(v.clone().multiplyScalar(Math.sin(a) * .92)); this.bond(c, this.atom(q.x, q.y, q.z, 'h')); }
  };

  var BUILD = {
    /* the reference molecule: aromatic ring feeding a helical backbone with ester and amide groups */
    segment: function () {
      var m = new Mol('Polymer segment', 'Aromatic ring, ester and amide groups'), ring = [], R = 1.4, cx = -7, cy = 0, i, g;
      for (i = 0; i < 6; i++) { g = Math.PI / 6 + i * Math.PI / 3; ring.push(m.atom(cx + R * Math.cos(g), cy + R * Math.sin(g), 0, 'c')); }
      for (i = 0; i < 6; i++) m.bond(ring[i], ring[(i + 1) % 6], i % 2 ? 1 : 2);
      for (i = 1; i < 6; i++) { var a = m.atoms[ring[i]].p, v = new V(a.x - cx, a.y - cy, 0).normalize().multiplyScalar(1.05); m.bond(ring[i], m.atom(a.x + v.x, a.y + v.y, 0, 'h')); }
      var prev = ring[0], bb = [];
      for (i = 0; i < 11; i++) { var t = i * .75, ty = (i === 3 || i === 8) ? 'o' : (i === 6 ? 'n' : 'c'), b = m.atom(-4.9 + i * 1.2, Math.sin(t) * 1.1, Math.cos(t) * 1.1, ty); m.bond(prev, b); prev = b; bb.push(b); }
      var carbonyl = -1;
      bb.forEach(function (b, i) {
        var p = m.atoms[b].p, out = new V(0, p.y, p.z).normalize();
        if (m.atoms[b].t === 'o') return;
        if (i === 2 || i === 7 || i === 10) { var o = m.atom(p.x + .2, p.y + out.y * 1.25, p.z + out.z * 1.25, 'o'); m.bond(b, o, 2); if (i === 2) carbonyl = o; }
        else if (m.atoms[b].t === 'n') m.bond(b, m.atom(p.x, p.y + out.y, p.z + out.z, 'h'));
        else { m.bond(b, m.atom(p.x + .45, p.y + out.y * .85, p.z + out.z * .85, 'h')); m.bond(b, m.atom(p.x - .45, p.y + out.y * .85, p.z + out.z * .85, 'h')); }
      });
      m.note(ring[3], 'Aromatic ring', 'Rigid and chemically stable. Additives built on aromatic rings are a classic chemical characterization question.');
      m.note(bb[3], 'Ester group', 'Esters can hydrolyse over time, so degradation products matter for long-term contact.');
      m.note(bb[6], 'Amide group', 'A hydrogen-bonding site that adds strength and also draws in moisture.');
      m.note(carbonyl, 'Carbonyl oxygen', 'Shown as a double bond. Small changes here shift how the material ages and sterilizes.');
      return m;
    },

    /* polyethylene glycol: –CH2–CH2–O– repeated */
    peg: function (n) {
      n = n || 6; var m = new Mol('Polyethylene glycol (PEG)', 'A straight chain, one unit after another'), seq = ['c', 'c', 'o'], N = 3 * n, i, prev = -1, idxs = [];
      for (i = 0; i < N; i++) {
        var sy = i % 2 ? .55 : -.55, x = i * 1.3 - N * .65, a = m.atom(x, sy, 0, seq[i % 3]); idxs.push(a);
        if (prev >= 0) m.bond(prev, a); prev = a;
        if (seq[i % 3] === 'c') { m.bond(a, m.atom(x, sy + Math.sign(sy) * .42, .92, 'h')); m.bond(a, m.atom(x, sy + Math.sign(sy) * .42, -.92, 'h')); }
      }
      var first = m.atoms[idxs[0]].p, last = m.atoms[idxs[N - 1]].p;
      m.bond(idxs[0], m.atom(first.x - 1.0, first.y - .45, 0, 'h')); var eo = m.atom(last.x + 1.05, last.y + .5, 0, 'o'); m.bond(idxs[N - 1], eo); m.bond(eo, m.atom(last.x + 1.75, last.y + 1.15, 0, 'h'));
      var mid = idxs[3 * Math.floor(n / 2) + 2];
      m.note(mid, 'Ether oxygen', 'Makes PEG water-loving. Common in coatings, hydrogels and drug delivery.');
      m.note(eo, 'Chain end', 'Residual end groups and leftover monomer are exactly what extractables testing looks for.');
      m.note(idxs[3 * Math.floor(n / 2)], 'Repeat unit', 'The number of units (degree of polymerization) sets molecular weight and behaviour. Use the buttons to change it.');
      m.units = { n: n, min: 3, max: 9 }; return m;
    },

    /* silicone (PDMS): –Si–O– with methyl groups */
    pdms: function (n) {
      n = n || 4; var m = new Mol('Silicone (PDMS)', 'A backbone with methyl side groups'), N = 2 * n + 1, i, prev = -1, si = [], oxy = [];
      for (i = 0; i < N; i++) {
        var isSi = i % 2 === 0, sy = i % 2 ? .62 : -.62, x = i * 1.5 - N * .75, a = m.atom(x, sy, 0, isSi ? 'si' : 'o');
        if (prev >= 0) m.bond(prev, a); prev = a; (isSi ? si : oxy).push(a);
        if (isSi) { var dy = Math.sign(sy) * .55; [1, -1].forEach(function (zs) { var c = m.atom(x, sy + dy, zs * 1.55, 'c'); m.bond(a, c); m.methyl(c, new V(0, dy * .6, zs).normalize()); }); }
      }
      m.note(si[Math.floor(si.length / 2)], 'Silicon centre', 'Silicone is the workhorse for tubing, seals and soft implants.');
      m.note(oxy[Math.floor(oxy.length / 2)], 'Siloxane link', 'The Si–O backbone is flexible and stable, but low-molecular-weight siloxanes can leach.');
      m.note(si[0], 'Methyl groups', 'Low surface energy side groups. Cyclic siloxane residues are a known leachable to characterize.');
      m.units = { n: n, min: 2, max: 6 }; return m;
    },

    /* PEEK: ether–ether–ketone between benzene rings */
    peek: function () {
      var m = new Mol('PEEK', 'An implant polymer built from rings'), rings = [], R = 1.4, step = 5.2, k, i, links = ['o', 'o', 'k'], prevRight = -1, ketoneO = -1, ether = -1, ringTop = -1;
      for (k = 0; k < 4; k++) {
        var cx = -7.8 + k * step, ids = [];
        for (i = 0; i < 6; i++) { var g = i * Math.PI / 3; ids.push(m.atom(cx + R * Math.cos(g), R * Math.sin(g), 0, 'c')); }
        for (i = 0; i < 6; i++) m.bond(ids[i], ids[(i + 1) % 6], i % 2 ? 1 : 2);
        [1, 2, 4, 5].forEach(function (j) { var p = m.atoms[ids[j]].p, v = new V(p.x - cx, p.y, 0).normalize().multiplyScalar(1.0); m.bond(ids[j], m.atom(p.x + v.x, p.y + v.y, 0, 'h')); });
        if (k === 1) ringTop = ids[1];
        if (prevRight >= 0) {
          var a = m.atoms[prevRight].p, b = m.atoms[ids[3]].p, mx = (a.x + b.x) / 2, sg = (k % 2) ? .85 : -.85;
          if (links[k - 1] === 'o') { var o = m.atom(mx, sg, 0, 'o'); m.bond(prevRight, o); m.bond(o, ids[3]); if (ether < 0) ether = o; }
          else { var c = m.atom(mx, sg, 0, 'c'); m.bond(prevRight, c); m.bond(c, ids[3]); ketoneO = m.atom(mx, sg + .1, 1.25, 'o'); m.bond(c, ketoneO, 2); }
        }
        prevRight = ids[0]; rings.push(ids);
      }
      m.note(ringTop, 'Benzene ring', 'Aromatic rings give PEEK its chemical stability and stiffness.');
      m.note(ether, 'Ether link', 'Ether oxygens add chain flexibility so the polymer can be processed.');
      m.note(ketoneO, 'Ketone link', 'Sets heat resistance. Together these make PEEK a standard for spinal and orthopaedic implants.');
      return m;
    },

    /* nylon: two amide chains held by hydrogen bonds */
    nylon: function (n) {
      n = n || 2; var m = new Mol('Nylon sheet', 'Two strands, matched by hydrogen bonds'), seq = ['n', 'c', 'c', 'c', 'c', 'c', 'k'], L = seq.length * n, D = 3.9, i, j, A = [], B = [], hb = [];
      function chain(zs, rev) {
        var ids = [], prev = -1;
        for (j = 0; j < L; j++) {
          var t = seq[rev ? (L - 1 - j) % seq.length : j % seq.length], sy = j % 2 ? .55 : -.55, x = j * 1.25 - L * .625, z = zs * D / 2, tt = t === 'k' ? 'c' : t, a = m.atom(x, sy, z, tt);
          if (prev >= 0) m.bond(prev, a); prev = a; ids.push(a);
          var toward = zs > 0 ? -1 : 1;
          if (t === 'n') { var h = m.atom(x, sy + Math.sign(sy) * .15, z + toward * 1.0, 'h'); m.bond(a, h); hb.push({ h: h, side: zs, x: j }); }
          else if (t === 'k') { var o = m.atom(x, sy + Math.sign(sy) * .15, z + toward * 1.22, 'o'); m.bond(a, o, 2); hb.push({ o: o, side: zs, x: j }); }
          else { m.bond(a, m.atom(x, sy + Math.sign(sy) * .4, z - toward * .9, 'h')); m.bond(a, m.atom(x, sy + Math.sign(sy) * .4, z + toward * .9, 'h')); }
        }
        return ids;
      }
      A = chain(-1, false); B = chain(1, true);
      var firstH = -1;
      hb.forEach(function (p) { if (p.h === undefined) return; hb.forEach(function (q) { if (q.o !== undefined && q.side !== p.side && q.x === p.x) { m.bond(p.h, q.o, 'h'); if (firstH < 0) firstH = p.h; } }); });
      m.note(firstH, 'Hydrogen bond', 'The dashed link holds the strands together. It is also why nylon draws in water.');
      m.note(A[0], 'Amide link', 'Each repeat contains an amide, the group that gives nylon its strength.');
      m.note(B[Math.floor(L / 2)], 'Aligned chains', 'Order between chains is what testing tries to prove: matched, repeatable, documented.');
      m.units = { n: n, min: 1, max: 3 }; return m;
    },

    /* double helix with base-pair style rungs */
    helix: function () {
      var m = new Mol('Double helix', 'Two strands, joined by repeating rungs'), n = 16, r = 1.7, A = [], B = [], i;
      for (i = 0; i < n; i++) { var th = i * .72; A.push(m.atom(i * .66 - n * .33, Math.cos(th) * r, Math.sin(th) * r, 'c')); B.push(m.atom(i * .66 - n * .33, Math.cos(th + Math.PI) * r, Math.sin(th + Math.PI) * r, 'o')); if (i) { m.bond(A[i - 1], A[i]); m.bond(B[i - 1], B[i]); } }
      var rung = -1, hbond = -1;
      for (i = 1; i < n - 1; i += 2) {
        var a = m.atoms[A[i]].p, b = m.atoms[B[i]].p, p1 = a.clone().lerp(b, .34), p2 = a.clone().lerp(b, .66), n1 = m.atom(p1.x, p1.y, p1.z, 'n'), n2 = m.atom(p2.x, p2.y, p2.z, 'n');
        m.bond(A[i], n1); m.bond(n1, n2, 'h'); m.bond(n2, B[i]); if (rung < 0) { rung = n1; hbond = n2; }
      }
      m.note(rung, 'Rung', 'Cross-links between strands make the structure stable. A quality system does the same for a process.');
      m.note(A[Math.floor(n / 2)], 'Strand', 'Each strand is a repeat unit, identical every time. That repeatability is what auditors look for.');
      return m;
    },

    /* POSS silsesquioxane cage */
    poss: function () {
      var m = new Mol('Silsesquioxane cage (POSS)', 'A nanoscale core with groups radiating out'), a = 1.55, sx, sy, sz, si = {}, k = 0, firstC = -1;
      [-1, 1].forEach(function (x) { [-1, 1].forEach(function (y) { [-1, 1].forEach(function (z) { si[x + ',' + y + ',' + z] = m.atom(x * a, y * a, z * a, 'si'); }); }); });
      var keys = Object.keys(si), oxy = [];
      keys.forEach(function (ka) { keys.forEach(function (kb) { if (ka >= kb) return; var pa = ka.split(',').map(Number), pb = kb.split(',').map(Number), diff = 0; for (var i = 0; i < 3; i++) if (pa[i] !== pb[i]) diff++; if (diff !== 1) return;
        var mid = [0, 0, 0].map(function (_, i) { return (pa[i] + pb[i]) / 2 * a; }), o = [0, 0, 0].map(function (_, i) { return pa[i] === pb[i] ? pa[i] * a * 1.28 : 0; });
        var ox = m.atom(o[0], o[1], o[2], 'o'); m.bond(si[ka], ox); m.bond(ox, si[kb]); oxy.push(ox); }); });
      keys.forEach(function (ka) { var pa = ka.split(',').map(Number), d = new V(pa[0], pa[1], pa[2]).normalize(), s = m.atoms[si[ka]].p, c = m.atom(s.x + d.x * 1.7, s.y + d.y * 1.7, s.z + d.z * 1.7, 'c'); m.bond(si[ka], c); m.methyl(c, d); if (firstC < 0) firstC = c; });
      m.note(si[keys[0]], 'Silicon corner', 'Eight silicon atoms form a cube. POSS is used as a nanoscale filler to tune polymer strength.');
      m.note(oxy[2], 'Oxygen bridge', 'Twelve oxygen bridges lock the cage. Additives like this need their own safety and leachables story.');
      m.note(firstC, 'Radiating group', 'Every corner carries an organic group, like every corrective action radiates from one root cause.');
      return m;
    },

    /* fullerene C60 */
    c60: function () {
      var m = new Mol('Fullerene (C60)', 'Sixty carbons closed into a sphere'), phi = (1 + Math.sqrt(5)) / 2, pts = [], seen = {}, s = .74;
      function add(x, y, z) { var k = [x, y, z].map(function (v) { return v.toFixed(3); }).join(','); if (!seen[k]) { seen[k] = 1; pts.push(new V(x * s, y * s, z * s)); } }
      [[0, 1, 3 * phi], [1, 2 + phi, 2 * phi], [phi, 2, 2 * phi + 1]].forEach(function (b) {
        var perms = [[b[0], b[1], b[2]], [b[1], b[2], b[0]], [b[2], b[0], b[1]]];
        perms.forEach(function (p) { [-1, 1].forEach(function (a) { [-1, 1].forEach(function (b2) { [-1, 1].forEach(function (c) { add(p[0] * a, p[1] * b2, p[2] * c); }); }); }); });
      });
      pts.forEach(function (p) { m.atom(p.x, p.y, p.z, 'c'); });
      for (var i = 0; i < pts.length; i++) for (var j = i + 1; j < pts.length; j++) if (Math.abs(pts[i].distanceTo(pts[j]) - 2 * s) < .03) m.bond(i, j);
      m.note(0, 'Carbon atom', 'Sixty carbon atoms close into a hollow sphere of pentagons and hexagons.');
      m.note(30, 'Hexagon and pentagon', 'Hexagons give stability, pentagons give curvature. Fullerenes are studied for drug delivery.');
      return m;
    }
  };
  var NAMES = Object.keys(BUILD);

  /* ---------------- stage ---------------- */
  function colorFor(cs, k, def) { var v = cs.getPropertyValue(k).trim(); return v || def; }

  function mountStage(fig) {
    var d = fig.dataset, canvas = fig.querySelector('canvas'), wrap = fig.querySelector('.mol-wrap'), plate = fig.querySelector('.mol-plate');
    var cycle = (d.cycle || d.mol || 'segment').split(',').map(function (s) { return s.trim(); }).filter(function (s) { return BUILD[s]; });
    if (!cycle.length) cycle = ['segment'];
    var holdMs = parseFloat(d.hold || '9000'), showNotes = d.notes !== 'false';

    var api = { cur: cycle[0], show: function () {}, stage: fig };
    fig.__mol = api;
    function noGL() { fig.classList.add('no3d'); }
    if (!T) { noGL(); return; }
    var renderer;
    try { renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); } catch (e) { noGL(); return; }
    canvas.addEventListener('webglcontextlost', noGL);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputEncoding = T.sRGBEncoding;
    var scene = new T.Scene(), camera = new T.PerspectiveCamera(30, 1, .1, 200);
    scene.add(new T.HemisphereLight(0xffffff, 0x8aa898, .85));
    var key = new T.DirectionalLight(0xffffff, .9); key.position.set(8, 10, 12); scene.add(key);
    var rim = new T.DirectionalLight(0xdff0e6, .5); rim.position.set(-10, -2, -8); scene.add(rim);
    var root = new T.Group(); scene.add(root); var group = new T.Group(); root.add(group);

    var mats = {};
    function mat(k) { if (!mats[k]) mats[k] = k === 'bond' ? new T.MeshStandardMaterial({ roughness: .5, metalness: 0 }) : new T.MeshPhysicalMaterial({ roughness: .28, metalness: 0, clearcoat: 1, clearcoatRoughness: .18 }); return mats[k]; }
    function colors() {
      var cs = getComputedStyle(document.documentElement), def = { c: '#2c5a47', o: '#b7d3c4', n: '#143327', h: '#fbfcfa', si: '#6a9a84', bond: '#c9d6ce' };
      Object.keys(def).forEach(function (k) { var v = colorFor(cs, '--atom-' + k, def[k]); if (k === 'bond') v = colorFor(cs, '--bond', def.bond); mat(k).color.set(v).convertSRGBToLinear(); });
    }
    colors();
    var RAD = { c: .6, o: .55, n: .57, h: .3, si: .82 };
    var sphere = new T.SphereGeometry(1, 40, 28), cyl = new T.CylinderGeometry(1, 1, 1, 18);
    var up = new V(0, 1, 0);

    var cur = null, curName = null, units = {}, phase = 'idle', g = 0, pending = null, fit = 1, selected = -1, hot = [];

    function perp(dir) { var ax = Math.abs(dir.y) < .9 ? up : new V(1, 0, 0); return new V().crossVectors(ax, dir).normalize(); }
    function build(name, keepUnits) {
      var n = units[name], mol = BUILD[name](n);
      if (mol.units && units[name] === undefined) units[name] = mol.units.n;
      // centre
      var box = new T.Box3(), c;
      mol.atoms.forEach(function (a) { box.expandByPoint(a.p); }); c = box.getCenter(new V());
      mol.atoms.forEach(function (a) { a.p.sub(c); });
      var rad = 0; mol.atoms.forEach(function (a) { rad = Math.max(rad, a.p.length() + (RAD[a.t] || .5)); });
      fit = Math.min(2.4, 9.3 / rad);
      // meshes
      while (group.children.length) group.remove(group.children[0]);
      var meshes = [], N = mol.atoms.length;
      mol.atoms.forEach(function (a, i) {
        var m = new T.Mesh(sphere, mat(a.t)); var r = RAD[a.t] || .5; m.position.copy(a.p); m.scale.setScalar(.001); m.userData = { s: r, d: i / N }; group.add(m); meshes.push(m); a.mesh = m;
      });
      mol.bonds.forEach(function (b) {
        var A = mol.atoms[b.a], B = mol.atoms[b.b], dv = new V().subVectors(B.p, A.p), len = dv.length(), dn = dv.clone().normalize(), delay = Math.max(A.mesh.userData.d, B.mesh.userData.d) + .02;
        function stick(off, rad, from, to) {
          var l = to - from, m = new T.Mesh(cyl, mat('bond')); m.position.copy(A.p).add(dn.clone().multiplyScalar((from + to) / 2)).add(off); m.quaternion.setFromUnitVectors(up, dn); m.userData = { sx: rad, sy: l, d: delay, bond: true }; m.scale.set(.001, .001, .001); group.add(m); meshes.push(m);
        }
        if (b.o === 'h') { var dash = .26, gap = .2, p = RAD[A.t] * .8; while (p + dash < len - RAD[B.t] * .8) { stick(new V(), .06, p, p + dash); p += dash + gap; } }
        else if (b.o === 2) { var o = perp(dn).multiplyScalar(.17); stick(o, .075, 0, len); stick(o.clone().negate(), .075, 0, len); }
        else stick(new V(), .09, 0, len);
      });
      group.rotation.set(.25, -.35, .35);
      cur = mol; curName = name; api.cur = name; api.mol = mol; g = 0; phase = 'in';
      buildHot(); updatePlate();
    }

    /* hotspots (hexagon markers) */
    function buildHot() {
      hot.forEach(function (h) { h.el.remove(); }); hot = []; selected = -1;
      if (!showNotes || !wrap) return;
      var layer = wrap.querySelector('.mol-hot'); if (!layer) { layer = document.createElement('div'); layer.className = 'mol-hot'; wrap.appendChild(layer); }
      cur.notes.forEach(function (n, i) {
        if (n.atom === undefined || n.atom < 0) return;
        var b = document.createElement('button'); b.type = 'button'; b.className = 'hex-hot'; b.setAttribute('aria-label', n.title + ': show note'); b.innerHTML = '<i></i>';
        b.addEventListener('click', function () { select(i); });
        b.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches) select(i); });
        layer.appendChild(b); hot.push({ el: b, atom: cur.atoms[n.atom], i: i });
      });
    }
    function select(i) {
      selected = i; hot.forEach(function (h) { h.el.classList.toggle('on', h.i === i); });
      if (plate) { var nt = cur.notes[i], el = plate.querySelector('.mol-note'); if (el) { el.innerHTML = '<b></b><span></span>'; el.firstChild.textContent = nt.title; el.lastChild.textContent = nt.text; el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); } }
    }
    function updatePlate() {
      if (!plate) return;
      var nm = plate.querySelector('.mol-name'), rl = plate.querySelector('.mol-role'), nt = plate.querySelector('.mol-note'), un = plate.querySelector('.mol-units'), tabs = plate.querySelector('.mol-tabs');
      if (nm) nm.textContent = cur.name; if (rl) rl.textContent = cur.role;
      if (nt) { nt.classList.remove('swap'); nt.innerHTML = showNotes ? '<b>Tap a hexagon</b><span>Each marker on the molecule explains one part of the structure.</span>' : ''; }
      if (un) { un.hidden = !cur.units; if (cur.units) { un.querySelector('.n').textContent = 'n = ' + units[curName]; } }
      if (tabs) [].forEach.call(tabs.children, function (t) { t.classList.toggle('on', t.dataset.m === curName); t.setAttribute('aria-pressed', t.dataset.m === curName); });
    }
    function show(name, opts) {
      if (!BUILD[name]) return; if (name === curName && !(opts && opts.force)) return;
      if (!cur || reduce) { build(name); return; }
      pending = name; phase = 'out';
    }
    api.show = function (n) { clearInterval(timer); show(n); };
    // units
    if (plate) {
      var un = plate.querySelector('.mol-units');
      if (un) un.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b || !cur.units) return; var dlt = b.dataset.d === '+' ? 1 : -1, u = cur.units; units[curName] = Math.max(u.min, Math.min(u.max, units[curName] + dlt)); clearInterval(timer); build(curName, true); });
      var tabs = plate.querySelector('.mol-tabs');
      if (tabs && cycle.length > 1 && d.tabs !== 'false') { cycle.forEach(function (c) { var b = document.createElement('button'); b.type = 'button'; b.className = 'hex-tab'; b.dataset.m = c; b.setAttribute('aria-label', BUILD[c]().name); b.title = BUILD[c]().name; b.addEventListener('click', function () { clearInterval(timer); show(c); }); tabs.appendChild(b); }); }
      else if (tabs) tabs.hidden = true;
    }

    /* size */
    function size() {
      var w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); camera.aspect = w / h; var a = Math.min(1, w / h);
      camera.position.set(0, 0, 8.8 / a / Math.tan(15 * Math.PI / 180) * 1.05); camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', size); if (window.ResizeObserver) new ResizeObserver(size).observe(canvas); size();

    /* drag to rotate */
    var drag = false, lx = 0, ly = 0, vy = 0, vx = 0, base = reduce ? 0 : .0022, clock = 0, vis = true;
    canvas.addEventListener('pointerdown', function (e) { drag = true; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointermove', function (e) { if (!drag) return; var dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; group.rotation.y += dx * .007; group.rotation.x += dy * .007; vy = dx * .0005; vx = dy * .0005; });
    ['pointerup', 'pointercancel'].forEach(function (n) { canvas.addEventListener(n, function () { drag = false; }); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(canvas);

    function ease(t) { var c1 = 1.5, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
    var proj = new V(), last = performance.now();
    function loop(now) {
      requestAnimationFrame(loop);
      var dt = Math.min(.05, (now - last) / 1000); last = now;
      if (!vis || document.hidden || !cur) return;
      clock += dt;
      if (phase === 'in') { g = Math.min(1, g + dt / (reduce ? .05 : (cur.atoms.length > 90 ? 2.2 : 1.7))); if (g >= 1) phase = 'idle'; }
      else if (phase === 'out') { g = Math.max(0, g - dt / .45); if (g <= 0) { var nm = pending; pending = null; build(nm); } }
      // scale meshes according to progress
      var children = group.children, k, ch, u, s;
      for (k = 0; k < children.length; k++) {
        ch = children[k]; u = Math.max(0, Math.min(1, (g - ch.userData.d * .62) / .38)); s = phase === 'out' ? u : ease(u);
        if (ch.userData.bond) ch.scale.set(ch.userData.sx * s, ch.userData.sy * (phase === 'out' ? u : Math.min(1, u * 1.15)), ch.userData.sx * s); else ch.scale.setScalar(ch.userData.s * Math.max(.001, s));
      }
      root.scale.setScalar(fit * (.9 + .1 * Math.min(1, g * 2)));
      if (!drag) { vy += (base - vy) * .02; vx *= .95; group.rotation.y += vy; group.rotation.x += vx; }
      if (!reduce) { root.position.y = Math.sin(clock * .9) * .18; }
      renderer.render(scene, camera);
      // hotspots follow atoms
      if (hot.length) {
        var cw = canvas.clientWidth, chh = canvas.clientHeight, ready = phase === 'idle' || g > .9;
        for (k = 0; k < hot.length; k++) { var h = hot[k]; h.atom.mesh.getWorldPosition(proj); proj.project(camera); h.el.style.transform = 'translate(' + ((proj.x * .5 + .5) * cw).toFixed(1) + 'px,' + ((-proj.y * .5 + .5) * chh).toFixed(1) + 'px)'; h.el.style.opacity = ready ? (proj.z < .995 ? 1 : 0) : 0; h.el.style.pointerEvents = ready ? 'auto' : 'none'; }
      }
    }
    var timer;
    build(cycle[0]);
    requestAnimationFrame(loop);
    if (cycle.length > 1 && !reduce && d.auto !== 'false') {
      var ci = 0; timer = setInterval(function () { if (document.hidden || !vis || drag) return; ci = (ci + 1) % cycle.length; show(cycle[ci]); }, holdMs);
    }
  }

  stages.forEach(mountStage);

  /* ---------------- hexagon service map (services page) ---------------- */
  [].forEach.call(document.querySelectorAll('[data-hexmap]'), function (box) {
    var items = [].slice.call(box.querySelectorAll('.hx[data-mol]')), card = box.querySelector('.hx-card'), fig = document.querySelector(box.dataset.stage || '[data-mol-stage]');
    if (!items.length || !card) return;
    var cur = 0, timer, touched = false;
    function pick(i, user) {
      cur = i; items.forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
      var d = items[i].dataset;
      card.querySelector('.hx-title').textContent = d.title; card.querySelector('.hx-sub').textContent = d.sub; card.querySelector('.hx-meta').textContent = d.metaphor;
      var ul = card.querySelector('.hx-points'); ul.innerHTML = ''; d.points.split('|').forEach(function (p) { var li = document.createElement('li'); li.textContent = p; ul.appendChild(li); });
      card.querySelector('.hx-link').href = d.href; card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap');
      if (fig && fig.__mol) fig.__mol.show(d.mol);
      if (user) { touched = true; clearInterval(timer); }
    }
    items.forEach(function (b, i) { b.addEventListener('click', function () { pick(i, true); }); b.addEventListener('mouseenter', function () { if (matchMedia('(hover:hover)').matches && i !== cur) pick(i, true); }); b.addEventListener('focus', function () { if (i !== cur) pick(i, true); }); });
    pick(0, false);
    if (!reduce) timer = setInterval(function () { if (!document.hidden && !touched) pick((cur + 1) % items.length, false); }, 9000);
  });

  /* ---------------- scroll chain (grows along the nav as you read) ---------------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var tick = false;
    function prog() { var h = document.documentElement.scrollHeight - innerHeight; nav.style.setProperty('--p', (h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0).toFixed(4)); tick = false; }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(prog); } }, { passive: true }); prog();
  }

  /* ---------------- gentle tilt on explore cards ---------------- */
  if (!reduce && window.matchMedia('(hover:hover)').matches) {
    [].forEach.call(document.querySelectorAll('.explore-card'), function (c) {
      c.addEventListener('pointermove', function (e) { var r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; c.style.setProperty('--ry', ((px - .5) * 7).toFixed(2) + 'deg'); c.style.setProperty('--rx', ((.5 - py) * 5).toFixed(2) + 'deg'); c.classList.add('live'); });
      c.addEventListener('pointerleave', function () { c.classList.remove('live'); c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
    });
  }
})();
