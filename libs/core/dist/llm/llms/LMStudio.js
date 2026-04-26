import OpenAI from "./OpenAI.js";
class LMStudio extends OpenAI {
    static providerName = "lmstudio";
    static defaultOptions = {
        apiBase: "http://localhost:1234/v1/",
    };
}
export default LMStudio;
