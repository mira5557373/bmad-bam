# Step 1: Design Marketplace Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Define app categories, design discovery experience, plan search and filtering, and configure tenant visibility.

## Prerequisites

- Platform APIs defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: marketplace
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Actions

**Verify current best practices with web search:**
Search the web: "SaaS marketplace architecture best practices {date}"
Search the web: "app store discovery UX patterns {date}"

_Source: [URL]_

### 1. Define App Categories

| Category | Description | Examples |
|----------|-------------|----------|
| Productivity | Workflow automation | Zapier, Slack |
| Analytics | Reporting and BI | Looker, Tableau |
| Security | Auth and compliance | Okta, Auth0 |
| AI/ML | Intelligence tools | OpenAI, Custom models |

### 2. Design Discovery Experience

| Feature | Description | Implementation |
|---------|-------------|----------------|
| Featured apps | Editor picks | Curated list |
| Popular apps | By installs | Analytics-driven |
| New releases | Recent additions | Date-sorted |
| Recommended | Based on usage | ML recommendations |

### 3. Plan Search and Filtering

| Filter | Options | Implementation |
|--------|---------|----------------|
| Category | Defined categories | Faceted search |
| Pricing | Free, Paid, Freemium | Tag-based |
| Rating | 1-5 stars | Average score |
| Compatibility | Tier requirements | Metadata check |

### 4. Configure Tenant Visibility

| Visibility | Description | Use Case |
|------------|-------------|----------|
| Public | All tenants | Standard apps |
| Tier-restricted | Specific tiers only | Premium features |
| Private | Invite only | Custom integrations |
| Enterprise | Enterprise tenants | B2B apps |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] App categories defined
- [ ] Discovery experience designed
- [ ] Search and filtering planned
- [ ] Tenant visibility configured
- [ ] Patterns align with pattern registry

## Outputs

- Marketplace architecture document
- Category taxonomy
- Discovery UX specification
- **Load template:** `{project-root}/_bmad/bam/templates/marketplace-strategy-template.md`

## Next Step

Proceed to `step-02-c-create-app-lifecycle.md` to create app lifecycle.
