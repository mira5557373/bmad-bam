# Security Guide - BAM Extension

**When to load:** During Phase 3-5 (Solutioning/Implementation/Quality) when conducting security audits, verifying compliance requirements, or implementing data residency controls. Load when user mentions security, compliance, GDPR, SOC2, data residency, or tenant isolation verification.
**Integrates with:** Architect (bmad-agent-architect), security assessment, threat modeling

---

This guide provides BAM-specific context for security engineers protecting multi-tenant agentic AI platforms.

## Role Context

As a security engineer on a BAM project, you focus on:
- Verifying tenant isolation at every architectural layer
- Ensuring compliance with GDPR, SOC 2, HIPAA, and other frameworks
- Implementing data residency controls for regulated tenants
- Building security monitoring with tenant-aware alerting
- Conducting security audits that validate cross-tenant protection

## Core Concepts

### Tenant Isolation Security

Multi-tenant security requires defense in depth across all layers:
- **Database**: RLS policies must be enabled AND forced on all tenant tables
- **Application**: Tenant context must be validated on every request entry point
- **Network**: Network policies must prevent cross-tenant communication
- **Infrastructure**: Secrets and credentials must be tenant-isolated

A single gap in any layer can result in cross-tenant data leakage.

### Security Layers Matrix

| Layer | Control | Verification Method |
|-------|---------|---------------------|
| Database | RLS policies | Cross-tenant query test |
| API | Auth middleware | Token scope validation |
| Network | NetworkPolicy | Port scan + traffic analysis |
| Secrets | Vault namespaces | Access audit logs |
| Files | Bucket policies | Cross-tenant access test |
| Events | Topic ACLs | Subscription attempt test |
| AI Memory | Tenant scoping | Memory leak test |

### Compliance in Multi-Tenancy

Compliance frameworks require tenant-specific evidence:
- Each tenant may have different compliance requirements
- Evidence collection must be automated and auditable
- Controls must be applied consistently across all tenants
- Exceptions require documented compensating controls

### Data Residency

Enterprise tenants often have strict data residency requirements:
- Data must be stored and processed in specified regions only
- Replicas and backups must respect regional boundaries
- Cross-region data movement must be technically prevented
- Audit trails must prove regional compliance

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| New tenant table | Enable RLS immediately | Prevent isolation gap |
| Admin access needed | Time-limited + audit logged | Minimize exposure window |
| Compliance requirement | Automate evidence collection | Continuous compliance |
| Data residency request | Regional infrastructure | Technical enforcement |
| Security incident | Tenant-scoped investigation | Contain blast radius |
| Third-party integration | Tenant-aware API keys | Limit scope of access |

---

## Application Guidelines

1. **Defense in depth** - Multiple isolation controls at each layer
2. **Least privilege** - Minimum access required for each role
3. **Audit everything** - Log all cross-tenant access
4. **Automate compliance** - Evidence collection and reporting
5. **Regular testing** - Penetration tests with tenant focus
6. **Incident isolation** - Contain issues to affected tenant
7. **Encryption everywhere** - At rest and in transit
8. **Key rotation** - Automated per-tenant key management

### Security Testing Checklist

