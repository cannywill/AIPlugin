import { prepareTemplatedFilepaths, registerHelpers, resolveHelperPromises, } from "./handlebarUtils";
export async function renderTemplatedString(handlebars, template, inputData, availableHelpers, readFile, getUriFromPath) {
    const helperPromises = availableHelpers
        ? registerHelpers(handlebars, availableHelpers)
        : {};
    const ctxProviderNames = availableHelpers?.map((h) => h[0]) ?? [];
    const { withLetterKeys, templateData } = await prepareTemplatedFilepaths(handlebars, template, inputData, ctxProviderNames, readFile, getUriFromPath);
    const templateFn = handlebars.compile(withLetterKeys);
    const renderedString = templateFn(templateData);
    return resolveHelperPromises(renderedString, helperPromises);
}
