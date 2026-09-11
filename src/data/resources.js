export const initialResources = [
  {
    id: "RES-101",
    type: "Volunteer",
    name: "Aarav Sharma",
    phone: "+91 98765 43210",
    email: "aarav.sharma@example.com",
    location: "Patna, Bihar",
    district: "Patna",
    supportType: "Rescue Operations",
    availability: "Next 7 days",
    status: "Active",
    verified: true,
    joinedAt: "Today"
  },
  {
    id: "RES-102",
    type: "Volunteer",
    name: "Priya Kumari",
    phone: "+91 98231 45678",
    email: "priya.k@example.com",
    location: "Darbhanga Sadar, Bihar",
    district: "Darbhanga",
    supportType: "Medical Support",
    availability: "Today",
    status: "Active",
    verified: true,
    joinedAt: "Yesterday"
  },
  {
    id: "RES-103",
    type: "NGO",
    name: "Bihar Seva Relief Foundation",
    phone: "+91 612 2234567",
    email: "relief@biharseva.org",
    location: "Katihar Flood Relief HQ",
    district: "Katihar",
    supportType: "Food Distribution",
    availability: "Next 7 days",
    status: "Active",
    verified: true,
    joinedAt: "3 days ago"
  },
  {
    id: "RES-104",
    type: "Resource Provider",
    name: "Kosi Boat Operators Cooperative",
    phone: "+91 94310 99887",
    email: "kosiboats@gmail.com",
    location: "Birpur Ghat, Supaul",
    district: "Supaul",
    supportType: "Boats",
    availability: "Emergency Only",
    status: "Active",
    verified: true,
    joinedAt: "1 day ago"
  },
  {
    id: "RES-105",
    type: "NGO",
    name: "Red Cross Disaster Cell Bihar",
    phone: "+91 98112 33445",
    email: "disaster@redcrossbihar.org",
    location: "Madhubani Station Road",
    district: "Madhubani",
    supportType: "Medical Support",
    availability: "Today",
    status: "Active",
    verified: true,
    joinedAt: "5 days ago"
  }
];

