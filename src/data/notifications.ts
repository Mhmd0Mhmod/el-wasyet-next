import { authFetch } from "@/lib/axios";
import { Notification } from "@/types/notification";
import axios from "axios";

export async function getNotifications(): Promise<Notification[]> {
  try {
    const response = await axios.get("/api/notifications", {
      fetchOptions: {
        next: {
          tags: ["notifications"],
          revalidate: 60,
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}
export async function getNotificationsServer() {
  try {
    const { data } = await authFetch.get<Notification[]>(`/Notification`);
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}
