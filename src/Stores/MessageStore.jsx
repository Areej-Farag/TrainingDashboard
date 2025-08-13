import { create } from "zustand";
import axios from "axios";

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
  filterMessages: async (data) => {
    const { setLoading, setMessages } = get();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `https://hayaapp.online/api/admin/messages/filter`, 
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const messages = response.data.data;
      setMessages(messages);
      console.log("Fetched messages:", messages);
      return messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  },
}));

export default useMessageStore;
