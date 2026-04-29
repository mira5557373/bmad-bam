# Pattern Tiered Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate 27 pattern files to 21 by merging 8 thin patterns, removing implementation code, and achieving full BMAD compatibility while preserving 100% of capabilities.

**Architecture:** Three-tier pattern system with strict content separation. Thin patterns (0 YAML schemas) are consolidated into 2 new comprehensive files. Implementation code is removed from existing patterns and replaced with web queries. CSV is enhanced with new columns for better reference tracking.

**Tech Stack:** Node.js, Jest, Markdown, YAML, CSV

---

## File Structure

### Files to CREATE

| File | Purpose |
|------|---------|
| `src-v2/data/patterns/tenant-isolation.md` | Consolidated tenant isolation patterns (RLS, Schema, Database) |
| `src-v2/data/patterns/agent-orchestration.md` | Consolidated agent orchestration patterns (CrewAI, AutoGen, Saga) |
| `test/v2/pattern-standards.test.js` | Pattern file validation tests |

### Files to DELETE

| File | Reason |
|------|--------|
| `src-v2/data/patterns/rls.md` | Merged into tenant-isolation.md |
| `src-v2/data/patterns/schema-per-tenant.md` | Merged into tenant-isolation.md |
| `src-v2/data/patterns/database-per-tenant.md` | Merged into tenant-isolation.md |
| `src-v2/data/patterns/autogen.md` | Merged into agent-orchestration.md |
| `src-v2/data/patterns/crewai.md` | Merged into agent-orchestration.md |
| `src-v2/data/patterns/saga.md` | Merged into agent-orchestration.md |
| `src-v2/data/patterns/cqrs.md` | Absorbed into events.md domain |
| `src-v2/data/patterns/facade.md` | Generic pattern, CSV sufficient |

### Files to MODIFY

| File | Changes |
|------|---------|
| `src-v2/data/patterns/langgraph.md` | Remove Python implementation code |
| `src-v2/data/domains/tenant.md` | Add isolation strategy section |
| `src-v2/data/domains/ai-runtime.md` | Add runtime selection section |
| `src-v2/data/domains/events.md` | Add CQRS pattern section |
| `src-v2/data/bam-patterns.csv` | Add new columns |
| `test/v2/file-counts.test.js` | Update pattern count from 27 to 21 |

---

## Task 1: Create Pattern Standards Test File

**Files:**
- Create: `test/v2/pattern-standards.test.js`

- [ ] **Step 1: Create the test file with pattern count test**

