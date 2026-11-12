/* Builds site/assets/stp-its-blueprint.pdf from the running website.
   Usage (site must be running, e.g. docker compose up -d):
     cd tools && npm i puppeteer-core@23 && SITE=http://localhost:8091 node build-deck.js
   Captures live visuals into site/assets/deck/, then prints site/deck.html to PDF. */
const fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer-core');
const SITE = process.env.SITE || 'http://localhost:8091';
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = path.join(__dirname, '..', 'site', 'assets');
const DECK = path.join(OUT, 'deck');
fs.mkdirSync(DECK, { recursive: true });
const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await p.goto(SITE + '/', { waitUntil: 'networkidle0' });
  await p.addStyleTag({ content: '.float-dock,.map-ui.tl,.map-ui.tr,.map-ui.br,.mascot-tag{visibility:hidden!important}' });
  await wait(7000);
  const shot = async (sel, name, i = 0) => { const els = await p.$$(sel); if (!els[i]) throw new Error('missing ' + sel); await els[i].screenshot({ path: path.join(DECK, name), type: 'jpeg', quality: 86 }); };
  const reveal = () => p.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')));
  await reveal();
  await shot('#map', 'map-now.jpg');
  await shot('#org .org', 'org.jpg');
  // mascot render (transparent PNG)
  const png = await p.evaluate(async () => {
    const THREE = await import('three'); const { loadMascot } = await import('./assets/js/mascot.js');
    const make = await loadMascot(); const m = make(1);
    const r = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true }); r.setSize(700, 900); r.outputColorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Scene(); s.add(new THREE.HemisphereLight(0xffffff, 0xc9d8e8, 1.6)); const d = new THREE.DirectionalLight(0xffffff, 1.7); d.position.set(1.5, 3, 4); s.add(d); s.add(m);
    m.rotation.y = -0.35;
    const c = new THREE.PerspectiveCamera(28, 700 / 900, 0.1, 50); c.position.set(0, 0.56, 2.55); c.lookAt(0, 0.53, 0);
    r.render(s, c); return r.domElement.toDataURL('image/png');
  });
  fs.writeFileSync(path.join(DECK, 'cak-seno.png'), Buffer.from(png.split(',')[1], 'base64'));
  await p.click('[data-mode="d100"]'); await wait(1800); await reveal(); await wait(400);
  await shot('#map', 'map-d100.jpg');
  await p.evaluate(() => document.querySelector('#plan').scrollIntoView()); await wait(2500);
  await shot('#plan .route-wrap', 'road.jpg');
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.click('[data-mode="y2030"]'); await wait(1800); await reveal(); await wait(400);
  await shot('#map', 'map-big.jpg');
  await shot('#roadmap .road', 'roadmap.jpg');
  await shot('#future .eco', 'eco.jpg', 0);
  await shot('#future .eco', 'cleanroom.jpg', 1);
  await shot('#future .eco', 'livinglab.jpg', 2);
  // print the deck
  const d = await b.newPage();
  // serve freshly captured images (and deck.html itself) from disk, so no rebuild is needed before printing
  await d.setRequestInterception(true);
  d.on('request', r => {
    const u = new URL(r.url());
    const local = u.pathname.startsWith('/assets/deck/') || u.pathname === '/deck.html' ? path.join(__dirname, '..', 'site', u.pathname) : null;
    if (local && fs.existsSync(local)) return r.respond({ status: 200, contentType: local.endsWith('.html') ? 'text/html' : local.endsWith('.png') ? 'image/png' : 'image/jpeg', body: fs.readFileSync(local) });
    r.continue();
  });
  await d.goto(SITE + '/deck.html', { waitUntil: 'networkidle0' });
  await d.waitForFunction('window.__deckReady === true', { timeout: 60000 });
  await d.pdf({ path: path.join(OUT, 'stp-its-blueprint.pdf'), width: '1280px', height: '720px', printBackground: true, preferCSSPageSize: true });
  console.log('PDF written:', path.join(OUT, 'stp-its-blueprint.pdf'));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
