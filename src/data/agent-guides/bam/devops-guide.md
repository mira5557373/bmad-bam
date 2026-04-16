# DevOps Guide - BAM Extension

**When to load:** During Phase 4-6 (Implementation/Operations) when designing deployment strategies, configuring tier-specific infrastructure, or automating tenant provisioning. Load when user mentions deployments, Kubernetes, infrastructure tiers, tenant provisioning, or operational concerns for multi-tenant systems.
**Integrates with:** Dev (bmad-agent-dev), deployment, infrastructure automation

---

This guide provides BAM-specific context for DevOps engineers operating multi-tenant agentic AI platforms.

## Role Context

As a DevOps engineer on a BAM project, you focus on:
- Designing deployment architectures with appropriate tenant isolation
- Configuring infrastructure that delivers tier-specific performance guarantees
- Building automated provisioning pipelines for tenant onboarding
- Operating multi-tenant infrastructure with noisy neighbor prevention
- Managing tenant lifecycle operations (upgrades, migrations, offboarding)

## Core Concepts

### Deployment Isolation Strategies

Different tiers require different isolation levels:
- **FREE tier**: Shared resources with tenant labels and resource limits
- **PRO tier**: Dedicated namespaces with resource quotas and network policies
- **ENTERPRISE tier**: Dedicated node pools, separate databases, private networking

The isolation level directly impacts cost and operational complexity. Choose the minimum isolation that meets tier requirements.

### Infrastructure Tiering Matrix

| Resource | FREE | PRO | ENTERPRISE |
|----------|------|-----|------------|
| Compute | Shared pods | Dedicated namespace | Dedicated node pool |
| Database | RLS (shared) | Schema per tenant | Database per tenant |
| Network | Shared ingress | Service mesh segment | VPC peering |
| Secrets | Shared namespace | Tenant namespace | Dedicated Vault |
| Storage | Shared volume | Tenant volume | Dedicated storage class |

### Provisioning Automation

Tenant provisioning must be fully automated and idempotent:
- All stages must support rollback on failure
- Secrets must be tenant-isolated from creation
- Health checks verify successful provisioning
- Audit trail captures who, when, what for compliance

### Provisioning Pipeline Stages

| Stage | Duration | Rollback |
|-------|----------|----------|
| 1. Validation | <1s | N/A |
| 2. Identity (IdP) | 2-5s | Delete identity |
| 3. Database | 5-30s | Drop schema |
| 4. Compute (K8s) | 10-60s | Delete namespace |
| 5. Network | 5-10s | Remove DNS |
| 6. Configuration | 2-5s | Reset defaults |
| 7. Verification | 5-10s | Full rollback |

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| New FREE tenant | Shared namespace + RLS | Cost efficiency |
| PRO upgrade | Migrate to dedicated namespace | Isolation upgrade |
| Enterprise onboard | Dedicated infrastructure | Maximum isolation |
| Noisy neighbor detected | Apply stricter resource limits | Protect other tenants |
| Compliance requirement | Isolate at infrastructure level | Regulatory mandates |
| Cost optimization | Right-size based on actual usage | FinOps best practice |

---

## Application Guidelines

1. **Infrastructure as Code** - All provisioning via Terraform/Pulumi
2. **GitOps deployment** - ArgoCD ApplicationSet for tenant configs
3. **Idempotent provisioning** - Safe to retry any stage
4. **Rollback automation** - Every stage has compensation action
5. **Observability first** - Metrics/logs from day one
6. **Tenant-aware monitoring** - Dashboards per tenant tier
7. **Cost allocation** - Tag all resources with tenant ID
8. **Capacity planning** - Scale based on tenant count projections

### Operational Runbook Requirements

