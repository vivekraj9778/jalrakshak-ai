const API_URL = "http://localhost:5000/api/emergencies";

export const emergencyService = {
  // GET all emergencies
  async getEmergencies() {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch emergencies");
    }

    const result = await response.json();

    return result.data;
  },

  // CREATE new emergency / SOS
  async createEmergency(sosData) {
    const payload = JSON.stringify(sosData);

    console.log("=================================");
    console.log("SOS REQUEST");
    console.log("=================================");
    console.log(
      "Request size:",
      (new Blob([payload]).size / 1024).toFixed(2),
      "KB"
    );

    console.log(
      "Photo size:",
      sosData.photoUrl
        ? (sosData.photoUrl.length / 1024).toFixed(2) + " KB"
        : "No photo"
    );

    console.log("=================================");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });

    // ==========================================
    // HANDLE ERROR RESPONSE
    // ==========================================

    if (!response.ok) {
      let errorMessage = "Failed to create emergency";

      try {
        const errorData = await response.json();

        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Response was not JSON
      }

      console.error(
        "SOS API Error:",
        response.status,
        errorMessage
      );

      throw new Error(errorMessage);
    }

    const result = await response.json();

    return result.data;
  },

  // UPDATE emergency status
  async updateEmergencyStatus(
    id,
    newStatus,
    assignedTeam = null
  ) {
    const response = await fetch(
      `${API_URL}/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          assignedTeam,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to update emergency"
      );
    }

    // Updated emergency returned by backend
    const result = await response.json();

    const updatedEmergency = result.data;

    // Get complete updated list
    const listResponse = await fetch(API_URL);

    if (!listResponse.ok) {
      throw new Error(
        "Failed to fetch updated emergencies"
      );
    }

    const listResult =
      await listResponse.json();

    return listResult.data;
  },

  // GET emergency by ID
  async getEmergencyById(id) {
    const response = await fetch(
      `${API_URL}/${id}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }

      throw new Error(
        "Failed to fetch emergency"
      );
    }

    const result = await response.json();

    return result.data;
  },
};