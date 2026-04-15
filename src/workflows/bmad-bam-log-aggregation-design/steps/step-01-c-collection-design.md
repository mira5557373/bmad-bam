# Step 1: Design Log Collection

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design log collection pipeline and storage architecture.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability

---

## Actions

### 1. Log Sources

| Source | Log Types | Format | Volume |
|--------|-----------|--------|--------|
| Application | Request, error, debug | JSON | High |
| Infrastructure | System, container | Syslog/JSON | Medium |
| Database | Query, audit | Native | Medium |
| AI/LLM | Prompt, response, trace | JSON | Very High |
| Security | Auth, access, threat | CEF/JSON | Low |

### 2. Collection Pipeline

| Component | Purpose | Technology Options |
|-----------|---------|-------------------|
| Agent | Local collection | Fluent Bit, Vector, Filebeat |
| Aggregator | Central processing | Fluentd, Logstash |
| Transport | Message queue | Kafka, Kinesis |
| Storage | Long-term retention | S3, Elasticsearch, ClickHouse |
| Index | Fast search | Elasticsearch, Loki |

### 3. Log Schema

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| timestamp | ISO8601 | Yes | Event time |
| tenant_id | string | Yes | Tenant isolation |
| service | string | Yes | Source service |
| level | enum | Yes | Severity |
| message | string | Yes | Log content |
| trace_id | string | No | Distributed trace |
| user_id | string | No | User context |
| request_id | string | No | Request correlation |

### 4. Retention Policy

| Log Type | Hot Storage | Warm Storage | Archive | Total |
|----------|-------------|--------------|---------|-------|
| Application | 7 days | 30 days | 1 year | 1 year |
| Audit | 30 days | 90 days | 7 years | 7 years |
| Security | 30 days | 90 days | 3 years | 3 years |
| Debug | 3 days | 7 days | None | 7 days |

**Verify current best practices with web search:**
Search the web: "log aggregation architecture best practices {date}"
Search the web: "multi-tenant logging isolation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing collection design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into pipeline architecture
- **P (Party Mode)**: Bring SRE and security perspectives
- **C (Continue)**: Accept collection design and proceed to tenant isolation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save collection design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-tenant-isolation.md`

---

## Verification

- [ ] Log sources identified
- [ ] Collection pipeline designed
- [ ] Log schema defined
- [ ] Retention policy established
- [ ] Patterns align with pattern registry

---

## Outputs

- Log source catalog
- Pipeline architecture
- Schema specification

---

## Next Step

Proceed to `step-02-c-tenant-isolation.md` to design tenant isolation.
