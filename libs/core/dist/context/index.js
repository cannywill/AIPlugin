export class BaseContextProvider {
    options;
    constructor(options) {
        this.options = options;
    }
    static description;
    get description() {
        return this.constructor.description;
    }
    async loadSubmenuItems(args) {
        return [];
    }
    get deprecationMessage() {
        return null;
    }
}
