import { apiFetch } from "./api";

const getData = async (response) => {
  const result = await response.json();
  return result.data;
};

export const notificationService = {
  async getNotifications() {
    const response = await apiFetch("/api/notifications");
    return getData(response);
  },

  async markAsRead(id) {
    const response = await apiFetch(
      `/api/notifications/${id}/read`,
      {
        method: "PUT",
      }
    );

    return getData(response);
  },

  async markAllAsRead() {
    const response = await apiFetch(
      "/api/notifications/read-all",
      {
        method: "PUT",
      }
    );

    return getData(response);
  },

  async deleteNotification(id) {
    const response = await apiFetch(
      `/api/notifications/${id}`,
      {
        method: "DELETE",
      }
    );

    return getData(response);
  },

  async addNotification(notification) {
    const response = await apiFetch(
      "/api/notifications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      }
    );

    return getData(response);
  },
};