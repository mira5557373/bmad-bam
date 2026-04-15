# Capacity Planning Review

---

## When to Use This Workflow

**Use when:**
- Conducting periodic capacity planning reviews
- Preparing for expected growth or scaling events
- Defining scaling thresholds and triggers
- Verifying resource allocation across tenant tiers

**Do NOT use when:**
- Responding to capacity incidents (use `incident-response-operations` workflow)
- Setting up initial capacity monitoring (use `tenant-aware-observability` workflow)
- Reviewing current performance (use `performance-review-execution` workflow)

**Prerequisites:**
- Current resource inventory available
- Historical usage data accessible
- Growth targets defined

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
| **Create** | Execute new capacity planning review | `steps/step-01-c-*` |
| **Edit** | Modify existing plan | `steps/step-10-e-*` |
| **Validate** | Verify plan completeness | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-capacity-baseline.md` - Establish capacity baseline metrics
- `step-02-c-growth-projection.md` - Project growth and demand
- `step-03-c-scaling-thresholds.md` - Define scaling thresholds
- `step-04-c-resource-allocation.md` - Verify resource allocation

### Edit Mode
Load the existing plan, then follow:
- `step-10-e-load-existing.md` - Load existing capacity plan
- `step-11-e-apply-changes.md` - Apply updates to plan

### Validate Mode
Load the existing plan, then follow:
- `step-20-v-load-artifact.md` - Load plan artifacts
- `step-21-v-validate.md` - Run QG-CP1 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant allocation context
   - Use `{output_folder}` for artifact output location

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- **Required artifacts:**
  - Resource inventory
  - Historical usage data
  - `project-context.md` (if exists)
- **Required gates passed:** None (operational workflow)

---

## Quality Gates

### Entry Gate
- Resource inventory available
- Historical usage data accessible

### Exit Gate: QG-CP1 (Capacity Planning)
This workflow produces artifacts that must pass QG-CP1 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `baseline_established` | Current capacity baseline documented | Metrics with timestamps |
| `growth_projected` | Growth projections documented | Multiple scenarios |
| `thresholds_defined` | Scaling thresholds specified | Auto and manual triggers |
| `allocation_verified` | Resource allocation verified | Per-tier allocation documented |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-CP1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/capacity-planning-template.md`
