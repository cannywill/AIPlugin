import OpenAI from "./OpenAI.js";
class Fireworks extends OpenAI {
    static providerName = "fireworks";
    static defaultOptions = {
        apiBase: "https://api.fireworks.ai/inference/v1/",
    };
    static modelConversion = {
        "starcoder-7b": "accounts/fireworks/models/starcoder-7b",
    };
    _convertModelName(model) {
        return Fireworks.modelConversion[model] ?? model;
    }
}
export default Fireworks;
