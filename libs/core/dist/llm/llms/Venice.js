import OpenAI from "./OpenAI";
class Venice extends OpenAI {
    static providerName = "venice";
    static defaultOptions = {
        apiBase: "https://api.venice.ai/api/v1/",
    };
    _convertArgs(options, messages) {
        const finalOptions = super._convertArgs(options, messages);
        if ("venice_parameters" in options &&
            typeof options.venice_parameters === "object") {
            finalOptions.venice_parameters = { ...options.venice_parameters };
        }
        return finalOptions;
    }
}
export default Venice;
