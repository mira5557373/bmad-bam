---
name: qg-p1-production-readiness
description: Final pre-production gate validating all quality dimensions for multi-tenant AI platform deployment
module: bam
tags: [production, quality-gate, multi-tenant, deployment, slo]
version: 2.0.0
---

# QG-P1: Production Readiness Gate

> **Gate ID:** QG-P1 (Production Readiness)
> **Final release decision evidence.** ALL critical items must pass.
> **Safety outranks schedule** - no release if tenant-safety or agent-safety gates fail.
> **Gate definition:** Comprehensive pre-production verification across all quality dimensions.
> **Gate failure recovery:** Resolve blocking items before approving production deployment.
>
> **Secondary Gates Covered:**
> - QG-CS1 (Cost) - Cost attribution and optimization validation
> - QG-MG1 (Migration) - Data migration and cutover verification
> - QG-PRG (AI Production) - AI-specific production readiness

---

## Purpose

This gate validates that the multi-tenant AI platform is ready for production deployment. It consolidates all prerequisite gate outcomes, validates infrastructure readiness, verifies tenant isolation, confirms AI/ML system operational readiness, and ensures compliance requirements are met. This is the final checkpoint before production deployment.

---

## SLO Definition

| SLO | Target | Measurement |
|-----|--------|-------------|
| Availability | 99.9% | Uptime per calendar month |
| Latency (P99) | < 500ms | API response time |
| Error Rate | < 0.1% | 5xx responses / total requests |
| Tenant Isolation | 100% | Zero cross-tenant data access |
| Agent Safety | 100% | Kill switch response < 100ms |

---

## Prerequisite Gates

- [ ] **CRITICAL:** Foundation gate (QG-F1) passed
- [ ] **CRITICAL:** Module architecture gates (QG-M1, QG-M2, QG-M3) passed
- [ ] **CRITICAL:** Cross-module convergence gate (QG-I1) passed
- [ ] **CRITICAL:** Tenant isolation gate (QG-I2) passed
- [ ] **CRITICAL:** Agent safety gate (QG-I3) passed
- [ ] **CRITICAL:** Security continuous gate (QG-S1-S10) passed

---

## Disaster Recovery

- [ ] **CRITICAL:** DR plan documented and approved
- [ ] **CRITICAL:** RTO/RPO requirements defined and achievable
- [ ] **CRITICAL:** DR drill completed within last quarter
- [ ] Backup procedures verified with point-in-time recovery
- [ ] Recovery time objectives (RTO) documented
- [ ] Recovery point objectives (RPO) documented
- [ ] Cross-region failover tested
- [ ] Data backup verification automated
- [ ] Runbook for DR activation documented
- [ ] Communication plan for outages defined
- [ ] Service degradation procedures documented
- [ ] Database failover tested
- [ ] DNS failover automation verified

---

## Compliance Verification

- [ ] **CRITICAL:** Data processing agreements (DPA) in place
- [ ] **CRITICAL:** Privacy policy updated for AI processing
- [ ] Data privacy requirements met (GDPR, CCPA)
- [ ] Tenant data handling complies with contracts
- [ ] Audit logging captures all required events
- [ ] Legal/compliance review completed (if required)
- [ ] SOC 2 Type II controls verified (if applicable)
- [ ] GDPR compliance verified (if applicable)
- [ ] HIPAA compliance verified (if applicable)
- [ ] AI ethics review completed
- [ ] Model explainability requirements met
- [ ] Audit trail retention configured
- [ ] Third-party AI service agreements reviewed
- [ ] Data retention policies enforced

---

## Infrastructure Readiness

### Compute and Scaling

- [ ] **CRITICAL:** Auto-scaling policies configured for all tenant workloads
- [ ] **CRITICAL:** GPU/TPU resources provisioned for AI inference workloads
- [ ] **CRITICAL:** Resource quotas defined per tenant tier
- [ ] Horizontal pod autoscaling (HPA) configured for API services
- [ ] Vertical pod autoscaling (VPA) enabled for memory-intensive AI workers
- [ ] Cluster autoscaler configured for dynamic node provisioning
- [ ] Spot/preemptible instance policies defined for cost optimization
- [ ] Warm pool configured for rapid scale-out during traffic spikes
- [ ] Load balancer health checks configured with appropriate thresholds
- [ ] Connection pooling optimized for multi-tenant database access

### Database and Storage

