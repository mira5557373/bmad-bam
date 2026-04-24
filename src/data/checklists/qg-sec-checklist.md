# QG-SEC: Security Validation Checklist

---
name: security-checklist
description: Security validation checklist for AI/ML systems in multi-tenant environments
module: bam
tags: [security, ai-security, ml-security, multi-tenant, compliance]
---

> Gate ID: QG-SEC (Security Validation)
> Comprehensive security validation for AI/ML systems in multi-tenant platforms.
> Gate definition: verifies security controls across AI/ML pipeline, data protection, and tenant isolation.
> Safety outranks schedule - no release if security gates fail.
> Executing workflow: `bmad-bam-security-operations-verification` (final step)

## Purpose

This checklist ensures comprehensive security validation for AI/ML systems operating in multi-tenant environments. It covers AI-specific threats (prompt injection, model theft, adversarial attacks), traditional security concerns (authentication, authorization, data protection), and multi-tenant isolation requirements. All controls must be validated before production deployment.

---

## AI Model Security

### Model Access Control

- [ ] **CRITICAL:** Model API authentication required for all endpoints
- [ ] **CRITICAL:** Model access scoped to authorized tenants only
- [ ] **CRITICAL:** Model download/export blocked for unauthorized users
- [ ] Model versioning with immutable audit trail
- [ ] Fine-tuned models isolated to owning tenant
- [ ] Model weights stored in encrypted storage
- [ ] Model serving infrastructure isolated per tenant tier
- [ ] Rate limiting prevents model extraction attacks
- [ ] Embedding extraction rate limited and monitored
- [ ] Model fingerprinting detection active

### Model Supply Chain

- [ ] **CRITICAL:** Model provenance verified (signed artifacts)
- [ ] **CRITICAL:** Third-party model dependencies audited
- [ ] **CRITICAL:** Model update process includes security review
- [ ] Base model sources verified and trusted
- [ ] Fine-tuning data sources validated
- [ ] Model poisoning detection mechanisms in place
- [ ] Rollback capability for compromised models
- [ ] Model registry access controls enforced
- [ ] CI/CD pipeline includes model security scanning
- [ ] Model artifact checksums verified on deployment

### Model Inference Security

- [ ] **CRITICAL:** Inference endpoints require authentication
- [ ] **CRITICAL:** Input validation on all model requests
- [ ] **CRITICAL:** Output filtering for sensitive content
- [ ] Batch inference rate limited per tenant
- [ ] Streaming response security validated
- [ ] Model timeout policies configured
- [ ] Resource exhaustion protection active
- [ ] Concurrent request limits enforced
- [ ] Model cold start security considerations addressed
- [ ] GPU memory isolation verified

---

## Prompt and Input Security

### Prompt Injection Prevention

- [ ] **CRITICAL:** Direct prompt injection detection enabled
- [ ] **CRITICAL:** Indirect prompt injection (via RAG) mitigated
- [ ] **CRITICAL:** System prompt protection from extraction
- [ ] **CRITICAL:** Input sanitization active for all prompts
- [ ] Delimiter bypass detection active
- [ ] Nested instruction attack detection
- [ ] Multi-turn conversation manipulation detection
- [ ] Context window poisoning prevention
- [ ] Unicode/encoding trick detection enabled
- [ ] Homoglyph attack detection active

### Jailbreak Prevention

- [ ] **CRITICAL:** Jailbreak resistance verified with adversarial tests
- [ ] **CRITICAL:** Safety guardrails (NeMo Guardrails) active
- [ ] Known jailbreak pattern database updated
- [ ] Novel jailbreak attempt logging enabled
- [ ] Behavioral drift detection configured
- [ ] Refusal bypass detection active
- [ ] Role-playing exploitation blocked
- [ ] Hypothetical scenario abuse detected
- [ ] Multi-language jailbreak variants tested
- [ ] Red team testing completed

### Input Validation

- [ ] **CRITICAL:** Input length limits enforced per request type
- [ ] **CRITICAL:** Input format validation active
- [ ] **CRITICAL:** Malicious file upload detection (for multimodal)
- [ ] Input anomaly detection identifies statistical deviations
- [ ] Suspicious pattern recognition (base64, encoding tricks)
- [ ] Rate limiting per user/tenant on input volume
- [ ] Input source verification prevents forged context
- [ ] Content type validation for multimodal inputs
- [ ] File size limits enforced
- [ ] Metadata stripping from uploaded files

---

## Output Security

### Content Filtering

