# Step 05: Compile LLM Versioning Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile complete LLM versioning design document
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: All designs from Steps 01-04
- 🚫 Do NOT: Add new design elements - compilation only
- 🔍 Use web search: Final verification of LLM versioning best practices
- ⚠️ Gate: QG-AI1, QG-AI2 - Pre-compilation verification

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Compiling all design sections into final document
- Verifying completeness against checklist
- Generating output artifact
- Cross-referencing related artifacts

**OUT OF SCOPE:**
- Adding new design elements
- Implementation details
- Operational runbooks

---

## Purpose

Compile the complete LLM versioning design document by integrating all components from Steps 01-04 into a cohesive artifact. Output the final document to the planning-artifacts folder.

---

## Prerequisites

- Steps 01-04 completed: All design components available
- **Load template:** `{project-root}/_bmad/bam/data/templates/llm-versioning-design-template.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/ai-versioning.md`

---

## Inputs

- Model inventory from Step 01
- Version management design from Step 02
- Rollout strategy from Step 03
- Monitoring design from Step 04
- Template: `{project-root}/_bmad/bam/data/templates/llm-versioning-design-template.md`

---

## YOUR TASK:

Compile the complete LLM versioning design document.

---

## Main Sequence

### 1. Load Document Template

Load the LLM versioning design template:

```
{project-root}/_bmad/bam/data/templates/llm-versioning-design-template.md
```

If template does not exist, use the standard structure below.

### 2. Compile Document Sections

**Document Structure:**

```markdown
# LLM Versioning Design

**Project:** {{project_name}}
**Version:** {{version}}
**Date:** {{date}}
**Author:** AI Runtime Architect (Nova)

## Executive Summary

Brief overview of LLM versioning strategy.

## 1. Model Inventory

### 1.1 Current Models
[From Step 01: Model inventory table]

### 1.2 Tenant-Model Mapping
[From Step 01: Tenant tier to model assignment]

### 1.3 Version Dependencies
[From Step 01: Dependencies affecting versioning]

## 2. Version Management

### 2.1 Model Version Registry
[From Step 02: Registry schema]

### 2.2 Per-Tenant Assignment
[From Step 02: Assignment logic]

### 2.3 A/B Testing Configuration
[From Step 02: A/B testing framework]

### 2.4 Fallback Configuration
[From Step 02: Fallback chain design]

### 2.5 Version Transition Rules
[From Step 02: Transition and deprecation rules]

## 3. Rollout Strategy

### 3.1 Canary Deployment Phases
[From Step 03: Tier-aware canary design]

### 3.2 Feature Flag Integration
[From Step 03: Feature flag schema]

### 3.3 Performance Comparison Metrics
[From Step 03: Comparison metrics]

### 3.4 Rollback Triggers
[From Step 03: Automated rollback configuration]

### 3.5 Communication Plan
[From Step 03: Rollout communication]

## 4. Version Monitoring

### 4.1 Quality Metrics
[From Step 04: Quality measurement framework]

### 4.2 Cost Comparison
[From Step 04: Cost tracking dashboard]

### 4.3 Latency Tracking
[From Step 04: Latency monitoring]

### 4.4 Feedback Collection
[From Step 04: Feedback mechanisms]

## 5. Implementation Checklist

- [ ] Model version registry implemented
- [ ] Per-tenant assignment logic deployed
- [ ] Feature flags configured
- [ ] Canary deployment pipeline ready
- [ ] Monitoring dashboards created
- [ ] Alerting configured
- [ ] Feedback collection integrated
- [ ] Rollback automation tested

## 6. Related Artifacts

- Master Architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- AI Runtime Config: `{output_folder}/planning-artifacts/ai/runtime-config.md`
- Agent Definitions: `{output_folder}/planning-artifacts/ai/agent-definitions.md`

## 7. Appendices

### A. Version Registry Schema (Full)
### B. Feature Flag Reference
### C. Rollback Runbook
### D. Monitoring Query Reference
```

### 3. Verify Completeness

Run completeness checklist:

| Section | Status | Source Step |
|---------|--------|-------------|
| Model inventory | Complete/Missing | Step 01 |
| Tenant-model mapping | Complete/Missing | Step 01 |
| Version registry schema | Complete/Missing | Step 02 |
| Per-tenant assignment | Complete/Missing | Step 02 |
| A/B testing config | Complete/Missing | Step 02 |
| Fallback configuration | Complete/Missing | Step 02 |
| Canary deployment | Complete/Missing | Step 03 |
| Feature flag design | Complete/Missing | Step 03 |
| Rollback triggers | Complete/Missing | Step 03 |
| Quality metrics | Complete/Missing | Step 04 |
| Cost comparison | Complete/Missing | Step 04 |
| Latency tracking | Complete/Missing | Step 04 |
| Feedback collection | Complete/Missing | Step 04 |

**All sections must be Complete to proceed.**

### 4. Generate Output Artifact

Write the compiled document to:

```
{output_folder}/planning-artifacts/ai/llm-versioning-design.md
```

### 5. Cross-Reference Related Artifacts

Update related artifacts with references:

| Artifact | Update Required |
|----------|-----------------|
| Master Architecture | Add reference to LLM versioning design |
| AI Runtime Config | Link to versioning strategy |
| Module Architecture (AI) | Reference model assignment |

### 6. Quality Gate Pre-Check

Verify against quality gates:

**QG-AI1 (AI Runtime Configuration):**
- [ ] Model registry schema defined
- [ ] Version transition rules documented
- [ ] Fallback configuration complete

**QG-AI2 (AI Operational Monitoring):**
- [ ] Quality metrics defined
- [ ] Cost tracking configured
- [ ] Latency monitoring specified
- [ ] Feedback collection designed

---

## COLLABORATION MENUS (A/P/C):

After completing compilation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Review specific sections for enhancement
- **P (Party Mode)**: Final review with Nova (AI Runtime) and Atlas (Platform)
- **C (Continue)**: Accept document and finalize
- **[Specific section]**: Describe section to review

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: Complete document, specific section concerns
- Process enhanced insights
- Ask user: "Accept these enhancements? (y/n)"
- If yes, update document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Final review of LLM versioning design: {summary}"
- Process AI Runtime Architect (Nova) final approval
- Process Platform Architect (Atlas) multi-tenant verification
- Present final recommendations
- Ask user: "Accept final document? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Finalize document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Mark workflow as complete

---

## SUCCESS METRICS:

- [ ] All sections compiled from Steps 01-04
- [ ] Completeness checklist 100% passed
- [ ] Document written to output location
- [ ] Related artifacts cross-referenced
- [ ] Quality gate pre-checks passed

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Missing sections | Return to incomplete step |
| Template not found | Use default structure |
| Output path invalid | Create directory structure |
| Cross-reference broken | Verify artifact paths |

---

## Verification

- [ ] Document structure complete
- [ ] All design components included
- [ ] Cross-references valid
- [ ] Output artifact created
- [ ] Ready for validation mode

---

## Outputs

- Complete LLM versioning design: `{output_folder}/planning-artifacts/ai/llm-versioning-design.md`
- Updated cross-references in related artifacts
- Quality gate pre-check results

---

## WORKFLOW COMPLETE:

The LLM Versioning Design workflow is complete. 

**Output Location:** `{output_folder}/planning-artifacts/ai/llm-versioning-design.md`

**Next Steps:**
- Run validation mode (`step-20-v-load.md`) to verify against quality gates
- Implement version registry per design
- Configure monitoring dashboards
- Set up rollback automation
