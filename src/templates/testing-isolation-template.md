---
name: Testing Isolation Template
description: Template for documenting tenant isolation test planning and cross-tenant security testing
category: tenant
version: 1.0.0
type: "testing"
---

## Purpose

Template for documenting tenant isolation test planning and cross-tenant security testing

# Tenant Isolation Test Plan

> Project: {{project_name}}
> Version: {{version}}
> Date: {{date}}
> Author: {{author}}

## Test Strategy

### 1.1 Purpose

This document specifies the tenant isolation testing strategy for {{project_name}}, defining how tenant data boundaries are verified, cross-tenant attacks are simulated, and isolation guarantees are validated across all system layers.

### 1.2 Scope

- Tenant isolation verification approach
- Unit, integration, and end-to-end testing
- Cross-tenant attack simulation
- Chaos engineering for isolation
- Security testing checklist
- Compliance verification

### 1.3 Tenant Model Under Test

**Selected Model:** {{tenant_model}}

| Model | Isolation Boundary | Primary Risk | Test Focus |
|-------|-------------------|--------------|------------|
| Row-Level Security | Row policy | Policy bypass | RLS policy completeness |
| Schema-per-Tenant | Schema boundary | Schema leakage | Cross-schema queries |
| Database-per-Tenant | Database instance | Connection routing | Connection string isolation |

### 1.4 Test Pyramid for Isolation

```
                    ┌───────────────┐
                    │   E2E Tests   │  ◄── Cross-tenant scenarios
                    │     (10%)     │      Real multi-tenant env
                    └───────┬───────┘
                            │
               ┌────────────┴────────────┐
               │   Integration Tests     │  ◄── API boundary tests
               │         (30%)           │      Database isolation
               └────────────┬────────────┘
                            │
          ┌─────────────────┴─────────────────┐
          │           Unit Tests              │  ◄── Context propagation
          │             (60%)                 │      Policy logic
          └───────────────────────────────────┘
```

### 1.5 Test Environment Matrix

| Environment | Tenant Count | Data Type | Isolation Mode | Purpose |
|-------------|--------------|-----------|----------------|---------|
| Unit | 1 (mocked) | Fixtures | Simulated | Logic verification |
| Integration | 2-5 | Synthetic | Real {{tenant_model}} | Boundary testing |
| Staging | 10-50 | Anonymized prod | Production-like | Pre-release validation |
| Production | N/A | N/A | N/A | Monitoring only |

---

## Unit Tests

### 2.1 Unit Test Coverage Areas

| Area | Tests | Priority |
|------|-------|----------|
| Tenant Context Extraction | {{context_extraction_tests}} | Critical |
| Context Propagation | {{context_propagation_tests}} | Critical |
| RLS Policy Logic | {{rls_policy_tests}} | Critical |
| Query Builder Isolation | {{query_builder_tests}} | High |
| Cache Key Generation | {{cache_key_tests}} | High |
| Error Message Sanitization | {{error_sanitization_tests}} | Medium |

### 2.2 Tenant Context Unit Tests

