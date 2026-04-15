# Step 4: Erasure Procedures

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

Design right to erasure (RTBF) procedures and data subject access request (DSAR) handling.

---

## Prerequisites

- Step 3 completed (Verification design defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Actions

### 1. Erasure Request Workflow

| Phase | Action | SLA | Owner |
|-------|--------|-----|-------|
| Receipt | Log request, validate identity | < 1 hour | Support |
| Assessment | Identify data scope, legal holds | < 24 hours | Compliance |
| Approval | Review legal/retention exceptions | < 48 hours | Legal |
| Execution | Delete/anonymize data | < 72 hours | Engineering |
| Verification | Confirm erasure complete | < 24 hours | QA |
| Notification | Inform data subject | < 24 hours | Support |

### 2. Data Discovery Matrix

| Data Location | Discovery Method | Erasure Method |
|---------------|------------------|----------------|
| Primary database | tenant_id query | DELETE/ANONYMIZE |
| Backups | Backup manifest | Retain with flag |
| Search indices | Index mapping | Re-index without |
| Analytics | Event store | Anonymize events |
| Logs | Log aggregation | Redact entries |
| Third-party | API inventory | Deletion request |
| Caches | Cache keys | Invalidate |

### 3. Retention Exception Handling

| Exception | Trigger | Handling |
|-----------|---------|----------|
| Legal hold | Active litigation | Preserve, notify legal |
| Regulatory | Audit requirement | Retain minimum period |
| Business critical | Transaction records | Anonymize, retain structure |
| Technical | System integrity | Pseudonymize |

### 4. Cross-Tenant Isolation During Erasure

| Concern | Mitigation |
|---------|------------|
| Shared tables | RLS-filtered deletion |
| Foreign keys | Cascade or anonymize |
| Aggregated data | Re-aggregate excluding tenant |
| Audit logs | Tenant-specific redaction |

### 5. DSAR Response Procedures

| Request Type | Response Content | Format |
|--------------|------------------|--------|
| Data access | Complete data export | JSON/CSV |
| Rectification | Correction confirmation | Written |
| Erasure | Deletion confirmation | Written |
| Portability | Machine-readable export | JSON |
| Objection | Processing cessation proof | Written |

### 6. Audit Trail Requirements

| Event | Captured Data | Retention |
|-------|---------------|-----------|
| Request receipt | Timestamp, requestor, type | 7 years |
| Data discovered | Locations, record counts | 7 years |
| Erasure executed | Methods, timestamps | 7 years |
| Verification | Confirmation, attestation | 7 years |
| Exceptions | Reason, duration | 7 years |

**Verify current best practices with web search:**
Search the web: "GDPR right to erasure implementation best practices {date}"
Search the web: "DSAR automation multi-tenant SaaS {date}"
Search the web: "data subject request workflow compliance {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the erasure procedures, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific compliance requirements
- **P (Party Mode)**: Bring legal and compliance perspectives for review
- **C (Continue)**: Accept erasure design and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass erasure context: workflows, exceptions, audit requirements
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review erasure procedures: {summary of workflows and compliance}"
- Process collaborative analysis from legal and compliance personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to step-05-c-assembly.md

---

## Verification

- [ ] Erasure request workflow defined
- [ ] Data discovery matrix complete
- [ ] Retention exceptions documented
- [ ] Cross-tenant isolation addressed
- [ ] DSAR procedures specified
- [ ] Audit trail requirements defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Erasure request workflow
- Data discovery matrix
- Exception handling procedures
- DSAR response specifications

---

## Next Step

Proceed to `step-05-c-assembly.md` to assemble the complete data anonymization design document.
