# Step 2: Design Blast Radius Controls

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

Design blast radius controls and safety mechanisms for chaos experiments.

---

## Prerequisites

- Step 1 completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: safety

---

## Actions

### 1. Blast Radius Levels

| Level | Scope | Tenant Impact | Example |
|-------|-------|---------------|---------|
| Minimal | Single component | None | One pod failure |
| Limited | Single service | < 1% tenants | Service degradation |
| Moderate | Service group | 1-10% tenants | Zone failure |
| Broad | Multiple zones | 10-50% tenants | Region degradation |
| Maximum | Platform-wide | All tenants | Full DR test |

### 2. Safety Controls

| Control | Purpose | Implementation |
|---------|---------|----------------|
| Kill switch | Immediate abort | Manual + automated triggers |
| Time limit | Bound duration | Max experiment time |
| Metric thresholds | Auto-abort criteria | Error rate, latency limits |
| Tenant exclusion | Protect specific tenants | Enterprise tier exempt list |
| Progressive rollout | Gradual expansion | 1% -> 5% -> 25% -> 100% |

### 3. Tenant Protection Matrix

| Tenant Tier | Allowed Experiments | Notification | Consent |
|-------------|---------------------|--------------|---------|
| Enterprise | Limited scope only | 72h advance | Required |
| Business | Standard experiments | 24h advance | Opt-out |
| Starter | All experiments | Status page | Implied |
| Trial | All experiments | None | ToS |

### 4. Abort Criteria

| Metric | Threshold | Action |
|--------|-----------|--------|
| Error rate | > 5% | Auto-abort |
| P99 latency | > 2x baseline | Auto-abort |
| Tenant complaints | > 3 within 15m | Manual review |
| Data integrity | Any violation | Immediate abort + rollback |
| Security event | Any detected | Immediate abort + incident |

**Verify current best practices with web search:**
Search the web: "chaos engineering blast radius control {date}"
Search the web: "chaos experiment safety guardrails {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing blast radius design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into safety controls
- **P (Party Mode)**: Bring operations and legal perspectives
- **C (Continue)**: Accept blast radius design and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save blast radius design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-assembly.md`

---

## Verification

- [ ] Blast radius levels defined
- [ ] Safety controls documented
- [ ] Tenant protection matrix complete
- [ ] Abort criteria established
- [ ] Patterns align with pattern registry

---

## Outputs

- Blast radius definitions
- Safety control procedures
- Tenant protection rules

---

## Next Step

Proceed to `step-03-c-assembly.md` to assemble final document.
