# Step 8: Tenant Branding

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

Design tenant-specific branding for notifications including brand assets, template customization, and approval workflows.

---

## Prerequisites

- Step 7 completed with escalation rules
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `white-label`

---


## Inputs

- Escalation rules from Step 7
- Template management from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Design the tenant branding system:

### Brand Asset Schema

| Asset | Type | Constraints | Default |
|-------|------|-------------|---------|
| logo_primary | image | PNG/SVG, max 500KB, transparent BG | Platform logo |
| logo_icon | image | PNG/SVG, max 100KB, square | Platform icon |
| favicon | image | ICO/PNG, 32x32 or 64x64 | Platform favicon |
| primary_color | hex | Valid hex color | #007bff |
| secondary_color | hex | Valid hex color | #6c757d |
| accent_color | hex | Valid hex color | #28a745 |
| text_color | hex | Valid hex color | #212529 |
| background_color | hex | Valid hex color | #ffffff |
| font_family | string | Google Fonts or web-safe | System default |
| company_name | string | Max 100 chars | Platform name |
| tagline | string | Max 200 chars | null |
| social_links | jsonb | Twitter, LinkedIn, etc. | null |
| support_email | email | Valid email | Platform support |
| support_url | url | Valid URL | Platform help |
| terms_url | url | Valid URL | Platform terms |
| privacy_url | url | Valid URL | Platform privacy |

### Template Customization

| Customization Level | Description | Tier Availability |
|--------------------|-------------|-------------------|
| None | Platform default branding | Free |
| Basic | Logo and colors only | Pro |
| Advanced | Full brand customization | Enterprise |
| Custom Templates | Tenant-specific templates | Enterprise+ |
| White Label | Remove platform branding | Enterprise+ |

**Template Brand Injection:**

| Template Section | Brand Variables | Override Level |
|-----------------|-----------------|----------------|
| Header | logo_primary, company_name | Tenant |
| Footer | company_name, support_email, social_links | Tenant |
| Button | primary_color, text_color | Tenant |
| Body | text_color, background_color, font_family | Tenant |
| Legal Links | terms_url, privacy_url | Tenant or Platform |

### Brand Inheritance

```
Platform Defaults
    │
    └── Tenant Brand Settings
            │
            ├── Email Templates
            │   └── Template-specific overrides
            │
            ├── Push Notifications
            │   └── Icon and color overrides
            │
            └── In-App Notifications
                └── Theme integration
```

**Inheritance Rules:**
- Tenant settings override platform defaults
- Template-specific settings override tenant settings
- Missing values fall back to parent level
- White-label removes platform branding entirely

### Brand Preview and Approval

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Live Preview | Real-time brand preview | Client-side rendering |
| Email Preview | Preview branded email | Render with test data |
| Push Preview | Preview push notification | Device mockup |
| Brand Approval | Admin approval workflow | Status: draft → pending → approved |
| Version History | Track brand changes | Audit trail |

**Brand Approval Workflow:**

| State | Description | Actions |
|-------|-------------|---------|
| draft | Brand being edited | Save, Preview |
| pending_review | Submitted for approval | Approve, Reject, Comment |
| approved | Ready to use | Publish, Archive |
| active | Currently in use | Edit (creates draft) |
| archived | Previous version | View, Restore |

### Brand Consistency Validation

| Check | Rule | Severity |
|-------|------|----------|
| Logo Resolution | Min 200x200 pixels | Warning |
| Color Contrast | WCAG AA compliance | Error |
| Font Availability | Google Fonts available | Warning |
| URL Validation | URLs accessible | Error |
| Email Validation | MX records exist | Error |
| File Size | Under max size | Error |

**Verify current best practices with web search:**
Search the web: "white label SaaS branding best practices {date}"
Search the web: "email template branding customization {date}"
Search the web: "brand asset management multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant branding design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into branding customization and white-label options
- **P (Party Mode)**: Bring analyst and architect perspectives for branding review
- **C (Continue)**: Accept tenant branding design and proceed to documentation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass branding context: assets, customization, approval workflow
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into branding design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant branding: {summary of assets and customization}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant branding design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]`
- Proceed to next step: `step-09-c-documentation.md`

---

## Verification

- [ ] Brand asset schema defined
- [ ] Customization levels documented
- [ ] Brand inheritance model specified
- [ ] Preview capabilities designed
- [ ] Approval workflow defined
- [ ] Validation rules documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Brand asset specifications
- Customization tier matrix
- Approval workflow design

---

## Next Step

Proceed to `step-09-c-documentation.md` to create system documentation.
