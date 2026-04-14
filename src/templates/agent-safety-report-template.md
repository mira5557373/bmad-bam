---
name: agent-safety-report-template
description: Template for documenting AI agent safety verification results
category: ai-safety
version: 1.0.0
type: "report"
---

# Agent Safety Report: {{title}}

## Document Information

| Field | Value |
|-------|-------|
| Report ID | ASR-{{version}} |
| Project | {{project_name}} |
| Agent | {{agent_name}} |
| Date | {{date}} |
| Author | {{author}} |
| Quality Gate | QG-I3 |

---

## Executive Summary

Brief overview of the agent safety assessment results, including overall status and critical findings.

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Overall Safety Score | | >= 95% | |
| Critical Issues | | 0 | |
| High Issues | | 0 | |
| Medium Issues | | <= 3 | |

---

## 1. Agent Configuration

### 1.1 Agent Topology

| Property | Value |
|----------|-------|
| Runtime | {{ai_runtime}} |
| Memory Tiers | |
| Tool Count | |
| Max Tokens | |

### 1.2 Run Contract Summary

| Limit | Configured Value | Tested |
|-------|------------------|--------|
| Token Budget | | [ ] |
| Time Limit | | [ ] |
| Cost Limit | | [ ] |
| Action Limit | | [ ] |

---

## 2. Guardrail Verification

### 2.1 Input Guardrails

| Test Category | Tests Run | Passed | Failed | Coverage |
|---------------|-----------|--------|--------|----------|
| Prompt Injection | | | | |
| Jailbreak Attempts | | | | |
| Input Validation | | | | |
| **Total** | | | | |

**Findings:**

| Finding ID | Severity | Description | Remediation |
|------------|----------|-------------|-------------|
| | | | |

### 2.2 Output Guardrails

| Test Category | Tests Run | Passed | Failed | Coverage |
|---------------|-----------|--------|--------|----------|
| PII Detection | | | | |
| Harmful Content | | | | |
| Hallucination | | | | |
| **Total** | | | | |

**Findings:**

| Finding ID | Severity | Description | Remediation |
|------------|----------|-------------|-------------|
| | | | |

### 2.3 Tool Guardrails

| Test Category | Tests Run | Passed | Failed | Coverage |
|---------------|-----------|--------|--------|----------|
| Sandbox Escape | | | | |
| Permission Escalation | | | | |
| Rate Limiting | | | | |
| **Total** | | | | |

**Findings:**

| Finding ID | Severity | Description | Remediation |
|------------|----------|-------------|-------------|
| | | | |

---

## 3. Budget Enforcement

### 3.1 Token Budget Tests

| Scenario | Budget | Actual | Within Limit | Graceful Denial |
|----------|--------|--------|--------------|-----------------|
| Normal operation | | | [ ] | N/A |
| Near limit | | | [ ] | N/A |
| Exceed limit | | | [ ] | [ ] |

### 3.2 Cost Budget Tests

| Scenario | Budget | Actual | Within Limit | Alert Triggered |
|----------|--------|--------|--------------|-----------------|
| Normal operation | | | [ ] | N/A |
| 80% threshold | | | [ ] | [ ] |
| 100% limit | | | [ ] | [ ] |

---

## 4. Kill Switch Verification

| Test | Target | Actual | Status |
|------|--------|--------|--------|
| Feature flag disable | < 100ms | | |
| Circuit breaker trigger | < 100ms | | |
| Manual override | < 100ms | | |
| Concurrent requests | All stopped | | |

---

## 5. Memory Isolation

### 5.1 Tenant Scoping

| Memory Tier | Tenant Isolated | Cross-Tenant Test | Status |
|-------------|-----------------|-------------------|--------|
| Working | [ ] | [ ] | |
| Episodic | [ ] | [ ] | |
| Semantic | [ ] | [ ] | |
| Procedural | [ ] | [ ] | |
| Collective | N/A | N/A | |

### 5.2 Session Isolation

| Test | Result |
|------|--------|
| Session A cannot access Session B memory | |
| Session cleanup on termination | |
| Memory not persisted without consent | |

---

## 6. Evaluation Results

### 6.1 Golden Task Performance

| Task Category | Tasks | Pass Rate | Target | Status |
|---------------|-------|-----------|--------|--------|
| Relevance | | | >= 80% | |
| Faithfulness | | | >= 90% | |
| Safety | | | 100% | |

### 6.2 Regression Analysis

| Metric | Baseline | Current | Delta | Status |
|--------|----------|---------|-------|--------|
| Accuracy | | | | |
| Latency (p95) | | | | |
| Token Usage | | | | |

---

## 7. EU AI Act Compliance

| Requirement | Applicable | Implemented | Evidence |
|-------------|------------|-------------|----------|
| Risk Classification | [ ] | [ ] | |
| Transparency Labeling | [ ] | [ ] | |
| Human Oversight | [ ] | [ ] | |
| Technical Documentation | [ ] | [ ] | |

---

## 8. Data Privacy

| Check | Status | Notes |
|-------|--------|-------|
| PII masking in traces | | |
| No PII in logs | | |
| GDPR deletion compliance | | |
| Tenant data training exclusion | | |

---

## 9. Gate Decision

### 9.1 QG-I3 Criteria

| Criteria | Requirement | Status |
|----------|-------------|--------|
| Guardrails Active | All critical guardrails verified | [ ] |
| Budget Enforcement | Token/cost limits working | [ ] |
| Kill Switch | Response < 100ms | [ ] |
| Memory Isolation | Tenant-scoped and session-scoped | [ ] |
| Prompt Injection | All tests pass | [ ] |

### 9.2 Gate Outcome

| Outcome | Criteria |
|---------|----------|
| **PASS** | All criteria met |
| **CONDITIONAL** | Minor gaps with immediate remediation |
| **FAIL** | Critical safety gaps |

**Decision:** [ ] PASS / [ ] CONDITIONAL / [ ] FAIL

**Justification:**


---

## 10. Remediation Plan

| Finding | Severity | Owner | Due Date | Status |
|---------|----------|-------|----------|--------|
| | | | | |

---

## Web Research Queries

Before finalizing this report, verify current best practices:

- "AI agent safety verification best practices {date}"
- "LLM guardrail testing methodology {date}"
- "prompt injection defense patterns {date}"
- "AI agent kill switch implementation {date}"

_Source: [URL]_ citations for key findings.

---

## Verification Checklist

- [ ] All guardrail tests executed
- [ ] Budget enforcement verified
- [ ] Kill switch response < 100ms
- [ ] Memory isolation confirmed
- [ ] Golden tasks meet thresholds
- [ ] Regression analysis completed
- [ ] EU AI Act requirements checked
- [ ] Data privacy verified
- [ ] Gate decision documented
- [ ] Remediation plan defined for any findings

---

## Related Artifacts

- Agent runtime configuration
- Test execution logs
- Langfuse trace samples
- Golden task definitions

---

## Approvals

| Role | Name | Date | Signature |
|------|------|------|-----------|
| AI Safety Engineer | | | |
| Security Lead | | | |
| Product Owner | | | |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial document |
