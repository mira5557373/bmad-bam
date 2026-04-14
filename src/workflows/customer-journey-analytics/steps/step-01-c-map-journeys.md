# Step 1: Map Customer Journeys

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

Map customer journeys and define key touchpoints.

---

## Prerequisites

- Product analytics instrumentation exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Journey Phases

| Phase | Description | Key Activities |
|-------|-------------|----------------|
| Awareness | Discovery | Landing, content, referral |
| Consideration | Evaluation | Pricing, demo, trial signup |
| Activation | First value | Onboarding, setup, first use |
| Retention | Ongoing value | Regular use, feature discovery |
| Expansion | Growth | Upgrade, add-on, team invite |
| Advocacy | Promotion | Review, referral, case study |

### 2. Key Touchpoints

| Touchpoint | Phase | Channels |
|------------|-------|----------|
| First Visit | Awareness | Web, mobile |
| Trial Signup | Consideration | Web |
| Onboarding Start | Activation | In-app |
| First Success | Activation | In-app |
| Feature Adoption | Retention | In-app |
| Upgrade Prompt | Expansion | In-app, email |

### 3. Journey Types

| Journey | Persona | Goal |
|---------|---------|------|
| Trial to Paid | New user | Conversion |
| Onboarding | New tenant | Activation |
| Feature Discovery | Active user | Engagement |
| Expansion | Power user | Revenue |
| Support | Any | Resolution |

### 4. Touchpoint Attributes

| Attribute | Type | Purpose |
|-----------|------|---------|
| touchpoint_id | string | Unique identifier |
| phase | enum | Journey phase |
| channel | enum | Interaction channel |
| intent | string | User goal |
| success_event | string | Completion marker |
| friction_score | number | Difficulty rating |

**Verify current best practices with web search:**
Search the web: "SaaS customer journey mapping {date}"
Search the web: "B2B journey touchpoint analysis {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing journey mapping, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into journey definitions
- **P (Party Mode)**: Bring UX and product perspectives
- **C (Continue)**: Accept journeys and proceed to tracking design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save journey maps to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-tracking.md`

---

## Verification

- [ ] Journey phases defined
- [ ] Touchpoints mapped
- [ ] Journey types identified
- [ ] Attributes documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Journey maps
- Touchpoint catalog
- Phase definitions

---

## Next Step

Proceed to `step-02-c-design-tracking.md` to design journey tracking.
