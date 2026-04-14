# Step 1: Define Webhook Events

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Define the webhook events that the platform will emit, including event categories, event names, and payload schemas.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `webhook-delivery`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`

---


## Inputs

- User requirements and constraints for webhook event design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define the webhook event catalog:

---

## Event Categories

| Category | Description | Typical Consumers |
|----------|-------------|-------------------|
| Tenant Lifecycle | Tenant status changes | Admin dashboards, CRM integrations |
| Agent Execution | Agent run lifecycle events | Monitoring systems, workflow tools |
| Billing | Payment and invoice events | Accounting systems, finance tools |
| Security | Security-related events | SIEM systems, security monitoring |
| Usage | Resource and quota events | Analytics platforms, usage dashboards |

---

## Event Naming Convention

Events follow the pattern: `{resource}.{action}` or `{resource}.{subresource}.{action}`

| Pattern | Examples |
|---------|----------|
| Resource created | `tenant.created`, `agent.created` |
| Resource updated | `tenant.updated`, `agent.config.updated` |
| Resource deleted | `tenant.deleted`, `agent.deleted` |
| Action completed | `agent.run.completed`, `payment.succeeded` |
| Action failed | `agent.run.failed`, `payment.failed` |

---

## Event Payload Schema

Define standard payload structure:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique event ID (UUID v4) |
| `type` | string | Yes | Event type (e.g., `tenant.created`) |
| `timestamp` | ISO 8601 | Yes | Event occurrence time |
| `tenant_id` | string | Yes | Owning tenant ID |
| `api_version` | string | Yes | API version (e.g., `2024-01-01`) |
| `data` | object | Yes | Event-specific payload |
| `metadata` | object | No | Additional context (correlation IDs, etc.) |

---

## Core Events

### Tenant Lifecycle Events

| Event | Trigger | Payload Data |
|-------|---------|--------------|
| `tenant.created` | New tenant onboarded | `name`, `tier`, `created_at` |
| `tenant.updated` | Tenant settings changed | `changes`, `updated_fields` |
| `tenant.suspended` | Tenant suspended | `reason`, `suspended_at`, `grace_until` |
| `tenant.reactivated` | Tenant reactivated | `reactivated_at`, `previous_state` |
| `tenant.deleted` | Tenant offboarded | `deleted_at`, `data_retention` |

### Agent Execution Events

| Event | Trigger | Payload Data |
|-------|---------|--------------|
| `agent.run.started` | Agent run initiated | `run_id`, `agent_id`, `inputs` |
| `agent.run.completed` | Agent run succeeded | `run_id`, `outputs`, `duration_ms` |
| `agent.run.failed` | Agent run failed | `run_id`, `error`, `error_code` |
| `agent.step.completed` | Individual step done | `run_id`, `step_id`, `step_output` |

### Billing Events

| Event | Trigger | Payload Data |
|-------|---------|--------------|
| `invoice.created` | New invoice generated | `invoice_id`, `amount`, `due_date` |
| `payment.succeeded` | Payment processed | `payment_id`, `amount`, `method` |
| `payment.failed` | Payment failed | `payment_id`, `error`, `retry_at` |
| `subscription.changed` | Plan changed | `old_plan`, `new_plan`, `effective_at` |

### Security Events

| Event | Trigger | Payload Data |
|-------|---------|--------------|
| `api_key.created` | New API key | `key_id`, `scopes`, `expires_at` |
| `api_key.rotated` | Key rotation | `old_key_id`, `new_key_id` |
| `suspicious_activity.detected` | Anomaly detected | `activity_type`, `severity`, `details` |

**Verify current best practices with web search:**
Search the web: "webhook delivery patterns {date}"
Search the web: "tenant webhook management {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the event catalog above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into event schemas and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for event review
- **C (Continue)**: Accept event catalog and proceed to delivery system design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass event context: categories, events, payload schemas
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into event catalog
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review webhook events: {summary of categories and events}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save event catalog to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-delivery-system.md`

---

## Verification

- [ ] All event categories defined
- [ ] Event naming convention established
- [ ] Payload schema standardized
- [ ] Core events documented with payloads
- [ ] Patterns align with pattern registry

---

## Outputs

- Webhook event catalog
- Event payload schemas

---

## Next Step

Proceed to `step-02-c-design-delivery-system.md` to design the webhook delivery infrastructure.
