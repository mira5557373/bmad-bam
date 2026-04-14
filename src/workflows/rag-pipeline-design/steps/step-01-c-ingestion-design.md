# Step 1: Ingestion Design

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

Design the data ingestion pipeline for RAG, including source connectors, preprocessing, tenant data segregation, and data freshness requirements.

---

## Prerequisites

- Master architecture document loaded
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: rag-patterns
- **Web research (if available):** Search for current RAG ingestion best practices

---

## Inputs

- User requirements for knowledge retrieval
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Data source inventory

---

## Actions

### 1. Identify Data Sources

Catalog all knowledge sources:

| Source Type | Format | Volume | Update Frequency | Tenant Scope |
|-------------|--------|--------|------------------|--------------|
| Documents | PDF, DOCX, MD | {estimate} | {frequency} | {scope} |
| APIs | REST, GraphQL | {estimate} | {frequency} | {scope} |
| Databases | SQL, NoSQL | {estimate} | {frequency} | {scope} |
| Web Content | HTML, RSS | {estimate} | {frequency} | {scope} |
| Code Repos | Git | {estimate} | {frequency} | {scope} |

### 2. Design Source Connectors

Define connector architecture:

| Connector | Authentication | Rate Limit | Error Handling |
|-----------|---------------|------------|----------------|
| File System | Service account | N/A | Retry with backoff |
| S3/GCS | IAM role | 5000 req/s | Circuit breaker |
| REST API | API key/OAuth | Per-endpoint | Retry + fallback |
| Database | Connection pool | Pool size | Reconnect |
| Git | SSH/PAT | API limits | Queue |

### 3. Define Preprocessing Pipeline

Design document processing:

| Stage | Operation | Tools | Output |
|-------|-----------|-------|--------|
| Extract | Parse content | Unstructured, PyPDF | Raw text |
| Clean | Remove noise | Regex, NLP | Clean text |
| Normalize | Standardize format | Unicode, encoding | UTF-8 text |
| Enrich | Add metadata | NER, classification | Enriched text |
| Validate | Quality check | Rules engine | Validated text |

### 4. Design Tenant Data Segregation

Define isolation strategy:

| Isolation Level | Implementation | Use Case | Cost |
|-----------------|----------------|----------|------|
| Namespace | Prefix/suffix | Default | Low |
| Collection | Separate collections | Pro tier | Medium |
| Database | Separate instances | Enterprise | High |
| Hybrid | Mixed approach | Multi-tier | Variable |

Tenant Metadata Requirements:

| Field | Type | Purpose |
|-------|------|---------|
| tenant_id | string | Primary isolation |
| tier | enum | Quota enforcement |
| region | string | Data residency |
| retention_days | int | Lifecycle |
| access_control | array | RBAC |

### 5. Define Incremental Update Strategy

Design change detection:

| Strategy | Detection Method | Overhead | Freshness |
|----------|-----------------|----------|-----------|
| Full Reindex | Periodic complete | High | Stale |
| Timestamp | Modified date | Low | Near real-time |
| Checksum | Content hash | Medium | Real-time |
| CDC | Database triggers | Low | Real-time |
| Webhooks | Event-driven | Minimal | Real-time |

### 6. Set Data Freshness Requirements

Define freshness SLAs per tier:

| Tier | Freshness Target | Update Frequency | Priority |
|------|------------------|------------------|----------|
| Free | 24 hours | Daily batch | Low |
| Pro | 1 hour | Hourly | Medium |
| Enterprise | 15 minutes | Near real-time | High |
| Real-time | < 1 minute | Streaming | Critical |

**Verify current best practices with web search:**
Search the web: "RAG data ingestion pipeline patterns {date}"
Search the web: "multi-tenant vector database ingestion {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the ingestion design analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into data sources and connector complexity
- **P (Party Mode)**: Bring data engineer and platform perspectives
- **C (Continue)**: Accept ingestion design and proceed to chunking strategy
- **[Specific refinements]**: Describe ingestion concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: data sources, connectors, tenant segregation
- Process enhanced insights on ingestion trade-offs
- Ask user: "Accept these refined ingestion decisions? (y/n)"
- If yes, integrate into ingestion specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review RAG ingestion pipeline design for multi-tenant AI platform"
- Process data engineer and platform perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save ingestion design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-chunking-strategy.md`

---

## Verification

- [ ] Data sources identified and cataloged
- [ ] Source connectors designed
- [ ] Preprocessing pipeline defined
- [ ] Tenant segregation strategy documented
- [ ] Incremental update strategy selected
- [ ] Freshness requirements defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Data source inventory
- Connector architecture
- Preprocessing pipeline design
- Tenant isolation strategy
- **Load template:** `{project-root}/_bmad/bam/templates/rag-architecture-template.md`

---

## Next Step

Proceed to `step-02-c-chunking-strategy.md` to define chunking approach.
