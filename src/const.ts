import {
  BBPeriodType,
  EMAPeriodType,
  MACDLengthType,
  RSIPeriodType,
  SMAPeriodType,
} from "./types/indicators.type.js";

export const EXCHANGE = "okx";
export const OHLCV_TIMEFRAME_SETTINGS = [
  // {
  //   tf: "15m",
  //   candles: 40, // 10 hours
  //   candlesForOffset: 250,
  // },
  {
    tf: "1h",
    candles: 48, // 2 days
    candlesForOffset: 250, // get much data to calculate indicators for the real candles
  },
  {
    tf: "4h",
    candles: 20, // 80 hours
    candlesForOffset: 250,
  },
  {
    tf: "1d",
    candles: 10, // 2 weeks
    candlesForOffset: 250,
  },
];

export const MACD_LENGTHS: MACDLengthType[] = [
  {
    shortEMA: 12,
    longEMA: 26,
    signalLine: 9,
    tfs: ["15m", "1h", "4h", "1d"],
  },
  // {
  //   shortEMA: 5,
  //   longEMA: 13,
  //   signalLine: 6,
  //   tfs: ["4h"],
  // },
];

export const RSI_PERIODS: RSIPeriodType[] = [
  {
    period: 14,
    tfs: ["15m", "1h", "4h", "1d"],
  },
];

export const SMA_PERIODS: SMAPeriodType[] = [
  {
    period: 50,
    tfs: ["15m", "1h", "4h", "1d"],
  },
  {
    period: 100,
    tfs: ["1h", "4h", "1d"],
  },
  {
    period: 200,
    tfs: ["1h", "4h", "1d"],
  },
];

export const EMA_PERIODS: EMAPeriodType[] = [
  {
    period: 12,
    tfs: ["15m"],
  },
  {
    period: 26,
    tfs: ["15m"],
  },
  {
    period: 20,
    tfs: ["1h", "4h", "1d"],
  },
];

export const BB_PERIODS: BBPeriodType[] = [
  {
    period: 20,
    stdDev: 2,
    tfs: ["15m", "1h", "4h", "1d"],
  },
];
