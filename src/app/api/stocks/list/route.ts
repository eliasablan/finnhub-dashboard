import { NextResponse } from "next/server";
import { finnhubClient } from "@/lib/finnhub";

export async function GET() {
  const { data } = await finnhubClient.stockSymbols("US");

  return NextResponse.json({ data });
}
