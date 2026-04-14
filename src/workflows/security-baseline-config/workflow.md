# Security Baseline Config

**Goal:** Design the security configuration baselines including infrastructure, application, and AI-specific settings for multi-tenant AI platforms.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution.

**Step Naming Convention:** `step-NN-mode-description.md`

---

## Mode Selection

| Mode | Description | Entry Point |
|------|-------------|-------------|
| **Create** | Design new security baselines | `steps/step-01-c-*` |
| **Edit** | Update baselines | `steps/step-10-e-*` |
| **Validate** | Check against security readiness | `steps/step-20-v-*` |

Default: **Create** mode.

---

## Activation

1. **Load BMM config** and resolve variables.
2. **Load BAM config** and resolve tenant model.
3. **Load project context**.
4. **Web Research Optional** - Search queries: "CIS benchmarks cloud {date}", "security hardening best practices {date}"
5. **EXECUTION** - Read fully and follow: `./steps/step-01-c-define-infrastructure-baselines.md` to begin.

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `security`
- **Templates:** `{project-root}/_bmad/bam/templates/security-baseline-template.md`
