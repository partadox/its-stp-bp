/* STP ITS Blueprint – bilingual content (EN default, ID).
   All positions follow OTK ITS 2024 (Bidang IV); no personal names are used. */

export const UI = {
  title: { en: 'STP ITS Blueprint', id: 'Blueprint STP ITS' },
  tagline: { en: 'Diagnose · Plan · Activate', id: 'Diagnosis · Rencana · Aktivasi' },
  planChip: { en: '100-Day Plan', id: 'Rencana 100 Hari' },
  modeNow: { en: 'Now', id: 'Kini' },
  modeD100: { en: 'Day 100', id: 'Hari 100' },
  mode2030: { en: '2030', id: '2030' },
  hint: { en: 'Drag to rotate · Right-drag to pan · Scroll to zoom · Click a building', id: 'Geser untuk memutar · Klik kanan untuk menggeser · Scroll untuk zoom · Klik gedung' },
  noWebgl: { en: '3D view unavailable – showing the 2D site plan instead.', id: 'Tampilan 3D tidak tersedia – menampilkan denah 2D.' },
  tabOverview: { en: 'Overview', id: 'Ringkasan' },
  tabNow: { en: 'Now', id: 'Kini' },
  tabD100: { en: 'Day 100', id: 'Hari 100' },
  tab2030: { en: '2030', id: '2030' },
  priorities: { en: '100-day priorities', id: 'Prioritas 100 hari' },
  resetView: { en: 'Reset view', id: 'Atur ulang' },
  view3d: { en: '3D', id: '3D' },
  view2d: { en: '2D map', id: 'Peta 2D' },
  viewGif: { en: 'Profile', id: 'Profil' },
  videosBtn: { en: 'Videos', id: 'Video' },
  openYoutube: { en: 'Open on YouTube', id: 'Buka di YouTube' },
  gifCaption: { en: 'DIKST ITS profile video', id: 'Video profil DIKST ITS' },
  layerSat: { en: 'Satellite', id: 'Satelit' },
  layerStreet: { en: 'Street map', id: 'Peta jalan' },
  legendIssue: { en: 'Issue', id: 'Masalah' },
  legendActive: { en: 'Operating', id: 'Beroperasi' },
  legendMature: { en: 'Mature', id: 'Matang' },
  legendPlan: { en: 'Planned', id: 'Rencana' },
  owner: { en: 'Owner', id: 'Penanggung jawab' },
  solves: { en: 'Solves', id: 'Menjawab' },
  day: { en: 'Day', id: 'Hari' },
  quickWin: { en: 'Quick win', id: 'Quick win' },
  footerTeam: { en: 'Prepared by the Science Techno Park (STP) team · UTM–ITS STELLAR 2026 · Guided Co-working Session', id: 'Disusun oleh tim Science Techno Park (STP) · UTM–ITS STELLAR 2026 · Guided Co-working Session' },
  footerNote: { en: 'Map is a stylised schematic based on aerial footage, not a survey drawing. Targets are proposals for discussion.', id: 'Peta adalah skema yang disederhanakan dari foto udara, bukan gambar survei. Target adalah usulan untuk didiskusikan.' },
  sources: { en: 'Sources', id: 'Sumber' },
};

export const NAV = [
  { id: 'top', icon: 'map', label: { en: 'Site map', id: 'Peta kawasan' } },
  { id: 'diagnosis', icon: 'alert', label: { en: 'Diagnosis', id: 'Diagnosis' } },
  { id: 'roadmap', icon: 'route', label: { en: 'Roadmap', id: 'Roadmap' } },
  { id: 'plan', icon: 'calendar', label: { en: '100-day plan', id: 'Rencana 100 hari' } },
  { id: 'framework', icon: 'layers', label: { en: 'Governance & risk', id: 'Tata kelola & risiko' } },
  { id: 'showcase', icon: 'gallery', label: { en: 'Showcase & operating model', id: 'Showcase & model operasi' } },
  { id: 'future', icon: 'bolt', label: { en: 'Future infrastructure', id: 'Infrastruktur masa depan' } },
];

