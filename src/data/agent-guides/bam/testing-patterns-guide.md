# BAM Testing Patterns Guide

**When to load:** During Phase 5 (Quality) when implementing test strategies for multi-tenant systems, isolation verification, agent safety testing, or chaos engineering. Load when user mentions testing, QA, test fixtures, tenant isolation tests, chaos, agent testing, TEA integration, or quality gates.
**Integrates with:** Dev (James), TEA (Test Engineering Agent), QA roles, Security agents

---

## Core Concepts

### Testing Pyramid for Multi-Tenant SaaS

The multi-tenant testing pyramid extends traditional testing with tenant-specific concerns at each layer.

| Layer | Tenant Coverage | Execution Time | Run Frequency | Key Focus |
|-------|-----------------|----------------|---------------|-----------|
| Unit | Mock tenant context | < 10s total | Every commit | Isolation logic verification |
| Integration | 2-3 tenant fixtures | < 5 min | Every PR | Cross-tenant access prevention |
| API | All tiers | < 15 min | Every PR | Tenant context propagation |
| E2E | Critical paths per tier | < 30 min | Pre-deploy | Full isolation verification |
| Load | Production-like tenants | 1+ hour | Weekly | Noisy neighbor detection |
| Chaos | Failure injection | 30 min - 2 hours | Weekly/Monthly | Resilience under failure |

### Isolation Testing Principles

Multi-tenant isolation testing verifies that tenant boundaries are enforced correctly across all system layers.

| Principle | Description | Verification Method |
|-----------|-------------|---------------------|
| Data Isolation | Tenant A cannot access Tenant B data | Cross-tenant query tests |
| Context Propagation | Tenant context flows through all layers | Request tracing |
| Cache Isolation | Tenant-specific cache keys | Cache key prefix verification |
| Queue Isolation | Message routing by tenant | Queue routing tests |
| Memory Isolation | AI agent memories per tenant | Memory access tests |
| Resource Isolation | No noisy neighbor effects | Load isolation tests |

### Test Type Comparison

| Type | Scope | Purpose | When to Run | Tenant Consideration |
|------|-------|---------|-------------|---------------------|
| Unit | Component | Verify isolation logic | Development | Mocked tenant context |
| Integration | System | Cross-tenant attempts | CI/CD | Real RLS policies |
| Contract | Facades | API compatibility | CI/CD | Per-tenant contracts |
| Chaos | Production-like | Failure modes | Staging | Tenant isolation under failure |
| Penetration | Security | Attack simulation | Quarterly | Cross-tenant attack vectors |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed for multi-tenant SaaS testing.

### Test Fixture Naming Convention

```
{tenant-tier}_{scenario}_{variant}

Examples:
- free_basic_user
- pro_large_dataset
- enterprise_sso_enabled
- multi_tenant_isolation
```

### Tenant Test Data Format

| Field | Format | Example |
|-------|--------|---------|
| Tenant ID | UUID with prefix | `test_tenant_abc123` |
| Tenant Name | `Test_{Tier}_{Purpose}` | `Test_Pro_Isolation` |
| User Email | `{role}@test_{tenant}.local` | `admin@test_pro.local` |
| API Key | `test_key_{tenant}_{env}` | `test_key_abc123_ci` |

### Test Tenant Categories

| Category | Purpose | Persistence | Use Case |
|----------|---------|-------------|----------|
| Ephemeral | Single test run | Deleted after test | Unit tests |
| Shared Dev | Development environment | Persistent | Local development |
| CI/CD | Automated testing | Reset per pipeline | Continuous integration |
| Staging | Pre-production validation | Semi-persistent | Release validation |
| Sandbox | Manual testing | User-managed | Exploratory testing |

### Fixture Hierarchy

```
Test Fixture Hierarchy
       |
       +-- Tenant Fixture
       |   - Tenant ID, name, tier
       |   - Configuration, feature flags
       |
       +-- User Fixtures
       |   - Admin, member, guest users
       |   - Roles and permissions
       |
       +-- Data Fixtures
       |   - Domain objects
       |   - Relationships
       |
       +-- State Fixtures
           - Workflow states
           - Historical events
```

