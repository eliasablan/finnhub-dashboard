import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DefaultApi } from "finnhub-ts";

const finnhubClient = new DefaultApi({
  apiKey: process.env.FINNHUB_API_KEY!,
  isJsonMime: (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  },
});
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> },
) {
  const { symbol } = await params;

  const { data } = await finnhubClient.symbolSearch(symbol);

  return NextResponse.json({ data });
}
