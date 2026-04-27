---
name: qg-i1-convergence
description: Cross-module convergence validation - facade compatibility, event schemas, integration tests
module: bam
tags: [integration, quality-gate, multi-tenant, convergence, facade, event-schema, api-contract]
version: 2.0.0
---

# QG-I1: Convergence Gate Checklist

> **Gate ID:** QG-I1 (Convergence Gate)
> **Definition:** Convergence gate validates cross-module integration before tenant safety (QG-I2) and agent safety (QG-I3) verification.
> **Scope:** Covers facade compatibility, event schema alignment, integration tests, data flow verification, and API contract validation.
> **Recovery:** Gate failure requires resolving integration blockers before proceeding to safety gates.

**Phase:** 4-implementation
**Workflow:** bmad-bam-convergence-verification
**Prerequisites:** QG-M1 (Module Architecture), QG-M2 (Tenant Isolation), QG-M3 (Agent Runtime)

---

## Purpose

The Convergence Gate (QG-I1) validates that all modules integrate correctly and that cross-module boundaries are stable and well-defined. This gate ensures:

1. **Facade compatibility** is verified across all module boundaries with version alignment
2. **Event schemas** align across module boundaries using CloudEvents standard
3. **Integration tests** pass comprehensively including failure scenarios
4. **Data flow** maintains tenant context propagation through all module boundaries
5. **API contracts** are validated for backward compatibility and OpenAPI compliance
6. **Circular dependencies** are eliminated ensuring clean module boundaries
7. **Error propagation** is consistent and predictable across modules

Passing QG-I1 unlocks tenant safety (QG-I2) and agent safety (QG-I3) verification.

---

## Facade Compatibility

### Version Alignment

- [ ] **CRITICAL:** All facade versions documented in facade-contract.md
- [ ] **CRITICAL:** No breaking changes between dependent module facades
- [ ] **CRITICAL:** Facade version matrix verified across all module pairs
- [ ] Semantic versioning applied to all facade contracts
- [ ] Deprecation warnings documented for deprecated facade methods
- [ ] Migration guides available for facade version upgrades

### Contract Tests

- [ ] **CRITICAL:** Contract tests pass for all module facade pairs (100% pass rate)
- [ ] **CRITICAL:** Contract tests cover all public facade methods
- [ ] **CRITICAL:** Contract tests include tenant context validation
- [ ] Contract test coverage >= 90% of facade surface area
- [ ] Consumer-driven contract tests implemented where applicable
- [ ] Contract test results published to CI/CD dashboard

### Breaking Change Prevention

- [ ] **CRITICAL:** No removed methods without deprecation period
- [ ] **CRITICAL:** No changed method signatures without version bump
- [ ] Breaking change detection automated in CI/CD pipeline
- [ ] Breaking change review process documented
- [ ] Backward compatibility window defined (minimum 2 versions)

---

## Event Schema Alignment

### CloudEvents Compliance

- [ ] **CRITICAL:** All events follow CloudEvents v1.0 specification
- [ ] **CRITICAL:** Event type naming follows domain.module.action pattern
- [ ] **CRITICAL:** All events include tenant_id in context attributes
- [ ] Event source URIs are consistent across modules
- [ ] Content-type headers properly set for all events
- [ ] Event ID generation uses UUID v4 or equivalent

### Schema Registry

- [ ] **CRITICAL:** Event schemas registered in central schema registry
- [ ] **CRITICAL:** Schema validation enabled for all event producers
- [ ] **CRITICAL:** Schema validation enabled for all event consumers
- [ ] Schema evolution policy documented (backward/forward compatibility)
- [ ] Schema registry accessible to all modules
- [ ] Dead letter queue configured for schema validation failures

### Event Versioning

- [ ] **CRITICAL:** Event schema versions follow semantic versioning
- [ ] **CRITICAL:** Event consumers handle multiple schema versions
- [ ] Event version negotiation implemented
- [ ] Old event versions sunset timeline documented
- [ ] Event version migration tooling available
- [ ] Version compatibility matrix maintained

---

## Integration Test Coverage

### Cross-Module Tests

