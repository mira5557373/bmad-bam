# Security Incident Response

**Goal:** Design the security incident response program including incident classification, response procedures, tenant notification protocols, and forensic investigation workflows.

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
| **Create** | Design new security incident response program | `steps/step-01-c-*` |
| **Edit** | Update incident response requirements | `steps/step-10-e-*` |
| **Validate** | Check against security readiness | `steps/step-20-v-*` |

Default: **Create** mode.

### Create Mode
Follow steps with prefix `step-0X-c-` sequentially (01 through 04).

### Edit Mode
Load the existing incident response plan, then follow `step-1X-e-` (10 through 11).

### Validate Mode
Load the existing incident response plan, then follow `step-2X-v-` (20 through 22).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve variables.

2. **Load BAM config** and resolve tenant model for tenant-specific incident handling.

3. **Load project context** - Search for `**/project-context.md`.

4. **Web Research Optional**
   Search queries: "security incident response {date}", "multi-tenant breach notification {date}"

5. **EXECUTION**
   Read fully and follow: `./steps/step-01-c-define-incident-classification.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document
- **Required gates passed:** QG-I1 (Convergence Gate)
- **Config required:** `{tenant_model}`

---

## Quality Gates

### Entry Gate: QG-I1 (Convergence Gate)
This workflow requires the platform to have passed convergence verification:
- Cross-module integration verified
- Tenant isolation verified
- Agent safety verified (if AI-enabled)

### Exit Gate: QG-S9 (Incident Response Gate)
This workflow produces artifacts that must pass QG-S9 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `playbooks_documented` | Incident playbooks defined | Classification, response, recovery |
| `automation_tested` | Automation workflows tested | Notification, escalation, forensics |
| `notification_workflows_ready` | Tenant notification protocols | Breach notification procedures |
| `recovery_procedures_verified` | Recovery runbooks validated | Service restoration procedures |
| `forensics_capability_ready` | Investigation workflows | Evidence collection, audit trails |

**Required Verification Tests (from quality-gates.csv):**
- playbooks documented
- automation tested
- all critical playbooks tested and operational

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S9`

### Contributes to Downstream Gates
- **QG-P1** (Production Readiness) - Incident response required before production
- **QG-IR1** (Incident Response Operations) - Enables operational incident handling

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `security`
- **Templates:** `{project-root}/_bmad/bam/templates/security-incident-response-template.md`
- **Checklists:** `{project-root}/_bmad/bam/checklists/production-readiness.md`
