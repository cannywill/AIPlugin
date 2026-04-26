import OpenAI from "./OpenAI";
class Nous extends OpenAI {
    static providerName = "nous";
    static defaultOptions = {
        apiBase: "https://inference-api.nousresearch.com/v1",
        useLegacyCompletionsEndpoint: false,
    };
}
export default Nous;
