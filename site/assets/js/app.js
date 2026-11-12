import * as C from './content.js';
import { LAYOUT, webglAvailable } from './layout.js';

/* ---------------- state & helpers ---------------- */
const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } } };
const qsLang = new URLSearchParams(location.search).get('lang');
const S = { lang: (qsLang === 'id' || qsLang === 'en') ? qsLang : (store.get('stp-lang') || 'en'), mode: 'now', site: 'stp', tab: 'overview', prio: 'P1', ftab: 'qw' };
const t = o => (o == null ? '' : typeof o === 'string' ? o : (o[S.lang] ?? o.en));
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const MODE_KEY = { now: 'now', d100: 'd100', y2030: 'y2030' };
const statusOf = (id, mode) => C.SITES[id]?.status[mode] ?? 'active';
const SHORT = {
  stp: { en: 'STP ITS', id: 'STP ITS' }, circuit: { en: 'Test Circuit', id: 'Sirkuit Uji' }, auto: { en: 'Automotive', id: 'Otomotif' },
  ict: { en: 'ICT & Robotics', id: 'TIK & Robotika' }, creative: { en: 'Creative Center', id: 'Creative Center' }, maritime: { en: 'Maritime', id: 'Maritim' },
  labs: { en: 'Robotics Center & Labs', id: 'Robotics Center & Lab' }, rc: { en: 'Research Center · DIKST · TTO · GRIT', id: 'Research Center · DIKST · TTO · GRIT' },
  ilbi: { en: 'ILBI Incubator', id: 'Inkubator ILBI' }, ecodc: { en: 'Eco AI DC Lab', id: 'Eco AI DC Lab' }, cleanroom: { en: 'Clean Room (partner)', id: 'Clean Room (partner)' },
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
  pv: '<rect x="3" y="9" width="18" height="10" rx="1"/><path d="M3 14h18M9 9v10M15 9v10M12 2v3M5 4l2 2M19 4l-2 2"/>',
  cool: '<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>',
  gpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8"/><path d="M8 1v3M16 1v3M8 20v3M16 20v3M1 8h3M1 16h3M20 8h3M20 16h3"/>',
  mon: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 18 4-6"/>',
  heat: '<path d="M8 21c-2-3 2-5 0-8M12 21c-2-3 2-5 0-8M16 21c-2-3 2-5 0-8"/><path d="M5 9h14"/>',
};
const icon = (k, w = 22) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const secHead = (no, title) => `<div class="sec-head"><span class="no">${no}</span><h2>${esc(title)}</h2><span class="line"></span></div>`;

