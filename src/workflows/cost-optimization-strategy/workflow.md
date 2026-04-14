# Cost Optimization Strategy

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
| **Create** | Generate new cost optimization strategy | `steps/step-01-c-*` |
| **Edit** | Modify existing cost optimization strategy | `steps/step-10-e-*` |
| **Validate** | Check cost optimization strategy against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-analyze-costs.md` - Analyze current cost structure
- `step-02-c-design-optimization.md` - Design optimization strategies
- `step-03-c-design-finops.md` - Design FinOps practices
- `step-04-c-assembly.md` - Combine into cost-optimization-strategy.md

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing cost optimization strategy
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load cost optimization strategy
- `step-21-v-validate.md` - Run validation checks against QG-P1
- `step-22-v-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{ai_runtime}` for agent runtime context

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- **Required artifacts:**
  - Master architecture
  - Tenant cost attribution design
  - `project-context.md` (if exists)
- **Required gates passed:** QG-F1 (Foundation) must pass

---

## Quality Gates

### Entry Gate
- QG-F1 (Foundation Gate) must pass

### Exit Gate: QG-CS1 (Cost Optimization)
This workflow produces artifacts that satisfy QG-CS1. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `cost_baseline_established` | Current cost baseline documented | Infrastructure, LLM, and operational costs captured |
| `optimization_opportunities_identified` | Cost optimization strategies documented | Compute, LLM, storage, and network optimization defined |
| `tenant_attribution_verified` | Tenant cost attribution accurate | Per-tenant cost tracking and allocation configured |
| `budget_alerts_configured` | Budget alerts and anomaly detection active | Alert thresholds and notification rules defined |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-CS1`

### Contributes to: QG-P1 (Production Readiness)
This workflow contributes to QG-P1 by establishing cost management capabilities:

| QG-P1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `observability` | Cost monitoring dashboards and metrics |
| `compliance` | FinOps governance and cost allocation |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
