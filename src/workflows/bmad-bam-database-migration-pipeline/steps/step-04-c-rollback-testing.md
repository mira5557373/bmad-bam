# Step 4: Rollback Testing

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices


---

## Purpose

Test migration rollback procedures to ensure quick recovery if issues arise. This completes the migration pipeline with verified rollback capability.

---

## Prerequisites

- Step 3 completed (tenant impact assessed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rollback`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`

---

## Actions

### 1. Document Rollback Procedure

| Step | Action | Script | Duration |
|------|--------|--------|----------|
| 1 | Stop application | | |
| 2 | Run down migration | rollback.sql | |
| 3 | Verify rollback | verify.sql | |
| 4 | Restart application | | |

### 2. Test Rollback (if safe to do so)

In staging or isolated environment:
- [ ] Execute rollback script
- [ ] Verify data restored
- [ ] Application functional
- [ ] Tenant data intact

### 3. Document Rollback Triggers

| Trigger | Threshold | Detection | Auto-Rollback |
|---------|-----------|-----------|---------------|
| Error rate | >5% | Monitoring | No |
| Data corruption | Any | Alerts | No |
| Performance degradation | >2x | Monitoring | No |

### 4. Rollback Readiness Confirmation

- [ ] Rollback script tested
- [ ] Estimated rollback time: __ minutes
- [ ] DBA on-call for rollback
- [ ] Stakeholders aware of rollback plan

**Soft Gate Checkpoint**

**Steps 1-4 complete the migration pipeline.** Present a summary of execution, validation, tenant impact, and rollback readiness. Ask for confirmation before finalizing.

**Verify current best practices with web search:**
Search the web: "database migration rollback testing {date}"
Search the web: "migration rollback strategy production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing rollback testing, if 'C' (Continue):
- Save rollback test results to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final migration pipeline report

---

## Verification

- [ ] Rollback procedure documented
- [ ] Rollback tested (if applicable)
- [ ] Triggers documented
- [ ] Readiness confirmed
- [ ] Patterns align with pattern registry

---

## Outputs

- Rollback test results
- Rollback procedure documentation
- Migration pipeline report (complete)
- **Load template:** `{project-root}/_bmad/bam/data/templates/rollback-procedure-template.md`

---

## Next Step

Migration pipeline complete. Recommend running validation mode to verify against QG-MG1 criteria if formal gate passage required.
