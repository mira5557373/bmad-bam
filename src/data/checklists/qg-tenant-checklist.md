# QG-AI2: Tenant Safety Verification Checklist

## Document Information

| Field | Value |
|-------|-------|
| **Checklist ID** | CHK-TSFV-001 |
| **Version** | 1.0.0 |
| **Quality Gate** | QG-AI2 |
| **Domain** | Security / Tenant Isolation |

## Purpose

Verify tenant safety controls and isolation mechanisms for multi-tenant AI platforms ensuring complete data separation, resource isolation, and cross-tenant security.

---

## 1. Data Isolation

### 1.1 Database Isolation

- [ ] Row-Level Security (RLS) policies implemented
- [ ] RLS policies tested with cross-tenant queries
- [ ] Schema isolation configured (if applicable)
- [ ] Connection pooling is tenant-aware
- [ ] Query injection attempts blocked
- [ ] Database backup isolation verified

### 1.2 Object Storage Isolation

- [ ] Bucket/prefix isolation implemented
- [ ] IAM policies enforce tenant boundaries
- [ ] Path traversal attacks blocked
- [ ] Signed URL generation is tenant-scoped
- [ ] Cross-tenant file access prevented

### 1.3 Cache Isolation

- [ ] Session cache uses tenant namespace
- [ ] Data cache uses tenant prefix
- [ ] Rate limit cache is tenant-scoped
- [ ] CDN cache varies by tenant context
- [ ] Cache key guessing attacks mitigated

### 1.4 Search/Index Isolation

- [ ] Full-text search is tenant-filtered
- [ ] Vector store uses tenant namespaces
- [ ] Analytics data is partitioned by tenant
- [ ] Cross-tenant search returns no results

---

## 2. Resource Boundaries

### 2.1 API Rate Limiting

- [ ] Rate limits defined per tenant tier
- [ ] Rate limits enforced per tenant
- [ ] Concurrent request limits configured
- [ ] Burst handling is tenant-aware
- [ ] Rate limit exhaustion doesn't affect other tenants

### 2.2 AI Token/Budget Limits

- [ ] Token limits per request configured
- [ ] Daily/monthly token quotas enforced
- [ ] Budget limits per tenant implemented
- [ ] Overage handling defined
- [ ] Cost attribution is accurate

### 2.3 Compute Resource Limits

- [ ] CPU limits per tenant configured
- [ ] Memory limits per tenant configured
- [ ] Storage quotas enforced
- [ ] Network bandwidth limits applied

### 2.4 Noisy Neighbor Prevention

- [ ] CPU-intensive tenant doesn't affect others
- [ ] Memory-intensive tenant doesn't affect others
- [ ] I/O-intensive tenant doesn't affect others
- [ ] Network-intensive tenant doesn't affect others
- [ ] Fair scheduling implemented

---

## 3. AI Context Separation

### 3.1 Conversation Context

- [ ] Chat history is tenant-scoped
- [ ] System prompts are per-tenant
- [ ] User preferences isolated
- [ ] Session state not shared

### 3.2 Agent Memory

- [ ] Short-term memory is session-scoped
- [ ] Long-term memory is tenant-scoped
- [ ] Tool memory cleared after execution
- [ ] Planning state doesn't leak

### 3.3 Vector Store

- [ ] Document embeddings use tenant namespace
- [ ] Conversation embeddings isolated
- [ ] RAG retrieval returns only tenant data
- [ ] Cross-tenant semantic search blocked

### 3.4 Model Context

- [ ] Context window contains only tenant data
- [ ] Fine-tuning data is isolated
- [ ] Prompt cache is tenant-keyed
- [ ] Response cache is tenant-scoped

---

## 4. Cross-Tenant Attack Prevention

### 4.1 Direct Access Attacks

- [ ] Tenant ID enumeration blocked
- [ ] IDOR attacks prevented
- [ ] Path traversal attacks blocked
- [ ] Parameter tampering detected

### 4.2 Authentication/Session Attacks

- [ ] Session hijacking prevented
- [ ] JWT tenant claim validated
- [ ] Cookie tampering detected
- [ ] OAuth confusion attacks blocked

### 4.3 AI-Specific Attacks

- [ ] Prompt injection in shared context blocked
- [ ] Memory extraction attacks prevented
- [ ] RAG poisoning blocked
- [ ] Model confusion attacks mitigated

### 4.4 Infrastructure Attacks

- [ ] Container escape prevented
- [ ] Network traffic encrypted
- [ ] DNS rebinding blocked
- [ ] SSRF attacks prevented

### 4.5 Side-Channel Attacks

- [ ] Timing analysis mitigated
- [ ] Resource exhaustion isolated
- [ ] Error messages sanitized
- [ ] Cache timing attacks mitigated

---

