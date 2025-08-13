import { create } from "zustand";
import axios from "axios";
import { useErrorStore } from "./UseErrorsStore";

const useMerchantStore = create((set, get) => ({
  merchants: null,
  loading: false,
  Language: localStorage.getItem("i18nextLng") || "en",
  merchant: null,
  setLoading: (value) => set({ loading: value }),
  setMerchants: (value) => set({ merchants: value }),
  setMerchant: (value) => set({ merchant: value }),
  getMerchants: async () => {
    const { setMerchants, setLoading } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        "https://hayaapp.online/api/admin/merchants",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const merchants = response.data.data;
      setMerchants(merchants);
      return merchants;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  showMerchant: async (id) => {
    const { setLoading, setMerchant } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/merchant/show",
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const merchant = response.data.data;
      setMerchant(merchant);
      return merchant;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  addMerchant: async (data) => {
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
        "https://hayaapp.online/api/admin/merchant/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      get().getMerchants();
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
  editMerchant: async (data) => {
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
        "https://hayaapp.online/api/admin/merchant/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      get().getMerchants();
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
}));

export default useMerchantStore;
