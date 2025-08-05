import axios from "axios";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  users: null,
  error: null,
  loading: false,
  interesties: null,
  setInteresties: (interesties) => set({ interesties }),
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
  addNewUser: async (data) => {
    const { setUsers, setError, setLoading, users, getUsers } = get();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/user/store",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newUser = response.data.user;
      setUsers([...(users || []), newUser]);
      await getUsers();
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
  getInteresties: async () => {
    const { setInteresties, setError, setLoading } = get();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hayaapp.online/api/interests?lang=${localStorage.getItem(
          "lang"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      const interesties = response.data.data;
      setInteresties(interesties);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  },
  updateUser: async (data) => {
    const { setError, setLoading, setUsers, users } = get();
    const Token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://hayaapp.online/api/admin/user/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedUser = response.data.data;
      const updatedUsers = users.map((admin) =>
        admin.id === data.id ? { ...admin, ...updatedUser } : admin
      );
      console.log("updatedUsers", updatedUsers);
      setUsers(updatedUsers);
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