- [ ] **CRITICAL:** Database replication configured (primary + read replicas)
- [ ] **CRITICAL:** Point-in-time recovery (PITR) enabled
- [ ] **CRITICAL:** Backup retention policies meet compliance requirements
- [ ] Database connection limits set per tenant tier
- [ ] Vector database (Pinecone/Weaviate/Qdrant) production cluster deployed
- [ ] Object storage (S3/GCS/Azure Blob) lifecycle policies configured
- [ ] Redis/Valkey cluster deployed for caching and rate limiting
- [ ] Database query performance baselines established
- [ ] Slow query logging enabled with alerting thresholds
- [ ] Storage encryption at rest verified for all data stores

### Networking

- [ ] **CRITICAL:** Private networking configured between services
- [ ] **CRITICAL:** WAF rules active on all public endpoints
- [ ] **CRITICAL:** DDoS protection enabled
- [ ] Service mesh (Istio/Linkerd) configured with mTLS
- [ ] Ingress controller rate limiting per tenant
- [ ] DNS failover configured for multi-region deployments
- [ ] CDN configured for static assets and model artifacts
- [ ] Network policies restrict inter-service communication
- [ ] Egress filtering prevents unauthorized external calls
- [ ] API gateway throttling configured per tenant tier

---

## Multi-Tenant Isolation (Pre-Deploy Verification)

### Data Isolation

- [ ] **CRITICAL:** Row-Level Security (RLS) policies active on all tenant tables
- [ ] **CRITICAL:** Cross-tenant query isolation verified
- [ ] **CRITICAL:** Tenant context propagation verified in all service calls
- [ ] **CRITICAL:** Cross-tenant data isolation confirmed
- [ ] Schema isolation configured (if schema-per-tenant model)
- [ ] Database isolation configured (if database-per-tenant model)
- [ ] Cache key prefixes include tenant_id
- [ ] Session storage isolated per tenant
- [ ] File storage paths include tenant segmentation
- [ ] Audit logs include tenant_id in all entries
- [ ] Background job queues respect tenant boundaries
- [ ] Tier entitlements enforced correctly
- [ ] No tenant ID leakage in logs or errors

### AI/ML Isolation

- [ ] **CRITICAL:** Vector store collections isolated per tenant
- [ ] **CRITICAL:** Model inference endpoints enforce tenant context
- [ ] **CRITICAL:** RAG retrieval respects tenant data boundaries
- [ ] Fine-tuned models access restricted to owning tenant
- [ ] Prompt templates isolated per tenant
- [ ] Agent memory (Mem0) scoped to tenant context
- [ ] Model embedding caches partitioned by tenant
- [ ] LLM API keys rotated per tenant (if dedicated)
- [ ] Token usage metering per tenant operational
- [ ] Model versioning per tenant supported

### Resource Isolation

- [ ] **CRITICAL:** Noisy-neighbor prevention active
- [ ] **CRITICAL:** Rate limits enforced per tenant tier
- [ ] **CRITICAL:** Cost attribution per tenant operational
- [ ] CPU/memory limits set per tenant workload
- [ ] Network bandwidth limits per tenant (if applicable)
- [ ] Storage quotas enforced per tenant tier
- [ ] Concurrent request limits per tenant
- [ ] Batch job scheduling respects tenant priority
- [ ] GPU time slicing configured for shared inference
- [ ] Queue priority enforcement per tenant tier

---

## AI/ML Production Readiness (QG-PRG)

### Action Contracts

- [ ] **CRITICAL:** All agent actions have valid 8-field contracts
- [ ] Confidence thresholds configured per tenant tier
- [ ] Proof certificates enabled for high-impact actions
- [ ] Contract schema passes validation

### Resource Budgets

- [ ] **CRITICAL:** AI confidence thresholds set appropriately
- [ ] **CRITICAL:** Load test passed at 2x expected traffic
- [ ] Performance baseline established
- [ ] Tenant isolation maintained under load
- [ ] No degradation of P99 latency beyond acceptable limits
- [ ] Human-in-the-loop workflows configured for low-confidence
- [ ] Model versioning and rollback capability verified
- [ ] AI bias/fairness testing completed

### Safety Verification

