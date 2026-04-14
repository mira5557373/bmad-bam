# Step 5: Resolution Verification

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

Verify that mitigation was effective, confirm service restoration, validate tenant impact is resolved, and close the incident status.

---

## Prerequisites

- Mitigation executed (Step 4)
- Monitoring showing improvement
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident-response

---

## Inputs

- Mitigation execution from Step 4
- Monitoring dashboards
- Tenant status reports
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Verify Mitigation Effectiveness

Confirm mitigation addressed the root cause:

| Verification Check | Expected | Actual | Status |
|--------------------|----------|--------|--------|
| Root cause addressed | {description} | {observation} | Pass/Fail |
| Error rate normalized | < {threshold} | {value} | Pass/Fail |
| Latency normalized | < {threshold} | {value} | Pass/Fail |
| No regression | Stable | {observation} | Pass/Fail |

### 2. Confirm Service Restoration

Verify service health across all components:

| Component | Pre-Incident | Post-Mitigation | Status |
|-----------|--------------|-----------------|--------|
| API Gateway | {status} | {status} | Restored/Degraded |
| AI Runtime | {status} | {status} | Restored/Degraded |
| Database | {status} | {status} | Restored/Degraded |
| Message Queue | {status} | {status} | Restored/Degraded |
| Cache Layer | {status} | {status} | Restored/Degraded |

### 3. Validate Tenant Impact Resolved

Confirm all affected tenants are restored:

| Tenant Tier | Affected Count | Restored Count | Remaining Issues |
|-------------|----------------|----------------|------------------|
| Enterprise | {count} | {count} | {issues or None} |
| Pro | {count} | {count} | {issues or None} |
| Free | {count} | {count} | {issues or None} |

Tenant confirmation method:
- [ ] Automated health checks passed
- [ ] Synthetic transactions successful
- [ ] Manual verification (if required)
- [ ] Tenant feedback received (if applicable)

### 4. Verify AI Workload Restoration

For AI-related incidents:

| AI Metric | Pre-Incident | Post-Mitigation | Target | Status |
|-----------|--------------|-----------------|--------|--------|
| LLM availability | {value} | {value} | 99.9% | Pass/Fail |
| Agent success rate | {value} | {value} | > 95% | Pass/Fail |
| Token consumption | {value} | {value} | Normal | Pass/Fail |
| Memory isolation | Intact | {status} | Intact | Pass/Fail |

### 5. Close Incident Status

Update incident record:

| Field | Value |
|-------|-------|
| Status | Resolved |
| Resolution time | {timestamp} |
| Total duration | {hours:minutes} |
| MTTR | {value} |
| Resolution summary | {brief description} |

---

## COLLABORATION MENUS (A/P/C):

After completing the resolution verification above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into resolution completeness
- **P (Party Mode)**: Bring SRE and customer success perspectives on resolution
- **C (Continue)**: Accept resolution and proceed to postmortem scheduling
- **[Specific refinements]**: Describe verification concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: verification results, tenant status, service metrics
- Process enhanced insights on resolution completeness
- Ask user: "Accept these refined verification conclusions? (y/n)"
- If yes, integrate into incident report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident resolution verification for multi-tenant AI platform"
- Process SRE and customer success perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save resolution verification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-postmortem-scheduling.md`

---

**Verify current best practices with web search:**
Search the web: "resolution verification best practices {date}"
Search the web: "resolution verification multi-tenant SaaS {date}"

## Verification

- [ ] Mitigation effectiveness confirmed
- [ ] Service restoration verified
- [ ] Tenant impact resolved
- [ ] AI workload restored (if applicable)
- [ ] Incident status closed

---

## Outputs

- Resolution verification report
- Service restoration confirmation
- Tenant impact resolution confirmation
- Incident closure record

---

## Next Step

Proceed to `step-06-c-postmortem-scheduling.md` to schedule postmortem.
