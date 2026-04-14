---
title: Pattern Registry Reference
description: Complete reference for BAM pattern registry CSV files
category: reference
---

# Pattern Registry Reference

The BAM pattern registry is a set of CSV files that provide decision criteria, best practices, and web search queries for multi-tenant SaaS architecture patterns.

## Overview

| File | Purpose | Rows |
|------|---------|------|
| `bam-patterns.csv` | Core architectural patterns | 44 |
| `tenant-models.csv` | Tenant isolation strategies | 6 |
| `ai-runtimes.csv` | AI orchestration frameworks | 16 |
| `quality-gates.csv` | Quality gate definitions | 13 |
| `compliance-frameworks.csv` | Compliance requirements | 16 |
| `section-pattern-map.csv` | Document section mappings | 17 |

## File Location

All pattern registry files are located in:
```
{project-root}/_bmad/bam/data/
```

## Common Columns

All CSVs include a `web_queries` column with search queries using `{date}` placeholder:

```csv
pattern_id,...,web_queries
tenant-rls,...,"PostgreSQL RLS multi-tenant {date};row level security patterns {date}"
```

The `{date}` placeholder is resolved at runtime to the current year.

---

## bam-patterns.csv

Core architectural patterns for multi-tenant SaaS.

### Schema

| Column | Type | Description |
|--------|------|-------------|
| `pattern_id` | string | Unique identifier (e.g., `tenant-rls`) |
| `name` | string | Human-readable name |
| `category` | string | Pattern category |
| `decision_criteria` | string | When to use this pattern |
| `signals` | string | Indicators this pattern is needed |
| `related_patterns` | string | Related pattern IDs |
| `web_queries` | string | Search queries with `{date}` |

### Categories

- Tenant isolation (`tenant-*`)
- Agent runtime (`agent-*`)
- Integration (`facade-*`, `event-*`)
- Operations (`observability-*`, `backup-*`)
- Compliance (`compliance-*`, `audit-*`)

### Usage in Step Files

```markdown
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`
```

---

## tenant-models.csv

Tenant isolation strategy comparison.

### Schema

| Column | Type | Description |
|--------|------|-------------|
| `model` | string | Isolation model name |
| `signals` | string | When to consider this model |
| `when_to_use` | string | Ideal scenarios |
| `when_not_to_use` | string | Avoid scenarios |
| `compliance_fit` | string | Compliance compatibility |
| `complexity` | string | Implementation complexity |
| `storage_overhead` | string | Storage cost impact |
| `isolation_strength` | string | Security isolation level |
| `query_performance` | string | Performance characteristics |
| `migration_complexity` | string | Difficulty to migrate |
| `web_queries` | string | Research queries |

### Models

| Model | Isolation | Use Case |
|-------|-----------|----------|
| `row-level-security` | Shared tables with RLS | <1000 tenants, cost-efficient |
| `schema-per-tenant` | Separate schemas | Regulated industries |
| `database-per-tenant` | Separate databases | Enterprise, max isolation |
| `hybrid-rls-schema` | RLS + schema separation | Mixed requirements |
| `cell-based` | Geographic cells | Global scale |
| `silo` | Complete separation | Highest compliance |

---

## ai-runtimes.csv

AI agent orchestration framework comparison.

### Schema

| Column | Type | Description |
|--------|------|-------------|
| `runtime` | string | Framework name |
| `signals` | string | When to consider |
| `when_to_use` | string | Ideal scenarios |
| `when_not_to_use` | string | Avoid scenarios |
| `state_management` | string | State handling approach |
| `multi_agent` | string | Multi-agent support |
| `human_in_loop` | string | Human interaction support |
| `streaming` | string | Streaming capability |
| `tenant_isolation` | string | Tenant separation support |
| `complexity` | string | Implementation complexity |
| `web_queries` | string | Research queries |

### Runtimes

| Runtime | Best For | Complexity |
|---------|----------|------------|
| `langgraph` | State machines, workflows | Medium |
| `crewai` | Role-based collaboration | Medium |
| `autogen` | Multi-agent conversations | High |
| `dspy` | Prompt optimization | Medium |
| `instructor` | Structured outputs | Low |
| `semantic-kernel` | Enterprise integration | Medium |
| `haystack` | RAG pipelines | Medium |
| `llamaindex` | Document processing | Medium |

---

## quality-gates.csv

Quality gate definitions and criteria.

### Schema

| Column | Type | Description |
|--------|------|-------------|
| `gate_id` | string | Gate identifier (e.g., `QG-F1`) |
| `gate_name` | string | Human-readable name |
| `phase` | string | BMAD phase |
| `required_patterns` | string | Patterns that must be applied |
| `verification_tests` | string | Tests to run |
| `blocking` | boolean | Blocks progress if failed |
| `checklist_file` | string | Associated checklist |
| `pass_criteria` | string | What constitutes passing |
| `fail_recovery` | string | Recovery actions |
| `dependencies` | string | Prerequisite gates |
| `soft_gate_steps` | string | Steps with soft gates |
| `entry_workflows` | string | Workflows entering this gate |
| `exit_workflows` | string | Workflows after this gate |
| `web_queries` | string | Research queries |

### Gate Sequence

```
QG-F1 (Foundation)
    ├── QG-M1 (Module Architecture)
    ├── QG-M2 (Tenant Isolation)
    └── QG-M3 (Agent Runtime)
            ├── QG-I1 (Convergence)
            │   ├── QG-I2 (Tenant Safety)
            │   └── QG-I3 (Agent Safety)
            └── QG-P1 (Production)
