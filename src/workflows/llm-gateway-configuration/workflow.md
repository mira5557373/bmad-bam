# LLM Gateway Configuration

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
| **Create** | Generate new LLM gateway configuration from scratch | `steps/` |
| **Edit** | Load existing configuration and apply modifications | `steps/` |
| **Validate** | Check existing configuration against criteria | `steps/` |

Default: **Create** mode.

---

## Activation

1. **Load BMM config** and resolve standard variables.
2. **Load BAM config** and resolve `{ai_runtime}` and `{output_folder}`.
3. **Load project context** if available.
4. **EXECUTION** — Follow the first step file to begin.

---

## Prerequisites

- **Config required:** `{ai_runtime}`
- Master architecture document
- AI runtime architecture (recommended)

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **AI Runtimes:** Load from `{project-root}/_bmad/bam/data/ai-runtimes.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/llm-gateway-configuration-template.md`
