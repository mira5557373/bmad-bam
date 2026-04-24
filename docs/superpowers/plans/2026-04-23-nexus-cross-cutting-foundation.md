# NEXUS Cross-Cutting Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement NEXUS 40-Layer Architecture cross-cutting constructs (8-Field Action Contract, PRG Gate, 5 Runtime Loops) to enable all other NEXUS features in BAM.

**Architecture:** Create foundational workflows and guides that define the action contract schema, production-readiness gate checks, and runtime loop patterns. All artifacts follow BMM CEV conventions and integrate with existing BAM quality gates.

**Tech Stack:** YAML schemas, Markdown templates, CSV registry entries, BMM workflow structure

---

## File Structure

### New Workflows (2)

```
bmad-bam/src/workflows/
├── bmad-bam-action-contract-design/
│   ├── bmad-skill-manifest.yaml
│   ├── SKILL.md
│   ├── workflow.md
│   └── steps/
│       ├── step-01-c-assess-action-types.md
│       ├── step-02-c-define-contract-schema.md
│       ├── step-03-c-map-tenant-context.md
│       ├── step-04-c-design-proof-integration.md
│       ├── step-05-c-configure-loop-bindings.md
│       ├── step-06-c-generate-contract-spec.md
│       ├── step-10-e-load-existing.md
│       ├── step-11-e-apply-changes.md
│       ├── step-20-v-load-artifact.md
│       ├── step-21-v-validate-contract.md
│       └── step-22-v-generate-report.md
│
└── bmad-bam-prg-gate-setup/
    ├── bmad-skill-manifest.yaml
    ├── SKILL.md
    ├── workflow.md
    └── steps/
        ├── step-01-c-inventory-components.md
        ├── step-02-c-map-prg-checks.md
        ├── step-03-c-design-gate-automation.md
        ├── step-04-c-configure-thresholds.md
        ├── step-05-c-generate-prg-spec.md
        ├── step-10-e-load-existing.md
        ├── step-11-e-apply-changes.md
        ├── step-20-v-load-artifact.md
        ├── step-21-v-validate-prg.md
        └── step-22-v-generate-report.md
```

### New Agent Guides (8)

```
bmad-bam/src/data/agent-guides/bam/
├── 8-field-action-contract-guide.md
├── prg-gate-implementation.md
├── request-loop-patterns.md
├── control-loop-patterns.md
├── learning-loop-patterns.md
├── economic-loop-patterns.md
├── recovery-loop-patterns.md
└── tier-h-federation-patterns.md
```

### New Templates (3)

```
bmad-bam/src/data/templates/
├── action-contract-spec-template.md
├── prg-gate-spec-template.md
└── runtime-loop-config-template.md
```

### New Checklist (1)

```
bmad-bam/src/data/checklists/
└── qg-prg-production-readiness.md
```

### Registry Updates

- `src/module-help.csv` - Add 2 workflow entries
- `src/data/quality-gates.csv` - Add PRG gate entry
- `src/data/bam-patterns.csv` - Add 8 pattern entries

---

## Task 1: Create 8-Field Action Contract Guide

**Files:**
- Create: `bmad-bam/src/data/agent-guides/bam/8-field-action-contract-guide.md`

- [ ] **Step 1: Create the guide file**

```markdown
# BAM 8-Field Action Contract Guide

**When to load:** During Phase 3 (Solutioning) when designing AI agent actions,
or when user mentions action contracts, agent decisions, or proof certificates.

**Integrates with:** Winston (Architect), Nova (AI Runtime), agent-runtime-architecture workflow

---

## Core Concepts

### The 8-Field Action Contract

Every AI agent action in a multi-tenant system MUST include these 8 fields:

| Field | Type | Purpose | Multi-Tenant Impact |
|-------|------|---------|---------------------|
| `tenant_id` | string | Tenant scope identifier | Mandatory isolation boundary |
| `action_type` | enum | Action classification | Determines approval workflow |
| `confidence` | float | Model certainty (0.0-1.0) | Triggers human review threshold |
| `proof_certificate` | object | Formal verification proof | Enables audit trail |
| `resource_budget` | object | Compute/token limits | Per-tenant quota enforcement |
| `rollback_plan` | object | Reversal strategy | Enables safe recovery |
| `audit_metadata` | object | Compliance trail | Regulatory evidence |
| `loop_binding` | enum | Runtime loop assignment | Determines execution path |

### Action Types

```yaml
action_types:
  - READ_ONLY      # No state mutation, lowest risk
  - WRITE_INTERNAL # Internal state change, medium risk
  - WRITE_EXTERNAL # External API call, high risk
  - FINANCIAL      # Money movement, highest risk
  - PRIVILEGED     # Admin operations, requires MFA
