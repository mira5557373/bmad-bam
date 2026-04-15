# Step 5: Define Rollback Procedures

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

Define comprehensive rollback mechanisms including automatic triggers, manual procedures, data consistency handling, and tenant notification during rollback events.

---

## Prerequisites

- Steps 1-4 completed with validation gates defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `model-deployment`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- Deployment configuration from Steps 1-4
- Model validation gates
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Configure Automatic Rollback Triggers

| Trigger | Detection Method | Threshold | Rollback Speed |
|---------|------------------|-----------|----------------|
| Error Rate Spike | Prometheus alert | > 2% for 5 min | Immediate |
| Latency Degradation | Percentile breach | p99 > 3x baseline | Immediate |
| Model Quality Drop | Eval metrics | < 90% baseline | 5 min staged |
| Resource Exhaustion | OOM/GPU alerts | Any occurrence | Immediate |
| Safety Violation | Guardrail breach | Any occurrence | Immediate |
| Tenant Complaint | Support tickets | > 3 critical | Manual review |

For each trigger, define:
- Detection confidence level
- Grace period before triggering
- Escalation path
- False positive handling

### 2. Define Manual Rollback Procedures

| Procedure | Trigger | Approvers | SLA |
|-----------|---------|-----------|-----|
| Emergency Rollback | Critical incident | On-call + TL | < 5 min |
| Planned Rollback | Feature regression | Product owner | < 30 min |
| Tenant-Specific | Tenant request | Support lead | < 1 hour |
| Partial Rollback | Tier-specific issue | Platform team | < 15 min |

Document step-by-step procedures:

1. **Initiate Rollback**
   - Access rollback dashboard/CLI
   - Select target version (previous stable)
   - Confirm tenant scope (all vs specific)

2. **Execute Rollback**
   - Pause incoming deployments
   - Switch traffic to previous version
   - Verify previous version healthy

3. **Verify Rollback**
   - Check all health endpoints
   - Verify tenant isolation intact
   - Confirm metrics returning to baseline

4. **Post-Rollback**
   - Create incident report
   - Notify stakeholders
   - Schedule root cause analysis

### 3. Ensure Data Consistency During Rollback

| Data Type | Consistency Strategy | Verification |
|-----------|---------------------|--------------|
| Model State | Stateless (no user data in model) | N/A |
| Agent Memory | Version-tagged, compatible across versions | Memory read test |
| Conversation History | Backward compatible format | Replay test |
| Vector Embeddings | Re-index if schema changed | Similarity test |
| Cached Predictions | Invalidate on rollback | Cache cleared |

Define:
- Schema migration compatibility requirements
- Data format version contracts
- Rollback-safe data operations
- Cleanup procedures for orphaned data

### 4. Configure Tenant Notification During Rollback

| Notification Type | Channel | Recipients | Template |
|-------------------|---------|------------|----------|
| Rollback Initiated | Email + In-App | Admins | `rollback-started` |
| Rollback Complete | Email + Webhook | Admins + Devs | `rollback-complete` |
| Service Restored | In-App | All users | `service-restored` |
| Incident Report | Email | Admins | `incident-summary` |

Template content requirements:
- Current model version (rolled back to)
- Previous model version (rolled back from)
- Reason for rollback
- Expected behavior changes
- Support contact information
- Timeline for next update

**Verify current best practices with web search:**
Search the web: "ML model rollback best practices {date}"
Search the web: "deployment rollback strategies Kubernetes {date}"
Search the web: "incident communication during rollback {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the rollback procedures above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into rollback triggers and data consistency
- **P (Party Mode)**: Bring analyst and architect perspectives for rollback review
- **C (Continue)**: Accept rollback procedures and proceed to A/B testing
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass rollback context: triggers, procedures, data handling
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into rollback configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review rollback procedures: {summary of triggers and procedures}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save rollback procedures to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-ab-testing.md`

---

## Verification

- [ ] Automatic rollback triggers configured
- [ ] Manual rollback procedures documented
- [ ] Data consistency strategies defined
- [ ] Tenant notification workflow established
- [ ] Rollback tested in staging environment
- [ ] Patterns align with pattern registry

---

## Outputs

- Rollback trigger configuration
- Manual rollback runbook
- Data consistency requirements
- Notification templates

---

## Next Step

Proceed to `step-06-c-ab-testing.md` to design A/B testing framework.
