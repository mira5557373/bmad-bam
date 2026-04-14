# Step 4: Create Runbook

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Create an operational runbook for M&A tenant consolidation, including pre-flight checks, execution procedures, rollback strategies, and post-merge verification.

---

## Prerequisites

- Step 3 completed: Account unification design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability
- **Load template:** `{project-root}/_bmad/bam/templates/runbook-template.md`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Pre-Flight Checklist

Document required checks before merge:

| Check | Query/Action | Expected Result | Blocking |
|-------|--------------|-----------------|----------|
| Both tenants active | Status API | status: active | Yes |
| Backups complete | Backup status | Both backed up <24h | Yes |
| No active jobs | Job queue | 0 running jobs | Yes |
| Admin consent | Consent records | Both admins consented | Yes |
| Conflicts assessed | Conflict scan | All conflicts resolved | Yes |
| Downtime scheduled | Maintenance window | Window confirmed | Yes |
| Rollback tested | Dry run | Rollback verified | Yes |

### 2. Document Execution Procedure

Create step-by-step merge procedure:

| Step | Action | Actor | Duration | Rollback |
|------|--------|-------|----------|----------|
| 1 | Enable maintenance mode | System | 1min | Disable maintenance |
| 2 | Create merge record | System | <1min | Delete record |
| 3 | Lock both tenants | System | <1min | Unlock tenants |
| 4 | Execute data migration | System | 30-120min | Restore from backup |
| 5 | Merge user accounts | System | 5-30min | Restore user data |
| 6 | Update references | System | 10-30min | Restore references |
| 7 | Consolidate billing | System | 5min | Restore billing |
| 8 | Verify integrity | System | 15min | N/A |
| 9 | Disable source tenant | System | 1min | Re-enable |
| 10 | Unlock target tenant | System | 1min | N/A |
| 11 | Disable maintenance mode | System | 1min | N/A |
| 12 | Send notifications | System | 5min | N/A |

### 3. Design Rollback Strategy

Define rollback procedures:

| Failure Point | Detection | Rollback Action | Data Impact |
|---------------|-----------|-----------------|-------------|
| Pre-migration | Pre-flight fail | Abort, no changes | None |
| During migration | Migration error | Restore both from backup | Full restore |
| Post-migration, pre-unlock | Verification fail | Restore target from backup | Minimal |
| Post-unlock (<24h) | Critical issues | Emergency restore | Some data loss |
| Post-unlock (>24h) | Major issues | Manual remediation | Not possible |

### 4. Define Monitoring During Merge

Document monitoring requirements:

| Metric | Normal | Warning | Critical | Dashboard |
|--------|--------|---------|----------|-----------|
| Migration progress | On schedule | >10% behind | >25% behind | Merge Dashboard |
| Error rate | 0% | <0.1% | >0.1% | Merge Dashboard |
| Data integrity | 100% | <99.9% | <99% | Data Dashboard |
| User complaints | 0 | <5 | >5 | Support Dashboard |
| System resources | <70% | <85% | >85% | Infra Dashboard |

### 5. Create Operations Checklist

Define operational tasks:

| Task | Timing | Owner | Verification |
|------|--------|-------|--------------|
| Schedule merge window | T-14 | Ops | Calendar confirmed |
| Notify stakeholders | T-7 | CS | All notified |
| Backup verification | T-1 | Ops | Backups verified |
| Execute pre-flight | T-0 | Ops | All green |
| Execute merge | T-0 | Ops | Success |
| Verify completion | T+0 | QA | Integrity verified |
| Monitor 24h | T+1 | Support | No critical issues |
| Debrief and cleanup | T+7 | All | Lessons learned |

**Verify current best practices with web search:**
Search the web: "M&A data migration runbook best practices {date}"
Search the web: "tenant consolidation operations procedures {date}"

_Source: [URL]_

---

## Quality Gates

- [ ] Pre-flight checklist comprehensive
- [ ] Execution procedure step-by-step
- [ ] Rollback strategy for all phases
- [ ] Monitoring defined
- [ ] Operations checklist complete
- [ ] Runbook reviewed by operations team

---

## COLLABORATION MENUS (A/P/C):

After completing the runbook above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific operational procedures
- **P (Party Mode)**: Bring SRE and operations perspectives on runbook completeness
- **C (Continue)**: Accept runbook and complete Create mode
- **[Specific refinements]**: Describe runbook concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: pre-flight, execution, rollback procedures
- Process enhanced insights on operational completeness
- Ask user: "Accept these refined runbook procedures? (y/n)"
- If yes, integrate into runbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review M&A consolidation runbook for operational readiness"
- Process SRE and operations perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete M&A consolidation design and runbook
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Complete Create mode workflow

---

## Verification

- [ ] Pre-flight checklist defined
- [ ] Execution procedure complete
- [ ] Rollback strategy comprehensive
- [ ] Monitoring requirements defined
- [ ] Operations checklist created
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete M&A consolidation design
- Data merging specifications
- Account unification procedures
- Operational runbook
- **Output to:** `{output_folder}/planning-artifacts/operations/tenant-merge-acquisition-design.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/merge-acquisition-runbook.md`

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete (Create Mode)

Create mode complete for tenant-merge-acquisition workflow. The following artifacts have been produced:

1. M&A scenario analysis
2. Data merging specifications
3. Account unification procedures
4. Operational runbook with rollback and monitoring
