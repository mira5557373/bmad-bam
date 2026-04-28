# Step 11: Apply Tool Contract Modifications (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER remove TenantContext as first parameter** from any tool schema
- 📖 **CRITICAL: Verify schema backward compatibility** for non-breaking changes
- 🔄 **CRITICAL: Increment version appropriately** (MAJOR for breaking, MINOR for features)
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **PRESERVE sandbox isolation rules** unless explicitly being modified
- 🔄 **UPDATE permission matrix** when adding or removing tools

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply requested modifications to tool contract design
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Modify only sections identified in Step 10
- 🚫 Do NOT: Change sections outside modification scope
- 🔍 Use web search: Verify new patterns before applying changes

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## Purpose

Apply the modifications identified in Step 10 to the tool contract design document. This step ensures changes are applied consistently while preserving unaffected sections.

---

## Prerequisites

- Step 10 completed: Artifact loaded and scope confirmed
- Modification scope documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-contract

---

## Inputs

- Loaded tool contract design from Step 10
- Confirmed modification scope
- Specific changes requested by user
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Apply the user's requested modifications to the tool contract design: add new tools with TenantContext as first parameter, update existing schemas with proper versioning (MAJOR for breaking changes), modify permission matrices ensuring all tools have defined access controls, adjust rate limits maintaining tier hierarchy (Free < Pro < Enterprise), or update execution configuration (retry, timeout, circuit breaker). Validate consistency across all affected tools and preserve unmodified sections.

---

## Modification Sequence

### 1. Confirm Modification Scope

Review confirmed changes from Step 10:

| Modification | Section | Impact |
|--------------|---------|--------|
| {{change_type}} | {{section}} | {{impact}} |

### 2. Apply Changes by Type

#### 2.1 Adding New Tools

For each new tool:

| Field | Value |
|-------|-------|
| Tool ID | {{tool_id}} |
| Name | {{name}} |
| Category | {{category}} |
| Module | {{module}} |
| Version | 1.0.0 |

**Input Schema:**
- Define tenant_context as first parameter
- Define tool-specific parameters
- Set validation rules

**Output Schema:**
- Define success response structure
- Define error response structure

**Configuration:**
- Required permissions: {{permissions}}
- Rate limits: Free: {{limit}}, Pro: {{limit}}, Enterprise: {{limit}}
- Tier access: {{tiers}}

#### 2.2 Updating Tool Schemas

For schema modifications:

| Tool | Field | Old Value | New Value |
|------|-------|-----------|-----------|
| {{tool}} | {{field}} | {{old}} | {{new}} |

**Versioning:**
- Breaking change → increment MAJOR version
- New optional field → increment MINOR version
- Bug fix → increment PATCH version

**Deprecation (if replacing):**
```yaml
deprecated: true
deprecation_date: "{{date}}"
replacement_tool: "{{new_tool_id}}"
```

#### 2.3 Modifying Permissions

For permission changes:

| Tool | Previous | Updated | Reason |
|------|----------|---------|--------|
| {{tool}} | {{old_perms}} | {{new_perms}} | {{reason}} |

**Impact Assessment:**
- Agents affected: {{list}}
- Capability changes: {{changes}}
- Migration required: YES/NO

#### 2.4 Adjusting Rate Limits

For rate limit changes:

| Tool | Tier | Previous | Updated | Reason |
|------|------|----------|---------|--------|
| {{tool}} | {{tier}} | {{old}} | {{new}} | {{reason}} |

**Impact Assessment:**
- Tenants affected: {{count}}
- Notification required: YES/NO
- Grace period: {{duration}}

#### 2.5 Updating Execution Configuration

For execution config changes:

| Setting | Previous | Updated | Scope |
|---------|----------|---------|-------|
| {{setting}} | {{old}} | {{new}} | All tools / Specific |

### 3. Update Document Sections

Apply changes to relevant sections:

| Section | Changes Applied |
|---------|-----------------|
| Tool Catalog | {{changes}} |
| Tool Schemas | {{changes}} |
| Permission Matrix | {{changes}} |
| Rate Limiting | {{changes}} |
| Execution Environment | {{changes}} |
| Error Responses | {{changes}} |
| Monitoring | {{changes}} |

### 4. Update Document Metadata

Update document header:

```markdown
**Last Modified:** {{current_date}}
**Modified By:** {{modifier}}
**Version:** {{incremented_version}}

### Change Log
| Date | Change | Author |
|------|--------|--------|
| {{date}} | {{description}} | {{author}} |
```

### 5. Verify Consistency

After applying changes, verify:

| Check | Status |
|-------|--------|
| All TenantContext parameters present | [ ] |
| Permission mappings consistent | [ ] |
| Rate limits defined for all tiers | [ ] |
| Version numbers incremented appropriately | [ ] |
| Deprecation notices added where needed | [ ] |
| Change log updated | [ ] |

### 6. Write Updated Document

Write modified document to:

```
{output_folder}/planning-artifacts/tool-contracts-design.md
```

### 7. Generate Modification Summary

Present summary of applied changes:

```markdown
## Modification Summary

**Applied Changes:**
1. {{change_1}}
2. {{change_2}}
3. {{change_3}}

**Version:** {{old_version}} → {{new_version}}

**Breaking Changes:** {{yes_no}}

**Migration Notes:**
{{notes_if_any}}
```

---

## SUCCESS METRICS:

- ✅ All tools have TenantContext as first parameter
- ✅ Schema versioning correctly applied (MAJOR/MINOR/PATCH)
- ✅ Permission matrix updated for all affected tools
- ✅ Rate limits maintain tier hierarchy (Free < Pro < Enterprise)
- ✅ Deprecation notices added for replaced tools
- ✅ Change log updated with modification details

---

## FAILURE MODES:

- ❌ **TenantContext removed from tool:** CRITICAL - restore tenant context parameter
- ❌ **Breaking change without MAJOR version:** Block until version incremented
- ❌ **Rate limit tier hierarchy violated:** Free cannot exceed Pro, Pro cannot exceed Enterprise
- ❌ **Permission matrix inconsistent:** Tool added without permissions defined
- ❌ **Sandbox isolation compromised:** Require explicit override with justification

---

## Verification

- [ ] All modifications applied correctly
- [ ] Unaffected sections preserved
- [ ] Document format valid
- [ ] Patterns align with pattern registry
- [ ] Ready for validation

---

## Outputs

- Updated tool contract design document
- Modification summary
- Change log entries
- Migration notes (if applicable)

---

## NEXT STEP:

Edit complete. Recommended next steps:

| Action | Command |
|--------|---------|
| Validate changes | Run Validate mode (`step-20-v-load.md`) |
| Review full document | Read updated artifact |
| Share with team | Export or commit changes |

If breaking changes were made, ensure downstream consumers are notified.