Pre-release security verification:
- [ ] Cross-tenant data access tests pass
- [ ] RLS policies verified on all tenant tables
- [ ] Network policies block cross-tenant traffic
- [ ] Secrets are tenant-isolated in Vault
- [ ] Audit logs capture all admin access
- [ ] Penetration test completed with tenant scope
- [ ] Compliance evidence generated and reviewed

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` → Isolation design
- `bmad-bam-validate-foundation` → Security gate
- `bmad-bam-convergence-verification` → Pre-release security check
- `bmad-bam-ai-eval-safety-design` → AI security evaluation

---

## AI-Specific Security

### Prompt Injection Prevention

AI systems in multi-tenant environments require specialized security controls:

| Attack Vector | Mitigation | Verification |
|---------------|------------|--------------|
| Direct injection | Input sanitization + prompt hardening | Adversarial testing |
| Indirect injection | Content filtering on retrieved context | RAG security audit |
| Jailbreak attempts | System prompt protection | Red team exercises |
| Data exfiltration | Output filtering + tenant scoping | Response analysis |
| Model confusion | Context isolation per tenant | Memory leak tests |

### AI Guardrails Architecture

Every AI agent must implement defense layers:
- Input validation with tenant context verification
- System prompt immutability and monitoring
- Output filtering for sensitive data patterns
- Token limit enforcement per tenant tier
- Conversation history isolation and purging

### Model Access Controls

- Per-tenant model selection based on tier
- Rate limiting aligned with tenant quotas
- Cost ceiling enforcement per request
- Audit logging of all model invocations
- Model version pinning for compliance tenants

---

## Compliance Evidence Automation

### Continuous Compliance Framework

Automate evidence collection for audit readiness:

| Framework | Evidence Type | Collection Frequency |
|-----------|--------------|---------------------|
| SOC 2 | Access logs, change records | Real-time |
| GDPR | Data processing logs, consent | Per transaction |
| HIPAA | PHI access audit, encryption status | Real-time |
| ISO 27001 | Security controls, incident logs | Daily aggregation |
| PCI DSS | Cardholder data access, network scans | Continuous |

### Evidence Collection Pipeline

- Automated log aggregation with tenant attribution
- Policy-as-code validation with drift detection
- Compliance dashboard per tenant requirement
- Evidence export in auditor-ready format
- Retention aligned with framework requirements

### Tenant Compliance Profiles

Each tenant may have unique compliance needs:
- Compliance requirement registry per tenant
- Automated control mapping to tenant profile
- Gap analysis reporting on demand
- Remediation tracking with SLA monitoring
- Audit trail for compliance configuration changes

---

## Tenant Data Isolation Verification

### Isolation Testing Strategy

Proactive verification prevents cross-tenant data leakage:

| Test Type | Frequency | Scope |
|-----------|-----------|-------|
| RLS bypass attempts | Every deployment | All tenant tables |
| API boundary tests | Daily | All endpoints |
| Network policy validation | Weekly | All namespaces |
| Secret access audit | Daily | All tenant secrets |
| AI memory isolation | Per agent deployment | All memory stores |

### Automated Verification Pipeline

Pre-production isolation gates:
- Cross-tenant query injection tests
- Token scope boundary verification
- Network segmentation port scans
- File storage bucket policy tests
- Event bus subscription isolation tests

### Isolation Breach Response

When isolation gaps are detected:
- Immediate deployment rollback trigger
- Affected tenant notification per SLA
- Root cause analysis with timeline
- Remediation with regression test addition
- Post-incident compliance evidence update

---

## Incident Response for AI Systems

### AI Incident Categories

| Category | Example | Severity | Response Time |
|----------|---------|----------|---------------|
| Data leakage | Cross-tenant context exposure | Critical | <15 minutes |
| Prompt injection | System prompt compromise | High | <30 minutes |
| Model abuse | Excessive token consumption | Medium | <1 hour |
| Output violation | Harmful content generation | High | <30 minutes |
| Service degradation | Model latency spike | Medium | <1 hour |

### Incident Response Playbook

For AI-specific incidents:
1. Isolate affected tenant AI runtime immediately
2. Preserve conversation history for forensics
3. Disable compromised agent or model access
4. Assess blast radius across tenant boundary
5. Communicate per incident severity matrix

### AI Forensics Requirements

Post-incident investigation needs:
- Complete conversation history retrieval
- Prompt chain reconstruction
- Tool invocation audit trail
- Memory state snapshots
- Model input/output logging

### Recovery Procedures

- Agent state reset with tenant context verification
- Memory purge for affected conversations
- Model rollback to known-good version
- Enhanced monitoring for recurrence
- Tenant-specific security posture review

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`
- **Compliance:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant security architecture {date}"
- Search: "tenant data isolation security patterns {date}"
- Search: "SaaS SOC2 compliance implementation {date}"
