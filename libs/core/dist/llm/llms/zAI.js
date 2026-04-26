import OpenAI from "./OpenAI.js";
class zAI extends OpenAI {
    static providerName = "zAI";
    static defaultOptions = {
        apiBase: "https://api.z.ai/api/paas/v4/",
        useLegacyCompletionsEndpoint: false,
    };
}
export default zAI;
