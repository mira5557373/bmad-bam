# Step 5: Generate Requirement Matrix

Produce the final requirement traceability matrix:

**Matrix structure:**
| Requirement ID | Description | Domain | Module | Cross-Cutting | Dependencies | Priority |
|----------------|-------------|--------|--------|---------------|--------------|----------|

**Matrix contents:**
- All requirements with unique IDs
- Domain classification
- Module assignment
- Cross-cutting flag (Y/N)
- Inter-requirement dependencies
- Initial priority (derived from dependency depth and business value)

**Validation checks:**
- [ ] Every requirement has exactly one module assignment
- [ ] No orphan requirements (unassigned)
- [ ] Dependencies form acyclic graph
- [ ] Cross-cutting concerns properly isolated
- [ ] Priority order respects dependency constraints

**Output artifacts:**
- `{output_folder}/planning-artifacts/features/requirement-matrix.md` - Full traceability matrix
- `{output_folder}/planning-artifacts/features/index.md` - Navigable index by module
- `{output_folder}/planning-artifacts/features/dependency-graph.md` - Visual dependency representation
- Updated `sprint-status.yaml` with discovered modules registered

**Quality gate:** All requirements assigned, no circular dependencies, matrix complete.