## 5. Tenant Context Propagation

### 5.1 Request Context

- [ ] Tenant ID extracted from authentication
- [ ] Tenant context validated on every request
- [ ] Context propagation across services
- [ ] Async operations maintain context

### 5.2 Background Jobs

- [ ] Tenant context in job payload
- [ ] Job execution respects tenant limits
- [ ] Job results scoped to tenant
- [ ] Failed jobs don't leak context

### 5.3 Event Processing

- [ ] Events tagged with tenant ID
- [ ] Event handlers validate tenant
- [ ] Cross-tenant event routing blocked
- [ ] Event replay is tenant-scoped

---

## 6. Audit and Monitoring

### 6.1 Tenant Activity Logging

- [ ] All tenant actions logged
- [ ] Tenant ID in all log entries
- [ ] Cross-tenant access attempts logged
- [ ] Anomaly detection per tenant

### 6.2 Isolation Monitoring

- [ ] Isolation breach alerts configured
- [ ] Cross-tenant query detection
- [ ] Resource limit breach alerts
- [ ] Suspicious pattern detection

---

## 7. Gate Decision Criteria

### 7.1 QG-AI2 Requirements

| Criteria | Requirement | Status |
|----------|-------------|--------|
| Data Isolation | Zero cross-tenant access | [ ] |
| Resource Limits | Per-tenant enforced | [ ] |
| AI Context | Complete separation | [ ] |
| Cross-Tenant Attacks | All blocked | [ ] |

### 7.2 Gate Decision

| Outcome | Criteria |
|---------|----------|
| **PASS** | All criteria met, no cross-tenant access possible |
| **CONDITIONAL** | Minor gaps with immediate remediation plan |
| **FAIL** | Any cross-tenant access possible |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Database Isolation (RLS) | CRITICAL | RLS partial coverage | RLS not implemented |
| Object Storage Isolation | CRITICAL | Policy gaps | No isolation |
| Cache Isolation | CRITICAL | Namespace gaps | Shared cache |
| AI Context Separation | CRITICAL | Partial separation | Context leakage |
| Cross-Tenant Attack Prevention | CRITICAL | Minor vectors | IDOR possible |
| Resource Boundaries | Non-critical | Soft limits only | No limits |
| Audit Monitoring | Non-critical | Partial coverage | No logging |

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

1. **Attempt 1:** Isolation remediation (target: 1 week)
   - Identify isolation gaps
   - Implement RLS policies where missing
   - Add tenant namespace to caches
   - Fix context propagation issues
   - Re-run cross-tenant tests
   - **Lock passed categories**

2. **Attempt 2:** Deep isolation sprint (target: 2 weeks)
   - Engage security and platform teams
   - Conduct penetration testing
   - Implement comprehensive isolation
   - Add monitoring and alerting
   - Re-evaluate gate status
   - **Preserve locked categories**

3. **Mandatory Course Correction:**
   - Escalate to CISO and engineering leadership
   - Document cross-tenant access vectors
   - Consider service suspension for affected tenants
   - Define emergency remediation timeline

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## 8. Test Execution Log

| Test Category | Tests Run | Passed | Failed | Status |
|---------------|-----------|--------|--------|--------|
| Data Isolation | | | | |
| Resource Boundaries | | | | |
| AI Context | | | | |
| Cross-Tenant Attacks | | | | |
| **Total** | | | | |

---

## 9. Remediation Tracking

| Finding | Category | Severity | Status | Owner | Due Date |
|---------|----------|----------|--------|-------|----------|
| | | | | | |

---

## Web Research Verification

- [ ] Search the web: "multi-tenant isolation best practices {date}" - Verify isolation patterns
- [ ] Search the web: "RLS policy testing PostgreSQL {date}" - Confirm RLS test coverage
- [ ] Search the web: "cross-tenant attack prevention SaaS {date}" - Validate security controls
- [ ] Search the web: "noisy neighbor prevention cloud {date}" - Verify resource isolation
- [ ] _Source: [URL]_ citations documented for key isolation decisions

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `bmad-bam-tenant-onboarding-design` - Tenant provisioning
- `bmad-bam-tenant-offboarding-design` - Tenant data removal
- `bmad-bam-convergence-verification` - Integration validation
- `tea-trace` - Formal tenant verification

## Related Artifacts

- `rls-policy-template.md` - RLS policy documentation
- `cache-isolation-template.md` - Cache isolation design
- `memory-isolation-template.md` - AI memory isolation
- `tenant-context-template.md` - Context propagation
- `qg-i2-tenant-safety.md` - Quality gate checklist

**PASS CRITERIA:** All CRITICAL checkboxes completed, zero cross-tenant access possible
**OWNER:** BAM
**REVIEWERS:** Security Lead, Platform Architect