```

### Confidence Thresholds

| Threshold | Action | Rationale |
|-----------|--------|-----------|
| >= 0.95 | Auto-execute | High certainty, safe to proceed |
| 0.80-0.94 | Soft review | Flag for async human review |
| 0.50-0.79 | Hard review | Block until human approves |
| < 0.50 | Reject | Insufficient confidence |

## Application Guidelines

When designing action contracts:

1. **Always include tenant_id** - Never allow cross-tenant action leakage
2. **Set conservative confidence thresholds** - Start strict, loosen with data
3. **Design rollback for every WRITE action** - Assume failure happens
4. **Bind to appropriate loop** - Request vs Control vs Learning

## Decision Framework

| Scenario | Recommended Action | Contract Fields to Emphasize |
|----------|-------------------|------------------------------|
| User query | READ_ONLY | tenant_id, audit_metadata |
| Data update | WRITE_INTERNAL | rollback_plan, proof_certificate |
| External API | WRITE_EXTERNAL | resource_budget, confidence |
| Payment | FINANCIAL | All 8 fields mandatory |

## Related Workflows

- `bmad-bam-action-contract-design` - Design action contracts
- `bmad-bam-agent-runtime-architecture` - Runtime integration
- `bmad-bam-prg-gate-setup` - Production readiness checks

## Related Patterns

Load decision criteria from pattern registry:

- **Action patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `action-contract-*`

### Web Research

- Search: "AI agent action contract patterns {date}"
- Search: "multi-tenant agent safety contracts {date}"
- Search: "proof certificate AI decision audit {date}"
```

- [ ] **Step 2: Verify file created**

Run: `cat bmad-bam/src/data/agent-guides/bam/8-field-action-contract-guide.md | head -20`
Expected: File header with "BAM 8-Field Action Contract Guide"

- [ ] **Step 3: Commit**

```bash
git add bmad-bam/src/data/agent-guides/bam/8-field-action-contract-guide.md
git commit -m "$(cat <<'EOF'
feat(bam): add 8-field action contract guide

NEXUS cross-cutting construct for AI agent action safety.
Defines tenant_id, confidence, proof_certificate, and 5 other
mandatory fields for multi-tenant agent decisions.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Create PRG Gate Implementation Guide

**Files:**
- Create: `bmad-bam/src/data/agent-guides/bam/prg-gate-implementation.md`

- [ ] **Step 1: Create the guide file**

```markdown
# BAM Production-Readiness Gate (PRG) Implementation Guide

**When to load:** During Phase 4 (Implementation) when preparing for production release,
or when user mentions PRG, production readiness, or go-live checklist.

**Integrates with:** Winston (Architect), Chad (PM), convergence-verification workflow

---

## Core Concepts

### PRG 10-Check Framework

The Production-Readiness Gate (PRG) requires ALL 10 checks to pass before any component enters production:

| # | Check | Category | Automation Level |
|---|-------|----------|------------------|
| 1 | Tenant isolation verified | Security | Automated |
| 2 | Action contracts validated | AI Safety | Automated |
| 3 | Rollback tested | Operations | Semi-auto |
| 4 | Audit trail complete | Compliance | Automated |
| 5 | Resource budgets configured | Cost | Automated |
| 6 | Confidence thresholds set | AI Safety | Manual |
| 7 | Loop bindings verified | Runtime | Automated |
| 8 | Observability instrumented | Operations | Automated |
| 9 | Chaos test passed | Resilience | Semi-auto |
| 10 | Human review sign-off | Governance | Manual |

### Check Categories

```
PRG Checks
├── Security (1)
│   └── Tenant isolation proof
├── AI Safety (2, 6)
│   ├── Contract validation
│   └── Threshold configuration
├── Operations (3, 8)
│   ├── Rollback verification
│   └── Observability check
├── Compliance (4)
│   └── Audit completeness
├── Cost (5)
│   └── Budget enforcement
├── Runtime (7)
│   └── Loop binding proof
├── Resilience (9)
│   └── Chaos engineering
└── Governance (10)
    └── Human approval
```

