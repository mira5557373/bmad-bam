# Step 10: Load Existing Scaling Design (Edit Mode)

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing scaling-design.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse scaling configuration tables for current state
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all autoscaling policies and tier-based resource limits
- 📋 PRESENT a structured summary of current design before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY scaling compliance status from frontmatter
- ⚠️ FLAG any sections marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing scaling design and identify modification targets
- 💾 Track: Update document frontmatter after section completion
- 📖 Context: Maintain existing design context for targeted modifications
- 🚫 Do NOT: Make modifications in this step - only load and identify
- 🔍 Use web search: Not required for Edit mode loading

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

Load the existing scaling design document, parse its structure, extract the current scaling configuration including autoscaling policies, tier-based limits, and capacity planning settings. Present a summary showing what can be edited and enable the user to select specific sections for modification.

---

## Purpose

Load and review the existing scaling design document to identify sections requiring modification based on user requirements or changed circumstances.

---

## Prerequisites

- Existing scaling design document exists at: `{output_folder}/planning-artifacts/scaling-design.md`
- User has identified need for modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `scaling-*`

---

## Actions

### 1. Load Existing Document

Load the existing scaling design:
- `{output_folder}/planning-artifacts/scaling-design.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current document:

| Section | Status | Key Configuration |
|---------|--------|-------------------|
| Horizontal Scaling | YES/NO | {replicas, autoscaling policies} |
| Database Scaling | YES/NO | {replicas, pooling, sharding} |
| Tenant-Aware Scaling | YES/NO | {isolation, caches, queues} |
| Capacity Planning | YES/NO | {projections, reviews} |
| Cost Optimization | YES/NO | {strategies, controls} |
| Runbooks | YES/NO | {scale-up, scale-down, emergency} |

### 3. Identify Current Configuration

Extract and display key settings:

**Horizontal Scaling:**

| Service | Min Replicas | Max Replicas | Scaling Metric |
|---------|--------------|--------------|----------------|
| {service} | {min} | {max} | {metric} |

**Database Scaling:**

| Component | Current Config | Notes |
|-----------|----------------|-------|
| Read Replicas | {count} | {distribution} |
| Connection Pool | {size per tier} | {mode} |
| Sharding | {strategy or N/A} | {shard count} |

**Tenant-Aware Scaling:**

| Component | Free | Pro | Enterprise |
|-----------|------|-----|------------|
| Resource Quota | {quota} | {quota} | {quota} |
| Cache Allocation | {size} | {size} | {size} |
| Queue Priority | {priority} | {priority} | {priority} |

### 4. Identify Modification Targets

Prompt the user to identify which sections require modification:

| Section | Potential Modification | Common Triggers |
|---------|------------------------|-----------------|
| Horizontal Scaling | Replica counts, thresholds | Traffic changes |
| Database Scaling | Pool sizes, replica count | Performance issues |
| Tenant-Aware Scaling | Quotas, isolation | Tier changes |
| Capacity Planning | Projections, buffers | Growth changes |
| Cost Optimization | Strategies, budgets | Cost overruns |
| Runbooks | Procedures, contacts | Process updates |

### 5. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
SCALING DESIGN - EDIT MODE
================================================================================
Document: scaling-design.md
Version: {version}
Last Modified: {date}
================================================================================

CURRENT SCALING CONFIGURATION:
1. Horizontal Scaling:  {min-max replicas} - {status}
2. Database Scaling:    {pool size, replicas} - {status}
3. Tenant-Aware:        {tier quotas} - {status}
4. Capacity Planning:   {growth projection} - {status}
5. Cost Optimization:   {budget status} - {status}
6. Runbooks:            {runbook count} - {status}

EDITABLE SECTIONS:
[1] Horizontal Scaling - Modify autoscaling policies, replica counts
[2] Database Scaling - Update connection pools, read replicas
[3] Tenant-Aware Scaling - Adjust tier quotas, noisy neighbor controls
[4] Capacity Planning - Update growth projections, headroom buffers
[5] Cost Optimization - Modify budget alerts, reserved capacity
[6] Runbooks - Update operational procedures
[7] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Horizontal scaling configuration parsed (min/max replicas, thresholds)
- ✅ Database scaling settings extracted (pools, replicas, sharding)
- ✅ Tenant-aware scaling quotas documented per tier
- ✅ Capacity planning projections identified
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete scaling config:** Flag sections needing completion before edit
- ❌ **Tier configuration mismatch:** Warn about inconsistent tier definitions across sections
- ❌ **Runbooks missing:** Flag operational gaps that may impact production readiness

---

## Verification

- [ ] Existing document loaded successfully
- [ ] Document structure understood
- [ ] Current configuration extracted
- [ ] Sections for modification identified
- [ ] User confirmation of modification scope

---

## Outputs

- Summary of current scaling design state
- List of sections to modify
- Current configuration baseline

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modifications.
