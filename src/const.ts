import { MACDLengthType } from "./types/price.type.js";

export const EXCHANGE = "okx";
export const OHLCV_TIMEFRAME_SETTINGS = [
  // {
  //   tf: "1m",
  //   candles: 2000,
  // },
  // {
  //   tf: "5m",
  //   candles: 1500,
  // },
  // {
  //   tf: "15m",
  //   candles: 1000,
  // },
  // {
  //   tf: "30m",
  //   candles: 900,
  // },
  {
    tf: "1h",
    candles: 30,
  },
  {
    tf: "4h",
    candles: 27,
  },
  // {
  //   tf: "1d",
  //   candles: 200,
  // },
];

export const MACD_LENGTHS: MACDLengthType[] = [
  {
    shortEMA: 12,
    longEMA: 26,
    signalLine: 9,
    tfs: ["30m", "1h", "4h", "1d"],
  },
  // {
  //   shortEMA: 5,
  //   longEMA: 13,
  //   signalLine: 6,
  //   tfs: ["4h"],
  // },
];
