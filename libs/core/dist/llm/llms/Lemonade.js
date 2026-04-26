import OpenAI from "./OpenAI.js";
class Lemonade extends OpenAI {
    static providerName = "lemonade";
    static defaultOptions = {
        apiBase: "http://localhost:8000/api/v1/",
    };
}
export default Lemonade;
