# Step 2: Theme Customization

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

Create the theming system for tenant-specific UI customization.

---

## Prerequisites

- Step 1 completed (Branding Asset Management)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `theming`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- Branding assets from Step 1
- UI framework selection
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Create the theming system:

## CSS Variable Architecture

```yaml
css_variables:
  namespace: --tenant
  
  color_variables:
    --tenant-primary: "{primary_color}"
    --tenant-primary-light: "{primary_light}"
    --tenant-primary-dark: "{primary_dark}"
    --tenant-secondary: "{secondary_color}"
    --tenant-background: "{background}"
    --tenant-surface: "{surface}"
    --tenant-text-primary: "{text_primary}"
    --tenant-text-secondary: "{text_secondary}"
    
  typography_variables:
    --tenant-font-heading: "{heading_font}"
    --tenant-font-body: "{body_font}"
    --tenant-font-size-base: "16px"
    
  spacing_variables:
    --tenant-radius-sm: "4px"
    --tenant-radius-md: "8px"
    --tenant-radius-lg: "12px"
    
  injection:
    method: CSS custom properties in :root
    scope: Per-tenant stylesheet
    isolation: CSS scoping per tenant context
```

## Component Theme Mapping

```yaml
component_mapping:
  buttons:
    primary:
      background: var(--tenant-primary)
      text: var(--tenant-text-on-primary)
      hover: var(--tenant-primary-dark)
    secondary:
      background: var(--tenant-surface)
      text: var(--tenant-text-primary)
      border: var(--tenant-primary)
      
  navigation:
    background: var(--tenant-surface)
    text: var(--tenant-text-primary)
    active: var(--tenant-primary)
    hover: var(--tenant-primary-light)
    
  cards:
    background: var(--tenant-surface)
    border: var(--tenant-border)
    shadow: var(--tenant-shadow)
    
  forms:
    input_background: var(--tenant-background)
    input_border: var(--tenant-border)
    input_focus: var(--tenant-primary)
    label: var(--tenant-text-secondary)
```

## Dark/Light Mode

```yaml
color_modes:
  per_tenant:
    default_mode: Light
    allow_toggle: true
    
  system_preference:
    respect: true
    override: Tenant setting takes precedence
    
  mode_variables:
    light:
      --tenant-background: "#FFFFFF"
      --tenant-surface: "#F5F5F5"
      --tenant-text-primary: "#1A1A1A"
    dark:
      --tenant-background: "#1A1A1A"
      --tenant-surface: "#2D2D2D"
      --tenant-text-primary: "#FFFFFF"
      
  transition:
    property: background-color, color
    duration: 200ms
    timing: ease-in-out
```

## Theme Inheritance

```yaml
inheritance:
  base_theme:
    source: Platform default
    customizable: true
    
  hierarchy:
    1. Platform base theme
    2. Tier defaults (FREE/PRO/ENTERPRISE)
    3. Tenant customizations
    4. User preferences (if allowed)
    
  merge_strategy:
    method: Deep merge
    priority: Child overrides parent
    fallback: Always to platform default
```

## Real-Time Preview

```yaml
preview_system:
  implementation:
    method: iframe with scoped styles
    isolation: Sandboxed preview environment
    
  features:
    - Live color updates
    - Font preview with real content
    - Component preview gallery
    - Mobile responsive preview
    - Dark/light mode toggle
    
  performance:
    debounce: 300ms
    cache: Preview state in session
    
  validation:
    contrast_warnings: Real-time WCAG check
    font_fallback: Show fallback preview
```

## Theme Validation

```yaml
validation:
  accessibility:
    - WCAG AA contrast ratios
    - Focus indicator visibility
    - Color-blind safe validation
    
  completeness:
    - All required variables defined
    - No undefined variable references
    - Font files accessible
    
  performance:
    - CSS size limit: 50KB
    - No duplicate rules
    - Optimized selectors
    
  isolation:
    - No global style leaks
    - Scoped to tenant context
    - No cross-tenant references
```

**Verify current best practices with web search:**
Search the web: "CSS custom properties theming best practices {date}"
Search the web: "multi-tenant theme system design {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the theme customization above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into theming requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for theme analysis
- **C (Continue)**: Accept theming system and proceed to custom domain mapping
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass theming context: CSS variables, components, dark mode
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into theming summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review theming system for white-labeling: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save theming system to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-custom-domain-mapping.md`

---

## Verification

- [ ] CSS variable architecture defined
- [ ] Component mapping established
- [ ] Dark/light mode configured
- [ ] Inheritance model designed
- [ ] Preview system specified
- [ ] Validation rules created
- [ ] Patterns align with pattern registry

---

## Outputs

- Theme architecture document
- CSS variable specification
- Component mapping guide
- **Load template:** `{project-root}/_bmad/bam/data/templates/customization-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/white-labeling-template.md`

---

## Next Step

Proceed to `step-03-c-custom-domain-mapping.md` to establish domain mapping.
