# Step 10: Load Existing Data Residency Design (Edit Mode)

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing data-residency-design.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse regional configurations, compliance zones, and replication policies
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all data sovereignty rules and cross-border transfer restrictions
- 📋 PRESENT a structured summary of current residency configuration before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY GDPR Article 17/CCPA compliance status from frontmatter
- ⚠️ FLAG any regions marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing data residency design for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract regional configs, compliance zones, DR strategies
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate data sovereignty compliance
- 🔍 Use web search: Only if user requests updated regional requirements

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

Load the existing data residency design document, parse its structure, extract the current regional configuration including compliance zones, cross-border policies, and DR strategies. Present a summary showing what can be edited and enable the user to select specific sections for modification.

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

### 5. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
DATA RESIDENCY DESIGN - EDIT MODE
================================================================================
Document: data-residency-design.md
Version: {version}
Regions: {region_count} configured
Compliance Zones: {zone_list}
================================================================================

CURRENT REGIONAL CONFIGURATION:
1. Target Regions:     {count} regions - {status}
2. Compliance Zones:   {zone_count} defined - {status}
3. Database Architecture: {deployment_strategy} - {status}
4. Storage Config:     {bucket_count} regional buckets - {status}
5. Replication Policies: {policy_count} rules - {status}
6. DR Strategy:        {dr_approach} - {status}
7. Edge Locations:     {edge_count} configured - {status}

DATA SOVEREIGNTY: GDPR ({gdpr_status}), CCPA ({ccpa_status}), LGPD ({lgpd_status})

EDITABLE SECTIONS:
[1] Target Regions - Add/remove regional deployments
[2] Compliance Zones - Update jurisdiction boundaries
[3] Database Architecture - Modify regional database config
[4] Storage Configuration - Update bucket regions
[5] Replication Policies - Change cross-border transfer rules
[6] DR Strategy - Modify disaster recovery approach
[7] Edge Locations - Update edge deployment
[8] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Regional configuration matrix parsed completely
- ✅ Compliance zones extracted and categorized
- ✅ Cross-border transfer policies documented
- ✅ DR strategy configuration extracted
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete regional config:** Flag regions needing completion before edit
- ❌ **Data sovereignty violation risk:** Warn that edits may affect compliance
- ❌ **Missing compliance zone:** Cannot edit without baseline zones

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
