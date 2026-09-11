export const initialNotifications = [
  {
    id: "notif-1",
    title: "Danger Mark Exceeded",
    message: "Water level in Kosi River at Birpur has touched 6.2m, exceeding the critical danger threshold by 0.2m.",
    category: "Critical",
    timestamp: "10 min ago",
    unread: true,
    district: "Supaul",
    actionUrl: "/analytics"
  },
  {
    id: "notif-2",
    title: "New Critical SOS Request",
    message: "SOS #JR-1024 reported from Ward 4 Supaul: 6 people trapped with water level rising rapidly.",
    category: "Emergency",
    timestamp: "18 min ago",
    unread: true,
    district: "Supaul",
    actionUrl: "/emergency"
  },
  {
    id: "notif-3",
    title: "Rescue Team Dispatched",
    message: "NDRF Team Alpha-01 has been assigned and dispatched to Katihar Diara belt.",
    category: "Resource",
    timestamp: "45 min ago",
    unread: true,
    district: "Katihar",
    actionUrl: "/map"
  },
  {
    id: "notif-4",
    title: "Medical Camp Operational",
    message: "AIIMS Mobile Trauma Camp now active at Katihar Community Center with 8 doctors on standby.",
    category: "Resource",
    timestamp: "1 hour ago",
    unread: false,
    district: "Katihar",
    actionUrl: "/resources"
  },
  {
    id: "notif-5",
    title: "Severe Weather Warning",
    message: "IMD predicts heavy to very heavy precipitation (70-110mm) in Supaul, Araria and Kishanganj over next 24h.",
    category: "Weather",
    timestamp: "2 hours ago",
    unread: false,
    district: "Araria",
    actionUrl: "/analytics"
  },
  {
    id: "notif-6",
    title: "AI Risk Assessment Updated",
    message: "JalRakshak AI reassessed Khagaria basin risk from High to Critical due to Bagmati tributary surge.",
    category: "System",
    timestamp: "3 hours ago",
    unread: false,
    district: "Khagaria",
    actionUrl: "/dashboard"
  }
];