```
┌─────────────────────────────────────────────────────────────────┐
│                 Tenant Context Unit Tests                        │
│                                                                  │
│  Test Suite: TenantContextExtraction                            │
│  ├── test_extract_from_jwt_claim                                │
│  ├── test_extract_from_header                                   │
│  ├── test_extract_from_subdomain                                │
│  ├── test_reject_missing_context                                │
│  ├── test_reject_malformed_context                              │
│  └── test_reject_invalid_tenant_id                              │
│                                                                  │
│  Test Suite: TenantContextPropagation                           │
│  ├── test_context_attached_to_request                           │
│  ├── test_context_propagates_to_database                        │
│  ├── test_context_propagates_to_cache                           │
│  ├── test_context_propagates_to_background_jobs                 │
│  ├── test_context_immutable_after_attachment                    │
│  └── test_context_cleared_after_request                         │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Unit Test Scenarios

| Scenario | Input | Expected | Verification |
|----------|-------|----------|--------------|
| Valid JWT with tenant claim | JWT `{"tenant_id": "t_123"}` | Context created | Assert context.tenant_id == "t_123" |
| Missing tenant claim | JWT `{}` | Rejection | Assert 401 error |
| Null tenant ID | `tenant_id: null` | Rejection | Assert 400 error |
| Tenant ID injection attempt | `"t_123; DROP TABLE"` | Sanitized or rejected | Assert safe handling |
| Cross-tenant ID in request | Body tenant != JWT tenant | Rejection | Assert 403 error |

### 2.4 Policy Logic Unit Tests

| Policy | Test Case | Expected Behavior |
|--------|-----------|-------------------|
| SELECT | Query without tenant context | Fail or return empty |
| SELECT | Query with valid context | Return tenant's rows only |
| INSERT | Insert without tenant_id | Auto-populate or reject |
| INSERT | Insert with different tenant_id | Reject |
| UPDATE | Update another tenant's row | No rows affected |
| DELETE | Delete another tenant's row | No rows affected |

### 2.5 Unit Test Configuration

```yaml
unit_tests:
  isolation:
    framework: {{unit_test_framework}}
    coverage_target: {{unit_coverage_target}}%
    
    suites:
      - name: tenant_context_extraction
        files: {{context_test_files}}
        priority: critical
        
      - name: tenant_context_propagation
        files: {{propagation_test_files}}
        priority: critical
        
      - name: rls_policy_logic
        files: {{rls_test_files}}
        priority: critical
        
      - name: query_isolation
        files: {{query_test_files}}
        priority: high
        
      - name: cache_isolation
        files: {{cache_test_files}}
        priority: high
        
    mocking:
      database: {{db_mock_library}}
      cache: {{cache_mock_library}}
      external_services: {{service_mock_library}}
```

---

## Integration Tests

### 3.1 Integration Test Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│              Integration Test Environment                        │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Test Orchestrator                      │    │
│  └────────────────────────┬────────────────────────────────┘    │
│                           │                                      │
│         ┌─────────────────┼─────────────────┐                   │
│         │                 │                 │                    │
│         ▼                 ▼                 ▼                    │
│  ┌───────────┐     ┌───────────┐     ┌───────────┐             │
│  │ Tenant A  │     │ Tenant B  │     │ Tenant C  │             │
│  │ (Attacker)│     │ (Victim)  │     │ (Control) │             │
│  └─────┬─────┘     └─────┬─────┘     └─────┬─────┘             │
│        │                 │                 │                    │
│        └─────────────────┼─────────────────┘                    │
│                          │                                       │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Application Under Test                      │    │
│  └────────────────────────┬────────────────────────────────┘    │
│                           │                                      │
│         ┌─────────────────┼─────────────────┐                   │
│         │                 │                 │                    │
│         ▼                 ▼                 ▼                    │
│  ┌───────────┐     ┌───────────┐     ┌───────────┐             │
│  │ Database  │     │   Cache   │     │  Message  │             │
│  │  (Real)   │     │  (Real)   │     │   Queue   │             │
│  └───────────┘     └───────────┘     └───────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Integration Test Scenarios

| Category | Scenario | Setup | Execution | Verification |
|----------|----------|-------|-----------|--------------|
| API Boundary | Tenant A queries Tenant B data | Create data for both | A sends request with A's context, targeting B's ID | Assert 404 or 403 |
| Database Layer | RLS policy enforcement | Insert rows for A and B | Query as A | Assert only A's rows returned |
| Cache Layer | Cache key isolation | Cache data for A and B | Request as A | Assert A's cached data only |
| Background Jobs | Job isolation | Queue jobs for A and B | Process A's job | Assert no access to B's data |
| File Storage | Storage bucket isolation | Upload files for A and B | Download as A | Assert only A's files accessible |

### 3.3 API Boundary Tests

```
┌─────────────────────────────────────────────────────────────────┐
│                   API Isolation Test Matrix                      │
│                                                                  │
│  Endpoint: GET /api/v1/resources/{id}                           │
│  ┌────────────┬────────────┬────────────┬────────────────────┐ │
│  │ Caller     │ Resource   │ Expected   │ Actual             │ │
│  │ Tenant     │ Owner      │ Status     │ Status             │ │
│  ├────────────┼────────────┼────────────┼────────────────────┤ │
│  │ A          │ A          │ 200        │ {{test_result_1}}  │ │
│  │ A          │ B          │ 404        │ {{test_result_2}}  │ │
│  │ A (admin)  │ B          │ 403        │ {{test_result_3}}  │ │
│  │ None       │ A          │ 401        │ {{test_result_4}}  │ │
│  └────────────┴────────────┴────────────┴────────────────────┘ │
│                                                                  │
│  Endpoint: POST /api/v1/resources                               │
│  ┌────────────┬────────────┬────────────┬────────────────────┐ │
│  │ Caller     │ Body       │ Expected   │ Actual             │ │
│  │ Tenant     │ tenant_id  │ Behavior   │ Behavior           │ │
│  ├────────────┼────────────┼────────────┼────────────────────┤ │
│  │ A          │ A          │ Created    │ {{test_result_5}}  │ │
│  │ A          │ B          │ Rejected   │ {{test_result_6}}  │ │
│  │ A          │ None       │ Auto-fill A│ {{test_result_7}}  │ │
│  └────────────┴────────────┴────────────┴────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 Database Integration Tests

