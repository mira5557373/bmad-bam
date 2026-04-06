# Agent Runtime Architecture

## Overview

**Framework:** {{FRAMEWORK}}
**LLM Gateway:** LiteLLM
**Memory:** Mem0 (long-term) + Redis (working)
**Guardrails:** NeMo Guardrails

## Agent Topology

**Pattern:** {{TOPOLOGY_PATTERN}}

| Agent | Purpose | Tools | Memory Scope |
| ----- | ------- | ----- | ------------ |

## Tool Registry

### Registered Tools

| Tool | Category | Tenant-Scoped | Approval Required | Sandbox |
| ---- | -------- | ------------- | ----------------- | ------- |

### Permission Model

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
