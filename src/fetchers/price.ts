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

    /**
     * structure:
       {
        timestamp: 1737331200000,
        open: 2.9575,
        high: 3.3715,
        low: 2.9071,
        close: 3.1052,
        volume: 132340657.84939,
        'macd-12-26-9': -0.0749437916600022,
        'signal-12-26-9': -0.06977646440043456,
        'histogram-12-26-9': -0.0051673272595676445
       }
     */
    const enhancedOhlcv = ohlcvData.map((_, index) =>
      Object.assign({}, ...enhancedOhlcvArr.map((arr) => arr[index]))
    );

    data.push({ timeframe: timeframe.tf, ohlcv: enhancedOhlcv });
  }

  return data;
}
