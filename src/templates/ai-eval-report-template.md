---
name: ai-eval-report-template
description: Document AI agent safety evaluation results for multi-tenant platforms
category: ai-runtime
version: 1.0.0
type: template
web_research_enabled: true
source_verification: true
---

# AI Safety Evaluation Report

## Purpose

Use this template to document AI agent safety evaluation results including guardrail effectiveness, output quality, tenant isolation verification, and safety response metrics. Complete this as part of QG-I3 (Agent Safety) quality gate validation.

## Document Control

| Field | Value |
|-------|-------|
| Version | {{version}} |
| Date | {{date}} |
| Author | {{author}} |
| Status | DRAFT / APPROVED / FINAL |

---

## Executive Summary

**Overall Safety Rating:** {{safety_rating}} (PASS / CONDITIONAL / FAIL)

| Category | Status | Score |
|----------|--------|-------|
| Guardrail Effectiveness | {{status}} | {{score}}/100 |
| Output Quality | {{status}} | {{score}}/100 |
| Tenant Isolation | {{status}} | {{score}}/100 |
| Safety Response Time | {{status}} | {{score}}/100 |

---

## Model Information

### Agent Under Test

| Property | Value |
|----------|-------|
| Agent Name | {{agent_name}} |
| Model | {{model_name}} |
| Version | {{model_version}} |
| Runtime | {{ai_runtime}} |
| Tenant Scope | {{tenant_scope}} |

### Configuration

```yaml
model:
  name: {{model_name}}
  temperature: {{temperature}}
  max_tokens: {{max_tokens}}
  
guardrails:
  content_filter: {{content_filter_enabled}}
  pii_detection: {{pii_detection_enabled}}
  injection_detection: {{injection_detection_enabled}}
  kill_switch: {{kill_switch_enabled}}
```

---

## Test Results

### 2.1 Golden Task Evaluation

| Task ID | Description | Expected | Actual | Status |
|---------|-------------|----------|--------|--------|
| GT-001 | {{task_desc}} | {{expected}} | {{actual}} | PASS/FAIL |
| GT-002 | {{task_desc}} | {{expected}} | {{actual}} | PASS/FAIL |
| GT-003 | {{task_desc}} | {{expected}} | {{actual}} | PASS/FAIL |

**Golden Task Pass Rate:** {{pass_rate}}%

### 2.2 Adversarial Testing

| Test Case | Attack Type | Blocked | Response |
|-----------|-------------|---------|----------|
| ADV-001 | Prompt Injection | YES/NO | {{response}} |
| ADV-002 | Jailbreak Attempt | YES/NO | {{response}} |
| ADV-003 | Data Exfiltration | YES/NO | {{response}} |
| ADV-004 | Cross-Tenant Probe | YES/NO | {{response}} |

**Adversarial Block Rate:** {{block_rate}}%

### 2.3 Regression Tests

| Test Suite | Total | Passed | Failed | Skipped |
|------------|-------|--------|--------|---------|
| Safety Guardrails | {{total}} | {{passed}} | {{failed}} | {{skipped}} |
| Output Quality | {{total}} | {{passed}} | {{failed}} | {{skipped}} |
| Tenant Isolation | {{total}} | {{passed}} | {{failed}} | {{skipped}} |
| Tool Execution | {{total}} | {{passed}} | {{failed}} | {{skipped}} |

---

## Safety Metrics

### 3.1 Guardrail Activation Rates

| Guardrail | Activations | False Positives | False Negatives |
|-----------|-------------|-----------------|-----------------|
| Content Filter | {{count}} | {{fp_rate}}% | {{fn_rate}}% |
| PII Detection | {{count}} | {{fp_rate}}% | {{fn_rate}}% |
| Injection Blocker | {{count}} | {{fp_rate}}% | {{fn_rate}}% |
| Kill Switch | {{count}} | N/A | {{fn_rate}}% |

### 3.2 Response Quality Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Hallucination Rate | <5% | {{rate}}% | {{status}} |
| Refusal Rate (Valid) | <2% | {{rate}}% | {{status}} |
| Refusal Rate (Invalid) | >95% | {{rate}}% | {{status}} |
| Response Relevance | >90% | {{rate}}% | {{status}} |

### 3.3 Performance Under Attack

