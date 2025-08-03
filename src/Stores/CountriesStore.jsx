import axios from "axios";
import { create } from "zustand";

export const useCountriesStore = create((set, get) => ({
  countries: null,
  error: null,
  loading: false,
  Language: localStorage.getItem("lang"),
  setCountries: (countries) => set({ countries }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),

  getCountries: async () => {
    const { setCountries, setError, setLoading } = get();
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
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },

  destroyCountry: async (id) => {
    const { setError, setLoading, getCountries } = get();
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
      await getCountries(); // Refresh the countries list after deletion
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },

  addCountry: async (data) => {
    const { setError, setLoading, getCountries } = get();
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
      await getCountries(); // Refresh the countries list after adding
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },

  editCountry: async (data) => {
    const { setError, setLoading, getCountries } = get();
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
      await getCountries(); // Refresh the countries list after updating
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
}));