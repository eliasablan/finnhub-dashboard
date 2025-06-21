import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { finnhubClient } from "@/lib/finnhub";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> },
) {
  try {
    const { symbol } = await params;

    const { data } = await finnhubClient.quote(symbol);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Error fetching quote data" },
      { status: 500 },
    );
  }
}
