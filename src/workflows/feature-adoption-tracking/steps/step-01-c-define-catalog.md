# Step 1: Define Feature Catalog

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

Define comprehensive feature catalog and taxonomy for tracking.

---

## Prerequisites

- Product analytics instrumentation exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Feature Taxonomy

| Category | Description | Examples |
|----------|-------------|----------|
| Core | Essential functionality | Auth, Dashboard, Reports |
| Growth | Expansion drivers | Integrations, API, Team |
| Engagement | Retention drivers | Alerts, Automations |
| Advanced | Power user features | Custom workflows, AI |

### 2. Feature Attributes

| Attribute | Type | Purpose |
|-----------|------|---------|
| feature_id | string | Unique identifier |
| name | string | Display name |
| category | enum | Taxonomy category |
| tier_required | enum | Minimum tier |
| activation_criteria | object | What counts as activated |
| success_metric | string | Primary KPI |

### 3. Tier Availability

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Core Features | Yes | Yes | Yes |
| API Access | Limited | Full | Full |
| Integrations | 3 | 10 | Unlimited |
| AI Features | No | Basic | Advanced |
| Custom Workflows | No | Yes | Yes |

### 4. Feature Relationships

| Relationship | Description | Example |
|--------------|-------------|---------|
| Prerequisite | A before B | Login before Dashboard |
| Complementary | A with B | Reports with Export |
| Exclusive | A or B | Plan A or Plan B |
| Upgrade | A to B | Basic to Advanced |

**Verify current best practices with web search:**
Search the web: "feature catalog management SaaS {date}"
Search the web: "product feature taxonomy best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing catalog definition, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into feature taxonomy
- **P (Party Mode)**: Bring product and engineering perspectives
- **C (Continue)**: Accept catalog and proceed to metrics design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save feature catalog to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-metrics.md`

---

## Verification

- [ ] Feature taxonomy defined
- [ ] Attributes documented
- [ ] Tier availability mapped
- [ ] Relationships established
- [ ] Patterns align with pattern registry

---

## Outputs

- Feature catalog
- Taxonomy structure
- Tier matrix

---

## Next Step

Proceed to `step-02-c-design-metrics.md` to design adoption metrics.
