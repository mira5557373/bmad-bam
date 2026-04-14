# Step 4: Plan Migration Timeline

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOOP **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- WRITE Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics

---

## Purpose

Create a comprehensive deprecation schedule with milestones, tenant migration windows, and go/no-go decision points to ensure safe and predictable model sunset.

---

## Prerequisites

- Step 03 (Evaluate Replacement Models) completed
- Replacement model recommendations available
- Provider deprecation deadline known
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: change-management
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv`

---

## Actions

### 1. Define Deprecation Phases

Establish major phases with target dates:

| Phase | Name | Start Date | End Date | Duration | Key Activities |
|-------|------|------------|----------|----------|----------------|
| 0 | Preparation | {date} | {date} | 2 weeks | Planning, tooling |
| 1 | Announcement | {date} | {date} | 1 week | Tenant notification |
| 2 | Early Migration | {date} | {date} | 4 weeks | Voluntary migration |
| 3 | Active Migration | {date} | {date} | 6 weeks | Assisted migration |
| 4 | Final Migration | {date} | {date} | 2 weeks | Mandatory migration |
| 5 | Decommission | {date} | {date} | 1 week | Model removal |

### 2. Create Milestone Schedule

Define specific milestones with owners:

| Milestone | Date | Owner | Dependencies | Success Criteria |
|-----------|------|-------|--------------|------------------|
| Deprecation plan approved | {date} | {owner} | {deps} | Sign-off received |
| Replacement models validated | {date} | {owner} | {deps} | Benchmarks pass |
| Communication materials ready | {date} | {owner} | {deps} | Templates approved |
| First tenant notification | {date} | {owner} | {deps} | Emails sent |
| Migration tooling deployed | {date} | {owner} | {deps} | Tools available |
| 50% tenants migrated | {date} | {owner} | {deps} | Metric achieved |
| 90% tenants migrated | {date} | {owner} | {deps} | Metric achieved |
| Deprecated model sunset | {date} | {owner} | {deps} | Traffic at 0 |
| Model decommissioned | {date} | {owner} | {deps} | Infrastructure removed |

### 3. Define Tenant Migration Windows

Schedule migration windows by tier:

| Tier | Migration Window | Duration | Support Level | Rollback Window |
|------|-----------------|----------|---------------|-----------------|
| Enterprise | {start} - {end} | 6 weeks | Dedicated | 48 hours |
| Pro | {start} - {end} | 4 weeks | Standard | 24 hours |
| Free | {start} - {end} | 2 weeks | Self-service | 4 hours |

Window considerations:
- Avoid major tenant events
- Consider timezone distribution
- Plan for peak usage periods
- Allow buffer between tiers

### 4. Establish Go/No-Go Checkpoints

Define decision gates throughout timeline:

| Checkpoint | Date | Gate Type | Decision Criteria | Escalation Path |
|------------|------|-----------|-------------------|-----------------|
| Pre-announcement | {date} | Hard | All comms ready, replacement validated | Product VP |
| Migration start | {date} | Hard | Tooling deployed, support ready | Engineering VP |
| Phase 2 entry | {date} | Soft | >20% early adopters migrated | Product Manager |
| Phase 3 entry | {date} | Hard | >50% tenants migrated, no P1 issues | Engineering VP |
| Sunset decision | {date} | Hard | >95% migrated, remediation complete | CTO |

### 5. Plan Resource Allocation

Map resources to timeline phases:

| Phase | Engineering | Support | CSM | Documentation |
|-------|-------------|---------|-----|---------------|
| Preparation | 4 FTE | 0 | 0 | 1 FTE |
| Announcement | 2 FTE | 2 FTE | 4 FTE | 1 FTE |
| Early Migration | 3 FTE | 3 FTE | 2 FTE | 0.5 FTE |
| Active Migration | 4 FTE | 4 FTE | 4 FTE | 0.5 FTE |
| Final Migration | 6 FTE | 6 FTE | 6 FTE | 0 |
| Decommission | 2 FTE | 1 FTE | 0 | 0 |

### 6. Define Rollback Triggers

Establish criteria for rollback decisions:

| Trigger | Threshold | Action | Decision Maker |
|---------|-----------|--------|----------------|
| Error rate increase | >5% baseline | Pause migration | On-call engineer |
| Latency regression | >50ms p95 increase | Investigate | Tech lead |
| Tenant escalations | >3 P1 issues | Pause migration | Product manager |
| Cost overrun | >20% projected | Review pricing | Finance |
| SLA breach | Any P1 tenant | Immediate rollback | VP Engineering |

### 7. Create Contingency Plan

Document fallback scenarios:

| Scenario | Trigger | Response | Timeline Impact |
|----------|---------|----------|-----------------|
| Provider extends deadline | Announcement | Option to extend phases | Compress or extend |
| Critical bug in replacement | Testing phase | Pause, fix, restart | +2 weeks minimum |
| Major tenant refuses | Active migration | Escalate, negotiate | Individual handling |
| Resource shortage | Any phase | Prioritize, descope | Phase extension |

**Verify current best practices with web search:**
Search the web: "software deprecation timeline best practices SaaS {date}"
Search the web: "multi-tenant migration scheduling patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into timeline constraints
- **[P] Party Mode**: Collaborative schedule optimization
- **[C] Continue**: Proceed to tenant notification

### Menu Options

### [A]nalyze Options
- **A1**: Analyze timeline against provider deadline constraints
- **A2**: Review resource allocation feasibility
- **A3**: Evaluate checkpoint criteria completeness
- **A4**: Assess contingency plan coverage

### [P]ropose Changes
- **P1**: Propose timeline compression strategies
- **P2**: Suggest parallel migration approaches
- **P3**: Recommend checkpoint optimization
- **P4**: Identify risk reduction opportunities

### [C]ontinue
- **C1**: Accept migration timeline and proceed
- **C2**: Mark step complete and load `05-notify-affected-tenants.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Deprecation phases defined with dates
- [ ] Milestones scheduled with owners
- [ ] Tenant migration windows established
- [ ] Go/no-go checkpoints documented
- [ ] Resource allocation planned
- [ ] Rollback triggers defined
- [ ] Contingency plans documented

---

## Outputs

- Phase-based deprecation schedule
- Milestone timeline with owners
- Tier-specific migration windows
- Go/no-go checkpoint matrix
- Resource allocation plan
- Rollback trigger criteria
- Contingency response plan

---

## Next Step

Proceed to `step-05-c-notify-affected-tenants.md` to communicate the deprecation plan.
