# Step 20: Load Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- :memo: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array

---

## Purpose

Load the agent debug report artifact for validation against quality criteria and QG-AI1 (Agent Safety) gate requirements.

---

## Prerequisites

- Existing debug report to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-safety`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`

---

## Actions

### 1. Load Artifact

Load the debug report:
- `{output_folder}/planning-artifacts/agent-debug-report.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Display Report Summary

Present artifact overview:

| Attribute | Value |
|-----------|-------|
| Document Path | {path} |
| Report ID | {report_id} |
| Version | {version} |
| Last Modified | {date} |
| Status | {status} |
| Agent Investigated | {agent_name} |
| Severity | {severity} |

### 3. Verify Report Completeness

Check all required sections are present:

| Section | Present | Content Quality |
|---------|---------|-----------------|
| Report Information | YES/NO | Complete/Partial/Empty |
| Issue Summary | YES/NO | Complete/Partial/Empty |
| Agent Context | YES/NO | Complete/Partial/Empty |
| Debug Analysis | YES/NO | Complete/Partial/Empty |
| Root Cause Analysis | YES/NO | Complete/Partial/Empty |
| Resolution | YES/NO | Complete/Partial/Empty |
| Prevention | YES/NO | Complete/Partial/Empty |
| Verification Checklist | YES/NO | Complete/Partial/Empty |

### 4. Prepare for Validation

Confirm the artifact is ready for validation checks:

| Validation Criteria | Source | Ready |
|--------------------|--------|-------|
| Report completeness | Template | YES/NO |
| Root cause identified | QG-AI1 | YES/NO |
| Remediation defined | QG-AI1 | YES/NO |
| Monitoring planned | QG-AI1 | YES/NO |
| Evidence documented | QG-AI1 | YES/NO |

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report sections before validation
- **P (Party Mode)**: Bring perspectives on validation approach
- **C (Continue)**: Proceed to validation
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: artifact contents, validation scope
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review agent debug report before validation"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Document metadata captured
- [ ] All required sections present
- [ ] Ready for validation checks
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded artifact content
- Section completeness assessment
- Validation readiness confirmation

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
