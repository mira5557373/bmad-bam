# Data Encryption Design

**Goal:** Design the data encryption strategy including encryption at rest, in transit, and tenant-specific key management for multi-tenant AI platforms.

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
| **Create** | Design new encryption strategy | `steps/step-01-c-*` |
| **Edit** | Update encryption design | `steps/step-10-e-*` |
| **Validate** | Check against security readiness | `steps/step-20-v-*` |

Default: **Create** mode.

---

## Activation

1. **Load BMM config** and resolve variables.
2. **Load BAM config** and resolve tenant model.
3. **Load project context**.
4. **Web Research Optional** - Search queries: "data encryption multi-tenant {date}", "tenant key management {date}"
5. **EXECUTION** - Read fully and follow: `./steps/step-01-c-define-data-classification.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document
- **Config required:** `{tenant_model}`
- **Contributes to:** QG-S7 (Data Protection Gate) - encryption_verified pattern

---

## Quality Gates

### Contribution to QG-S7 (Data Protection Gate)
This workflow contributes to QG-S7 by verifying the `encryption_verified` pattern:

| QG-S7 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `encryption_verified` | Step 1-4 define encryption at rest and in transit |

The encryption design must satisfy:
- [ ] Data classification with encryption requirements
- [ ] Encryption at rest for all sensitive data
- [ ] Encryption in transit (TLS 1.3 minimum)
- [ ] Tenant-specific key isolation
- [ ] Key management procedures documented

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S7`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `security`
- **Templates:** `{project-root}/_bmad/bam/templates/encryption-design-template.md`
