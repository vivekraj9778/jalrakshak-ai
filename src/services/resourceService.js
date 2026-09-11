import { apiFetch } from "./api";

const getData = async (response) => {
  const result = await response.json();
  return result.data;
};

export const resourceService = {
  async getResources() {
    const response = await apiFetch("/api/resources");
    return getData(response);
  },

  async registerResource(formData) {
    const response = await apiFetch("/api/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return getData(response);
  },

  async updateStatus(id, newStatus) {
    const response = await apiFetch(
      `/api/resources/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    return getData(response);
  },
};