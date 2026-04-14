# AI Fallback Chains

---

## When to Use This Workflow

**Use when:**
- Designing AI provider resilience for a new platform
- No ai-fallback-chains-design.md exists
- Adding multi-provider support to existing AI systems
- Implementing automatic failover

**Do NOT use when:**
- Fallback chains already exist (use Edit mode)
- Only updating provider settings (use Edit mode)
- Monitoring provider health (use dashboards)

**Prerequisites:**
- `agent-runtime-architecture.md` with AI runtime decisions
- `llm-gateway-configuration.md` (recommended)
- Understanding of provider landscape

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
| **Create** | Generate new AI Fallback Chains from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Fallback Chains | `steps/step-10-e-*` |
| **Validate** | Check Fallback Chains against criteria | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
- `step-01-c-provider-catalog-design.md` - Design provider registry
- `step-02-c-quality-threshold-configuration.md` - Design quality thresholds
- `step-03-c-failover-logic-design.md` - Design failover mechanisms
- `step-04-c-tenant-configuration-design.md` - Design tenant controls

### Edit Mode
- `step-10-e-load-existing.md` - Load existing fallback chains
- `step-11-e-apply-changes.md` - Apply modifications

### Validate Mode
- `step-20-v-load-artifact.md` - Load fallback chain artifacts
- `step-21-v-validate.md` - Run validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- **Required artifacts:** `agent-runtime-architecture.md`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
