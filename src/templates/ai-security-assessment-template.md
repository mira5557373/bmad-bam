---
name: ai-security-assessment-template
description: Template for AI/LLM security assessment and vulnerability testing
category: security
version: 1.0.0
type: "assessment"
---

# AI Security Assessment: {{title}}

## Document Information

| Field | Value |
|-------|-------|
| Assessment ID | AISA-{{version}} |
| Project | {{project_name}} |
| Scope | {{scope}} |
| Date | {{date}} |
| Assessor | {{author}} |
| Quality Gate | QG-S4 |

---

## Executive Summary

Overview of the AI security assessment including scope, methodology, and key findings.

| Category | Critical | High | Medium | Low | Info |
|----------|----------|------|--------|-----|------|
| Prompt Injection | | | | | |
| Data Exfiltration | | | | | |
| Model Extraction | | | | | |
| Access Control | | | | | |
| **Total** | | | | | |

**Overall Risk Rating:** [ ] Critical / [ ] High / [ ] Medium / [ ] Low

---

## 1. Assessment Scope

### 1.1 In Scope

| Component | Description | AI Runtime |
|-----------|-------------|------------|
| | | |

### 1.2 Out of Scope

| Component | Reason |
|-----------|--------|
| | |

### 1.3 Testing Environment

| Property | Value |
|----------|-------|
| Environment | |
| Tenant Model | {{tenant_model}} |
| AI Runtime | {{ai_runtime}} |
| Test Duration | |

---

## 2. Prompt Injection Testing

### 2.1 Direct Prompt Injection

| Test ID | Attack Vector | Payload Type | Result | Severity |
|---------|---------------|--------------|--------|----------|
| DPI-001 | Role override | System prompt bypass | | |
| DPI-002 | Instruction bypass | Ignore previous | | |
| DPI-003 | Delimiter escape | Special characters | | |
| DPI-004 | Nested instructions | Multi-level | | |
| DPI-005 | Encoding tricks | Base64/Unicode | | |

**Findings:**

| Finding ID | Description | Impact | Recommendation |
|------------|-------------|--------|----------------|
| | | | |

### 2.2 Indirect Prompt Injection

| Test ID | Attack Vector | Source | Result | Severity |
|---------|---------------|--------|--------|----------|
| IPI-001 | RAG poisoning | Retrieved documents | | |
| IPI-002 | Tool output | External API response | | |
| IPI-003 | User data | Database content | | |
| IPI-004 | File content | Uploaded documents | | |

**Findings:**

| Finding ID | Description | Impact | Recommendation |
|------------|-------------|--------|----------------|
| | | | |

### 2.3 Jailbreak Attempts

| Test ID | Technique | Description | Result | Severity |
|---------|-----------|-------------|--------|----------|
| JB-001 | DAN | Do Anything Now | | |
| JB-002 | Roleplay | Character assumption | | |
| JB-003 | Hypothetical | Academic framing | | |
| JB-004 | Multi-turn | Gradual escalation | | |

---

## 3. Data Exfiltration Testing

### 3.1 System Prompt Extraction

| Test ID | Technique | Result | Severity |
|---------|-----------|--------|----------|
| SPE-001 | Direct request | | |
| SPE-002 | Reflection attack | | |
| SPE-003 | Completion exploit | | |

### 3.2 Cross-Tenant Data Access

| Test ID | Target | Attack Method | Result | Severity |
|---------|--------|---------------|--------|----------|
| CTA-001 | Other tenant memory | Context manipulation | | |
| CTA-002 | Other tenant documents | RAG query bypass | | |
| CTA-003 | Other tenant history | Session confusion | | |

### 3.3 PII Leakage

| Test ID | Data Type | Trigger | Result | Severity |
|---------|-----------|---------|--------|----------|
| PII-001 | Email addresses | Query manipulation | | |
| PII-002 | Phone numbers | Output probing | | |
| PII-003 | SSN/ID numbers | Memory extraction | | |
| PII-004 | Financial data | Context injection | | |

---

## 4. Model Extraction Prevention

### 4.1 Probing Attacks

| Test ID | Technique | Queries | Detection | Blocked |
|---------|-----------|---------|-----------|---------|
| MEP-001 | Systematic sampling | | | |
| MEP-002 | Confidence probing | | | |
| MEP-003 | Logprob extraction | | | |
| MEP-004 | Membership inference | | | |

### 4.2 Rate Limiting Effectiveness

| Endpoint | Limit | Test Volume | Enforced | Response |
|----------|-------|-------------|----------|----------|
| Chat completion | | | | |
| Embedding | | | | |
| Tool execution | | | | |

---

## 5. Tool Security

### 5.1 Unauthorized Tool Access

| Test ID | Tool | Attack Method | Result | Severity |
|---------|------|---------------|--------|----------|
| UTA-001 | File system | Path traversal | | |
| UTA-002 | Database | SQL injection | | |
| UTA-003 | Network | SSRF | | |
| UTA-004 | Admin tools | Privilege escalation | | |

