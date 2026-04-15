# Step 3: Memory Tier Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the multi-tier memory architecture for AI agents, ensuring proper tenant isolation at every tier while enabling context persistence across sessions.

---

## Prerequisites

- Orchestration topology selected (Step 1)
- Tool inventory complete (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime,memory-tiers

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Load Memory Tier Patterns

Understand the five tiers:

| Tier | Scope | Typical Backend | Retention |
|------|-------|-----------------|-----------|
| Session | Single conversation | Redis | Request duration |
| User | Per-user across sessions | Mem0 | 30-90 days |
| Tenant | Shared within tenant | Mem0 + Redis | Tenant lifecycle |
| Global | Platform-wide | Mem0 | Permanent |
| Episodic | Event-triggered snapshots | PostgreSQL | Configurable |

### 2. Define Access Rules Per Agent

For each agent in your topology, specify tier access:

| Agent | Session | User | Tenant | Global | Episodic |
|-------|---------|------|--------|--------|----------|
| {Agent 1} | RW / R / - | | | | |
| {Agent 2} | | | | | |

Legend: RW = Read/Write, R = Read-only, - = No access

### 3. Design Isolation Enforcement

Apply isolation patterns:
- User tier: Filter by `user_id + tenant_id`
- Tenant tier: Filter by `tenant_id`
- Global tier: Read-only for agents, no tenant filter

Document how TenantContext flows to memory queries.

### 4. Configure Retention Policies

For each tier, specify:

| Tier | TTL | Max Entries | Cleanup Strategy |
|------|-----|-------------|------------------|
| Session | {duration} | {count} | Auto-expire |
| User | {days} | {count} | LRU eviction |
| Tenant | {days} | {count} | Admin purge |

### 5. Define Write Rules

Specify approval requirements per tier:

| Tier | Who Can Write | Approval Required | Audit Logged |
|------|---------------|-------------------|--------------|
| Session | Any agent | No | No |
| User | Agent | User consent flag | Yes |
| Tenant | Admin-approved agents | Admin approval | Yes |
| Global | System only | Multi-admin | Yes |

### 6. Design Context Compiler

Define priority order for context assembly:
1. Session memory (highest - most recent)
2. User memory (personalization)
3. Tenant memory (shared context)
4. Global memory (lowest - platform knowledge)

Specify token budget for compiled context.

**Verify current best practices with web search:**
Search the web: "agent memory tiers AI agent patterns {date}"
Search the web: "agent memory tiers LLM orchestration {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the core infrastructure design.**

Present summary of:
- Orchestration model selected and escalation justification
- Tool registry structure with permission model
- Memory tier configuration with isolation rules

Ask for confirmation before proceeding to approval workflows.

---

## COLLABORATION MENUS (A/P/C):

After completing the memory tier design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation enforcement or retention policies
- **P (Party Mode)**: Bring architect and security perspectives on memory isolation
- **C (Continue)**: Accept memory tier design and proceed to approval workflows
- **[Specific refinements]**: Describe memory architecture concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: memory tiers, isolation rules, retention policies
- Process enhanced insights on memory security and performance
- Ask user: "Accept these refined memory tier decisions? (y/n)"
- If yes, integrate into memory tier specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review memory tier isolation design for multi-tenant AI platform"
- Process architect and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save memory tier design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-approval-workflow-design.md`

---

## Verification

- [ ] All five tiers configured
- [ ] Isolation rules per tier documented
- [ ] Write permissions defined
- [ ] Context compiler priority set
- [ ] Retention policies specified
- [ ] **CRITICAL:** Cross-tenant isolation verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Memory tier configuration document
- Isolation enforcement specification
- Write permission matrix
- Context compiler design
- Retention policy document
- **Load template:** `{project-root}/_bmad/bam/data/templates/rag-architecture-template.md`

---

## Next Step

Proceed to `step-04-c-approval-workflow-design.md` to define execution contracts.
