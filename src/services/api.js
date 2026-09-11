const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

export { API_BASE_URL };

export const apiFetch = async (
  path,
  options = {}
) => {
  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,
      credentials: "include",
    }
  );

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const data =
        await response.json();

      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Ignore non-JSON responses
    }

    throw new Error(message);
  }

  return response;
};

export const delay = (
  ms = 300
) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );