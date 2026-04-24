# Cross-Region Failover Execution

**Goal:** Execute cross-region failover procedures including pre-failover validation, step-by-step execution, post-failover verification, and documentation.

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
| **Create** | Execute new failover | `steps/step-01-c-*` |
| **Edit** | Update failover plan | `steps/step-10-e-*` |
| **Validate** | Verify failover execution | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow steps with prefix `step-0X-c-` sequentially (01 through 04).

### Edit Mode
Load the existing failover report, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing failover report, then follow `step-2X-v-` (20 through 22).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific failover considerations
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** — Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Load DR Plan** — Search for `{output_folder}/planning-artifacts/disaster-recovery-plan.md`.
   If found, load as execution reference for failover procedures.

5. **Web Research Optional**
   Web search can help find current failover best practices.
   Search queries: "cross-region failover execution {date}", "DR failover validation {date}"

6. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-assess-failover-readiness.md` to begin.

---

## Prerequisites

- **Required artifacts:** Disaster recovery plan, Failover architecture documentation
- **Required gates passed:** QG-DR1 (Disaster Recovery Drill)
- **Config required:** `{tenant_model}`

---

## Quality Gates

### Entry Gate
- QG-DR1 (Disaster Recovery Drill) must pass before executing failover

### Exit Gate: QG-FE1 (Failover Execution)
This workflow produces artifacts that satisfy QG-FE1. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `readiness_verified` | Pre-failover checks completed | Health check results documented |
| `failover_executed` | Failover procedures completed | Execution timeline recorded |
| `validation_passed` | Post-failover tests passed | Service validation results |
| `documentation_complete` | Execution report generated | Report with lessons learned |
| `dr_plan_updated` | DR plan updated with findings | Improvements documented |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-FE1`

### Contributes to: QG-P1 (Production Readiness)
This workflow contributes to QG-P1 by demonstrating DR capability:

| QG-P1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `DR tested` | Failover execution validates DR procedures |
| `Recovery validated` | Post-failover checks confirm recovery capability |
| `Runbooks verified` | Execution proves runbook accuracy |
| `RTO achieved` | Actual failover time documented |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `disaster-recovery`
- **Templates:** `{project-root}/_bmad/bam/data/templates/failover-execution-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`
