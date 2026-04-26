import OpenAI from "./OpenAI.js";
class Azure extends OpenAI {
    static providerName = "azure";
    supportsPrediction(model) {
        return false;
    }
    useOpenAIAdapterFor = [];
    static defaultOptions = {
        apiVersion: "2024-02-15-preview",
        apiType: "azure-openai",
    };
    constructor(options) {
        super(options);
        this.deployment = options.deployment ?? options.model;
    }
}
export default Azure;
