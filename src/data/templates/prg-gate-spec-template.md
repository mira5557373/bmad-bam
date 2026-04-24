---
name: prg-gate-spec-template
description: Template for Production-Readiness Gate specification
category: quality
version: 1.0.0
---

# Production-Readiness Gate (PRG) Specification

| Metadata           | Value                 |
|--------------------|-----------------------|
| Project            | {{project_name}}      |
| Version            | {{version}}           |
| Date               | {{date}}              |
| Author             | {{author}}            |

## Overview

This document defines the PRG configuration for {{project_name}} with 10 mandatory checks.

## 1. Component Inventory

| Component | Type | Risk Level | PRG Path |
|-----------|------|------------|----------|
| {{component_1}} | {{type}} | {{risk}} | {{prg_path}} |

## 2. PRG Check Definitions

| # | Check | Method | Critical | Owner |
|---|-------|--------|----------|-------|
| 1 | Tenant isolation verified | Automated test | Yes | Platform |
| 2 | Action contracts validated | Schema validation | Yes | AI Safety |
| 3 | Rollback tested | Manual + script | No | SRE |
| 4 | Audit trail complete | Log verification | Yes | Compliance |
| 5 | Resource budgets configured | Config check | No | Platform |
| 6 | Confidence thresholds set | Review + approve | Yes | AI Safety |
| 7 | Loop bindings verified | Config validation | No | AI Runtime |
| 8 | Observability instrumented | Metrics check | No | SRE |
| 9 | Chaos test passed | Chaos runner | No | SRE |
| 10 | Human review sign-off | Approval workflow | Yes | Release Mgr |

## 3. Automation Configuration

```yaml
prg_gate:
  trigger: on_release_branch
  
  automated_checks:
    tenant_isolation:
      script: npm run test:tenant-isolation
      timeout: 300s
      critical: true
    
    action_contracts:
      script: npm run validate:contracts
      timeout: 60s
      critical: true
    
    audit_trail:
      script: npm run verify:audit-logs
      timeout: 120s
      critical: true
    
    loop_bindings:
      script: npm run validate:loops
      timeout: 60s
      critical: false
```

## 4. Threshold Configuration

| Check | Pass Criteria | Conditional | Timeout |
|-------|--------------|-------------|---------|
| 1 | 100% tests pass | N/A | 5 min |
| 2 | 100% valid | N/A | 1 min |
| 3 | Recovery < 5min | < 15min | 30 min |
| 4 | 100% coverage | N/A | 2 min |

## 5. Escalation Rules

| Condition | Action | Escalate To |
|-----------|--------|-------------|
| Critical fail | Block + alert | Release manager |
| Timeout | Retry once | On-call SRE |
| Manual SLA breach | Escalate | Engineering lead |

## 6. Exception Process

| Exception Type | Approval Required | Documentation |
|----------------|-------------------|---------------|
| Skip non-critical | Release manager | ADR |
| Delay critical | VP Engineering | Incident ticket |
| Emergency bypass | CTO | Post-incident review |

## Web Research Queries

- Search: "production readiness gate AI systems {{date}}"
- Search: "deployment checklist multi-tenant {{date}}"

## Verification Checklist

- [ ] All 10 checks defined
- [ ] Automation configured
- [ ] Thresholds set
- [ ] Escalation rules documented
- [ ] All placeholders replaced

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial creation |
