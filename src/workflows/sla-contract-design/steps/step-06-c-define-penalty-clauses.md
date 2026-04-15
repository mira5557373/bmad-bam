# Step 6: Define Penalty Clauses

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead
- Use web search to verify current best practices when making technology decisions

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Establish SLA breach remedies including service credit calculations, refund policies, termination rights, and liability limitations.

---

## Prerequisites

- Step 5 (Create Support Tiers) completed
- Support tiers documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Support tiers from Step 5
- Uptime guarantees from Step 2
- Financial and legal requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Availability Credit Schedule

Establish service credits for availability SLA breaches:

| Availability Level | Service Credit | Calculation Basis |
|--------------------|----------------|-------------------|
| <99.99% (Premium) | 10% monthly fee | Pro-rata |
| <99.95% (Enterprise) | 10% monthly fee | Pro-rata |
| <99.9% (Pro) | 10% monthly fee | Pro-rata |
| <99.5% (Starter) | 10% monthly fee | Pro-rata |
| <99.0% (all tiers) | 25% monthly fee | Pro-rata |
| <98.0% | 50% monthly fee | Pro-rata |
| <95.0% | 100% monthly fee | Full month credit |

### 2. Define Latency Credit Schedule

Establish service credits for latency SLA breaches:

| Latency Breach | Service Credit | Measurement Period |
|----------------|----------------|-------------------|
| P95 exceeded by <20% | 5% of monthly fee | Per calendar month |
| P95 exceeded by 20-50% | 10% of monthly fee | Per calendar month |
| P95 exceeded by >50% | 25% of monthly fee | Per calendar month |
| Sustained (>7 days) | 50% of monthly fee | Pro-rata affected days |

### 3. Define Support Credit Schedule

Establish service credits for support SLA breaches:

| Breach Type | Service Credit | Cap |
|-------------|----------------|-----|
| P1 response missed | 5% per incident | 25% monthly |
| P2 response missed | 2% per incident | 15% monthly |
| Multiple P1 misses (>3/month) | 25% monthly fee | N/A |
| Pattern of misses (3 consecutive months) | Exit option | N/A |

### 4. Define Credit Calculation Rules

Establish how credits are calculated and applied:

| Rule | Description |
|------|-------------|
| Maximum Credit | 100% of monthly fees in any single month |
| Credit Application | Applied to next billing cycle |
| Credit Expiration | Must be used within 12 months |
| Credit Request Deadline | Within 30 days of incident |
| Minimum Credit Amount | $5 (to avoid administrative overhead) |
| Stacking | Multiple credits may stack, subject to cap |

### 5. Define Credit Claim Process

Establish the process for claiming service credits:

| Step | Action | Timeframe |
|------|--------|-----------|
| 1 | Customer identifies SLA breach | Within 30 days of incident |
| 2 | Customer submits credit request | Via support ticket or API |
| 3 | Provider validates breach | Within 5 business days |
| 4 | Credit approved/denied | Within 10 business days |
| 5 | Credit applied | Next billing cycle |
| 6 | Dispute resolution | 30 days from denial |

### 6. Define Termination Rights

Establish termination conditions based on SLA performance:

| Condition | Right | Notice Period |
|-----------|-------|---------------|
| Availability <95% for 3 consecutive months | Customer termination without penalty | 30 days |
| Multiple P1 incidents (>5 per quarter) | Customer termination without penalty | 30 days |
| Material breach (data loss, security) | Immediate termination | None |
| Persistent latency issues (>3 months) | Exit without penalty | 30 days |

### 7. Define Liability Limitations

Establish liability caps and exclusions:

| Limitation | Description |
|------------|-------------|
| Direct Damages Cap | 12 months of fees paid (Enterprise: negotiable) |
| Indirect Damages | Excluded (consequential, incidental, punitive) |
| Data Loss | Limited to reasonable backup costs |
| Force Majeure | No liability for events beyond reasonable control |
| Exclusive Remedy | Service credits are sole and exclusive remedy for SLA breaches |

### 8. Define Credit Exclusions

Specify when credits do NOT apply:

| Exclusion | Rationale |
|-----------|-----------|
| Planned maintenance | Pre-announced with proper notice |
| Customer-caused issues | Misconfiguration, misuse |
| Beta features | Not covered by SLA |
| Third-party failures | Outside platform control |
| Free tier | No SLA commitments |
| Trial periods | No SLA during trials |

**Verify current best practices with web search:**
Search the web: "SaaS SLA service credit best practices {date}"
Search the web: "cloud provider penalty clause structures {date}"
Search the web: "SLA breach remedy legal considerations {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the penalty clauses above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into credit calculations and liability considerations
- **P (Party Mode)**: Bring legal and finance perspectives for penalty review
- **C (Continue)**: Accept penalty clauses and proceed to monitoring requirements
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: credit schedules, termination rights, liability limitations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into penalty clauses
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review penalty clauses: {summary of credits, termination, liability}"
- Process collaborative analysis from legal and finance personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save penalty clauses to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-design-monitoring-requirements.md`

---

## Verification

- [ ] Availability credits defined per tier
- [ ] Latency credits established
- [ ] Support credits documented
- [ ] Credit calculation rules specified
- [ ] Claim process documented
- [ ] Termination rights established
- [ ] Liability limitations defined
- [ ] Exclusions clearly stated
- [ ] Patterns align with pattern registry

---

## Outputs

- Service credit schedules
- Credit claim process documentation
- Termination rights matrix
- Liability limitation clauses
- **Load template:** `{project-root}/_bmad/bam/data/templates/error-budget-policy-template.md`

---

## Next Step

Proceed to `step-07-c-design-monitoring-requirements.md` to define SLA monitoring approach.
