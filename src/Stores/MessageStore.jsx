import { create } from "zustand";
import axios from "axios";
import { useErrorStore } from "./UseErrorsStore";

const useMessageStore = create((set, get) => ({
  messages: null,
  loading: false,
  Language: localStorage.getItem("i18nextLng") || "en",
  setMessages: (messages) => set({ messages }),
  setLoading: (loading) => set({ loading }),
  getMessages: async () => {
    const { setLoading, setMessages } = get();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hayaapp.online/api/admin/all/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const messages = response.data.messages.data;
      setMessages(messages);
      console.log("Fetched messages:", messages);
      return messages;
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
