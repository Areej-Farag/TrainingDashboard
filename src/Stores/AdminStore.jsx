import axios from "axios";
import { create } from "zustand";

export const useAdminStore = create((set, get) => ({
  admins: null,
  error: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setAdmins: (admins) => set({ admins }),
  getAdmins: async () => {
    const { setAdmins, setError, setLoading } = get();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        "https://hayaapp.online/api/admin/admins",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const admins = response.data.data;
      setAdmins(admins);
      return admins;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
  DestroyAdmin: async (id) => {
    const { setAdmins, setError, setLoading, admins, getAdmins } = get();
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
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
  AddAdmin: async (data) => {
    const { setAdmins, setError, setLoading, admins, getAdmins } = get();
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
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
UpdateAdmin: async (id, formData) => {
  const { setAdmins, setError, setLoading, admins, getAdmins } = get();
  const token = localStorage.getItem("token");
  if (!token) {
    setError("No token found");
    return;
  }
  try {
    setLoading(true);
    const response = await axios.post(
      `https://hayaapp.online/api/admin/update/data`,
      formData, // Send FormData directly
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Explicitly set for FormData
        },
      }
    );
    const updatedAdmin = response.data.data;
    const updatedAdmins = admins.map((admin) =>
      admin.id === id ? { ...admin, ...updatedAdmin } : admin
    );
    console.log("updatedAdmins", updatedAdmins);
    setAdmins(updatedAdmins);
    // Optionally, call getAdmins() only if necessary
    await getAdmins();
    return updatedAdmin;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    setError(errorMessage);
    console.error("UpdateAdmin error:", errorMessage);
    return null;
  } finally {
    setLoading(false);
  }
},
}));
