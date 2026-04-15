# Step 7: Plan Feature Announcements

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

Design the feature announcement workflow for communicating new capabilities, updates, deprecations, and breaking changes to tenants, ensuring smooth adoption and minimal disruption.

---

## Prerequisites

- Step 6 (Design Incident Communication) completed
- Incident communication design document available
- Product roadmap and release schedule
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: feature-announcements
- **Web research (if available):** Search for feature announcement best practices

---

## Inputs

- Incident communication design from Step 6
- Product roadmap
- Feature flag strategy
- Tenant tier definitions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Announcement Categories

Establish feature communication types:

| Category | Description | Lead Time | Channels |
|----------|-------------|-----------|----------|
| New Feature | Net-new capability | 1-2 weeks | All |
| Enhancement | Improvement to existing | 3-7 days | Email, In-App |
| Deprecation | Feature being removed | 90 days minimum | Email, In-App, Webhook |
| Breaking Change | API/behavior change | 60 days minimum | Email, In-App, Webhook |
| Security Update | Security-related change | Immediate | All |
| Beta/Preview | Early access feature | 1 week | Opted-in only |

### 2. Design Announcement Timeline

Map communication points in feature lifecycle:

| Phase | Timing | Communication | Audience |
|-------|--------|---------------|----------|
| Preview | -30 days | Beta invitation | Beta testers |
| Pre-announcement | -14 days | Coming soon notice | All tenants |
| Launch | Day 0 | Full announcement | All tenants |
| Follow-up | +7 days | Tips and adoption guide | Active users |
| Review | +30 days | Feedback request | Active users |

### 3. Specify Deprecation Protocol

Document deprecation communication requirements:

| Phase | Timeline | Communication | Action Required |
|-------|----------|---------------|-----------------|
| Announce | -90 days | Deprecation notice | Review usage |
| Reminder 1 | -60 days | Migration reminder | Begin migration |
| Reminder 2 | -30 days | Urgent reminder | Complete migration |
| Final Warning | -7 days | Last call | Final migration |
| Sunset | Day 0 | Feature removed | N/A |
| Post-sunset | +1 day | Confirmation | Verify migration |

### 4. Plan Tier-Based Rollouts

Design tiered feature announcement approach:

| Tier | Early Access | Preview Features | Feature Flags |
|------|--------------|------------------|---------------|
| Free | Last wave | No | Platform-controlled |
| Pro | Second wave | Limited | Tenant-toggleable |
| Enterprise | First wave | Full access | Full control |

### 5. Design Breaking Change Communication

Specify breaking change notification requirements:

| Element | Requirement | Example |
|---------|-------------|---------|
| Notice Period | Minimum 60 days | "Effective April 1, 2027..." |
| Impact Statement | Clear scope | "All API v2 endpoints affected" |
| Migration Guide | Step-by-step | Link to documentation |
| Compatibility Mode | When possible | "v2 deprecated but functional until..." |
| Support Resources | Channels available | "Contact support for migration help" |
| Version Mapping | Old to new | "GET /v2/users -> GET /v3/users" |

### 6. Plan AI-Specific Announcements

Design AI feature communication:

| AI Feature | Communication Approach | Special Considerations |
|------------|------------------------|------------------------|
| New Model | Capability showcase, migration path | Token pricing changes |
| Model Upgrade | Performance improvements | Behavior differences |
| Model Deprecation | Extended timeline, migration | Prompt compatibility |
| New Agent Type | Use cases, quick start | Resource implications |
| Prompt Library Update | New templates available | Versioning |
| Guardrail Change | Safety improvements | Behavior impact |

### 7. Specify Announcement Templates

Document feature announcement templates:

| Template ID | Purpose | Key Variables |
|-------------|---------|---------------|
| FTR-NEW | New feature launch | feature_name, capabilities, docs_link |
| FTR-ENHANCE | Enhancement notice | feature_name, improvements |
| FTR-DEPRECATE | Deprecation notice | feature_name, sunset_date, migration_guide |
| FTR-BREAKING | Breaking change | change_summary, effective_date, action_required |
| FTR-BETA | Beta invitation | feature_name, enrollment_link, feedback_link |
| FTR-CHANGELOG | Release notes digest | version, changes, docs_link |

**Verify current best practices with web search:**
Search the web: "SaaS feature announcement best practices {date}"
Search the web: "API deprecation communication patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the feature announcement design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into deprecation protocol or tier-based rollouts
- **P (Party Mode)**: Bring product, developer relations, and marketing perspectives
- **C (Continue)**: Accept announcement design and proceed to compliance validation
- **[Specific refinements]**: Describe feature announcement concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: announcement categories, timelines, deprecation protocol
- Process enhanced insights on feature announcements
- Ask user: "Accept these refined announcement decisions? (y/n)"
- If yes, integrate into announcement design document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review feature announcement design for multi-tenant AI platform"
- Process product, developer relations, and marketing perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save feature announcement design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-validate-communication-compliance.md`

---

## Verification

- [ ] Announcement categories defined
- [ ] Announcement timeline documented
- [ ] Deprecation protocol specified
- [ ] Tier-based rollout planned
- [ ] Breaking change communication designed
- [ ] AI-specific announcements covered
- [ ] Announcement templates specified

---

## Outputs

- Feature announcement design document
- Deprecation protocol specification
- Announcement template catalog
- **Load template:** `{project-root}/_bmad/bam/data/templates/feature-announcement-template.md`

---

## Next Step

Proceed to `step-08-c-validate-communication-compliance.md` to ensure regulatory compliance.
