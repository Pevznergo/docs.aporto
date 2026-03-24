"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Aporto provides serverless compute via two primitives: **Jobs** for stateless batch processing and **Sandboxes** for persistent interactive environments. Both are backed by Blaxel.

All compute tools accept an optional \`agentName\` parameter for [spend attribution](/integration/mcp-servers/setup#agentname-pattern).

* * *

## Jobs

[Section titled “Jobs”](#jobs)

Jobs are stateless serverless functions that process arrays of task payloads in parallel. Deploy code, trigger executions, and retrieve results.

### \`aporto_job_deploy\`

[Section titled “aporto\_job\_deploy”](#aporto_job_deploy)

Deploy a new serverless batch job. Jobs are stateless functions that process task arrays in parallel. Provide source files and optional runtime config. Supports optional cron schedule for recurring jobs.

\`name\` string required

Job name (lowercase alphanumeric with hyphens, 2–63 chars)

\`files\` Record<string, string> required

File map (path → content). Entry must export \`blStartJob\`.

\`runtime\` enum

Runtime environment: \`node\` (default: auto-detected from files)

\`schedule\` string

Cron schedule expression (e.g. \`"0 * * * *"\`). Must be a valid 5-part cron expression.

\`memory\` number default: 256

Memory in MB (128–4096)

\`timeout\` number default: 300

Execution timeout in seconds (1–3600)

\`maxConcurrentTasks\` number default: 10

Max concurrent tasks per execution (1–100)

\`maxRetries\` number default: 0

Max retries per failed task (0–10)

\`envs\` Record<string, string>

Environment variables for the job

### \`aporto_job_list\`

[Section titled “aporto\_job\_list”](#aporto_job_list)

List all deployed jobs for the current account.

This tool takes no required parameters.

### \`aporto_job_get\`

[Section titled “aporto\_job\_get”](#aporto_job_get)

Get the status and configuration of a deployed job by name.

\`name\` string required

Job name (lowercase alphanumeric with hyphens)

### \`aporto_job_update\`

[Section titled “aporto\_job\_update”](#aporto_job_update)

Update an existing job. All fields are optional — omit files to do a config-only update. Pass \`schedule: null\` to remove an existing cron schedule.

\`name\` string required

Job name (lowercase alphanumeric with hyphens)

\`files\` Record<string, string>

Updated file map (path → content). Omit to keep existing files.

\`runtime\` enum

Runtime environment: \`node\`

\`schedule\` string | null

Cron schedule expression. Pass \`null\` to remove an existing schedule.

\`memory\` number

Memory in MB (128–4096)

\`timeout\` number

Execution timeout in seconds (1–3600)

\`maxConcurrentTasks\` number

Max concurrent tasks per execution (1–100)

\`maxRetries\` number

Max retries per failed task (0–10)

\`envs\` Record<string, string>

Environment variables

### \`aporto_job_delete\`

[Section titled “aporto\_job\_delete”](#aporto_job_delete)

Delete a deployed job by name. This permanently removes the job and its configuration.

\`name\` string required

Job name (lowercase alphanumeric with hyphens)

### \`aporto_job_trigger\`

[Section titled “aporto\_job\_trigger”](#aporto_job_trigger)

Trigger a job execution with an array of task payloads. Each element in the tasks array is passed to one task invocation. Returns an execution ID to track progress with \`aporto_job_get_execution\`.

\`name\` string required

Job name (lowercase alphanumeric with hyphens)

\`tasks\` unknown\[\] required

Array of plain JSON objects passed verbatim to your job handler (\`blStartJob\`). Each element becomes one task invocation.

\`env\` Record<string, string>

Environment variable overrides for this execution

\`memory\` number

Memory override in MB for this execution (128–4096)

### \`aporto_job_list_executions\`

[Section titled “aporto\_job\_list\_executions”](#aporto_job_list_executions)

List past executions for a job, with pagination support.

\`name\` string required

Job name (lowercase alphanumeric with hyphens)

\`limit\` number default: 20

Max results to return (1–100)

\`offset\` number

Offset for pagination

### \`aporto_job_get_execution\`

[Section titled “aporto\_job\_get\_execution”](#aporto_job_get_execution)

Get detailed status and results of a specific job execution, including per-task results and errors.

\`name\` string required

Job name (lowercase alphanumeric with hyphens)

\`executionId\` string required

Execution ID returned by \`aporto_job_trigger\`

* * *

## Sandboxes

[Section titled “Sandboxes”](#sandboxes)

Sandboxes are persistent cloud environments that support file operations, process execution, and deployments. They run for a specified TTL and can be extended.

### \`aporto_sandbox_create\`

[Section titled “aporto\_sandbox\_create”](#aporto_sandbox_create)

Create a persistent cloud sandbox environment. Sandboxes run for a specified TTL and support file operations, process execution, and deployments. Tiers: xs, s (default), m, l, xl — higher tiers have more CPU/RAM.

\`name\` string required

Unique sandbox name (lowercase alphanumeric with hyphens, 2–63 chars)

\`tier\` enum default: s

Compute tier: \`xs\`, \`s\`, \`m\`, \`l\`, \`xl\`

\`ttl\` string default: 4h

Time-to-live (e.g. \`"1h"\`, \`"24h"\`, \`"7d"\`)

\`envs\` Record<string, string>

Environment variables for the sandbox

\`ports\` number\[\]

Ports to expose

### \`aporto_sandbox_list\`

[Section titled “aporto\_sandbox\_list”](#aporto_sandbox_list)

List all active sandboxes for the current account.

This tool takes no required parameters.

### \`aporto_sandbox_get\`

[Section titled “aporto\_sandbox\_get”](#aporto_sandbox_get)

Get the status, URL, and details of a specific sandbox by name.

\`name\` string required

Name of the sandbox to retrieve

### \`aporto_sandbox_delete\`

[Section titled “aporto\_sandbox\_delete”](#aporto_sandbox_delete)

Delete a sandbox by name. This permanently destroys the sandbox and all its data.

\`name\` string required

Name of the sandbox to delete

### \`aporto_sandbox_extend\`

[Section titled “aporto\_sandbox\_extend”](#aporto_sandbox_extend)

Extend the lifetime of a running sandbox by adding more time. Use before expiry to keep the sandbox alive.

\`name\` string required

Name of the sandbox to extend

\`ttl\` string required

Additional time to add (e.g. \`"1h"\`, \`"30m"\`, \`"2h"\`)

### \`aporto_sandbox_exec\`

[Section titled “aporto\_sandbox\_exec”](#aporto_sandbox_exec)

Execute a process/command in a running sandbox. Returns the process PID for subsequent log retrieval.

\`name\` string required

Name of the sandbox

\`command\` string required

Command to execute (e.g. \`"ls -la /workspace"\`)

\`workingDir\` string

Working directory for the command

\`env\` Record<string, string>

Additional environment variables

### \`aporto_sandbox_process_logs\`

[Section titled “aporto\_sandbox\_process\_logs”](#aporto_sandbox_process_logs)

Get stdout/stderr logs from a process running in a sandbox.

\`name\` string required

Name of the sandbox

\`pid\` number required

Process ID to get logs for

### \`aporto_sandbox_list_files\`

[Section titled “aporto\_sandbox\_list\_files”](#aporto_sandbox_list_files)

List files and directories in a sandbox path. Returns a directory tree.

\`name\` string required

Name of the sandbox

\`path\` string default: /

Directory path to list (must not contain \`..\`)

### \`aporto_sandbox_read_file\`

[Section titled “aporto\_sandbox\_read\_file”](#aporto_sandbox_read_file)

Read the contents of a file in a sandbox. Prefer over exec + cat to avoid shell escaping issues with binary or special characters.

\`name\` string required

Name of the sandbox

\`path\` string required

Absolute path to the file (e.g. \`"/workspace/index.js"\`). Must not contain \`..\`.

### \`aporto_sandbox_write_file\`

[Section titled “aporto\_sandbox\_write\_file”](#aporto_sandbox_write_file)

Write content to a file in a sandbox. Prefer over exec + shell redirection to avoid escaping issues with special characters or multi-line content.

\`name\` string required

Name of the sandbox

\`path\` string required

Absolute path to write to (e.g. \`"/workspace/index.js"\`). Must not contain \`..\`.

\`content\` string required

File content to write

### \`aporto_sandbox_deploy\`

[Section titled “aporto\_sandbox\_deploy”](#aporto_sandbox_deploy)

Deploy source files to an existing sandbox. Provide a map of file paths to file contents. Optionally specify a runtime and entrypoint.

\`name\` string required

Name of the sandbox to deploy to

\`files\` Record<string, string> required

File map (path → content) to deploy

\`runtime\` string

Runtime environment (e.g. \`"node"\`)

\`entrypoint\` string

Start command or entry file`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
