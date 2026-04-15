# Step 3: SLA Verification

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Verify SLA compliance for availability, latency, and error rates across all tenant tiers and generate compliance reports.

---

## Prerequisites

- Capacity assessment completed (Step 2)
- SLA definitions documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: sla

---

## Inputs

- Capacity assessment from Step 2
- SLA definitions per tier
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Availability SLA Compliance Check

Verify availability against SLA targets:

| Tier | SLA Target | Achieved | Compliance | Incidents |
|------|------------|----------|------------|-----------|
| Enterprise | 99.99% | {value}% | PASS/FAIL | {count} |
| Pro | 99.9% | {value}% | PASS/FAIL | {count} |
| Free | 99.5% | {value}% | PASS/FAIL | {count} |

Downtime analysis:
| Period | Planned Downtime | Unplanned Downtime | Total | Within Budget |
|--------|------------------|--------------------| ------|---------------|
| This period | {minutes} | {minutes} | {minutes} | Yes/No |

### 2. Latency SLA Compliance Check

Verify latency against SLA targets:

| Tier | Metric | SLA Target | Achieved | Compliance |
|------|--------|------------|----------|------------|
| Enterprise | API p95 | < 100ms | {value} ms | PASS/FAIL |
| Enterprise | AI p95 | < 2000ms | {value} ms | PASS/FAIL |
| Pro | API p95 | < 200ms | {value} ms | PASS/FAIL |
| Pro | AI p95 | < 3000ms | {value} ms | PASS/FAIL |
| Free | API p95 | < 500ms | {value} ms | PASS/FAIL |
| Free | AI p95 | < 5000ms | {value} ms | PASS/FAIL |

Latency breaches:
| Tier | Breach Count | Total Duration | Affected Tenants |
|------|--------------|----------------|------------------|
| Enterprise | {count} | {minutes} | {count} |
| Pro | {count} | {minutes} | {count} |
| Free | {count} | {minutes} | {count} |

### 3. Error Rate SLA Compliance Check

Verify error rates against SLA targets:

| Tier | SLA Target | Achieved | Compliance | Trend |
|------|------------|----------|------------|-------|
| Enterprise | < 0.1% | {value}% | PASS/FAIL | Up/Down/Stable |
| Pro | < 0.5% | {value}% | PASS/FAIL | Up/Down/Stable |
| Free | < 1.0% | {value}% | PASS/FAIL | Up/Down/Stable |

Error breakdown:
| Error Type | Count | % of Total | Top Cause |
|------------|-------|------------|-----------|
| 4xx Client | {count} | {%} | {cause} |
| 5xx Server | {count} | {%} | {cause} |
| AI Failures | {count} | {%} | {cause} |
| Timeout | {count} | {%} | {cause} |

### 4. Per-Tier SLA Analysis

Summarize compliance by tier:

| Tier | Availability | Latency | Error Rate | Overall |
|------|--------------|---------|------------|---------|
| Enterprise | PASS/FAIL | PASS/FAIL | PASS/FAIL | Compliant/Non-Compliant |
| Pro | PASS/FAIL | PASS/FAIL | PASS/FAIL | Compliant/Non-Compliant |
| Free | PASS/FAIL | PASS/FAIL | PASS/FAIL | Compliant/Non-Compliant |

SLA credits/penalties:
| Tier | Breach Type | Impact | Credit Due |
|------|-------------|--------|------------|
| {tier} | {type} | {description} | {amount or N/A} |

---

## Soft Gate Checkpoint

**Steps 1-3 complete the technical performance assessment.**

Present summary:
- Baseline comparison: {key findings}
- Capacity assessment: {status}
- SLA compliance: {Enterprise/Pro/Free status}

**Ask user:** "Confirm technical assessment complete and proceed to tenant analysis? (y/n)"

---

## COLLABORATION MENUS (A/P/C):

After completing the SLA verification above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into SLA breaches
- **P (Party Mode)**: Bring customer success and SRE perspectives on compliance
- **C (Continue)**: Accept verification and proceed to tenant analysis
- **[Specific refinements]**: Describe SLA concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: SLA compliance data, breaches, credits
- Process enhanced insights on compliance improvement
- Ask user: "Accept these refined SLA findings? (y/n)"
- If yes, integrate into performance review
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SLA compliance verification for multi-tenant AI platform"
- Process customer success and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save SLA verification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-tenant-performance-analysis.md`

---

**Verify current best practices with web search:**
Search the web: "sla verification best practices {date}"
Search the web: "sla verification multi-tenant SaaS {date}"

## Verification

- [ ] Availability SLA checked per tier
- [ ] Latency SLA checked per tier
- [ ] Error rate SLA checked per tier
- [ ] Credits/penalties calculated
- [ ] Overall compliance determined

---

## Outputs

- SLA compliance report
- Breach analysis
- Credit/penalty calculation

---

## Next Step

Proceed to `step-04-c-tenant-performance-analysis.md` to analyze tenant performance.
