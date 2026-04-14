# Step 4: Design Reporting

## Purpose

Design compliance reporting and dashboard capabilities.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all steps in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each step produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 3 completed

**Web Research (Required):**

Search the web: "compliance reporting dashboard best practices {date}"
Search the web: "compliance status visualization multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Report Types

| Report | Audience | Frequency |
|--------|----------|-----------|
| Compliance score | Internal | Real-time |
| Control status | Security team | Daily |
| Audit readiness | Compliance | Weekly |
| Executive summary | Leadership | Monthly |
| Tenant compliance | Per tenant | On-demand |

### 2. Dashboard Elements

| Element | Metric | Visualization |
|---------|--------|---------------|
| Compliance score | % controls passing | Gauge |
| Control status | By category | Heatmap |
| Trend | Score over time | Line chart |
| Gaps | Failing controls | Table |
| Evidence status | Collection completeness | Progress |

### 3. Alerting

| Condition | Severity | Notification |
|-----------|----------|--------------|
| Control failure | High | Slack + Email |
| Score decline | Medium | Email |
| Evidence gap | Medium | Slack |
| Audit deadline | High | All channels |

### 4. Self-Service

| Tier | Capabilities |
|------|-------------|
| FREE | Basic compliance score |
| PRO | Full dashboard + reports |
| ENTERPRISE | Custom reports + API |

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to assembly
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to: `step-05-c-assembly.md`

---

## Verification

- [ ] Report types defined
- [ ] Dashboard elements specified
- [ ] Alerting configured
- [ ] Self-service access documented

---

## Outputs

- Report type specifications with audience and frequency
- Dashboard element designs with visualizations
- Alerting rules and notification channels
- Self-service access matrix by tier
- Design decisions documented in frontmatter

---

## Next Step

Proceed to `step-05-c-assembly.md` to combine all designs into the final compliance continuous verification document.
