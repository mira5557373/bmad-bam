# Step 4: Document Recommendations

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

## Purpose

Document comprehensive technology recommendations including recommended stack, risk assessment, proof of concept scope, and migration considerations.

---

## Prerequisites

- Integration fit evaluation completed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: technology-selection
- **Load template:** `{project-root}/_bmad/bam/data/templates/research-report-template.md`

---

## Inputs

- Technology evaluation results (Step 2)
- Integration fit analysis (Step 3)
- Combined scoring from all evaluation phases
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Recommended Technology Stack

Document primary recommendation with rationale:

#### 1.1 Primary Recommendation

| Aspect | Recommendation |
|--------|----------------|
| **Technology** | {recommended option} |
| **Version** | {specific version} |
| **License** | {license type} |
| **Vendor/Maintainer** | {organization} |

#### 1.2 Recommendation Rationale

| Criterion | Score | Key Factors |
|-----------|-------|-------------|
| Multi-tenant support | {score}/5 | {specific strengths} |
| Scalability | {score}/5 | {specific strengths} |
| Integration fit | {score}/5 | {specific strengths} |
| Team alignment | {score}/5 | {specific strengths} |
| Cost efficiency | {score}/5 | {specific strengths} |
| **Overall Score** | {total}/5 | |

#### 1.3 Alternative Options

| Rank | Technology | Score | When to Consider |
|------|------------|-------|------------------|
| 2 | {option B} | {score} | {scenario} |
| 3 | {option C} | {score} | {scenario} |

#### 1.4 Technologies Not Recommended

| Technology | Score | Reason for Rejection |
|------------|-------|---------------------|
| {option X} | {score} | {key disqualifiers} |
| {option Y} | {score} | {key disqualifiers} |

### 2. Risk Assessment

Document risks and mitigations:

#### 2.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Integration complexity | High/Medium/Low | High/Medium/Low | {mitigation strategy} |
| Performance issues | High/Medium/Low | High/Medium/Low | {mitigation strategy} |
| Scaling limitations | High/Medium/Low | High/Medium/Low | {mitigation strategy} |
| Breaking changes | High/Medium/Low | High/Medium/Low | {mitigation strategy} |

#### 2.2 Operational Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Learning curve | High/Medium/Low | High/Medium/Low | {mitigation strategy} |
| Operational overhead | High/Medium/Low | High/Medium/Low | {mitigation strategy} |
| Vendor dependency | High/Medium/Low | High/Medium/Low | {mitigation strategy} |
| Support availability | High/Medium/Low | High/Medium/Low | {mitigation strategy} |

#### 2.3 Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Cost overrun | High/Medium/Low | High/Medium/Low | {mitigation strategy} |
| Timeline delay | High/Medium/Low | High/Medium/Low | {mitigation strategy} |
| Compliance gap | High/Medium/Low | High/Medium/Low | {mitigation strategy} |
| Vendor viability | High/Medium/Low | High/Medium/Low | {mitigation strategy} |

#### 2.4 Risk Summary

| Category | Risk Count | High | Medium | Low |
|----------|------------|------|--------|-----|
| Technical | {n} | {n} | {n} | {n} |
| Operational | {n} | {n} | {n} | {n} |
| Business | {n} | {n} | {n} | {n} |
| **Total** | {total} | {total} | {total} | {total} |

### 3. Proof of Concept Scope

Define POC to validate recommendation:

#### 3.1 POC Objectives

| Objective | Success Criteria | Measurement |
|-----------|------------------|-------------|
| Validate multi-tenant isolation | {specific criteria} | {how to measure} |
| Confirm performance targets | {specific criteria} | {how to measure} |
| Test integration patterns | {specific criteria} | {how to measure} |
| Assess operational complexity | {specific criteria} | {how to measure} |

#### 3.2 POC Scope

**In Scope:**
- {Feature/aspect to validate}
- {Feature/aspect to validate}
- {Feature/aspect to validate}

**Out of Scope:**
- {Feature/aspect deferred}
- {Feature/aspect deferred}

#### 3.3 POC Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Setup | {days} | Environment ready |
| Core validation | {days} | Key features proven |
| Integration testing | {days} | Integration patterns validated |
| Performance testing | {days} | Benchmarks completed |
| Documentation | {days} | POC report |
| **Total** | {days} | Go/No-Go decision |

#### 3.4 POC Resources

| Resource | Allocation | Role |
|----------|------------|------|
| {Developer role} | {time %} | {responsibility} |
| {DevOps role} | {time %} | {responsibility} |
| {Architect role} | {time %} | {responsibility} |

### 4. Migration Considerations

Document migration path if adopting recommendation:

#### 4.1 Migration Strategy

| Approach | Description | Risk Level |
|----------|-------------|------------|
| Big Bang | Replace all at once | High |
| Strangler Fig | Gradual replacement | Medium |
| Side-by-Side | Run parallel, migrate traffic | Low |
| **Recommended** | {chosen approach} | {risk} |

#### 4.2 Migration Phases

| Phase | Scope | Duration | Dependencies |
|-------|-------|----------|--------------|
| Phase 1 | {scope} | {weeks} | {dependencies} |
| Phase 2 | {scope} | {weeks} | {dependencies} |
| Phase 3 | {scope} | {weeks} | {dependencies} |
| **Total** | Full migration | {weeks} | |

#### 4.3 Migration Risks

| Risk | Mitigation | Rollback Plan |
|------|------------|---------------|
| Data migration issues | {mitigation} | {rollback} |
| Integration breakage | {mitigation} | {rollback} |
| Performance regression | {mitigation} | {rollback} |
| Feature parity gaps | {mitigation} | {rollback} |

#### 4.4 Success Metrics

| Metric | Current Baseline | Target | Measurement Method |
|--------|------------------|--------|-------------------|
| Performance (p99) | {ms} | {ms} | Load testing |
| Availability | {percent} | {percent} | Monitoring |
| Error rate | {percent} | {percent} | APM |
| Developer productivity | {metric} | {metric} | Velocity tracking |

**Verify current best practices with web search:**
Search the web: "{technology} migration patterns enterprise {date}"
Search the web: "{technology} proof of concept best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the recommendations documentation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific recommendations or risks
- **P (Party Mode)**: Bring PM and architect perspectives on recommendations
- **C (Continue)**: Accept recommendations and proceed to compile final report
- **[Specific refinements]**: Describe what you'd like to adjust

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: recommended stack, risk assessment, POC scope, migration plan
- Process enhanced insights on recommendation details
- Ask user: "Accept these enhanced recommendations? (y/n)"
- If yes, integrate into documentation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review technology recommendations: {summary of primary recommendation and key risks}"
- Process collaborative analysis from PM and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save recommendations to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Soft Gate Checkpoint

**Steps 3-4 complete the recommendation phase.**

Present summary of:
- Recommended technology with rationale
- Key risks and mitigations
- POC scope and timeline
- Migration strategy overview

Ask for confirmation before proceeding to compile final report.

---

## Verification

- [ ] Primary recommendation documented with rationale
- [ ] Alternative options listed with use cases
- [ ] Risk assessment completed (technical, operational, business)
- [ ] POC scope and objectives defined
- [ ] Migration strategy documented
- [ ] Success metrics established
- [ ] Patterns align with pattern registry

---

## Outputs

- Recommended technology stack
- Risk assessment matrix
- POC scope and plan
- Migration strategy and phases
- Success metrics

---

## Next Step

Proceed to `step-05-c-complete.md` to compile the final research report.
