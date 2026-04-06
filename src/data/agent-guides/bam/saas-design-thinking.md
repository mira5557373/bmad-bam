# BAM SaaS Design Thinking Context

**When to load:**
- During discovery phases when exploring tenant needs
- When facilitating ideation sessions for multi-tenant features
- When prototyping tenant journeys across tiers
- When validating solutions with tenant personas
- When user mentions "design thinking", "empathy mapping", or "tenant personas"

**Integrates with:** Mary (Analyst), Sally (UX Designer), PM agents

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
