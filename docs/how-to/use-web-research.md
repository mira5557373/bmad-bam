# How to Use Web Research in BAM Workflows

This guide explains how BAM leverages web search for verifying current best practices during solutioning workflows.

## Overview

BAM uses targeted web search following the **BMM solutioning pattern** (targeted verification, not mandatory blocking). This approach ensures architecture decisions are informed by up-to-date information without creating workflow bottlenecks.

## When to Use Web Research

| Situation | Use Web Search | Rationale |
|-----------|----------------|-----------|
| Technology decisions | **Yes** | Verify current versions and best practices |
| Architecture pattern selection | **Yes** | Get up-to-date implementation guidance |
| Compliance verification | **Yes** | Regulations change frequently |
| Validating existing content | **No** | Edit/Validate modes verify, don't research |
| Loading patterns from CSV | **No** | CSV already has web_queries to execute |

### Appropriate Contexts

- **Create mode steps** (step-01-c through step-09-c): Research new patterns
- **Solutioning workflows**: Verify technology recommendations
- **Agent guides**: Include research topics for context loading

### Not Appropriate

- **Edit mode**: Focuses on modifying existing artifacts
- **Validate mode**: Verifies against known criteria
- **Runtime execution**: Decisions already made

## Search Directive Format

Step files use the following directive to invoke web search:

```markdown
Search the web: "{topic} best practices {date}"
Search the web: "{technology} patterns {date}"
```

The `{date}` placeholder is resolved at runtime to the current year (e.g., 2026).

### Standard Patterns

```markdown
Search the web: "multi-tenant isolation patterns {date}"
Search the web: "PostgreSQL RLS best practices {date}"
Search the web: "LangGraph agent orchestration {date}"
Search the web: "modular monolith architecture patterns {date}"
```

### Domain-Specific Examples

**Tenant Isolation:**
```markdown
Search the web: "row level security PostgreSQL performance {date}"
Search the web: "schema per tenant isolation patterns {date}"
```

**AI Runtime:**
```markdown
Search the web: "LangGraph state management patterns {date}"
Search the web: "CrewAI multi-agent orchestration {date}"
```

**Compliance:**
```markdown
Search the web: "SOC2 multi-tenant compliance {date}"
Search the web: "GDPR data isolation requirements {date}"
```

## Source Citation Format

When incorporating web research findings, cite sources using the following format:

```markdown
_Source: [URL]_
```

### Citation Examples

```markdown
Based on current best practices for RLS implementation:
- Use `SET LOCAL` instead of `SET` for connection pooling compatibility
- Enable RLS before creating policies

_Source: [https://example.com/postgresql-rls-guide]_
```

## Integration with Pattern Registry

BAM's pattern registry CSV files include a `web_queries` column that provides pre-defined search queries for each pattern.

### How It Works

1. Step files reference patterns: `**Load patterns:** bam-patterns.csv -> filter: tenant-isolation`
2. Agent extracts `web_queries` column from pattern CSV
3. Agent resolves `{date}` placeholder to current year
4. Web search is executed with resolved queries
5. Results inform recommendations with current best practices

### Pattern Registry Structure

```csv
pattern_id,name,category,decision_criteria,web_queries,related_patterns
tenant-rls,Row-Level Security,tenant-isolation,"<1000 tenants, shared tables","PostgreSQL RLS multi-tenant best practices {date}",tenant-schema
```

## BMM Solutioning Pattern vs Analysis Pattern

BAM follows the **solutioning pattern**, not the analysis pattern:

| Analysis Pattern (BMM 1-analysis) | Solutioning Pattern (BAM) |
|-----------------------------------|---------------------------|
| `NEVER generate without web search` | `Use web search to verify` |
| 4+ parallel searches per step | 1-3 targeted searches |
| Abort if web search unavailable | Proceed with pattern registry |
| Citations required for all findings | Citations for key findings |

The solutioning pattern is less strict because:
- Pattern registry provides baseline knowledge
- Decisions are iterative and can be refined
- Quality gates catch issues before production

## Step File Integration

### Prerequisites Section

```markdown
## Prerequisites

- Master architecture document loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation
- **Web research (if available):** Search for current isolation best practices
```

### Actions Section

```markdown
## Actions

### 1. Evaluate Isolation Patterns

**Verify current best practices with web search:**
Search the web: "multi-tenant isolation patterns {date}"
Search the web: "PostgreSQL RLS best practices {date}"

Reference patterns from pattern registry and incorporate any updated guidance from web research.
```

## Extension Menu Items

Each BAM extension includes a web research menu item following this pattern:

```yaml
menu:
  - trigger: bam-{domain}-research
    action: "#web-research-{domain}-prompt"
    description: Conduct web research for {domain} decisions

prompts:
  - id: web-research-{domain}-prompt
    content: |
      ## BAM Web Research - {Domain}

      Execute web searches for current best practices:

      Search the web: "{domain} patterns multi-tenant {date}"
      Search the web: "{domain} best practices enterprise SaaS {date}"

      Reference pattern registry for search topics:
      `{project-root}/_bmad/bam/data/bam-patterns.csv`

      Synthesize findings and present recommendations.
```

## Agent Guide Integration

Agent guides include a `### Web Research` section listing relevant search queries:

```markdown
### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "tenant isolation patterns {date}"
- Search: "multi-tenant architecture best practices {date}"
- Search: "RLS performance optimization {date}"
```

## Troubleshooting

### Web Search Not Available

If web search is unavailable:
1. Proceed with pattern registry knowledge
2. Document limitation in output
3. Flag for manual verification during review

### Stale Results

If web results seem outdated:
1. Verify the `{date}` placeholder was resolved
2. Try more specific search terms
3. Check multiple authoritative sources

### Conflicting Information

When sources conflict:
1. Prefer official documentation
2. Weight recent sources higher
3. Document the conflict and chosen approach

## Related

- [Pattern Registry Reference](../reference/pattern-registry.md)
- [Create Master Architecture](create-master-architecture.md)
- [Agent Guides](../reference/agent-guides.md)