---

## Decision Framework

### When to Use Which Testing Strategy

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When to use real RLS vs mocked tenant context? | Real RLS for integration and E2E tests; mock only for unit tests | RLS behavior must be verified with actual policies; unit tests should be fast and isolated |
| How many concurrent tenants in load tests? | Start with 10 tenants at normal load; scale to 100+ for stress tests | Simulates realistic multi-tenant contention; reveals noisy neighbor issues at scale |
| When to run chaos engineering tests? | Every release for critical paths; weekly for full suite | Critical path validation prevents production incidents; regular full suite catches edge cases |
| What penetration test frequency is needed? | Cross-tenant tests with every security-relevant change; full pentest quarterly | Continuous validation of isolation; periodic comprehensive assessment |
| How to prioritize noisy neighbor scenarios? | CPU and database contention first; then cache and network saturation | Most common production issues involve compute and database resources |
| Persistent or ephemeral fixtures? | Ephemeral for unit, persistent for integration | Test isolation vs setup cost |
| How to handle fixture dependencies? | Factory with builder pattern | Flexible composition |
| Production data for testing? | Yes, but fully anonymized | Realistic scenarios without PII risk |
| Fixture maintenance ownership? | Module team owns module fixtures | Distributed responsibility |
| CI/CD fixture strategy? | Container-based, reset per pipeline | Clean state guarantee |

### Test Type Selection Matrix

| Test Goal | Test Type | Tenant Consideration | Automation Priority |
|-----------|-----------|---------------------|---------------------|
| Verify tenant data isolation | Integration | Multi-tenant fixtures required | Critical |
| Verify RLS policies | Database | Direct DB access with tenant switching | Critical |
| Verify API tenant context | API/E2E | Auth token per tenant | High |
| Verify tier limits | Integration | Tier-specific fixtures | High |
| Verify cross-module isolation | E2E | Full system deployment | Medium |
| Performance by tenant | Load test | Isolated tenant environments | Medium |
| UI tenant context display | E2E/Visual | Screenshot comparison | Low |

---

## §tenant-isolation-testing

### Pattern: Tenant Isolation Testing

Tenant isolation testing verifies that tenant boundaries are enforced correctly, preventing data leakage, unauthorized access, and cross-tenant interference.

#### Cross-Tenant Access Tests

| Test Case | Description | Method | Expected Result |
|-----------|-------------|--------|-----------------|
| Direct query | Query with wrong tenant | SQL with different tenant_id | Empty result or error |
| ID enumeration | Try sequential IDs | Iterate through IDs | Only own tenant's data |
| API parameter | Tamper tenant_id | Modify request parameter | Rejected or own data |
| Session tampering | Modify session tenant | Alter session cookie | Invalidated |
| Direct ID manipulation | Change tenant_id in request | Request modification | 403 Forbidden |
| SQL injection | Inject into tenant context | Injection attempt | Query rejected |
| Path traversal | Access other tenant files | Path manipulation | 404 Not Found |
| JWT tampering | Modify tenant claim | Token modification | Token invalid |

#### Cross-Tenant Test Flow

```
Test Setup
    |
    +-- Create Tenant A with data
    +-- Create Tenant B with data
    |
    +-- Test Cases
         |
         +-- As Tenant A, query Tenant B data
         |   Expected: Empty/Forbidden
         |
         +-- As Tenant A, enumerate IDs
         |   Expected: Only A's records
         |
         +-- As Tenant A, tamper tenant_id
             Expected: Rejected
```

#### RLS Policy Testing

| Test Scenario | Setup | Assertion |
|---------------|-------|-----------|
| Policy active | Create data | Only tenant's rows visible |
| Policy bypass | Direct query | RLS still enforces |
| Superuser | Admin access | Explicit allowlist only |
| No tenant set | Missing context | Query fails or empty |
| Normal query | Standard access | Filtered to tenant |
| Join across tenant | Cross-table join | No cross data |
| Function call | Stored procedure | Respects RLS |
| View access | Through view | Inherits policy |
| Direct table | Raw table access | Policy enforced |

