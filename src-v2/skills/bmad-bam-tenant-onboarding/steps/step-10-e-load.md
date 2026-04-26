# Step 10: Load Existing Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📂 **Edit mode entry point** - Load existing document before modifications

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing onboarding design, identify modification targets
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Existing document structure and content
- 🚫 Do NOT: Modify content in this step - load and analyze only
- 🔍 Use web search: Not required for loading existing documents
- ⚠️ Gate: Tenant lifecycle patterns

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

### 4. Gather Modification Requirements

Ask the user which sections need modification:

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