- [ ] **CRITICAL:** Harmful content filtering active
- [ ] **CRITICAL:** PII detection and prevention in outputs
- [ ] **CRITICAL:** Sensitive business data leakage prevention
- [ ] Copyright/licensed content detection
- [ ] Competitor information disclosure prevention
- [ ] Financial/legal advice disclaimers enforced
- [ ] Code output security scanning
- [ ] Bias detection in generated content
- [ ] Misinformation detection active
- [ ] NSFW content filtering enabled

### Output Validation

- [ ] **CRITICAL:** Output format validation per API contract
- [ ] **CRITICAL:** Output injection prevention (SQL, XSS, etc.)
- [ ] **CRITICAL:** Response size limits prevent resource exhaustion
- [ ] Hallucination confidence scoring implemented
- [ ] Citation requirements enforced for factual claims
- [ ] Structured output schema validation
- [ ] JSON/XML output sanitization
- [ ] HTML output sanitization active
- [ ] URL validation in responses
- [ ] Executable code sandboxing

### Data Leakage Prevention

- [ ] **CRITICAL:** Training data leakage detection active
- [ ] **CRITICAL:** Membership inference attack prevention
- [ ] **CRITICAL:** Model inversion attack mitigation
- [ ] Differential privacy mechanisms (if applicable)
- [ ] Federated learning security (if applicable)
- [ ] Prompt logging excludes sensitive data
- [ ] Response logging sanitization active
- [ ] Cross-tenant data leakage monitoring
- [ ] Sensitive pattern detection in outputs
- [ ] Canary token detection

---

## Agent Security

### Tool Execution Security

- [ ] **CRITICAL:** Tool permissions enforce least privilege
- [ ] **CRITICAL:** Tool sandbox (E2B or equivalent) active
- [ ] **CRITICAL:** Tool execution timeout enforced
- [ ] **CRITICAL:** Tool input validation active
- [ ] Tool output sanitization
- [ ] File system access restrictions
- [ ] Network access restrictions per tool
- [ ] Database access scoped to tenant
- [ ] API credential scoping per tool
- [ ] Resource limits per tool execution

### Agent Control Mechanisms

- [ ] **CRITICAL:** Kill switch operational for all agents
- [ ] **CRITICAL:** Kill switch response time <100ms
- [ ] **CRITICAL:** Human-in-the-loop for high-risk operations
- [ ] **CRITICAL:** Circuit breakers active on agent endpoints
- [ ] Approval-required tools trigger authorization
- [ ] Agent behavior auditing enabled
- [ ] Anomalous agent activity detection
- [ ] Agent collaboration limited to same-tenant
- [ ] Recovery from kill state requires authorization
- [ ] Agent state rollback capability

### Agent Memory Security

- [ ] **CRITICAL:** Agent memory scoped to tenant context
- [ ] **CRITICAL:** Memory persistence (Mem0) isolated per tenant
- [ ] **CRITICAL:** Memory access controls enforced
- [ ] Session memory encrypted at rest
- [ ] Long-term memory access audited
- [ ] Memory tampering detection
- [ ] Cross-conversation memory isolation
- [ ] Memory retention policies enforced
- [ ] Memory deletion capabilities for GDPR
- [ ] Memory export controls

---

## Multi-Tenant Security

### Tenant Isolation

- [ ] **CRITICAL:** Row-Level Security (RLS) on all tenant tables
- [ ] **CRITICAL:** Tenant context validated in every request
- [ ] **CRITICAL:** Cross-tenant access attempts logged and alerted
- [ ] Schema isolation verified (if applicable)
- [ ] Database isolation verified (if applicable)
- [ ] Cache isolation with tenant prefixes
- [ ] Queue isolation per tenant
- [ ] File storage isolation verified
- [ ] Tenant ID propagation in all service calls
- [ ] Background job tenant context verified

### Tenant Authentication

- [ ] **CRITICAL:** Tenant-scoped OAuth/OIDC tokens
- [ ] **CRITICAL:** JWT tenant_id claim validation
- [ ] **CRITICAL:** API key scoping per tenant
- [ ] Tenant admin MFA enforced
- [ ] Tenant user session management
- [ ] Tenant-specific identity provider support
- [ ] SSO integration security verified
- [ ] Token refresh security per tenant
- [ ] Concurrent session limits per tenant
- [ ] Cross-tenant token reuse prevention

### Tenant Authorization

- [ ] **CRITICAL:** RBAC per tenant enforced
- [ ] **CRITICAL:** Tenant tier entitlements verified
- [ ] **CRITICAL:** Resource quotas enforced per tenant
- [ ] Permission inheritance verified
- [ ] Admin privilege escalation prevention
- [ ] Tenant-specific policy engine
- [ ] Feature flag security per tenant
- [ ] API rate limits per tenant tier
- [ ] Bulk operation limits per tenant
- [ ] Export/import permissions controlled

