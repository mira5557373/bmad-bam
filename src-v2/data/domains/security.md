# Security - BAM Domain Context

**Loaded by:** ZSA, ZST  
**Related Workflows:** bmad-bam-security-threat-model, bmad-bam-security-baseline

---

## Overview

Security in multi-tenant SaaS requires defense in depth with tenant isolation as the primary security boundary.

## Core Concepts

### Defense in Depth

```
┌─────────────────────────────────────┐
│ Edge (WAF, DDoS)                    │
├─────────────────────────────────────┤
│ Gateway (AuthN, Rate Limit)         │
├─────────────────────────────────────┤
│ Service (AuthZ, Tenant Check)       │
├─────────────────────────────────────┤
│ Data (RLS, Encryption)              │
└─────────────────────────────────────┘
```

### Tenant Security Boundaries

| Layer | Control | Enforcement |
|-------|---------|-------------|
| Network | VPC/Subnet | Per-tier |
| Application | JWT claims | Every request |
| Database | RLS policies | Every query |
| Storage | Path prefixes | Every access |

### Secret Management

| Secret Type | Storage | Rotation |
|-------------|---------|----------|
| Platform | Vault | 90 days |
| Tenant API keys | Encrypted DB | On-demand |
| Customer-managed | External KMS | Customer-controlled |

## Decision Matrix

| Security Requirement | Implementation | Tenant Impact |
|----------------------|----------------|---------------|
| Authentication | OAuth 2.0 / OIDC | Per-tenant IdP |
| Authorization | RBAC + tenant check | Scoped permissions |
| Encryption at rest | AES-256 | Tenant key option |
| Encryption in transit | TLS 1.3 | All traffic |

## Quality Checks

- [ ] Authentication enforced at all entry points
- [ ] Authorization checks include tenant validation
- [ ] Secrets management uses tenant-scoped vaults
- [ ] **CRITICAL:** No privilege escalation across tenants

## Web Research Queries

- "multi-tenant security patterns {date}"
- "SaaS security best practices {date}"

---

## Production Readiness Gate (PRG)

Final gate before production deployment (NEXUS component):

### PRG Check Categories

| Category | Weight | Critical | Description |
|----------|--------|----------|-------------|
| Security | 25% | Yes | Auth, encryption, audit |
| Reliability | 25% | Yes | Failover, recovery, monitoring |
| Performance | 20% | No | Latency, throughput, scaling |
| Compliance | 20% | Yes | Regulatory, data residency |
| Operations | 10% | No | Runbooks, alerts, on-call |

### PRG Checklist Schema

```yaml
prg_gate:
  version: "1.0"
  
  security:
    - check: "auth_implemented"
      critical: true
      evidence: "auth_test_results"
      
    - check: "encryption_at_rest"
      critical: true
      evidence: "encryption_config"
      
    - check: "audit_logging"
      critical: true
      evidence: "audit_log_sample"
      
  reliability:
    - check: "failover_tested"
      critical: true
      evidence: "failover_runbook_execution"
      
    - check: "recovery_time_met"
      critical: true
      threshold: "< 15 minutes"
      
    - check: "monitoring_configured"
      critical: true
      evidence: "dashboard_screenshots"
      
  performance:
    - check: "latency_slo_met"
      critical: false
      threshold: "p99 < 2s"
      
    - check: "throughput_tested"
      critical: false
      threshold: "> 100 rps"
      
  compliance:
    - check: "data_residency_verified"
      critical: true
      evidence: "region_config"
      
    - check: "gdpr_compliance"
      critical: true
      evidence: "dpa_signed"
      
  operations:
    - check: "runbooks_complete"
      critical: false
      evidence: "runbook_links"
      
    - check: "on_call_configured"
      critical: false
      evidence: "pagerduty_schedule"
```

### PRG Outcome Matrix

| Score | Outcome | Action |
|-------|---------|--------|
| 100% critical + >80% total | PASS | Deploy to production |
| 100% critical + 60-80% total | CONDITIONAL | Deploy with remediation plan |
| <100% critical | FAIL | Block deployment |

### PRG Automation

```yaml
prg_automation:
  ci_integration:
    pipeline_stage: "pre-production"
    block_on_fail: true
    
  evidence_collection:
    auto_collect: ["test_results", "config_files"]
    require_manual: ["runbook_review", "compliance_sign_off"]
    
  reporting:
    generate_report: true
    notify_stakeholders: ["security", "ops", "compliance"]
```

## Related Web Research

- Search: "production readiness checklist AI systems {date}"
- Search: "deployment gate best practices {date}"
- Search: "AI compliance production requirements {date}"

---

## AI-Specific Security

### Prompt Injection Prevention

| Attack Type | Detection Method | Mitigation |
|-------------|------------------|------------|
| Direct injection | Pattern matching, classifier | Input sanitization, hard block |
| Indirect injection | Output analysis, canary tokens | Response filtering, flag |
| Jailbreak attempts | Behavior classifier | Model refusal, alert |
| Data extraction | Output scanning | PII filter, truncation |

