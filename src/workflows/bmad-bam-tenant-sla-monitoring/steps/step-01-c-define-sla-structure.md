# Step 1: Define SLA Structure

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define SLA structure with tier-specific commitments.

---

## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`

---

## Actions

### 1. Define SLA Metrics by Tier

| Metric | FREE | PRO | ENTERPRISE |
|--------|------|-----|------------|
| Uptime | 99.0% | 99.9% | 99.99% |
| Response time P95 | 500ms | 200ms | 100ms |
| Support response | 48 hours | 4 hours | 1 hour |
| Data durability | 99.9% | 99.99% | 99.999% |

### 2. SLA Calculation Windows

| Window Type | Duration | Use Case |
|-------------|----------|----------|
| Monthly | Calendar month | Standard SLA |
| Rolling 30-day | Last 30 days | Continuous compliance |
| Quarterly | 3 months | Enterprise contracts |

### 3. Exclusions

| Exclusion | Description |
|-----------|-------------|
| Scheduled maintenance | Pre-announced windows |
| Customer-caused | Actions by tenant |
| Force majeure | External events |
| Third-party | Upstream dependencies |

**Verify current best practices with web search:**
Search the web: "SaaS SLA structure best practices {date}"
Search the web: "multi-tenant SLA definitions {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to monitoring design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1]`
- Proceed to: `step-02-c-design-monitoring.md`

---

## Verification

- [ ] SLA metrics defined per tier
- [ ] Calculation windows specified
- [ ] Exclusions documented

---

## Outputs

- SLA metrics matrix by tier (FREE, PRO, ENTERPRISE)
- Calculation window specifications with use cases
- SLA exclusion definitions and descriptions
- Design decisions documented in frontmatter

---

## Next Step

Proceed to `step-02-c-design-monitoring.md`.
