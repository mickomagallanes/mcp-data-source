import { EMA, MACD, RSI, SMA } from "technicalindicators";
import { CalculateMACDReturnType, OHLCVType } from "./types/price.type.js";
import {
  EMA_PERIODS,
  MACD_LENGTHS,
  RSI_PERIODS,
  SMA_PERIODS,
} from "./const.js";

export function calculateMACD(ohlcv: OHLCVType[], currentTf: string) {
  let resultArr: CalculateMACDReturnType[] = [];

  for (let length of MACD_LENGTHS) {
    // adjust to the candlesticks settings of MACD
    const closes = ohlcv.map((c) => c.close);

    // because I dont expect this to be empty
    if (!closes.length && !closes.every((cl) => typeof cl === "number")) {
      throw new Error(
        `❌ Closed prices array supplied to calculate the MACD is 
          either empty or contains a non-number`
      );
    }

    // if currentTf is not in corresponding tfs, then skip
    if (length.tfs.includes(currentTf)) {
      const macdInput = {
        values: closes,
        fastPeriod: length.shortEMA,
        slowPeriod: length.longEMA,
        signalPeriod: length.signalLine,
        SimpleMAOscillator: false,
        SimpleMASignal: false,
      };

      const macdResult = MACD.calculate(macdInput);

      const resultObj = {
        shortEMA: length.shortEMA,
        longEMA: length.longEMA,
        signalLine: length.signalLine,
        data: macdResult,
      };
      resultArr.push(resultObj);
    }
  }

  return resultArr;
}

export function calculateRsi(ohlcv: OHLCVType[], currentTf: string) {
  let resultArr = [];

  for (let rsiPeriod of RSI_PERIODS) {
    // adjust to the candlesticks settings of RSI
    const closes = ohlcv.map((c) => c.close);

    // because I dont expect this to be empty
    if (!closes.length && !closes.every((cl) => typeof cl === "number")) {
      throw new Error(
        `❌ Closed prices array supplied to calculate the RSI is 
          either empty or contains a non-number`
      );
    }

    // if currentTf is not in corresponding tfs, then skip
    if (rsiPeriod.tfs.includes(currentTf)) {
      const rsiInput = {
        values: closes,
        period: rsiPeriod.period,
      };

      const rsiResult = RSI.calculate(rsiInput);

      const resultObj = {
        data: rsiResult,
        period: rsiPeriod.period,
      };
      resultArr.push(resultObj);
    }
  }

  return resultArr;
}

export function calculateSma(ohlcv: OHLCVType[], currentTf: string) {
  let resultArr = [];

  for (let smaPeriod of SMA_PERIODS) {
    // adjust to the candlesticks settings of SMA
    const closes = ohlcv.map((c) => c.close);

    // because I dont expect this to be empty
    if (!closes.length && !closes.every((cl) => typeof cl === "number")) {
      throw new Error(
        `❌ Closed prices array supplied to calculate the SMA is 
          either empty or contains a non-number`
      );
    }

    // if currentTf is not in corresponding tfs, then skip
    if (smaPeriod.tfs.includes(currentTf)) {
      const smaInput = {
        values: closes,
        period: smaPeriod.period,
      };

      const smaResult = SMA.calculate(smaInput);

      const resultObj = {
        data: smaResult,
        period: smaPeriod.period,
      };
      resultArr.push(resultObj);
    }
  }

  return resultArr;
}

export function calculateEma(ohlcv: OHLCVType[], currentTf: string) {
  let resultArr = [];

  for (let emaPeriod of EMA_PERIODS) {
    // adjust to the candlesticks settings of EMA
    const closes = ohlcv.map((c) => c.close);

    // because I dont expect this to be empty
    if (!closes.length && !closes.every((cl) => typeof cl === "number")) {
      throw new Error(
        `❌ Closed prices array supplied to calculate the EMA is 
          either empty or contains a non-number`
      );
    }

    // if currentTf is not in corresponding tfs, then skip
    if (emaPeriod.tfs.includes(currentTf)) {
      const emaInput = {
        values: closes,
        period: emaPeriod.period,
      };

      const emaResult = EMA.calculate(emaInput);

      const resultObj = {
        data: emaResult,
        period: emaPeriod.period,
      };
      resultArr.push(resultObj);
    }
  }

  return resultArr;
}
