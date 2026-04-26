import { v4 as uuidv4 } from "uuid";
// Utility function to get or generate UUID for LLM prompts
export function getSecureID() {
    // Adding a type declaration for the static property
    if (!getSecureID.uuid) {
        getSecureID.uuid = uuidv4();
    }
    return `<!-- SID: ${getSecureID.uuid} -->`;
}
