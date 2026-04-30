# BAM V2 Pattern Tiered Architecture Design (Complete)

> **For agentic workers:** Use superpowers:writing-plans to create implementation plan after approval.

**Goal:** Achieve full BMAD compatibility while preserving 100% of BAM V1/V2 capabilities through tiered pattern consolidation and content separation.

**Architecture:** Three-tier pattern system with strict content separation - NO implementation code in pattern files, only decision frameworks + BAM contracts + web queries.

**Key Insight:** Pattern files should contain time-invariant content (decisions, principles, BAM contracts) while time-sensitive content (implementation code, APIs) comes from web search.

---

## Problem Statement

### Current State
- 27 pattern files in V2
- 8 "thin" patterns (<60 lines, 0 YAML schemas) - BMAD anti-pattern
- 2 patterns contain implementation code (Python, SQL) - decay risk
- Inconsistent web query coverage

### BMAD Philosophy
- CSV for decision criteria
- Web search for implementation (always current)
- No static pattern files that decay
- Templates/domains for structural content

### The Tension
BMAD says "no pattern files" but BAM has unique innovations (TenantContext, NEXUS loops) not discoverable via web search.

---

## Gap Analysis

| Gap | Description | Impact | Solution |
|-----|-------------|--------|----------|
| G1 | Knowledge decay in pattern files | Outdated advice | Content separation |
| G2 | Implementation code in patterns | APIs change | Remove, use web queries |
| G3 | 8 thin patterns (no schemas) | BMAD non-compliant | Consolidate |
| G4 | No pattern file template | Inconsistent structure | Standard template |
| G5 | CSV missing columns | Incomplete references | Enhance CSV |
| G6 | Schema versioning absent | No upgrade path | Add versioning |
| G7 | Cross-reference integrity | Broken links after consolidation | Reference audit |
| G8 | Domain/pattern boundary unclear | Content duplication | Clear rules |
| G9 | Test coverage gaps | Regressions possible | New validation tests |
| G10 | Migration path undefined | Breaks existing users | Migration strategy |

---

## Solution: Complete Tiered Architecture

### Tier Classification

| Tier | Criteria | Files | Action |
|------|----------|-------|--------|
| **1: Innovation** | 2+ YAML schemas (BAM contracts) | 11 | Keep, audit for impl code |
| **2: Structural** | 1 YAML schema | 8 | Keep, audit for impl code |
| **3: Consolidated** | 0 YAML, same domain | 6 | Merge into 2 new files |
| **4: CSV-Only** | 0 YAML, generic | 2 | Delete, CSV sufficient |

### Final Pattern File Count

| Category | Before | After |
|----------|--------|-------|
| Innovation patterns | 11 | 11 |
| Structural patterns | 8 | 8 |
| Consolidated patterns | 0 | 2 (NEW) |
| Thin patterns | 8 | 0 (DELETED) |
| **Total** | **27** | **21** |

---

## Content Separation Rules (Critical for Decay Prevention)

### MUST Be In Pattern File (Time-Invariant)

| Content Type | Example | Rationale |
|--------------|---------|-----------|
| Decision framework | "Use RLS when <1000 tenants" | Principles don't change |
| Architectural principle | "Defense in depth for isolation" | Concepts are stable |
| Decision matrix | "RLS vs Schema vs Database" | Trade-offs remain valid |
| BAM schema contract | TenantContext, checkpoint_config | BAM controls versioning |
| Architecture diagram | ASCII showing relationships | Conceptual, not impl |
| Quality gate alignment | "QG-M2 verifies isolation" | Gate definitions stable |
| Web query specifications | "PostgreSQL RLS {date}" | Pointers, not content |

### MUST NOT Be In Pattern File (Time-Sensitive)

| Content Type | Example | Why Dangerous |
|--------------|---------|---------------|
| Implementation code | Python functions, TypeScript classes | APIs change |
| Library-specific calls | `LangGraph.compile()`, `CrewAI.kickoff()` | Library versions |
| Version-specific syntax | PostgreSQL 15 vs 16 features | Database upgrades |
| Specific config values | "timeout: 30s" (without context) | Requirements vary |
| Best practice recommendations | "Always use X library" | Tools evolve |

### Implementation Code Found (Must Remove)

