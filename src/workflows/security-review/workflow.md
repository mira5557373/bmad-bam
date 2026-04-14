# Security Review

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
| **Create** | Generate new security assessment from scratch | `steps/` |
| **Edit** | Load existing security assessment and apply targeted modifications | `steps/` |
| **Validate** | Check existing security assessment against quality criteria | `steps/` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially (step-01-c through step-05-c).

### Edit Mode
Load the existing output artifact, then follow `steps/` for targeted modifications (step-10-e through step-11-e).

### Validate Mode
Load the existing output artifact, then follow `steps/` for validation against quality criteria (step-20-v through step-22-v).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{ai_runtime}` for AI safety context
   - Use `{output_folder}` for artifact output location

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- Master architecture document
- Module architecture documents (if available)
- **Required gates passed:** QG-F1 (Foundation) recommended

---

## Quality Gates

### Entry Gate
- QG-F1 (Foundation Gate) - recommended for comprehensive review

### Exit Gate: QG-S3 (Security Baseline Gate)
This workflow produces artifacts that must pass QG-S3 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `security_controls_implemented` | Security controls documented | All control categories covered |
| `vulnerability_scanning_active` | Scan configuration defined | Scanning tools and schedule |
| `access_controls_configured` | Access control model defined | RBAC/ABAC policies |
| `encryption_enabled` | Encryption requirements | At-rest and in-transit |
| `logging_configured` | Security logging | Audit trails, SIEM integration |

**Required Verification Tests (from quality-gates.csv):**
- security controls implemented
- encryption enabled
- security baseline established before deployment

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S3`

### Contributes to Downstream Gates
- **QG-S4** (AI Security Gate) - Security baseline enables AI security testing
- **QG-S5** (Continuous Security Gate) - Enables ongoing monitoring
- **QG-P1** (Production Readiness) - Security baseline required for production

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Tenant Models:** Load from `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Quality Gates:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/encryption-key-management-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/security-assessment-template.md`
