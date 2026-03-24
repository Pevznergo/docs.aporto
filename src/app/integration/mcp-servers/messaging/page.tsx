"use client";

import React from "react";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";

const content = `Aporto provides async messaging via Upstash QStash: **Messages** for at-least-once delivery to URLs, **Schedules** for recurring cron-based delivery, and **Queues** for ordered, rate-limited processing.

All messaging tools accept an optional \`agentName\` parameter for [spend attribution](/integration/mcp-servers/setup#agentname-pattern).

* * *

## Messages

[Section titled “Messages”](#messages)

Publish messages to URLs with guaranteed at-least-once delivery and automatic retries.

### \`aporto_message_publish\`

[Section titled “aporto\_message\_publish”](#aporto_message_publish)

Publish a message to a URL via Upstash QStash. QStash guarantees at-least-once delivery with automatic retries. Use for webhooks, background jobs, and async workflows.

\`destination\` string required

Destination URL to deliver the message to

\`body\` object

JSON message body

\`delay\` string

Delay before delivery (e.g. \`"10s"\`, \`"5m"\`, \`"1h"\`)

\`retries\` number default: 3

Number of retries (0–5)

### \`aporto_message_enqueue\`

[Section titled “aporto\_message\_enqueue”](#aporto_message_enqueue)

Enqueue a message to a named QStash queue for ordered, rate-limited delivery. Unlike publish, enqueued messages are processed one at a time per queue.

\`queueName\` string required

Queue name to enqueue the message into

\`destination\` string required

Destination URL to deliver the message to

\`body\` object

JSON message body

\`delay\` string

Delay before delivery (e.g. \`"10s"\`, \`"5m"\`, \`"1h"\`)

\`retries\` number default: 3

Number of retries (0–5)

### \`aporto_message_batch\`

[Section titled “aporto\_message\_batch”](#aporto_message_batch)

Publish or enqueue multiple QStash messages in a single request. Each message can target a different destination and optionally be enqueued to a named queue.

\`messages\` object\[\] required

Array of messages. Each message: \`{ destination: string, body?: object, queue?: string, delay?: string, retries?: number }\`

### \`aporto_message_get\`

[Section titled “aporto\_message\_get”](#aporto_message_get)

Get the status of a QStash message by its message ID. Returns delivery state and metadata.

\`messageId\` string required

Message ID returned from publish or enqueue

### \`aporto_message_cancel\`

[Section titled “aporto\_message\_cancel”](#aporto_message_cancel)

Cancel a pending QStash message before it is delivered. Only works for messages not yet delivered.

\`messageId\` string required

Message ID to cancel

* * *

## Schedules

[Section titled “Schedules”](#schedules)

Create recurring cron-based schedules that call a URL at specified intervals.

### \`aporto_schedule_create\`

[Section titled “aporto\_schedule\_create”](#aporto_schedule_create)

Create a recurring cron-based QStash schedule. The schedule will call the destination URL at the specified cron interval.

\`destination\` string required

Destination URL to call on each schedule tick

\`cron\` string required

Cron expression (e.g. \`"0 9 * * 1-5"\` for weekdays at 9am UTC)

\`body\` object

JSON body to send on each tick

\`retries\` number

Number of retries per delivery attempt (0–5)

### \`aporto_schedule_list\`

[Section titled “aporto\_schedule\_list”](#aporto_schedule_list)

List all QStash schedules owned by your account.

This tool takes no required parameters.

### \`aporto_schedule_get\`

[Section titled “aporto\_schedule\_get”](#aporto_schedule_get)

Get details of a specific QStash schedule by its schedule ID.

\`scheduleId\` string required

Schedule ID to retrieve

### \`aporto_schedule_delete\`

[Section titled “aporto\_schedule\_delete”](#aporto_schedule_delete)

Delete a QStash schedule permanently. The schedule will stop triggering immediately.

\`scheduleId\` string required

Schedule ID to delete

### \`aporto_schedule_pause\`

[Section titled “aporto\_schedule\_pause”](#aporto_schedule_pause)

Pause a QStash schedule. The schedule will stop triggering until resumed.

\`scheduleId\` string required

Schedule ID to pause

### \`aporto_schedule_resume\`

[Section titled “aporto\_schedule\_resume”](#aporto_schedule_resume)

Resume a paused QStash schedule.

\`scheduleId\` string required

Schedule ID to resume

* * *

## Queues

[Section titled “Queues”](#queues)

Manage named QStash queues for ordered, rate-limited message delivery.

### \`aporto_queue_list\`

[Section titled “aporto\_queue\_list”](#aporto_queue_list)

List all QStash queues owned by your account.

This tool takes no required parameters.

### \`aporto_queue_get\`

[Section titled “aporto\_queue\_get”](#aporto_queue_get)

Get details of a specific QStash queue by name, including lag and parallelism.

\`queueName\` string required

Queue name to retrieve

### \`aporto_queue_delete\`

[Section titled “aporto\_queue\_delete”](#aporto_queue_delete)

Delete a QStash queue permanently. Any pending messages in the queue will be cancelled.

\`queueName\` string required

Queue name to delete

### \`aporto_queue_pause\`

[Section titled “aporto\_queue\_pause”](#aporto_queue_pause)

Pause message delivery for a QStash queue. Queued messages are held until the queue is resumed.

\`queueName\` string required

Queue name to pause

### \`aporto_queue_resume\`

[Section titled “aporto\_queue\_resume”](#aporto_queue_resume)

Resume message delivery for a paused QStash queue.

\`queueName\` string required

Queue name to resume`;

export default function Page() {
    return <MarkdownRenderer content={content} />;
}
