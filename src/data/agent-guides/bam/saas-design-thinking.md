# BAM SaaS Design Thinking Context

**When to load:**
- During discovery phases when exploring tenant needs
- When facilitating ideation sessions for multi-tenant features
- When prototyping tenant journeys across tiers
- When validating solutions with tenant personas
- When user mentions "design thinking", "empathy mapping", or "tenant personas"

**Integrates with:** Mary (Analyst), Sally (UX Designer), PM agents

---

## Core Concepts

### Empathy Phase
Understanding tenant needs through observation, interviews, and data analysis. This phase focuses on deeply comprehending the pain points, goals, and contexts of different tenant personas across tiers (Free, Pro, Enterprise).

### Define Phase
Synthesizing empathy insights into clear, actionable problem statements. For multi-tenant platforms, this means articulating challenges that respect tier boundaries while addressing common pain points.

### Ideate Phase
Generating diverse solutions through structured brainstorming techniques. Ideas must consider tier constraints, graceful degradation across subscription levels, and upgrade incentives.

### Prototype Phase
Creating rapid, low-fidelity representations of solutions to test assumptions. Prototypes should capture tenant journey transitions, tier upgrades, and cross-tenant admin scenarios.

### Test Phase
Validating prototypes with real tenant representatives from each tier. Testing must verify isolation boundaries, tier-appropriate experiences, and seamless upgrade/downgrade flows.

### Multi-Tenant Considerations
Design thinking in multi-tenant SaaS requires balancing shared infrastructure efficiency with personalized tenant experiences. Each phase must account for tier differentiation, data isolation requirements, and the natural progression tenants make through subscription levels.

---

## Empathy Mapping for Tenant Personas

### Tenant Persona Framework

| Persona | Says | Thinks | Does | Feels |
|---------|------|--------|------|-------|
| **Free Tier Startup** | "I need to try before I buy" | "Will this scale with us?" | Explores all features | Excited but cautious |
| **Pro SMB** | "Time is money, make it easy" | "Is this worth the cost?" | Focuses on ROI features | Pressure to justify spend |
| **Enterprise** | "We need compliance and control" | "How does this fit our stack?" | Evaluates security/integration | Risk-averse, thorough |

### Empathy Mapping Process

1. **Identify tenant segments** - Group by tier, industry, or use case
2. **Conduct tenant interviews** - At least 3 per segment
3. **Map pain points** - Per tier and use case
4. **Document gains sought** - What success looks like per segment
5. **Validate with data** - Usage analytics, support tickets, churn reasons

---

## Define Problem Space with Tenant Context

### Multi-Tenant Problem Statement Template

```
[TENANT SEGMENT] needs a way to [ACTION/CAPABILITY]
because [CURRENT PAIN POINT]
but is limited by [TIER CONSTRAINT / ISOLATION REQUIREMENT]
```

### Example Problem Statements

| Segment | Problem Statement |
|---------|-------------------|
| Free → Pro | Free users need seamless upgrade because they hit limits but fear losing their configuration |
| Pro → Enterprise | Pro teams need SSO integration because IT mandates centralized auth but SAML setup is complex |
| Cross-tenant | Platform admins need aggregate insights because they manage multiple tenants but isolation prevents direct access |

### Problem Prioritization Matrix

| Impact | Effort | Tier Reach | Priority |
|--------|--------|------------|----------|
| High | Low | All tiers | P0 - Do now |
| High | High | Enterprise | P1 - Plan carefully |
| Medium | Low | Pro+ | P2 - Quick wins |
| Low | High | Free | P3 - Backlog |

---

## Ideate with Tier Constraints

### Tier-Aware Ideation Framework

When brainstorming solutions, always consider:

1. **Tier accessibility** - Which tiers can access this feature?
2. **Graceful degradation** - How does it behave at lower tiers?
3. **Upgrade incentive** - Does it drive tier progression?
4. **Isolation compliance** - Does it respect tenant boundaries?