---

## Data Security

### Data Protection at Rest

- [ ] **CRITICAL:** Database encryption at rest (AES-256)
- [ ] **CRITICAL:** Vector store encryption verified
- [ ] **CRITICAL:** Object storage encryption enabled
- [ ] Backup encryption verified
- [ ] Key management (KMS) operational
- [ ] Key rotation automated
- [ ] Encryption key per tenant (if required)
- [ ] Model weights encryption
- [ ] Log storage encryption
- [ ] Temporary file encryption

### Data Protection in Transit

- [ ] **CRITICAL:** TLS 1.3 enforced on all connections
- [ ] **CRITICAL:** Certificate management automated
- [ ] **CRITICAL:** mTLS for service-to-service communication
- [ ] Certificate pinning (mobile apps)
- [ ] HSTS headers configured
- [ ] Secure WebSocket connections
- [ ] gRPC TLS configuration verified
- [ ] API gateway TLS termination secure
- [ ] Internal traffic encryption
- [ ] DNS over HTTPS/TLS (if applicable)

### Secrets Management

- [ ] **CRITICAL:** Secrets manager (Vault/AWS Secrets) operational
- [ ] **CRITICAL:** No secrets in code repositories
- [ ] **CRITICAL:** Secret rotation policies defined
- [ ] Dynamic secrets generation
- [ ] Secret access auditing enabled
- [ ] Service account key rotation
- [ ] API key lifecycle management
- [ ] Database credential rotation
- [ ] Third-party API key security
- [ ] Secret sprawl prevention

---

## Infrastructure Security

### Container Security

- [ ] **CRITICAL:** Container image scanning in CI/CD
- [ ] **CRITICAL:** Base images from trusted sources
- [ ] **CRITICAL:** Container runtime security (Falco/Sysdig)
- [ ] Read-only root filesystem
- [ ] Non-root user execution
- [ ] Resource limits configured
- [ ] Network policies per namespace
- [ ] Pod security policies/standards enforced
- [ ] Container registry access controls
- [ ] Image signing and verification

### Network Security

- [ ] **CRITICAL:** WAF rules on all public endpoints
- [ ] **CRITICAL:** DDoS protection enabled
- [ ] **CRITICAL:** Private networking for internal services
- [ ] Network segmentation enforced
- [ ] Egress filtering active
- [ ] Service mesh security (Istio/Linkerd)
- [ ] Intrusion detection system active
- [ ] VPN for administrative access
- [ ] Bastion host security
- [ ] Cloud security groups verified

### Cloud Security

- [ ] **CRITICAL:** IAM least privilege enforced
- [ ] **CRITICAL:** Cloud audit logging enabled (CloudTrail/Stackdriver)
- [ ] **CRITICAL:** Resource tagging for security compliance
- [ ] Cloud security posture management (CSPM)
- [ ] Cloud workload protection (CWPP)
- [ ] Cross-account access controls
- [ ] Public access prevention
- [ ] Cloud storage bucket policies
- [ ] Serverless security considerations
- [ ] Managed service security configurations

---

## Compliance and Audit

### Audit Logging

- [ ] **CRITICAL:** All security events logged
- [ ] **CRITICAL:** Audit log tamper protection
- [ ] **CRITICAL:** Audit log retention meets requirements
- [ ] User authentication events logged
- [ ] Authorization decisions logged
- [ ] Data access events logged
- [ ] AI/ML specific events logged (prompts, responses)
- [ ] Administrative actions logged
- [ ] API access patterns logged
- [ ] Anomaly detection on audit logs

### Compliance Requirements

- [ ] **CRITICAL:** Data processing agreements in place
- [ ] **CRITICAL:** Privacy policy covers AI processing
- [ ] **CRITICAL:** Consent mechanisms for AI features
- [ ] GDPR compliance verified (if applicable)
- [ ] CCPA compliance verified (if applicable)
- [ ] HIPAA compliance verified (if applicable)
- [ ] SOC 2 controls mapped
- [ ] ISO 27001 controls mapped
- [ ] AI ethics requirements met
- [ ] Bias testing completed

### Incident Response

- [ ] **CRITICAL:** Security incident playbooks documented
- [ ] **CRITICAL:** AI-specific incident procedures defined
- [ ] **CRITICAL:** Model quarantine procedure tested
- [ ] Escalation paths defined
- [ ] Communication templates prepared
- [ ] Forensics capability for AI incidents
- [ ] Evidence preservation procedures
- [ ] Regulatory notification procedures
- [ ] Post-incident review process
- [ ] Lessons learned integration

