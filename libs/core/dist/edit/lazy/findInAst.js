export function findInAst(node, criterion, shouldRecurse = () => true) {
    const stack = [node];
    while (stack.length > 0) {
        let node = stack.pop();
        if (criterion(node)) {
            return node;
        }
        if (shouldRecurse(node)) {
            stack.push(...node.children);
        }
    }
    return null;
}
