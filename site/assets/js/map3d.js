/* Stylised 3D site plan of STP ITS (three.js). Layout traced from Google Earth – schematic, not survey-accurate. */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/CSS2DRenderer.js';
import { LAYOUT } from './layout.js';
export { LAYOUT };

export const STATUS_COLOR = { issue: 0xe8833a, active: 0x0067ac, mature: 0x2e9e6b, plan: 0x7fa6c9 };
const ROOF_TINT = { issue: 0xf7cfae, active: 0xa9d0f0, mature: 0xa6dcc1, plan: 0xdbe9f7 };
const HOME = { target: new THREE.Vector3(...LAYOUT.view.target), pos: new THREE.Vector3(...LAYOUT.view.pos) };

function seeded(s) { return () => (s = (s * 16807) % 2147483647) / 2147483647; }

export function createMap(container, { onSelect, labelFor }) {
  const W = () => container.clientWidth, H = () => container.clientHeight;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H(), false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.width = '100%'; renderer.domElement.style.height = '100%';
  container.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(W(), H());
  labelRenderer.domElement.className = 'label-layer';
  container.appendChild(labelRenderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, W() / H(), 1, 2000);
  camera.position.set(-150, 12, -132);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.maxPolarAngle = 1.3; controls.minDistance = 50; controls.maxDistance = 520;
  controls.target.set(-80, 4, -62);
  controls.autoRotateSpeed = 0.3;

  scene.add(new THREE.HemisphereLight(0xffffff, 0xdbe7f3, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(-90, 160, 80); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -150, right: 150, top: 130, bottom: -130, near: 10, far: 450 });
  sun.shadow.bias = -0.0004;
  scene.add(sun);

  const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.9, ...o });
  const M = {
    ground: std(0xf6f9fd, { roughness: 1 }), zone: std(0xe9f2fb, { roughness: 1 }), green: std(0xe6f1e9, { roughness: 1 }),
    road: std(0xdde7f1, { roughness: 1, side: THREE.DoubleSide }), water: std(0xd9eaf8, { roughness: 0.4 }),
    body: std(0xffffff, { roughness: 0.85 }), ctx: std(0xf3f6fa), house: std(0xf1ece8),
    tile: std(0xe9bfa6), red: std(0xcf9a8e), ctxRoof: std(0xe4ebf3),
    glass: std(0x8fc0ea, { roughness: 0.15, metalness: 0.3, transparent: true, opacity: 0.92 }),
    glassDark: std(0x6f9cc8, { roughness: 0.2, metalness: 0.35 }),
    asphalt: std(0x4d5d72, { roughness: 0.8, side: THREE.DoubleSide }), kerb: std(0xffffff, { roughness: 1, side: THREE.DoubleSide }),
    tree: std(0xc4e0d2, { roughness: 1 }), solar: std(0x1f4f86, { roughness: 0.3, metalness: 0.4 }),
    wing: std(0xf2f4f7, { roughness: 0.8 }), win: std(0x2a3f57, { roughness: 0.5 }),
    ghost: std(0xdbe9f7, { transparent: true, opacity: 0.35, depthWrite: false }),
  };
  const edgeKey = new THREE.LineBasicMaterial({ color: 0x0067ac, transparent: true, opacity: 0.85 });
  const edgeCtx = new THREE.LineBasicMaterial({ color: 0xb3c6d9, transparent: true, opacity: 0.6 });
  const edgeGhost = new THREE.LineDashedMaterial({ color: 0x0067ac, dashSize: 1.2, gapSize: 0.8 });

  const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  const withEdges = (mesh, mat) => { const e = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), mat); mesh.add(e); return e; };
  const flat = (o, mat, y) => { const m = box(o.w, 0.12, o.d, mat); m.position.set(o.x, y, o.z); m.rotation.y = o.ry || 0; m.receiveShadow = true; scene.add(m); return m; };
  const ribbon = (crv, width, mat, y) => {
    const N = 360, pos = [], idx = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, p = crv.getPointAt(t), tan = crv.getTangentAt(t);
      const n = new THREE.Vector3(-tan.z, 0, tan.x).normalize().multiplyScalar(width / 2);
      pos.push(p.x + n.x, y, p.z + n.z, p.x - n.x, y, p.z - n.z);
      if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat); m.receiveShadow = true; return m;
  };
  const circle = (x, z, r) => new THREE.CatmullRomCurve3(new THREE.EllipseCurve(x, z, r, r).getSpacedPoints(64).slice(0, -1).map(p => new THREE.Vector3(p.x, 0, p.y)), true);

  /* ---------- ground ---------- */
  const G = LAYOUT.ground;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(G.w, G.d), M.ground);
  ground.rotation.x = -Math.PI / 2; ground.position.set(G.x, 0, G.z); ground.receiveShadow = true; scene.add(ground);
  const grid = new THREE.GridHelper(240, 48, 0xc8dbee, 0xe2edf7);
  grid.position.set(G.x, 0.02, G.z); grid.material.transparent = true; grid.material.opacity = 0.8; scene.add(grid);
  LAYOUT.green.forEach(o => flat(o, M.green, 0.04));
  LAYOUT.water.forEach(o => flat(o, M.water, 0.07));
  const Z = LAYOUT.stpZone;
  const zone = new THREE.Mesh(new THREE.PlaneGeometry(Z.x1 - Z.x0, Z.z1 - Z.z0), M.zone);
  zone.rotation.x = -Math.PI / 2; zone.position.set((Z.x0 + Z.x1) / 2, 0.05, (Z.z0 + Z.z1) / 2); zone.receiveShadow = true; scene.add(zone);
  const zl = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints([[Z.x0, Z.z0], [Z.x1, Z.z0], [Z.x1, Z.z1], [Z.x0, Z.z1]].map(([x, z]) => new THREE.Vector3(x, 0.3, z))),
    new THREE.LineDashedMaterial({ color: 0x0067ac, dashSize: 2.2, gapSize: 1.4 }));
  zl.computeLineDistances(); scene.add(zl);

  /* ---------- roads ---------- */
  LAYOUT.roads.forEach(r => flat(r, M.road, 0.1));
  for (const a of LAYOUT.arcs) {
    const pts = []; for (let i = 0; i <= 60; i++) { const t = a.a0 + (a.a1 - a.a0) * i / 60; pts.push(new THREE.Vector3(a.x + a.r * Math.cos(t), 0, a.z + a.r * Math.sin(t))); }
    scene.add(ribbon(new THREE.CatmullRomCurve3(pts, false), a.w, M.road, 0.11));
  }
  for (const rb of LAYOUT.roundabouts) {
    scene.add(ribbon(circle(rb.x, rb.z, rb.r), 2.6, M.road, 0.12));
    if (rb.plaza) { const d = new THREE.Mesh(new THREE.CircleGeometry(rb.r - 1.4, 40), std(0xeef3f8)); d.rotation.x = -Math.PI / 2; d.position.set(rb.x, 0.13, rb.z); scene.add(d); }
  }

  /* ---------- circuit ---------- */
  const curve = new THREE.CatmullRomCurve3(LAYOUT.track.map(([x, z]) => new THREE.Vector3(x, 0.2, z)), true, 'catmullrom', 0.5);
  const circuitGroup = new THREE.Group(); scene.add(circuitGroup);
  circuitGroup.add(ribbon(curve, 4.6, M.kerb, 0.16), ribbon(curve, 3.6, M.asphalt, 0.2));
  const centre = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getSpacedPoints(300).map(p => p.setY(0.26))), new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 1, gapSize: 1 }));
  centre.computeLineDistances(); circuitGroup.add(centre);
  const L = LAYOUT.loop; circuitGroup.add(ribbon(circle(L.x, L.z, L.r), 3.2, M.asphalt, 0.2));
  const circuitStatus = ribbon(curve, 5.6, new THREE.MeshBasicMaterial({ color: STATUS_COLOR.issue, transparent: true, opacity: 0.35, depthWrite: false, side: THREE.DoubleSide }), 0.12);
  circuitGroup.add(circuitStatus);

  /* ---------- arc garden & STP gate ---------- */
  const GD = LAYOUT.garden;
  const inGarden = (x, z) => { const dx = x - GD.x, dz = z - GD.z, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx); return r < GD.radii[0] + 2 && a > GD.a0 && a < GD.a1; };
  {
    const sh = new THREE.Shape(); sh.moveTo(GD.x, GD.z);
    for (let i = 0; i <= 48; i++) { const a = GD.a0 + (GD.a1 - GD.a0) * i / 48; sh.lineTo(GD.x + GD.radii[0] * Math.cos(a), GD.z + GD.radii[0] * Math.sin(a)); }
    const g = new THREE.ShapeGeometry(sh); g.rotateX(Math.PI / 2);
    const lawn = new THREE.Mesh(g, std(0xd8ecdf, { roughness: 1, side: THREE.DoubleSide })); lawn.position.y = 0.09; lawn.receiveShadow = true; scene.add(lawn);
    const arcPts = r => { const p = []; for (let i = 0; i <= 48; i++) { const a = GD.a0 + (GD.a1 - GD.a0) * i / 48; p.push(new THREE.Vector3(GD.x + r * Math.cos(a), 0, GD.z + r * Math.sin(a))); } return new THREE.CatmullRomCurve3(p, false); };
    GD.radii.forEach(r => scene.add(ribbon(arcPts(r), 1.6, M.road, 0.14)));
    // tree rows between the arc paths
    const tg = new THREE.SphereGeometry(1, 10, 8);
    [(GD.radii[0] + GD.radii[1]) / 2, (GD.radii[1] + GD.radii[2]) / 2].forEach(r => {
      const n = Math.round(r * 1.2); for (let i = 0; i <= n; i++) {
        const a = GD.a0 + 0.08 + (GD.a1 - GD.a0 - 0.16) * i / n; const t = new THREE.Mesh(tg, M.tree);
        t.position.set(GD.x + r * Math.cos(a), 1.3, GD.z + r * Math.sin(a)); t.scale.set(1.3, 1.5, 1.3); t.castShadow = true; scene.add(t);
      } });
    const mon = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.6, 2.2, 24), M.body); mon.position.set(GD.x, 1.1, GD.z); withEdges(mon, edgeKey); scene.add(mon);
  }
  const GT = LAYOUT.gate;
  {
    const g = new THREE.Group(); g.position.set(GT.x, 0, GT.z); g.rotation.y = GT.ry;
    for (const s of [-1, 1]) { const p = box(1.4, 6, 1.4, M.body); p.position.set(s * GT.span / 2, 3, 0); withEdges(p, edgeKey); p.castShadow = true; g.add(p); }
    const beam = box(GT.span + 2, 1.4, 1.6, std(0x0067ac, { roughness: 0.5 })); beam.position.y = 6.4; beam.castShadow = true; g.add(beam);
    scene.add(g);
  }

  /* ---------- context ---------- */
  const rnd = seeded(11);
  const keyRects = LAYOUT.key.flatMap(k => (k.parts || []).concat(k.rcTower ? [{ x: k.rcTower.x, z: k.rcTower.z, w: 28, d: 26 }] : []))
    .concat(LAYOUT.key.filter(k => k.solar).map(k => ({ x: k.solar.x, z: k.solar.z, w: k.solar.cols * 3.6, d: k.solar.rows * 2.8 })));
  const inRect = (r, x, z, pad) => { const c = Math.cos(-(r.ry || 0)), s = Math.sin(-(r.ry || 0)); const dx = x - r.x, dz = z - r.z; const lx = dx * c - dz * s, lz = dx * s + dz * c; return Math.abs(lx) < r.w / 2 + pad && Math.abs(lz) < r.d / 2 + pad; };
  const occupied = (x, z, pad = 4) => keyRects.some(p => inRect(p, x, z, pad)) || LAYOUT.context.some(p => inRect(p, x, z, pad)) ||
    LAYOUT.roads.some(r => inRect(r, x, z, 2)) || LAYOUT.water.some(r => inRect(r, x, z, 0)) ||
    LAYOUT.track.some(([tx, tz]) => Math.hypot(tx - x, tz - z) < 8) ||
    LAYOUT.arcs.some(a => Math.abs(Math.hypot(x - a.x, z - a.z) - a.r) < 3.5) ||
    LAYOUT.roundabouts.some(r => Math.hypot(x - r.x, z - r.z) < r.r + 3);
  for (const c of LAYOUT.context) {
    const b = box(c.w, c.h, c.d, M.ctx); b.position.set(c.x, c.h / 2, c.z); b.rotation.y = c.ry || 0; b.castShadow = b.receiveShadow = true;
    if (c.roof) { // pitched roof: triangular prism
      const sh = new THREE.Shape(); sh.moveTo(-c.d / 2 - 0.4, 0); sh.lineTo(c.d / 2 + 0.4, 0); sh.lineTo(0, Math.min(3, c.d * 0.35)); sh.lineTo(-c.d / 2 - 0.4, 0);
      const geo = new THREE.ExtrudeGeometry(sh, { depth: c.w + 0.6, bevelEnabled: false }); geo.translate(0, 0, -(c.w + 0.6) / 2);
      const roof = new THREE.Mesh(geo, c.roof === 'tile' ? M.tile : M.red); roof.rotation.y = Math.PI / 2; roof.position.y = c.h / 2; roof.castShadow = true; b.add(roof);
    } else { const roof = box(c.w + 0.5, 0.5, c.d + 0.5, M.ctxRoof); roof.position.y = c.h / 2 + 0.25; b.add(roof); }
    withEdges(b, edgeCtx); scene.add(b);
  }
  const dm = new THREE.Object3D();
  const RES = LAYOUT.residential; const houses = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), M.house, 700); let hi = 0;
  const rayaZ = x => { const r = LAYOUT.roads.find(q => q.main); return r.z - (x - r.x) * Math.tan(r.ry); };
  const inRes = (x, z, pad = 0) => RES.some(R => x > R.x0 - pad && x < R.x1 + pad && (R.raya ? z < rayaZ(x) - 4 + pad && z > rayaZ(x) - 22 : z > R.z0 - pad && z < R.z1 + pad));
  for (const R of RES) for (let i = 0; i < 900 && hi < 700; i++) {
    const x = R.x0 + rnd() * (R.x1 - R.x0); let z = R.z0 + rnd() * (R.z1 - R.z0);
    if (R.raya) z = rayaZ(x) - 5 - rnd() * 16;
    if (!R.raya && LAYOUT.track.some(([tx, tz]) => Math.hypot(tx - x, tz - z) < 9)) continue;
    const w = 2.2 + rnd() * 2.5, d = 2.2 + rnd() * 2.5, h = 1.5 + rnd() * 2.2;
    dm.position.set(x, h / 2, z); dm.scale.set(w, h, d); dm.rotation.y = R.raya ? 0.24 : (rnd() - 0.5) * 0.2; dm.updateMatrix(); houses.setMatrixAt(hi++, dm.matrix);
  }
  houses.count = hi; houses.castShadow = true; houses.receiveShadow = true; scene.add(houses);
  const trees = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 10, 8), M.tree, 280); let ti = 0;
  for (let i = 0; i < 2500 && ti < 280; i++) {
    const x = G.x - G.w / 2 + 3 + rnd() * (G.w - 6), z = G.z - G.d / 2 + 3 + rnd() * (G.d - 6);
    if (occupied(x, z, 3) || inRes(x, z, 2) || inGarden(x, z)) continue;
    const inGreen = LAYOUT.green.some(g => inRect(g, x, z, 0));
    if (!inGreen && rnd() > 0.5) continue;
    const s = 0.9 + rnd() * 1.2; dm.position.set(x, s, z); dm.scale.set(s, s * 1.1, s); dm.rotation.set(0, 0, 0); dm.updateMatrix(); trees.setMatrixAt(ti++, dm.matrix);
  }
  trees.count = ti; trees.castShadow = true; scene.add(trees);

  /* ---------- Research Center tower (DIKST · TTO · GRIT): two wings with outward-rising sloped tops ---------- */
  function buildRC(x, z, picks) {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = 0.45; g.scale.setScalar(0.7);
    const roofs = [];
    const podium = box(28, 3, 20, M.body); podium.position.y = 1.5; withEdges(podium, edgeKey); g.add(podium);
    const pr = box(28.4, 0.4, 20.4, std(0xffffff)); pr.position.y = 3.2; g.add(pr); roofs.push(pr);
    const core = box(9, 27, 10, M.glassDark); core.position.y = 3 + 13.5; g.add(core); withEdges(core, edgeKey);
    for (let y = 2; y < 27; y += 2.4) { const band = box(9.15, 0.35, 10.15, M.wing); band.position.y = y - 13.5; core.add(band); }
    for (const xx of [-2.2, 0, 2.2]) { const mul = box(0.25, 27, 10.15, M.wing); mul.position.x = xx; core.add(mul); }
    for (const s of [-1, 1]) {
      const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(7 * s, 0); sh.lineTo(7 * s, 42); sh.lineTo(0, 31); sh.lineTo(0, 0);
      const geo = new THREE.ExtrudeGeometry(sh, { depth: 12, bevelEnabled: false }); geo.translate(0, 0, -6);
      const wing = new THREE.Mesh(geo, M.wing); wing.position.set(4.5 * s, 3, 0); wing.castShadow = wing.receiveShadow = true;
      withEdges(wing, edgeKey); g.add(wing); picks.push(wing);
      for (let y = 9; y <= 33; y += 6) {
        for (const c of [2, 4.9]) { const w1 = box(0.8, 0.8, 0.2, M.win); w1.position.set(4.5 * s + c * s, 3 + y, 6.05); g.add(w1); }
        for (const zz of [-2.5, 2.5]) { const w2 = box(0.2, 0.8, 0.8, M.win); w2.position.set(4.5 * s + 7.05 * s, 3 + y + 2, zz); g.add(w2); }
      }
    }
    const can = box(9, 0.25, 13, std(0x9cc8ec, { transparent: true, opacity: 0.6, roughness: 0.1, metalness: 0.3 }));
    can.position.set(0, 3 + 33.5, 0); can.rotation.x = 0.5; g.add(can);
    const lat = []; for (let i = -4.5; i <= 4.5; i += 1.5) lat.push(new THREE.Vector3(i, 0.2, -6.5), new THREE.Vector3(i, 0.2, 6.5));
    for (let j = -6.5; j <= 6.5; j += 2.6) lat.push(new THREE.Vector3(-4.5, 0.2, j), new THREE.Vector3(4.5, 0.2, j));
    can.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(lat), new THREE.LineBasicMaterial({ color: 0x4f78a3 })));
    const rear = box(6, 24, 5, M.wing); rear.position.set(0, 3 + 12, -8); withEdges(rear, edgeKey); g.add(rear);
    [podium, core, rear, can].forEach(m => { m.castShadow = true; picks.push(m); });
    return { g, roofs, top: 33 };
  }

  /* ---------- key sites ---------- */
  const sites = {}; const pickables = [];
  for (const k of LAYOUT.key) {
    const grp = new THREE.Group(); scene.add(grp);
    const roofs = [], picks = []; let top = 0, cx = 0, cz = 0, n = 0;
    if (k.rcTower) { const rc = buildRC(k.rcTower.x, k.rcTower.z, picks); grp.add(rc.g); roofs.push(...rc.roofs); top = rc.top; cx = k.rcTower.x; cz = k.rcTower.z; n = 1; }
    for (const p of k.parts || []) {
      const mat = k.ghost ? M.ghost : (p.glass ? M.glass : M.body);
      const b = box(p.w, p.h, p.d, mat); b.position.set(p.x, p.h / 2, p.z); b.rotation.y = p.ry || 0; b.castShadow = !k.ghost;
      if (p.glassBand) { const gb = box(p.w * 0.86, p.h * 0.45, 0.2, M.glass); gb.position.set(0, -p.h * 0.18, p.d / 2 + 0.06); b.add(gb); }
      if (p.bands) for (const yy of [-p.h * 0.18, p.h * 0.2]) { const bd = box(p.w + 0.1, 0.5, p.d + 0.1, M.win); bd.position.y = yy; b.add(bd); } b.receiveShadow = true; picks.push(b);
      const e = withEdges(b, k.ghost ? edgeGhost : edgeKey); if (k.ghost) e.computeLineDistances();
      if (p.hangar) {
        const r = new THREE.Mesh(new THREE.CylinderGeometry(p.d / 2, p.d / 2, p.w, 24, 1, false, 0, Math.PI), std(0xffffff, { roughness: 0.8 }));
        r.rotation.set(0, 0, Math.PI / 2); r.position.y = p.h / 2; r.scale.set(0.35, 1, 1); r.castShadow = true; b.add(r); roofs.push(r); picks.push(r);
      } else if (!k.ghost) {
        const roof = box(p.w + 0.4, 0.5, p.d + 0.4, std(0xffffff, { roughness: 0.8 })); roof.position.y = p.h / 2 + 0.25; b.add(roof); roofs.push(roof); picks.push(roof);
      }
      grp.add(b); top = Math.max(top, p.h + (p.hangar ? p.d * 0.17 : 0)); cx += p.x; cz += p.z; n++;
    }
    if (k.solar) {
      const S = k.solar;
      for (let i = 0; i < S.cols; i++) for (let j = 0; j < S.rows; j++) {
        const pnl = box(3, 0.2, 2, M.solar); pnl.position.set(S.x - S.cols * 1.8 + i * 3.6 + 1.8, 1.2, S.z - S.rows * 1.4 + j * 2.8 + 1.4); pnl.rotation.x = -0.35; pnl.castShadow = true; grp.add(pnl); picks.push(pnl);
      }
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 4, 16), M.body); tank.position.set(S.x + 12, 2, S.z - 14); withEdges(tank, edgeKey); grp.add(tank);
    }
    if (k.track) { scene.remove(circuitGroup); grp.add(circuitGroup); circuitGroup.traverse(c => { if (c.isMesh) picks.push(c); }); cx = k.anchor.x; cz = k.anchor.z; n = 1; top = 1; }
    cx /= n || 1; cz /= n || 1;
    picks.forEach(m => { m.userData.id = k.id; pickables.push(m); });
    const ring = new THREE.Mesh(new THREE.RingGeometry(4, 4.8, 48), new THREE.MeshBasicMaterial({ color: STATUS_COLOR.issue, transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(cx, 0.35, cz); scene.add(ring);
    const el = document.createElement('button'); el.className = 'map-label'; el.dataset.id = k.id; el.type = 'button';
    el.innerHTML = `<i class="dot"></i><span>${labelFor(k.id)}</span>`;
    el.addEventListener('click', ev => { ev.stopPropagation(); onSelect(k.id); });
    const lab = new CSS2DObject(el); lab.position.set(cx, top + 4, cz); scene.add(lab);
    sites[k.id] = { grp, roofs, ring, lab, el, center: new THREE.Vector3(cx, Math.min(top, 20) / 2, cz), def: k };
  }

  /* ---------- GRIT → STP flow ---------- */
  const flowCurve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-38, 14, 70), new THREE.Vector3(-30, 40, 20), new THREE.Vector3(-14, 7, -30));
  const flow = new THREE.Line(new THREE.BufferGeometry().setFromPoints(flowCurve.getPoints(80)), new THREE.LineDashedMaterial({ color: 0x0067ac, dashSize: 2, gapSize: 1.5 }));
  flow.computeLineDistances(); flow.visible = false; scene.add(flow);
  const flowDot = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 10), new THREE.MeshBasicMaterial({ color: 0x0067ac })); flowDot.visible = false; scene.add(flowDot);

  const caption = (x, z) => { const d = document.createElement('div'); d.className = 'zone-caption'; const o = new CSS2DObject(d); o.position.set(x, 0.5, z); scene.add(o); return d; };
  const capSTP = caption(-20, 46), capCampus = caption(-80, 92), capRes = caption(106, -60), capRaya = caption(-110, -150), capGate = caption(-48, -22);

  /* ---------- state ---------- */
  let selected = null, paused = false;
  function applyMode(m, getStatus) {
    for (const [id, s] of Object.entries(sites)) {
      const st = getStatus(id, m), hidden = st === 'hidden';
      s.grp.visible = !hidden; s.lab.visible = !hidden; s.el.style.display = hidden ? 'none' : '';
      s.ring.visible = !hidden && st !== 'plan';
      const col = STATUS_COLOR[st] || STATUS_COLOR.active;
      s.ring.material.color.setHex(col);
      s.roofs.forEach(r => { if (!r.material.transparent) r.material.color.setHex(ROOF_TINT[st] || ROOF_TINT.active); });
      s.el.dataset.status = st;
      if (id === 'circuit') circuitStatus.material.color.setHex(col);
      if (id === 'ecodc') s.grp.traverse(o => { if (o.isMesh) { if (!o.userData.ownMat) { o.material = o.material.clone(); o.userData.ownMat = true; } o.material.transparent = st === 'plan'; o.material.opacity = st === 'plan' ? 0.35 : 1; } });
    }
    flow.visible = flowDot.visible = m !== 'now';
  }

  const start = performance.now();
  const DRIVE = { p0: new THREE.Vector3(-150, 12, -132), p1: new THREE.Vector3(-70, 14, -44), t0: new THREE.Vector3(-80, 4, -62), t1: new THREE.Vector3(-20, 3, 6) };
  let intro = true, tween = null;
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  controls.addEventListener('start', () => { controls.autoRotate = false; intro = false; tween = null; });
  function flyTo(target, dist) {
    const dir = camera.position.clone().sub(controls.target).normalize();
    if (dir.y < 0.45) { dir.y = 0.6; dir.normalize(); }
    tween = { t0: performance.now(), dur: 1100, fromPos: camera.position.clone(), fromT: controls.target.clone(), toT: target.clone(), toPos: target.clone().add(dir.multiplyScalar(dist)) };
    controls.autoRotate = false;
  }

  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2(); let down = null;
  const visiblePicks = () => pickables.filter(p => { let o = p; while (o) { if (!o.visible) return false; o = o.parent; } return true; });
  const setMouse = e => { const r = renderer.domElement.getBoundingClientRect(); mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(mouse, camera); };
  renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; });
  renderer.domElement.addEventListener('pointerup', e => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 5) return;
    setMouse(e); const hit = ray.intersectObjects(visiblePicks(), false)[0]; if (hit) onSelect(hit.object.userData.id);
  });
  renderer.domElement.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; setMouse(e); renderer.domElement.style.cursor = ray.intersectObjects(visiblePicks(), false)[0] ? 'pointer' : 'grab'; });

  const clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    if (paused) return;
    const now = performance.now(), el = clock.getElapsedTime();
    if (intro) {
      const T1 = 3400, T2 = 2600, dt = now - start;
      if (dt < T1) { const k = ease(dt / T1); camera.position.lerpVectors(DRIVE.p0, DRIVE.p1, k); controls.target.lerpVectors(DRIVE.t0, DRIVE.t1, k); }
      else { const k = ease(Math.min(1, (dt - T1) / T2)); camera.position.lerpVectors(DRIVE.p1, HOME.pos, k); controls.target.lerpVectors(DRIVE.t1, HOME.target, k); }
      camera.lookAt(controls.target);
      if (dt >= T1 + T2) intro = false;
    }
    if (tween) {
      const t = Math.min(1, (now - tween.t0) / tween.dur), k = ease(t);
      camera.position.lerpVectors(tween.fromPos, tween.toPos, k); controls.target.lerpVectors(tween.fromT, tween.toT, k);
      if (t >= 1) tween = null;
    }
    for (const [id, s] of Object.entries(sites)) {
      const st = s.el.dataset.status, pulse = st === 'issue' ? 1 + 0.25 * Math.sin(el * 3 + s.center.x) : 1;
      s.ring.scale.setScalar(pulse * (id === selected ? 1.4 : 1) * (id === 'rc' ? 1.9 : 1));
      s.ring.material.opacity = st === 'issue' ? 0.45 + 0.35 * Math.sin(el * 3) ** 2 : 0.55;
    }
    if (flow.visible) { flow.material.dashOffset -= 0.15; flowDot.position.copy(flowCurve.getPoint((el * 0.25) % 1)); }
    controls.update();
    renderer.render(scene, camera); labelRenderer.render(scene, camera);
  })();

  new ResizeObserver(() => { camera.aspect = W() / H(); camera.updateProjectionMatrix(); renderer.setSize(W(), H(), false); labelRenderer.setSize(W(), H()); }).observe(container);

  return {
    setMode: applyMode,
    setPaused(v) { paused = v; },
    select(id, fly = true) {
      selected = id;
      Object.values(sites).forEach(s => s.el.classList.toggle('is-selected', s.def.id === id));
      if (fly && sites[id]) flyTo(sites[id].center, id === 'rc' ? 140 : id === 'circuit' ? 140 : 100);
    },
    reset() { selected = null; Object.values(sites).forEach(s => s.el.classList.remove('is-selected')); flyTo(HOME.target, HOME.pos.distanceTo(HOME.target)); },
    relabel(fn, cap) {
      Object.values(sites).forEach(s => { s.el.querySelector('span').textContent = fn(s.def.id); });
      capSTP.textContent = cap.stp; capCampus.textContent = cap.campus; capRes.textContent = cap.res || ''; capRaya.textContent = cap.raya || ''; capGate.textContent = cap.gate || '';
    },
  };
}
