# Data Reconciliation DR

**Goal:** Design and execute the data reconciliation capability including verification procedures, automated integrity checks, and remediation processes for post-DR failover validation.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation
- You NEVER proceed to a step file if the current step file indicates the user must approve

**Step Naming Convention:** `step-NN-mode-description.md`
- `step-0N-c-*`: Create mode (01-04)
- `step-1N-e-*`: Edit mode (10-11)
- `step-2N-v-*`: Validate mode (20-22)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Design reconciliation procedures | `steps/step-01-c-*` |
| **Edit** | Update reconciliation requirements | `steps/step-10-e-*` |
| **Validate** | Check against production readiness | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow Create steps sequentially:

| Step | File | Purpose |
|------|------|---------|
| 01 | `step-01-c-define-reconciliation-scope.md` | Define reconciliation scope and objectives |
| 02 | `step-02-c-design-verification.md` | Design verification procedures |
| 03 | `step-03-c-configure-automated-checks.md` | Configure automated integrity checks |
| 04 | `step-04-c-design-remediation.md` | Design remediation processes |

### Edit Mode
Load the existing reconciliation design, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing reconciliation design, then follow `step-2X-v-` (20 through 22).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific reconciliation considerations
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** — Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Web Research Optional**
   Web search can help find current data reconciliation best practices.
   Search queries: "data reconciliation after DR failover {date}", "database integrity verification patterns {date}"

5. **EXECUTION**
   - For **Implementation mode** (DR incident active): Read fully and follow: `./steps/01-assess-data-state.md` to begin reconciliation operations.
   - For **Create mode** (design new procedures): Read fully and follow: `./steps/step-01-c-define-reconciliation-scope.md` to begin.

---

## Prerequisites

- **Required artifacts:** Disaster recovery plan document
- **Required gates passed:** QG-DR1 (Disaster Recovery Drill) planning complete
- **Config required:** `{tenant_model}`

---

## Quality Gates

### Entry Gate
- QG-DR1 (Disaster Recovery Drill) must be planned before entering this workflow

### Exit Gate: QG-REC1 (Data Reconciliation)
This workflow produces artifacts that satisfy data reconciliation requirements. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `reconciliation_scope_defined` | Scope and priorities documented | Critical data assets identified |
| `verification_procedures_designed` | Verification methods documented | Comparison methods defined |
| `automated_checks_configured` | Automated integrity checks | Check scheduling and alerts |
| `remediation_procedures_defined` | Remediation process documented | Rollback and correction steps |
| `tenant_isolation_verified` | Per-tenant reconciliation | Tenant-aware verification |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-REC1`

### Contributes to: QG-P1 (Production Readiness)
This workflow contributes to QG-P1 by establishing data integrity capabilities:

| QG-P1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `data-integrity` | Complete reconciliation procedures |
| `DR-validation` | Post-failover verification process |
| `automated-checks` | Continuous integrity monitoring |
| `remediation-runbook` | Data correction procedures |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `data-integrity`
- **Templates:** `{project-root}/_bmad/bam/data/templates/data-reconciliation-dr-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`
