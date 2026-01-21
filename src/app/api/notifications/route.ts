import { getNotificationsServer } from "@/data/notifications";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await getNotificationsServer();

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notifications" },
      {
        status: 500,
      },
    );
  }
}
