import { MACD } from "technicalindicators";
import { CalculateMACDReturnType, OHLCVType } from "./types/price.type";
import { MACD_LENGTHS } from "./const";

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
