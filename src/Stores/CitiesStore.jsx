import axios from "axios";
import { create } from "zustand";
import { useErrorStore } from "./UseErrorsStore"; // Adjust import path

export const useCitiesStore = create((set, get) => ({
  cities: null,
  loading: false,
  Language: localStorage.getItem("i18nextLng"),
  city: null,
  pagination: {
    currentPage: 1,
    perPage: 10,
    total: 0,
    nextPageUrl: null,
    prevPageUrl: null,
  },
  setCity: (city) => set({ city }),
  setCities: (cities) => set({ cities }),
  setLoading: (loading) => set({ loading }),
  setPagination: (paginationData) =>
    set((state) => ({
      pagination: { ...state.pagination, ...paginationData },
    })),
  clearCity: () => set({ city: null }),
  getCities: async (pageNumber = null) => {
    const { setCities, setLoading, pagination, setPagination } = get();
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
        url = `https://hayaapp.online/api/admin/cities?page=${pageNumber}&lang=${
          get().Language
        }`;
      } else if (pagination.currentPage === 1) {
        url = `https://hayaapp.online/api/admin/cities?lang=${get().Language}`;
      } else {
        url =
          pagination.nextPageUrl ||
          pagination.prevPageUrl ||
          `https://hayaapp.online/api/admin/cities?lang=${get().Language}`;
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
      const cities = response.data.data;
      setPagination({
        currentPage: cities.current_page,
        perPage: cities.per_page,
        total: cities.total,
        nextPageUrl: cities.next_page_url,
        prevPageUrl: cities.prev_page_url,
      });
      setCities(cities.data);
      return "Get cities successfully";
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  destroyCity: async (id) => {
    const { setCities, setLoading, cities, getCities } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("id", id);
      await axios.post(
        "https://hayaapp.online/api/admin/city/delete",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedCities = cities.filter((city) => city.id !== id);
      setCities(updatedCities);
      await getCities();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  addCity: async (data) => {
    const { setLoading, getCities } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/city/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getCities();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  editCity: async (data) => {
    const { setLoading, getCities } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/city/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getCities();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      console.log(errorMessage);
      setError(
        errorMessage == "The id field is required."
          ? "The id field is required."
          : errorMessage
      );
      return null;
    } finally {
      setLoading(false);
    }
  },
  showCity: async (id) => {
    const { setLoading, setCity } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/city/show",
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const city = response.data.city;
      setCity(city);
      return city;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      console.log(errorMessage);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
}));
