# Step 01: Initialize Tool Contract Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize tool contract design scope
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load AI runtime and agent configurations
- 🚫 Do NOT: Design tool schemas (that's Step 02)
- 🔍 Use web search: Verify tool contract patterns against current best practices
- ⚠️ Gate: Tool contracts feed QG-M3 (Agent Runtime) validation

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading AI runtime configuration and agent definitions
- Identifying tool categories (data access, external API, file system)
- Establishing tool contract design scope
- Loading relevant patterns from registry

**OUT OF SCOPE:**
- Designing tool schemas (Step 02)
- Tool registration design (Step 03)
- Tool execution design (Step 04)

---

## Purpose

Initialize tool contract design by loading the AI runtime configuration, agent definitions, and establishing the scope of tools to be defined. This step gathers all context required for designing tenant-aware tool contracts that integrate with the agent orchestration framework.

---

## Prerequisites

- Module architecture complete (QG-M1 passed)
- AI runtime selected in master architecture
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-contract
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → filter: `{ai_runtime}`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`

---

## Inputs

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Agent runtime architecture: `{output_folder}/planning-artifacts/agents/agent-runtime-architecture.md`
- Module architectures: `{output_folder}/planning-artifacts/modules/*/architecture.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load all required artifacts and establish the tool contract design scope.

---

## Main Sequence

### 1. Load AI Runtime Configuration

Load the master architecture and extract AI runtime settings:

```
{output_folder}/planning-artifacts/architecture/master-architecture.md
```

Extract:
- AI runtime framework (`{ai_runtime}`)
- Agent orchestration pattern
- Tool execution strategy
- Tenant isolation requirements for agents

If master architecture does not exist, inform user and halt workflow.

### 2. Load Agent Runtime Architecture

Load the agent runtime architecture document:

```
{output_folder}/planning-artifacts/agents/agent-runtime-architecture.md
```

Extract:
- Agent definitions and capabilities
- Tool categories currently defined
- Memory tier configurations
- Agent boundaries

If agent runtime architecture does not exist, inform user to run `agent-runtime-architecture` workflow first.

### 3. Identify Tool Categories

Categorize tools by type:

| Category | Description | Example Tools | Tenant Scope |
|----------|-------------|---------------|--------------|
| Data Access | Database/storage operations | query_database, read_document | Per-Tenant |
| External API | Third-party integrations | call_weather_api, send_email | Per-Tenant Config |
| File System | File operations | read_file, write_file | Per-Tenant Path |
| Computation | CPU-bound tasks | analyze_data, generate_report | Shared |
| Agent-to-Agent | Inter-agent communication | delegate_task, request_review | Per-Tenant Context |

### 4. Load Tool Contract Patterns

Load patterns from the pattern registry:

**Search:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-contract

| Pattern | Description | When to Apply |
|---------|-------------|---------------|
| TenantContext Injection | Pass tenant context to all tools | Always |
| Permission Guard | Validate permissions before execution | All tools |
| Rate Limiter | Throttle tool calls per tenant | External APIs |
| Sandbox Executor | Isolated execution environment | File system, code execution |
| Audit Logger | Log all tool invocations | All tools |

### 5. Identify Tools by Module

For each module, list tools that agents need to access:

| Module | Tool Name | Category | Owner | Consumers |
|--------|-----------|----------|-------|-----------|
| {{module}} | {{tool}} | Data Access | {{module}} | Agent {{name}} |
| {{module}} | {{tool}} | External API | {{module}} | Agent {{name}} |

### 6. Establish Design Scope

Define the scope for tool contract design:

**Tools to Design:** {{count}} tools
**Tool Categories:** {{count}} categories
**Modules with Tools:** {{count}} modules
**Agents Consuming Tools:** {{count}} agents

### 7. Verify Current Best Practices

**Web Research (Solutioning Pattern):**

Search the web: "AI agent tool design patterns {date}"
Search the web: "LangGraph tool definition best practices {date}"
Search the web: "multi-tenant AI agent tool isolation {date}"

Document relevant findings with source citations.

---

## SUCCESS METRICS:

- [ ] AI runtime configuration loaded
- [ ] Agent runtime architecture loaded
- [ ] Tool categories identified
- [ ] Tool patterns loaded from registry
- [ ] Module-to-tool mapping complete
- [ ] Design scope established

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Master architecture missing | Create master architecture first |
| Agent runtime not defined | Run agent-runtime-architecture workflow |
| No tools identified | Verify agent definitions include tool requirements |
| AI runtime not selected | Update master architecture with ai_runtime selection |

---

## Verification

- [ ] Master architecture loaded with AI runtime config
- [ ] Agent runtime architecture present
- [ ] All tool categories documented
- [ ] Tool-to-module mapping complete
- [ ] Patterns align with pattern registry

---

## Outputs

- AI runtime configuration summary
- List of tools by category
- Module-to-tool mapping
- Design scope summary
- Loaded patterns for tool contracts

---

## NEXT STEP:

Proceed to `step-02-c-analyze.md` to design tool schemas with input/output definitions and TenantContext injection patterns.
