---
pattern_id: incident-response
shortcode: ZIR
category: operations
qg_ref: QG-IR1
version: 1.0.0
last_reviewed: 2026-04-29
---

# Incident Response - BAM Pattern

**Loaded by:** ZIR  
**Applies to:** Security incidents, outages, data breaches, tenant-impacting events

---

## When to Use

- Production multi-tenant SaaS operations
- Any system requiring structured incident handling
- Compliance requirements for incident documentation
- AI platforms with potential safety incidents
- Systems with defined SLAs requiring incident tracking

## When NOT to Use

- Development/staging environments (simplified process)
- Non-production issues (use standard bug tracking)
- Planned maintenance windows

## Architecture

### Severity Classification

| Severity | Impact | Response Time | Escalation | Example |
|----------|--------|---------------|------------|---------|
| P0 - Critical | All tenants down, data breach | 15 min | Immediate exec | Platform outage, security breach |
| P1 - High | Multiple tenants impacted | 1 hour | Manager | Feature broken for segment |
| P2 - Medium | Single tenant impacted | 4 hours | Team lead | Tenant-specific bug |
| P3 - Low | Minor issue, workaround exists | 24 hours | On-call | UI glitch, minor performance |

### Tenant Impact Matrix

| Incident Type | Free Tier | Pro Tier | Enterprise Tier |
|---------------|-----------|----------|-----------------|
| Outage notification | Email (24h) | Email + Dashboard (1h) | Phone + Email (15min) |
| Status updates | Dashboard | Dashboard + Email | Dedicated channel |
| RCA delivery | Self-service | 5 business days | 2 business days |
| SLA credits | None | Automatic | Automatic + review |

### Incident Timeline

```
Detection           Triage              Response            Resolution
    │                  │                   │                    │
    ▼                  ▼                   ▼                    ▼
┌────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐
│ Alert  │──────▶│ Classify │──────▶│ Execute  │──────▶│ Verify   │
│ Fired  │       │ Severity │       │ Runbook  │       │ Resolved │
└────────┘       └──────────┘       └──────────┘       └──────────┘
    │                  │                   │                    │
    ▼                  ▼                   ▼                    ▼
 T+0 min           T+15 min           T+varies            T+varies
                                                               │
                                                               ▼
                                                        ┌──────────┐
                                                        │Postmortem│
                                                        │ (48-72h) │
                                                        └──────────┘
```

### Escalation Path

```
On-Call Engineer
       │
       │ P2-P3: Own resolution
       │ P1: Escalate after 1 hour
       │ P0: Immediate escalation
       ▼
Team Lead / Manager
       │
       │ P1: Own with updates
       │ P0: Escalate to leadership
       ▼
Engineering Leadership
       │
       │ P0: Own with exec updates
       │ Security breach: Legal + Security
       ▼
Executive Team + Legal (P0 Security)
```

### Implementation Schema

```yaml
incident_response:
  incident_id: string
  tenant_impact: uuid[]
  
  classification:
    severity: enum[p0, p1, p2, p3]
    category: enum[outage, security, performance, data, ai_safety]
    affected_services: string[]
    affected_tenants: uuid[]
    tenant_tier_impact: enum[free, pro, enterprise, all]
    
  timeline:
    detected_at: timestamp
    acknowledged_at: timestamp
    mitigated_at: timestamp
    resolved_at: timestamp
    postmortem_due: timestamp
    
  communication:
    status_page_updated: bool
    tenant_notifications_sent: bool
    internal_channel: string
    external_updates: object[]
    
  response:
    runbook_id: string
    runbook_executed: bool
    rollback_performed: bool
    on_call_engineer: string
    escalation_chain: string[]
    
  resolution:
    root_cause: string
    fix_description: string
    prevention_actions: string[]
    postmortem_url: string
    
  ai_specific:
    agent_involved: bool
    prompt_injection_suspected: bool
    model_behavior_issue: bool
    safety_guardrail_triggered: bool
```

### Communication Templates

**P0 - Initial (15 min)**
```
Subject: [P0 INCIDENT] {service} - {brief description}

SEVERITY: P0 - Critical
IMPACT: {tenant count} tenants affected
STATUS: Investigating

We are aware of an issue affecting {description}.
Our team is actively investigating.

Next update in 30 minutes.
```

**P0 - Resolution**
```
Subject: [RESOLVED] {service} - {brief description}

SEVERITY: P0 - Critical
STATUS: Resolved
DURATION: {duration}

Issue has been resolved. Full service restored.

Root cause analysis will be provided within 48 hours.

Affected tenants will receive SLA credit review.
```

### AI Safety Incident Specifics

| AI Incident Type | Severity | Immediate Action | Investigation |
|------------------|----------|------------------|---------------|
| Prompt injection detected | P1 | Block user, log attempt | Review guardrails |
| Model hallucination | P2 | Flag output, notify user | Tune confidence |
| Data leak in output | P0 | Kill switch, audit trail | Security review |
| Runaway agent | P1 | Kill switch, budget freeze | Trace execution |

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full incident management | Comprehensive, compliant | Overhead for small issues | Enterprise, regulated |
| Simplified triage | Fast response | May miss patterns | Startups, small teams |
| Automated classification | Consistent, fast | May misclassify | High-volume alerts |
| Manual escalation | Human judgment | Slower response | Complex incidents |

## Quality Checks

- [ ] Severity classification matrix documented
- [ ] Escalation paths defined for all severities
- [ ] Tenant notification templates prepared
- [ ] Runbooks exist for common incidents
- [ ] **CRITICAL:** Postmortem process enforced for P0/P1

## Web Research Queries

- "incident response multi-tenant SaaS {date}"
- "incident severity classification {date}"
- "tenant communication during outage {date}"
- "AI safety incident response {date}"
- "postmortem blameless culture {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-IR1 | Pattern implementation verified |

## Related Patterns

- [circuit-breaker.md](circuit-breaker.md) - Fault tolerance
- [disaster-recovery.md](disaster-recovery.md) - Business continuity

