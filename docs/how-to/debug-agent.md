# How to Debug AI Agents

This guide covers debugging AI agent behavior in multi-tenant environments using BAM workflows and tools.

## Prerequisites

- BAM module installed
- Access to agent runtime logs (LangSmith, Langfuse, or equivalent)
- Tenant context for the affected execution
- Agent runtime patterns guide loaded

## Overview

AI agent debugging in multi-tenant SaaS requires attention to:

- Tenant context propagation
- Memory tier isolation
- Tool permission enforcement
- Kill switch and safety guardrails
- Resource limits per tier

## Steps

### 1. Use the ai-agent-debug Workflow

Start the debugging workflow:

```
/nova
> AAD  -- AI Agent Debug
```

Or invoke directly:

```
bmad-bam-ai-agent-debug
```

The workflow guides you through systematic debugging steps.

### 2. Gather Execution Context

Collect all relevant information:

| Input | Description | Source |
|-------|-------------|--------|
| Agent ID | Identifier of the agent | Agent registry |
| Execution ID | Trace/run ID | LangSmith/Langfuse |
| Tenant ID | Tenant context | Request headers |
| Time Window | When issue occurred | User report |
| Error Message | If any | Logs/response |

**Retrieve agent configuration:**
- Agent type (single, router, specialist)
- Orchestration framework (LangGraph, CrewAI, AutoGen)
- System prompt version
- Enabled tools list
- Tier-specific configuration overrides

### 3. Analyze State History

Review the agent's state transitions and decision points:

| Check | Status | Notes |
|-------|--------|-------|
| State transitions follow expected flow | | |
| Tool calls returned expected results | | |
| Memory operations completed successfully | | |
| No unexpected context truncation | | |
| Approval workflows resolved correctly | | |

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-runtime, memory-tiers`

### 4. Identify Failure Points

Classify the failure type:

| Type | Description | Indicators |
|------|-------------|------------|
| **Tool failure** | Tool returned error or unexpected result | Error codes, timeout |
| **Prompt failure** | Agent misinterpreted instructions | Wrong actions taken |
| **Memory failure** | Incorrect or missing context | Stale data, missing history |
| **Integration failure** | External service unavailable | HTTP errors, timeouts |
| **Safety trigger** | Guardrail or kill switch activated | Blocked responses |
| **Resource limit** | Token, time, or cost limit exceeded | Truncation, timeouts |

### 5. Use agent-runtime-patterns.md Guide

Load the agent runtime patterns guide for reference:

```
`{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
```

This guide provides:
- Orchestration framework patterns (LangGraph, CrewAI, AutoGen)
- Memory tier configuration
- Tool execution middleware
- Error handling patterns

### 6. Check Kill Switch and Safety Guardrails

Verify safety controls are functioning correctly:

**Kill Switch Verification:**

| Control | Status | Configuration |
|---------|--------|---------------|
| Feature flags | Active/Inactive | LaunchDarkly, Flagsmith |
| Circuit breaker | Open/Closed/Half-open | Resilience4j, custom |
| Manual override | Available | Admin console |
| Cost limit | Within budget | Per-tenant budget |
| Timeout | Within threshold | Per-tier timeout |

**Guardrails Verification:**

| Guardrail | Type | Status |
|-----------|------|--------|
| Input validation | Pre-execution | Pass/Fail |
| Output filtering | Post-execution | Pass/Fail |
| Tool restrictions | Per-tool | Pass/Fail |
| Cost guardrails | Per-execution | Pass/Fail |

### 7. Reference Evaluation Tools

Use the AI safety evaluation workflow if issues relate to safety:

```
/nova
> AED  -- AI Eval Safety Design
```

**Evaluation checklist:**

| Check | Category |
|-------|----------|
| Golden task regression | Deterministic |
| Adversarial prompt handling | Stochastic |
| PII detection in outputs | Safety |
| Cross-tenant data access | Isolation |
| Budget enforcement | Limits |

### 8. Document Findings

Create a debug report using the template:

```
**Load template:** `{project-root}/_bmad/bam/data/templates/agent-debug-report-template.md`
```

Include:
- Execution context summary
- State transition analysis
- Failure classification
- Root cause analysis
- Recommended fix

## Common Failure Patterns

### Memory Tier Issues

| Symptom | Cause | Resolution |
|---------|-------|------------|
| Missing context | Wrong memory tier | Check tier configuration |
| Stale data | Cache not invalidated | Verify cache TTL |
| Cross-tenant data | Isolation breach | Verify tenant_id filtering |

### Tool Execution Issues

| Symptom | Cause | Resolution |
|---------|-------|------------|
| Permission denied | TBAC policy | Check tier permissions |
| Timeout | Tool latency | Increase timeout or optimize |
| Wrong result | Input malformed | Validate tool parameters |

### Orchestration Issues

| Symptom | Cause | Resolution |
|---------|-------|------------|
| Infinite loop | Missing exit condition | Add state machine guards |
| Wrong branch | Conditional logic | Review routing conditions |
| State corruption | Concurrent access | Add state locking |

## Quality Gates Reference

| Gate | Relevance to Debug |
|------|-------------------|
| QG-M3 | Agent runtime readiness |
| QG-I3 | Agent safety verification |

If debugging reveals gaps, these gates may need re-validation.

## Debug Workflow Steps Summary

| Step | Purpose |
|------|---------|
| step-01-c | Gather execution context |
| step-02-c | Analyze state history |
| step-03-c | Identify failure point |
| step-04-c | Recommend fix |

## Related

- [Integrate AI Agents](integrate-ai-agents.md) - Agent setup
- [Recover from Gate Failure](recover-from-gate-failure.md) - Quality gate recovery
- [Use Web Research](use-web-research.md) - Research current debugging patterns
- [CLAUDE.md](../../CLAUDE.md) - Full reference documentation
