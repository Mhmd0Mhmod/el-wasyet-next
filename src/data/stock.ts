import { getToken } from "@/actions/auth/actions";
import { authFetch } from "@/lib/axios";
import { StockItem } from "@/types/stock-item";

export async function getStockData(): Promise<StockItem[]> {
  try {
    const response = await authFetch.get<StockItem[]>("/Stock/getall");
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
}
export async function getStockDataById(id: string): Promise<StockItem | null> {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("Missing authentication token");
    }
    const response = await fetch(`${process.env.HOST_URL}/api/stock/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching stock data by ID: ${response.statusText}`,
      );
    }
    const stockItem: StockItem | null = await response.json();
    return stockItem || null;
  } catch (error) {
    throw error;
  }
}
type StockForm = {
  id: string;
  name: string;
};

export async function getStockBranches(): Promise<StockForm[]> {
  try {
    const response = await authFetch.get<StockForm[]>(
      "/Stock/BranchesForCreateStock",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock branches:", error);
    throw error;
  }
}

export async function getStockForms(): Promise<StockForm[]> {
  try {
    const response = await authFetch.get<StockForm[]>(
      "/Stock/FormsForCreateStock",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock forms:", error);
    throw error;
  }
}