| Test | Query Type | Tenant Context | Expected Result |
|------|------------|----------------|-----------------|
| RLS Read Isolation | SELECT * | Tenant A | Only A's rows |
| RLS Write Isolation | INSERT with B's ID | Tenant A | Reject/No-op |
| RLS Update Isolation | UPDATE B's row | Tenant A | 0 rows affected |
| RLS Delete Isolation | DELETE B's row | Tenant A | 0 rows affected |
| Schema Isolation | Cross-schema query | Tenant A | Permission denied |
| Connection Isolation | Use B's connection string | Tenant A | Connection refused |

### 3.5 Integration Test Configuration

```yaml
integration_tests:
  isolation:
    framework: {{integration_test_framework}}
    parallel_execution: {{parallel_enabled}}
    
    environment:
      database: {{integration_db}}
      cache: {{integration_cache}}
      
    tenants:
      attacker:
        id: {{attacker_tenant_id}}
        role: standard
      victim:
        id: {{victim_tenant_id}}
        role: standard
      control:
        id: {{control_tenant_id}}
        role: standard
      admin:
        id: {{admin_tenant_id}}
        role: admin
        
    data_seeding:
      per_tenant_rows: {{rows_per_tenant}}
      shared_resources: {{shared_resources}}
      
    cleanup:
      strategy: {{cleanup_strategy}}  # truncate, drop, isolate
      after_each: {{cleanup_after_each}}
```

---

## Cross-Tenant Attack Simulation

### 4.1 Attack Vectors

