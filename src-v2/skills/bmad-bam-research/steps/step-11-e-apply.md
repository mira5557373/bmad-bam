# Step 11: Apply Changes to Research Report (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER apply changes to research report without explicit user confirmation
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: Preserve ALL unchanged research content exactly as-is
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on applying user-selected changes from step-10
- ✅ VALIDATE that new information has credible sources before incorporating
- 📋 ENSURE all claims are supported by citations (required for research reports)
- 🔍 USE web search to verify technology claims when updating evaluations
- ⚠️ FLAG if recommendation changes contradict evaluation scores
- 🔗 PROPAGATE cascading updates to affected sections (scores → rankings → recommendations)

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## YOUR TASK

Apply the user's selected changes to the research report loaded in step-10. For evaluation changes, verify claims with web search and add citations. For recommendation changes, ensure alignment with updated scores. Cascade updates to affected sections (executive summary, rankings, risk assessment). Update document metadata, add Change Log entry, present diff summary for user approval, and save the updated research report.

---

## Purpose

Apply the requested modifications to the research report while maintaining document consistency and updating all affected sections.

---

## Prerequisites

- Step 10 completed: Existing report loaded, modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: technology-selection

---

## Inputs

- Loaded research report
- Confirmed modification scope
- Impact assessment from Step 10
- User-provided new information or requirements

---

## Actions

### 1. Apply Section-Specific Changes

Based on confirmed modification scope, apply changes:

#### 1.1 If Updating Research Scope

- Update evaluation criteria if changed
- Note scope changes in change log
- Flag sections requiring re-evaluation

#### 1.2 If Adding New Technology Candidates

Add to comparison matrix:

| Criteria | Existing Options | New Option |
|----------|------------------|------------|
| Multi-tenant support | {existing scores} | {evaluate} |
| Scalability | {existing scores} | {evaluate} |
| Team expertise | {existing scores} | {evaluate} |
| Cost | {existing scores} | {evaluate} |
| Integration fit | {existing scores} | {evaluate} |

**Verify current best practices with web search:**
Search the web: "{new_technology} enterprise SaaS multi-tenant {date}"

#### 1.3 If Updating Existing Evaluations

Update specific evaluation areas:

| Technology | Previous Score | Updated Score | Reason for Change |
|------------|----------------|---------------|-------------------|
| {technology} | {old}/5 | {new}/5 | {reason} |

#### 1.4 If Revising Recommendations

Update recommendation section:
- Document reason for recommendation change
- Update rationale
- Revise alternative options if affected
- Update executive summary

#### 1.5 If Updating Risk Assessment

| Risk | Previous Assessment | Updated Assessment | Change Reason |
|------|---------------------|-------------------|---------------|
| {risk} | {old likelihood/impact} | {new assessment} | {reason} |

#### 1.6 If Updating POC Plan

| POC Aspect | Previous | Updated | Change Reason |
|------------|----------|---------|---------------|
| Objectives | {old} | {new} | {reason} |
| Scope | {old} | {new} | {reason} |
| Timeline | {old} | {new} | {reason} |

#### 1.7 If Adding POC Results

Document POC outcomes:

| Objective | Expected | Actual | Status |
|-----------|----------|--------|--------|
| {objective 1} | {criteria} | {result} | Pass/Fail |
| {objective 2} | {criteria} | {result} | Pass/Fail |

**POC Findings:**
- {Key finding 1}
- {Key finding 2}
- {Key finding 3}

**Impact on Recommendations:**
- {How POC results affect recommendation}

#### 1.8 If Updating Migration Strategy

| Phase | Previous Plan | Updated Plan | Change Reason |
|-------|---------------|--------------|---------------|
| {phase} | {old} | {new} | {reason} |

### 2. Cascade Updates

Ensure consistency across affected sections:

| Primary Change | Cascading Updates Required |
|----------------|----------------------------|
| New candidate added | Comparison matrix, scoring, recommendations |
| Evaluation updated | Rankings, recommendations, executive summary |
| Risk updated | Risk summary, mitigation table, recommendations |
| POC results added | Recommendations, migration strategy, executive summary |
| Recommendation changed | Executive summary, ADR (if exists) |

### 3. Update Document Metadata

Update report metadata:

```markdown
## Document Information

| Field | Value |
|-------|-------|
| Report Date | {original date} |
| Last Updated | {current date} |
| Version | {increment version} |
| Author | {original author} |
| Last Modified By | {current role} |
```

### 4. Update Change Log

Add entry to change log:

```markdown
## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {new version} | {date} | {role} | {summary of changes} |
| {previous entries} |
```

### 5. Verify Document Consistency

Check all cross-references:

| Check | Status |
|-------|--------|
| Scores match rankings | Verified/Needs Fix |
| Recommendations align with scores | Verified/Needs Fix |
| Executive summary reflects current state | Verified/Needs Fix |
| Risk summary matches risk tables | Verified/Needs Fix |
| POC plan aligns with recommendations | Verified/Needs Fix |
| Migration strategy is current | Verified/Needs Fix |

### 6. Output Updated Report

Save the updated report to:
- `{output_folder}/planning-artifacts/research-report.md`

---

## SUCCESS METRICS

- ✅ All user-requested research changes captured and understood
- ✅ Web search performed to verify technology claims for updated evaluations
- ✅ All new claims have citations in `_Source: [URL]_` format
- ✅ Evaluation score changes reflected in rankings and recommendations
- ✅ Cascading updates applied (executive summary, risk tables, POC scope)
- ✅ Document consistency validated (scores match rankings match recommendations)
- ✅ Frontmatter version incremented correctly
- ✅ Change Log entry added with version, date, changes, rationale
- ✅ Diff summary presented showing before/after for each change
- ✅ User confirmed changes before saving
- ✅ Research report saved to correct location

---

## FAILURE MODES

- ❌ **Unsupported claim added:** Block change, require citation source before incorporating into research report
- ❌ **Score-recommendation mismatch:** Warn that recommendation doesn't match highest-scored candidate, require explicit justification
- ❌ **Outdated source cited:** Flag sources older than 2 years, recommend finding current source or noting limitation
- ❌ **Cascading update missed:** Detect inconsistency (e.g., executive summary doesn't match updated recommendation), require resolution
- ❌ **Save failure:** Retry with backup to alternate location, report error details

---

## Verification

- [ ] All requested changes applied
- [ ] Cascade updates completed
- [ ] Document metadata updated
- [ ] Change log entry added
- [ ] Cross-references verified
- [ ] Document consistency maintained
- [ ] Report saved to correct location
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated research report: `{output_folder}/planning-artifacts/research-report.md`
- Change log with modification summary

---

## Next Step

**Edit Complete.**

Recommended next actions:
1. **Run Validation** - Execute `step-20-v-load.md` to verify report completeness
2. **Review with stakeholders** - Present updated findings
3. **Update related documents** - Master architecture, ADRs if affected

Run **Validate mode** to verify updated report against quality criteria.
