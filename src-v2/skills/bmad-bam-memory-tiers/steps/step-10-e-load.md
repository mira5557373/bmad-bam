# Step 10: Load Existing Memory Tier Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and review existing memory tier design for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Parse existing document structure
- 🚫 Do NOT: Apply modifications (that's Step 11)
- 🔍 Use web search: Not required (loading step)
- ⚠️ Note: Identify sections that may need updates based on new requirements

---

## Purpose

Load and review existing memory tier design documents to identify sections requiring modification. Present current state to user for modification targeting.

---

## Prerequisites

- Existing memory tier design document exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: memory-tiers

---

## YOUR TASK

Load the existing memory tier design document, parse its structure, extract the current tier configurations and vector store settings, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

## Actions

### 1. Load Existing Documents

Load the existing memory tier design:

```
{output_folder}/planning-artifacts/ai/memory-tiers-design.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current document:

| Section | Status | Key Configuration |
|---------|--------|-------------------|
| Session Memory | YES/NO | {{session_config}} |
| Conversation Memory | YES/NO | {{conversation_config}} |
| Tenant Memory | YES/NO | {{tenant_config}} |
| Global Memory | YES/NO | {{global_config}} |
| Vector Store | YES/NO | {{vector_db}} |
| Isolation | YES/NO | {{isolation_method}} |
| Compliance | YES/NO | {{compliance_frameworks}} |

### 3. Identify Current Memory Tiers

Display current memory tier configuration:

| Tier | Storage | TTL | Isolation |
|------|---------|-----|-----------|
| Session | {{storage}} | {{ttl}} | {{isolation}} |
| Conversation | {{storage}} | {{ttl}} | {{isolation}} |
| Working | {{storage}} | {{ttl}} | {{isolation}} |
| Tenant | {{storage}} | {{ttl}} | {{isolation}} |
| Global | {{storage}} | {{ttl}} | {{isolation}} |

### 4. Review Vector Store Configuration

Display current vector store settings:

| Attribute | Current Value |
|-----------|---------------|
| Vector DB | {{vector_db}} |
| Embedding Model | {{embedding_model}} |
| Dimensions | {{dimensions}} |
| Tenant Isolation | {{tenant_isolation}} |

### 5. Identify Potential Update Areas

Based on current best practices, identify areas that may need updates:

| Area | Current State | Potential Update | Priority |
|------|---------------|------------------|----------|
| Context Window | {{current}} | {{potential}} | {{priority}} |
| Compression | {{current}} | {{potential}} | {{priority}} |
| TTL Policies | {{current}} | {{potential}} | {{priority}} |
| Isolation Method | {{current}} | {{potential}} | {{priority}} |

### 6. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
MEMORY TIERS DESIGN - EDIT MODE
================================================================================
Document: memory-tiers-design.md
Version: {version}
QG-M3 Status: {status}
================================================================================

MEMORY TIER SUMMARY:
- Session Memory:      {storage} / TTL: {ttl}
- Conversation Memory: {storage} / TTL: {ttl}
- Working Memory:      {storage} / TTL: {ttl}
- Tenant Memory:       {storage} / TTL: {ttl}
- Global Memory:       {storage} / TTL: {ttl}

VECTOR STORE: {vector_db} with {isolation_method} isolation

CONTEXT WINDOW: {strategy} management, {compression} compression

EDITABLE SECTIONS:
[1] Session Memory Configuration - Hot storage, short-term context
[2] Conversation Memory Configuration - Conversation-scoped persistence
[3] Tenant Memory Configuration - Tenant-scoped long-term storage
[4] Global Memory Configuration - Cross-tenant shared knowledge
[5] Vector Store Architecture - Embedding, indexing, retrieval
[6] Context Window Management - Token limits, summarization, compression
[7] TTL and Eviction Policies - Lifecycle management for each tier
[8] Memory Compression - Summarization and archival strategies
[9] Isolation Verification - Tenant boundary enforcement
[10] Compliance Features - Audit, retention, export capabilities
[11] Implementation Roadmap - Phase planning and dependencies
[A] Full Document - Major restructure (requires QG-M3 re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ All memory tier configurations parsed completely
- ✅ Vector store settings extracted and categorized
- ✅ Context window management documented
- ✅ TTL and eviction policies captured
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)
- ✅ QG-M3 impact assessment communicated

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete tier config:** Flag tiers needing completion before edit
- ❌ **QG-M3 already failed:** Warn that edits require full re-validation
- ❌ **Vector store mismatch:** Warn if vector DB changed from original design

---

## Verification

- [ ] Existing document loaded successfully
- [ ] Document structure parsed
- [ ] Current memory tier configuration displayed
- [ ] Vector store settings reviewed
- [ ] Modification targets identified
- [ ] User confirmed sections to modify

---

## Outputs

- Summary of current memory tier design state
- List of sections identified for modification
- Modification scope confirmation

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modifications.
