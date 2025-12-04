import { authFetch } from "@/lib/axios";

export async function getCommissions(): Promise<Commission[]> {
  try {
    const { data } = await authFetch.get<Commission[]>("Commission/roles");
    return data;
  } catch (error) {
    throw error;
  }
}
