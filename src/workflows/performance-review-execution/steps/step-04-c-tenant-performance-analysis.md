# Step 4: Tenant Performance Analysis

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

Analyze per-tenant resource consumption, detect noisy neighbors, examine usage patterns, and calculate tenant health scores.

---

## Prerequisites

- SLA verification completed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant

---

## Inputs

- SLA verification from Step 3
- Per-tenant metrics
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Per-Tenant Resource Consumption

Analyze resource usage by tenant:

| Tenant | Tier | API Calls | AI Calls | Storage | Compute % | Status |
|--------|------|-----------|----------|---------|-----------|--------|
| {id} | Enterprise | {count} | {count} | {GB} | {%} | Normal/High/Excessive |
| {id} | Pro | {count} | {count} | {GB} | {%} | Normal/High/Excessive |
| {id} | Free | {count} | {count} | {GB} | {%} | Normal/High/Excessive |

Top consumers (by resource type):
| Resource | Top 5 Tenants | Combined % of Total |
|----------|---------------|---------------------|
| API calls | {list} | {%} |
| AI calls | {list} | {%} |
| Storage | {list} | {%} |
| Compute | {list} | {%} |

### 2. Noisy Neighbor Detection

Identify tenants impacting shared resources:

| Tenant | Behavior | Impact | Affected Tenants | Action Required |
|--------|----------|--------|------------------|-----------------|
| {id} | {description} | High/Medium/Low | {count} | Yes/No |

Noisy neighbor indicators:
| Indicator | Threshold | Tenants Exceeding | Mitigation |
|-----------|-----------|-------------------|------------|
| Burst rate (req/s) | {value} | {list} | Rate limiting |
| Query complexity | {score} | {list} | Query optimization |
| AI token bursts | {value}/min | {list} | Token throttling |
| Connection hogging | {connections} | {list} | Connection pooling |

### 3. Usage Pattern Analysis

Analyze tenant usage patterns:

| Pattern | Tenant Count | % of Total | Characteristics |
|---------|--------------|------------|-----------------|
| Steady state | {count} | {%} | Consistent, predictable |
| Bursty | {count} | {%} | High variance, peaks |
| Growing | {count} | {%} | Upward trend |
| Declining | {count} | {%} | Downward trend |
| Seasonal | {count} | {%} | Time-based patterns |

AI usage patterns:
| Pattern | Tenant Count | Avg Tokens/Day | Cost Implication |
|---------|--------------|----------------|------------------|
| Heavy AI users | {count} | {tokens} | {cost} |
| Moderate AI users | {count} | {tokens} | {cost} |
| Light AI users | {count} | {tokens} | {cost} |
| Non-AI users | {count} | 0 | N/A |

### 4. Tenant Health Scoring

Calculate health scores:

| Tenant | Usage Score | Performance Score | Engagement Score | Health Score |
|--------|-------------|-------------------|------------------|--------------|
| {id} | {0-100} | {0-100} | {0-100} | {0-100} |

Health score thresholds:
- Healthy: 80-100
- At Risk: 60-79
- Unhealthy: 40-59
- Critical: 0-39

Tenants requiring attention:
| Tenant | Health Score | Primary Issue | Recommended Action |
|--------|--------------|---------------|-------------------|
| {id} | {score} | {issue} | {action} |

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant performance analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tenant health issues
- **P (Party Mode)**: Bring customer success and product perspectives on tenant analysis
- **C (Continue)**: Accept analysis and proceed to cost efficiency review
- **[Specific refinements]**: Describe tenant concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant metrics, health scores, noisy neighbors
- Process enhanced insights on tenant management
- Ask user: "Accept these refined tenant findings? (y/n)"
- If yes, integrate into performance review
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant performance analysis for multi-tenant AI platform"
- Process customer success and product perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant performance analysis to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-cost-efficiency-review.md`

---

**Verify current best practices with web search:**
Search the web: "tenant performance analysis best practices {date}"
Search the web: "tenant performance analysis multi-tenant SaaS {date}"

## Verification

- [ ] Per-tenant consumption analyzed
- [ ] Noisy neighbors detected
- [ ] Usage patterns identified
- [ ] Health scores calculated
- [ ] At-risk tenants flagged

---

## Outputs

- Tenant consumption report
- Noisy neighbor report
- Usage pattern analysis
- Tenant health scores

---

## Next Step

Proceed to `step-05-c-cost-efficiency-review.md` to review cost efficiency.
