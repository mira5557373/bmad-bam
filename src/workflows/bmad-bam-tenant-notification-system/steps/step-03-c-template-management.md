# Step 3: Template Management

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

Design the notification template system including versioning, personalization, multi-language support, and testing capabilities.

---

## Prerequisites

- Step 2 completed with channel design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `compliance`

---


## Inputs

- Channel design from Step 2
- Notification requirements from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Design the template management system:

### Template Structure

| Component | Description | Storage | Versioning |
|-----------|-------------|---------|------------|
| System Templates | Platform-provided defaults | Database/S3 | Semantic versioning |
| Tenant Templates | Tenant customizations | Database with tenant_id | Per-tenant versioning |
| Draft Templates | Work-in-progress | Database with status | Auto-save |

**Template Schema:**

| Field | Type | Description |
|-------|------|-------------|
| template_id | UUID | Unique identifier |
| tenant_id | UUID | Null for system templates |
| name | string | Human-readable name |
| category | enum | Notification category |
| channel | enum | email, sms, push, in_app |
| subject | string | Subject line (email/push title) |
| body_html | text | HTML content (email) |
| body_text | text | Plain text content |
| variables | jsonb | Required variables schema |
| locale | string | ISO locale code |
| version | string | Semantic version |
| status | enum | draft, active, archived |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last modification |

### Template Variables

Define standard variables available in all templates:

| Variable | Scope | Description | Example |
|----------|-------|-------------|---------|
| `{{user.first_name}}` | User | User's first name | John |
| `{{user.email}}` | User | User's email | john@example.com |
| `{{tenant.name}}` | Tenant | Organization name | Acme Corp |
| `{{tenant.brand.logo_url}}` | Tenant | Logo URL | https://... |
| `{{app.name}}` | System | Application name | Platform |
| `{{app.support_email}}` | System | Support contact | support@... |
| `{{notification.cta_url}}` | Context | Action URL | https://... |
| `{{notification.timestamp}}` | Context | Event timestamp | 2026-04-10 |

### Multi-Language Support

| Language Model | Description | Pros | Cons |
|----------------|-------------|------|------|
| Separate Templates | One template per locale | Full control | More maintenance |
| Inline Translations | i18n keys in template | Single source | Complex parsing |
| Translation Service | Dynamic translation | Scalable | Quality concerns |

**Recommended:** Separate templates per locale with fallback to default (en-US).

**Language Selection Logic:**
1. User preference (if set)
2. Tenant default language
3. Browser/device locale
4. System default (en-US)

### Template Testing and Preview

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Preview | Render template with sample data | API endpoint with test data |
| Send Test | Send to single recipient | Test mode flag |
| Variable Validation | Check required variables | Schema validation |
| Rendering Test | Ensure no errors | Dry-run mode |
| A/B Variants | Test different versions | Variant tagging |

**Verify current best practices with web search:**
Search the web: "email template management system design {date}"
Search the web: "notification template personalization patterns {date}"
Search the web: "multi-language notification templates i18n {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the template management design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into template versioning and localization strategies
- **P (Party Mode)**: Bring analyst and architect perspectives for template review
- **C (Continue)**: Accept template management design and proceed to tenant preferences
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass template context: structure, variables, localization
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into template management
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review template management: {summary of structure and localization}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save template management design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-tenant-preferences.md`

---

## Verification

- [ ] Template structure defined
- [ ] Variables schema documented
- [ ] Multi-language support designed
- [ ] Testing capabilities specified
- [ ] Versioning strategy defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Template schema specification
- Variables catalog
- Localization strategy

---

## Next Step

Proceed to `step-04-c-tenant-preferences.md` to design tenant notification preferences.
