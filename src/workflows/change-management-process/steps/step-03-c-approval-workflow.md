# Step 3: Design Approval Workflow

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design approval workflows and governance structures for changes.

---

## Prerequisites

- Step 2 completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: governance

---

## Actions

### 1. Approval Matrix

| Change Type | Risk Level | Approvers | SLA |
|-------------|------------|-----------|-----|
| Standard | Low | Auto-approved | Immediate |
| Standard | Medium | Team lead | 4 hours |
| Normal | Medium | Engineering manager | 24 hours |
| Normal | High | CAB | 48 hours |
| Emergency | Any | On-call lead + manager | 1 hour |
| Major | High | CAB + VP Engineering | 1 week |
| Major | Critical | Executive team | 2 weeks |

### 2. CAB Structure

| Role | Responsibility | Voting Power |
|------|----------------|--------------|
| Chair | Facilitate, final decision | Tie-breaker |
| Engineering rep | Technical assessment | Full vote |
| Security rep | Security impact | Veto on security |
| Operations rep | Operational impact | Full vote |
| Product rep | Customer impact | Advisory |

### 3. Workflow Stages

| Stage | Activities | Exit Criteria |
|-------|------------|---------------|
| Request | Submit change request | All fields complete |
| Assessment | Impact analysis, risk scoring | Impact documented |
| Review | Peer review, test results | Tests passing |
| Approval | Approval workflow | Required approvals |
| Schedule | Schedule window | Window confirmed |
| Execute | Deploy change | Deployment complete |
| Verify | Post-change validation | Metrics nominal |
| Close | Documentation, lessons | Change record closed |

### 4. Emergency Procedures

| Scenario | Fast-Track Process | Post-Hoc Requirements |
|----------|-------------------|----------------------|
| Security breach | On-call + manager | CAB review within 48h |
| Data loss | On-call + director | Full postmortem |
| Service outage | On-call + on-call lead | Incident report |
| Compliance violation | Security + legal | Compliance review |

**Verify current best practices with web search:**
Search the web: "CAB change advisory board best practices {date}"
Search the web: "DevOps change approval automation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing approval workflow design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into approval matrix and CAB structure
- **P (Party Mode)**: Bring governance and compliance perspectives
- **C (Continue)**: Accept approval workflow and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save approval workflow to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-assembly.md`

---

## Verification

- [ ] Approval matrix complete
- [ ] CAB structure defined
- [ ] Workflow stages documented
- [ ] Emergency procedures established
- [ ] Patterns align with pattern registry

---

## Outputs

- Approval matrix
- CAB charter
- Workflow documentation

---

## Next Step

Proceed to `step-04-c-assembly.md` to assemble final document.
