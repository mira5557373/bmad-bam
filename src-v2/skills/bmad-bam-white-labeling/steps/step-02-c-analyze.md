# Step 02: Design Branding Customization

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices

---

## Purpose

Design the branding customization layer including logos, color schemes, custom CSS injection, email template branding, and document watermarks.

---

## Prerequisites

- Step 01 completed: Scope established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`
- **Load guide:** `{project-root}/_bmad/bam/data/agent-guides/bam/white-labeling-guide.md`

**Web Research (Required):**

Search the web: "SaaS tenant branding architecture {date}"
Search the web: "CSS theming multi-tenant applications {date}"
Search the web: "white label email template design patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Design Logo and Visual Asset System

Define logo handling per tenant:

| Asset Type | Storage | Resolution | Formats | Fallback |
|------------|---------|------------|---------|----------|
| Primary logo | CDN tenant folder | 200x50 | SVG, PNG | Platform logo |
| Favicon | CDN tenant folder | 32x32, 180x180 | ICO, PNG | Platform favicon |
| Mobile icon | CDN tenant folder | 512x512 | PNG | Platform icon |
| Email logo | CDN tenant folder | 200x50 | PNG | Platform logo |
| Loading spinner | CDN tenant folder | 50x50 | SVG, GIF | Platform spinner |

### 2. Design Color Scheme Configuration

Define CSS variable structure for tenant theming:

| Variable Category | Variables | Scope |
|-------------------|-----------|-------|
| Primary palette | `--color-primary`, `--color-primary-light`, `--color-primary-dark` | Global |
| Secondary palette | `--color-secondary`, `--color-accent` | Global |
| Semantic colors | `--color-success`, `--color-warning`, `--color-error` | Global |
| Surface colors | `--color-background`, `--color-surface`, `--color-border` | Global |
| Text colors | `--color-text-primary`, `--color-text-secondary` | Global |

Theme configuration storage:

| Tier | Configuration Depth | Storage |
|------|---------------------|---------|
| Free | Primary color only | Tenant config DB |
| Pro | Full palette | Tenant config DB |
| Enterprise | Full palette + custom CSS | Tenant config DB + CSS file |
| OEM | Complete theme system | Dedicated config |

### 3. Design Custom CSS Injection

Define CSS override architecture:

| Injection Point | Purpose | Tier Availability |
|-----------------|---------|-------------------|
| Theme variables | Color/font overrides | Pro+ |
| Component overrides | Layout adjustments | Enterprise+ |
| Full stylesheet | Complete customization | OEM |

CSS delivery mechanism:

| Method | When | Performance |
|--------|------|-------------|
| Inline style block | Theme variables | Fastest, no extra request |
| CDN stylesheet | Custom CSS file | Cached, parallel load |
| Critical CSS + async | Large customizations | Balanced approach |

### 4. Design Email Template Branding

Email customization architecture:

| Component | Standard | Pro | Enterprise | OEM |
|-----------|----------|-----|------------|-----|
| Header logo | Platform | Tenant | Tenant | Full control |
| Color scheme | Platform | Limited | Full | Full |
| Footer text | Platform | Editable | Editable | Full control |
| Template layout | Fixed | Fixed | Selectable | Custom |
| Sender name | Platform | Custom | Custom | Custom domain |

Template override system:

| Template Type | Override Level | Variables |
|---------------|----------------|-----------|
| Transactional | Section-level | Logo, colors, footer |
| Marketing | Full override | Complete template |
| System | Limited | Logo, colors only |
| Legal | Platform-managed | Tenant name only |

### 5. Design Document Watermarks

Watermark configuration per tenant:

| Document Type | Watermark Options | Tier |
|---------------|-------------------|------|
| PDF exports | Logo + company name | Pro+ |
| Reports | Custom header/footer | Enterprise+ |
| Invoices | Full branding | Enterprise+ |
| Contracts | Logo + legal entity | Enterprise+ |

Watermark delivery:

| Approach | Pros | Cons |
|----------|------|------|
| Server-side generation | Secure, consistent | CPU overhead |
| Client-side injection | Fast, no server load | Can be bypassed |
| Template-based | Flexible, performant | Template maintenance |

---

## COLLABORATION MENUS (A/P/C):

After presenting the branding customization design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific branding components
- **P (Party Mode)**: Bring architect/UX perspectives on branding architecture
- **C (Continue)**: Accept branding design and proceed to domain customization
- **[Specific components]**: Describe which components need refinement

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: branding customization design, tier requirements
- Process enhanced insights on CSS architecture, asset management
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review branding customization architecture for multi-tenant SaaS"
- Present synthesized recommendations from UX and platform architect perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Document branding design decisions
- Update frontmatter: `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Verification

- [ ] Logo and visual asset system designed
- [ ] Color scheme configuration defined
- [ ] Custom CSS injection architecture specified
- [ ] Email template branding designed
- [ ] Document watermark system defined
- [ ] Tier-based feature availability documented
- [ ] Web research completed with citations

---

## Outputs

- Visual asset storage and delivery specifications
- CSS theming architecture with variable definitions
- Email template branding design
- Document watermark configuration
- Tier-based branding feature matrix

---

## Next Step

Proceed to `step-03-c-design.md` to design domain customization.
