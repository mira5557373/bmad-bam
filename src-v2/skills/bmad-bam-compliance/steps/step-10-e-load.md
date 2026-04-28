# Step 10: Load Existing Compliance Design (Edit Mode)

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing compliance-design.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse compliance framework mappings and control inventories
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all data classifications, audit controls, and evidence collection rules
- 📋 PRESENT a structured summary of current compliance posture before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY QG-CC (Continuous Compliance) status from frontmatter
- ⚠️ FLAG any frameworks marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing compliance design for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract framework mappings, data governance rules, audit controls
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate QG-CC or QG-P1 compliance status
- 🔍 Use web search: Only if user requests updated regulatory requirements

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## YOUR TASK

Load the existing compliance design document, parse its structure, extract the current compliance configuration including framework mappings, data classifications, audit controls, and evidence collection rules. Present a summary showing what can be edited and enable the user to select specific sections for modification.

---

## Purpose

Load and review existing compliance design documents to identify sections requiring modification based on new regulatory requirements, framework updates, or organizational changes.

---

## Prerequisites

- Existing compliance design document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` (for current framework requirements)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Actions

### 1. Load Existing Documents

Load the existing compliance design:
- `{output_folder}/planning-artifacts/compliance-design.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current compliance design:

| Section | Status | Last Updated | Key Configuration |
|---------|--------|--------------|-------------------|
| Compliance Frameworks | YES/NO | {date} | {frameworks listed} |
| Data Governance | YES/NO | {date} | {classification levels} |
| Audit Controls | YES/NO | {date} | {event categories} |
| Compliance Monitoring | YES/NO | {date} | {check categories} |
| Implementation Roadmap | YES/NO | {date} | {current phase} |
| Risk Assessment | YES/NO | {date} | {risk count} |

### 3. Identify Framework Updates

Check for regulatory changes since last update:

| Framework | Document Version | Current Version | Update Required |
|-----------|------------------|-----------------|-----------------|
| SOC2 | {version} | 2024 TSC | YES/NO |
| GDPR | {version} | Current | YES/NO |
| HIPAA | {version} | Current | YES/NO |
| PCI-DSS | {version} | v4.0 | YES/NO |
| EU-AI-Act | {version} | 2024 | YES/NO |

### 4. Gather Modification Requirements

Collect user input on required changes:

| Change Category | Examples |
|-----------------|----------|
| New frameworks | Adding HIPAA, PCI-DSS, FedRAMP |
| Framework updates | PCI-DSS v3.2.1 -> v4.0, new GDPR guidance |
| New data types | Adding PHI, payment data |
| New regions | Expanding to new jurisdictions |
| Organizational changes | New business units, acquisitions |
| Audit findings | Remediation from recent audit |

### 5. Impact Assessment

Assess modification impact:

| Modification | Sections Affected | Complexity | Estimated Effort |
|--------------|-------------------|------------|------------------|
| {modification} | {sections} | Low/Medium/High | {effort} |

### 6. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
COMPLIANCE DESIGN - EDIT MODE
================================================================================
Document: compliance-design.md
Version: {version}
Frameworks: {GDPR, SOC2, HIPAA, PCI-DSS count}
QG-CC Status: {status}
================================================================================

CURRENT COMPLIANCE POSTURE:
1. Frameworks:     {count} mapped - {status}
2. Data Governance: {classification levels} - {status}
3. Audit Controls: {event categories} - {status}
4. Monitoring:     {check types} - {status}
5. Evidence:       {collection methods} - {status}
6. Risk Assessment: {risk count} identified - {status}

CONTROL INVENTORY: {total} controls across {framework_count} frameworks

EDITABLE SECTIONS:
[1] Compliance Frameworks - Add/update framework requirements
[2] Data Governance - Modify data classification and handling
[3] Audit Controls - Update event categories and retention
[4] Compliance Monitoring - Change check frequencies and alerts
[5] Evidence Collection - Update automation and storage
[6] Risk Assessment - Modify risk items and mitigations
[7] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Compliance frameworks inventory extracted
- ✅ Data classification matrix parsed completely
- ✅ Audit control categories documented
- ✅ Evidence collection rules extracted
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete framework mappings:** Flag frameworks needing completion before edit
- ❌ **QG-CC already failed:** Warn that edits require full re-validation
- ❌ **Missing control inventory:** Cannot edit without baseline controls

---

## Verification

- [ ] Existing compliance design loaded successfully
- [ ] Document structure understood
- [ ] Framework versions compared with current requirements
- [ ] Modification requirements gathered from user
- [ ] Impact assessment completed
- [ ] Sections for modification identified

---

## Outputs

- Summary of current compliance design state
- Framework version comparison
- List of required modifications with impact assessment

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modifications.
