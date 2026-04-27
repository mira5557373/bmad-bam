# BAM SaaS Narrative Context

**When to load:**
- When crafting tenant success stories for marketing
- When differentiating tiers through storytelling
- When building platform value propositions
- When creating ROI narratives for sales enablement
- When user mentions "storytelling", "narrative", or "success stories"

**Integrates with:** PM agents, Marketing personas, Sales enablement

---

## Core Concepts

### Storytelling Frameworks
Structured approaches to crafting compelling narratives. The classic hero's journey, problem-solution-result, and before-after-bridge frameworks help transform feature descriptions into emotional, memorable stories.

### Value Proposition
A clear statement of why a tenant should choose your platform. Effective value propositions articulate the specific benefit, target audience, and unique differentiation in a concise, compelling format.

### Proof Points
Quantifiable evidence that supports narrative claims. Metrics like time saved, cost reduction, revenue growth, and efficiency gains transform stories from aspirational to credible.

### Audience Segmentation
Tailoring narratives to specific personas, tiers, and buyer roles. Technical evaluators need different stories than executive sponsors; free tier prospects respond differently than enterprise buyers.

### Multi-Tenant Considerations
Multi-tenant SaaS narrative must balance platform-wide value propositions with tier-specific stories. Success stories should showcase natural tier progression, demonstrate isolation benefits for enterprise buyers, and articulate how shared infrastructure delivers better value than single-tenant alternatives.

---

## Tenant Success Stories Framework

### Success Story Structure

```
BEFORE STATE → CHALLENGE → DISCOVERY → TRANSFORMATION → RESULTS
      ↓             ↓           ↓              ↓            ↓
   Pain points   Specific    How they      What         Measurable
   and context   obstacles   found us      changed      outcomes
```

### Story Collection Matrix

| Tier | Story Focus | Metrics to Capture |
|------|-------------|-------------------|
| **Free → Pro** | Growth journey | Time saved, features unlocked |
| **Pro** | Efficiency gains | Cost reduction, productivity |
| **Enterprise** | Strategic value | Compliance, scale, integration |

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

## Tier Differentiation Narratives

### Narrative Positioning by Tier

| Tier | Core Narrative | Emotional Appeal |
|------|----------------|------------------|
| **Free** | "Start your journey without risk" | Safety, exploration |
| **Pro** | "Unlock your team's full potential" | Growth, achievement |
| **Enterprise** | "Scale with confidence and control" | Security, power |

### Tier Transition Stories

#### Free to Pro Narrative Arc

```
"I started with the free tier to experiment...
 → Hit limits that showed me the value...
 → Upgrade was seamless, no data loss...
 → ROI was clear within first month..."
```

#### Pro to Enterprise Narrative Arc

```
"Our team grew beyond Pro capabilities...
 → Needed SSO and compliance features...
 → Migration was handled with dedicated support...
 → Now managing multiple workspaces effortlessly..."
```

### Competitive Differentiation Narrative

| Competitor Weakness | Our Counter-Narrative |
|--------------------|----------------------|
| Complex pricing | "Transparent tiers, no surprises" |
| Data lock-in | "Export anytime, your data is yours" |
| Slow support | "Tier-appropriate SLAs, always honored" |
| Feature bloat | "Right features for each tier" |

---

## Platform Value Propositions

### Value Proposition Canvas

| Customer Jobs | Platform Value |
|--------------|----------------|
| Manage multiple clients | Multi-tenant isolation |
| Scale without rebuilding | Tier progression path |
| Ensure compliance | Built-in audit and RLS |
| Integrate with stack | API-first architecture |

### Value Messaging Framework

```
FOR [target tenant segment]
WHO [key need or challenge]
OUR PLATFORM [differentiating capability]
THAT [primary benefit]
UNLIKE [competitive alternative]
WE [unique advantage]
```

### Platform Narrative Pillars

| Pillar | Message | Proof Points |
|--------|---------|--------------|
| **Isolation** | "Your data is yours alone" | RLS, encryption, compliance |
| **Scalability** | "Grow without limits" | Tier progression, auto-scaling |
| **Flexibility** | "Adapt to your needs" | Custom domains, white-label |
| **Reliability** | "Always available" | SLA guarantees, uptime stats |

---

## ROI Storytelling by Tier

### ROI Calculation Framework

| Tier | ROI Focus | Calculation Method |
|------|-----------|-------------------|
| **Free** | Time to value | Onboarding speed, quick wins |
| **Pro** | Efficiency ROI | Hours saved x hourly rate |
| **Enterprise** | Strategic ROI | Revenue enabled, risk avoided |

### ROI Narrative Templates

#### Free Tier ROI Story
```
"Within [X hours], new users can [key action]
saving [Y hours] of setup compared to building in-house,
representing [Z value] in immediate productivity gains."
```

#### Pro Tier ROI Story
```
"Pro teams report [X%] reduction in [task time],
translating to [Y hours/month] saved per user,
with a payback period of [Z weeks] on subscription cost."
```

#### Enterprise ROI Story
```
"Enterprise customers achieve [X%] faster compliance audits,
reduce integration costs by [$Y/year],
and enable [$Z] in new revenue through platform capabilities."
```

### ROI Proof Points Collection

- [ ] Track time-to-first-value by tier
- [ ] Measure feature adoption rates
- [ ] Calculate cost avoidance metrics
- [ ] Document compliance time savings
- [ ] Survey customer-reported ROI

---

## Storytelling Delivery Channels

| Channel | Narrative Style | Tier Focus |
|---------|----------------|------------|
| Landing page | Aspirational, benefit-led | All tiers |
| Case studies | Detailed, metrics-heavy | Pro/Enterprise |
| Sales decks | ROI-focused, customizable | Enterprise |
| Blog posts | Educational, journey-focused | Free/Pro |
| Webinars | Interactive, demo-driven | Pro/Enterprise |

---

## Application Guidelines

1. **Collect stories continuously** - Every tier upgrade is a potential story
2. **Quantify everything** - Metrics make stories credible
3. **Segment narratives** - Different stories for different personas
4. **Update regularly** - Fresh stories maintain relevance
5. **Enable sales** - Make stories easy to customize and share

---

## Integration with BAM Workflows

- `bmad-bam-tenant-onboarding-design` - Onboarding success stories
- `create-master-architecture` - Platform capability narratives
- WDS workflows for storytelling UX patterns
- PM workflows for feature value articulation

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Narrative patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `narrative-*`
- **SaaS patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `saas-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS product storytelling {date}"
- Search: "B2B SaaS value proposition narrative {date}"
- Search: "multi-tenant product positioning {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Which tier success stories to prioritize? | Focus on tier transition stories (Free to Pro, Pro to Enterprise) | Transition stories drive upgrade conversions; demonstrate natural growth path |
| When to quantify ROI vs emotional appeal? | Quantify for enterprise buyers; emotional for SMB and startup audiences | Enterprise decisions require justification; smaller businesses respond to aspiration |
| How to balance platform-wide vs tier-specific messaging? | Lead with universal value, then tier-specific benefits in discovery flow | Broad appeal captures attention; specific benefits convert qualified prospects |
| When to refresh success stories? | Quarterly for metrics; annually for narrative structure | Metrics become stale quickly; story frameworks remain relevant longer |
| How to handle competitive narratives? | Counter weaknesses, don't attack directly; focus on unique strengths | Negative positioning creates risk; differentiation builds confidence |

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Document onboarding success stories
- `bmad-bam-tenant-tier-migration` - Capture tier transition narratives
- `create-master-architecture` - Articulate platform capability value
- `bmad-bam-tenant-analytics-dashboard` - Track ROI proof points
