# Step 2: Design Notification Channels

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making operational decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define the communication channels and delivery mechanisms for tenant notifications, ensuring appropriate channel selection based on message urgency, tenant preferences, and tier capabilities.

---

## Prerequisites

- Step 1 (Analyze Communication Needs) completed
- Communication needs analysis document available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: notification-channels
- **Web research (if available):** Search for current notification channel best practices

---

## Inputs

- Communication needs analysis from Step 1
- Tenant tier definitions
- Technical infrastructure capabilities
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Primary Channels

Document available notification channels:

| Channel | Use Cases | Latency | Reliability | Cost |
|---------|-----------|---------|-------------|------|
| Email | Non-urgent, documentation | Minutes | High | Low |
| In-App | Feature updates, status | Real-time | Medium | None |
| SMS | Critical alerts, 2FA | Seconds | High | Medium |
| Push Notification | Mobile alerts | Seconds | Medium | Low |
| Webhook | System integration | Real-time | High | None |
| Slack/Teams | Team collaboration | Real-time | Medium | Integration |
| Voice Call | Emergency escalation | Immediate | High | High |

### 2. Map Channels to Message Types

Define channel routing by message category:

| Message Type | Primary Channel | Fallback Channel | Tier Availability |
|--------------|-----------------|------------------|-------------------|
| Critical Security | SMS + Email | Voice Call | All tiers |
| System Outage | In-App + Email | SMS (Enterprise) | All tiers |
| Maintenance Window | Email | In-App | All tiers |
| Billing Alert | Email | In-App | All tiers |
| Feature Update | In-App | Email digest | All tiers |
| API Deprecation | Email + Webhook | In-App | Pro + Enterprise |
| Usage Warning | In-App + Email | Webhook | Pro + Enterprise |
| Custom Webhook | Webhook | Email | Enterprise only |

### 3. Design Channel Architecture

Specify channel implementation requirements:

| Component | Specification | Scaling Strategy |
|-----------|---------------|------------------|
| Email Service | Transactional email provider (SendGrid, SES) | Queue-based |
| In-App Engine | WebSocket + REST fallback | Horizontal scaling |
| SMS Gateway | Twilio, MessageBird | Rate-limited queues |
| Webhook Delivery | Retry with exponential backoff | Worker pool |
| Push Service | Firebase, APNs | Platform-native |

### 4. Define Delivery SLAs

Establish delivery time guarantees:

| Urgency Level | Delivery Target | Retry Policy | Escalation |
|---------------|-----------------|--------------|------------|
| Critical | < 1 minute | 3 retries, 30s intervals | Voice after 5 min |
| High | < 5 minutes | 5 retries, 1 min intervals | SMS after 15 min |
| Medium | < 1 hour | 3 retries, 10 min intervals | None |
| Low | < 24 hours | Daily digest batching | None |

### 5. Plan Multi-Channel Orchestration

Design channel coordination:

| Scenario | Channel Sequence | Timing |
|----------|------------------|--------|
| P1 Incident | In-App + SMS + Email (parallel) | Immediate |
| Maintenance | Email (7 days) -> In-App (1 day) -> Email (1 hour) | Staged |
| Feature Launch | In-App banner -> Email announcement -> Webhook | Sequential |
| Billing Due | Email (30 days) -> Email (7 days) -> In-App (1 day) | Escalating |

### 6. Define Tenant-Specific Routing

Document per-tenant customization:

| Tenant Type | Channel Access | Custom Routing |
|-------------|----------------|----------------|
| Free | Email, In-App | None |
| Pro | Email, In-App, Webhook | Basic rules |
| Enterprise | All channels | Full customization |

**Verify current best practices with web search:**
Search the web: "multi-channel notification architecture SaaS {date}"
Search the web: "notification delivery reliability patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the channel design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific channel implementation
- **P (Party Mode)**: Bring DevOps, product, and UX perspectives on channels
- **C (Continue)**: Accept channel design and proceed to create message templates
- **[Specific refinements]**: Describe channel concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: channel specifications, delivery SLAs, routing rules
- Process enhanced insights on notification channels
- Ask user: "Accept these refined channel decisions? (y/n)"
- If yes, integrate into channel design document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review notification channel design for multi-tenant AI platform"
- Process DevOps, product, and UX perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save notification channel design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-create-message-templates.md`

---

## Verification

- [ ] All notification channels defined
- [ ] Channel-to-message mapping complete
- [ ] Channel architecture specified
- [ ] Delivery SLAs established
- [ ] Multi-channel orchestration planned
- [ ] Tenant-specific routing documented

---

## Outputs

- Notification channel design document
- Channel routing matrix
- Delivery SLA specifications
- **Load template:** `{project-root}/_bmad/bam/data/templates/notification-channel-template.md`

---

## Next Step

Proceed to `step-03-c-create-message-templates.md` to design reusable message templates.
