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
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Load the agent debug report artifact for validation against quality criteria and QG-AI1 (Agent Safety) gate requirements.

---

## YOUR TASK

Load the existing agent debug report artifact from the output location. Extract report metadata including agent investigated, severity level, and current status. Prepare the QG-AI1 validation checklist for systematic verification in the next step.

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

## SUCCESS METRICS

- ✅ Debug report artifact loaded from correct path
- ✅ Report metadata extracted (agent, severity, status)
- ✅ All required sections verified present
- ✅ QG-AI1 checklist loaded and understood
- ✅ Validation readiness confirmed with user

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract report metadata
- ❌ **Incomplete report:** Missing required sections blocks validation
- ❌ **QG-AI1 checklist not found:** Verify BAM installation

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
