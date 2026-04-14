# Customer Success Guide - BAM Extension

**When to load:** When designing tenant success programs, health scoring, churn prevention, or when user mentions customer success, tenant health, retention, expansion, or NPS.
**Integrates with:** PM (bmad-agent-pm), Analyst (bmad-agent-analyst), UX (bmad-agent-ux-designer)

This guide provides BAM-specific context for customer success teams managing tenant relationships in multi-tenant agentic AI platforms.

---

## Role Context

As a customer success manager on a BAM project, you focus on:
- Managing tenant health and predicting churn risk
- Driving adoption and expansion within tenant accounts
- Building relationships with tenant stakeholders
- Providing proactive outreach based on health signals
- Aligning tenant outcomes with platform value delivery

---

## Core Concepts

### Tenant Success in Multi-Tenant Platforms

Tenant success focuses on ensuring each organization achieves their desired outcomes using the platform. In multi-tenant environments, success metrics must be tracked per-tenant while identifying patterns across similar tenants. The goal is retention and expansion through value delivery.

### Tenant Health Model

Tenant health combines usage metrics, engagement signals, and sentiment indicators to predict retention risk and expansion opportunity. Health scoring enables proactive intervention before churn signals become critical.

| Health Dimension | Indicators | Weight |
|-----------------|------------|--------|
| Product Adoption | Feature usage, user activation rate | 30% |
| Engagement | Login frequency, session duration | 25% |
| Value Realization | ROI metrics, success milestones | 25% |
| Relationship | Support sentiment, NPS, exec engagement | 20% |

### Tenant Lifecycle Stages

| Stage | Duration | CSM Focus | Key Metrics |
|-------|----------|-----------|-------------|
| Onboarding | 0-30 days | Time to value | Activation rate, setup completion |
| Adoption | 30-90 days | Feature adoption | DAU/MAU, feature breadth |
| Expansion | 90+ days | Growth opportunity | Seat growth, tier upgrade |
| Renewal | Annual | Contract renewal | Renewal rate, NRR |
| At-Risk | Any | Churn prevention | Health score trend, support sentiment |

---

## Decision Framework

| Scenario | Recommendation | Rationale |
|----------|---------------|-----------|
| Health score declining | Schedule proactive outreach | Early intervention prevents churn |
| Low feature adoption | Create adoption plan, training | Unused features indicate value gap |
| Support ticket surge | Executive business review | May indicate product-fit issues |
| Usage spike | Explore expansion opportunity | Growth signal for upsell |
| Renewal approaching | Start 90-day renewal process | Avoid last-minute negotiations |
| Champion departing | Identify new champion | Relationship continuity critical |

---

## Tenant Health Scoring

### Health Score Calculation

```
Health Score = (Adoption × 0.30) + (Engagement × 0.25) + 
               (Value × 0.25) + (Relationship × 0.20)

Score Range: 0-100
- 80-100: Healthy (Green)
- 60-79: Attention (Yellow)  
- 40-59: At Risk (Orange)
- 0-39: Critical (Red)
```

### Adoption Metrics

| Metric | Calculation | Healthy Threshold |
|--------|-------------|-------------------|
| User activation | Active users / Licensed users | > 70% |
| Feature breadth | Features used / Features available | > 50% |
| Core feature usage | % using primary features | > 80% |
| Integration count | Active integrations / Available | > 30% |

### Engagement Metrics

| Metric | Calculation | Healthy Threshold |
|--------|-------------|-------------------|
| DAU/MAU ratio | Daily actives / Monthly actives | > 40% |
| Session frequency | Avg sessions per user per week | > 3 |
| Time in app | Avg minutes per session | > 10 |
| Return rate | Users returning within 7 days | > 60% |

### Value Metrics

| Metric | Calculation | Healthy Threshold |
|--------|-------------|-------------------|
| Time to value | Days to first meaningful outcome | < 14 days |
| Milestone completion | Success milestones hit / Expected | > 80% |
| Outcome achievement | Tenant-reported goal progress | > 70% |
| Usage growth | MoM usage growth rate | > 5% |

### Relationship Metrics