#### Automated RLS Verification

**Test Categories:**
1. **Policy Existence** - Verify RLS enabled on all tenant tables
2. **Policy Correctness** - Verify policies filter by correct tenant column
3. **Policy Coverage** - Verify all CRUD operations covered
4. **Bypass Prevention** - Verify no code paths bypass RLS

**Automation Approach:**
```
For each tenant-scoped table:
  1. Set session to Tenant A
  2. Insert test record for Tenant A
  3. Verify Tenant A can read record
  4. Set session to Tenant B
  5. Verify Tenant B cannot read record
  6. Set session to Tenant A
  7. Clean up test record
```

#### Context Isolation Tests

| Test Case | Method | Expected Result |
|-----------|--------|-----------------|
| Missing context | Request without tenant_id | Rejected |
| Context switch | Change tenant mid-request | Rejected |
| Context inheritance | Async job tenant | Same as original |
| Connection reuse | Pool connection reuse | Context reset |

#### Data Boundary Tests

| Test Case | Method | Expected Result |
|-----------|--------|-----------------|
| Search isolation | Search returns other data | Only tenant data |
| Cache isolation | Cache key collision | Tenant-prefixed keys |
| File isolation | Access other's files | Access denied |
| Memory isolation | AI memory cross-tenant | Isolated per tenant |

#### Isolation Verification Checklist

- [ ] Tenant A cannot query Tenant B data
- [ ] API returns 403 for cross-tenant requests
- [ ] Search results only include tenant data
- [ ] Cache keys are tenant-prefixed
- [ ] Async jobs maintain tenant context
- [ ] AI agent memories are isolated
- [ ] Error messages don't leak tenant info
- [ ] Audit logs separate by tenant

---

## §multi-tenant-fixtures

### Pattern: Multi-Tenant Test Fixtures

Multi-tenant test fixtures provide isolated, reproducible test data for each tenant tier and scenario.

#### Fixture Factory Pattern

The fixture factory creates tenant-specific test contexts programmatically:

```
Tenant Fixture Factory
       |
       +-- Create tenant with tier configuration
       +-- Seed users with role assignments
       +-- Generate domain-specific data
       +-- Configure feature flags
       +-- Return isolated test context
```

#### Fixture Strategies

| Strategy | Description | Use Case | Pros | Cons |
|----------|-------------|----------|------|------|
| Factory | Generate fixtures programmatically | Unit tests | Flexible, fast | May miss edge cases |
| Seed Data | Pre-loaded reference data | Integration tests | Consistent, realistic | Maintenance overhead |
| Snapshot | Copy of production (anonymized) | Realistic testing | Most realistic | Size, anonymization effort |
| Synthetic | AI-generated realistic data | Load testing | Scalable | May miss patterns |

#### Fixture Data Requirements

| Data Type | Anonymization | Generation Method |
|-----------|---------------|-------------------|
| User PII | Required | Faker libraries |
| Business Data | Recommended | Domain-aware generation |
| Configurations | Not needed | Copy from templates |
| Audit Logs | Required | Synthetic generation |
| Files/Media | Recommended | Sample files |

#### Test Database Strategies

| Strategy | Isolation | Speed | Realism | Best For |
|----------|-----------|-------|---------|----------|
| Separate Schema | High | Medium | High | Integration tests |
| Transaction Rollback | High | Fast | Medium | Unit tests |
| Container per Test | Highest | Slow | Highest | E2E tests |
| Shared with RLS | Medium | Fast | Highest | Load tests |

#### Multi-Tenant Test Scenarios

| Scenario | Description | Fixtures Needed |
|----------|-------------|-----------------|
| Tenant Isolation | Verify data doesn't leak | 2+ tenant fixtures |
| Tier Differentiation | Test tier-specific features | Fixtures per tier |
| Cross-Tenant Admin | Platform admin operations | Admin + multiple tenants |
| Tenant Lifecycle | Onboarding/offboarding | Tenant in various states |
| Noisy Neighbor | Resource contention | High-usage tenant fixture |

