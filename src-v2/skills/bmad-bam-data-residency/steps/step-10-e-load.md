# Step 10: Load Existing Artifact (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Load and review existing data residency design document to identify sections requiring modification.

---

## Prerequisites

- Existing data residency design document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-residency

---

## Actions

### 1. Load Existing Document

Load the existing data residency design:
- `{output_folder}/planning-artifacts/data-residency-design.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current document:

| Section | Status | Key Configuration |
|---------|--------|-------------------|
| Compliance Requirements | YES/NO | {frameworks covered} |
| Target Regions | YES/NO | {regions defined} |
| Regional Database Architecture | YES/NO | {db deployment strategy} |
| Regional Storage Configuration | YES/NO | {storage buckets} |
| Cache Region Affinity | YES/NO | {cache strategy} |
| Event Routing by Region | YES/NO | {event bus config} |
| Data Replication Restrictions | YES/NO | {replication policies} |
| Cross-Region API Routing | YES/NO | {routing strategy} |
| Backup Storage Policies | YES/NO | {backup locations} |
| Disaster Recovery Strategy | YES/NO | {DR approach} |
| Region Selection Workflow | YES/NO | {onboarding flow} |
| Region Migration Workflow | YES/NO | {migration process} |
| Compliance Verification | YES/NO | {verification framework} |
| Edge Location Configuration | YES/NO | {edge strategy} |

### 3. Display Document Metadata

Present current document state:

| Attribute | Value |
|-----------|-------|
| Document Path | {path} |
| Version | {version} |
| Last Modified | {date} |
| Status | {status} |
| Compliance Zones | {zones} |
| Target Regions | {regions} |

### 4. Identify Modification Targets

Confirm with the user which sections need modification:

| Modification Type | Examples |
|-------------------|----------|
| Add new region | Adding CN-NORTH for China expansion |
| Update compliance | Adding HIPAA requirements |
| Change replication policy | Relaxing US→EU restrictions |
| Update DR strategy | Adding active-active |
| Modify edge config | Adding new edge locations |

---

## Verification

- [ ] Existing document loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current data residency design state
- List of sections to modify
- Change scope assessment

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modifications.
