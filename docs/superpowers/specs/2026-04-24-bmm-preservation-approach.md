# BMM Approach: How to Preserve Everything

**Date:** 2026-04-24
**Purpose:** Map each preserved element to BMM's architecture
**Goal:** Zero capability loss with optimal BMM alignment

---

## The BMM Architecture Model

### Core Principle: Separation of Knowledge Types

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        BMM KNOWLEDGE ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐     │
│  │ PATTERN REGISTRY│    │  DOMAIN GUIDES  │    │    WORKFLOWS    │     │
│  │     (CSV)       │    │   (Markdown)    │    │   (Steps)       │     │
│  ├─────────────────┤    ├─────────────────┤    ├─────────────────┤     │
│  │ • Pattern IDs   │    │ • Concepts      │    │ • Outcomes      │     │
│  │ • Decision      │    │ • Conventions   │    │ • Pattern refs  │     │
│  │   criteria      │    │ • Code patterns │    │ • Verifications │     │
│  │ • Web queries   │    │ • Decisions     │    │ • Gate checks   │     │
│  │ • Dependencies  │    │ • Frameworks    │    │                 │     │
│  └────────┬────────┘    └────────┬────────┘    └────────┬────────┘     │
│           │                      │                      │              │
│           └──────────────────────┼──────────────────────┘              │
│                                  │                                      │
│                                  ▼                                      │
│                    ┌─────────────────────────┐                         │
│                    │      AI AGENT           │                         │
│                    │                         │                         │
│                    │  • Evaluates criteria   │                         │
│                    │  • Loads relevant guide │                         │
│                    │  • Executes web search  │                         │
│                    │  • Follows workflow     │                         │
│                    │  • Produces output      │                         │
│                    └─────────────────────────┘                         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Knowledge Type Classification

| Knowledge Type | Stability | Storage Location | Access Method |
|----------------|-----------|------------------|---------------|
| Decision criteria | Stable | Pattern registry (CSV) | Query by pattern_id |
| Conventions | Stable | Domain guides | Load on-demand |
| Code patterns | Stable | Domain guides | Section reference |
| Concepts | Stable | Domain guides | Section reference |
| Decision frameworks | Stable | Domain guides | Section reference |
| Quality gates | Stable | Checklists | Workflow integration |
| Implementation syntax | Volatile | Web search | Runtime query |
| Best practices | Volatile | Web search | Runtime query |

---

## Element-by-Element Preservation Approach

### Element 1: Pattern Decision Criteria

**What it is:** The WHEN for each pattern - criteria that determine applicability.

**BMM Handling:**

```csv
# bam-patterns.csv - THE AUTHORITY

pattern_id,name,category,decision_criteria,web_queries,consolidated_guide,section

tenant-rls,Row-Level Security,tenant,"<1000 tenants AND shared-tables AND cost-efficient","PostgreSQL RLS multi-tenant {date}",tenant-patterns-guide.md,§rls-patterns
tenant-schema,Schema Isolation,tenant,"regulated-industry OR moderate-isolation","schema-per-tenant patterns {date}",tenant-patterns-guide.md,§schema-isolation
tenant-database,Database Isolation,tenant,"enterprise-tier AND maximum-isolation AND strict-compliance","database-per-tenant architecture {date}",tenant-patterns-guide.md,§database-isolation
```

**How AI Agent Uses It:**

```
1. Agent receives task: "Design tenant isolation"
2. Agent queries: bam-patterns.csv WHERE category = 'tenant'
3. Agent evaluates decision_criteria against project context:
   - Project: 200 tenants, startup, cost-sensitive
   - Matches: "<1000 tenants AND cost-efficient"
   - Selected: tenant-rls
4. Agent loads: tenant-patterns-guide.md §rls-patterns
5. Agent executes: web_queries for current implementation
```

**Best Approach:**

