# Step 10: Load Existing Security Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing security design document
- 💾 Track: `editMode: true, stepsCompleted: [10]` when complete
- 📖 Context: Identify current state and modification targets
- 🚫 Do NOT: Make changes yet; only load and analyze
- 🔍 Use web search: Not required for loading step
- ⚠️ Gate: None (preparation step)

---

## Purpose

Load an existing security design document for modification. Parse the document structure, identify sections, and prepare for targeted edits.

---

## Prerequisites

- Existing security design document at `{output_folder}/planning-artifacts/security-design.md`
- User has identified specific sections or elements to modify

---

## Actions

### 1. Load Security Design Document

**Load artifact:** `{output_folder}/planning-artifacts/security-design.md`

Parse and extract:

| Section | Current State | Last Modified |
|---------|---------------|---------------|
| Executive Summary | Extract | Date |
| Authentication | Extract | Date |
| Authorization | Extract | Date |
| Data Protection | Extract | Date |
| Threat Mitigations | Extract | Date |
| Testing Requirements | Extract | Date |

### 2. Identify Document Metadata

| Metadata | Value |
|----------|-------|
| Version | Extract from header |
| Last Author | Extract from header |
| Last Modified | Extract from header |
| Total Sections | Count |

### 3. Present Current State Summary

**Authentication Section:**
- JWT configuration: {current state}
- MFA enforcement: {current state}
- Session management: {current state}
- SSO integration: {current state}

**Authorization Section:**
- RBAC model: {current state}
- Permission inheritance: {current state}
- Cross-tenant admin: {current state}
- API key management: {current state}

**Data Protection Section:**
- Encryption at rest: {current state}
- Encryption in transit: {current state}
- Key management: {current state}
- Secret rotation: {current state}
- Data classification: {current state}

**Threat Mitigations Section:**
- Mapped threats: {count}
- Controls documented: {count}
- Residual risks: {count}

**Testing Requirements Section:**
- Test areas defined: {count}
- Scenarios documented: {count}
- SLAs specified: {yes/no}

### 4. Collect Modification Request

**Prompt user for edit scope:**

| Edit Type | Description | Scope |
|-----------|-------------|-------|
| Section update | Modify entire section | Large |
| Element addition | Add new policy/control | Medium |
| Element modification | Change existing item | Small |
| Metadata update | Version, author, date | Minimal |

⏸️ **PAUSE:** Present current state and await user modification request.

---

## Verification

- [ ] Security design document loaded successfully
- [ ] All sections parsed and extracted
- [ ] Document metadata identified
- [ ] Current state summary presented to user
- [ ] Modification scope identified from user

---

## Outputs

- Parsed security design document in memory
- Current state summary
- Identified modification targets

---

## Next Step

Proceed to `step-11-e-apply.md` to apply requested modifications.
