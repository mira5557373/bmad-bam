---
name: agent-test-report-template
description: Documents agent test results including golden task evaluation, safety tests, and tenant isolation verification
category: testing
version: "1.0.0"
---

# Agent Test Report Template

## Report Information

| Field | Value |
|-------|-------|
| **Report ID** | {{report_id}} |
| **Test Suite** | {{test_suite_name}} |
| **Date** | {{date}} |
| **Tester** | {{author}} |
| **Agent Version** | {{agent_version}} |
| **Status** | {{pass|fail|partial}} |

## Test Summary

### Overall Results

| Metric | Value |
|--------|-------|
| Total Tests | {{total_tests}} |
| Passed | {{passed_count}} |
| Failed | {{failed_count}} |
| Skipped | {{skipped_count}} |
| Pass Rate | {{pass_rate}}% |
| Duration | {{total_duration}} |

### Category Breakdown

| Category | Passed | Failed | Pass Rate |
|----------|--------|--------|-----------|
| Golden Tasks | {{golden_passed}} | {{golden_failed}} | {{golden_rate}}% |
| Safety Tests | {{safety_passed}} | {{safety_failed}} | {{safety_rate}}% |
| Tool Tests | {{tool_passed}} | {{tool_failed}} | {{tool_rate}}% |
| Isolation Tests | {{isolation_passed}} | {{isolation_failed}} | {{isolation_rate}}% |
| Performance Tests | {{perf_passed}} | {{perf_failed}} | {{perf_rate}}% |

## Golden Task Evaluation

### Task Results

| Task ID | Task Description | Expected | Actual | Score | Status |
|---------|------------------|----------|--------|-------|--------|
| GT-001 | {{task_1}} | {{expected_1}} | {{actual_1}} | {{score_1}} | {{status_1}} |
| GT-002 | {{task_2}} | {{expected_2}} | {{actual_2}} | {{score_2}} | {{status_2}} |
| GT-003 | {{task_3}} | {{expected_3}} | {{actual_3}} | {{score_3}} | {{status_3}} |

### Quality Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Relevance Score | >= 0.8 | {{relevance_score}} | {{relevance_status}} |
| Completion Rate | >= 0.9 | {{completion_rate}} | {{completion_status}} |
| Factual Accuracy | >= 0.95 | {{accuracy_score}} | {{accuracy_status}} |
| Response Coherence | >= 0.85 | {{coherence_score}} | {{coherence_status}} |

## Safety Test Results

### Prompt Injection Tests

| Test ID | Attack Vector | Expected | Result | Status |
|---------|---------------|----------|--------|--------|
| PI-001 | Instruction override | Reject | {{pi_001_result}} | {{pi_001_status}} |
| PI-002 | Context manipulation | Reject | {{pi_002_result}} | {{pi_002_status}} |
| PI-003 | Role confusion | Reject | {{pi_003_result}} | {{pi_003_status}} |
| PI-004 | Encoded injection | Reject | {{pi_004_result}} | {{pi_004_status}} |

### Guardrail Tests

| Test ID | Guardrail | Test Input | Expected | Result | Status |
|---------|-----------|------------|----------|--------|--------|
| GR-001 | Input filter | {{gr_001_input}} | Block | {{gr_001_result}} | {{gr_001_status}} |
| GR-002 | Output filter | {{gr_002_input}} | Sanitize | {{gr_002_result}} | {{gr_002_status}} |
| GR-003 | Topic restriction | {{gr_003_input}} | Redirect | {{gr_003_result}} | {{gr_003_status}} |

### Kill Switch Tests

| Test ID | Trigger | Response Time | Target | Status |
|---------|---------|---------------|--------|--------|
| KS-001 | Manual activation | {{ks_001_time}}ms | <100ms | {{ks_001_status}} |
| KS-002 | Budget exceeded | {{ks_002_time}}ms | <100ms | {{ks_002_status}} |
| KS-003 | Safety violation | {{ks_003_time}}ms | <100ms | {{ks_003_status}} |

## Tool Permission Tests

### Permission Enforcement

| Tool | Permission | Test | Expected | Result | Status |
|------|------------|------|----------|--------|--------|
| {{tool_1}} | {{perm_1}} | Unauthorized call | Deny | {{tool_1_result}} | {{tool_1_status}} |
| {{tool_2}} | {{perm_2}} | Authorized call | Allow | {{tool_2_result}} | {{tool_2_status}} |

## Tenant Isolation Tests

### Cross-Tenant Access Tests

| Test ID | Action | Source Tenant | Target Tenant | Expected | Result | Status |
|---------|--------|---------------|---------------|----------|--------|--------|
| TI-001 | Read data | tenant_a | tenant_b | Deny | {{ti_001_result}} | {{ti_001_status}} |
| TI-002 | Write data | tenant_a | tenant_b | Deny | {{ti_002_result}} | {{ti_002_status}} |
| TI-003 | Tool execution | tenant_a | tenant_b | Deny | {{ti_003_result}} | {{ti_003_status}} |

## Performance Metrics

| Metric | P50 | P95 | P99 | Target | Status |
|--------|-----|-----|-----|--------|--------|
| Response Time | {{p50_response}} | {{p95_response}} | {{p99_response}} | <3s P95 | {{response_status}} |
| TTFT | {{p50_ttft}} | {{p95_ttft}} | {{p99_ttft}} | <500ms P95 | {{ttft_status}} |
| Token/sec | {{p50_tokens}} | {{p95_tokens}} | {{p99_tokens}} | >50 P50 | {{token_status}} |

## Failed Test Details

### Failure #1: {{failure_1_id}}

- **Category:** {{failure_1_category}}
- **Description:** {{failure_1_description}}
- **Expected:** {{failure_1_expected}}
- **Actual:** {{failure_1_actual}}
- **Root Cause:** {{failure_1_root_cause}}
- **Remediation:** {{failure_1_remediation}}

## Recommendations

1. {{recommendation_1}}
2. {{recommendation_2}}
3. {{recommendation_3}}

## Verification Checklist

- [ ] All golden tasks meet quality thresholds
- [ ] All safety tests pass
- [ ] All tool permission tests pass
- [ ] All tenant isolation tests pass
- [ ] Performance meets SLO targets
- [ ] Kill switch responds within 100ms
- [ ] No prompt injection vulnerabilities

## Web Research Queries

- Search: "LLM agent testing frameworks {date}"
- Search: "AI safety testing methodology {date}"
- Search: "prompt injection testing {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
