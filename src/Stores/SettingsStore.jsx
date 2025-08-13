import { create } from "zustand";
import axios from "axios";
import { useErrorStore } from "./UseErrorsStore";

const useSettingsStore = create((set, get) => ({
  settings: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setSettings: (settings) => set({ settings }),
  getSettings: async () => {
    const { setLoading, setSettings } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
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
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
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
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://hayaapp.online/api/admin/settings/update", // Change to "/add" if the API requires it
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSettings(response.data.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  },
}));

export default useSettingsStore;