- [ ] **CRITICAL:** Integration tests pass for all module pairs (100% pass rate)
- [ ] **CRITICAL:** Integration test coverage >= 80% of cross-module flows
- [ ] **CRITICAL:** Happy path scenarios tested for all integrations
- [ ] Integration tests run in isolated test environment
- [ ] Test data fixtures tenant-isolated
- [ ] Integration test execution time < 10 minutes

### Failure Scenarios

- [ ] **CRITICAL:** Timeout handling tested for all cross-module calls
- [ ] **CRITICAL:** Circuit breaker behavior tested for each integration
- [ ] **CRITICAL:** Partial failure scenarios tested (one module down)
- [ ] Retry behavior tested with idempotency verification
- [ ] Cascading failure prevention tested
- [ ] Recovery scenarios tested after failure

### End-to-End Flows

- [ ] **CRITICAL:** Critical business flows tested end-to-end
- [ ] **CRITICAL:** End-to-end tests include tenant context propagation
- [ ] User journey tests cover primary workflows
- [ ] Performance benchmarks met for end-to-end flows
- [ ] End-to-end test data cleanup automated
- [ ] Cross-module transaction consistency verified

---

## Data Flow Verification

### Tenant Context Propagation

- [ ] **CRITICAL:** Tenant context propagated through all module boundaries
- [ ] **CRITICAL:** Tenant context preserved in async event handlers
- [ ] **CRITICAL:** Tenant context included in all outbound API calls
- [ ] Tenant context validated at each module entry point
- [ ] Tenant context audit trail maintained
- [ ] Context propagation tested with distributed tracing

### Event Ordering

- [ ] **CRITICAL:** Event ordering preserved for tenant-scoped events
- [ ] **CRITICAL:** Exactly-once delivery guaranteed for critical events
- [ ] Event sequence numbers implemented where required
- [ ] Out-of-order event handling documented
- [ ] Event replay capability available
- [ ] Event ordering verified in integration tests

### Data Consistency

- [ ] **CRITICAL:** Cross-module data consistency verified
- [ ] **CRITICAL:** Saga pattern implemented for distributed transactions
- [ ] Eventual consistency windows documented
- [ ] Compensation actions defined for saga failures
- [ ] Data reconciliation procedures documented
- [ ] Consistency monitoring alerts configured

---

## API Contract Validation

### OpenAPI Compliance

- [ ] **CRITICAL:** OpenAPI 3.0+ specifications exist for all public APIs
- [ ] **CRITICAL:** OpenAPI specs validated by automated tooling
- [ ] **CRITICAL:** API implementations match OpenAPI specs
- [ ] OpenAPI specs versioned with API versions
- [ ] Request/response examples included in specs
- [ ] Error response schemas documented

### Backward Compatibility

- [ ] **CRITICAL:** No breaking changes to existing API endpoints
- [ ] **CRITICAL:** API versioning strategy implemented (URL or header)
- [ ] **CRITICAL:** Deprecated endpoints documented with sunset dates
- [ ] API changelog maintained
- [ ] Breaking change alerts in CI/CD pipeline
- [ ] Consumer notification process for API changes

### Authentication and Authorization

- [ ] **CRITICAL:** All API endpoints require authentication
- [ ] **CRITICAL:** Tenant-scoped authorization enforced on all endpoints
- [ ] **CRITICAL:** API rate limiting implemented and tested
- [ ] API key rotation procedures documented
- [ ] OAuth scopes properly defined for each endpoint
- [ ] Authorization failures return appropriate HTTP status codes

---

## Dependency Management

### Circular Dependency Prevention

- [ ] **CRITICAL:** No circular dependencies between modules
- [ ] **CRITICAL:** Module dependency graph documented and validated
- [ ] Dependency analysis automated in CI/CD pipeline
- [ ] Shared kernel dependencies minimized
- [ ] Module coupling metrics tracked
- [ ] Dependency injection patterns enforced

### External Service Dependencies

- [ ] **CRITICAL:** External service contracts documented
- [ ] **CRITICAL:** External service fallback behavior defined
- [ ] External service health checks implemented
- [ ] External service timeouts configured
- [ ] External service retry policies defined
- [ ] External service dependency matrix maintained

---

## Observability Integration

### Distributed Tracing

