import OpenAI from "./OpenAI.js";
class Tensorix extends OpenAI {
    static providerName = "tensorix";
    static defaultOptions = {
        apiBase: "https://api.tensorix.ai/v1/",
        model: "deepseek/deepseek-chat-v3.1",
        useLegacyCompletionsEndpoint: false,
    };
}
export default Tensorix;