### PRG Outcomes

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | All 10 checks green | Deploy to production |
| **CONDITIONAL** | 8-9 checks pass, no critical failures | Deploy with monitoring plan |
| **FAIL** | Any critical check fails | Block deployment, remediate |

### Critical vs Non-Critical Checks

| Critical (Block on Fail) | Non-Critical (Warn Only) |
|-------------------------|-------------------------|
| 1. Tenant isolation | 8. Observability |
| 2. Action contracts | 9. Chaos test |
| 4. Audit trail | |
| 6. Confidence thresholds | |
| 10. Human sign-off | |

## Application Guidelines

When implementing PRG:

1. **Automate what you can** - 6 of 10 checks can be fully automated
2. **Define clear ownership** - Each check has a responsible team
3. **Set SLAs for manual checks** - Human review within 4 hours
4. **Document exceptions** - Every CONDITIONAL needs justification

## Decision Framework

| Scenario | PRG Path | Timeline |
|----------|----------|----------|
| New agent | Full PRG (all 10) | 2-5 days |
| Agent update (minor) | Partial PRG (1,2,4,7) | 4-8 hours |
| Hotfix | Emergency PRG (1,2,10) | 1-2 hours |
| Config change | Mini PRG (1,7) | 30 minutes |

## Related Workflows

- `bmad-bam-prg-gate-setup` - Configure PRG automation
- `bmad-bam-convergence-verification` - Integration checks
- `bmad-bam-action-contract-design` - Contract validation

## Related Patterns

Load from pattern registry:

- **PRG patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `prg-*`

### Web Research

- Search: "production readiness gate AI systems {date}"
- Search: "multi-tenant deployment checklist {date}"
- Search: "AI agent go-live safety verification {date}"
```

- [ ] **Step 2: Verify file created**

Run: `cat bmad-bam/src/data/agent-guides/bam/prg-gate-implementation.md | head -20`
Expected: File header with "PRG Implementation Guide"

- [ ] **Step 3: Commit**

```bash
git add bmad-bam/src/data/agent-guides/bam/prg-gate-implementation.md
git commit -m "$(cat <<'EOF'
feat(bam): add PRG gate implementation guide

NEXUS Production-Readiness Gate with 10 mandatory checks.
Covers tenant isolation, action contracts, rollback, audit,
budgets, thresholds, loops, observability, chaos, and sign-off.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Create 5 Runtime Loop Pattern Guides

**Files:**
- Create: `bmad-bam/src/data/agent-guides/bam/request-loop-patterns.md`
- Create: `bmad-bam/src/data/agent-guides/bam/control-loop-patterns.md`
- Create: `bmad-bam/src/data/agent-guides/bam/learning-loop-patterns.md`
- Create: `bmad-bam/src/data/agent-guides/bam/economic-loop-patterns.md`
- Create: `bmad-bam/src/data/agent-guides/bam/recovery-loop-patterns.md`

- [ ] **Step 1: Create request-loop-patterns.md**

```markdown
# BAM Request Loop Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing agent request handling,
or when user mentions request processing, user interactions, or synchronous flows.

**Integrates with:** Nova (AI Runtime), agent-runtime-architecture workflow

---

## Core Concepts

### Request Loop Overview

The Request Loop handles synchronous user-agent interactions with <100ms latency targets.

```
User Request → Validate → Route → Execute → Respond
     │            │         │        │         │
     └────────────┴─────────┴────────┴─────────┘
                    Request Loop
                   (P50 < 100ms)
```

### Loop Stages

| Stage | Responsibility | Tenant Context |
|-------|----------------|----------------|
| Validate | Schema + auth check | Extract tenant_id |
| Route | Agent selection | Tenant tier routing |
| Execute | Action contract | Tenant-scoped execution |
| Respond | Format response | Tenant preferences |

### Tenant-Aware Routing

```yaml
routing_rules:
  enterprise_tier:
    priority: high
    dedicated_pool: true
    timeout_ms: 5000
  
  standard_tier:
    priority: normal
    shared_pool: true
    timeout_ms: 3000
  
  free_tier:
    priority: low
    rate_limited: true
    timeout_ms: 2000
