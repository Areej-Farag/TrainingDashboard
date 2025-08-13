import { create } from "zustand";
import axios from "axios";
import { useErrorStore } from "./UseErrorsStore";

const useGovernmentStore = create((set, get) => ({
  governments: null,
  loading: false,
  Language: localStorage.getItem("i18nextLng") || "en",
  government: null,
  setGovernment: (government) => set({ government }),
  setLoading: (loading) => set({ loading }),
  setGovernments: (governments) => set({ governments }),
  getGovernments: async () => {
    const { setGovernments, setLoading } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/governmentals",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const governments = response.data.data;
      setGovernments(governments);
      return governments;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  addGovernment: async (data) => {
    const { setLoading } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/governmental/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      get().getGovernments();
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
  editGovernment: async (data) => {
    const { setLoading } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/governmental/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      get().getGovernments();
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  showGovernment: async (id) => {
    const { setLoading, setGovernment } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/governmental/show",
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const government = response.data.data;
      setGovernment(government);
      return government;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
}));

export default useGovernmentStore;
