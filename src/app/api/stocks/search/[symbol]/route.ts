import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { finnhubClient } from "@/lib/finnhub";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> },
) {
  const { symbol } = await params;

  const { data } = await finnhubClient.symbolSearch(symbol);

  return NextResponse.json({ data });
}
