# Step 11: Apply Consent Management Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Apply the confirmed modifications to the consent management specification.

## Prerequisites

- Consent specification loaded (Step 10 complete)
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---

## Actions

### 1. Apply Section-Specific Changes

| Section | Change Type | Validation Required |
|---------|-------------|---------------------|
| Processing Purposes | Add/Remove/Update | GDPR Article 6 check |
| Consent Collection | UI update | Compliance verification |
| Consent Storage | Schema update | Data integrity |

### 2. Update Cross-References

| Reference Type | Check | Action |
|----------------|-------|--------|
| Purpose to lawful basis | Article 6 compliance | Verify mapping |
| Collection to purpose | Granularity | Update forms |
| Storage to collection | Data capture | Verify completeness |

### 3. Document Change History

| Change ID | Section | Description | Date | Author |
|-----------|---------|-------------|------|--------|
| CHG-001 | {Section} | {Description} | {Date} | {Author} |

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Save changes and export updated specification
- **C2**: Switch to Validate Mode - load `step-20-v-load-consent.md`
- **C3**: Return to workflow overview

---

## Verification

- [ ] All requested changes applied
- [ ] Cross-references updated and valid
- [ ] Change history documented
- [ ] GDPR alignment verified

## Outputs

- Updated consent management specification
- Change history log
- Updated document to `{output_folder}/planning-artifacts/gdpr-consent-management-spec.md`

## Next Step

Edit mode complete. Options:
- Switch to Validate mode (`step-20-v-load-consent.md`) to verify changes
- Return to Edit mode for additional changes
- Exit workflow