Every provisioning operation needs:
- Step-by-step execution guide
- Rollback procedure for each step
- Health check commands
- Escalation contacts
- Audit log requirements

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` → Provisioning automation
- `bmad-bam-tenant-offboarding-design` → Cleanup automation
- `bmad-bam-tenant-aware-observability` → Monitoring design
- `create-master-architecture` → Infrastructure decisions

---

## Migration Runbooks and Blue-Green Deployments

### Blue-Green Deployment Strategy

Multi-tenant platforms require zero-downtime deployments to maintain SLA commitments across all tiers:

| Component | Strategy | Tenant Impact |
|-----------|----------|---------------|
| API Gateway | Blue-green with weighted routing | Gradual traffic shift |
| Application Pods | Rolling update with readiness probes | No downtime |
| Database Schema | Online migrations with backward compatibility | No impact |
| AI Runtime | Canary deployment per tenant tier | Enterprise first rollback |

### Migration Runbook Requirements

Every database migration must include:
- Pre-migration health check verifying tenant isolation
- Rollback script tested in staging environment
- Tenant notification matrix based on impact severity
- Post-migration verification across all tenant tiers
- Performance baseline comparison before/after

### Tenant-Aware Canary Releases

Deploy to tenant tiers in sequence:
1. Internal test tenant (always first)
2. FREE tier sample (1% of traffic)
3. PRO tier sample (with monitoring gates)
4. ENTERPRISE tier (manual approval gate)
5. Full rollout with automated rollback triggers

---

## Cost Allocation and Resource Tagging

### Multi-Tenant Resource Tagging Strategy

All infrastructure resources must be tagged for accurate cost allocation:

| Tag Key | Purpose | Example Values |
|---------|---------|----------------|
| `tenant_id` | Primary cost allocation | `tenant_abc123` |
| `tier` | Tier-based aggregation | `free`, `pro`, `enterprise` |
| `module` | Service cost breakdown | `billing`, `ai-runtime`, `auth` |
| `environment` | Environment separation | `prod`, `staging`, `dev` |
| `cost_center` | Business unit allocation | `engineering`, `customer_success` |

### Cost Visibility Requirements

- Daily cost reports per tenant tier with anomaly detection
- Monthly tenant profitability analysis
- Resource utilization vs allocation reports
- Chargeback data export for enterprise billing
- Cost projection based on tenant growth trends

### FinOps Best Practices

- Right-size resources based on actual tenant usage patterns
- Reserved capacity for predictable enterprise workloads
- Spot instances for batch AI processing with tier fallback
- Auto-scaling policies tuned per tier SLA requirements
- Unused resource cleanup automation with tenant awareness

---

## Tenant-Aware CI/CD Pipeline Patterns

### Pipeline Architecture

Multi-tenant CI/CD must isolate tenant configurations while sharing common infrastructure:

| Pipeline Stage | Tenant Consideration | Automation |
|---------------|---------------------|------------|
| Build | Shared artifacts | Single pipeline |
| Test | Tenant isolation tests | Parallel per-tier |
| Security Scan | Cross-tenant vulnerability | Mandatory gate |
| Deploy Staging | Multi-tenant test env | Full tenant matrix |
| Deploy Prod | Canary per tier | Sequential rollout |

### Tenant Configuration Management

- GitOps repository structure with tenant overlays
- ArgoCD ApplicationSet for dynamic tenant provisioning
- Sealed secrets per tenant namespace
- Config drift detection and auto-remediation
- Tenant-specific feature flags in deployment manifests

### Pipeline Security Gates

Every deployment must pass:
- Cross-tenant data access regression tests
- RLS policy verification for affected tables
- Network policy validation for tenant isolation
- Secret rotation verification for modified tenants
- Compliance evidence generation for regulated tenants

---

## Infrastructure as Code for Tenant Provisioning

### Terraform Module Structure

Tenant provisioning modules must be composable and tier-aware:

| Module | Purpose | Tier Variations |
|--------|---------|-----------------|
| `tenant-identity` | IdP configuration | FREE: basic, ENTERPRISE: SCIM |
| `tenant-database` | Database/schema setup | RLS vs dedicated |
| `tenant-compute` | Namespace/node pool | Shared vs dedicated |
| `tenant-network` | Network policies | Shared ingress vs VPC |
| `tenant-secrets` | Vault namespace | Shared vs dedicated |

### Provisioning State Management

- Remote state per tenant for isolation
- State locking with tenant-aware timeout
- Drift detection scheduled per tier priority
- Blast radius limitation via workspace separation
- Backup state with point-in-time recovery

### Idempotent Provisioning Patterns

All provisioning operations must be safe to retry:
- Use create_before_destroy for zero-downtime updates
- Implement resource import for existing infrastructure
- Version all modules with semantic versioning
- Maintain backward compatibility for tenant migrations
- Document breaking changes with migration guides

### Tenant Teardown Automation

Offboarding infrastructure cleanup:
- Soft delete with configurable retention period
- Resource dependency graph for ordered cleanup
- Data export automation before resource deletion
- Compliance certificate generation post-cleanup
- Cost allocation final reconciliation

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **DevOps patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `devops-*`
- **Deployment patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `deploy-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS deployment patterns {date}"
- Search: "tenant-aware CI/CD pipeline patterns {date}"
- Search: "infrastructure as code multi-tenant isolation {date}"
