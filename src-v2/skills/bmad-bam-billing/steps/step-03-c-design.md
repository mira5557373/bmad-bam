# Step 03: Design Subscription Management

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Tier definitions, feature flags, upgrade/downgrade, trials, proration
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Maintain metering design from Step 02
- 🚫 Do NOT: Design invoicing or payment processing yet
- 🔍 Use web search: Verify subscription patterns against SaaS best practices

---

## Purpose

Design the subscription management system including tier definitions, feature flags, upgrade/downgrade workflows, trial periods, and proration calculations for multi-tenant billing.

## Prerequisites

- Step 02 complete (metering infrastructure designed)
- Tier structure outline from Step 01
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `subscription-*`
- **Load template:** `{project-root}/_bmad/bam/data/templates/usage-billing-template.md`

## Actions

### 1. Define Tier Configurations

Design the tier definition schema:

| Tier | Monthly Price | Annual Price | Features | Limits |
|------|---------------|--------------|----------|--------|
| **Free** | $0 | $0 | Core features | 1K API calls, 1 user |
| **Pro** | $49 | $470 | All features | 50K API calls, 10 users |
| **Enterprise** | Custom | Custom | Custom + SLA | Unlimited, dedicated |

**Tier Configuration Schema:**
```
tier_config:
  tier_id: string
  name: string
  monthly_price_cents: integer
  annual_price_cents: integer
  features: [feature_flags]
  limits:
    api_calls_monthly: integer
    storage_gb: integer
    users: integer
    ai_tokens_monthly: integer
  overage_rates:
    api_calls_per_1k: integer
    storage_per_gb: integer
```

**Web Research Directive:**
```
Search the web: "SaaS subscription tier design patterns {date}"
Search the web: "feature flag management multi-tenant {date}"
```

### 2. Design Feature Flag System

Define feature flag architecture for tier-based access:

| Flag Type | Description | Example |
|-----------|-------------|---------|
| **Boolean** | On/off feature | `advanced_analytics: true` |
| **Numeric** | Limit value | `max_projects: 10` |
| **Enum** | Feature variant | `support_level: premium` |

**Feature Flag Evaluation:**
```
Request for Feature → Get Tenant Subscription → Load Tier Config → Check Feature Flag → Allow/Deny
```

**Multi-Tenant Considerations:**
- Feature flags stored per-tenant (subscription record)
- Tier defaults with tenant overrides for enterprise
- Cache feature flags with subscription TTL
- Audit feature access for compliance

### 3. Design Upgrade/Downgrade Workflows

Define subscription change workflows:

| Transition | Billing Impact | Feature Impact | Data Impact |
|------------|----------------|----------------|-------------|
| **Free → Pro** | Immediate charge | Instant unlock | None |
| **Pro → Enterprise** | Prorated credit | Instant unlock | Migration optional |
| **Pro → Free** | Credit issued | Immediate lock | Data preserved |
| **Enterprise → Pro** | Prorated refund | Feature lock | Data migration |

**Upgrade Flow:**
1. User initiates upgrade
2. Calculate proration (see Step 3.5)
3. Charge difference via payment provider
4. Update subscription record
5. Unlock tier features immediately
6. Emit `subscription.upgraded` event

**Downgrade Flow:**
1. User initiates downgrade
2. Schedule for end of billing period (or immediate)
3. Calculate credit/refund
4. Check data limits (warn if over new limits)
5. Update subscription at period end
6. Lock features, apply new limits
7. Emit `subscription.downgraded` event

### 4. Design Trial Period Management

Define trial configurations:

| Trial Type | Duration | Credit Card Required | Conversion Flow |
|------------|----------|---------------------|-----------------|
| **No CC Trial** | 14 days | No | Upgrade prompt at end |
| **CC on File** | 14 days | Yes | Auto-convert, opt-out |
| **Extended Trial** | 30 days | Enterprise only | Sales handoff |

**Trial Lifecycle:**
```
Sign Up → Trial Start → Day 7 Reminder → Day 12 Warning → Day 14 End → Convert/Downgrade
```

**Trial Data:**
```
trial:
  tenant_id: string
  trial_tier: string
  start_date: timestamp
  end_date: timestamp
  payment_method_on_file: boolean
  converted: boolean
  conversion_date: timestamp | null
```

### 5. Design Proration Calculations

Define proration logic:

| Scenario | Calculation | Example |
|----------|-------------|---------|
| **Mid-cycle upgrade** | (New price - Old price) * (days remaining / total days) | $49-$0 * (15/30) = $24.50 |
| **Mid-cycle downgrade** | Credit: (Old price - New price) * (days remaining / total days) | $49-$0 * (15/30) = $24.50 credit |
| **Annual to monthly** | Credit remaining annual, charge monthly | Complex, provider-handled |

**Proration Formula:**
```
proration_amount = (new_daily_rate - old_daily_rate) * days_remaining_in_period
```

---

## COLLABORATION MENUS (A/P/C)

After completing subscription management design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into subscription edge cases
- **P (Party Mode)**: Multi-persona review of subscription architecture
- **C (Continue)**: Accept design and proceed to invoicing
- **[Specific concerns]**: Describe concerns to investigate further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tier definitions, feature flags, upgrade/downgrade workflows, trial periods, proration
- Explore edge cases: grandfathered plans, enterprise custom tiers, trial extensions
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into subscription design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review subscription management design for billing: tiers, features, transitions, trials"
- Process Product Manager and Business Analyst perspectives on pricing strategy
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document subscription management design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] Tier configurations defined with pricing
- [ ] Feature flag system designed
- [ ] Feature flags are tier-aware
- [ ] Upgrade workflow documented
- [ ] Downgrade workflow documented
- [ ] Trial period management defined
- [ ] Proration calculations specified
- [ ] All workflows emit appropriate events
- [ ] Web research completed for subscription best practices

## Outputs

- Tier configuration schema
- Feature flag architecture
- Upgrade/downgrade workflow specifications
- Trial period configuration
- Proration calculation rules

## Next Step

Proceed to `step-04-c-document.md` to design invoicing and payment integration.

---

**Navigation:** Enter 'A' to amend, 'P' to proceed, or 'C' to continue
