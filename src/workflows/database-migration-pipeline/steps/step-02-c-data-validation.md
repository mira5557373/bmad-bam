# Step 2: Data Validation

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

Validate data integrity after migration. This includes row count verification, data consistency checks, constraint validation, and RLS policy verification.

---

## Prerequisites

- Step 1 completed (migration executed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-integrity`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Actions

### 1. Row Count Verification

Compare row counts before and after:

| Table | Pre-Migration | Post-Migration | Delta | Status |
|-------|---------------|----------------|-------|--------|
| users | | | | [ ] |
| orders | | | | [ ] |
| tenant_config | | | | [ ] |

### 2. Data Consistency Checks

Verify data relationships:
- [ ] Foreign key constraints valid
- [ ] Unique constraints respected
- [ ] Not null constraints enforced
- [ ] Check constraints passing

### 3. Tenant Data Isolation

Verify tenant isolation maintained:
- [ ] RLS policies active
- [ ] No cross-tenant data access
- [ ] Tenant context propagation works
- [ ] Tenant-specific queries return correct data

### 4. Application Validation

Run application-level validation:
- [ ] API endpoints functional
- [ ] CRUD operations working
- [ ] Tenant operations isolated
- [ ] Performance within SLA

**Verify current best practices with web search:**
Search the web: "database migration data validation checklist {date}"
Search the web: "post-migration data integrity verification {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing data validation, if 'C' (Continue):
- Save validation results to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-impact-assessment.md`

---

## Verification

- [ ] Row counts verified
- [ ] Consistency checks passed
- [ ] Tenant isolation confirmed
- [ ] Application validation complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Data validation results
- Consistency check report
- Tenant isolation verification
- **Load template:** `{project-root}/_bmad/bam/templates/data-validation-template.md`

---

## Next Step

Proceed to `step-03-c-tenant-impact-assessment.md` to assess tenant impact.