| Metric | Calculation | Healthy Threshold |
|--------|-------------|-------------------|
| NPS score | Net Promoter Score | > 30 |
| Support sentiment | Positive / Total tickets | > 80% |
| Executive engagement | Exec meetings per quarter | > 1 |
| Response rate | % responding to outreach | > 50% |

---

## Tenant Segmentation

### By Tier and Health

| Segment | Tier | Health | CSM Coverage | Cadence |
|---------|------|--------|--------------|---------|
| Strategic | Enterprise | Any | Dedicated 1:1 | Weekly |
| Growth | Pro | Healthy | Pooled 1:few | Bi-weekly |
| Nurture | Pro | At-risk | Dedicated attention | Weekly |
| Scale | Free | Healthy | Tech-touch | Automated |
| Convert | Free | High usage | Sales engagement | As needed |

### Touch Model by Segment

| Touch Type | Strategic | Growth | Nurture | Scale |
|------------|-----------|--------|---------|-------|
| Executive reviews | Quarterly | Bi-annual | As needed | None |
| Business reviews | Monthly | Quarterly | Monthly | None |
| Check-in calls | Weekly | Bi-weekly | Weekly | None |
| Email campaigns | Custom | Segment | Recovery | Automated |
| In-app guidance | Custom | Standard | Recovery | Standard |
| Webinars | Invited | Segment | Recovery | Open |

---

## Playbooks by Stage

### Onboarding Playbook (Days 0-30)

```
Day 0: Welcome
├── Send personalized welcome email
├── Assign CSM (for Pro+)
├── Schedule kickoff call (for Pro+)
└── Trigger onboarding in-app guide

Day 1-7: Setup
├── Monitor setup completion
├── Intervene if stuck (>3 days)
├── Celebrate first milestone
└── Introduce key resources

Day 7-14: First Value
├── Check for first meaningful action
├── Send tips for quick wins
├── Schedule training if needed
└── Identify expansion signals

Day 14-30: Activation
├── Review activation metrics
├── Conduct first check-in call
├── Create 30/60/90 success plan
└── Identify champion user
```

### Expansion Playbook

```
Expansion Signal Detected
├── Validate signal
│   ├── Usage approaching tier limits
│   ├── Feature requests beyond tier
│   └── Seat requests increasing
│
├── Prepare expansion case
│   ├── Current usage analysis
│   ├── Value delivered metrics
│   ├── Gap analysis vs next tier
│   └── ROI projection
│
├── Engage stakeholder
│   ├── Share value summary
│   ├── Present expansion options
│   └── Address concerns
│
└── Execute expansion
    ├── Coordinate with sales
    ├── Process upgrade
    └── Plan expanded adoption
```

### At-Risk Playbook

```
Health Score Drops Below 60
├── Immediate analysis
│   ├── What changed? (usage, engagement, support)
│   ├── Any support escalations?
│   └── Champion still engaged?
│
├── Proactive outreach
│   ├── CSM personal outreach
│   ├── Offer executive sponsor call
│   └── Propose recovery plan
│
├── Recovery actions
│   ├── Address specific pain points
│   ├── Re-onboard to key features
│   ├── Provide additional training
│   └── Consider service credits if warranted
│
└── Monitor recovery
    ├── Weekly health score check
    ├── Bi-weekly check-in calls
    └── Escalate if no improvement in 30 days
```

### Renewal Playbook (90 days before)

```
Day -90: Preparation
├── Pull usage and value metrics
├── Identify renewal risks
├── Prepare business review materials
└── Schedule executive alignment

Day -60: Business Review
├── Conduct formal business review
├── Present value delivered
├── Identify next year goals
└── Surface any concerns

Day -30: Proposal
├── Present renewal proposal
├── Negotiate terms if needed
├── Address outstanding issues
└── Confirm renewal intent

Day -14: Close
├── Process renewal paperwork
├── Confirm pricing and terms
├── Plan next year success strategy
└── Celebrate renewal
```

---

## AI-Specific Success Patterns

### AI Adoption Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Agent creation rate | Agents created per month | Growing |
| Agent success rate | Tasks completed / Tasks started | > 80% |
| Human escalation rate | Required human intervention | < 20% |
| Time savings | Automation hours saved | Measurable |
| Quality improvement | AI vs non-AI outcomes | Measurable |

