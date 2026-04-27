# Support Engineer Guide - BAM Extension

**When to load:** When designing support workflows, implementing support tooling, or when user mentions customer support, ticket handling, tenant debugging, or support escalation.
**Integrates with:** Dev (bmad-agent-dev), Architect (bmad-agent-architect)

This guide provides BAM-specific context for support engineers handling tenant issues in multi-tenant agentic AI platforms.

---

## Role Context

As a support engineer on a BAM project, you focus on:
- Triaging and resolving tenant issues with strict isolation
- Debugging multi-tenant applications without cross-tenant exposure
- Following tier-appropriate SLAs and escalation paths
- Building knowledge base for common tenant issues
- Providing consistent support experience across all tiers

---

## Core Concepts

### Multi-Tenant Support Model

Support in multi-tenant environments requires strict tenant isolation during debugging, tier-appropriate response times, and tooling that prevents accidental cross-tenant data exposure. Support engineers must resolve issues while maintaining the security boundaries that protect all tenants.

### Tenant Context in Support

Every support interaction must be scoped to a specific tenant. Support engineers need visibility into tenant-specific:
- Configuration and settings
- Usage patterns and limits
- Recent changes and deployments
- Error logs and traces (filtered to tenant)
- AI agent execution history

### Support Tiering

| Tier | Response SLA | Resolution SLA | Channel | Escalation Path |
|------|--------------|----------------|---------|-----------------|
| Free | Best effort | Best effort | Community/docs | Self-service only |
| Pro | 24 hours | 72 hours | Email/chat | L1 → L2 → Engineering |
| Enterprise | 4 hours | 24 hours | Dedicated + phone | L1 → L2 → Dedicated engineer |

---

## Decision Framework

| Scenario | Recommendation | Rationale |
|----------|---------------|-----------|
| Tenant reports data issue | Verify tenant isolation first | Could indicate cross-tenant leak |
| Performance complaint | Check tenant's usage vs limits | May be tier limit, not bug |
| AI agent misbehavior | Review agent logs with tenant filter | Isolate tenant-specific context |
| Authentication failure | Check tenant SSO config first | Most auth issues are config |
| Billing dispute | Review metered usage with tenant | Transparency resolves most disputes |
| Feature not working | Verify feature enabled for tier | Tier gating is common cause |

---

## Support Engineer Workflows

### Ticket Triage Process

```
Ticket Received
    │
    ├── 1. Identify Tenant
    │   ├── Extract tenant ID from ticket
    │   ├── Load tenant context (tier, config, usage)
    │   └── Verify reporter is authorized for tenant
    │
    ├── 2. Classify Issue
    │   ├── Category (bug, question, feature, billing)
    │   ├── Severity (critical, high, medium, low)
    │   ├── Component (AI agent, API, UI, billing, auth)
    │   └── Tenant impact scope
    │
    ├── 3. Check Known Issues
    │   ├── Search knowledge base
    │   ├── Check recent incident status
    │   └── Review similar resolved tickets
    │
    ├── 4. Route or Resolve
    │   ├── Self-service article → Send link
    │   ├── Known issue → Provide status/ETA
    │   ├── L1 resolvable → Handle directly
    │   └── Escalation needed → Route to L2/Engineering
    │
    └── 5. Document Resolution
        ├── Update ticket with resolution
        ├── Add to knowledge base if new
        └── Tag for analytics
```

### Tenant Debugging Workflow

```
Issue Requires Investigation
    │
    ├── 1. Establish Tenant Context
    │   ├── Load tenant ID into debugging session
    │   ├── Verify support access authorization
    │   └── Start audit log for support session
    │
    ├── 2. Gather Tenant-Scoped Data
    │   ├── Logs (filtered to tenant_id)
    │   ├── Traces (filtered to tenant_id)
    │   ├── Metrics (filtered to tenant_id)
    │   ├── Recent config changes
    │   └── AI agent execution history
    │
    ├── 3. Reproduce Issue
    │   ├── Use tenant's sandbox/test environment
    │   ├── NEVER use tenant's production data directly
    │   └── Document reproduction steps
    │
    ├── 4. Identify Root Cause
    │   ├── Analyze logs and traces
    │   ├── Check for recent deployments
    │   ├── Compare with working tenants (anonymized)
    │   └── Consult with engineering if needed
    │
    ├── 5. Apply Resolution
    │   ├── Config fix → Guide tenant or apply
    │   ├── Bug fix → File ticket, provide workaround
    │   ├── Usage issue → Explain limits, suggest upgrade
    │   └── Feature gap → Document, route to PM
    │
    └── 6. Close Out
        ├── Confirm resolution with tenant
        ├── Document for knowledge base
        └── End audit session
```

