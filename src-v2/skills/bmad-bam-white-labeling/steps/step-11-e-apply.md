# Step 11: Apply Changes to White-Labeling Design (Edit Mode)

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

---

## Purpose

Apply targeted modifications to the white-labeling design, documenting changes with ADR rationale and maintaining version history.

---

## Prerequisites

- Step 10 completed: Existing document loaded, modifications identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `customization`

---

## Actions

### 1. Review Proposed Changes

Present each proposed change for approval:

| Section | Current State | Proposed Change | Impact |
|---------|---------------|-----------------|--------|
| {section} | {current} | {proposed} | {impact} |

### 2. Create ADR for Significant Changes

For each significant change, document architectural decision:

| Field | Value |
|-------|-------|
| ADR ID | ADR-WL-{number} |
| Title | {Change description} |
| Status | PROPOSED |
| Context | {Why change is needed} |
| Decision | {What we are changing} |
| Consequences | {Impact of change} |
| Supersedes | {Previous ADR if applicable} |

### 3. Apply Modifications by Section

#### Branding Changes (if applicable):

| Component | Previous | Updated |
|-----------|----------|---------|
| Logo handling | {prev} | {new} |
| Color scheme | {prev} | {new} |
| CSS injection | {prev} | {new} |
| Email templates | {prev} | {new} |

#### Domain Changes (if applicable):

| Component | Previous | Updated |
|-----------|----------|---------|
| Domain mapping | {prev} | {new} |
| SSL strategy | {prev} | {new} |
| DNS guidance | {prev} | {new} |

#### Feature Changes (if applicable):

| Component | Previous | Updated |
|-----------|----------|---------|
| Feature flags | {prev} | {new} |
| UI visibility | {prev} | {new} |
| Menu customization | {prev} | {new} |
| Role naming | {prev} | {new} |

#### Tier Matrix Changes (if applicable):

| Feature | Tier | Previous | Updated |
|---------|------|----------|---------|
| {feature} | {tier} | {prev} | {new} |

### 4. Update Version History

Add entry to document change log:

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {new_version} | {date} | {author} | {change summary} |

### 5. Verify Cross-References

Check for broken references after changes:

| Reference | Valid | Action if Invalid |
|-----------|-------|-------------------|
| Template references | {Yes/No} | {action} |
| Pattern references | {Yes/No} | {action} |
| ADR references | {Yes/No} | {action} |

### 6. Save Updated Document

Save to: `{output_folder}/planning-artifacts/white-labeling-design.md`

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact analysis
- **P (Party Mode)**: Bring review perspectives on applied changes
- **C (Continue)**: Accept changes and complete edit mode
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: applied changes, ADR records, impact assessment
- Process enhanced insights on change implications
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes to white-labeling design"
- Present synthesized recommendations from platform, UX, DevOps perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Save all changes to document
- Update frontmatter: `stepsCompleted: [10, 11]`
- Edit mode complete

---

## Verification

- [ ] All proposed changes reviewed with user
- [ ] ADRs created for significant changes
- [ ] Modifications applied correctly
- [ ] Version history updated
- [ ] Cross-references validated
- [ ] Document saved successfully

---

## Outputs

- Updated white-labeling design document
- New/updated ADR records
- Change log entry
- Cross-reference validation report

---

## Next Step

Edit complete. Run validation mode (`step-20-v-*`) to verify changes meet quality criteria.
