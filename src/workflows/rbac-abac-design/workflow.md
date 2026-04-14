# RBAC/ABAC Design

---

## When to Use This Workflow

**Use when:**
- Designing access control for a new multi-tenant platform
- No rbac-abac-design.md exists
- Adding authorization capabilities to existing platform
- Implementing per-tenant permission policies

**Do NOT use when:**
- Access control architecture already exists (use Edit mode)
- Only updating permission rules (use Edit mode)
- Debugging authorization behavior (use security troubleshooting)
- Validating existing access control (use Validate mode)

**Prerequisites:**
- `tenant-model.md` with tenant isolation decisions documented
- `{tenant_model}` config variable set
- Understanding of authorization requirements
- `master-architecture.md` for platform context (recommended)

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
| **Create** | Generate new RBAC/ABAC Architecture from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing RBAC/ABAC Architecture | `steps/step-10-e-*` |
| **Validate** | Check RBAC/ABAC against security criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-permission-model-design.md` - Design foundational permission model
- `step-02-c-role-hierarchy-design.md` - Design role-based access control structure
- `step-03-c-attribute-policies.md` - Design attribute-based access control policies
- `step-04-c-tenant-scoping.md` - Design tenant-aware access control

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing rbac-abac-design.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load access control artifacts
- `step-21-v-validate.md` - Run security validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant isolation context
   - Use `{ai_runtime}` for agent runtime context

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`
- **Required artifacts:**
  - `tenant-model.md` (from tenant-model-isolation) - provides tenant isolation rules
  - `master-architecture.md` (from create-master-architecture) - provides platform context
  - `project-context.md` (if exists)
- **Required gates passed:** None (runs after tenant-model-isolation)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/rbac-abac-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/permission-model-template.md`
