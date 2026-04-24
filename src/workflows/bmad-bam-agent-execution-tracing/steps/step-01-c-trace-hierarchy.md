# Step 1: Trace Hierarchy Design

## Purpose

Design the span hierarchy and relationships for agent execution tracing.

## Prerequisites

- Agent runtime architecture defined
- Tracing platform selected (Langfuse/LangSmith/OTEL)
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/agent-tracing.md`

## Actions

### 1. Define Trace Hierarchy

| Span Level | Parent | Scope | Purpose |
|------------|--------|-------|---------|
| Session | None | User session | Conversation boundary |
| Turn | Session | User input/output | Single interaction |
| Agent | Turn | Agent execution | Agent lifecycle |
| LLM Call | Agent | Model invocation | LLM request/response |
| Tool | Agent | Tool execution | Tool lifecycle |
| Memory | Agent | Memory operation | Memory access |

### 2. Define Span Relationships

```
Session (root)
├── Turn 1
│   └── Agent (coordinator)
│       ├── LLM Call (planning)
│       ├── Tool (search)
│       │   └── LLM Call (tool params)
│       ├── Memory (read)
│       └── LLM Call (response)
├── Turn 2
│   └── ...
```

### 3. Configure Context Propagation

| Attribute | Propagation | Required |
|-----------|-------------|----------|
| tenant.id | All spans | Yes |
| tenant.tier | All spans | Yes |
| session.id | All spans | Yes |
| user.id | All spans | Yes |
| correlation.id | All spans | Yes |

## Soft Gate Checkpoint

**Steps 1-3 complete the trace hierarchy design.**

Present trace hierarchy summary and ask for confirmation before proceeding.

## Web Research Verification

Search the web: "LLM agent tracing hierarchy {date}"
Search the web: "OpenTelemetry agent spans {date}"

## Verification

- [ ] Span hierarchy documented
- [ ] Parent-child relationships defined
- [ ] Context propagation strategy specified
- [ ] Tenant context included in all spans

## Outputs

- Trace hierarchy specification
- Span relationship diagram
- Context propagation configuration

## Next Step

Proceed to `step-02-c-span-attributes.md` with hierarchy defined.
