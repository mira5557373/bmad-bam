# Step 1: Define Backup Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define comprehensive tenant backup strategy covering all data types.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: disaster-recovery`

---

## Actions

### 1. Define Backup Scope

| Data Type | Storage | Backup Method | Isolation |
|-----------|---------|---------------|-----------|
| PostgreSQL | RDS/Aurora | Snapshots + WAL | Tenant-filtered |
| Redis Cache | ElastiCache | Snapshots | Namespace-isolated |
| S3 Objects | S3 | Cross-region replication | Prefix-isolated |
| Vector Store | Qdrant/Pinecone | API export | Collection-isolated |
| Search Index | OpenSearch | Snapshots | Index-isolated |

### 2. Backup Frequency

| Tier | Full Backup | Incremental | WAL/Continuous |
|------|-------------|-------------|----------------|
| FREE | Weekly | Daily | No |
| PRO | Daily | Hourly | Yes |
| ENTERPRISE | Daily | 15 min | Yes |

### 3. Retention Policies

| Tier | Daily | Weekly | Monthly | Yearly |
|------|-------|--------|---------|--------|
| FREE | 7 days | 4 weeks | N/A | N/A |
| PRO | 30 days | 12 weeks | 6 months | N/A |
| ENTERPRISE | 90 days | 52 weeks | 24 months | 7 years |

### 4. Cross-Region Replication

| Data Type | Primary Region | DR Region | Sync Method |
|-----------|----------------|-----------|-------------|
| Database | us-east-1 | us-west-2 | Async replica |
| Objects | us-east-1 | us-west-2 | S3 CRR |
| Vectors | us-east-1 | us-west-2 | Scheduled export |

**Verify current best practices with web search:**
Search the web: "multi-tenant backup strategy best practices {date}"
Search the web: "tenant-isolated disaster recovery SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the backup strategy, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into retention and compliance requirements
- **P (Party Mode)**: Bring architect and operations perspectives for strategy review
- **C (Continue)**: Accept backup strategy and proceed to restore procedures
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save backup strategy to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-restore-procedures.md`

---

## Verification

- [ ] Backup scope covers all data types
- [ ] Frequency defined per tier
- [ ] Retention policies established
- [ ] Cross-region replication configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Backup scope matrix
- Frequency and retention policies
- Replication strategy
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-backup-plan-template.md`

---

## Next Step

Proceed to `step-02-c-design-restore-procedures.md` to define recovery workflows.
