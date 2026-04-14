# Zero Trust Architecture

**Goal:** Design the zero-trust architecture including identity-centric access, microsegmentation, and continuous verification for multi-tenant AI platforms.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution.

**Step Naming Convention:** `step-NN-mode-description.md`

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Design new zero-trust architecture | `steps/step-01-c-*` |
| **Edit** | Update zero-trust design | `steps/step-10-e-*` |
| **Validate** | Check against security readiness | `steps/step-20-v-*` |

Default: **Create** mode.

---

## Activation

1. **Load BMM config** and resolve variables.
2. **Load BAM config** and resolve tenant model.
3. **Load project context**.
4. **Web Research Optional** - Search queries: "zero trust architecture {date}", "identity-centric security {date}"
5. **EXECUTION** - Read fully and follow: `./steps/step-01-c-define-identity-architecture.md` to begin.

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `security`
- **Templates:** `{project-root}/_bmad/bam/templates/zero-trust-template.md`