```csv
# Enhanced CSV structure for consolidation

pattern_id          # Unique identifier (UNCHANGED)
name                # Human-readable name (UNCHANGED)
category            # Domain category (UNCHANGED)
decision_criteria   # Boolean expression for selection (UNCHANGED)
signals             # Keywords that trigger this pattern (UNCHANGED)
web_queries         # Search queries with {date} (UNCHANGED)
consolidated_guide  # NEW: Which guide file contains this
section_anchor      # NEW: Section anchor within guide
verification_gate   # Quality gate for verification (UNCHANGED)
dependencies        # Required patterns (UNCHANGED)
conflicts           # Incompatible patterns (UNCHANGED)
```

---

### Element 2: BAM-Specific Conventions

**What it is:** Naming standards, structural patterns unique to BAM.

**The Problem:** These are NOT available via web search. They MUST be stored.

**BMM Handling:**

```markdown
# tenant-patterns-guide.md

## BAM Tenant Conventions

> **CRITICAL: These conventions are BAM-specific and must be used exactly.**

### Context Keys (PostgreSQL)

| Key | Purpose | Type | Example |
|-----|---------|------|---------|
| `app.current_tenant` | Current tenant UUID | uuid | `SET LOCAL app.current_tenant = '...'` |
| `app.is_admin` | Admin bypass flag | boolean | `SET LOCAL app.is_admin = true` |
| `app.tenant_tier` | Tenant subscription tier | text | `'free'`, `'pro'`, `'enterprise'` |

### Cache Key Format

```
Pattern: tenant:{tenant_id}:{namespace}:{key}

Examples:
- tenant:abc123:cache:user_profile
- tenant:abc123:session:token_xyz
- tenant:abc123:rate_limit:api_calls
```

### File Storage Paths

```
Pattern: tenants/{tenant_id}/{category}/{filename}

Examples:
- tenants/abc123/uploads/document.pdf
- tenants/abc123/exports/report.csv
- tenants/abc123/avatars/user_123.png
```

### Memory Scope Tags

| Scope | Lifetime | Isolation | Use Case |
|-------|----------|-----------|----------|
| `session` | Request | Per-request | Working memory |
| `user` | Session | Per-user | User preferences |
| `tenant` | Persistent | Per-tenant | Tenant knowledge |
| `global` | Persistent | Shared | System knowledge |
```

**Best Approach:**

1. **Dedicated "Conventions" section** in each domain guide
2. **Tables for quick reference** (not prose)
3. **Code blocks for exact syntax**
4. **"CRITICAL" callouts** for must-follow items
5. **Examples for each convention**

---

### Element 3: Code Patterns with Placeholders

**What it is:** Reusable code structures with `{placeholders}` for customization.

**The Key Insight:** These are PATTERNS (stable), not IMPLEMENTATIONS (volatile).

**BMM Handling:**

```markdown
# tenant-patterns-guide.md

## RLS Policy Patterns

### Base Tenant Isolation Pattern

```sql
-- BAM Standard RLS Pattern
-- Placeholders: {table}, {tenant_column}
-- Convention: Uses app.current_tenant

ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;
ALTER TABLE {table} FORCE ROW LEVEL SECURITY;

-- Primary isolation policy
CREATE POLICY tenant_isolation ON {table}
  USING ({tenant_column} = current_setting('app.current_tenant')::uuid);

-- Fail-safe: require context to be set
CREATE POLICY require_context ON {table}
  USING (current_setting('app.current_tenant', true) IS NOT NULL);
```

### Admin Bypass Pattern

```sql
-- BAM Admin Bypass Pattern
-- Use sparingly, always audit

CREATE POLICY admin_bypass ON {table}
  FOR ALL
  USING (current_setting('app.is_admin', true)::boolean = true)
  WITH CHECK (current_setting('app.is_admin', true)::boolean = true);