### 5.2 Sandbox Escape

| Test ID | Vector | Technique | Result | Severity |
|---------|--------|-----------|--------|----------|
| SE-001 | Code execution | Container escape | | |
| SE-002 | Resource access | Mount bypass | | |
| SE-003 | Network | Firewall evasion | | |

### 5.3 Tool Permission Model

| Tool | Expected Permission | Actual Permission | Gap |
|------|---------------------|-------------------|-----|
| | | | |

---

## 6. Output Security

### 6.1 Output Filtering

| Filter | Test Cases | Pass | Fail | Bypass |
|--------|------------|------|------|--------|
| PII detection | | | | |
| Harmful content | | | | |
| Code injection | | | | |
| XSS prevention | | | | |

### 6.2 Response Manipulation

| Test ID | Technique | Impact | Result |
|---------|-----------|--------|--------|
| RM-001 | Format injection | UI manipulation | |
| RM-002 | Markdown injection | Link hijacking | |
| RM-003 | JSON pollution | API confusion | |

---

## 7. Tenant Isolation

### 7.1 Context Isolation

| Test | Tenant A Action | Tenant B Visibility | Result |
|------|-----------------|---------------------|--------|
| Memory isolation | Store secret | Query for secret | |
| Document isolation | Upload file | Search for file | |
| Session isolation | Create session | Access session | |

### 7.2 Resource Isolation

| Resource | Isolation Method | Test | Result |
|----------|------------------|------|--------|
| Token quotas | Per-tenant limits | Exhaust A, check B | |
| Rate limits | Per-tenant tracking | Trigger A, check B | |
| Model access | Per-tenant config | Access restricted model | |

---

## 8. Adversarial Testing

### 8.1 Red Team Scenarios

| Scenario | Objective | Techniques Used | Outcome |
|----------|-----------|-----------------|---------|
| | | | |

### 8.2 Attack Chains

| Chain ID | Steps | Success | Mitigations |
|----------|-------|---------|-------------|
| | | | |

---

## 9. Compliance Verification

### 9.1 OWASP LLM Top 10

| Risk | Tested | Result | Notes |
|------|--------|--------|-------|
| LLM01: Prompt Injection | [ ] | | |
| LLM02: Insecure Output | [ ] | | |
| LLM03: Training Data Poisoning | [ ] | | |
| LLM04: Model DoS | [ ] | | |
| LLM05: Supply Chain | [ ] | | |
| LLM06: Sensitive Data | [ ] | | |
| LLM07: Insecure Plugin | [ ] | | |
| LLM08: Excessive Agency | [ ] | | |
| LLM09: Overreliance | [ ] | | |
| LLM10: Model Theft | [ ] | | |

### 9.2 EU AI Act

| Requirement | Applicable | Compliant | Evidence |
|-------------|------------|-----------|----------|
| Risk classification | | | |
| Transparency | | | |
| Human oversight | | | |

---

## 10. Gate Decision

### 10.1 QG-S4 Criteria

| Criteria | Requirement | Status |
|----------|-------------|--------|
| Prompt Injection | All tests pass | [ ] |
| Adversarial Detection | Active | [ ] |
| Output Filtering | Verified | [ ] |
| Kill Switch | Tested | [ ] |
| Model Extraction | Prevented | [ ] |

### 10.2 Gate Outcome

| Outcome | Criteria |
|---------|----------|
| **PASS** | No critical/high findings, all criteria met |
| **CONDITIONAL** | Medium findings with remediation plan |
| **FAIL** | Critical or high severity findings open |

**Decision:** [ ] PASS / [ ] CONDITIONAL / [ ] FAIL

**Justification:**


---

## 11. Remediation Tracking

| Finding ID | Severity | Description | Owner | Due Date | Status |
|------------|----------|-------------|-------|----------|--------|
| | | | | | |

---

## Web Research Queries

Before finalizing this assessment, verify current best practices:

- "LLM security assessment methodology {date}"
- "OWASP LLM Top 10 testing {date}"
- "prompt injection prevention techniques {date}"
- "AI red team methodology {date}"
- "multi-tenant AI security patterns {date}"

_Source: [URL]_ citations for key findings.

---

## Verification Checklist

- [ ] All prompt injection tests executed
- [ ] Data exfiltration attempts verified
- [ ] Model extraction prevention tested
- [ ] Tool security validated
- [ ] Output filtering confirmed
- [ ] Tenant isolation verified
- [ ] Adversarial scenarios tested
- [ ] OWASP LLM Top 10 coverage complete
- [ ] Gate decision documented
- [ ] Remediation plan defined

---

## Related Artifacts

- Test scripts and payloads
- Vulnerability scan reports
- Penetration test logs
- Configuration evidence

---

## Approvals

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Security Engineer | | | |
| AI Safety Lead | | | |
| CISO | | | |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial document |
