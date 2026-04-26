# Step 10: Load Existing Facade Contract

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing facade contract file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse the operation and event contracts
- ✅ EXTRACT all integration details and contract versions
- 📋 PRESENT a structured summary of current contract before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY QG-I1 status from frontmatter to understand compliance state
- ⚠️ FLAG any sections marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing facade contract for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract source/target modules, operations, events, versions
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate QG-I1 status
- 🔍 Use web search: Only if user requests updated best practices

---

## YOUR TASK

Load the existing facade contract document, parse its structure, extract the current contract configuration, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

## Load Sequence

### Action 1: Locate Document

**Search for existing artifact:**

```
{output_folder}/planning-artifacts/facade-{source}-{target}-contract.md
```

If not found, check alternate locations:
- `{output_folder}/facade-contract.md`
- `{project-root}/docs/contracts/facade-{source}-{target}.md`

**If document not found:**
```
================================================================================
EDIT MODE ERROR: No existing facade contract found
================================================================================
Expected location: {output_folder}/planning-artifacts/facade-{source}-{target}-contract.md

Options:
[C] Switch to Create mode to generate new contract
[P] Specify alternate path to existing document
[L] List available facade contracts
================================================================================
```

### Action 2: Parse Frontmatter

**Extract document metadata:**

```yaml
# Expected frontmatter structure
contract_name: {source}Facade → {target}
version: {semantic_version}
date: {last_modified_date}
source_module: {source_module}
target_module: {target_module}
qg_i1_status: {PASS|CONDITIONAL|PENDING}
stepsCompleted: [1, 2, 3, 4, 5]
```

Document current state:

| Metadata | Value |
|----------|-------|
| Contract Name | |
| Document Version | |
| Last Modified | |
| Source Module | |
| Target Module | |
| QG-I1 Status | |
| Completeness | |

### Action 3: Extract Operation Contracts

**Parse current facade operations:**

| Operation | Input Type | Output Type | Tenant Required | Version |
|-----------|------------|-------------|-----------------|---------|
| {op1} | {input} | {output} | Yes | 1.0.0 |
| {op2} | {input} | {output} | Yes | 1.0.0 |

**Operation Contract Health:**

| Check | Status |
|-------|--------|
| All operations documented | {yes/no} |
| Input schemas complete | {yes/no} |
| Output schemas complete | {yes/no} |
| Error codes defined | {yes/no} |
| Tenant context required | {yes/no} |

### Action 4: Extract Event Contracts

**Parse current event contracts:**

| Event Type | Direction | Version | Subscribers |
|------------|-----------|---------|-------------|
| {event1} | Published | 1.0.0 | {modules} |
| {event2} | Consumed | 1.0.0 | Handler: {name} |

**Event Contract Health:**

| Check | Status |
|-------|--------|
| All events documented | {yes/no} |
| Payload schemas defined | {yes/no} |
| Tenant context in envelope | {yes/no} |
| DLQ strategy defined | {yes/no} |
| Versioning specified | {yes/no} |

### Action 5: Extract Consumer Dependencies

**Parse consumer integration details:**

| Consumer Module | Operations Used | Events Subscribed | Status |
|-----------------|-----------------|-------------------|--------|
| {target_module} | {ops_list} | {events_list} | Active |

**Dependency Health:**

| Check | Status |
|-------|--------|
| Consumer documented | {yes/no} |
| Operation mappings complete | {yes/no} |
| Event handlers specified | {yes/no} |

### Action 6: Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
FACADE CONTRACT - EDIT MODE
================================================================================
Contract: {source_module}Facade → {target_module}
Version: {version}
QG-I1 Status: {status}
Last Modified: {date}
================================================================================

CURRENT STRUCTURE:
1. Operations:     {operation_count} defined - {status}
2. Events:         {event_count} defined - {status}
3. Error Contracts: {error_count} codes - {status}
4. Tenant Context:  {enforced/missing} - {status}
5. Versioning:      {strategy} - {status}

CONTRACT HEALTH: {healthy|warning|critical}

EDITABLE SECTIONS:
[1] Operations - Add, modify, or deprecate facade operations
[2] Events - Add, modify, or deprecate event contracts
[3] Error Contracts - Update error codes and handling
[4] Schemas - Modify input/output data contracts
[5] Tenant Context - Update tenant isolation requirements
[6] Versioning - Update version or compatibility rules
[7] Full Contract - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Operation contracts parsed completely
- ✅ Event contracts extracted and categorized
- ✅ Consumer dependencies documented
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete operations:** Flag sections needing completion before edit
- ❌ **QG-I1 already failed:** Warn that edits require full re-validation
- ❌ **Missing tenant context:** Critical gap must be addressed

---

## Verification

- [ ] Document loaded from expected location
- [ ] Frontmatter parsed with source/target, version, QG-I1 status
- [ ] Operation contracts extracted
- [ ] Event contracts documented
- [ ] Consumer dependencies catalogued
- [ ] Edit summary presented
- [ ] User selection received

---

## NEXT STEP

Proceed to `step-11-e-apply.md` with:
- Selected edit target(s)
- Current document state
- Parsed contract structure
- QG-I1 status for re-validation tracking
