# Step 10: Load Existing Module Architecture Design

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing module-architecture.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse the module boundary and public API contracts
- ✅ EXTRACT all dependencies and internal component structure
- 📋 PRESENT a structured summary of current design before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY QG-M1 status from frontmatter to understand compliance state
- ⚠️ FLAG any sections marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing module architecture for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract module name, boundaries, dependencies, API contracts
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate QG-M1 status
- 🔍 Use web search: Only if user requests updated best practices

---

## YOUR TASK

Load the existing module architecture document, parse its structure, extract the current module configuration, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

## Load Sequence

### Action 1: Locate Document

**Search for existing artifact:**

```
{output_folder}/planning-artifacts/module-{module_name}-architecture.md
```

If not found, check alternate locations:
- `{output_folder}/module-architecture.md`
- `{project-root}/docs/architecture/modules/{module_name}.md`

**If document not found:**
```
================================================================================
EDIT MODE ERROR: No existing module architecture found
================================================================================
Expected location: {output_folder}/planning-artifacts/module-{module_name}-architecture.md

Options:
[C] Switch to Create mode to generate new design
[P] Specify alternate path to existing document
[L] List available module architecture documents
================================================================================
```

### Action 2: Parse Frontmatter

**Extract document metadata:**

```yaml
# Expected frontmatter structure
module_name: {module_name}
version: {semantic_version}
date: {last_modified_date}
stepsCompleted: [1, 2, 3, 4, 5]
qg_m1_status: {PASS|CONDITIONAL|PENDING}
tenant_context: {required|optional|none}
```

Document current state:

| Metadata | Value |
|----------|-------|
| Module Name | |
| Document Version | |
| Last Modified | |
| QG-M1 Status | |
| Tenant Context | |
| Completeness | |

### Action 3: Extract Module Boundary Definition

**Parse current module boundary:**

| Component | Description | Status |
|-----------|-------------|--------|
| **Responsibility** | Single clear purpose | |
| **Public API** | Facade contract endpoints | |
| **Dependencies** | External module references | |
| **Internal Layers** | Domain/Application/Infrastructure | |

**Flag incomplete sections:** Mark any with "TODO" or missing details.

### Action 4: Extract Public API Contracts

**Parse facade contract definitions:**

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| | | | |
| | | | |

**Extract contract metadata:**
- Input schemas documented
- Output schemas documented
- Error codes defined
- Tenant context requirements

### Action 5: Extract Dependencies

**Parse module dependencies:**

| Dependency | Type | Coupling | Risk Level |
|------------|------|----------|------------|
| | Internal/External | Loose/Tight | Low/Medium/High |

**Verify dependency rules:**
- [ ] All dependencies through facades only
- [ ] No circular dependencies
- [ ] Minimal external dependencies

### Action 6: Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
MODULE ARCHITECTURE - EDIT MODE
================================================================================
Module: {module_name}
Version: {version}
QG-M1 Status: {status}
Tenant Context: {tenant_context}
================================================================================

CURRENT STRUCTURE:
1. Responsibility: {summary} - {status}
2. Public API:     {endpoint_count} endpoints - {status}
3. Dependencies:   {dependency_count} modules - {status}
4. Internal Layers: {layer_status}

DEPENDENCY HEALTH: {healthy|warning|critical}

EDITABLE SECTIONS:
[1] Module Boundary - Modify responsibility or scope
[2] Public API - Update facade contract endpoints
[3] Dependencies - Change module dependencies
[4] Internal Structure - Modify component layers
[5] Tenant Context - Update tenant integration
[6] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Module boundary definition parsed completely
- ✅ Public API contracts extracted and categorized
- ✅ Dependencies documented with coupling analysis
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete boundary:** Flag sections needing completion before edit
- ❌ **QG-M1 already failed:** Warn that edits require full re-validation

---

## Verification

- [ ] Document loaded from expected location
- [ ] Frontmatter parsed with module name, version, QG-M1 status
- [ ] Module boundary definition extracted
- [ ] Public API contracts documented
- [ ] Dependencies catalogued
- [ ] Edit summary presented
- [ ] User selection received

---

## NEXT STEP

Proceed to `step-11-e-apply.md` with:
- Selected edit target(s)
- Current document state
- Parsed module structure
- QG-M1 status for re-validation tracking
