---
name: bmad-bam-agent-runtime-architecture
displayName: Agent Runtime Architecture
description: Design AI agent runtime patterns and safety. Use when the user requests to 'design agent runtime' or 'create AI runtime architecture'.
module: bam
tags: [ai-runtime]
---

# Agent Runtime Architecture

## Overview

This workflow defines the orchestration model, tool registry, memory tiers, approval workflows, evaluation foundation, and kill switch design for the AI runtime layer. It produces the architectural decisions that govern all agentic features in the platform. Run after master PRD, before AI feature stories.

Act as an AI Runtime Architect specializing in LLM-based agent systems with multi-tenant safety requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing AI agent capabilities for the platform
- Defining orchestration patterns and tool registry
- Establishing memory tier isolation rules
- Creating agent safety controls and kill switches

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new agent runtime architecture | `step-01-c-*` to `step-06-c-*` |
| Edit | Modify existing architecture | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-M3 criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Orchestration Model Selection

Apply Principle 11 — Start Simple, Escalate Deliberately:

- Default: single agent with tools
- Escalate to manager + specialists only when justified (tool count >15, conflicting system prompts, multi-step quality degradation)
- Document escalation decision as ADR
- Every multi-agent topology must have a kill switch fallback to simpler topology

Prompt management: system prompts stored as version-controlled templates in AI runtime module, with tier-specific overrides.

### Step 2: Tool Registry Design

- Tool catalog structure (name, description, module owner, permissions)
- Permission model: role-based, tenant-scoped, approval-required flags
- Sandbox configuration (E2B for untrusted tools)
- Policy engine rules (Cerbos integration for tool access)
- NeMo Guardrails integration for pre-tool safety checks

### Step 3: Memory Tier Design

| Tier     | Scope                     | Storage      | Retention        |
| -------- | ------------------------- | ------------ | ---------------- |
| Session  | Single conversation       | Redis        | Session duration |
| User     | Per-user across sessions  | Mem0         | Configurable     |
| Tenant   | Shared within tenant      | Mem0 + Redis | Tenant lifecycle |
| Global   | Platform-wide             | Mem0         | Permanent        |
| Episodic | Event-triggered snapshots | PostgreSQL   | Configurable     |

Define isolation rules: tenant memory NEVER leaks to other tenants.

### Step 4: Approval Workflow Design

- Trigger conditions (risk level, cost threshold, sensitivity classification)
- Queue design (per-tenant approval queues)
- Timeout handling (auto-deny after configurable period)
- Escalation rules (human override protocol)

**Soft Gate:** Steps 1-4 complete the core runtime design. Present a summary of orchestration model, tool registry, memory tiers, and approval workflows. Ask for confirmation before proceeding to evaluation and kill switch design.

### Step 5: Evaluation Foundation

- Golden task template (diverse test cases per agent type)
- Metric definitions (accuracy, relevance, latency, cost, safety)
- Threshold configuration per metric
- Regression baseline establishment
- LLM-as-judge evaluation method

### Step 6: Kill Switch Design

- Feature flag integration (GrowthBook + OpenFeature)
- Circuit breaker configuration per agent/tool
- Manual override mechanism for ops
- Rollback procedure (fall back to simpler topology or disable agent)

### Quality Gates

- [ ] Orchestration pattern justified with ADR
- [ ] Tool registry structure defined with permissions
- [ ] Memory tiers with scope and isolation rules defined
- [ ] Approval triggers documented
- [ ] Kill switch mechanism defined and tested

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates agent orchestration, tool registry, and memory tier design
- **QG-I3** (Agent Safety) - Provides foundation for agent safety verification

### Entry Gate
- QG-F1 (Foundation) must pass before starting
- Master PRD and architecture decisions must be complete

### Exit Gate
- QG-M3 checklist items from `qg-m3-agent-runtime.md` verified
- Agent runtime architecture documented with ADRs
- Kill switch and fallback mechanisms defined

## Output

- `{output_folder}/planning-artifacts/architecture/agent-runtime-architecture.md`
- `{output_folder}/planning-artifacts/architecture/tool-registry-and-permissions.md`
- `{output_folder}/planning-artifacts/architecture/memory-boundaries.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/agent-runtime-architecture-template.md`, `{project-root}/_bmad/bam/data/templates/tool-contract-template.md`
- AI Model Versioning: `{project-root}/_bmad/bam/data/agent-guides/bam/llm-versioning.md`
- Agent Runtime Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Memory Tier Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/memory-tiers.md`
- Tool Execution Middleware: `{project-root}/_bmad/bam/data/agent-guides/bam/tool-execution-middleware.md`
- Run Contract Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/run-contracts.md`
- Context Compiler Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/context-compiler-patterns.md`
- Action Gateway Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/action-gateway-patterns.md`
- Agent Resilience Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-resilience-patterns.md`
- Agent Lifecycle Versioning: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-lifecycle-versioning-patterns.md`
- Agent Identity TBAC: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-identity-tbac-patterns.md`
- WDS Integration Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/wds-integration-patterns.md`

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/memory-tiers.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/tool-execution-middleware.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/run-contracts.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/action-gateway-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/context-compiler-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/llm-versioning.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/agent-lifecycle-versioning-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/agent-identity-tbac-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/agent-resilience-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`
- AI Model Versioning: `{project-root}/_bmad/bam/data/agent-guides/bam/llm-versioning.md`
- Agent Runtime Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Memory Tier Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/memory-tiers.md`
- Tool Execution Middleware: `{project-root}/_bmad/bam/data/agent-guides/bam/tool-execution-middleware.md`
- Run Contract Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/run-contracts.md`
- Context Compiler Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/context-compiler-patterns.md`
- Action Gateway Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/action-gateway-patterns.md`
- Agent Resilience Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-resilience-patterns.md`
- Agent Lifecycle Versioning: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-lifecycle-versioning-patterns.md`
- Agent Identity TBAC: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-identity-tbac-patterns.md`
- WDS Integration Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/wds-integration-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
