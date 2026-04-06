# Step 2: Apply Targeted Modifications

Based on the user's requested changes:

1. Identify the affected sections in the master architecture document
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Document structure and table of contents
   - Unaffected sections (no unnecessary changes)
   - Cross-references between sections
4. If the master architecture is frozen (post foundation-gate), require:
   - Formal ADR justification for the change
   - Impact analysis on dependent modules
   - Reference to `bmad-bam-master-architecture-emergency-change` workflow for significant changes
5. Validate the modified document against completeness criteria
6. Write the updated document back to `{output_folder}/planning-artifacts/master-architecture.md`

Present a diff summary of changes made and ask for confirmation.
