# Agent Handoff Design

---

## When to Use This Workflow

**Use when:**
- Designing multi-agent coordination for AI platform
- No agent-handoff-architecture.md exists
- Adding agent-to-agent communication
- Establishing recovery and resilience patterns

**Do NOT use when:**
- Agent handoff architecture already exists (use Edit mode)
- Only modifying existing protocols (use Edit mode)
- Single-agent architecture (not applicable)
- Debugging agent issues (use `ai-agent-debug` workflow)

**Prerequisites:**
- `agent-runtime-architecture.md` exists with multi-agent topology
- `{ai_runtime}` config variable set
- Understanding of agent coordination requirements

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
| **Create** | Generate new Agent Handoff Architecture from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Agent Handoff Architecture | `steps/step-10-e-*` |
| **Validate** | Check Agent Handoff Architecture against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-handoff-protocol.md` - Design handoff mechanisms
- `step-02-c-state-sharing.md` - Design state management
- `step-03-c-circuit-breaker.md` - Implement resilience patterns
- `step-04-c-recovery-patterns.md` - Define recovery strategies

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing agent handoff architecture
- `step-11-e-apply-changes.md` - Apply targeted modifications with ADR

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load agent handoff artifacts
- `step-21-v-validate.md` - Run QG-M3 validation checks
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

- **Config required:** `{tenant_model}`, `{ai_runtime}`
- **Required artifacts:**
  - `agent-runtime-architecture.md` (from agent-runtime-architecture)
  - `project-context.md` (if exists)
- **Required gates passed:** QG-M3 (Agent Runtime) - in progress or passed

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-handoff-template.md`
