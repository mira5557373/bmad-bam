# Step 10: Load Existing Security Design

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing security-design.md file
- 📖 ALWAYS read the complete document including all security control sections
- 🔄 ALWAYS parse authentication, authorization, and data protection configurations
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all RBAC policies, encryption settings, and threat mitigations
- 📋 PRESENT a structured summary of current security posture before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY QG-S3 status from frontmatter to understand compliance state
- ⚠️ FLAG any security controls marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing security design document
- 💾 Track: `editMode: true, stepsCompleted: [10]` when complete
- 📖 Context: Identify current state and modification targets
- 🚫 Do NOT: Make changes yet; only load and analyze
- 🔍 Use web search: Not required for loading step
- ⚠️ Gate: None (preparation step)

---

## YOUR TASK

Load the existing security design document, parse its structure, extract the current security configuration including authentication patterns, RBAC model, encryption standards, and threat mitigations. Present a summary showing what can be edited and enable the user to select specific sections for modification.

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

### 5. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
SECURITY DESIGN - EDIT MODE
================================================================================
Document: security-design.md
Version: {version}
QG-S3 Status: {PASS|CONDITIONAL|PENDING}
================================================================================

CURRENT SECURITY CONFIGURATION:
1. Authentication:   {JWT, MFA, SSO status} - {status}
2. Authorization:    {RBAC model} - {status}
3. Data Protection:  {encryption standards} - {status}
4. Threat Model:     {threats mapped, controls defined} - {status}
5. Testing:          {scope, scenarios} - {status}

EDITABLE SECTIONS:
[1] Authentication - Modify JWT, MFA, session, SSO settings
[2] Authorization - Update RBAC, permissions, API key policies
[3] Data Protection - Change encryption, key management, secrets
[4] Threat Mitigations - Update threat mapping, controls, residual risks
[5] Testing Requirements - Modify scope, scenarios, SLAs
[6] Full Document - Major restructure (requires QG-S3 re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

⏸️ **PAUSE:** Present current state and await user modification request.

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with QG-S3 status extracted
- ✅ Authentication architecture parsed (JWT, MFA, SSO, sessions)
- ✅ Authorization model extracted (RBAC, permissions, API keys)
- ✅ Data protection settings documented (encryption, keys, secrets)
- ✅ Threat mitigations inventoried
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing security metadata
- ❌ **Incomplete security controls:** Flag sections needing completion before edit
- ❌ **QG-S3 already failed:** Warn that edits require full security re-validation
- ❌ **Tenant isolation gaps:** Flag missing multi-tenant security controls

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
