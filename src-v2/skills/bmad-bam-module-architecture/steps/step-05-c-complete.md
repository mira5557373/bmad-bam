# Step 5: Compile Module Architecture Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER compile document without completing Steps 01-04 first
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: Load module architecture template before compiling
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Include ALL sections from previous steps in final document
- 📋 Run QG-M1 soft gate checkpoint before finalizing
- 💬 Present compiled document with A/P/C menu for user confirmation
- 🌐 USE web search to verify document completeness against best practices

---

## EXECUTION PROTOCOLS

- 🎯 Compile all module decisions into final architecture document
- 💾 Save document to: `{output_folder}/planning-artifacts/{module_name}-architecture.md`
- 📖 Load template: `{project-root}/_bmad/bam/data/templates/module-architecture.md`
- 📖 Reference all previous steps for content
- 🚫 DO NOT proceed without QG-M1 checkpoint verification
- ⚠️ Flag any missing sections or incomplete decisions
- 🔍 Use web search to verify module architecture document best practices

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** All outputs from Steps 01-04
- **Template:** `{project-root}/_bmad/bam/data/templates/module-architecture.md`
- **Output:** `{output_folder}/planning-artifacts/{module_name}-architecture.md`
- **Quality gate:** QG-M1 (Module Architecture) checkpoint required

---

## YOUR TASK

Compile all module architecture decisions from Steps 01-04 into the final module architecture document. Run QG-M1 soft gate checkpoint to verify completeness. Save the document to planning-artifacts.

---

## Main Sequence

### 1. Load Module Architecture Template

**Read template:**

```
{project-root}/_bmad/bam/data/templates/module-architecture.md
```

**Template sections to populate:**

| Section | Source Step | Required |
|---------|-------------|----------|
| Overview | Step 01 | Yes |
| Single Responsibility | Step 02 | Yes |
| Domain Model | Step 02, 03 | Yes |
| Module Layers | Step 03 | Yes |
| Tenant Context | Step 03 | Yes |
| Public API | Step 04 | Yes |
| Dependencies | Step 04 | Yes |
| Events | Step 03, 04 | Yes |
| Testing Strategy | Step 04 | Yes |
| Decisions | All steps | Yes |

### 2. Compile Document Sections

**Populate each section from previous steps:**