- [ ] **CRITICAL:** Trace context propagated across module boundaries
- [ ] **CRITICAL:** Span attributes include tenant_id
- [ ] Trace sampling rate configured appropriately
- [ ] Trace visualization available (Jaeger/Zipkin)
- [ ] Trace-based alerting configured for critical paths
- [ ] Trace retention policy defined

### Logging Correlation

- [ ] **CRITICAL:** Correlation IDs propagated across all logs
- [ ] **CRITICAL:** Log format consistent across modules
- [ ] Log aggregation functional (ELK/Loki)
- [ ] Log-based error alerting configured
- [ ] Log retention policy defined per compliance requirements
- [ ] PII masking verified in logs

### Metrics Alignment

- [ ] **CRITICAL:** Standard metrics exported from all modules (RED metrics)
- [ ] **CRITICAL:** Metrics include tenant dimension labels
- [ ] Metrics dashboards operational
- [ ] SLO monitoring configured
- [ ] Alert thresholds defined and tested
- [ ] Metric cardinality within limits

---

## Feature Flag Integration

- [ ] **CRITICAL:** Feature flags working across module boundaries
- [ ] **CRITICAL:** Feature flag state consistent for single request
- [ ] Feature flag rollout strategy documented
- [ ] Feature flag cleanup process defined
- [ ] Feature flag audit logging enabled
- [ ] Emergency feature flag kill switch tested

---

## Rollback Procedures

- [ ] **CRITICAL:** Rollback procedures documented for each module
- [ ] **CRITICAL:** Rollback tested in staging environment
- [ ] **CRITICAL:** Database migration rollback verified
- [ ] Event schema rollback strategy defined
- [ ] Rollback time target defined (< 5 minutes)
- [ ] Rollback notification procedures documented

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, >= 80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, < 80% of non-critical items pass - remediation plan required with deadline |
| **FAIL** | Any CRITICAL item fails - block progression to QG-I2/QG-I3, enter recovery protocol |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Facade Version Alignment | CRITICAL | Minor version mismatch | Breaking version mismatch |
| Contract Tests | CRITICAL | 90-99% pass rate | < 90% pass rate or cross-tenant failure |
| Event Schema (CloudEvents) | CRITICAL | Minor schema warnings | Schema validation failure |
| Schema Registry | CRITICAL | Registry partial | No schema validation |
| Integration Tests (cross-module) | CRITICAL | 80-90% pass rate | < 80% pass rate |
| Failure Scenario Tests | CRITICAL | Partial coverage | No timeout/circuit breaker tests |
| Tenant Context Propagation | CRITICAL | Propagation inconsistent | Context lost across boundary |
| Event Ordering | CRITICAL | Minor ordering issues | Events lost or duplicated |
| OpenAPI Compliance | CRITICAL | Minor spec deviations | No OpenAPI specs |
| Circular Dependencies | CRITICAL | N/A | Any circular dependency |
| API Authentication | CRITICAL | Partial coverage | Unauthenticated endpoints exist |
| Distributed Tracing | CRITICAL | Partial propagation | No trace context |
| Feature Flags (cross-module) | CRITICAL | Inconsistent state | Feature flags broken |
| Rollback Procedures | CRITICAL | Untested rollback | No rollback documented |
| Deprecation Documentation | Non-critical | Incomplete docs | N/A |
| Performance Benchmarks | Non-critical | Minor deviations | N/A |
| Logging Correlation | Non-critical | Partial correlation | N/A |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. **Document** the specific item and reason for waiver request
2. **Assess** the risk impact on cross-module integration stability
3. **Obtain** stakeholder sign-off (Integration Architect or Technical Lead)
4. **Record** waiver in gate report with expiration date (max 30 days)
5. **Create** follow-up ticket for remediation with priority P2 or higher

**Note:** CRITICAL items cannot be waived. All CRITICAL items must pass for gate approval.

---

## Recovery Protocol

**If QG-I1 fails:**

### Attempt 1: Immediate Remediation (target: 2-3 days)

1. Identify failed CRITICAL categories from checklist
2. Review facade contracts for version misalignment
3. Run contract tests with verbose output to identify failures
4. Verify event schema compliance using schema registry tools
5. Trace tenant context propagation through failing integrations
6. Re-run QG-I1 validation after fixes
7. **Lock passed categories** - do not re-test locked items

