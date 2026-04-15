# Step 1: Branding Asset Management

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

Design the branding asset management system for tenant customization.

---

## Prerequisites

- Tenant isolation strategy defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `asset-management`

---


## Inputs

- User requirements for branding customization
- Tenant tier definitions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Design the branding asset system:

## Logo Management

```yaml
logo_assets:
  types:
    primary:
      purpose: Main logo for headers/navigation
      formats: [SVG, PNG]
      sizes:
        - name: full
          dimensions: 200x50px
        - name: compact
          dimensions: 40x40px
          
    favicon:
      purpose: Browser tab icon
      formats: [ICO, PNG]
      sizes: [16x16, 32x32, 180x180]
      
    email:
      purpose: Email header/footer
      formats: [PNG]
      sizes: [200x50px]
      
    social:
      purpose: Open Graph / social sharing
      formats: [PNG]
      sizes: [1200x630px]
      
  storage:
    location: S3 bucket per tenant
    path: /tenants/{tenant_id}/branding/logos/
    access: CDN with signed URLs
```

## Color Palette Configuration

```yaml
color_palette:
  primary_colors:
    primary: Required
    primary_light: Optional (auto-generated)
    primary_dark: Optional (auto-generated)
    
  accent_colors:
    secondary: Required
    tertiary: Optional
    
  semantic_colors:
    success: Default provided
    warning: Default provided
    error: Default provided
    info: Default provided
    
  neutral_colors:
    background: Default provided
    surface: Default provided
    text_primary: Default provided
    text_secondary: Default provided
    
  validation:
    contrast_ratio: WCAG AA minimum (4.5:1)
    color_formats: [HEX, RGB, HSL]
```

## Font Management

```yaml
font_management:
  sources:
    - Google Fonts (subset supported)
    - Adobe Fonts (license verification)
    - Custom uploaded (WOFF2 required)
    
  categories:
    heading:
      default: Inter
      customizable: true
    body:
      default: Inter
      customizable: true
    monospace:
      default: JetBrains Mono
      customizable: false
      
  licensing:
    verification: Automated license check
    storage: License file with font
    
  delivery:
    method: Self-hosted for privacy
    format: WOFF2 with fallbacks
    subset: Per-tenant language subset
```

## Asset Validation

```yaml
asset_validation:
  images:
    max_size: 5MB
    allowed_types: [PNG, SVG, WEBP]
    min_resolution: 200x200px
    max_resolution: 4000x4000px
    
  colors:
    format_validation: Valid HEX/RGB/HSL
    contrast_check: WCAG compliance
    
  fonts:
    license_check: Required for custom fonts
    format_check: WOFF2 required
    character_coverage: Latin basic minimum
```

## CDN Delivery

```yaml
cdn_delivery:
  provider: CloudFront / Cloudflare
  
  per_tenant:
    subdomain: assets.{tenant_slug}.platform.com
    custom_domain: assets.{custom_domain}
    
  caching:
    strategy: Immutable with versioning
    ttl: 1 year (versioned assets)
    invalidation: On asset update
    
  security:
    signed_urls: For private assets
    cors: Tenant-specific origins
```

## Asset Versioning

```yaml
versioning:
  strategy: Content hash versioning
  
  structure:
    path: /v{version}/{asset_type}/{filename}
    example: /v1a2b3c4/logos/primary.svg
    
  rollback:
    history: Last 5 versions retained
    instant_rollback: One-click revert
    
  deployment:
    preview: Before publish
    atomic: All assets updated together
```

**Verify current best practices with web search:**
Search the web: "white-label branding asset management {date}"
Search the web: "multi-tenant asset delivery CDN patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the branding asset management above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into asset requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for asset analysis
- **C (Continue)**: Accept asset management and proceed to theme customization
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass asset context: logos, colors, fonts, CDN
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into asset management summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review branding asset management for white-labeling: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save branding asset management to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-theme-customization.md`

---

## Verification

- [ ] Logo types defined
- [ ] Color palette established
- [ ] Font management configured
- [ ] Asset validation rules created
- [ ] CDN delivery designed
- [ ] Versioning strategy documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Branding asset specification
- Storage architecture
- CDN configuration
- **Load template:** `{project-root}/_bmad/bam/data/templates/branding-config-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/white-label-template.md`

---

## Next Step

Proceed to `step-02-c-theme-customization.md` to create the theming system.