#### Tier-Specific Fixtures

**Free Tier Fixture:**
- Rate limits configured
- Feature gates enabled
- Limited storage quota
- Basic user roles

**Pro Tier Fixture:**
- Higher rate limits
- All Pro features enabled
- Standard storage quota
- Advanced user roles

**Enterprise Tier Fixture:**
- Custom limits configured
- SSO enabled
- Dedicated resources
- Compliance controls active

#### Fixture Lifecycle Management

| Phase | Action | Responsibility |
|-------|--------|----------------|
| Setup | Create tenant context | Test framework |
| Seed | Populate test data | Fixture factory |
| Execute | Run test cases | Test runner |
| Teardown | Clean up all data | Test framework |
| Verify | Confirm cleanup complete | Isolation check |

---

## §agent-safety-testing

### Pattern: Agent Safety Testing

AI agent safety testing requires a fundamentally different approach than traditional software testing due to non-deterministic behavior and autonomous decision-making.

#### Safety Testing Dimensions

| Dimension | Test Type | Purpose | Validation |
|-----------|-----------|---------|------------|
| Behavioral | Deterministic | Verify predictable agent responses | Exact match |
| Robustness | Stochastic | Validate consistency under variation | Statistical bounds |
| Security | Adversarial | Detect prompt injection vulnerabilities | Attack detection |
| Compliance | Guardrail | Ensure policy enforcement | Policy checks |
| Boundary | Edge case | Test limits and unusual inputs | Boundary verification |
| Recovery | Failure mode | Validate graceful degradation | Recovery verification |

#### Safety Testing Pipeline

```
Safety Testing Pipeline
       |
       +-- Deterministic Tests
       |   - Tool invocation verification
       |   - Parameter extraction
       |   - Response format compliance
       |
       +-- Stochastic Tests
       |   - Task success rate
       |   - Response consistency
       |   - Hallucination detection
       |
       +-- Adversarial Tests
       |   - Prompt injection
       |   - Jailbreak attempts
       |   - Data exfiltration
       |
       +-- Guardrail Verification
       |   - Input validation
       |   - Output filtering
       |   - Tool restrictions
       |
       +-- Regression Suite
       |
       +-- Chaos Testing
       |
       +-- Audit Logging
```

#### Deterministic Testing

| Category | Description | Validation | Sample Size |
|----------|-------------|------------|-------------|
| Tool invocation | Correct tool selection | Exact match | 100% coverage |
| Parameter extraction | Accurate parsing | Input/output pairs | 100% coverage |
| Response format | Structure compliance | Schema validation | 100% coverage |
| Tenant context | Proper isolation | No cross-tenant data | 100% coverage |
| Permission enforcement | Authorization checks | Role-based access | 100% coverage |
| State transitions | Valid workflow steps | State machine verification | 100% coverage |
| Error handling | Graceful failures | Exception coverage | 100% coverage |

#### Stochastic Testing

| Metric | Acceptable Range | Sample Size | Alert Threshold |
|--------|------------------|-------------|-----------------|
| Task success rate | > 95% | 100+ runs | < 90% |
| Response consistency | > 90% semantic match | 50+ runs | < 85% |
| Tool selection accuracy | > 98% correct | 100+ runs | < 95% |
| Recovery rate | > 99% | 100+ runs | < 95% |
| Hallucination rate | < 2% | 200+ runs | > 5% |
| Latency variance | < 20% std dev | 100+ runs | > 30% |

#### Adversarial Red Teaming

| Category | Technique | Detection Method | Expected Defense |
|----------|-----------|------------------|------------------|
| Prompt injection | Malicious instructions | Output scanning | Block + log |
| Jailbreaking | Bypass constraints | Policy violation checks | Reject + alert |
| Data exfiltration | Extract tenant data | Cross-tenant detection | Block + audit |
| Tool abuse | Unauthorized invocation | Permission audit | Deny + log |
| Context manipulation | Misleading history | Session integrity checks | Reset context |
| Resource exhaustion | Infinite loops | Timeout enforcement | Terminate + alert |
| Privilege escalation | Role confusion | Authorization logging | Deny + escalate |