| File | Line | Content | Action |
|------|------|---------|--------|
| langgraph.md | 72-79 | Python `route_based_on_confidence()` | Remove, add web query |
| rls.md | 39-46 | SQL `CREATE POLICY` | Remove, add web query |

---

## Standard Pattern File Template

All pattern files MUST follow this structure:

```markdown
---
pattern_id: {id}
shortcode: Z{XX}
category: {category}
qg_ref: QG-{XX}
version: 1.0.0
last_reviewed: {YYYY-MM-DD}
---

# {Pattern Name} - BAM Pattern

**Loaded by:** {shortcode}
**Category:** {category}
**Quality Gate:** {qg_ref}

---

## Decision Framework

**Use when:**
- {condition 1}
- {condition 2}

**Do NOT use when:**
- {anti-condition 1}
- {anti-condition 2}

## Architectural Principle

{Time-invariant explanation of the principle, NOT implementation}

## Decision Matrix

| Factor | Option A | Option B | Option C |
|--------|----------|----------|----------|
| {factor} | {value} | {value} | {value} |

## BAM Schema Contract

> **Schema Version:** {X.Y.Z}
> **BAM Controlled:** Yes - we own versioning

```yaml
{BAM-specific schema - NOT library configuration}
{Only schemas that BAM defines and controls}
```

## Architecture Diagram

```
{ASCII diagram showing RELATIONSHIPS and PRINCIPLES}
{NOT implementation details or specific technologies}
```

## Web Research (Implementation)

> **CRITICAL:** This file contains NO implementation code.
> Use web search for current implementation patterns.

**Core Implementation:**
- Search: "{specific implementation query} {date}"
- Search: "{related implementation query} {date}"

**Advanced Patterns:**
- Search: "{advanced topic} {date}"

**Troubleshooting:**
- Search: "{common issues} {date}"

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| {QG-XX} | {What this pattern helps verify} |

## Related Patterns

- [{pattern}]({file}.md) - {relationship}

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | {date} | {description} |
```

---

## Thin Pattern Consolidation

### Consolidation 1: tenant-isolation.md (NEW)

**Merges:** rls.md + schema-per-tenant.md + database-per-tenant.md

**Structure:**
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

## Decision Framework

**Use tenant isolation when:**
- Multi-tenant SaaS application
- Data segregation required
- Compliance mandates boundaries

**Choose isolation level based on:**
- Tenant count (<1000 → RLS, 100-500 → Schema, <100 → Database)
- Compliance requirements (Medium → RLS, High → Schema, Highest → Database)
- Cost constraints (Low → RLS, Medium → Schema, High → Database)

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

## Architectural Principle

Tenant isolation follows **defense in depth**:

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

## BAM Schema Contracts

### TenantContext Contract

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

```yaml
schema_isolation_contract:
  version: "1.0.0"
  bam_controlled: true
  
  naming: "tenant_{tenant_id}"
  search_path: required
  migration_strategy: enum[parallel, sequential, blue_green]
```

### Database Isolation Contract

```yaml
database_isolation_contract:
  version: "1.0.0"
  bam_controlled: true
  
  naming: "db_{tenant_id}"
  connection_routing: required
  credential_management: vault_required
```

## Architecture Diagrams

### RLS Model
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

### Schema Model
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

### Database Model
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

> **CRITICAL:** No implementation code in this file.

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

### Consolidation 2: agent-orchestration.md (NEW)

**Merges:** autogen.md + crewai.md + saga.md (langgraph.md stays separate - has 2 YAML schemas)

**Structure:**
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

## Decision Framework

**Use agent orchestration when:**
- Multi-agent coordination needed
- Complex workflow with multiple AI participants
- Role-based task delegation

**Choose framework based on:**
- Workflow type (state machine → LangGraph, role-based → CrewAI, conversation → AutoGen)
- Control requirements (high → LangGraph, medium → CrewAI, flexible → AutoGen)
- Team expertise

## Decision Matrix

| Factor | LangGraph | CrewAI | AutoGen | Saga |
|--------|-----------|--------|---------|------|
| Best for | State machines | Role-based crews | Conversations | Transactions |
| Control level | High | Medium | Low | High |
| Learning curve | Steep | Moderate | Easy | Moderate |
| State management | Built-in | External | Message history | Saga log |
| Tenant isolation | Graph-level | Crew-level | Conversation-level | Transaction-level |
| Determinism | High | Medium | Low | High |

