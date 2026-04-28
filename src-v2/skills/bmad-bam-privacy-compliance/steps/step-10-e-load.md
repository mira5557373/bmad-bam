# Step 10: Load Existing Privacy Compliance Design

## MANDATORY EXECUTION RULES

- NEVER proceed without locating the existing privacy-compliance.md file
- ALWAYS read the complete document including frontmatter metadata
- ALWAYS parse all privacy sections (rights, basis, export, consent)
- **ALWAYS pause after presenting findings** and await user direction
- EXTRACT all consent configurations, lawful basis mappings, and export formats
- PRESENT a structured summary of current privacy design before accepting edits
- PAUSE after summary presentation and await user edit selection
- IDENTIFY compliance validation status from frontmatter
- FLAG any sections marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- Focus: Load and parse existing privacy compliance design for modification
- Track: `stepsCompleted: [10]` when complete
- Context: Extract all privacy configurations, consent workflows, lawful basis
- Do NOT: Modify any content during load phase
- Gate: Changes may invalidate QG-CC compliance status
- Use web search: Only if user requests updated privacy compliance best practices

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Parsing all privacy sections
- Presenting edit options

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
- Making changes (next step)

## YOUR TASK

Load the existing privacy compliance document, parse its data subject rights, lawful basis tracking, data export, and consent management sections, extract the current configurations, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

## Purpose

Load the existing privacy compliance artifact for editing. Parse all sections to understand the current state before applying requested changes.

## Prerequisites

- Privacy compliance artifact exists at `{output_folder}/planning-artifacts/compliance/privacy-compliance.md`
- User has identified specific changes to make

## Actions

### 1. Load Existing Artifact

Read the privacy compliance document:
```
{output_folder}/planning-artifacts/compliance/privacy-compliance.md
```

### 2. Parse Document Sections

Identify and catalog existing sections:

| Section | Status | Content Summary |
|---------|--------|-----------------|
| Compliance Context | [Present/Missing] | [Summary] |
| Data Subject Rights | [Present/Missing] | [Summary] |
| Lawful Basis Tracking | [Present/Missing] | [Summary] |
| Data Portability | [Present/Missing] | [Summary] |
| Consent Management | [Present/Missing] | [Summary] |
| Quality Gate Checklist | [Present/Missing] | [Summary] |

### 3. Identify Change Context

Understand the requested changes:

**Change Request Categories:**
| Category | Examples |
|----------|----------|
| **Rights Changes** | Add/modify right implementation, change timeline |
| **Basis Changes** | Update processing activity, change lawful basis |
| **Export Changes** | Add format, modify pipeline, update CCPA disclosure |
| **Consent Changes** | Add consent purpose, modify withdrawal, update UI |
| **Framework Changes** | Add CCPA, LGPD, or other framework support |
| **Compliance Changes** | Update checklist, add safeguards |

### 4. Document Current State Summary

Present findings to user:

```markdown
## Current Privacy Compliance State

**Artifact Location:** {output_folder}/planning-artifacts/compliance/privacy-compliance.md
**Last Modified:** [date if available]

### Sections Present:
- [x] Compliance Context
- [x] Data Subject Rights
- [ ] Lawful Basis Tracking (partial)
- [x] Data Portability
- [ ] Consent Management (missing)

### Identified Issues:
1. [Issue 1]
2. [Issue 2]

### Ready for Edit:
Awaiting specific change instructions.
```

### 5. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
PRIVACY COMPLIANCE DESIGN - EDIT MODE
================================================================================
Document: privacy-compliance.md
Version: {version}
Compliance Validation Status: {status}
================================================================================

APPLICABLE FRAMEWORKS: [GDPR, CCPA, etc.]

CURRENT CONFIGURATION:
- Data Subject Rights: {rights_count} rights implemented
- Lawful Basis: {activities_count} processing activities mapped
- Export Formats: {formats} supported
- Consent Purposes: {purposes_count} defined

COMPLIANCE STATUS:
- QG-CC: {status}
- Last Validated: {date}

EDITABLE SECTIONS:
[1] Compliance Context - Modify frameworks, scope
[2] Data Subject Rights - Update rights implementation
[3] Lawful Basis - Change processing activities, basis
[4] Data Portability - Modify export formats, pipeline
[5] Consent Management - Update consent workflows
[6] Quality Checklist - Update compliance checks
[7] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- Document located and fully loaded
- Frontmatter parsed with all metadata extracted
- All privacy sections parsed
- Consent configurations documented
- Lawful basis mappings extracted
- Edit summary presented to user
- User has selected edit target(s)

---

## FAILURE MODES

- **Document not found:** Redirect to Create mode or request alternate path
- **Invalid frontmatter:** Attempt recovery, flag missing fields
- **Missing sections:** Flag sections needing completion before edit
- **Validation failed:** Warn that edits require full re-validation
- **Incomplete consent:** Flag consent purposes needing configuration

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] All sections identified and cataloged
- [ ] Current state summary presented
- [ ] Ready to receive change instructions

## Outputs

- Parsed privacy compliance content (in working memory)
- Section inventory table
- Current state summary

## Next Step

Proceed to `step-11-e-apply.md` to apply requested changes.

---

**Navigation:** Enter 'C' to continue to apply changes
