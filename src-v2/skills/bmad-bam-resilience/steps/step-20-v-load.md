# Step 20: Load Artifacts for Validation

## Purpose

Load resilience artifacts and quality gate checklists in preparation for comprehensive validation.

## Prerequisites

- Resilience artifacts exist (Create or Edit mode completed)
- Quality gate checklists available

## Execution Protocols

```
📋 Load all artifacts without modification
📋 Load QG-DR and QG-CE1 checklists
🎯 Prepare validation context
```

## Actions

### 1. Load Resilience Artifacts

Gather all artifacts for validation:

| Artifact | Location | Required |
|----------|----------|----------|
| DR Plan | `{output_folder}/resilience/disaster-recovery-plan.md` | If DR scope |
| Chaos Strategy | `{output_folder}/resilience/chaos-engineering-strategy.md` | If Chaos scope |
| Master Architecture | `{output_folder}/planning-artifacts/master-architecture.md` | Yes |
| Tenant Model | `{output_folder}/planning-artifacts/tenant-model.md` | Yes |

### 2. Load Quality Gate Checklists

Load validation criteria:

| Checklist | Location | Purpose |
|-----------|----------|---------|
| QG-DR | `{project-root}/_bmad/bam/data/checklists/qg-dr.md` | DR validation |
| QG-CE1 | `{project-root}/_bmad/bam/data/checklists/qg-ce1.md` | Chaos validation |

### 3. Identify Validation Scope

Determine which gates to validate:

| Gate | Validate | Rationale |
|------|----------|-----------|
| QG-DR | Yes/No | DR artifacts present |
| QG-CE1 | Yes/No | Chaos artifacts present |

### 4. Prepare Validation Context

Gather supporting information:

| Context | Source | Purpose |
|---------|--------|---------|
| Tenant tiers | Master architecture | RTO/RPO alignment |
| SLA commitments | Business requirements | Target validation |
| Isolation model | Tenant model | Safety verification |

## Verification

- [ ] All required artifacts loaded
- [ ] Quality gate checklists loaded
- [ ] Validation scope determined
- [ ] Context gathered

## Outputs

- Loaded artifacts ready for validation
- Validation scope document
- Quality gate checklists

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
