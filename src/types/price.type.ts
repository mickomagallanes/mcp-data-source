import { MACDOutput } from "technicalindicators/declarations/moving_averages/MACD";

export interface OHLCVTimeframeDataType {
  timeframe: string;
  ohlcv: OHLCVType[];
}

export interface OHLCVType {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MACDLengthType {
  shortEMA: number;
  longEMA: number;
  signalLine: number;
  tfs: string[];
}

export type CalculateMACDReturnType = Pick<
  MACDLengthType,
  "shortEMA" | "longEMA" | "signalLine"
> & { data: MACDOutput[] };

export type EnhancedOHLCVData = OHLCVType & {
  [key: string]: number | string | undefined;
};
