import * as C from './content.js';
let roadWalker = null;
import { LAYOUT, webglAvailable } from './layout.js';

/* ---------------- state & helpers ---------------- */
const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } } };
const qsLang = new URLSearchParams(location.search).get('lang');
const S = { view: '3d', lang: (qsLang === 'id' || qsLang === 'en') ? qsLang : (store.get('stp-lang') || 'en'), mode: 'now', site: 'stp', tab: 'overview', prio: 'overview', ftab: 'qw' };
const t = o => (o == null ? '' : typeof o === 'string' ? o : (o[S.lang] ?? o.en));
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const MODE_KEY = { now: 'now', d100: 'd100', y2030: 'y2030' };
const statusOf = (id, mode) => C.SITES[id]?.status[mode] ?? 'active';
const SHORT = {
  stp: { en: 'STP ITS', id: 'STP ITS' }, circuit: { en: 'Test Circuit', id: 'Sirkuit Uji' }, auto: { en: 'Automotive & Forensic', id: 'Otomotif & Forensik' },
  ict: { en: 'ICT & Robotics (Pusat Robotika)', id: 'TIK & Robotika (Pusat Robotika)' }, creative: { en: 'Creative Center', id: 'Creative Center' }, maritime: { en: 'Maritime', id: 'Maritim' },
  labs: { en: 'Shared Halls & Labs', id: 'Hall & Lab Bersama' }, rc: { en: 'Research Center · DIKST · TTO · GRIT', id: 'Research Center · DIKST · TTO · GRIT' },
  ilbi: { en: 'ILBI (in Creative Center)', id: 'ILBI (di Creative Center)' }, ecodc: { en: 'BP1 · Eco AI Data Center', id: 'BP1 · Eco AI Data Center' }, cleanroom: { en: 'BP1 · Semiconductor Clean Room', id: 'BP1 · Clean Room Semikonduktor' }, livinglab: { en: 'BP2 · STP Living Lab', id: 'BP2 · STP Living Lab' },
};
const STATUS_TXT = { issue: { en: 'Issue', id: 'Masalah' }, active: { en: 'Operating', id: 'Beroperasi' }, mature: { en: 'Mature', id: 'Matang' }, plan: { en: 'Planned', id: 'Rencana' }, hidden: { en: 'Not started', id: 'Belum dimulai' } };

const I = {
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  alert: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>',
  route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h7"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>',
  gallery: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="m3 15 5-5 4 4 3-3 6 6"/><path d="M8 21h8"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
  arrow: '<path d="m9 6 6 6-6 6"/>',
  org: '<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>',
  pv: '<rect x="3" y="9" width="18" height="10" rx="1"/><path d="M3 14h18M9 9v10M15 9v10M12 2v3M5 4l2 2M19 4l-2 2"/>',
  cool: '<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>',
  gpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8"/><path d="M8 1v3M16 1v3M8 20v3M16 20v3M1 8h3M1 16h3M20 8h3M20 16h3"/>',
  mon: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 18 4-6"/>',
  heat: '<path d="M8 21c-2-3 2-5 0-8M12 21c-2-3 2-5 0-8M16 21c-2-3 2-5 0-8"/><path d="M5 9h14"/>',
  air: '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h15a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><circle cx="12" cy="12" r="2.2"/>',
  gown: '<circle cx="12" cy="5" r="2.5"/><path d="M8 10h8l2 11H6z"/><path d="M10 14h4"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/>',
  iot: '<circle cx="12" cy="12" r="2"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8"/>',
  car: '<path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v3H3z"/><circle cx="7.5" cy="16" r="1.5"/><circle cx="16.5" cy="16" r="1.5"/>',
  wave: '<path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M12 3v7M9 6l3-3 3 3"/>',
  leaf: '<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19 13 11"/>',
  data: '<ellipse cx="12" cy="5" rx="7" ry="2.5"/><path d="M5 5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5"/><path d="M5 11v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6"/>',
};
const icon = (k, w = 22) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const secHead = (no, title) => `<div class="sec-head"><span class="no">${no}</span><h2>${esc(title)}</h2><span class="line"></span></div>`;

/* ---------------- static text ---------------- */
function renderStatic() {
  document.documentElement.lang = S.lang;
  document.title = t(C.UI.title);
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(C.UI[el.dataset.i18n]); });
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === S.lang)));
  renderNav();
}
const navFor = m => C.NAV.filter(n => n.modes.includes(m));
function renderNav() {
  $('#nav').innerHTML = navFor(S.mode).map(n => `<a href="#${n.id}" data-sec="${n.id}" aria-label="${esc(t(n.label))}">${icon(n.icon)}<span class="tip">${esc(t(n.label))}</span></a>`).join('');
}
/* section number within the active scenario tab: 01, 02, … */
const secNo = id => String(navFor(S.mode).filter(n => n.id !== 'top').findIndex(n => n.id === id) + 1).padStart(2, '0');

/* ---------------- map / fallback ---------------- */
let map = null;
async function initMap() {
  const box = $('#map');
  if (webglAvailable()) {
    try {
      const mod = await import('./map3d.js');
      map = mod.createMap(box, { onSelect: id => selectSite(id), labelFor: id => t(SHORT[id]) });
      map.relabel(id => t(SHORT[id]), captions());
      map.setMode(S.mode, statusOf);
      return;
    } catch (e) { console.warn('3D map failed, using 2D plan', e); }
  }
  renderFallback(box, LAYOUT);
}
const captions = () => ({ stp: S.lang === 'id' ? 'KAWASAN SAINS TEKNOLOGI' : 'SCIENCE TECHNO PARK AREA', campus: S.lang === 'id' ? 'KAMPUS UTAMA ITS SUKOLILO' : 'ITS SUKOLILO MAIN CAMPUS', res: S.lang === 'id' ? 'PERMUKIMAN' : 'RESIDENTIAL AREA', raya: 'JL. RAYA ITS', gate: S.lang === 'id' ? 'GERBANG STP · TAMAN BUSUR' : 'STP GATE · ARC GARDEN' });

