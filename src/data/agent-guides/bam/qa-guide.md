# QA Guide - BAM Extension

**When to load:** During Phase 5 (Quality) when testing tenant isolation or agent safety, or when user mentions tenant isolation testing, multi-tenant fixtures, or agent guardrails.
**Integrates with:** Developer+QA (dev-bam.yaml), testing strategy, quality assurance

This guide provides BAM-specific context for QA engineers working on multi-tenant agentic AI platforms.

## Role Context

As a QA engineer on a BAM project, you focus on:
- Testing tenant isolation boundaries
- Creating multi-tenant test fixtures
- Validating agent safety constraints
- Ensuring cross-tenant data protection

## Core Concepts

### Tenant Isolation as Critical Path
Cross-tenant data access represents the highest-severity defect category in multi-tenant systems. Every data access path requires explicit testing that tenant A cannot access tenant B data, with these tests running on every PR to prevent regression.

### Multi-Tenant Test Fixtures
Effective multi-tenant testing requires reusable fixtures representing each tier archetype with realistic data volumes and configurations. Fixtures must support both isolation (fresh per test) and performance (pre-seeded for speed) testing scenarios.

### Agent Safety Verification
AI agents operating in multi-tenant environments require systematic verification of guardrails, permission boundaries, resource limits, and output filtering. Safety testing includes both positive cases (agent works correctly) and adversarial inputs (prompt injection, malicious payloads).

## Application Guidelines

When testing multi-tenant systems:
1. Test both positive (tenant accesses own data) and negative (tenant blocked from other data) cases
2. Create fixtures for each tier to cover tier-specific behavior and limits
3. Include cross-tenant attack vectors in security testing suites
4. Automate critical isolation tests to run on every pull request
5. Test at each layer - database RLS, API authorization, service layer, and UI

## Tenant Testing Priority Matrix

Use this matrix to prioritize testing efforts across multi-tenant scenarios:

| Test Category | Risk Level | Priority | Frequency |
|--------------|------------|----------|-----------|
| **Cross-Tenant Data Access** | Critical | P0 | Every PR |
| **RLS Policy Verification** | Critical | P0 | Every PR |
| **Tenant Context Propagation** | High | P1 | Every PR |
| **Agent Guardrail Enforcement** | High | P1 | Every PR |
| **Tier Limit Enforcement** | Medium | P2 | Weekly |
| **Tenant Onboarding Flow** | Medium | P2 | Weekly |
| **Tenant Offboarding Cleanup** | Medium | P2 | Monthly |
| **Cross-Module Tenant Flow** | Medium | P2 | Per release |
| **Performance Under Multi-Tenant Load** | Low | P3 | Monthly |
| **Tenant Data Migration** | Low | P3 | Per migration |

### Risk-Based Test Coverage

| Risk Area | Minimum Test Coverage | Test Types Required |
|-----------|----------------------|---------------------|
| Data Isolation | 100% of data access paths | Unit, Integration, E2E |
| Authentication | 100% of auth flows | Unit, Integration |
| Authorization | 100% of permission checks | Unit, Integration |
| Agent Actions | 100% of tools | Unit, Integration |
| API Endpoints | 100% public, 80% internal | Integration, E2E |
| UI Workflows | 80% critical paths | E2E, Manual |

## Actionable Guidance

### Testing Tenant Isolation

1. **Create Multi-Tenant Test Suite** - Set up test harness with multiple tenant contexts
2. **Test Positive Cases** - Verify tenant A can access their own data
3. **Test Negative Cases** - Verify tenant A cannot access tenant B data
4. **Test Edge Cases** - Verify behavior with invalid, null, or missing tenant context
5. **Test at Each Layer** - Cover database, API, service, and UI layers
6. **Automate Critical Tests** - Include isolation tests in CI/CD pipeline
7. **Review Test Coverage** - Ensure all data access paths are tested

### Creating Multi-Tenant Test Fixtures

1. **Design Tenant Archetypes** - Create fixture tenants for each tier (Free, Pro, Enterprise)
2. **Seed Realistic Data** - Populate with representative data volumes
3. **Include Edge Cases** - Add tenants with special configurations
4. **Manage Lifecycle** - Create fresh fixtures for each test run
5. **Isolate Test Tenants** - Ensure test tenants don't affect production
6. **Document Fixture Structure** - Maintain reference for fixture contents
7. **Version Fixtures** - Update fixtures when schema changes

### Validating Agent Safety