/* ---------------- static text ---------------- */
function renderStatic() {
  document.documentElement.lang = S.lang;
  document.title = t(C.UI.title);
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(C.UI[el.dataset.i18n]); });
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === S.lang)));
  $('#nav').innerHTML = C.NAV.map(n => `<a href="#${n.id}" data-sec="${n.id}" aria-label="${esc(t(n.label))}">${icon(n.icon)}<span class="tip">${esc(t(n.label))}</span></a>`).join('');
}

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
const captions = () => ({ stp: S.lang === 'id' ? 'KAWASAN SAINS TEKNOLOGI' : 'SCIENCE TECHNO PARK AREA', campus: S.lang === 'id' ? 'KAMPUS UTAMA ITS SUKOLILO' : 'ITS SUKOLILO MAIN CAMPUS', res: S.lang === 'id' ? 'PERMUKIMAN' : 'RESIDENTIAL AREA' });

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
    <svg viewBox="-135 -100 230 170" role="img" aria-label="STP ITS site plan">
      <rect x="${L.stpZone.x0}" y="${L.stpZone.z0}" width="${L.stpZone.x1 - L.stpZone.x0}" height="${L.stpZone.z1 - L.stpZone.z0}" fill="#e8f1fa" stroke="#0067ac" stroke-width=".4" stroke-dasharray="2 1.4"/>
      ${L.roads.map(r => `<rect x="${r.x - r.w / 2}" y="${r.z - r.d / 2}" width="${r.w}" height="${r.d}" fill="#dfe8f2"/>`).join('')}
      ${L.arcs.map(c => { const p0 = [c.x + c.r * Math.cos(c.a0), c.z + c.r * Math.sin(c.a0)], p1 = [c.x + c.r * Math.cos(c.a1), c.z + c.r * Math.sin(c.a1)]; return `<path d="M${p0[0]} ${p0[1]} A${c.r} ${c.r} 0 0 1 ${p1[0]} ${p1[1]}" fill="none" stroke="#dfe8f2" stroke-width="${c.w}"/>`; }).join('')}
      ${L.context.map(r => `<rect x="${r.x - r.w / 2}" y="${r.z - r.d / 2}" width="${r.w}" height="${r.d}" fill="${r.roof === 'tile' ? '#e9bfa6' : r.roof === 'red' ? '#cf9a8e' : '#e4ebf3'}" transform="rotate(${(r.ry || 0) * -57.3} ${r.x} ${r.z})"/>`).join('')}
      ${L.water.map(r => `<rect x="${r.x - r.w / 2}" y="${r.z - r.d / 2}" width="${r.w}" height="${r.d}" fill="#cfe3f5"/>`).join('')}
      <polygon class="site" data-id="circuit" points="${track}" fill="none" stroke="#4d5d72" stroke-width="3.4" stroke-linejoin="round"/>
      ${parts}${labels}</svg></div>`);
  box.querySelectorAll('.fallback .site').forEach(el => el.addEventListener('click', () => selectSite(el.dataset.id)));
}

/* ---------------- panel ---------------- */
function renderPanel() {
  const s = C.SITES[S.site];
  const modeTab = S.tab === 'overview' ? S.mode : S.tab;
  const st = statusOf(S.site, modeTab);
  const body = S.tab === 'overview' ? s.overview : S.tab === 'now' ? s.now : S.tab === 'd100' ? s.d100 : s.y2030;
  const linked = C.PRIORITIES.filter(p => p.site === S.site);
  $('#panel').innerHTML = `
    <div class="kind">${esc(t(s.kind))}</div>
    <h2>${esc(t(s.name))}</h2>
    <span class="status-pill" data-s="${st}">● ${esc(t(STATUS_TXT[st]))} · ${esc(t(C.UI[{ now: 'modeNow', d100: 'modeD100', y2030: 'mode2030' }[modeTab]]))}</span>
    <p>${esc(t(body))}</p>
    ${S.tab === 'overview' && s.facts ? `<ul class="facts">${s.facts.map(f => `<li>${esc(t(f))}</li>`).join('')}</ul>` : ''}
    ${linked.length ? `<p class="linked">${S.lang === 'id' ? 'Terkait prioritas' : 'Linked priority'}: ${linked.map(p => `<b>${p.id}</b> ${esc(t(p.t))}`).join(' · ')}</p>` : ''}
    <div class="site-pick">${Object.keys(C.SITES).filter(id => statusOf(id, S.mode) !== 'hidden').map(id => `<button type="button" data-site="${id}">${esc(t(SHORT[id]))}</button>`).join('')}</div>`;
  $('#panel').querySelectorAll('[data-site]').forEach(b => b.addEventListener('click', () => selectSite(b.dataset.site)));
  document.querySelectorAll('#tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === S.tab)));
}
function selectSite(id, fly = true) {
  if (!C.SITES[id]) return;
  S.site = id; renderPanel();
  if (map) map.select(id === 'stp' ? null : id, fly && id !== 'stp');
  if (id === 'stp' && map) map.reset();
}
function setMode(m) {
  S.mode = m;
  document.querySelectorAll('#modeSeg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
  const pct = m === 'now' ? 0 : 100; $('#dayBar').style.width = pct + '%';
  $('#dayVal').textContent = m === 'y2030' ? '2030' : `${pct}/100`;
  if (S.tab !== 'overview') S.tab = m;
  if (map) map.setMode(m, statusOf); else if (fallbackOn) renderFallback($('#map'), LAYOUT);
  if (statusOf(S.site, m) === 'hidden') S.site = 'stp';
  renderPanel();
}

/* ---------------- priorities strip ---------------- */
function renderStrip() {
  $('#strip').innerHTML = C.PRIORITIES.map(p => `<button type="button" class="pcard ${p.id === S.prio ? 'is-active' : ''}" data-p="${p.id}">
    <span class="n">${p.id}</span><span class="t">${esc(t(p.t))}<span class="s">${esc(t(C.UI.solves))} #${p.solves.join(', #')}</span></span>${icon('arrow', 16)}</button>`).join('');
  $('#strip').querySelectorAll('.pcard').forEach(b => b.addEventListener('click', () => {
    const p = C.PRIORITIES.find(x => x.id === b.dataset.p); S.prio = p.id; S.tab = 'd100';
    setMode('d100'); selectSite(p.site); renderStrip(); renderPlan();
  }));
}

