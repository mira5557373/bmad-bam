# Step 10: Load Existing Scaling Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing scaling design and identify modification targets
- 💾 Track: Update document frontmatter after section completion
- 📖 Context: Maintain existing design context for targeted modifications
- 🚫 Do NOT: Make modifications in this step - only load and identify
- 🔍 Use web search: Not required for Edit mode loading

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

---

## COLLABORATION MENUS (A/P/C)

After loading and presenting the existing document, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring architect perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, proposed modifications
- Process enhanced insights on change impact
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to scaling design"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply.md`

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
