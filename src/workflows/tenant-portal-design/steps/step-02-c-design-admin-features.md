# Step 2: Design Tenant Admin Features

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

Design features available exclusively to tenant administrators for managing their organization.

---

## Prerequisites

- Self-service capabilities defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design tenant admin features:

---

## User Management

| Feature | Description | Tier Availability |
|---------|-------------|-------------------|
| Invite Users | Send email invitations | All tiers |
| Bulk Import | CSV user import | PRO, ENTERPRISE |
| Role Assignment | Assign predefined roles | All tiers |
| Custom Roles | Create custom role definitions | ENTERPRISE |
| Deactivate User | Disable user access | All tiers |
| Remove User | Permanently remove from tenant | All tiers |
| View Activity | User activity log | PRO, ENTERPRISE |

---

## Billing Management

| Feature | Description | Tier Availability |
|---------|-------------|-------------------|
| View Plan | Current subscription details | All tiers |
| Upgrade Plan | Self-service upgrade | FREE, PRO |
| Downgrade Plan | Request downgrade | PRO (with approval) |
| Payment Methods | Add/update payment methods | PRO, ENTERPRISE |
| Invoice History | Download past invoices | All tiers |
| Usage Reports | Detailed usage breakdown | PRO, ENTERPRISE |
| Budget Alerts | Set spending limits | ENTERPRISE |

---

## Security Settings

| Feature | Description | Tier Availability |
|---------|-------------|-------------------|
| MFA Policy | Require MFA for all users | PRO, ENTERPRISE |
| Password Policy | Set complexity requirements | PRO, ENTERPRISE |
| Session Timeout | Configure session duration | PRO, ENTERPRISE |
| IP Allowlist | Restrict access by IP | ENTERPRISE |
| SSO Configuration | SAML/OIDC setup | ENTERPRISE |
| Domain Verification | Verify email domains | ENTERPRISE |

---

## Audit Logs

| Feature | Description | Tier Availability |
|---------|-------------|-------------------|
| View Logs | Access audit log viewer | PRO, ENTERPRISE |
| Search Logs | Filter by user, action, date | PRO, ENTERPRISE |
| Export Logs | Download log data | ENTERPRISE |
| Retention Period | 30 days (PRO), 1 year (ENT) | Varies |
| Alert Rules | Notify on specific events | ENTERPRISE |

---

## Integration Management

| Feature | Description | Tier Availability |
|---------|-------------|-------------------|
| Webhook Config | Configure webhook endpoints | PRO, ENTERPRISE |
| API Permissions | Manage API key scopes | All tiers |
| OAuth Apps | Register OAuth applications | ENTERPRISE |
| SSO Providers | Configure identity providers | ENTERPRISE |
| Data Connectors | Third-party integrations | ENTERPRISE |

**Verify current best practices with web search:**
Search the web: "tenant admin portal features tenant lifecycle {date}"
Search the web: "admin console design multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the admin features above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into admin feature requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for admin review
- **C (Continue)**: Accept admin features and proceed to tier configuration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass admin context: user management, billing, security, audit
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into admin features
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review admin features: {summary of capabilities by category}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save admin features to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-tier-options.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the portal foundation design.**

Present summary of:
- Self-service capabilities defined in Step 1
- Admin features catalog with tier availability matrix
- Security settings and audit log configurations

Ask for confirmation before proceeding to tier options configuration.

---

## Verification

- [ ] User management defined
- [ ] Billing management defined
- [ ] Security settings defined
- [ ] Audit logs defined
- [ ] Integration management defined
- [ ] Tier availability mapped
- [ ] Patterns align with pattern registry

---

## Outputs

- Admin feature catalog
- Feature-tier availability matrix
- **Load template:** `{project-root}/_bmad/bam/templates/admin-portal-ux-template.md`

---

## Next Step

Proceed to `step-03-c-configure-tier-options.md` to configure tier-specific options.
