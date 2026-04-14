# Step 3: Recovery Validation

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

Validate recovery completeness and data integrity in the DR environment. This includes verifying data consistency, tenant data integrity, and application functionality.

---

## Prerequisites

- Step 2 completed (failover tested)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-integrity`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- Failover test results from previous step
- Data validation queries
- Reference data checksums
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Database Integrity Validation

Verify database recovery:

| Check | Query/Method | Expected | Actual | Status |
|-------|--------------|----------|--------|--------|
| Row counts | SELECT COUNT(*) | Match primary | | [ ] |
| Last transaction | MAX(updated_at) | Within RPO | | [ ] |
| Data checksums | Hash comparison | Match | | [ ] |
| RLS policies | SHOW POLICIES | Active | | [ ] |

### 2. Tenant Data Integrity

For each tenant, verify:
- [ ] Tenant configuration recovered
- [ ] Tenant data accessible
- [ ] Tenant settings intact
- [ ] No cross-tenant data exposure

### 3. AI Service Recovery

Validate AI components:

| Component | Validation | Status |
|-----------|------------|--------|
| AI Models | Model inference test | [ ] |
| Vector DB | Embedding retrieval | [ ] |
| Agent State | State restoration | [ ] |
| Prompt Cache | Cache rebuild | [ ] |

### 4. Application Functionality

Execute functional tests:
- [ ] User authentication
- [ ] CRUD operations
- [ ] AI agent invocation
- [ ] Billing/metering
- [ ] Webhook delivery

**Verify current best practices with web search:**
Search the web: "data integrity validation disaster recovery {date}"
Search the web: "multi-tenant data recovery verification {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing recovery validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into data integrity issues
- **P (Party Mode)**: Bring DBA and QA perspectives for review
- **C (Continue)**: Accept validation and proceed to RTO/RPO verification
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

#### If 'C' (Continue):
- Save recovery validation to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-rto-rpo-verification.md`

---

## Verification

- [ ] Database integrity verified
- [ ] Tenant data intact
- [ ] AI services recovered
- [ ] Application functionality confirmed
- [ ] Patterns align with pattern registry

---

## Outputs

- Recovery validation report
- Data integrity results
- Tenant data verification

---

## Next Step

Proceed to `step-04-c-rto-rpo-verification.md` to measure and verify RTO/RPO.
