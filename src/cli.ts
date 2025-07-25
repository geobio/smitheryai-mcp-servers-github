#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import createServer, { configSchema } from "./index.js";

async function main() {
  // Get GitHub token from environment variable or command line argument
  const githubToken = process.env.GITHUB_TOKEN || process.argv[2];
  
  if (!githubToken) {
    console.error("Error: GitHub token is required.");
    console.error("Provide it via GITHUB_TOKEN environment variable or as a command line argument:");
    console.error("  GITHUB_TOKEN=your_token npx @smithery/mcp-github");
    console.error("  npx @smithery/mcp-github your_token");
    process.exit(1);
  }

  try {
    // Validate config
    const config = configSchema.parse({
      githubPersonalAccessToken: githubToken
    });

    // Create the server
    const server = createServer({ config });

    // Set up stdio transport
    const transport = new StdioServerTransport();
    
    // Start the server
    await server.connect(transport);
    
    console.error("GitHub MCP Server running on stdio");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
}); 