```

## Application Guidelines

1. **Always extract tenant_id first** - Before any processing
2. **Apply tier-based routing** - Enterprise gets priority
3. **Set aggressive timeouts** - Fail fast, retry elsewhere
4. **Log loop metrics** - P50, P99, error rate per tenant

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Overall runtime design
- `bmad-bam-action-contract-design` - Contract enforcement in loop

### Web Research

- Search: "AI agent request loop latency patterns {date}"
- Search: "multi-tenant request routing best practices {date}"
```

- [ ] **Step 2: Create control-loop-patterns.md**

```markdown
# BAM Control Loop Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing agent orchestration,
or when user mentions control flow, state machines, or agent coordination.

**Integrates with:** Nova (AI Runtime), LangGraph workflows

---

## Core Concepts

### Control Loop Overview

The Control Loop manages agent state transitions and multi-step workflows.

```
State A → Decision → State B → Decision → State C
   │         │          │         │          │
   └─────────┴──────────┴─────────┴──────────┘
                  Control Loop
              (Manages agent state)
```

### State Categories

| Category | Tenant Scope | Persistence |
|----------|--------------|-------------|
| Conversation | Per-session | Redis (TTL) |
| Workflow | Per-tenant | PostgreSQL |
| Agent Memory | Per-tenant | Vector DB |
| Global Config | Platform | Config store |

### Multi-Tenant State Isolation

```yaml
state_isolation:
  strategy: namespace_prefix
  pattern: "tenant:{tenant_id}:agent:{agent_id}:state"
  
  cleanup:
    on_session_end: archive_to_cold
    retention_days: 90
```

## Application Guidelines

1. **Namespace all state keys** - tenant_id prefix mandatory
2. **Design for interruption** - Checkpoint every state transition
3. **Implement state TTLs** - Prevent unbounded growth
4. **Audit state changes** - Compliance requirement

### Web Research

- Search: "AI agent state machine patterns {date}"
- Search: "LangGraph control flow multi-tenant {date}"
```

- [ ] **Step 3: Create learning-loop-patterns.md**

```markdown
# BAM Learning Loop Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing continuous improvement,
or when user mentions feedback, fine-tuning, or model improvement.

**Integrates with:** Nova (AI Runtime), L18 Continual Learning layer

---

## Core Concepts

### Learning Loop Overview

The Learning Loop enables tenant-aware model improvement without cross-contamination.

```
Feedback → Aggregate → Validate → Train → Deploy
    │          │           │        │        │
    └──────────┴───────────┴────────┴────────┘
                   Learning Loop
              (Tenant-isolated improvement)
```

### Feedback Categories

| Type | Source | Tenant Scope | Usage |
|------|--------|--------------|-------|
| Explicit | Thumbs up/down | Per-tenant | Direct signal |
| Implicit | Completion rate | Per-tenant | Inferred signal |
| Correction | User edits | Per-tenant | Gold label |
| Escalation | Human takeover | Per-tenant | Failure signal |

### Tenant Data Isolation in Learning

```yaml
learning_isolation:
  # Option 1: Per-tenant fine-tuning (expensive)
  per_tenant_model:
    enabled: enterprise_only
    min_samples: 1000
  
  # Option 2: Federated learning (privacy-preserving)
  federated:
    enabled: true
    aggregation: differential_privacy
    epsilon: 1.0
  
  # Option 3: Shared with consent
  shared_pool:
    requires_consent: true
    anonymization: required
```

## Application Guidelines

1. **Never mix tenant feedback** - Strict isolation by default
2. **Require consent for shared learning** - GDPR compliance
3. **Apply differential privacy** - Mathematical privacy guarantee
4. **Validate before training** - Quality gate on feedback

### Web Research

- Search: "federated learning multi-tenant AI {date}"
- Search: "RLHF tenant isolation patterns {date}"
```

- [ ] **Step 4: Create economic-loop-patterns.md**

```markdown
# BAM Economic Loop Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing cost management,
or when user mentions budgets, quotas, or usage limits.

**Integrates with:** Atlas (Platform), billing workflows

---

## Core Concepts

### Economic Loop Overview

The Economic Loop enforces per-tenant resource budgets in real-time.

```
Budget → Monitor → Alert → Throttle → Invoice
   │        │        │        │          │
   └────────┴────────┴────────┴──────────┘
                Economic Loop
            (Real-time cost control)
