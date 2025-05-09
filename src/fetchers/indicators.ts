import {
  calculateBoll,
  calculateEma,
  calculateMACD,
  calculateRsi,
  calculateSma,
  roundToDecimals,
} from "../helpers.js";
import { OHLCVType } from "../types/price.type.js";

export function getMacdByOhlcv(ohlcv: OHLCVType[], currentTf: string) {
  const macdArrObj = calculateMACD(ohlcv, currentTf);

  /**
   * attempts to add {"macd-12-26-9": -30.12} structure in ohlcvData
   *
   * I just separated it so ohlcvData could retain its true type
   */
  const macdByLength: { [key: string]: number | string | undefined }[] = [];

  // loop each macd length to use it as name
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

        macdByLength[indx][`macd-${lengthName}`] = roundToDecimals(
          macdData.MACD ?? 0,
          6
        );
        macdByLength[indx][`signal-${lengthName}`] = roundToDecimals(
          macdData.signal ?? 0,
          6
        );
        macdByLength[indx][`histogram-${lengthName}`] = roundToDecimals(
          macdData.histogram ?? 0,
          6
        );

        macdDataCount = macdDataCount + 1;
      }
    });
  });

  return macdByLength;
}

export function getRsiByOhlcv(ohlcv: OHLCVType[], currentTf: string) {
  const rsiArray = calculateRsi(ohlcv, currentTf);

  /**
   * attempts to add {"rsi-14": -30.12} structure in ohlcvData
   *
   * I just separated it so ohlcvData could retain its true type
   */
  const rsiByPeriod: { [key: string]: number | string | undefined }[] = [];

  // loop each rsi period to use it as name
  rsiArray.forEach((rsiVal) => {
    // for example: 27 - 2 - 1 = 0-24 (25 in real number)
    const rsiOffset = ohlcv.length - rsiVal.data.length - 1;

    // to access the actual macd data, start from 0
    let rsiDataCount = 0;

    ohlcv.forEach((_, indx) => {
      const periodName = `${rsiVal.period}`;
      rsiByPeriod[indx] = {
        ...rsiByPeriod[indx],
        [`rsi-${periodName}`]: 0,
      };

      // put undefined on the ones that are offset by rsiData, beyond 24 has a real rsiData value
      if (indx <= rsiOffset) {
        rsiByPeriod[indx][`rsi-${periodName}`] = undefined;
      } else {
        /**
         * to access the index of rsiData that is shorter than ohlcv
         *
         * rsiData array has 2 (0-1) length, ohlcv has 27 (0-26), offset is 25 (0-24)
         *
         */
        const rsiData = rsiVal.data[rsiDataCount];

        rsiByPeriod[indx][`rsi-${periodName}`] = rsiData;

        rsiDataCount = rsiDataCount + 1;
      }
    });
  });

  return rsiByPeriod;
}

export function getSmaByOhlcv(ohlcv: OHLCVType[], currentTf: string) {
  const smaArray = calculateSma(ohlcv, currentTf);

  /**
   * attempts to add {"sma-20": -30.12} structure in ohlcvData
   *
   * I just separated it so ohlcvData could retain its true type
   */
  const smaByPeriod: { [key: string]: number | string | undefined }[] = [];

  // loop each sma period to use it as name
  smaArray.forEach((smaVal) => {
    // for example: 27 - 2 - 1 = 0-24 (25 in real number)
    const smaOffset = ohlcv.length - smaVal.data.length - 1;

    // to access the actual macd data, start from 0
    let smaDataCount = 0;

    ohlcv.forEach((_, indx) => {
      const periodName = `${smaVal.period}`;
      smaByPeriod[indx] = {
        ...smaByPeriod[indx],
        [`sma-${periodName}`]: 0,
      };

      // put undefined on the ones that are offset by smaData, beyond 24 has a real smaData value
      if (indx <= smaOffset) {
        smaByPeriod[indx][`sma-${periodName}`] = undefined;
      } else {
        /**
         * to access the index of smaData that is shorter than ohlcv
         *
         * smaData array has 2 (0-1) length, ohlcv has 27 (0-26), offset is 25 (0-24)
         *
         */
        const smaData = smaVal.data[smaDataCount];

        smaByPeriod[indx][`sma-${periodName}`] = roundToDecimals(smaData, 4);

        smaDataCount = smaDataCount + 1;
      }
    });
  });

  return smaByPeriod;
}

