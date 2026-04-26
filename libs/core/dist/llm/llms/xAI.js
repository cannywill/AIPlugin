import OpenAI from "./OpenAI.js";
class xAI extends OpenAI {
    static providerName = "xAI";
    static defaultOptions = {
        apiBase: "https://api.x.ai/v1/",
    };
    supportsCompletions() {
        return false;
    }
}
export default xAI;
