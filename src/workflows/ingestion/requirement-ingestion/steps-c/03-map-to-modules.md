# Step 3: Map to Modules

Assign each categorized requirement to a specific module:

- Match requirements to existing modules defined in project context
- Create new module definitions for uncovered domains
- Apply single-responsibility principle (each requirement maps to exactly one module)
- Document the mapping rationale

**Mapping rules:**
1. **Primary owner:** Module that owns the core entity affected
2. **Dependency direction:** Requirements flow from dependent to dependency
3. **Facade boundary:** External modules access via facade contracts only
4. **No dual ownership:** If a requirement touches two modules, split it or assign to coordinator

**Module assignment attributes:**
- Module name and ID
- Requirement IDs assigned
- Justification for assignment
- Alternative modules considered (if ambiguous)

**Output:** Requirement-to-module mapping stored in `{output_folder}/planning-artifacts/features/module-mapping.md`.
