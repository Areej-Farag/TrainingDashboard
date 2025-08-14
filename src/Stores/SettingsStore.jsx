import { create } from "zustand";
import axios from "axios";
import { useErrorStore } from "./UseErrorsStore";
import isEqual from "lodash/isEqual"; // For deep equality comparison

const useSettingsStore = create((set, get) => ({
  settings: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setSettings: (settings) => set((state) => {
    // Only update settings if the new data is different
    if (!isEqual(state.settings, settings)) {
      return { settings };
    }
    return {};
  }),
  getSettings: async () => {
    const { setLoading, setSettings } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return null;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        "https://hayaapp.online/api/admin/settings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSettings(response.data.data);
      console.log("Fetched settings:", response.data.data);
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  updateSettings: async (data) => {
    const { setLoading, setSettings } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return null;
    }

    // Validate data
    const requiredFields = [
      "terms_and_conditions_ar",
      "terms_and_conditions_en",
      "privacy_policy_ar",
      "privacy_policy_en",
      "about_us_ar",
      "about_us_en",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(", ")}`);
      return null;
    }

    setLoading(true);
    try {
      const response = await axios.post( // Changed to PUT for updating existing settings
        "https://hayaapp.online/api/admin/settings/add", // Adjust endpoint to target specific settings record
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSettings(response.data.data);
      console.log("Updated settings:", response.data.data);
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError("Session expired. Please log in again.");
        // Optionally redirect to login page
        // window.location.href = "/login";
      } else {
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";
        setError(errorMessage);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
}));

export default useSettingsStore;