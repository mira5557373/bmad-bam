# Step 3: Configure Tier-Specific Options

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

Map all configuration options to tenant tiers, defining what's available and configurable at each tier level.

---

## Prerequisites

- Admin features designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `customization`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Configure tier-specific options:

---

## Portal Feature Matrix

| Feature | FREE | PRO | ENTERPRISE |
|---------|------|-----|------------|
| User Seats | 5 | 50 | Unlimited |
| API Keys | 2 | 10 | Unlimited |
| Workspaces | 1 | 5 | Unlimited |
| Audit Log Retention | None | 30 days | 1 year |
| Custom Branding | No | Logo only | Full |
| White-Label | No | No | Yes |
| SSO | No | No | Yes |
| Custom Domain | No | No | Yes |

---

## Customization Options

| Option | FREE | PRO | ENTERPRISE |
|--------|------|-----|------------|
| Theme Color | Default | 5 presets | Any color |
| Logo Upload | No | Yes | Yes |
| Email Templates | Default | Default | Custom |
| Dashboard Layout | Fixed | Fixed | Configurable |
| Report Branding | Platform | Tenant name | Full custom |

---

## Security Options

| Option | FREE | PRO | ENTERPRISE |
|--------|------|-----|------------|
| MFA Enforcement | Optional | Configurable | Configurable |
| Password Policy | Default | 3 presets | Custom |
| Session Timeout | 24 hours | Configurable | Configurable |
| IP Restrictions | No | No | Yes |
| Data Export | Manual | Scheduled | API + Scheduled |

---

## Support Options

| Option | FREE | PRO | ENTERPRISE |
|--------|------|-----|------------|
| Documentation | Yes | Yes | Yes |
| Community Forum | Yes | Yes | Yes |
| Email Support | No | Yes | Yes |
| Chat Support | No | No | Yes |
| Phone Support | No | No | Yes |
| Dedicated CSM | No | No | Yes |
| SLA | None | 24h response | 4h response |

---

## Upgrade Prompts

Define when and how to show upgrade prompts:

| Trigger | Current Tier | Prompt Type |
|---------|--------------|-------------|
| Hit user limit | FREE | Modal + email |
| API key limit reached | FREE/PRO | Inline banner |
| Feature blocked | FREE/PRO | Feature gate modal |
| Storage 80% used | Any | Notification |
| Approaching rate limit | FREE | Dashboard alert |

**Verify current best practices with web search:**
Search the web: "SaaS tier feature differentiation tenant lifecycle {date}"
Search the web: "pricing tier UX multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tier options above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tier differentiation
- **P (Party Mode)**: Bring analyst and architect perspectives for tier review
- **C (Continue)**: Accept tier options and proceed to billing integration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass tier context: feature matrix, customization, security, support
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into tier options
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tier options: {summary of feature matrix}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tier options to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-billing-integration.md`

---

## Verification

- [ ] Portal feature matrix complete
- [ ] Customization options mapped
- [ ] Security options defined
- [ ] Support options documented
- [ ] Upgrade prompts designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete tier feature matrix
- Upgrade prompt specifications

---

## Next Step

Proceed to `step-04-c-design-billing-integration.md` to design billing integration.