- [ ] **CRITICAL:** All AI agents have kill switches configured
- [ ] **CRITICAL:** Circuit breakers active on agent endpoints
- [ ] **CRITICAL:** Guardrails (NeMo/Guardrails AI) active
- [ ] **CRITICAL:** Kill switch response time < 100ms verified
- [ ] Tool permissions enforced via policy engine
- [ ] Memory scope enforcement verified
- [ ] Golden task evaluation passing (relevance >= 0.8, completion >= 0.9)
- [ ] Fallback behavior tested for all agent endpoints
- [ ] Agent timeout policies configured
- [ ] Tool execution sandboxing (E2B) verified
- [ ] Human-in-the-loop workflows operational
- [ ] Agent memory persistence verified
- [ ] Agent collaboration patterns tested
- [ ] Agent cost guardrails enforced per tenant

### Model Deployment

- [ ] **CRITICAL:** Production model versions frozen and versioned
- [ ] **CRITICAL:** Model rollback procedures tested
- [ ] **CRITICAL:** Inference latency SLOs validated
- [ ] Model artifacts stored in immutable registry
- [ ] Model serving infrastructure load tested
- [ ] A/B testing framework operational (if required)
- [ ] Canary deployment pipeline configured
- [ ] Model warmup procedures documented
- [ ] Cold start mitigation strategies implemented
- [ ] Model compression/quantization applied (if applicable)

### LLM Integration

- [ ] **CRITICAL:** LLM API failover configured (multi-provider)
- [ ] **CRITICAL:** Token rate limiting per tenant active
- [ ] **CRITICAL:** Prompt injection detection enabled
- [ ] LLM response caching operational
- [ ] Streaming response handling verified
- [ ] Context window management optimized
- [ ] Function calling reliability verified
- [ ] Embedding API redundancy configured
- [ ] LLM cost optimization (batching, caching) active
- [ ] Model fallback chain tested

---

## Observability

### Logging

- [ ] **CRITICAL:** Structured logging with tenant_id in all log entries
- [ ] **CRITICAL:** Log aggregation pipeline operational
- [ ] **CRITICAL:** Sensitive data (PII) redaction active
- [ ] Distributed tracing configured per tenant
- [ ] Cost attribution per tenant operational
- [ ] Noisy-neighbor alerting configured
- [ ] Audit event catalog complete
- [ ] Log retention policies meet compliance requirements
- [ ] Log correlation IDs propagated across services
- [ ] Error rate alerting configured
- [ ] Log sampling configured for high-volume services
- [ ] AI/ML specific logging (prompts, responses) operational
- [ ] Debug logging toggleable per tenant
- [ ] Log shipping to SIEM operational

### Metrics

- [ ] **CRITICAL:** Core SLIs defined and measured
- [ ] **CRITICAL:** Per-tenant metrics collection active
- [ ] **CRITICAL:** Alerting rules configured for SLO breaches
- [ ] Infrastructure metrics (CPU, memory, disk) collected
- [ ] Application metrics (latency, throughput, errors) collected
- [ ] AI/ML metrics (inference time, token usage, accuracy) collected
- [ ] Business metrics (usage, conversions) tracked
- [ ] Cost metrics per tenant collected
- [ ] Cardinality limits set to prevent metric explosion
- [ ] Grafana dashboards deployed for operations
- [ ] Metrics collection for SLI/SLO tracking configured
- [ ] Alerting rules configured with PagerDuty/OpsGenie integration

### Tracing

- [ ] **CRITICAL:** Distributed tracing enabled across all services
- [ ] **CRITICAL:** Trace sampling configured appropriately
- [ ] Trace context includes tenant_id
- [ ] AI agent execution traces captured
- [ ] External API call tracing operational
- [ ] Database query tracing enabled
- [ ] Span annotations include relevant metadata
- [ ] Trace-to-log correlation configured
- [ ] Performance anomaly detection active
- [ ] Trace retention policies defined

---

## Security Readiness

### Authentication and Authorization

- [ ] **CRITICAL:** OAuth 2.0/OIDC authentication operational
- [ ] **CRITICAL:** Multi-factor authentication (MFA) enforced for admin
- [ ] **CRITICAL:** API key rotation procedures documented
- [ ] **CRITICAL:** All security scans pass (SAST, DAST, dependency)
- [ ] JWT token validation with short expiry
- [ ] Service-to-service authentication (mTLS) active
- [ ] Role-based access control (RBAC) configured
- [ ] Tenant admin permissions scoped appropriately
- [ ] API key scoping per tenant verified
- [ ] Session management with secure cookie policies
- [ ] Brute force protection active
- [ ] No critical or high vulnerabilities unresolved
- [ ] Secrets management verified (no hardcoded credentials)

### Data Protection

