# Step 21: Run AI Security Validation Checks

## Purpose

Execute validation checks to verify the AI security assessment meets required criteria.

## Prerequisites

- Step 20 complete (document loaded)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `ai-security`
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-security-continuous.md`

## Actions

### 1. Validate Model Security Coverage

| Model/Component | Security Audit Complete | Score | Status |
|-----------------|------------------------|-------|--------|
| | [ ] | | |

**Pass Criteria:** All models audited with score >= 80/100

### 2. Validate Inference Endpoint Security

| Endpoint | Authentication | Authorization | Encryption | Rate Limiting |
|----------|---------------|---------------|------------|---------------|
| | [ ] | [ ] | [ ] | [ ] |

**Pass Criteria:** All endpoints have all security controls

### 3. Validate Prompt Injection Defenses

| Defense Layer | Implemented | Tested | Effective |
|---------------|-------------|--------|-----------|
| Input sanitization | [ ] | [ ] | [ ] |
| Output filtering | [ ] | [ ] | [ ] |
| Context isolation | [ ] | [ ] | [ ] |
| Instruction anchoring | [ ] | [ ] | [ ] |

**Pass Criteria:** All defense layers implemented and tested

### 4. Validate Data Leakage Prevention

| Control | Status | Evidence |
|---------|--------|----------|
| PII detection | | |
| Sensitive data masking | | |
| Cross-tenant isolation | | |
| Model output filtering | | |
| Logging sanitization | | |

**Pass Criteria:** All controls active with 100% coverage

### 5. Validate Access Control Review

| Resource Type | RBAC Defined | Least Privilege | Audit Logging |
|---------------|--------------|-----------------|---------------|
| Models | [ ] | [ ] | [ ] |
| Endpoints | [ ] | [ ] | [ ] |
| Training data | [ ] | [ ] | [ ] |
| Configurations | [ ] | [ ] | [ ] |

### 6. Validate Documentation Quality

| Criterion | Met | Notes |
|-----------|-----|-------|
| Threat model documented | [ ] | |
| Risk assessment complete | [ ] | |
| Remediation plans clear | [ ] | |
| Compliance mapping done | [ ] | |

**Verify current best practices with web search:**
Search the web: "AI security validation framework {date}"
Search the web: "LLM security assessment criteria OWASP {date}"

## Verification

- [ ] Model security coverage validated
- [ ] Endpoint security validated
- [ ] Prompt injection defenses verified
- [ ] Data leakage prevention confirmed
- [ ] Access controls reviewed
- [ ] Documentation quality acceptable

## Outputs

- Validation results with pass/fail status
- List of any gaps or issues found

## Next Step

Proceed to `step-22-v-generate-report.md`.
