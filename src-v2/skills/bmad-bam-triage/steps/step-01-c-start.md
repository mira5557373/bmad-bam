# Step 01: Initialize Triage Analysis

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **VERIFY requirements exist** before proceeding to analysis

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize triage analysis and load requirements
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load requirements, module catalog, and triage patterns
- 🚫 Do NOT: Score complexity (that's Step 02)
- 🔍 Use web search: Verify triage patterns against current best practices
- ⚠️ Gate: QG-PL1 - Planning gate for module prioritization

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading project requirements and module catalog
- Identifying complexity dimensions
- Establishing triage analysis scope

**OUT OF SCOPE:**
- Scoring module complexity (Step 02)
- Prioritizing modules (Step 03)
- Defining implementation phases (Step 04)

---

## Purpose

Initialize the module complexity triage process by loading all project requirements, module catalog, and triage patterns. Establish the complexity dimensions (technical, business, integration, multi-tenant, AI) that will be used to score and prioritize modules.

---

## Prerequisites

- Requirements document exists (PRD, epics, or requirement-ingestion output)
- Module catalog identified (either from create-master-architecture or requirement analysis)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: triage
- **Load patterns:** `{project-root}/_bmad/bam/data/section-pattern-map.csv` → filter: planning

---

## Inputs

- Requirements: `{output_folder}/planning-artifacts/requirements/*.md`
- Module catalog: `{output_folder}/planning-artifacts/architecture/master-architecture.md` (if exists)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration: `{project-root}/_bmad/bam/config.yaml`

---

## YOUR TASK:

Load requirements, identify modules, and establish complexity dimensions for triage.

---

## Main Sequence

### 1. Load Requirements

Load the existing requirements documentation:

```
{output_folder}/planning-artifacts/requirements/
```

If no requirements exist, prompt user to:
1. Run `requirement-ingestion` workflow first, OR
2. Provide requirements document path

Extract:
- Project scope and objectives
- Functional requirements
- Non-functional requirements
- Known constraints

### 2. Load Module Catalog

If master architecture exists, load module catalog from:

```
{output_folder}/planning-artifacts/architecture/master-architecture.md
```

If not, identify modules from requirements:

| Module | Description | Primary Capability | Owner |
|--------|-------------|-------------------|-------|
| {{module_name}} | {{description}} | {{capability}} | {{owner}} |

### 3. Load Triage Patterns

Load complexity assessment patterns from pattern registry:

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: complexity

### 4. Identify Complexity Dimensions

Establish the five complexity dimensions for scoring:

| Dimension | Description | Weight | Scoring Factors |
|-----------|-------------|--------|-----------------|
| **Technical** | Implementation difficulty | 25% | Dependencies, technology stack, integration points |
| **Business** | Business criticality | 25% | Revenue impact, user reach, regulatory requirements |
| **Integration** | Cross-module coupling | 20% | API dependencies, event subscriptions, shared state |
| **Multi-Tenant** | Isolation complexity | 15% | Tenant model, data isolation, resource isolation |
| **AI Complexity** | Agent interactions | 15% | Agent count, tool registries, memory tiers |

### 5. Present Scope Summary

Present the triage scope for user confirmation:

#### 5.1 Modules to Triage

| # | Module | Description | Initial Complexity Estimate |
|---|--------|-------------|----------------------------|
| 1 | {{module}} | {{description}} | Low/Medium/High |

#### 5.2 Complexity Dimensions

Confirm the five dimensions with user:
- Technical Complexity (25%)
- Business Criticality (25%)
- Integration Complexity (20%)
- Multi-Tenant Complexity (15%)
- AI Complexity (15%)

#### 5.3 Scoring Scale

Confirm scoring scale:
- **1-3**: Low complexity
- **4-6**: Medium complexity
- **7-9**: High complexity
- **10**: Critical complexity

---

## Verification

- [ ] Requirements loaded and parsed
- [ ] Module catalog established
- [ ] Complexity dimensions confirmed
- [ ] Scoring scale agreed
- [ ] Triage scope confirmed with user

---

## Outputs

- Module list for triage
- Complexity dimensions with weights
- Triage scope confirmation

---

## Next Step

Proceed to `step-02-c-analyze.md` to score module complexity across all dimensions.