#### Guardrail Verification

| Guardrail Type | Verification Method | Pass Criteria |
|----------------|---------------------|---------------|
| Input validation | Schema + content filter | All malicious inputs rejected |
| Output filtering | Pattern matching + LLM judge | No PII or sensitive data leaked |
| Tool restrictions | Permission check audit | Only authorized tools invoked |
| Rate limiting | Counter validation | Limits enforced accurately |
| Token budget | Budget enforcement test | Graceful termination at limit |
| Timeout | Timeout trigger test | Clean termination within bounds |

#### Testing Cadence

| Test Type | Frequency | Trigger | Owner |
|-----------|-----------|---------|-------|
| Deterministic | Every commit | CI/CD pipeline | Developer |
| Stochastic | Daily | Scheduled job | QA |
| Adversarial | Weekly | Security review | Security |
| Full safety suite | Before release | Release gate | TEA |

#### Agent Decision Framework

| Question | Recommendation |
|----------|----------------|
| New agent capability? | Full deterministic + stochastic coverage |
| Security-sensitive feature? | Mandatory red team before release |
| Cross-tenant interaction? | Isolation tests at every layer |
| Production incident? | Add regression test to adversarial suite |
| Model update planned? | Re-run full safety suite |
| Prompt modification? | Verify guardrails still effective |
| Tool permission change? | Audit all affected workflows |

---

## §chaos-engineering

### Pattern: Chaos Engineering

Chaos engineering proactively discovers weaknesses by injecting controlled failures into production-like systems.

#### Chaos Engineering Principles

| Principle | Description | Multi-Tenant Consideration |
|-----------|-------------|---------------------------|
| Build hypothesis | Define expected behavior | Tenant SLA expectations |
| Minimize blast radius | Limit failure scope | Tenant isolation must hold |
| Run in production | Test real conditions | Use canary tenants first |
| Automate experiments | Repeatable, measurable | Per-tier experiments |
| Learn and improve | Strengthen system | Document per-tenant impact |

#### Failure Categories

| Category | Examples | Tenant Impact |
|----------|----------|---------------|
| Infrastructure | Node failure, disk full, network partition | Service degradation |
| Application | Memory leak, deadlock, exception cascade | Feature unavailability |
| Data | Database failure, cache corruption | Data access issues |
| AI/Agent | Model timeout, tool failure, guardrail false positive | Agent unavailability |
| Third-party | Payment gateway down, LLM provider outage | Feature degradation |

#### Infrastructure Experiments

| Experiment | Injection | Expected Behavior |
|------------|-----------|-------------------|
| Node termination | Kill random node | Auto-scale, no tenant impact |
| CPU stress | 100% CPU utilization | Graceful degradation |
| Memory pressure | Fill memory to limit | OOM handling, pod restart |
| Disk full | Fill disk to 100% | Alerts, no data loss |
| Network latency | Add 500ms latency | Timeout handling |
| Network partition | Split availability zones | Failover activates |
| DNS failure | Block DNS resolution | Cached responses, alerts |

#### Application Experiments

| Experiment | Injection | Expected Behavior |
|------------|-----------|-------------------|
| Service crash | Kill service process | Restart, request retry |
| Dependency timeout | Delay downstream calls | Circuit breaker opens |
| Exception injection | Throw random exceptions | Error handling, logging |
| Queue backup | Pause queue consumers | Backpressure, alerts |
| Cache failure | Disable cache layer | Direct DB queries, degradation |

#### AI/Agent Experiments

| Experiment | Injection | Expected Behavior |
|------------|-----------|-------------------|
| LLM provider timeout | Block LLM API calls | Fallback model, graceful error |
| Tool execution failure | Fail tool calls | Retry, alternative tool, error |
| Memory corruption | Corrupt agent memory | Memory reconstruction |
| Token budget exhaustion | Set budget to 0 | Graceful termination |
| Guardrail false positive | Block all outputs | Manual review queue |
| Vector DB unavailable | Block embedding queries | Cached results, degradation |

