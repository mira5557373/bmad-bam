# Step 1: Migration Plan Execution

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

Execute the database migration plan. This includes pre-migration checks, executing migration scripts, and documenting execution results.

---

## Prerequisites

- Migration scripts reviewed and approved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `database`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `migration`

---

## Actions

### 1. Pre-Migration Checklist

Verify readiness before migration:
- [ ] Migration scripts reviewed
- [ ] Staging migration tested
- [ ] Backup completed
- [ ] Maintenance window scheduled
- [ ] Rollback script prepared
- [ ] Stakeholders notified

### 2. Document Migration Scope

| Migration | Type | Tables Affected | Tenants Affected |
|-----------|------|-----------------|------------------|
| Add column | Schema | users | All |
| Add index | Performance | orders | All |
| Data transform | Data | tenant_config | Per-tenant |
| RLS update | Security | all_tables | All |

### 3. Execute Migration

Record execution steps:

| Step | Script | Status | Duration | Notes |
|------|--------|--------|----------|-------|
| 1 | pre_check.sql | | | |
| 2 | schema_change.sql | | | |
| 3 | data_transform.sql | | | |
| 4 | post_verify.sql | | | |

### 4. Document Results

Record execution outcome:
- Start time:
- End time:
- Total duration:
- Rows affected:
- Errors encountered:

**Verify current best practices with web search:**
Search the web: "database migration zero downtime best practices {date}"
Search the web: "multi-tenant schema migration patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing migration execution, if 'C' (Continue):
- Save execution log to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-data-validation.md`

---

## Verification

- [ ] Pre-migration checklist completed
- [ ] Migration scope documented
- [ ] Migration executed
- [ ] Results documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Migration execution log
- Pre-migration checklist
- Execution results
- **Load template:** `{project-root}/_bmad/bam/templates/migration-execution-template.md`

---

## Next Step

Proceed to `step-02-c-data-validation.md` to validate data integrity.