```

### Pattern Usage

| Placeholder | Replace With | Example |
|-------------|--------------|---------|
| `{table}` | Your table name | `orders` |
| `{tenant_column}` | Tenant FK column | `tenant_id` |

### Current Implementation Details

For version-specific optimizations and current best practices:
- Search: "PostgreSQL RLS performance optimization {date}"
- Search: "PostgreSQL 16 RLS new features {date}"
```

**Best Approach:**

1. **Pattern structure preserved verbatim**
2. **Placeholders documented in table**
3. **BAM conventions embedded in pattern**
4. **Web search for version-specific details**
5. **No version numbers in stored patterns** (search provides current)

---

### Element 4: Quality Gate Checks

**What it is:** Verification criteria for each quality gate.

**BMM Handling:**

```markdown
# quality-gates-reference.md

## Gate: QG-M2 (Tenant Isolation)

### Prerequisites
- QG-M1 (Module Architecture) PASSED

### Critical Checks (Must Pass)

| Check | Verification | Failure Action |
|-------|--------------|----------------|
| RLS enabled on all tenant tables | `SELECT relrowsecurity FROM pg_class` | Enable RLS |
| Tenant context propagation | Test with multiple tenant contexts | Fix context middleware |
| Cross-tenant query prevention | Attempt cross-tenant access | Add RLS policies |
| Admin bypass audit logging | Verify audit trail | Implement audit |

### Standard Checks (Should Pass)

| Check | Verification | Acceptable Deviation |
|-------|--------------|---------------------|
| Cache isolation | Verify key prefixes | Document exception |
| File path isolation | Check path structure | Document exception |
| Job tenant context | Inspect job payloads | Document exception |

### Recovery Protocol

```
Attempt 1: Fix identified issues
           ↓ (if fail)
Attempt 2: Review with architect, fix issues
           ↓ (if fail)
Attempt 3: MANDATORY COURSE CORRECTION
           Escalate to project leadership
```

### Verification Workflow

Run: `bmad-bam-validate-module` with mode=tenant-isolation

### Related Patterns

Load from registry: `bam-patterns.csv` WHERE verification_gate = 'QG-M2'
```

**Best Approach:**

1. **All checks preserved** (critical + standard)
2. **Verification methods specified**
3. **Failure actions defined**
4. **Recovery protocol included**
5. **Workflow reference for automation**

---

### Element 5: Decision Frameworks

**What it is:** Tables/matrices that guide pattern selection.

**BMM Handling:**

```markdown
# tenant-patterns-guide.md

## Decision Framework: Tenant Isolation Model

### Quick Decision Matrix

| Your Situation | Recommended Model | Confidence |
|----------------|-------------------|------------|
| <100 tenants, startup | RLS | High |
| 100-1000 tenants, standard SaaS | RLS | High |
| Regulated industry (finance, health) | Schema | High |
| Enterprise with compliance requirements | Database | High |
| Mixed tiers (free + enterprise) | Hybrid | Medium |

### Detailed Decision Tree

```
START: How many tenants?
│
├─► <1000 tenants
│   │
│   └─► Regulated industry?
│       ├─► YES → Schema Isolation
│       └─► NO → RLS (recommended)
│
├─► 1000-10000 tenants
│   │
│   └─► Need schema-level customization?
│       ├─► YES → Schema Isolation
│       └─► NO → RLS with sharding
│
└─► >10000 tenants
    │
    └─► Enterprise tier?
        ├─► YES → Database Isolation
        └─► NO → RLS with sharding + caching
```

### Trade-off Analysis

| Factor | RLS | Schema | Database |
|--------|-----|--------|----------|
| Setup complexity | Low | Medium | High |
| Operational cost | Low | Medium | High |
| Isolation strength | Medium | High | Maximum |
| Query performance | Good | Good | Best |
| Backup granularity | Tenant-filtered | Per-schema | Per-database |
| Migration complexity | Low | Medium | High |

### Decision Criteria (Pattern Registry Reference)

```
tenant-rls:      "<1000 tenants AND shared-tables AND cost-efficient"
tenant-schema:   "regulated-industry OR moderate-isolation"  
tenant-database: "enterprise-tier AND maximum-isolation"
```
```

