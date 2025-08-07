import axios from "axios";
import { create } from "zustand";
import { useErrorStore } from "./UseErrorsStore"; // Adjust import path

export const useCountriesStore = create((set, get) => ({
  countries: null,
  loading: false,
  country: null,
  Language: localStorage.getItem("lang"),
  setCountries: (countries) => set({ countries }),
  setLoading: (loading) => set({ loading }),
  setCountry: (country) => set({ country }),
  clearCountry: () => set({ country: null }),
  getCountries: async () => {
    const { setCountries, setLoading } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `https://hayaapp.online/api/admin/countries?lang=${get().Language}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const countries = response.data.data;
      console.log("countries", countries);
      setCountries(countries);
      return countries;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  destroyCountry: async (id) => {
    const { setLoading, getCountries } = get();
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
        "https://hayaapp.online/api/admin/countries/destroy",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getCountries();
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  addCountry: async (data) => {
    const { setLoading, getCountries } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        "https://hayaapp.online/api/admin/countries/store",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getCountries();
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  editCountry: async (data) => {
    const { setLoading, getCountries } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        "https://hayaapp.online/api/admin/countries/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getCountries();
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  showCountry: async (id) => {
    const { setLoading, setCountry } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/countries/show",
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const country = response.data.country;
      setCountry(country);
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
