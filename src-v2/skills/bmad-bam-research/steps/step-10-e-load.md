# Step 10: Load Existing Research Report (Edit Mode)

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

### 4. Confirm Modification Scope

Ask the user which sections need modification:

- [ ] Update research scope or criteria
- [ ] Add new technology candidates
- [ ] Update existing evaluations
- [ ] Revise scoring or rankings
- [ ] Modify recommendations
- [ ] Update risk assessment
- [ ] Revise POC plan
- [ ] Update migration strategy
- [ ] Add new findings from POC
- [ ] Update based on new information

Capture the specific changes requested before proceeding.

### 5. Identify Impact of Changes

For each change requested, identify:

| Change | Sections Affected | Re-evaluation Needed |
|--------|-------------------|---------------------|
| {Change 1} | {sections} | Yes/No |
| {Change 2} | {sections} | Yes/No |

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing document, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring architect perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current report state, proposed modifications
- Process enhanced insights on change impact
- Ask user: "Accept this analysis of proposed changes? (y/n)"
- If yes, document change impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to research report: {summary of changes}"
- Process architect and analyst perspectives on change impact
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply.md`

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