```
┌─────────────────────────────────────────────────────────────────┐
│               Cross-Tenant Attack Simulation                     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Attack Category: Direct Access Attempts                  │    │
│  │                                                          │    │
│  │  [1] IDOR - Modify resource ID in URL                   │    │
│  │  [2] Parameter tampering - Change tenant_id in body     │    │
│  │  [3] Header injection - Forge X-Tenant-ID header        │    │
│  │  [4] JWT manipulation - Modify tenant claim             │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Attack Category: Indirect Access Attempts                │    │
│  │                                                          │    │
│  │  [5] Cache poisoning - Inject data with wrong tenant key│    │
│  │  [6] SQL injection - Bypass RLS via injection           │    │
│  │  [7] GraphQL introspection - Discover other tenants     │    │
│  │  [8] API enumeration - Brute force tenant IDs           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Attack Category: Timing/Side Channel                     │    │
│  │                                                          │    │
│  │  [9] Timing attack - Infer existence via response time  │    │
│  │  [10] Error message leak - Extract info from errors     │    │
│  │  [11] Metric/log exposure - Access other tenant metrics │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Attack Simulation Matrix

| Attack | Method | Payload | Expected Defense | Test Status |
|--------|--------|---------|------------------|-------------|
| IDOR | GET /resources/{victim_id} | N/A | 404 Not Found | {{idor_test_status}} |
| Parameter Tampering | POST with `tenant_id: victim` | JSON body | 403 Forbidden | {{param_test_status}} |
| Header Injection | X-Tenant-ID: victim | Header | Ignored (use JWT) | {{header_test_status}} |
| JWT Manipulation | Modified tenant claim | JWT | 401 Invalid Token | {{jwt_test_status}} |
| Cache Poisoning | Write with victim's key | Cache command | Tenant-prefixed keys | {{cache_test_status}} |
| SQL Injection | `'; SET tenant_id=victim; --` | Query param | Parameterized queries | {{sql_test_status}} |
| Enumeration | Sequential ID requests | URL path | Rate limiting | {{enum_test_status}} |
| Timing Attack | Measure response times | N/A | Constant-time responses | {{timing_test_status}} |

### 4.3 IDOR Test Cases

| Endpoint | Attacker Action | Target Resource | Expected Response |
|----------|-----------------|-----------------|-------------------|
| GET /users/{id} | Request victim's user ID | Victim's user | 404 or 403 |
| GET /documents/{id} | Request victim's doc ID | Victim's document | 404 or 403 |
| PUT /users/{id} | Update victim's user | Victim's user | 404 or 403 |
| DELETE /documents/{id} | Delete victim's doc | Victim's document | 404 or 403 |
| GET /users/{id}/files | List victim's files | Victim's files | 404 or 403 |

### 4.4 Injection Attack Tests

| Vector | Payload | Target | Expected Result |
|--------|---------|--------|-----------------|
| SQL in ID | `1 OR tenant_id='victim'` | WHERE clause | Sanitized/rejected |
| SQL in search | `'; UPDATE SET tenant_id=--` | Search query | Sanitized/rejected |
| NoSQL operator | `{"tenant_id": {"$ne": "attacker"}}` | MongoDB query | Rejected |
| GraphQL introspection | `{__schema{types{name}}}` | Schema | Disabled or filtered |
| Path traversal | `../victim/resource` | File path | Normalized/rejected |

### 4.5 Attack Simulation Configuration

```yaml
attack_simulation:
  enabled: {{attack_sim_enabled}}
  
  attacker:
    tenant_id: {{attacker_tenant_id}}
    credentials: {{attacker_credentials}}
    
  victim:
    tenant_id: {{victim_tenant_id}}
    seeded_data:
      - type: user
        count: {{victim_user_count}}
      - type: document
        count: {{victim_doc_count}}
        
  attacks:
    - type: idor
      endpoints: {{idor_endpoints}}
      iterations: {{idor_iterations}}
      
    - type: parameter_tampering
      endpoints: {{param_endpoints}}
      fields: [tenant_id, owner_id, org_id]
      
    - type: injection
      vectors: [sql, nosql, graphql]
      payloads_file: {{injection_payloads}}
      
    - type: enumeration
      pattern: sequential
      range: {{enum_range}}
      rate_limit_expected: {{expected_rate_limit}}
      
  reporting:
    on_vulnerability: {{vuln_action}}  # fail, warn, log
    output_format: {{report_format}}
```

---

## Chaos Engineering

### 5.1 Chaos Experiments for Isolation

