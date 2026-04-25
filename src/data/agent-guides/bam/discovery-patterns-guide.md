# BAM Discovery Patterns Guide

**When to load:** During Phase 1 (Discovery) and Phase 2 (Planning) when analyzing SaaS requirements, market analysis, ideation, stakeholder discovery, or problem definition. Load when user mentions discovery, ideation, innovation, design thinking, market research, stakeholder analysis, personas, value proposition, or requirement elicitation.
**Integrates with:** Analyst (Mary/Saga), PM (Chad), PO, UX (Emma/Freya), Innovation Strategist

---

## Core Concepts

### Discovery Phases in Multi-Tenant SaaS

Discovery for multi-tenant platforms spans multiple dimensions that single-tenant products do not require:

| Phase | Focus | Multi-Tenant Considerations |
|-------|-------|----------------------------|
| **Stakeholder Discovery** | Identify personas across tiers | Free, Pro, Enterprise have different needs |
| **Problem Definition** | Frame problems with tier context | Problems manifest differently by tier |
| **Market Analysis** | Competitive positioning per tier | Different competitors target different segments |
| **Requirement Elicitation** | Gather tier-aware requirements | Each tier has isolation, feature, and compliance needs |
| **Ideation** | Generate tier-appropriate solutions | Features need tier placement decisions |
| **Validation** | Test with tenant representatives | Validate across tier personas |

### Tenant Persona Framework

Understanding tenant personas is critical for multi-tenant SaaS platforms:

| Persona | Says | Thinks | Does | Feels |
|---------|------|--------|------|-------|
| **Free Tier Startup** | "I need to try before I buy" | "Will this scale with us?" | Explores all features | Excited but cautious |
| **Pro SMB** | "Time is money, make it easy" | "Is this worth the cost?" | Focuses on ROI features | Pressure to justify spend |
| **Enterprise** | "We need compliance and control" | "How does this fit our stack?" | Evaluates security/integration | Risk-averse, thorough |

### Design Thinking Phases

| Phase | Description | Multi-Tenant Focus |
|-------|-------------|-------------------|
| **Empathy** | Understand tenant needs through observation and interviews | Different tiers have different pain points |
| **Define** | Synthesize insights into actionable problem statements | Problems must reflect tier context |
| **Ideate** | Generate diverse solutions through structured brainstorming | Ideas need tier placement decisions |
| **Prototype** | Create rapid representations to test assumptions | Prototypes should capture tier transitions |
| **Test** | Validate with real tenant representatives | Test across all tier personas |

### Innovation Types

| Type | Description | SaaS Application |
|------|-------------|------------------|
| **Incremental** | Small improvements to existing features | Core product enhancements |
| **Adjacent** | Expanding into related markets or use cases | New tier or vertical |
| **Transformational** | Market-changing capabilities | Platform ecosystem effects |
| **Disruptive** | Lower-cost or simpler alternatives | Pricing model changes, AI automation |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific

### Discovery Artifact Naming

| Artifact | Naming Pattern | Location |
|----------|----------------|----------|
| Persona cards | `{tier}-persona-{role}.md` | `{output_folder}/discovery/` |
| Requirements doc | `requirements-{module}-{tier}.md` | `{output_folder}/planning-artifacts/` |
| Empathy maps | `empathy-map-{persona}.md` | `{output_folder}/discovery/` |
| Problem statements | `problem-statement-{domain}.md` | `{output_folder}/discovery/` |
| Market analysis | `market-analysis-{date}.md` | `{output_folder}/discovery/` |
| Value proposition | `value-proposition-{tier}.md` | `{output_folder}/discovery/` |

### Stakeholder Mapping Format

All stakeholder mappings must include:

```markdown
## Stakeholder: {Name/Role}

**Tier Context:** {FREE | PRO | ENTERPRISE | ALL}
**Influence Level:** {HIGH | MEDIUM | LOW}
**Interest Level:** {HIGH | MEDIUM | LOW}

### Goals
- {Primary goal}
- {Secondary goal}

### Pain Points
- {Current frustration}
- {Unmet need}

### Success Metrics
- {How they measure value}
- {KPIs they track}

### Isolation Requirements
- {Data isolation needs}
- {Compliance requirements}
```

