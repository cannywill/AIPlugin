import Ollama from "./Ollama.js";
class Msty extends Ollama {
    static providerName = "msty";
    static defaultOptions = {
        apiBase: "http://localhost:10000",
        model: "codellama-7b",
    };
}
export default Msty;
