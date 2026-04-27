# BAM CI/CD Patterns Guide

**When to load:** During Phase 4 (Implementation) when designing CI/CD pipelines for multi-tenant systems,
or when user mentions CI/CD, pipelines, deployment automation, GitOps, continuous delivery.

**Integrates with:** DevOps agent, Architect (Atlas persona), Dev agent

---

## Core Concepts

### Multi-Tenant CI/CD Challenges

CI/CD for multi-tenant platforms differs from single-tenant deployments:

| Challenge | Single-Tenant | Multi-Tenant |
|-----------|---------------|--------------|
| Deployment scope | One environment | Shared infra + tenant configs |
| Testing | Single config | Matrix of tenant configurations |
| Rollout | All-at-once | Progressive, tenant-aware |
| Rollback | Full revert | Per-tenant or global |
| Secrets | Single set | Per-tenant secrets |

### Pipeline Architecture

| Stage | Purpose | Multi-Tenant Consideration |
|-------|---------|---------------------------|
| Build | Compile, package | Single artifact, tenant-agnostic |
| Test | Validate functionality | Test against tenant config matrix |
| Security | Scan vulnerabilities | Tenant isolation verification |
| Stage | Deploy to staging | Multi-tenant staging environment |
| Canary | Limited production | Percentage or tenant-based |
| Production | Full rollout | Tenant-aware progressive deployment |

### Tenant-Aware Testing Strategy

| Test Type | Scope | Tenant Variation |
|-----------|-------|------------------|
| Unit tests | Component logic | None (tenant-agnostic) |
| Integration tests | Service interaction | Test with multiple tenant configs |
| Contract tests | API compatibility | Verify tenant-specific features |
| E2E tests | Full workflows | Run per tier (free, pro, enterprise) |
| Isolation tests | Tenant boundary | Cross-tenant access attempts |

## Application Guidelines

When implementing CI/CD for multi-tenant systems:

1. **Build once, deploy many**: Create tenant-agnostic artifacts, inject config at runtime
2. **Test the tenant matrix**: Validate against representative tenant configurations
3. **Verify isolation in CI**: Include cross-tenant access tests in every pipeline
4. **Support tenant-scoped rollout**: Enable deploying to specific tenants first
5. **Automate rollback**: Detect failures and revert automatically

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Standard feature release | Canary to 1%, then 10%, then 100% | Progressive risk reduction |
| Breaking API change | Tenant-scoped rollout with feature flag | Allow tenants to prepare |
| Security patch | Immediate rollout with forced upgrade | Security overrides gradual rollout |
| Database migration | Expand-contract with zero-downtime | Avoid tenant disruption |
| Tenant-specific fix | Deploy to affected tenant only | Minimize blast radius |
| Infrastructure change | Blue-green with instant rollback | Protect all tenants |

## Implementation Patterns

### Pattern 1: Multi-Tenant Pipeline Structure

| Pipeline Stage | Actions | Artifacts |
|----------------|---------|-----------|
| Commit | Lint, unit test, build | Container image |
| PR | Integration test, security scan | Test report |
| Merge | Full test suite, artifact publish | Versioned release |
| Stage | Deploy to staging, smoke test | Staging validation |
| Canary | Deploy to canary, monitor | Canary metrics |
| Production | Progressive rollout | Production deployment |

### Pattern 2: Tenant Configuration Management

| Approach | Use Case | Complexity |
|----------|----------|------------|
| Environment variables | Simple overrides | Low |
| Config files per tenant | Extensive customization | Medium |
| Config service | Dynamic configuration | High |
| Feature flags | Feature availability | Medium |
| GitOps per tenant | Audit trail required | High |

### Pattern 3: Test Environment Strategy

| Environment | Tenants | Purpose |
|-------------|---------|---------|
| Dev | Synthetic test tenants | Developer testing |
| Integration | CI test tenants | Automated testing |
| Staging | Mirror of production tenants | Pre-release validation |
| Canary | Real tenants (opt-in) | Early adopter feedback |
| Production | All tenants | Live service |

## Multi-Tenant Deployment Strategies

### Progressive Rollout Configuration

| Stage | Traffic | Duration | Promotion Criteria |
|-------|---------|----------|-------------------|
| Canary | 1% | 30 min | Error rate < 0.1% |
| Early Adopters | 10% | 2 hours | No critical alerts |
| Rolling | 25% -> 50% -> 100% | 4 hours | SLO maintained |

### Tenant-Based Rollout

| Tenant Tier | Rollout Priority | Notification |
|-------------|------------------|--------------|
| Beta | First | None required |
| Standard | After canary success | In-app notice |
| Enterprise | Scheduled window | 48h advance notice |
| Regulated | Manual approval | Compliance review |

### Rollback Triggers

| Metric | Threshold | Action |
|--------|-----------|--------|
| Error rate | > 1% increase | Auto-rollback |
| Latency p99 | > 50% increase | Alert + manual review |
| Health checks | < 80% passing | Auto-rollback |
| Tenant complaints | > 3 in 15 min | Manual review |

## Security in CI/CD

| Security Gate | Stage | Blocking |
|---------------|-------|----------|
| SAST (code scan) | PR | Yes |
| Dependency scan | Build | Yes (critical) |
| Container scan | Build | Yes (critical) |
| DAST (runtime scan) | Staging | No (report only) |
| Secrets detection | Commit | Yes |
| RLS policy test | Integration | Yes |

## Infrastructure as Code

### Tenant Infrastructure Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Shared base + overlays | Common infra with tenant config | Most SaaS |
| Per-tenant modules | Terraform modules per tenant | Enterprise isolation |
| GitOps per tenant | Flux/Argo per tenant namespace | Regulated tenants |

### Database Migration Strategy

| Phase | Action | Rollback |
|-------|--------|----------|
| Pre-deploy | Run forward migrations | Backward compatible |
| Deploy | Application update | Use previous version |
| Post-deploy | Clean up deprecated | Manual if needed |

## Related Workflows

- `bmad-bam-convergence-verification` - Verify deployment convergence
- `bmad-bam-api-version-release` - API versioning in CI/CD
- `bmad-bam-tenant-onboarding-design` - Tenant provisioning automation

## Related Patterns

Load decision criteria from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `deployment`, `infrastructure`

### Web Research

Use `web_queries` from pattern registry:
- Search: "multi-tenant CI/CD pipeline patterns {date}"
- Search: "GitOps multi-tenant Kubernetes {date}"
- Search: "progressive delivery SaaS best practices {date}"
