# Step 01: Initialize Memory Tier Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize memory tier design scope and load AI runtime configuration
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load AI runtime configuration and memory tier patterns
- 🚫 Do NOT: Design specific memory tiers (that's Steps 02-04)
- 🔍 Use web search: Verify current best practices for AI agent memory architectures
- ⚠️ Note: Memory isolation is critical for multi-tenant AI safety

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading AI runtime configuration from master architecture
- Identifying memory tier requirements based on agent workloads
- Understanding tenant isolation requirements for memory
- Loading memory tier design template

**OUT OF SCOPE:**
- Short-term memory design (Step 02)
- Long-term memory design (Step 03)
- Memory isolation design (Step 04)
- Final compilation (Step 05)

---

## Purpose

Initialize the memory tier design by loading the AI runtime configuration, identifying memory requirements for the agent workloads, and establishing the foundation for a secure, multi-tenant memory architecture.

---

## Prerequisites

- Master architecture with AI runtime defined
- Tenant isolation strategy documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: memory-tiers
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load template:** `{project-root}/_bmad/bam/data/templates/memory-tier.md`

---

## Inputs

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- AI runtime design: `{output_folder}/planning-artifacts/ai/agent-runtime-architecture.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- AI runtimes: `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## YOUR TASK:

Load all required artifacts and establish the memory tier design scope.

---

## Main Sequence

### 1. Load AI Runtime Configuration

Load and parse the AI runtime architecture document:

```
{output_folder}/planning-artifacts/ai/agent-runtime-architecture.md
```

Extract runtime configuration:

| Attribute | Value |
|-----------|-------|
| AI Runtime | {{ai_runtime}} (langgraph / crewai / autogen / dspy / instructor / custom) |
| Agent Types | {{agent_types}} |
| Orchestration Pattern | {{orchestration_pattern}} |
| State Persistence | {{state_persistence}} |

If AI runtime architecture does not exist, inform user and suggest running `agent-runtime-architecture` workflow first.

### 2. Identify Memory Tier Requirements

Based on agent workload analysis, identify required memory tiers:

| Memory Tier | Purpose | Scope | Persistence |
|-------------|---------|-------|-------------|
| Session | Conversation context within single interaction | Request | None |
| Conversation | Multi-turn dialog context | Session | Temporary |
| Working | Active task context and intermediate results | Task | Short-term |
| Tenant | Tenant-specific knowledge and preferences | Tenant | Long-term |
| Global | Shared knowledge across all tenants | System | Permanent |

### 3. Assess Memory Patterns from Registry

Load memory patterns from bam-patterns.csv and identify applicable patterns:

| Pattern ID | Pattern Name | Applicability | Web Query |
|------------|--------------|---------------|-----------|
| memory-tiers | Memory Tiers | {{assessment}} | AI agent memory architecture {date} |
| vector-database | Vector Database | {{assessment}} | vector database multi-tenant {date} |
| context-compression | Context Compression | {{assessment}} | LLM context compression {date} |
| agent-memory-optimization | Agent Memory Optimization | {{assessment}} | agent memory optimization {date} |

### 4. Identify Tenant Memory Isolation Requirements

Based on tenant model, determine isolation requirements for each tier:

| Memory Tier | Isolation Level | Tenant Model Impact | Cross-Tenant Risk |
|-------------|-----------------|---------------------|-------------------|
| Session | Request | None | Low |
| Conversation | Session | Session ID includes tenant | Low |
| Working | Task | Task scoped to tenant | Medium |
| Tenant | Tenant | **CRITICAL** - Full isolation required | High |
| Global | System | Shared, no tenant data | Low |

**CRITICAL Isolation Considerations:**
- [ ] **CRITICAL:** Tenant memory MUST be isolated - no cross-tenant leakage
- [ ] **CRITICAL:** Vector stores MUST enforce tenant filtering
- [ ] **CRITICAL:** Memory retrieval MUST include tenant context

### 5. Determine Storage Requirements

Map memory tiers to storage technologies:

| Memory Tier | Primary Storage | Backup Storage | Estimated Size |
|-------------|-----------------|----------------|----------------|
| Session | In-memory (Redis) | None | Small |
| Conversation | Redis | None | Medium |
| Working | Redis + SQLite | None | Medium |
| Tenant | PostgreSQL + Vector DB | Object Storage | Large |
| Global | Vector DB | Object Storage | Large |

### 6. Load Memory Tier Template

Load the memory tier design template:

```
{project-root}/_bmad/bam/data/templates/memory-tier.md
```

Initialize with:
- Project metadata
- AI runtime configuration
- Memory tier inventory
- Isolation requirements

---

## SUCCESS METRICS:

- [ ] AI runtime configuration loaded
- [ ] Memory tier requirements identified
- [ ] Applicable patterns assessed
- [ ] Tenant isolation requirements documented
- [ ] Storage requirements mapped
- [ ] Template initialized

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| AI runtime architecture missing | Run agent-runtime-architecture workflow first |
| Master architecture missing | Run create-master-architecture workflow first |
| Tenant model undefined | Run tenant-model-isolation workflow first |
| Pattern registry unavailable | Use default memory tier patterns |

---

## Verification

- [ ] AI runtime configuration documented
- [ ] Memory tiers identified with purpose and scope
- [ ] Tenant isolation requirements established
- [ ] Storage technologies mapped
- [ ] Patterns align with pattern registry

---

## Outputs

- AI runtime configuration summary
- Memory tier requirements inventory
- Pattern applicability assessment
- Tenant isolation requirements matrix
- Storage technology mapping
- Initialized memory tier template

---

## NEXT STEP:

Proceed to `step-02-c-analyze.md` to design short-term memory (session and conversation tiers).
