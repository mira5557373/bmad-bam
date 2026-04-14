# AI Security Testing

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
| **Create** | Generate new AI security test plan | `steps/step-01-c-*` |
| **Edit** | Modify existing AI security test plan | `steps/step-10-e-*` |
| **Validate** | Check AI security test plan against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-design-prompt-injection-tests.md` - Design prompt injection testing framework
- `step-02-c-design-guardrail-validation.md` - Design guardrail validation tests
- `step-03-c-design-penetration-tests.md` - Design AI-specific penetration tests
- `step-04-c-adversarial-attack-tests.md` - Design adversarial attack scenarios
- `step-05-c-assembly.md` - Combine into ai-security-test-plan.md

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing test plan
- `step-11-e-apply-changes.md` - Apply targeted modifications

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load AI security test plan
- `step-21-v-validate.md` - Run validation checks against QG-M3 and QG-I3
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

- **Config required:** `{ai_runtime}`, `{tenant_model}`
- **Required artifacts:**
  - Agent runtime architecture document
  - Tenant isolation matrix
  - `project-context.md` (if exists)
- **Required gates passed:** QG-M3 (Agent Runtime) must pass

---

## Quality Gates

### Entry Gate: QG-M3 (Agent Runtime)
This workflow requires QG-M3 (Agent Runtime) to pass before execution. Verify agent runtime architecture is complete.

### Contribution to QG-S4 (AI Security Gate)
This workflow contributes to QG-S4 by verifying AI-specific security controls:

| QG-S4 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `prompt_injection_tested` | Step 1 - Design prompt injection test cases |
| `adversarial_detection_active` | Step 2 - Design guardrail validation |
| `output_filtering_verified` | Step 2 - Design output filtering tests |
| `kill_switch_tested` | Step 2 - Design kill switch validation |
| `model_extraction_prevented` | Step 3 - Design penetration tests |

**QG-S4 enables QG-S10:** Upon QG-S4 pass, penetration-testing-design workflow (QG-S10) can execute.

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S4`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Checklist:** `{project-root}/_bmad/bam/checklists/qg-i3-agent-safety.md`
