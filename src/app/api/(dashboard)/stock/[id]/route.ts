import { fetch } from "@/lib/axios";
import { StockItem } from "@/types/stock-item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { data } = await fetch.get<StockItem[]>("/Stock/getall", {
      headers: {
        Authorization: `Bearer ${request.headers.get("Authorization")}`,
      },
    });
    const stockItem = data.find((item) => item.branchId === Number(params.id));
    if (!stockItem) {
      return new NextResponse("Not Found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(stockItem), { status: 200 });
  } catch (error) {
    console.error("Error in GET /stock/[id]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
