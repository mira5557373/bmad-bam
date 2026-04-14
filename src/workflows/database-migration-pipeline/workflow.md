# Database Migration Pipeline

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation

**Step Naming Convention:** `step-NN-mode-description.md`
- `01-09`: Create mode (`step-0N-c-*`)
- `10-19`: Edit mode (`step-1N-e-*`)
- `20-29`: Validate mode (`step-2N-v-*`)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Execute new migration | `steps/step-01-c-*` |
| **Edit** | Modify existing migration plan | `steps/step-10-e-*` |
| **Validate** | Check against QG-MG1 criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-migration-plan-execution.md` - Execute migration plan
- `step-02-c-data-validation.md` - Validate data integrity
- `step-03-c-tenant-impact-assessment.md` - Assess tenant impact
- `step-04-c-rollback-testing.md` - Test rollback procedures

### Edit Mode
Load the existing migration artifacts, then follow:
- `step-10-e-load-existing.md` - Load existing migration report
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing artifacts, then follow:
- `step-20-v-load-artifact.md` - Load migration report
- `step-21-v-validate.md` - Run QG-MG1 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-aware migration
   - Use `{ai_runtime}` for AI data handling
   - Use `{output_folder}` for artifact output location

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- Migration scripts reviewed
- Staging migration tested
- **Required gates passed:** None (entry workflow for migrations)

---

## Quality Gates

### Entry Gate
- Migration scripts reviewed and approved

### Exit Gate: QG-MG1 (Migration Gate)
This workflow produces artifacts that must pass QG-MG1 validation:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `migration_executed` | Migration completed | Execution log |
| `data_validated` | Data integrity verified | Validation results |
| `tenant_impact_assessed` | Per-tenant impact documented | Impact report |
| `rollback_tested` | Rollback procedure verified | Rollback results |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-MG1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Quality Gates:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/migration-execution-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/data-validation-template.md`
