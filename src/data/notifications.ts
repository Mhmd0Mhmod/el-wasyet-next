import { getToken } from "@/actions/auth/actions";
import { Notification } from "@/types/notification";

export async function getNotifications(): Promise<Notification[]> {
  try {
    const token = await getToken(); // Get the token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/Notification`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["notifications"],
        },
      },
    );

    if (!response.ok) throw new Error("Failed to fetch notifications");
    return await response.json();
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}