### Attempt 2: Deep Investigation (target: 3-5 days)

1. Analyze root cause of continued failures
2. Engage Integration Architect (Kai persona) for cross-module review
3. Run distributed tracing analysis on failing flows
4. Review event ordering and delivery guarantees
5. Audit API contract implementations against OpenAPI specs
6. Verify circuit breaker and timeout configurations
7. Re-run QG-I1 validation after remediation
8. **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

1. Escalate to project leadership and Master Architect
2. Document integration failure patterns in ADR
3. Conduct cross-module architecture review session
4. Consider module boundary redesign if fundamentally incompatible
5. Evaluate phased integration approach with reduced scope
6. Create remediation plan with executive sign-off
7. Schedule follow-up validation within 1 week

---

## Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Facade Compatibility | Review version matrix; update facade contracts; run contract tests | Breaking changes detected |
| Event Schema Alignment | Validate CloudEvents compliance; register missing schemas | Schema validation failures |
| Integration Tests | Fix failing tests; add missing failure scenario coverage | Pass rate < 80% after fix |
| Tenant Context | Trace context propagation; add missing middleware | Context lost in any module |
| Event Ordering | Review queue configuration; implement sequence numbers | Event loss or duplication |
| API Contracts | Update OpenAPI specs; fix implementation mismatches | Unauthenticated endpoints |
| Dependencies | Refactor circular dependencies; update dependency graph | Circular dependency persists |
| Observability | Verify trace propagation; add missing span attributes | No distributed tracing |
| Feature Flags | Test cross-module flag consistency; fix state propagation | Flags inconsistent across modules |
| Rollback | Document procedures; test in staging; verify migrations | Rollback untested after 2 attempts |

---

## Automated Validation Script

```bash
# Run as part of QG-I1 gate
./scripts/validate-convergence.sh

# Validates:
# - Facade version alignment across modules
# - Contract test pass rate
# - CloudEvents schema compliance
# - Integration test coverage and pass rate
# - Tenant context propagation verification
# - API OpenAPI spec compliance
# - Circular dependency detection
# - Distributed tracing verification
```

---

## Related Workflows

- `bmad-bam-convergence-verification` - Primary convergence validation workflow
- `bmad-bam-define-facade-contract` - Facade contract definition
- `bmad-bam-evolve-facade-contract` - Facade contract evolution
- `bmad-bam-facade-mismatch-recovery` - Facade mismatch remediation
- `bmad-bam-validate-tool-contract` - Tool contract validation
- `bmad-bam-cross-module-story` - Cross-module story mapping

---

## Related Templates

- `facade-contract-template.md` - Facade contract documentation structure
- `event-schema-template.md` - CloudEvents schema template
- `integration-test-template.md` - Integration test specification template
- `api-contract-template.md` - OpenAPI specification template
- `convergence-report-template.md` - Gate validation report template

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Integration patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `integration-*`
- **Event patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `event-*`
- **Facade patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `facade-*`

### Web Research

- Search: "cross-module integration patterns multi-tenant {date}"
- Search: "CloudEvents schema validation patterns {date}"
- Search: "API contract testing best practices {date}"
- Search: "distributed tracing cross-service correlation {date}"

---

## Web Research Verification

- [ ] Search the web: "microservice integration testing best practices {date}" - Verify integration test approach
- [ ] Search the web: "event-driven architecture schema evolution patterns {date}" - Confirm event schema patterns
- [ ] Search the web: "API backward compatibility verification patterns {date}" - Validate API contract approach
- [ ] Search the web: "distributed transaction saga pattern implementation {date}" - Confirm data consistency patterns
- [ ] Search the web: "feature flag cross-service consistency patterns {date}" - Verify feature flag approach
- [ ] _Source: [URL]_ citations documented for key integration decisions

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | Full BMAD-compliant rewrite with all sections; added facade compatibility, event schema, data flow, API contract sections; comprehensive recovery protocol |
| 1.0.0 | - | BAM | Initial stub with basic checks |

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, all module facades compatible, event schemas aligned, integration tests passing
**OWNER:** BAM (Integration Architect persona - Kai)
**REVIEWERS:** Integration Architect, Platform Architect, Security Lead
