# Step 1: Verify Prerequisites

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## Purpose

Verify all prerequisite quality gates have passed before production readiness validation.

## Prerequisites

- QG-I1 (Convergence), QG-I2 (Tenant Safety), QG-I3 (Agent Safety) must be complete
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `production-deployment`

---

## Actions

**Verify current best practices with web search:**
Search the web: "production readiness checklist SaaS {date}"
Search the web: "multi-tenant production deployment prerequisites {date}"

_Source: [URL]_

1. **Verify QG-I1 (Convergence)**
   - Locate convergence verification report
   - Confirm PASS status

2. **Verify QG-I2 (Tenant Safety)**
   - Locate tenant safety report
   - Confirm PASS status

3. **Verify QG-I3 (Agent Safety)**
   - Locate agent safety report
   - Confirm PASS status

---

## Verification

- [ ] QG-I1 PASS confirmed
- [ ] QG-I2 PASS confirmed
- [ ] QG-I3 PASS confirmed

## Outputs

- Prerequisites verification summary

## Next Step

Proceed to Step 2: Validate Operational Readiness to check monitoring and alerting.