#### Multi-Tenant Experiments

| Experiment | Injection | Expected Behavior |
|------------|-----------|-------------------|
| Noisy neighbor | Flood single tenant | Rate limiting, isolation |
| Tenant isolation breach | Attempt cross-tenant access | Block, alert, audit |
| Quota exhaustion | Exhaust tenant quota | Graceful denial, upgrade prompt |
| Tier degradation | Downgrade tenant tier | Feature gating activates |

#### Noisy Neighbor Test Scenarios

| Scenario | Tenant A Load | Tenant B Metric | Pass Criteria |
|----------|---------------|-----------------|---------------|
| CPU spike | 100% CPU agent runs | Response latency | P99 < 200ms |
| Memory pressure | Large context windows | Memory availability | No OOM errors |
| Database contention | Bulk writes | Query latency | P99 < 50ms |
| Network saturation | Large file uploads | API throughput | > 90% baseline |
| Cache thrashing | Frequent cache misses | Cache hit rate | > 80% |

#### Blast Radius Control

| Level | Scope | Use Case | Approval |
|-------|-------|----------|----------|
| 1 - Minimal | Single test tenant | Initial validation | Team lead |
| 2 - Limited | Single production tenant (volunteered) | Realistic testing | Engineering manager |
| 3 - Moderate | 1% of tenants | Canary validation | Director |
| 4 - Broad | 10% of tenants | Pre-release validation | VP Engineering |
| 5 - Full | All tenants | Major release validation | CTO |

#### Experiment Design Template

```
Experiment: {Name}
Category: {Infrastructure|Application|AI|Multi-Tenant}
Hypothesis: When {failure condition}, the system should {expected behavior}

Target:
- Service: {service name}
- Scope: {tenant|region|service|global}
- Duration: {seconds/minutes}

Injection:
- Method: {how to inject failure}
- Parameters: {specific settings}
- Kill switch: {how to stop immediately}

Steady State:
- Metrics: {baseline metrics to monitor}
- Thresholds: {acceptable deviation}

Success Criteria:
- [ ] Tenant isolation maintained
- [ ] SLA compliance per tier
- [ ] No data loss or corruption
- [ ] Recovery within RTO
- [ ] Alerts fired correctly

Rollback:
- Procedure: {how to restore}
- Estimated time: {duration}
```

#### Scheduling Strategy

| Experiment Type | Frequency | Window | Notification |
|-----------------|-----------|--------|--------------|
| Automated regression | Daily | Off-peak hours | Automated |
| Service-level chaos | Weekly | Maintenance window | 24h advance |
| Cross-service chaos | Monthly | Scheduled game day | 1 week advance |
| Full DR exercise | Quarterly | Planned event | 1 month advance |

#### When to Abort

| Condition | Action | Recovery |
|-----------|--------|----------|
| Tenant isolation breach | Immediate stop | Incident response |
| Data loss detected | Immediate stop | Restore from backup |
| Cascading failures | Stop + assess | Component isolation |
| SLA breach > threshold | Stop experiment | Monitor recovery |
| Customer complaint | Pause + investigate | Communication |

#### Key Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Mean Time to Detection (MTTD) | Time to detect injected failure | < 1 minute |
| Mean Time to Recovery (MTTR) | Time to recover from failure | Per-tier SLA |
| Blast radius containment | % of unaffected tenants | > 99% |
| Isolation maintenance | Cross-tenant breaches | 0 |
| SLA compliance | % of tenants within SLA | 100% for Enterprise |

---

## §integration-testing

### Pattern: Integration Testing

Integration testing for multi-tenant systems verifies that modules work correctly together while maintaining tenant isolation.

#### TEA Integration

The Test Engineering Agent (TEA) owns verification for specific quality gates:

| TEA-Owned Gates | Purpose | Integration Point |
|-----------------|---------|-------------------|
| QG-I2 | Tenant safety verification | Isolation test results |
| QG-I3 | Agent safety verification | Safety test results |
| QG-TC1 | Unit test coverage thresholds | Coverage reports |
| QG-TC2 | Integration test coverage | Integration reports |
| QG-TC3 | E2E test coverage | E2E reports |

