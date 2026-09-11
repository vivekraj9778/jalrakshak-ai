import { apiFetch } from "./api";

export const authService = {
  async register(data) {
    const response =
      await apiFetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(data),
        }
      );

    const result =
      await response.json();

    return result.data;
  },

  async login(data) {
    const response =
      await apiFetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(data),
        }
      );

    const result =
      await response.json();

    return result.data;
  },

  async getCurrentUser() {
    try {
      const response =
        await apiFetch(
          "/api/auth/me"
        );

      const result =
        await response.json();

      return result.data;
    } catch {
      return null;
    }
  },

  async logout() {
    const response =
      await apiFetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );

    return response.json();
  },
};