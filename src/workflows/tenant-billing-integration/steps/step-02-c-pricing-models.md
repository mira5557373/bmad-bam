# Step 2: Pricing Models

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

Design pricing models for each tenant tier including flat rates, usage-based pricing, and hybrid models.

---

## Prerequisites

- Billing requirements defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `cost-tracking`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design pricing models for the multi-tenant platform:

## Pricing Model Types

| Model | Description | Best For |
|-------|-------------|----------|
| Flat Rate | Fixed monthly/annual fee | Predictable usage |
| Usage-Based | Pay per consumption | Variable workloads |
| Tiered | Volume-based pricing | Growth alignment |
| Hybrid | Base fee + usage | Most SaaS products |
| Per-Seat | Per user pricing | Team collaboration |

## Tier Pricing Structure

### Free Tier

```yaml
free_tier:
  price: $0
  billing_frequency: none
  
  inclusions:
    api_requests: 10,000/month
    agent_invocations: 100/month
    llm_tokens: 100,000/month
    storage_gb: 1
    users: 1
    
  limitations:
    - No priority support
    - Community support only
    - No SLA guarantee
    - Watermarked exports
    
  overage_handling: hard_block  # Block at limit
```

### Pro Tier

```yaml
pro_tier:
  pricing:
    monthly: $49/month
    annual: $470/year  # ~20% discount
    
  billing_frequency: monthly | annual
  
  inclusions:
    api_requests: 100,000/month
    agent_invocations: 1,000/month
    llm_tokens: 1,000,000/month
    storage_gb: 50
    users: 5
    
  overage_pricing:
    api_requests: $0.001/1000 requests
    agent_invocations: $0.01/invocation
    llm_input_tokens: $0.002/1000 tokens
    llm_output_tokens: $0.008/1000 tokens
    storage_gb: $0.10/GB-month
    additional_users: $10/user/month
    
  overage_handling: allow_with_charge  # Charge for overage
```

### Enterprise Tier

```yaml
enterprise_tier:
  pricing: custom_quote
  
  billing_frequency: custom  # Monthly, quarterly, annual
  
  inclusions: negotiated
  
  features:
    - Dedicated support manager
    - Custom SLA (99.99% target)
    - Priority feature requests
    - Custom integrations
    - SSO/SAML
    - Audit logs
    - Data residency options
    
  overage_handling: contracted  # Per contract terms
  
  payment_terms:
    - Net 30
    - Net 60
    - Custom
```

## Add-on Pricing

| Add-on | Price | Availability | Billing |
|--------|-------|--------------|---------|
| Additional API Calls | $5/10K requests | Pro, Enterprise | Monthly |
| Extra Storage | $0.10/GB | All paid | Monthly |
| Priority Support | $50/month | Pro | Monthly |
| Advanced Analytics | $25/month | Pro, Enterprise | Monthly |
| Custom Model Training | Custom | Enterprise | One-time |

## Discount Structures

```yaml
discounts:
  annual_prepay:
    discount: 20%
    applies_to: [Pro, Enterprise]
    
  volume_discounts:
    thresholds:
      - usage: 500K API calls
        discount: 10%
      - usage: 1M API calls
        discount: 20%
      - usage: 5M API calls
        discount: 30%
        
  promotional:
    startup_program:
      eligibility: "YC, Techstars, etc."
      discount: 50%
      duration: 12_months
      
    nonprofit:
      eligibility: "501(c)(3) status"
      discount: 30%
      duration: permanent
```

## Price Versioning

```yaml
price_versioning:
  strategy: grandfather  # Existing customers keep old prices
  
  version_history:
    - version: "2024-01"
      effective_date: "2024-01-01"
      status: active
      
  migration_policy:
    new_customers: always_latest_version
    existing_customers: opt_in_upgrade
    notification_period: 30_days
```

## Pricing Display

```yaml
pricing_display:
  public_pricing:
    - Free tier
    - Pro tier (monthly/annual)
    
  hidden_pricing:
    - Enterprise (contact sales)
    - Volume discounts
    - Promotional rates
    
  price_format:
    currency_symbol: prefix  # $49
    decimal_places: 0  # No cents for subscription
    overage_decimals: 3  # $0.001 for usage
```

**Verify current best practices with web search:**
Search the web: "SaaS pricing models best practices {date}"
Search the web: "usage-based pricing multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the pricing models above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into pricing strategy using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for pricing analysis
- **C (Continue)**: Accept pricing models and proceed to usage tracking integration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass pricing context: tiers, overage, discounts
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into pricing summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review pricing models for tenant billing integration: {summary of tiers and pricing}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save pricing summary to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-usage-tracking-integration.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the billing foundation design.**

Present summary of:
- Payment provider and methods
- Tier pricing structure
- Discount programs

Ask for confirmation before proceeding to usage tracking integration.

---

## Verification

- [ ] All tiers have defined pricing
- [ ] Overage pricing specified for paid tiers
- [ ] Add-on pricing documented
- [ ] Discount structures defined
- [ ] Price versioning strategy established
- [ ] Patterns align with pattern registry

---

## Outputs

- Pricing model document
- Tier comparison matrix
- Overage pricing table

---

## Next Step

Proceed to `step-03-c-usage-tracking-integration.md` to integrate usage tracking.
