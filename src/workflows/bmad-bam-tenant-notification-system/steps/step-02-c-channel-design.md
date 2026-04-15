# Step 2: Channel Design (Email/SMS/Push/In-App)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Design the communication channels for the notification system including email, SMS, push notifications, and in-app messaging with tenant isolation.

---

## Prerequisites

- Step 1 completed with notification requirements
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`

---


## Inputs

- Notification requirements from Step 1
- Tenant model isolation requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Design each communication channel with tenant isolation:

### Email Channel

| Component | Provider Options | Tenant Isolation | Notes |
|-----------|-----------------|------------------|-------|
| Transactional Email | SendGrid, AWS SES, Postmark | Tenant-specific sender domains, reply-to | Per-tenant deliverability tracking |
| Marketing Email | SendGrid Marketing, Mailchimp | Tenant-specific lists and segments | CAN-SPAM compliance per tenant |
| Dedicated IP | Optional per Enterprise tenant | Isolated sender reputation | Tier-specific feature |

**Email Infrastructure:**
- Sender domain authentication (SPF, DKIM, DMARC) per tenant custom domain
- Bounce and complaint handling per tenant
- Email validation before send
- Suppression list management per tenant

### SMS Channel

| Component | Provider Options | Tenant Isolation | Notes |
|-----------|-----------------|------------------|-------|
| Transactional SMS | Twilio, AWS SNS, Vonage | Tenant-specific sender ID or shortcode | OTP, alerts |
| Marketing SMS | Twilio, Attentive | Tenant-specific opt-in lists | TCPA compliance |
| 10DLC Registration | Required for US A2P | Per-brand registration | Regulatory requirement |

**SMS Infrastructure:**
- Number provisioning per tenant (Enterprise tier)
- Consent tracking and opt-out management
- Delivery receipt tracking
- Rate limiting per tenant

### Push Notifications

| Component | Provider Options | Tenant Isolation | Notes |
|-----------|-----------------|------------------|-------|
| Mobile Push | FCM, APNs, OneSignal | Tenant-scoped device tokens | iOS and Android |
| Web Push | FCM, OneSignal | Tenant-scoped subscriptions | Browser notifications |
| Desktop Push | Electron notifications | Tenant context in payload | Desktop apps |

**Push Infrastructure:**
- Device token storage with tenant_id
- Topic/channel management per tenant
- Silent vs visible push configuration
- Badge count management per user

### In-App Notifications

| Component | Technology Options | Tenant Isolation | Notes |
|-----------|-------------------|------------------|-------|
| Real-time | WebSocket, Socket.io, SSE | Tenant-scoped channels | Live updates |
| Notification Center | REST API + polling | Tenant_id filter on queries | Notification inbox |
| Toasts/Banners | Client-side library | Tenant context in JWT | Ephemeral alerts |

**In-App Infrastructure:**
- WebSocket connection with tenant context
- Notification persistence and read state
- Notification grouping and batching
- Deep linking support

**Channel Selection Matrix:**

| Notification Type | Email | SMS | Push | In-App |
|-------------------|-------|-----|------|--------|
| Password Reset | Required | Optional | No | No |
| Order Confirmation | Required | Optional | Optional | Yes |
| Security Alert | Required | Optional | Yes | Yes |
| Marketing | Optional | Optional | Optional | Optional |
| System Maintenance | Required | No | Optional | Yes |
| AI Task Complete | Optional | No | Yes | Required |

**Verify current best practices with web search:**
Search the web: "notification channel architecture multi-tenant {date}"
Search the web: "email deliverability best practices SaaS {date}"
Search the web: "push notification infrastructure patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the channel design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into channel-specific requirements and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for channel review
- **C (Continue)**: Accept channel design and proceed to template management
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass channel context: email, SMS, push, in-app configurations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into channel design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review channel design: {summary of channels and tenant isolation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save channel design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-template-management.md`

---

## Verification

- [ ] Email channel designed with tenant isolation
- [ ] SMS channel designed with consent tracking
- [ ] Push notification infrastructure defined
- [ ] In-app notification system designed
- [ ] Channel selection matrix completed
- [ ] Patterns align with pattern registry

---

## Outputs

- Channel architecture specifications
- Provider selection recommendations
- Tenant isolation design per channel

---

## Next Step

Proceed to `step-03-c-template-management.md` to design notification templates.