### AI Agent Issue Debugging

```
AI Agent Misbehavior Reported
    │
    ├── 1. Identify Agent and Tenant
    │   ├── Get agent ID and tenant ID
    │   ├── Get conversation/run ID if available
    │   └── Load agent configuration for tenant
    │
    ├── 2. Review Execution History
    │   ├── Load conversation transcript
    │   ├── Review tool invocations
    │   ├── Check memory state at time of issue
    │   └── Examine token usage and limits
    │
    ├── 3. Classify Issue Type
    │   ├── Hallucination → Check context, RAG quality
    │   ├── Wrong tool use → Check tool definitions
    │   ├── Timeout → Check complexity, token limits
    │   ├── Cost overrun → Check tenant budget settings
    │   └── Safety violation → Escalate to AI safety team
    │
    ├── 4. Apply Tenant-Safe Resolution
    │   ├── Config adjustment → Apply within tenant scope
    │   ├── Prompt improvement → Suggest to tenant
    │   ├── System issue → File internal bug
    │   └── Safety issue → Immediate escalation
    │
    └── 5. Document AI-Specific Learnings
        ├── Add to AI issue knowledge base
        ├── Update guardrail patterns if needed
        └── Feed back to AI safety monitoring
```

---

## Support Tooling Requirements

### Tenant-Scoped Support Console

| Feature | Purpose | Security Requirement |
|---------|---------|---------------------|
| Tenant selector | Switch context between tenants | Audit log entry on switch |
| Log viewer | View tenant-filtered logs | Pre-filtered, no cross-tenant |
| Trace viewer | View tenant-filtered traces | Pre-filtered, no cross-tenant |
| Config viewer | View tenant configuration | Read-only default |
| Usage dashboard | View tenant usage metrics | Tenant-scoped only |
| AI history | View agent execution history | Tenant-scoped, PII masked |
| Impersonation | Act as tenant user (with audit) | Requires approval, time-limited |

### Support Access Controls

| Access Level | Capabilities | Approval Required |
|--------------|--------------|-------------------|
| L1 Read | View logs, config, usage | None (role-based) |
| L1 Write | Update ticket, send response | None (role-based) |
| L2 Read | Deep logs, traces, DB queries | None (role-based) |
| L2 Write | Config changes for tenant | Manager approval |
| Impersonation | Act as tenant user | Tenant consent + manager |
| Data Access | View tenant data directly | Legal + security approval |

### Audit Requirements for Support Actions

Every support action must log:
- Support engineer ID
- Tenant ID being accessed
- Timestamp
- Action performed
- Data accessed (categories, not content)
- Justification (ticket ID)

---

## Common Issue Patterns

### Authentication Issues

| Symptom | Likely Cause | Resolution |
|---------|--------------|------------|
| Can't login | SSO misconfiguration | Guide tenant to check IdP settings |
| Token expired | Session timeout | Re-authenticate |
| MFA failing | Device/time sync issue | Reset MFA, verify time sync |
| API key rejected | Key revoked or expired | Generate new key |
| "Unauthorized" error | Role permissions | Verify user role assignment |

### Performance Issues

| Symptom | Likely Cause | Resolution |
|---------|--------------|------------|
| Slow responses | Approaching rate limit | Check usage, suggest upgrade |
| Timeouts | Complex AI agent task | Simplify task, check token limits |
| Degraded throughput | Noisy neighbor | Report to platform ops |
| Batch job delays | Queue depth | Check tenant job priority |

### AI Agent Issues

| Symptom | Likely Cause | Resolution |
|---------|--------------|------------|
| Wrong answers | Poor RAG retrieval | Check embedding quality, chunk size |
| Hallucinations | Missing context | Improve system prompt, add context |
| Tool failures | API errors | Check tool configuration, API status |
| High costs | Token explosion | Review prompts, set budget limits |
| Safety triggers | Content policy | Review conversation, adjust filters |

### Billing Issues

| Symptom | Likely Cause | Resolution |
|---------|--------------|------------|
| Unexpected charges | Usage spike | Review usage dashboard with tenant |
| Missing invoice | Billing config | Check billing email, resend |
| Payment failed | Card expired | Update payment method |
| Usage mismatch | Metering lag | Explain metering timing |

---

## Escalation Matrix

### When to Escalate

| Condition | Escalate To | SLA |
|-----------|-------------|-----|
| Suspected data breach | Security team + management | Immediate |
| Cross-tenant data exposure | Security team + management | Immediate |
| Platform-wide outage | On-call engineering | Immediate |
| Single tenant critical issue | L2 support | Per tier SLA |
| AI safety violation | AI safety team | 1 hour |
| Bug requiring code fix | Engineering | Next sprint |
| Feature request | Product management | Backlog |

