# Penetration Testing Design

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
| **Create** | Generate new penetration testing design from scratch | `steps/` |
| **Edit** | Load existing testing design and apply targeted modifications | `steps/` |
| **Validate** | Check existing testing design against quality criteria | `steps/` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially (step-01-c through step-04-c).

### Edit Mode
Load the existing output artifact, then follow `steps/` for targeted modifications (step-10-e through step-11-e).

### Validate Mode
Load the existing output artifact, then follow `steps/` for validation against quality criteria (step-20-v through step-22-v).

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation testing context
   - Use `{ai_runtime}` for AI agent testing context
   - Use `{output_folder}` for artifact output location

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- Master architecture document
- Security assessment (recommended)
- **Required gates passed:** QG-S4 (AI Security Gate) - entry gate for QG-S10

---

## Quality Gates

### Entry Gate: QG-S4 (AI Security Gate)
This workflow requires QG-S4 to pass before execution. Verify:
- Prompt injection testing completed
- Output filtering verified
- Kill switch tested

### Exit Gate: QG-S10 (Penetration Testing Gate)
Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `scope_defined` | Penetration testing scope documented | Step 1 scope definition complete |
| `testing_completed` | All test categories executed | Steps 2-3 test cases defined and executed |
| `findings_remediated` | Critical/high findings addressed | Remediation workflow followed |
| `retest_passed` | Remediated findings verified | Retest results documented |
| `report_delivered` | Penetration test report delivered | Step 4 reporting procedures complete |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S10`

**Downstream Gate:** QG-P1 (Production Readiness) - requires QG-S10 to pass

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Tenant Models:** Load from `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Quality Gates:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/penetration-testing-template.md`
