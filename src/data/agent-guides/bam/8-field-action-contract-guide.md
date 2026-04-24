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

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI agent action contract patterns {date}"
- Search: "multi-tenant agent safety contracts {date}"
- Search: "proof certificate AI decision audit {date}"
