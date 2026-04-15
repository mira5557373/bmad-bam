# Step 6: Cost Controls

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
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Implement cost control mechanisms for memory optimization including storage tiering, cold storage offloading, compression ratios, and cleanup schedules.

---

## Prerequisites

- Steps 1-5 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: cost-optimization
- **Web research (if available):** Search for memory cost optimization strategies

---

## Inputs

- Performance tuning from Step 5
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Design Storage Tiering

| Tier | Storage Class | Cost/GB/mo | Access Time | Use Case |
|------|---------------|------------|-------------|----------|
| Hot | Redis/Memory | $X | <5 ms | Active sessions |
| Warm | SSD | $X | <50 ms | Recent user data |
| Cold | Object Storage | $X | <500 ms | Archived data |
| Glacier | Archive | $X | Hours | Compliance |

### 2. Configure Automatic Tiering

| Data Age | Current Tier | Target Tier | Trigger |
|----------|--------------|-------------|---------|
| 0-7 days | Hot | Hot | None |
| 7-30 days | Hot | Warm | Age |
| 30-90 days | Warm | Cold | Age + access |
| 90+ days | Cold | Glacier | Age |

### 3. Calculate Cost Projections

| Component | Current | Optimized | Savings |
|-----------|---------|-----------|---------|
| Hot storage | [ ] USD/mo | [ ] USD/mo | [ ] % |
| Warm storage | [ ] USD/mo | [ ] USD/mo | [ ] % |
| Cold storage | [ ] USD/mo | [ ] USD/mo | [ ] % |
| Total | [ ] USD/mo | [ ] USD/mo | [ ] % |

### 4. Design Cleanup Schedules

| Job | Schedule | Target | Expected Savings |
|----|----------|--------|------------------|
| Session cleanup | Hourly | Expired sessions | [ ] GB/day |
| User memory compaction | Daily | Inactive users | [ ] GB/day |
| Tenant archive | Weekly | Cold tenant data | [ ] GB/week |
| Orphan cleanup | Daily | Deleted references | [ ] GB/day |

### 5. Implement Cost Alerts

| Alert | Threshold | Action | Notification |
|-------|-----------|--------|--------------|
| Tier overspend | >20% budget | Investigate | Ops team |
| Storage growth | >30%/month | Capacity plan | Platform team |
| Anomaly detection | Statistical | Investigate | Auto-ticket |

**Verify current best practices with web search:**
Search the web: "cloud storage tiering cost optimization {date}"
Search the web: "memory cost reduction strategies SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the cost controls analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tiering and cost projections
- **P (Party Mode)**: Bring finance and platform engineering perspectives
- **C (Continue)**: Accept cost controls and proceed to monitoring
- **[Specific refinements]**: Describe cost concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: storage tiering, cost projections, cleanup schedules
- Process enhanced insights on cost optimization
- Ask user: "Accept these refined cost decisions? (y/n)"
- If yes, integrate into cost specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review memory cost controls for budget efficiency"
- Process finance and platform engineering perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save cost controls to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-monitoring.md`

---

## Verification

- [ ] Storage tiering designed
- [ ] Automatic tiering configured
- [ ] Cost projections calculated
- [ ] Cleanup schedules defined
- [ ] Cost alerts implemented
- [ ] Patterns align with pattern registry

---

## Outputs

- Cost control specification
- Storage tiering design
- Cost projection model
- Cleanup schedule configuration

---

## Next Step

Proceed to `step-07-c-monitoring.md` to design monitoring.
