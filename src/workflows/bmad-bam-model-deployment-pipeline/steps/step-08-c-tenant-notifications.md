# Step 8: Design Tenant Notifications

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the tenant communication workflow for model deployments including pre-deployment notifications, rollout progress updates, rollback notifications, and change log distribution.

---

## Prerequisites

- Steps 1-7 completed with monitoring configured
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `event-driven`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Deployment configuration from Steps 1-7
- Tenant communication requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Configure Pre-Deployment Notifications

| Notification | Timing | Channel | Recipients | Content |
|--------------|--------|---------|------------|---------|
| Release Announcement | 7 days before | Email | Admins | Release notes, timeline |
| Deployment Scheduled | 24 hours before | Email + In-App | Admins + Devs | Exact window, impact |
| Deployment Starting | 1 hour before | Email + Webhook | All stakeholders | Final confirmation |
| Opt-Out Reminder | 3 days before | Email | Enterprise admins | Opt-out instructions |

Template structure:

```
Subject: [Model Update] {{model_name}} v{{version}} - {{action}}

Hi {{admin_name}},

{{context_paragraph}}

Timeline:
- Deployment Window: {{start_time}} to {{end_time}} ({{timezone}})
- Your Tier: {{tenant_tier}}
- Rollout Phase: {{phase}} ({{phase_description}})

What's New:
{{release_notes_summary}}

Expected Impact:
{{impact_description}}

Actions Required:
{{action_items}}

Questions? Contact {{support_link}}
```

### 2. Design Rollout Progress Updates

| Event | Trigger | Channel | Content |
|-------|---------|---------|---------|
| Phase Started | Canary begins for tier | Webhook | Phase number, % traffic |
| Phase Complete | Phase promotion | Webhook + In-App | Success confirmation |
| Deployment Complete | 100% traffic | Email + In-App | Full rollout confirmed |
| Experiment Results | A/B complete | Email | Winning variant, metrics |

Webhook payload schema:

| Field | Type | Description |
|-------|------|-------------|
| event_type | String | `deployment.phase.started`, `deployment.complete` |
| tenant_id | UUID | Tenant identifier |
| model_name | String | Model being deployed |
| model_version | String | New version number |
| previous_version | String | Previous version |
| phase | Integer | Current deployment phase |
| traffic_percentage | Float | Current traffic allocation |
| timestamp | ISO8601 | Event timestamp |
| status | Enum | `in_progress`, `completed`, `rolled_back` |

### 3. Configure Rollback Notifications

| Notification | Trigger | Channel | Priority |
|--------------|---------|---------|----------|
| Rollback Initiated | Auto/manual rollback | Email + SMS + Webhook | Critical |
| Rollback Complete | Version reverted | Email + Webhook | High |
| Service Restored | Metrics stable | In-App | Normal |
| Incident Report | Post-mortem ready | Email | Normal |

Rollback notification template:

```
URGENT: Model Rollback in Progress

Tenant: {{tenant_name}}
Model: {{model_name}}
Rolling back from: v{{new_version}}
Rolling back to: v{{previous_version}}

Reason: {{rollback_reason}}

Status: {{rollback_status}}
Estimated Completion: {{eta}}

Current Impact:
- {{impact_item_1}}
- {{impact_item_2}}

Next Update: {{next_update_time}}

Support Hotline: {{support_phone}}
Status Page: {{status_page_url}}
```

### 4. Establish Change Log Distribution

| Distribution Channel | Frequency | Content | Audience |
|---------------------|-----------|---------|----------|
| Release Notes Portal | Per release | Full changelog | All users |
| API Changelog | Per release | API changes only | Developers |
| Email Digest | Weekly | Summary of changes | Admins |
| RSS Feed | Per release | Headlines | Subscribers |

Change log structure:

| Section | Content |
|---------|---------|
| Version | v{{version}} ({{date}}) |
| Highlights | Key improvements |
| New Features | Feature descriptions |
| Improvements | Performance/quality gains |
| Bug Fixes | Resolved issues |
| Breaking Changes | Migration requirements |
| Deprecations | Upcoming removals |
| API Changes | Endpoint modifications |

**Verify current best practices with web search:**
Search the web: "SaaS release communication best practices {date}"
Search the web: "webhook notification patterns {date}"
Search the web: "customer communication during deployment {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant notification design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into notification strategy and template design
- **P (Party Mode)**: Bring analyst and architect perspectives for notification review
- **C (Continue)**: Accept tenant notification design and proceed to documentation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass notification context: channels, templates, timing
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into notification design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant notifications: {summary of channels and templates}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant notification design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-documentation.md`

---

## Verification

- [ ] Pre-deployment notifications configured
- [ ] Rollout progress updates designed
- [ ] Rollback notifications established
- [ ] Change log distribution defined
- [ ] Templates created for all scenarios
- [ ] Patterns align with pattern registry

---

## Outputs

- Notification workflow specification
- Email/webhook templates
- Change log structure
- Distribution configuration

---

## Next Step

Proceed to `step-09-c-documentation.md` to create deployment documentation.
