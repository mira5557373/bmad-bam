# Step 4: Validate Deployment Configuration

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

## Purpose

Validate deployment configuration for production.

## Prerequisites

- Step 3: Validate Security Posture completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `deployment`

---

## Actions

**Verify current best practices with web search:**
Search the web: "production deployment configuration best practices {date}"

_Source: [URL]_

1. **Validate Infrastructure as Code**
   - Check IaC reviewed
   - Verify configuration management

2. **Validate Rollback**
   - Check rollback procedures
   - Verify tested in staging

3. **Validate Health Checks**
   - Check health checks configured
   - Verify auto-scaling policies

---

## Verification

- [ ] IaC reviewed
- [ ] Rollback procedures tested
- [ ] Health checks configured

## Outputs

- Deployment configuration assessment

## Next Step

Proceed to Step 5: Generate Production Readiness Report.
