# How to Create Quality Gate Checklists

This guide covers creating quality gate checklists for BAM, including file format, CRITICAL marker usage, and integration with validation workflows.

## Prerequisites

- BAM module installed
- Understanding of BAM quality gate system (QG-F1 through QG-P1)
- Access to `src/checklists/` directory
- Review existing checklists for reference patterns

## Overview

Quality gate checklists are structured markdown files that define verification criteria for each phase of the BAM architecture process. They enforce quality standards before proceeding to the next development phase.

**Checklist Categories:**

| Gate | Checklist | Purpose |
|------|-----------|---------|
| QG-F1 | `foundation-gate.md` | Validate master architecture frozen |
| QG-M1 | `module-architecture.md` | Validate module bounded context |
| QG-M2 | `tenant-isolation.md` | Validate tenant isolation design |
| QG-M3 | `qg-m3-agent-runtime.md` | Validate AI runtime readiness |
| QG-I1 | `qg-i1-convergence.md` | Validate cross-module compatibility |
| QG-I2 | `qg-i2-tenant-safety.md` | Validate no cross-tenant leakage |
| QG-I3 | `qg-i3-agent-safety.md` | Validate AI agent safety |
| QG-P1 | `production-readiness.md` | Final production validation |

## Steps

### 1. Create the Checklist File

Create a new file in `src/checklists/`:

```bash
touch src/checklists/{checklist-name}.md
```

**Naming Conventions:**

| Type | Pattern | Example |
|------|---------|---------|
| Gate checklist | `qg-{gate-id}-{domain}.md` | `qg-m3-tools.md` |
| Domain checklist | `{domain}.md` | `tenant-isolation.md` |
| Readiness checklist | `{phase}-readiness.md` | `production-readiness.md` |

### 2. Add the Header Section

Every checklist starts with a header containing metadata:

```markdown
# {Checklist Title}

> Gate ID: {QG-XX} ({Gate Name})
> Validates {what this gate validates}.
> Gate definition: {detailed criteria for passing}.
> Workflow integration: this checklist is the final step of the `{workflow}` workflow.
> Executing workflow: `{workflow}` (final step)
```

**Example:**

```markdown
# Module Architecture Verification Checklist

> Gate ID: QG-M1 (Module Architecture Complete)
> Validates module bounded context is properly designed before implementation.
> Gate definition: verifies all module boundaries, facades, and contracts are defined.
> Workflow integration: this checklist is the final step of the `bam-create-module-architecture` workflow.
> Executing workflow: `bam-create-module-architecture` (final step)
```

### 3. Define Checklist Sections

Organize checks by category. Each category becomes a second-level heading:

```markdown
## {Category Name}

- [ ] {Check item 1}
- [ ] {Check item 2}
- [ ] **CRITICAL:** {Critical check item}
- [ ] {Check item 3}
```

**Checkbox Format Rules:**

| Format | Usage |
|--------|-------|
| `- [ ]` | Standard check item |
| `- [ ] **CRITICAL:**` | Critical item (must pass for gate to pass) |
| `- [x]` | Pre-checked item (avoid - let user check during validation) |

### 4. Mark Critical Items

Critical items determine gate pass/fail status. Mark with `**CRITICAL:**` prefix:

```markdown
## Database Level

- [ ] **CRITICAL:** All tenant tables have tenant_id column
- [ ] **CRITICAL:** RLS policies created for all tenant tables
- [ ] **CRITICAL:** RLS policies enabled on all tenant tables
- [ ] Bypass policy for admin roles documented
- [ ] Cross-tenant query test fails appropriately
```

**CRITICAL Marker Guidelines:**

| Mark as CRITICAL | Do NOT mark as CRITICAL |
|------------------|-------------------------|
| Security controls | Documentation completeness |
| Data isolation | Code style compliance |
| Safety guardrails | Optional optimizations |
| Core functionality | Nice-to-have features |

### 5. Add Gate Decision Section

Include the standard gate decision matrix:

```markdown
## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block until resolved |
```

### 6. Define Critical vs Non-Critical Classification

Add a classification table for categories:

```markdown
## Critical vs Non-Critical Classification

| Category           | Classification                                        |
| ------------------ | ----------------------------------------------------- |
| Database Level     | CRITICAL                                              |
| Application Level  | CRITICAL                                              |
| Documentation      | Non-critical (can proceed with documented exceptions) |
| Performance Tests  | Non-critical                                          |
```

