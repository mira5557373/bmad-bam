# Cost Optimization Review

---

## When to Use This Workflow

**Use when:**
- Conducting periodic cost optimization reviews
- Identifying cost reduction opportunities
- Verifying tenant cost attribution accuracy
- Configuring budget alerts and thresholds

**Do NOT use when:**
- Responding to cost incidents (use `incident-response-operations` workflow)
- Designing initial cost monitoring (use `tenant-cost-attribution` workflow)
- Reviewing overall performance (use `performance-review-execution` workflow)

**Prerequisites:**
- Cost data accessible
- Billing data available
- Tenant usage data accessible

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
| **Create** | Execute new cost optimization review | `steps/step-01-c-*` |
| **Edit** | Modify existing review | `steps/step-10-e-*` |
| **Validate** | Verify review completeness | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-cost-baseline.md` - Establish cost baseline
- `step-02-c-optimization-opportunities.md` - Identify optimization opportunities
- `step-03-c-tenant-cost-attribution.md` - Verify tenant cost attribution
- `step-04-c-budget-alerts.md` - Configure budget alerts

### Edit Mode
Load the existing review, then follow:
- `step-10-e-load-existing.md` - Load existing cost review
- `step-11-e-apply-changes.md` - Apply updates to review

### Validate Mode
Load the existing review, then follow:
- `step-20-v-load-artifact.md` - Load review artifacts
- `step-21-v-validate.md` - Run QG-CS1 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant cost context
   - Use `{output_folder}` for artifact output location

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- **Required artifacts:**
  - Billing data
  - Usage metrics
  - `project-context.md` (if exists)
- **Required gates passed:** None (operational workflow)

---

## Quality Gates

### Entry Gate
- Cost data accessible
- Billing data available

### Exit Gate: QG-CS1 (Cost Optimization)
This workflow produces artifacts that must pass QG-CS1 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `baseline_established` | Cost baseline documented | Categories and trends |
| `opportunities_identified` | Optimization opportunities found | Savings quantified |
| `attribution_verified` | Tenant cost attribution accurate | Per-tenant verified |
| `alerts_configured` | Budget alerts set up | Thresholds documented |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-CS1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/cost-optimization-template.md`
