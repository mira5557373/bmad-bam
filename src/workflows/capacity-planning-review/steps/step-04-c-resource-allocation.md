# Step 4: Resource Allocation Verification

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

Verify per-tier resource allocation, quotas, fair share validation, and AI resource allocation to ensure proper capacity distribution.

---

## Prerequisites

- Scaling thresholds defined (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Actions

### 1. Per-Tier Resource Allocation Review

| Tier | API Rate Limit | AI Tokens/Day | Storage | Compute Share |
|------|----------------|---------------|---------|---------------|
| Enterprise | {value}/s | {value} | {GB} | {%} priority |
| Pro | {value}/s | {value} | {GB} | {%} |
| Free | {value}/s | {value} | {GB} | {%} best-effort |

### 2. Quota Verification

| Tier | Quota Type | Configured | Actual Usage | Status |
|------|------------|------------|--------------|--------|
| Enterprise | API calls/day | {value} | {value} | OK/Warning |
| Enterprise | AI tokens/day | {value} | {value} | OK/Warning |
| Pro | API calls/day | {value} | {value} | OK/Warning |
| Pro | AI tokens/day | {value} | {value} | OK/Warning |
| Free | API calls/day | {value} | {value} | OK/Warning |
| Free | AI tokens/day | {value} | {value} | OK/Warning |

### 3. Fair Share Validation

| Resource | Enterprise Share | Pro Share | Free Share | Validation |
|----------|------------------|-----------|------------|------------|
| Compute | {%} | {%} | {%} | Pass/Fail |
| Database | {%} | {%} | {%} | Pass/Fail |
| AI capacity | {%} | {%} | {%} | Pass/Fail |

Noisy neighbor protection verified:
- [ ] Rate limiting enforced per tenant
- [ ] Burst limits configured
- [ ] Fair queuing implemented

### 4. AI Resource Allocation

| AI Resource | Total Capacity | Enterprise | Pro | Free | Buffer |
|-------------|----------------|------------|-----|------|--------|
| GPT-4 tokens/min | {value} | {%} | {%} | {%} | {%} |
| Concurrent agents | {value} | {%} | {%} | {%} | {%} |
| Embedding capacity | {value} | {%} | {%} | {%} | {%} |

**Verify current best practices with web search:**
Search the web: "multi-tenant resource allocation fair scheduling {date}"
Search the web: "AI workload capacity planning best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into allocation fairness
- **P (Party Mode)**: Bring product and engineering perspectives
- **C (Continue)**: Finalize capacity planning review
- **[Specific refinements]**: Describe allocation concerns

Select an option:
```

#### If 'C' (Continue):
- Save resource allocation verification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Mark workflow as complete

---

## Verification

- [ ] Per-tier allocation reviewed
- [ ] Quotas verified
- [ ] Fair share validated
- [ ] AI resource allocation documented

---

## Outputs

- Resource allocation verification
- Capacity plan summary
- **Load template:** `{project-root}/_bmad/bam/templates/capacity-planning-template.md`

---

## Workflow Complete

The capacity planning review workflow is complete. Key artifacts produced:
- Capacity plan: `{output_folder}/operations/capacity/capacity-plan-{date}.md`
- Scaling recommendations: `{output_folder}/operations/capacity/scaling-recommendations-{date}.md`

Next steps:
- Review and approve capacity plan
- Implement scaling recommendations
- Schedule next capacity review
- Consider running `validate` mode to verify QG-CP1 compliance
