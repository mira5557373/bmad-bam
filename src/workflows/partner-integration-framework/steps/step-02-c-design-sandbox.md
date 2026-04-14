# Step 2: Design Sandbox Environment

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

Configure sandbox provisioning, set up data isolation, plan resource limits, and design testing capabilities.

## Prerequisites

- Step 1 completed: Partner tiers defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: sandbox-provisioning
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Inputs

- Output from Step 1 (Partner tiers)
- Infrastructure capabilities
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "developer sandbox environment best practices {date}"
Search the web: "API testing sandbox design patterns {date}"

_Source: [URL]_

### 1. Configure Sandbox Provisioning

| Sandbox Type | Provisioning | TTL | Auto-reset |
|--------------|--------------|-----|------------|
| Development | Self-service | 30 days | Weekly |
| Testing | Self-service | 7 days | Daily |
| Demo | Request-based | 90 days | Never |
| Certification | Automated | Per-test | Always |

### 2. Set Up Data Isolation

| Isolation Level | Implementation | Use Case |
|-----------------|----------------|----------|
| Shared data | Seed data, read-only | Quick start |
| Isolated data | Per-sandbox DB | Custom testing |
| Production mirror | Anonymized copy | Realistic testing |

### 3. Plan Resource Limits

| Resource | Development | Testing | Demo |
|----------|-------------|---------|------|
| API calls/day | 1,000 | 10,000 | 5,000 |
| Storage | 100MB | 1GB | 500MB |
| Compute | Shared | Shared | Dedicated |

### 4. Design Testing Capabilities

| Capability | Description | Availability |
|------------|-------------|--------------|
| Mock responses | Simulate edge cases | All sandboxes |
| Time travel | Test date-sensitive logic | Testing only |
| Chaos injection | Failure simulation | Advanced |
| Webhook testing | Callback simulation | All sandboxes |

---

## Soft Gate Checkpoint

**Steps 1-2 complete the partner and sandbox design phase.**

Present summary of:
- Partner tier structure
- Sandbox environment design
- Resource limits by tier

Ask for confirmation before proceeding to certification program.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the sandbox design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into sandbox provisioning and limits
- **P (Party Mode)**: Bring DevOps and architect perspectives for sandbox review
- **C (Continue)**: Accept sandbox design and proceed to certification program
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass sandbox context: provisioning, isolation, limits, testing
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review sandbox design: {summary of provisioning and limits}"
- Process collaborative analysis from DevOps and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save sandbox design
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-create-certification.md`

---

## Verification

- [ ] Sandbox provisioning configured
- [ ] Data isolation set up
- [ ] Resource limits planned
- [ ] Testing capabilities designed
- [ ] Patterns align with pattern registry

## Outputs

- Sandbox environment specification
- Resource limit configuration
- Testing capability guide

## Next Step

Proceed to `step-03-c-create-certification.md` to create certification program.
