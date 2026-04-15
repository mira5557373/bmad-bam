# Security Operations

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
| **Create** | Set up new security operations | `steps/step-01-c-*` |
| **Edit** | Modify existing security operations | `steps/step-10-e-*` |
| **Validate** | Check against QG-S8 criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-threat-detection-setup.md` - Configure threat detection rules
- `step-02-c-correlation-rules.md` - Set up SIEM correlation rules
- `step-03-c-ai-threat-detection.md` - Enable AI-specific threat monitoring
- `step-04-c-hunting-capabilities.md` - Establish threat hunting processes

### Edit Mode
Load the existing security operations artifacts, then follow:
- `step-10-e-load-existing.md` - Load existing configuration
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing artifacts, then follow:
- `step-20-v-load-artifact.md` - Load security operations config
- `step-21-v-validate.md` - Run QG-S8 validation checks
- `step-22-v-generate-report.md` - Generate validation report

---

## Activation

1. **Load BMM config** from `{project-root}/_bmad/bmm/config.yaml` and resolve standard variables.

2. **Load BAM config** and resolve:
   - Use `{tenant_model}` for tenant-aware detection
   - Use `{ai_runtime}` for AI threat monitoring
   - Use `{output_folder}` for artifact output location

3. **Load project context** - Search for `**/project-context.md`. If found, load as foundational reference.

4. **EXECUTION** - Read fully and follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- Security baseline established
- SIEM/logging infrastructure available
- **Required gates passed:** QG-S3 (Security Baseline)

---

## Quality Gates

### Entry Gate
- QG-S3 (Security Baseline) established

### Exit Gate: QG-S8 (Security Operations Gate)
This workflow produces artifacts that must pass QG-S8 validation:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `threat_detection_active` | Detection rules configured | Rules deployed |
| `correlation_rules_set` | SIEM correlation working | Alerts generating |
| `ai_monitoring_enabled` | AI threats monitored | AI-specific alerts |
| `hunting_capability` | Hunting processes defined | Playbooks documented |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S8`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Quality Gates:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/threat-detection-config-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/correlation-rules-template.md`
