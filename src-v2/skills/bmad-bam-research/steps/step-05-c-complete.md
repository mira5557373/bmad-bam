# Step 5: Compile Research Report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Compile all research findings, evaluations, and recommendations into a comprehensive research report and output to the planning artifacts folder.

---

## Prerequisites

- Recommendations documented (Step 4)
- All evaluation phases completed
- **Load template:** `{project-root}/_bmad/bam/data/templates/research-findings.md`

---

## Inputs

- Research scope (Step 1)
- Technology evaluation (Step 2)
- Integration fit analysis (Step 3)
- Recommendations (Step 4)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Compile Executive Summary

Create executive summary for stakeholders:

```markdown
## Executive Summary

### Research Topic
{Brief description of what was researched}

### Key Recommendation
{Primary recommendation in one sentence}

### Decision Summary

| Aspect | Recommendation |
|--------|----------------|
| Technology | {name and version} |
| Vendor | {vendor/maintainer} |
| License | {license type} |
| Estimated TCO (3-year) | ${amount} |

### Key Benefits
1. {Benefit 1}
2. {Benefit 2}
3. {Benefit 3}

### Key Risks
1. {Risk 1 with mitigation}
2. {Risk 2 with mitigation}

### Recommended Next Steps
1. {Immediate action}
2. {Short-term action}
3. {Medium-term action}
```

### 2. Compile Full Report Structure

Assemble complete report:

```markdown
# Technology Research Report: {Topic}

## Document Information

| Field | Value |
|-------|-------|
| Report Date | {date} |
| Research Topic | {topic} |
| Author | {role} |
| Status | Draft / Final |
| Version | 1.0.0 |

---

## 1. Executive Summary
{From section 1 above}

---

## 2. Research Scope

### 2.1 Background
{Context for why this research was needed}

### 2.2 Objectives
{What questions this research answers}

### 2.3 Constraints
{Architecture and business constraints}

### 2.4 Evaluation Criteria
{Criteria table from Step 1}

---

## 3. Technology Evaluation

### 3.1 Candidates Evaluated
{List of technologies evaluated}

### 3.2 Comparison Matrix
{Full comparison matrix from Step 2}

### 3.3 Multi-Tenant Assessment
{Tenant support evaluation from Step 2}

### 3.4 Scalability Analysis
{Scalability evaluation from Step 2}

### 3.5 Cost Analysis
{TCO analysis from Step 2}

---

## 4. Integration Fit Analysis

### 4.1 Architecture Compatibility
{Compatibility assessment from Step 3}

### 4.2 Security Implications
{Security evaluation from Step 3}

### 4.3 Operational Complexity
{Operational assessment from Step 3}

### 4.4 Team Skill Alignment
{Skills analysis from Step 3}

---

## 5. Recommendations

### 5.1 Primary Recommendation
{Recommended technology with rationale from Step 4}

### 5.2 Alternative Options
{Alternative options table from Step 4}

### 5.3 Technologies Not Recommended
{Rejected options with reasons from Step 4}

---

## 6. Risk Assessment

### 6.1 Technical Risks
{Technical risks table from Step 4}

### 6.2 Operational Risks
{Operational risks table from Step 4}

### 6.3 Business Risks
{Business risks table from Step 4}

---

## 7. Proof of Concept Plan

### 7.1 POC Objectives
{POC objectives from Step 4}

### 7.2 POC Scope
{POC scope from Step 4}

### 7.3 POC Timeline
{POC timeline from Step 4}

### 7.4 POC Resources
{POC resources from Step 4}

---

## 8. Migration Strategy

### 8.1 Recommended Approach
{Migration strategy from Step 4}

### 8.2 Migration Phases
{Migration phases from Step 4}

### 8.3 Rollback Plans
{Rollback plans from Step 4}

### 8.4 Success Metrics
{Success metrics from Step 4}

---

## 9. Appendices

### A. Detailed Scoring
{Full scoring matrices}

### B. Web Research Sources
{List of sources consulted}

### C. Related Documents
- Master Architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Module Architecture: `{output_folder}/planning-artifacts/modules/*/architecture.md`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {date} | {role} | Initial research report |
```

### 3. Validate Report Completeness

Verify all sections are complete:

| Section | Status | Notes |
|---------|--------|-------|
| Executive Summary | Complete/Incomplete | |
| Research Scope | Complete/Incomplete | |
| Technology Evaluation | Complete/Incomplete | |
| Integration Fit | Complete/Incomplete | |
| Recommendations | Complete/Incomplete | |
| Risk Assessment | Complete/Incomplete | |
| POC Plan | Complete/Incomplete | |
| Migration Strategy | Complete/Incomplete | |

### 4. Output Report

Write the compiled report to:

**Primary Output:** `{output_folder}/planning-artifacts/research-report.md`

**Alternative Locations (if topic-specific):**
- `{output_folder}/planning-artifacts/research/{topic}-research.md`
- `{output_folder}/planning-artifacts/decisions/{topic}-adr.md` (if creating ADR)

### 5. Generate Architecture Decision Record (Optional)

If the research leads to an architecture decision, generate ADR:

```markdown
# ADR-{number}: {Technology Decision Title}

## Status
Proposed | Accepted | Deprecated | Superseded

## Context
{Brief context from research scope}

## Decision
{Primary recommendation statement}

## Consequences

### Positive
- {Benefit 1}
- {Benefit 2}

### Negative
- {Risk/Trade-off 1}
- {Risk/Trade-off 2}

## Related
- Research Report: `{output_folder}/planning-artifacts/research-report.md`
```

---

## COLLABORATION MENUS (A/P/C):

After completing the report compilation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific report sections for enhancement
- **P (Party Mode)**: Bring stakeholder perspectives on report presentation
- **C (Continue)**: Accept report and complete research workflow
- **[Specific refinements]**: Describe what you'd like to adjust in the report

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: compiled report, executive summary, recommendations
- Process enhanced insights on report improvements
- Ask user: "Accept these report enhancements? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review research report for {topic}: {executive summary}"
- Process stakeholder perspectives on presentation and completeness
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final report to `{output_folder}/planning-artifacts/research-report.md`
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Complete Create workflow

---

## Verification

- [ ] Executive summary complete and clear
- [ ] All research phases included
- [ ] Recommendations clearly stated
- [ ] Risks documented with mitigations
- [ ] POC plan actionable
- [ ] Migration strategy defined
- [ ] Report output to correct location
- [ ] ADR generated (if applicable)
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete research report: `{output_folder}/planning-artifacts/research-report.md`
- ADR (optional): `{output_folder}/planning-artifacts/decisions/{topic}-adr.md`

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

**Workflow Complete.**

Research report generated. Recommended next actions:

1. **Review with stakeholders** - Present executive summary and recommendations
2. **Approve recommendation** - Get sign-off on technology selection
3. **Execute POC** - If approved, begin proof of concept
4. **Update architecture** - After POC success, update master architecture

Run **Validate mode** (`step-20-v-load.md`) to verify report completeness against quality criteria.