let fallbackOn = false;
function renderFallback(box, L) {
  fallbackOn = true;
  box.querySelector('.hint')?.remove();
  const col = { issue: '#e8833a', active: '#0067ac', mature: '#2e9e6b', plan: '#7fa6c9' };
  const parts = L.key.flatMap(k => {
    const st = statusOf(k.id, S.mode); if (st === 'hidden') return [];
    const ps = k.rcTower ? [{ x: k.rcTower.x, z: k.rcTower.z, w: 18, d: 12 }] : (k.parts || []);
    const rects = ps.map(p => `<rect class="site" data-id="${k.id}" x="${p.x - p.w / 2}" y="${p.z - p.d / 2}" width="${p.w}" height="${p.d}" fill="#fff" stroke="${col[st] || col.active}" stroke-width="${st === 'plan' ? 0.6 : 1}" ${st === 'plan' ? 'stroke-dasharray="1.5 1"' : ''}/>`);
    return rects;
  }).join('');
  const track = L.track.map(([x, z]) => `${x},${z}`).join(' ');
  const labels = L.key.filter(k => statusOf(k.id, S.mode) !== 'hidden').map(k => {
    const p = k.anchor || (k.rcTower ? { ...k.rcTower, d: 12 } : k.parts[0]); return `<text x="${p.x}" y="${p.z - (p.d || 4) / 2 - 2}" font-size="3.2" text-anchor="middle" fill="#0d2643" font-family="Barlow Condensed" font-weight="600">${esc(t(SHORT[k.id]))}</text>`;
  }).join('');
  box.querySelector('.fallback')?.remove();
  box.insertAdjacentHTML('beforeend', `<div class="fallback"><p>${esc(t(C.UI.noWebgl))}</p>
    <svg viewBox="${L.view.fallbackBox}" role="img" aria-label="STP ITS site plan">
      <rect x="${L.stpZone.x0}" y="${L.stpZone.z0}" width="${L.stpZone.x1 - L.stpZone.x0}" height="${L.stpZone.z1 - L.stpZone.z0}" fill="#e8f1fa" stroke="#0067ac" stroke-width=".4" stroke-dasharray="2 1.4"/>
      ${L.roads.map(r => `<rect x="${r.x - r.w / 2}" y="${r.z - r.d / 2}" width="${r.w}" height="${r.d}" fill="#dfe8f2" transform="rotate(${(r.ry || 0) * -57.3} ${r.x} ${r.z})"/>`).join('')}
      ${L.arcs.map(c => { const p0 = [c.x + c.r * Math.cos(c.a0), c.z + c.r * Math.sin(c.a0)], p1 = [c.x + c.r * Math.cos(c.a1), c.z + c.r * Math.sin(c.a1)]; return `<path d="M${p0[0]} ${p0[1]} A${c.r} ${c.r} 0 0 1 ${p1[0]} ${p1[1]}" fill="none" stroke="#dfe8f2" stroke-width="${c.w}"/>`; }).join('')}
      ${L.context.map(r => `<rect x="${r.x - r.w / 2}" y="${r.z - r.d / 2}" width="${r.w}" height="${r.d}" fill="${r.roof === 'tile' ? '#e9bfa6' : r.roof === 'red' ? '#cf9a8e' : '#e4ebf3'}" transform="rotate(${(r.ry || 0) * -57.3} ${r.x} ${r.z})"/>`).join('')}
      ${[L.garden].map(g => g.radii.map(r => { const p0 = [g.x + r * Math.cos(g.a0), g.z + r * Math.sin(g.a0)], p1 = [g.x + r * Math.cos(g.a1), g.z + r * Math.sin(g.a1)]; return `<path d="M${p0[0]} ${p0[1]} A${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}" fill="none" stroke="#9fd0b4" stroke-width="1.6"/>`; }).join('')).join('')}
      ${L.water.map(r => `<rect x="${r.x - r.w / 2}" y="${r.z - r.d / 2}" width="${r.w}" height="${r.d}" fill="#cfe3f5"/>`).join('')}
      <polygon class="site" data-id="circuit" points="${track}" fill="none" stroke="#4d5d72" stroke-width="3.4" stroke-linejoin="round"/>
      ${parts}${labels}</svg></div>`);
  box.querySelectorAll('.fallback .site').forEach(el => el.addEventListener('click', () => selectSite(el.dataset.id)));
}

