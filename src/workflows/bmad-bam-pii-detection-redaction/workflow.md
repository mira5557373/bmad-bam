# PII Detection & Redaction

---

## When to Use This Workflow

**Use when:**
- Designing PII detection for a new AI platform
- No pii-detection-design.md exists
- Adding privacy protection to existing AI agents
- Implementing per-tenant privacy policies

**Do NOT use when:**
- PII detection architecture already exists (use Edit mode)
- Only updating detection rules (use Edit mode)
- Debugging PII detection behavior (use privacy troubleshooting)
- Validating existing PII detection (use Validate mode)

**Prerequisites:**
- `agent-runtime-architecture.md` with AI runtime decisions documented
- `{ai_runtime}` config variable set
- Understanding of privacy and compliance requirements
- `tenant-model.md` for tenant-scoped privacy isolation (recommended)

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
| **Create** | Generate new PII Detection Architecture from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing PII Detection Architecture | `steps/step-10-e-*` |
| **Validate** | Check PII Detection against privacy criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-pii-taxonomy.md` - Define PII classification taxonomy
- `step-02-c-detection-methods.md` - Design PII detection mechanisms
- `step-03-c-redaction-strategies.md` - Design redaction and anonymization
- `step-04-c-tenant-policies.md` - Design tenant-configurable privacy policies

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing pii-detection-design.md
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load PII detection artifacts
- `step-21-v-validate.md` - Run privacy validation checks
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

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- **Required artifacts:**
  - `agent-runtime-architecture.md` (from agent-runtime-architecture) - provides AI runtime base decisions
  - `tenant-model.md` (from tenant-model-isolation) - provides tenant-scoped policy isolation rules
  - `project-context.md` (if exists)
- **Required gates passed:** None (runs after agent-runtime-architecture)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/pii-detection-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/privacy-policy-template.md`
