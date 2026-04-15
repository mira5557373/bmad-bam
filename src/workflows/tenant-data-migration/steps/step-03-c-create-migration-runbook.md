# Step 3: Create Migration Runbook

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

Create a detailed execution runbook with step-by-step procedures, commands, and verification steps for the migration.

---

## Prerequisites

- Step 2: Design Migration Strategy completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: disaster-recovery`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Pre-Migration Checklist

Create pre-migration verification steps:

| Check | Command/Action | Expected Result |
|-------|----------------|-----------------|
| Source tenant status | Verify tenant is ACTIVE | ACTIVE status confirmed |
| Source data backup | Create full backup | Backup ID recorded |
| Target environment ready | Health check target | All services healthy |
| Target capacity | Check quotas | Sufficient capacity |
| Maintenance window | Notify stakeholders | Confirmation received |
| Monitoring enabled | Verify alerting | Alerts configured |

### 2. Create Phase Execution Procedures

For each migration phase, document:

**Phase 1: Tenant Configuration Migration**
```
Pre-condition: Backup verified, target ready
Actions:
  1. Set source tenant to MIGRATING status
  2. Export tenant configuration
  3. Transform configuration for target environment
  4. Import configuration to target
  5. Verify configuration integrity
Post-condition: Target tenant exists in PROVISIONING status
Verification: Config hash match, all settings present
Rollback: Delete target tenant record
```

**Phase 2: User Account Migration**
```
Pre-condition: Phase 1 complete
Actions:
  1. Export Keycloak users for tenant
  2. Transform user records (update realm, org)
  3. Import users to target Keycloak
  4. Verify user count and permissions
Post-condition: All users exist in target
Verification: User count match, sample login test
Rollback: Delete target users from Keycloak
```

**Phase 3: Agent Configuration Migration**
```
Pre-condition: Phase 2 complete
Actions:
  1. Export agent configurations
  2. Update tenant references
  3. Import to target
  4. Verify agent integrity
Post-condition: All agents configured in target
Verification: Agent count match, config validation
Rollback: Delete target agent configs
```

**Phase 4: Historical Data Migration**
```
Pre-condition: Phase 3 complete
Actions:
  1. Export conversation history
  2. Export usage logs
  3. Transform tenant_id references
  4. Bulk import to target
  5. Verify record counts
Post-condition: Historical data available in target
Verification: Record count within tolerance
Rollback: Truncate target historical tables
```

**Phase 5: Vector Embedding Migration**
```
Pre-condition: Phase 4 complete
Actions:
  1. Export vector store namespace
  2. Re-namespace for target tenant
  3. Import to target vector store
  4. Verify embedding count
Post-condition: All embeddings available in target
Verification: Embedding count match, sample query test
Rollback: Delete target namespace
```

**Phase 6: File Attachment Migration**
```
Pre-condition: Phase 5 complete
Actions:
  1. List all files in source S3 prefix
  2. Copy files to target S3 prefix
  3. Update file reference records
  4. Verify file integrity
Post-condition: All files accessible in target
Verification: File count match, checksum verification
Rollback: Delete target S3 prefix
```

**Phase 7: Traffic Cutover**
```
Pre-condition: All data phases complete, verified
Actions:
  1. Set source tenant to MIGRATED status
  2. Update routing rules
  3. Set target tenant to ACTIVE status
  4. Verify traffic flowing to target
Post-condition: All traffic served by target
Verification: API response from target, no errors
Rollback: Revert routing, set source to ACTIVE
```

### 3. Define Monitoring Requirements

| Metric | Threshold | Action |
|--------|-----------|--------|
| Migration phase duration | > 2x estimate | Alert, investigate |
| Error rate | > 0.1% | Pause, investigate |
| Data sync lag | > 5 minutes | Alert |
| Target system load | > 80% | Throttle migration |

### 4. Create Communication Plan

| Event | Notify | Channel | Template |
|-------|--------|---------|----------|
| Migration start | Tenant admin | Email | migration-start.html |
| Phase complete | Operations | Slack | phase-complete.md |
| Migration complete | Tenant admin | Email | migration-complete.html |
| Migration failed | Operations + Admin | PagerDuty | migration-failed.md |

**Verify current best practices with web search:**
Search the web: "create migration runbook best practices {date}"
Search the web: "create migration runbook enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the runbook above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into procedure edge cases and error scenarios
- **P (Party Mode)**: Bring operations and architect perspectives for runbook review
- **C (Continue)**: Accept runbook and proceed to rollback plan definition
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass runbook context: phases, procedures, monitoring requirements
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into runbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review migration runbook: {summary of phases and procedures}"
- Process collaborative analysis from operations and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save runbook to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-define-rollback-plan.md`

---

## Verification

- [ ] Pre-migration checklist complete
- [ ] All phase procedures documented
- [ ] Commands/scripts provided for each step
- [ ] Verification steps defined
- [ ] Monitoring requirements specified
- [ ] Communication plan documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete migration runbook
- Phase execution scripts
- Communication templates
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-migration-template.md`

---

## Next Step

Proceed to `step-04-c-define-rollback-plan.md` to define rollback procedures for each phase.
