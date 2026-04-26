# Step 11: Apply Changes to Compliance Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📖 Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array

---

## Purpose

Apply targeted modifications to the compliance design, documenting changes with ADR rationale and maintaining version history.

---

## Prerequisites

- Step 10 completed: Existing documents loaded, modifications identified
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Actions

### 1. Review Proposed Changes

Present each proposed change with impact:

| Section | Current State | Proposed Change | Impact | Risk |
|---------|---------------|-----------------|--------|------|
| {section} | {current} | {proposed} | {impact} | Low/Medium/High |

### 2. Create ADR for Changes

Document architectural decision for each significant change:

| Field | Value |
|-------|-------|
| ADR ID | ADR-COMP-{number} |
| Title | {Change description} |
| Status | PROPOSED -> ACCEPTED |
| Context | {Why change is needed - regulatory update, audit finding, etc.} |
| Decision | {What we're changing} |
| Consequences | {Impact of change on compliance posture} |
| Compliance Impact | {Frameworks affected} |

### 3. Apply Modifications by Category

#### Framework Updates

| Framework | Previous | Updated | Changes Applied |
|-----------|----------|---------|-----------------|
| {framework} | {old version/state} | {new version/state} | {specific changes} |

#### Data Governance Updates

| Data Type | Previous Classification | Updated Classification | Handling Changes |
|-----------|-------------------------|------------------------|------------------|
| {type} | {old} | {new} | {changes} |

#### Audit Control Updates

| Control Category | Previous State | Updated State | Justification |
|------------------|----------------|---------------|---------------|
| {category} | {old} | {new} | {reason} |

#### Monitoring Updates

| Check Type | Previous | Updated | Frequency Change |
|------------|----------|---------|------------------|
| {check} | {old} | {new} | {change} |

### 4. Update Control Mappings

Revise framework-to-control mappings:

| Control | SOC2 | GDPR | HIPAA | PCI-DSS | Change Type |
|---------|------|------|-------|---------|-------------|
| {control} | {mapping} | {mapping} | {mapping} | {mapping} | ADD/MODIFY/REMOVE |

### 5. Update Implementation Roadmap

Adjust roadmap for changes:

| Phase | Original Timeline | Updated Timeline | Justification |
|-------|-------------------|------------------|---------------|
| {phase} | {original} | {updated} | {reason} |

### 6. Version History Update

Add change log entry:

```markdown
## Change Log

### Version {X.Y.Z} - {{date}}
- **ADR-COMP-{N}**: {Change summary}
- Updated {framework} requirements per {regulation update}
- Modified {section} to address {audit finding/requirement}
- Author: {author}
- Approved by: {approver}
```

### 7. Verify Changes

Run verification checks:

- [ ] Changes applied correctly to all affected sections
- [ ] No broken cross-references
- [ ] ADR documented and linked
- [ ] Version incremented appropriately
- [ ] Control mappings updated
- [ ] Roadmap adjusted if needed

---

## Verification

- [ ] All proposed changes applied correctly
- [ ] ADR created for each significant change
- [ ] Version history updated with change log
- [ ] Control mappings revised
- [ ] Implementation roadmap adjusted
- [ ] Document consistency verified
- [ ] No orphaned references

---

## Outputs

- Updated compliance design document
- ADRs for changes made
- Change log entry
- Updated control mappings

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes meet quality criteria and compliance requirements.

---

## Edit Mode Complete

Compliance design modifications have been applied. All changes are documented with ADR rationale and version history. Run validation to ensure the updated design meets all quality gate requirements.
