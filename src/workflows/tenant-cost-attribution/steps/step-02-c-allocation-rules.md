# Step 2: Allocation Rules

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Define detailed allocation rules and formulas for attributing costs to tenants accurately and fairly.

---

## Prerequisites

- Step 1 completed: Cost categories defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

### 1. Define Direct Allocation Rules

Rules for directly attributable costs:

| Cost | Allocation Formula | Data Source | Frequency |
|------|-------------------|-------------|-----------|
| LLM tokens | `tokens_used * price_per_token` | Metering API | Real-time |
| Storage | `bytes_stored * price_per_GB` | Storage metrics | Daily |
| API calls | `calls_made * price_per_call` | API gateway | Real-time |
| Agent runs | `runs_completed * price_per_run` | Run logs | Real-time |
| Data transfer | `bytes_transferred * price_per_GB` | Network metrics | Daily |

### 2. Define Proportional Allocation Rules

Rules for shared resource costs:

| Cost | Allocation Formula | Basis | Frequency |
|------|-------------------|-------|-----------|
| Compute | `tenant_cpu_seconds / total_cpu_seconds * total_compute_cost` | CPU usage | Hourly |
| Memory | `tenant_memory_bytes / total_memory_bytes * total_memory_cost` | Memory usage | Hourly |
| Database | `tenant_queries / total_queries * total_db_cost` | Query count | Daily |
| Cache | `tenant_cache_ops / total_cache_ops * total_cache_cost` | Operations | Daily |
| Network | `tenant_traffic / total_traffic * total_network_cost` | Bytes | Daily |

### 3. Define Fixed Allocation Rules

Rules for platform base costs:

| Cost | Allocation Formula | Basis | Frequency |
|------|-------------------|-------|-----------|
| Platform base | `base_cost / active_tenant_count` | Equal split | Monthly |
| Security | `security_cost / active_tenant_count` | Equal split | Monthly |
| Compliance | `compliance_cost / active_tenant_count` | Equal split | Monthly |
| Monitoring base | `monitoring_base / active_tenant_count` | Equal split | Monthly |

### 4. Define Tiered Allocation Rules

Rules based on tenant tier:

| Tier | Base Fee | Compute Weight | Support Weight | SLA Credit |
|------|----------|----------------|----------------|------------|
| Free | $0 | 0.5x | 0x | None |
| Pro | $50/mo | 1.0x | 1.0x | 10% of bill |
| Enterprise | Custom | 1.5x | 2.0x | Custom |

### 5. Design Metering Pipeline

Define how usage data is collected:

| Stage | Action | Output | Frequency |
|-------|--------|--------|-----------|
| Collection | Gather raw metrics | Raw events | Continuous |
| Enrichment | Add tenant context | Tagged events | Continuous |
| Aggregation | Rollup by period | Hourly summaries | Hourly |
| Rating | Apply pricing | Rated usage | Daily |
| Reconciliation | Match to billing | Invoice items | Monthly |

### 6. Define Unit Economics Model

Calculate cost per unit:

| Metric | Calculation | Target | Current |
|--------|-------------|--------|---------|
| Cost per tenant | Total cost / Tenants | < $X | ${current} |
| Cost per API call | Infra cost / Total calls | < $0.001 | ${current} |
| Cost per LLM token | LLM cost / Total tokens | < $0.002 | ${current} |
| Cost per agent run | Agent infra / Total runs | < $0.10 | ${current} |
| Gross margin | (Revenue - COGS) / Revenue | > 70% | {current}% |

### 7. Define Allocation Disputes Process

Handle allocation disagreements:

| Stage | Action | Owner | SLA |
|-------|--------|-------|-----|
| Raise dispute | Tenant submits concern | Tenant | Anytime |
| Review | Validate metering data | Finance | 3 days |
| Investigate | Check for anomalies | Engineering | 5 days |
| Resolve | Adjust or explain | Finance | 2 days |
| Credit | Issue credit if valid | Billing | 1 day |

**Verify current best practices with web search:**
Search the web: "SaaS cost allocation formulas {date}"
Search the web: "multi-tenant metering best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the allocation rules above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific allocation formulas
- **P (Party Mode)**: Bring finance and customer success perspectives
- **C (Continue)**: Accept rules and proceed to chargeback reports
- **[Specific refinements]**: Describe allocation concerns

Select an option:
```

#### If 'C' (Continue):
- Save allocation rules to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-chargeback-reports.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the cost model foundation.**

Present summary of:
- Cost categories and classification
- Allocation rules and formulas
- Unit economics targets

Ask for confirmation before proceeding to reporting.

---

## Verification

- [ ] Direct allocation rules defined
- [ ] Proportional allocation rules defined
- [ ] Fixed allocation rules defined
- [ ] Tiered allocation rules defined
- [ ] Metering pipeline designed
- [ ] Unit economics model created
- [ ] Disputes process documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Allocation rule definitions
- Metering pipeline design
- Unit economics model
- Disputes process

---

## Next Step

Proceed to `step-03-c-chargeback-reports.md` to design reporting.
