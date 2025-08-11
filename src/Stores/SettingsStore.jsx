import { create } from "zustand";
import axios from "axios";
import { useErrorStore } from "./UseErrorsStore";

const useSettingsStore = create((set, get) => ({
  terms: null,
  privacy: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setTerms: (terms) => set({ terms }),
  setPrivacy: (privacy) => set({ privacy }),
  getTerms: async () => {
    const { setTerms, setLoading } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://haya.balance-genius.com/api/terms?lang=${localStorage.getItem(
          "i18nextLng"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const terms = response.data.data;
      console.log("terms", terms);
      setTerms(terms);
      return terms;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },

  getPrivacy: async () => {
    const { setPrivacy, setLoading } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://haya.balance-genius.com/api/privacy?lang=${localStorage.getItem(
          "i18nextLng"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const privacy = response.data.data;
      console.log("privacy", privacy);
      setPrivacy(privacy);
      return privacy;
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
export default useSettingsStore;