/* ---------------- 2D map tab ---------------- */
let map2d = null;
async function setView(v) {
  S.view = v;
  document.querySelectorAll('#viewSeg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
  const frame = $('#map'), el = $('#map2d'), gif = $('#mapgif');
  frame.classList.toggle('is-2d', v !== '3d'); el.hidden = v !== '2d'; gif.hidden = v !== 'gif';
  const vid = gif.querySelector('video');
  if (v === 'gif') { if (!vid.getAttribute('src')) vid.src = vid.dataset.src; vid.play().catch(() => {}); } else vid.pause();
  if (map) map.setPaused?.(v !== '3d');
  if (v === '2d') {
    if (!map2d) {
      try {
        const mod = await import('./map2d.js');
        map2d = await mod.createMap2D(el, { onSelect: id => selectSite(id, false), labelText: o => t(o), layerNames: () => ({ sat: t(C.UI.layerSat), street: t(C.UI.layerStreet) }) });
      } catch (e) { console.warn('2D map failed', e); el.innerHTML = `<p class="fallback-msg">${S.lang === 'id' ? 'Peta 2D gagal dimuat (periksa koneksi internet).' : '2D map could not load (check the internet connection).'}</p>`; }
    }
    map2d?.show();
  }
}

/* ---------------- panel ---------------- */
const MODE_LBL = { now: 'modeNow', d100: 'modeD100', y2030: 'mode2030' };
function renderPanel() {
  const s = C.SITES[S.site];
  const st = statusOf(S.site, S.mode);
  const body = S.tab === 'overview' ? s.overview : s[S.mode];
  // the panel only ever shows the active scenario – no future text leaks into “Now”
  $('#tabs').innerHTML = [['overview', C.UI.tabOverview], ['scene', C.UI[MODE_LBL[S.mode]]]].map(([id, lbl]) =>
    `<button role="tab" type="button" data-tab="${id}" aria-selected="${S.tab === id}">${esc(t(lbl))}</button>`).join('');
  const linked = S.mode === 'd100' ? C.PRIORITIES.filter(p => p.site === S.site) : [];
  $('#panel').innerHTML = `
    <div class="kind">${esc(t(s.kind))}</div>
    <h2>${esc(t(s.name))}</h2>
    <span class="status-pill" data-s="${st}">● ${esc(t(STATUS_TXT[st]))} · ${esc(t(C.UI[MODE_LBL[S.mode]]))}</span>
    <p>${esc(t(body))}</p>
    ${S.tab === 'overview' && s.facts ? `<ul class="facts">${s.facts.map(f => `<li>${esc(t(f))}</li>`).join('')}</ul>` : ''}
    ${linked.length ? `<p class="linked">${S.lang === 'id' ? 'Terkait prioritas' : 'Linked priority'}: ${linked.map(p => `<b>${p.id}</b> ${esc(t(p.t))}`).join(' · ')}</p>` : ''}
    <div class="site-pick">${Object.keys(C.SITES).filter(id => statusOf(id, S.mode) !== 'hidden').map(id => `<button type="button" data-site="${id}">${esc(t(SHORT[id]))}</button>`).join('')}</div>`;
  $('#panel').querySelectorAll('[data-site]').forEach(b => b.addEventListener('click', () => selectSite(b.dataset.site)));
}
function selectSite(id, fly = true) {
  if (!C.SITES[id]) return;
  S.site = id; renderPanel();
  if (map) map.select(id === 'stp' ? null : id, fly && id !== 'stp');
  if (id === 'stp' && map) map.reset();
}
function applyScene() {
  const m = S.mode;
  document.querySelectorAll('#modeSeg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
  document.querySelectorAll('[data-modes]').forEach(el => { el.hidden = !el.dataset.modes.split(' ').includes(m); });
  const pct = m === 'now' ? 0 : 100; $('#dayBar').style.width = pct + '%';
  $('#dayVal').textContent = m === 'y2030' ? t(C.UI.mode2030).toUpperCase() : `${pct}/100`;
}
function setMode(m) {
  if (m === S.mode) return;
  S.mode = m;
  applyScene();
  if (map) map.setMode(m, statusOf); else if (fallbackOn) renderFallback($('#map'), LAYOUT);
  if (statusOf(S.site, m) === 'hidden') S.site = 'stp';
  renderPanel(); renderNav(); renderSections(); reveal(); scrollSpy();
}

/* ---------------- sections ---------------- */
/* org chart: nested boxes; dotted coordination brackets are drawn after layout (drawCoord) */
function orgItem(it) {
  const cls = [it.lect && 'lect', it.staff && 'staff', it.plan && 'plan'].filter(Boolean).join(' ');
  const kids = it.kids ? `<ul class="${it.kidsDashed ? 'dashed' : ''} ${it.row ? 'row' : ''}">${it.kids.map(orgItem).join('')}</ul>` : '';
  return `<li><div class="box ${cls}"${it.co ? ` data-co="${it.co}"` : ''}>${esc(t(it.t))}</div>${kids}</li>`;
}
function orgCol(c) {
  const subs = c.subs ? `<div class="subs"><div class="pair">${c.subs.items.map(x => `<span class="box">${esc(t(x))}</span>`).join('')}</div><span class="cap">${esc(t(c.subs.t))}</span></div>` : '';
  const hasCo = (c.items || []).some(function f(it) { return it.co || (it.kids || []).some(f); });
  return `<div class="col ${c.focus ? 'focus' : ''} ${hasCo ? 'has-co' : ''}"><div class="node">${esc(t(c.h))}${c.tag ? `<span class="tag">${esc(t(c.tag))}</span>` : ''}</div>
    ${subs}${c.items ? `<ul>${c.items.map(orgItem).join('')}</ul>` : ''}</div>`;
}
function drawCoord(root = document) {
  root.querySelectorAll('.org .col').forEach(col => {
    col.querySelectorAll(':scope > .co').forEach(e => e.remove());
    const groups = {};
    col.querySelectorAll('[data-co]').forEach(b => (groups[b.dataset.co] ||= []).push(b));
    const cr = col.getBoundingClientRect();
    if (!cr.width) return;
    Object.values(groups).forEach(boxes => {
      if (boxes.length < 2) return;
      const rs = boxes.map(b => b.getBoundingClientRect());
      const x = Math.max(...rs.map(r => r.right)) - cr.left, ys = rs.map(r => r.top + r.height / 2 - cr.top);
      const top = Math.min(...ys), bot = Math.max(...ys);
      col.insertAdjacentHTML('beforeend', `<span class="co" style="left:${x + 8}px;top:${top}px;height:${bot - top}px"></span>` +
        ys.map(y => `<span class="co tick" style="left:${x}px;top:${y}px"></span>`).join(''));
    });
  });
}
function renderOrg() {
  const o = C.ORG;
  $('#org').innerHTML = `${secHead(secNo('org'), S.lang === 'id' ? 'Struktur organisasi saat ini – Bidang IV' : 'Existing organisation – Bidang IV')}
    <p class="sec-lead">${S.lang === 'id' ? 'Struktur Bidang IV menurut OTK ITS 2024. STP ITS berada di Direktorat Inovasi dan Kawasan Sains Teknologi (DIKST, disorot).' : 'Bidang IV as set out in OTK ITS 2024. STP ITS sits in the Directorate of Innovation & Science-Technology Park (DIKST, highlighted).'}</p>
    <div class="org reveal">
      <div class="top"><div class="node">${esc(t(o.root))}</div><span class="v"></span><div class="node">${esc(t(o.wr))}</div><span class="v"></span></div>
      <div class="cols">${o.cols.map(orgCol).join('')}</div>
      <div class="note"><span><i style="background:var(--its)"></i>${esc(t(o.legendLect))}</span><span><i style="background:#9aa7b6"></i>${esc(t(o.legendStaff))}</span><span><i class="dash"></i>${esc(t(o.legendCo))}</span>
        <span class="src">${esc(t(o.source))}</span>
        <p class="obs">${esc(t(C.ORG_NOTE))}</p></div>
    </div>`;
}
function renderDiagnosis() {
  $('#diagnosis').innerHTML = `${secHead(secNo('diagnosis'), S.lang === 'id' ? 'Diagnosis kondisi saat ini' : 'Diagnosis – where STP stands today')}
    <p class="sec-lead">${esc(t(C.DIAG_QUOTE))}</p>
    <div class="grid g4">${C.ISSUES.map(i => `<article class="card issue-card reveal"><span class="num">#${i.n}</span>
      <h3>${esc(t(i.t))}</h3>
      <div class="row"><b>${S.lang === 'id' ? 'Dampak' : 'Impact'}</b>${esc(t(i.i))}</div>
      <div class="row"><b>${S.lang === 'id' ? 'Akar masalah' : 'Root cause'}</b>${esc(t(i.r))}</div></article>`).join('')}</div>`;
}
function renderRoadmap() {
  $('#roadmap').innerHTML = `${secHead(secNo('roadmap'), S.lang === 'id' ? 'Roadmap STP ITS' : 'STP ITS roadmap')}
    <p class="sec-lead">${S.lang === 'id' ? 'Periode krusial 2025–2030: dari tahap inkubasi menuju pertumbuhan dan kemandirian. Rencana 100 hari adalah langkah pertama periode ini.' : 'The crucial period is 2025–2030: moving from incubation to growth and self-sufficiency. The 100-day plan is the first step of this period.'}</p>
    <div class="road reveal">${C.ROADMAP.map(r => `<div class="stop ${r.here ? 'here' : ''} ${+r.y > 2026 ? 'future' : ''}"><div class="ring"></div><div><div class="y">${r.y}</div><div class="s">${esc(t(r.s))}</div><div class="d">${esc(t(r.d))}</div></div></div>`).join('')}</div>`;
}
/* 100-day road: P1 → P5 one after another, each in its own 20-day leg */
const stepDays = p => { const [a, b] = p.days, n = b - a + 1, k = Math.round(n / 3); return [[a, a + k - 1], [a + k, a + 2 * k - 1], [a + 2 * k, b]]; };
function renderPlan() {
  const ov = S.prio === 'overview';
  const p = C.PRIORITIES.find(x => x.id === S.prio) || {};
  const ticks = [0, ...C.PRIORITIES.map(q => q.days[1])];
  const span = 100;
  const step = (i, [a, b], txt) => `<div class="card"><span class="tag">${esc(t(C.UI.step))} ${i}</span><div class="big">D${a}–${b}</div><p>${esc(t(txt))}</p></div>`;
  const flag = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>';
  const detail = ov ? frameworkHtml() : (() => { const sd = stepDays(p); return `
    <div class="pdetail reveal">
      <div class="card meta"><span class="n">${p.id} · ${t(C.UI.day)} ${p.days[0]}–${p.days[1]} · ${esc(t(C.UI.solves))} #${p.solves.join(', #')}</span><h3>${esc(t(p.t))}</h3>
        <dl><dt>${S.lang === 'id' ? 'Mengapa sekarang' : 'Why now'}</dt><dd>${esc(t(p.why))}</dd><dt>${esc(t(C.UI.owner))}</dt><dd>${esc(t(p.owner))}</dd></dl>
        <div class="chips">${Object.keys(C.QW).map(k => `<span class="chip ${p.qw.includes(k) ? 'on' : ''}">${esc(t(C.QW[k]))}</span>`).join('')}</div></div>
      <div class="days">${step(1, sd[0], p.s1)}${step(2, sd[1], p.s2)}${step(3, sd[2], p.s3)}</div>
    </div>
    ${pimgHtml(p)}
    ${EXTRA[p.id] ? EXTRA[p.id]() : ''}`; })();
  $('#plan').innerHTML = `${secHead(secNo('plan'), S.lang === 'id' ? 'Rencana 100 hari (Module 11b)' : '100-day plan (Module 11b)')}
    <p class="sec-lead">${S.lang === 'id' ? 'Lima prioritas dijalankan berurutan dalam satu jalur 100 hari – masing-masing 20 hari, tanpa tumpang tindih. P1 didahulukan karena unit pengelola adalah tim yang menjalankan P2–P5. Setiap etape diakhiri satu milestone.' : 'Five priorities run one after another on a single 100-day road – 20 days each, no overlap. P1 comes first because the operating unit is the team that delivers P2–P5. Every leg ends at a milestone.'}</p>
    <div class="route-wrap reveal"><div class="route" role="tablist" aria-label="${S.lang === 'id' ? 'Ringkasan & prioritas' : 'Overview & priorities'}">
      <button type="button" role="tab" class="route-start ${ov ? 'is-active' : ''}" data-p="overview" aria-selected="${ov}" title="${esc(t(C.UI.tabOverview))}"><span class="pin">${flag}</span></button>
      <button type="button" class="leg-card ov ${ov ? 'is-active' : ''}" data-p="overview"><span class="d">${esc(t(C.UI.tabOverview))}</span><b>${S.lang === 'id' ? 'Quick win, tata kelola, sumber daya, risiko & kebijakan' : 'Quick wins, governance, resources, risks & policy'}</b><small>Module 11c–g</small></button>
      <div class="route-signs">${C.MILESTONES.map((m, i) => `<span class="sign ${i % 2 ? 'hi' : ''} ${m.d >= span ? 'end' : ''} ${m.p === p.id ? 'on' : ''}" style="left:${m.d / span * 100}%"><em>◆ ${t(C.UI.day)} ${m.d} · ${esc(t(m.t))}</em></span>`).join('')}</div>
      <div class="route-road">${C.PRIORITIES.map(q => `<button type="button" role="tab" class="leg ${q.id === p.id ? 'is-active' : ''}" data-p="${q.id}" aria-selected="${q.id === p.id}" title="${esc(t(q.t))}"><span class="pin">${q.id}</span></button>`).join('')}</div>
      <div class="route-ticks">${ticks.filter(d => !C.MILESTONES.some(m => m.d === d)).map(d => `<span style="left:${d / span * 100}%">${t(C.UI.day)} ${d}</span>`).join('')}</div>
      <div class="route-cards">${C.PRIORITIES.map(q => `<button type="button" class="leg-card ${q.id === p.id ? 'is-active' : ''}" data-p="${q.id}">
        <span class="d">${q.id} · ${t(C.UI.day)} ${q.days[0]}–${q.days[1]}</span><b>${esc(t(q.t))}</b><small>${esc(t(C.UI.solves))} #${q.solves.join(', #')}</small></button>`).join('')}</div>
    </div></div>
    ${detail}`;
  $('#plan').querySelectorAll('.route [data-p]').forEach(el => el.addEventListener('click', () => { S.prio = el.dataset.p; renderPlan(); }));
  requestAnimationFrame(async () => {
    const route = $('#plan .route'); if (!route || $('#plan').hidden || !route.offsetParent) return;
    if (!roadWalker) { try { roadWalker = (await import('./mascot.js')).createRoadWalker(); } catch { return; } }
    roadWalker.attach(route, route.querySelector(ov ? '.route-start .pin' : '.route-road .leg.is-active .pin'));
  });
  $('#plan').querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { S.ftab = b.dataset.f; renderPlan(); }));
  reveal();
}
function table(def) {
  return `<div class="table-wrap"><table><thead><tr>${def.head.map(h => `<th>${esc(t(h))}</th>`).join('')}</tr></thead><tbody>${def.rows.map(r => `<tr>${r.map(c => `<td>${esc(t(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
/* Overview tab of the road: general Module 11c–g content that applies to every priority */
function frameworkHtml() {
  const tabs = [{ id: 'qw', t: { en: 'Quick-win selection', id: 'Seleksi quick win' } }, ...C.FRAME_TABS];
  let body = '';
  if (S.ftab === 'qw') {
    const keys = Object.keys(C.QW);
    body = `<div class="table-wrap qw"><table><thead><tr><th>${S.lang === 'id' ? 'Prioritas' : 'Priority'}</th>${keys.map(k => `<th>${esc(t(C.QW[k]))}</th>`).join('')}</tr></thead><tbody>
      ${C.PRIORITIES.map(p => `<tr><td>${p.id} · ${esc(t(p.t))}</td>${keys.map(k => `<td>${p.qw.includes(k) ? '<span class="yes">✓</span>' : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <div class="grid g2" style="margin-top:12px">${C.MILESTONES.filter(m => m.id).map(m => `<div class="card"><span class="tag">${esc(t(C.UI.quickWin))} · ${t(C.UI.day)} ${m.d}</span><h3 style="margin-top:6px">${esc(t(m.t))}</h3>
        <p>${esc(t(m.desc))}</p></div>`).join('')}</div>`;
  } else if (S.ftab === 'gov') body = table(C.GOV);
  else if (S.ftab === 'res') body = table(C.RES);
  else if (S.ftab === 'risk') body = table(C.RISK);
  else body = `<ol class="policy">${C.POLICY.map(x => `<li>${esc(t(x))}</li>`).join('')}</ol>`;
  return `<div class="pextra reveal"><h3>${S.lang === 'id' ? 'Ringkasan · Quick win, tata kelola, sumber daya, risiko & kebijakan (Module 11c–g)' : 'Overview · Quick wins, governance, resources, risks & policy (Module 11c–g)'}</h3>
    <p class="lead">${S.lang === 'id' ? 'Berlaku untuk kelima prioritas. Pilih P1–P5 di jalur untuk melihat langkah tiap prioritas.' : 'Applies to all five priorities. Pick P1–P5 on the road to see each priority’s steps.'}</p>
    <div class="ftabs" role="tablist">${tabs.map(x => `<button role="tab" type="button" data-f="${x.id}" aria-selected="${x.id === S.ftab}">${esc(t(x.t))}</button>`).join('')}</div>${body}</div>`;
}
/* extras that belong to one priority only – shown when that priority is selected on the road */
function extraP1() {
  return `<div class="org org-d100 reveal">
      <h3>${esc(t(C.ORG_D100.title))}</h3><p>${esc(t(C.ORG_D100.lead))}</p>
      <div class="cols one">${orgCol({ ...C.ORG_D100, focus: true })}</div>
      <div class="note"><span><i class="plan"></i>${esc(t(C.ORG_D100.legendPlan))}</span><span><i style="background:var(--its)"></i>${esc(t(C.ORG.legendLect))}</span><span><i style="background:#9aa7b6"></i>${esc(t(C.ORG.legendStaff))}</span></div>
    </div>`;
}
function extraP2() {
  const om = C.OPMODEL;
  return `<div class="pextra reveal"><h3>${S.lang === 'id' ? 'P2 · Model operasi (Module 10): Build / Share / Partner' : 'P2 · Operating model (Module 10): Build / Share / Partner'}</h3>
    <p class="lead">${esc(t(om.lead))}</p>
    <div class="grid g3 layers" style="margin-bottom:12px">${om.layers.map(l => `<div class="card"><h3>${esc(t(l.h))}</h3><p>${esc(t(l.d))}</p></div>`).join('')}</div>
    <div class="table-wrap"><table><thead><tr>${om.head.map(h => `<th>${esc(t(h))}</th>`).join('')}</tr></thead><tbody>
      ${om.rows.map(r => `<tr><td>${esc(t(r[0]))}</td><td><span class="mode-tag ${r[1].split(' ')[0]}">${esc(r[1])}</span></td><td>${esc(t(r[2]))}</td></tr>`).join('')}</tbody></table></div></div>`;
}
function extraP4() {
  const sc = C.SHOWCASE;
  return `<div class="pextra reveal"><h3>${S.lang === 'id' ? 'P4 · Showcase (Module 6): pusat GRIT + pojok showcase di tiap klaster' : 'P4 · Showcase (Module 6): GRIT hub + a showcase corner in every cluster'}</h3>
    <p class="lead">${esc(t(sc.lead))}</p>
    <div class="flow">${sc.visit.map((v, i) => `<div class="card"><div class="step">0${i + 1}</div><h3>${esc(t(v.h))}</h3><p>${esc(t(v.d))}</p></div>`).join('')}</div>
    <div class="pathway">${sc.path.map(p => `<span>${esc(t(p))}</span>`).join('')}</div>
    <div class="grid g4 kpi">${sc.kpi.map(k => `<div class="card"><div class="v">${k.v}</div><p>${esc(t(k.t))}</p></div>`).join('')}</div></div>`;
}
function extraP3() {
  const p = C.PRIORITIES.find(x => x.id === 'P3'), tr = p.tracks;
  return `<div class="pextra reveal"><h3>${S.lang === 'id' ? 'P3 · Dua jalur tenant' : 'P3 · Two tenant tracks'}</h3>
    <div class="table-wrap"><table><thead><tr>${tr.head.map(h => `<th>${esc(t(h))}</th>`).join('')}</tr></thead><tbody>${tr.rows.map(r => `<tr>${r.map(x => `<td>${esc(t(x))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
}
function extraP5() {
  const x = C.P5X, L = S.lang === 'id';
  return `<div class="pextra reveal"><h3>${L ? 'P5 · Isi dashboard KPI & program STP Fellows' : 'P5 · KPI dashboard & STP Fellows'}</h3>
    <div class="grid g3 kpi-mini">${x.kpi.map(k => `<div class="card"><span class="v">${k.v}</span><p>${esc(t(k.t))}</p></div>`).join('')}</div>
    <h4 class="concept-h" style="margin-top:16px">STP Fellows</h4>
    <ul class="fellows">${x.fellows.map(f => `<li>${esc(t(f))}</li>`).join('')}</ul></div>`;
}
const pimgHtml = p => p.img ? `<div class="pimg ${p.img.length > 1 ? 'two' : ''} reveal">${p.img.map(i => `<figure><img src="assets/img/priorities/${i.src}.webp" alt="${esc(t(i.cap))}" loading="lazy"><figcaption>${esc(t(i.cap))}</figcaption></figure>`).join('')}</div>` : '';
const EXTRA = { P1: extraP1, P2: extraP2, P3: extraP3, P4: extraP4, P5: extraP5 };
function ecoSvg() {
  const L = S.lang === 'id';
  return `<svg viewBox="0 0 640 380" role="img" aria-label="Eco AI Data Center Living Lab schematic" font-family="Barlow Condensed, sans-serif">
    <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#e3eef9"/></pattern>
      <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="#0067ac"/></marker></defs>
    <rect width="640" height="380" fill="url(#g)"/>
    <circle cx="70" cy="62" r="24" fill="#fff" stroke="#e8a33a" stroke-width="2"/><path d="M70 26v-10M70 108v-10M34 62H24M116 62h-10M45 37l-7-7M95 87l7 7M95 37l7-7M45 87l-7 7" stroke="#e8a33a" stroke-width="2"/>
    <g transform="translate(30 150)"><rect width="120" height="64" rx="4" fill="#1f4f86"/><path d="M0 21h120M0 42h120M30 0v64M60 0v64M90 0v64" stroke="#5f8fc4"/></g>
    <text x="90" y="236" text-anchor="middle" font-size="15" font-weight="700" fill="#0d2643">${L ? 'PV SURYA' : 'SOLAR PV'}</text>
    <g transform="translate(190 160)"><rect width="70" height="46" rx="6" fill="#fff" stroke="#0067ac" stroke-width="2"/><rect x="70" y="16" width="8" height="14" fill="#0067ac"/><rect x="10" y="10" width="34" height="26" fill="#a6dcc1"/></g>
    <text x="228" y="236" text-anchor="middle" font-size="15" font-weight="700" fill="#0d2643">${L ? 'BATERAI' : 'BATTERY'}</text>
    <g transform="translate(320 110)"><rect width="150" height="150" rx="8" fill="#fff" stroke="#0067ac" stroke-width="2"/>
      ${[0, 1].map(i => `<g transform="translate(${22 + i * 62} 18)"><rect width="44" height="114" rx="3" fill="#0d2643"/>${[0, 1, 2, 3, 4, 5].map(j => `<rect x="6" y="${8 + j * 17}" width="32" height="10" rx="2" fill="#1b86cf"/><circle cx="34" cy="${13 + j * 17}" r="1.6" fill="#a6dcc1"/>`).join('')}</g>`).join('')}</g>
    <text x="395" y="282" text-anchor="middle" font-size="15" font-weight="700" fill="#0d2643">${L ? 'RAK GPU MODULAR' : 'MODULAR GPU RACKS'}</text>
    <g transform="translate(520 130)"><rect width="90" height="56" rx="6" fill="#fff" stroke="#0067ac" stroke-width="2"/><circle cx="28" cy="28" r="16" fill="none" stroke="#1b86cf" stroke-width="2"/><path d="M28 12v32M12 28h32M17 17l22 22M39 17 17 39" stroke="#1b86cf"/><path d="M58 18h22M58 28h22M58 38h22" stroke="#7fa6c9"/></g>
    <text x="565" y="208" text-anchor="middle" font-size="15" font-weight="700" fill="#0d2643">${L ? 'DRY / LIQUID COOLING' : 'DRY / LIQUID COOLING'}</text>
    <path d="M150 182h38M262 182h56" stroke="#0067ac" stroke-width="2.5" marker-end="url(#ar)"/>
    <path d="M470 150h48" stroke="#1b86cf" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#ar)"/><path d="M518 170h-46" stroke="#e8833a" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#ar)"/>
    <g transform="translate(470 290)"><rect width="150" height="64" rx="6" fill="#fdf0e6" stroke="#e8833a" stroke-width="1.5"/><text x="75" y="26" text-anchor="middle" font-size="14" font-weight="700" fill="#b25a1a">${L ? 'PEMANFAATAN PANAS' : 'HEAT REUSE'}</text><text x="75" y="46" text-anchor="middle" font-size="12" fill="#b25a1a">${L ? 'pengeringan · air panas' : 'drying · hot water'}</text></g>
    <path d="M565 214v74" stroke="#e8833a" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ar)"/>
    <g transform="translate(30 290)"><rect width="400" height="64" rx="6" fill="#e3f0fa" stroke="#0067ac" stroke-width="1.5"/>
      ${[['PUE', '≤ 1.3'], ['WUE', '≈ 0 L/kWh'], ['CUE', L ? 'rendah' : 'low'], ['RE', '≥ 60 %']].map((m, i) => `<text x="${50 + i * 100}" y="28" text-anchor="middle" font-size="13" font-weight="700" fill="#0067ac" font-family="JetBrains Mono, monospace">${m[0]}</text><text x="${50 + i * 100}" y="48" text-anchor="middle" font-size="14" fill="#0d2643" font-family="JetBrains Mono, monospace">${m[1]}</text>`).join('')}</g>
    <text x="30" y="282" font-size="12" fill="#6a7c91" font-family="JetBrains Mono, monospace">${L ? 'TARGET METRIK LIVING LAB (USULAN)' : 'LIVING-LAB METRIC TARGETS (PROPOSED)'}</text>
  </svg>`;
}
function cleanroomSvg() {
  const L = S.lang === 'id';
  const T = (x, y, s, sz = 15, c = '#0d2643', w = 700) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${sz}" font-weight="${w}" fill="${c}">${s}</text>`;
  return `<svg viewBox="0 0 640 380" role="img" aria-label="Semiconductor clean room schematic" font-family="Barlow Condensed, sans-serif">
    <defs><pattern id="g2" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#e3eef9"/></pattern>
      <marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="#0067ac"/></marker></defs>
    <rect width="640" height="380" fill="url(#g2)"/>
    <rect x="140" y="40" width="470" height="230" rx="8" fill="#fff" stroke="#0067ac" stroke-width="2"/>
    <rect x="140" y="40" width="470" height="26" rx="8" fill="#e3f0fa"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${162 + i * 74}" y="46" width="56" height="14" rx="3" fill="#fff" stroke="#7fa6c9"/><path d="M${170 + i * 74} 53h40" stroke="#7fa6c9" stroke-dasharray="3 3"/>`).join('')}
    ${T(375, 86, L ? 'FILTER HEPA / ULPA – ALIRAN UDARA LAMINAR' : 'HEPA / ULPA FILTERS – LAMINAR AIRFLOW', 12, '#0067ac', 600)}
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${180 + i * 64} 96v34" stroke="#9cc8ec" stroke-width="2" stroke-dasharray="5 5" marker-end="url(#ar2)"/>`).join('')}
    <g transform="translate(180 150)"><rect width="120" height="60" rx="4" fill="#0d2643"/><rect x="10" y="10" width="44" height="28" rx="3" fill="#1b86cf"/><rect x="62" y="10" width="48" height="10" rx="2" fill="#5f8fc4"/><rect x="62" y="26" width="48" height="10" rx="2" fill="#5f8fc4"/><rect x="0" y="60" width="120" height="8" fill="#5f8fc4"/></g>
    ${T(240, 238, L ? 'LITOGRAFI' : 'LITHOGRAPHY')}
    <g transform="translate(330 150)"><rect width="100" height="60" rx="4" fill="#fff" stroke="#0d2643" stroke-width="2"/><circle cx="50" cy="30" r="18" fill="none" stroke="#1b86cf" stroke-width="3"/><circle cx="50" cy="30" r="6" fill="#1b86cf"/></g>
    ${T(380, 238, L ? 'ETSA & DEPOSISI' : 'ETCH & DEPOSITION')}
    <g transform="translate(460 150)"><rect width="120" height="60" rx="4" fill="#fff" stroke="#0d2643" stroke-width="2"/>${[0, 1, 2, 3].map(i => `<rect x="${12 + i * 26}" y="14" width="18" height="18" rx="2" fill="#a6dcc1" stroke="#2e9e6b"/>`).join('')}<path d="M12 44h96" stroke="#7fa6c9" stroke-width="3"/></g>
    ${T(520, 238, L ? 'UJI & PACKAGING' : 'TEST & PACKAGING')}
    <g transform="translate(30 120)"><rect width="84" height="110" rx="6" fill="#fdf0e6" stroke="#e8833a" stroke-width="1.5"/>
      <circle cx="42" cy="34" r="10" fill="#fff" stroke="#e8833a" stroke-width="2"/><path d="M28 86V58c0-6 6-10 14-10s14 4 14 10v28z" fill="#fff" stroke="#e8833a" stroke-width="2"/></g>
    ${T(72, 252, 'GOWNING / AIRLOCK', 13, '#b25a1a')}
    <path d="M114 175h22" stroke="#e8833a" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#ar2)"/>
    <g transform="translate(140 290)"><rect width="470" height="64" rx="6" fill="#e3f0fa" stroke="#0067ac" stroke-width="1.5"/>
      ${[['ISO', L ? 'kelas 5–7' : 'class 5–7'], ['ΔP', L ? 'positif' : 'positive'], ['RH', '45 ± 5 %'], ['T', '21 ± 1 °C']].map((m, i) => `<text x="${60 + i * 117}" y="28" text-anchor="middle" font-size="13" font-weight="700" fill="#0067ac" font-family="JetBrains Mono, monospace">${m[0]}</text><text x="${60 + i * 117}" y="48" text-anchor="middle" font-size="14" fill="#0d2643" font-family="JetBrains Mono, monospace">${m[1]}</text>`).join('')}</g>
    <text x="140" y="282" font-size="12" fill="#6a7c91" font-family="JetBrains Mono, monospace">${L ? 'TARGET RUANG (USULAN)' : 'ROOM TARGETS (PROPOSED)'}</text>
  </svg>`;
}
function livingLabSvg() {
  const L = S.lang === 'id';
  const zone = (x, y, w, h, fill, stroke, title, sub) => `<g transform="translate(${x} ${y})"><rect width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>
    <text x="12" y="22" font-size="14" font-weight="700" fill="#0d2643">${title}</text><text x="12" y="40" font-size="12" fill="#33475f">${sub}</text></g>`;
  const sensor = (x, y) => `<g transform="translate(${x} ${y})"><path d="M0 0v-18" stroke="#33475f" stroke-width="2"/><circle cy="-22" r="5" fill="#0067ac"/><path d="M-9 -30a12 12 0 0 1 18 0" fill="none" stroke="#1b86cf" stroke-width="1.6"/></g>`;
  return `<svg viewBox="0 0 1200 350" role="img" aria-label="STP Living Lab schematic" font-family="Barlow Condensed, sans-serif">
    <defs><pattern id="g3" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#e3eef9"/></pattern>
      <marker id="ar3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="#0067ac"/></marker></defs>
    <rect width="1200" height="350" fill="url(#g3)"/>
    ${zone(30, 30, 250, 170, '#e6f5ee', '#2e9e6b', L ? 'ENERGI PINTAR & IoT' : 'SMART ENERGY & IoT', L ? 'smart grid mikro, meter & sensor' : 'micro smart-grid, meters & sensors')}
    <g transform="translate(60 110)"><rect width="70" height="40" rx="3" fill="#1f4f86"/><path d="M0 13h70M0 26h70M23 0v40M47 0v40" stroke="#5f8fc4"/></g><g transform="translate(160 112)"><rect width="34" height="36" rx="4" fill="#fff" stroke="#0067ac" stroke-width="2"/><rect x="7" y="7" width="20" height="22" fill="#a6dcc1"/></g>${sensor(240, 180)}
    ${zone(310, 30, 300, 170, '#e3f0fa', '#0067ac', L ? 'MOBILITAS LISTRIK & OTONOM' : 'ELECTRIC & AUTONOMOUS MOBILITY', L ? 'uji di sirkuit, pengisian daya' : 'trials on the circuit, charging')}
    <path d="M340 160c40-40 120 20 170-10s60-20 80 0" fill="none" stroke="#4d5d72" stroke-width="12" stroke-linecap="round"/><path d="M340 160c40-40 120 20 170-10s60-20 80 0" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 6"/>
    <g transform="translate(430 120)"><rect width="40" height="18" rx="5" fill="#0067ac"/><circle cx="9" cy="19" r="4" fill="#0d2643"/><circle cx="31" cy="19" r="4" fill="#0d2643"/></g>${sensor(590, 190)}
    ${zone(640, 30, 250, 170, '#e9f3fb', '#1b86cf', L ? 'UJI MARITIM' : 'MARITIME TRIALS', L ? 'kolam uji, sensor perairan' : 'test pond, water sensors')}
    <path d="M660 160c20-8 40 8 60 0s40-8 60 0 40 8 60 0" fill="none" stroke="#1b86cf" stroke-width="3"/><path d="M660 178c20-8 40 8 60 0s40-8 60 0 40 8 60 0" fill="none" stroke="#9cc8ec" stroke-width="3"/>
    <path d="M740 140h50l-10 14h-30z" fill="#fff" stroke="#0d2643" stroke-width="2"/><path d="M765 140v-22l14 12z" fill="#e8833a"/>${sensor(860, 190)}
    ${zone(920, 30, 250, 170, '#f3eedd', '#c98a1b', L ? 'PERTANIAN CERDAS' : 'SMART AGRICULTURE', L ? 'lahan uji, alsintan, drone' : 'test plots, farm machinery, drones')}
    ${[0, 1, 2, 3, 4].map(i => `<path d="M${950 + i * 40} 180v-24" stroke="#2e9e6b" stroke-width="3"/><path d="M${950 + i * 40} 162c-8-2-10-8-10-12 6 0 10 4 10 12zM${950 + i * 40} 166c8-2 10-8 10-12-6 0-10 4-10 12z" fill="#7cc49e"/>`).join('')}${sensor(1150, 190)}
    <g transform="translate(330 250)"><rect width="540" height="76" rx="8" fill="#0d2643"/>
      <text x="270" y="30" text-anchor="middle" font-size="16" font-weight="700" fill="#fff">${L ? 'PLATFORM DATA & MONITORING BERSAMA' : 'SHARED DATA & MONITORING PLATFORM'}</text>
      <text x="270" y="54" text-anchor="middle" font-size="13" fill="#9cc8ec" font-family="JetBrains Mono, monospace">${L ? 'booking zona · dashboard · data terbuka untuk riset & tenant' : 'zone booking · dashboards · open data for research & tenants'}</text></g>
    ${[155, 460, 765, 1045].map(x => { const tx = x < 600 ? 330 + (x < 300 ? 40 : 140) : 870 - (x > 900 ? 40 : 140); return `<path d="M${x} 205C${x} 232 ${tx} 226 ${tx} 248" fill="none" stroke="#0067ac" stroke-width="2" stroke-dasharray="6 4" marker-end="url(#ar3)"/>`; }).join('')}
  </svg>`;
}
const partsHtml = (list, cls = 'parts') => `<div class="${cls}">${list.map(p => `<div class="card reveal"><div class="ic">${icon(p.k)}</div><div><h3>${esc(t(p.h))}</h3><p>${esc(t(p.d))}</p></div></div>`).join('')}</div>`;
function renderFuture() {
  const f = C.FUTURE, L = S.lang === 'id';
  $('#future').innerHTML = `${secHead(secNo('future'), L ? 'Big project: fasilitas baru setelah 100 hari' : 'Big projects: new facilities after the 100 days')}
    <p class="sec-lead">${esc(t(f.lead))}</p>
    <div class="grid g2 bprojects">${f.projects.map(p => `<article class="card bp reveal"><span class="tag">${p.n} · ${esc(t(p.where))}</span><h3>${esc(t(p.h))}</h3><p>${esc(t(p.d))}</p>
      <ul>${p.items.map(i => `<li>${esc(t(i))}</li>`).join('')}</ul></article>`).join('')}</div>
    <h3 class="sub-h">${L ? 'BP1 · Konsep area semikonduktor & Eco AI Data Center' : 'BP1 · Semiconductor & Eco AI Data Center – concept'}</h3>
    <div class="grid g2 concept">
      <div><h4 class="concept-h">Eco AI Data Center</h4><div class="eco reveal">${ecoSvg()}</div>${partsHtml(f.parts)}</div>
      <div><h4 class="concept-h">${L ? 'Clean room semikonduktor' : 'Semiconductor clean room'}</h4><div class="eco reveal">${cleanroomSvg()}</div>${partsHtml(f.cleanroom)}</div>
    </div>
    <h3 class="sub-h">${L ? 'BP2 · Konsep STP Living Lab' : 'BP2 · STP Living Lab – concept'}</h3>
    <div class="eco reveal">${livingLabSvg()}</div>
    ${partsHtml(f.livinglab, 'parts parts-row')}`;
}
function renderFooter() {
  $('#foot').innerHTML = '';
}

/* ---------------- videos dropdown + modal ---------------- */
function renderVideos() {
  $('#videoMenu').innerHTML = C.VIDEOS.map((v, i) => v.yt
    ? `<button type="button" role="menuitem" data-v="${i}"><img src="https://i.ytimg.com/vi/${v.yt}/mqdefault.jpg" alt="" loading="lazy"><span><b>${esc(t(v.t))}</b><small>${esc(t(v.d))}</small></span></button>`
    : `<a role="menuitem" href="${v.href}" target="_blank" rel="noopener"><i class="yt">${icon('gallery', 18)}</i><span><b>${esc(t(v.t))}</b><small>${esc(t(v.d))}</small></span></a>`).join('');
  $('#videoMenu').querySelectorAll('[data-v]').forEach(b => b.addEventListener('click', () => openVideo(C.VIDEOS[+b.dataset.v])));
}
const menuOpen = open => { $('#videoMenu').hidden = !open; $('#videoToggle').setAttribute('aria-expanded', String(open)); $('#videoGroup').classList.toggle('open', open); };
function openVideo(v) {
  menuOpen(false);
  $('#vmodalTitle').textContent = t(v.t);
  $('#vmodalYt').href = `https://www.youtube.com/watch?v=${v.yt}`;
  $('#vmodalFrame').src = `https://www.youtube-nocookie.com/embed/${v.yt}?autoplay=1&rel=0&modestbranding=1`;
  $('#vmodal').hidden = false; document.body.style.overflow = 'hidden';
  if (map) map.setPaused?.(true);
  $('#vmodalClose').focus();
}
function closeVideo() {
  if ($('#vmodal').hidden) return;
  $('#vmodal').hidden = true; $('#vmodalFrame').src = 'about:blank'; document.body.style.overflow = '';
  if (map) map.setPaused?.(S.view !== '3d');
}
function renderTeam() {
  $('#teamToggle').setAttribute('aria-label', t(C.UI.teamBtn));
  $('#teamTitle').textContent = `${t(C.UI.teamBtn)} · UTM–ITS STELLAR 2026`;
  $('#teamList').innerHTML = C.TEAM.map((m, i) => `<div class="team-row"><span class="av">${m.n.split(' ').map(w => w[0]).slice(0, 2).join('')}</span><span><b>${i + 1}. ${esc(m.n)}</b><small>${esc(t(m.u))}</small></span></div>`).join('');
}
const teamOpen = open => { $('#teamModal').hidden = !open; document.body.style.overflow = open ? 'hidden' : ''; if (open) $('#teamClose').focus(); };
$('#teamToggle').addEventListener('click', e => { e.stopPropagation(); menuOpen(false); teamOpen(true); });
$('#teamClose').addEventListener('click', () => teamOpen(false));
$('#teamModal').addEventListener('click', e => { if (e.target.id === 'teamModal') teamOpen(false); });
$('#videoToggle').addEventListener('click', e => { e.stopPropagation(); menuOpen($('#videoMenu').hidden); });
document.addEventListener('click', e => { if (!$('#videoGroup').contains(e.target)) menuOpen(false); });
$('#vmodal').addEventListener('click', e => { if (e.target.id === 'vmodal') closeVideo(); });
$('#vmodalClose').addEventListener('click', closeVideo);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeVideo(); menuOpen(false); if (!$('#teamModal').hidden) teamOpen(false); } });

/* ---------------- behaviour ---------------- */
let io;
function reveal() {
  if (!('IntersectionObserver' in window)) { document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')); return; }
  io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.in)').forEach(e => io.observe(e));
}
let spy;
function scrollSpy() {
  const set = id => document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('is-active', a.dataset.sec === id));
  spy?.disconnect();
  spy = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) set(e.target.id); }); }, { rootMargin: '-45% 0px -50% 0px' });
  navFor(S.mode).map(n => document.getElementById(n.id)).filter(Boolean).forEach(s => spy.observe(s));
  set(window.scrollY < ($('.sec:not([hidden])')?.offsetTop ?? 0) - 120 ? 'top' : '');
}
function clock() {
  const d = new Date(), loc = S.lang === 'id' ? 'id-ID' : 'en-GB';
  $('#clock').innerHTML = `${d.toLocaleDateString(loc, { day: '2-digit', month: 'short', year: 'numeric' })}<br>${d.toLocaleTimeString(loc, { hour12: false })}`;
}
function renderSections() {
  renderOrg(); renderDiagnosis(); renderPlan(); renderRoadmap(); renderFuture();
  requestAnimationFrame(() => drawCoord());
}
function renderAll() {
  renderStatic(); applyScene(); renderPanel(); renderSections(); renderFooter(); renderVideos(); renderTeam();
  map2d?.relabel();
  if (map) map.relabel(id => t(SHORT[id]), captions()); else if (fallbackOn) renderFallback($('#map'), LAYOUT);
  reveal(); scrollSpy(); clock();
}

document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => { S.lang = b.dataset.lang; store.set('stp-lang', S.lang); renderAll(); }));
document.querySelectorAll('#modeSeg button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
$('#tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { S.tab = b.dataset.tab; renderPanel(); } });
let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => drawCoord(), 120); });
document.fonts?.ready.then(() => drawCoord());
$('#resetBtn').addEventListener('click', () => { if (S.view === '2d') { map2d?.reset(); return; } if (S.view !== '3d') return; S.site = 'stp'; renderPanel(); map?.replay(); });
document.querySelectorAll('#viewSeg button').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));

// always open on the “Now” scenario; drop any section hash left from a previous visit
if (location.hash) history.replaceState(null, '', location.pathname + location.search);
renderAll();
setInterval(clock, 1000);
initMap();
