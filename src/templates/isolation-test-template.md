---
name: isolation-test-template
description: Template for dev isolation testing in multi-tenant environments
category: testing
version: 1.0.0
type: "testing"
---

## Purpose

Template for dev isolation testing in multi-tenant environments

# Isolation Test Specification: {{test_name}}

> Project: {{project_name}}
> Module: {{module_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

---

## Test Overview

### 1.1 Test Identity

| Field | Value |
|-------|-------|
| Test Name | {{test_name}} |
| Test Type | Isolation Test |
| Target Module | {{module_name}} |
| Tenant Model | {{tenant_model}} |
| Priority | {{test_priority}} |
| Automation Status | {{automation_status}} |

### 1.2 Test Objective

{{test_objective}}

### 1.3 Test Scope

| In Scope | Out of Scope |
|----------|--------------|
| {{in_scope_1}} | {{out_scope_1}} |
| {{in_scope_2}} | {{out_scope_2}} |
| {{in_scope_3}} | {{out_scope_3}} |

## Multi-Tenant Considerations

- Tenant isolation: {{isolation_approach}}
- Tier differentiation: {{tier_strategy}}
- Test isolation: {{test_isolation_approach}}

---

## Test Environment

### 2.1 Environment Configuration

| Component | Configuration | Notes |
|-----------|---------------|-------|
| Database | {{db_config}} | {{db_notes}} |
| Cache | {{cache_config}} | {{cache_notes}} |
| Message Queue | {{mq_config}} | {{mq_notes}} |
| AI Runtime | {{ai_config}} | {{ai_notes}} |

### 2.2 Tenant Configuration

| Tenant | ID | Tier | Purpose | Data Seeded |
|--------|-----|------|---------|-------------|
| Attacker | {{attacker_id}} | {{attacker_tier}} | Attempt violations | {{attacker_data}} |
| Victim | {{victim_id}} | {{victim_tier}} | Target of attacks | {{victim_data}} |
| Control | {{control_id}} | {{control_tier}} | Verify normal behavior | {{control_data}} |
| Admin | {{admin_id}} | Platform | Cross-tenant access | {{admin_data}} |

### 2.3 Test Data Requirements

| Data Type | Attacker Tenant | Victim Tenant | Shared |
|-----------|-----------------|---------------|--------|
| Users | {{attacker_users}} | {{victim_users}} | N/A |
| {{entity_1}} | {{attacker_entity_1}} | {{victim_entity_1}} | {{shared_entity_1}} |
| {{entity_2}} | {{attacker_entity_2}} | {{victim_entity_2}} | {{shared_entity_2}} |
| {{entity_3}} | {{attacker_entity_3}} | {{victim_entity_3}} | {{shared_entity_3}} |

---

## Test Cases

### 3.1 Data Read Isolation Tests

| Test ID | Description | Attacker Action | Expected Result | Status |
|---------|-------------|-----------------|-----------------|--------|
| ISO-R-001 | Direct ID access | GET /{{resource}}/{victim_id} | 404 Not Found | {{r001_status}} |
| ISO-R-002 | List filtering | GET /{{resource}}?all=true | Only attacker's data | {{r002_status}} |
| ISO-R-003 | Search scope | GET /{{resource}}/search?q=* | Only attacker's matches | {{r003_status}} |
| ISO-R-004 | Nested resource access | GET /{{resource}}/{victim_id}/{{child}} | 404 Not Found | {{r004_status}} |
| ISO-R-005 | Bulk read attempt | POST /{{resource}}/bulk with victim IDs | Empty or 404 | {{r005_status}} |

### 3.2 Data Write Isolation Tests

| Test ID | Description | Attacker Action | Expected Result | Status |
|---------|-------------|-----------------|-----------------|--------|
| ISO-W-001 | Direct update | PUT /{{resource}}/{victim_id} | 404 or 403 | {{w001_status}} |
| ISO-W-002 | Create with victim tenant | POST with tenant_id: victim | Rejected or ignored | {{w002_status}} |
| ISO-W-003 | Partial update | PATCH /{{resource}}/{victim_id} | 404 or 403 | {{w003_status}} |
| ISO-W-004 | Delete attempt | DELETE /{{resource}}/{victim_id} | 404 or 403 | {{w004_status}} |
| ISO-W-005 | Bulk update attempt | PUT /{{resource}}/bulk with victim IDs | No victim updates | {{w005_status}} |

### 3.3 Database Layer Tests

| Test ID | Description | Query | Expected Result | Status |
|---------|-------------|-------|-----------------|--------|
| ISO-DB-001 | RLS read policy | SELECT without context | Empty or error | {{db001_status}} |
| ISO-DB-002 | RLS write policy | INSERT with wrong tenant | Rejected | {{db002_status}} |
| ISO-DB-003 | RLS update policy | UPDATE victim's rows | 0 rows affected | {{db003_status}} |
| ISO-DB-004 | RLS delete policy | DELETE victim's rows | 0 rows affected | {{db004_status}} |
| ISO-DB-005 | Schema isolation | Cross-schema query | Permission denied | {{db005_status}} |

### 3.4 Cache Layer Tests

| Test ID | Description | Action | Expected Result | Status |
|---------|-------------|--------|-----------------|--------|
| ISO-C-001 | Cache key isolation | Read victim's cache key | Cache miss | {{c001_status}} |
| ISO-C-002 | Cache poisoning | Write to victim's key | Rejected or prefixed | {{c002_status}} |
| ISO-C-003 | Cache enumeration | Scan for victim's keys | Not accessible | {{c003_status}} |
| ISO-C-004 | Session isolation | Read victim's session | Not accessible | {{c004_status}} |

### 3.5 AI/Agent Isolation Tests

| Test ID | Description | Action | Expected Result | Status |
|---------|-------------|--------|-----------------|--------|
| ISO-AI-001 | Memory scope | Query victim's memory | Not accessible | {{ai001_status}} |
| ISO-AI-002 | Tool access | Execute tool with victim context | Rejected | {{ai002_status}} |
| ISO-AI-003 | Agent context | Run agent asking for victim data | No victim data | {{ai003_status}} |
| ISO-AI-004 | Vector store | Similarity search | Only attacker's vectors | {{ai004_status}} |
| ISO-AI-005 | Prompt injection | Inject tenant switch prompt | Context unchanged | {{ai005_status}} |

---

## Attack Simulation Tests

### 4.1 IDOR Attack Tests

| Test ID | Attack Vector | Payload | Defense | Status |
|---------|---------------|---------|---------|--------|
| ATK-IDOR-001 | Sequential ID | victim_id = attacker_id + 1 | ID opacity | {{idor001_status}} |
| ATK-IDOR-002 | UUID guessing | Random UUID | Authorization | {{idor002_status}} |
| ATK-IDOR-003 | Reference swap | Change ref in nested request | Reference validation | {{idor003_status}} |

### 4.2 Parameter Tampering Tests

| Test ID | Attack Vector | Payload | Defense | Status |
|---------|---------------|---------|---------|--------|
| ATK-PARAM-001 | Body tenant_id | `{"tenant_id": "victim"}` | Ignore body tenant | {{param001_status}} |
| ATK-PARAM-002 | Query param | `?tenant_id=victim` | Ignore query tenant | {{param002_status}} |
| ATK-PARAM-003 | Header injection | `X-Tenant-ID: victim` | Use JWT only | {{param003_status}} |

### 4.3 Injection Attack Tests

| Test ID | Attack Vector | Payload | Defense | Status |
|---------|---------------|---------|---------|--------|
| ATK-INJ-001 | SQL in ID | `'; SET tenant=victim; --` | Parameterized queries | {{inj001_status}} |
| ATK-INJ-002 | NoSQL operator | `{"tenant_id": {"$ne": "attacker"}}` | Input validation | {{inj002_status}} |
| ATK-INJ-003 | GraphQL depth | Deep nested query | Query depth limit | {{inj003_status}} |

### 4.4 Side Channel Tests

| Test ID | Attack Vector | Method | Defense | Status |
|---------|---------------|--------|---------|--------|
| ATK-SIDE-001 | Timing attack | Measure response times | Constant-time ops | {{side001_status}} |
| ATK-SIDE-002 | Error disclosure | Analyze error messages | Generic errors | {{side002_status}} |
| ATK-SIDE-003 | Enumeration | Brute force IDs | Rate limiting | {{side003_status}} |

---

## Test Execution

### 5.1 Execution Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Isolation Test Execution                       │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Setup     │───►│   Execute   │───►│  Teardown   │         │
│  │ Environment │    │    Tests    │    │   Cleanup   │         │
│  └─────────────┘    └──────┬──────┘    └─────────────┘         │
│                            │                                     │
│         ┌──────────────────┼──────────────────┐                 │
│         ▼                  ▼                  ▼                 │
│  ┌───────────┐      ┌───────────┐      ┌───────────┐           │
│  │   Read    │      │   Write   │      │  Attack   │           │
│  │   Tests   │      │   Tests   │      │   Tests   │           │
│  └─────┬─────┘      └─────┬─────┘      └─────┬─────┘           │
│        │                  │                  │                  │
│        └──────────────────┴──────────────────┘                  │
│                           │                                      │
│                    ┌──────▼──────┐                              │
│                    │   Report    │                              │
│                    │  Generation │                              │
│                    └─────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Pre-Test Setup

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Create test tenants | Tenants exist in system |
| 2 | Seed tenant data | Data counts match spec |
| 3 | Generate credentials | Auth tokens valid |
| 4 | Verify isolation baseline | Normal operations work |
| 5 | Enable test logging | Logs capturing |

### 5.3 Post-Test Cleanup

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Remove test data | Data counts zero |
| 2 | Delete test tenants | Tenants not found |
| 3 | Revoke credentials | Tokens invalid |
| 4 | Archive logs | Logs stored |

---

## Test Automation

### 6.1 Automation Framework

```yaml
isolation_tests:
  framework: {{test_framework}}
  runner: {{test_runner}}
  
  fixtures:
    tenant_factory: {{tenant_factory_path}}
    data_seeder: {{data_seeder_path}}
    auth_helper: {{auth_helper_path}}
    
  suites:
    - name: read_isolation
      tests: {{read_tests_path}}
      tags: [isolation, read]
      
    - name: write_isolation
      tests: {{write_tests_path}}
      tags: [isolation, write]
      
    - name: attack_simulation
      tests: {{attack_tests_path}}
      tags: [isolation, security]
      
  reporting:
    format: {{report_format}}
    output: {{report_output}}
```

### 6.2 Test Data Generation

| Generator | Purpose | Configuration |
|-----------|---------|---------------|
| Tenant Factory | Create test tenants | {{tenant_factory_config}} |
| User Factory | Create test users | {{user_factory_config}} |
| Data Seeder | Populate test data | {{seeder_config}} |
| Attack Payload Generator | Generate attack payloads | {{attack_gen_config}} |

### 6.3 CI/CD Integration

| Pipeline Stage | Tests Run | Failure Action |
|----------------|-----------|----------------|
| PR Validation | Smoke tests | Block merge |
| Merge to main | Full suite | Alert + investigate |
| Pre-deploy | Critical tests | Block deploy |
| Post-deploy | Smoke tests | Rollback trigger |

---

## Expected Results

### 7.1 Pass Criteria

| Category | Pass Threshold | Current |
|----------|----------------|---------|
| Read Isolation | 100% | {{read_pass_rate}} |
| Write Isolation | 100% | {{write_pass_rate}} |
| Database Isolation | 100% | {{db_pass_rate}} |
| Cache Isolation | 100% | {{cache_pass_rate}} |
| AI Isolation | 100% | {{ai_pass_rate}} |
| Attack Prevention | 100% | {{attack_pass_rate}} |

### 7.2 Failure Response

| Failure Type | Severity | Response Time | Escalation |
|--------------|----------|---------------|------------|
| Data leak | Critical | Immediate | Security team + leadership |
| Write to other tenant | Critical | Immediate | Security team |
| Read other tenant | High | < 4 hours | Engineering lead |
| Cache pollution | Medium | < 24 hours | Module owner |
| Test flakiness | Low | Next sprint | QA team |

---

## Test Results

### 8.1 Summary

| Category | Total | Passed | Failed | Skipped |
|----------|-------|--------|--------|---------|
| Read Isolation | {{read_total}} | {{read_passed}} | {{read_failed}} | {{read_skipped}} |
| Write Isolation | {{write_total}} | {{write_passed}} | {{write_failed}} | {{write_skipped}} |
| Database | {{db_total}} | {{db_passed}} | {{db_failed}} | {{db_skipped}} |
| Cache | {{cache_total}} | {{cache_passed}} | {{cache_failed}} | {{cache_skipped}} |
| AI | {{ai_total}} | {{ai_passed}} | {{ai_failed}} | {{ai_skipped}} |
| Attack | {{attack_total}} | {{attack_passed}} | {{attack_failed}} | {{attack_skipped}} |
| **Total** | {{total_tests}} | {{total_passed}} | {{total_failed}} | {{total_skipped}} |

### 8.2 Failed Test Details

| Test ID | Description | Failure Reason | Remediation | Owner |
|---------|-------------|----------------|-------------|-------|
| {{fail_id_1}} | {{fail_desc_1}} | {{fail_reason_1}} | {{fail_fix_1}} | {{fail_owner_1}} |
| {{fail_id_2}} | {{fail_desc_2}} | {{fail_reason_2}} | {{fail_fix_2}} | {{fail_owner_2}} |

### 8.3 Coverage Analysis

| Coverage Type | Target | Actual | Gap |
|---------------|--------|--------|-----|
| API endpoints | 100% | {{api_coverage}} | {{api_gap}} |
| Database tables | 100% | {{db_coverage}} | {{db_gap}} |
| Cache keys | 100% | {{cache_coverage}} | {{cache_gap}} |
| Attack vectors | 100% | {{attack_coverage}} | {{attack_gap}} |

---

## Verification Checklist

### 9.1 Test Completeness

- [ ] All API endpoints covered
- [ ] All database tables with tenant_id tested
- [ ] All cache key patterns tested
- [ ] IDOR attack vectors covered
- [ ] Parameter tampering covered
- [ ] Injection attacks covered
- [ ] Side channel attacks covered

### 9.2 Test Quality

- [ ] Tests are deterministic (no flakiness)
- [ ] Tests are independent (can run in any order)
- [ ] Tests clean up after themselves
- [ ] Tests run in reasonable time
- [ ] Tests have meaningful assertions

### 9.3 Multi-Tenant Verification

- [ ] Tests use multiple tenants
- [ ] Cross-tenant access always fails
- [ ] Same-tenant access always succeeds
- [ ] Platform admin access works correctly
- [ ] Tenant deletion stops all access

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant lifecycle SaaS patterns {date}"
- "tenant isolation testing multi-tenant {date}"
- "cross-tenant security testing enterprise SaaS {date}"
- "IDOR testing multi-tenant applications {date}"

Incorporate relevant findings. _Source: [URL]_

---

## Appendix A: Test Utilities

### A.1 Helper Functions

| Function | Purpose | Parameters |
|----------|---------|------------|
| `create_tenant()` | Create test tenant | tier, config |
| `seed_data()` | Seed tenant data | tenant_id, data_spec |
| `get_auth_token()` | Get JWT for tenant | tenant_id, user_id |
| `attempt_access()` | Try cross-tenant access | attacker_token, victim_resource |
| `verify_isolation()` | Check isolation | tenant_id, expected_data |

### A.2 Assertion Helpers

| Assertion | Purpose | Example |
|-----------|---------|---------|
| `assert_not_found()` | Verify 404 response | Cross-tenant GET |
| `assert_forbidden()` | Verify 403 response | Unauthorized action |
| `assert_no_data_leak()` | Check no victim data | Response body check |
| `assert_unchanged()` | Verify no modification | Pre/post comparison |

---

## Appendix B: Related Documents

- Pattern: `tenant-isolation-testing` in `bam-patterns.csv`
- Template: `testing-isolation-template.md`
- Quality Gate: `qg-i2-tenant-safety.md`
- Workflow: `bmad-bam-tenant-model-isolation`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial test specification |