### Requirement Template Format

Multi-tenant requirements must include tier applicability:

```markdown
## Requirement: {ID}

**Title:** {Requirement name}
**Tier Applicability:** {FREE | PRO | ENTERPRISE | ALL}
**Isolation Impact:** {NONE | LOW | MEDIUM | HIGH}
**Compliance Context:** {SOC2 | HIPAA | GDPR | NONE}

### Description
{Detailed requirement}

### Acceptance Criteria
- [ ] {Criterion including tenant context}
- [ ] {Multi-tenant verification criterion}

### Tier Variations
| Tier | Variation |
|------|-----------|
| Free | {How it differs for Free} |
| Pro | {How it differs for Pro} |
| Enterprise | {How it differs for Enterprise} |
```

---

## Decision Framework

### When to Use Which Discovery Technique

| Situation | Technique | Rationale |
|-----------|-----------|-----------|
| New product/feature | Full design thinking cycle | Need comprehensive understanding |
| Existing product enhancement | Targeted user research + ideation | Build on existing knowledge |
| Competitive pressure | Market analysis + rapid ideation | Time-sensitive response needed |
| Enterprise requirements | Stakeholder interviews + compliance review | High stakes, specific needs |
| Free tier conversion issues | Journey mapping + friction analysis | Understand upgrade blockers |
| Innovation exploration | Brainstorming + prototype testing | Generate and validate ideas |

### Persona Interview Minimum by Tier

| Tier | Minimum Interviews | Focus Areas |
|------|-------------------|-------------|
| Free | 5+ | Conversion triggers, value perception |
| Pro | 3+ | ROI justification, team workflows |
| Enterprise | 3+ (5+ for primary revenue tier) | Compliance, scale, integration |

---

## §requirement-discovery

### Pattern: Requirement Discovery

Multi-tenant requirement discovery identifies needs that vary by tenant tier, isolation level, and compliance context.

### Requirement Elicitation Process

```
GATHER → SEGMENT → ANALYZE → MAP → VALIDATE → DOCUMENT
   ↓         ↓         ↓       ↓        ↓           ↓
 Multi-    By tier   Impact/  Bounded  Feasibility Tier-aware
 channel   & theme   isolation context  check      specs
```

### Discovery Steps

1. **Gather Context** - Collect documentation, support tickets, feature requests across tiers
2. **Segment by Tier** - Organize requirements by tenant tier to understand tier-specific needs
3. **Identify Patterns** - Look for common themes that span tiers versus tier-specific requirements
4. **Assess Isolation Impact** - For each requirement, determine isolation or data boundary effects
5. **Map to Bounded Contexts** - Assign requirements to appropriate modules
6. **Document Dependencies** - Identify cross-module dependencies and integration requirements
7. **Prioritize by Value** - Rank requirements by business value considering tier revenue impact
8. **Validate Feasibility** - Review with architects to confirm technical feasibility

### Tier-Aware Requirements Matrix

| Decision Area | Free Tier | Pro Tier | Enterprise |
|--------------|-----------|----------|------------|
| Data Isolation | Shared tables with RLS | Schema-based or RLS | Dedicated database option |
| Feature Scope | Core features only | Extended features | Full platform + custom |
| Support Level | Self-service docs | Email + chat | Dedicated + SLA |
| Customization | None | Configuration only | Custom development |
| Integration | Public APIs only | Webhooks + APIs | Custom integrations |
| Compliance | Standard security | SOC2 ready | Full compliance suite |

### Stakeholder Discovery Checklist

- [ ] Identified personas for each tenant tier
- [ ] Conducted minimum interview count per tier
- [ ] Documented goals, pain points, success metrics
- [ ] Mapped isolation and compliance requirements
- [ ] Validated personas with tenant advisory board
- [ ] Connected personas to features and capabilities

---

## §market-analysis

### Pattern: Market Analysis

Market analysis for multi-tenant SaaS requires understanding tenant segmentation, platform effects, and competitive positioning per tier.

### Market Analysis Framework

| Analysis Type | Focus | BAM Application |
|---------------|-------|-----------------|
| Feature Comparison | Capability gaps | Inform module priority |
| Pricing Analysis | Tier structure | Validate tier model |
| Architecture Analysis | Technical approach | Inform isolation decisions |
| Go-to-Market | Channel strategy | Inform tenant onboarding |

