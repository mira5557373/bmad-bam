# Step 04: Design E2E and Tenant Isolation Tests

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER design e2e tests without Step 01-03 context**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **PRESENT e2e and isolation test strategy with A/P/C menu** for confirmation
- 📋 **VERIFY tenant isolation tests are CRITICAL** - cross-tenant access must be blocked
- 🌐 **USE web search** to verify current e2e and security testing patterns

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Design end-to-end and tenant isolation testing strategies
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Reference integration test coverage from Step 03
- 🚫 Do NOT: Duplicate integration test scope; focus on user journeys
- 🔍 Use web search: Verify e2e testing tools and isolation verification
- ⚠️ Gate: QG-TC3 (E2E Coverage) + QG-I2 (Tenant Safety) govern this design

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Integration test strategy from Step 03 (database fixtures, facades)
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-e2e`, `testing-isolation`
- **Output:** E2E test strategy + tenant isolation test suite design
- **Quality gates:** QG-TC3 (E2E Coverage), QG-I2 (Tenant Safety - CRITICAL)

---

## YOUR TASK

Design the end-to-end test strategy covering user journey tests, multi-tenant isolation tests verifying cross-tenant access is blocked, performance testing with tenant isolation, and security testing integration. Present the complete strategy via A/P/C menu for user confirmation.

---

## Main Sequence

### 1. Define E2E Test Scope

Establish end-to-end test boundaries:

| E2E Category | Coverage | Tenant Context |
|--------------|----------|----------------|
| **User Journeys** | Critical business flows | Authenticated user with tenant |
| **Multi-Tenant Flows** | Tenant onboarding, data isolation | Multiple tenants in same test |
| **Admin Flows** | Tenant management, configuration | Admin with tenant scope |
| **API Journeys** | External API consumer flows | API key with tenant binding |
| **Cross-Tier Flows** | Free→Pro upgrade, tier features | Tenant tier transitions |

**Critical User Journeys to Test:**

| Journey | Steps | Tenant Verification |
|---------|-------|---------------------|
| Tenant Onboarding | Signup → Configure → First use | New tenant isolated |
| Core Business Flow | Login → Action → Result → Logout | All data tenant-scoped |
| Data Export | Request → Generate → Download | Only own tenant data |
| Collaboration | Invite → Accept → Shared access | Within tenant boundary |
| Admin Configuration | Login admin → Configure → Apply | Admin sees only own tenant |

### 2. Design Multi-Tenant Isolation Tests (CRITICAL)

**These tests are CRITICAL for QG-I2 (Tenant Safety).**

| Isolation Test | Scenario | Expected Result |
|----------------|----------|-----------------|
| **Cross-Tenant Data Access** | Tenant A queries Tenant B data | DENIED / Empty result |
| **Cross-Tenant API Access** | Tenant A token accesses Tenant B endpoint | 403 Forbidden |
| **Cross-Tenant Event Leakage** | Tenant A subscribes to Tenant B events | No events received |
| **Cross-Tenant Cache Access** | Tenant A attempts to read Tenant B cache | Cache miss / DENIED |
| **Cross-Tenant File Access** | Tenant A requests Tenant B files | 404 Not Found / 403 |
| **Cross-Tenant Admin Access** | Tenant A admin manages Tenant B | 403 Forbidden |

**Isolation Test Matrix:**

| Resource | Tenant A Action | Tenant B Data | Test Assertion |
|----------|-----------------|---------------|----------------|
| Database | SELECT * FROM orders | Orders belong to B | Zero rows returned |
| API | GET /api/users/{b_user_id} | User B profile | 403 or 404 |
| Storage | GET /files/{b_file_id} | File owned by B | 403 or 404 |
| Cache | GET tenant_b:session | Session B | Cache miss |
| Events | Subscribe to `tenant_b.*` | Events for B | No events |

**RLS Bypass Attempt Tests:**

| Bypass Attempt | Test Method | Expected |
|----------------|-------------|----------|
| Direct SQL injection | `'; SELECT * FROM other_tenant --` | Query blocked |
| Missing tenant context | Request without tenant header | 401 Unauthorized |
| Tenant ID spoofing | Forge tenant_id in JWT | Signature validation fails |
| Admin escalation | Regular user claims admin | Authorization fails |
| Schema hopping | `SET search_path = other_tenant` | Permission denied |

