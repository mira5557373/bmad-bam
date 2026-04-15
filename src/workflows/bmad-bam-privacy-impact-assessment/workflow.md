# Privacy Impact Assessment

**Goal:** Design the PIA/DPIA process including threshold analysis, risk assessment, mitigation planning, and DPA consultation procedures.

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
| **Create** | Design new PIA/DPIA process | `steps/step-01-c-*` |
| **Edit** | Update PIA requirements | `steps/step-10-e-*` |
| **Validate** | Check against DPIA criteria | `steps/step-20-v-*` |

Default: **Create** mode.

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml`
2. **Load BAM config** and resolve tenant model
3. **Load project context** -- Search for `**/project-context.md`
4. **Web Research Required** for current GDPR Article 35 guidance
5. **EXECUTION** Read fully and follow: `./steps/step-01-c-threshold-analysis.md`

---

## Prerequisites

- **Required artifacts:** Processing activity description
- **Config required:** `{tenant_model}`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `compliance`
- **Compliance:** Load from `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
