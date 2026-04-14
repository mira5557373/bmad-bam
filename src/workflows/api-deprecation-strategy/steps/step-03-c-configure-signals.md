# Step 3: Configure Deprecation Signals

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

Design deprecation headers, plan warning responses, configure usage monitoring, and set up alerting thresholds.

## Prerequisites

- Step 2 completed: Timeline designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: api-headers
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability

---

## Inputs

- Output from Steps 1-2 (Candidates, timeline)
- API gateway configuration
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "HTTP Sunset header RFC 8594 implementation {date}"
Search the web: "API deprecation warning response patterns {date}"

_Source: [URL]_

### 1. Design Deprecation Headers

| Header | Value | Purpose |
|--------|-------|---------|
| Deprecation | true | Indicates deprecated |
| Sunset | RFC 7231 date | Sunset timestamp |
| Link | <migration-url>; rel="successor-version" | Migration link |
| X-Deprecation-Notice | Message | Human-readable warning |

### 2. Plan Warning Responses

| Phase | HTTP Status | Additional Headers | Body Enhancement |
|-------|-------------|-------------------|------------------|
| Deprecated | 200 (normal) | Deprecation headers | Warning in response |
| Warning | 200 + Warning | Warning: 299 | Migration prompt |
| Final | 200 + Warning | Urgent headers | Countdown message |
| Sunset | 410 Gone | Link to docs | Migration instructions |

### 3. Configure Usage Monitoring

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| deprecated_endpoint_calls | Total calls to deprecated endpoints | >1000/day |
| unique_consumers_deprecated | Unique API keys using deprecated | >10 |
| migration_progress | % traffic on new API | <50% at T-30 |
| sunset_violations | Calls after sunset | Any |

### 4. Set Up Alerting Thresholds

| Alert | Condition | Action |
|-------|-----------|--------|
| High Usage Warning | deprecated calls >threshold | Notify team |
| Slow Migration | <50% at T-30 | Escalate to PM |
| Enterprise Risk | Enterprise tenant not migrated | CSM outreach |
| Sunset Violation | Calls after sunset | Log and respond 410 |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the signal configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into header design and monitoring
- **P (Party Mode)**: Bring DevOps and architect perspectives for signal review
- **C (Continue)**: Accept signal configuration and proceed to migration support
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass signal context: headers, responses, monitoring, alerts
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review deprecation signal configuration: {summary of headers and monitoring}"
- Process collaborative analysis from DevOps and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save signal configuration
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-create-migration-support.md`

---

## Verification

- [ ] Deprecation headers designed per RFC standards
- [ ] Warning responses planned for each phase
- [ ] Usage monitoring configured
- [ ] Alerting thresholds set
- [ ] Patterns align with pattern registry

## Outputs

- Deprecation header specification
- Warning response configuration
- Monitoring dashboard design
- Alert rules

## Next Step

Proceed to `step-04-c-create-migration-support.md` to create migration support materials.
