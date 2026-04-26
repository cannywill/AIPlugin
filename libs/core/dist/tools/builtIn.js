export var BuiltInToolNames;
(function (BuiltInToolNames) {
    BuiltInToolNames["ReadFile"] = "read_file";
    BuiltInToolNames["ReadFileRange"] = "read_file_range";
    BuiltInToolNames["EditExistingFile"] = "edit_existing_file";
    BuiltInToolNames["SingleFindAndReplace"] = "single_find_and_replace";
    BuiltInToolNames["MultiEdit"] = "multi_edit";
    BuiltInToolNames["ReadCurrentlyOpenFile"] = "read_currently_open_file";
    BuiltInToolNames["CreateNewFile"] = "create_new_file";
    BuiltInToolNames["RunTerminalCommand"] = "run_terminal_command";
    BuiltInToolNames["GrepSearch"] = "grep_search";
    BuiltInToolNames["FileGlobSearch"] = "file_glob_search";
    BuiltInToolNames["SearchWeb"] = "search_web";
    BuiltInToolNames["ViewDiff"] = "view_diff";
    BuiltInToolNames["LSTool"] = "ls";
    BuiltInToolNames["CreateRuleBlock"] = "create_rule_block";
    BuiltInToolNames["RequestRule"] = "request_rule";
    BuiltInToolNames["FetchUrlContent"] = "fetch_url_content";
    BuiltInToolNames["CodebaseTool"] = "codebase";
    BuiltInToolNames["ReadSkill"] = "read_skill";
    // excluded from allTools for now
    BuiltInToolNames["ViewRepoMap"] = "view_repo_map";
    BuiltInToolNames["ViewSubdirectory"] = "view_subdirectory";
})(BuiltInToolNames || (BuiltInToolNames = {}));
export const BUILT_IN_GROUP_NAME = "Built-In";
export const CLIENT_TOOLS_IMPLS = [
    BuiltInToolNames.EditExistingFile,
    BuiltInToolNames.SingleFindAndReplace,
    BuiltInToolNames.MultiEdit,
];
