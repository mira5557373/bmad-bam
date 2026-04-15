# Production Deployment Checklist

---
name: production-checklist
description: Production readiness checklist for multi-tenant AI platform deployments
module: bam
tags: [production, deployment, multi-tenant, ai-platform, operations]
---

> Gate ID: QG-PROD (Production Deployment)
> Validates all production deployment requirements for multi-tenant AI platforms.
> Gate definition: comprehensive pre-deployment verification across infrastructure, security, and operations.
> Executing workflow: `bmad-bam-production-readiness` (final step)

## Purpose

This checklist ensures that multi-tenant AI platform deployments meet all production requirements before going live. It covers infrastructure readiness, tenant isolation verification, AI/ML system operational readiness, and compliance requirements specific to multi-tenant agentic AI platforms.

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

## Multi-Tenant Isolation

### Data Isolation

- [ ] **CRITICAL:** Row-Level Security (RLS) policies active on all tenant tables
- [ ] **CRITICAL:** Cross-tenant query isolation verified
- [ ] **CRITICAL:** Tenant context propagation verified in all service calls
- [ ] Schema isolation configured (if schema-per-tenant model)
- [ ] Database isolation configured (if database-per-tenant model)
- [ ] Cache key prefixes include tenant_id
- [ ] Session storage isolated per tenant
- [ ] File storage paths include tenant segmentation
- [ ] Audit logs include tenant_id in all entries
- [ ] Background job queues respect tenant boundaries

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

## AI/ML System Readiness

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

### Agent Runtime

- [ ] **CRITICAL:** Kill switches operational for all AI agents
- [ ] **CRITICAL:** Circuit breakers configured on agent endpoints
- [ ] **CRITICAL:** Guardrails (NeMo/Guardrails AI) active
- [ ] Agent timeout policies configured
- [ ] Tool execution sandboxing (E2B) verified
- [ ] Human-in-the-loop workflows operational
- [ ] Agent memory persistence verified
- [ ] Agent collaboration patterns tested
- [ ] Fallback behavior validated for all agent types
- [ ] Agent cost guardrails enforced per tenant

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

## Observability and Monitoring

### Logging

- [ ] **CRITICAL:** Structured logging with tenant_id in all entries
- [ ] **CRITICAL:** Log aggregation pipeline operational
- [ ] **CRITICAL:** Sensitive data (PII) redaction active
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
- [ ] JWT token validation with short expiry
- [ ] Service-to-service authentication (mTLS) active
- [ ] Role-based access control (RBAC) configured
- [ ] Tenant admin permissions scoped appropriately
- [ ] API key scoping per tenant verified
- [ ] Session management with secure cookie policies
- [ ] Brute force protection active

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
- [ ] **CRITICAL:** Rollback procedures tested
- [ ] **CRITICAL:** Blue-green or canary deployment verified
- [ ] Infrastructure as Code (Terraform/Pulumi) in place
- [ ] GitOps workflow operational (ArgoCD/Flux)
- [ ] Feature flags operational for controlled rollouts
- [ ] Database migration procedures automated
- [ ] Zero-downtime deployment verified
- [ ] Environment parity (dev/staging/prod) maintained
- [ ] Deployment approval workflow configured

### Disaster Recovery

- [ ] **CRITICAL:** DR plan documented and approved
- [ ] **CRITICAL:** RTO/RPO requirements defined and achievable
- [ ] **CRITICAL:** DR drill completed within last quarter
- [ ] Cross-region failover tested
- [ ] Data backup verification automated
- [ ] Runbook for DR activation documented
- [ ] Communication plan for outages defined
- [ ] Service degradation procedures documented
- [ ] Database failover tested
- [ ] DNS failover automation verified

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

## Compliance and Documentation

### Compliance

- [ ] **CRITICAL:** Data processing agreements (DPA) in place
- [ ] **CRITICAL:** Privacy policy updated for AI processing
- [ ] SOC 2 Type II controls verified (if applicable)
- [ ] GDPR compliance verified (if applicable)
- [ ] HIPAA compliance verified (if applicable)
- [ ] AI ethics review completed
- [ ] Model explainability requirements met
- [ ] Audit trail retention configured
- [ ] Third-party AI service agreements reviewed
- [ ] Data retention policies enforced

### Documentation

