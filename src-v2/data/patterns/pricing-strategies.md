---
pattern_id: pricing-strategies
shortcode: ZPS
category: platform
qg_ref: QG-PL1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Pricing Strategies - BAM Pattern

**Loaded by:** ZPS  
**Applies to:** Multi-tenant SaaS platforms implementing monetization models

---

## When to Use

- Launching new SaaS product
- Expanding pricing tiers
- Adding usage-based components
- Enterprise tier introduction
- Marketplace pricing design
- AI/LLM feature monetization

## When NOT to Use

- Internal tools (no monetization)
- Free-only products
- Fixed-price enterprise contracts only
- When pricing experiments are premature

## Architecture

### Pricing Model Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                     PRICING MODELS                           │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              FLAT-RATE (Simplest)                    │    │
│  │  $X/month for everything                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │              TIERED (Feature-based)                  │    │
│  │  Free → Pro → Enterprise with feature gates         │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │              USAGE-BASED (Pay-as-you-go)             │    │
│  │  Pay per API call, token, GB stored                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │              HYBRID (Tier + Usage)                   │    │
│  │  Base tier + overage for usage above limit          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Tier Configuration

| Tier | Target | Pricing Model | Typical Features |
|------|--------|---------------|------------------|
| Free | Individual/Trial | $0, limited | Core features, limits |
| Starter | Small teams | Flat monthly | Remove limits, support |
| Pro | Growing teams | Per-seat + usage | Advanced features, API |
| Enterprise | Large orgs | Custom | SSO, SLA, dedicated |

### Pricing Flow

```
Tenant Request
      │
      ▼
┌─────────────────┐
│ Tier Detection  │ ← From subscription record
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Feature Gate    │ ← Is feature in tier?
│ Check           │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌───────┐
│ Allow │ │ Deny  │
│       │ │ + Upsell │
└───────┘ └───────┘
         │
         ▼
┌─────────────────┐
│ Usage Metering  │ ← Track for billing
└─────────────────┘
```

### Configuration Schema

```yaml
pricing_strategies:
  tenant_id: uuid
  bam_controlled: true
  
  tiers:
    - name: string
      price_monthly: float
      price_yearly: float  # discount applied
      billing_cycle: enum[monthly, yearly, custom]
      
      features:
        - feature_id: string
          included: bool
          limit: int  # -1 for unlimited
          
      usage_components:
        - resource: string  # e.g., "api_calls", "tokens"
          included_units: int
          overage_price: float
          
  pricing_model:
    type: enum[flat, per_seat, usage_based, hybrid]
    
    per_seat:
      price_per_seat: float
      min_seats: int
      max_seats: int
      
    usage_based:
      unit: string
      price_per_unit: float
      volume_discounts:
        - threshold: int
          discount_percent: float
          
  billing:
    payment_processor: enum[stripe, paddle, chargebee]
    invoice_day: int
    grace_period_days: int
    dunning_enabled: bool
    
  ai_pricing:
    token_pricing_enabled: bool
    input_token_price: float
    output_token_price: float
    model_multipliers:
      - model: string
        multiplier: float
```

### AI/LLM Pricing Model

```
┌─────────────────────────────────────────────────────────────┐
│                    AI PRICING MODEL                          │
│                                                              │
│  Token Usage ──▶ Model Type ──▶ Price Calculation ──▶ Bill │
│       │              │                │                     │
│       ▼              ▼                ▼                     │
│  ┌─────────┐    ┌─────────┐     ┌─────────────┐            │
│  │ Input   │    │ GPT-4   │     │ Tokens x    │            │
│  │ Output  │    │ Claude  │     │ Price/1K x  │            │
│  │ Tokens  │    │ Custom  │     │ Multiplier  │            │
│  └─────────┘    └─────────┘     └─────────────┘            │
│                                                              │
│  Examples:                                                   │
│  - GPT-4: $0.03/1K input, $0.06/1K output                  │
│  - Claude: $0.015/1K input, $0.075/1K output               │
│  - Margin: 20-40% markup over provider cost                │
└─────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Model | Pros | Cons | Best For |
|-------|------|------|----------|
| Flat-rate | Predictable, simple | Leaves money on table | Early-stage, simple products |
| Per-seat | Scales with org size | Seat management complexity | Collaboration tools |
| Usage-based | Fair, scalable | Unpredictable bills | API products, AI |
| Hybrid | Predictable base + growth | Complex to explain | Mature SaaS |

## Quality Checks

- [ ] Pricing tiers align with feature gates
- [ ] Usage metering accurate
- [ ] Upgrade/downgrade paths clear
- [ ] Free tier sustainable
- [ ] **CRITICAL:** No billing attribution errors between tenants

## Web Research Queries

- "SaaS pricing strategies {date}"
- "usage-based pricing implementation {date}"
- "AI LLM pricing models {date}"
- "per-seat vs usage pricing {date}"
- "pricing page best practices SaaS {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-PL1 | Pattern implementation verified |

## Related Patterns

- [usage-analytics.md](usage-analytics.md) - Usage tracking
- [platform-fees.md](platform-fees.md) - Marketplace fees
