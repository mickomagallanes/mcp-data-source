# mcp-data-source

API service for the MCP trading software. This fetches multiple data sources that the MCP server utilizes. 

The trading bot could also utilize this API, though we preferably choose to directly utilize `ccxt` there to reduce the process.

Data that we fetch, that the LLM (MCP Client) could analyze:

1. Crypto OHLCV price, market price, volume, RSI, MACD, MA/EMA, Bollinger Bands, etc (ccxt library)
2. M2 Global Liquidity Index / inflation / interest rates
3. Watcher Guru news
4. Twitter trends related to economics, politics, crypto, stocks, etc
5. Active addresses
6. Exchange inflow/outflow
7. Miner activity / hash rate
8. Wallet balances (whales, smart money)
9. Stablecoin supply
10. Fear & Greed Index
11. News sentiment
12. Google Trends
13. Bitcoin halving countdown
14. Stablecoin dominance
15. Total crypto market cap
16. DXY / USD Index
17. Whale wallet tracking
18. CEX vs DEX volume ratio
19. Liquidity heatmap
20. ISM chart tracks