/* ---------------- sections ---------------- */
function renderDiagnosis() {
  const o = C.ORG;
  $('#diagnosis').innerHTML = `${secHead('01', S.lang === 'id' ? 'Diagnosis kondisi saat ini' : 'Diagnosis – where STP stands today')}
    <p class="sec-lead">${esc(t(C.DIAG_QUOTE))}</p>
    <div class="grid g4">${C.ISSUES.map(i => `<article class="card issue-card reveal"><span class="num">#${i.n}</span>
      <h3>${esc(t(i.t))}</h3>
      <div class="row"><b>${S.lang === 'id' ? 'Dampak' : 'Impact'}</b>${esc(t(i.i))}</div>
      <div class="row"><b>${S.lang === 'id' ? 'Akar masalah' : 'Root cause'}</b>${esc(t(i.r))}</div>
      <a class="to" href="#plan" data-p="${i.p}">→ ${i.p}</a></article>`).join('')}</div>
    <div class="org reveal">
      <div class="top"><div class="node">${esc(t(o.root))}</div><span class="v"></span><div class="node">${esc(t(o.wr))}</div><span class="v"></span></div>
      <div class="cols">${o.cols.map(c => `<div class="col ${c.focus ? 'focus' : ''}"><div class="node ${c.dim ? 'dim' : ''}">${esc(t(c.h))}</div>
        ${c.items ? `<ul>${c.items.map(it => `<li class="${it.lect ? 'lect' : ''} ${it.staff ? 'staff' : ''} ${it.missing ? 'missing' : ''}"><i></i>${esc(t(it.t))}</li>`).join('')}</ul>` : ''}</div>`).join('')}</div>
      <div class="note"><span><i style="background:var(--its)"></i>${esc(t(o.legendLect))}</span><span><i style="background:#9aa7b6"></i>${esc(t(o.legendStaff))}</span><span style="flex-basis:100%;font-family:var(--body);font-size:14px;color:var(--ink-2)">${esc(t(C.ORG_NOTE))}</span></div>
    </div>`;
  $('#diagnosis').querySelectorAll('[data-p]').forEach(a => a.addEventListener('click', () => { S.prio = a.dataset.p; renderPlan(); renderStrip(); }));
}
function renderRoadmap() {
  $('#roadmap').innerHTML = `${secHead('02', S.lang === 'id' ? 'Roadmap STP ITS' : 'STP ITS roadmap')}
    <p class="sec-lead">${S.lang === 'id' ? 'Periode krusial 2025–2030: dari tahap inkubasi menuju pertumbuhan dan kemandirian. Rencana 100 hari adalah langkah pertama periode ini.' : 'The crucial period is 2025–2030: moving from incubation to growth and self-sufficiency. The 100-day plan is the first step of this period.'}</p>
    <div class="road reveal">${C.ROADMAP.map(r => `<div class="stop ${r.here ? 'here' : ''} ${+r.y > 2026 ? 'future' : ''}"><div class="ring"></div><div><div class="y">${r.y}</div><div class="s">${esc(t(r.s))}</div><div class="d">${esc(t(r.d))}</div></div></div>`).join('')}</div>`;
}
function renderPlan() {
  const p = C.PRIORITIES.find(x => x.id === S.prio);
  const ticks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const rows = C.PRIORITIES.map(q => `<div class="g-row"><div class="g-name" data-p="${q.id}"><b>${q.id}</b>${esc(t(q.t))}</div><div class="track">
      <span class="seg-bar s1" style="left:0;width:calc(30% - 3px)" title="${esc(t(q.d30))}">${esc(t(q.d30))}</span>
      <span class="seg-bar s2" style="left:30%;width:calc(30% - 3px)" title="${esc(t(q.d60))}">${esc(t(q.d60))}</span>
      <span class="seg-bar s3" style="left:60%;width:40%" title="${esc(t(q.d100))}">${esc(t(q.d100))}</span></div></div>`).join('');
  const day = (lbl, v, txt) => `<div class="card"><span class="tag">${lbl}</span><div class="big">${v}</div><p>${esc(t(txt))}</p></div>`;
  $('#plan').innerHTML = `${secHead('03', S.lang === 'id' ? 'Rencana 100 hari (Module 11b)' : '100-day plan (Module 11b)')}
    <p class="sec-lead">${S.lang === 'id' ? 'Lima prioritas STP mengikuti target panitia: siapkan fasilitas → pilih tenant pertama → inkubasi dimulai, ditopang tata kelola, aset, showcase, dan data.' : 'Five STP priorities follow the programme target – prepare facilities → select first tenant → incubation begins – backed by governance, assets, showcase and data.'}</p>
    <div class="gantt reveal"><div class="gantt-wrap">
      <div class="axis">${ticks.map(d => `<span style="left:${d}%">${t(C.UI.day)} ${d}</span>`).join('')}</div>
      <div style="position:relative">${rows}
        <div class="grid-lines">${ticks.map(d => `<i style="left:${d}%"></i>`).join('')}${C.MILESTONES.map((m, i) => `<span class="mile" style="left:${m.d}%"><em style="top:${-22 - (i % 2) * 15}px">◆ ${esc(t(m.t))}</em></span>`).join('')}</div>
      </div></div></div>
    <div class="pdetail reveal">
      <div class="card meta"><span class="n">${p.id} · ${esc(t(C.UI.solves))} #${p.solves.join(', #')}</span><h3>${esc(t(p.t))}</h3>
        <dl><dt>${S.lang === 'id' ? 'Mengapa sekarang' : 'Why now'}</dt><dd>${esc(t(p.why))}</dd><dt>${esc(t(C.UI.owner))}</dt><dd>${esc(t(p.owner))}</dd></dl>
        <div class="chips">${Object.keys(C.QW).map(k => `<span class="chip ${p.qw.includes(k) ? 'on' : ''}">${esc(t(C.QW[k]))}</span>`).join('')}</div></div>
      <div class="days">${day(t(C.UI.day) + ' 30', 'D30', p.d30)}${day(t(C.UI.day) + ' 60', 'D60', p.d60)}${day(t(C.UI.day) + ' 100', 'D100', p.d100)}</div>
    </div>`;
  $('#plan').querySelectorAll('.g-name').forEach(el => el.addEventListener('click', () => { S.prio = el.dataset.p; renderPlan(); renderStrip(); }));
  reveal();
}
function table(def) {
  return `<div class="table-wrap"><table><thead><tr>${def.head.map(h => `<th>${esc(t(h))}</th>`).join('')}</tr></thead><tbody>${def.rows.map(r => `<tr>${r.map(c => `<td>${esc(t(c))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function renderFramework() {
  const tabs = [{ id: 'qw', t: { en: 'Quick-win selection', id: 'Seleksi quick win' } }, ...C.FRAME_TABS];
  let body = '';
  if (S.ftab === 'qw') {
    const keys = Object.keys(C.QW);
    body = `<div class="table-wrap qw"><table><thead><tr><th>${S.lang === 'id' ? 'Prioritas' : 'Priority'}</th>${keys.map(k => `<th>${esc(t(C.QW[k]))}</th>`).join('')}</tr></thead><tbody>
      ${C.PRIORITIES.map(p => `<tr><td>${p.id} · ${esc(t(p.t))}</td>${keys.map(k => `<td>${p.qw.includes(k) ? '<span class="yes">✓</span>' : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <div class="grid g2" style="margin-top:12px">${C.MILESTONES.slice(0, 2).map(m => `<div class="card"><span class="tag">${esc(t(C.UI.quickWin))} · ${t(C.UI.day)} ${m.d}</span><h3 style="margin-top:6px">${esc(t(m.t))}</h3>
        <p>${m.d === 85 ? (S.lang === 'id' ? 'Showcase 10 teknologi terbaik ITS kepada 20 perusahaan di GRIT, dilanjutkan tur kawasan STP dan penandatanganan MoU/NDA.' : 'Showcase of ITS’s top 10 technologies to 20 companies at GRIT, followed by an STP site tour and MoU/NDA signing.') : (S.lang === 'id' ? 'Uji coba kendaraan listrik dan otomotif bersama mitra di sirkuit, sekaligus meluncurkan tarif dan SOP layanan sirkuit.' : 'EV and automotive trials with partners on the circuit, launching the circuit tariff and service SOP.')}</p></div>`).join('')}</div>`;
  } else if (S.ftab === 'gov') body = table(C.GOV);
  else if (S.ftab === 'res') body = table(C.RES);
  else if (S.ftab === 'risk') body = table(C.RISK);
  else body = `<ol class="policy">${C.POLICY.map(x => `<li>${esc(t(x))}</li>`).join('')}</ol>`;
  $('#framework').innerHTML = `${secHead('04', S.lang === 'id' ? 'Quick win, tata kelola, sumber daya, risiko & kebijakan (Module 11c–g)' : 'Quick wins, governance, resources, risks & policy (Module 11c–g)')}
    <div class="ftabs" role="tablist">${tabs.map(x => `<button role="tab" type="button" data-f="${x.id}" aria-selected="${x.id === S.ftab}">${esc(t(x.t))}</button>`).join('')}</div>${body}`;
  $('#framework').querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { S.ftab = b.dataset.f; renderFramework(); }));
}
function renderShowcase() {
  const sc = C.SHOWCASE, om = C.OPMODEL;
  $('#showcase').innerHTML = `${secHead('05', S.lang === 'id' ? 'Showcase (Module 6) & model operasi (Module 10)' : 'Showcase (Module 6) & operating model (Module 10)')}
    <p class="sec-lead">${esc(t(sc.lead))}</p>
    <div class="flow">${sc.visit.map((v, i) => `<div class="card reveal"><div class="step">0${i + 1}</div><h3>${esc(t(v.h))}</h3><p>${esc(t(v.d))}</p></div>`).join('')}</div>
    <div class="pathway reveal">${sc.path.map(p => `<span>${esc(t(p))}</span>`).join('')}</div>
    <div class="grid g4 kpi">${sc.kpi.map(k => `<div class="card reveal"><div class="v">${k.v}</div><p>${esc(t(k.t))}</p></div>`).join('')}</div>
    <p class="sec-lead" style="margin-top:36px">${esc(t(om.lead))}</p>
    <div class="grid g3 layers" style="margin-bottom:12px">${om.layers.map(l => `<div class="card reveal"><h3>${esc(t(l.h))}</h3><p>${esc(t(l.d))}</p></div>`).join('')}</div>
    <div class="table-wrap"><table><thead><tr>${om.head.map(h => `<th>${esc(t(h))}</th>`).join('')}</tr></thead><tbody>
      ${om.rows.map(r => `<tr><td>${esc(t(r[0]))}</td><td><span class="mode-tag ${r[1].split(' ')[0]}">${esc(r[1])}</span></td><td>${esc(t(r[2]))}</td></tr>`).join('')}</tbody></table></div>`;
}
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
function renderFuture() {
  const f = C.FUTURE;
  $('#future').innerHTML = `${secHead('06', S.lang === 'id' ? 'Infrastruktur masa depan: Eco AI Data Center Living Lab' : 'Future infrastructure: Eco AI Data Center Living Lab')}
    <p class="sec-lead">${esc(t(f.lead))}</p>
    <div class="future-grid">
      <div><div class="eco reveal">${ecoSvg()}</div>
        <ul class="gates">${f.gates.map((g, i) => `<li><b>G${i + 1}</b>${esc(t(g))}</li>`).join('')}</ul></div>
      <div class="parts">${f.parts.map(p => `<div class="card reveal"><div class="ic">${icon(p.k)}</div><div><h3>${esc(t(p.h))}</h3><p>${esc(t(p.d))}</p></div></div>`).join('')}</div>
    </div>
    <div class="card digital reveal"><span class="tag">${S.lang === 'id' ? 'Kanal digital' : 'Digital channels'}</span><p style="margin-top:6px">${esc(t(f.digital))}</p></div>`;
}
function renderFooter() {
  $('#foot').innerHTML = `<p>${esc(t(C.UI.footerTeam))}</p><small>${esc(t(C.UI.footerNote))}</small>
    <p style="margin-top:12px"><b>${esc(t(C.UI.sources))}</b></p><ul>${C.SOURCES.map(s => `<li>${esc(t(s))}</li>`).join('')}</ul>`;
}

/* ---------------- behaviour ---------------- */
let io;
function reveal() {
  if (!('IntersectionObserver' in window)) { document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')); return; }
  io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.in)').forEach(e => io.observe(e));
}
function scrollSpy() {
  const secs = C.NAV.map(n => document.getElementById(n.id)).filter(Boolean);
  const set = id => document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('is-active', a.dataset.sec === id));
  const ob = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) set(e.target.id); }); }, { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => ob.observe(s)); set('top');
}
function clock() {
  const d = new Date(), loc = S.lang === 'id' ? 'id-ID' : 'en-GB';
  $('#clock').innerHTML = `${d.toLocaleDateString(loc, { day: '2-digit', month: 'short', year: 'numeric' })}<br>${d.toLocaleTimeString(loc, { hour12: false })}`;
}
function renderAll() {
  renderStatic(); renderPanel(); renderStrip(); renderDiagnosis(); renderRoadmap(); renderPlan(); renderFramework(); renderShowcase(); renderFuture(); renderFooter();
  if (map) map.relabel(id => t(SHORT[id]), captions()); else if (fallbackOn) renderFallback($('#map'), LAYOUT);
  reveal(); scrollSpy(); clock();
}

document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => { S.lang = b.dataset.lang; store.set('stp-lang', S.lang); renderAll(); }));
document.querySelectorAll('#modeSeg button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
document.querySelectorAll('#tabs button').forEach(b => b.addEventListener('click', () => { S.tab = b.dataset.tab; renderPanel(); }));
$('#resetBtn').addEventListener('click', () => selectSite('stp'));

renderAll();
setInterval(clock, 1000);
initMap();
