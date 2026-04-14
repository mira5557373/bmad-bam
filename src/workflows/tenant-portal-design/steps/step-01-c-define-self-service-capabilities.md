# Step 1: Define Self-Service Capabilities

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Define the self-service capabilities available to all tenant users regardless of role.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `customization`

---


## Inputs

- User requirements and constraints for tenant portal design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define self-service capabilities for tenant users:

---

## Profile Management

| Feature | Description | All Users |
|---------|-------------|-----------|
| Update Profile | Name, avatar, contact info | Yes |
| Change Password | Self-service password change | Yes |
| Enable MFA | Configure personal 2FA | Yes |
| Manage Sessions | View/revoke active sessions | Yes |
| Download Personal Data | GDPR data export | Yes |

---

## Workspace Management

| Feature | Description | Access Level |
|---------|-------------|--------------|
| View Workspaces | List accessible workspaces | All users |
| Switch Workspace | Change active workspace | All users |
| Create Workspace | Create new workspace | Depends on role/tier |
| Workspace Settings | Update workspace config | Workspace admin |

---

## API Key Management

| Feature | Description | Limits |
|---------|-------------|--------|
| Generate API Key | Create new API key | Per tier limit |
| View API Keys | List active keys (masked) | Own keys only |
| Revoke API Key | Deactivate existing key | Own keys only |
| Key Permissions | Set key scope/permissions | Based on role |

---

## Notification Preferences

| Category | Options |
|----------|---------|
| Email Notifications | Daily digest, immediate, none |
| In-App Notifications | All, mentions only, none |
| Webhook Alerts | Configure webhook endpoints |
| Usage Alerts | Quota warnings, billing alerts |

---

## Usage Dashboard

| Metric | Display | Granularity |
|--------|---------|-------------|
| API Calls | Count, trend chart | Daily/monthly |
| Agent Runs | Count, success rate | Daily/monthly |
| Storage Used | GB used vs. quota | Current |
| Active Users | Count | Current |

**Verify current best practices with web search:**
Search the web: "self-service portal features tenant lifecycle {date}"
Search the web: "customer portal design multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the self-service capabilities above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into capability requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for capability review
- **C (Continue)**: Accept capabilities and proceed to admin features
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass capability context: profile, workspace, API, notifications
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into self-service capabilities
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review self-service capabilities: {summary of features}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save self-service capabilities to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-admin-features.md`

---

## Verification

- [ ] Profile management defined
- [ ] Workspace management defined
- [ ] API key management defined
- [ ] Notification preferences defined
- [ ] Usage dashboard defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Self-service capability catalog
- Feature access matrix
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-portal-template.md`

---

## Next Step

Proceed to `step-02-c-design-admin-features.md` to design tenant admin features.
