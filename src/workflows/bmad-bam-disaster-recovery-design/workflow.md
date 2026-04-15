# Disaster Recovery Design

**Goal:** Design the disaster recovery strategy including backup procedures, failover mechanisms, RPO/RTO targets, and tenant-aware recovery procedures.

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
| **Create** | Design new DR strategy | `steps/step-01-c-*` |
| **Edit** | Update DR requirements | `steps/step-10-e-*` |
| **Validate** | Check against production readiness | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow steps with prefix `step-0X-c-` sequentially (01 through 04).

### Edit Mode
Load the existing DR design, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing DR design, then follow `step-2X-v-` (20 through 21).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve:
   - Use `{user_name}` for greeting
   - Use `{communication_language}` for all communications
   - Use `{document_output_language}` for output documents
   - Use `{planning_artifacts}` for output location
   - Use `{project_knowledge}` for additional context scanning

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific recovery considerations
   - Use `{bam_artifacts}` for BAM-specific outputs

3. **Load project context** — Search for `**/project-context.md`.
   If found, load as foundational reference including BAM configuration section.

4. **Web Research Optional**
   Web search can help find current DR best practices.
   Search queries: "SaaS disaster recovery {date}", "multi-tenant backup patterns {date}"

5. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-define-rto-rpo.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document
- **Required gates passed:** QG-I1 (Convergence Gate)
- **Config required:** `{tenant_model}`

---

## Quality Gates

### Entry Gate
- QG-I1 (Convergence Gate) must pass before entering this workflow

### Exit Gate: QG-DR1 (Disaster Recovery Drill)
This workflow produces artifacts that satisfy QG-DR1. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `dr_plan_documented` | Complete DR plan with all required sections | DR plan document exists with all phases |
| `rto_rpo_defined` | RTO/RPO targets defined per tenant tier | Tier-specific recovery objectives documented |
| `failover_tested` | Failover procedures documented and testable | Failover architecture with test procedures |
| `recovery_validated` | Recovery procedures validated through testing | Test schedule and acceptance criteria defined |
| `runbook_verified` | Step-by-step runbooks available | Recovery procedures with owners and checkpoints |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-DR1`

### Contributes to: QG-P1 (Production Readiness)
This workflow contributes to QG-P1 by establishing disaster recovery capabilities:

| QG-P1 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `disaster-recovery` | Complete DR plan with failover and recovery procedures |
| `SLOs defined` | RTO/RPO targets aligned with SLA requirements |
| `DR tested` | Testing schedule with quarterly minimum cadence |
| `Runbooks complete` | Recovery procedures with ownership and escalation |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `disaster-recovery`
- **Templates:** `{project-root}/_bmad/bam/data/templates/disaster-recovery-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`
