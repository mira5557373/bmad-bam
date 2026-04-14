# Step 4: Plan Revenue Model

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

Design revenue sharing, configure billing integration, plan co-selling arrangements, and create reporting dashboards.

## Prerequisites

- Steps 1-3 completed: Tiers, sandbox, certification
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: revenue-sharing

---

## Inputs

- Output from Steps 1-3
- Business requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "SaaS partner revenue sharing models {date}"
Search the web: "marketplace billing integration patterns {date}"

_Source: [URL]_

### 1. Design Revenue Sharing

| Model | Split | Payment Terms | Use Case |
|-------|-------|---------------|----------|
| Marketplace | 70/30 | Monthly | App sales |
| Referral | 15% first year | Quarterly | Lead gen |
| Reseller | 25% ongoing | Monthly | Channel sales |
| Co-sell | Custom | Per-deal | Enterprise |

### 2. Configure Billing Integration

| Integration | Method | Settlement | Reporting |
|-------------|--------|------------|-----------|
| Direct billing | Platform handles | Net-30 | Real-time |
| Partner billing | Partner invoices | Custom | Monthly |
| Split billing | Both parties | Reconciled | Weekly |

### 3. Plan Co-selling Arrangements

| Arrangement | Structure | Registration | Commission |
|-------------|-----------|--------------|------------|
| Deal registration | First-come | 90 days | 2x referral |
| Joint selling | Account team | Per-account | Negotiated |
| Reseller | Exclusive territory | Annual | Tiered |

### 4. Create Reporting Dashboards

| Dashboard | Metrics | Audience | Refresh |
|-----------|---------|----------|---------|
| Partner Revenue | GMV, revenue share, payouts | Partners | Daily |
| Partner Health | Active apps, API usage, ratings | Partner team | Real-time |
| Co-sell Pipeline | Deals, win rate, revenue | Sales | Weekly |
| Ecosystem | Total partners, certifications | Executives | Monthly |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the revenue model above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into revenue sharing and billing integration
- **P (Party Mode)**: Bring finance and PM perspectives for revenue review
- **C (Continue)**: Complete Create mode - workflow finished
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass revenue context: sharing, billing, co-sell, reporting
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, finalize revenue model
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review revenue model: {summary of sharing and billing}"
- Process collaborative analysis from finance and PM personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save revenue model
- Create mode complete

---

## Verification

- [ ] Revenue sharing designed
- [ ] Billing integration configured
- [ ] Co-selling arrangements planned
- [ ] Reporting dashboards created
- [ ] Patterns align with pattern registry

## Outputs

- Revenue model document
- Billing integration specification
- Dashboard requirements

## Next Step

Workflow complete. Present Partner Integration Framework with revenue model to user for review and approval.
