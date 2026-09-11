import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { emergencyService } from "../services/emergencyService";
import { notificationService } from "../services/notificationService";
import { resourceService } from "../services/resourceService";
import { dashboardService } from "../services/dashboardService";
import { reliefCenterService } from "../services/reliefCenterService";
import { profileService } from "../services/profileService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [emergencies, setEmergencies] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [resources, setResources] = useState([]);

  const [dashboardStats, setDashboardStats] = useState({
    affectedPeople: 0,
    activeSOS: 0,
    rescueTeamsDeployed: 0,
    reliefCenters: 0,
  });

  const [userProfile, setUserProfile] = useState({
    name: "Commander A. Verma",
    role: "Incident Commander",
    badge: "Admin",
    email: "command.bihar@jalrakshak.gov.in",
    phone: "+91 94311 02934",
    baseLocation: "Patna State Disaster EOC",
    smsAlerts: true,
    audioAlerts: true,
  });

  const [loading, setLoading] = useState(true);

  const [toasts, setToasts] = useState([]);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ==========================================
  // LOAD APPLICATION DATA
  // ==========================================

  useEffect(() => {
    const initData = async () => {
      try {
        // ==========================================
        // EMERGENCIES
        // ==========================================

        const emergencyPromise = emergencyService
          .getEmergencies()
          .then((data) => {
            setEmergencies(data || []);
          })
          .catch((error) => {
            console.error(
              "Failed to load emergencies:",
              error
            );
            setEmergencies([]);
          });

        // ==========================================
        // NOTIFICATIONS
        // ==========================================

        const notificationPromise = notificationService
          .getNotifications()
          .then((data) => {
            console.log(
              "NOTIFICATIONS FROM BACKEND:",
              data
            );

            setNotifications(data || []);
          })
          .catch((error) => {
            console.error(
              "Failed to load notifications:",
              error
            );
            setNotifications([]);
          });

        // ==========================================
        // RESOURCES
        // ==========================================

        const resourcePromise = resourceService
          .getResources()
          .then((data) => {
            setResources(data || []);
          })
          .catch((error) => {
            console.error(
              "Failed to load resources:",
              error
            );
            setResources([]);
          });

        // ==========================================
        // DASHBOARD
        // ==========================================

        const dashboardPromise = dashboardService
          .getStats()
          .then((stats) => {
            setDashboardStats({
              affectedPeople: Number(
                stats?.affectedPeople || 0
              ),
              activeSOS: Number(
                stats?.activeSOS || 0
              ),
              rescueTeamsDeployed: Number(
                stats?.rescueTeamsDeployed || 0
              ),
              reliefCenters: Number(
                stats?.reliefCenters || 0
              ),
            });
          })
          .catch((error) => {
            console.error(
              "Failed to load dashboard:",
              error
            );
          });

        // ==========================================
        // PROFILE
        // ==========================================

        const profilePromise = profileService
          .getProfile()
          .then((profile) => {
            if (profile) {
              setUserProfile(profile);
            }
          })
          .catch((error) => {
            console.error(
              "Failed to load profile:",
              error
            );
          });

        // ==========================================
        // WAIT FOR ALL
        // ==========================================

        await Promise.all([
          emergencyPromise,
          notificationPromise,
          resourcePromise,
          dashboardPromise,
          profilePromise,
        ]);
      } catch (error) {
        console.error(
          "Failed to initialize application:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  // ==========================================
  // DASHBOARD AUTO REFRESH
  // ==========================================

  useEffect(() => {
    const refreshDashboard = async () => {
      try {
        const stats =
          await dashboardService.getStats();

        setDashboardStats({
          affectedPeople: Number(
            stats?.affectedPeople || 0
          ),
          activeSOS: Number(
            stats?.activeSOS || 0
          ),
          rescueTeamsDeployed: Number(
            stats?.rescueTeamsDeployed || 0
          ),
          reliefCenters: Number(
            stats?.reliefCenters || 0
          ),
        });
      } catch (error) {
        console.error(
          "Dashboard refresh failed:",
          error
        );
      }
    };

    const interval = setInterval(
      refreshDashboard,
      5000
    );

    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // UNREAD NOTIFICATION COUNT
  // ==========================================

  const unreadNotifCount = notifications.filter(
    (notification) =>
      notification.unread === true
  ).length;

  // ==========================================
  // TOAST
  // ==========================================

  const addToast = (
    message,
    type = "info"
  ) => {
    const id = Date.now();

    setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        type,
      },
    ]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter(
          (toast) => toast.id !== id
        )
      );
    }, 4000);
  };

  // ==========================================
  // CREATE SOS
  // ==========================================

  const handleCreateSOS = async (sosData) => {
    try {
      const created =
        await emergencyService.createEmergency(
          sosData
        );

      const latest =
        await emergencyService.getEmergencies();

      setEmergencies(latest || []);

      const stats =
        await dashboardService.getStats();

      setDashboardStats({
        affectedPeople: Number(
          stats?.affectedPeople || 0
        ),
        activeSOS: Number(
          stats?.activeSOS || 0
        ),
        rescueTeamsDeployed: Number(
          stats?.rescueTeamsDeployed || 0
        ),
        reliefCenters: Number(
          stats?.reliefCenters || 0
        ),
      });

      addToast(
        "Emergency request submitted successfully.",
        "success"
      );

      return created;
    } catch (error) {
      console.error(
        "Failed to create SOS:",
        error
      );

      addToast(
        error?.message ||
          "Failed to submit emergency request.",
        "error"
      );

      throw error;
    }
  };

  // ==========================================
  // UPDATE SOS STATUS / ASSIGN UNIT
  // ==========================================

  const handleUpdateSOSStatus = async (
    id,
    status,
    assignedTeam = null
  ) => {
    try {
      console.log(
        "Updating SOS:",
        id,
        "Status:",
        status,
        "Assigned Team:",
        assignedTeam
      );

      const updated =
        await emergencyService.updateEmergencyStatus(
          id,
          status,
          assignedTeam
        );

      // Backend returns the complete updated list
      setEmergencies(updated || []);

      // Refresh dashboard statistics
      const stats =
        await dashboardService.getStats();

      setDashboardStats({
        affectedPeople: Number(
          stats?.affectedPeople || 0
        ),
        activeSOS: Number(
          stats?.activeSOS || 0
        ),
        rescueTeamsDeployed: Number(
          stats?.rescueTeamsDeployed || 0
        ),
        reliefCenters: Number(
          stats?.reliefCenters || 0
        ),
      });

      addToast(
        assignedTeam
          ? `SOS #${id} assigned to ${assignedTeam}.`
          : `SOS #${id} status updated to ${status}.`,
        "success"
      );

      return updated;
    } catch (error) {
      console.error(
        "Failed to update SOS:",
        error
      );

      addToast(
        error?.message ||
          "Failed to update SOS status.",
        "error"
      );

      throw error;
    }
  };

  // ==========================================
  // BACKWARD COMPATIBILITY
  // ==========================================
  // Some existing components may still use
  // handleUpdateEmergencyStatus.
  // Keep both names available.

  const handleUpdateEmergencyStatus =
    handleUpdateSOSStatus;

  // ==========================================
  // RESOURCES
  // ==========================================

  const handleRegisterResource = async (
    resourceData
  ) => {
    try {
      const created =
        await resourceService.registerResource(
          resourceData
        );

      const latest =
        await resourceService.getResources();

      setResources(latest || []);

      addToast(
        "Resource registered successfully.",
        "success"
      );

      return created;
    } catch (error) {
      console.error(
        "Failed to register resource:",
        error
      );

      addToast(
        error?.message ||
          "Failed to register resource.",
        "error"
      );

      throw error;
    }
  };

  const handleUpdateResourceStatus = async (
    id,
    status
  ) => {
    try {
      await resourceService.updateStatus(
        id,
        status
      );

      const latest =
        await resourceService.getResources();

      setResources(latest || []);

      addToast(
        "Resource status updated successfully.",
        "success"
      );
    } catch (error) {
      console.error(
        "Failed to update resource:",
        error
      );

      addToast(
        error?.message ||
          "Failed to update resource.",
        "error"
      );

      throw error;
    }
  };

  // ==========================================
  // NOTIFICATIONS
  // ==========================================

  const handleMarkNotifRead = async (id) => {
    try {
      const latest =
        await notificationService.markAsRead(
          id
        );

      setNotifications(latest || []);
    } catch (error) {
      console.error(
        "Failed to mark notification:",
        error
      );
    }
  };

  const handleMarkAllNotifsRead = async () => {
    try {
      const latest =
        await notificationService.markAllAsRead();

      setNotifications(latest || []);
    } catch (error) {
      console.error(
        "Failed to mark notifications:",
        error
      );
    }
  };

  const handleDeleteNotif = async (id) => {
    try {
      const latest =
        await notificationService.deleteNotification(
          id
        );

      setNotifications(latest || []);
    } catch (error) {
      console.error(
        "Failed to delete notification:",
        error
      );
    }
  };

  const handleAddNotification = async (
    notification
  ) => {
    try {
      const created =
        await notificationService.addNotification(
          notification
        );

      const latest =
        await notificationService.getNotifications();

      setNotifications(latest || []);

      return created;
    } catch (error) {
      console.error(
        "Failed to add notification:",
        error
      );

      throw error;
    }
  };

  // ==========================================
  // RELIEF CENTERS
  // ==========================================

  const handleCreateReliefCenter = async (
    centerData
  ) => {
    try {
      const created =
        await reliefCenterService.createCenter(
          centerData
        );

      const stats =
        await dashboardService.getStats();

      setDashboardStats({
        affectedPeople: Number(
          stats?.affectedPeople || 0
        ),
        activeSOS: Number(
          stats?.activeSOS || 0
        ),
        rescueTeamsDeployed: Number(
          stats?.rescueTeamsDeployed || 0
        ),
        reliefCenters: Number(
          stats?.reliefCenters || 0
        ),
      });

      addToast(
        "Relief center created successfully.",
        "success"
      );

      return created;
    } catch (error) {
      console.error(
        "Failed to create relief center:",
        error
      );

      addToast(
        error?.message ||
          "Failed to create relief center.",
        "error"
      );

      throw error;
    }
  };

  // ==========================================
  // PROFILE
  // ==========================================

  const handleUpdateProfile = async (
    updatedProfile
  ) => {
    try {
      const saved =
        await profileService.updateProfile(
          updatedProfile
        );

      setUserProfile(saved);

      addToast(
        "Profile preferences saved successfully.",
        "success"
      );

      return saved;
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );

      addToast(
        error?.message ||
          "Failed to save profile.",
        "error"
      );

      throw error;
    }
  };

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <AppContext.Provider
      value={{
        // ==========================================
        // EMERGENCIES
        // ==========================================

        emergencies,
        setEmergencies,

        // ==========================================
        // NOTIFICATIONS
        // ==========================================

        notifications,
        setNotifications,

        // ==========================================
        // RESOURCES
        // ==========================================

        resources,
        setResources,

        // ==========================================
        // DASHBOARD
        // ==========================================

        dashboardStats,
        setDashboardStats,

        // ==========================================
        // PROFILE
        // ==========================================

        userProfile,
        setUserProfile,

        // ==========================================
        // GENERAL
        // ==========================================

        loading,

        toasts,
        addToast,

        isAiOpen,
        setIsAiOpen,

        mobileMenuOpen,
        setMobileMenuOpen,

        // ==========================================
        // SOS FUNCTIONS
        // ==========================================

        handleCreateSOS,

        // IMPORTANT:
        // Used by SOSManagement.jsx and MapView.jsx
        handleUpdateSOSStatus,

        // Kept for any old component
        handleUpdateEmergencyStatus,

        // ==========================================
        // RESOURCE FUNCTIONS
        // ==========================================

        handleRegisterResource,
        handleUpdateResourceStatus,

        // ==========================================
        // NOTIFICATION FUNCTIONS
        // ==========================================

        handleMarkNotifRead,
        handleMarkAllNotifsRead,
        handleDeleteNotif,
        handleAddNotification,
        unreadNotifCount,

        // ==========================================
        // RELIEF CENTER
        // ==========================================

        handleCreateReliefCenter,

        // ==========================================
        // PROFILE
        // ==========================================

        handleUpdateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ==========================================
// USE APP HOOK
// ==========================================

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useApp must be used inside AppProvider"
    );
  }

  return context;
};