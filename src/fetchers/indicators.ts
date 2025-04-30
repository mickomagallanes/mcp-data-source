import { calculateMACD } from "../helpers";
import { OHLCVType } from "../types/price.type";

export function getMacdByOhlcv(ohlcv: OHLCVType[], currentTf: string) {
  const macdData = calculateMACD(ohlcv, currentTf);

  /**
   * attempts to add {"macd-12-26-9": -30.12} structure in ohlcvData
   *
   * I just separated it so ohlcvData could retain its true type
   */
  const macdByLength: { [key: string]: number | string | undefined }[] = [];

  // macd length as name
  macdData.forEach((macdVal) => {
    // assuming that macdData.data has same length as ohlcvData
    macdVal.data.forEach((val, indx) => {
      const lengthName = `${macdVal.shortEMA}-${macdVal.longEMA}-${macdVal.signalLine}`;
      macdByLength[indx] = {
        [`macd-${lengthName}`]: 0,
        [`signal-${lengthName}`]: 0,
        [`histogram-${lengthName}`]: 0,
      };

      macdByLength[indx][`macd-${lengthName}`] = val.MACD;
      macdByLength[indx][`signal-${lengthName}`] = val.signal;
      macdByLength[indx][`histogram-${lengthName}`] = val.histogram;
    });
  });

  return macdByLength;
}
