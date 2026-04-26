# Step 10: Load Existing Research Report (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input - load existing research only
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: Parse ALL sections of the existing research report
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - load and present, do not modify
- ✅ EXTRACT current technology evaluations, scores, and recommendations
- 📋 IDENTIFY which sections are complete vs incomplete (TODOs)
- 🔍 CHECK source citations for validity and recency
- ⚠️ FLAG outdated research findings that may need web search refresh

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## YOUR TASK

Load the existing research report, parse its structure, extract current technology evaluations and recommendations. Present a summary showing research methodology quality, source credibility, and findings synthesis status. Display an interactive menu for the user to select which sections to modify (evaluations, recommendations, POC plans, citations).

---

## Purpose

Load an existing research report for modification. Edit mode allows updating evaluations, adding new technology candidates, revising recommendations, or adjusting POC/migration plans without recreating the entire research from scratch.

---

## Prerequisites

- Existing research report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: technology-selection

---

## Inputs

- Existing research report file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Report

Load the research report:
- `{output_folder}/planning-artifacts/research-report.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Related Context

Also load supporting documents:
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Related ADRs: `{output_folder}/planning-artifacts/decisions/*.md`
- Configuration: `{project-root}/_bmad/bam/config.yaml`

### 3. Parse and Display Summary

Extract and present current report state:

#### 3.1 Document Information

| Field | Current Value |
|-------|---------------|
| Report Date | {date} |
| Research Topic | {topic} |
| Version | {version} |
| Last Updated | {date} |

#### 3.2 Current Recommendations

| Aspect | Current Recommendation |
|--------|------------------------|
| Primary Technology | {technology} |
| Alternative 1 | {option} |
| Alternative 2 | {option} |

#### 3.3 Key Scores

| Technology | Evaluation Score | Integration Fit | Combined |
|------------|------------------|-----------------|----------|
| {Option A} | {score}/5 | {score}/5 | {total} |
| {Option B} | {score}/5 | {score}/5 | {total} |
| {Option C} | {score}/5 | {score}/5 | {total} |

#### 3.4 Current Risk Summary

| Category | High | Medium | Low |
|----------|------|--------|-----|
| Technical | {n} | {n} | {n} |
| Operational | {n} | {n} | {n} |
| Business | {n} | {n} | {n} |

#### 3.5 POC/Migration Status

| Aspect | Current Status |
|--------|----------------|
| POC Status | Not Started / In Progress / Complete |
| POC Outcome | Pending / Success / Fail |
| Migration Phase | Not Started / Phase {n} |

### 4. Present Edit Menu

Display the research report edit summary:

```
================================================================================
RESEARCH REPORT - EDIT MODE
================================================================================
Document: research-report.md
Version: {version}
Last Updated: {date}
Research Topic: {topic}
================================================================================

CURRENT STATE:
- Primary Recommendation: {technology}
- Candidates Evaluated: {count}
- Source Citations: {count} (Verified: {n} / Outdated: {n})
- POC Status: {status}

================================================================================
EDITABLE SECTIONS:

METHODOLOGY (affects research validity):
[1] Research Scope - Update evaluation criteria or constraints
[2] Source Citations - Add/update/verify citations

EVALUATIONS (affects recommendations):
[3] Technology Candidates - Add new options or remove candidates
[4] Evaluation Scores - Update scores based on new information
[5] Integration Fit Analysis - Revise architecture alignment assessment

RECOMMENDATIONS (affects project direction):
[6] Primary Recommendation - Change recommended technology
[7] Risk Assessment - Update identified risks and mitigations
[8] Alternatives Ranking - Reorder backup options

IMPLEMENTATION (affects execution):
[9] POC Plan - Modify proof-of-concept objectives and scope
[10] Migration Strategy - Update migration phases and timeline
[11] POC Results - Add findings from completed POC

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

Capture the specific changes requested before proceeding.

### 5. Identify Impact of Changes

For each change requested, identify:

| Change | Sections Affected | Re-evaluation Needed |
|--------|-------------------|---------------------|
| {Change 1} | {sections} | Yes/No |
| {Change 2} | {sections} | Yes/No |

---

## SUCCESS METRICS

- ✅ Research report located and fully loaded
- ✅ Document metadata parsed (version, date, topic, author)
- ✅ All technology candidates extracted with current scores
- ✅ Source citations inventory completed (total, verified, outdated)
- ✅ Current recommendation identified with supporting rationale
- ✅ Risk assessment summary extracted
- ✅ POC/migration status determined
- ✅ Edit menu displayed with numbered options
- ✅ User has selected section(s) to edit
- ✅ Impact assessment completed for selected changes

---

## FAILURE MODES

- ❌ **Report not found:** Report error with expected path, suggest Create mode (`step-01-c-start.md`), offer to search alternate locations
- ❌ **Corrupted document structure:** Attempt partial recovery, flag unreadable sections, warn user of incomplete data
- ❌ **No technology evaluations found:** Flag as incomplete research - cannot edit without baseline evaluations
- ❌ **All citations outdated (>1 year):** Warn that research may be stale, recommend web search refresh before editing
- ❌ **Missing recommendation:** Flag as incomplete - cannot edit without understanding current recommendation state

---

## Verification

- [ ] Research report loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Impact of changes assessed
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current research report
- Confirmed modification scope from user
- Impact assessment for proposed changes

---

## Next Step

Proceed to `step-11-e-apply.md` with confirmed modification scope.