- [ ] **CRITICAL:** API documentation complete and published
- [ ] **CRITICAL:** Operational runbooks reviewed and approved
- [ ] Architecture decision records (ADRs) current
- [ ] Tenant onboarding documentation complete
- [ ] SLA documentation published
- [ ] Troubleshooting guides available
- [ ] Integration guides for partners/developers
- [ ] Change management procedures documented
- [ ] Capacity planning documentation current
- [ ] Known issues and workarounds documented

---

## Web Research Verification

- [ ] Search the web: "multi-tenant AI platform production best practices {date}"
- [ ] Search the web: "Kubernetes production checklist AI workloads {date}"
- [ ] Search the web: "LLM deployment production requirements {date}"
- [ ] Search the web: "AI agent production safety guardrails {date}"
- [ ] _Source: [URL]_ citations documented for key decisions

---

## Verification Checklist

- [ ] All CRITICAL items pass (100% required)
- [ ] Non-critical items achieve 80% pass rate
- [ ] Web research verification completed
- [ ] All prerequisite gates passed
- [ ] Production deployment approved by stakeholders

---

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required with 7-day deadline |
| **FAIL** | Any CRITICAL item fails - block until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Infrastructure Readiness | CRITICAL | Capacity <30% headroom | Infrastructure failure |
| Multi-Tenant Isolation | CRITICAL | RLS gaps documented | Cross-tenant access |
| AI/ML System Readiness | CRITICAL | Guardrails partial | Kill switch failure |
| Observability | CRITICAL | Metrics incomplete | No tenant attribution |
| Security Readiness | CRITICAL | Patch SLA exceeded | Critical CVE unpatched |
| Operational Readiness | CRITICAL | Runbooks incomplete | RTO/RPO not achievable |
| Compliance | CRITICAL | Minor compliance gaps | Compliance violation |
| Documentation | Non-critical | Docs outdated | N/A |

**PASS CRITERIA:** All CRITICAL checkboxes completed, non-critical at 80%
**OWNER:** Platform Engineering Lead + AI Runtime Architect
**REVIEWERS:** Security, SRE, Compliance, Product

---

## Recovery Protocol

**If QG-PROD fails:**

1. **Attempt 1:** Immediate remediation (target: 1-2 days)
   - Identify failed CRITICAL categories
   - Prioritize security and isolation gaps
   - Execute targeted fixes for blocking items
   - Re-run QG-PROD validation after fixes
   - **Lock passed categories** - do not re-test locked items

2. **Attempt 2:** Deep investigation (target: 2-3 days)
   - Engage cross-functional team (Platform, Security, SRE, AI)
   - Review prerequisite gate evidence
   - Conduct load testing for performance issues
   - Validate disaster recovery procedures
   - Re-run validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Engineering Leadership
   - Document all blocking issues with business impact
   - Conduct go/no-go review with stakeholders
   - Consider phased rollout or limited tenant release
   - Create remediation plan with executive sign-off
   - Define rollback triggers and monitoring thresholds

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Infrastructure | Scale resources, fix networking | Capacity <30% headroom |
| Multi-Tenant Isolation | Fix RLS, verify boundaries | Cross-tenant data access |
| AI/ML System | Verify models, test guardrails | Kill switch failure |
| Observability | Add missing metrics, fix logging | No tenant attribution |
| Security | Fix auth, patch vulnerabilities | Critical CVE unpatched |
| Operational | Complete runbooks, test DR | RTO/RPO not achievable |
| Compliance | Update DPAs, fix retention | Compliance violation |

---

## Related Workflows

- `bmad-bam-production-readiness` - Pre-production validation
- `bmad-bam-tenant-onboarding-design` - Tenant provisioning
- `bmad-bam-disaster-recovery-design` - DR planning
- `bmad-bam-tenant-aware-observability` - Observability setup
- `bmad-bam-convergence-verification` - Integration validation

---

## Required Templates

| Template | Purpose | Location |
|----------|---------|----------|
| `master-architecture-template.md` | Platform architecture | `{output_folder}/planning-artifacts/` |
| `tenant-model-template.md` | Tenant isolation design | `{output_folder}/planning-artifacts/` |
| `agent-runtime-template.md` | AI agent configuration | `{output_folder}/planning-artifacts/` |
| `runbook-template.md` | Operational procedures | `{output_folder}/operations/` |
| `disaster-recovery-template.md` | DR procedures | `{output_folder}/operations/` |
| `deployment-manifest-template.md` | Deployment configuration | `{output_folder}/operations/` |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {date} | Platform Architect | Initial production checklist |