```

### Budget Dimensions

| Dimension | Unit | Enforcement Point |
|-----------|------|-------------------|
| Tokens | Per-request | Pre-execution |
| API calls | Per-minute | Rate limiter |
| Compute | GPU-seconds | Scheduler |
| Storage | GB | Write path |

### Tier-Based Budgets

```yaml
budgets:
  free_tier:
    tokens_per_day: 10000
    api_calls_per_minute: 10
    overage_action: hard_block
  
  standard_tier:
    tokens_per_day: 100000
    api_calls_per_minute: 100
    overage_action: soft_throttle
  
  enterprise_tier:
    tokens_per_day: unlimited
    api_calls_per_minute: 1000
    overage_action: alert_only
```

## Application Guidelines

1. **Check budget before execution** - Not after
2. **Alert at 80% usage** - Give time to react
3. **Soft throttle before hard block** - Better UX
4. **Track cost per action type** - Optimize expensive operations

### Web Research

- Search: "AI usage metering multi-tenant {date}"
- Search: "token budget management LLM {date}"
```

- [ ] **Step 5: Create recovery-loop-patterns.md**

```markdown
# BAM Recovery Loop Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing fault tolerance,
or when user mentions rollback, recovery, or failure handling.

**Integrates with:** Atlas (Platform), disaster-recovery workflow

---

## Core Concepts

### Recovery Loop Overview

The Recovery Loop enables safe rollback and self-healing for tenant-scoped failures.

```
Detect → Isolate → Diagnose → Recover → Verify
   │        │          │          │        │
   └────────┴──────────┴──────────┴────────┘
                 Recovery Loop
            (Tenant-scoped resilience)
```

### Recovery Strategies

| Strategy | Scope | Use When |
|----------|-------|----------|
| Retry | Single request | Transient failure |
| Rollback | Single action | Action failed mid-execution |
| Failover | Tenant session | Service degradation |
| Quarantine | Tenant account | Suspected abuse |

### Tenant-Scoped Rollback

```yaml
rollback_config:
  action_level:
    strategy: compensating_action
    timeout_ms: 5000
    max_retries: 3
  
  session_level:
    strategy: checkpoint_restore
    checkpoint_interval: 5_actions
  
  tenant_level:
    strategy: point_in_time_recovery
    retention_hours: 72
```

## Application Guidelines

1. **Design rollback with the action** - Not as afterthought
2. **Test rollback in staging** - PRG check #3
3. **Isolate failure blast radius** - One tenant, not all
4. **Log recovery attempts** - Audit requirement

### Web Research

- Search: "AI agent rollback patterns {date}"
- Search: "multi-tenant failure isolation {date}"
```

- [ ] **Step 6: Verify all loop guides created**

Run: `ls -la bmad-bam/src/data/agent-guides/bam/*-loop-patterns.md`
Expected: 5 files listed

- [ ] **Step 7: Commit loop guides**

```bash
git add bmad-bam/src/data/agent-guides/bam/*-loop-patterns.md
git commit -m "$(cat <<'EOF'
feat(bam): add 5 runtime loop pattern guides

NEXUS runtime loops for multi-tenant agent systems:
- Request Loop: <100ms synchronous handling
- Control Loop: State machine orchestration
- Learning Loop: Tenant-isolated improvement
- Economic Loop: Real-time budget enforcement
- Recovery Loop: Fault tolerance and rollback

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Create Tier-H Federation Patterns Guide

**Files:**
- Create: `bmad-bam/src/data/agent-guides/bam/tier-h-federation-patterns.md`

- [ ] **Step 1: Create the guide file**

```markdown
# BAM Tier-H Federation Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing agent-to-agent communication,
or when user mentions federation, A2A, or cross-system agent interop.

**Integrates with:** Nova (AI Runtime), L17 A2A Interoperability layer

---

## Core Concepts

### Tier-H Operating Model

Tier-H ("Hyper-scale") enables agent federation across tenant and system boundaries.

