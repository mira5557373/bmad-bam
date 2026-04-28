# Step 01: Initialize Billing Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load tier configurations and identify pricing models
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Maintain tenant model and tier awareness throughout
- 🚫 Do NOT: Jump ahead to metering or subscription design
- 🔍 Use web search: Verify SaaS billing patterns against current best practices

---

## Purpose

Initialize the billing design workflow by loading tier configurations, referencing billing patterns, and identifying the appropriate pricing models for the multi-tenant SaaS platform.

## Prerequisites

- Master architecture document exists at `{output_folder}/planning-artifacts/master-architecture.md`
- Tenant model selection complete (`{tenant_model}` configured)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `billing-*`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

## Actions

### 1. Load Tier Configuration Context

Load the standard tier definitions for multi-tenant SaaS:

| Tier | Typical Features | Billing Characteristics |
|------|------------------|------------------------|
| **Free** | Limited usage, core features only | No payment, usage caps, upsell triggers |
| **Pro** | Full features, higher limits | Monthly/annual subscription, usage-based overage |
| **Enterprise** | Custom features, dedicated support | Custom contracts, volume discounts, SLAs |

**Web Research Directive:**
```
Search the web: "SaaS tier pricing best practices {date}"
Search the web: "multi-tenant billing model patterns {date}"
```

### 2. Identify Pricing Model Requirements

Evaluate which pricing models apply to this project:

| Pricing Model | Description | When to Use |
|---------------|-------------|-------------|
| **Flat-rate** | Fixed monthly/annual fee | Predictable usage, simple products |
| **Usage-based** | Pay-per-use (API calls, storage, compute) | Variable consumption, API platforms |
| **Tiered** | Fixed fee + tier benefits | Feature differentiation, upgrade paths |
| **Hybrid** | Base fee + usage overage | SaaS platforms with variable workloads |
| **Per-seat** | Per-user pricing | Collaboration tools, team platforms |

### 3. Gather Billing Requirements

Collect the following from stakeholders:

**Revenue Model Questions:**
- What is the primary pricing model (flat, usage, hybrid)?
- Are there multiple tiers with different feature sets?
- Is there a free tier or trial period?
- What usage metrics drive billing (API calls, storage, compute time)?

**Integration Questions:**
- Which payment provider(s) (Stripe, Paddle, PayPal)?
- What currencies need support?
- Are enterprise custom contracts required?
- What tax/compliance requirements exist?

### 4. Document Initial Billing Context

Create initial context summary:

```markdown
## Billing Context Summary

**Tenant Model:** {tenant_model}
**Primary Pricing Model:** [flat-rate | usage-based | tiered | hybrid | per-seat]
**Tiers Planned:** [Free, Pro, Enterprise | Custom]
**Payment Provider:** [Stripe | Paddle | Custom]
**Usage Metrics:** [List primary metrics]
**Trial Period:** [None | 7 days | 14 days | 30 days]
**Enterprise Contracts:** [Yes | No]
```

## Verification

- [ ] Tier configurations loaded and understood
- [ ] Billing patterns loaded from `bam-patterns.csv`
- [ ] Pricing model(s) identified
- [ ] Stakeholder billing requirements gathered
- [ ] Initial context summary documented
- [ ] Web research completed for current best practices

## Outputs

- Billing context summary (in working memory)
- Identified pricing model(s)
- Tier structure outline


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-02-c-analyze.md` to design metering infrastructure.

---

**Navigation:** Enter 'C' to continue to next step
