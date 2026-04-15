# Step 1: DR Plan Execution

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


---

## Purpose

Execute the documented disaster recovery plan procedures. This includes activating DR protocols, notifying stakeholders, and beginning the recovery process.

---

## Prerequisites

- DR plan documentation available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `high-availability`

---

## Inputs

- DR plan documentation
- Contact list for DR team
- DR environment access credentials
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Review DR Plan

Document DR plan components being tested:

| Component | DR Strategy | RPO Target | RTO Target |
|-----------|-------------|------------|------------|
| Database | Continuous replication | 5 min | 30 min |
| Application | Active-passive | N/A | 15 min |
| AI Models | Replicated storage | 1 hour | 1 hour |
| Vector DB | Cross-region sync | 15 min | 30 min |
| Tenant Config | Backup restore | 1 hour | 30 min |

### 2. Pre-Drill Checklist

Verify readiness before drill:
- [ ] DR environment accessible
- [ ] DR team notified and available
- [ ] Communication channels established
- [ ] Stakeholder notification prepared
- [ ] Rollback plan confirmed

### 3. Execute DR Procedures

Follow DR plan procedures:

| Step | Procedure | Owner | Status | Time |
|------|-----------|-------|--------|------|
| 1 | Declare DR event (simulated) | DR Lead | [ ] | |
| 2 | Notify DR team | Communications | [ ] | |
| 3 | Activate DR infrastructure | SRE | [ ] | |
| 4 | Switch DNS/traffic | Network | [ ] | |
| 5 | Verify application health | QA | [ ] | |

### 4. Document Execution Log

Record all actions taken:

| Timestamp | Action | Result | Notes |
|-----------|--------|--------|-------|
| | | | |

**Verify current best practices with web search:**
Search the web: "disaster recovery drill execution checklist {date}"
Search the web: "DR plan testing best practices SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing DR plan execution, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into execution issues or blockers
- **P (Party Mode)**: Bring SRE and operations perspectives for review
- **C (Continue)**: Accept execution results and proceed to failover testing
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save execution log to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-failover-testing.md`

---

## Verification

- [ ] DR plan reviewed
- [ ] Pre-drill checklist completed
- [ ] DR procedures executed
- [ ] Execution log documented
- [ ] Patterns align with pattern registry

---

## Outputs

- DR plan execution log
- Pre-drill checklist
- Procedure completion status
- **Load template:** `{project-root}/_bmad/bam/data/templates/dr-execution-log-template.md`

---

## Next Step

Proceed to `step-02-c-failover-testing.md` to test failover to DR environment.
