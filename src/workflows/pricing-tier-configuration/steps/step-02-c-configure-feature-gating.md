# Step 2: Configure Feature Gating

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

Design the feature gating and entitlement checking system.

---

## Prerequisites

- Tier structure defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Entitlement Check Points

| Check Point | Location | Latency Budget |
|-------------|----------|----------------|
| API gateway | Request ingress | <5ms |
| Service layer | Business logic | <10ms |
| UI components | Frontend | Cached |
| Background jobs | Job scheduler | <50ms |

### 2. Configure Entitlement Cache

| Cache Layer | TTL | Invalidation |
|-------------|-----|--------------|
| Edge cache | 5 min | Tier change event |
| Service cache | 1 min | Tier change event |
| Session cache | Session | Login/logout |

### 3. Define Gate Behaviors

| Gate Type | Blocked Behavior | User Experience |
|-----------|------------------|-----------------|
| Hard gate | Block access | Upgrade prompt |
| Soft gate | Allow with warning | Usage limit alert |
| Metered gate | Count and limit | Usage dashboard |
| Trial gate | Time-limited access | Trial expiry notice |

### 4. Configure Upgrade Prompts

| Trigger | Prompt Location | Message Type |
|---------|-----------------|--------------|
| Feature access denied | In-context | Upgrade CTA |
| Usage approaching limit | Dashboard | Warning banner |
| Usage exceeded | API response | Error with link |
| Trial expiring | Email + UI | Countdown |

### 5. Design Graceful Degradation

| Scenario | Degradation | Communication |
|----------|-------------|---------------|
| Downgrade | Feature access revoked | Email + UI notice |
| Payment failed | Grace period, then soft limits | Email sequence |
| Quota exceeded | Throttle, not block | Dashboard warning |

**Verify current best practices with web search:**
Search the web: "feature flag entitlement system design {date}"
Search the web: "SaaS feature gating patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the feature gating configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into feature gating using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for gating analysis
- **C (Continue)**: Accept feature gating and proceed to price versioning
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

---

## Verification

- [ ] Entitlement check points defined
- [ ] Caching strategy configured
- [ ] Gate behaviors specified
- [ ] Upgrade prompts designed
- [ ] Graceful degradation documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Feature gating specification
- Entitlement cache configuration
- Upgrade prompt templates

---

## Next Step

Proceed to `step-03-c-design-price-versioning.md` to configure price versioning.
