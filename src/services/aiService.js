import { delay } from "./api";
import { districtsData } from "../data/districts";
import { mapFacilities } from "../data/resources";

export const generateAIResponse = async (userMessage) => {
  await delay(400);
  const q = userMessage.toLowerCase().trim();

  if (q.includes("water") && (q.includes("rising") || q.includes("trapped") || q.includes("flood"))) {
    return {
      text: "⚠️ **CRITICAL FLOOD WARNING**: If water is rising, immediately move to the roof or higher ground. Switch off main electricity circuits.\n\nShould I log an emergency SOS for your location?",
      action: "sos",
      actionText: "🚨 Open SOS Emergency Dispatch",
      actionUrl: "/emergency"
    };
  }

  if (q.includes("rescue") || q.includes("boat")) {
    return {
      text: "🚤 **Rescue Coordination**: 86 rescue teams & motorized boats are active across North Bihar (Supaul, Katihar). Estimated arrival is 15–30 minutes upon SOS dispatch.",
      action: "rescue",
      actionText: "Request Immediate Rescue Boat",
      actionUrl: "/emergency"
    };
  }

  if (q.includes("shelter") || q.includes("camp")) {
    return {
      text: "⛺ **Nearby Relief Shelters**:\n• **Supaul High School Camp** (Capacity: 800)\n• **Katihar Community Hall** (Capacity: 1200)\n• **Madhubani Polytechnic Camp** (Capacity: 650)",
      action: "map",
      actionText: "View Shelters on Live Map",
      actionUrl: "/map"
    };
  }

  if (q.includes("kosi") || q.includes("river") || q.includes("danger mark")) {
    return {
      text: "🌊 **Kosi River Status (Birpur Gauge)**:\n• **Current Level**: 6.20m (**Above Danger Mark** by 0.20m)\n• **Danger Mark**: 6.00m\n• High alert advised along river embankments.",
      action: "analytics",
      actionText: "Inspect Live Water Gauges",
      actionUrl: "/analytics"
    };
  }

  return {
    text: "Hello! I am **JalRakshak AI**, your 24/7 disaster response assistant. How can I assist you with rescue, flood risks, or shelter?",
    action: "options"
  };
};