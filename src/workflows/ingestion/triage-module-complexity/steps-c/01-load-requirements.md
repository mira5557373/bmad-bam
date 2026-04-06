# Step 1: Load Requirements

Load the module requirements and context for complexity assessment:

**Required inputs:**
- Module name (or "all" for batch assessment)
- `{output_folder}/planning-artifacts/features/requirement-matrix.md`
- `{output_folder}/planning-artifacts/features/module-mapping.md`
- `{project-root}/**/project-context.md`

**For each module to assess, extract:**
- Assigned requirements (from requirement matrix)
- Module boundaries and responsibilities
- Dependencies on other modules
- Cross-cutting concerns that apply

**Validation:**
- Module exists in project context or requirement matrix
- Module has at least one assigned requirement
- Dependency information available

**Output:** Module context loaded into working memory, ready for complexity assessment.

If module not found, list available modules and ask user to select.
