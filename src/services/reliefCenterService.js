import { apiFetch } from "./api";

export const reliefCenterService = {
  async getCenters() {
    const response = await apiFetch(
      "/api/relief-centers"
    );

    const result = await response.json();

    return result.data;
  },

  async createCenter(data) {
    const response = await apiFetch(
      "/api/relief-centers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    return result.data;
  },

  async updateCenter(id, data) {
    const response = await apiFetch(
      `/api/relief-centers/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    return result.data;
  },

  async deleteCenter(id) {
    const response = await apiFetch(
      `/api/relief-centers/${id}`,
      {
        method: "DELETE",
      }
    );

    return response.json();
  },
};