### 3. Design Performance Testing with Tenant Isolation

Define performance tests that respect tenant isolation:

| Performance Test | Scenario | Tenant Consideration |
|------------------|----------|----------------------|
| **Load Test** | N concurrent users | Multi-tenant workload |
| **Stress Test** | Beyond capacity | Noisy neighbor detection |
| **Soak Test** | Extended duration | Resource leak per tenant |
| **Spike Test** | Sudden traffic burst | Per-tenant rate limiting |
| **Isolation Test** | One tenant spikes | Other tenants unaffected |

**Tenant-Aware Performance Metrics:**

| Metric | Measurement | Per-Tenant? |
|--------|-------------|-------------|
| Response Time | p50, p95, p99 | Yes - by tenant tier |
| Throughput | Requests/second | Yes - by tenant |
| Error Rate | % failed requests | Yes - by tenant |
| Resource Usage | CPU, Memory, DB connections | Yes - by tenant |
| Queue Depth | Pending jobs | Yes - by tenant |

**Noisy Neighbor Test:**

```
Scenario: Tenant A under heavy load, Tenant B normal load
Expected: Tenant B performance within SLA
Verify: Rate limiting, resource quotas, fair scheduling work
```

### 4. Design Security Testing Integration

Define security tests that verify tenant boundaries:

| Security Test | Scope | Tenant Focus |
|---------------|-------|--------------|
| **Authentication** | Login, token validation | Tenant claims in tokens |
| **Authorization** | RBAC, permissions | Tenant-scoped permissions |
| **Injection** | SQL, NoSQL, command | Tenant context bypass attempts |
| **IDOR** | Insecure direct object ref | Cross-tenant object access |
| **Broken Access Control** | OWASP A01 | Tenant boundary violations |
| **Data Exposure** | OWASP A02 | Cross-tenant data leakage |

**OWASP Top 10 Tenant-Aware Tests:**

| OWASP Category | Tenant-Specific Test |
|----------------|---------------------|
| A01 Broken Access | Tenant A accessing Tenant B resources |
| A02 Cryptographic | Tenant data encryption at rest |
| A03 Injection | Tenant ID injection in queries |
| A04 Insecure Design | Tenant isolation architecture review |
| A05 Misconfiguration | RLS policies, tenant configs |
| A07 Auth Failures | Cross-tenant session hijacking |

### 5. Define Coverage Thresholds (QG-TC3 + QG-I2)

**QG-TC3 (E2E Coverage) Pass Criteria:**

- [ ] All critical user journeys have e2e tests
- [ ] ≥80% of user journeys covered
- [ ] Cross-tier flows tested (free, pro, enterprise)
- [ ] Admin journeys tested
- [ ] API consumer journeys tested

**QG-I2 (Tenant Safety) Pass Criteria - CRITICAL:**

- [ ] **CRITICAL:** Cross-tenant data access blocked in all tests
- [ ] **CRITICAL:** Cross-tenant API access returns 403/404
- [ ] **CRITICAL:** Cross-tenant events not received
- [ ] **CRITICAL:** RLS bypass attempts fail
- [ ] **CRITICAL:** Tenant ID spoofing detected and rejected
- [ ] Performance isolation verified (noisy neighbor test)
- [ ] Security tests include tenant boundary verification

### 6. Web Research Verification

**Verify current best practices with web search:**

Search the web: "e2e testing multi-tenant SaaS Playwright Cypress {date}"
Search the web: "tenant isolation testing security {date}"
Search the web: "performance testing multi-tenant noisy neighbor {date}"
Search the web: "OWASP multi-tenant application security {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After presenting e2e and isolation test strategy:

