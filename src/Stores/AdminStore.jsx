// src/Stores/AdminStore.js
import axios from "axios";
import { create } from "zustand";
import { useErrorStore } from "./UseErrorsStore"; // Adjust import path

export const useAdminStore = create((set, get) => ({
  admins: null,
  loading: false,
  pagination: {
    currentPage: 1,
    perPage: 10,
    total: 0,
    nextPageUrl: null,
    prevPageUrl: null,
  },
  setLoading: (loading) => set({ loading }),
  setAdmins: (admins) => set({ admins }),
  setPagination: (paginationData) =>
    set((state) => ({
      pagination: { ...state.pagination, ...paginationData },
    })),
  getAdmins: async (pageNumber = null) => {
    const { setAdmins, setLoading, pagination, setPagination } = get();
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
        url = `https://hayaapp.online/api/admin/admins?page=${pageNumber}`;
      } else if (pagination.currentPage === 1) {
        url = "https://hayaapp.online/api/admin/admins";
      } else {
        url =
          pagination.nextPageUrl ||
          pagination.prevPageUrl ||
          "https://hayaapp.online/api/admin/admins";
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const admins = response.data.data;
      setPagination({
        currentPage: admins.current_page,
        perPage: admins.per_page,
        total: admins.total,
        nextPageUrl: admins.next_page_url,
        prevPageUrl: admins.prev_page_url,
      });
      setAdmins(admins.data);
      return admins;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  DestroyAdmin: async (id) => {
    const { setAdmins, setLoading, admins, getAdmins } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        "https://hayaapp.online/api/admin/destroy",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedAdmins = admins.filter((admin) => admin.id !== id);
      setAdmins(updatedAdmins);
      await getAdmins();
      return updatedAdmins;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  AddAdmin: async (data) => {
    const { setAdmins, setLoading, admins, getAdmins } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newAdmin = response.data.data;
      setAdmins([...(admins || []), newAdmin]);
      await getAdmins();
      return newAdmin;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      console.error("AddAdmin error:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  UpdateAdmin: async (id, formData) => {
    const { setAdmins, setLoading, admins, getAdmins } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `https://hayaapp.online/api/admin/update/data`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedAdmin = response.data.data;
      if (!updatedAdmin || !updatedAdmin.id) {
        throw new Error("Invalid admin data returned from server");
      }
      const updatedAdmins = admins.map((admin) =>
        admin.id === id ? { ...admin, ...updatedAdmin } : admin
      );
      setAdmins(updatedAdmins);
      await getAdmins(); // Refresh to ensure consistency
      console.log("Updated admin:", updatedAdmin);

      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      console.error("UpdateAdmin error:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
}));
