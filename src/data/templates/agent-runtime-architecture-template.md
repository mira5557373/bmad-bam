---
name: Agent Runtime Architecture
description: Template for documenting AI agent runtime architecture decisions
category: ai-runtime
version: 1.0.0
type: "architecture"
web_research_enabled: true
source_verification: true
---

## Purpose

Template for documenting AI agent runtime architecture decisions

# Agent Runtime Architecture

## Overview

<!-- FILL: Select one: langgraph | crewai | autogen | dspy | instructor | custom -->
**Framework:** {{framework}}

**LLM Gateway:** LiteLLM

**Memory:** Mem0 (long-term) + Redis (working)

**Guardrails:** NeMo Guardrails

## Agent Topology

<!-- FILL: Select one: single-agent | multi-agent-sequential | multi-agent-parallel | hierarchical -->
**Pattern:** {{topology_pattern}}

<!-- FILL: Add one row per agent. Memory Scope: session | user | tenant | global -->
| Agent | Purpose | Tools | Memory Scope |
| ----- | ------- | ----- | ------------ |

## Tool Registry

### Registered Tools

<!-- FILL: Category examples: data-access, external-api, file-system, code-execution -->
<!-- FILL: Sandbox YES means tool runs in E2B or similar isolated environment -->
| Tool | Category | Tenant-Scoped | Approval Required | Sandbox |
| ---- | -------- | ------------- | ----------------- | ------- |

### Permission Model

<!-- FILL: Define what tool categories each role can access -->
| Role | Allowed Categories | Restricted Tools |
| ---- | ------------------ | ---------------- |

## Memory Architecture

### Tier Configuration

| Tier    | Store                 | Retention    | Budget    |
| ------- | --------------------- | ------------ | --------- |
| Session | Redis                 | Conversation | Unlimited |
| User    | PostgreSQL + pgvector | 90 days      | Per-tier  |
| Tenant  | PostgreSQL + pgvector | Indefinite   | Per-tier  |
| Global  | PostgreSQL + pgvector | Indefinite   | System    |

## Approval Workflow

| Trigger          | Condition                    | Approval Type |
| ---------------- | ---------------------------- | ------------- |
| High cost        | Estimated cost > threshold   | Human review  |
| Sensitive action | Tool in restricted category  | Human review  |
| Low confidence   | Agent confidence < threshold | Human review  |

## Safety Infrastructure

### Kill Switches

<!-- FILL: Scope: global | tenant | agent | tool -->
<!-- FILL: Trigger: manual | error-rate | latency | cost -->
<!-- FILL: Recovery: auto-retry | manual-enable | gradual-rollout -->
| Switch | Scope | Trigger | Recovery |
| ------ | ----- | ------- | -------- |

### Guardrails

| Rail              | Type   | Action       |
| ----------------- | ------ | ------------ |
| Input validation  | Input  | Block + log  |
| PII detection     | Output | Redact + log |
| Topic restriction | Output | Refuse + log |

### Golden Tasks

**Location:** `quality/golden-tasks/`
**Minimum count:** 50
**Coverage:** Happy path, edge cases, safety cases

## Evaluation Strategy

| Metric       | Threshold | Tool     |
| ------------ | --------- | -------- |
| Relevance    | >= 4.0    | Ragas    |
| Faithfulness | >= 0.8    | Ragas    |
| Completion   | >= 90%    | DeepEval |

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "AI agent orchestration patterns {date}"
- "LLM guardrails implementation best practices {date}"
- "multi-agent memory architecture {date}"
- "AI agent safety kill switches {date}"
- "tool registry patterns agentic AI {date}"

Incorporate relevant findings into the document sections above.
_Source: [URL]_ for key findings.

---

## Verification Checklist

- [ ] Orchestration framework selected and documented
- [ ] Agent topology defined
- [ ] Tool registry complete with permissions
- [ ] Memory architecture configured per tier
- [ ] Approval workflow triggers defined
- [ ] Kill switches documented with recovery procedures
- [ ] Guardrails configured for input/output
- [ ] Golden tasks location and coverage specified
- [ ] Evaluation metrics and thresholds set
- [ ] Web research findings incorporated

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
