# Step 11: Apply Targeted Changes (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✏️ **Apply modifications with ADR documentation**

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted modifications with ADR rationale
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Modification targets from Step 10
- 🚫 Do NOT: Make changes beyond identified scope
- 🔍 Use web search: Verify current patterns if changing technology decisions
- ⚠️ Gate: Tenant lifecycle patterns

---

## Purpose

Apply targeted modifications to the tenant onboarding design, documenting all changes with ADR rationale.

---

## Prerequisites

- Step 10 completed: Existing document loaded, modifications identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle

---

## Inputs

- Output from Step 10: Document state and modification targets
- Pattern registry for validating changes

---

## Actions

### 1. Review Proposed Changes

For each modification target, present impact analysis:

| Section | Current State | Proposed Change | Impact |
|---------|---------------|-----------------|--------|
| {section} | {current} | {proposed} | {impact} |

#### Impact Categories

| Impact Level | Description | Requires |
|--------------|-------------|----------|
| Low | Documentation only | Review |
| Medium | Configuration change | Test verification |
| High | Architecture change | QA review + ADR |
| Critical | Breaking change | Stakeholder approval |

### 2. Create ADR for Changes

Document architectural decision for significant changes:

| Field | Value |
|-------|-------|
| ADR ID | ADR-ONBOARD-{number} |
| Title | {Change description} |
| Status | PROPOSED |
| Context | {Why change is needed} |
| Decision | {What we're changing} |
| Consequences | {Impact of change} |
| Alternatives | {Other options considered} |

#### ADR Template

```markdown
## ADR-ONBOARD-{number}: {Title}

**Status**: PROPOSED → ACCEPTED/REJECTED

### Context
{Why this change is necessary}

### Decision
{What change we are making}

### Consequences

**Positive:**
- {Benefit 1}
- {Benefit 2}

**Negative:**
- {Tradeoff 1}
- {Risk 1}

### Alternatives Considered
- {Alternative 1}: {Why rejected}
- {Alternative 2}: {Why rejected}
```

### 3. Apply Modifications

For each approved change:

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Backup current section | Confirm backup |
| 2 | Apply modification | Diff review |
| 3 | Update cross-references | Reference check |
| 4 | Increment version | Version bumped |
| 5 | Add change log entry | Entry visible |

#### Section-Specific Modification Guidance

| Section | Modification Considerations |
|---------|----------------------------|
| Tenant Model | Impacts all resource provisioning - cascade changes |
| Registration Flow | May require UX review - user-facing change |
| Provisioning Saga | Update rollback procedures for new steps |
| Resource Init | Verify quota changes across tiers |
| Validation | Add new health checks for new resources |
| Rollback | Ensure compensating actions for new steps |
| Monitoring | Add alerts for new failure modes |

### 4. Update Document Metadata

Update document header with change tracking:

| Field | Update |
|-------|--------|
| Version | Increment (e.g., 1.0 → 1.1) |
| Last Modified | Current date |
| Last Author | Current user |
| Change Summary | Brief description |

### 5. Validate Consistency

Verify document consistency after changes:

| Check | Status |
|-------|--------|
| Cross-references valid | [ ] |
| Saga steps consecutive | [ ] |
| Rollback matches provisioning | [ ] |
| Tier configuration consistent | [ ] |
| Metrics align with new components | [ ] |
| No orphaned sections | [ ] |

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact analysis
- **P (Party Mode)**: Bring review perspectives on applied changes
- **C (Continue)**: Accept changes and complete Edit workflow
- **[Additional changes]**: Describe more modifications needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: applied changes, ADR, consistency checks
- Process enhanced insights on change completeness
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes to tenant onboarding design"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated document to original location
- Archive previous version if significant change
- Update frontmatter `stepsCompleted: [10, 11]`
- Mark Edit mode complete

---

## Verification

- [ ] All proposed changes applied correctly
- [ ] ADR created for significant changes
- [ ] Version history updated
- [ ] Cross-references remain valid
- [ ] Document consistency verified
- [ ] Change log entry added
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated tenant onboarding design document
- ADR for architectural changes
- Change log entry
- Previous version archived (if applicable)

---

## Workflow Complete

Edit mode is complete.

**Recommended next steps:**
- Run **Validate mode** (`step-20-v-*`) to verify changes meet quality criteria
- Review ADR with stakeholders if significant architectural change
- Update implementation if design already in production

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes meet quality criteria.