```javascript
const fs = require('fs');
const path = require('path');

describe('Pattern Standards', () => {
  const patternsDir = path.join(__dirname, '../../src-v2/data/patterns');

  test('21 pattern files exist (after consolidation)', () => {
    const patterns = fs.readdirSync(patternsDir).filter(f => 
      f.endsWith('.md') && !f.startsWith('.')
    );
    expect(patterns.length).toBe(21);
  });

  test('no implementation code in patterns', () => {
    const patterns = fs.readdirSync(patternsDir).filter(f => f.endsWith('.md'));
    const implCodePatterns = ['```python', '```typescript', '```javascript'];
    
    for (const pattern of patterns) {
      const content = fs.readFileSync(path.join(patternsDir, pattern), 'utf8');
      for (const codePattern of implCodePatterns) {
        expect(content).not.toContain(codePattern);
      }
    }
  });

  test('all patterns have Web Research section', () => {
    const patterns = fs.readdirSync(patternsDir).filter(f => f.endsWith('.md'));
    
    for (const pattern of patterns) {
      const content = fs.readFileSync(path.join(patternsDir, pattern), 'utf8');
      const hasWebResearch = content.includes('## Web Research') || 
                             content.includes('## Web Research Queries') ||
                             content.includes('## Additional Web Research');
      expect(hasWebResearch).toBe(true);
    }
  });

  test('consolidated patterns exist', () => {
    expect(fs.existsSync(path.join(patternsDir, 'tenant-isolation.md'))).toBe(true);
    expect(fs.existsSync(path.join(patternsDir, 'agent-orchestration.md'))).toBe(true);
  });

  test('thin patterns do not exist', () => {
    const thinPatterns = [
      'rls.md', 'schema-per-tenant.md', 'database-per-tenant.md',
      'autogen.md', 'crewai.md', 'saga.md', 'cqrs.md', 'facade.md'
    ];
    
    for (const thin of thinPatterns) {
      expect(fs.existsSync(path.join(patternsDir, thin))).toBe(false);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- test/v2/pattern-standards.test.js`

Expected: FAIL - 27 patterns exist, thin patterns still exist, consolidated patterns don't exist

- [ ] **Step 3: Commit test file**

```bash
git add test/v2/pattern-standards.test.js
git commit -m "test: add pattern standards validation tests

Validates:
- 21 pattern files after consolidation
- No implementation code in patterns
- Web Research section in all patterns
- Consolidated patterns exist
- Thin patterns removed"
```

---

## Task 2: Create tenant-isolation.md Consolidated Pattern

**Files:**
- Create: `src-v2/data/patterns/tenant-isolation.md`

- [ ] **Step 1: Create the consolidated tenant-isolation.md file**

```markdown
---
pattern_id: tenant-isolation
shortcode: ZTI
category: tenant-isolation
qg_ref: QG-M2
version: 1.0.0
last_reviewed: 2026-04-29
---

# Tenant Isolation Patterns - BAM Pattern

**Loaded by:** ZTI
**Category:** tenant-isolation
**Quality Gate:** QG-M2

---

## Decision Framework

**Use tenant isolation when:**
- Building multi-tenant SaaS application
- Data segregation is required between customers
- Compliance mandates data boundaries

**Choose isolation level based on:**
- Tenant count (<1000 → RLS, 100-500 → Schema, <100 → Database)
- Compliance requirements (Medium → RLS, High → Schema, Highest → Database)
- Cost constraints (Low → RLS, Medium → Schema, High → Database)

## Architectural Principle

Tenant isolation follows **defense in depth** - multiple layers ensure that even if one layer fails, tenant data remains protected:

```
┌─────────────────────────────────────────────────────────────┐
│                    Isolation Layers                          │
├─────────────────────────────────────────────────────────────┤
│  Application: TenantContext validation (ALWAYS)              │
│  ─────────────────────────────────────────────────────────  │
│  Database: RLS / Schema / Database (CHOOSE ONE)              │
│  ─────────────────────────────────────────────────────────  │
│  Infrastructure: Network segmentation (OPTIONAL)             │
└─────────────────────────────────────────────────────────────┘
```

## Decision Matrix

| Factor | RLS | Schema-per-Tenant | Database-per-Tenant |
|--------|-----|-------------------|---------------------|
| Tenant count | <1000 | 100-500 | <100 |
| Cost | Low | Medium | High |
| Isolation level | Logical | Schema | Physical |
| Compliance fit | Medium | High | Highest |
| Schema customization | None | Per-tenant | Full |
| Backup granularity | All tenants | Per-schema | Per-tenant |
| Cross-tenant risk | Policy failure | Schema escape | Minimal |
| Query complexity | tenant_id filter | Schema routing | Connection routing |

## BAM Schema Contracts

### TenantContext Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
tenant_context:
  version: "1.0.0"
  bam_controlled: true
  
  interface:
    required:
      tenant_id: uuid
      tier: enum[free, pro, enterprise]
    optional:
      region: string
      isolation_model: enum[rls, schema, database]
  
  propagation:
    methods: [request_header, jwt_claim, session]
    header_name: "X-Tenant-ID"
    jwt_claim: "tenant_id"
```

### RLS Policy Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
rls_policy_contract:
  version: "1.0.0"
  bam_controlled: true
  
  naming: "{table}_tenant_isolation"
  required_clauses:
    using: "tenant_id = current_tenant_id()"
    check: "tenant_id = current_tenant_id()"
  tier_awareness:
    enabled: bool
    tier_column: "tenant_tier"
```

### Schema Isolation Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
schema_isolation_contract:
  version: "1.0.0"
  bam_controlled: true
  
  naming: "tenant_{tenant_id}"
  search_path: required
  migration_strategy: enum[parallel, sequential, blue_green]
```

### Database Isolation Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
database_isolation_contract:
  version: "1.0.0"
  bam_controlled: true
  
  naming: "db_{tenant_id}"
  connection_routing: required
  credential_management: vault_required
```

## Architecture Diagrams

### Row-Level Security Model

```
┌─────────────────────────────────────────┐
│           Shared Database               │
│  ┌───────────────────────────────────┐  │
│  │         Shared Tables             │  │
│  │  ┌─────────┬─────────┬─────────┐  │  │
│  │  │Tenant A │Tenant B │Tenant C │  │  │
│  │  │ (rows)  │ (rows)  │ (rows)  │  │  │
│  │  └─────────┴─────────┴─────────┘  │  │
│  │     Policy: tenant_id = ctx       │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Schema-per-Tenant Model

```
┌─────────────────────────────────────────┐
│           Shared Database               │
│  ┌───────────┐ ┌───────────┐ ┌────────┐│
│  │ tenant_a  │ │ tenant_b  │ │tenant_c││
│  │  schema   │ │  schema   │ │ schema ││
│  │ (tables)  │ │ (tables)  │ │(tables)││
│  └───────────┘ └───────────┘ └────────┘│
└─────────────────────────────────────────┘
```

### Database-per-Tenant Model

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ db_a     │  │ db_b     │  │ db_c     │
│ Tenant A │  │ Tenant B │  │ Tenant C │
└──────────┘  └──────────┘  └──────────┘
       │             │             │
       └─────────────┴─────────────┘
              Connection Router
```

## Web Research (Implementation)

> **CRITICAL:** This file contains NO implementation code.
> Use web search for current implementation patterns.

**RLS Implementation:**
- Search: "PostgreSQL row level security implementation {date}"
- Search: "PostgreSQL RLS performance tuning {date}"
- Search: "RLS policy testing patterns {date}"

**Schema Isolation Implementation:**
- Search: "PostgreSQL schema per tenant implementation {date}"
- Search: "dynamic schema routing middleware {date}"
- Search: "schema migration multi-tenant {date}"

**Database Isolation Implementation:**
- Search: "database per tenant connection pooling {date}"
- Search: "multi-database tenant routing patterns {date}"
- Search: "tenant database provisioning automation {date}"

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M2 | Isolation model correctly implemented |
| QG-I2 | Cross-tenant access prevented in testing |

## Related Patterns

- [zero-trust.md](zero-trust.md) - Security boundaries
- [state-management.md](state-management.md) - Tenant-scoped state
- [secrets-management.md](secrets-management.md) - Tenant credentials

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-29 | Consolidated from rls.md, schema-per-tenant.md, database-per-tenant.md |
```

- [ ] **Step 2: Verify file was created correctly**

Run: `head -20 src-v2/data/patterns/tenant-isolation.md`

Expected: YAML frontmatter with pattern_id: tenant-isolation

- [ ] **Step 3: Commit the file**

```bash
git add src-v2/data/patterns/tenant-isolation.md
git commit -m "feat: create tenant-isolation.md consolidated pattern

Merges content from:
- rls.md (Row-Level Security)
- schema-per-tenant.md
- database-per-tenant.md

Includes:
- Decision matrix for isolation selection
- BAM schema contracts (TenantContext, RLS, Schema, Database)
- Architecture diagrams for all three models
- Web research queries (no implementation code)"
```

---

## Task 3: Create agent-orchestration.md Consolidated Pattern

**Files:**
- Create: `src-v2/data/patterns/agent-orchestration.md`

- [ ] **Step 1: Create the consolidated agent-orchestration.md file**

```markdown
---
pattern_id: agent-orchestration
shortcode: ZAO
category: ai-runtime
qg_ref: QG-M3
version: 1.0.0
last_reviewed: 2026-04-29
---

# Agent Orchestration Patterns - BAM Pattern

**Loaded by:** ZAO
**Category:** ai-runtime
**Quality Gate:** QG-M3

---

## Decision Framework

**Use agent orchestration when:**
- Multi-agent coordination is needed
- Complex workflow with multiple AI participants
- Role-based task delegation required

**Choose framework based on:**
- Workflow type (state machine → LangGraph, role-based → CrewAI, conversation → AutoGen)
- Control requirements (high → LangGraph, medium → CrewAI, flexible → AutoGen)
- Long-running transactions (Saga pattern)
- Team expertise

## Architectural Principle

Agent orchestration requires **clear boundaries** between coordination, isolation, and execution:

```
┌─────────────────────────────────────────────────────────────┐
│                Agent Orchestration Layers                    │
├─────────────────────────────────────────────────────────────┤
│  Coordination: Framework manages agent interactions          │
│  ─────────────────────────────────────────────────────────  │
│  Isolation: Each agent respects tenant boundaries            │
│  ─────────────────────────────────────────────────────────  │
│  Execution: Tools scoped to tenant context                   │
└─────────────────────────────────────────────────────────────┘
```

## Decision Matrix

| Factor | LangGraph | CrewAI | AutoGen | Saga |
|--------|-----------|--------|---------|------|
| Best for | State machines | Role-based crews | Conversations | Transactions |
| Control level | High | Medium | Low | High |
| Learning curve | Steep | Moderate | Easy | Moderate |
| State management | Built-in | External | Message history | Saga log |
| Tenant isolation | Graph-level | Crew-level | Conversation-level | Transaction-level |
| Determinism | High | Medium | Low | High |
| Checkpointing | Native | Custom | None | Native |
| Multi-agent | Hierarchical | Role-based | Conversational | Sequential |

## BAM Schema Contracts

### CrewAI Integration Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
crewai_integration:
  version: "1.0.0"
  bam_controlled: true
  
  tenant_isolation:
    scope: enum[crew, agent, none]
    context_injection: required
  
  crew_definition:
    max_agents: int
    manager_llm: string
    tool_access: scoped_to_tenant
    
  execution:
    max_iterations: int
    timeout_seconds: int
    budget_limit_tokens: int
```

### AutoGen Integration Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
autogen_integration:
  version: "1.0.0"
  bam_controlled: true
  
  conversation_manager:
    max_turns: int
    termination_condition: string
    human_input_mode: enum[ALWAYS, NEVER, TERMINATE]
  
  tenant_isolation:
    conversation_scope: per_tenant
    memory_isolation: required
    
  agents:
    max_agents: int
    llm_config_per_tier: bool
```

### Saga Pattern Contract

> **Schema Version:** 1.0.0
> **BAM Controlled:** Yes

```yaml
saga_contract:
  version: "1.0.0"
  bam_controlled: true
  
  transaction:
    steps: list[SagaStep]
    compensations: list[CompensationAction]
    timeout_seconds: int
  
  tenant_scoping:
    saga_id_includes_tenant: true
    rollback_scoped: true
    audit_all_steps: true
    
  recovery:
    retry_policy: enum[immediate, exponential, none]
    max_retries: int
    dead_letter_queue: bool
```

## Architecture Diagrams

### CrewAI Structure

```
┌────────────────────────────────────┐
│            Crew Manager            │
│  ┌──────────┐  ┌──────────┐       │
│  │ Agent 1  │  │ Agent 2  │       │
│  │(Analyst) │  │(Writer)  │       │
│  └────┬─────┘  └────┬─────┘       │
│       │             │             │
│       └──────┬──────┘             │
│              │                    │
│       ┌──────▼──────┐             │
│       │ Task Queue  │             │
│       └─────────────┘             │
└────────────────────────────────────┘
```

### AutoGen Structure

```
┌────────────────────────────────────┐
│        Conversation Manager        │
│  ┌──────────┐  ┌──────────┐       │
│  │ Agent A  │◄─┤ Agent B  │       │
│  └────┬─────┘  └────┬─────┘       │
│       │             │             │
│       │  Messages   │             │
│       └──────►◄─────┘             │
└────────────────────────────────────┘
```

### Saga Transaction Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Saga Transaction                      │
│                                                          │
│  Step 1        Step 2        Step 3        Complete     │
│    │             │             │              │          │
│    ▼             ▼             ▼              ▼          │
│ ┌─────┐      ┌─────┐      ┌─────┐       ┌─────────┐     │
│ │ T1  │─────▶│ T2  │─────▶│ T3  │──────▶│ Commit  │     │
│ └─────┘      └─────┘      └─────┘       └─────────┘     │
│    │             │             │                         │
│    ▼             ▼             ▼                         │
│ ┌─────┐      ┌─────┐      ┌─────┐                       │
│ │ C1  │◄─────│ C2  │◄─────│ C3  │  (Compensations)      │
│ └─────┘      └─────┘      └─────┘                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Web Research (Implementation)

> **CRITICAL:** This file contains NO implementation code.
> Use web search for current implementation patterns.

**CrewAI Implementation:**
- Search: "CrewAI production deployment patterns {date}"
- Search: "CrewAI multi-tenant isolation {date}"
- Search: "CrewAI hierarchical crew patterns {date}"

**AutoGen Implementation:**
- Search: "AutoGen agent configuration {date}"
- Search: "AutoGen multi-agent patterns {date}"
- Search: "AutoGen conversation termination {date}"

**Saga Implementation:**
- Search: "saga orchestration patterns {date}"
- Search: "distributed transaction compensation {date}"
- Search: "saga pattern microservices {date}"

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M3 | Agent runtime properly configured |
| QG-I3 | Agent safety boundaries verified |

## Related Patterns

- [langgraph.md](langgraph.md) - Primary runtime with state machines
- [tool-resilience.md](tool-resilience.md) - Tool execution resilience
- [state-management.md](state-management.md) - Checkpoint persistence

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-29 | Consolidated from autogen.md, crewai.md, saga.md |
```

- [ ] **Step 2: Verify file was created correctly**

Run: `head -20 src-v2/data/patterns/agent-orchestration.md`

Expected: YAML frontmatter with pattern_id: agent-orchestration

- [ ] **Step 3: Commit the file**

```bash
git add src-v2/data/patterns/agent-orchestration.md
git commit -m "feat: create agent-orchestration.md consolidated pattern

Merges content from:
- autogen.md (AutoGen runtime)
- crewai.md (CrewAI runtime)
- saga.md (Saga transaction pattern)

Includes:
- Decision matrix for runtime selection
- BAM schema contracts (CrewAI, AutoGen, Saga)
- Architecture diagrams for all three patterns
- Web research queries (no implementation code)"
```

---

## Task 4: Remove Implementation Code from langgraph.md

**Files:**
- Modify: `src-v2/data/patterns/langgraph.md:70-90`

- [ ] **Step 1: Read current langgraph.md to confirm line numbers**

Run: `sed -n '65,95p' src-v2/data/patterns/langgraph.md`

Expected: Lines 72-90 contain Python code block

- [ ] **Step 2: Replace Python code with web research section**

Replace lines 70-90 in `src-v2/data/patterns/langgraph.md`:

**Remove this content:**
```markdown
### Conditional Edge Example

```python
def route_based_on_confidence(state):
    if state["confidence"] >= 0.95:
        return "execute"
    elif state["confidence"] >= 0.8:
        return "review"
    else:
        return "reject"

graph.add_conditional_edges(
    "evaluate",
    route_based_on_confidence,
    {
        "execute": "execute_node",
        "review": "human_review_node",
        "reject": "rejection_node"
    }
)
```
```

**Replace with:**
```markdown
### Conditional Edge Patterns

Conditional edges route graph execution based on state values. Common patterns include confidence-based routing, tier-based model selection, and feature flag evaluation.

**Web Research (Conditional Routing):**
- Search: "LangGraph conditional edge patterns {date}"
- Search: "LangGraph state-based routing examples {date}"
- Search: "LangGraph confidence routing {date}"
```

- [ ] **Step 3: Verify no Python code remains**

Run: `grep -n '```python' src-v2/data/patterns/langgraph.md`

Expected: No output (no Python code blocks)

- [ ] **Step 4: Commit the change**

```bash
git add src-v2/data/patterns/langgraph.md
git commit -m "refactor: remove implementation code from langgraph.md

Replace Python code examples with web research queries.
This prevents knowledge decay as LangGraph APIs evolve.

Before: Python route_based_on_confidence function
After: Web research queries for conditional routing patterns"
```

---

## Task 5: Delete Thin Pattern Files

**Files:**
- Delete: `src-v2/data/patterns/rls.md`
- Delete: `src-v2/data/patterns/schema-per-tenant.md`
- Delete: `src-v2/data/patterns/database-per-tenant.md`
- Delete: `src-v2/data/patterns/autogen.md`
- Delete: `src-v2/data/patterns/crewai.md`
- Delete: `src-v2/data/patterns/saga.md`
- Delete: `src-v2/data/patterns/cqrs.md`
- Delete: `src-v2/data/patterns/facade.md`

- [ ] **Step 1: Delete the 8 thin pattern files**

```bash
rm src-v2/data/patterns/rls.md
rm src-v2/data/patterns/schema-per-tenant.md
rm src-v2/data/patterns/database-per-tenant.md
rm src-v2/data/patterns/autogen.md
rm src-v2/data/patterns/crewai.md
rm src-v2/data/patterns/saga.md
rm src-v2/data/patterns/cqrs.md
rm src-v2/data/patterns/facade.md
```

- [ ] **Step 2: Verify 21 pattern files remain**

Run: `ls src-v2/data/patterns/*.md | wc -l`

Expected: 21

- [ ] **Step 3: Run pattern standards test**

Run: `npm test -- test/v2/pattern-standards.test.js`

Expected: All tests pass (21 patterns, no thin patterns, consolidated patterns exist)

- [ ] **Step 4: Commit the deletions**

```bash
git add -A src-v2/data/patterns/
git commit -m "refactor: delete 8 thin pattern files

Removed patterns consolidated into new files:
- rls.md → tenant-isolation.md
- schema-per-tenant.md → tenant-isolation.md
- database-per-tenant.md → tenant-isolation.md
- autogen.md → agent-orchestration.md
- crewai.md → agent-orchestration.md
- saga.md → agent-orchestration.md

Removed patterns absorbed into domains:
- cqrs.md → events.md domain

Removed generic patterns (CSV sufficient):
- facade.md

Pattern count: 27 → 21"
```

---

## Task 6: Update file-counts.test.js

**Files:**
- Modify: `test/v2/file-counts.test.js:34-37`

- [ ] **Step 1: Update pattern file count expectation**

In `test/v2/file-counts.test.js`, change line 36:

**From:**
```javascript
  test('pattern files (26+)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
    // V2 has comprehensive pattern library (22 existing + 4 new: zero-trust, disaster-recovery, secrets-management, incident-response)
    expect(files.length).toBeGreaterThanOrEqual(26);
  });
```

**To:**
```javascript
  test('21 pattern files (after consolidation)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
    // V2 consolidated: 27 - 8 deleted + 2 new = 21 patterns
    expect(files.length).toBe(21);
  });
```

- [ ] **Step 2: Run the test to verify it passes**

Run: `npm test -- test/v2/file-counts.test.js`

Expected: All tests pass

- [ ] **Step 3: Commit the test update**

```bash
git add test/v2/file-counts.test.js
git commit -m "test: update pattern count to 21 after consolidation

Changed from 26+ to exactly 21 patterns:
- Removed 8 thin patterns
- Added 2 consolidated patterns (tenant-isolation, agent-orchestration)"
```

---

## Task 7: Enrich tenant.md Domain with Isolation Strategy

**Files:**
- Modify: `src-v2/data/domains/tenant.md:40-46`

- [ ] **Step 1: Add isolation strategy section after Decision Matrix**

Insert after line 46 in `src-v2/data/domains/tenant.md`:

```markdown

## Isolation Strategy Selection

Quick reference for choosing tenant isolation model:

| Requirement | RLS | Schema | Database |
|-------------|-----|--------|----------|
| <1000 tenants | ✅ Best | ⚠️ OK | ❌ Overkill |
| 1000+ tenants | ✅ + Sharding | ⚠️ Complex | ❌ Expensive |
| HIPAA/PCI compliance | ⚠️ Audit needed | ✅ Good | ✅ Best |
| Cost optimization | ✅ Best | ⚠️ Medium | ❌ Expensive |
| Schema customization | ❌ None | ✅ Per-tenant | ✅ Full |

**Detailed Pattern:** `{project-root}/_bmad/bam/data/patterns/tenant-isolation.md`

**Web Research:**
- Search: "multi-tenant isolation strategy selection {date}"
- Search: "RLS vs schema isolation comparison {date}"
```

- [ ] **Step 2: Verify the section was added**

Run: `grep -n "Isolation Strategy Selection" src-v2/data/domains/tenant.md`

Expected: Line number with "Isolation Strategy Selection"

- [ ] **Step 3: Commit the enrichment**

```bash
git add src-v2/data/domains/tenant.md
git commit -m "docs: add isolation strategy selection to tenant.md

Quick reference matrix for choosing RLS vs Schema vs Database isolation.
Points to detailed tenant-isolation.md pattern for full guidance."
```

---

## Task 8: Enrich ai-runtime.md Domain with Runtime Selection

**Files:**
- Modify: `src-v2/data/domains/ai-runtime.md:50-52`

- [ ] **Step 1: Add runtime selection section after Decision Matrix**

Insert after line 51 in `src-v2/data/domains/ai-runtime.md`:

```markdown

## Runtime Selection Guide

Quick reference for choosing AI agent runtime:

| Use Case | Primary | Alternative | Notes |
|----------|---------|-------------|-------|
| State machines | LangGraph | - | Native checkpointing |
| Role-based crews | CrewAI | LangGraph | Built-in delegation |
| Multi-agent conversations | AutoGen | CrewAI | Flexible termination |
| Long-running transactions | Saga | LangGraph | Compensation support |
| Rapid prototyping | LangGraph | CrewAI | Best tooling |

**Detailed Patterns:**
- `{project-root}/_bmad/bam/data/patterns/langgraph.md` - State machine runtime
- `{project-root}/_bmad/bam/data/patterns/agent-orchestration.md` - CrewAI, AutoGen, Saga

**Web Research:**
- Search: "AI agent runtime comparison {date}"
- Search: "LangGraph vs CrewAI vs AutoGen {date}"
```

- [ ] **Step 2: Verify the section was added**

Run: `grep -n "Runtime Selection Guide" src-v2/data/domains/ai-runtime.md`

Expected: Line number with "Runtime Selection Guide"

- [ ] **Step 3: Commit the enrichment**

```bash
git add src-v2/data/domains/ai-runtime.md
git commit -m "docs: add runtime selection guide to ai-runtime.md

Quick reference matrix for choosing LangGraph vs CrewAI vs AutoGen vs Saga.
Points to detailed pattern files for full guidance."
```

---

## Task 9: Enrich events.md Domain with CQRS Pattern

**Files:**
- Modify: `src-v2/data/domains/events.md:64-65`

- [ ] **Step 1: Add CQRS pattern section at end of file**

Append to `src-v2/data/domains/events.md`:

```markdown

---

## CQRS Pattern

Command Query Responsibility Segregation separates read and write models for optimized scaling.

### When to Use CQRS

**Use when:**
- Read/write load asymmetry (10:1 or higher)
- Complex read models with multiple projections
- Event sourcing is in use
- Independent scaling requirements

**Do NOT use when:**
- Simple CRUD operations
- Consistent read-after-write required
- Low complexity systems

### CQRS Architecture

```
┌─────────────────────────────────────┐
│              CQRS                   │
│                                     │
│  ┌─────────┐      ┌─────────┐      │
│  │ Command │      │  Query  │      │
│  │  Model  │      │  Model  │      │
│  └────┬────┘      └────┬────┘      │
│       │                │           │
│       ▼                ▼           │
│  ┌─────────┐      ┌─────────┐      │
│  │  Write  │─────►│  Read   │      │
│  │   DB    │ sync │   DB    │      │
│  └─────────┘      └─────────┘      │
└─────────────────────────────────────┘
```

### Multi-Tenant CQRS Considerations

| Concern | Approach |
|---------|----------|
| Write DB isolation | RLS/Schema per tenant model |
| Read DB isolation | Tenant-prefixed materialized views |
| Event sync | Include tenant_id in all events |
| Projection filters | Tenant-scoped projections |

**Web Research:**
- Search: "CQRS implementation patterns {date}"
- Search: "CQRS multi-tenant SaaS {date}"
- Search: "event sourcing CQRS patterns {date}"
```

- [ ] **Step 2: Verify the section was added**

Run: `grep -n "## CQRS Pattern" src-v2/data/domains/events.md`

Expected: Line number with "## CQRS Pattern"

- [ ] **Step 3: Commit the enrichment**

```bash
git add src-v2/data/domains/events.md
git commit -m "docs: add CQRS pattern to events.md domain

Absorbed from deleted cqrs.md pattern file.
Includes architecture diagram and multi-tenant considerations."
```

---

## Task 10: Enhance bam-patterns.csv with New Columns

**Files:**
- Modify: `src-v2/data/bam-patterns.csv`

- [ ] **Step 1: Add new columns to CSV header**

Update the first line of `src-v2/data/bam-patterns.csv`:

**From:**
```csv
pattern_id,name,category,decision_criteria,signals,intent,variants,decision_questions,web_queries,verification_gate,dependencies,conflicts,skill_level_notes,related_fragments
```

**To:**
```csv
pattern_id,name,category,decision_criteria,signals,intent,variants,decision_questions,web_queries,verification_gate,dependencies,conflicts,skill_level_notes,related_fragments,core_pattern_ref,domain_ref,shortcode
```

- [ ] **Step 2: Update tenant-isolation row with new columns**

Find the `tenant-isolation` row and update it to include new columns:

```csv
tenant-isolation,Tenant Isolation,security,"Use when implementing prevent cross-tenant data access with signals: shared data,multi-tenant,customer separation","shared data,multi-tenant,customer separation",Prevent cross-tenant data access,row-level-security;schema-per-tenant;database-per-tenant,What compliance requirements apply?;How many tenants expected?;What isolation level required?,multi-tenant isolation patterns {date};PostgreSQL RLS best practices {date},QG-M2,database;security,,Basic: RLS with tenant_id column;Advanced: Schema isolation with connection pooling,rls-best-practices;multi-tenant-patterns;testing-tenant-isolation,tenant-isolation.md,tenant.md,ZTI
```

- [ ] **Step 3: Update agent-runtime row with new columns**

Find the `agent-runtime` row and update it:

```csv
agent-runtime,Agent Runtime,ai,Use for AI/agent workloads requiring design agent execution framework,"LLM agents,orchestration,multi-step",Design agent execution framework,langgraph;crewai;autogen;custom,What orchestration complexity needed?;Human-in-the-loop required?;State persistence needs?,LangGraph agent patterns {date};agent orchestration best practices {date},QG-M3,tenant-isolation,,Basic: Single agent with tools;Advanced: Hierarchical multi-agent,agent-runtime-patterns;run-contracts;memory-tiers,langgraph.md;agent-orchestration.md,ai-runtime.md,ZAR
```

- [ ] **Step 4: Add empty values for remaining rows**

For all other rows, append `,,,` to add empty values for the three new columns.

Run: `sed -i '2,$s/$/,,,/' src-v2/data/bam-patterns.csv`

Then manually update the key rows (tenant-isolation, agent-runtime) with proper values.

- [ ] **Step 5: Verify CSV structure**

Run: `head -3 src-v2/data/bam-patterns.csv`

Expected: Header has 17 columns, data rows have 17 values

- [ ] **Step 6: Commit the CSV enhancement**

```bash
git add src-v2/data/bam-patterns.csv
git commit -m "feat: add core_pattern_ref, domain_ref, shortcode columns to CSV

New columns enable:
- core_pattern_ref: Link CSV rows to pattern files
- domain_ref: Link to domain context files
- shortcode: Menu shortcode for quick access

Updated tenant-isolation and agent-runtime rows with values."
```

---

## Task 11: Run Full Test Suite

**Files:**
- Test: All test files

- [ ] **Step 1: Run all V2 tests**

Run: `npm test -- test/v2/`

Expected: All tests pass

- [ ] **Step 2: Run full test suite**

Run: `npm test`

Expected: All tests pass

- [ ] **Step 3: Verify pattern count is correct**

Run: `ls src-v2/data/patterns/*.md | wc -l`

Expected: 21

- [ ] **Step 4: Verify no implementation code in patterns**

Run: `grep -r '```python\|```typescript\|```javascript' src-v2/data/patterns/`

Expected: No output (no implementation code)

- [ ] **Step 5: Create summary commit**

```bash
git add -A
git commit -m "feat: complete pattern tiered architecture consolidation

Summary of changes:
- Created tenant-isolation.md (consolidated 3 patterns)
- Created agent-orchestration.md (consolidated 3 patterns)
- Deleted 8 thin pattern files
- Removed Python code from langgraph.md
- Enriched 3 domain files (tenant.md, ai-runtime.md, events.md)
- Enhanced CSV with 3 new columns
- Added pattern-standards.test.js

Final state:
- 21 pattern files (was 27)
- 0 thin patterns (was 8)
- 0 files with implementation code (was 2)
- 100% BMAD compliance
- 100% capability preserved"
```

---

## Self-Review Checklist

### Spec Coverage

| Requirement | Task |
|-------------|------|
| Create tenant-isolation.md | Task 2 |
| Create agent-orchestration.md | Task 3 |
| Remove Python from langgraph.md | Task 4 |
| Delete 8 thin patterns | Task 5 |
| Update test counts | Task 6 |
| Enrich tenant.md | Task 7 |
| Enrich ai-runtime.md | Task 8 |
| Enrich events.md | Task 9 |
| Enhance CSV | Task 10 |
| Full test validation | Task 11 |

### Placeholder Scan

- No "TBD" or "TODO" found
- All code blocks are complete
- All file paths are exact
- All commands have expected output

### Type Consistency

- Pattern file structure consistent across tenant-isolation.md and agent-orchestration.md
- CSV column names consistent with spec
- Test assertions match expected counts

---

## Summary

This plan implements the Pattern Tiered Architecture in 11 tasks:

| Phase | Tasks | Files Changed |
|-------|-------|---------------|
| Testing | 1, 6, 11 | 2 test files |
| Consolidation | 2, 3 | 2 new patterns |
| Content Separation | 4 | 1 pattern modified |
| Cleanup | 5 | 8 patterns deleted |
| Domain Enrichment | 7, 8, 9 | 3 domains modified |
| CSV Enhancement | 10 | 1 CSV modified |

**Total: 11 tasks, ~55 steps**
