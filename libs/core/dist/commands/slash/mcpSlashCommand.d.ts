import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SlashCommandWithSource } from "../../index.js";
export declare function constructMcpSlashCommand(client: Client, name: string, description?: string, args?: string[]): SlashCommandWithSource;
export declare function stringifyMcpPrompt(prompt: Awaited<ReturnType<typeof Client.prototype.getPrompt>>): string;
//# sourceMappingURL=mcpSlashCommand.d.ts.map