```
================================================================================
E2E AND ISOLATION TEST STRATEGY SUMMARY
================================================================================
E2E Scope: Critical user journeys (onboarding, core flow, export, admin)
Isolation Tests: CRITICAL - 6 cross-tenant scenarios
Performance: Load, stress, soak with noisy neighbor detection
Security: OWASP Top 10 with tenant-specific tests
Coverage Target: 80% journeys, 100% isolation scenarios
QG-TC3: E2E coverage gate
QG-I2: Tenant safety gate (CRITICAL)
================================================================================

Your options:
- **A (Advanced Elicitation)**: Deep dive into specific test scenarios
- **P (Party Mode)**: Bring security, QA, and performance perspectives
- **C (Continue)**: Accept strategy and proceed to compile document

Select an option:
```

### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Edge cases:** What tenant scenarios are most likely to fail isolation?
- **Performance baselines:** What are acceptable per-tenant performance targets?
- **Security coverage:** Which OWASP categories need deeper tenant testing?
- **Test environment:** How to simulate multi-tenant load realistically?
- **Automation:** How to automate tenant isolation verification?

Pass context: Step 03 integration coverage, current e2e strategy, concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review e2e and tenant isolation test strategy for {tenant_model} SaaS
with {critical_journey_count} critical journeys and {tenant_count} test tenants
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Security Engineer | Isolation | Are all cross-tenant attack vectors tested? |
| QA Engineer | Coverage | Are critical journeys sufficiently covered? |
| Performance Engineer | Load testing | Is noisy neighbor detection comprehensive? |
| Compliance Officer | Audit | Do isolation tests satisfy compliance requirements? |

Process multi-perspective analysis and synthesize into refined recommendations.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue):

1. Record the e2e and isolation test strategy in working document:

```yaml
# Add to testing-strategy-draft.md
e2e_testing:
  critical_journeys: [onboarding, core_flow, export, admin]
  tenant_scenarios: multi-tenant
  coverage_target: 80
  
isolation_testing:
  cross_tenant_scenarios: 6
  rls_bypass_tests: enabled
  noisy_neighbor_test: enabled
  qg_i2_criteria: defined
  
security_testing:
  owasp_top_10: tenant_aware
  penetration_scope: defined
  
qg_tc3_criteria: defined
analysis_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document  # Add this
currentStep: step-05-c-complete
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ E2E test scope defined for critical user journeys
- ✅ Multi-tenant isolation tests documented (CRITICAL)
- ✅ Cross-tenant access verification specified
- ✅ Performance testing with tenant isolation defined
- ✅ Security testing integration documented
- ✅ QG-TC3 and QG-I2 criteria established
- ✅ Web search performed for current patterns
- ✅ User confirmed strategy via A/P/C menu

---

## FAILURE MODES

- ❌ **Missing isolation tests:** QG-I2 will FAIL - this is CRITICAL
- ❌ **Incomplete cross-tenant scenarios:** Security vulnerabilities undetected
- ❌ **No performance isolation:** Noisy neighbor issues in production
- ❌ **Ignoring security tests:** OWASP vulnerabilities undetected
- ❌ **E2E scope too broad:** Tests become slow and unmaintainable

---

## NEXT STEP

After user confirms e2e and isolation test strategy with 'C':

1. Record the e2e and isolation test strategy in working document
2. Proceed to `step-05-c-complete.md` to compile the full testing strategy document
3. The e2e and isolation test strategy informs:
   - CI/CD integration for e2e and security tests
   - TEA handoff points for formal verification
   - QG-TC3 and QG-I2 checklist items

**Transition to Step 05 with:**
- E2E journeys: `{critical_journey_list}`
- Isolation scenarios: `{cross_tenant_test_count}`
- Security scope: `{owasp_categories_covered}`

---

## Outputs

- Documentation draft created
- Design specifications completed
- Decision records updated

