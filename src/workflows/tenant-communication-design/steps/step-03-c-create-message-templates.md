# Step 3: Create Message Templates

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

Design reusable, localized, and brand-compliant message templates for all tenant communication categories, ensuring consistency and maintainability across all channels.

---

## Prerequisites

- Step 2 (Design Notification Channels) completed
- Notification channel design document available
- Brand guidelines and style guide
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: message-templates
- **Web research (if available):** Search for current notification template best practices

---

## Inputs

- Notification channel design from Step 2
- Communication categories from Step 1
- Brand guidelines
- Localization requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Template Categories

Establish template organization structure:

| Category | Template Count | Variables | Localization |
|----------|----------------|-----------|--------------|
| System Status | 5-10 | status, timestamp, duration | Required |
| Security Alerts | 8-12 | severity, action, details | Required |
| Billing | 10-15 | amount, due_date, invoice | Required |
| Feature Updates | 5-8 | feature_name, version, docs_link | Required |
| Onboarding | 6-10 | tenant_name, next_step | Required |
| Compliance | 4-6 | regulation, deadline, action | Required |
| Support | 5-8 | ticket_id, status, agent | Required |

### 2. Design Template Structure

Define standard template components:

| Component | Purpose | Required |
|-----------|---------|----------|
| Header | Brand identity, message type | Yes |
| Subject/Title | Clear, actionable summary | Yes |
| Body | Main content with variables | Yes |
| Call to Action | Primary action button/link | Context-dependent |
| Footer | Contact info, unsubscribe | Yes |
| Metadata | Timestamp, message ID | Yes |

### 3. Establish Variable Standards

Define template variable conventions:

| Variable Type | Syntax | Example |
|---------------|--------|---------|
| Simple | `{{variable_name}}` | `{{tenant_name}}` |
| Formatted | `{{variable\|format}}` | `{{amount\|currency}}` |
| Conditional | `{{#if condition}}...{{/if}}` | `{{#if is_enterprise}}...{{/if}}` |
| Loop | `{{#each items}}...{{/each}}` | `{{#each affected_services}}...{{/each}}` |
| Default | `{{variable\|default:value}}` | `{{contact_name\|default:Admin}}` |

### 4. Create Core Templates

Document template specifications for each category:

| Template ID | Category | Subject Pattern | Channels |
|-------------|----------|-----------------|----------|
| SYS-001 | System | [{{severity}}] System Status Update | Email, In-App, SMS |
| SYS-002 | System | Scheduled Maintenance: {{date}} | Email, In-App |
| SEC-001 | Security | [URGENT] Security Alert Requires Action | All |
| SEC-002 | Security | Password Reset Confirmation | Email |
| BIL-001 | Billing | Invoice #{{invoice_id}} Now Available | Email |
| BIL-002 | Billing | Payment Reminder: {{amount}} Due {{date}} | Email, SMS |
| FTR-001 | Feature | New Feature: {{feature_name}} | In-App, Email |
| FTR-002 | Feature | Deprecation Notice: {{feature_name}} | Email |
| ONB-001 | Onboarding | Welcome to {{platform_name}}! | Email |
| ONB-002 | Onboarding | Complete Your Setup: {{next_step}} | Email, In-App |

### 5. Define Localization Strategy

Establish localization approach:

| Aspect | Strategy | Implementation |
|--------|----------|----------------|
| Language Detection | Tenant preference -> Browser locale -> Default | Ordered fallback |
| Translation Storage | JSON files per locale | i18n framework |
| Variable Formatting | Locale-aware date/currency | ICU Message Format |
| RTL Support | CSS/HTML direction switching | Auto-detect |
| Fallback | English (en-US) | Always available |

### 6. Specify Tier-Based Customization

Define customization by tier:

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Custom Logo | No | Yes | Yes |
| Custom Colors | No | Limited | Full |
| Custom Footer | No | No | Yes |
| Custom Domain | No | No | Yes |
| Co-branding | No | No | Yes |
| Template Override | No | No | Limited |

**Verify current best practices with web search:**
Search the web: "notification template design patterns {date}"
Search the web: "email template localization best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the template design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific template categories
- **P (Party Mode)**: Bring UX, content, and i18n perspectives on templates
- **C (Continue)**: Accept template design and proceed to implement preferences
- **[Specific refinements]**: Describe template concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: template categories, variable standards, localization strategy
- Process enhanced insights on template design
- Ask user: "Accept these refined template decisions? (y/n)"
- If yes, integrate into template design document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review message template design for multi-tenant AI platform"
- Process UX, content, and i18n perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save message template design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-implement-tenant-preferences.md`

---

## Verification

- [ ] Template categories defined
- [ ] Template structure standardized
- [ ] Variable conventions established
- [ ] Core templates documented
- [ ] Localization strategy specified
- [ ] Tier-based customization defined

---

## Outputs

- Message template catalog
- Variable specification document
- Localization requirements
- **Load template:** `{project-root}/_bmad/bam/templates/message-template-catalog.md`

---

## Next Step

Proceed to `step-04-c-implement-tenant-preferences.md` to design tenant preference management.
