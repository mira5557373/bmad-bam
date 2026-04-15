# Continuous Security Setup

---

## When to Use This Workflow

**Use when:**
- Setting up continuous security monitoring
- Activating compliance automation
- Configuring threat detection and response
- Verifying DLP controls

**Do NOT use when:**
- Responding to security incidents (use `incident-response-operations` workflow)
- Designing security architecture (use `threat-modeling` workflow)
- Conducting penetration testing (use `penetration-testing-design` workflow)

**Prerequisites:**
- Security architecture defined
- Compliance requirements documented
- Monitoring infrastructure in place

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
| **Create** | Set up new continuous security | `steps/step-01-c-*` |
| **Edit** | Modify existing setup | `steps/step-10-e-*` |
| **Validate** | Verify setup completeness | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-compliance-automation.md` - Activate compliance automation
- `step-02-c-threat-monitoring.md` - Set up threat monitoring
- `step-03-c-dlp-controls.md` - Verify DLP controls
- `step-04-c-anomaly-detection.md` - Activate anomaly detection
- `step-05-c-incident-automation.md` - Configure incident automation

### Edit Mode
Load the existing setup, then follow:
- `step-10-e-load-existing.md` - Load existing security configuration
- `step-11-e-apply-changes.md` - Apply updates to configuration

### Validate Mode
Load the existing setup, then follow:
- `step-20-v-load-artifact.md` - Load security artifacts
- `step-21-v-validate.md` - Run QG-S5 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant security context
   - Use `{output_folder}` for artifact output location

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- **Required artifacts:**
  - Security architecture
  - Compliance requirements
  - `project-context.md` (if exists)
- **Required gates passed:** None (operational workflow)

---

## Quality Gates

### Entry Gate
- Security architecture defined
- Compliance requirements documented

### Exit Gate: QG-S5 (Continuous Security)
This workflow produces artifacts that must pass QG-S5 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `compliance_automated` | Compliance checks automated | Policy engine active |
| `threat_monitored` | Threat monitoring active | SIEM integrated |
| `dlp_verified` | DLP controls in place | Data classification active |
| `anomaly_detected` | Anomaly detection enabled | Baselines established |
| `incident_automated` | Incident automation ready | Playbooks configured |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S5`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/security-config-template.md`