```markdown
# Module Architecture: {ModuleName}

**Project:** {{project_name}}
**Date:** {{date}}
**Version:** 1.0.0
**Author:** {{author}}
**Quality Gate:** QG-M1

---

## 1. Overview

### Module Identity

| Attribute | Value |
|-----------|-------|
| Module Name | {module_name} |
| Bounded Context | {context_from_step_01} |
| Complexity | {simple/medium/complex} |
| Owner Team | {team_name} |

### Purpose

{Single responsibility statement from Step 02}

### Scope

| In Scope | Out of Scope |
|----------|--------------|
| {responsibility} | {not_this_module} |

---

## 2. Domain Model

### Entities

| Entity | Tenant Scoped | Primary Key | Relationships |
|--------|---------------|-------------|---------------|
| {Entity1} | Yes | {pk_type} | {relationships} |

### Aggregates

| Aggregate | Root | Members | Invariants |
|-----------|------|---------|------------|
| {Aggregate1} | {Root} | {members} | {rules} |

### Value Objects

| Value Object | Used By | Attributes |
|--------------|---------|------------|
| {ValueObj1} | {Entity} | {attrs} |

### Domain Diagram

```
{Domain model diagram from Step 03}
```

---

## 3. Module Architecture

### Layer Design

```
{Layer diagram from Step 03}
```

### Layer Responsibilities

| Layer | Components | Tenant Context |
|-------|------------|----------------|
| API | {controllers, dtos} | Extracts context |
| Service | {services, use_cases} | Passes context |
| Domain | {entities, value_objects} | Embedded |
| Repository | {repositories} | Filters queries |

---

## 4. Tenant Context Integration

### Context Flow

```
{Tenant context flow diagram from Step 03}
```

### Integration Points

| Layer | Integration | Implementation |
|-------|-------------|----------------|
| {layer} | {point} | {how} |

---

## 5. Public API (Facade)

### Facade Contract

| Attribute | Value |
|-----------|-------|
| Facade Name | {ModuleName}Facade |
| Version | 1.0.0 |
| Operations | {count} |

### Operations

#### {Operation1}

| Attribute | Value |
|-----------|-------|
| Purpose | {description} |
| Input | {InputType} |
| Output | {OutputType} |
| Tenant Required | Yes |

**Input Schema:**
{Input contract from Step 04}

**Output Schema:**
{Output contract from Step 04}

**Error Codes:**
{Error contracts from Step 04}

---

## 6. Dependencies

### Required Facades

| Facade | Version | Criticality | Fallback |
|--------|---------|-------------|----------|
| {Facade1} | >=1.0.0 | {level} | {behavior} |

### Dependency Diagram

```
{Dependency diagram from Step 04}
```

---

## 7. Events

### Published Events

| Event | Version | Trigger |
|-------|---------|---------|
| {module}.created | 1.0.0 | {trigger} |
| {module}.updated | 1.0.0 | {trigger} |

### Consumed Events

| Event | Source | Handler |
|-------|--------|---------|
| {source}.event | {Module} | {Handler} |

### Event Envelope

{Event schema from Step 04}

---

## 8. Testing Strategy

### Test Matrix

| Test Type | Scope | Coverage |
|-----------|-------|----------|
| Unit | Facade | All operations |
| Contract | API | Consumer-producer |
| Tenant | Isolation | All scenarios |

### Key Test Scenarios

{Test scenarios from Step 04}

---

## 9. Architecture Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| {decision_1} | {rationale} | {{date}} |
| {decision_2} | {rationale} | {{date}} |

---

## 10. References

- Master Architecture: `{output_folder}/planning-artifacts/master-architecture.md`
- Integration Domain: `{project-root}/_bmad/bam/data/domains/integration.md`
- Facade Pattern: `{project-root}/_bmad/bam/data/patterns/facade.md`

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial module architecture |
```

Search the web: "module architecture documentation best practices {date}"

### 3. QG-M1 Soft Gate Checkpoint

**Run Module Architecture Gate verification:**

```markdown
## QG-M1: Module Architecture Gate Checkpoint

### Core Requirements

| Check | Status | Evidence |
|-------|--------|----------|
| Single responsibility defined | {PASS/FAIL} | {section reference} |
| Domain model documented | {PASS/FAIL} | {section reference} |
| All entities tenant-scoped | {PASS/FAIL} | {entity list} |
| Aggregates defined | {PASS/FAIL} | {aggregate list} |
| Layer architecture designed | {PASS/FAIL} | {layer diagram} |
| Tenant context flow documented | {PASS/FAIL} | {flow diagram} |
| Facade contract defined | {PASS/FAIL} | {operation count} |
| Dependencies documented | {PASS/FAIL} | {dependency list} |
| Events specified | {PASS/FAIL} | {event count} |
| Testing strategy planned | {PASS/FAIL} | {strategy section} |

### Critical Checks (Must Pass)

- [ ] **CRITICAL:** All entities include tenant_id reference
- [ ] **CRITICAL:** Facade operations require TenantContext
- [ ] **CRITICAL:** Events include tenant_id in envelope
- [ ] **CRITICAL:** No circular dependencies identified

### Gate Outcome

| Outcome | Criteria |
|---------|----------|
| **PASS** | All checks pass, all critical checks pass |
| **CONDITIONAL** | Non-critical gaps, all critical pass |
| **FAIL** | Any critical check fails |

**Current Outcome:** {PASS/CONDITIONAL/FAIL}

**If CONDITIONAL:**
| Gap | Mitigation | Deadline |
|-----|------------|----------|
| {gap} | {plan} | {date} |

**If FAIL:**
Return to failed step and address critical issues before proceeding.
```

### 4. Save Document

**Save compiled document to planning-artifacts:**

```
{output_folder}/planning-artifacts/{module_name}-architecture.md
```

**Verify file saved successfully.**

### 5. Generate Implementation Guidance

**Create implementation summary for developers:**

