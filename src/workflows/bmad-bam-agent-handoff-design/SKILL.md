---
name: bmad-bam-agent-handoff-design
displayName: Agent Handoff Design
description: Design multi-agent communication and handoff protocols with state sharing and recovery patterns. Use when the user requests to 'design agent handoff' or 'create multi-agent communication'.
module: bam
tags: [ai-runtime, multi-agent, orchestration]
---

# Agent Handoff Design

## Overview

This workflow defines multi-agent communication patterns, handoff protocols, state sharing mechanisms, circuit breaker patterns, and recovery strategies for AI agents in multi-tenant environments. It produces the architectural decisions that govern agent-to-agent interactions. Run after agent runtime architecture is defined.

Act as an AI Runtime Architect specializing in multi-agent systems with distributed state management requirements.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing multi-agent coordination
- Defining handoff protocols between agents
- Establishing state sharing patterns
- Creating recovery and circuit breaker mechanisms

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new handoff architecture | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing handoff patterns | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against QG-M3 criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Handoff Protocol Design

Define handoff mechanisms:

- Synchronous vs asynchronous handoffs
- Message format and contracts
- Handoff triggers and conditions
- Priority and preemption rules
- Tenant context propagation

### Step 2: State Sharing

Design state management:

- Shared state patterns
- State serialization formats
- State versioning
- Conflict resolution
- Tenant state isolation

### Step 3: Circuit Breaker

Implement resilience patterns:

- Circuit breaker configuration
- Timeout policies
- Retry strategies
- Fallback mechanisms
- Health monitoring

### Step 4: Recovery Patterns

Define recovery strategies:

- Failure detection
- Automatic recovery
- Manual intervention triggers
- State reconciliation
- Audit and replay

**Soft Gate:** Steps 1-4 complete the agent handoff design. Present a summary and ask for confirmation.

### Quality Gates

- [ ] Handoff protocols documented
- [ ] State sharing with tenant isolation
- [ ] Circuit breakers configured
- [ ] Recovery patterns defined
- [ ] Monitoring in place

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Validates agent orchestration patterns

### Entry Gate
- QG-F1 (Foundation) must pass before starting
- Agent runtime architecture should be complete

### Exit Gate
- QG-M3 checklist items for orchestration verified
- Agent handoff architecture documented with ADRs
- Circuit breaker and recovery mechanisms defined

## Output

- `{output_folder}/planning-artifacts/architecture/agent-handoff-architecture.md`
- `{output_folder}/planning-artifacts/architecture/multi-agent-communication.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/agent-handoff-template.md`
- Agent Runtime Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Agent Resilience Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/agent-resilience-patterns.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
