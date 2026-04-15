# Security Audit Execution

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
| **Create** | Execute new security audit | `steps/step-01-c-*` |
| **Edit** | Modify existing audit findings | `steps/step-10-e-*` |
| **Validate** | Check audit against QG-SA1 criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-audit-scope-definition.md` - Define audit scope and objectives
- `step-02-c-access-control-review.md` - Review access controls and permissions
- `step-03-c-vulnerability-assessment.md` - Execute vulnerability scans
- `step-04-c-compliance-verification.md` - Verify compliance with frameworks

### Edit Mode
Load the existing audit artifacts, then follow:
- `step-10-e-load-existing.md` - Load existing audit report
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing audit artifacts, then follow:
- `step-20-v-load-artifact.md` - Load audit report
- `step-21-v-validate.md` - Run QG-SA1 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-specific security checks
   - Use `{ai_runtime}` for AI security validation
   - Use `{output_folder}` for artifact output location

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- Previous audit findings (if available)
- Access to security scanning tools
- **Required gates passed:** QG-S3 (Security Baseline) recommended

---

## Quality Gates

### Entry Gate
- QG-S3 (Security Baseline) recommended for comprehensive audit

### Exit Gate: QG-SA1 (Security Audit Gate)
This workflow produces artifacts that must pass QG-SA1 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `audit_scope_defined` | Audit scope documented | Systems and controls covered |
| `access_review_complete` | Access controls reviewed | RBAC/ABAC policies verified |
| `vulnerabilities_assessed` | Vulnerability scan executed | Scan results documented |
| `compliance_verified` | Compliance requirements checked | Framework alignment confirmed |
| `findings_documented` | Findings with remediation plans | Priority and timeline assigned |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-SA1`

### Contributes to Downstream Gates
- **QG-P1** (Production Readiness) - Security audit required for compliance

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Compliance:** Load from `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Quality Gates:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/security-audit-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/vulnerability-report-template.md`
