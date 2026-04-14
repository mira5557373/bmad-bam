# Disaster Recovery Drill

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
| **Create** | Execute new DR drill | `steps/step-01-c-*` |
| **Edit** | Modify existing drill results | `steps/step-10-e-*` |
| **Validate** | Check drill against QG-DR1 criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-dr-plan-execution.md` - Execute DR plan procedures
- `step-02-c-failover-testing.md` - Test failover to DR environment
- `step-03-c-recovery-validation.md` - Validate recovery and data integrity
- `step-04-c-rto-rpo-verification.md` - Measure and verify RTO/RPO

### Edit Mode
Load the existing drill artifacts, then follow:
- `step-10-e-load-existing.md` - Load existing drill report
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing drill artifacts, then follow:
- `step-20-v-load-artifact.md` - Load drill report
- `step-21-v-validate.md` - Run QG-DR1 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific recovery verification
   - Use `{ai_runtime}` for AI service recovery
   - Use `{output_folder}` for artifact output location

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- DR plan documentation
- DR environment available
- **Required gates passed:** None (standalone operational workflow)

---

## Quality Gates

### Entry Gate
- DR plan documentation exists
- DR environment provisioned

### Exit Gate: QG-DR1 (Disaster Recovery Gate)
This workflow produces artifacts that must pass QG-DR1 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `dr_plan_executed` | DR plan procedures followed | Execution log |
| `failover_tested` | Failover completed successfully | Failover results |
| `recovery_validated` | Data integrity verified | Recovery validation |
| `rto_met` | Recovery time within target | RTO measurement |
| `rpo_met` | Data loss within target | RPO measurement |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-DR1`

### Contributes to Downstream Gates
- **QG-P1** (Production Readiness) - DR capability required

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Quality Gates:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/dr-drill-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/rto-rpo-measurement-template.md`
