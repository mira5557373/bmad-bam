# ADR-002: Pattern Registry Design

## Status

Accepted

## Date

2026-04-01

## Context

BAM initially used static knowledge fragments (markdown files) to store architectural patterns. This approach had several problems:

1. **Staleness** - Patterns become outdated as technologies evolve
2. **Duplication** - Similar content repeated across multiple files
3. **No Decision Criteria** - Hard to determine which pattern applies when
4. **File Proliferation** - 79+ markdown files became difficult to maintain
5. **Manual Updates** - Required human intervention to keep patterns current

The BMAD Method's solutioning pattern uses web search to verify current best practices, but BAM's static knowledge fragments couldn't leverage this capability effectively.

## Decision

Replace static knowledge fragments with a **Pattern Registry** system using CSV files with web search integration.

### Registry Architecture

Six CSV files replace 79+ markdown knowledge fragments:

| File | Purpose |
|------|---------|
| `bam-patterns.csv` | Core architectural patterns |
| `tenant-models.csv` | Tenant isolation strategies |
| `ai-runtimes.csv` | AI orchestration frameworks |
| `quality-gates.csv` | Gate requirements |
| `compliance-frameworks.csv` | Regulatory compliance |
| `section-pattern-map.csv` | Document section mapping |

### CSV Schema

Each CSV includes these columns:

```csv
pattern_id,name,category,decision_criteria,web_queries,related_patterns
```

The `web_queries` column contains search queries with `{date}` placeholder:

```csv
tenant-rls,Row-Level Security,tenant-isolation,"<1000 tenants, shared tables","PostgreSQL RLS multi-tenant best practices {date}",tenant-schema
```

### Web Search Integration

Step files reference patterns, and the agent:
1. Reads the CSV row
2. Extracts `web_queries` column
3. Resolves `{date}` placeholder (e.g., 2026)
4. Executes web search
5. Incorporates current best practices with `_Source: [URL]_` citations

### Step File Pattern

```markdown
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`

**Verify current best practices with web search:**
Search the web: "PostgreSQL RLS multi-tenant best practices {date}"
```

## Consequences

### Positive

1. **Self-Refreshing Content** - Web queries fetch current information
2. **Decision Criteria** - CSV columns define when to use each pattern
3. **Reduced File Count** - 6 CSVs replace 79+ markdown files
4. **Machine Readable** - CSVs are easily parsed and queried
5. **Consistent Structure** - All patterns follow same schema
6. **BMM Alignment** - Follows solutioning pattern for web verification

### Negative

1. **Loss of Code Examples** - CSVs can't include code snippets
2. **Learning Curve** - Contributors must understand CSV schema
3. **Web Dependency** - Quality depends on web search availability
4. **Citation Overhead** - Must cite sources for all findings

### Mitigations

- Agent guides still contain detailed explanations and examples
- Templates include Web Research Queries sections
- Pattern registry provides decision criteria for offline selection
- Web search is targeted verification, not mandatory blocking

## Implementation Notes

### Pattern Reference in Steps

```markdown
## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `{pattern_id}`

## Actions

### 1. Select Tenant Model

Reference decision criteria from `tenant-models.csv`:
| Model | When to Use | Isolation Strength |
|-------|-------------|-------------------|
| RLS | <1000 tenants | Moderate |
| Schema | Regulated industries | High |
| Database | Enterprise tier | Maximum |
```

### Web Query Format

```csv
web_queries
"topic one best practices {date};topic two patterns {date};specific query {date}"
```

Multiple queries separated by semicolons.

## Related Decisions

- ADR-001: Extension-Only Module Architecture
- ADR-003: Unified Steps Directory