- [ ] **CRITICAL:** Encryption at rest for all data stores
- [ ] **CRITICAL:** Encryption in transit (TLS 1.3) enforced
- [ ] **CRITICAL:** Secrets management (Vault/AWS Secrets Manager) operational
- [ ] Key rotation policies defined and automated
- [ ] PII handling procedures documented
- [ ] Data masking in non-production environments
- [ ] Backup encryption verified
- [ ] Data residency requirements met
- [ ] Right-to-erasure (GDPR) procedures tested
- [ ] Data classification policies enforced

### Vulnerability Management

- [ ] **CRITICAL:** Container image scanning in CI/CD pipeline
- [ ] **CRITICAL:** Dependency vulnerability scanning active
- [ ] **CRITICAL:** Runtime security monitoring operational
- [ ] Penetration testing completed
- [ ] Security audit findings remediated
- [ ] CVE patching SLA defined
- [ ] Container runtime security (Falco/Sysdig) deployed
- [ ] Network intrusion detection active
- [ ] Security incident response playbooks documented
- [ ] Bug bounty program considerations

---

## Operational Readiness

### Deployment Pipeline

- [ ] **CRITICAL:** CI/CD pipeline fully automated
- [ ] **CRITICAL:** Automated rollback tested and functional
- [ ] **CRITICAL:** Blue-green or canary deployment verified
- [ ] Infrastructure as Code (Terraform/Pulumi) in place
- [ ] GitOps workflow operational (ArgoCD/Flux)
- [ ] Feature flags operational for controlled rollouts
- [ ] Database migration procedures automated
- [ ] Database migration rollback verified
- [ ] Zero-downtime deployment verified
- [ ] Environment parity (dev/staging/prod) maintained
- [ ] Deployment approval workflow configured
- [ ] Rollback triggers defined (error rate, latency thresholds)

### Tenant Lifecycle

- [ ] **CRITICAL:** Tenant provisioning tested (all tiers)
- [ ] **CRITICAL:** Tenant offboarding tested (GDPR compliance)
- [ ] Kill switch procedures documented and tested
- [ ] Rollback procedures documented and tested

### Incident Response

- [ ] **CRITICAL:** On-call rotation established
- [ ] **CRITICAL:** Incident severity levels defined
- [ ] **CRITICAL:** Escalation paths documented
- [ ] PagerDuty/Opsgenie integration configured
- [ ] Incident response runbooks available
- [ ] Post-incident review process defined
- [ ] Kill switch procedures documented and tested
- [ ] Communication templates prepared
- [ ] Status page operational
- [ ] Incident tracking system configured

---

## Runbooks

- [ ] **CRITICAL:** Runbooks created for emergency procedures
- [ ] **CRITICAL:** Operational runbooks reviewed and approved
- [ ] Kill switch procedures documented and tested
- [ ] Rollback procedures documented and tested
- [ ] Troubleshooting guides available

---

## Documentation

- [ ] **CRITICAL:** API documentation complete and published
- [ ] API documentation complete with tenant context requirements
- [ ] Module contract documentation up to date
- [ ] Architecture decision records (ADRs) current
- [ ] Operational runbooks reviewed
- [ ] All architecture decisions verified with current 2026-04-27 best practices
- [ ] Tenant onboarding documentation complete
- [ ] SLA documentation published
- [ ] Integration guides for partners/developers
- [ ] Change management procedures documented
- [ ] Capacity planning documentation current
- [ ] Known issues and workarounds documented

---

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, >= 80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, < 80% of non-critical items pass - remediation plan required with 7-day deadline |
| **FAIL** | Any CRITICAL item fails - block until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Prerequisite Gates | CRITICAL | Any QG conditional | Any QG-I2/QG-I3 failed |
| Disaster Recovery | CRITICAL | DR partial | RTO/RPO not achievable |
| Compliance Verification | CRITICAL | Minor compliance gaps | Compliance violation |
| Infrastructure Readiness | CRITICAL | Capacity < 30% headroom | Infrastructure failure |
| Multi-Tenant Isolation | CRITICAL | RLS gaps documented | Cross-tenant access |
| AI/ML Production (PRG) | CRITICAL | Guardrails partial | Kill switch failure |
| Observability | CRITICAL | Metrics incomplete | No tenant attribution |
| Security Readiness | CRITICAL | Patch SLA exceeded | Critical CVE unpatched |
| Operational Readiness | CRITICAL | Runbooks incomplete | No DR procedure |
| Documentation | Non-critical | Docs outdated | N/A |

---

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If QG-P1 fails:**

### Attempt 1: Immediate Remediation (Target: 1-2 days)

