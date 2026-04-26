# Step 10: Load Existing Caching Design

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing caching-design.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse all cache layer configurations and performance settings
- ✅ EXTRACT current TTL policies, invalidation strategy, and eviction rules
- 📋 PRESENT a structured summary of current design before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY document version and stepsCompleted to understand completeness
- ⚠️ FLAG any sections marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing caching design for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract cache layers, TTL policies, invalidation, performance
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may require QG-M2 cache dimension re-validation
- 🔍 Use web search: Only if user requests updated best practices

---

## YOUR TASK

Load the existing caching design document, parse its structure, extract the current cache configuration, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

## Load Sequence

### Action 1: Locate Document

**Search for existing artifact:**

```
{output_folder}/planning-artifacts/caching-design.md
```

If not found, check alternate locations:
- `{output_folder}/caching-design.md`
- `{project-root}/docs/architecture/caching-design.md`

**If document not found:**
```
================================================================================
EDIT MODE ERROR: No existing caching design found
================================================================================
Expected location: {output_folder}/planning-artifacts/caching-design.md

Options:
[C] Switch to Create mode to generate new design
[P] Specify alternate path to existing document
================================================================================
```

### Action 2: Parse Frontmatter

**Extract document metadata:**

```yaml
# Expected frontmatter structure
name: caching-design
version: {semantic_version}
date: {last_modified_date}
tenant_model: {rls|schema|database|hybrid}
stepsCompleted: [1, 2, 3, 4, 5]
```

Document current state:

| Metadata | Value |
|----------|-------|
| Document Version | |
| Last Modified | |
| Tenant Model | |
| Steps Completed | |
| Completeness | |

### Action 3: Extract Cache Layer Configuration

**Parse current cache layer settings:**

| Layer | Technology | Isolation | TTL Strategy | Status |
|-------|------------|-----------|--------------|--------|
| **L1 (In-Memory)** | | | | |
| **L2 (Distributed)** | | | | |
| **CDN** | | | | |

**Flag incomplete layers:** Mark any with "TODO" or missing configuration.

### Action 4: Extract TTL Policies

**Parse current TTL settings by tier:**

| Tier | Session TTL | Entity TTL | Query TTL | Status |
|------|-------------|------------|-----------|--------|
| Free | | | | |
| Pro | | | | |
| Enterprise | | | | |

### Action 5: Extract Invalidation Strategy

**Parse invalidation configuration:**

| Component | Current Setting | Status |
|-----------|-----------------|--------|
| Event-Driven | | |
| Cross-Module | | |
| Circuit Breaker | | |

### Action 6: Extract Performance Settings

**Parse performance configuration:**

| Setting | Current Value | Status |
|---------|---------------|--------|
| Hit Rate Targets | | |
| Memory Allocation | | |
| Hot Key Threshold | | |
| Eviction Policy | | |

### Action 7: Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
CACHING DESIGN - EDIT MODE
================================================================================
Document: caching-design.md
Version: {version}
Tenant Model: {tenant_model}
Last Modified: {date}
================================================================================

CURRENT CACHE LAYERS:
1. L1 (In-Memory): {technology} - {status}
2. L2 (Distributed): {technology} - {status}
3. CDN: {technology} - {status}

TTL POLICIES:
- Free:       Session={ttl}, Entity={ttl}, Query={ttl}
- Pro:        Session={ttl}, Entity={ttl}, Query={ttl}
- Enterprise: Session={ttl}, Entity={ttl}, Query={ttl}

INVALIDATION: {strategy} with circuit breaker {threshold}
PERFORMANCE: Hit rate targets {targets}, Memory {allocation}

EDITABLE SECTIONS:
[1] Cache Layers - Modify layer technologies or isolation
[2] Key Strategy - Update cache key patterns
[3] TTL Policies - Change TTL by tier or type
[4] Invalidation - Update invalidation triggers or circuit breaker
[5] Performance - Modify hit rate targets, memory, eviction
[6] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Cache layer configurations parsed completely
- ✅ TTL policies extracted by tier
- ✅ Invalidation strategy documented
- ✅ Performance settings extracted
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete sections:** Flag sections needing completion before edit
- ❌ **Outdated format:** Suggest Create mode to generate current format

---

## Verification

- [ ] Document loaded from expected location
- [ ] Frontmatter parsed with version, tenant model
- [ ] All 3 cache layers extracted
- [ ] TTL policies by tier documented
- [ ] Invalidation strategy extracted
- [ ] Performance settings documented
- [ ] Edit summary presented
- [ ] User selection received

---

## NEXT STEP

Proceed to `step-11-e-apply.md` with:
- Selected edit target(s)
- Current document state
- Parsed cache configuration
- Document version for change tracking
