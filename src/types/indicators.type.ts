import { MACDOutput } from "technicalindicators/declarations/moving_averages/MACD.js";

export interface MACDLengthType {
  shortEMA: number;
  longEMA: number;
  signalLine: number;
  tfs: string[];
}

export interface RSIPeriodType {
  period: number;
  tfs: string[];
}

export interface SMAPeriodType {
  period: number;
  tfs: string[];
}

export interface EMAPeriodType {
  period: number;
  tfs: string[];
}

export interface BBPeriodType {
  period: number;
  stdDev: number; // standard Deviation multiplier
  tfs: string[];
}

export type CalculateMACDReturnType = Pick<
  MACDLengthType,
  "shortEMA" | "longEMA" | "signalLine"
> & { data: MACDOutput[] };
