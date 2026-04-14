# Step 21: Validate Data Protection

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

---

## Purpose

Validate the data protection artifacts against quality criteria and security standards for multi-tenant AI platforms.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-protection`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: `QG-DR1`
- **Load checklist:** `{project-root}/_bmad/bam/checklists/security-checklist.md`

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Validation Checklist

### Encryption at Rest
- [ ] Primary database encryption verified (AES-256)
- [ ] Vector store encryption with per-tenant keys
- [ ] Object storage server-side encryption enabled
- [ ] Cache (Redis) encryption at rest enabled
- [ ] Backup encryption with separate keys

### Encryption in Transit
- [ ] Client to API uses TLS 1.3
- [ ] API to Database uses TLS 1.2+
- [ ] API to LLM uses TLS 1.3
- [ ] Inter-service communication uses mTLS
- [ ] No weak cipher suites in use

### Key Management
- [ ] Keys stored in HSM or KMS
- [ ] Key rotation policy defined (annual minimum)
- [ ] Key access follows least privilege
- [ ] Key backup in geo-redundant storage
- [ ] Per-tenant keys for tenant-specific data

### Tenant Data Isolation
- [ ] Row-level security (RLS) policies active
- [ ] Cache isolation with tenant-prefixed keys
- [ ] Log entries include tenant_id field
- [ ] Agent memory tenant-scoped
- [ ] Vector embeddings tenant-filtered

### PII Protection
- [ ] PII data classification complete
- [ ] PII fields encrypted or tokenized
- [ ] PII access logging enabled
- [ ] PII retention policies defined
- [ ] PII deletion procedures documented

### Privacy Controls
- [ ] GDPR data export capability verified
- [ ] Right to be forgotten implementation
- [ ] Data retention enforcement
- [ ] Consent management in place
- [ ] Privacy impact assessment completed

### Cross-Cutting Security
- [ ] No data store without encryption at rest
- [ ] No connection without encryption in transit
- [ ] No PII exposure in logs or traces
- [ ] Audit trail for all sensitive operations
- [ ] Compliance mapping complete

### QG-DR1 Data Residency Gate Verification
**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: `QG-DR1`

- [ ] **encryption_requirements_met** (REQUIRED): All encryption requirements satisfied
- [ ] **tenant_isolation_verified** (REQUIRED): Tenant isolation verified for all asset types
- [ ] **pii_protection_active** (REQUIRED): PII protection mechanisms active
- [ ] **data_lifecycle_compliant** (REQUIRED): Data lifecycle policies enforced

**QG-DR1 Required Patterns:**
| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| encryption_requirements_met | **YES** | [ ] Pass / [ ] Fail | Encryption audit findings |
| tenant_isolation_verified | **YES** | [ ] Pass / [ ] Fail | Isolation verification results |
| pii_protection_active | **YES** | [ ] Pass / [ ] Fail | PII protection assessment |
| data_lifecycle_compliant | **YES** | [ ] Pass / [ ] Fail | Data lifecycle documentation |

**QG-DR1 Data Residency Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All encryption verified, tenant isolation confirmed, PII protected, privacy controls active, QG-DR1 patterns verified
- **CONDITIONAL**: Minor gaps (e.g., some compliance documentation pending) - document gaps, proceed with mitigation plan
- **FAIL**: Missing encryption for any data store, missing tenant isolation for any asset type, PII exposure detected, or QG-DR1 critical patterns failing - return to Create mode

### QG-DR1 Exit Criteria
This workflow is the entry workflow for QG-DR1. Upon PASS:
- QG-DR1 data residency patterns are satisfied
- Workflow exits to production readiness validation

Present validation results with specific findings for each section.

---

## Error Handling

### FAIL Outcome Recovery Steps

#### Step 1: Categorize the Failure
Identify which category caused the FAIL:

| Failure Category | Severity | Recovery Path |
|------------------|----------|---------------|
| Missing encryption at rest | CRITICAL | Return to step-01-c-audit-encryption.md |
| Missing encryption in transit | CRITICAL | Return to step-01-c-audit-encryption.md |
| Tenant isolation gap | CRITICAL | Return to step-02-c-verify-isolation.md |
| PII exposure | CRITICAL | Security review required before retry |
| Privacy control missing | HIGH | Return to step-03-c-test-pii-protection.md |

#### Step 2: Critical Failure Remediation

**For Missing Encryption:**
1. Identify the unencrypted data store or connection
2. Return to `steps/step-01-c-audit-encryption.md`
3. Implement encryption following documented patterns
4. Re-run validation

**For Tenant Isolation Gap:**
1. Identify the asset type without isolation
2. Return to `steps/step-02-c-verify-isolation.md`
3. Implement isolation following tenant model patterns
4. Re-run validation

**For PII Exposure (HIGHEST RISK):**
1. **STOP ALL WORK** - This is a potential data breach issue
2. Document exactly what PII could be exposed
3. Escalate to security architect immediately
4. Do not proceed until explicit approval received
5. Implement fix with mandatory security review
6. Run penetration test before re-validation

#### Step 3: Re-Validation Protocol
After remediation:
1. Document what was fixed and why
2. Return to `steps/step-20-v-load-artifact.md` to reload artifacts
3. Re-run this validation step
4. If FAIL persists after 2 attempts, escalate to mandatory course correction

### Recovery Attempt Tracking

| Attempt | Max Allowed | Action on Exceed |
|---------|-------------|------------------|
| 1 | - | Fix and retry |
| 2 | - | Fix and retry with peer review |
| 3+ | EXCEEDED | Mandatory course correction - escalate to project leadership |

### Escalation Contacts
When escalation is required:
1. Security Architect - for encryption or PII issues
2. Platform Architect - for tenant isolation issues
3. Project Leadership - for mandatory course correction after 2 failed attempts

---

## COLLABORATION MENUS (A/P/C):

After completing validation checks, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for validation review
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, gate decision, gaps identified
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data protection validation: {summary of findings and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checklist items evaluated
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Findings documented with specific details

---

## Outputs

- Validation report with findings
- Gate decision with rationale
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
