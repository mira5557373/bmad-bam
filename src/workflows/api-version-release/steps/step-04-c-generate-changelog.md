# Step 4: Generate Changelog

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Create comprehensive release documentation.

## Prerequisites

- Migration planned (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "API changelog integration patterns {date}"
Search the web: "release notes contract design {date}"

_Source: [URL]_

## Changelog Structure

**Header:**
- Version number (semantic versioning)
- Release date
- Release type (major/minor/patch)
- Summary statement

**Breaking Changes:**
- Clear description of each breaking change
- Migration path reference
- Affected endpoints/schemas

**New Features:**
- Description of new capabilities
- Usage examples
- Relevant documentation links

**Improvements:**
- Performance enhancements
- Security updates
- Developer experience improvements

**Bug Fixes:**
- Issue references
- Affected functionality
- Resolution summary

**Deprecations:**
- Items being deprecated
- Deprecation timeline
- Recommended alternatives

## Documentation Updates

- Update OpenAPI/Swagger specification
- Update SDK documentation
- Update example code repositories
- Update Postman/Insomnia collections

## Release Notes Format

```markdown
# API Version X.Y.Z

**Release Date:** YYYY-MM-DD

## Highlights
- Key change 1
- Key change 2

## Breaking Changes
- Change description [Migration Guide](#link)

## New Features
- Feature description

## Improvements
- Improvement description

## Bug Fixes
- Fix description (Issue #NNN)

## Deprecations
- Deprecated item (Sunset: YYYY-MM-DD)
```

---

## Soft Gate Checkpoint

**Steps 1-4 complete the release preparation phase.**

Present summary of:
- Change inventory and compatibility assessment
- Migration plan with timeline and guides
- Changelog and documentation updates

Ask for confirmation before proceeding to release execution.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After generating the changelog above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into changelog structure and documentation
- **P (Party Mode)**: Bring tech writer and architect perspectives for review
- **C (Continue)**: Accept changelog and proceed to release execution
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass changelog context: version, breaking changes, features, deprecations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into changelog
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review changelog for API version release: {summary of changes and documentation}"
- Process collaborative analysis from tech writer and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save changelog to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-execute-release.md`

---

## Verification

- [ ] Changelog header complete
- [ ] Breaking changes documented
- [ ] New features described
- [ ] Improvements listed
- [ ] Bug fixes referenced
- [ ] Deprecations noted with timelines
- [ ] Documentation updated
- [ ] Patterns align with pattern registry

## Outputs

- Changelog document
- Updated API documentation
- **Load template:** `{project-root}/_bmad/bam/templates/api-release-notes-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/api-version-release-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/api-changelog-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/api-versioning-template.md`

## Next Step

Proceed to `step-05-c-execute-release.md` to deploy the new version.
