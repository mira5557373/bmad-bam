# Step 2: Token Usage Tracking Per Tenant

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Implement token counting, configure per-tenant aggregation, set up budget enforcement hooks, and establish usage reporting for AI cost management.

---

## Prerequisites

- LLM metrics collection set up (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-cost

---

## Actions

### 1. Token Counting Implementation

| Count Type | Method | Accuracy |
|------------|--------|----------|
| Input tokens | tiktoken/provider API | Exact |
| Output tokens | Provider response | Exact |
| Cached tokens | Provider response | Exact |
| Total tokens | Calculated | Exact |

Token counting by model:
| Model | Tokenizer | Library |
|-------|-----------|---------|
| GPT-4 | cl100k_base | tiktoken |
| GPT-3.5 | cl100k_base | tiktoken |
| Claude | claude-tokenizer | anthropic |

### 2. Per-Tenant Aggregation

| Aggregation Level | Window | Storage | Queryable |
|-------------------|--------|---------|-----------|
| Per-request | Real-time | TimescaleDB | Yes |
| Per-hour | Hourly | TimescaleDB | Yes |
| Per-day | Daily | TimescaleDB | Yes |
| Per-month | Monthly | PostgreSQL | Yes |

Aggregation dimensions:
| Dimension | Example | Purpose |
|-----------|---------|---------|
| Tenant ID | tenant_123 | Billing |
| User ID | user_456 | Usage tracking |
| Model | gpt-4 | Cost analysis |
| Agent | research-agent | Attribution |

### 3. Budget Enforcement Hooks

| Budget Type | Enforcement | Action |
|-------------|-------------|--------|
| Daily limit | Pre-request check | Reject if exceeded |
| Monthly limit | Pre-request check | Reject if exceeded |
| Per-request limit | Pre-request check | Truncate/Reject |
| Warning threshold (80%) | Async | Alert tenant |

Budget configuration:
| Tier | Daily Tokens | Monthly Tokens | Per-Request |
|------|--------------|----------------|-------------|
| Enterprise | Unlimited | Unlimited | 128K |
| Pro | 1M | 20M | 32K |
| Free | 100K | 1M | 8K |

### 4. Usage Reporting

| Report | Frequency | Recipients | Format |
|--------|-----------|------------|--------|
| Tenant usage | Daily | Tenant admins | Dashboard |
| Billing summary | Monthly | Finance | PDF |
| Platform summary | Weekly | Engineering | Dashboard |
| Anomaly alerts | Real-time | Ops team | Slack |

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into budget enforcement
- **P (Party Mode)**: Bring finance and engineering perspectives
- **C (Continue)**: Accept tracking and proceed to latency monitoring
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save token usage tracking to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-latency-monitoring.md`

---

**Verify current best practices with web search:**
Search the web: "token usage tracking best practices {date}"
Search the web: "token usage tracking multi-tenant SaaS {date}"

## Verification

- [ ] Token counting implemented
- [ ] Per-tenant aggregation active
- [ ] Budget enforcement configured
- [ ] Usage reporting set up

---

## Outputs

- Token usage tracking configuration

---

## Next Step

Proceed to `step-03-c-latency-monitoring.md` to configure latency monitoring.