/* ---------- Site map: buildings & status per mode ---------- */
// status: issue | active | mature | plan | hidden
export const SITES = {
  stp: {
    name: { en: 'Science Techno Park ITS', id: 'Science Techno Park ITS' },
    kind: { en: 'Area overview', id: 'Ringkasan kawasan' },
    overview: {
      en: 'STP ITS sits under the Directorate of Innovation and Science & Technology Park (DIKST). It brings together the Technology Transfer Office (TTO), the Incubator & Innovative Business Services (ILBI) and four innovation clusters – Automotive, ICT & Robotics, Maritime and Creative Industry – each backed by Centres of Excellence (PUI). Its buildings and equipment were delivered through the HETI–ADB project.',
      id: 'STP ITS berada di bawah Direktorat Inovasi dan Kawasan Sains Teknologi (DIKST). Isinya Kantor Transfer Teknologi (TTO), Inkubator dan Layanan Bisnis Inovatif (ILBI), serta empat klaster inovasi – Otomotif, TIK & Robotika, Kemaritiman, dan Industri Kreatif – yang didukung Pusat Unggulan Iptek (PUI). Gedung dan peralatannya dibangun lewat proyek HETI–ADB.' },
    facts: [
      { en: 'Rector Regulation No. 22/2026 on Science & Technology Park governance', id: 'Peraturan Rektor No. 22/2026 tentang Tata Kelola Kawasan Sains dan Teknologi' },
      { en: '4 clusters · 10+ PUI · HETI–ADB buildings', id: '4 klaster · 10+ PUI · gedung HETI–ADB' },
      { en: '126 ILBI tenants (SIPENSI) · 130+ start-ups funded', id: '126 tenant ILBI (SIPENSI) · 130+ startup didanai' },
    ],
    now: { en: 'Hardware and regulation exist; the operating “software” – people, decision rights, systems and follow-up – is missing.', id: 'Gedung dan regulasi sudah ada; “software” operasionalnya – orang, kewenangan, sistem, dan tindak lanjut – belum ada.' },
    d100: { en: 'A dedicated STP operating unit runs facilities, tenants, showcase and data, with clear asset roles and the first incubation cohort.', id: 'Unit operasional STP yang dedicated mengelola fasilitas, tenant, showcase, dan data, dengan pembagian aset yang jelas dan kohort inkubasi pertama.' },
    y2030: { en: 'A self-sustaining park: revenue from services and tenants, licensed IP, growing start-ups and an eco AI data-centre living lab.', id: 'Kawasan yang mandiri: pendapatan dari layanan dan tenant, HKI terlisensi, startup tumbuh, dan living lab data center AI ramah lingkungan.' },
    status: { now: 'issue', d100: 'active', y2030: 'mature' },
  },
  circuit: {
    name: { en: 'Test Circuit', id: 'Sirkuit Uji' },
    kind: { en: 'Automotive Cluster asset', id: 'Aset Klaster Otomotif' },
    overview: { en: 'Vehicle test track belonging to the Automotive Innovation Cluster (PUI Automotive Control Systems, EV conversion). It has already hosted events.', id: 'Lintasan uji kendaraan milik Klaster Inovasi Otomotif (PUI Sistem Kontrol Otomotif, konversi kendaraan listrik). Sudah pernah dipakai untuk event.' },
    now: { en: 'Unclear who manages maintenance, booking, safety and tariffs – the Asset Management Bureau (BMA) or STP/cluster. Use is ad hoc and income is not recorded.', id: 'Belum jelas siapa yang mengelola perawatan, booking, keselamatan, dan tarif – Biro Manajemen Aset (BMA) atau STP/klaster. Pemakaian ad-hoc dan pendapatan tidak tercatat.' },
    d100: { en: '“BMA owns, STP operates”: an asset agreement, booking SOP, safety rules and a tariff card. First “Circuit Open Day” with EV and industry partners.', id: '“BMA pemilik, STP operator”: kesepakatan aset, SOP booking, aturan keselamatan, dan daftar tarif. “Sirkuit Open Day” pertama bersama mitra EV dan industri.' },
    y2030: { en: 'Regular revenue-generating test and event venue for EV research, competitions and industry homologation trials.', id: 'Venue uji dan event rutin yang menghasilkan pendapatan untuk riset EV, kompetisi, dan uji coba industri.' },
    status: { now: 'issue', d100: 'active', y2030: 'mature' },
  },
  auto: {
    name: { en: 'Automotive & Forensic Center', id: 'Automotive & Forensic Center' },
    kind: { en: 'Automotive Innovation Cluster', id: 'Klaster Inovasi Otomotif' },
    overview: { en: 'Green energy and electric-vehicle conversion; PUI Automotive Control Systems (home of the EVITS electric motorcycle).', id: 'Energi hijau dan konversi kendaraan listrik; PUI Sistem Kontrol Otomotif (asal motor listrik EVITS).' },
    now: { en: 'Building and track in place, managed by lecturers on top of teaching duties; few external users.', id: 'Gedung dan lintasan tersedia, dikelola dosen di sela tugas mengajar; pengguna eksternal masih sedikit.' },
    d100: { en: 'Facility booking open to tenants and industry; circuit services launched with the cluster.', id: 'Booking fasilitas terbuka untuk tenant dan industri; layanan sirkuit diluncurkan bersama klaster.' },
    y2030: { en: 'Teaching factory and EV testing services with industry partners.', id: 'Teaching factory dan layanan uji EV bersama mitra industri.' },
    status: { now: 'issue', d100: 'active', y2030: 'mature' },
  },
  ict: {
    name: { en: 'ICT & Robotics Center (Pusat Robotika)', id: 'ICT & Robotics Center (Pusat Robotika)' },
    kind: { en: 'ICT & Robotics Innovation Cluster', id: 'Klaster Inovasi TIK & Robotika' },
    overview: { en: 'IoT, AI and big-data solutions; PUI Mechatronics & Industrial Automation, PUI AI for Healthcare & Society, PUI Smart & Resilient Infrastructure.', id: 'Solusi IoT, AI, dan big data; PUI Mekatronika & Otomasi Industri, PUI AI for Healthcare & Society, PUI Smart & Resilient Infrastructure.' },
    now: { en: 'Modern glass building; space use and tenant services are not tracked.', id: 'Gedung kaca modern; pemakaian ruang dan layanan tenant belum tercatat.' },
    d100: { en: 'Co-working and lab slots offered to the first incubation cohort.', id: 'Co-working dan slot lab ditawarkan ke kohort inkubasi pertama.' },
    y2030: { en: 'AI and digital tenants linked to the eco AI data-centre living lab.', id: 'Tenant AI dan digital terhubung ke living lab data center AI ramah lingkungan.' },
    status: { now: 'issue', d100: 'active', y2030: 'mature' },
  },
  creative: {
    name: { en: 'Creative Center', id: 'Creative Center' },
    kind: { en: 'Creative Industry Innovation Cluster · home of ILBI', id: 'Klaster Inovasi Industri Kreatif · lokasi ILBI' },
    overview: { en: 'Art meets technology: product, industrial and interior design; PUI Creative Design.', id: 'Seni bertemu teknologi: desain produk, industri, dan interior; PUI Desain Kreatif.' },
    now: { en: 'Three-storey facility with studios; no tenancy or booking system.', id: 'Fasilitas tiga lantai dengan studio; belum ada sistem tenancy atau booking.' },
    d100: { en: 'Studios and makerspace open for bookings; produces showcase and digital content.', id: 'Studio dan makerspace dibuka untuk booking; memproduksi konten showcase dan digital.' },
    y2030: { en: 'Creative-tech start-ups and design services for industry.', id: 'Startup kreatif-teknologi dan layanan desain untuk industri.' },
    status: { now: 'issue', d100: 'active', y2030: 'mature' },
  },
  maritime: {
    name: { en: 'Maritime Center', id: 'Maritime Center' },
    kind: { en: 'Maritime Innovation Cluster', id: 'Klaster Inovasi Kemaritiman' },
    overview: { en: 'Marine technology: PUI Ship Safety & Offshore Installations (KEKAL), Coastal Products, Sustainable Building Materials, Sustainable Bitumen.', id: 'Teknologi kelautan: PUI Keselamatan Kapal dan Instalasi Laut (KEKAL), Produk Pesisir, Sustainable Building Materials, Bitumen Berkelanjutan.' },
    now: { en: 'Workshop and lab building; collaboration depends on a few active lecturers.', id: 'Gedung workshop dan lab; kolaborasi bergantung pada segelintir dosen aktif.' },
    d100: { en: 'Partner pilot projects identified; cluster joins Industry Day.', id: 'Proyek pilot mitra teridentifikasi; klaster ikut Industry Day.' },
    y2030: { en: 'Maritime testbed services and spin-offs with shipbuilding partners.', id: 'Layanan testbed maritim dan spin-off bersama mitra galangan kapal.' },
    status: { now: 'issue', d100: 'active', y2030: 'mature' },
  },
  labs: {
    name: { en: 'Shared halls & labs', id: 'Hall & lab bersama' },
    kind: { en: 'Shared facilities inside the park ring road', id: 'Fasilitas bersama di dalam ring road kawasan' },
    overview: { en: 'Workshop halls and laboratories inside the curved park road – facilities that clusters and tenants can share.', id: 'Hall workshop dan laboratorium di dalam jalan melingkar kawasan – fasilitas yang bisa dipakai bersama klaster dan tenant.' },
    now: { en: 'No register of assets, no booking or technician schedule.', id: 'Belum ada register aset, booking, maupun jadwal teknisi.' },
    d100: { en: 'Asset register complete; online booking with access rules.', id: 'Register aset lengkap; booking online dengan aturan akses.' },
    y2030: { en: 'High-utilisation shared prototyping hub (SHARE model).', id: 'Hub prototipe bersama dengan utilisasi tinggi (model SHARE).' },
    status: { now: 'issue', d100: 'active', y2030: 'mature' },
  },
  rc: {
    name: { en: 'Research Center Tower · DIKST · TTO · GRIT', id: 'Gedung Research Center · DIKST · TTO · GRIT' },
    kind: { en: 'Directorate office, Technology Transfer Office & innovation gallery', id: 'Kantor direktorat, Kantor Transfer Teknologi & galeri inovasi' },
    overview: { en: 'The landmark Research Center tower houses the Directorate of Innovation & Science-Technology Park (DIKST, under Vice Rector IV), the Technology Transfer Office and GRIT (Galeri Riset dan Inovasi Teknologi) – opened 28 Dec 2021 with 27 innovations in transport, defence, maritime and health, plus VR. DIKST units: Administration & Finance, Cluster Managers, PUI, Senior Manager of the Incubator (ILBI) and Senior Manager of the TTO.', id: 'Gedung ikonik Research Center menjadi tempat Direktorat Inovasi dan Kawasan Sains Teknologi (DIKST, di bawah Wakil Rektor IV), Kantor Transfer Teknologi, dan GRIT (Galeri Riset dan Inovasi Teknologi) – diresmikan 28 Des 2021 dengan 27 inovasi bidang transportasi, pertahanan, maritim, dan kesehatan, plus VR. Unit DIKST: Tata Usaha & Keuangan, Manajer Klaster, PUI, Manajer Senior Inkubator (ILBI), dan Manajer Senior KTT.' },
    facts: [
      { en: 'DIKST + TTO + GRIT under one roof – but away from the park area', id: 'DIKST + TTO + GRIT dalam satu gedung – namun jauh dari kawasan STP' },
      { en: 'Manager posts filled by lecturers (OTK ITS 2024)', id: 'Jabatan manajer diisi dosen (OTK ITS 2024)' },
      { en: 'GRIT: 27 innovations · VR · opened 28 Dec 2021', id: 'GRIT: 27 inovasi · VR · diresmikan 28 Des 2021' },
    ],
    now: { en: 'STP is merged into DIKST with no dedicated operating unit; managers are lecturers with full teaching loads. The gallery works as a display: visits are not linked to the park, tenants or a follow-up process.', id: 'STP menyatu di DIKST tanpa unit operasional khusus; manajer adalah dosen dengan beban mengajar penuh. Galeri berfungsi sebagai pajangan: kunjungan belum terhubung ke kawasan, tenant, atau tindak lanjut.' },
    d100: { en: 'Rector decree for an STP Operating Unit with four professional staff. GRIT becomes the “Innovation Gateway”: curated by cluster, QR tech sheets, a visit route to the park and the ITS Technology Industry Day.', id: 'SK Rektor untuk Unit Pengelola STP dengan empat staf profesional. GRIT menjadi “Innovation Gateway”: dikurasi per klaster, tech sheet ber-QR, rute kunjungan ke kawasan, dan ITS Technology Industry Day.' },
    y2030: { en: 'Professional park management with performance KPIs; the gallery is the front door of the ecosystem where every visit produces qualified leads, pilots or licences.', id: 'Manajemen kawasan profesional dengan KPI kinerja; galeri menjadi pintu depan ekosistem, setiap kunjungan menghasilkan lead, pilot, atau lisensi.' },
    status: { now: 'issue', d100: 'active', y2030: 'mature' },
  },
  ilbi: {
    name: { en: 'ILBI – Incubator & Innovative Business Services', id: 'ILBI – Inkubator & Layanan Bisnis Inovatif' },
    kind: { en: 'Incubation · located in the Creative Center', id: 'Inkubasi · berlokasi di Creative Center' },
    overview: { en: 'Start-up incubation with business, finance and legal support. 126 tenants (SIPENSI); 42 selected in 2020, 15 ADB–HETI funded in 2024, 8 AIBI 2025 awards. Sources: students 46 %, lecturers 28 %, alumni 16 %, public 10 %.', id: 'Inkubasi startup dengan dukungan bisnis, keuangan, dan legal. 126 tenant (SIPENSI); 42 lolos seleksi 2020, 15 didanai ADB–HETI 2024, 8 penghargaan AIBI 2025. Asal: mahasiswa 46 %, dosen 28 %, alumni 16 %, umum 10 %.' },
    now: { en: 'Active programme, but tenants are not systematically placed in the park’s cluster buildings.', id: 'Program aktif, namun tenant belum ditempatkan secara sistematis di gedung klaster kawasan.' },
    d100: { en: 'First cohort selected by criteria and onboarded in the cluster buildings (≥ 5 tenants).', id: 'Kohort pertama dipilih berdasarkan kriteria dan masuk ke gedung klaster (≥ 5 tenant).' },
    y2030: { en: 'Graduated spin-offs become paying park tenants.', id: 'Spin-off yang lulus menjadi tenant kawasan yang membayar.' },
    status: { now: 'active', d100: 'active', y2030: 'mature' },
  },
  ecodc: {
    name: { en: 'Eco AI Data Center Living Lab', id: 'Eco AI Data Center Living Lab' },
    kind: { en: 'Future infrastructure (aspiration)', id: 'Infrastruktur masa depan (aspirasi)' },
    overview: { en: 'A small, modular AI data-centre testbed powered by solar PV and batteries, with low-water cooling and live PUE/WUE/CUE monitoring – a living lab for renewable energy, power electronics and AI research.', id: 'Testbed data center AI kecil dan modular bertenaga surya dan baterai, dengan pendinginan rendah air dan monitoring PUE/WUE/CUE real-time – living lab untuk riset energi terbarukan, elektronika daya, dan AI.' },
    now: { en: 'Not started – an aspiration.', id: 'Belum dimulai – masih aspirasi.' },
    d100: { en: 'Concept note, research groups and partners mapped, funding options identified. No capex before the gate.', id: 'Concept note, pemetaan kelompok riset dan mitra, opsi pendanaan teridentifikasi. Tanpa capex sebelum gate.' },
    y2030: { en: 'Pilot living lab operating; compute services for tenants cover running costs.', id: 'Living lab pilot beroperasi; layanan komputasi untuk tenant menutup biaya operasional.' },
    status: { now: 'hidden', d100: 'plan', y2030: 'mature' },
  },
  cleanroom: {
    name: { en: 'Semiconductor clean room', id: 'Clean room semikonduktor' },
    kind: { en: 'Planned – PARTNER / defer', id: 'Rencana – PARTNER / tunda' },
    overview: { en: 'A planned lab for semiconductor learning. Capital and maintenance costs are very high and demand is not yet proven.', id: 'Rencana lab pembelajaran semikonduktor. Biaya modal dan perawatan sangat tinggi dan permintaan belum terbukti.' },
    now: { en: 'Planned, not started.', id: 'Rencana, belum berjalan.' },
    d100: { en: 'Decision: PARTNER – secure access to an existing national or industry clean room; map users first.', id: 'Keputusan: PARTNER – akses clean room nasional atau industri yang sudah ada; petakan pengguna dulu.' },
    y2030: { en: 'Build only if usage and funding justify it (evidence gate).', id: 'Dibangun hanya jika pemakaian dan pendanaan membenarkan (gate berbasis bukti).' },
    status: { now: 'hidden', d100: 'plan', y2030: 'plan' },
  },
};

