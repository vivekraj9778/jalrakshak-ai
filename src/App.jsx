import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";

import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

// ==========================================
// PUBLIC PAGES
// ==========================================

import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

// ==========================================
// USER PAGES
// ==========================================

import { UserDashboardPage } from "./pages/UserDashboardPage";
import { UserMapPage } from "./pages/UserMapPage";
import { UserEmergencyPage } from "./pages/UserEmergencyPage";
import { UserNotificationsPage } from "./pages/UserNotificationsPage";

// ==========================================
// ADMIN PAGES
// ==========================================

import { DashboardPage } from "./pages/DashboardPage";
import { MapPage } from "./pages/MapPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { EmergencyPage } from "./pages/EmergencyPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>

            {/* ==========================================
                PUBLIC ROUTES
            ========================================== */}

            <Route
              path="/"
              element={<LandingPage />}
            />

            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/register"
              element={<RegisterPage />}
            />


            {/* ==========================================
                NORMAL USER ROUTES
            ========================================== */}

            <Route
              element={<ProtectedRoute />}
            >
              <Route
                path="/user-dashboard"
                element={<UserDashboardPage />}
              />

              <Route
                path="/user-map"
                element={<UserMapPage />}
              />

              <Route
                path="/user-emergency"
                element={<UserEmergencyPage />}
              />

              <Route
                path="/user-notifications"
                element={<UserNotificationsPage />}
              />
            </Route>


            {/* ==========================================
                ADMIN ROUTES
            ========================================== */}

            <Route
              element={
                <ProtectedRoute adminOnly />
              }
            >
              <Route element={<DashboardLayout />}>

                <Route
                  path="/dashboard"
                  element={<DashboardPage />}
                />

                <Route
                  path="/map"
                  element={<MapPage />}
                />

                <Route
                  path="/emergency"
                  element={<EmergencyPage />}
                />

                <Route
                  path="/resources"
                  element={<ResourcesPage />}
                />

                <Route
                  path="/analytics"
                  element={<AnalyticsPage />}
                />

                <Route
                  path="/notifications"
                  element={<NotificationsPage />}
                />

                <Route
                  path="/profile"
                  element={<ProfilePage />}
                />

              </Route>
            </Route>


            {/* ==========================================
                UNKNOWN ROUTES
            ========================================== */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}