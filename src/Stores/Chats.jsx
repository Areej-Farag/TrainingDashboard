import { create } from "zustand";
import axios from "axios";

const useChatStore = create((set, get) => ({
  messages: [],
  loading: false,
  setLoading: (isLoading) => set({ loading: isLoading }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),

  getMessages: async (page = 1) => {
    const { setLoading, setMessages } = get();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://hayaapp.online/api/user/get-messages?page=${page}`,
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

export default useChatStore;
