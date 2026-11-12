/* Points shown on the 2D map (OpenStreetMap / satellite).
   Empty by default – add your own points here.

   Format of one point:
   {
     lat: -7.2790, lng: 112.7985,                        // coordinates (decimal degrees)
     site: 'circuit',                                     // optional: id from SITES in content.js – clicking opens that panel
     label: { en: 'Test Circuit', id: 'Sirkuit Uji' },    // text shown in the tooltip
     status: 'issue',                                     // optional: issue | active | mature | plan (marker colour)
   }

   Site ids: stp, circuit, auto, ict, creative, maritime, labs, rc, ilbi, ecodc, cleanroom
   Tip: in Google Maps, right-click a spot and click the coordinates to copy them. */
export const MAP2D = {
  center: [-7.2792, 112.7982], // ITS Sukolilo – STP area & circuit
  zoom: 17,
  points: [
    // { lat: -7.2790, lng: 112.7985, site: 'circuit', label: { en: 'Test Circuit', id: 'Sirkuit Uji' }, status: 'issue' },
  ],
};
