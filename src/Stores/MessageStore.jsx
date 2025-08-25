import { create } from "zustand";
import axios from "axios";
import { useErrorStore } from "./UseErrorsStore";

const useMessageStore = create((set, get) => ({
  messages: null,
  loading: false,
  Language: localStorage.getItem("i18nextLng") || "en",
  pagination: {
    currentPage: 1,
    perPage: 10,
    total: 0,
    nextPageUrl: null,
    prevPageUrl: null,
  },
  setMessages: (messages) => set({ messages }),
  setLoading: (loading) => set({ loading }),
  setPagination: (paginationData) =>
    set((state) => ({
      pagination: { ...state.pagination, ...paginationData },
    })),
  getMessages: async (pageNumber = null) => {
    const { setLoading, setMessages, pagination, setPagination } = get();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      setLoading(true);
      let url;
      if (pageNumber) {
        url = `https://hayaapp.online/api/admin/all/messages?page=${pageNumber}`;
      } else if (pagination.currentPage === 1) {
        url = "https://hayaapp.online/api/admin/all/messages";
      } else {
        url =
          pagination.nextPageUrl ||
          pagination.prevPageUrl ||
          "https://hayaapp.online/api/admin/all/messages";
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const messagesData = response.data.messages;
      setPagination({
        currentPage: messagesData.current_page,
        perPage: messagesData.per_page,
        total: messagesData.total,
        nextPageUrl: messagesData.next_page_url,
        prevPageUrl: messagesData.prev_page_url,
      });
      setMessages(messagesData.data);
      // console.log("Fetched messages:", messages);
      return messagesData.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  },
  filterMessages: async ({ message, created_at }) => {
    const { setLoading, setMessages } = get();
    const { setError } = useErrorStore.getState();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      if (message) formData.append("message", message);
      if (created_at) formData.append("created_at", created_at);

      const response = await axios.post(
        "https://hayaapp.online/api/admin/messages/filter",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessages(response.data.data || []);
      return response.data.data;
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

export default useMessageStore;
