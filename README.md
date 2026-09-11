# 🌊 JalRakshak AI — Flood Monitoring & Emergency Rescue System

> **"Bridging Help, In Times of Flood."**

A production-quality, AI-powered disaster management, hydrological monitoring, and emergency rescue coordination web platform built for high-stakes flood response across Bihar.

---

## 🚀 Quick Start in VS Code

### Option 1: Open Directly in VS Code
1. Open **VS Code**.
2. Click **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select the folder:
   ```
   C:\Users\vivek\.gemini\antigravity\scratch\jalrakshak-ai
   ```
4. Open the integrated terminal (`Ctrl + ~` or **Terminal** > **New Terminal**).
5. Run:
   ```bash
   npm run dev
   ```
6. Open your browser at [http://localhost:5173](http://localhost:5173).

---

### Option 2: 1-Click Windows Run
Double-click the included `run.bat` file in `C:\Users\vivek\.gemini\antigravity\scratch\jalrakshak-ai\run.bat` to launch the development server immediately.

---

## 🌟 Major Features & Reference Design Alignment

| Reference Image Panel | Route | Key Functionality |
| :--- | :--- | :--- |
| **1. Landing Page** | `/` | Cinematic flood hero, "Bridging Help, In Times of Flood", working "Report Emergency" & "View Live Map" CTAs, "Safer Stronger Together" callout, live counters (12,846 rescued, 320 volunteers, 145 shelters, 28 districts). |
| **2. Live Flood Dashboard** | `/dashboard` | Dark navy sidebar (`#06233D`), 4 animated stat cards with delta trends, interactive Bihar district risk SVG visualizer (Supaul, Katihar, Madhubani, etc.), Live Updates activity stream, AI Emergency Priority triage, and System Status relays. |
| **3. Interactive Live Map** | `/map` | React-Leaflet map centered on North Bihar flood belt, Esri Satellite & Terrain tile layer switcher, custom popup cards with boat distance indicators, polygon flood zones, flooded roads, and layer toggles. |
| **4. Real-Time Graphs & Data** | `/analytics` | Kosi River water level area chart with danger mark (6.0m) and 6.2m breach tooltip, 24h rainfall bar chart with 42mm peak callout, district-wise risk table, and 102 total resources donut chart. |
| **5. Report Emergency (SOS)** | `/emergency` | Form with GPS location detection, category selectors, vulnerable people tags, photo upload & live preview, and admin incident command triage queue with team assignments. |
| **6. Volunteer / NGO Hub** | `/resources` | 3-tab registration (Volunteer, NGO, Resource Provider), "Together We Are Stronger" side card, and live searchable responder directory. |
| **Global AI Assistant** | Floating | "Ask JalRakshak AI" floating assistant with contextual flood guidance, shelter lookup, river gauges, and direct emergency dispatch hooks. |
| **Notification Center** | `/notifications` | Categorized alarms (Critical, Emergency, Weather, Resource, System) with unread counters and actions. |
| **Command Profile** | `/profile` | Commander credentials, base station, SMS/siren alerts preferences, and saved settings. |

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + Custom Leaflet marker pulses & gradients
- **Mapping**: Leaflet + React-Leaflet (Esri World Imagery + OpenStreetMap)
- **Charts**: Recharts (AreaChart, BarChart, PieChart/Donut)
- **Icons**: Lucide React
- **Persistence**: LocalStorage service layer (`src/services/`) ready for seamless FastAPI/PostgreSQL backend integration.
