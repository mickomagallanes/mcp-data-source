export interface MainData {
  ohlcvByTimeframe: OHLCVTimeframeDataType[];
  cryptoFearAndGreedIndex: {
    value: number;
    classification: string;
    timestamp: string;
  };
  tickerData: TickerObjectType;
}
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

export interface TickerObjectType {
  baseVolume: string;
  quoteVolume: string;
  lastPrice: string;
  vwap: string;
  timestamp: string;
}

export type EnhancedOHLCVData = OHLCVType & {
  [key: string]: number | string | undefined;
};
