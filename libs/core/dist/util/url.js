import { extractBase64FromDataUrl as extractBase64FromDataUrlFromAdapter, parseDataUrl as parseDataUrlFromAdapter, } from "@continuedev/openai-adapters";
export function canParseUrl(url) {
    if (URL?.canParse) {
        return URL.canParse(url);
    }
    try {
        new URL(url);
        return true;
    }
    catch (e) {
        return false;
    }
}
export const parseDataUrl = parseDataUrlFromAdapter;
export const extractBase64FromDataUrl = extractBase64FromDataUrlFromAdapter;