1. **Test Guardrail Enforcement** - Verify agents respect configured limits
2. **Test Permission Boundaries** - Confirm tools only access permitted resources
3. **Test Input Validation** - Attempt prompt injection and malicious inputs
4. **Test Output Filtering** - Verify PII and sensitive data are filtered
5. **Test Resource Limits** - Confirm timeout and token limits are enforced
6. **Test Error Handling** - Verify graceful failure without data leakage
7. **Document Safety Test Cases** - Maintain catalog of safety scenarios

## Key Considerations

### Tenant Isolation Testing
- Test that tenant A cannot access tenant B data
- Verify RLS policies work correctly
- Test edge cases at tenant boundaries

### Multi-Tenant Fixtures
- Create reusable tenant test contexts
- Seed data for multiple tenant scenarios
- Clean up tenant data between tests

### Agent Safety Testing
- Test agent guardrails and constraints
- Verify tool permissions per tenant
- Test agent behavior under adversarial inputs

## SaaS-Specific Considerations

### Tier-Specific Test Scenarios

**Free Tier Testing:**
| Scenario | Expected Behavior |
|----------|------------------|
| Exceed rate limit | Request rejected with upgrade prompt |
| Access Pro feature | Feature gated with clear message |
| Reach storage limit | Upload blocked with warning |
| Try bulk operations | Batch size enforced |

**Pro Tier Testing:**
| Scenario | Expected Behavior |
|----------|------------------|
| Near quota limit | Warning notification sent |
| Exceed soft limit | Overage recorded, action allowed |
| Downgrade to Free | Features gracefully degraded |
| Upgrade to Enterprise | Features enabled seamlessly |

**Enterprise Tier Testing:**
| Scenario | Expected Behavior |
|----------|------------------|
| Custom limit configuration | Limits applied correctly |
| SSO authentication | Auth flow completes |
| Dedicated resources | Isolation verified |
| Custom compliance settings | Audit controls enforced |

### Cross-Tenant Attack Testing

**Attack Vectors to Test:**
- Manipulated JWT tenant claims
- Tenant ID injection in API parameters
- Direct object reference to other tenant data
- Cross-tenant cache poisoning
- Event replay with modified tenant context
- SQL injection targeting tenant filters

**Expected Defenses:**
- All attacks should fail with appropriate error
- No information about other tenants leaked
- Security events logged for review

### Performance Testing in Multi-Tenant Context

**Load Test Scenarios:**
| Scenario | Measurement | Acceptable Threshold |
|----------|-------------|---------------------|
| Single tenant burst | Response time | P95 < 500ms |
| Noisy neighbor | Other tenant impact | < 10% degradation |
| Multi-tenant concurrent | Throughput | > 90% of single-tenant |
| Tier-based prioritization | Free vs Pro latency | Pro < Free by 20% |

### Test Environment Strategy

| Environment | Purpose | Tenant Data |
|-------------|---------|-------------|
| Unit Tests | Code isolation | Mocked tenants |
| Integration | Service integration | Fixture tenants |
| Staging | Pre-production | Sanitized production clone |
| Production | Live system | Real tenants (read-only tests) |

### Compliance Testing

**Compliance Test Categories:**
- Data residency verification
- Audit log completeness
- Encryption at rest verification
- Encryption in transit verification
- Access control verification
- Data retention policy enforcement

### Regression Testing Strategy

**Tenant-Related Regression Suite:**
- Tenant creation and provisioning
- Tenant context throughout request flow
- Cross-tenant isolation at data layer
- Tier enforcement and upgrade/downgrade
- Agent permission boundaries
- API version compatibility per tenant

**Regression Triggers:**
- Any change to authentication/authorization
- Database schema migrations
- New modules or facades
- Agent runtime changes
- Third-party integration updates

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| New data access path added | Add isolation test to PR requirement | Prevent regression before merge |
| Cross-tenant bug found | P0 severity, immediate fix | Data leakage is existential risk |
| Performance testing needed | Use dedicated tenant environments | Prevent test load affecting real tenants |
| Agent tool added | Test permission boundaries per tier | Tools are primary attack surface for agents |
| Schema migration planned | Test data isolation post-migration | Migrations can break RLS policies |
| Flaky isolation test detected | Fix immediately, do not skip | Flaky isolation tests may hide real failures |

## Related Workflows

- `validate-foundation` - Validate foundation against QG-F1 quality gate
- `validate-module` - Validate module against QG-M1/M2/M3 quality gates
- `bmad-bam-convergence-verification` - Verify convergence across module boundaries

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Testing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `test-*`
- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant testing strategies {date}"
- Search: "tenant isolation testing patterns {date}"
- Search: "SaaS quality assurance automation {date}"
