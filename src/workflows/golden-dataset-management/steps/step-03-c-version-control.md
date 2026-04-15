# Step 3: Version Control

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define dataset versioning strategy, change tracking, and rollback capabilities.

## Prerequisites

- Curation workflow designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: model-versioning, llmops
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-archival

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define dataset version control:

## Versioning Strategy

**Semantic Versioning for Datasets:**
```
MAJOR.MINOR.PATCH-TAG

MAJOR: Breaking schema changes, incompatible with previous
MINOR: New tasks, expanded coverage, backward compatible
PATCH: Bug fixes, corrections, no new tasks
TAG: alpha, beta, rc (release candidate)
```

**Version Examples:**
| Version | Meaning |
|---------|---------|
| 1.0.0 | Initial production release |
| 1.1.0 | Added new edge cases |
| 1.1.1 | Fixed annotation errors |
| 2.0.0-alpha | Schema breaking change (testing) |

**Version Matrix:**
| Dataset Type | Version Frequency | Retention |
|--------------|-------------------|-----------|
| Core | Quarterly | All versions |
| Regression | Per release | Last 10 |
| Adversarial | Monthly | Last 6 |
| Tenant-specific | On demand | Per tenant policy |

## Change Tracking

**Change Record Schema:**
| Field | Type | Description |
|-------|------|-------------|
| change_id | string | Unique change identifier |
| version_from | string | Previous version |
| version_to | string | New version |
| change_type | enum | add/modify/delete/schema |
| affected_tasks | array | Task IDs affected |
| change_reason | string | Justification |
| changed_by | string | Author |
| changed_at | datetime | Timestamp |
| approved_by | string | Approver |

**Change Log Format:**
```markdown
## [1.1.0] - 2026-04-15

### Added
- 25 new edge case tasks for context length handling
- 10 adversarial prompt injection tests

### Changed
- Updated expected outputs for pricing agent tasks
- Revised acceptance criteria for multi-turn conversations

### Fixed
- Corrected annotation errors in 5 billing tasks

### Deprecated
- Legacy format tasks (will remove in 2.0.0)
```

**Audit Trail:**
- All changes logged immutably
- Author and approver recorded
- Reason for change documented
- Diff available for any change

## Rollback Capabilities

**Rollback Scenarios:**
| Scenario | Rollback Type | Recovery Time |
|----------|---------------|---------------|
| Bad annotation batch | Partial | < 15 min |
| Schema regression | Full version | < 1 hour |
| Tenant data issue | Tenant-scoped | < 30 min |
| Production incident | Emergency | < 5 min |

**Rollback Workflow:**
```
Detect Issue → Assess Impact → Select Rollback Point → Execute
      │              │                  │               │
      v              v                  v               v
   Alert sent   Scope defined    Version chosen   Validation
```

**Rollback Validation:**
- Pre-rollback snapshot created
- Integrity check on target version
- Test suite run on restored data
- Notification to stakeholders

## Lineage Documentation

**Dataset Lineage Graph:**
```
v1.0.0 ──► v1.0.1 ──► v1.1.0 ──► v1.1.1
                         │
                         └──► v1.1.0-tenant-x
                         
v1.0.0 ──┬──► v2.0.0-alpha ──► v2.0.0-beta ──► v2.0.0
         │
         └── Schema change branch
```

**Lineage Metadata:**
| Field | Description |
|-------|-------------|
| parent_version | Direct ancestor |
| derived_from | Source datasets |
| model_trained | Models using this version |
| evaluation_runs | Eval runs using this version |

Output: Version control specification with change tracking.

**Verify current best practices with web search:**
Search the web: "dataset versioning best practices ML {date}"
Search the web: "data version control DVC patterns {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the version control design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into versioning requirements and rollback procedures
- **P (Party Mode)**: Bring MLOps Engineer, Data Engineer, and Release Manager perspectives
- **C (Continue)**: Accept version control and proceed to Step 4: Test Case Management
- **Refine versioning**: Describe specific version control concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: versioning strategy, change tracking, rollback capabilities
- Process enhanced insights
- Ask user: "Accept these refined versioning requirements? (y/n)"
- If yes, integrate into version control document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review golden dataset version control for AI evaluation"
- Process MLOps Engineer, Data Engineer, Release Manager perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save version control to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-test-case-management.md`

---

## Verification

- [ ] Versioning strategy defined
- [ ] Change tracking documented
- [ ] Rollback capabilities specified
- [ ] Lineage documentation established
- [ ] Retention policies configured
- [ ] Patterns align with pattern registry

## Outputs

- Version control specification
- Change tracking procedures
- **Load template:** `{project-root}/_bmad/bam/data/templates/dataset-version-template.md`

## Next Step

Proceed to `step-04-c-test-case-management.md` to design test case organization.