**Best Approach:**

1. **Quick matrix for common cases**
2. **Decision tree for complex cases**
3. **Trade-off table for evaluation**
4. **Registry reference for authoritative criteria**
5. **No implementation details** (that's in patterns section)

---

### Element 6: Workflow Steps

**What it is:** Step-by-step process for implementing patterns.

**BMM Handling:**

```markdown
# Composite Workflow: bmad-bam-tenant-setup

## Workflow Structure

src/workflows/bmad-bam-tenant-setup/
├── SKILL.md
├── workflow.md
└── steps/
    ├── step-01-c-assess-requirements.md      # Was in tenant-requirements
    ├── step-02-c-select-isolation-model.md   # Was in tenant-model-isolation
    ├── step-03-c-design-rls-policies.md      # Was in tenant-isolation-design
    ├── step-04-c-design-context-propagation.md
    ├── step-05-c-design-cache-isolation.md
    ├── step-06-c-design-file-isolation.md
    ├── step-07-c-design-job-isolation.md
    ├── step-08-c-integration-plan.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-update-isolation.md
    ├── step-20-v-validate-isolation.md       # Runs QG-M2
    ├── step-21-v-test-cross-tenant.md
    └── step-22-v-generate-report.md
```

**Step File Structure (BMM Pattern):**

```markdown
# step-02-c-select-isolation-model.md

## Purpose

Select the appropriate tenant isolation model based on project requirements.

## Prerequisites

- Step 01 complete (requirements assessed)
- **Load guide:** `tenant-patterns-guide.md` §Decision Framework
- **Load patterns:** `bam-patterns.csv` WHERE category = 'tenant-isolation'

## Actions

### 1. Evaluate Decision Criteria

Using the decision framework from the tenant guide:

| Criterion | Your Project | Notes |
|-----------|--------------|-------|
| Tenant count | | From requirements |
| Regulated industry? | | Compliance needs |
| Enterprise tier needed? | | Customer requirements |
| Schema customization? | | Feature requirements |

### 2. Select Model

Based on evaluation, select from pattern registry:
- `tenant-rls` if: <1000 tenants AND cost-efficient
- `tenant-schema` if: regulated OR moderate-isolation
- `tenant-database` if: enterprise AND maximum-isolation

### 3. Document Decision

Record in architecture document:
- Selected model
- Decision rationale
- Trade-offs accepted

## Verification

- [ ] Decision criteria evaluated against project
- [ ] Model selected matches criteria
- [ ] Decision documented with rationale

## Outputs

- Updated architecture document with tenant model selection

## Next Step

Proceed to `step-03-c-design-rls-policies.md` (or appropriate model step)
```

**Best Approach:**

1. **Composite workflows** group related steps
2. **Steps reference patterns** by ID
3. **Steps reference guide sections** for context
4. **No implementation code** in steps (pattern + web search)
5. **Clear verification criteria**
6. **Clear outputs and next steps**

---

### Element 7: Template Structures

**What it is:** Output document templates with placeholders.

**BMM Handling:**

```markdown
# templates/tenant-isolation-design-template.md

---
name: tenant-isolation-design
description: Template for tenant isolation architecture decisions
category: architecture
version: 1.0
---

# Tenant Isolation Design

**Project:** {{project_name}}
**Date:** {{date}}
**Author:** {{author}}

## Selected Model

**Model:** {{tenant_model}}
**Rationale:** {{selection_rationale}}

## Isolation Configuration

### Database Isolation

| Dimension | Strategy | Implementation |
|-----------|----------|----------------|
| Tables | {{table_strategy}} | {{table_implementation}} |
| Queries | {{query_strategy}} | {{query_implementation}} |

### Cache Isolation

**Key Pattern:** `tenant:{{tenant_id_placeholder}}:{{namespace}}:{{key}}`

### File Isolation

**Path Pattern:** `tenants/{{tenant_id_placeholder}}/{{category}}/{{filename}}`

## Context Propagation

```typescript
// Context setup pattern
{{context_propagation_code}}
```

## Quality Gate: QG-M2

| Check | Status | Notes |
|-------|--------|-------|
| RLS enabled | {{rls_status}} | |
| Context propagation | {{context_status}} | |
| Cross-tenant prevention | {{crosstest_status}} | |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | {{date}} | {{author}} | Initial design |
```

**Best Approach:**

1. **YAML frontmatter** for metadata
2. **Double-brace placeholders** `{{variable}}`
3. **Section structure** matches workflow outputs
4. **Quality gate integration**
5. **Change log** for versioning

---

### Element 8: Extensions

**What it is:** Agent capability enhancements.

**BMM Handling:** Extensions are UNCHANGED in consolidation.

```yaml
# extensions/architect-bam.yaml (UNCHANGED)

agent:
  metadata:
    extends: 'bmad-agent-architect'
    module: 'bam'

menu:
  - trigger: bam-tenant-context
    action: "#load-tenant-context-prompt"
    description: Load BAM tenant architecture context
    
  # UPDATE: Reference consolidated guide instead of individual file
  - trigger: bam-tenant-patterns
    action: "#load-tenant-patterns-prompt"
    description: Load tenant isolation patterns

prompts:
  - id: load-tenant-context-prompt
    content: |
      Read and internalize the BAM tenant patterns guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/tenant-patterns-guide.md`
      
      Focus on the §Conventions and §Decision Framework sections.
      
      Confirm when loaded.
      
  - id: load-tenant-patterns-prompt
    content: |
      Load tenant isolation patterns from:
      `{project-root}/_bmad/bam/data/agent-guides/bam/tenant-patterns-guide.md`
      
      Sections: §RLS Patterns, §Schema Patterns, §Database Patterns
      
      Also query pattern registry for current decision criteria:
      `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-*
```

**Best Approach:**

1. **Extensions unchanged** in structure
2. **Prompt references updated** to consolidated guides
3. **Section references added** for specificity
4. **Pattern registry queries unchanged**

---

### Element 9: Conceptual Content

**What it is:** Explanations of what patterns are and why they matter.

**BMM Handling:**

```markdown
# tenant-patterns-guide.md

## Core Concepts

### What is Multi-Tenant Isolation?

Multi-tenant isolation ensures that each tenant's data, operations, and resources
are completely separated from other tenants, even when sharing infrastructure.

**The 8 Dimensions of Isolation:**

| Dimension | What to Isolate | Why It Matters |
|-----------|-----------------|----------------|
| Database | Rows, schemas, or databases | Data security |
| Cache | Cached values | Data leakage prevention |
| Memory | Agent memory/context | Privacy |
| Tools | Available tools per tenant | Feature control |
| Jobs | Background job execution | Resource fairness |
| Vectors | Embeddings and indexes | Search isolation |
| Logs | Log entries and traces | Audit separation |
| Files | Stored files and assets | Data ownership |

### Why Isolation Matters

1. **Security:** Prevent data leakage between tenants
2. **Compliance:** Meet regulatory requirements (GDPR, SOC2)
3. **Trust:** Customers expect their data is private
4. **Operations:** Isolate failures and resource usage

### Isolation vs. Efficiency Trade-off

```
More Isolation ◄─────────────────────────► More Efficiency
     │                                            │
     │  Database    Schema    RLS    Shared      │
     │  per-tenant  per-tenant        tables     │
     │                                            │
     │  Maximum     High      Medium  Low        │
     │  isolation   isolation isolation isolation│
     │                                            │
     │  Highest     High      Low     Lowest     │
     │  cost        cost      cost    cost       │
```
```

**Best Approach:**

1. **Conceptual overview** at start of guide
2. **Tables for quick understanding**
3. **Visual diagrams** where helpful
4. **Trade-off explanations** for decisions
5. **No implementation details** (in patterns section)

---

### Element 10: Cross-References

**What it is:** Links between patterns, guides, and workflows.

**BMM Handling:**

```markdown
# Cross-Reference Patterns

## In Pattern Registry (CSV)

dependencies: "tenant-rls,context-propagation"
conflicts: "tenant-database"
consolidated_guide: "tenant-patterns-guide.md"
section_anchor: "rls-patterns"

## In Domain Guides

### Related Patterns

See also:
- §Context Propagation (this guide)
- `agent-runtime-guide.md` §Tenant-Aware Agents
- `observability-guide.md` §Tenant-Scoped Logging

Load from registry:
- `bam-patterns.csv` → filter: `tenant-*`
- `bam-patterns.csv` → filter: `context-propagation`

### Related Workflows

- `bmad-bam-tenant-setup` - Implement tenant isolation
- `bmad-bam-validate-module` - Validate QG-M2

## In Workflow Steps

### Prerequisites

- **Load guide:** `tenant-patterns-guide.md` §RLS Patterns
- **Load patterns:** `bam-patterns.csv` WHERE pattern_id = 'tenant-rls'
- **Prior step:** `step-01-c-assess-requirements.md`
```

**Best Approach:**

1. **Pattern registry is authority** for pattern relationships
2. **Section anchors** (`§`) for within-guide references
3. **File + section** for cross-guide references
4. **Registry queries** for dynamic pattern loading
5. **Workflow references** for process connections

---

### Element 11: Web Search Queries

**What it is:** Queries for current implementation details.

**BMM Handling:**

```csv
# In pattern registry
web_queries: "PostgreSQL RLS multi-tenant {date};row level security performance {date}"
```

```markdown
# In domain guide

## Web Research

For current implementation details, search:

| Topic | Query |
|-------|-------|
| RLS syntax | "PostgreSQL RLS multi-tenant {date}" |
| Performance | "PostgreSQL RLS performance optimization {date}" |
| Testing | "RLS policy testing patterns {date}" |
| New features | "PostgreSQL 16 RLS features {date}" |

## In step files

### Current Best Practices

**Verify with web search:**
Search the web: "PostgreSQL RLS multi-tenant best practices {date}"
Search the web: "tenant isolation testing patterns {date}"
```

**Best Approach:**

1. **`{date}` placeholder** always used
2. **Registry stores queries** per pattern
3. **Guides list queries** by topic
4. **Step files invoke searches** at execution time
5. **Multiple queries** for comprehensive coverage

---

## The Complete BMM-Aligned Structure

### Pattern Registry (bam-patterns.csv)

```csv
pattern_id,name,category,decision_criteria,signals,intent,variants,decision_questions,web_queries,verification_gate,dependencies,conflicts,skill_level_notes,related_fragments,consolidated_guide,section_anchor

tenant-rls,Row-Level Security,tenant-isolation,"<1000 tenants AND shared-tables AND cost-efficient","multi-tenant,RLS,row-level",Implement row-level tenant isolation,basic;with-admin-bypass;with-audit,"How many tenants?;Regulated industry?;Cost sensitivity?","PostgreSQL RLS multi-tenant {date};row level security patterns {date}",QG-M2,context-propagation,tenant-database,"Basic: Single policy;Advanced: With admin bypass and audit",rls-best-practices,tenant-patterns-guide.md,rls-patterns
```

### Domain Guide Structure

```markdown
# {domain}-patterns-guide.md

## When to Load
[Trigger conditions]

## Integrates With  
[Agent roles]

---

## Core Concepts
[What this domain is about - conceptual]

## BAM Conventions
[BAM-specific naming, structure - MUST PRESERVE]

## Decision Framework
[How to choose between patterns - tables, trees]

---

## Pattern: {Pattern Name}
[For each pattern in this domain]

### Decision Criteria
[Reference to registry]

### Pattern Structure
[Code pattern with {placeholders}]

### BAM Implementation
[BAM-specific conventions applied]

### Web Research
[Queries for current details]

---

## Quality Gates
[Relevant gates for this domain]

## Related Patterns
[Cross-references]

## Related Workflows
[Process connections]
```

### Workflow Structure

```
bmad-bam-{domain}-{action}/
├── SKILL.md                    # Name MUST match directory
├── workflow.md                 # Mode router (Create/Edit/Validate)
└── steps/
    ├── step-01-c-{action}.md   # Create mode steps
    ├── step-02-c-{action}.md
    ├── ...
    ├── step-10-e-load.md       # Edit mode steps
    ├── step-11-e-update.md
    ├── step-20-v-validate.md   # Validate mode steps
    ├── step-21-v-test.md
    └── step-22-v-report.md
```

### Quality Gate Structure

```markdown
# quality-gates-reference.md

## Gate: QG-{ID}

### Prerequisites
[Required prior gates]

### Critical Checks
[Must pass - table format]

### Standard Checks
[Should pass - table format]

### Recovery Protocol
[3-step recovery]

### Verification Workflow
[Workflow to run]

### Related Patterns
[Pattern registry query]
```

---

## Summary: The Best Approach

### For Each Preserved Element

| Element | BMM Location | Format | Access Pattern |
|---------|--------------|--------|----------------|
| Decision criteria | Pattern registry CSV | `decision_criteria` column | Query by pattern_id |
| BAM conventions | Domain guide §Conventions | Tables + code blocks | Load guide section |
| Code patterns | Domain guide §Patterns | Code blocks with `{placeholders}` | Load guide section |
| Quality gates | quality-gates-reference.md | Check tables + recovery | Load during validation |
| Decision frameworks | Domain guide §Decision | Tables + trees | Load guide section |
| Workflow steps | Composite workflow steps/ | Outcome-focused markdown | Execute workflow |
| Templates | templates/{name}.md | YAML frontmatter + `{{vars}}` | Load during output |
| Extensions | extensions/{agent}.yaml | YAML with prompts | Agent loads on trigger |
| Concepts | Domain guide §Concepts | Prose + tables + diagrams | Load guide start |
| Cross-references | Pattern registry + guides | Registry deps + §anchors | Follow references |
| Web queries | Pattern registry + guides | `{date}` placeholder | Execute at runtime |

### The Flow

```
1. User request arrives

2. AI queries pattern registry
   → Gets matching patterns with decision_criteria
   → Gets consolidated_guide and section_anchor

3. AI loads relevant guide section
   → Gets concepts, conventions, patterns
   → Gets decision framework

4. AI evaluates decision criteria
   → Selects appropriate pattern

5. AI executes web search
   → Gets current implementation details

6. AI executes workflow
   → Follows steps with pattern references
   → Uses templates for outputs

7. AI validates via quality gate
   → Checks all requirements
   → Uses recovery if needed

8. Output delivered
   → Current, tailored, verified
```

---

## File Count Summary

| Component | Files | Purpose |
|-----------|-------|---------|
| Pattern registry | 1 | All 300+ patterns |
| Domain guides | 13 | All domain knowledge |
| Framework guides | 4 | LangGraph, CrewAI, etc. |
| Reference guides | 5 | Quality gates, decisions, etc. |
| Quick start guides | 3 | Getting started |
| Composite workflows | 40 | All processes |
| Templates | 60 | All outputs |
| Checklists | 20 | All verifications |
| Extensions | 31 | Agent enhancements |
| **Total** | **~180** | **100% capability** |

---

**This is the BMM way: Minimal files, maximum capability, always current.**
