/**
 * Live API test for Anthropic prompt caching.
 *
 * Validates that the systemAndTools caching strategy produces real cache hits
 * when making sequential requests with the same prefix to the Anthropic API.
 *
 * Guarded by ANTHROPIC_API_KEY env var — skipped if not set.
 * Uses claude-haiku-4-5-20251001 to minimize cost.
 *
 * IMPORTANT: Haiku 4.5 requires a minimum of 4096 tokens for caching.
 * The system message + tools in this test are sized to exceed that threshold.
 *
 * Run: ANTHROPIC_API_KEY=sk-ant-... npx vitest packages/openai-adapters/src/test/anthropic-caching.live.test.ts
 */
import { describe, expect, test } from "vitest";
import { constructLlmApi } from "../index.js";
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-haiku-4-5-20251001";
// Realistic tool definitions mimicking CLI's builtin tools
const REALISTIC_TOOLS = [
    {
        type: "function",
        function: {
            name: "read_file",
            description: "Read the contents of a file at the given path. Use this when you need to examine existing files in the project. The output includes line numbers prefixed to each line (e.g., '1 | const x = 1'). When reading large files, you may want to specify a line range using the start_line and end_line parameters.",
            parameters: {
                type: "object",
                required: ["path"],
                properties: {
                    path: {
                        type: "string",
                        description: "The path of the file to read, relative to the workspace root",
                    },
                    start_line: {
                        type: "number",
                        description: "The starting line number to read from (1-indexed, inclusive)",
                    },
                    end_line: {
                        type: "number",
                        description: "The ending line number to read to (1-indexed, inclusive)",
                    },
                },
            },
        },
    },
    {
        type: "function",
        function: {
            name: "write_file",
            description: "Write content to a file at the given path. If the file exists, it will be overwritten. If it doesn't exist, a new file will be created. Always provide the complete intended content of the file. Avoid writing partial content that requires manual additions.",
            parameters: {
                type: "object",
                required: ["path", "content"],
                properties: {
                    path: {
                        type: "string",
                        description: "The path of the file to write to, relative to the workspace root",
                    },
                    content: {
                        type: "string",
                        description: "The full content to write to the file",
                    },
                },
            },
        },
    },
    {
        type: "function",
        function: {
            name: "list_files",
            description: "List files and directories at the given path. If the path is a directory, lists all files and subdirectories within it. If no path is provided, lists files in the current working directory. Results include file type indicators.",
            parameters: {
                type: "object",
                required: [],
                properties: {
                    path: {
                        type: "string",
                        description: "The path to list files from, relative to the workspace root",
                    },
                    recursive: {
                        type: "boolean",
                        description: "Whether to list files recursively in subdirectories",
                    },
                },
            },
        },
    },
    {
        type: "function",
        function: {
            name: "run_terminal_command",
            description: "Run a terminal command in the workspace directory. Use this for executing build commands, running tests, installing packages, or any other command-line operations. The command runs in a shell environment with access to standard tools.",
            parameters: {
                type: "object",
                required: ["command"],
                properties: {
                    command: {
                        type: "string",
                        description: "The terminal command to execute",
                    },
                    workingDir: {
                        type: "string",
                        description: "The working directory for the command",
                    },
                },
            },
        },
    },
    {
        type: "function",
        function: {
            name: "fetch_url",
            description: "Fetch the content of a URL. Use this to retrieve documentation, API responses, or any web content that might be needed for the task at hand.",
            parameters: {
                type: "object",
                required: ["url"],
                properties: {
                    url: {
                        type: "string",
                        description: "The URL to fetch content from",
                    },
                },
            },
        },
    },
    {
        type: "function",
        function: {
            name: "write_checklist",
            description: "Write or update a checklist for tracking progress on complex tasks. Checklists help organize multi-step work and provide visibility into what has been completed.",
            parameters: {
                type: "object",
                required: ["items"],
                properties: {
                    items: {
                        type: "array",
                        description: "Array of checklist items with status",
                        items: {
                            type: "object",
                            properties: {
                                text: { type: "string" },
                                checked: { type: "boolean" },
                            },
                        },
                    },
                },
            },
        },
    },
    {
        type: "function",
        function: {
            name: "check_background_job",
            description: "Check the status of a background job that was previously started. Returns the current output and status of the job.",
            parameters: {
                type: "object",
                required: ["jobId"],
                properties: {
                    jobId: {
                        type: "string",
                        description: "The ID of the background job to check",
                    },
                },
            },
        },
    },
];
// System message sized to exceed Haiku 4.5's 4096-token caching minimum.
// The system message + tools together must be > 4096 tokens.
// This realistic message mimics the CLI's baseSystemMessage with extensive
// directory listings and detailed instructions.
const REALISTIC_SYSTEM_MESSAGE = `You are an AI coding assistant integrated into a developer's IDE. You help with software engineering tasks including writing code, debugging, explaining code, and more.

# Environment

- Operating System: macOS 14.0
- Shell: zsh
- IDE: VS Code 1.95.0
- Working Directory: /Users/developer/projects/my-app
- Git Branch: main
- Node.js: v20.11.0
- npm: 10.2.4
- TypeScript: 5.3.3
- Python: 3.12.0
- Docker: 24.0.6
- PostgreSQL: 16.1
- Redis: 7.2.3

# Directory Listing

The following is the full directory structure of the workspace:

\`\`\`
my-app/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy.yml
│   │   ├── release.yml
│   │   ├── codeql-analysis.yml
│   │   └── dependency-review.yml
│   ├── CODEOWNERS
│   ├── pull_request_template.md
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── config.yml
│   └── dependabot.yml
├── .vscode/
│   ├── settings.json
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── docs/
│   ├── api/
│   │   ├── authentication.md
│   │   ├── endpoints.md
│   │   ├── rate-limiting.md
│   │   ├── websockets.md
│   │   ├── pagination.md
│   │   └── error-codes.md
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── database-schema.md
│   │   ├── deployment.md
│   │   ├── caching-strategy.md
│   │   ├── event-sourcing.md
│   │   └── microservices.md
│   ├── guides/
│   │   ├── getting-started.md
│   │   ├── contributing.md
│   │   ├── code-review.md
│   │   ├── testing.md
│   │   └── debugging.md
│   └── adr/
│       ├── 001-use-typescript.md
│       ├── 002-monorepo-structure.md
│       ├── 003-database-choice.md
│       ├── 004-auth-strategy.md
│       └── 005-api-versioning.md
├── packages/
│   ├── core/
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   │   ├── index.ts
│   │   │   │   ├── jwt.ts
│   │   │   │   ├── oauth.ts
│   │   │   │   ├── middleware.ts
│   │   │   │   ├── rbac.ts
│   │   │   │   ├── session.ts
│   │   │   │   └── types.ts
│   │   │   ├── database/
│   │   │   │   ├── index.ts
│   │   │   │   ├── connection.ts
│   │   │   │   ├── migrations/
│   │   │   │   │   ├── 001_create_users.ts
│   │   │   │   │   ├── 002_create_projects.ts
│   │   │   │   │   ├── 003_create_teams.ts
│   │   │   │   │   ├── 004_create_notifications.ts
│   │   │   │   │   └── 005_create_audit_log.ts
│   │   │   │   ├── models/
│   │   │   │   │   ├── User.ts
│   │   │   │   │   ├── Project.ts
│   │   │   │   │   ├── Team.ts
│   │   │   │   │   ├── TeamMember.ts
│   │   │   │   │   ├── Notification.ts
│   │   │   │   │   ├── AuditLog.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── seeds/
│   │   │   │       ├── development.ts
│   │   │   │       └── test.ts
│   │   │   ├── services/
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── project.service.ts
│   │   │   │   ├── team.service.ts
│   │   │   │   ├── notification.service.ts
│   │   │   │   ├── analytics.service.ts
│   │   │   │   ├── email.service.ts
│   │   │   │   ├── cache.service.ts
│   │   │   │   └── search.service.ts
│   │   │   ├── events/
│   │   │   │   ├── index.ts
│   │   │   │   ├── emitter.ts
│   │   │   │   ├── handlers/
│   │   │   │   │   ├── user.handler.ts
│   │   │   │   │   ├── project.handler.ts
│   │   │   │   │   └── notification.handler.ts
│   │   │   │   └── types.ts
│   │   │   ├── queue/
│   │   │   │   ├── index.ts
│   │   │   │   ├── workers/
│   │   │   │   │   ├── email.worker.ts
│   │   │   │   │   ├── analytics.worker.ts
│   │   │   │   │   └── cleanup.worker.ts
│   │   │   │   └── types.ts
│   │   │   └── utils/
│   │   │       ├── logger.ts
│   │   │       ├── errors.ts
│   │   │       ├── validation.ts
│   │   │       ├── crypto.ts
│   │   │       ├── date.ts
│   │   │       └── retry.ts
│   │   ├── tests/
│   │   │   ├── auth.test.ts
│   │   │   ├── services.test.ts
│   │   │   ├── events.test.ts
│   │   │   ├── queue.test.ts
│   │   │   └── utils.test.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── api/
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   ├── users.ts
│   │   │   │   ├── projects.ts
│   │   │   │   ├── teams.ts
│   │   │   │   ├── webhooks.ts
│   │   │   │   ├── health.ts
│   │   │   │   ├── search.ts
│   │   │   │   └── admin.ts
│   │   │   ├── middleware/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── rateLimit.ts
│   │   │   │   ├── cors.ts
│   │   │   │   ├── requestId.ts
│   │   │   │   ├── logging.ts
│   │   │   │   └── validation.ts
│   │   │   ├── websocket/
│   │   │   │   ├── index.ts
│   │   │   │   ├── handlers.ts
│   │   │   │   └── types.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   │   ├── routes/
│   │   │   │   ├── users.test.ts
│   │   │   │   ├── projects.test.ts
│   │   │   │   └── teams.test.ts
│   │   │   └── middleware/
│   │   │       ├── auth.test.ts
│   │   │       └── rateLimit.test.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── web/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── common/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   ├── Modal.tsx
│   │   │   │   │   ├── Table.tsx
│   │   │   │   │   ├── Toast.tsx
│   │   │   │   │   └── Loading.tsx
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   └── Layout.tsx
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── Dashboard.tsx
│   │   │   │   │   ├── ProjectCard.tsx
│   │   │   │   │   ├── ActivityFeed.tsx
│   │   │   │   │   └── Stats.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   ├── Settings.tsx
│   │   │   │   │   ├── ProfileForm.tsx
│   │   │   │   │   ├── SecuritySettings.tsx
│   │   │   │   │   └── NotificationPrefs.tsx
│   │   │   │   └── team/
│   │   │   │       ├── TeamList.tsx
│   │   │   │       ├── TeamDetail.tsx
│   │   │   │       ├── MemberList.tsx
│   │   │   │       └── InviteForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useApi.ts
│   │   │   │   ├── useTheme.ts
│   │   │   │   ├── useWebSocket.ts
│   │   │   │   ├── useDebounce.ts
│   │   │   │   └── usePagination.ts
│   │   │   ├── pages/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── login.tsx
│   │   │   │   ├── register.tsx
│   │   │   │   ├── dashboard.tsx
│   │   │   │   ├── settings.tsx
│   │   │   │   ├── project/[id].tsx
│   │   │   │   └── team/[id].tsx
│   │   │   ├── store/
│   │   │   │   ├── index.ts
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── projectSlice.ts
│   │   │   │   └── uiSlice.ts
│   │   │   ├── styles/
│   │   │   │   ├── globals.css
│   │   │   │   ├── theme.ts
│   │   │   │   └── animations.css
│   │   │   ├── lib/
│   │   │   │   ├── api.ts
│   │   │   │   ├── auth.ts
│   │   │   │   └── utils.ts
│   │   │   └── App.tsx
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   └── manifest.json
│   │   ├── tests/
│   │   │   ├── components/
│   │   │   └── pages/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── shared/
│       ├── src/
│       │   ├── types/
│       │   │   ├── user.ts
│       │   │   ├── project.ts
│       │   │   ├── team.ts
│       │   │   ├── api.ts
│       │   │   └── index.ts
│       │   ├── constants/
│       │   │   ├── permissions.ts
│       │   │   ├── errors.ts
│       │   │   └── config.ts
│       │   └── validators/
│       │       ├── user.ts
│       │       ├── project.ts
│       │       └── team.ts
│       ├── package.json
│       └── tsconfig.json
├── infrastructure/
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── modules/
│   │       ├── vpc/
│   │       ├── ecs/
│   │       ├── rds/
│   │       └── redis/
│   ├── docker/
│   │   ├── Dockerfile.api
│   │   ├── Dockerfile.web
│   │   └── docker-compose.prod.yml
│   └── k8s/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── ingress.yaml
│       └── configmap.yaml
├── scripts/
│   ├── deploy.sh
│   ├── setup.sh
│   ├── seed-db.ts
│   ├── migrate.ts
│   ├── generate-api-docs.ts
│   └── health-check.sh
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── docker-compose.test.yml
├── Dockerfile
├── Makefile
├── package.json
├── pnpm-workspace.yaml
├── README.md
├── CHANGELOG.md
├── LICENSE
└── tsconfig.base.json
\`\`\`

# Instructions

You are a helpful AI coding assistant. Follow these guidelines:

1. Always provide complete, working code solutions
2. Follow the project's existing coding style and conventions
3. Write clean, maintainable code with appropriate error handling
4. Use TypeScript types and interfaces where applicable
5. Consider edge cases and potential issues
6. Explain your reasoning when making architectural decisions
7. Prefer editing existing files over creating new ones
8. Run tests after making changes to ensure nothing is broken
9. Use the available tools to explore the codebase before making changes
10. Keep changes focused and minimal - don't over-engineer solutions

When using tools, prefer:
- read_file to understand existing code before modifying
- list_files to explore project structure
- run_terminal_command for builds, tests, and git operations
- write_file only when you need to create or fully rewrite a file

# Code Style

- Use 2-space indentation for TypeScript and JavaScript files
- Use single quotes for string literals
- Always use strict TypeScript with no implicit any
- Prefer const over let, never use var
- Use async/await instead of raw promises
- Use named exports instead of default exports
- Use descriptive variable and function names following camelCase
- Use PascalCase for types, interfaces, classes, and React components
- Add JSDoc comments for public API functions
- Use early returns to reduce nesting
- Prefer functional programming patterns where appropriate
- Use template literals instead of string concatenation
- Always handle errors explicitly - never swallow exceptions
- Use optional chaining and nullish coalescing operators
- Destructure objects and arrays when it improves readability

# Testing Guidelines

- Write unit tests for all business logic in services
- Write integration tests for API routes
- Use describe/it blocks with descriptive test names
- Follow the AAA pattern: Arrange, Act, Assert
- Mock external dependencies (database, APIs, file system)
- Aim for 80% code coverage minimum on new code
- Test error cases and edge cases, not just happy paths
- Use factories for test data generation
- Keep test files colocated with source files
- Run the full test suite before committing changes

Always think step by step and explain your approach before making changes.`;
/**
 * Helper to compute total input tokens from Anthropic's split usage fields.
 * When caching is active, `prompt_tokens` only counts uncached tokens.
 * Total = cache_read + cache_write + prompt_tokens (uncached).
 */