## Architectural Principle

Agent orchestration requires **clear boundaries**:

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

## BAM Schema Contracts

### CrewAI Integration Contract

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
```

### AutoGen Integration Contract

```yaml
autogen_integration:
  version: "1.0.0"
  bam_controlled: true
  
  conversation_manager:
    max_turns: int
    termination_condition: string
  
  tenant_isolation:
    conversation_scope: per_tenant
    memory_isolation: required
```

### Saga Pattern Contract

```yaml
saga_contract:
  version: "1.0.0"
  bam_controlled: true
  
  transaction:
    steps: list[SagaStep]
    compensations: list[CompensationAction]
  
  tenant_scoping:
    saga_id_includes_tenant: true
    rollback_scoped: true
```

## Web Research (Implementation)

> **CRITICAL:** No implementation code in this file.

**CrewAI Implementation:**
- Search: "CrewAI production deployment patterns {date}"
- Search: "CrewAI multi-tenant isolation {date}"

**AutoGen Implementation:**
- Search: "AutoGen agent configuration {date}"
- Search: "AutoGen multi-agent patterns {date}"

**Saga Implementation:**
- Search: "saga orchestration patterns {date}"
- Search: "distributed transaction compensation {date}"

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M3 | Agent runtime properly configured |
| QG-I3 | Agent safety boundaries verified |

## Related Patterns

- [langgraph.md](langgraph.md) - Primary runtime (separate due to complexity)
- [tool-resilience.md](tool-resilience.md) - Tool execution patterns
- [state-management.md](state-management.md) - Checkpoint persistence

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-29 | Consolidated from autogen.md, crewai.md, saga.md |
```

### Files to Delete (Thin Patterns → CSV Only)

| File | Reason | CSV Row Exists |
|------|--------|----------------|
| rls.md | Merged into tenant-isolation.md | Yes |
| schema-per-tenant.md | Merged into tenant-isolation.md | Yes |
| database-per-tenant.md | Merged into tenant-isolation.md | Yes |
| autogen.md | Merged into agent-orchestration.md | Yes |
| crewai.md | Merged into agent-orchestration.md | Yes |
| saga.md | Merged into agent-orchestration.md | Yes |
| cqrs.md | Generic pattern, web searchable | Yes (add if missing) |
| facade.md | Generic pattern, web searchable | Yes |

---

## Existing Pattern Audit (Implementation Code Removal)

### langgraph.md - Lines 72-79

**Current (REMOVE):**
```python
def route_based_on_confidence(state):
    if state["confidence"] >= 0.95:
        return "execute"
    elif state["confidence"] >= 0.8:
        return "review"
    else:
        return "reject"
```

**Replace with:**
```markdown
## Web Research (Implementation)

**Conditional Routing:**
- Search: "LangGraph conditional edge patterns {date}"
- Search: "LangGraph state-based routing {date}"
```

### Other Patterns to Audit

All 19 remaining patterns (11 innovation + 8 structural) need audit for:
- [ ] Python/TypeScript/JavaScript code blocks
- [ ] Library-specific API calls
- [ ] Version-specific syntax
- [ ] Hardcoded configuration values

---

## CSV Enhancement

### New Columns

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| `core_pattern_ref` | string | Pointer to pattern file | `tenant-isolation.md` |
| `domain_ref` | string | Pointer to domain file | `tenant.md` |
| `qg_ref` | string | Quality gate reference | `QG-M2` |
| `shortcode` | string | Menu shortcode | `ZTI` |
| `schema_version` | string | BAM schema version | `1.0.0` |

### Enhanced CSV Row Example

```csv
pattern_id,name,category,decision_criteria,web_queries,core_pattern_ref,domain_ref,qg_ref,shortcode,schema_version
tenant-rls,Row-Level Security,tenant-isolation,"<1000 tenants, shared tables","PostgreSQL RLS {date}",tenant-isolation.md,tenant.md,QG-M2,ZRLS,1.0.0
```

---

## Domain Enrichment

### tenant.md Enhancement

