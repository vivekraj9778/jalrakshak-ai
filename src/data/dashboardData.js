export const statsData = [
  {
    id: "affected",
    title: "Flood Affected People",
    value: "34,210",
    change: "↑ 12% from last update",
    trend: "up",
    icon: "Users",
  },
  {
    id: "sos",
    title: "Active SOS Requests",
    value: "1,248",
    change: "↑ 18% from last update",
    trend: "up",
    icon: "AlertTriangle",
  },
  {
    id: "teams",
    title: "Rescue Teams Deployed",
    value: "86",
    change: "↑ 6% from last update",
    trend: "up",
    icon: "LifeBuoy",
  },
  {
    id: "shelters",
    title: "Relief Centers",
    value: "215",
    change: "↑ 10% from last update",
    trend: "up",
    icon: "Home",
  }
];

export const liveUpdatesData = [
  {
    id: 1,
    time: "2 min ago",
    text: "Rescue boat dispatched to Supaul (Ward 4)",
    district: "Supaul",
    iconBg: "bg-blue-100 text-flood-blue",
    type: "boat"
  },
  {
    id: 2,
    time: "15 min ago",
    text: "Medical camp established in Madhubani Central School",
    district: "Madhubani",
    iconBg: "bg-emerald-100 text-emerald-600",
    type: "medical"
  },
  {
    id: 3,
    time: "28 min ago",
    text: "Water level crossed danger mark in Kosi River (6.2m)",
    district: "Supaul",
    iconBg: "bg-red-100 text-red-600",
    type: "alert"
  },
  {
    id: 4,
    time: "1 hour ago",
    text: "50 people rescued safely in Katihar Diara belt",
    district: "Katihar",
    iconBg: "bg-teal-100 text-teal-600",
    type: "rescue"
  }
];

export const emergencyPriorities = [
  {
    rank: "01",
    district: "Supaul",
    count: 34,
    description: "34 critical SOS requests in river embankment",
    status: "CRITICAL",
    badgeColor: "bg-red-500 text-white"
  },
  {
    rank: "02",
    district: "Madhubani",
    count: 21,
    description: "21 high priority requests, Kamla river surge",
    status: "HIGH",
    badgeColor: "bg-orange-500 text-white"
  },
  {
    rank: "03",
    district: "Katihar",
    count: 15,
    description: "15 high priority requests, Mahananda backflow",
    status: "HIGH",
    badgeColor: "bg-orange-500 text-white"
  }
];

export const systemStatusData = [
  { name: "Flood Data Stream", status: "Operational", ping: "42ms" },
  { name: "SOS Ingestion System", status: "Operational", ping: "28ms" },
  { name: "Resource Network", status: "Operational", ping: "35ms" },
  { name: "JalRakshak AI Engine", status: "Operational", ping: "55ms" },
];