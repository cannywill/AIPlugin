import { getLastNUriRelativePathParts } from "../../util/uri";
import { AutocompleteSnippetType, } from "../snippets/types";
const getCommentMark = (helper) => {
    return helper.lang.singleLineComment;
};
const addCommentMarks = (text, helper) => {
    const commentMark = getCommentMark(helper);
    return text
        .trim()
        .split("\n")
        .map((line) => `${commentMark} ${line}`)
        .join("\n");
};
const formatClipboardSnippet = (snippet, workspaceDirs) => {
    return formatCodeSnippet({
        filepath: "file:///Untitled.txt",
        content: snippet.content,
        type: AutocompleteSnippetType.Code,
    }, workspaceDirs);
};
const formatCodeSnippet = (snippet, workspaceDirs) => {
    return {
        ...snippet,
        content: `Path: ${getLastNUriRelativePathParts(workspaceDirs, snippet.filepath, 2)}\n${snippet.content}`,
    };
};
const formatDiffSnippet = (snippet) => {
    return snippet;
};
const formatStaticSnippet = (snippet) => {
    return snippet;
};
const commentifySnippet = (helper, snippet) => {
    return {
        ...snippet,
        content: addCommentMarks(snippet.content, helper),
    };
};
export const formatSnippets = (helper, snippets, workspaceDirs) => {
    const currentFilepathComment = addCommentMarks(getLastNUriRelativePathParts(workspaceDirs, helper.filepath, 2), helper);
    return (snippets
        .map((snippet) => {
        switch (snippet.type) {
            case AutocompleteSnippetType.Code:
                return formatCodeSnippet(snippet, workspaceDirs);
            case AutocompleteSnippetType.Diff:
                return formatDiffSnippet(snippet);
            case AutocompleteSnippetType.Clipboard:
                return formatClipboardSnippet(snippet, workspaceDirs);
            case AutocompleteSnippetType.Static:
                return formatStaticSnippet(snippet);
        }
    })
        .map((item) => {
        return commentifySnippet(helper, item).content;
    })
        .join("\n") + `\n${currentFilepathComment}`);
};