```
Tenant A Agent ←→ Federation Layer ←→ Tenant B Agent
       │                │                    │
       └────────────────┴────────────────────┘
                   Tier-H Federation
              (Cross-boundary agent comms)
```

### Federation Modes

| Mode | Trust Level | Use Case |
|------|-------------|----------|
| Internal | High | Same tenant, different agents |
| Partner | Medium | Pre-approved external tenants |
| Public | Low | Open agent marketplace |

### Agent Card Schema (A2A Protocol)

```yaml
agent_card:
  id: "agent-uuid"
  tenant_id: "tenant-uuid"
  capabilities:
    - action_type: "data_retrieval"
      confidence_min: 0.8
  
  federation:
    mode: partner
    allowed_tenants: ["tenant-b", "tenant-c"]
    rate_limit: 100_per_minute
  
  proof_requirements:
    require_certificate: true
    verify_chain: true
```

### Cross-Tenant Action Contract

When Agent A (Tenant X) calls Agent B (Tenant Y):

| Field | Source | Validation |
|-------|--------|------------|
| tenant_id | Agent A's tenant | Must match caller |
| target_tenant_id | Agent B's tenant | Must be in allowed list |
| federation_token | Federation layer | JWT with short TTL |
| action_contract | Agent A | Full 8-field contract |

## Application Guidelines

1. **Default to Internal mode** - Least privilege
2. **Require mutual TLS** - For Partner/Public modes
3. **Log all cross-tenant calls** - Audit requirement
4. **Set conservative rate limits** - Prevent abuse

### Web Research

- Search: "agent-to-agent protocol interoperability {date}"
- Search: "multi-tenant AI federation patterns {date}"
- Search: "A2A agent card specification {date}"
```

- [ ] **Step 2: Commit**

```bash
git add bmad-bam/src/data/agent-guides/bam/tier-h-federation-patterns.md
git commit -m "$(cat <<'EOF'
feat(bam): add Tier-H federation patterns guide

NEXUS L17 A2A interoperability for multi-tenant agent systems.
Covers federation modes, agent cards, and cross-tenant contracts.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Create Action Contract Design Workflow

**Files:**
- Create: `bmad-bam/src/workflows/bmad-bam-action-contract-design/bmad-skill-manifest.yaml`
- Create: `bmad-bam/src/workflows/bmad-bam-action-contract-design/SKILL.md`
- Create: `bmad-bam/src/workflows/bmad-bam-action-contract-design/workflow.md`
- Create: 11 step files in `steps/`

- [ ] **Step 1: Create workflow directory**

Run: `mkdir -p bmad-bam/src/workflows/bmad-bam-action-contract-design/steps`

- [ ] **Step 2: Create bmad-skill-manifest.yaml**

```yaml
type: workflow
name: bmad-bam-action-contract-design
displayName: Action Contract Design
description: 'Design 8-field action contracts for AI agent decisions with tenant isolation and proof certificates'
module: bam
config_variables:
  - tenant_model
  - ai_runtime
step_naming_convention: "step-NN-mode-description"
```

- [ ] **Step 3: Create SKILL.md**

```markdown
---
name: bmad-bam-action-contract-design
displayName: Action Contract Design
description: Design 8-field action contracts for AI agent safety. Use when the user requests to 'design action contracts' or 'configure agent decision safety'.
module: bam
tags: [ai-runtime, safety, nexus]
---

# Action Contract Design

## Overview

This workflow designs the complete 8-field action contract schema for AI agent decisions. It covers tenant context mapping, confidence thresholds, proof certificate integration, and runtime loop bindings. Run after agent-runtime-architecture.

Act as an AI Safety Architect designing production-grade action contracts.

## When to Use

- Designing AI agent decision safety
- Configuring action approval workflows
- Implementing proof certificates for audit

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new artifact | `step-01-c-*` to `step-06-c-*` |
| Edit | Modify existing artifact | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against criteria | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- `bmad-bam-agent-runtime-architecture` completed
- **Config required:** `ai_runtime`, `tenant_model`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/8-field-action-contract-guide.md`

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-AI2** | Primary | Agent contract validation |
| **QG-M3** | Contributes | Agent runtime completeness |
| **QG-PRG** | Contributes | PRG check #2 (contracts) |

## Outputs

- `{output_folder}/planning-artifacts/ai/action-contract-spec.md`
- Contract schema definition
- Confidence threshold configuration
```

- [ ] **Step 4: Create workflow.md**

```markdown
# Action Contract Design

