# How to Add a New Pattern

This guide covers adding patterns to the BAM pattern registry CSV files.

## Prerequisites

- BAM module installed
- Understanding of pattern categories
- Access to `src/data/` directory

## Overview

BAM uses a pattern registry (CSV files) instead of static knowledge fragments. The registry provides:

- Decision criteria for pattern selection
- Web queries with `{date}` placeholder for current best practices
- Related patterns for comprehensive guidance

## Pattern Registry Files

| File | Purpose |
|------|---------|
| `bam-patterns.csv` | Core patterns (isolation, runtime, architecture) |
| `tenant-models.csv` | Tenant isolation strategies |
| `ai-runtimes.csv` | AI framework patterns |
| `quality-gates.csv` | Quality gate requirements |
| `compliance-frameworks.csv` | Compliance matrix |
| `section-pattern-map.csv` | Section to pattern mapping |

## Steps

### 1. Identify Target CSV File

Choose the appropriate CSV file based on pattern category:

| Category | File |
|----------|------|
| Tenant isolation | `bam-patterns.csv` or `tenant-models.csv` |
| AI/Agent runtime | `bam-patterns.csv` or `ai-runtimes.csv` |
| Architecture | `bam-patterns.csv` |
| Quality gates | `quality-gates.csv` |
| Compliance | `compliance-frameworks.csv` |

### 2. Add Row to bam-patterns.csv

The main pattern registry has the following columns:

| Column | Required | Description |
|--------|----------|-------------|
| pattern_id | Yes | Unique identifier (lowercase, hyphenated) |
| category | Yes | Pattern category (e.g., `security`, `ai`, `tenant`) |
| signals | Yes | Keywords that trigger pattern selection |
| intent | Yes | What problem this pattern solves |
| variants | Yes | Semi-colon separated implementation variants |
| decision_questions | Yes | Questions to ask when selecting this pattern |
| web_queries | Yes | Search queries with `{date}` placeholder |
| verification_gate | Yes | Quality gate that verifies this pattern |
| dependencies | No | Other patterns this depends on |
| conflicts | No | Patterns that conflict with this one |
| skill_level_notes | No | Basic vs Advanced implementation notes |
| related_fragments | Yes | Related knowledge references |

### 3. Format the CSV Row

```csv
pattern_id,category,signals,intent,variants,decision_questions,web_queries,verification_gate,dependencies,conflicts,skill_level_notes,related_fragments
```

**Example:**

```csv
rate-limiting,operations,"high traffic variance,API abuse,resource exhaustion",Per-tenant rate limiting,"token-bucket;sliding-window;fixed-window;adaptive","What rate limits per tier?;Burst handling needed?;Per-endpoint vs global limits?","rate limiting multi-tenant SaaS {date};token bucket per-tenant {date}",QG-P1,tenant-routing,,"Basic: Fixed rate per tenant;Advanced: Adaptive rate limiting with tier awareness",rate-limiting;api-gateway-patterns
```

### 4. Use {date} Placeholder in web_queries

The `{date}` placeholder is resolved at runtime to the current year. This ensures search queries always find current best practices.

**Correct:**
```csv
"rate limiting multi-tenant SaaS {date};token bucket per-tenant {date}"
```

**Incorrect:**
```csv
"rate limiting multi-tenant SaaS 2024;token bucket per-tenant 2024"
```

### 5. Reference Pattern from Step Files

Step files reference patterns using the `**Load patterns:**` directive:

```markdown
## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`
```

Multiple patterns can be filtered:

```markdown
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting, quota-management`
```

### 6. Update Related Agent Guides

If the pattern applies to specific domains, update the relevant agent guide:

```markdown
## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Rate limiting patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `operations`

### Web Research

Use the `web_queries` column from pattern registry:
- Search: "rate limiting multi-tenant SaaS {date}"
- Search: "token bucket per-tenant {date}"
```

### 7. Run Tests to Validate

```bash
npm test
```

Tests verify:
- CSV is valid (proper column count)
- pattern_id is unique
- web_queries contains `{date}` placeholder
- verification_gate references valid gate
- Related fragments exist

## Pattern ID Naming Convention

| Pattern | Format | Example |
|---------|--------|---------|
| Security | `{concept}` | `tenant-isolation` |
| AI/Agent | `agent-{concept}` | `agent-runtime` |
| Operations | `{operation}` | `rate-limiting` |
| Integration | `{integration-type}` | `webhook-delivery` |

## Decision Questions Format

Questions are semi-colon separated:

```csv
"What rate limits per tier?;Burst handling needed?;Per-endpoint vs global limits?"
```

Questions should:
- Be concise
- Help differentiate between variants
- Guide pattern selection

## Web Queries Format

Queries are semi-colon separated:

```csv
"rate limiting multi-tenant SaaS {date};token bucket per-tenant {date}"
```

Best practices:
- Include domain context (multi-tenant, SaaS)
- Use specific technology names
- Always include `{date}` placeholder
- Limit to 2-3 queries per pattern

## Complete Example

**Adding a new caching pattern:**

```csv
caching-strategy,operations,"high read volume,response latency,tenant data caching",Multi-Level Caching,"local-cache;distributed-cache;cdn;write-through;write-behind","What cache invalidation strategy?;Per-tenant cache isolation?;Cache warming needed?","{date} multi-tenant caching patterns;{date} cache invalidation strategies SaaS",QG-M2,tenant-routing,,"Basic: Simple key-value cache;Advanced: Multi-level with tenant-aware invalidation",rate-limiting;performance-isolation
```

**Reference in step file:**

```markdown
## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `caching-strategy`

## Actions

### 1. Select Caching Strategy

Reference patterns from pattern registry and apply decision questions:
- What cache invalidation strategy?
- Per-tenant cache isolation?
- Cache warming needed?

**Verify current best practices with web search:**
Search the web: "multi-tenant caching patterns {date}"
Search the web: "cache invalidation strategies SaaS {date}"

_Source: [URL]_
```

## Related

- [Add Workflow](add-workflow.md) - Creating workflows that use patterns
- [Use Web Research](use-web-research.md) - Web search integration
- [CLAUDE.md](../../CLAUDE.md) - Full reference documentation
