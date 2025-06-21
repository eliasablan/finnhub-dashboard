import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { finnhubClient } from "@/lib/finnhub";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const { data } = await finnhubClient.symbolSearch(searchParams.get("q")!);

  return NextResponse.json({ data });
}
