# Audit Logging Patterns

**When to load:** When designing compliance audit trails, implementing tenant-aware logging, or when user mentions audit logs, compliance reporting, or forensic analysis.

**Integrates with:** Security agent, DevOps agent, Architect (Atlas persona)

---

## Core Concepts

### What is Audit Logging?

Audit logging captures security-relevant events in a multi-tenant SaaS platform for compliance, forensics, and operational analysis. Unlike operational logs, audit logs are immutable, tamper-evident, and designed for long-term retention.

### Audit vs Operational Logs

| Aspect | Audit Logs | Operational Logs |
|--------|------------|------------------|
| Purpose | Compliance, forensics | Debugging, monitoring |
| Retention | Years (regulatory) | Days to months |
| Mutability | Immutable | Can be rotated |
| Access | Restricted | DevOps team |
| Content | Who did what when | How system behaved |

---

## Key Patterns

### Pattern 1: Audit Event Schema

| Field | Description | Example |
|-------|-------------|---------|
| event_id | Unique identifier | `evt_abc123` |
| timestamp | ISO 8601 UTC | `2026-04-09T10:30:00Z` |
| tenant_id | Tenant context | `tenant_xyz` |
| actor_id | Who performed action | `user_123` or `agent_456` |
| actor_type | Actor classification | `user`, `agent`, `system` |
| action | What was done | `document.delete` |
| resource | Target of action | `doc_789` |
| outcome | Result | `success`, `failure`, `denied` |
| context | Additional metadata | `{ip, user_agent, reason}` |

### Pattern 2: Tenant Log Isolation

| Strategy | Implementation | Access Model |
|----------|----------------|--------------|
| Separate streams | Log stream per tenant | Tenant reads own logs |
| Filtered access | Shared storage, query filter | API filters by tenant |
| Export on demand | Centralized, export capability | Tenant requests export |

### Pattern 3: AI Agent Audit Trail

Additional fields for agent actions:

| Field | Description | Purpose |
|-------|-------------|---------|
| agent_id | Agent instance | Trace to agent config |
| run_id | Execution run | Correlate multi-step |
| reasoning | Agent reasoning | Explain decisions |
| tool_calls | Tools invoked | Audit tool usage |
| model_version | LLM version used | Reproducibility |

---

## Application Guidelines

- Building compliance-ready SaaS platforms
- Implementing SOC 2, HIPAA, or GDPR requirements
- Designing agent accountability systems
- Creating tenant self-service audit access
- Forensic investigation capabilities

---

## Compliance Mapping

| Regulation | Audit Requirements | Retention |
|------------|-------------------|-----------|
| SOC 2 | Access logs, changes | 1 year |
| HIPAA | PHI access logs | 6 years |
| GDPR | Data processing logs | Varies |
| PCI DSS | Cardholder data access | 1 year |

---

## Per-Tier Audit Features

| Tier | Log Retention | Self-Service Access | Export Format |
|------|---------------|---------------------|---------------|
| Free | 30 days | No | N/A |
| Pro | 1 year | Dashboard view | CSV |
| Enterprise | 7 years | Full API access | JSON, SIEM |

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should audit logs be separate from operational logs? | Yes, separate storage with different retention and access controls | Audit logs require immutability and restricted access; operational logs need flexibility |
| How to provide tenant access to their audit logs? | Self-service API with tenant-scoped filtering | Enables tenant compliance without platform operational burden |
| What retention period for audit logs? | Match strictest applicable regulation plus buffer (7 years for most) | Ensures compliance across all regulatory requirements |
| Should AI agent actions be logged differently? | Yes, include agent-specific fields (run_id, reasoning, tool_calls) | AI decisions require additional context for accountability |
| How to handle cross-tenant admin actions in logs? | Separate admin audit stream with elevated access controls | Admin actions on tenant data need additional scrutiny |

---

## Related Workflows

- `bmad-bam-compliance-design` - Design audit logging compliance requirements
- `bmad-bam-tenant-aware-observability` - Implement tenant-scoped audit logging
- `bmad-bam-security-review` - Validate audit logging security controls

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`, `compliance`, `tenant-isolation`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant audit logging patterns {date}"
- Search: "SOC 2 audit log requirements SaaS {date}"
- Search: "AI agent audit trail best practices {date}"