### Competitive Intelligence Process

```
IDENTIFY → MONITOR → ANALYZE → ACT
    ↓          ↓         ↓        ↓
 Key        Track      Compare   Update
 competitors changes   offerings strategy
```

### Market Sizing for Multi-Tenant

| Market Level | Definition | Multi-Tenant Consideration |
|--------------|------------|---------------------------|
| TAM | All potential customers | Total across all tiers |
| SAM | Customers platform can serve | Limited by isolation constraints |
| SOM | Realistic capture rate | Competitive positioning per tier |

### Competitive Positioning Matrix

| Position | Tenant Model | AI Capabilities | Target Segment |
|----------|--------------|-----------------|----------------|
| Cost Leader | Shared RLS | Basic agents | SMB, Startups |
| Differentiator | Schema isolation | Advanced agents | Mid-Market |
| Niche | Database isolation | Custom AI | Enterprise, Regulated |

### Disruption Risk Matrix

| Risk Type | Description | Mitigation |
|-----------|-------------|------------|
| Price disruption | Competitor offers same at lower price | Emphasize value, match selectively |
| Feature disruption | New entrant with superior feature | Fast-follow or differentiate |
| Platform shift | Technology paradigm change | Monitor trends, build adaptability |
| Tier compression | Market expectation shifts | Proactive feature promotion |

---

## §design-thinking

### Pattern: Design Thinking

Design thinking in multi-tenant SaaS balances shared infrastructure efficiency with personalized tenant experiences.

### Empathy Mapping Process

1. **Identify tenant segments** - Group by tier, industry, or use case
2. **Conduct tenant interviews** - At least 3 per segment; 5+ for primary revenue tier
3. **Map pain points** - Per tier and use case
4. **Document gains sought** - What success looks like per segment
5. **Validate with data** - Usage analytics, support tickets, churn reasons

### Multi-Tenant Problem Statement Template

```
[TENANT SEGMENT] needs a way to [ACTION/CAPABILITY]
because [CURRENT PAIN POINT]
but is limited by [TIER CONSTRAINT / ISOLATION REQUIREMENT]
```

### Example Problem Statements

| Segment | Problem Statement |
|---------|-------------------|
| Free → Pro | Free users need seamless upgrade because they hit limits but fear losing configuration |
| Pro → Enterprise | Pro teams need SSO integration because IT mandates centralized auth but SAML setup is complex |
| Cross-tenant | Platform admins need aggregate insights because they manage multiple tenants but isolation prevents direct access |

### Problem Prioritization Matrix

| Impact | Effort | Tier Reach | Priority |
|--------|--------|------------|----------|
| High | Low | All tiers | P0 - Do now |
| High | High | Enterprise | P1 - Plan carefully |
| Medium | Low | Pro+ | P2 - Quick wins |
| Low | High | Free | P3 - Backlog |

### Tier-Aware Ideation Constraints

When brainstorming solutions, always consider:

1. **Tier accessibility** - Which tiers can access this feature?
2. **Graceful degradation** - How does it behave at lower tiers?
3. **Upgrade incentive** - Does it drive tier progression?
4. **Isolation compliance** - Does it respect tenant boundaries?

### Journey Prototyping Stages

```
AWARENESS → EVALUATION → ONBOARDING → ACTIVATION → EXPANSION → ADVOCACY
     ↓           ↓            ↓            ↓            ↓           ↓
  Per-tier    Tier         Tier-specific  Feature      Upgrade     Referral
  messaging   comparison   flows          discovery    prompts     programs
```

---

## §ideation

### Pattern: Ideation and Innovation

SaaS ideation requires tier-first thinking where every feature idea includes tier placement decisions.

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

### Innovation Portfolio Balance

| Type | Allocation | Risk | Horizon |
|------|------------|------|---------|
| **Core** | 70% | Low | Now |
| **Adjacent** | 20% | Medium | Next |
| **Transformational** | 10% | High | Future |

### Innovation Readiness Levels

