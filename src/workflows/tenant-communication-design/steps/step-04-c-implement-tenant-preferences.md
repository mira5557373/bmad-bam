# Step 4: Implement Tenant Preferences

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

Design the tenant preference management system for communication settings, allowing tenants to customize notification channels, frequency, and content based on their tier and compliance requirements.

---

## Prerequisites

- Step 3 (Create Message Templates) completed
- Message template catalog available
- Channel design document from Step 2
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-preferences
- **Web research (if available):** Search for notification preference management best practices

---

## Inputs

- Message template catalog from Step 3
- Notification channel design from Step 2
- Tenant tier definitions
- Compliance requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Preference Categories

Establish preference organization:

| Category | Scope | Overrideable | Mandatory |
|----------|-------|--------------|-----------|
| Channel Preferences | Per-contact | Yes | Some |
| Frequency Settings | Per-tenant | Yes | No |
| Content Preferences | Per-tenant | Yes | No |
| Timezone/Locale | Per-contact | Yes | No |
| Digest Options | Per-contact | Yes | No |
| Critical Alerts | Per-tenant | No | Yes |

### 2. Design Preference Hierarchy

Define preference inheritance model:

| Level | Description | Override Capability |
|-------|-------------|---------------------|
| Platform Default | System-wide defaults | Admin only |
| Tier Default | Per-tier baseline | Tier upgrade only |
| Tenant Setting | Tenant admin customization | Tenant admin |
| Contact Preference | Individual user preferences | User + Admin |
| Compliance Lock | Regulatory requirements | None |

Precedence: Compliance Lock > Platform Default > Tier Default > Tenant Setting > Contact Preference

### 3. Specify Configurable Options

Document available preference settings:

| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Primary Channel | Select | Email, SMS, Push, Webhook | Email |
| Fallback Channel | Select | Email, SMS, Push | None |
| Alert Frequency | Select | Immediate, Hourly, Daily | Category-based |
| Quiet Hours | Time Range | Start/End time | None |
| Timezone | Select | IANA timezone list | UTC |
| Language | Select | Supported locales | en-US |
| Digest Enabled | Boolean | Yes/No | No |
| Digest Schedule | Cron | Cron expression | Daily 9am |
| Marketing Opt-in | Boolean | Yes/No | No |

### 4. Define Non-Overrideable Settings

Specify mandatory communications:

| Communication Type | Reason | Override Allowed |
|--------------------|--------|------------------|
| Security Breach | Legal requirement | Never |
| Critical Outage | SLA requirement | Never |
| Payment Failure | Business critical | Never |
| Terms Update | Legal requirement | Never |
| Account Suspension | Business critical | Never |
| Data Export Ready | Compliance | Never |

### 5. Design Contact Management

Specify contact configuration model:

| Contact Type | Purpose | Required Fields | Optional Fields |
|--------------|---------|-----------------|-----------------|
| Primary Admin | Main tenant contact | Email, Name | Phone, Timezone |
| Billing Contact | Payment notifications | Email, Name | Phone |
| Technical Contact | API/System alerts | Email, Name | Phone, Webhook URL |
| Security Contact | Breach notifications | Email, Name | Phone (mandatory Enterprise) |
| Escalation Contact | Unacknowledged alerts | Email, Phone | Slack handle |

### 6. Plan Preference Storage

Define storage and access patterns:

| Aspect | Specification | Notes |
|--------|---------------|-------|
| Storage Model | Tenant-scoped document | JSON blob or normalized |
| Caching Strategy | Read-through cache | 5-min TTL |
| Version Control | Audit log of changes | Required for compliance |
| Encryption | At-rest and in-transit | PII protection |
| Sync Strategy | Event-driven propagation | Channel adapters |

### 7. Design Self-Service UI Requirements

Specify preference management interface:

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Basic Preferences | Yes | Yes | Yes |
| Multiple Contacts | 1 | 5 | Unlimited |
| Webhook Configuration | No | Yes | Yes |
| Custom Routing Rules | No | No | Yes |
| Audit Log Access | No | Limited | Full |
| API Access | No | Yes | Yes |

**Verify current best practices with web search:**
Search the web: "notification preference management SaaS {date}"
Search the web: "user preference system architecture patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the preference design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into preference hierarchy or storage
- **P (Party Mode)**: Bring product, UX, and compliance perspectives
- **C (Continue)**: Accept preference design and proceed to escalation paths
- **[Specific refinements]**: Describe preference concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: preference categories, hierarchy, storage patterns
- Process enhanced insights on preference management
- Ask user: "Accept these refined preference decisions? (y/n)"
- If yes, integrate into preference design document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant preference design for multi-tenant AI platform"
- Process product, UX, and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant preference design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-establish-escalation-paths.md`

---

## Verification

- [ ] Preference categories defined
- [ ] Preference hierarchy established
- [ ] Configurable options documented
- [ ] Non-overrideable settings specified
- [ ] Contact management designed
- [ ] Storage patterns planned
- [ ] Self-service UI requirements defined

---

## Outputs

- Tenant preference design document
- Contact management specification
- Preference hierarchy diagram
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-preference-template.md`

---

## Next Step

Proceed to `step-05-c-establish-escalation-paths.md` to define escalation procedures.
