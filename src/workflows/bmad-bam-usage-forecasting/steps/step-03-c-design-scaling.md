# Step 3: Design Scaling Recommendations

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design auto-scaling recommendations based on forecasts.

---

## Prerequisites

- Step 2 completed (Models designed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Scaling Triggers

| Trigger | Condition | Action | Lead Time |
|---------|-----------|--------|-----------|
| Predictive | Forecast > 80% capacity | Scale up | 30 min ahead |
| Reactive | Current > 70% capacity | Scale up | Immediate |
| Cost Opt | Forecast < 40% capacity | Scale down | 1 hour |
| Emergency | Current > 95% capacity | Emergency scale | Immediate |

### 2. Resource Scaling

| Resource | Scaling Unit | Min | Max | Cooldown |
|----------|--------------|-----|-----|----------|
| Compute | Instance | 3 | 100 | 5 min |
| Database | Read replicas | 1 | 10 | 15 min |
| Cache | Node | 2 | 20 | 10 min |
| Queue | Partition | 4 | 32 | 5 min |

### 3. Capacity Alerts

| Alert Level | Threshold | Recipient | Action |
|-------------|-----------|-----------|--------|
| Info | 60% forecast | Ops | Monitor |
| Warning | 80% forecast | Ops + Lead | Investigate |
| Critical | 95% forecast | All | Scale immediately |
| Emergency | 100%+ actual | Exec | Incident |

### 4. Budget Integration

| Forecast Type | Budget Impact | Review Cadence |
|---------------|---------------|----------------|
| Capacity increase | Cost projection | Weekly |
| Sustained growth | Budget request | Monthly |
| Seasonal peak | Pre-approval | Quarterly |
| Emergency scale | Retrospective | Per-incident |

**Verify current best practices with web search:**
Search the web: "predictive auto-scaling strategies {date}"
Search the web: "capacity planning automation cloud {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into scaling policies
- **P (Party Mode)**: Bring SRE and finance perspectives
- **C (Continue)**: Accept scaling design and complete Create mode
```

#### If 'C' (Continue):
- Save complete forecasting design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Output to: `{output_folder}/planning-artifacts/analytics/usage-forecasting-design.md`
- Create mode complete

---

## Verification

- [ ] Scaling triggers defined
- [ ] Resource limits documented
- [ ] Alerts configured
- [ ] Budget integration planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete forecasting design document
- Scaling policy specifications
- Alert configuration
- Budget projections

---

## Next Step

Create mode complete. Based on outcome:
- **Success**: Proceed to implementation
- **Refinement needed**: Use Edit mode
- **Validation required**: Use Validate mode
