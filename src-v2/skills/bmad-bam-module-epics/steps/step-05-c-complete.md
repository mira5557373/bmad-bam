# Step 5: Compile Epic Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting summary** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present compiled document with A/P/C menu** for final approval
- 💾 **SAVE document to correct output location**

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile final epic document from all previous steps
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: Consolidate all epics, stories, and done criteria
- 🚫 Do NOT: Modify content - compile as-is from previous steps
- 📎 Output: `{output_folder}/planning-artifacts/modules/{module}/epics.md`
- ✅ Complete: Create mode workflow finishes with this step

---

## CONTEXT BOUNDARIES

### Input Context

- **From Step 01:** Module context, epic categories
- **From Step 02:** Epic scope, acceptance criteria, multi-tenant considerations
- **From Step 03:** User stories, estimates, dependencies, sprint allocation
- **From Step 04:** Quality gate requirements, test coverage, documentation, review checkpoints
- **Template:** `{project-root}/_bmad/bam/data/templates/module-epic.md`

### Output

- Complete epic document at `{output_folder}/planning-artifacts/modules/{module}/epics.md`

### Quality Gate

- Document contains all required sections
- All epics have stories
- All stories have done criteria

---

## YOUR TASK

Compile the final epic document by consolidating all content from Steps 1-4. Use the module-epic template, fill all sections, and save to the correct output location. Present the compiled document summary via A/P/C menu for final approval.

---

## Main Sequence

### Action 1: Load Template

Load the epic template:

```
{project-root}/_bmad/bam/data/templates/module-epic.md
```

### Action 2: Compile Document

Fill the template with content from previous steps:

```markdown
---
name: Module Epics - {module_name}
description: Epics and stories for {module_name} module
category: planning
version: 1.0.0
module: {module_name}
tenant_model: {tenant_model}
ai_runtime: {ai_runtime}
created_date: {current_date}
author: {author}
stepsCompleted: [1, 2, 3, 4, 5]
---

# Module Epics: {module_name}

**Project:** {{project_name}}
**Module:** {module_name}
**Date:** {current_date}
**Version:** 1.0.0
**Author:** {author}

---

## Executive Summary

**Module:** {module_name}
**Domain:** {domain}
**Tenant Model:** {tenant_model}
**AI Runtime:** {ai_runtime}

### Epic Overview

| Metric | Value |
|--------|-------|
| Total Epics | {epic_count} |
| Total Stories | {story_count} |
| Total Points | {total_points} |
| Planned Sprints | {sprint_count} |

### Epic Breakdown

| Category | Count | Points |
|----------|-------|--------|
| Core | {core_count} | {core_points} |
| Integration | {integration_count} | {integration_points} |
| Infrastructure | {infra_count} | {infra_points} |
| AI/Agent | {ai_count} | {ai_points} |

---

## Module Boundaries

{From Step 01: Module boundaries analysis}

| Boundary Type | Description |
|---------------|-------------|
| Domain Boundary | {domain_scope} |
| API Boundary | {api_surface} |
| Data Boundary | {data_ownership} |
| Tenant Boundary | {isolation_requirements} |

---

## Epic List

{From Step 02: Complete epic definitions}

### E-{module}-001: {Epic Title}

**Category:** Core
**Priority:** P1
**User Value:** {what users accomplish}

**Acceptance Criteria:**
- [ ] {AC-001}
- [ ] {AC-002}
- [ ] **TENANT:** {tenant criteria}

**Multi-Tenant Considerations:**
- Tenant Model: {tenant_model}
- Data Isolation: {isolation approach}
- Tier Availability: All tiers

---

### E-{module}-002: {Epic Title}

{Repeat for all epics}

---

## User Stories

{From Step 03: Complete story definitions}

### Epic: E-{module}-001 - {Epic Title}

#### S-{module}-001-01: {Story Title}

**User Story:**
As a **{user_role}** in tenant **{tenant_type}**,
I want to **{action}**
So that **{business_value}**

**Tenant Context:**
- Tenant Scope: tenant-scoped
- Tier Availability: All tiers
- Data Isolation: RLS

**Acceptance Criteria:**
- [ ] {criteria}
- [ ] **TENANT:** Data scoped to requesting tenant

**Estimation:**
- Story Points: {points}
- Priority: Must Have
- Sprint: Sprint 1

{Repeat for all stories}

---

## Sprint Allocation

{From Step 03: Sprint planning}

### Sprint 1: {Sprint Goal}

| Story | Title | Points | Priority |
|-------|-------|--------|----------|
| S-{module}-001-01 | {title} | 3 | Must Have |
| S-{module}-001-02 | {title} | 5 | Must Have |

**Sprint Total:** {points} points
**Capacity:** {capacity} points

{Repeat for all sprints}

---

## Definition of Done

{From Step 04: Complete done criteria}

A story is DONE when ALL of the following are true:

### Functional Completeness
- [ ] All acceptance criteria met
- [ ] No known defects

### Code Quality
- [ ] Code review approved
- [ ] No security vulnerabilities

### Testing
- [ ] Unit tests: {threshold}% coverage
- [ ] Integration tests: passing
- [ ] **TENANT:** Isolation tests: passing

### Documentation
- [ ] Code documented
- [ ] API docs updated

### Quality Gates
- [ ] Applicable QG checks passed
- [ ] No CRITICAL failures

---

## Quality Gate Requirements

{From Step 04: QG mappings}

| Story Type | Quality Gates | CRITICAL Checks |
|------------|---------------|-----------------|
| Core | QG-M1, QG-M2 | Tenant isolation |
| Integration | QG-I1, QG-I2 | Facade compliance |
| AI/Agent | QG-M3, QG-I3 | Agent isolation |

---

## Dependencies

{From Step 03: Dependency mapping}

### Epic Dependencies

| Epic | Depends On | Enables |
|------|------------|---------|
| E-{module}-001 | None | E-{module}-002 |
| E-{module}-002 | E-{module}-001 | E-{module}-003 |

### Story Dependencies

| Story | Depends On | Blocks |
|-------|------------|--------|
| S-001-01 | None | S-001-02 |
| S-001-02 | S-001-01 | S-001-04 |

---

## Web Research Findings

{From all steps: Consolidated web research}

### Epic Decomposition Best Practices
_Source: [URL]_
{findings}

### Multi-Tenant Story Patterns
_Source: [URL]_
{findings}

### Definition of Done Standards
_Source: [URL]_
{findings}

---

## Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| Epic organization by user value | Deliver incremental value | {date} |
| Tenant context in all stories | Multi-tenant isolation | {date} |
| Fibonacci estimation | Industry standard | {date} |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {current_date} | {author} | Initial epic document |
```

