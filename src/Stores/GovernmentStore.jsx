import { create } from "zustand";
import axios from "axios";
import { useErrorStore } from "./UseErrorsStore";

const useGovernmentStore = create((set, get) => ({
  governments: null,
  loading: false,
  Language: localStorage.getItem("i18nextLng") || "en",
  government: null,
  pagination: {
    currentPage: 1,
    perPage: 10,
    total: 0,
    nextPageUrl: null,
    prevPageUrl: null,
  },
  setGovernment: (government) => set({ government }),
  setLoading: (loading) => set({ loading }),
  setGovernments: (governments) => set({ governments }),
  setPagination: (paginationData) =>
    set((state) => ({
      pagination: { ...state.pagination, ...paginationData },
    })),
  getGovernments: async (pageNumber = null) => {
    const { setGovernments, setLoading, pagination, setPagination } = get();
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
        url = `https://hayaapp.online/api/admin/governmentals?page=${pageNumber}`;
      } else if (pagination.currentPage === 1) {
        url = "https://hayaapp.online/api/admin/governmentals";
      } else {
        url =
          pagination.nextPageUrl ||
          pagination.prevPageUrl ||
          "https://hayaapp.online/api/admin/governmentals";
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
      const governments = response.data.data;
      setPagination({
        currentPage: governments.current_page,
        perPage: governments.per_page,
        total: governments.total,
        nextPageUrl: governments.next_page_url,
        prevPageUrl: governments.prev_page_url,
      });
      setGovernments(governments.data);
      return "Governments fetched successfully";
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      console.log(error);
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