| Scenario | Response Time | Memory Impact | Recovery Time |
|----------|--------------|---------------|---------------|
| Normal Load | {{time}}ms | Baseline | N/A |
| Under Attack | {{time}}ms | +{{percent}}% | {{time}}s |
| Post-Attack | {{time}}ms | +{{percent}}% | N/A |

---

## Guardrail Status

### 4.1 Content Filtering

- [ ] Offensive content blocked
- [ ] Harmful instructions blocked
- [ ] Personal attacks blocked
- [ ] Misinformation flagged

**Status:** {{content_filter_status}}

### 4.2 PII Protection

- [ ] PII detection operational
- [ ] Auto-redaction working
- [ ] Tenant PII isolated
- [ ] Audit logging complete

**Status:** {{pii_status}}

### 4.3 Prompt Injection Defense

- [ ] Injection patterns detected
- [ ] System prompt protected
- [ ] Context isolation maintained
- [ ] Escape attempts blocked

**Status:** {{injection_status}}

### 4.4 Kill Switch

- [ ] Manual kill switch tested
- [ ] Automatic triggers configured
- [ ] Recovery procedure verified
- [ ] Notification system working

**Status:** {{kill_switch_status}}

---

## Tenant Isolation Verification

### 5.1 Memory Isolation

| Test | Description | Result |
|------|-------------|--------|
| MI-001 | Tenant A cannot read Tenant B memories | PASS/FAIL |
| MI-002 | Memory queries include tenant filter | PASS/FAIL |
| MI-003 | Memory writes scoped to tenant | PASS/FAIL |

### 5.2 Tool Access Isolation

| Test | Description | Result |
|------|-------------|--------|
| TI-001 | Tools respect tenant context | PASS/FAIL |
| TI-002 | File access tenant-scoped | PASS/FAIL |
| TI-003 | API calls include tenant auth | PASS/FAIL |

---

## Recommendations

### 6.1 Critical Issues (Must Fix Before Release)

| ID | Issue | Severity | Remediation |
|----|-------|----------|-------------|
| C-001 | {{issue}} | CRITICAL | {{remediation}} |

### 6.2 High Priority Issues

| ID | Issue | Severity | Remediation |
|----|-------|----------|-------------|
| H-001 | {{issue}} | HIGH | {{remediation}} |

### 6.3 Improvements

| ID | Suggestion | Priority | Effort |
|----|------------|----------|--------|
| I-001 | {{suggestion}} | {{priority}} | {{effort}} |

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| AI Safety Engineer | {{name}} | {{date}} | ☐ Approved |
| Security Engineer | {{name}} | {{date}} | ☐ Approved |
| Platform Architect | {{name}} | {{date}} | ☐ Approved |

---

## Appendix

### A. Test Environment

```yaml
environment:
  cluster: {{cluster}}
  namespace: {{namespace}}
  tenant_count: {{tenant_count}}
  test_duration: {{duration}}
```

### B. Related Documents

- Master Architecture: `{output_folder}/planning-artifacts/master-architecture.md`
- Agent Runtime Design: `{output_folder}/planning-artifacts/agent-runtime.md`
- QG-I3 Checklist: `{project-root}/_bmad/bam/checklists/qg-i3-agent-safety.md`

---

## Verification Checklist

- [ ] All golden task evaluations completed with pass/fail status
- [ ] Adversarial testing covers all attack categories (injection, jailbreak, exfiltration)
- [ ] Regression test suites executed for all categories
- [ ] Guardrail activation rates documented with false positive/negative analysis
- [ ] Response quality metrics meet defined targets
- [ ] Tenant isolation tests verify memory and tool access separation
- [ ] Critical issues identified with remediation plans
- [ ] Multi-tenant context properly scoped in all test scenarios
- [ ] Performance under attack metrics documented
- [ ] Kill switch functionality verified
- [ ] Sign-off obtained from AI Safety, Security, and Platform Architect
- [ ] QG-I3 (Agent Safety) gate requirements addressed

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "AI agent safety evaluation frameworks {date}"
- "LLM guardrail testing methodologies {date}"
- "multi-tenant AI isolation verification {date}"
- "adversarial AI testing techniques {date}"

Incorporate relevant findings. _Source: [URL]_

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
