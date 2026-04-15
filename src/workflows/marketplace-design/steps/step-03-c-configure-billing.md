# Step 3: Configure Billing Integration

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Design pricing models, plan tenant billing, configure revenue sharing, and set up usage tracking.

## Prerequisites

- Steps 1-2 completed: Architecture and lifecycle designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: revenue-sharing

---

## Actions

**Verify current best practices with web search:**
Search the web: "marketplace billing models SaaS {date}"
Search the web: "app store revenue sharing models {date}"

_Source: [URL]_

### 1. Design Pricing Models

| Model | Description | Use Case |
|-------|-------------|----------|
| Free | No charge | Lead gen, basic tools |
| One-time | Single purchase | Utilities, templates |
| Subscription | Recurring | Full-featured apps |
| Usage-based | Pay per use | API-heavy apps |
| Freemium | Free + paid tiers | Growth strategy |

### 2. Plan Tenant Billing

| Billing Type | Implementation | Invoice |
|--------------|----------------|---------|
| Direct | Developer bills tenant | Separate |
| Platform | Platform bills tenant | Consolidated |
| Split | Both parties | Itemized |

### 3. Configure Revenue Sharing

| Tier | Platform Share | Developer Share |
|------|----------------|-----------------|
| Standard | 30% | 70% |
| Premium Partner | 20% | 80% |
| Enterprise | Custom | Custom |

### 4. Set Up Usage Tracking

| Metric | Tracking | Reporting |
|--------|----------|-----------|
| Installs | Event-based | Real-time |
| Active users | Session tracking | Daily |
| API calls | Request logging | Hourly |
| Revenue | Transaction logs | Monthly |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] Pricing models designed
- [ ] Tenant billing planned
- [ ] Revenue sharing configured
- [ ] Usage tracking set up
- [ ] Patterns align with pattern registry

## Outputs

- Billing integration specification
- Revenue sharing model
- Usage tracking configuration
- **Load template:** `{project-root}/_bmad/bam/data/templates/marketplace-template.md`

## Next Step

Workflow complete. Present Marketplace Design with billing configuration to user for review and approval.
