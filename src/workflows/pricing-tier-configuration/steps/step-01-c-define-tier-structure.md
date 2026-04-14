# Step 1: Define Tier Structure

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define the complete pricing tier hierarchy with entitlements and limits.

---

## Prerequisites

- Usage metering design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Inputs

- User requirements for pricing tiers
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Tier Hierarchy

| Tier | Price | Target Segment | Positioning |
|------|-------|----------------|-------------|
| Free | $0 | Developers, evaluation | Try before buy |
| Pro | $49-199/mo | SMB, growing teams | Production workloads |
| Enterprise | Custom | Large organizations | Full capabilities |

### 2. Define Feature Entitlements

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Core platform | Yes | Yes | Yes |
| API access | Limited | Full | Full |
| AI agents | 3 | 25 | Unlimited |
| Custom models | No | Yes | Yes |
| SSO | No | Optional | Included |
| SLA | None | 99.9% | 99.99% |
| Support | Community | Email | Dedicated |

### 3. Define Usage Limits

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| API requests/month | 10K | 100K | Unlimited |
| LLM tokens/month | 100K | 1M | Custom |
| Storage (GB) | 1 | 50 | Custom |
| Team members | 1 | 10 | Unlimited |
| Data retention | 7 days | 90 days | Custom |

### 4. Define Pricing Models

| Model | Description | Use Case |
|-------|-------------|----------|
| Flat rate | Fixed monthly fee | Simple, predictable |
| Per seat | Per user pricing | Team collaboration |
| Usage-based | Pay for what you use | Variable workloads |
| Hybrid | Base + usage overage | Predictable base, flex |

### 5. Configure Overage Handling

| Resource | Overage Rate | Hard/Soft Limit |
|----------|--------------|-----------------|
| API requests | $0.001/1K | Soft (throttle) |
| LLM tokens | $0.002/1K | Soft (charge) |
| Storage | $0.10/GB | Soft (charge) |
| Team members | $15/user | Soft (charge) |

**Verify current best practices with web search:**
Search the web: "SaaS pricing tier design best practices {date}"
Search the web: "feature-based pricing strategy enterprise {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tier structure definition above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tier structure using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for pricing analysis
- **C (Continue)**: Accept tier structure and proceed to feature gating
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

---

## Verification

- [ ] Tier hierarchy defined with clear positioning
- [ ] Feature entitlements mapped to tiers
- [ ] Usage limits specified per tier
- [ ] Pricing models selected with rationale
- [ ] Overage handling configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Tier hierarchy specification
- Feature entitlement matrix
- Usage limit configuration
- **Load template:** `{project-root}/_bmad/bam/templates/tier-comparison-ux-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/tier-ux-spec-template.md`

---

## Next Step

Proceed to `step-02-c-configure-feature-gating.md` to design feature gating.
