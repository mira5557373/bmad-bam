# Pricing Tier Configuration

---

## When to Use This Workflow

**Use when:**
- Designing multi-tier pricing for a multi-tenant platform
- No pricing tier design exists
- Adding new tiers or feature entitlements
- Implementing tier-based feature gating

**Do NOT use when:**
- Pricing tier design already exists (use Edit mode)
- Designing usage metering (use `usage-metering-design` workflow)
- Only updating pricing (use Edit mode with specific focus)
- Foundation is not complete (complete `create-master-architecture` first)

**Prerequisites:**
- `master-architecture.md` with billing system defined
- Feature list with tier associations
- Pricing strategy documented
- Usage metering design completed

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
| **Create** | Generate new artifact from scratch | `steps/` |
| **Edit** | Load existing artifact and apply targeted modifications | `steps/` |
| **Validate** | Check existing artifact against quality criteria | `steps/` |

Default: **Create** mode. In headless mode, always use Create.

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml`
2. **Load BAM config** and resolve `{tenant_model}`, `{ai_runtime}`
3. **Load project context** — Search for `**/project-context.md`
4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/pricing-tier-template.md`
