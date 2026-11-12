/* Cak Seno – ITS mascot (GLB). Shared loader + a small walker that rides on the 100-day road. */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/GLTFLoader.js';

const URL = 'assets/models/cak-seno.glb';
let pending = null;

/* Loads once; resolves to a factory that returns a normalised clone (feet at y = 0, centred, given height). */
export function loadMascot() {
  if (!pending) pending = new GLTFLoader().loadAsync(URL).then(gltf => {
    const tpl = gltf.scene;
    tpl.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; } });
    return (height = 1) => {
      const inner = tpl.clone(true);
      const box = new THREE.Box3().setFromObject(inner), size = box.getSize(new THREE.Vector3());
      const s = height / size.y;
      inner.scale.setScalar(s);
      inner.position.set(-(box.min.x + size.x / 2) * s, -box.min.y * s, -(box.min.z + size.z / 2) * s);
      const g = new THREE.Group(); g.add(inner); g.userData.height = height; return g;
    };
  });
  return pending;
}

/* Walk cycle without rigging: bob, sway and lean. t = seconds, moving = 0..1 */
export function animateWalk(g, t, moving, h) {
  const bob = Math.abs(Math.sin(t * 9)) * 0.06 * h * moving;
  const breathe = Math.sin(t * 2) * 0.008 * h * (1 - moving);
  g.position.y = (g.userData.baseY || 0) + bob + breathe;
  g.rotation.z = Math.sin(t * 9) * 0.06 * moving;
}

/* ---------- mascot walking along the 100-day road ---------- */
export function createRoadWalker() {
  const W = 92, H = 128;
  const canvas = document.createElement('canvas');
  canvas.className = 'road-mascot'; canvas.setAttribute('aria-hidden', 'true');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); } catch { return { attach() {} }; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); renderer.setSize(W, H, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0xc9d8e8, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(1.5, 3, 4); scene.add(key);
  const cam = new THREE.PerspectiveCamera(30, W / H, 0.1, 50); cam.position.set(0, 0.6, 2.4); cam.lookAt(0, 0.56, 0);
  let body = null;
  const holder = new THREE.Group(); scene.add(holder);
  loadMascot().then(make => { body = make(1.08); holder.add(body); }).catch(() => canvas.remove());

  let x = null, from = 0, to = 0, t0 = 0, dur = 0, dir = 1, visible = true, raf = 0;
  const clock = new THREE.Clock();
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) loop(); }).observe(canvas);

  function loop() {
    cancelAnimationFrame(raf);
    if (!visible || !canvas.isConnected) return;
    raf = requestAnimationFrame(loop);
    const now = performance.now(), t = clock.getElapsedTime();
    let moving = 0;
    if (dur > 0) {
      const k = Math.min(1, (now - t0) / dur), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      x = from + (to - from) * e; moving = k < 1 ? 1 : 0; if (k >= 1) dur = 0;
    }
    canvas.style.transform = `translateX(${(x ?? 0) - W / 2}px)`;
    if (body) {
      const face = moving ? dir * Math.PI / 2 : 0;
      holder.rotation.y += (face - holder.rotation.y) * 0.15;
      animateWalk(holder, t, moving, 1);
    }
    renderer.render(scene, cam);
  }

  return {
    /* place the walker inside `route` and walk to the centre of `pin` */
    attach(route, pin) {
      if (!route || !pin) return;
      if (canvas.parentNode !== route) route.appendChild(canvas);
      const rr = route.getBoundingClientRect(), pr = pin.getBoundingClientRect();
      const target = pr.left - rr.left + pr.width / 2 - 46;
      canvas.style.top = `${pr.top - rr.top + pr.height / 2 + 8 - H * 0.93}px`;
      if (x === null) { x = target; dur = 0; }
      else if (Math.abs(target - x) > 2) { from = x; to = target; dir = to > from ? 1 : -1; t0 = performance.now(); dur = Math.min(2200, 400 + Math.abs(to - from) * 2.2); }
      loop();
    },
  };
}
