import { calculateMACD } from "../helpers.js";
import { OHLCVType } from "../types/price.type.js";

export function getMacdByOhlcv(ohlcv: OHLCVType[], currentTf: string) {
  const macdArrObj = calculateMACD(ohlcv, currentTf);

  /**
   * attempts to add {"macd-12-26-9": -30.12} structure in ohlcvData
   *
   * I just separated it so ohlcvData could retain its true type
   */
  const macdByLength: { [key: string]: number | string | undefined }[] = [];

  // macd length as name
  macdArrObj.forEach((macdVal) => {
    // for example: 27 - 2 - 1 = 0-24 (25 in real number)
    const macdOffset = ohlcv.length - macdVal.data.length - 1;

    // to access the actual macd data, start from 0
    let macdDataCount = 0;

    ohlcv.forEach((_, indx) => {
      const lengthName = `${macdVal.shortEMA}-${macdVal.longEMA}-${macdVal.signalLine}`;
      macdByLength[indx] = {
        ...macdByLength[indx],
        [`macd-${lengthName}`]: 0,
        [`signal-${lengthName}`]: 0,
        [`histogram-${lengthName}`]: 0,
      };

      // put undefined on the ones that are offset by macd, beyond 24 has a real macd value
      if (indx <= macdOffset) {
        macdByLength[indx][`macd-${lengthName}`] = undefined;
        macdByLength[indx][`signal-${lengthName}`] = undefined;
        macdByLength[indx][`histogram-${lengthName}`] = undefined;
      } else {
        /**
         * to access the index of macdData that is shorter than ohlcv
         *
         * macdData array has 2 (0-1) length, ohlcv has 27 (0-26), offset is 25 (0-24)
         *
         */
        const macdData = macdVal.data[macdDataCount];

        macdByLength[indx][`macd-${lengthName}`] = macdData.MACD;
        macdByLength[indx][`signal-${lengthName}`] = macdData.signal;
        macdByLength[indx][`histogram-${lengthName}`] = macdData.histogram;

        macdDataCount = macdDataCount + 1;
      }
    });
  });

  return macdByLength;
}
