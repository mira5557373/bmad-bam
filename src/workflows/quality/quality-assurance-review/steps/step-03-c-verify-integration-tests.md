# Step 3: Verify Integration Tests

## Purpose

Analyze integration test coverage across module boundaries and cross-module workflow chains.

## Prerequisites

- Tenant isolation assessed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `module-boundaries, facade-contracts`
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-i1-convergence.md`

## Actions

### 1. Assess Cross-Module Integration Coverage

| Module A | Module B | Facade | Tests | Coverage |
|----------|----------|--------|-------|----------|
| Identity | Billing | TenantFacade | | |
| Identity | AI Runtime | UserFacade | | |
| Billing | Usage | MeteringFacade | | |
| AI Runtime | Tools | ToolFacade | | |

### 2. Verify Workflow Chain Tests

Test coverage for key workflow sequences:

| Workflow Chain | Tests | Passing | Gaps |
|----------------|-------|---------|------|
| Tenant Onboarding → Provisioning → Activation | | | |
| Request → Auth → Module → Response | | | |
| Agent Start → Tool Exec → Memory Store → Complete | | | |
| Event Publish → Route → Consume → Process | | | |

### 3. Review Contract Test Coverage

| Contract | Consumer Tests | Provider Tests | Breaking Change Tests |
|----------|----------------|----------------|----------------------|
| ... | | | |

### 4. Assess End-to-End Test Coverage

| E2E Scenario | Test Type | Environment | Status |
|--------------|-----------|-------------|--------|
| Full tenant lifecycle | E2E | Staging | |
| AI agent workflow | E2E | Staging | |
| Cross-module story | E2E | Staging | |

### 5. Calculate Integration Coverage Score

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Cross-module facades | 30% | | |
| Workflow chains | 25% | | |
| Contract tests | 25% | | |
| E2E tests | 20% | | |
| **Total** | 100% | | |

## Web Research Verification

Search the web: "integration testing multi-tenant architecture {date}"
Search the web: "contract testing microservices modular {date}"

## Verification

- [ ] Cross-module integration mapped
- [ ] Workflow chains tested
- [ ] Contract coverage verified
- [ ] E2E tests reviewed

## Outputs

- Integration test coverage matrix
- Workflow chain test status
- Integration coverage score

## Next Step

Proceed to `step-04-c-check-compliance-status.md` with integration assessment.
