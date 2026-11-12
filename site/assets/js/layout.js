/* Schematic layout of STP ITS, traced from Google Earth (Sukolilo campus).
   Units ≈ 4 m. x = east (right), z = south (down on the plan). Top of the plan = the circuit / residential edge. */
export const LAYOUT = {
  ground: { x: -20, z: -15, w: 230, d: 170 },
  stpZone: { x0: -84, x1: 4, z0: -76, z1: 42 },
  key: [
    { id: 'circuit', track: true, anchor: { x: -38, z: -64 } },
    { id: 'creative', parts: [
      { x: -26, z: -42, w: 16, d: 5, h: 8 }, { x: -33, z: -35, w: 5, d: 11, h: 8 }, { x: -19, z: -35, w: 5, d: 11, h: 8 }] },
    { id: 'ict', parts: [{ x: -66, z: -26, w: 9, d: 9, h: 9, glass: true }] },
    { id: 'labs', parts: [
      { x: -38, z: 8, w: 24, d: 14, h: 6, hangar: true }, { x: -44, z: -10, w: 8, d: 12, h: 5 }, { x: -32, z: -12, w: 9, d: 6, h: 4 }, { x: -18, z: -18, w: 12, d: 7, h: 4, hangar: true }] },
    { id: 'maritime', parts: [{ x: -6, z: -44, w: 12, d: 9, h: 6, hangar: true }, { x: 0, z: -34, w: 10, d: 6, h: 7 }] },
    { id: 'auto', parts: [{ x: -58, z: 30, w: 16, d: 10, h: 6 }, { x: -48, z: 37, w: 3, d: 3, h: 2 }] },
    { id: 'rc', rcTower: { x: 40, z: 2 } },
    { id: 'ilbi', parts: [
      { x: 22, z: 30, w: 18, d: 5, h: 6, roof: 'tile' }, { x: 22, z: 44, w: 18, d: 5, h: 6, roof: 'tile' },
      { x: 15, z: 37, w: 5, d: 9, h: 6, roof: 'tile' }, { x: 29, z: 37, w: 5, d: 9, h: 6, roof: 'tile' }] },
    { id: 'ecodc', future: true, solar: { x: -100, z: 18, cols: 8, rows: 4 }, parts: [{ x: -100, z: 2, w: 12, d: 9, h: 5 }] },
    { id: 'cleanroom', ghost: true, parts: [{ x: -58, z: -6, w: 12, d: 9, h: 6 }] },
  ],
  /* landmark context buildings (not interactive) */
  context: [
    // Faculty of Marine Technology – long orange roofs (north-east)
    { x: 30, z: -58, w: 44, d: 7, h: 6, roof: 'tile', ry: -0.5 }, { x: 46, z: -46, w: 30, d: 12, h: 7, roof: 'tile', ry: -0.5 }, { x: 18, z: -44, w: 14, d: 8, h: 5, roof: 'tile' },
    // Informatics (U-shape, red roof)
    { x: 22, z: -14, w: 18, d: 5, h: 6, roof: 'red' }, { x: 15, z: -6, w: 5, d: 12, h: 6, roof: 'red' }, { x: 31, z: -6, w: 5, d: 12, h: 6, roof: 'red', ry: 0.3 },
    // Grha Dewaruci (red roofs + plaza) south
    { x: -2, z: 26, w: 18, d: 6, h: 7, roof: 'red', ry: 0.25 }, { x: -12, z: 36, w: 7, d: 12, h: 6, roof: 'red' }, { x: 6, z: 36, w: 10, d: 6, h: 5 },
    // Library & east campus
    { x: 66, z: -12, w: 12, d: 12, h: 7, roof: 'tile' }, { x: 62, z: 20, w: 9, d: 9, h: 8, roof: 'tile' }, { x: 54, z: 34, w: 22, d: 10, h: 5 }, { x: 46, z: 50, w: 14, d: 6, h: 5, roof: 'tile' },
    { x: 58, z: -30, w: 16, d: 6, h: 5, roof: 'tile' }, { x: 74, z: 6, w: 10, d: 16, h: 6, roof: 'tile' },
  ],
  roads: [
    { x: 6, z: -8, w: 5, d: 110, ry: 0.18 },      // main campus boulevard (diagonal)
    { x: -40, z: -48, w: 60, d: 3 },              // road along the circuit
    { x: -30, z: 22, w: 54, d: 3, ry: -0.12 },    // south road to Grha
    { x: -26, z: -26, w: 3, d: 30, ry: 0.5 },     // radial roads inside the arc
    { x: -12, z: -2, w: 34, d: 3, ry: -0.25 },
    { x: 30, z: 14, w: 50, d: 3 },
  ],
  arcs: [{ x: -34, z: -4, r: 40, a0: 1.75, a1: 4.6, w: 3.4 }],   // the big curved STP road (opens to the east)
  roundabouts: [{ x: -40, z: 44, r: 3.5 }, { x: -8, z: 30, r: 5, plaza: true }],
  water: [{ x: -114, z: -40, w: 18, d: 16 }, { x: -116, z: -16, w: 16, d: 20 }, { x: -96, z: -52, w: 14, d: 10 }],
  green: [{ x: -104, z: -10, w: 44, d: 110 }, { x: -76, z: 50, w: 30, d: 22 }],
  residential: { x0: -125, x1: 85, z0: -95, z1: -78 },
  track: [[-64, -52], [-70, -59], [-65, -67], [-50, -71], [-32, -71], [-16, -69], [-6, -64], [-9, -57], [-18, -60], [-26, -58], [-23, -52], [-13, -51], [-15, -47], [-30, -47], [-48, -49]],
  loop: { x: -80, z: -58, r: 6 },
};

export function webglAvailable() {
  try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); }
  catch { return false; }
}
