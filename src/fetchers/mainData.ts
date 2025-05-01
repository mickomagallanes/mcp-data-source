import { getCryptoFearGreedIndex } from "./news";
import { fetchMultiTimeframeOHLCV } from "./price";
import { MainData } from "../types/price.type";

export async function getMainData(): Promise<MainData> {
  const ohlcvData = await fetchMultiTimeframeOHLCV("XRP/USDT");
  const fearAndGreed = await getCryptoFearGreedIndex();

  return { ohlcvByTimeframe: ohlcvData, cryptoFearAndGreedIndex: fearAndGreed };
}
