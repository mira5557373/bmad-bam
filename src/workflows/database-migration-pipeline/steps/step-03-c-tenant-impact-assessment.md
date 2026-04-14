# Step 3: Tenant Impact Assessment

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

Assess tenant-specific impact of the migration. This includes per-tenant data verification, performance impact, feature impact, and downtime analysis.

---

## Prerequisites

- Step 2 completed (data validated)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Actions

### 1. Per-Tenant Data Verification

Verify each tenant's data:

| Tenant | Tier | Data Verified | Performance | Status |
|--------|------|---------------|-------------|--------|
| tenant_a | PRO | [ ] | [ ] | |
| tenant_b | ENTERPRISE | [ ] | [ ] | |
| tenant_c | FREE | [ ] | [ ] | |

### 2. Performance Impact

Measure performance impact per tier:

| Tier | Query Type | Pre-Migration | Post-Migration | Impact |
|------|------------|---------------|----------------|--------|
| FREE | Read | ms | ms | % |
| PRO | Read | ms | ms | % |
| ENTERPRISE | Write | ms | ms | % |

### 3. Feature Impact

Document any feature changes:

| Feature | Change | Affected Tiers | Action Required |
|---------|--------|----------------|-----------------|
| | | | |

### 4. Downtime Analysis

Document tenant-specific downtime:

| Tenant Type | Planned Downtime | Actual Downtime | SLA Impact |
|-------------|------------------|-----------------|------------|
| FREE | None | | |
| PRO | <5 min | | |
| ENTERPRISE | <1 min | | |

**Verify current best practices with web search:**
Search the web: "multi-tenant migration impact assessment {date}"
Search the web: "zero-downtime database migration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing impact assessment, if 'C' (Continue):
- Save impact assessment to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-rollback-testing.md`

---

## Verification

- [ ] Per-tenant data verified
- [ ] Performance impact measured
- [ ] Feature impact documented
- [ ] Downtime analyzed
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant impact assessment report
- Performance impact analysis
- Feature change documentation

---

## Next Step

Proceed to `step-04-c-rollback-testing.md` to test rollback procedures.
