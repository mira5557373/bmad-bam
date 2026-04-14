# BAM AI Model Security Guide

**When to load:** During Phase 3 (Solutioning) when designing AI security controls,
or when user mentions model security, adversarial attacks, model theft, AI vulnerabilities, inference attacks.

**Integrates with:** Nova (AI Runtime Architect), Security agent, Architect (Atlas persona)

---

## Core Concepts

### AI Model Security Threats

AI models in multi-tenant environments face unique security threats:

| Threat Category | Description | Multi-Tenant Impact |
|-----------------|-------------|---------------------|
| Model extraction | Recreating model via queries | Cross-tenant model theft |
| Data poisoning | Corrupting training data | Shared training pipeline risk |
| Adversarial inputs | Crafted inputs to cause misclassification | Per-tenant attack surface |
| Inference attacks | Extracting training data from outputs | PII leakage across tenants |
| Model inversion | Reconstructing inputs from outputs | Cross-tenant data exposure |
| Supply chain | Compromised pre-trained models | Platform-wide vulnerability |

### Multi-Tenant AI Security Layers

| Layer | Security Control | Tenant Isolation |
|-------|------------------|------------------|
| Input | Validation, sanitization | Per-tenant input filters |
| Model access | Authentication, authorization | Tenant-scoped model access |
| Inference | Rate limiting, monitoring | Per-tenant quotas |
| Output | Filtering, redaction | Tenant-specific output rules |
| Training | Data isolation, access control | Per-tenant training data |
| Storage | Encryption, access logging | Tenant-specific keys |

### Security vs. Functionality Trade-offs

| Control | Security Benefit | Functionality Impact |
|---------|------------------|---------------------|
| Query rate limiting | Prevents extraction | May impact legitimate use |
| Output perturbation | Hides exact values | Reduces precision |
| Input sanitization | Blocks attacks | May reject valid inputs |
| Model watermarking | Detects theft | Minimal overhead |
| Differential privacy | Protects training data | Reduces model accuracy |

## Application Guidelines

When implementing AI model security in multi-tenant systems:

1. **Assume adversarial tenants**: Design security as if any tenant could be malicious
2. **Isolate training data strictly**: No cross-tenant data leakage in training
3. **Monitor inference patterns**: Detect extraction and abuse attempts
4. **Version and audit models**: Track all model changes and access
5. **Defense in depth**: Multiple security layers from input to output

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Shared base model | Immutable base with tenant-specific fine-tuning | Isolate tenant customizations |
| High-value model | Query rate limits + anomaly detection | Prevent extraction attacks |
| Sensitive outputs | Output filtering + differential privacy | Protect training data |
| Training on tenant data | Strict data isolation + access logging | Prevent cross-tenant leakage |
| Third-party model integration | Supply chain verification + sandboxing | Contain compromise risk |
| Multi-tenant fine-tuning | Per-tenant model instances | Maximum isolation |

## Implementation Patterns

### Pattern 1: Model Access Control

| Access Level | Allowed Operations | Audit Requirements |
|--------------|-------------------|-------------------|
| Inference | Query model | Log all queries |
| Fine-tune | Train on tenant data | Log training runs |
| Export | Download model weights | Approval + logging |
| Deploy | Promote to production | Change management |
| Admin | Full access | Enhanced logging |

### Pattern 2: Inference Security Pipeline

| Stage | Security Control | Action on Violation |
|-------|------------------|---------------------|
| Input validation | Schema + content check | Reject request |
| Rate limiting | Per-tenant quotas | Throttle + alert |
| Anomaly detection | Query pattern analysis | Flag for review |
| Inference | Sandboxed execution | Timeout + resource limits |
| Output filtering | PII detection, content scan | Redact or block |
| Audit logging | Full request/response log | Immutable storage |

### Pattern 3: Training Data Security

| Control | Implementation | Verification |
|---------|----------------|--------------|
| Data isolation | Per-tenant training datasets | Access audit |
| Access control | RBAC on training data | Permission check |
| Encryption | At-rest and in-transit | Key management audit |
| Versioning | Immutable data snapshots | Version history |
| Deletion | Cryptographic erasure | Deletion verification |

## Multi-Tenant AI Security Patterns

### Tenant-Isolated Model Deployment

| Deployment Model | Isolation Level | Security Trade-off |
|------------------|-----------------|-------------------|
| Shared model | Low | Higher extraction risk |
| Tenant adapters | Medium | Adapter isolation required |
| Per-tenant fine-tuned | High | Per-model security overhead |
| Per-tenant deployed | Maximum | Highest cost |

### Cross-Tenant Attack Prevention

| Attack Vector | Prevention | Detection |
|---------------|------------|-----------|
| Model query poisoning | Input validation | Anomaly detection |
| Training data inference | Differential privacy | Access pattern analysis |
| Prompt injection | System prompt protection | Output monitoring |
| Context leakage | Memory isolation | Memory auditing |
| Model weights theft | Access control + monitoring | Export logging |

### Security Monitoring for AI

| Metric | Threshold | Alert |
|--------|-----------|-------|
| Query rate spike | > 10x normal | Potential extraction |
| Similar queries | > 100 similar in 1h | Systematic probing |
| Error rate spike | > 5x normal | Adversarial inputs |
| Unusual input patterns | Statistical deviation | Potential attack |
| Output PII detection | Any match | Data leakage risk |

## Compliance and Governance

### AI Security Compliance Matrix

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| EU AI Act | Risk assessment | Per-model risk classification |
| GDPR | Data protection | Training data isolation |
| SOC 2 | Access control | RBAC + audit logging |
| ISO 27001 | Information security | Comprehensive controls |
| NIST AI RMF | Risk management | Risk-based security |

### Security Audit Requirements

| Audit Area | Frequency | Evidence |
|------------|-----------|----------|
| Model access logs | Continuous | Access log analysis |
| Training data access | Monthly | Data access audit |
| Security configuration | Quarterly | Config review |
| Vulnerability assessment | Quarterly | Pen test results |
| Supply chain review | Per integration | Vendor assessment |

## Incident Response for AI Security

### AI Security Incident Categories

| Category | Severity | Response Time |
|----------|----------|---------------|
| Model extraction confirmed | Critical | < 15 min |
| Training data breach | Critical | < 15 min |
| Adversarial attack active | High | < 30 min |
| Suspicious query patterns | Medium | < 2 hours |
| Security misconfiguration | Medium | < 4 hours |

### Incident Response Steps

| Step | Action | Owner |
|------|--------|-------|
| 1 | Isolate affected model/tenant | On-call |
| 2 | Preserve forensic evidence | Security |
| 3 | Assess cross-tenant impact | Platform |
| 4 | Notify affected tenants | Comms |
| 5 | Remediate vulnerability | Engineering |
| 6 | Post-incident review | Security |

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Secure AI runtime design
- `bmad-bam-ai-eval-safety-design` - AI safety and security review
- `bmad-bam-ai-eval-safety-design` - AI evaluation security

## Related Patterns

Load decision criteria from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ai-runtime`, `security`
- **AI Runtimes:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

### Web Research

Use `web_queries` from pattern registry:
- Search: "AI model security multi-tenant patterns {date}"
- Search: "machine learning security best practices {date}"
- Search: "adversarial ML defense strategies {date}"
