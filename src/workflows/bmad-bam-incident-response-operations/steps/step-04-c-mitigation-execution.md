# Step 4: Mitigation Execution

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
- Use web search to verify current best practices when making operational decisions

---

## Purpose

Execute mitigation procedures to restore service, implement temporary workarounds if needed, monitor for regression, and communicate progress to stakeholders.

---

## Prerequisites

- Investigation completed (Step 3)
- Root cause hypothesis identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: incident-response

---

## Inputs

- Investigation findings from Step 3
- Runbooks and playbooks
- Change management procedures
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Select Mitigation Strategy

Based on root cause, select appropriate mitigation:

| Strategy | Use When | Risk Level | Rollback |
|----------|----------|------------|----------|
| Rollback deployment | Bad deploy identified | Low | Automatic |
| Scale resources | Capacity issue | Low | Scale down |
| Restart services | State corruption | Medium | N/A |
| Failover to backup | Primary system failure | Medium | Failback |
| Enable circuit breaker | Cascading failure | Low | Disable breaker |
| Block traffic source | Attack/abuse | Medium | Unblock |
| Hotfix deployment | Bug identified | High | Rollback |

Selected strategy: {strategy}

### 2. Execute Mitigation Procedures

Document mitigation execution:

| Step | Action | Executor | Time | Status |
|------|--------|----------|------|--------|
| 1 | {action description} | {name} | {timestamp} | [ ] Complete |
| 2 | {action description} | {name} | {timestamp} | [ ] Complete |
| 3 | {action description} | {name} | {timestamp} | [ ] Complete |

### 3. Implement Temporary Workarounds

If full fix not immediately possible:

| Workaround | Description | Impact | Duration |
|------------|-------------|--------|----------|
| {workaround 1} | {description} | {user impact} | Until {date/condition} |
| {workaround 2} | {description} | {user impact} | Until {date/condition} |

### 4. Monitor for Regression

Set up monitoring for mitigation effectiveness:

| Metric | Pre-Incident | During Incident | Post-Mitigation | Target |
|--------|--------------|-----------------|-----------------|--------|
| Error rate | {value} | {value} | {value} | < {threshold} |
| Latency p99 | {value} | {value} | {value} | < {threshold} |
| Availability | {value} | {value} | {value} | > {threshold} |
| AI success rate | {value} | {value} | {value} | > {threshold} |

### 5. Communicate Progress

Update stakeholders per communication cadence:

| Update # | Time | Status | Key Message |
|----------|------|--------|-------------|
| 1 | {timestamp} | Investigating | Aware of issue, investigating |
| 2 | {timestamp} | Identified | Root cause identified, executing fix |
| 3 | {timestamp} | Monitoring | Mitigation applied, monitoring |

---

## Soft Gate Checkpoint

**Steps 1-4 complete the active incident response.**

Present summary:
- Incident classification: {severity}
- Response team: {assembled/active}
- Root cause: {hypothesis}
- Mitigation: {status}
- Current service status: {status}

**Ask user:** "Confirm mitigation is effective and proceed to resolution verification? (y/n)"

---

## COLLABORATION MENUS (A/P/C):

After completing the mitigation execution above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into mitigation effectiveness
- **P (Party Mode)**: Bring SRE and DevOps perspectives on mitigation strategy
- **C (Continue)**: Accept mitigation and proceed to resolution verification
- **[Specific refinements]**: Describe mitigation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: mitigation actions, monitoring data, workarounds
- Process enhanced insights on mitigation effectiveness
- Ask user: "Accept these refined mitigation decisions? (y/n)"
- If yes, integrate into incident report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident mitigation execution for multi-tenant AI platform"
- Process SRE and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save mitigation execution to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-resolution-verification.md`

---

**Verify current best practices with web search:**
Search the web: "mitigation execution best practices {date}"
Search the web: "mitigation execution multi-tenant SaaS {date}"

## Verification

- [ ] Mitigation strategy selected and justified
- [ ] Mitigation procedures executed
- [ ] Workarounds documented (if applicable)
- [ ] Monitoring confirms improvement
- [ ] Stakeholders updated

---

## Outputs

- Mitigation execution log
- Workaround documentation
- Monitoring snapshots
- Stakeholder communication log

---

## Next Step

Proceed to `step-05-c-resolution-verification.md` to verify resolution.