```
┌─────────────────────────────────────────────────────────────────┐
│                Chaos Engineering Experiments                     │
│                                                                  │
│  Experiment 1: Database Connection Pool Exhaustion              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Hypothesis: When Tenant A exhausts connections,          │    │
│  │            Tenant B should not be affected               │    │
│  │                                                          │    │
│  │ Method: Inject connection pool exhaustion for A          │    │
│  │ Verify: B's requests still succeed                       │    │
│  │ Result: {{chaos_exp_1_result}}                           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Experiment 2: Cache Failure                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Hypothesis: Cache failure should not cause cross-tenant  │    │
│  │            data exposure                                 │    │
│  │                                                          │    │
│  │ Method: Kill cache nodes, observe fallback behavior      │    │
│  │ Verify: No cross-tenant data in responses                │    │
│  │ Result: {{chaos_exp_2_result}}                           │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Experiment 3: Context Propagation Failure                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Hypothesis: Missing context should fail-safe, not        │    │
│  │            expose data                                   │    │
│  │                                                          │    │
│  │ Method: Inject context loss in middleware                │    │
│  │ Verify: Requests fail with 401/403, no data leaked       │    │
│  │ Result: {{chaos_exp_3_result}}                           │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Chaos Experiment Definitions

| Experiment | Target | Failure Mode | Success Criteria |
|------------|--------|--------------|------------------|
| Connection Exhaustion | Database pool | Exhaust Tenant A's connections | Tenant B unaffected |
| Cache Failure | Redis cluster | Node failure | No cross-tenant data exposure |
| Context Loss | Middleware | Drop tenant context | Fail-safe (401/403) |
| Network Partition | Inter-service | Isolate services | Graceful degradation |
| High Load | Single tenant | 10x normal traffic | Other tenants unaffected |
| Schema Migration | Database | Mid-migration failure | Data isolation maintained |

### 5.3 Blast Radius Verification

| Failure Scope | Expected Impact | Actual Impact | Pass/Fail |
|---------------|-----------------|---------------|-----------|
| Single tenant overload | That tenant only | {{overload_impact}} | {{overload_result}} |
| Single service failure | Partial degradation | {{service_impact}} | {{service_result}} |
| Database region failure | Regional tenants only | {{region_impact}} | {{region_result}} |
| Global cache failure | Performance degradation | {{cache_impact}} | {{cache_result}} |

### 5.4 Chaos Configuration

```yaml
chaos_engineering:
  enabled: {{chaos_enabled}}
  framework: {{chaos_framework}}  # chaos-mesh, litmus, gremlin
  
  experiments:
    - name: connection_pool_exhaustion
      target: database
      tenant: {{chaos_target_tenant}}
      duration_seconds: {{chaos_duration}}
      verify:
        - metric: other_tenant_success_rate
          threshold: "> 99%"
          
    - name: cache_failure
      target: redis
      failure_type: node_kill
      duration_seconds: {{chaos_duration}}
      verify:
        - check: no_cross_tenant_data
          method: response_inspection
          
    - name: context_loss
      target: middleware
      injection: drop_context
      probability: {{context_loss_probability}}
      verify:
        - check: fail_safe_response
          expected_status: [401, 403]
          
  safety:
    auto_rollback: {{chaos_auto_rollback}}
    max_duration_seconds: {{chaos_max_duration}}
    excluded_tenants: {{chaos_excluded_tenants}}
