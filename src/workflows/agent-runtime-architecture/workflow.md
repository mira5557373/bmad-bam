# Agent Runtime Architecture

---

## When to Use This Workflow

**Use when:**
- Designing AI agent infrastructure for a new platform
- No agent-runtime-architecture.md exists
- Adding AI capabilities to an existing multi-tenant platform
- Migrating from one AI orchestration framework to another

**Do NOT use when:**
- Agent runtime architecture already exists (use Edit mode)
- Only adding new tools to existing registry (use Edit mode)
- Debugging agent behavior (use `ai-agent-debug` workflow)
- Validating agent safety (use `ai-eval-safety-design` workflow)

**Prerequisites:**
- `master-architecture.md` with AI runtime decisions documented
- `{ai_runtime}` config variable set (langgraph, crewai, autogen, dspy, instructor)
- Understanding of agent topology requirements (single vs multi-agent)
- `tenant-model.md` for tenant-scoped memory isolation rules (recommended)

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
| **Create** | Generate new Agent Runtime Architecture from scratch | `steps/step-01-c-*` |
| **Edit** | Modify existing Agent Runtime Architecture | `steps/step-10-e-*` |
| **Validate** | Check Agent Runtime Architecture against quality criteria | `steps/step-20-v-*` |

Default: **Create** mode. In headless mode, always use Create.

### Create Mode
Follow the steps in `steps/` sequentially:
- `step-01-c-orchestration-model-selection.md` - Select single vs multi-agent topology
- `step-02-c-tool-registry-design.md` - Define tool catalog and permissions
- `step-03-c-memory-tier-design.md` - Design session/user/tenant/global memory
- `step-04-c-approval-workflow-design.md` - Define approval triggers and queues
- `step-05-c-evaluation-foundation.md` - Define golden tasks and metrics
- `step-06-c-kill-switch-design.md` - Design circuit breakers and rollback

### Edit Mode
Load the existing output artifact, then follow:
- `step-10-e-load-existing.md` - Load existing agent-runtime-architecture.md
- `step-11-e-apply-changes.md` - Apply targeted modifications with ADR

### Validate Mode
Load the existing output artifact, then follow:
- `step-20-v-load-artifact.md` - Load agent runtime artifacts
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
  - `master-architecture.md` (from create-master-architecture) - provides AI runtime base decisions
  - `tenant-model.md` (from tenant-model-isolation) - provides tenant-scoped memory isolation rules
  - `project-context.md` (if exists)
- **Required gates passed:** None (runs in parallel with tenant-model-isolation or after)

---

## Quality Gates

### Entry Gate
- QG-F1 (Foundation Gate) - recommended (master architecture provides AI runtime base decisions)

### Exit Gate: QG-M3 (Agent Runtime)
This workflow produces artifacts that must pass QG-M3 validation. Upon completion, the following patterns must be verified:

| Pattern | Description | Verification |
|---------|-------------|--------------|
| `agent-runtime` | Agent orchestration topology defined | Single/multi-agent pattern documented |
| `tool-execution` | Tool registry with permissions | Sandbox config, policy rules |
| `run-contracts` | Budget and safety contracts | Kill switch, circuit breakers |

**Required Verification Tests (from quality-gates.csv):**
- tools registered
- budget enforcement defined
- kill switch specified (< 100ms)
- memory tiers configured

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-M3`

### Contributes to Downstream Gates
- **QG-I1** (Convergence) - Agent runtime enables integration testing
- **QG-I3** (Agent Safety) - Agent runtime enables safety verification
- **QG-S4** (AI Security Gate) - Agent runtime enables AI security testing

### Contributes to: QG-AI2 (AI Observability)
This workflow contributes to QG-AI2 by establishing the observability foundation for AI agents:

| QG-AI2 Pattern | This Workflow's Contribution |
|----------------|------------------------------|
| `llm_metrics_collected` | Step 5 (Evaluation Foundation) defines metric collection |
| `token_usage_tracked` | Step 4 (Approval Workflow) defines budget tracking per tenant |
| `latency_monitored` | Step 5 defines latency thresholds and monitoring |
| `cost_per_request_calculated` | Step 4 defines cost threshold triggers |
| `quality_metrics_defined` | Step 5 defines accuracy, relevance, and safety metrics |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-AI2`

### Related Security Gates
This workflow contributes to several security-related gates:
- **QG-S4** (AI Security Gate) - prompt injection tests, output filtering, kill switch

---

## References

- **Patterns:** Load from `{project-root}/_bmad/bam/data/bam-patterns.csv`

## Templates

- **Load template:** `{project-root}/_bmad/bam/templates/deployment-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/llmops-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/local-dev-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/memory-tiers-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/run-contract-template.md`