/* ---------- Diagnosis ---------- */
export const ISSUES = [
  { n: 1, p: 'P1', t: { en: 'STP is merged into DIKST', id: 'STP masih menyatu di DIKST' },
    i: { en: 'No owner for day-to-day park operations.', id: 'Tidak ada pemilik operasional harian kawasan.' },
    r: { en: 'Rector Regulation 22/2026 not yet translated into a unit and SOPs.', id: 'Perek 22/2026 belum diturunkan menjadi unit dan SOP.' } },
  { n: 2, p: 'P1', t: { en: 'Managers are lecturers', id: 'Pejabat STP adalah dosen' },
    i: { en: 'Slow, inconsistent tenant services; overloaded staff.', id: 'Layanan tenant lambat dan tidak konsisten; beban berlebih.' },
    r: { en: 'No dedicated professional staff (park, tenant, facility, data).', id: 'Tidak ada staf profesional dedicated (kawasan, tenant, fasilitas, data).' } },
  { n: 3, p: 'P2', t: { en: 'The circuit case', id: 'Kasus sirkuit' },
    i: { en: 'Ad-hoc use, safety and maintenance risk, unrecorded income.', id: 'Pemakaian ad-hoc, risiko keselamatan & perawatan, pendapatan tak tercatat.' },
    r: { en: 'Asset roles between BMA and STP/cluster are undefined.', id: 'Peran aset antara BMA dan STP/klaster belum ditetapkan.' } },
  { n: 4, p: 'P5', t: { en: '“Same faces again”', id: '“Lu lagi, lu lagi”' },
    i: { en: 'Few contributors, burnout risk, narrow ecosystem.', id: 'Kontributor sedikit, risiko burnout, ekosistem sempit.' },
    r: { en: 'No incentives or open pathway for new contributors.', id: 'Tidak ada insentif atau jalur terbuka untuk kontributor baru.' } },
  { n: 5, p: 'P5', t: { en: 'Systems not in place', id: 'Sistem belum terbangun' },
    i: { en: 'No performance data; decisions by anecdote.', id: 'Tidak ada data kinerja; keputusan berdasar anekdot.' },
    r: { en: 'No booking, tenant register, lead CRM or KPI dashboard.', id: 'Belum ada booking, register tenant, CRM lead, atau dashboard KPI.' } },
  { n: 6, p: 'P4', t: { en: 'Gallery far from the park', id: 'Galeri terpisah dari kawasan' },
    i: { en: 'Industry visits do not reach clusters or tenants.', id: 'Kunjungan industri tidak sampai ke klaster atau tenant.' },
    r: { en: 'GRIT is run as a display, not as a pipeline entry point.', id: 'GRIT dikelola sebagai pajangan, bukan pintu masuk pipeline.' } },
  { n: 7, p: 'P4', t: { en: 'Weak digital channels', id: 'Kanal digital kurang menarik' },
    i: { en: 'Low visibility to industry, investors and tenants.', id: 'Visibilitas rendah bagi industri, investor, dan tenant.' },
    r: { en: 'No content strategy or channel owner for web and YouTube.', id: 'Tidak ada strategi konten atau pengelola kanal web dan YouTube.' } },
  { n: 8, p: 'P2', t: { en: 'Costly infrastructure plans', id: 'Rencana infrastruktur mahal' },
    i: { en: 'Clean room stalled by capex and maintenance cost.', id: 'Clean room tertahan oleh biaya modal dan perawatan.' },
    r: { en: 'Investments not screened by Build / Share / Partner.', id: 'Investasi belum disaring dengan Build / Share / Partner.' } },
];