### 7. Add Pass Criteria and Ownership

Include accountability information:

```markdown
**PASS CRITERIA:** All CRITICAL checkboxes completed
**OWNER:** {Role responsible for running gate}
**REVIEWERS:** {Roles that must review results}
```

**Role Examples:**

| Gate Type | Owner | Reviewers |
|-----------|-------|-----------|
| Foundation | Platform Architect | Security, CTO |
| Module | Module Architect | Platform Architect, Dev Lead |
| Tenant Safety | Security Lead | Platform Architect, QA Lead |
| Agent Safety | AI/ML Lead | Security, Platform Architect |

### 8. Add Recovery Protocol Section

Link to recovery procedures:

```markdown
## Recovery Protocol

If this gate fails, refer to the relevant recovery workflow or escalation procedure.

**Recovery Workflows:**
- Gate-specific recovery: `bmad-bam-{recovery-workflow}`
- Escalation: Contact {escalation-contact}
- Emergency override: See `docs/how-to/recover-from-gate-failure.md`
```

## Complete Checklist Template

```markdown
# {Checklist Title}

> Gate ID: {QG-XX} ({Gate Name})
> Validates {validation target}.
> Gate definition: {pass criteria summary}.
> Workflow integration: this checklist is the final step of the `{workflow}` workflow.
> Executing workflow: `{workflow}` (final step)

## {Category 1}

- [ ] **CRITICAL:** {Critical check 1}
- [ ] **CRITICAL:** {Critical check 2}
- [ ] {Non-critical check 1}
- [ ] {Non-critical check 2}

## {Category 2}

- [ ] **CRITICAL:** {Critical check 1}
- [ ] {Non-critical check 1}
- [ ] {Non-critical check 2}

## {Category 3}

- [ ] {Check 1}
- [ ] {Check 2}

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block until resolved |

## Critical vs Non-Critical Classification

| Category    | Classification |
| ----------- | -------------- |
| {Category 1} | CRITICAL      |
| {Category 2} | CRITICAL      |
| {Category 3} | Non-critical  |

**PASS CRITERIA:** All CRITICAL checkboxes completed
**OWNER:** {Owner Role}
**REVIEWERS:** {Reviewer Roles}

## Recovery Protocol

If this gate fails, refer to the relevant recovery workflow or escalation procedure.
```

## Existing Checklists as References

Study these existing checklists for patterns:

| Checklist | Good Example Of |
|-----------|-----------------|
| `tenant-isolation.md` | Multi-layer verification (DB, app, cache) |
| `foundation-gate.md` | Comprehensive foundation checks |
| `qg-m3-agent-runtime.md` | AI-specific safety checks |
| `qg-i1-convergence.md` | Cross-module verification |
| `production-readiness.md` | Pre-deployment final checks |

## Best Practices

### DO

- Keep check items atomic and verifiable
- Use consistent formatting across all checklists
- Group related checks under meaningful categories
- Mark only essential items as CRITICAL
- Reference specific artifacts to verify
- Include measurable criteria (not subjective opinions)

### DO NOT

- Create vague or subjective check items
- Mark everything as CRITICAL (defeats the purpose)
- Duplicate checks across multiple categories
- Use inconsistent checkbox formats
- Skip the Gate Decision section
- Forget to assign ownership

## Validation

After creating a checklist, verify it passes tests:

```bash
npm test
```

Tests verify:
- Checkbox format is correct (`- [ ]` pattern)
- CRITICAL markers use correct format
- Gate Decision section exists
- All required sections present

## Integration with Workflows

Checklists integrate with validation workflows:

| Workflow | Checklist Used |
|----------|---------------|
| `validate-foundation` | `foundation-gate.md` |
| `validate-module` | `module-architecture.md`, `tenant-isolation.md`, `qg-m3-*.md` |
| `convergence-verification` | `qg-i1-convergence.md` |

Reference checklists in workflow step files:

```markdown
## Verification

Load and complete the checklist:
`{project-root}/_bmad/bam/checklists/{checklist}.md`

All CRITICAL items must pass before proceeding.
```

## Related

- [Run Quality Gate](run-quality-gate.md) - How to execute quality gates
- [Recover from Gate Failure](recover-from-gate-failure.md) - Recovery procedures
- [Add Workflow](add-workflow.md) - Creating workflows that use checklists
- [Test Module](test-module.md) - Testing checklist format
- [CLAUDE.md](../../CLAUDE.md) - Full reference documentation
