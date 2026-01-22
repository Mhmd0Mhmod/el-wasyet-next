import { getServicesServer } from "@/data/orders";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const res = await getServicesServer();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
