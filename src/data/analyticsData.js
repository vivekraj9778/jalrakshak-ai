export const riverWaterData = [
  { time: "12 AM", level: 3.2, dangerLevel: 6.0, warningLevel: 5.0, forecast: null },
  { time: "2 AM", level: 3.4, dangerLevel: 6.0, warningLevel: 5.0, forecast: null },
  { time: "4 AM", level: 3.9, dangerLevel: 6.0, warningLevel: 5.0, forecast: null },
  { time: "6 AM", level: 4.5, dangerLevel: 6.0, warningLevel: 5.0, forecast: null },
  { time: "8 AM", level: 5.1, dangerLevel: 6.0, warningLevel: 5.0, forecast: null },
  { time: "10 AM", level: 5.7, dangerLevel: 6.0, warningLevel: 5.0, forecast: null },
  { time: "12 PM", level: 6.2, dangerLevel: 6.0, warningLevel: 5.0, forecast: 6.2, isPeak: true },
  { time: "2 PM", level: null, dangerLevel: 6.0, warningLevel: 5.0, forecast: 6.4 },
  { time: "4 PM", level: null, dangerLevel: 6.0, warningLevel: 5.0, forecast: 6.5 },
  { time: "6 PM", level: null, dangerLevel: 6.0, warningLevel: 5.0, forecast: 6.3 },
  { time: "8 PM", level: null, dangerLevel: 6.0, warningLevel: 5.0, forecast: 5.9 },
  { time: "10 PM", level: null, dangerLevel: 6.0, warningLevel: 5.0, forecast: 5.5 },
  { time: "12 AM", level: null, dangerLevel: 6.0, warningLevel: 5.0, forecast: 5.1 },
];

export const rainfallData24h = [
  { hour: "12 AM", rainfall: 8 },
  { hour: "2 AM", rainfall: 12 },
  { hour: "4 AM", rainfall: 15 },
  { hour: "6 AM", rainfall: 22 },
  { hour: "8 AM", rainfall: 29 },
  { hour: "10 AM", rainfall: 36 },
  { hour: "11 AM", rainfall: 42, isPeak: true },
  { hour: "12 PM", rainfall: 27 },
  { hour: "2 PM", rainfall: 31 },
  { hour: "4 PM", rainfall: 24 },
  { hour: "6 PM", rainfall: 18 },
  { hour: "8 PM", rainfall: 14 },
  { hour: "10 PM", rainfall: 19 },
  { hour: "12 AM", rainfall: 9 },
];

export const resourceAvailability = [
  { name: "Boats", count: 18, fill: "#F97316", percent: 18 },
  { name: "Medical Teams", count: 12, fill: "#087ED1", percent: 12 },
  { name: "Relief Centers", count: 27, fill: "#10B981", percent: 27 },
  { name: "Food Supplies", count: 45, fill: "#EF4444", percent: 43 }
];