### Action 3: Save Document

Save the compiled document:

```
{output_folder}/planning-artifacts/modules/{module}/epics.md
```

### Action 4: Generate Summary

Present compilation summary:

```
================================================================================
MODULE EPIC DOCUMENT COMPILED
================================================================================

DOCUMENT: {output_folder}/planning-artifacts/modules/{module}/epics.md
VERSION: 1.0.0

CONTENTS:
- Executive Summary
- Module Boundaries
- {epic_count} Epics
- {story_count} Stories
- Sprint Allocation ({sprint_count} sprints)
- Definition of Done
- Quality Gate Requirements
- Dependencies
- Web Research Findings

METRICS:
- Total Points: {total_points}
- Estimated Sprints: {sprint_count}
- Quality Gates: {gate_count} mapped

================================================================================
```

---

## COLLABORATION MENUS (A/P/C)

After presenting compiled document:

```
================================================================================
MODULE EPIC DOCUMENT READY FOR APPROVAL
================================================================================

DOCUMENT: epics.md for {module_name}
LOCATION: {output_folder}/planning-artifacts/modules/{module}/epics.md

SUMMARY:
- Epics: {epic_count}
- Stories: {story_count}
- Points: {total_points}
- Sprints: {sprint_count}

TENANT MODEL: {tenant_model} - All stories include isolation requirements

================================================================================
Your options:
- **A (Advanced Elicitation)**: Review specific sections before finalizing
- **P (Party Mode)**: Final stakeholder review before approval
- **C (Continue)**: Approve and save document - Complete workflow

Select an option:
================================================================================
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

| Topic | Questions to Explore |
|-------|---------------------|
| **Document Structure** | Is the document organization appropriate? |
| **Content Completeness** | Are all required sections filled? |
| **Consistency** | Do stories align with epics? |
| **Quality** | Does content meet documentation standards? |

Pass context: Compiled document, module details, specific sections to review.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Final review of epic document for module {module_name}:
- Epics: {epic_count}
- Stories: {story_count}
- Points: {total_points}
- Sprints: {sprint_count}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| **Product Owner** | Completeness | Is all scope captured? |
| **Tech Lead** | Feasibility | Is the plan achievable? |
| **Scrum Master** | Process | Can sprints be executed? |
| **Stakeholder** | Alignment | Does this meet expectations? |

Process multi-perspective analysis for final approval.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Finalize and save document:

```yaml
# Document saved to:
path: {output_folder}/planning-artifacts/modules/{module}/epics.md
status: complete
version: 1.0.0
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document
  - step-05-c-complete  # Add this
workflowStatus: complete
outputPath: {output_folder}/planning-artifacts/modules/{module}/epics.md
```

3. Mark Create mode complete.

---

## SUCCESS METRICS

- ✅ Template loaded successfully
- ✅ All sections from Steps 1-4 compiled
- ✅ Document saved to correct location
- ✅ Document passes format validation
- ✅ User approved final document via A/P/C menu
- ✅ Workflow marked complete

---

## FAILURE MODES

| Failure | Recovery |
|---------|----------|
| Template not found | Verify BAM installation |
| Missing section content | Return to relevant step |
| Save failed | Check output folder permissions |
| Document validation failed | Fix format issues |

---

## Verification

- [ ] Template loaded
- [ ] All epics compiled
- [ ] All stories compiled
- [ ] Done criteria included
- [ ] Dependencies documented
- [ ] Document saved to correct path
- [ ] User approved document

---

## Outputs

- **Epic Document:** `{output_folder}/planning-artifacts/modules/{module}/epics.md`

---

## WORKFLOW COMPLETE

Create mode is complete. The epic document is ready for:

| Next Action | Workflow | Purpose |
|-------------|----------|---------|
| Validate epics | `bmad-bam-module-epics` Validate mode | Verify against criteria |
| Edit epics | `bmad-bam-module-epics` Edit mode | Modify existing document |
| Start development | Sprint execution | Begin implementation |
| Cross-module stories | `bmad-bam-cross-module-story` | Create cross-module epics |

---

## Related Workflows

Based on epic document completion, consider:

- `bmad-bam-module-epics` Validate mode - Validate epic document
- `bmad-bam-cross-module-story` - Create cross-module stories
- `bmad-bam-convergence` - Verify module readiness

---

## NEXT STEP

Create mode workflow complete. Options:

- **Run Validate mode:** Verify epic document meets quality criteria
- **Run Edit mode:** Modify existing epic document
- **Proceed to development:** Begin sprint execution
- **Create cross-module stories:** Link modules together