export function getEmaByOhlcv(ohlcv: OHLCVType[], currentTf: string) {
  const emaArray = calculateEma(ohlcv, currentTf);

  /**
   * attempts to add {"ema-12": -30.12} structure in ohlcvData
   *
   * I just separated it so ohlcvData could retain its true type
   */
  const emaByPeriod: { [key: string]: number | string | undefined }[] = [];

  // loop each ema period to use it as name
  emaArray.forEach((emaVal) => {
    // for example: 27 - 2 - 1 = 0-24 (25 in real number)
    const emaOffset = ohlcv.length - emaVal.data.length - 1;

    // to access the actual macd data, start from 0
    let emaDataCount = 0;

    ohlcv.forEach((_, indx) => {
      const periodName = `${emaVal.period}`;
      emaByPeriod[indx] = {
        ...emaByPeriod[indx],
        [`ema-${periodName}`]: 0,
      };

      // put undefined on the ones that are offset by emaData, beyond 24 has a real emaData value
      if (indx <= emaOffset) {
        emaByPeriod[indx][`ema-${periodName}`] = undefined;
      } else {
        /**
         * to access the index of emaData that is shorter than ohlcv
         *
         * emaData array has 2 (0-1) length, ohlcv has 27 (0-26), offset is 25 (0-24)
         *
         */
        const emaData = emaVal.data[emaDataCount];

        emaByPeriod[indx][`ema-${periodName}`] = roundToDecimals(emaData, 4);

        emaDataCount = emaDataCount + 1;
      }
    });
  });

  return emaByPeriod;
}

export function getBollByOhlcv(ohlcv: OHLCVType[], currentTf: string) {
  const bollArrObj = calculateBoll(ohlcv, currentTf);

  /**
   * attempts to add {"lower-boll-20-2": -30.12} structure in ohlcvData
   *
   * I just separated it so ohlcvData could retain its true type
   */
  const bollByLength: { [key: string]: number | string | undefined }[] = [];

  // loop each boll length to use it as name
  bollArrObj.forEach((bollVal) => {
    // for example: 27 - 2 - 1 = 0-24 (25 in real number)
    const bollOffset = ohlcv.length - bollVal.data.length - 1;

    // to access the actual boll data, start from 0
    let bollDataCount = 0;

    ohlcv.forEach((_, indx) => {
      const lengthName = `boll-${bollVal.period}-${bollVal.stdDev}`;
      bollByLength[indx] = {
        ...bollByLength[indx],
        [`lower-${lengthName}`]: 0,
        [`middle-${lengthName}`]: 0,
        [`upper-${lengthName}`]: 0,
      };

      // put undefined on the ones that are offset by boll, beyond 24 has a real boll value
      if (indx <= bollOffset) {
        bollByLength[indx][`lower-${lengthName}`] = undefined;
        bollByLength[indx][`middle-${lengthName}`] = undefined;
        bollByLength[indx][`upper-${lengthName}`] = undefined;
      } else {
        /**
         * to access the index of bollData that is shorter than ohlcv
         *
         * bollData array has 2 (0-1) length, ohlcv has 27 (0-26), offset is 25 (0-24)
         *
         */
        const bollData = bollVal.data[bollDataCount];

        bollByLength[indx][`lower-${lengthName}`] = roundToDecimals(
          bollData.lower,
          4
        );
        bollByLength[indx][`middle-${lengthName}`] = roundToDecimals(
          bollData.middle,
          4
        );
        bollByLength[indx][`upper-${lengthName}`] = roundToDecimals(
          bollData.upper,
          4
        );

        bollDataCount = bollDataCount + 1;
      }
    });
  });

  return bollByLength;
}
