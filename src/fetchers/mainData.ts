import { MainData } from "../types/price.type.js";
import { getCryptoFearGreedIndex } from "./news.js";
import { fetchMultiTimeframeOHLCV, fetchTicker } from "./price.js";

export async function getMainData(assetPair: string): Promise<MainData> {
  const ohlcvData = await fetchMultiTimeframeOHLCV(assetPair);

  const fearAndGreed = await getCryptoFearGreedIndex();
  const tickerData = await fetchTicker(assetPair);
  return {
    ohlcvByTimeframe: ohlcvData,
    cryptoFearAndGreedIndex: fearAndGreed,
    tickerData: tickerData,
  };
}
