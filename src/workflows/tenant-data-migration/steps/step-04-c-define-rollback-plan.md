# Step 4: Define Rollback Plan

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Define comprehensive rollback procedures for each migration phase to ensure safe recovery from failures.

---

## Prerequisites

- Step 3: Create Migration Runbook completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: disaster-recovery`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Rollback Decision Matrix

Establish criteria for rollback decisions:

| Severity | Criteria | Decision | Authority |
|----------|----------|----------|-----------|
| Critical | Data loss detected, integrity failure | Immediate rollback | On-call engineer |
| High | Multiple phase failures, > 1 hour delay | Rollback if no resolution in 30 min | Migration lead |
| Medium | Single phase retry failed | Continue to next phase or rollback | Migration lead |
| Low | Performance degradation | Continue with monitoring | On-call engineer |

### 2. Phase-Specific Rollback Procedures

**Rollback from Phase 1 (Tenant Configuration):**
```
Trigger: Configuration import failed or integrity mismatch
Actions:
  1. Delete target tenant record from primary database
  2. Remove any created RLS policies or schema
  3. Set source tenant status back to ACTIVE
  4. Document failure reason
Verification: Source tenant operational, target cleaned up
Duration: 5 minutes
```

**Rollback from Phase 2 (User Accounts):**
```
Trigger: User import failed or permission mismatch
Actions:
  1. Delete all users from target Keycloak organization
  2. Delete target Keycloak organization
  3. Execute Phase 1 rollback
Verification: No orphaned users in target Keycloak
Duration: 10 minutes
```

**Rollback from Phase 3 (Agent Configurations):**
```
Trigger: Agent configuration import failed or validation failed
Actions:
  1. Delete all agent configurations from target
  2. Execute Phase 2 rollback
Verification: No orphaned agent records
Duration: 10 minutes
```

**Rollback from Phase 4 (Historical Data):**
```
Trigger: Data integrity issues or excessive duration
Actions:
  1. Truncate historical tables in target (tenant-scoped)
  2. Option A: Execute full rollback (Phases 3, 2, 1)
  3. Option B: Mark migration as partial, proceed without history
Decision: Based on business priority
Duration: 15-30 minutes depending on data volume
```

**Rollback from Phase 5 (Vector Embeddings):**
```
Trigger: Vector import failed or search validation failed
Actions:
  1. Delete target tenant namespace in vector store
  2. Option A: Execute full rollback
  3. Option B: Schedule async re-embedding
Duration: 5-60 minutes depending on volume
```

**Rollback from Phase 6 (File Attachments):**
```
Trigger: File copy failed or integrity mismatch
Actions:
  1. Delete target S3 prefix
  2. Remove file reference updates
  3. Option A: Execute full rollback
  4. Option B: Continue with missing files flagged
Duration: Variable based on file count
```

**Rollback from Phase 7 (Traffic Cutover):**
```
Trigger: Target not serving traffic correctly, errors detected
Actions:
  1. Immediately revert routing rules
  2. Set source tenant to ACTIVE
  3. Set target tenant to FAILED_MIGRATION
  4. Alert operations team
  5. Schedule post-mortem
Duration: 2 minutes
```

### 3. Define Point-of-No-Return

After traffic cutover with successful verification:

| Condition | Point of No Return |
|-----------|-------------------|
| Dual-write disabled | Source no longer receiving writes |
| Source cleanup initiated | Source data deletion started |
| 24-hour verification | All checks pass for 24 hours |

**After Point-of-No-Return:**
- Full rollback requires restore from backup
- Estimated restore time: 2-4 hours
- Data loss: Writes since cutover

### 4. Create Rollback Testing Plan

| Test | Frequency | Method |
|------|-----------|--------|
| Phase 1-3 rollback | Each migration | Execute in staging first |
| Full rollback | Quarterly | Dedicated test migration |
| Backup restore | Monthly | Restore to test environment |

### 5. Document Emergency Contacts

| Role | Primary | Secondary | Escalation |
|------|---------|-----------|------------|
| Migration Lead | {Name} | {Name} | VP Engineering |
| DBA | {Name} | {Name} | Migration Lead |
| Infrastructure | {Name} | {Name} | Migration Lead |
| Customer Success | {Name} | {Name} | VP Customer Success |

**Verify current best practices with web search:**
Search the web: "define rollback plan best practices {date}"
Search the web: "define rollback plan enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the rollback plan above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into failure scenarios and recovery edge cases
- **P (Party Mode)**: Bring operations and architect perspectives for rollback review
- **C (Continue)**: Accept rollback plan and finalize migration documentation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass rollback context: decision matrix, phase procedures, point-of-no-return
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into rollback plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review rollback plan: {summary of procedures and decision criteria}"
- Process collaborative analysis from operations and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save rollback plan to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final migration runbook at `{output_folder}/planning-artifacts/migration-runbook.md`

---

## Verification

- [ ] Rollback decision matrix defined
- [ ] All phases have rollback procedures
- [ ] Rollback procedures are tested
- [ ] Point-of-no-return documented
- [ ] Emergency contacts listed
- [ ] Backup restore procedure verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete rollback plan document
- Rollback scripts for each phase
- Emergency contact list
- **Load template:** `{project-root}/_bmad/bam/templates/migration-runbook-template.md`

---

## Final Output

Generate the final migration runbook at:
`{output_folder}/planning-artifacts/migration-runbook.md`

Include:
1. Migration scope assessment (from Step 1)
2. Strategy selection and phases (from Step 2)
3. Execution procedures (from Step 3)
4. Rollback plan (from Step 4)

---

## Next Step

Migration plan complete. Execute using the runbook during scheduled maintenance window.

For modifications, use Edit mode (step-10-e-load-migration.md).
For validation, use Validate mode (step-20-v-load-migration.md).