```markdown
## Implementation Guidance

### Getting Started

1. Create module directory: `src/modules/{module_name}/`
2. Implement layer structure:
   ```
   {module_name}/
   ├── api/
   │   ├── controllers/
   │   └── dtos/
   ├── service/
   │   ├── services/
   │   └── use_cases/
   ├── domain/
   │   ├── entities/
   │   └── value_objects/
   └── repository/
       └── repositories/
   ```

3. Implement facade interface first
4. Add tenant context middleware
5. Implement domain entities with tenant_id
6. Add repository with tenant filtering
7. Implement event publishing

### Key Implementation Notes

- All database queries MUST filter by tenant_id
- All facade methods MUST accept TenantContext as first parameter
- All events MUST include tenant_id in envelope
- No direct module-to-module imports (use facades only)
```

---

## COLLABORATION MENUS (A/P/C)

After presenting compiled document and QG-M1 checkpoint:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific document sections
- **P (Party Mode)**: Bring architect, security, and implementer perspectives
- **C (Continue)**: Accept document and complete workflow

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Document completeness:** Are there missing sections or decisions?
- **QG-M1 gaps:** How can conditional items be addressed?
- **Implementation concerns:** Are there unclear implementation details?
- **Architecture evolution:** How will this module change over time?
- **Integration risks:** Are there cross-module concerns not addressed?

Pass context: Compiled document, QG-M1 results, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

#### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review compiled module architecture for {module_name}
QG-M1 status: {PASS/CONDITIONAL/FAIL}
Document sections: {section_count}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Architect | Completeness | Is the architecture fully specified? |
| Security | Tenant isolation | Are all isolation requirements documented? |
| Developer | Implementability | Can this be implemented as documented? |
| QA Engineer | Testability | Are all test scenarios covered? |

Process multi-perspective review and identify any gaps.

**After processing perspectives, return to A/P/C menu.**

#### If 'C' (Continue):

1. Verify document saved:

```bash
# Confirm file exists
ls {output_folder}/planning-artifacts/{module_name}-architecture.md
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
qg_m1_status: {PASS/CONDITIONAL/FAIL}
```

3. Generate completion summary.

---

## SUCCESS METRICS

- ✅ Module architecture template loaded
- ✅ All sections populated from Steps 01-04
- ✅ QG-M1 checkpoint completed
- ✅ All critical checks pass
- ✅ Document saved to planning-artifacts
- ✅ Implementation guidance generated
- ✅ Web search performed for documentation best practices
- ✅ User confirmed document via A/P/C menu
- ✅ Workflow marked complete

---

## FAILURE MODES

- ❌ Missing template - cannot compile without structure
- ❌ Incomplete sections - previous steps not completed
- ❌ QG-M1 critical failure - must address before completing
- ❌ Save failure - document not persisted
- ❌ Missing tenant scoping - critical isolation gap
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss documentation best practices

---

## WORKFLOW COMPLETE

**Module architecture workflow completed successfully.**

### Summary

| Item | Status |
|------|--------|
| Module | {module_name} |
| Document | `{output_folder}/planning-artifacts/{module_name}-architecture.md` |
| QG-M1 | {PASS/CONDITIONAL/FAIL} |
| Entities | {count} |
| Aggregates | {count} |
| Facade Operations | {count} |
| Dependencies | {count} |
| Events | {published_count} published, {consumed_count} consumed |

### Next Steps

1. **If QG-M1 PASS:**
   - Proceed to implementation
   - Run `bmad-bam-define-facade-contract` for detailed facade specification
   - Begin module development following implementation guidance

2. **If QG-M1 CONDITIONAL:**
   - Address gaps per mitigation plan
   - Schedule re-validation before implementation

3. **Related Workflows:**
   - `bmad-bam-define-facade-contract` - Detailed facade contract design
   - `bmad-bam-module-epics` - Create implementation epics
   - `bmad-bam-convergence-verification` - Verify module integration

### Validation Workflow

To validate this module architecture later, run:
```
bmad-bam-module-architecture (Validate mode)
```

This will verify the document against QG-M1 criteria.