## When to Use

- After completing `bmad-bam-agent-runtime-architecture`
- When defining AI agent decision safety controls
- Before implementing agent actions

## Prerequisites

- Agent runtime architecture defined
- Tenant model selected
- Load: `8-field-action-contract-guide.md`

## Workflow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 Action Contract Design                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  step-01 ──► step-02 ──► step-03 ──► step-04           │
│  Assess      Define      Map         Design             │
│  Actions     Schema      Tenant      Proof              │
│                                                          │
│  step-04 ──► step-05 ──► step-06                        │
│  Design      Configure   Generate                        │
│  Proof       Loops       Spec                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new action contract spec | `step-01-c-*` through `step-06-c-*` |
| **Edit** | Modify existing contract spec | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check contract against QG-AI2 | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless artifact exists.

### Create Mode
Follow Create steps sequentially: step-01-c → step-02-c → step-03-c → step-04-c → step-05-c → step-06-c

### Edit Mode
Follow Edit steps: step-10-e-load → step-11-e-apply

### Validate Mode
Follow Validate steps: step-20-v-load → step-21-v-validate → step-22-v-report
```

- [ ] **Step 5: Create step-01-c-assess-action-types.md**

```markdown
# Step 1: Assess Action Types

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. 🔍 Use web search when directed
> 4. DO NOT skip verification

## Purpose

Inventory all AI agent action types and classify by risk level.

## Prerequisites

- Agent runtime architecture document loaded
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/8-field-action-contract-guide.md`

## Actions

### 1. Inventory Agent Actions

Review agent runtime architecture and list all actions agents can perform:

| Action | Description | State Mutation | External Call |
|--------|-------------|----------------|---------------|
| | | | |

### 2. Classify by Risk Level

Apply risk classification from guide:

| Action | Risk Level | Action Type | Rationale |
|--------|------------|-------------|-----------|
| | READ_ONLY / WRITE_INTERNAL / WRITE_EXTERNAL / FINANCIAL / PRIVILEGED | | |

### 3. Identify High-Risk Actions

**Verify current best practices with web search:**
Search the web: "AI agent action risk classification {date}"

Flag actions requiring enhanced controls:
- [ ] Any FINANCIAL actions?
- [ ] Any PRIVILEGED actions?
- [ ] Any actions calling external APIs with PII?

## Verification

- [ ] All agent actions inventoried
- [ ] Risk levels assigned to each action
- [ ] High-risk actions flagged

## Outputs

- Action inventory table
- Risk classification matrix

## Next Step

Proceed to `step-02-c-define-contract-schema.md` with classified actions.
```

- [ ] **Step 6: Create remaining Create-mode steps (step-02 through step-06)**

Create files for:
- `step-02-c-define-contract-schema.md` - Define 8-field schema
- `step-03-c-map-tenant-context.md` - Map tenant_id injection points
- `step-04-c-design-proof-integration.md` - Design proof_certificate flow
- `step-05-c-configure-loop-bindings.md` - Bind actions to runtime loops
- `step-06-c-generate-contract-spec.md` - Generate final specification

- [ ] **Step 7: Create Edit-mode steps**

Create files for:
- `step-10-e-load-existing.md`
- `step-11-e-apply-changes.md`

- [ ] **Step 8: Create Validate-mode steps**

Create files for:
- `step-20-v-load-artifact.md`
- `step-21-v-validate-contract.md`
- `step-22-v-generate-report.md`

- [ ] **Step 9: Commit workflow**