### Detection Flow

```
User Input
    │
    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Pattern    │────▶│  Classifier │────▶│  Canary     │
│  Matching   │     │  Model      │     │  Token      │
└─────────────┘     └─────────────┘     └─────────────┘
    │                     │                   │
    ▼                     ▼                   ▼
 Known patterns      Behavior score      Token in output?
    │                     │                   │
    └─────────────────────┴───────────────────┘
                          │
                          ▼
                   Risk Score > Threshold?
                          │
              ┌───────────┴───────────┐
             YES                      NO
              │                        │
              ▼                        ▼
         Block + Alert            Process
```

### AI Red Teaming Checklist

- [ ] Test known prompt injection patterns
- [ ] Attempt jailbreak techniques
- [ ] Test data extraction attempts
- [ ] Verify PII detection in outputs
- [ ] Test budget limit bypass attempts
- [ ] Test kill switch response time
- [ ] Test tool permission boundaries
- [ ] **CRITICAL:** No unauthorized data access via AI

### LLM Security Controls

```yaml
llm_security:
  input_controls:
    max_input_tokens: 4096
    sanitization_enabled: true
    injection_classifier: true
    
  output_controls:
    pii_detection: true
    pii_action: enum[redact, block, flag]
    max_output_tokens: 4096
    response_filtering: true
    
  execution_controls:
    token_budget_per_request: int
    cost_limit_per_tenant: float
    kill_switch_enabled: true
    kill_switch_latency_ms: 100
    
  audit:
    log_all_interactions: true
    log_prompts: bool  # Configurable for compliance
    retention_days: 90
```

---

## Threat Modeling Integration

### STRIDE Analysis per Component

| Component | S | T | R | I | D | E | Priority |
|-----------|---|---|---|---|---|---|----------|
| API Gateway | ● | ● | ○ | ● | ○ | ● | High |
| Auth Service | ● | ● | ● | ● | ● | ○ | Critical |
| Tenant Service | ● | ○ | ● | ● | ● | ○ | Critical |
| Database | ● | ● | ○ | ● | ● | ○ | Critical |
| AI Agent | ● | ● | ● | ● | ● | ● | Critical |
| Cache | ● | ○ | ○ | ● | ● | ○ | Medium |

Legend: ● = Applicable threat, ○ = Lower risk

### Attack Tree Methodology

```
Goal: Access other tenant's data
├── Via Application
│   ├── IDOR vulnerability
│   │   └── Mitigation: Tenant context validation
│   ├── SQL injection
│   │   └── Mitigation: Parameterized queries + RLS
│   └── Business logic bypass
│       └── Mitigation: Authorization checks
├── Via AI Agent
│   ├── Prompt injection
│   │   └── Mitigation: Input sanitization
│   ├── Tool permission bypass
│   │   └── Mitigation: Scoped tool access
│   └── Memory leak
│       └── Mitigation: Isolated memory per tenant
└── Via Infrastructure
    ├── Network sniffing
    │   └── Mitigation: mTLS everywhere
    └── Database access
        └── Mitigation: RLS + encryption
```

### Threat-to-Control Mapping

| Threat | Control | Implementation | Verification |
|--------|---------|----------------|--------------|
| Cross-tenant access | RLS | PostgreSQL policies | Integration tests |
| Prompt injection | Input filter | Classifier + rules | Red team exercise |
| Data exfiltration | Output filter | PII detection | Output scanning |
| Privilege escalation | RBAC | Role checks | Access audit |

---

## Security Operations

### Vulnerability Management

```
CVE Discovered
      │
      ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Assess     │────▶│  Prioritize │────▶│  Patch      │
│  Impact     │     │  by Tenant  │     │  Deploy     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
  CVSS score         Tenant tier          Rollout plan
  + exploitability   + data sensitivity   + monitoring
```

### Patch Priority Matrix

| CVSS Score | Exploitable | Enterprise Tenants | Patch Window |
|------------|-------------|-------------------|--------------|
| 9.0+ | Yes | Yes | 24 hours |
| 9.0+ | Yes | No | 72 hours |
| 7.0-8.9 | Yes | Any | 1 week |
| 7.0-8.9 | No | Any | 2 weeks |
| <7.0 | Any | Any | Next release |

### Penetration Testing Scope

**Multi-Tenant Specific Tests:**
- [ ] Cross-tenant data access attempts
- [ ] Tenant ID manipulation
- [ ] Shared resource isolation
- [ ] Cache poisoning across tenants
- [ ] AI agent tenant boundary testing

**AI Component Tests:**
- [ ] Prompt injection (all known techniques)
- [ ] Model extraction attempts
- [ ] Training data extraction
- [ ] Output manipulation
- [ ] Budget exhaustion attacks

---

## Pattern References (Enhanced)

- **Zero Trust:** `{project-root}/_bmad/bam/data/patterns/zero-trust.md`
- **Secrets:** `{project-root}/_bmad/bam/data/patterns/secrets-management.md`
- **Incident:** `{project-root}/_bmad/bam/data/patterns/incident-response.md`
