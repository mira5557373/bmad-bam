# Step 20: Load Scaling Design for Validation (Validate Mode)

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing scaling-design.md file
- 📖 ALWAYS read the complete document and extract all scaling configurations
- 🔄 ALWAYS load the validation checklist before proceeding
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT autoscaling policies, tier quotas, and capacity planning settings
- 📋 PRESENT validation scope summary before executing validation
- 🎯 IDENTIFY sections requiring validation based on document state

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load artifact and validation checklist
- 💾 Track: Validation state in document metadata
- 📖 Context: Prepare for comprehensive validation in Step 21
- 🚫 Do NOT: Perform validation in this step - only load and prepare
- 🔍 Use web search: Not required for validation loading

---

## YOUR TASK

Load the scaling design artifact and QG-M4 validation checklist, extract all scaling configurations for validation, map artifact sections to checklist categories, and prepare the validation scope for execution in Step 21.

---

## Purpose

Load the scaling design artifact and the associated quality gate checklist to prepare for validation against scaling best practices and multi-tenant requirements.

---

## Prerequisites

- Scaling design document exists at: `{output_folder}/planning-artifacts/scaling-design.md`
- Quality gate checklist available
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-cp1.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `scaling-*`

---

## Actions

### 1. Load Scaling Design Document

Load the artifact to validate:
- `{output_folder}/planning-artifacts/scaling-design.md`

If the file does not exist, inform the user:
- No scaling design found at expected location
- Suggest running Create mode first

### 2. Extract Document Metadata

Parse and display document metadata:

| Field | Value |
|-------|-------|
| Version | {version} |
| Created | {date} |
| Last Modified | {date} |
| Author | {author} |
| Status | {draft/review/approved} |

### 3. Load Validation Checklist

Load the scaling design validation checklist and display categories:

| Category | Check Count | Critical Checks |
|----------|-------------|-----------------|
| Horizontal Scaling | {count} | {critical count} |
| Database Scaling | {count} | {critical count} |
| Tenant-Aware Scaling | {count} | {critical count} |
| Capacity Planning | {count} | {critical count} |
| Cost Optimization | {count} | {critical count} |
| Runbooks | {count} | {critical count} |
| **Total** | {total} | {total critical} |

### 4. Identify Validation Scope

Determine validation scope based on document state:

| Scope Option | Description | When to Use |
|--------------|-------------|-------------|
| Full | All checklist items | New document, major changes |
| Partial | Modified sections only | Minor updates |
| Regression | Previously failed items | Re-validation |

### 5. Prepare Validation Context

Gather context for validation:

| Context Item | Source | Purpose |
|--------------|--------|---------|
| Tenant Model | master-architecture.md | Constraint validation |
| Tier Definitions | master-architecture.md | Quota validation |
| SLA Requirements | master-architecture.md | Performance targets |
| Cost Constraints | project requirements | Budget validation |

---

## SUCCESS METRICS

- ✅ Scaling design document located and fully loaded
- ✅ Document metadata extracted (version, date, author)
- ✅ All scaling configuration sections parsed
- ✅ Validation checklist loaded successfully
- ✅ Checklist categories mapped to artifact sections
- ✅ Validation scope determined and confirmed
- ✅ Context gathered for validation execution

---

## FAILURE MODES

- ❌ **Document not found:** Inform user, suggest running Create mode first
- ❌ **Checklist not found:** Fall back to embedded checklist criteria
- ❌ **Incomplete document:** Flag missing sections, recommend Edit mode first
- ❌ **Version mismatch:** Warn if document version predates checklist version
- ❌ **Context artifacts missing:** Warn about missing master-architecture.md dependencies

---

## Verification

- [ ] Scaling design document loaded successfully
- [ ] Document metadata extracted
- [ ] Validation checklist loaded
- [ ] Validation scope determined
- [ ] Context gathered for validation

---

## Outputs

- Document summary and metadata
- Validation checklist with categories
- Validation scope decision
- Context for validation

---

## Next Step

Proceed to `step-21-v-validate.md` to perform validation against quality criteria.
