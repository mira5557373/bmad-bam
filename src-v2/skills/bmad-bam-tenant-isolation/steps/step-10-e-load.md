# Step 10: Load Existing Tenant Isolation Design

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing tenant-isolation.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse the 8-dimension isolation matrix for current state
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all sharing rules and context propagation settings
- 📋 PRESENT a structured summary of current design before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY QG-M2 status from frontmatter to understand compliance state
- ⚠️ FLAG any dimensions marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing tenant isolation design for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract tenant model, isolation dimensions, sharing rules
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate QG-M2 status
- 🔍 Use web search: Only if user requests updated best practices

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

Load the existing tenant isolation design document, parse its structure, extract the current isolation configuration, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

## Load Sequence

### Action 1: Locate Document

**Search for existing artifact:**

```
{output_folder}/planning-artifacts/tenant-isolation.md
```

If not found, check alternate locations:
- `{output_folder}/tenant-isolation.md`
- `{project-root}/docs/architecture/tenant-isolation.md`

**If document not found:**
```
================================================================================
EDIT MODE ERROR: No existing tenant isolation design found
================================================================================
Expected location: {output_folder}/planning-artifacts/tenant-isolation.md

Options:
[C] Switch to Create mode to generate new design
[P] Specify alternate path to existing document
================================================================================
```

### Action 2: Parse Frontmatter

**Extract document metadata:**

```yaml
# Expected frontmatter structure
tenant_model: {rls|schema|database|hybrid}
version: {semantic_version}
date: {last_modified_date}
stepsCompleted: [1, 2, 3, 4, 5]
qg_m2_status: {PASS|CONDITIONAL|PENDING}
```

Document current state:

| Metadata | Value |
|----------|-------|
| Tenant Model | |
| Document Version | |
| Last Modified | |
| QG-M2 Status | |
| Completeness | |

### Action 3: Extract 8-Dimension Isolation Matrix

**Parse current isolation configuration:**

| Dimension | Current Strategy | Implementation | Status |
|-----------|------------------|----------------|--------|
| **Data** | | | |
| **Cache** | | | |
| **Storage** | | | |
| **Compute** | | | |
| **Network** | | | |
| **API** | | | |
| **Events** | | | |
| **Logs** | | | |

**Flag incomplete dimensions:** Mark any with "TODO" or missing implementation details.

### Action 4: Extract Sharing Rules

**Parse cross-tenant access rules:**

| Rule Category | Current Setting | Enforcement |
|---------------|-----------------|-------------|
| Shared Resources | | |
| Isolated Resources | | |
| Admin Access | | |
| Cross-Tenant Boundary | | |

### Action 5: Extract Context Propagation

**Parse tenant context flow:**

| Entry Point | Propagation Method | Current State |
|-------------|-------------------|---------------|
| API Gateway | | |
| Event Consumer | | |
| Background Jobs | | |
| Database Layer | | |

### Action 6: Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
TENANT ISOLATION DESIGN - EDIT MODE
================================================================================
Document: tenant-isolation.md
Version: {version}
Tenant Model: {tenant_model}
QG-M2 Status: {status}
================================================================================

CURRENT 8-DIMENSION MATRIX:
1. Data:    {strategy} - {status}
2. Cache:   {strategy} - {status}
3. Storage: {strategy} - {status}
4. Compute: {strategy} - {status}
5. Network: {strategy} - {status}
6. API:     {strategy} - {status}
7. Events:  {strategy} - {status}
8. Logs:    {strategy} - {status}

SHARING RULES: {count} shared resources, {count} isolated resources

EDITABLE SECTIONS:
[1] Isolation Dimensions - Modify individual dimension strategies
[2] Sharing Rules - Update cross-tenant access boundaries
[3] Context Propagation - Change tenant context flow
[4] Tier Variations - Adjust tier-specific isolation levels
[5] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ 8-dimension isolation matrix parsed completely
- ✅ Sharing rules extracted and categorized
- ✅ Context propagation chain documented
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete matrix:** Flag dimensions needing completion before edit
- ❌ **QG-M2 already failed:** Warn that edits require full re-validation

---

## Verification

- [ ] Document loaded from expected location
- [ ] Frontmatter parsed with tenant model, version, QG-M2 status
- [ ] All 8 isolation dimensions extracted
- [ ] Sharing rules categorized
- [ ] Context propagation chain documented
- [ ] Edit summary presented
- [ ] User selection received

---

## NEXT STEP

Proceed to `step-11-e-apply.md` with:
- Selected edit target(s)
- Current document state
- Parsed isolation matrix
- QG-M2 status for re-validation tracking
