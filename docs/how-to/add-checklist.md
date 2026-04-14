---
title: How to Add a Quality Gate Checklist
description: Step-by-step guide to creating a new BAM quality gate checklist
category: how-to
---

# How to Add a Quality Gate Checklist

This guide walks you through creating a new quality gate checklist for BAM.

## Overview

Quality gate checklists define the criteria that must be met before proceeding to the next phase. They are referenced by validation workflows and ensure consistent quality across projects.

## Prerequisites

- Understanding of the quality gate's purpose
- Knowledge of what artifacts/criteria to validate
- Familiarity with the gate sequence (QG-F1 → QG-M* → QG-I* → QG-P1)

## Step 1: Determine Gate ID

Follow the naming convention:

| Prefix | Phase | Examples |
|--------|-------|----------|
| QG-F | Foundation | QG-F1 |
| QG-M | Module | QG-M1, QG-M2, QG-M3 |
| QG-S | Sprint | QG-S1, QG-S2 |
| QG-I | Integration | QG-I1, QG-I2, QG-I3 |
| QG-P | Production | QG-P1 |
| QG-R | Recovery | QG-R1, QG-M1-R |

## Step 2: Create the Checklist File

```bash
touch src/checklists/{gate-id}-{name}.md
```

Example: `src/checklists/qg-m4-api-safety.md`

## Step 3: Add Required Structure

```markdown
# QG-{ID}: {Gate Name} Checklist

> Gate ID: QG-{ID} ({Full Gate Name})
> {Gate description and when it applies}
> Gate failure recovery: {recovery action}
> Executing workflow: `bmad-bam-{workflow}` (final step)

## {Category 1}

- [ ] {Check item 1}
- [ ] {Check item 2}
- [ ] **CRITICAL:** {Critical check item}

## {Category 2}

- [ ] {Check item 3}
- [ ] {Check item 4}
- [ ] **CRITICAL:** {Critical check item}

## Gate Decision

| Outcome | Definition | Action |
|---------|------------|--------|
| ✅ PASS | All checks pass | Proceed to next phase |
| ⚠️ CONDITIONAL | Non-critical gaps | Proceed with mitigation plan |
| ❌ FAIL | Any critical fails | Enter recovery protocol |

## Recovery Protocol

1. Classify root cause: SCOPE / SKILL / TECH / DESIGN / QUALITY
2. Lock passed categories
3. Generate salvage report
4. Time-box recovery sprint
5. Re-gate only failed categories
```

## Step 4: Add to quality-gates.csv

Add a row to `src/data/quality-gates.csv`:

```csv
QG-{ID},{Gate Name},{phase},"{required_patterns}","{verification_tests}",{blocking},{checklist_file},"{pass_criteria}","{fail_recovery}",{dependencies},{soft_gate_steps},{entry_workflows},{exit_workflows},"{web_queries}"
```

## Step 5: Reference in Workflows

Update relevant SKILL.md files with Quality Gates section:

```markdown
## Quality Gates

- **Entry Gate:** {prerequisite gates}
- **Exit Gate:** QG-{ID} ({Gate Name})
```

## Step 6: Update Tests

Run tests to verify checklist format:

```bash
npm test -- test/checklist-format.test.js
```

## Checklist Format Rules

1. **Use standard checkbox format:** `- [ ] Item`
2. **Mark critical items:** `- [ ] **CRITICAL:** Item`
3. **Group by category** with `## Category` headers
4. **Include Gate Decision table**
5. **Include Recovery Protocol** section

## Examples

See existing checklists:
- `src/checklists/foundation-gate.md` - QG-F1
- `src/checklists/qg-m3-agent-runtime.md` - QG-M3
- `src/checklists/qg-i1-convergence.md` - QG-I1

## Validation

After creating, verify:

```bash
npm test
```

The `checklist-format.test.js` validates:
- Standard checkbox format
- At least one checkbox item
- Proper header structure
