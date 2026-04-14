# AI Cost Tracking

---

## When to Use This Workflow

**Use when:**
- Designing AI cost tracking for a new platform
- No ai-cost-tracking-design.md exists
- Adding cost attribution to existing AI operations
- Implementing per-tenant AI billing

**Do NOT use when:**
- Cost tracking already exists (use Edit mode)
- Only updating pricing (use Edit mode)
- Viewing cost reports (use dashboards)

**Prerequisites:**
- `agent-runtime-architecture.md` with AI runtime decisions
- `usage-metering-design.md` (recommended)
- Understanding of billing requirements

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution.

**Step Naming Convention:** `step-NN-mode-description.md`
- `01-09`: Create mode (`step-0N-c-*`)
- `10-19`: Edit mode (`step-1N-e-*`)
- `20-29`: Validate mode (`step-2N-v-*`)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Generate new AI Cost Tracking from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Cost Tracking | `steps/step-10-e-*` |
| **Validate** | Check Cost Tracking against criteria | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
- `step-01-c-token-usage-metering.md` - Design token counting and metering
- `step-02-c-compute-cost-attribution.md` - Design compute cost allocation
- `step-03-c-cost-aggregation-pipeline.md` - Design cost aggregation
- `step-04-c-billing-integration.md` - Design billing integration

### Edit Mode
- `step-10-e-load-existing.md` - Load existing cost tracking
- `step-11-e-apply-changes.md` - Apply modifications

### Validate Mode
- `step-20-v-load-artifact.md` - Load cost tracking artifacts
- `step-21-v-validate.md` - Run validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- **Required artifacts:** `agent-runtime-architecture.md`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
