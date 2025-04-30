import ccxt from "ccxt";
import { OHLCV_TIMEFRAME_SETTINGS } from "../const";
import {
  EnhancedOHLCVData,
  OHLCVTimeframeDataType,
  OHLCVType,
} from "../types/price.type";
import { getMacdByOhlcv } from "./indicators";

export async function fetchOHLCV(
  symbol: string,
  timeframe: string,
  since?: number,
  limit?: number
): Promise<OHLCVType[]> {
  try {
    const exchange = new ccxt.okx({
      enableRateLimit: true,
    }); // any exchange since this is public API

    const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, since, limit);

    return ohlcv.map((candle) => ({
      timestamp: Number(candle[0]) || 0,
      open: Number(candle[1]) || 0,
      high: Number(candle[2]) || 0,
      low: Number(candle[3]) || 0,
      close: Number(candle[4]) || 0,
      volume: Number(candle[5]) || 0,
    }));
  } catch (error) {
    console.error(`Error fetching OHLCV data:`, error);
    throw error;
  }
}

export async function fetchMultiTimeframeOHLCV(
  symbol: string
): Promise<OHLCVTimeframeDataType[]> {
  const data = [];

  for (let timeframe of OHLCV_TIMEFRAME_SETTINGS) {
    const ohlcvData = await fetchOHLCV(
      symbol,
      timeframe.tf,
      undefined,
      timeframe.candles
    );

    const enhancedOhlcvArr: EnhancedOHLCVData[] = [
      JSON.parse(JSON.stringify(ohlcvData)),
      getMacdByOhlcv(ohlcvData, timeframe.tf),
    ];

    const enhancedOhlcv = ohlcvData.map((_, index) =>
      Object.assign({}, ...enhancedOhlcvArr.map((arr) => arr[index]))
    );

    console.log(enhancedOhlcv);
    data.push({ timeframe: timeframe.tf, ohlcv: enhancedOhlcv });
  }

  return data;
}
