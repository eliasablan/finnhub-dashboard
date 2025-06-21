import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { finnhubClient } from "@/lib/finnhub";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> },
) {
  try {
    const { symbol } = await params;

    // Obtenemos noticias de los últimos 30 días
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 30);

    const { data } = await finnhubClient.companyNews(
      symbol,
      from.toISOString().split("T")[0],
      to.toISOString().split("T")[0],
    );

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Error fetching news data" },
      { status: 500 },
    );
  }
}
