# Step 1: Load Foundation Artifacts

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Gather all foundation artifacts required for QG-F1 validation.

---

## Prerequisites

- Master architecture created
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries,tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

**Verify current best practices with web search:**
Search the web: "foundation artifacts best practices {date}"
Search the web: "foundation artifacts multi-tenant SaaS {date}"

Reference web research findings in your analysis.
_Source: [URL]_ for key findings.

---


## Inputs

- User requirements and constraints for foundation - validate foundation
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Load all foundation artifacts required for QG-F1 validation:

### Planning Artifacts
- `{output_folder}/planning-artifacts/master-architecture.md`
- `{output_folder}/planning-artifacts/foundation-epics.md`
- `{output_folder}/planning-artifacts/architecture/agent-runtime-architecture.md` (if exists)
- `{output_folder}/planning-artifacts/architecture/tool-registry-and-permissions.md` (if exists)
- `{output_folder}/planning-artifacts/architecture/memory-boundaries.md` (if exists)

### Code Artifacts
- `{project_root}/src/core/` - Core implementation files
- `{project_root}/src/shared_kernel/` - Shared kernel implementation
- `{project_root}/src/control_plane/` - Control plane implementation
- `{project_root}/src/ai_runtime/` - AI runtime implementation

### Test Artifacts
- `{project_root}/tests/` - Test files and fixtures
- Test coverage reports (if available)

### Infrastructure Artifacts
- `{project_root}/docker-compose.yaml`
- `{project_root}/alembic/` - Database migrations
- `{project_root}/.github/workflows/` - CI/CD configuration

If critical artifacts are missing, compile a list of gaps and report to the user.

---

## Pre-Gate Check

Verify prerequisite sub-gates have passed:

| Sub-Gate | Focus | Status |
|----------|-------|--------|
| QG-M1 | Master Architecture Readiness | Check `master-architecture.md` exists and is complete |
| QG-M2 | Tenant Isolation Complete | Check tenant model implementation |
| QG-M3 | Agent Runtime Readiness | Check AI runtime architecture |

If any sub-gate has not passed, report which sub-gate(s) need attention before QG-F1 can proceed.

---

## COLLABORATION MENUS (A/P/C):

After completing the artifact loading above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact gaps using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for artifact assessment
- **C (Continue)**: Accept artifact inventory and proceed to architecture validation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: artifact inventory, gaps identified, sub-gate status
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into artifact summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review foundation artifact inventory for QG-F1 validation: {summary of artifacts and gaps}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save artifact inventory to validation document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-check-master-architecture.md`

---

## Verification

- [ ] Planning artifacts inventory complete
- [ ] Code artifacts identified and accessible
- [ ] Test artifacts located
- [ ] Infrastructure artifacts verified
- [ ] Sub-gate status documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Artifact inventory with availability status
- Sub-gate status summary

---

## Next Step

Proceed to `step-02-c-check-master-architecture.md` to validate architecture completeness.
