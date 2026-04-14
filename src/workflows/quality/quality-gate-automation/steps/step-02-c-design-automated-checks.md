# Step 2: Design Automated Checks

## Purpose

Design automated checks for each quality gate.

## Prerequisites

- Gates mapped to pipeline

## Actions

### 1. Design Tenant Isolation Checks (QG-M2)

| Check | Implementation | Tool |
|-------|----------------|------|
| RLS policy test | SQL test suite | pgTAP/jest |
| Cache isolation | Cache test suite | Custom |
| Memory isolation | Memory test suite | Custom |
| API isolation | E2E tests | Playwright |

### 2. Design Convergence Checks (QG-I1)

| Check | Implementation | Tool |
|-------|----------------|------|
| Contract tests | Pact/consumer-driven | Pact |
| Integration tests | Cross-module tests | Jest |
| E2E workflow tests | Full flow tests | Playwright |

### 3. Design Safety Checks (QG-I2, QG-I3)

| Check | Implementation | Tool |
|-------|----------------|------|
| Security scan | SAST/DAST | Snyk/OWASP |
| Prompt injection | AI security tests | Custom |
| Input validation | Fuzzing | Custom |

### 4. Design Production Checks (QG-P1)

| Check | Implementation | Tool |
|-------|----------------|------|
| Performance | Load testing | k6 |
| Reliability | Chaos tests | Litmus |
| Observability | Smoke tests | Custom |

## Web Research Verification

Search the web: "automated quality gate checks CI/CD {date}"
Search the web: "multi-tenant security testing automation {date}"

## Verification

- [ ] All gate checks designed
- [ ] Tools selected
- [ ] Implementation approach defined

## Outputs

- Automated check designs

## Next Step

Proceed to `step-03-c-configure-thresholds.md`.
