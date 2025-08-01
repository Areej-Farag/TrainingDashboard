import axios from "axios";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  users: null,
  error: null,
  loading: false,
  setUsers: (users) => set({ users }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  getUsers: async () => {
    const { setUsers, setError, setLoading } = get();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        "https://hayaapp.online/api/admin/user/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.users);
      const users = response.data.users;
      setUsers(users);
      return users;
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