export const DIAG_QUOTE = {
  en: 'The hardware (HETI–ADB buildings) and the rules (Rector Regulation 22/2026) are in place. What is missing is the software: people, decision rights, systems and follow-up.',
  id: 'Hardware (gedung HETI–ADB) dan aturan (Perek 22/2026) sudah ada. Yang belum ada adalah software-nya: orang, kewenangan, sistem, dan tindak lanjut.',
};
export const ORG_NOTE = {
  en: 'Evidence from OTK ITS 2024 (Bidang IV): there is no box for a park operating unit, and the cluster, incubator and TTO manager posts are marked “filled by lecturers”. The Asset Management Bureau (BMA) sits outside Bidang IV.',
  id: 'Bukti dari OTK ITS 2024 (Bidang IV): tidak ada kotak untuk unit pengelola kawasan, dan jabatan Manajer Klaster, Inkubator, serta TTO bertanda “diisi oleh dosen”. Biro Manajemen Aset (BMA) berada di luar Bidang IV.',
};
export const ORG = {
  root: { en: 'Rector ITS', id: 'Rektor ITS' },
  wr: { en: 'Vice Rector IV – Research, Innovation, Partnerships & Alumni', id: 'Wakil Rektor IV – Riset, Inovasi, Kerjasama dan Kealumnian' },
  cols: [
    { h: { en: 'Director of Research & Community Service', id: 'Direktur Riset dan Pengabdian kepada Masyarakat' }, dim: true },
    { h: { en: 'Director of Innovation & Science-Technology Park (DIKST)', id: 'Direktur Inovasi dan Kawasan Sains Teknologi (DIKST)' }, focus: true,
      items: [
        { t: { en: 'Head of Administration & Finance', id: 'Kepala Bagian Tata Usaha dan Keuangan' }, staff: true },
        { t: { en: 'Cluster Manager', id: 'Manajer Klaster' }, lect: true },
        { t: { en: 'PUI (Centres of Excellence)', id: 'PUI' } },
        { t: { en: 'Senior Manager, Incubator & Innovative Business Services', id: 'Manajer Senior Inkubator dan Layanan Bisnis Inovatif' }, lect: true },
        { t: { en: 'Senior Manager, Technology Transfer Office', id: 'Manajer Senior Kantor Transfer Teknologi' }, lect: true },
        { t: { en: 'STP operating unit – missing', id: 'Unit pengelola STP – belum ada' }, missing: true },
      ] },
    { h: { en: 'Head of Alumni Relations', id: 'Kepala Unit Hubungan Alumni' }, dim: true },
    { h: { en: 'Director of Partnerships & Business Management', id: 'Direktur Kerjasama dan Pengelolaan Usaha' }, dim: true },
  ],
  legendLect: { en: 'Filled by lecturers', id: 'Diisi oleh dosen' },
  legendStaff: { en: 'Filled by administrative staff', id: 'Diisi oleh tenaga kependidikan' },
};

