# Step 4: Tenant Preferences

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

Design the tenant notification preferences system including tenant-level settings, user-level overrides, and channel opt-in/opt-out management.

---

## Prerequisites

- Step 3 completed with template management
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `compliance`

---


## Inputs

- Template management design from Step 3
- Notification requirements from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Design the notification preferences system:

### Tenant-Level Settings Schema

| Setting | Type | Description | Default |
|---------|------|-------------|---------|
| default_language | string | Default notification language | en-US |
| timezone | string | Tenant timezone | UTC |
| email_from_name | string | Sender name for emails | Platform |
| email_from_address | string | Sender address (verified domain) | notifications@{tenant}.app |
| sms_enabled | boolean | Enable SMS notifications | false (tier-dependent) |
| push_enabled | boolean | Enable push notifications | true |
| marketing_enabled | boolean | Allow marketing notifications | false |
| quiet_hours_start | time | Do not disturb start | null |
| quiet_hours_end | time | Do not disturb end | null |
| digest_frequency | enum | Batch notification frequency | immediate |
| branding_enabled | boolean | Use tenant branding | true |

### User-Level Preference Schema

| Setting | Type | Description | Default |
|---------|------|-------------|---------|
| language | string | User language preference | Inherit from tenant |
| timezone | string | User timezone | Inherit from tenant |
| email_notifications | boolean | Receive email | true |
| sms_notifications | boolean | Receive SMS | false |
| push_notifications | boolean | Receive push | true |
| in_app_notifications | boolean | Receive in-app | true |
| quiet_hours_enabled | boolean | Enable quiet hours | Inherit from tenant |
| digest_mode | boolean | Receive digests vs immediate | false |

### Category-Level Preferences

| Category | Email | SMS | Push | In-App | Opt-out Allowed |
|----------|-------|-----|------|--------|-----------------|
| Transactional | Enabled | User choice | Disabled | Enabled | No |
| Marketing | User choice | User choice | User choice | User choice | Yes |
| Security | Enabled | User choice | Enabled | Enabled | No |
| System | Enabled | Disabled | User choice | Enabled | Partial |
| Billing | Enabled | User choice | User choice | Enabled | No |
| AI Agent | User choice | Disabled | Enabled | Enabled | Yes |

### Preference Inheritance Model

```
System Defaults
    └── Tenant Settings (override system)
            └── User Preferences (override tenant)
                    └── Category-specific (override user)
```

**Resolution Logic:**
1. Check category-specific user preference
2. Fall back to user general preference
3. Fall back to tenant setting
4. Fall back to system default

### Opt-In/Opt-Out Management

| Channel | Opt-In Required | Opt-Out Mechanism | Regulatory |
|---------|-----------------|-------------------|------------|
| Email Marketing | Yes (GDPR) | Unsubscribe link | CAN-SPAM |
| SMS Any | Yes (TCPA) | STOP keyword | TCPA |
| Push | Yes (OS permission) | App settings | None |
| In-App | Implicit | In-app toggle | None |

**Consent Tracking:**
- Store consent timestamp and source
- Track consent version for re-consent flows
- Maintain audit trail for compliance

**Verify current best practices with web search:**
Search the web: "notification preferences design patterns SaaS {date}"
Search the web: "user notification settings UX best practices {date}"
Search the web: "consent management notification systems {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-4 complete the core notification infrastructure design.**

Present a summary of:
- Notification categories and requirements
- Channel architecture
- Template management system
- Tenant and user preferences

Ask for confirmation before proceeding to delivery infrastructure, tracking, and branding.

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant preferences design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into preference inheritance and consent management
- **P (Party Mode)**: Bring analyst and architect perspectives for preferences review
- **C (Continue)**: Accept tenant preferences design and proceed to delivery infrastructure
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass preferences context: tenant settings, user preferences, consent tracking
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into preferences design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant preferences: {summary of settings and inheritance model}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant preferences design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-delivery-infrastructure.md`

---

## Verification

- [ ] Tenant-level settings defined
- [ ] User-level preferences defined
- [ ] Category preferences documented
- [ ] Inheritance model specified
- [ ] Opt-in/opt-out mechanisms designed
- [ ] Consent tracking specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant preferences schema
- User preferences schema
- Consent tracking design

---

## Next Step

Proceed to `step-05-c-delivery-infrastructure.md` to design notification delivery system.
