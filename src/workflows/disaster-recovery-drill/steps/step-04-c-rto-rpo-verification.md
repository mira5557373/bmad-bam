# Step 4: RTO/RPO Verification

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions


---

## Purpose

Measure and verify Recovery Time Objective (RTO) and Recovery Point Objective (RPO) against targets. This completes the DR drill with documented evidence of recovery capability.

---

## Prerequisites

- Step 3 completed (recovery validated)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `sla`

---

## Inputs

- DR drill timeline from previous steps
- RTO/RPO targets from DR plan
- Data timestamps for RPO calculation
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Calculate Recovery Time (RTO)

Measure time from disaster declaration to full recovery:

| Phase | Start Time | End Time | Duration |
|-------|------------|----------|----------|
| Detection | | | |
| Declaration | | | |
| Failover | | | |
| Validation | | | |
| **Total RTO** | | | |

### 2. Measure Data Loss (RPO)

Calculate data loss from last consistent state:

| Data Type | Last Primary | First DR | Gap (RPO) |
|-----------|--------------|----------|-----------|
| Database | | | |
| Cache | | | |
| Events | | | |
| AI State | | | |

### 3. Compare Against Targets

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| RTO | 30 min | | [ ] MET / [ ] NOT MET |
| RPO | 5 min | | [ ] MET / [ ] NOT MET |

### 4. Document Findings

Record drill outcomes:

| Finding | Severity | Description | Remediation |
|---------|----------|-------------|-------------|
| | | | |

### 5. Failback Planning

Plan return to primary:
- [ ] Primary environment restored
- [ ] Data sync to primary complete
- [ ] Failback procedure documented
- [ ] Failback window scheduled

**Soft Gate Checkpoint**

**Steps 1-4 complete the DR drill.** Present a summary of execution, failover, recovery, and RTO/RPO measurements. Ask for confirmation before finalizing.

**Verify current best practices with web search:**
Search the web: "RTO RPO measurement best practices {date}"
Search the web: "disaster recovery SLA verification {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing RTO/RPO verification, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into RTO/RPO improvements
- **P (Party Mode)**: Bring SRE and management perspectives for review
- **C (Continue)**: Accept measurements and finalize drill
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

#### If 'C' (Continue):
- Save RTO/RPO measurements to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final DR drill report

---

## Verification

- [ ] RTO calculated and documented
- [ ] RPO measured and documented
- [ ] Targets compared with actuals
- [ ] Findings documented
- [ ] Failback planned
- [ ] Patterns align with pattern registry

---

## Outputs

- RTO/RPO measurement report
- Drill findings and recommendations
- Failback plan
- DR drill report (complete)
- **Load template:** `{project-root}/_bmad/bam/templates/rto-rpo-measurement-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/dr-drill-report-template.md`

---

## Next Step

DR drill complete. Recommend running validation mode to verify against QG-DR1 criteria if formal gate passage required.