function totalInputTokens(usage) {
    const details = usage.prompt_tokens_details;
    const cacheRead = details?.cache_read_tokens ?? 0;
    const cacheWrite = details?.cache_write_tokens ?? 0;
    return cacheRead + cacheWrite + usage.prompt_tokens;
}
describe.skipIf(!API_KEY)("Anthropic Prompt Caching - Live API", () => {
    const api = constructLlmApi({
        provider: "anthropic",
        apiKey: API_KEY,
        // Default cachingStrategy is "systemAndTools"
    });
    const signal = new AbortController().signal;
    // Shared conversation state across sequential tests
    let turn1AssistantContent = "";
    let turn2AssistantContent = "";
    test("Turn 1: first request creates cache", { timeout: 30_000 }, async () => {
        const response = await api.chatCompletionNonStream({
            model: MODEL,
            messages: [
                {
                    role: "system",
                    content: REALISTIC_SYSTEM_MESSAGE,
                },
                {
                    role: "user",
                    content: "What is the project structure of this workspace? Give a brief summary.",
                },
            ],
            tools: REALISTIC_TOOLS,
            max_tokens: 256,
        }, signal);
        expect(response.choices.length).toBeGreaterThan(0);
        turn1AssistantContent =
            response.choices[0].message.content ?? "I can see the project structure.";
        const usage = response.usage;
        const details = usage.prompt_tokens_details;
        const total = totalInputTokens(usage);
        // First request should write to cache
        expect(details?.cache_write_tokens).toBeGreaterThan(0);
        // First request should have no cache reads
        expect(details?.cache_read_tokens ?? 0).toBe(0);
        console.log("Turn 1 usage:", {
            prompt_tokens: usage.prompt_tokens,
            cache_write_tokens: details?.cache_write_tokens,
            cache_read_tokens: details?.cache_read_tokens,
            total_input_tokens: total,
        });
    });
    test("Turn 2: second request hits cache on shared prefix", { timeout: 30_000 }, async () => {
        const response = await api.chatCompletionNonStream({
            model: MODEL,
            messages: [
                {
                    role: "system",
                    content: REALISTIC_SYSTEM_MESSAGE,
                },
                {
                    role: "user",
                    content: "What is the project structure of this workspace? Give a brief summary.",
                },
                {
                    role: "assistant",
                    content: turn1AssistantContent,
                },
                {
                    role: "user",
                    content: "Now explain the authentication system in the core package.",
                },
            ],
            tools: REALISTIC_TOOLS,
            max_tokens: 256,
        }, signal);
        expect(response.choices.length).toBeGreaterThan(0);
        turn2AssistantContent =
            response.choices[0].message.content ?? "The auth system uses JWT.";
        const usage = response.usage;
        const details = usage.prompt_tokens_details;
        const cacheReadTokens = details?.cache_read_tokens ?? 0;
        const total = totalInputTokens(usage);
        // Second request should read from cache
        expect(cacheReadTokens).toBeGreaterThan(0);
        console.log("Turn 2 usage:", {
            prompt_tokens: usage.prompt_tokens,
            cache_write_tokens: details?.cache_write_tokens,
            cache_read_tokens: cacheReadTokens,
            total_input_tokens: total,
            cache_hit_rate: total > 0 ? (cacheReadTokens / total).toFixed(3) : 0,
        });
    });
    test("Turn 3: cache hit rate stays high with growing conversation", { timeout: 30_000 }, async () => {
        const response = await api.chatCompletionNonStream({
            model: MODEL,
            messages: [
                {
                    role: "system",
                    content: REALISTIC_SYSTEM_MESSAGE,
                },
                {
                    role: "user",
                    content: "What is the project structure of this workspace? Give a brief summary.",
                },
                {
                    role: "assistant",
                    content: turn1AssistantContent,
                },
                {
                    role: "user",
                    content: "Now explain the authentication system in the core package.",
                },
                {
                    role: "assistant",
                    content: turn2AssistantContent,
                },
                {
                    role: "user",
                    content: "How would you add a new API route for managing team memberships? Walk me through the steps.",
                },
            ],
            tools: REALISTIC_TOOLS,
            max_tokens: 256,
        }, signal);
        expect(response.choices.length).toBeGreaterThan(0);
        const usage = response.usage;
        const details = usage.prompt_tokens_details;
        const cacheReadTokens = details?.cache_read_tokens ?? 0;
        const total = totalInputTokens(usage);
        const hitRate = total > 0 ? cacheReadTokens / total : 0;
        // At least 30% of total input tokens should come from cache
        expect(hitRate).toBeGreaterThan(0.3);
        console.log("Turn 3 usage:", {
            prompt_tokens: usage.prompt_tokens,
            cache_write_tokens: details?.cache_write_tokens,
            cache_read_tokens: cacheReadTokens,
            total_input_tokens: total,
            cache_hit_rate: hitRate.toFixed(3),
        });
    });
});
//# sourceMappingURL=anthropic-caching.live.test.js.map