import { apiFetch } from "./api";

const getData = async (response) => {
  const result = await response.json();
  return result.data;
};

export const dashboardService = {
  async getStats() {
    const response = await apiFetch("/api/dashboard");
    return getData(response);
  },

  async updateStats(data) {
    const response = await apiFetch("/api/dashboard", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return getData(response);
  },

  async deleteStats() {
    const response = await apiFetch("/api/dashboard", {
      method: "DELETE",
    });

    return getData(response);
  },
};