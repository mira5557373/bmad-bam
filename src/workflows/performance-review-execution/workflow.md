# Performance Review Execution

---

## When to Use This Workflow

**Use when:**
- Conducting periodic performance reviews (weekly/monthly/quarterly)
- Assessing system capacity and scalability
- Verifying SLA compliance across tenant tiers
- Analyzing tenant performance patterns
- Evaluating cost efficiency

**Do NOT use when:**
- Setting up initial performance baselines (use `performance-baseline` workflow)
- Designing performance monitoring (use `tenant-aware-observability` workflow)
- Responding to performance incidents (use `incident-response-operations` workflow)

**Prerequisites:**
- Performance monitoring in place
- Historical baselines available
- SLA definitions documented

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
| **Create** | Execute new performance review | `steps/step-01-c-*` |
| **Edit** | Modify existing review | `steps/step-10-e-*` |
| **Validate** | Verify review completeness | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-baseline-comparison.md` - Compare current metrics against baselines
- `step-02-c-capacity-assessment.md` - Assess resource utilization and headroom
- `step-03-c-sla-verification.md` - Verify SLA compliance per tier
- `step-04-c-tenant-performance-analysis.md` - Analyze per-tenant performance
- `step-05-c-cost-efficiency-review.md` - Evaluate cost efficiency

### Edit Mode
Load the existing review, then follow:
- `step-10-e-load-existing.md` - Load existing performance review
- `step-11-e-apply-changes.md` - Apply updates to review

### Validate Mode
Load the existing review, then follow:
- `step-20-v-load-artifact.md` - Load review artifacts
- `step-21-v-validate.md` - Run QG-PR1 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant analysis context
   - Use `{output_folder}` for artifact output location

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- **Required artifacts:**
  - Performance baselines
  - SLA definitions
  - `project-context.md` (if exists)
- **Required gates passed:** None (operational workflow)

---

## Quality Gates

### Entry Gate
- Performance monitoring in place
- Historical baselines available

### Exit Gate: QG-PR1 (Performance Review)
This workflow produces artifacts that must pass QG-PR1 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `baseline_compared` | Current metrics compared to baselines | Deviation analysis complete |
| `capacity_assessed` | Resource utilization evaluated | Headroom calculated |
| `sla_verified` | SLA compliance checked per tier | Compliance report generated |
| `tenant_analyzed` | Per-tenant performance assessed | Health scores calculated |
| `cost_reviewed` | Cost efficiency evaluated | Optimization opportunities identified |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-PR1`

### Contributes to Downstream Gates
- **QG-P1** (Production Readiness) - Performance review supports operational readiness

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/performance-review-template.md`