Add isolation decision matrix:

```markdown
## Tenant Isolation Strategy

| Requirement | RLS | Schema | Database |
|-------------|-----|--------|----------|
| <1000 tenants | ✅ Best | ⚠️ OK | ❌ Overkill |
| Compliance (HIPAA) | ⚠️ Audit | ✅ Good | ✅ Best |
| Cost optimization | ✅ Best | ⚠️ Medium | ❌ Expensive |

**Detailed Pattern:** `{project-root}/_bmad/bam/data/patterns/tenant-isolation.md`
```

### ai-runtime.md Enhancement

Add runtime selection matrix:

```markdown
## Runtime Selection

| Use Case | Primary | Alternative |
|----------|---------|-------------|
| State machines | LangGraph | - |
| Role-based crews | CrewAI | LangGraph |
| Conversations | AutoGen | CrewAI |
| Transactions | Saga | LangGraph |

**Detailed Patterns:**
- `{project-root}/_bmad/bam/data/patterns/langgraph.md`
- `{project-root}/_bmad/bam/data/patterns/agent-orchestration.md`
```

### events.md Enhancement

Absorb CQRS content:

```markdown
## CQRS Pattern

**Decision:** Separate read/write models when:
- Read/write scaling differs significantly
- Complex read views required
- Event sourcing in use

**Web Research:** Search "CQRS implementation patterns {date}"
```

---

## Migration Strategy

### For Existing BAM V2 Users

1. **Backward Compatibility**
   - Old shortcodes (ZRLS, ZSPT, ZDPT) redirect to ZTI
   - CSV rows for deleted patterns point to consolidated files
   
2. **Deprecation Warnings**
   - TOML references to old patterns log warning
   - Clear upgrade path in CHANGELOG

3. **Migration Script**
   ```bash
   # scripts/migrate-patterns-v2.1.sh
   # Updates references in user's _bmad/bam/ directory
   ```

---

## Validation Tests

### New Test Cases

```javascript
// test/v2/pattern-standards.test.js

describe('Pattern Standards', () => {
  test('no implementation code in patterns', () => {
    // Scan for ```python, ```typescript, ```javascript
    // Fail if found
  });

  test('all patterns have web_queries section', () => {
    // Check for "## Web Research" section
  });

  test('all patterns have BAM schema contracts', () => {
    // Check for "## BAM Schema Contract" section
  });

  test('all patterns follow template structure', () => {
    // Validate YAML frontmatter
    // Check required sections exist
  });

  test('pattern count is 21', () => {
    // After consolidation
  });

  test('no thin patterns exist', () => {
    // All patterns have YAML schemas
  });
});
```

### CSV Validation

```javascript
// test/v2/csv-schema.test.js

