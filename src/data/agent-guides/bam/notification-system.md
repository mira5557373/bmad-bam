# Multi-Tenant Notification System Patterns

**When to load:** When designing notification systems, tenant messaging, or when user mentions email, push notifications, in-app alerts, or multi-channel messaging.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### What is a Multi-Tenant Notification System?

A multi-tenant notification system delivers messages to users across various channels while respecting tenant-specific configurations, branding, and preferences.

### Channel Comparison

| Channel | Delivery | Use Case | Tenant Customization |
|---------|----------|----------|---------------------|
| Email | Async | Receipts, alerts | Templates, branding |
| Push | Real-time | Mobile alerts | App config |
| In-App | On access | Activity feed | UI integration |
| SMS | Async | Urgent alerts | Phone numbers |
| Webhook | Async | System integration | Tenant endpoints |

---

## Key Patterns

### Pattern 1: Notification Router

Route notifications to appropriate channels.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Event Receiver | Capture triggers | Tenant context |
| Channel Router | Select channels | Tenant preferences |
| Template Engine | Render content | Tenant branding |
| Delivery Service | Send notifications | Per-channel config |

### Router Architecture

```
Event
   │
   v
┌─────────────────────────────────────────┐
│         Notification Router              │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │      Tenant Preferences          │   │
│  │  Channels: [email, push]         │   │
│  │  Quiet hours: 22:00-08:00        │   │
│  │  Branding: custom                │   │
│  └──────────────────────────────────┘   │
│                   │                      │
│      ┌────────────┼────────────┐        │
│      v            v            v        │
│   ┌─────┐    ┌──────┐    ┌───────┐     │
│   │Email│    │ Push │    │In-App │     │
│   └─────┘    └──────┘    └───────┘     │
└─────────────────────────────────────────┘
```

### Pattern 2: Template Management

Tenant-customizable notification templates.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Base Templates | Platform defaults | Fallback |
| Tenant Templates | Custom versions | Override base |
| Variables | Dynamic content | Tenant data |
| Localization | Language support | Tenant locale |

### Template Hierarchy

```
Base Template (platform)
       │
       └── Tenant Override (optional)
              │
              └── Rendered Notification
                     │
                     ├── Variables filled
                     ├── Branding applied
                     └── Localized
```

### Pattern 3: Delivery Tracking

Track notification delivery status.

| Status | Description | Use Case |
|--------|-------------|----------|
| Queued | Pending delivery | Processing |
| Sent | Dispatched to channel | Audit |
| Delivered | Confirmed receipt | Success |
| Failed | Delivery failed | Retry/alert |
| Read | User viewed | Engagement |

### Tracking Flow

```
Notification Created ──> Queued ──> Sent
                                     │
                          ┌──────────┼──────────┐
                          v          v          v
                      Delivered   Bounced    Failed
                          │
                          v
                        Read
```

### Pattern 4: Preference Management

User and tenant notification preferences.

| Level | Scope | Examples |
|-------|-------|----------|
| Tenant | All users | Enabled channels, branding |
| User | Individual | Opt-out, channel preference |
| Notification Type | Per category | Marketing vs transactional |
| Schedule | Time-based | Quiet hours |

---

## Application Guidelines

When implementing notifications:

1. **Respect preferences** - Honor opt-outs and preferences
2. **Track delivery** - Monitor success rates
3. **Support customization** - Tenant branding
4. **Handle failures** - Retry and fallback
5. **Provide control** - Easy preference management

---

## Per-Tier Notification Configuration

| Tier | Channels | Custom Templates | Webhooks |
|------|----------|------------------|----------|
| Free | Email only | No | No |
| Pro | Email, Push, In-App | Yes | Limited |
| Enterprise | All + SMS | Full customization | Unlimited |

---

## Notification Event Structure

| Field | Required | Description |
|-------|----------|-------------|
| notification_id | Yes | Unique identifier |
| tenant_id | Yes | Tenant context |
| user_id | Yes | Recipient |
| type | Yes | Notification type |
| channels | Yes | Target channels |
| template_id | Yes | Template reference |
| variables | Yes | Template data |
| priority | No | Delivery priority |
| scheduled_at | No | Delayed delivery |

---

## Channel-Specific Considerations

| Channel | Consideration | Implementation |
|---------|---------------|----------------|
| Email | Deliverability | SPF, DKIM, DMARC |
| Push | Token management | Device registration |
| In-App | Real-time | WebSocket/SSE |
| SMS | Cost | Rate limiting |
| Webhook | Reliability | Retry, signing |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| No tenant isolation | Cross-tenant data | Tenant-scoped |
| No preference respect | User complaints | Honor opt-outs |
| Missing retry | Lost notifications | Retry with backoff |
| No tracking | Can't debug | Track all statuses |
| Hardcoded templates | No customization | Template system |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which channels? | Start with email + in-app | Most universal |
| Real-time needed? | Push/WebSocket for urgent | Balance cost vs immediacy |
| Template ownership? | Platform base with tenant override | Flexibility with defaults |
| How to handle failures? | Retry with exponential backoff | Reliable delivery |

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Configure notification defaults
- `bmad-bam-tenant-notification-system` - Notification branding
- `bmad-bam-convergence-verification` - Verify notification delivery

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Notifications:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `notification-system`
- **Event-driven:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`
- **Webhooks:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `webhook-delivery`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant notifications {date}"
- Search: "SaaS notification patterns {date}"
- Search: "notification system architecture {date}"
