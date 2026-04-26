/**
 * 文件类型：工具集合
 * 文件作用：组织工具定义与序列化逻辑。
 * 主要职责：为 Flutter 环境提供可用工具列表与序列化能力。
 */
import { ConfigDependentToolParams, Tool } from "..";
import { isRecommendedAgentModel } from "../llm/toolSupport";
import * as toolDefinitions from "./definitions";

// I'm writing these as functions because we've messed up 3 TIMES by pushing to const, causing duplicate tool definitions on subsequent config loads.
export const getBaseToolDefinitions = () => [
  toolDefinitions.readFileTool,
  toolDefinitions.createNewFileTool,
  toolDefinitions.runTerminalCommandTool,
  toolDefinitions.globSearchTool,
  toolDefinitions.viewDiffTool,
  toolDefinitions.readCurrentlyOpenFileTool,
  toolDefinitions.lsTool,
  toolDefinitions.createRuleBlock,
  toolDefinitions.fetchUrlContentTool,
];

export const getConfigDependentToolDefinitions = async (
  params: ConfigDependentToolParams,
): Promise<Tool[]> => {
  const { modelName, isSignedIn, enableExperimentalTools, isRemote } = params;
  const tools: Tool[] = [];

  tools.push(await toolDefinitions.requestRuleTool(params));
  tools.push(await toolDefinitions.readSkillTool(params));

  if (isSignedIn) {
    // Web search is only available for signed-in users
    tools.push(toolDefinitions.searchWebTool);
  }

  if (enableExperimentalTools) {
    tools.push(
      toolDefinitions.viewRepoMapTool,
      toolDefinitions.viewSubdirectoryTool,
      toolDefinitions.codebaseTool,
      toolDefinitions.readFileRangeTool,
    );
  }

  if (modelName && isRecommendedAgentModel(modelName)) {
    tools.push(toolDefinitions.multiEditTool);
  } else {
    tools.push(toolDefinitions.editFileTool);
    tools.push(toolDefinitions.singleFindAndReplaceTool);
  }

  // Flutter 环境统一走本地执行，不区分远程 OS
  if (!isRemote) {
    tools.push(toolDefinitions.grepSearchTool);
  }

  return tools;
};

export function serializeTool(tool: Tool) {
  const { preprocessArgs, evaluateToolCallPolicy, ...rest } = tool;
  return rest;
}