### Escalation Information Required

When escalating, always include:
- Tenant ID and tier
- Issue summary and timeline
- Steps already taken
- Relevant logs/traces (tenant-scoped)
- Business impact assessment
- Urgency justification

---

## Communication Templates

### Initial Response

```
Hi [Name],

Thank you for contacting [Platform] Support. I'm [Support Name] and I'll be
assisting you with this issue.

I can see you're reporting [brief issue summary] for your [Tier] account.

I'm looking into this now and will update you within [SLA timeframe].

In the meantime, could you please confirm:
- When did this issue start?
- Is it affecting all users or specific users?
- Have any changes been made recently?

Best regards,
[Support Name]
```

### Resolution Confirmation

```
Hi [Name],

Great news - I've identified the issue and applied a resolution.

**Issue:** [Description]
**Cause:** [Root cause]
**Resolution:** [What was done]

Please verify that everything is working as expected and let me know if you
have any questions.

I'll keep this ticket open for 48 hours in case you need any follow-up.

Best regards,
[Support Name]
```

### Escalation to Engineering

```
**Escalation: [Ticket ID]**

**Tenant:** [Tenant ID] ([Tier] tier)
**Issue:** [Brief description]
**Impact:** [Business impact]
**Timeline:** [When started, duration]

**Investigation Summary:**
- [Step 1 taken]
- [Step 2 taken]
- [Finding]

**Relevant Logs:** [Link to tenant-scoped logs]
**Relevant Traces:** [Link to tenant-scoped traces]

**Recommended Action:** [Engineering investigation/fix needed]
**Urgency:** [SLA deadline]

Assigned by: [Support Name]
```

---

## Knowledge Base Management

### Article Categories for Multi-Tenant Support

| Category | Example Articles |
|----------|-----------------|
| Getting Started | Account setup, first agent, basic config |
| User Management | Invites, roles, SSO setup |
| AI Agents | Creating agents, tool configuration, prompts |
| Integrations | API usage, webhooks, third-party connections |
| Billing | Understanding usage, payment, upgrades |
| Troubleshooting | Common errors, performance tips |
| Security | MFA, audit logs, data export |

### When to Create New Article

- Same question asked 3+ times
- Common misconfiguration discovered
- New feature released
- Post-incident learnings

---

## Metrics and Quality

### Support Metrics to Track

| Metric | Target | Measurement |
|--------|--------|-------------|
| First response time | < SLA | Ticket timestamp → first response |
| Resolution time | < SLA | Ticket open → resolved |
| First contact resolution | > 70% | Resolved without escalation |
| Customer satisfaction | > 4.5/5 | Post-resolution survey |
| Escalation rate | < 20% | Escalated / total tickets |
| Knowledge base deflection | > 40% | Self-service / total inquiries |

### Quality Assurance

- [ ] Tenant correctly identified before action
- [ ] Audit trail maintained for session
- [ ] No cross-tenant data exposed
- [ ] Resolution documented clearly
- [ ] Knowledge base updated if applicable
- [ ] Escalation followed proper process

---

## Application Guidelines

When handling support tickets:

1. **Always identify tenant first** - Load tenant context before any investigation
2. **Verify authorization** - Confirm reporter is authorized for the tenant
3. **Use tenant-scoped tools** - Never use tools that expose cross-tenant data
4. **Audit all access** - Log every action with tenant context and justification
5. **Follow escalation matrix** - Escalate based on tier and severity

When debugging tenant issues:

1. **Scope logs to tenant** - Use pre-filtered dashboards, never raw log access
2. **Reproduce safely** - Use sandbox environments, never production data directly
3. **Preserve evidence** - Don't modify data during investigation
4. **Document findings** - Create knowledge base articles for common issues
5. **Close the loop** - Confirm resolution with tenant before closing

When communicating with tenants:

1. **Match tier expectations** - Enterprise gets proactive updates, Free gets self-service
2. **Use templates** - Consistent, professional communication
3. **Set expectations** - Provide realistic timelines based on SLAs
4. **Never expose internals** - Keep technical details appropriate for audience
5. **Follow up** - Ensure satisfaction after resolution

---

## Related Workflows

- `bmad-bam-tenant-incident-response` - Handle tenant-impacting incidents
- `bmad-bam-tenant-aware-observability` - Set up tenant-scoped monitoring
- `bmad-bam-ai-agent-debug` - Debug AI agent issues

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Support patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `operations-*`
- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `observability-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS support best practices {date}"
- Search: "tenant isolation customer support tooling {date}"
- Search: "B2B SaaS support tier structure {date}"
- Search: "AI agent customer support debugging {date}"
