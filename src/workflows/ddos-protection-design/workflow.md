# DDoS Protection Design

**Goal:** Design the DDoS protection strategy including attack vector analysis, defense layers, and tenant-fair resource allocation for multi-tenant AI platforms.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution.

**Step Naming Convention:** `step-NN-mode-description.md`

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Design new DDoS protection | `steps/step-01-c-*` |
| **Edit** | Update DDoS design | `steps/step-10-e-*` |
| **Validate** | Check against security readiness | `steps/step-20-v-*` |

Default: **Create** mode.

---

## Activation

1. **Load BMM config** and resolve variables.
2. **Load BAM config** and resolve tenant model.
3. **Load project context**.
4. **Web Research Optional** - Search queries: "DDoS protection multi-tenant {date}", "application layer DDoS mitigation {date}"
5. **EXECUTION** - Read fully and follow: `./steps/step-01-c-analyze-attack-vectors.md` to begin.

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `security`
- **Templates:** `{project-root}/_bmad/bam/templates/ddos-protection-template.md`
