# Secrets Management

**Goal:** Design the secrets management strategy including secret classification, vault integration, rotation policies, and tenant-isolated credential management.

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
| **Create** | Design new secrets management strategy | `steps/step-01-c-*` |
| **Edit** | Update secrets management requirements | `steps/step-10-e-*` |
| **Validate** | Check against security readiness | `steps/step-20-v-*` |

Default: **Create** mode.

---

## Activation

1. **Load BMM config** and resolve variables.
2. **Load BAM config** and resolve tenant model.
3. **Load project context** - Search for `**/project-context.md`.
4. **Web Research Optional** - Search queries: "secrets management {date}", "HashiCorp Vault multi-tenant {date}"
5. **EXECUTION** - Read fully and follow: `./steps/step-01-c-define-secret-classification.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document
- **Required gates passed:** QG-I1 (Convergence Gate)
- **Config required:** `{tenant_model}`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `security`
- **Templates:** `{project-root}/_bmad/bam/data/templates/secrets-management-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`
