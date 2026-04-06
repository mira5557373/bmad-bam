# BAM SaaS Ideation Context

**When to load:**
- During feature brainstorming sessions for multi-tenant platforms
- When evaluating tenant-driven feature requests
- When deciding platform vs tenant feature ownership
- When exploring monetization strategies
- When user mentions "ideation", "feature brainstorming", or "monetization"

**Integrates with:** PM agents, Mary (Analyst), Product Strategy personas

---

## Tier-Aware Feature Brainstorming

### Feature Ideation Matrix

| Dimension | Free | Pro | Enterprise |
|-----------|------|-----|------------|
| **Core value** | Sample the value | Full productivity | Scale & compliance |
| **Limit type** | Hard limits | Soft limits | No limits |
| **Feature depth** | Basic | Advanced | Custom |
| **Support** | Self-serve | Assisted | Dedicated |

### Tier Placement Decision Tree

```
IS IT A CORE FEATURE?
        ↓
   Yes: Available in Free (limited)
        ↓
DOES IT DRIVE CONVERSION?
        ↓
   Yes: Pro with clear upgrade path
        ↓
DOES IT REQUIRE DEDICATED RESOURCES?
        ↓
   Yes: Enterprise only
        ↓
IS IT COMPLIANCE/SECURITY RELATED?
        ↓
   Yes: Enterprise only
```

### Brainstorming Prompts by Tier

| Tier | Ideation Prompts |
|------|-----------------|
| **Free** | What makes users fall in love in 5 minutes? |
| **Pro** | What makes teams 10x more productive? |
| **Enterprise** | What removes IT/compliance blockers? |

### Feature Value Scoring

| Criteria | Weight | Score (1-5) |
|----------|--------|-------------|
| User demand (requests/feedback) | 25% | |
| Revenue potential | 25% | |
| Competitive differentiation | 20% | |
| Technical feasibility | 15% | |
| Strategic alignment | 15% | |

---

## Tenant-Driven Innovation

### Feedback Collection Framework

```
COLLECT → CATEGORIZE → PRIORITIZE → VALIDATE → BUILD
    ↓          ↓            ↓           ↓         ↓
 Multi-      By tier      Impact/    With       Ship to
 channel     & theme      effort     segment    tier
```

### Feedback Sources by Tier

| Source | Free | Pro | Enterprise |
|--------|------|-----|------------|
| In-app feedback | Widget | Widget + NPS | Widget + NPS + Slack |
| Support tickets | Community | Email queue | Dedicated channel |
| Feature requests | Public board | Priority queue | Direct roadmap input |
| Usage analytics | Aggregated | Team-level | Organization-level |

### Tenant Innovation Programs

| Program | Target Tier | Benefit |
|---------|------------|---------|
| **Beta program** | Pro | Early access, influence roadmap |
| **Advisory board** | Enterprise | Direct product input, co-design |
| **Design partners** | Enterprise | Custom development, case studies |
| **Community champions** | Free/Pro | Recognition, exclusive features |

### Feedback to Feature Pipeline

| Stage | Action | Output |
|-------|--------|--------|
| Raw feedback | Collect and tag | Feedback database |
| Themes | Cluster related requests | Theme backlog |
| Opportunities | Assess impact/effort | Prioritized opportunities |
| Validation | Test with segments | Validated concepts |
| Development | Build and iterate | Shipped features |

---

## Platform vs Tenant Features

### Feature Ownership Framework

| Ownership | Description | Examples |
|-----------|-------------|----------|
| **Platform** | Core infrastructure, shared | Auth, billing, RLS, API |
| **Tier-gated** | Available by subscription | SSO, custom domains, analytics |
| **Tenant-specific** | Customization per tenant | Branding, workflows, integrations |
| **Add-on** | Optional paid extras | Premium support, extra storage |

### Decision Criteria

```
WHO BENEFITS?
        ↓
   All tenants → Platform feature
        ↓
   Tier segment → Tier-gated feature
        ↓
   Single tenant → Tenant-specific / custom
        ↓
WHAT'S THE COST MODEL?
        ↓
   Fixed cost → Include in tier
   Variable cost → Usage-based / add-on
```

### Platform Feature Checklist

- [ ] Does it improve security/compliance for all?
- [ ] Does it reduce operational burden?
- [ ] Does it enable tenant self-service?
- [ ] Is maintenance cost justified by universal value?
- [ ] Does it strengthen competitive moat?

### Tenant Feature Checklist

- [ ] Is customization a tier differentiator?
- [ ] Can it be self-service configured?
- [ ] Does it require isolated resources?
- [ ] Is there clear upgrade path for expanded use?

---

## Monetization Ideation

### Revenue Model Options

| Model | Description | Fit For |
|-------|-------------|---------|
| **Flat subscription** | Fixed monthly fee per tier | Predictable usage |
| **Seat-based** | Price per user | Team collaboration |
| **Usage-based** | Pay per API call/token | Variable consumption |
| **Hybrid** | Base + overage | Best of both |
| **Marketplace** | Revenue share on add-ons | Platform ecosystem |

### Monetization Brainstorming Framework

| Dimension | Questions |
|-----------|-----------|
| **Value** | What outcomes do customers pay for? |
| **Metrics** | What usage correlates with value? |
| **Thresholds** | Where do natural tier boundaries exist? |
| **Expansion** | What drives seat/usage growth? |
| **Lock-in** | What increases switching costs? |

### Pricing Experiment Ideas

| Experiment | Hypothesis | Metric |
|------------|------------|--------|
| Trial length | 14 vs 30 days affects conversion | Trial-to-paid % |
| Pricing anchor | Show Enterprise first | Pro selection % |
| Feature unbundling | A la carte vs packages | ARPU |
| Annual discount | 20% vs 40% discount | Annual commitment % |

### Add-On Revenue Opportunities

| Category | Examples | Pricing Model |
|----------|----------|---------------|
| **Storage** | Extra GB, backup | Per-GB monthly |
| **Compute** | Premium AI models, fast queues | Per-usage |
| **Support** | SLA upgrade, dedicated CSM | Flat monthly |
| **Services** | Implementation, training | One-time or retainer |

---

## Ideation Session Facilitation

### Multi-Tenant Ideation Agenda

| Time | Activity | Output |
|------|----------|--------|
| 10 min | Tier context setting | Shared understanding |
| 15 min | Divergent brainstorming | Raw ideas |
| 10 min | Tier placement | Categorized ideas |
| 15 min | Impact/effort mapping | Prioritized list |
| 10 min | Next steps | Action items |

### Ideation Rules for Multi-Tenant

1. Every idea gets a tier assignment
2. Consider isolation implications
3. Think about upgrade triggers
4. Validate against tenant personas
5. Check competitive landscape

---

## Application Guidelines

1. **Tier-first thinking** - Assign tier during ideation, not after
2. **Revenue awareness** - Every feature impacts monetization
3. **Tenant voice** - Incorporate real feedback in sessions
4. **Platform leverage** - Maximize shared infrastructure
5. **Experiment mindset** - Test pricing and packaging

---

## Integration with BAM Workflows

- `bmad-bam-create-master-architecture` - Platform feature design
- `bmad-bam-tenant-model-isolation` - Isolation for new features
- `bmad-bam-tier-ux` - Tier experience for new features
- PM workflows for roadmap prioritization
