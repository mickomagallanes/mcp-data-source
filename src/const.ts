import { MACDLengthType } from "./types/price.type";

export const EXCHANGE = "okx";
export const OHLCV_TIMEFRAME_SETTINGS = [
  {
    tf: "1m",
    candles: 2000,
  },
  {
    tf: "5m",
    candles: 1500,
  },
  {
    tf: "15m",
    candles: 1000,
  },
  {
    tf: "1h",
    candles: 800,
  },
  {
    tf: "4h",
    candles: 400,
  },
  {
    tf: "1d",
    candles: 200,
  },
];

export const MACD_LENGTHS: MACDLengthType[] = [
  {
    shortEMA: 12,
    longEMA: 26,
    signalLine: 9,
    tfs: ["30m", "1h", "4h", "1d"],
  },
];