### Ideation Techniques for Multi-Tenant

| Technique | Application |
|-----------|-------------|
| **Crazy 8s** | 8 variations of same feature across tiers |
| **SCAMPER** | Substitute/Combine/Adapt for tier differentiation |
| **How Might We** | "HMW make Enterprise feel exclusive while Free feels valued?" |
| **Reverse Brainstorm** | "How could we make the worst multi-tenant UX?" |

---

## Prototype Tenant Journeys

### Journey Prototyping Stages

```
AWARENESS → EVALUATION → ONBOARDING → ACTIVATION → EXPANSION → ADVOCACY
     ↓           ↓            ↓            ↓            ↓           ↓
  Per-tier    Tier         Tier-specific  Feature      Upgrade     Referral
  messaging   comparison   flows          discovery    prompts     programs
```

### Prototype Fidelity by Stage

| Stage | Fidelity | Focus |
|-------|----------|-------|
| Explore | Sketches | Multiple tier journeys |
| Define | Wireframes | Critical tier transitions |
| Test | Clickable | Upgrade/downgrade flows |
| Build | Hi-fi | Complete tier experiences |

---

## Test with Tenant Scenarios

### Scenario Testing Framework

| Scenario Type | Example | Validation Method |
|---------------|---------|-------------------|
| **Tier boundary** | User hits Free limit | Usability test with real users |
| **Cross-tier** | Admin manages Free + Pro tenants | Role-based walkthrough |
| **Upgrade flow** | Free user upgrades mid-task | A/B test conversion |
| **Isolation** | Tenant attempts cross-boundary access | Security audit |

### Testing Checklist

- [ ] Each tier tested with representative users
- [ ] Upgrade flows tested end-to-end
- [ ] Downgrade scenarios tested (grace periods, data retention)
- [ ] Cross-tenant admin scenarios validated
- [ ] Isolation boundaries verified (no data leaks)

---

## Application Guidelines

1. **Start with empathy** - Understand each tier's unique pressures
2. **Define per-tier** - Problem statements should reflect tier context
3. **Ideate inclusively** - Solutions should work across tiers with graceful degradation
4. **Prototype transitions** - Focus on tier upgrade/downgrade journeys
5. **Test with real tenants** - Use actual customers from each tier

---

## Integration with BAM Workflows

- `bmad-bam-tenant-model-isolation` - Isolation requirements from empathy mapping
- `bmad-bam-create-master-architecture` - Architecture decisions from ideation
- `bmad-bam-tenant-onboarding-design` - Onboarding flows from journey prototyping
- WDS workflows with BAM extension for UX testing

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Design patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `design-*`
- **SaaS patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `saas-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS design thinking methodology {date}"
- Search: "B2B SaaS user research multi-tenant {date}"
- Search: "design sprint SaaS product development {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| How many tenant personas per tier to interview? | Minimum 3 per segment; 5+ for primary revenue tier | Statistical validity requires sample size; focus investment on highest-impact segments |
| When to use soft vs hard feature gates in ideation? | Soft gates for features that drive upgrades; hard gates for infrastructure-dependent features | Soft gates enable value demonstration; hard gates prevent support burden for unprovided capabilities |
| How to prioritize tier-aware solutions? | High impact + low effort for all tiers first; then tier-specific high-impact features | Maximize value delivery across customer base while supporting tier differentiation |
| When to prototype tier transitions vs core flows? | Prototype transitions when conversion rate is a key metric; core flows when retention is focus | Align design investment with business objectives and growth stage |
| How to validate isolation in design testing? | Include explicit cross-tenant access attempts in every test scenario | Security cannot be retrofitted; validation during design prevents costly fixes later |

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design onboarding flows from journey prototyping
- `bmad-bam-tenant-tier-migration` - Design tier upgrade/downgrade experiences
- `bmad-bam-tenant-model-isolation` - Translate isolation requirements from empathy mapping
- `bmad-bam-create-master-architecture` - Implement architecture decisions from ideation