| Level | Description | Tenant Exposure |
|-------|-------------|-----------------|
| 1 - Research | Internal exploration only | None |
| 2 - Prototype | Working proof of concept | Sandbox only |
| 3 - Alpha | Early tenant testing | Opt-in enterprise |
| 4 - Beta | Broader tenant testing | Pro + Enterprise |
| 5 - GA | Full production release | All tiers |

---

## §value-creation

### Pattern: Value Creation

Value creation in multi-tenant SaaS requires understanding value across multiple dimensions.

### Multi-Tenant Value Framework

| Value Type | Tenant Tier Impact | Measurement |
|------------|-------------------|-------------|
| Time Savings | Scales with usage | Hours saved per month |
| Cost Reduction | Higher for Enterprise | TCO comparison |
| Revenue Growth | AI-driven insights | Attribution models |
| Risk Mitigation | Compliance features | Incident reduction |

### Value Proposition by Tier

| Tier | Primary Value Driver | Secondary Value | Pricing Anchor |
|------|---------------------|-----------------|----------------|
| Free | Product trial, education | Community access | Conversion rate |
| Pro | Productivity gains | Feature access | Per-seat pricing |
| Enterprise | Strategic outcomes | Custom integration | Value-based pricing |

### AI-Driven Value Creation

| Value Type | Description |
|------------|-------------|
| Automation value | Time savings from agent-driven workflows |
| Intelligence value | Insights unavailable otherwise |
| Scale value | Handle more work without proportional headcount |
| Quality value | Consistency reduces errors and rework |

### Value Metrics by Module

| Module | Value Metric | Benchmark |
|--------|--------------|-----------|
| Agent Runtime | Tasks automated/month | 100+ |
| Tenant Model | Isolation incidents | <1/quarter |
| Integration | API calls processed | 10K+/tenant |
| Compliance | Audit time reduction | 50%+ |

### ROI Calculation Framework

| Tier | ROI Focus | Calculation Method |
|------|-----------|-------------------|
| **Free** | Time to value | Onboarding speed, quick wins |
| **Pro** | Efficiency ROI | Hours saved x hourly rate |
| **Enterprise** | Strategic ROI | Revenue enabled, risk avoided |

---

## §stakeholder-engagement

### Pattern: Stakeholder Engagement

Effective stakeholder engagement requires tailored communication strategies across personas and tiers.

### Communication Matrix

| Stakeholder | Cares About | Communication Style |
|-------------|-------------|---------------------|
| **CEO/CFO** | Revenue, growth, risk | Executive summary, KPIs |
| **CTO** | Architecture, scalability | Technical depth, diagrams |
| **CISO** | Security, compliance | Risk assessment, controls |
| **Product** | Features, roadmap | User stories, metrics |
| **Sales** | Differentiation, objection handling | Competitive positioning |
| **Support** | Operational concerns | Runbooks, escalation paths |

### Tenant Journey Narrative Structure

| Journey Phase | Story Focus | Emotional Arc | Key Messages |
|--------------|-------------|---------------|--------------|
| **Discovery** | Problem recognition | Frustration → Hope | "There's a better way" |
| **Evaluation** | Solution exploration | Curiosity → Interest | "See what's possible" |
| **Onboarding** | Getting started | Excitement → Confidence | "You can do this" |
| **Activation** | First success | Effort → Achievement | "You're getting value" |
| **Expansion** | Growing usage | Satisfaction → Ambition | "Unlock more potential" |
| **Advocacy** | Sharing success | Pride → Community | "Join the movement" |

### Tier-Based Value Narratives

| Tier | Primary Narrative | Value Proposition Focus |
|------|------------------|------------------------|
| **Free** | "Start your journey" | Low risk, quick wins, essential capabilities |
| **Pro** | "Accelerate your success" | Productivity gains, team collaboration |
| **Enterprise** | "Transform your organization" | Scale, security, customization |

### Presentation Tailoring Framework

```
AUDIENCE → CONCERNS → MESSAGE → FORMAT → DEPTH
    ↓          ↓         ↓         ↓        ↓
  Who is    What do    What's    How to   How much
  present   they care  the key   present  detail
            about      takeaway
```

### Multi-Tenant Talking Points

