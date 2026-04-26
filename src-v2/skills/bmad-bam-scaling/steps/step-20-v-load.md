# Step 20: Load Scaling Design for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load artifact and validation checklist
- 💾 Track: Validation state in document metadata
- 📖 Context: Prepare for comprehensive validation in Step 21
- 🚫 Do NOT: Perform validation in this step - only load and prepare
- 🔍 Use web search: Not required for validation loading

---

## Purpose

Load the scaling design artifact and the associated quality gate checklist to prepare for validation against scaling best practices and multi-tenant requirements.

---

## Prerequisites

- Scaling design document exists at: `{output_folder}/planning-artifacts/scaling-design.md`
- Quality gate checklist available
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/scaling-design.md`
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

## COLLABORATION MENUS (A/P/C)

After loading documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Understand specific validation requirements
- **P (Party Mode)**: Get architect input on validation priorities
- **C (Continue)**: Proceed to validation

Validation scope: [Full/Partial/Regression]

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: document state, checklist categories
- Process enhanced insights on validation focus areas
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Determine validation priorities for scaling design"
- Present synthesized recommendations on focus areas
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation scope
- Proceed to next step: `step-21-v-validate.md`

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
