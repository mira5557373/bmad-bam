# Threat Modeling

**Goal:** Design the threat modeling framework including attack surface analysis, STRIDE threat assessment, and mitigation strategies for multi-tenant AI platforms.

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
| **Create** | Design new threat model | `steps/step-01-c-*` |
| **Edit** | Update threat model | `steps/step-10-e-*` |
| **Validate** | Check against security readiness | `steps/step-20-v-*` |

Default: **Create** mode.

---

## Activation

1. **Load BMM config** and resolve variables.
2. **Load BAM config** and resolve tenant model and AI runtime.
3. **Load project context** - Search for `**/project-context.md`.
4. **Web Research Optional** - Search queries: "threat modeling STRIDE {date}", "AI threat modeling {date}"
5. **EXECUTION** - Read fully and follow: `./steps/step-01-c-define-attack-surface.md` to begin.

---

## Prerequisites

- **Required artifacts:** Master architecture document
- **Required gates passed:** QG-F1 (Foundation Gate)
- **Config required:** `{tenant_model}`, `{ai_runtime}`

---

## Quality Gates

### Entry Gate
- QG-F1 (Foundation Gate) must pass

### Exit Gate
- None (this workflow contributes to QG-S8)

### Contributes to: QG-S8 (Threat Detection Gate)
This workflow contributes to QG-S8 by establishing threat detection and modeling capabilities:

| QG-S8 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `threat_feeds_integrated` | Threat intelligence sources identified in attack surface analysis |
| `correlation_rules_active` | STRIDE threat patterns mapped to detection rules |
| `hunting_capability_ready` | Threat hunting procedures derived from threat model |
| `ai_threat_detection_active` | AI-specific threats identified (prompt injection, model extraction) |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S8`

### Contributes to: QG-S4 (AI Security Gate)
This workflow also contributes to QG-S4 by identifying AI-specific threats:

| QG-S4 Pattern | This Workflow's Contribution |
|---------------|------------------------------|
| `prompt_injection_tested` | Prompt injection threats identified in STRIDE analysis |
| `adversarial_detection_active` | Adversarial attack vectors documented |
| `model_extraction_prevented` | Model extraction threats analyzed |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S4`

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv` filter: `security`
- **Templates:** `{project-root}/_bmad/bam/data/templates/threat-model-template.md`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`
