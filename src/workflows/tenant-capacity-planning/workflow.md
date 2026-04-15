# Tenant Capacity Planning

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation
- You NEVER proceed to a step file if the current step file indicates the user must approve

**Step Naming Convention:** `step-NN-mode-description.md`
- `01-09`: Create mode (`step-0N-c-*`)
- `10-19`: Edit mode (`step-1N-e-*`)
- `20-29`: Validate mode (`step-2N-v-*`)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Generate new capacity planning design from scratch | `steps/` |
| **Edit** | Load existing design and apply targeted modifications | `steps/` |
| **Validate** | Check existing design against quality criteria | `steps/` |

Default: **Create** mode. In headless mode, always use Create.

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{output_folder}` for artifact output location

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- Master architecture document
- Observability platform configuration

---

## Quality Gates

### Entry Gate
- None (can run after master architecture is established)

### Exit Gate: QG-CP1 (Capacity Planning)
This workflow produces artifacts that satisfy QG-CP1. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `capacity_baseline_established` | Current capacity baseline documented | Resource utilization metrics captured per tier |
| `growth_projected` | Growth projections for multiple scenarios | Conservative, moderate, aggressive scenarios |
| `scaling_thresholds_defined` | Auto-scaling triggers configured | Threshold values for CPU, memory, storage |
| `resource_allocation_verified` | Resources allocated per tenant tier | Quota definitions for all tiers |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-CP1`

### Contributes to: QG-P1 (Production Readiness)
This workflow contributes to QG-P1 by establishing capacity planning capabilities:

| QG-P1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `observability` | Capacity monitoring metrics and dashboards |
| `SLOs defined` | Capacity-related SLOs and thresholds |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Tenant Models:** Load from `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Quality Gates:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/capacity-planning-template.md`
