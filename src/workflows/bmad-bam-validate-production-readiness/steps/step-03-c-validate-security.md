# Step 3: Validate Security Posture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

## Purpose

Validate security posture for production deployment.

## Prerequisites

- Step 2: Validate Operational Readiness completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security`

---

## Actions

**Verify current best practices with web search:**
Search the web: "production security checklist SaaS {date}"

_Source: [URL]_

1. **Validate Security Scan**
   - Check for critical/high vulnerabilities
   - Verify remediation of findings

2. **Validate Secrets Management**
   - Check no hardcoded secrets
   - Verify secrets manager integration

3. **Validate Access Controls**
   - Check access controls reviewed
   - Verify audit logging enabled

---

## Verification

- [ ] Security scan clean
- [ ] Secrets properly managed
- [ ] Access controls verified

## Outputs

- Security posture assessment

## Next Step

Proceed to Step 4: Validate Deployment Configuration.
