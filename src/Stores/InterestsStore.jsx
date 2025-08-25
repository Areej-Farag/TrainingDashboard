import { create } from "zustand";
import axios from "axios";
import { useErrorStore } from "./UseErrorsStore";

const useInterstesStore = create((set, get) => {
  // Initialize state with token check
  const initialToken = localStorage.getItem("token");
  console.log("Initial token from localStorage:", initialToken);

  return {
    interesties: null,
    loading: false,
    interest: null,
    Language: localStorage.getItem("i18nextLng") || "en",
    pagination: {
      currentPage: 1,
      perPage: 10,
      total: 0,
      nextPageUrl: null,
      prevPageUrl: null,
    },
    clearInterest: () => set({ interest: null }),
    setLoading: (loading) => set({ loading }),
    setInterest: (interest) => set({ interest }),
    setInteresties: (interesties) => set({ interesties }),
    setPagination: (paginationData) =>
      set((state) => ({
        pagination: { ...state.pagination, ...paginationData },
      })),
    getInteresties: async (pageNumber = null) => {
      const { setInteresties, setLoading, setPagination, pagination } = get();
      const { setError } = useErrorStore.getState();
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found");
        return;
      }

      try {
        setLoading(true);
        let url;
        if (pageNumber) {
          url = `https://hayaapp.online/api/admin/interests?page=${pageNumber}`;
        } else if (pagination.currentPage === 1) {
          url = "https://hayaapp.online/api/admin/interests";
        } else {
          url =
            pagination.nextPageUrl ||
            pagination.prevPageUrl ||
            "https://hayaapp.online/api/admin/interests";
        }
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const interesties = response.data.data;
        setPagination({
          currentPage: interesties.current_page,
          perPage: interesties.per_page,
          total: interesties.total,
          nextPageUrl: interesties.next_page_url,
          prevPageUrl: interesties.prev_page_url,
        });
        setInteresties(interesties.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },

    editIntersts: async (data) => {
      const { setLoading } = get();
      const { setError } = useErrorStore.getState();
      const token = localStorage.getItem("token");
      console.log("Token during editIntersts:", token);

      if (!token) {
        setError("No token found");
        return;
      }

      try {
        setLoading(true);
        await axios.post(
          "https://hayaapp.online/api/admin/interest/update",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        get().getInteresties();
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },

    deleteInterest: async (id) => {
      const { setLoading } = get();
      const { setError } = useErrorStore.getState();
      const token = localStorage.getItem("token");
      console.log("Token during deleteInterest:", token);

      if (!token) {
        setError("No token found");
        return;
      }

      try {
        setLoading(true);
        await axios.post(
          `https://hayaapp.online/api/admin/interest/delete`,
          { id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        get().getInteresties();
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },

    addInterest: async (data) => {
      const { setLoading } = get();
      const { setError } = useErrorStore.getState();
      const token = localStorage.getItem("token");
      console.log("Token during addInterest:", token);

      if (!token) {
        setError("No token found");
        return;
      }

      try {
        setLoading(true);
        await axios.post(
          "https://hayaapp.online/api/admin/interest/add",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        get().getInteresties();
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },

    showInterest: async (id) => {
      const { setLoading, setInterest } = get();
      const { setError } = useErrorStore.getState();
      const token = localStorage.getItem("token");
      console.log("Token during showInterest:", token);

      if (!token) {
        setError("No token found");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          "https://hayaapp.online/api/admin/interest/show",
          { id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const interest = response.data.data;
        setInterest(interest);
        get().getInteresties();
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
  };
});

export default useInterstesStore;
