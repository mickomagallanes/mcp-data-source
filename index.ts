import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getMainData } from "./src/fetchers/mainData";

const server = new McpServer({ name: "MCP Server", version: "1.0.0" });

server.resource("market", "api://market", async (uri) => {
  const response = await getMainData();

  return {
    contents: [{ uri: uri.href, type: "text", text: JSON.stringify(response) }],
  };
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
