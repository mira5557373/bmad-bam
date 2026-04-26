# Step 11: Apply Changes (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Apply targeted modifications to the data residency design, documenting changes with ADR rationale and ensuring compliance consistency.

---

## Prerequisites

- Step 10 completed: Existing document loaded
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-residency
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Actions

### 1. Review Proposed Changes

Present each proposed change with impact analysis:

| Section | Current State | Proposed Change | Impact | Risk |
|---------|---------------|-----------------|--------|------|
| {section} | {current} | {proposed} | {impact} | {risk level} |

### 2. Assess Compliance Impact

For each change, verify compliance implications:

| Change | GDPR Impact | CCPA Impact | LGPD Impact | Other |
|--------|-------------|-------------|-------------|-------|
| {change} | {impact} | {impact} | {impact} | {impact} |

### 3. Create ADR for Changes

Document architectural decision for significant changes:

| Field | Value |
|-------|-------|
| ADR ID | ADR-DR-{number} |
| Title | {Change description} |
| Status | PROPOSED |
| Context | {Why change is needed} |
| Decision | {What we're changing} |
| Consequences | {Impact of change} |
| Compliance Review | {Compliance sign-off status} |

### 4. Apply Modifications

For each approved change:

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Update the relevant section | Content matches intent |
| 2 | Update cross-references | All refs valid |
| 3 | Update compliance matrix | No violations |
| 4 | Update region mappings | Consistency check |
| 5 | Update DR configuration | DR still viable |
| 6 | Increment version | Version bumped |

### 5. Verify Change Consistency

Run consistency checks:

| Check | Status | Notes |
|-------|--------|-------|
| Region references consistent | {PASS/FAIL} | {notes} |
| Compliance zones aligned | {PASS/FAIL} | {notes} |
| DR strategy compatible | {PASS/FAIL} | {notes} |
| API routing updated | {PASS/FAIL} | {notes} |
| Edge config aligned | {PASS/FAIL} | {notes} |

### 6. Update Document Metadata

Update frontmatter:

```yaml
---
version: {incremented version}
lastModified: {date}
changeLog:
  - date: {date}
    change: {description}
    adr: ADR-DR-{number}
---
```

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact or compliance review
- **P (Party Mode)**: Bring review perspectives from compliance and architecture
- **C (Continue)**: Accept changes and complete edit
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: applied changes, ADR, compliance impact assessment
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes to data residency design"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated document to: `{output_folder}/planning-artifacts/data-residency-design.md`
- Mark Edit mode complete

---

## Verification

- [ ] All changes applied correctly
- [ ] Compliance impact assessed
- [ ] ADR created and linked
- [ ] Cross-references updated
- [ ] Version history updated
- [ ] Document consistency verified

---

## Outputs

- Updated data residency design document
- ADR for changes
- Change log entry
- Compliance impact assessment

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes meet quality criteria.

---

## Workflow Complete

Edit mode is complete. Changes have been applied with:
- ADR documentation
- Compliance impact assessment
- Version history update

Run Validate mode to verify changes meet quality criteria.
