import { apiFetch } from "./api";

export const profileService = {
  async getProfile() {
    const response = await apiFetch("/api/profile");

    const result = await response.json();

    return result.data;
  },

  async updateProfile(profile) {
    const response = await apiFetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    const result = await response.json();

    return result.data;
  },
};