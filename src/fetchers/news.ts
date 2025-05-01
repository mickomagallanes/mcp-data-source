import * as cheerio from "cheerio";

export async function getCryptoFearGreedIndex() {
  try {
    const response = await fetch("https://api.alternative.me/fng/");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const result = data.data[0];

    return {
      value: parseInt(result.value),
      classification: result.value_classification,
      timestamp: result.timestamp,
    };
  } catch (error) {
    console.error("Error fetching Crypto Fear & Greed Index:", error);
    throw new Error("Failed to fetch Crypto Fear & Greed Index");
  }
}