- Identify failed CRITICAL categories from checklist
- Review prerequisite gate status (QG-F1 through QG-I3)
- Prioritize tenant safety and agent safety gaps
- Execute `convergence-verification` for integration issues
- Verify kill switches and circuit breakers are active
- Re-run QG-P1 validation after fixes
- **Lock passed categories** - do not re-test locked items
- **Safety outranks schedule** - no release if safety gates fail

### Attempt 2: Deep Investigation (Target: 2-3 days)

- Engage cross-functional team (Security, SRE, Platform, AI)
- Review all prerequisite gate evidence
- Validate end-to-end user journeys across modules
- Verify observability coverage (logs, metrics, traces)
- Test tenant provisioning and offboarding flows
- Execute DR drill if disaster-recovery checks failed
- Conduct load testing for performance issues
- Re-run QG-P1 validation after remediation
- **Preserve locked categories** from Attempt 1

### Mandatory Course Correction

- Escalate to Engineering Leadership and Product
- Document all blocking issues with impact assessment
- Conduct go/no-go review with all stakeholders
- Consider phased rollout or limited tenant release
- Create remediation plan with executive sign-off
- Define rollback triggers and monitoring thresholds
- Schedule production validation within 48 hours of fix

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Prerequisite Gates | Re-validate failed prerequisite | Any QG-I2/QG-I3 failure |
| Disaster Recovery | Test DR, verify RTO/RPO | RTO/RPO not achievable |
| Compliance | Update DPAs, fix retention | Compliance violation |
| Infrastructure | Scale resources, fix networking | Capacity < 30% headroom |
| Multi-Tenant Isolation | Fix RLS gaps, verify isolation | Cross-tenant access |
| AI/ML Production (PRG) | Verify guardrails, test kill switch | Kill switch > 100ms |
| Observability | Add missing tenant_id in logs | No cost attribution |
| Security | Fix auth, patch vulnerabilities | Critical CVE unpatched |
| Operational Readiness | Complete runbooks, test DR | Missing DR procedure |
| Documentation | Update API docs, ADRs | Outdated contracts |

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Platform Engineering Lead | | | |
| AI Runtime Architect | | | |
| Security Lead | | | |
| SRE Lead | | | |
| Release Manager | | | |

---

## Related Workflows

- `bmad-bam-production-readiness` - Pre-production validation workflow
- `bmad-bam-convergence-verification` - Integration validation
- `bmad-bam-tenant-aware-observability` - Observability setup
- `bmad-bam-disaster-recovery-design` - DR planning
- `bmad-bam-tenant-onboarding-design` - Tenant provisioning

---

## Related Templates

| Template | Purpose | Location |
|----------|---------|----------|
| `master-architecture-template.md` | Platform architecture documentation | `{output_folder}/planning-artifacts/` |
| `module-architecture-template.md` | Module-level architecture | `{output_folder}/planning-artifacts/` |
| `tenant-model-template.md` | Tenant isolation design | `{output_folder}/planning-artifacts/` |
| `agent-runtime-template.md` | AI agent runtime configuration | `{output_folder}/planning-artifacts/` |
| `facade-contract-template.md` | Cross-module contracts | `{output_folder}/planning-artifacts/` |
| `runbook-template.md` | Operational procedures | `{output_folder}/operations/` |
| `disaster-recovery-template.md` | DR procedures | `{output_folder}/operations/` |
| `deployment-manifest-template.md` | Deployment configuration | `{output_folder}/operations/` |

---

## Related Patterns

Load from pattern registry:

- **Production patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `production-*`
- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-P1`
- **Compliance:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS 2026-04-27" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns 2026-04-27" - Confirm validation approach
- [ ] Search the web: "multi-tenant AI platform production best practices 2026-04-27"
- [ ] Search the web: "Kubernetes production checklist AI workloads 2026-04-27"
- [ ] Search the web: "LLM deployment production requirements 2026-04-27"
- [ ] Search the web: "AI agent production safety guardrails 2026-04-27"
- [ ] _Source: [URL]_ citations documented for key decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, safe for production deployment
**OWNER:** Platform Engineering Lead + AI Runtime Architect
**REVIEWERS:** Platform Architect, Security Lead, SRE Lead, Compliance

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | Mega-merge from qg-p1-production-readiness, qg-prg-production, qg-prod-checklist (pre-deploy) |
| 1.0.0 | 2026-04-27 | Platform Architect | Initial V2 stub |
