import { RequestOptions } from "../../../";
interface JiraClientOptions {
    domain: string;
    username: string;
    password: string;
    issueQuery?: string;
    apiVersion?: string;
    maxResults?: string;
    requestOptions?: RequestOptions;
}
interface QueryResult {
    id: string;
    key: string;
    summary: string;
}
export interface Comment {
    created: string;
    updated: string;
    author: {
        emailAddress: string;
        displayName: string;
    };
    body: string;
}
export interface Issue {
    key: string;
    summary: string;
    description?: string;
    comments: Array<Comment>;
}
export declare class JiraClient {
    private readonly options;
    private baseUrl;
    private authHeader;
    constructor(options: JiraClientOptions);
    issue(issueId: string, customFetch: (url: string | URL, init: any) => Promise<any>): Promise<Issue>;
    listIssues(customFetch: (url: string | URL, init: any) => Promise<any>): Promise<Array<QueryResult>>;
}
export {};
//# sourceMappingURL=JiraClient.d.ts.map