describe('CSV Schema', () => {
  test('all required columns present', () => {
    // Check for new columns
  });

  test('core_pattern_ref points to existing file', () => {
    // Validate file exists
  });

  test('qg_ref is valid gate', () => {
    // Check against quality-gates.csv
  });
});
```

---

## Implementation Phases

### Phase 1: Content Separation (Existing Patterns)

1. Audit all 19 thick patterns for implementation code
2. Remove implementation code, add web queries
3. Add YAML frontmatter with version
4. Update to standard template structure

### Phase 2: Thin Pattern Consolidation

1. Create `tenant-isolation.md` (merge 3 files)
2. Create `agent-orchestration.md` (merge 3 files)
3. Delete 8 thin pattern files
4. Update cross-references

### Phase 3: CSV Enhancement

1. Add new columns to bam-patterns.csv
2. Update all 192 rows
3. Add redirect rows for deleted patterns

### Phase 4: Domain Enrichment

1. Add isolation matrix to tenant.md
2. Add runtime matrix to ai-runtime.md
3. Add CQRS content to events.md

### Phase 5: Reference Updates

1. Update TOML shortcode references
2. Update step file pattern references
3. Add deprecation warnings for old codes

### Phase 6: Test & Validation

1. Run new pattern standard tests
2. Verify CSV schema
3. Validate cross-references
4. Full regression test

---

## Capability Preservation Matrix

| V1/V2 Capability | New Location | Format | Preserved |
|------------------|--------------|--------|-----------|
| RLS decision criteria | tenant-isolation.md + CSV | Matrix + Schema | ✅ |
| Schema isolation criteria | tenant-isolation.md + CSV | Matrix + Schema | ✅ |
| Database isolation criteria | tenant-isolation.md + CSV | Matrix + Schema | ✅ |
| AutoGen decision criteria | agent-orchestration.md + CSV | Matrix + Schema | ✅ |
| CrewAI decision criteria | agent-orchestration.md + CSV | Matrix + Schema | ✅ |
| Saga decision criteria | agent-orchestration.md + CSV | Matrix + Schema | ✅ |
| CQRS decision criteria | events.md domain + CSV | Domain + Web | ✅ |
| Facade decision criteria | CSV + web_queries | CSV + Web | ✅ |
| All YAML schemas | Pattern files (unchanged) | YAML | ✅ |
| All diagrams | Pattern files (consolidated) | ASCII | ✅ |
| All QG references | CSV + pattern files | qg_ref column | ✅ |
| All web queries | CSV + pattern files | web_queries | ✅ |
| Implementation guidance | Web search | Dynamic | ✅ (improved) |

**Result: 100% capability preserved, decay risk eliminated**

---

## BMAD Compatibility Assessment

| Principle | Before | After |
|-----------|--------|-------|
| CSV for decision criteria | 70% | 100% |
| Web search for implementation | 60% | 100% |
| No thin/decay-prone files | 8 thin files | 0 |
| No implementation code | 2 files with code | 0 |
| Pattern files for innovations only | Mixed | Innovation only |
| Domain context files | Basic | Enriched |

**Full BMAD compliance achieved.**

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Breaking TOML references | Medium | High | Migration script + deprecation warnings |
| Missing content in consolidation | Low | Medium | Capability matrix verification |
| Test failures | Low | Low | Update expected counts first |
| User confusion | Medium | Medium | Clear CHANGELOG + migration guide |

---

## Success Metrics

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| Pattern files | 27 | 21 | ✅ |
| Thin patterns (0 YAML) | 8 | 0 | ✅ |
| Files with impl code | 2 | 0 | ✅ |
| CSV completeness | 70% | 100% | ✅ |
| BMAD compliance | Partial | Full | ✅ |
| Capability preserved | 100% | 100% | ✅ |
| Knowledge decay risk | High | Minimal | ✅ |

---

## Approval Checklist

- [ ] Content separation rules understood
- [ ] Thin pattern consolidation approved
- [ ] Implementation code removal approved
- [ ] CSV enhancement approved
- [ ] Domain enrichment approved
- [ ] Migration strategy approved
- [ ] Test coverage approved

---

## Next Steps After Approval

1. Create implementation plan via superpowers:writing-plans
2. Execute in phases with review checkpoints
3. Update CLAUDE.md with new pattern standards
4. Publish migration guide

---

## Appendix: Complete File Changes

### CREATE (2 files)
- `src-v2/data/patterns/tenant-isolation.md`
- `src-v2/data/patterns/agent-orchestration.md`

### DELETE (8 files)
- `src-v2/data/patterns/rls.md`
- `src-v2/data/patterns/schema-per-tenant.md`
- `src-v2/data/patterns/database-per-tenant.md`
- `src-v2/data/patterns/autogen.md`
- `src-v2/data/patterns/crewai.md`
- `src-v2/data/patterns/saga.md`
- `src-v2/data/patterns/cqrs.md`
- `src-v2/data/patterns/facade.md`

### MODIFY (audit for impl code)
- `src-v2/data/patterns/langgraph.md` (remove Python code)
- All other 18 patterns (audit + template compliance)

### MODIFY (CSV)
- `src-v2/data/bam-patterns.csv` (add columns, update rows)

### MODIFY (domains)
- `src-v2/data/domains/tenant.md` (add isolation matrix)
- `src-v2/data/domains/ai-runtime.md` (add runtime matrix)
- `src-v2/data/domains/events.md` (add CQRS content)

### MODIFY (tests)
- `test/v2/file-counts.test.js` (update pattern count)
- CREATE `test/v2/pattern-standards.test.js`
- CREATE `test/v2/csv-schema.test.js`

### MODIFY (TOML)
- Update shortcode references where needed