export const mapFacilities = [
  // ── SUPAUL ──────────────────────────────────────────────────
  {
    id: "SH-1",
    type: "Shelter",
    name: "Supaul High School Relief Camp",
    district: "Supaul",
    coords: [26.11, 86.58],
    capacity: "800 persons",
    occupied: "420 persons",
    foodAvailable: "Yes (3 days)",
    contact: "+91 94318 11223",
    status: "Open"
  },
  {
    id: "TM-1",
    type: "Rescue Team",
    name: "NDRF 9th Battalion Alpha",
    district: "Supaul",
    coords: [26.14, 86.55],
    personnel: 24,
    equipment: "4 Inflatable Boats, Life Jackets, First Aid Kits",
    contact: "Control Room: 1078",
    status: "Deploying"
  },
  {
    id: "BT-1",
    type: "Boat",
    name: "NDRF Rescue Boat B-101",
    district: "Supaul",
    coords: [26.135, 86.61],
    capacity: "15 persons",
    speed: "22 km/h",
    nearestSOS: "JR-1024 (2.4 km)",
    status: "In Route"
  },

  // ── KATIHAR ─────────────────────────────────────────────────
  {
    id: "SH-2",
    type: "Shelter",
    name: "Katihar Community Hall Shelter",
    district: "Katihar",
    coords: [25.56, 87.55],
    capacity: "1,200 persons",
    occupied: "890 persons",
    foodAvailable: "Yes (2 days)",
    contact: "+91 94318 11224",
    status: "Open"
  },
  {
    id: "TM-2",
    type: "Rescue Team",
    name: "SDRF Bihar Quick Response Bravo",
    district: "Katihar",
    coords: [25.51, 87.61],
    personnel: 18,
    equipment: "3 Motorized Speed Rafts, Medical Tent",
    contact: "Control Room: 1070",
    status: "Active on Water"
  },
  {
    id: "MED-1",
    type: "Medical Center",
    name: "AIIMS Mobile Disaster Ward — Katihar",
    district: "Katihar",
    coords: [25.55, 87.58],
    doctors: 8,
    beds: 30,
    supplies: "Anti-snake venom, ORS, Water purification tablets, Antibiotics",
    contact: "+91 98350 44551",
    status: "Operational"
  },
  {
    id: "BT-2",
    type: "Boat",
    name: "Kosi Fishermen Community Ferry",
    district: "Katihar",
    coords: [25.535, 87.58],
    capacity: "25 persons",
    speed: "14 km/h",
    nearestSOS: "JR-1023 (1.1 km)",
    status: "Engaged"
  },

  // ── MADHUBANI ────────────────────────────────────────────────
  {
    id: "SH-3",
    type: "Shelter",
    name: "Madhubani Polytechnic Camp",
    district: "Madhubani",
    coords: [26.33, 86.05],
    capacity: "650 persons",
    occupied: "310 persons",
    foodAvailable: "Yes (4 days)",
    contact: "+91 94318 11225",
    status: "Open"
  },
  {
    id: "TM-3",
    type: "Rescue Team",
    name: "SDRF Flood Rescue Squad Delta",
    district: "Madhubani",
    coords: [26.37, 86.12],
    personnel: 16,
    equipment: "2 Inflatable Boats, Ropes & Winches",
    contact: "Base: 06276-222110",
    status: "Standby"
  },
  {
    id: "MED-2",
    type: "Medical Center",
    name: "Madhubani Emergency Trauma Camp",
    district: "Madhubani",
    coords: [26.34, 86.08],
    doctors: 5,
    beds: 15,
    supplies: "Emergency Surgical, IV Fluids, Pediatric care",
    contact: "+91 98350 44552",
    status: "Operational"
  },
  {
    id: "BT-3",
    type: "Boat",
    name: "Kamla River Rescue Boat K-07",
    district: "Madhubani",
    coords: [26.32, 86.06],
    capacity: "12 persons",
    speed: "18 km/h",
    nearestSOS: "JR-1022 (3.2 km)",
    status: "Standby"
  },

  // ── HAJIPUR / VAISHALI ───────────────────────────────────────
  {
    id: "SH-4",
    type: "Shelter",
    name: "Hajipur Relief Camp — Gandhi Maidan",
    district: "Vaishali",
    coords: [25.692, 85.208],
    capacity: "1,000 persons",
    occupied: "560 persons",
    foodAvailable: "Yes (3 days)",
    contact: "+91 94318 22301",
    status: "Open"
  },
  {
    id: "SH-5",
    type: "Shelter",
    name: "Lalganj Flood Shelter — District School",
    district: "Vaishali",
    coords: [25.665, 85.173],
    capacity: "500 persons",
    occupied: "280 persons",
    foodAvailable: "Yes (2 days)",
    contact: "+91 94318 22302",
    status: "Open"
  },
  {
    id: "TM-4",
    type: "Rescue Team",
    name: "SDRF Vaishali Squad — Gandak Unit",
    district: "Vaishali",
    coords: [25.685, 85.230],
    personnel: 20,
    equipment: "3 Motorized Boats, Ropes, Medical Kit",
    contact: "Control Room: 1070",
    status: "Active on Water"
  },
  {
    id: "TM-5",
    type: "Rescue Team",
    name: "NDRF 7th Battalion — Hajipur Cell",
    district: "Vaishali",
    coords: [25.710, 85.195],
    personnel: 22,
    equipment: "4 Inflatable Boats, Night Vision, Megaphones",
    contact: "Control Room: 1078",
    status: "Deploying"
  },
  {
    id: "MED-3",
    type: "Medical Center",
    name: "Vaishali District Trauma Unit",
    district: "Vaishali",
    coords: [25.700, 85.213],
    doctors: 6,
    beds: 25,
    supplies: "ORS, Anti-diarrheal, Wound care, Snake antivenom",
    contact: "+91 98350 44553",
    status: "Operational"
  },
  {
    id: "BT-4",
    type: "Boat",
    name: "Gandak River Rescue Boat G-01",
    district: "Vaishali",
    coords: [25.675, 85.193],
    capacity: "18 persons",
    speed: "20 km/h",
    nearestSOS: "JR-1025 (1.8 km)",
    status: "In Route"
  },
  {
    id: "BT-5",
    type: "Boat",
    name: "Gandak Patrol Boat G-02",
    district: "Vaishali",
    coords: [25.660, 85.240],
    capacity: "10 persons",
    speed: "25 km/h",
    nearestSOS: "JR-1026 (0.9 km)",
    status: "Engaged"
  },

  // ── PATNA ────────────────────────────────────────────────────
  {
    id: "SH-6",
    type: "Shelter",
    name: "Patna Exhibition Ground Relief Center",
    district: "Patna",
    coords: [25.607, 85.125],
    capacity: "3,000 persons",
    occupied: "1,850 persons",
    foodAvailable: "Yes (5 days)",
    contact: "+91 94318 33401",
    status: "Open"
  },
  {
    id: "TM-6",
    type: "Rescue Team",
    name: "NDRF 12th Bn — Patna Command",
    district: "Patna",
    coords: [25.620, 85.148],
    personnel: 30,
    equipment: "6 Speed Boats, Drone Unit, Medical Mobile Van",
    contact: "Control Room: 1078",
    status: "Active on Water"
  },
  {
    id: "MED-4",
    type: "Medical Center",
    name: "NMCH Patna Flood Emergency Ward",
    district: "Patna",
    coords: [25.612, 85.138],
    doctors: 15,
    beds: 80,
    supplies: "ICU ready, Surgical, Pediatric, Dialysis",
    contact: "+91 0612-2634000",
    status: "Operational"
  },
  {
    id: "BT-6",
    type: "Boat",
    name: "Ganga Patrol Boat PB-Patna-01",
    district: "Patna",
    coords: [25.630, 85.155],
    capacity: "20 persons",
    speed: "28 km/h",
    nearestSOS: "Monitoring Ganga embankment",
    status: "Patrolling"
  },

  // ── MUZAFFARPUR ──────────────────────────────────────────────
  {
    id: "SH-7",
    type: "Shelter",
    name: "Muzaffarpur Town Hall Flood Camp",
    district: "Muzaffarpur",
    coords: [26.125, 85.390],
    capacity: "900 persons",
    occupied: "640 persons",
    foodAvailable: "Yes (3 days)",
    contact: "+91 94318 44501",
    status: "Open"
  },
  {
    id: "TM-7",
    type: "Rescue Team",
    name: "SDRF Muzaffarpur Burhi Gandak Squad",
    district: "Muzaffarpur",
    coords: [26.115, 85.408],
    personnel: 18,
    equipment: "3 Boats, Life vests, Floodlight unit",
    contact: "Control Room: 1070",
    status: "Standby"
  },
  {
    id: "MED-5",
    type: "Medical Center",
    name: "SKMCH Mobile Disaster Clinic",
    district: "Muzaffarpur",
    coords: [26.120, 85.380],
    doctors: 7,
    beds: 40,
    supplies: "Encephalitis treatment, ORS, IV fluids, Paediatric",
    contact: "+91 0621-2213000",
    status: "Operational"
  },
  {
    id: "BT-7",
    type: "Boat",
    name: "Burhi Gandak Rescue Boat MZ-01",
    district: "Muzaffarpur",
    coords: [26.130, 85.400],
    capacity: "16 persons",
    speed: "19 km/h",
    nearestSOS: "JR-1021 (2.1 km)",
    status: "In Route"
  },

  // ── SITAMARHI ────────────────────────────────────────────────
  {
    id: "SH-8",
    type: "Shelter",
    name: "Sitamarhi Degree College Relief Camp",
    district: "Sitamarhi",
    coords: [26.598, 85.488],
    capacity: "750 persons",
    occupied: "430 persons",
    foodAvailable: "Yes (4 days)",
    contact: "+91 94318 55601",
    status: "Open"
  },
  {
    id: "TM-8",
    type: "Rescue Team",
    name: "NDRF Bagmati River Unit — Sitamarhi",
    district: "Sitamarhi",
    coords: [26.610, 85.510],
    personnel: 15,
    equipment: "2 Inflatable Boats, Ropes, GPS trackers",
    contact: "Control Room: 1078",
    status: "Active on Water"
  },
  {
    id: "BT-8",
    type: "Boat",
    name: "Bagmati Rescue Boat SM-02",
    district: "Sitamarhi",
    coords: [26.590, 85.475],
    capacity: "14 persons",
    speed: "17 km/h",
    nearestSOS: "Patrolling Bagmati embankment",
    status: "Patrolling"
  },

  // ── DARBHANGA ────────────────────────────────────────────────
  {
    id: "SH-9",
    type: "Shelter",
    name: "Darbhanga Medical College Relief Centre",
    district: "Darbhanga",
    coords: [26.158, 85.900],
    capacity: "1,100 persons",
    occupied: "720 persons",
    foodAvailable: "Yes (3 days)",
    contact: "+91 94318 66701",
    status: "Open"
  },
  {
    id: "TM-9",
    type: "Rescue Team",
    name: "SDRF Darbhanga Kosi-Bagmati Junction",
    district: "Darbhanga",
    coords: [26.175, 85.920],
    personnel: 20,
    equipment: "3 Motorized Boats, Night Operation gear",
    contact: "Control Room: 1070",
    status: "Deploying"
  },
  {
    id: "MED-6",
    type: "Medical Center",
    name: "DMCH Flood Emergency Wing",
    district: "Darbhanga",
    coords: [26.162, 85.890],
    doctors: 10,
    beds: 50,
    supplies: "Multi-specialty flood trauma care",
    contact: "+91 06272-250001",
    status: "Operational"
  },

  // ── BHAGALPUR ────────────────────────────────────────────────
  {
    id: "SH-10",
    type: "Shelter",
    name: "Bhagalpur Stadium Flood Relief Camp",
    district: "Bhagalpur",
    coords: [25.255, 87.008],
    capacity: "1,400 persons",
    occupied: "800 persons",
    foodAvailable: "Yes (5 days)",
    contact: "+91 94318 77801",
    status: "Open"
  },
  {
    id: "TM-10",
    type: "Rescue Team",
    name: "NDRF Ganga Rescue Bhagalpur Unit",
    district: "Bhagalpur",
    coords: [25.270, 87.030],
    personnel: 22,
    equipment: "5 Speed Boats, Drone, Medical van",
    contact: "Control Room: 1078",
    status: "Active on Water"
  },
  {
    id: "BT-9",
    type: "Boat",
    name: "Ganga Patrol Boat BP-01",
    district: "Bhagalpur",
    coords: [25.245, 87.020],
    capacity: "22 persons",
    speed: "24 km/h",
    nearestSOS: "Patrolling Ganga breaches",
    status: "Patrolling"
  },

  // ── ARARIA ───────────────────────────────────────────────────
  {
    id: "SH-11",
    type: "Shelter",
    name: "Forbesganj Relief Camp — Block HQ",
    district: "Araria",
    coords: [26.154, 87.552],
    capacity: "600 persons",
    occupied: "320 persons",
    foodAvailable: "Yes (2 days)",
    contact: "+91 94318 88901",
    status: "Open"
  },
  {
    id: "BT-10",
    type: "Boat",
    name: "Araria District Rescue Boat AR-01",
    district: "Araria",
    coords: [26.148, 87.540],
    capacity: "12 persons",
    speed: "16 km/h",
    nearestSOS: "JR-1021 (1.2 km)",
    status: "In Route"
  },

  // ── SAHARSA ──────────────────────────────────────────────────
  {
    id: "SH-12",
    type: "Shelter",
    name: "Saharsa Collectorate Relief Camp",
    district: "Saharsa",
    coords: [25.876, 86.596],
    capacity: "700 persons",
    occupied: "410 persons",
    foodAvailable: "Yes (3 days)",
    contact: "+91 94318 99001",
    status: "Open"
  },
  {
    id: "BT-11",
    type: "Boat",
    name: "Kosi Flood Boat SH-03",
    district: "Saharsa",
    coords: [25.860, 86.580],
    capacity: "15 persons",
    speed: "18 km/h",
    nearestSOS: "JR-1020 (0.5 km)",
    status: "Engaged"
  }
];

export const floodedRoads = [
  {
    id: "RD-1",
    name: "Birpur-Supaul State Highway SH-58",
    status: "Submerged (3.5 ft water)",
    passable: false,
    coords: [
      [26.15, 86.58],
      [26.13, 86.61],
      [26.10, 86.63]
    ]
  },
  {
    id: "RD-2",
    name: "Katihar-Manihari Ghat Bypass",
    status: "Flooded — Heavy vehicles only",
    passable: false,
    coords: [
      [25.55, 87.56],
      [25.53, 87.58],
      [25.51, 87.60]
    ]
  },
  {
    id: "RD-3",
    name: "Madhubani-Jhanjharpur Link Road",
    status: "Passable (Caution: slippery shoulders)",
    passable: true,
    coords: [
      [26.34, 86.06],
      [26.36, 86.08],
      [26.38, 86.11]
    ]
  }
];
