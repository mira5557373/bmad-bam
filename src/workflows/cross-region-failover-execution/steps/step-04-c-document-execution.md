# Step 4: Document Execution

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Document the complete failover execution including timeline, exceptions, lessons learned, and recommended improvements to the DR plan.

## Prerequisites

- Failover readiness assessment completed (Step 1)
- Failover execution completed (Step 2)
- Post-failover validation completed (Step 3)
- **Load template:** `{project-root}/_bmad/bam/data/templates/failover-execution-template.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery


---

## Inputs

- Readiness assessment from Step 1
- Execution timeline from Step 2
- Validation results from Step 3
- Failover execution template
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Document Execution Timeline

Create detailed timeline:

| Time | Event | Duration | Status | Notes |
|------|-------|----------|--------|-------|
| | Failover initiated | | | |
| | Phase 1: Traffic stop started | | | |
| | Phase 1: Traffic stop completed | | | |
| | Phase 2: Database failover started | | | |
| | Phase 2: Database failover completed | | | |
| | Phase 3: Service failover started | | | |
| | Phase 3: Service failover completed | | | |
| | Phase 4: Traffic cutover started | | | |
| | Phase 4: Traffic cutover completed | | | |
| | Validation started | | | |
| | Validation completed | | | |
| | Failover declared complete | | | |

**Total Duration:** {minutes}

### 2. Record Exceptions and Resolutions

Document all exceptions:

| ID | Exception Description | Severity | Impact | Resolution | Time to Resolve | Root Cause |
|----|----------------------|----------|--------|------------|-----------------|------------|
| EX-001 | | | | | | |
| EX-002 | | | | | | |
| EX-003 | | | | | | |

**Exception Analysis:**

| Category | Count | Avg Resolution Time |
|----------|-------|---------------------|
| Infrastructure | | |
| Database | | |
| Network | | |
| Application | | |
| Configuration | | |
| Human Error | | |

### 3. Capture Lessons Learned

Document insights from execution:

**What Went Well:**
1. 
2. 
3. 

**What Could Be Improved:**
1. 
2. 
3. 

**Unexpected Challenges:**
1. 
2. 
3. 

**Process Improvements:**

| Area | Current State | Recommended Improvement | Priority |
|------|---------------|------------------------|----------|
| | | | [ ] High / [ ] Medium / [ ] Low |
| | | | [ ] High / [ ] Medium / [ ] Low |
| | | | [ ] High / [ ] Medium / [ ] Low |

### 4. RTO/RPO Achievement Analysis

| Metric | Target | Achieved | Status | Notes |
|--------|--------|----------|--------|-------|
| RTO (Free) | | | [ ] Met / [ ] Not Met | |
| RTO (Pro) | | | [ ] Met / [ ] Not Met | |
| RTO (Enterprise) | | | [ ] Met / [ ] Not Met | |
| RPO (Free) | | | [ ] Met / [ ] Not Met | |
| RPO (Pro) | | | [ ] Met / [ ] Not Met | |
| RPO (Enterprise) | | | [ ] Met / [ ] Not Met | |

**RTO/RPO Improvement Recommendations:**
1. 
2. 
3. 

### 5. Update DR Plan with Improvements

Document recommended DR plan updates:

| Section | Current Content | Recommended Update | Rationale |
|---------|----------------|-------------------|-----------|
| Readiness Checks | | | |
| Failover Procedures | | | |
| Validation Steps | | | |
| Communication Plan | | | |
| Escalation Procedures | | | |

### 6. Generate Execution Report

Compile final execution report:

**Output:** `{output_folder}/planning-artifacts/failover-execution-report.md`

**Report Sections:**
1. Executive Summary
2. Failover Context
3. Execution Timeline
4. Validation Results
5. Exceptions and Resolutions
6. RTO/RPO Achievement
7. Lessons Learned
8. Recommendations
9. DR Plan Updates
10. Appendices

### 7. Post-Execution Actions

| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| Update DR plan with lessons learned | | | [ ] Pending |
| Schedule follow-up review | | | [ ] Pending |
| Update runbooks with improvements | | | [ ] Pending |
| Train team on new procedures | | | [ ] Pending |
| Schedule next DR test | | | [ ] Pending |
| Close incident ticket | | | [ ] Pending |

**Verify current best practices with web search:**
Search the web: "DR post-mortem best practices {date}"
Search the web: "disaster recovery lessons learned documentation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze Options
- **A1**: Review execution timeline accuracy
- **A2**: Analyze exception patterns
- **A3**: Evaluate lessons learned completeness
- **A4**: Assess DR plan update recommendations
- **A5**: Review post-execution action plan

### [P]ropose Changes
- **P1**: Propose additional timeline details
- **P2**: Suggest exception categorization improvements
- **P3**: Recommend additional lessons learned
- **P4**: Propose enhanced DR plan updates
- **P5**: Suggest additional post-execution actions

### [C]ontinue
- **C1**: Accept documentation and complete Create mode
- **C2**: Mark workflow complete
- **C3**: Load `step-20-v-load-execution-report.md` to validate report

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Execution timeline complete
- [ ] Exceptions documented with resolutions
- [ ] Lessons learned captured
- [ ] RTO/RPO achievement analyzed
- [ ] DR plan updates documented
- [ ] Execution report generated
- [ ] Post-execution actions assigned
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/failover-execution-report.md`
- Exception log with resolutions
- Lessons learned documentation
- DR plan update recommendations
- **Load template:** `{project-root}/_bmad/bam/data/templates/failover-execution-template.md`

## Next Step

This completes the Create mode. Run `step-20-v-load-execution-report.md` to enter Validate mode and verify the execution report against completeness criteria.

## Quality Gate Summary

Review the failover execution:
- All phases completed successfully
- RTO/RPO targets met
- Lessons learned documented
- DR plan improvements identified