/* ---------- Roadmap ---------- */
export const ROADMAP = [
  { y: '2018', s: { en: 'Initiation · 0–3 yrs', id: 'Inisiasi · 0–3 th' }, d: { en: 'Founding, basic labs, TTO and ILBI still separate', id: 'Pendirian, lab dasar, KTT dan ILBI masih terpisah' } },
  { y: '2020', s: { en: 'Incubation · 3–7 yrs', id: 'Inkubasi · 3–7 th' }, d: { en: 'DIKST formed: TTO + ILBI + 4 clusters + PUI', id: 'DIKST dibentuk: TTO + ILBI + 4 klaster + PUI' } },
  { y: '2026', s: { en: 'We are here', id: 'Posisi kita' }, d: { en: 'Rector Regulation 22/2026 · HETI–ADB buildings · this 100-day plan', id: 'Perek 22/2026 · gedung HETI–ADB · rencana 100 hari ini' }, here: true },
  { y: '2027', s: { en: 'Growth · 7–12 yrs', id: 'Pertumbuhan · 7–12 th' }, d: { en: 'Downstreaming: teaching factories, grants as projects, pilot products', id: 'Hilirisasi: teaching factory, hibah sebagai proyek, produk rintisan' } },
  { y: '2030', s: { en: 'Self-sustaining · 12–20 yrs', id: 'Mandiri · 12–20 th' }, d: { en: 'Teaching factory + start-ups at the core, flagship products, service businesses', id: 'Teaching factory + startup sebagai inti, produk unggulan, bisnis layanan' } },
  { y: '2045', s: { en: 'Revenue & impact', id: 'Pendapatan & dampak' }, d: { en: 'Knowledge-based economy and regional competitiveness', id: 'Ekonomi berbasis pengetahuan dan daya saing regional' } },
];

/* ---------- 100-day priorities (Module 11b) ---------- */
export const PRIORITIES = [
  { id: 'P1', site: 'rc', solves: [1, 2],
    t: { en: 'STP operating unit & dedicated staff', id: 'Unit pengelola STP & staf dedicated' },
    why: { en: 'Without an owner and professional staff no other priority can be delivered.', id: 'Tanpa pemilik dan staf profesional, prioritas lain tidak bisa berjalan.' },
    owner: { en: 'Director of DIKST · sponsor: Vice Rector IV', id: 'Direktur DIKST · sponsor: Wakil Rektor IV' },
    d30: { en: 'Draft Rector decree for an STP Operating Unit (from Regulation 22/2026); job descriptions for 4 posts', id: 'Draft SK Rektor Unit Pengelola STP (turunan Perek 22/2026); job description 4 posisi' },
    d60: { en: 'Assign or recruit a non-lecturer park manager, tenant, facility and data officers', id: 'Penugasan/rekrut park manager non-dosen, petugas tenant, fasilitas, dan data' },
    d100: { en: 'Unit operating; lecturers move to advisory roles in the clusters', id: 'Unit beroperasi; dosen beralih ke peran advisory di klaster' },
    qw: ['impact', 'policy'] },
  { id: 'P2', site: 'circuit', solves: [3, 8],
    t: { en: 'Asset clarity & future infrastructure', id: 'Kejelasan aset & infrastruktur masa depan' },
    why: { en: 'Idle or unmanaged assets cost money; unclear roles block revenue.', id: 'Aset yang menganggur atau tidak terkelola membebani biaya; peran tak jelas menghambat pendapatan.' },
    owner: { en: 'Director of DIKST + Head of BMA + Automotive Cluster Manager', id: 'Direktur DIKST + Kepala BMA + Manajer Klaster Otomotif' },
    d30: { en: 'Register of park assets (buildings, labs, circuit, equipment) and who manages each', id: 'Register aset kawasan (gedung, lab, sirkuit, peralatan) dan pengelolanya' },
    d60: { en: 'BMA–STP agreement: “BMA owns, STP operates”, tariff card and safety SOP', id: 'Kesepakatan BMA–STP: “BMA pemilik, STP operator”, daftar tarif, SOP keselamatan' },
    d100: { en: 'Circuit Open Day; concept note for the Eco AI Data Center Living Lab; clean room decision = PARTNER', id: 'Sirkuit Open Day; concept note Eco AI Data Center Living Lab; keputusan clean room = PARTNER' },
    qw: ['impact', 'visible', 'policy', 'revenue', 'partner'] },
  { id: 'P3', site: 'ilbi', solves: [5],
    t: { en: 'Tenant & incubation launch', id: 'Peluncuran tenant & inkubasi' },
    why: { en: 'Secure incubation space early to attract corporate partners and investors.', id: 'Amankan ruang inkubasi sejak awal untuk menarik mitra korporat dan investor.' },
    owner: { en: 'Senior Manager, Incubator & Innovative Business Services', id: 'Manajer Senior Inkubator dan Layanan Bisnis Inovatif' },
    d30: { en: 'Prepare facilities: spaces in the 4 cluster buildings; tenancy and incubation SOPs', id: 'Siapkan fasilitas: ruang di 4 gedung klaster; SOP tenancy dan inkubasi' },
    d60: { en: 'Select first tenants: open call, criteria-based selection', id: 'Pilih tenant pertama: open call, seleksi berbasis kriteria' },
    d100: { en: 'Incubation begins: ≥ 5 tenants onboarded with signed agreements', id: 'Inkubasi dimulai: ≥ 5 tenant onboarding dengan perjanjian ditandatangani' },
    qw: ['impact', 'visible', 'pipeline', 'revenue', 'partner'] },
  { id: 'P4', site: 'rc', solves: [6, 7],
    t: { en: 'GRIT innovation gateway & digital revamp', id: 'GRIT sebagai gateway inovasi & pembaruan digital' },
    why: { en: 'Visible early credibility; turns visits into pipeline.', id: 'Kredibilitas yang terlihat sejak awal; mengubah kunjungan menjadi pipeline.' },
    owner: { en: 'Gallery coordinator (STP unit) + Senior Manager, TTO', id: 'Koordinator galeri (unit STP) + Manajer Senior KTT' },
    d30: { en: 'Gallery mandate, exhibit register, IP / disclosure clearance form', id: 'Mandat galeri, register exhibit, form IP / disclosure clearance' },
    d60: { en: 'Re-curate by cluster, QR tech sheets, GRIT → STP visit route, new STP web & YouTube content calendar', id: 'Kurasi ulang per klaster, tech sheet ber-QR, rute GRIT → STP, web STP baru & kalender konten YouTube' },
    d100: { en: 'ITS Technology Industry Day: 10 technologies × 20 companies, MoU/NDA; every lead followed up ≤ 5 working days', id: 'ITS Technology Industry Day: 10 teknologi × 20 perusahaan, MoU/NDA; setiap lead ditindaklanjuti ≤ 5 hari kerja' },
    qw: ['impact', 'low', 'visible', 'pipeline', 'partner'] },
  { id: 'P5', site: 'labs', solves: [4, 5],
    t: { en: 'Operating system, KPIs & STP Fellows', id: 'Sistem operasi, KPI & STP Fellows' },
    why: { en: 'Data and new contributors make the park run beyond a few people.', id: 'Data dan kontributor baru membuat kawasan berjalan tidak hanya oleh segelintir orang.' },
    owner: { en: 'STP Operating Unit (data officer)', id: 'Unit Pengelola STP (petugas data)' },
    d30: { en: 'Choose tools: facility booking, tenant register, lead CRM', id: 'Pilih alat: booking fasilitas, register tenant, CRM lead' },
    d60: { en: 'KPI dashboard live; open call for “STP Fellows” with workload credit or honorarium', id: 'Dashboard KPI aktif; open call “STP Fellows” dengan kredit beban kerja atau honor' },
    d100: { en: 'First KPI report to Vice Rector IV; ≥ 10 new contributors beyond the usual names', id: 'Laporan KPI pertama ke Wakil Rektor IV; ≥ 10 kontributor baru di luar wajah lama' },
    qw: ['low', 'policy', 'pipeline'] },
];

