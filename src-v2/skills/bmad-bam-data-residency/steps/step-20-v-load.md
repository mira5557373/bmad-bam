# Step 20: Load Data Residency Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD data residency validation checklist** - This validates data sovereignty
- 📋 **VERIFY artifact exists** before proceeding to validation checks

## EXECUTION PROTOCOLS

- 🎯 Focus: Load data residency artifact and validation checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against data sovereignty criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- 🔍 Use web search: Verify current GDPR/CCPA/LGPD requirements
- ⚠️ Gate: Data Residency Compliance Gate

---

## YOUR TASK

Load the data residency design artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from the data residency checklist for systematic verification of data sovereignty compliance.

---

## Purpose

Load the data residency design artifact for validation against quality criteria and compliance requirements.

---

## Prerequisites

- Existing data residency design to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-residency
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/data-residency-checklist.md`

---

## Actions

### 1. Load Artifact

Load the data residency design:
- `{output_folder}/planning-artifacts/data-residency-design.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Display Document Summary

Present artifact overview:

| Attribute | Value |
|-----------|-------|
| Document Path | {path} |
| Version | {version} |
| Last Modified | {date} |
| Status | {status} |
| Compliance Zones | {zones} |
| Target Regions | {regions} |
| Steps Completed | {stepsCompleted array} |

### 3. Parse Section Completeness

Assess each section:

| Section | Present | Complete | Quality |
|---------|---------|----------|---------|
| Compliance Requirements | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Target Regions | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Regional Database Architecture | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Regional Storage Configuration | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Cache Region Affinity | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Event Routing by Region | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Data Replication Restrictions | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Cross-Region API Routing | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Backup Storage Policies | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Disaster Recovery Strategy | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Region Selection Workflow | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Region Migration Workflow | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Compliance Verification | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |
| Edge Location Configuration | YES/NO | YES/PARTIAL/NO | HIGH/MED/LOW |

### 4. Identify Validation Scope

Determine validation focus areas:

| Validation Area | Priority | Rationale |
|-----------------|----------|-----------|
| Compliance alignment | CRITICAL | Legal requirement |
| Region consistency | HIGH | Architecture integrity |
| DR viability | HIGH | Business continuity |
| API routing correctness | MEDIUM | Performance |
| Edge configuration | MEDIUM | User experience |

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure before validation
- **P (Party Mode)**: Bring perspectives on validation approach
- **C (Continue)**: Proceed to validation checks
- **[Specific concerns]**: Describe validation focus areas

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
- Context: "Review data residency design before validation"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to next step: `step-21-v-validate.md`

---

## SUCCESS METRICS

- ✅ Data residency artifact loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ Data residency validation checklist loaded
- ✅ Regional coverage inventory verified
- ✅ Compliance zone completeness assessed
- ✅ Validation readiness confirmed by user

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract version/regions
- ❌ **Incomplete Create mode:** stepsCompleted missing required steps
- ❌ **Checklist not found:** Verify BAM installation

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Document metadata captured
- [ ] Section completeness assessed
- [ ] Validation scope identified
- [ ] Ready for validation checks

---

## Outputs

- Loaded artifact content
- Section completeness assessment
- Validation readiness confirmation

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
