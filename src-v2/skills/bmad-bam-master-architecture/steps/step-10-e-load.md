# Step 10: Load Existing Master Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER modify the master architecture document during this step - load only
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: Parse ALL sections of the existing master architecture document
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ Verify document integrity and QG-F1 compliance state before presenting for editing
- 📋 Extract frontmatter state, frozen architecture decisions, and module boundaries
- 💬 Present clear summary for user to identify which master architecture sections to modify
- ⚠️ If master architecture not found, recommend Create mode
- 🔒 IDENTIFY which sections are FROZEN (tenant model, AI runtime) vs MUTABLE (patterns, appendices)
- 🎯 WARN user that editing frozen sections invalidates QG-F1 and requires full re-validation

---

## EXECUTION PROTOCOLS

- 🎯 Search systematically for the master architecture document
- 📖 Parse frontmatter workflow state if present
- 💾 Cache document structure for step-11 modifications
- 🚫 DO NOT suggest changes in this step - load and present only
- ⚠️ Flag any document corruption or missing sections

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## YOUR TASK

Locate, load, and parse the existing master architecture document. Extract current decisions and present a structured summary for the user to identify what needs modification.

---

## YOUR TASK

Locate and load the existing master architecture document. Parse frontmatter to determine QG-F1 status and frozen decision state. Extract current tenant model, AI runtime, and module boundaries. Present a structured summary showing FROZEN sections (require re-validation to change) vs MUTABLE sections (can edit directly). Display an interactive menu for the user to select which sections to modify.

---

## Load Sequence

### 1. Locate Document

Search in priority order:

| Priority | Location |
|----------|----------|
| 1 | `{output_folder}/planning-artifacts/master-architecture.md` |
| 2 | `{project-root}/docs/architecture/master-architecture.md` |
| 3 | `{project-root}/**/master-architecture.md` (fallback) |

**If not found:** Suggest Create mode (step-01-c-context.md) or request path.

### 2. Parse Frontmatter

Extract workflow state:

```yaml
decisions:
  tenant_model: "row-level-security"
  ai_runtime: "langgraph"
  module_count: 5
  quality_gate: "QG-F1-PASS"
```

### 3. Categorize Sections

| Section | Editable | Impact |
|---------|----------|--------|
| Project Context | Frozen | Requires re-validation |
| Tenant Model | Frozen | Requires QG-F1 re-run |
| AI Runtime | Frozen | Affects module contracts |
| Module Boundaries | Mutable | Direct edit allowed |
| Quality Patterns | Mutable | Direct edit allowed |
| Appendices | Mutable | Direct edit allowed |

### 4. Present Current State and Edit Menu

Display the master architecture edit summary:

```
================================================================================
MASTER ARCHITECTURE - EDIT MODE
================================================================================
Document: master-architecture.md
Version: {version}
Last Modified: {date}
QG-F1 Status: {PASS|CONDITIONAL|PENDING}
================================================================================

CURRENT FROZEN DECISIONS (Changes require QG-F1 re-validation):
- Tenant Model: {tenant_model}
- AI Runtime: {ai_runtime}
- Project Context: {project_name} / {project_type}

CURRENT MODULE BOUNDARIES:
- {module_1}: {responsibility}
- {module_2}: {responsibility}
- {module_3}: {responsibility}
...

================================================================================
EDITABLE SECTIONS:

FROZEN SECTIONS (HIGH IMPACT - triggers QG-F1 re-validation):
[1] Tenant Model - Change isolation strategy (RLS/Schema/Database)
[2] AI Runtime - Change orchestration framework
[3] Project Context - Modify project scope or constraints

MUTABLE SECTIONS (MEDIUM/LOW IMPACT - direct edit allowed):
[4] Module Boundaries - Add/remove/modify modules
[5] Cross-Cutting Patterns - Update architectural patterns
[6] Quality Attributes - Adjust latency, throughput targets
[7] Technology Stack - Update technology decisions
[8] Deployment Topology - Modify infrastructure approach
[9] Appendices - Update references, diagrams, notes

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Master architecture document located in expected path
- ✅ Frontmatter parsed with version, date, QG-F1 status extracted
- ✅ Tenant model decision identified and categorized as FROZEN
- ✅ AI runtime decision identified and categorized as FROZEN
- ✅ Module boundaries extracted with responsibilities listed
- ✅ Sections categorized correctly (frozen vs mutable)
- ✅ Current decisions and module registry presented clearly
- ✅ Edit menu displayed with numbered options
- ✅ User understands impact implications for each section type
- ✅ User has selected section(s) to edit

---

## FAILURE MODES

- ❌ **Document not found:** Report error with expected path, recommend Create mode (`step-01-c-context.md`), or request alternate path from user
- ❌ **Invalid/corrupted frontmatter:** Attempt recovery by parsing document body, flag missing metadata fields, warn user of incomplete state
- ❌ **QG-F1 already FAILED:** Warn that previous validation failed - edits should address failure reasons before adding new changes
- ❌ **Missing tenant model or AI runtime:** Flag as incomplete master architecture - recommend completing via Create mode before editing
- ❌ **Module boundaries undefined:** Warn that architecture is incomplete - cannot safely edit without understanding current module structure

---

## NEXT STEP

After user identifies modifications, proceed to `step-11-e-apply.md`.
- Frozen section changes trigger re-validation workflow
- Mutable section changes proceed directly