**Handoff Protocol:**
- BAM `convergence-verification` workflow produces checklists and criteria
- Handoff to TEA `tea-trace` workflow for formal verification sign-off
- BAM provides checklists, TEA executes verification and reports results

#### CI/CD Pipeline Design

| Stage | Duration | Tenant Tests Included |
|-------|----------|----------------------|
| Lint/Static | 1 min | None |
| Unit Tests | 2 min | Mocked tenant context |
| Build | 3 min | None |
| Integration | 5 min | Multi-tenant isolation |
| Deploy Staging | 2 min | None |
| E2E Staging | 15 min | Critical tenant paths |
| Security Scan | 5 min | Tenant boundary scan |
| Deploy Canary | 2 min | None |
| Smoke Test | 5 min | Tenant isolation verify |
| Full Rollout | 5 min | None |

#### Test Infrastructure Decisions

| Decision | Option A | Option B | Recommendation |
|----------|----------|----------|----------------|
| Test database | Shared with isolation | Database per test run | Shared for speed, per-run for isolation |
| Tenant fixtures | Seeded once | Created per test | Per test for isolation, seeded for speed |
| Parallel execution | Shared tenant | Tenant per worker | Tenant per worker prevents interference |
| Test data cleanup | After each test | After test suite | After each for isolation |
| CI/CD tenant tests | All tests always | Risk-based selection | Risk-based for speed |

#### Test Data Management

| Environment | Tenant Data Source | Refresh Frequency |
|-------------|-------------------|-------------------|
| Local Dev | Seeded fixtures | On demand |
| CI/CD | Generated per run | Each run |
| Staging | Sanitized production clone | Weekly |
| Production | Real (read-only tests) | Never modified |

#### Parallel Test Execution

**Tenant Isolation in Parallel Tests:**
- Assign unique tenant per test worker
- Use tenant ID in test identifiers
- Prevent shared state between workers
- Clean up worker tenants on completion

#### Flaky Test Management

| Flake Pattern | Cause | Solution |
|--------------|-------|----------|
| Race condition | Shared tenant state | Isolate per test |
| Timing issue | Async tenant context | Add proper waits |
| Order dependency | Fixture not reset | Reset between tests |
| Resource conflict | Parallel access | Unique resources per test |

#### End-to-End Tenant Flows

| Flow | Tenants Involved | Verification |
|------|------------------|--------------|
| Tenant onboarding | New tenant | Provisioning complete |
| User authentication | Single tenant | Token contains tenant |
| Cross-module operation | Single tenant | Context preserved |
| Admin platform operation | Multiple tenants | Isolation maintained |
| Tenant offboarding | Departing tenant | Data properly removed |

---

## Quality Gates

Testing-related quality gates ensure comprehensive coverage and tenant safety.

### QG-TC1: Unit Test Coverage

| Check | Target | Critical |
|-------|--------|----------|
| Line coverage | >= 80% | Yes |
| Branch coverage | >= 75% | Yes |
| Tenant context mocking | 100% tenant code | Yes |
| Isolation logic coverage | 100% | Yes |

### QG-TC2: Integration Test Coverage

| Check | Target | Critical |
|-------|--------|----------|
| Cross-tenant tests exist | All data access paths | Yes |
| RLS policy verification | 100% tenant tables | Yes |
| API tenant context tests | All endpoints | Yes |
| Module boundary tests | All facades | No |

### QG-TC3: E2E Test Coverage

| Check | Target | Critical |
|-------|--------|----------|
| Critical path coverage | >= 90% | Yes |
| Tier-specific flows | All tiers | Yes |
| Tenant lifecycle tests | Onboard/offboard | Yes |
| Performance baselines | Established | No |

### QG-I2: Tenant Safety

| Check | Description | Critical |
|-------|-------------|----------|
| Cross-tenant access blocked | All test attempts fail | Yes |
| RLS policies active | All tenant tables | Yes |
| Cache isolation | Tenant-prefixed keys | Yes |
| Queue isolation | Tenant routing verified | Yes |
| Error messages safe | No tenant info leaked | Yes |

