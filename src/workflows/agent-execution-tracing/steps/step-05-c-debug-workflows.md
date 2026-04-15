# Step 5: Debugging Workflow Design

## Purpose

Create debugging runbooks for common agent issues using trace data.

## Prerequisites

- Step 4 complete (sampling strategy designed)
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-execution-trace-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/tool-execution-observability-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/memory-observability-template.md`

## Actions

### 1. Design Trace Search Capabilities

| Search Criteria | Index | Example Query |
|-----------------|-------|---------------|
| By Session ID | session.id | session.id = "sess_abc123" |
| By Tenant | tenant.id | tenant.id = "t_xyz" |
| By Correlation ID | correlation.id | correlation.id = "corr_def" |
| By Error Type | error.type | error.type = "timeout" |
| By High Latency | duration | duration > 5s |
| By High Cost | llm.cost_usd | llm.cost_usd > $0.10 |

### 2. Create Debug Playbooks

#### Playbook: Agent Timeout

| Step | Action | Look For |
|------|--------|----------|
| 1 | Find trace by session_id | Span with timeout error |
| 2 | Check LLM call durations | Slow model responses |
| 3 | Check tool execution times | Slow external calls |
| 4 | Review retry attempts | Repeated failures |

#### Playbook: High Token Usage

| Step | Action | Look For |
|------|--------|----------|
| 1 | Find traces by tenant | High llm.total_tokens |
| 2 | Drill into LLM spans | Large prompt_tokens |
| 3 | Check memory operations | Excessive context |
| 4 | Review conversation turns | Long sessions |

#### Playbook: Quality Issues

| Step | Action | Look For |
|------|--------|----------|
| 1 | Find low quality traces | groundedness < 0.7 |
| 2 | Check RAG retrieval | relevance scores |
| 3 | Review context | context_utilization |
| 4 | Examine prompt | system prompt changes |

### 3. Configure Debug Dashboards

| Dashboard | Purpose | Key Panels |
|-----------|---------|------------|
| Error Analysis | Debug failures | Error types, stack traces |
| Latency Analysis | Debug slow requests | Duration breakdown |
| Cost Analysis | Debug high costs | Token breakdown, model usage |
| Quality Analysis | Debug low quality | Quality scores, RAG metrics |

## Web Research Verification

Search the web: "LLM debugging runbooks {date}"
Search the web: "agent trace analysis patterns {date}"

## Verification

- [ ] Trace search capabilities documented
- [ ] Debug playbooks created for common issues
- [ ] Debug dashboards specified
- [ ] Escalation paths defined

## Outputs

- `{output_folder}/operations/ai/agent-tracing-config.md`
- `{output_folder}/operations/ai/agent-debug-runbook.md`

## Quality Gate

This step completes the agent execution tracing design. Verify against:
- **QG-AI2**: Agent tracing requirements
- **QG-P1**: Production debugging capability
