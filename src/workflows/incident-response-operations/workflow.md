# Incident Response Operations

---

## When to Use This Workflow

**Use when:**
- Responding to production incidents affecting tenants
- Classifying and prioritizing incoming incident reports
- Executing investigation and mitigation procedures
- Verifying resolution and scheduling postmortems

**Do NOT use when:**
- Planning incident response procedures (use `disaster-recovery-design` workflow)
- Designing monitoring and alerting (use `tenant-aware-observability` workflow)
- Creating runbooks (use `runbook-automation` workflow)

**Prerequisites:**
- Production monitoring and alerting in place
- Incident response runbooks available
- Communication channels established

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
| **Create** | Execute new incident response | `steps/step-01-c-*` |
| **Edit** | Modify active incident response | `steps/step-10-e-*` |
| **Validate** | Verify incident resolution | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-incident-classification.md` - Classify incident severity and impact
- `step-02-c-response-initiation.md` - Assemble team and establish communications
- `step-03-c-investigation-procedures.md` - Collect data and identify root cause
- `step-04-c-mitigation-execution.md` - Execute mitigation procedures
- `step-05-c-resolution-verification.md` - Verify resolution across tenants
- `step-06-c-postmortem-scheduling.md` - Schedule postmortem and assign actions

### Edit Mode
Load the existing incident report, then follow:
- `step-10-e-load-existing.md` - Load existing incident report
- `step-11-e-apply-changes.md` - Apply updates to incident status

### Validate Mode
Load the existing incident report, then follow:
- `step-20-v-load-artifact.md` - Load incident artifacts
- `step-21-v-validate.md` - Run QG-IR1 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant impact assessment
   - Use `{output_folder}` for artifact output location

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- **Required artifacts:**
  - Production monitoring configuration
  - Incident response runbooks
  - `project-context.md` (if exists)
- **Required gates passed:** None (operational workflow)

---

## Quality Gates

### Entry Gate
- Production monitoring and alerting must be in place
- Incident response runbooks available

### Exit Gate: QG-IR1 (Incident Response)
This workflow produces artifacts that must pass QG-IR1 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `incident_classified` | Incident severity and impact documented | Classification complete with justification |
| `response_initiated` | Response team assembled and communicating | Communication channels active |
| `root_cause_identified` | Root cause or hypothesis documented | Investigation complete |
| `mitigation_executed` | Mitigation procedures applied | Mitigation verified effective |
| `resolution_verified` | Service restored and tenant impact resolved | All affected tenants confirmed |
| `postmortem_scheduled` | Postmortem meeting scheduled | Action items assigned |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-IR1`

### Contributes to Downstream Gates
- **QG-P1** (Production Readiness) - Incident response supports operational readiness

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/incident-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/postmortem-template.md`