### QG-I3: Agent Safety

| Check | Description | Critical |
|-------|-------------|----------|
| Guardrails enforced | All safety policies active | Yes |
| Cross-tenant memory isolated | No shared agent state | Yes |
| Tool permissions verified | Per-tenant restrictions | Yes |
| Adversarial tests passed | Red team suite complete | Yes |
| Prompt injection blocked | All injection attempts fail | Yes |

### Recovery Protocol

When any quality gate fails:

```
FAIL Detected
    |
    +-- Attempt 1: Fix identified issues
    |   |
    |   +-- Re-run validation
    |   |
    |   +-- PASS? --> Continue to next phase
    |   |
    |   +-- FAIL? --> Attempt 2
    |
    +-- Attempt 2: Fix remaining issues
    |   |
    |   +-- Re-run validation
    |   |
    |   +-- PASS? --> Continue to next phase
    |   |
    |   +-- FAIL? --> MANDATORY COURSE CORRECTION
    |
    +-- Escalate to project leadership
```

**Locked Categories:** When a gate fails, categories that passed are "locked" and don't need re-validation.

---

## Web Research

| Topic | Query |
|-------|-------|
| Multi-tenant testing patterns | "multi-tenant testing patterns SaaS {date}" |
| Tenant isolation verification | "tenant isolation verification testing {date}" |
| RLS security testing | "PostgreSQL RLS security testing patterns {date}" |
| Chaos engineering multi-tenant | "chaos engineering multi-tenant SaaS {date}" |
| AI agent safety testing | "AI agent safety testing multi-tenant {date}" |
| LLM testing patterns | "LLM testing patterns multi-tenant SaaS {date}" |
| SaaS E2E testing | "SaaS E2E testing strategies {date}" |
| Test fixture management | "multi-tenant test fixtures patterns {date}" |
| Fault injection testing | "fault injection distributed systems {date}" |
| Test data management | "test data management SaaS {date}" |
| AI agent resilience | "AI agent resilience testing {date}" |
| Cross-tenant penetration testing | "tenant boundary penetration testing {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **Testing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `test-*`
- **Tenant isolation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **AI runtimes:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv`

---

## Related Workflows

- `bmad-bam-convergence-verification` - Verify tenant isolation and agent safety (QG-I1, QG-I2, QG-I3)
- `validate-foundation` - Validate foundation testing coverage (QG-F1)
- `validate-module` - Validate module testing coverage (QG-M1, QG-M2, QG-M3)
- `bmad-bam-chaos-engineering-design` - Design chaos engineering experiments
- `bmad-bam-disaster-recovery-design` - DR strategy and testing
- `bmad-bam-tenant-model-isolation` - Define isolation requirements to test
- `bmad-bam-security-review` - Security testing scope and penetration tests
- `bmad-bam-ai-eval-safety-design` - Design AI evaluation and safety test automation
- `bmad-bam-ai-agent-debug` - Debug agent safety failures and violations
- `bmad-bam-performance-baseline` - Configure tier-specific load testing
- `bmad-bam-tenant-incident-response` - Incident response procedures

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Mock isolation | Doesn't test real behavior | Test actual RLS policies |
| Shared test data | Tests interfere | Use isolated fixtures per test |
| Happy path only | Misses edge cases | Include negative and adversarial tests |
| No CI integration | Regressions slip through | Automate all tests in pipeline |
| Ignored failures | False sense of security | Fix or explicitly acknowledge all failures |
| Skipping chaos tests | Unknown failure modes | Regular chaos engineering exercises |
| Manual pen testing only | Regressions between tests | Automated security test suite |
| Production data in tests | PII exposure risk | Always anonymize production snapshots |
| Single tenant tests | Isolation not verified | Always test with multiple tenants |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 8 source files: tenant-testing.md, chaos-engineering-guide.md, tea-guide.md, qa-guide.md, testing-isolation.md, testing-agent-safety.md, testing-multi-tenant-fixtures.md, testing-tenant-isolation.md |
