import axios from "axios";
import { create } from "zustand";

export const useCitiesStore = create((set, get) => ({
  cities: null,
  error: null,
  loading: false,
  Language: localStorage.getItem("lang"),
  city: null,

  setCities: (cities) => set({ cities }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  getCities: async () => {
    const { setCities, setError, setLoading } = get();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `https://hayaapp.online/api/admin/cities?lang=${get().Language}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cities = response.data.data;
      console.log("cities", cities);
      setCities(cities);
      return cities;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
  destroyCity: async (id) => {
    const { setCities, setError, setLoading, cities, getCities } = get();
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
        formData ,
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
      return updatedCities;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
  addCity: async (data) => {
    const { setCities, setError, setLoading, cities, getCities } = get();
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
      if (error instanceof Error) {
        setError(error.message);
        console.log(error);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
  editCity: async (data) => {
    const { setCities, setError, setLoading, cities, getCities } = get();
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
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
  showCity: async (id) => {
    const { setError, setLoading, setCity } = get();
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
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
}));
