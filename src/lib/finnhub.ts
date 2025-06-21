import { DefaultApi } from "finnhub-ts";

export const finnhubClient = new DefaultApi({
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
