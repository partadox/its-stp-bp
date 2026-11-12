/* Schematic layout of STP ITS, traced from satellite imagery (north = up / −z).
   1 unit ≈ 5 px of the annotated satellite image (≈ 4 m). x = east, z = south.
   Only STP buildings are modelled, plus the Research Center tower (DIKST · TTO · GRIT). */
export const LAYOUT = {
  ground: { x: -17, z: -28, w: 300, d: 250 },
  stpZone: { x0: -122, x1: 82, z0: -106, z1: 42 },
  key: [
    // test circuit – elongated north–south on the east edge, roundabout loop at the top
    { id: 'circuit', track: true, anchor: { x: 62, z: -12 } },
    // Automotive & Forensic Center – long two-storey hall (north-west of the arc)
    { id: 'auto', parts: [
      { x: -68, z: -71, w: 22, d: 12, h: 7, ry: -0.12, bands: true },
      { x: -49, z: -76, w: 5, d: 5, h: 4 }] },
    // ICT & Robotics cluster – ITS Robotics Center (big hall), Robotics Community block and the blue ICT cube
    { id: 'ict', parts: [
      { x: -41, z: -52, w: 20, d: 23, h: 8, glassBand: true },
      { x: -21, z: -55, w: 18, d: 9, h: 6 },
      { x: -7, z: -56, w: 9, d: 8, h: 6 },
      { x: -10, z: -47, w: 8, d: 8, h: 4 },
      { x: 8, z: -66, w: 7, d: 7, h: 7, glass: true }] },
    // shared halls & workshops east of the gate
    { id: 'labs', parts: [
      { x: 7, z: -31, w: 17, d: 10, h: 6, ry: 0.35, hangar: true },
      { x: 9, z: -18, w: 14, d: 6, h: 4 }] },
    // Maritime cluster – workshop & laboratory group (south of the arc)
    { id: 'maritime', parts: [
      { x: 0, z: 10, w: 25, d: 6, h: 6, ry: 0.84, hangar: true },
      { x: 11, z: 14, w: 9, d: 5, h: 5, ry: 0.5 },
      { x: 24, z: 11, w: 7, d: 11, h: 6 },
      { x: 27, z: 1, w: 5, d: 6, h: 4 },
      { x: 12, z: 28, w: 16, d: 6, h: 5, ry: 0.3, hangar: true },
      { x: -10, z: 25, w: 8, d: 8, h: 5 }] },
    // Creative Center (ILBI is housed here) – north-west of the park
    { id: 'creative', parts: [{ x: -108, z: -103, w: 28, d: 10, h: 9, ry: 0.24, glassBand: true }, { x: -112, z: -95, w: 10, d: 5, h: 5, ry: 0.24 }] },
    { id: 'ilbi', parts: [{ x: -86, z: -109, w: 12, d: 8, h: 6, ry: 0.24, glassBand: true }] },
    // Research Center tower – DIKST, TTO and GRIT (south-west, main campus)
    { id: 'rc', rcTower: { x: -38, z: 74 } },
    // future (shown in Day 100 / 2030)
    // Big Project 1 – semiconductor & AI area inside the ICT & Robotics cluster (2030)
    { id: 'cleanroom', parts: [{ x: -14, z: -82, w: 13, d: 9, h: 6 }] },
    { id: 'ecodc', solar: { x: -1, z: -97, cols: 8, rows: 3 }, parts: [{ x: 6, z: -83, w: 11, d: 8, h: 5 }] },
    // Big Project 2 – STP Living Lab (open test zones west of the park, 2030)
    { id: 'livinglab', livingLab: { x: -96, z: 2, w: 34, d: 30 }, parts: [{ x: -96, z: -16, w: 10, d: 6, h: 4, glassBand: true }] },
  ],
  context: [],
  roads: [
    { x: -40, z: -146, w: 270, d: 6, ry: 0.24, main: true },   // Jl. Raya ITS (north)
    { x: -81, z: -58, w: 172, d: 4.4, ry: -0.81 },             // Jl. Teknik Kimia – from Jl. Raya ITS into the park gate
    { x: -26, z: 52, w: 3.6, d: 96 },                          // continues south to the Research Center
    { x: -71, z: 28, w: 112, d: 3, ry: 0.75 },                 // diagonal tree-lined road (SW)
    { x: 6, z: -50, w: 57, d: 3, ry: 0.71 },                   // radial road from the gate garden to the circuit
    { x: 22, z: -11, w: 57, d: 3 },                            // east road to the circuit
    { x: 4, z: 21, w: 61, d: 3 },                              // south road to the Maritime cluster
  ],
  arcs: [{ x: -40, z: -4, r: 77, a0: -1.05, a1: 0.38, w: 3.6 }],   // the curved STP ring road (east side)
  roundabouts: [{ x: -92, z: -69, r: 3.2 }, { x: -61, z: -36, r: 3.2 }],
  // arc garden at the STP gate (semicircle NE of Jl. Teknik Kimia)
  garden: { x: -30, z: -4, radii: [20, 14, 8], a0: -2.36, a1: 0.78 },
  gate: { x: -40, z: -15, ry: 0.76, span: 13 },
  water: [{ x: 54, z: 72, w: 25, d: 14 }, { x: -110, z: -48, w: 16, d: 12 }, { x: -92, z: -48, w: 12, d: 12 }],
  green: [{ x: -35, z: -92, w: 175, d: 22 }, { x: 103, z: 18, w: 42, d: 70 }, { x: -100, z: 20, w: 40, d: 60 }],
  residential: [{ x0: 84, x1: 132, z0: -125, z1: -18 }, { x0: -166, x1: 132, z0: -152, z1: -128, raya: true }],
  track: [[47, -72], [54, -72], [60, -60], [67, -36], [73, -12], [78, 12], [76, 28], [68, 38], [56, 38], [48, 33], [44, 24], [49, 16], [56, 22], [63, 20], [63, 11], [58, 4], [54, -6], [51, -24], [48, -44], [45, -59]],
  loop: { x: 44, z: -68, r: 6.4 },
  view: { target: [-34, 0, -50], pos: [-182, 172, -248], fallbackBox: '-168 -154 302 250' },
};

export function webglAvailable() {
  try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); }
  catch { return false; }
}
