import axios from "axios";
import { create } from "zustand";
import { useErrorStore } from "./UseErrorsStore"; // Adjust import path
export const useAuthStore = create((set, get) => ({
  user: null,
  error: null,
  loading: false,
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  LogIn: async (email, password) => {
    const { setUser, setLoading } = get();
    const { setError } = useErrorStore.getState();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", email.trim());
      formData.append("password", password.trim());

      const response = await axios.post(
        "https://hayaapp.online/api/admin/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const user = response.data.data.admin;
      const token = response.data.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  },

  logOut: async () => {
    const { setUser, setLoading } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "https://hayaapp.online/api/admin/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Set the user to null
      setUser(null);
      console.log("Logout successful!");
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  },
  getAdminData: async () => {
    const { setUser } = get();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const response = await axios.get(
        "https://hayaapp.online/api/admin/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const admin = response.data.data;
      setUser(admin);
      console.log("admin data:", admin);
      return admin;
    } catch (error) {
      console.error("Error fetching admin data:", error);
      return null;
    }
  },
}));
