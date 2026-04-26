export const RETRY_AFTER_HEADER = "Retry-After";
const withExponentialBackoff = async (apiCall, maxTries = 5, initialDelaySeconds = 1) => {
    for (let attempt = 0; attempt < maxTries; attempt++) {
        try {
            const result = await apiCall();
            return result;
        }
        catch (error) {
            const lowerMessage = (error.message ?? "").toLowerCase();
            if (error.response?.status === 429 ||
                /"code"\s*:\s*429/.test(error.message ?? "") ||
                lowerMessage.includes("overloaded") ||
                lowerMessage.includes("malformed json")) {
                const retryAfter = error.response?.headers.get(RETRY_AFTER_HEADER);
                const delay = retryAfter
                    ? parseInt(retryAfter, 10)
                    : initialDelaySeconds * 2 ** attempt;
                console.log(`Hit rate limit. Retrying in ${delay} seconds (attempt ${attempt + 1})`);
                await new Promise((resolve) => setTimeout(resolve, delay * 1000));
            }
            else {
                throw error; // Re-throw other errors
            }
        }
    }
    throw new Error(`Failed to make API call after ${maxTries} retries`);
};
export { withExponentialBackoff };