### AI Value Realization

| Value Category | Measurement | Documentation |
|----------------|-------------|---------------|
| Time savings | Hours automated per week | Usage reports |
| Cost reduction | Manual process cost vs AI cost | ROI calculator |
| Quality improvement | Error rate reduction | Quality metrics |
| Scale enablement | Throughput increase | Capacity metrics |
| Employee satisfaction | User sentiment on AI assist | Survey data |

### AI Success Conversations

Questions to ask in tenant reviews:
- "Which AI agents are delivering the most value?"
- "Are there processes you wish were automated?"
- "How has AI quality met your expectations?"
- "What would make the AI more useful for your team?"
- "Have you measured time/cost savings from AI automation?"

---

## Tenant Communication

### Proactive Communication Triggers

| Trigger | Communication | Channel |
|---------|---------------|---------|
| Health score drops 10+ points | CSM personal outreach | Email + call |
| Usage hits 80% of limit | Upgrade discussion | In-app + email |
| New feature relevant to tenant | Feature announcement | Personalized email |
| Renewal in 90 days | Renewal process kickoff | Email + call |
| Support ticket resolved | Follow-up satisfaction check | Email |
| Champion role change | New champion identification | Call |

### Communication Templates

**Health Check Outreach:**
```
Hi [Name],

I noticed some changes in your team's [Platform] usage recently and 
wanted to check in to see how things are going.

Is there anything I can help with, or any feedback you'd like to share?

I'm here to ensure you're getting maximum value from the platform.

Best,
[CSM Name]
```

**Value Summary Email:**
```
Hi [Name],

As we approach [milestone/renewal], I wanted to share some highlights 
from your team's [Platform] usage:

📊 Key Metrics:
- [X] users actively using the platform
- [Y] AI agents deployed, completing [Z] tasks per month
- [Estimated hours] saved through automation

🏆 Achievements:
- [Specific achievement 1]
- [Specific achievement 2]

I'd love to schedule a call to review these results and discuss 
opportunities for the coming [quarter/year].

Best,
[CSM Name]
```

---

## Success Metrics

### CSM Performance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Gross retention | > 90% | ARR retained / Starting ARR |
| Net retention | > 110% | ARR after expansion / Starting ARR |
| Logo churn | < 5% | Tenants lost / Total tenants |
| Expansion rate | > 20% | Expanded ARR / Total ARR |
| NPS | > 40 | Net Promoter Score |
| Time to value | < 14 days | Median for new tenants |

### Portfolio Health

| Health Category | Target % of Portfolio |
|-----------------|----------------------|
| Healthy (80-100) | > 60% |
| Attention (60-79) | < 30% |
| At Risk (40-59) | < 8% |
| Critical (0-39) | < 2% |

---

## Application Guidelines

When managing tenant relationships:

1. **Track health continuously** - Don't wait for renewal to assess tenant health
2. **Segment and prioritize** - Focus high-touch on strategic and at-risk accounts
3. **Document value delivered** - Quantify ROI for business reviews and renewals
4. **Identify champions** - Build relationships with key users and sponsors
5. **Proactive outreach** - Reach out before tenants reach out with problems

When designing success programs:

1. **Automate scale segment** - Use tech-touch for high-volume, low-touch tenants
2. **Standardize playbooks** - Consistent approach for each lifecycle stage
3. **Measure and iterate** - Track playbook effectiveness and improve
4. **Align with product** - Feed tenant insights back to product roadmap
5. **Coordinate with support** - Share context to improve tenant experience

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design tenant onboarding experience
- `bmad-bam-tenant-trial-conversion` - Convert trial tenants to paid
- `bmad-bam-tenant-contract-renewal` - Manage contract renewals
- `bmad-bam-tenant-tier-migration` - Handle tier upgrades/downgrades
- `bmad-bam-usage-metering-design` - Design usage tracking for value proof

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant lifecycle patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `tenant-*`
- **Analytics patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `analytics-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "B2B SaaS customer success best practices {date}"
- Search: "tenant health scoring models {date}"
- Search: "net revenue retention strategies {date}"
- Search: "AI platform customer success metrics {date}"
