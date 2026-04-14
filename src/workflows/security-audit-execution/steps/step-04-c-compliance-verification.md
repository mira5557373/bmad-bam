# Step 4: Compliance Verification

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

Verify compliance with applicable security and privacy frameworks. This includes checking SOC 2, GDPR, HIPAA, and other framework requirements against current controls.

---

## Prerequisites

- Step 3 completed (vulnerability assessment)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load compliance:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Compliance frameworks from audit scope
- Current control implementations
- Previous compliance reports
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. SOC 2 Type II Verification

Verify trust service criteria:

| Criteria | Control | Status | Evidence |
|----------|---------|--------|----------|
| Security | Access controls | [ ] | IAM policies |
| Availability | Redundancy | [ ] | DR documentation |
| Processing Integrity | Input validation | [ ] | Test results |
| Confidentiality | Encryption | [ ] | Encryption config |
| Privacy | Data handling | [ ] | Privacy policy |

### 2. GDPR Compliance Check

Verify data protection requirements:
- [ ] Data processing agreements in place
- [ ] Lawful basis documented for processing
- [ ] Data subject rights implemented (access, deletion, portability)
- [ ] Data breach notification procedure documented
- [ ] Privacy impact assessments completed
- [ ] Data retention policies enforced

### 3. Tenant-Specific Compliance

For multi-tenant platforms:
- [ ] Tenant data isolated per compliance requirements
- [ ] Tenant-specific compliance certifications available
- [ ] Audit logs per tenant accessible
- [ ] Data residency requirements met per tenant

### 4. AI-Specific Compliance

For AI systems:
- [ ] AI model training data compliance documented
- [ ] AI decision audit trail available
- [ ] AI safety controls verified
- [ ] Tenant AI usage isolated

### 5. Document Compliance Gaps

Record any compliance gaps:

| Framework | Control | Gap Description | Remediation | Due Date |
|-----------|---------|-----------------|-------------|----------|
| SOC 2 | CC6.1 | Missing encryption audit | Add logging | 30 days |
| GDPR | Art 17 | Deletion not automated | Implement | 60 days |

**Soft Gate Checkpoint**

**Steps 1-4 complete the security audit.** Present a summary of audit scope, access review, vulnerabilities, and compliance status. Ask for confirmation before finalizing.

**Verify current best practices with web search:**
Search the web: "SOC 2 Type II audit checklist SaaS {date}"
Search the web: "GDPR compliance verification multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing compliance verification, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into compliance gaps and remediation
- **P (Party Mode)**: Bring compliance and legal perspectives for review
- **C (Continue)**: Accept compliance status and finalize audit
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass compliance context: framework status, gaps, remediation
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into compliance report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance verification: {summary of framework status}"
- Process collaborative analysis from compliance and legal personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save compliance verification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final security audit report

---

## Verification

- [ ] SOC 2 criteria verified
- [ ] GDPR requirements checked
- [ ] Tenant-specific compliance confirmed
- [ ] AI compliance verified
- [ ] Gaps documented with remediation
- [ ] Patterns align with pattern registry

---

## Outputs

- Compliance verification report
- Framework coverage matrix
- Compliance gap analysis
- Remediation timeline
- Security audit report (complete)
- **Load template:** `{project-root}/_bmad/bam/templates/compliance-verification-template.md`

---

## Next Step

Security audit execution complete. Recommend running validation mode to verify against QG-SA1 criteria if formal gate passage required.
