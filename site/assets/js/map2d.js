/* 2D map tab: Leaflet with OpenStreetMap and satellite base layers. Points come from map2d-points.js. */
import { MAP2D } from './map2d-points.js';

const COLORS = { issue: '#e8833a', active: '#0067ac', mature: '#2e9e6b', plan: '#7fa6c9' };
let loading = null;

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'assets/vendor/leaflet/leaflet.css'; document.head.appendChild(css);
    const s = document.createElement('script'); s.src = 'assets/vendor/leaflet/leaflet.js';
    s.onload = () => resolve(window.L); s.onerror = reject; document.head.appendChild(s);
  });
  return loading;
}

export async function createMap2D(el, { onSelect, labelText, layerNames }) {
  const L = await loadLeaflet();
  const map = L.map(el, { zoomControl: false, attributionControl: true }).setView(MAP2D.center, MAP2D.zoom);
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, attribution: 'Imagery &copy; Esri, Maxar, Earthstar Geographics',
  });
  satellite.addTo(map);
  const names = layerNames();
  let layers = L.control.layers({ [names.sat]: satellite, [names.street]: street }, null, { position: 'bottomright' }).addTo(map);

  const markers = MAP2D.points.map(p => {
    const m = L.circleMarker([p.lat, p.lng], { radius: 9, weight: 3, color: '#fff', fillColor: COLORS[p.status] || COLORS.active, fillOpacity: 1 });
    if (p.label) m.bindTooltip(labelText(p.label), { direction: 'top', offset: [0, -8], className: 'map2d-tip' });
    if (p.site) m.on('click', () => onSelect(p.site));
    return { m, p };
  });
  markers.forEach(({ m }) => m.addTo(map));

  return {
    show() { setTimeout(() => map.invalidateSize(), 30); },
    reset() { map.flyTo(MAP2D.center, MAP2D.zoom, { duration: 0.8 }); },
    relabel() {
      markers.forEach(({ m, p }) => p.label && m.setTooltipContent(labelText(p.label)));
      const n = layerNames(); layers.remove();
      layers = L.control.layers({ [n.sat]: satellite, [n.street]: street }, null, { position: 'bottomright' }).addTo(map);
    },
  };
}