```

---

## Security Testing Checklist

### 6.1 Pre-Deployment Security Checklist

| Category | Check | Status | Verified By | Date |
|----------|-------|--------|-------------|------|
| **Authentication** | | | | |
| | JWT validation enforced on all endpoints | {{jwt_check}} | {{jwt_verifier}} | {{jwt_date}} |
| | Token expiration enforced | {{token_exp_check}} | {{token_verifier}} | {{token_date}} |
| | Tenant claim required in JWT | {{tenant_claim_check}} | {{claim_verifier}} | {{claim_date}} |
| **Authorization** | | | | |
| | RBAC policies tested | {{rbac_check}} | {{rbac_verifier}} | {{rbac_date}} |
| | Cross-tenant access denied | {{cross_tenant_check}} | {{cross_verifier}} | {{cross_date}} |
| | Admin cross-tenant access audited | {{admin_check}} | {{admin_verifier}} | {{admin_date}} |
| **Data Isolation** | | | | |
| | RLS policies on all tables | {{rls_check}} | {{rls_verifier}} | {{rls_date}} |
| | No direct table access (views/functions only) | {{direct_check}} | {{direct_verifier}} | {{direct_date}} |
| | Tenant context propagation verified | {{context_check}} | {{context_verifier}} | {{context_date}} |
| **Cache Security** | | | | |
| | Tenant-prefixed cache keys | {{cache_key_check}} | {{cache_verifier}} | {{cache_date}} |
| | Cache TTL appropriate | {{cache_ttl_check}} | {{ttl_verifier}} | {{ttl_date}} |
| | Sensitive data not cached | {{sensitive_check}} | {{sensitive_verifier}} | {{sensitive_date}} |
| **Input Validation** | | | | |
| | SQL injection protection | {{sql_inj_check}} | {{sql_verifier}} | {{sql_date}} |
| | NoSQL injection protection | {{nosql_check}} | {{nosql_verifier}} | {{nosql_date}} |
| | Path traversal protection | {{path_check}} | {{path_verifier}} | {{path_date}} |
| **Logging & Monitoring** | | | | |
| | Tenant ID in all logs | {{log_tenant_check}} | {{log_verifier}} | {{log_date}} |
| | No PII in logs | {{pii_check}} | {{pii_verifier}} | {{pii_date}} |
| | Cross-tenant attempts logged | {{attempt_check}} | {{attempt_verifier}} | {{attempt_date}} |

### 6.2 Penetration Test Requirements

| Test Type | Scope | Frequency | Last Completed | Next Scheduled |
|-----------|-------|-----------|----------------|----------------|
| External pentest | Public APIs | {{external_frequency}} | {{external_last}} | {{external_next}} |
| Internal pentest | All services | {{internal_frequency}} | {{internal_last}} | {{internal_next}} |
| Tenant isolation audit | Data layer | {{isolation_frequency}} | {{isolation_last}} | {{isolation_next}} |
| Social engineering | N/A | {{social_frequency}} | {{social_last}} | {{social_next}} |

### 6.3 Compliance Verification

| Framework | Requirement | Test Method | Status |
|-----------|-------------|-------------|--------|
| SOC 2 | Logical access controls | Automated testing | {{soc2_status}} |
| GDPR | Data isolation | Manual audit + automated | {{gdpr_status}} |
| HIPAA | PHI segregation | Penetration testing | {{hipaa_status}} |
| PCI-DSS | Cardholder data isolation | Quarterly scan | {{pci_status}} |

### 6.4 Security Test Automation

```yaml
security_testing:
  automated:
    sast:
      tool: {{sast_tool}}
      frequency: {{sast_frequency}}
      fail_on_severity: {{sast_fail_severity}}
      
    dast:
      tool: {{dast_tool}}
      frequency: {{dast_frequency}}
      target_environments: [staging]
      
    dependency_scan:
      tool: {{dep_scan_tool}}
      frequency: {{dep_scan_frequency}}
      block_on_critical: {{dep_block_critical}}
      
    secret_scan:
      tool: {{secret_scan_tool}}
      pre_commit: {{secret_pre_commit}}
      ci_pipeline: {{secret_ci}}
      
  manual:
    pentest:
      provider: {{pentest_provider}}
      frequency: {{pentest_frequency}}
      scope: {{pentest_scope}}
      
    isolation_audit:
      frequency: {{audit_frequency}}
      auditor: {{auditor}}
