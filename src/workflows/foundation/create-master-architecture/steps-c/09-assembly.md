# Step 9: Assembly

1. Combine all sections into `master-architecture.md`
2. Add table of contents with section anchors for smart loading
3. Validate completeness:
   - [ ] All 7 required sections present (tenant model, AI runtime, module boundaries, shared kernel, tech stack, contracts, code patterns)
   - [ ] All TSA technologies have version pins
   - [ ] All isolation strategies defined
   - [ ] Shared kernel interfaces complete
   - [ ] At least 4 code pattern examples

Write to `{output_folder}/planning-artifacts/master-architecture.md`

## Master Architecture Rules

1. Created during foundation phase by Platform Architect
2. Frozen after foundation validation gate passes
3. Changes require formal ADR and impact analysis (see `bmad-bam-master-architecture-emergency-change`)
4. All modules inherit from master architecture
5. Contains NO module-specific decisions
