// Track which processes have been backgrounded
const processTerminalBackgroundStates = new Map();
const processTerminalForegroundStates = new Map();
// Background process functions (existing)
export function markProcessAsBackgrounded(toolCallId) {
    processTerminalBackgroundStates.set(toolCallId, true);
}
export function isProcessBackgrounded(toolCallId) {
    return processTerminalBackgroundStates.has(toolCallId);
}
export function removeBackgroundedProcess(toolCallId) {
    processTerminalBackgroundStates.delete(toolCallId);
}
// Foreground process functions (new)
export function markProcessAsRunning(toolCallId, process, onPartialOutput, currentOutput = "") {
    processTerminalForegroundStates.set(toolCallId, {
        process,
        onPartialOutput,
        currentOutput,
    });
}
export function isProcessRunning(toolCallId) {
    return processTerminalForegroundStates.has(toolCallId);
}
export function getRunningProcess(toolCallId) {
    const info = processTerminalForegroundStates.get(toolCallId);
    return info?.process;
}
export function updateProcessOutput(toolCallId, output) {
    const info = processTerminalForegroundStates.get(toolCallId);
    if (info) {
        info.currentOutput = output;
    }
}
export function removeRunningProcess(toolCallId) {
    processTerminalForegroundStates.delete(toolCallId);
}
export async function killTerminalProcess(toolCallId) {
    const processInfo = processTerminalForegroundStates.get(toolCallId);
    if (processInfo && !processInfo.process.killed) {
        const { process } = processInfo;
        process.kill("SIGTERM");
        // Force kill after 5 seconds if still running
        setTimeout(() => {
            if (!process.killed) {
                process.kill("SIGKILL");
            }
        }, 5000);
        processTerminalForegroundStates.delete(toolCallId);
    }
}
// Function to cancel multiple terminal commands at once
export async function killMultipleTerminalProcesses(toolCallIds) {
    const cancelPromises = toolCallIds.map((toolCallId) => killTerminalProcess(toolCallId));
    await Promise.all(cancelPromises);
}
// Function to cancel ALL currently running terminal commands
export async function killAllRunningTerminalProcesses() {
    const runningIds = getAllRunningProcessIds();
    if (runningIds.length > 0) {
        await killMultipleTerminalProcesses(runningIds);
    }
    return runningIds; // Return the IDs that were cancelled
}
// Utility functions
export function getAllRunningProcessIds() {
    return Array.from(processTerminalForegroundStates.keys());
}
export function getAllBackgroundedProcessIds() {
    return Array.from(processTerminalBackgroundStates.keys());
}
// Utility function for testing - clears all background process states
export function clearAllBackgroundProcesses() {
    processTerminalBackgroundStates.clear();
}
