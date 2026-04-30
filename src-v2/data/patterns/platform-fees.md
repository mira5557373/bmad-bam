---
pattern_id: platform-fees
shortcode: ZPF
category: platform
qg_ref: QG-PL2
version: 1.0.0
last_reviewed: 2026-04-30
---

# Platform Fees - BAM Pattern

**Loaded by:** ZPF  
**Applies to:** Multi-tenant marketplace and platform SaaS with transaction-based revenue

---

## When to Use

- Two-sided marketplace platforms
- App store / plugin ecosystem
- SaaS with reseller programs
- Payment processing pass-through
- Revenue sharing with partners
- Affiliate/referral programs

## When NOT to Use

- Pure B2B SaaS without marketplace
- Internal platforms
- Fixed-price subscriptions only
- When transaction volume is too low

## Architecture

### Fee Structure Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     FEE STRUCTURE                            │
│                                                              │
│  Transaction Amount: $100                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │   Platform Fee (10%)                    $10.00      │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │   Payment Processing (2.9% + $0.30)     $3.20       │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │   Partner Revenue Share (5%)            $5.00       │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │   Vendor Payout                         $81.80      │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Fee Calculation Flow

```
Transaction Event
      │
      ▼
┌─────────────────┐
│ Identify Parties│ ← Buyer, Seller, Platform, Partners
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Calculate Fees  │
│ per party tier  │
└────────┬────────┘
         │
    ┌────┴────┬─────────┐
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│Platform│ │Payment│ │Partner│
│ Fee   │ │ Fee   │ │ Share │
└───────┘ └───────┘ └───────┘
         │
         ▼
┌─────────────────┐
│ Net Payout      │ ← Seller receives
│ Calculation     │
└─────────────────┘
```

### Fee Types

| Fee Type | Description | Typical Range | Who Pays |
|----------|-------------|---------------|----------|
| Platform Take Rate | Platform's cut | 5-30% | Seller |
| Payment Processing | Stripe/PayPal fees | 2.5-3.5% + fixed | Either |
| Partner Commission | Referral/affiliate | 5-20% | Platform |
| Listing Fee | Per-listing charge | $0-$100 | Seller |
| Featured Placement | Visibility boost | $10-$500/mo | Seller |

### Configuration Schema

```yaml
platform_fees:
  platform_id: uuid
  bam_controlled: true
  
  platform_take_rate:
    default_percent: float
    tier_overrides:
      - vendor_tier: string
        percent: float
    volume_discounts:
      - monthly_volume_min: float
        percent: float
        
  payment_processing:
    processor: enum[stripe, adyen, paypal]
    percent_fee: float
    fixed_fee: float
    currency: string
    who_pays: enum[seller, buyer, split]
    
  partner_commissions:
    affiliate_percent: float
    reseller_percent: float
    referral_bonus: float
    attribution_window_days: int
    
  payout:
    schedule: enum[instant, daily, weekly, monthly]
    minimum_threshold: float
    hold_period_days: int
    
  fee_caps:
    max_platform_fee: float
    max_total_fees_percent: float
    
  tax_handling:
    collect_sales_tax: bool
    vat_handling: enum[inclusive, exclusive, calculate]
```

### Vendor Tier Fee Structure

```
┌─────────────────────────────────────────────────────────────┐
│                  VENDOR TIER FEES                            │
│                                                              │
│  Tier        │ Platform Fee │ Payout Schedule │ Threshold   │
│  ───────────────────────────────────────────────────────────│
│  Starter     │    20%       │    Monthly      │    $100     │
│  Growth      │    15%       │    Weekly       │    $50      │
│  Pro         │    10%       │    Daily        │    $25      │
│  Enterprise  │    5-8%      │    Instant      │    $0       │
│                                                              │
│  Volume discounts apply at $10K, $50K, $100K monthly GMV   │
└─────────────────────────────────────────────────────────────┘
```

### Revenue Attribution Flow

```
Sale Event ($100)
      │
      ├──▶ Platform (10%) ──────────────▶ $10.00
      │
      ├──▶ Affiliate (5% of sale) ──────▶ $5.00
      │
      ├──▶ Payment Processor ───────────▶ $3.20
      │         (2.9% + $0.30)
      │
      └──▶ Vendor Payout ───────────────▶ $81.80
           (100 - 10 - 5 - 3.20)
           
Revenue Ledger:
┌────────────┬──────────┬──────────┐
│ Party      │ Amount   │ Type     │
├────────────┼──────────┼──────────┤
│ Platform   │ $10.00   │ Revenue  │
│ Affiliate  │ $5.00    │ Expense  │
│ Processor  │ $3.20    │ Expense  │
│ Vendor     │ $81.80   │ Payout   │
└────────────┴──────────┴──────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Fixed % take rate | Simple, predictable | May discourage high-value | Early marketplace |
| Tiered by volume | Rewards growth | Complex calculations | Mature marketplace |
| Category-based | Reflects cost differences | Vendor confusion | Diverse marketplace |
| Subscription + lower take | Predictable platform revenue | Lower transaction revenue | Established vendors |

## Quality Checks

- [ ] Fee calculations auditable
- [ ] Vendor tier assignments correct
- [ ] Partner commissions attributed properly
- [ ] Payout timing meets vendor expectations
- [ ] **CRITICAL:** No cross-vendor fee attribution errors

## Web Research Queries

- "marketplace take rate benchmarks {date}"
- "platform fee structure design {date}"
- "Stripe Connect marketplace fees {date}"
- "revenue sharing models SaaS {date}"
- "affiliate commission best practices {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-PL2 | Pattern implementation verified |

## Related Patterns

- [pricing-strategies.md](pricing-strategies.md) - Pricing models
- [reseller-model.md](reseller-model.md) - Partner revenue share