export const QW = {
  impact: { en: 'High impact', id: 'High impact' },
  low: { en: 'Low dependency', id: 'Low dependency' },
  visible: { en: 'Visible', id: 'Visible' },
  policy: { en: 'Policy-enabling', id: 'Policy-enabling' },
  pipeline: { en: 'Pipeline-building', id: 'Pipeline-building' },
  revenue: { en: 'Revenue-enabling', id: 'Revenue-enabling' },
  partner: { en: 'Partner-backed', id: 'Partner-backed' },
};

export const MILESTONES = [
  { d: 70, t: { en: 'Circuit Open Day', id: 'Sirkuit Open Day' } },
  { d: 85, t: { en: 'ITS Technology Industry Day', id: 'ITS Technology Industry Day' } },
  { d: 100, t: { en: 'First cohort & KPI report', id: 'Kohort pertama & laporan KPI' } },
];

/* ---------- Module 11 c–g ---------- */
export const FRAME_TABS = [
  { id: 'gov', t: { en: 'Governance', id: 'Tata kelola' } },
  { id: 'res', t: { en: 'Resources', id: 'Sumber daya' } },
  { id: 'risk', t: { en: 'Risks', id: 'Risiko' } },
  { id: 'pol', t: { en: 'Policy handover', id: 'Serah terima kebijakan' } },
];
export const GOV = {
  head: [{ en: 'Workstream', id: 'Workstream' }, { en: 'Executive sponsor', id: 'Sponsor eksekutif' }, { en: 'Project lead', id: 'Pimpinan proyek' }, { en: 'Decision forum', id: 'Forum keputusan' }, { en: 'Reporting', id: 'Pelaporan' }],
  rows: [
    [{ en: 'STP governance & staffing', id: 'Tata kelola & SDM STP' }, { en: 'Vice Rector IV', id: 'Wakil Rektor IV' }, { en: 'Director of DIKST', id: 'Direktur DIKST' }, { en: 'Rector’s leadership meeting', id: 'Rapat pimpinan' }, { en: 'Monthly (100 days)', id: 'Bulanan (100 hari)' }],
    [{ en: 'Assets & infrastructure', id: 'Aset & infrastruktur' }, { en: 'Vice Rector IV + Vice Rector overseeing BMA', id: 'Wakil Rektor IV + Wakil Rektor pembina BMA' }, { en: 'Head of BMA + Park Manager + Automotive Cluster Manager', id: 'Kepala BMA + Park Manager + Manajer Klaster Otomotif' }, { en: 'Park Asset Committee', id: 'Komite Aset Kawasan' }, { en: 'Monthly', id: 'Bulanan' }],
    [{ en: 'Tenants & incubation', id: 'Tenant & inkubasi' }, { en: 'Director of DIKST', id: 'Direktur DIKST' }, { en: 'Senior Manager, ILBI', id: 'Manajer Senior ILBI' }, { en: 'Tenancy & Incubation Committee', id: 'Komite Tenancy & Inkubasi' }, { en: 'Monthly', id: 'Bulanan' }],
    [{ en: 'Showcase & industry engagement', id: 'Showcase & keterlibatan industri' }, { en: 'Director of DIKST', id: 'Direktur DIKST' }, { en: 'Gallery coordinator + Senior Manager, TTO', id: 'Koordinator galeri + Manajer Senior KTT' }, { en: 'Gallery Curation Committee', id: 'Komite Kurasi Galeri' }, { en: 'Per event + quarterly', id: 'Per event + kuartalan' }],
    [{ en: 'Data & KPIs', id: 'Data & KPI' }, { en: 'Director of DIKST', id: 'Direktur DIKST' }, { en: 'STP data officer', id: 'Petugas data STP' }, { en: 'DIKST performance review', id: 'Rapat evaluasi kinerja DIKST' }, { en: 'Quarterly', id: 'Kuartalan' }],
  ],
};
export const RES = {
  head: [{ en: 'Resource', id: 'Sumber daya' }, { en: 'Available', id: 'Tersedia' }, { en: 'Gap', id: 'Kesenjangan' }, { en: 'Action', id: 'Aksi' }],
  rows: [
    [{ en: 'People', id: 'SDM' }, { en: 'Lecturer-managers; DIKST admin staff', id: 'Dosen-manajer; staf TU DIKST' }, { en: 'No dedicated park professionals', id: 'Tidak ada profesional kawasan dedicated' }, { en: '4 posts (re-assign staff first) + STP Fellows', id: '4 posisi (penugasan staf dulu) + STP Fellows' }],
    [{ en: 'Operating budget', id: 'Anggaran operasional' }, { en: 'DIKST unit budget', id: 'Anggaran unit DIKST' }, { en: 'No line for facility running costs and events', id: 'Belum ada pos biaya operasional fasilitas & event' }, { en: 'Budget line + reinvest service income', id: 'Pos anggaran + reinvestasi pendapatan layanan' }],
    [{ en: 'Systems & data', id: 'Sistem & data' }, { en: 'Spreadsheets, SIPENSI', id: 'Spreadsheet, SIPENSI' }, { en: 'No booking, tenant register, CRM, dashboard', id: 'Belum ada booking, register tenant, CRM, dashboard' }, { en: 'Start low-code; integrate later', id: 'Mulai low-code; integrasi kemudian' }],
    [{ en: 'Facilities', id: 'Fasilitas' }, { en: '4 cluster buildings, circuit, GRIT', id: '4 gedung klaster, sirkuit, GRIT' }, { en: 'Under-used; no access rules', id: 'Kurang termanfaatkan; tanpa aturan akses' }, { en: 'SHARE first – no new building in 100 days', id: 'SHARE dulu – tanpa gedung baru dalam 100 hari' }],
    [{ en: 'Network', id: 'Jejaring' }, { en: 'Cluster partners, alumni, KSTI 2026 host role', id: 'Mitra klaster, alumni, tuan rumah KSTI 2026' }, { en: 'Leads not followed up', id: 'Lead tidak ditindaklanjuti' }, { en: 'Industry Day + CRM + 5-day follow-up rule', id: 'Industry Day + CRM + aturan tindak lanjut 5 hari' }],
    [{ en: 'Digital channels', id: 'Kanal digital' }, { en: 'STP website, DIKST YouTube', id: 'Web STP, YouTube DIKST' }, { en: 'Unattractive, irregular content', id: 'Kurang menarik, konten tidak rutin' }, { en: 'New web (this blueprint) + monthly content calendar', id: 'Web baru (blueprint ini) + kalender konten bulanan' }],
  ],
};
export const RISK = {
  head: [{ en: 'Risk', id: 'Risiko' }, { en: 'Mitigation', id: 'Mitigasi' }, { en: 'Owner', id: 'Pemilik' }],
  rows: [
    [{ en: 'Decree and staffing approved late', id: 'SK dan penugasan staf terlambat' }, { en: 'Derive directly from Regulation 22/2026; start with staff re-assignment', id: 'Turunkan langsung dari Perek 22/2026; mulai dengan penugasan staf' }, { en: 'Director of DIKST', id: 'Direktur DIKST' }],
    [{ en: 'BMA and STP disagree on the circuit', id: 'BMA dan STP tidak sepakat soal sirkuit' }, { en: 'Joint forum at vice-rector level; “BMA owns, STP operates” with income sharing', id: 'Forum bersama tingkat WR; “BMA pemilik, STP operator” dengan bagi hasil' }, { en: 'Vice Rector IV', id: 'Wakil Rektor IV' }],
    [{ en: 'Few first tenants', id: 'Tenant pertama sedikit' }, { en: 'Prioritise ILBI alumni (126 SIPENSI tenants) and cluster partners', id: 'Prioritaskan alumni ILBI (126 tenant SIPENSI) dan mitra klaster' }, { en: 'Senior Manager, ILBI', id: 'Manajer Senior ILBI' }],
    [{ en: 'Industry Day without follow-up', id: 'Industry Day tanpa tindak lanjut' }, { en: 'Lead CRM, named owner per lead, 5-working-day rule', id: 'CRM lead, pemilik per lead, aturan 5 hari kerja' }, { en: 'Senior Manager, TTO', id: 'Manajer Senior KTT' }],
    [{ en: 'Still the same few contributors', id: 'Kontributor tetap itu-itu saja' }, { en: 'Workload credit / honorarium; open STP Fellows call', id: 'Kredit beban kerja / honor; open call STP Fellows' }, { en: 'Director of DIKST', id: 'Direktur DIKST' }],
    [{ en: 'Costly infrastructure becomes a burden', id: 'Infrastruktur mahal jadi beban' }, { en: 'Evidence gates: concept → partners & funding → small pilot; clean room via PARTNER', id: 'Gate bukti: konsep → mitra & dana → pilot kecil; clean room via PARTNER' }, { en: 'Director of DIKST', id: 'Direktur DIKST' }],
  ],
};
export const POLICY = [
  { en: 'Rector decree: STP Operating Unit and job descriptions (derived from Regulation 22/2026)', id: 'SK Rektor: Unit Pengelola STP dan job description (turunan Perek 22/2026)' },
  { en: 'BMA–STP asset agreement incl. the circuit, tariff card and safety SOP', id: 'Kesepakatan aset BMA–STP termasuk sirkuit, daftar tarif, dan SOP keselamatan' },
  { en: 'Tenancy SOP: enquiry → application → screening → agreement → handover → monitoring → exit', id: 'SOP tenancy: enquiry → aplikasi → seleksi → perjanjian → serah terima → monitoring → exit' },
  { en: 'Incubation SOP: admission, milestones, graduation / exit', id: 'SOP inkubasi: admisi, milestone, kelulusan / exit' },
  { en: 'Gallery SOP: curation, exhibit loans, IP clearance, visits and lead follow-up', id: 'SOP galeri: kurasi, peminjaman exhibit, IP clearance, kunjungan, dan tindak lanjut lead' },
  { en: 'STP Fellows incentive policy', id: 'Kebijakan insentif STP Fellows' },
  { en: 'STP KPI framework and reporting cycle', id: 'Kerangka KPI STP dan siklus pelaporan' },
  { en: 'Concept note: Eco AI Data Center Living Lab + clean room investment decision', id: 'Concept note: Eco AI Data Center Living Lab + keputusan investasi clean room' },
];

