# Tenant Offboarding Design

---

## When to Use This Workflow

**Use when:**
- Designing the tenant deprovisioning process for GDPR compliance
- No tenant offboarding runbook exists
- Adding data retention policy implementation
- Preparing for right-to-erasure (RTBF) compliance audits

**Do NOT use when:**
- Offboarding runbook already exists (use Edit mode)
- Designing tenant onboarding (use `tenant-onboarding-design` workflow)
- Performing actual tenant data deletion (use operational runbook)
- Foundation is not complete (complete `create-master-architecture` first)

**Prerequisites:**
- `master-architecture.md` with tenant model defined
- `tenant-model.md` from `tenant-model-isolation` workflow
- Understanding of data retention requirements (GDPR, SOC2, etc.)
- List of all data stores containing tenant data (database, cache, vector store, logs)

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
| **Create** | Generate new artifact from scratch | `steps/` |
| **Edit** | Load existing artifact and apply targeted modifications | `steps/` |
| **Validate** | Check existing artifact against quality criteria | `steps/` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially.

### Edit Mode
Load the existing output artifact, then follow `steps/` for targeted modifications.

### Validate Mode
Load the existing output artifact, then follow `steps/` for validation against quality criteria.

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{ai_runtime}` for agent runtime context

3. **Load project context** — Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** — Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