```bash
git add bmad-bam/src/workflows/bmad-bam-action-contract-design/
git commit -m "$(cat <<'EOF'
feat(bam): add action contract design workflow

NEXUS 8-field action contract workflow with CEV pattern:
- Create: 6 steps (assess → define → map → proof → loops → spec)
- Edit: 2 steps (load → apply)
- Validate: 3 steps (load → validate → report)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Create PRG Gate Setup Workflow

**Files:**
- Create: `bmad-bam/src/workflows/bmad-bam-prg-gate-setup/` (same structure as Task 5)

- [ ] **Step 1: Create workflow directory and manifest**

- [ ] **Step 2: Create SKILL.md for PRG workflow**

- [ ] **Step 3: Create workflow.md for PRG workflow**

- [ ] **Step 4: Create 10 step files (5 Create, 2 Edit, 3 Validate)**

- [ ] **Step 5: Commit workflow**

---

## Task 7: Create Templates

**Files:**
- Create: `bmad-bam/src/data/templates/action-contract-spec-template.md`
- Create: `bmad-bam/src/data/templates/prg-gate-spec-template.md`
- Create: `bmad-bam/src/data/templates/runtime-loop-config-template.md`

- [ ] **Step 1: Create action-contract-spec-template.md**

- [ ] **Step 2: Create prg-gate-spec-template.md**

- [ ] **Step 3: Create runtime-loop-config-template.md**

- [ ] **Step 4: Commit templates**

---

## Task 8: Create PRG Checklist

**Files:**
- Create: `bmad-bam/src/data/checklists/qg-prg-production-readiness.md`

- [ ] **Step 1: Create checklist with 10 PRG checks**

- [ ] **Step 2: Commit checklist**

---

## Task 9: Update Registry Files

**Files:**
- Modify: `bmad-bam/src/module-help.csv`
- Modify: `bmad-bam/src/data/quality-gates.csv`
- Modify: `bmad-bam/src/data/bam-patterns.csv`

- [ ] **Step 1: Add workflow entries to module-help.csv**

```csv
bam,bmad-bam-action-contract-design,Action Contract Design,ACD,Design 8-field action contracts for AI agent safety,run,,3-solutioning,bmad-bam-agent-runtime-architecture,,false,{output_folder}/planning-artifacts/ai,action-contract-spec.md,"action,contract,safety,ai,nexus"
bam,bmad-bam-prg-gate-setup,PRG Gate Setup,PRG,Configure Production-Readiness Gate with 10 mandatory checks,run,,4-implementation,bmad-bam-convergence-verification,,false,{output_folder}/planning-artifacts/quality,prg-gate-spec.md,"prg,production,readiness,gate,nexus"
```

- [ ] **Step 2: Add PRG gate to quality-gates.csv**

- [ ] **Step 3: Add patterns to bam-patterns.csv**

- [ ] **Step 4: Commit registry updates**

---

## Task 10: Run Tests and Verify

- [ ] **Step 1: Run test suite**

Run: `cd bmad-bam && npm test`
Expected: All tests pass

- [ ] **Step 2: Verify file counts**

Run: `ls bmad-bam/src/data/agent-guides/bam/*.md | wc -l`
Expected: 231 (223 + 8 new guides)

- [ ] **Step 3: Verify workflow count**

Run: `ls -d bmad-bam/src/workflows/*/ | wc -l`
Expected: Previous count + 2

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(bam): complete NEXUS cross-cutting foundation

Sub-Project 1 complete:
- 8 new agent guides (action contract, PRG, 5 loops, federation)
- 2 new workflows (action-contract-design, prg-gate-setup)
- 3 new templates
- 1 new checklist (qg-prg)
- Registry updates (module-help, quality-gates, bam-patterns)

Enables all other NEXUS layer implementations.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Verification Checklist

After all tasks complete:

- [ ] 8 new agent guides exist in `agent-guides/bam/`
- [ ] 2 new workflows exist with CEV step structure
- [ ] 3 new templates exist in `templates/`
- [ ] 1 new checklist exists in `checklists/`
- [ ] `module-help.csv` has 2 new entries
- [ ] `quality-gates.csv` has PRG entry
- [ ] `bam-patterns.csv` has 8 new patterns
- [ ] `npm test` passes
- [ ] All commits follow conventional format

---

## Execution Summary

| Task | Files | Estimated Time |
|------|-------|----------------|
| 1. Action Contract Guide | 1 | 5 min |
| 2. PRG Guide | 1 | 5 min |
| 3. Loop Guides (5) | 5 | 15 min |
| 4. Federation Guide | 1 | 5 min |
| 5. Action Contract Workflow | 14 | 20 min |
| 6. PRG Workflow | 13 | 20 min |
| 7. Templates | 3 | 10 min |
| 8. Checklist | 1 | 5 min |
| 9. Registry Updates | 3 | 10 min |
| 10. Tests & Verify | - | 5 min |
| **Total** | **42** | **~100 min** |