```

---

## compliance-frameworks.csv

Compliance framework requirements matrix.

### Schema

| Column | Type | Description |
|--------|------|-------------|
| `framework` | string | Framework name (GDPR, SOC2, etc.) |
| `category` | string | Requirement category |
| `requirement` | string | Specific requirement |
| `tenant_impact` | string | Impact on tenant design |
| `implementation` | string | How to implement |
| `verification` | string | How to verify |
| `web_queries` | string | Research queries |

---

## section-pattern-map.csv

Maps document sections to relevant patterns.

### Schema

| Column | Type | Description |
|--------|------|-------------|
| `section` | string | Document section name |
| `patterns` | string | Relevant pattern IDs |
| `templates` | string | Associated templates |
| `guides` | string | Relevant agent guides |
| `web_queries` | string | Research queries |

---

## Using the Pattern Registry

### In Step Files

Reference patterns with the `Load patterns:` directive:

```markdown
## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

## Actions

Using decision criteria from loaded patterns...
```

### In Agent Guides

```markdown
## Related Patterns

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `tenant-*`

### Web Research

Use `web_queries` column for current best practices:
- Search: "{query from CSV with {date} resolved}"
```

### In Extensions

```yaml
prompts:
  - id: analyze-patterns-prompt
    content: |
      Load pattern registry:
      `{project-root}/_bmad/bam/data/bam-patterns.csv`
      
      Filter by: {user_criteria}
      
      Analyze decision_criteria and web_queries columns.
```

---

## Adding New Patterns

1. Open the appropriate CSV file
2. Add a new row following the schema
3. Include `web_queries` with `{date}` placeholder
4. Reference from step files using `Load patterns:` directive
5. Run `npm test` to validate

```csv
new-pattern,New Pattern Name,category,"decision criteria","signal1;signal2",related-pattern,"search query {date}"
```

---

## Web Search Integration

The `web_queries` column enables dynamic research:

1. Step file references pattern
2. Agent extracts `web_queries` value
3. `{date}` resolved to current year
4. Web search executed
5. Results inform recommendations

Example flow:
```
Step: Load patterns → tenant-rls
CSV: web_queries = "PostgreSQL RLS multi-tenant {date}"
Resolved: "PostgreSQL RLS multi-tenant 2026"
Search: Current best practices returned
Output: Recommendations with _Source: [URL]_ citations
```
