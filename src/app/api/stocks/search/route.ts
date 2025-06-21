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
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const { data } = await finnhubClient.symbolSearch(searchParams.get("q")!);

  return NextResponse.json({ data });
}
