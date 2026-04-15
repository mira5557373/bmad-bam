# Audit Readiness Preparation

**Goal:** Design the audit readiness framework including evidence collection, control testing, documentation review, and auditor coordination.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution.

**Step Naming Convention:** `step-NN-mode-description.md`
- `01-09`: Create mode (`step-0N-c-*`)
- `10-19`: Edit mode (`step-1N-e-*`)
- `20-29`: Validate mode (`step-2N-v-*`)

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Design new audit readiness procedures | `steps/step-01-c-*` |
| **Edit** | Update audit requirements | `steps/step-10-e-*` |
| **Validate** | Check against readiness criteria | `steps/step-20-v-*` |

Default: **Create** mode.

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml`
2. **Load BAM config** and resolve tenant model
3. **Load project context** -- Search for `**/project-context.md`
4. **Web Research Required** for current audit best practices
5. **EXECUTION** Read fully and follow: `./steps/step-01-c-inventory-evidence.md`

---

## Prerequisites

- **Required artifacts:** Compliance controls documentation
- **Required gates passed:** QG-F1 (Foundation Gate)
- **Config required:** `{tenant_model}`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `compliance`
- **Compliance:** Load from `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