/* ---------- Module 6 & 10 ---------- */
export const SHOWCASE = {
  lead: { en: 'Module 6: a showcase is a managed institutional platform, not a display room. GRIT becomes the front door that routes every visitor into the park.', id: 'Module 6: showcase adalah platform institusi yang dikelola, bukan ruang pajang. GRIT menjadi pintu depan yang mengarahkan setiap pengunjung ke kawasan.' },
  visit: [
    { h: { en: 'Before the visit', id: 'Sebelum kunjungan' }, d: { en: 'Online booking, visitor profile, objectives, matching exhibits', id: 'Booking online, profil pengunjung, tujuan, exhibit yang relevan' } },
    { h: { en: 'During the visit', id: 'Saat kunjungan' }, d: { en: 'GRIT tour by cluster → walk to STP buildings → meet the researcher', id: 'Tur GRIT per klaster → ke gedung STP → bertemu peneliti' } },
    { h: { en: 'After the visit', id: 'Setelah kunjungan' }, d: { en: 'Interest form via QR, lead in CRM, follow-up ≤ 5 working days', id: 'Form minat via QR, lead di CRM, tindak lanjut ≤ 5 hari kerja' } },
  ],
  path: [{ en: 'Discover', id: 'Discover' }, { en: 'Connect', id: 'Connect' }, { en: 'Qualify', id: 'Qualify' }, { en: 'Follow up', id: 'Follow up' }],
  kpi: [
    { v: '100%', t: { en: 'exhibits with verified info & IP clearance', id: 'exhibit dengan info terverifikasi & IP clearance' } },
    { v: '≤ 5', t: { en: 'working days to follow up a lead', id: 'hari kerja untuk menindaklanjuti lead' } },
    { v: '20', t: { en: 'companies at Industry Day', id: 'perusahaan di Industry Day' } },
    { v: '10', t: { en: 'MoU / NDA signed', id: 'MoU / NDA ditandatangani' } },
  ],
};
export const OPMODEL = {
  lead: { en: 'Module 10: a technology park is an operating system for innovation – pay for access to value, not necessarily ownership of equipment.', id: 'Module 10: technology park adalah sistem operasi inovasi – bayar akses ke nilai, tidak harus memiliki peralatan.' },
  head: [{ en: 'Facility / service', id: 'Fasilitas / layanan' }, { en: 'Mode', id: 'Mode' }, { en: 'Why', id: 'Alasan' }],
  rows: [
    [{ en: 'Co-working & incubation space in cluster buildings', id: 'Co-working & ruang inkubasi di gedung klaster' }, 'SHARE', { en: 'Space already exists (HETI–ADB); needs operation, not construction', id: 'Ruang sudah ada (HETI–ADB); perlu dioperasikan, bukan dibangun' }],
    [{ en: 'Test circuit & EV services', id: 'Sirkuit uji & layanan EV' }, 'SHARE', { en: 'BMA asset operated by STP with the Automotive Cluster', id: 'Aset BMA dioperasikan STP bersama Klaster Otomotif' }],
    [{ en: 'Incubation programme & mentoring', id: 'Program inkubasi & mentoring' }, 'BUILD', { en: 'Core mission; repeat demand from ILBI pipeline', id: 'Misi inti; permintaan rutin dari pipeline ILBI' }],
    [{ en: 'Testing & certification', id: 'Pengujian & sertifikasi' }, 'PARTNER', { en: 'Costly, infrequent; use accredited labs', id: 'Mahal dan jarang; pakai lab terakreditasi' }],
    [{ en: 'Semiconductor clean room', id: 'Clean room semikonduktor' }, 'PARTNER', { en: 'Very high capex and maintenance; access existing facilities first', id: 'Capex & perawatan sangat tinggi; akses fasilitas yang ada dulu' }],
    [{ en: 'Eco AI Data Center Living Lab', id: 'Eco AI Data Center Living Lab' }, 'BUILD (pilot)', { en: 'Distinctive research testbed; start small and modular after the evidence gate', id: 'Testbed riset yang khas; mulai kecil & modular setelah gate bukti' }],
  ],
  layers: [
    { h: { en: 'Physical', id: 'Fisik' }, d: { en: 'Cluster buildings, labs, circuit, gallery', id: 'Gedung klaster, lab, sirkuit, galeri' } },
    { h: { en: 'Services', id: 'Layanan' }, d: { en: 'Incubation, mentoring, IP via TTO, industry matching', id: 'Inkubasi, mentoring, HKI via TTO, matching industri' } },
    { h: { en: 'Operations', id: 'Operasi' }, d: { en: 'Booking, onboarding, contracts, safety, maintenance, KPIs', id: 'Booking, onboarding, kontrak, keselamatan, perawatan, KPI' } },
  ],
};

