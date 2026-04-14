# Step 4: Tenant Portal Theming

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

Design the tenant portal experience with complete branding customization.

---

## Prerequisites

- Steps 1-3 completed (Assets, Theming, Domains)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `portal-customization`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- Branding assets from Step 1
- Theming system from Step 2
- Domain mapping from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Design the tenant portal experience:

## Admin Portal Customization

```yaml
admin_portal:
  branding_elements:
    header:
      logo: Tenant logo
      colors: Tenant primary
      navigation: Tenant themed
      
    sidebar:
      background: Tenant surface
      icons: Tenant primary
      active_state: Tenant primary
      
    dashboard:
      widgets: Platform default
      charts: Tenant colors
      
  customization_levels:
    FREE:
      - Logo replacement
      - Primary color only
      
    PRO:
      - Full color palette
      - Font selection
      - Favicon
      
    ENTERPRISE:
      - All PRO features
      - Custom CSS injection
      - White-label removal
      - Custom login page
```

## End-User Portal Theming

```yaml
enduser_portal:
  fully_customizable:
    - All colors and fonts
    - Logo and favicon
    - Footer content
    - Terms/privacy links
    
  platform_required:
    - Core layout structure
    - Security elements
    - Accessibility features
    
  experiences:
    login:
      background: Tenant background/image
      logo: Tenant logo centered
      form: Tenant themed inputs
      
    main_app:
      navigation: Tenant themed
      content: Tenant surface
      actions: Tenant primary
      
    onboarding:
      welcome: Tenant logo + message
      steps: Tenant progress colors
```

## Email Template Branding

```yaml
email_templates:
  categories:
    transactional:
      - Welcome email
      - Password reset
      - Invoice receipt
      - Usage alerts
      
    marketing:
      - Product updates
      - Feature announcements
      - Newsletter (if enabled)
      
  branding_elements:
    header:
      logo: Tenant logo
      background: Tenant primary
      
    body:
      font: Tenant body font (web-safe fallback)
      links: Tenant primary
      buttons: Tenant primary
      
    footer:
      company_name: Tenant name
      address: Tenant address (if provided)
      social_links: Tenant social links
      unsubscribe: Platform handled
      
  delivery:
    from_address:
      FREE: noreply@platform.com
      PRO: noreply@{tenant_slug}.platform.com
      ENTERPRISE: noreply@{custom_domain}
```

## Mobile App Theming

```yaml
mobile_theming:
  approach: Runtime theming
  
  elements:
    splash_screen:
      logo: Tenant logo
      background: Tenant primary
      
    app_icon:
      FREE: Platform icon
      PRO: Platform icon with badge
      ENTERPRISE: Tenant custom icon
      
    navigation:
      colors: Tenant themed
      icons: Default set
      
    notifications:
      icon: Tenant favicon
      accent: Tenant primary
      
  implementation:
    react_native: Theme context provider
    flutter: ThemeData injection
    native: Config file per tenant
```

## Widget/Embed Theming

```yaml
widget_theming:
  embeddable_widgets:
    - Chat widget
    - Help widget
    - Feedback widget
    - Analytics widget
    
  customization:
    position: Configurable
    colors: Tenant themed
    logo: Tenant logo
    
  isolation:
    method: Shadow DOM
    styles: Scoped to widget
    no_parent_leakage: true
    
  embed_code:
    format: JavaScript snippet
    config: Tenant token included
    version: CDN with versioning
```

## Documentation Portal

```yaml
documentation:
  branding:
    logo: Tenant logo
    colors: Tenant themed
    favicon: Tenant favicon
    
  content:
    FREE: Platform docs only
    PRO: Platform docs + custom footer
    ENTERPRISE: Full customization + custom pages
    
  domain:
    FREE: docs.platform.com/{tenant_slug}
    PRO: docs.platform.com/{tenant_slug}
    ENTERPRISE: docs.{custom_domain}
    
  features:
    search: Tenant-scoped
    analytics: Per-tenant tracking
    feedback: Tenant-branded forms
```

**Verify current best practices with web search:**
Search the web: "white-label portal design patterns {date}"
Search the web: "multi-tenant email branding best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant portal theming above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into portal requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for portal analysis
- **C (Continue)**: Accept portal theming and finalize White-Labeling Design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass portal context: admin, end-user, email, mobile, widgets
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into portal theming summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant portal theming for white-labeling: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save portal theming to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final White-Labeling Design document
- Output to `{output_folder}/planning-artifacts/tenant/white-labeling-design.md`

---

## Verification

- [ ] Admin portal customization defined
- [ ] End-user portal theming established
- [ ] Email templates branded
- [ ] Mobile theming configured
- [ ] Widget theming designed
- [ ] Documentation portal branded
- [ ] Patterns align with pattern registry

---

## Outputs

- Portal theming specification
- Email template configuration
- Complete White-Labeling Design document

---

## Workflow Complete

The Tenant White-Labeling Design is complete. The output document has been generated at `{output_folder}/planning-artifacts/tenant/white-labeling-design.md`.
