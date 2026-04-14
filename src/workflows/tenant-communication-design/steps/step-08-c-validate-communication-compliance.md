# Step 8: Validate Communication Compliance

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making operational decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Validate that all tenant communication designs comply with applicable regulations, ensuring data privacy, consent management, and audit trail requirements are met across all communication channels.

---

## Prerequisites

- Step 7 (Plan Feature Announcements) completed
- All communication design documents available
- Applicable compliance frameworks identified
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` -> filter: communication
- **Web research (if available):** Search for communication compliance requirements

---

## Inputs

- All communication design documents (Steps 1-7)
- Compliance frameworks: `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- Regional operation requirements
- Tenant contract templates
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Identify Applicable Regulations

Map regulatory requirements to communication system:

| Regulation | Scope | Communication Requirements |
|------------|-------|----------------------------|
| GDPR | EU data subjects | Consent, data breach 72h, right to erasure |
| CCPA | California residents | Notice at collection, opt-out |
| CAN-SPAM | US commercial email | Unsubscribe, physical address |
| CASL | Canadian recipients | Express consent, unsubscribe |
| HIPAA | PHI handlers | Breach notification 60 days |
| SOC2 | Service providers | Incident disclosure |
| PCI-DSS | Cardholder data | Breach notification |

### 2. Validate Consent Management

Verify consent handling compliance:

| Requirement | Compliance Check | Status |
|-------------|------------------|--------|
| Explicit opt-in | Marketing requires affirmative consent | [ ] Pass / [ ] Fail |
| Granular consent | Separate consent per communication type | [ ] Pass / [ ] Fail |
| Easy withdrawal | One-click unsubscribe available | [ ] Pass / [ ] Fail |
| Consent records | Timestamp and source logged | [ ] Pass / [ ] Fail |
| Consent refresh | Periodic re-confirmation where required | [ ] Pass / [ ] Fail |
| Child protection | Age verification where required | [ ] Pass / [ ] Fail |

### 3. Verify Breach Notification Compliance

Validate breach communication meets requirements:

| Regulation | Timeline | Content Requirements | Compliance |
|------------|----------|----------------------|------------|
| GDPR | 72 hours | Nature, contact, consequences, measures | [ ] Met |
| HIPAA | 60 days | Breach description, affected data, steps | [ ] Met |
| State laws | Varies | Varies by state | [ ] Met |
| Contract | Per SLA | Per agreement | [ ] Met |

### 4. Assess Data Residency Compliance

Validate communication data handling:

| Data Element | Storage Location | Transfer Controls | Compliance |
|--------------|------------------|-------------------|------------|
| Email content | Region-specific | SCCs/Adequacy | [ ] Verified |
| Contact data | Tenant region | Encryption | [ ] Verified |
| Preferences | Tenant region | Access controls | [ ] Verified |
| Audit logs | Platform region | Retention policy | [ ] Verified |
| Templates | Global CDN | Non-PII only | [ ] Verified |

### 5. Verify Accessibility Compliance

Validate communication accessibility:

| Standard | Requirement | Compliance |
|----------|-------------|------------|
| WCAG 2.1 AA | Email accessibility | [ ] Pass / [ ] Fail |
| Section 508 | US federal accessibility | [ ] Pass / [ ] Fail |
| EN 301 549 | EU accessibility | [ ] Pass / [ ] Fail |
| Plain language | Clear, understandable content | [ ] Pass / [ ] Fail |
| Multi-language | Localization available | [ ] Pass / [ ] Fail |

### 6. Validate Audit Trail Requirements

Verify audit logging compliance:

| Requirement | Implementation | Compliance |
|-------------|----------------|------------|
| Message sent | Timestamp, recipient, channel logged | [ ] Verified |
| Delivery status | Delivery/bounce/open tracked | [ ] Verified |
| Consent changes | All preference changes logged | [ ] Verified |
| Escalations | Escalation events recorded | [ ] Verified |
| Access logs | Who accessed what, when | [ ] Verified |
| Retention | Logs retained per policy | [ ] Verified |

### 7. Document Compliance Gaps

Record any identified gaps:

| Gap | Regulation | Severity | Remediation | Timeline |
|----|------------|----------|-------------|----------|
| {Gap 1} | {Regulation} | High/Med/Low | {Action} | {Date} |
| {Gap 2} | {Regulation} | High/Med/Low | {Action} | {Date} |

### 8. Create Compliance Matrix

Compile comprehensive compliance status:

| Area | GDPR | CCPA | HIPAA | SOC2 | CAN-SPAM |
|------|------|------|-------|------|----------|
| Consent | [ ] | [ ] | N/A | [ ] | [ ] |
| Notification | [ ] | [ ] | [ ] | [ ] | N/A |
| Data handling | [ ] | [ ] | [ ] | [ ] | N/A |
| Audit trail | [ ] | [ ] | [ ] | [ ] | N/A |
| Unsubscribe | [ ] | [ ] | N/A | N/A | [ ] |

**Verify current best practices with web search:**
Search the web: "SaaS notification compliance GDPR CCPA {date}"
Search the web: "breach notification requirements multi-jurisdiction {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the compliance validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific compliance gaps
- **P (Party Mode)**: Bring legal, compliance, and security perspectives
- **C (Continue)**: Accept compliance validation and proceed to finalize playbook
- **[Specific refinements]**: Describe compliance concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: compliance gaps, regulatory requirements, remediation plans
- Process enhanced insights on compliance
- Ask user: "Accept these refined compliance decisions? (y/n)"
- If yes, integrate into compliance document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review communication compliance for multi-tenant AI platform"
- Process legal, compliance, and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save compliance validation results to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-finalize-communication-playbook.md`

---

## Verification

- [ ] All applicable regulations identified
- [ ] Consent management validated
- [ ] Breach notification compliance verified
- [ ] Data residency compliance assessed
- [ ] Accessibility compliance verified
- [ ] Audit trail requirements validated
- [ ] Compliance gaps documented
- [ ] Compliance matrix completed

---

## Outputs

- Compliance validation report
- Compliance gap remediation plan
- Compliance matrix
- **Load template:** `{project-root}/_bmad/bam/templates/communication-compliance-template.md`

---

## Next Step

Proceed to `step-09-c-finalize-communication-playbook.md` to complete the communication guide.