```

---

## Test Execution and Reporting

### 7.1 Test Execution Schedule

| Test Type | Trigger | Environment | Duration |
|-----------|---------|-------------|----------|
| Unit tests | Every commit | CI | < {{unit_duration}}min |
| Integration tests | PR merge | CI | < {{integration_duration}}min |
| Attack simulation | Weekly | Staging | {{attack_sim_duration}}h |
| Chaos experiments | Bi-weekly | Staging | {{chaos_duration}}h |
| Security scan | Daily | Staging | {{security_scan_duration}}h |

### 7.2 Test Report Template

```
┌─────────────────────────────────────────────────────────────────┐
│          Tenant Isolation Test Report                            │
│                                                                  │
│  Report Date: {{report_date}}                                   │
│  Test Environment: {{test_environment}}                         │
│  Tenant Model: {{tenant_model}}                                 │
│                                                                  │
│  Summary                                                         │
│  ├── Total Tests: {{total_tests}}                               │
│  ├── Passed: {{passed_tests}}                                   │
│  ├── Failed: {{failed_tests}}                                   │
│  └── Skipped: {{skipped_tests}}                                 │
│                                                                  │
│  Coverage by Category                                            │
│  ├── Unit Tests: {{unit_coverage}}%                             │
│  ├── Integration Tests: {{integration_coverage}}%               │
│  ├── Attack Simulation: {{attack_coverage}}%                    │
│  └── Chaos Experiments: {{chaos_coverage}}%                     │
│                                                                  │
│  Critical Findings: {{critical_findings}}                       │
│  Recommendations: {{recommendations}}                           │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 Failure Response Protocol

| Severity | Response Time | Escalation | Resolution SLA |
|----------|---------------|------------|----------------|
| Critical (data leak) | Immediate | Security team + Leadership | {{critical_sla}}h |
| High (isolation bypass) | < {{high_response}}h | Security team | {{high_sla}}h |
| Medium (partial exposure) | < {{medium_response}}h | Engineering team | {{medium_sla}}d |
| Low (theoretical risk) | < {{low_response}}d | Backlog | {{low_sla}} sprint |

---

## Configuration

```yaml
tenant_isolation_testing:
  project: {{project_name}}
  tenant_model: {{tenant_model}}
  ai_runtime: {{ai_runtime}}
  
  unit_tests:
    framework: {{unit_test_framework}}
    coverage_target: {{unit_coverage_target}}%
    
  integration_tests:
    framework: {{integration_test_framework}}
    tenant_count: {{integration_tenant_count}}
    
  attack_simulation:
    enabled: {{attack_sim_enabled}}
    frequency: {{attack_sim_frequency}}
    
  chaos_engineering:
    enabled: {{chaos_enabled}}
    framework: {{chaos_framework}}
    
  security_testing:
    sast_tool: {{sast_tool}}
    dast_tool: {{dast_tool}}
    pentest_frequency: {{pentest_frequency}}
    
  reporting:
    format: {{report_format}}
    recipients: {{report_recipients}}
```

---

## Appendix A: Related Documents

- Pattern: `tenant-isolation-testing` in `bam-patterns.csv`
- Tenant Model: `tenant-model-template.md`
- Quality Gate: `qg-i2-tenant-safety.md`

---

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant isolation testing best practices {date}"
- "multi-tenant security testing SaaS patterns {date}"
- "cross-tenant attack simulation enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Test strategy defines tenant model under test and test pyramid allocation
- [ ] Test environment matrix covers Unit, Integration, Staging with appropriate tenant counts
- [ ] Unit tests cover tenant context extraction, propagation, and policy logic
- [ ] Integration test architecture includes attacker, victim, and control tenants
- [ ] API boundary tests verify cross-tenant access is denied
- [ ] Database integration tests validate RLS policy enforcement
- [ ] Cross-tenant attack simulation covers IDOR, parameter tampering, injection, and enumeration
- [ ] Chaos experiments verify isolation under failure conditions
- [ ] Security testing checklist includes all categories (Authentication, Authorization, Data Isolation, Cache, Input Validation, Logging)
- [ ] Penetration test requirements and compliance verification are scheduled
- [ ] Test execution schedule defines triggers and environments for each test type
- [ ] Failure response protocol defines severity levels with resolution SLAs

---

## Appendix B: Test Data Requirements

| Data Type | Per Tenant | Shared | Sensitive |
|-----------|------------|--------|-----------|
| Users | {{users_per_tenant}} | 0 | Yes |
| Documents | {{docs_per_tenant}} | 0 | Varies |
| Configurations | {{configs_per_tenant}} | {{shared_configs}} | No |
| Audit logs | {{logs_per_tenant}} | 0 | Yes |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial specification |