| Topic | Technical Framing | Business Framing |
|-------|-------------------|------------------|
| **RLS** | "Row-level security policies" | "Data never visible to other customers" |
| **Tier limits** | "Rate limiting and quotas" | "Fair usage, scalable pricing" |
| **Isolation** | "Separate compute/storage paths" | "Your data is yours alone" |
| **Compliance** | "SOC2, GDPR controls" | "Enterprise-ready security" |

### Success Story Template

```markdown
## [Company Name] - [Industry] - [Tier]

**Challenge:** [Specific problem before using platform]

**Solution:** [How they leveraged multi-tenant capabilities]

**Results:**
- [Metric 1: X% improvement in Y]
- [Metric 2: $ saved / earned]
- [Metric 3: Time/effort reduction]

**Quote:** "[Compelling customer quote about transformation]"
```

---

## Quality Gates

### QG-D1: Discovery Gate

| Check | Critical | Verification |
|-------|----------|--------------|
| Tenant personas documented for each tier | Yes | Review persona cards |
| Problem statements include tier context | Yes | Validate format compliance |
| Stakeholder map complete | Yes | All influence/interest mapped |
| Isolation requirements identified | Yes | Per-requirement analysis |
| Compliance context documented | No | SOC2/HIPAA/GDPR noted |
| Market analysis current | No | Within 6 months |
| Competitive positioning clear | No | Per-tier positioning defined |

### QG-PL1: Planning Gate

| Check | Critical | Verification |
|-------|----------|--------------|
| Requirements segmented by tier | Yes | Tier tags on all requirements |
| Isolation impact assessed | Yes | HIGH/MEDIUM/LOW/NONE assigned |
| Bounded context mapping complete | Yes | Requirements assigned to modules |
| Tier variations documented | Yes | Variations table populated |
| Acceptance criteria include tenant context | Yes | Multi-tenant verification criteria |
| Priority reflects tier revenue impact | No | Value scoring applied |
| Cross-module dependencies identified | No | Dependency map created |

### Discovery Quality Checklist

- [ ] Minimum interview count met per tier (Free: 5+, Pro/Enterprise: 3+)
- [ ] Empathy maps created for primary personas
- [ ] Problem statements follow tier-aware template
- [ ] Feature ideas have tier placement decisions
- [ ] Value propositions defined per tier
- [ ] Competitive positioning documented per tier
- [ ] Stakeholder communication plan established
- [ ] Innovation readiness levels assigned to new ideas

---

## Web Research

| Topic | Query |
|-------|-------|
| Persona Development | "B2B SaaS tenant persona frameworks {date}" |
| Design Thinking | "SaaS design thinking methodology multi-tenant {date}" |
| Market Analysis | "multi-tenant SaaS market trends {date}" |
| Ideation | "SaaS product ideation frameworks tier-based {date}" |
| Value Creation | "SaaS value creation frameworks B2B {date}" |
| Stakeholder Engagement | "SaaS product storytelling enterprise {date}" |
| Competitive Analysis | "agentic AI platform competitive landscape {date}" |
| User Research | "B2B SaaS user research multi-tenant {date}" |
| Problem Framing | "problem framing techniques SaaS products {date}" |
| Innovation | "SaaS innovation management product-led growth {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **Discovery patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `discovery-*`
- **Ideation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ideation-*`
- **Innovation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `innovation-*`
- **Persona patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `persona-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Related Workflows

| Workflow | When to Use |
|----------|-------------|
| `requirement-ingestion` | Ingest requirements from various sources |
| `tenant-requirements-analysis` | Analyze tenant-specific requirements |
| `triage-module-complexity` | Assess module complexity after requirements |
| `create-module-epics` | Create tier-aware epic structure |
| `bmad-bam-cross-module-story` | Write stories spanning modules |
| `bmad-bam-tenant-onboarding-design` | Design onboarding flows from discovery |
| `create-master-architecture` | Architecture from ideation outcomes |

---

## Change Log

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 16 source files: saas-ideation.md, saas-presentation.md, saas-innovation.md, saas-problem-solving.md, saas-narrative.md, saas-lifecycle.md, saas-design-thinking.md, storyteller-guide.md, ux-guide.md, saga-guide.md, pm-guide.md, innovation-guide.md, freya-guide.md, analyst-guide.md, po-guide.md, value-creation.md, market-analysis.md |
