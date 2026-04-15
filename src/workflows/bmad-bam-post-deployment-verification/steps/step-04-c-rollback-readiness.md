# Step 4: Rollback Readiness Verification

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

Verify that rollback capability is ready and tested for the current deployment. This includes checking previous version availability, rollback procedure documentation, database migration reversibility, and estimated rollback time.

---

## Prerequisites

- Step 3 completed (tenant health checks passed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `deployment`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`

---

## Inputs

- Previous deployment version
- Rollback procedure documentation
- Database migration history
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Verify Previous Version Availability

Confirm rollback target is available:

| Component | Current Version | Rollback Target | Available |
|-----------|-----------------|-----------------|-----------|
| Application | v2.1.0 | v2.0.0 | [ ] |
| Database Schema | migration_045 | migration_044 | [ ] |
| Configuration | config_v2.1 | config_v2.0 | [ ] |
| AI Models | model_v3 | model_v2 | [ ] |

### 2. Review Rollback Procedure

Verify rollback documentation:
- Step-by-step rollback instructions exist
- Responsible parties identified
- Communication plan documented
- Estimated downtime calculated

### 3. Database Migration Reversibility

Check database migration can be reversed:
- Down migration scripts exist
- Data transformation reversible
- No destructive schema changes
- Tenant data integrity maintained

### 4. Rollback Time Estimation

Calculate and validate rollback timeline:

| Phase | Activity | Estimated Time |
|-------|----------|----------------|
| Decision | Approve rollback | 5 min |
| Notification | Alert stakeholders | 5 min |
| Application | Deploy previous version | 10 min |
| Database | Run down migrations | 15 min |
| Verification | Smoke tests | 10 min |
| **Total** | | **45 min** |

### 5. Optional: Dry Run Rollback

If time permits and environment allows:
- Execute rollback in staging
- Verify rollback completes successfully
- Run smoke tests on rolled-back version
- Document any issues encountered

**Soft Gate Checkpoint**

**Steps 1-4 complete the post-deployment verification.** Present a summary of smoke tests, monitoring status, tenant health, and rollback readiness. Ask for confirmation before finalizing.

**Verify current best practices with web search:**
Search the web: "production rollback procedure best practices {date}"
Search the web: "deployment rollback SLA requirements {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing rollback readiness verification, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into rollback scenarios and risks
- **P (Party Mode)**: Bring SRE and release engineering perspectives
- **C (Continue)**: Accept rollback readiness and finalize verification
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass rollback context: version availability, procedure, timeline
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into rollback readiness report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review rollback readiness: {summary of availability and timeline}"
- Process collaborative analysis from SRE and release engineering personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save rollback readiness report to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final post-deployment verification report

---

## Verification

- [ ] Previous version artifacts available
- [ ] Rollback procedure documented
- [ ] Database migrations reversible
- [ ] Rollback time within SLA (<15 min target)
- [ ] Patterns align with pattern registry

---

## Outputs

- Rollback readiness checklist
- Rollback procedure confirmation
- Estimated rollback timeline
- Post-deployment verification report (complete)
- **Load template:** `{project-root}/_bmad/bam/data/templates/rollback-procedure-template.md`

---

## Next Step

Post-deployment verification complete. Recommend running validation mode to verify against QG-PD1 criteria if formal gate passage required.