/* ---------- Future infrastructure ---------- */
export const FUTURE = {
  lead: { en: 'An aspiration, not a 100-day commitment: a small, modular AI data-centre living lab that proves renewable, low-water computing on campus – instead of starting with an expensive clean room.', id: 'Aspirasi, bukan komitmen 100 hari: living lab data center AI kecil dan modular untuk membuktikan komputasi terbarukan dan hemat air di kampus – bukan memulai dari clean room yang mahal.' },
  parts: [
    { k: 'pv', h: { en: 'Solar PV + battery', id: 'PV surya + baterai' }, d: { en: 'Rooftop / ground-mount solar with battery storage; grid as backup', id: 'Panel surya atap / tanah dengan baterai; jaringan PLN sebagai cadangan' } },
    { k: 'cool', h: { en: 'Low-water cooling', id: 'Pendinginan hemat air' }, d: { en: 'Direct-to-chip liquid or dry cooling, free cooling at night; no evaporative towers', id: 'Liquid cooling direct-to-chip atau dry cooling, free cooling malam hari; tanpa menara evaporatif' } },
    { k: 'gpu', h: { en: 'Modular GPU racks', id: 'Rak GPU modular' }, d: { en: 'Start with 1–2 racks for AI research and tenant compute services', id: 'Mulai 1–2 rak untuk riset AI dan layanan komputasi tenant' } },
    { k: 'mon', h: { en: 'Live metrics', id: 'Metrik real-time' }, d: { en: 'PUE, WUE and CUE dashboards as open data for research and teaching', id: 'Dashboard PUE, WUE, dan CUE sebagai data terbuka untuk riset dan pengajaran' } },
    { k: 'heat', h: { en: 'Heat reuse', id: 'Pemanfaatan panas' }, d: { en: 'Experiments on waste-heat reuse (e.g. drying, water heating)', id: 'Eksperimen pemanfaatan panas buang (mis. pengeringan, pemanas air)' } },
  ],
  gates: [
    { en: '≥ 3 research groups (energy, electrical, informatics) and 2 partners committed', id: '≥ 3 kelompok riset (energi, elektro, informatika) dan 2 mitra berkomitmen' },
    { en: 'Funding scheme secured (grant, partner co-funding or PPP)', id: 'Skema pendanaan aman (hibah, co-funding mitra, atau KPBU)' },
    { en: 'Service model shows compute income covering running costs', id: 'Model layanan menunjukkan pendapatan komputasi menutup biaya operasional' },
  ],
  digital: { en: 'Digital revamp: this blueprint doubles as a prototype for a new STP website – interactive map, live tenant directory, technology catalogue and a monthly YouTube series (“Inside the Clusters”, tenant stories, lab demos).', id: 'Pembaruan digital: blueprint ini sekaligus prototipe web STP baru – peta interaktif, direktori tenant, katalog teknologi, dan seri YouTube bulanan (“Inside the Clusters”, kisah tenant, demo lab).' },
};

export const SOURCES = [
  { en: 'DIKST ITS – “Pengenalan Science Techno Park (STP) ITS”, STELLAR briefing', id: 'DIKST ITS – “Pengenalan Science Techno Park (STP) ITS”, pembekalan STELLAR' },
  { en: 'OTK ITS 2024 – Bidang IV organisation chart', id: 'OTK ITS 2024 – struktur Bidang IV' },
  { en: 'Rector Regulation No. 22/2026 on Science & Technology Park governance', id: 'Peraturan Rektor No. 22/2026 tentang Tata Kelola Kawasan Sains dan Teknologi' },
  { en: 'DIKST ITS profile video; GRIT inauguration video (28 Dec 2021)', id: 'Video profil DIKST ITS; video peresmian GRIT (28 Des 2021)' },
  { en: 'UTM–ITS STELLAR 2026 Module 6 (Showcase) and Module 10 (Techno Park Operating Model)', id: 'UTM–ITS STELLAR 2026 Module 6 (Showcase) dan Module 10 (Model Operasi Techno Park)' },
];

/* Videos (floating dropdown → modal player). Add more entries here. */
export const VIDEOS = [
  { yt: 'wJPKQwYSAaE', t: { en: 'DIKST ITS profile', id: 'Profil DIKST ITS' }, d: { en: 'Units, clusters and the STP area', id: 'Unit, klaster, dan kawasan STP' } },
  { yt: 'VtaKhcIeEHw', t: { en: 'GRIT gallery inauguration', id: 'Peresmian galeri GRIT' }, d: { en: 'Galeri Riset dan Inovasi Teknologi, 28 Dec 2021', id: 'Galeri Riset dan Inovasi Teknologi, 28 Des 2021' } },
  { href: 'https://www.youtube.com/@DIKSTITS/videos', t: { en: 'DIKST ITS YouTube channel', id: 'Kanal YouTube DIKST ITS' }, d: { en: 'All videos – opens YouTube', id: 'Semua video – membuka YouTube' } },
];
