# Step 10: Load Existing Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not load and analyze only
- 📂 **Edit mode entry point** - Load existing document before modifications
- 🔄 **PARSE provisioning saga** with all steps and rollback procedures
- 🗃️ **EXTRACT resource initialization** configuration for each tier
- 🔐 **IDENTIFY tier-specific settings** and isolation requirements
- 💬 **PRESENT edit menu** with all modifiable sections before accepting selections

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing onboarding design, identify modification targets
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Existing document structure and content
- 🚫 Do NOT: Modify content in this step - load and analyze only
- 🔍 Use web search: Not required for loading existing documents
- ⚠️ Gate: Tenant lifecycle patterns

---

## YOUR TASK

Load the existing tenant onboarding design artifact, parse the provisioning saga with all steps and rollback procedures, extract resource initialization configuration across all tiers (Free, Pro, Enterprise), identify tier-specific isolation settings, and present an interactive menu showing all editable sections for user selection.

---

## Purpose

Load and review existing tenant onboarding design documents to identify sections requiring modification.

---

## Prerequisites

- Existing tenant onboarding design document
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle

---

## Inputs

- Existing document: `{output_folder}/planning-artifacts/tenant-onboarding-design.md`

---

## Actions

### 1. Load Existing Document

Load the tenant onboarding design:

```
{output_folder}/planning-artifacts/tenant-onboarding-design.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current document:

| Section | Status | Key Content |
|---------|--------|-------------|
| Executive Summary | YES/NO | {tenant_model}, {provisioning_strategy} |
| Registration Flow | YES/NO | {signup_steps} defined |
| Provisioning Saga | YES/NO | {saga_steps} steps with rollback |
| Resource Initialization | YES/NO | Storage, Cache, AI, Secrets |
| Validation Design | YES/NO | Health checks, Isolation tests |
| Rollback Procedures | YES/NO | Compensating actions defined |
| Monitoring & Alerting | YES/NO | Metrics and thresholds |

### 3. Identify Document Metadata

Extract document version and history:

| Attribute | Value |
|-----------|-------|
| Document Path | `{path}` |
| Version | `{version}` |
| Last Modified | `{date}` |
| Last Author | `{author}` |
| Tenant Model | `{tenant_model}` |
| Status | `{status}` |

### 4. Present Interactive Edit Menu

Display the editable sections menu:

```
================================================================================
TENANT ONBOARDING DESIGN - EDIT MODE
================================================================================
Document: tenant-onboarding-design.md
Version: {version}
Tenant Model: {tenant_model}
Status: {status}
================================================================================

EDITABLE SECTIONS:

[1] TENANT MODEL / ISOLATION
    - Modify isolation strategy (RLS, schema, database)
    - Update tenant context propagation
    - Adjust cross-tenant boundaries

[2] REGISTRATION WORKFLOW
    - Update signup steps and validation
    - Modify email verification flow
    - Change approval workflows

[3] PROVISIONING SAGA
    - Add/remove/reorder saga steps
    - Update step timeouts and retries
    - Modify compensation actions

[4] RESOURCE INITIALIZATION
    - Adjust storage quotas per tier
    - Modify cache allocation
    - Update AI runtime configuration
    - Change secrets management

[5] VALIDATION / HEALTH CHECKS
    - Update health check endpoints
    - Modify isolation test criteria
    - Adjust validation timeouts

[6] ROLLBACK PROCEDURES
    - Update compensating actions
    - Modify rollback triggers
    - Adjust cleanup sequences

[7] MONITORING / ALERTING
    - Update metric collection
    - Modify alert thresholds
    - Add/remove dashboards

[8] TIER CONFIGURATION
    - Adjust tier-specific quotas
    - Update feature flags per tier
    - Modify upgrade/downgrade paths

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

### 5. Confirm Modification Scope

Based on user input, confirm:

| Section | Modify? | Reason |
|---------|---------|--------|
| Tenant model/isolation | [ ] | {reason} |
| Registration workflow | [ ] | {reason} |
| Provisioning saga | [ ] | {reason} |
| Resource initialization | [ ] | {reason} |
| Validation/health checks | [ ] | {reason} |
| Rollback procedures | [ ] | {reason} |
| Monitoring/alerting | [ ] | {reason} |
| Tier configuration | [ ] | {reason} |

---

## SUCCESS METRICS

- ✅ Onboarding design artifact located and fully loaded
- ✅ Document structure parsed with all 7 sections identified
- ✅ Provisioning saga steps extracted with rollback procedures
- ✅ Resource initialization configuration parsed per tier
- ✅ Tier-specific isolation settings documented
- ✅ Document metadata (version, author, status) captured
- ✅ Interactive edit menu presented to user
- ✅ User has selected specific edit target(s)
- ✅ Modification scope confirmed before proceeding

---

## FAILURE MODES

- ❌ **Artifact not found:** Inform user and suggest switching to Create mode
- ❌ **Corrupted document structure:** Attempt recovery, flag missing sections
- ❌ **Incomplete provisioning saga:** Flag steps without rollback procedures
- ❌ **Missing tier configuration:** Warn that tier-specific edits require complete tier data
- ❌ **Inconsistent resource quotas:** Flag tier configurations that violate hierarchy (Free > Pro)

---

## Verification

- [ ] Existing document loaded successfully
- [ ] Document structure parsed and understood
- [ ] Document metadata captured
- [ ] Modification targets identified with user
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current onboarding design state
- Document version and metadata
- List of sections to modify with rationale

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modifications.
