import axios from "axios";
import { create } from "zustand";
import { useErrorStore } from "./UseErrorsStore"; // Adjust import path
import { Edit } from "@mui/icons-material";

export const useUserStore = create((set, get) => ({
  users: null,
  loading: false,
  interesties: null,
  verificationData: null,
  user: null,
  pagination: {
    currentPage: 1,
    perPage: 10,
    total: 0,
    nextPageUrl: null,
    prevPageUrl: null,
  },
  setUser: (user) => set({ user }),
  setVerificationData: (data) => set({ verificationData: data }),
  setInteresties: (interesties) => set({ interesties }),
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
  setPagination: (paginationData) =>
    set((state) => ({
      pagination: { ...state.pagination, ...paginationData },
    })),

  getUsers: async (pageNumber = null) => {
    const { setUsers, setLoading, setPagination, pagination } = get();
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
        url = `https://hayaapp.online/api/admin/user/all?page=${pageNumber}`;
      } else if (pagination.currentPage === 1) {
        url = "https://hayaapp.online/api/admin/user/all";
      } else {
        url =
          pagination.nextPageUrl ||
          pagination.prevPageUrl ||
          "https://hayaapp.online/api/admin/user/all";
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usersData = response.data.users;

      setUsers(usersData.data);
      setPagination({
        currentPage: usersData.current_page,
        perPage: usersData.per_page,
        total: usersData.total,
        nextPageUrl: usersData.next_page_url,
        prevPageUrl: usersData.prev_page_url,
      });
      return "Get users successfully";
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },

  showUser: async (id) => {
    const { setLoading, setUser } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/user/show",
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = response.data.user;
      setUser(user);
      console.log(" user", user);
      return user;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  addNewUser: async (data) => {
    const { setUsers, setLoading, users, getUsers } = get();
    const { setError } = useErrorStore.getState();
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
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  getInteresties: async () => {
    const { setInteresties, setLoading } = get();
    const { setError } = useErrorStore.getState();
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
      const interesties = response.data.data;
      setInteresties(interesties);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  updateUser: async (data) => {
    const { setLoading, setUsers, users } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/user/update",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const updatedUser = response.data.data;
      const updatedUsers = users.map((user) =>
        user.id === data.id ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  getUserVerificationData: async (id) => {
    const { setLoading, setVerificationData } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://hayaapp.online/api/admin/user/verification_data",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.user;
      setVerificationData(data);
      console.log("Verification data:", data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  },
  EditUserVerificationData: async (data) => {
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
        "https://hayaapp.online/api/admin/user/is_verify",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      get().getUsers();
      // return response;
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
