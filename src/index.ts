import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getMainData } from "./fetchers/mainData.js";
import { z } from "zod";

const server = new McpServer({ name: "MCP Server", version: "1.0.0" });

server.tool(
  "get-crypto-data",
  { asset: z.string().describe("CCXT Trading Pair (e.g.: XRP/USDT") },
  async ({ asset }) => {
    const response = await getMainData(asset);

    return {
      content: [{ type: "text", text: JSON.stringify(response) }],
    };
  }
);

async function main() {
  // const response = await getMainData("XRP/USDT");

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