---

## Web Research Verification

- [ ] Search the web: "AI/ML security best practices enterprise {date}"
- [ ] Search the web: "prompt injection prevention techniques {date}"
- [ ] Search the web: "multi-tenant security patterns {date}"
- [ ] Search the web: "LLM security vulnerabilities {date}"
- [ ] Search the web: "AI agent safety guardrails {date}"
- [ ] Search the web: "model theft prevention techniques {date}"
- [ ] _Source: [URL]_ citations documented for key decisions

---

## Verification Checklist

- [ ] All CRITICAL items pass (100% required)
- [ ] Non-critical items achieve 85% pass rate
- [ ] Web research verification completed
- [ ] Security team sign-off obtained
- [ ] Penetration testing completed
- [ ] Red team assessment for AI components completed

---

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, >=85% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <85% of non-critical items pass - remediation plan required with 14-day deadline |
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
| AI Model Security | CRITICAL | Access control partial | Model extraction risk |
| Prompt and Input Security | CRITICAL | Injection detection partial | Prompt injection succeeds |
| Output Security | CRITICAL | Filtering incomplete | PII leakage detected |
| Agent Security | CRITICAL | Kill switch >100ms | Tool sandbox escape |
| Multi-Tenant Security | CRITICAL | RLS gaps documented | Cross-tenant access |
| Data Security | CRITICAL | Encryption partial | Data breach risk |
| Infrastructure Security | CRITICAL | Patch SLA exceeded | Critical CVE exploited |
| Compliance and Audit | CRITICAL | Audit logging gaps | Compliance violation |

**PASS CRITERIA:** All CRITICAL checkboxes completed, non-critical at 85%
**OWNER:** Security Architecture + AI Runtime Architect
**REVIEWERS:** CISO, AI Ethics Board, Compliance, Platform Engineering

---

## Recovery Protocol

**If QG-SEC fails:**

1. **Attempt 1:** Immediate remediation (target: 1-3 days)
   - Identify failed CRITICAL categories
   - Prioritize by attack surface and exploit likelihood
   - Engage Security team for immediate fixes
   - Execute targeted security testing after fixes
   - Re-run QG-SEC validation
   - **Lock passed categories** - do not re-test locked items

2. **Attempt 2:** Deep security investigation (target: 3-5 days)
   - Engage external security consultants (if needed)
   - Conduct focused penetration testing on failed areas
   - Review architecture for systemic security gaps
   - Implement defense-in-depth measures
   - Red team AI-specific attack vectors
   - Re-run validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to CISO and Engineering Leadership
   - Document security blockers with risk assessment
   - Conduct security architecture review
   - Consider feature removal if security cannot be assured
   - Create remediation plan with executive sign-off
   - Schedule security audit within 30 days
   - Consider bug bounty program activation

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| AI Model Security | Lock down model access, audit logs | Model extraction detected |
| Prompt Security | Enable strict filtering, block suspicious | Successful prompt injection |
| Output Security | Enable content filtering, audit outputs | PII leakage detected |
| Agent Security | Disable agent, verify kill switch | Tool sandbox escape |
| Multi-Tenant | Fix RLS, verify isolation | Cross-tenant access |
| Data Security | Rotate credentials, audit access | Data breach detected |
| Infrastructure | Patch vulnerabilities, isolate | Critical CVE exploited |
| Compliance | Assess impact, notify legal | Compliance violation |

---

## Related Workflows

- `bmad-bam-security-audit-execution` - Comprehensive security audit
- `bmad-bam-ai-agent-debug` - Agent safety debugging
- `validate-tool-contract` - Tool permission validation
- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `bmad-bam-convergence-verification` - Integration security

---

## Required Templates

| Template | Purpose | Location |
|----------|---------|----------|
| `security-architecture-template.md` | Security architecture | `{output_folder}/planning-artifacts/` |
| `threat-model-template.md` | Threat modeling | `{output_folder}/planning-artifacts/` |
| `guardrail-config-template.md` | AI guardrail configuration | `{output_folder}/planning-artifacts/` |
| `kill-switch-template.md` | Kill switch procedures | `{output_folder}/operations/` |
| `incident-response-template.md` | Security incident procedures | `{output_folder}/operations/` |
| `penetration-test-report-template.md` | Pen test documentation | `{output_folder}/security/` |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {date} | Security Architect | Initial security checklist |
