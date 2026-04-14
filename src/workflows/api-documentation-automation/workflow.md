# API Documentation Automation

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
| **Create** | Generate new API Documentation Pipeline from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing API Documentation Pipeline | `steps/step-10-e-*` |
| **Validate** | Check API Documentation Pipeline completeness | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-doc-generation-strategy.md` - Select tools and define structure
- `step-02-c-openapi-integration.md` - Configure OpenAPI spec management
- `step-03-c-versioning-approach.md` - Define versioning and deprecation
- `step-04-c-developer-portal-sync.md` - Design portal publishing workflow

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing api-documentation-pipeline.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load documentation pipeline artifacts
- `step-21-v-validate.md` - Run completeness validation checks
- `step-22-v-generate-report.md` - Generate validation report

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

- **Config required:** `{tenant_model}`, `{ai_runtime}` (optional for this utility workflow)
- **Required artifacts:**
  - `project-context.md` (if exists)
  - OpenAPI specs (if spec-first approach)
- **Required gates passed:** None (utility workflow)

---

## Quality Gates

### Entry Gate
- None (utility workflow)

### Exit Gate
- None (utility workflow - validation is for completeness only)

This workflow does not contribute to any quality gates. It is a utility workflow for documentation infrastructure.

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/api-documentation-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/openapi-config-template.md`
