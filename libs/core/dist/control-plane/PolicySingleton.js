export class PolicySingleton {
    static instance;
    policy = null;
    constructor() { }
    static getInstance() {
        if (!PolicySingleton.instance) {
            PolicySingleton.instance = new PolicySingleton();
        }
        return PolicySingleton.instance;
    }
}
