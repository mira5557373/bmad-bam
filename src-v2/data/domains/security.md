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
