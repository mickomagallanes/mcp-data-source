import ccxt from "ccxt";
import { OHLCV_TIMEFRAME_SETTINGS } from "../const.js";
import {
  EnhancedOHLCVData,
  OHLCVTimeframeDataType,
  OHLCVType,
  TickerObjectType,
} from "../types/price.type.js";
import {
  getBollByOhlcv,
  getEmaByOhlcv,
  getMacdByOhlcv,
  getRsiByOhlcv,
  getSmaByOhlcv,
} from "./indicators.js";
import { roundToDecimals } from "../helpers.js";

const exchange = new ccxt.okx({
  enableRateLimit: true,
}); // any exchange since this is public API

export async function fetchOHLCV(
  symbol: string,
  timeframe: string,
  since?: number,
  limit?: number
): Promise<OHLCVType[]> {
  try {
    const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, since, limit);

    return ohlcv.map((candle) => ({
      timestamp: Number(candle[0]) || 0,
      open: Number(candle[1]) || 0,
      high: Number(candle[2]) || 0,
      low: Number(candle[3]) || 0,
      close: Number(candle[4]) || 0,
      volume: roundToDecimals(Number(candle[5]), 2) || 0,
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
      timeframe.candlesForOffset
    );

    const aggregatedData = [
      JSON.parse(JSON.stringify(ohlcvData)),
      getMacdByOhlcv(ohlcvData, timeframe.tf),
      getRsiByOhlcv(ohlcvData, timeframe.tf),
      getSmaByOhlcv(ohlcvData, timeframe.tf),
      getEmaByOhlcv(ohlcvData, timeframe.tf),
      getBollByOhlcv(ohlcvData, timeframe.tf),
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
         'macd-3-13-6': -0.0004545282869830025,
        'signal-3-13-6': 0.01419077640971805,
        'histogram-3-13-6': -0.014645304696701052
       }
     */
    const enhancedOhlcv: EnhancedOHLCVData[] = ohlcvData
      .map((_, index) =>
        Object.assign({}, ...aggregatedData.map((arr) => arr[index]))
      )
      .slice(-timeframe.candles); // only take the real candles quantity

    data.push({ timeframe: timeframe.tf, ohlcv: enhancedOhlcv });
  }

  return data;
}

export async function fetchTicker(symbol: string): Promise<TickerObjectType> {
  try {
    const tickerData = await exchange.fetchTicker(symbol);

    return {
      baseVolume: `${roundToDecimals(tickerData.baseVolume ?? 0, 2)}`,
      quoteVolume: `${roundToDecimals(tickerData.quoteVolume ?? 0, 2)}`,
      lastPrice: `${tickerData.last}`,
      vwap: `${roundToDecimals(tickerData.vwap ?? 0, 6)}`,
      timestamp: `${tickerData.timestamp}`,
    };
  } catch (error) {
    console.error(`Error fetching Ticker data:`, error);
    throw error;
  }
}
