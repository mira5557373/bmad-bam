# Step 11: Apply Changes to Memory Tier Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted modifications to memory tier design
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Use modification targets from Step 10
- 🚫 Do NOT: Modify sections not identified for change
- 🔍 Use web search: Verify current best practices for changed areas
- ⚠️ Note: Document all changes with ADR rationale

---

## Purpose

Apply targeted modifications to the memory tier design document, documenting changes with ADR rationale and maintaining version history.

---

## Prerequisites

- Step 10 completed: Existing document loaded
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: memory-tiers

**Web Research (If Applicable):**

Search the web: "AI agent memory architecture {date}"
Search the web: "vector database multi-tenant updates {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Review Proposed Changes

Present each proposed change for confirmation:

| Section | Current State | Proposed Change | Impact |
|---------|---------------|-----------------|--------|
| {{section}} | {{current}} | {{proposed}} | {{impact}} |

### 2. Create ADR for Changes

Document architectural decision record for significant changes:

| Field | Value |
|-------|-------|
| ADR ID | ADR-MEM-{{number}} |
| Title | {{Change description}} |
| Status | PROPOSED |
| Context | {{Why change is needed}} |
| Decision | {{What we're changing}} |
| Consequences | {{Impact of change}} |
| Alternatives | {{Options considered}} |

### 3. Apply Memory Tier Modifications

For each approved change, apply modifications:

**Session/Conversation Memory Changes:**

| Attribute | Previous | New | Reason |
|-----------|----------|-----|--------|
| TTL | {{prev}} | {{new}} | {{reason}} |
| Max Size | {{prev}} | {{new}} | {{reason}} |
| Eviction | {{prev}} | {{new}} | {{reason}} |

**Long-Term Memory Changes:**

| Attribute | Previous | New | Reason |
|-----------|----------|-----|--------|
| Vector DB | {{prev}} | {{new}} | {{reason}} |
| Embedding Model | {{prev}} | {{new}} | {{reason}} |
| Isolation | {{prev}} | {{new}} | {{reason}} |

**Compliance Changes:**

| Attribute | Previous | New | Reason |
|-----------|----------|-----|--------|
| Audit Scope | {{prev}} | {{new}} | {{reason}} |
| Retention | {{prev}} | {{new}} | {{reason}} |
| Export Format | {{prev}} | {{new}} | {{reason}} |

### 4. Update Cross-References

Check and update any cross-references affected by changes:

| Reference | Location | Update Required |
|-----------|----------|-----------------|
| Vector DB in retrieval | Long-term Memory | {{yes/no}} |
| Tenant isolation | All sections | {{yes/no}} |
| TTL references | Context Management | {{yes/no}} |
| Compliance mapping | Compliance section | {{yes/no}} |

### 5. Validate Consistency

Ensure changes maintain document consistency:

| Check | Status | Notes |
|-------|--------|-------|
| Memory tier hierarchy intact | {{status}} | {{notes}} |
| Isolation requirements preserved | {{status}} | {{notes}} |
| Compliance requirements met | {{status}} | {{notes}} |
| Implementation roadmap updated | {{status}} | {{notes}} |

### 6. Update Version History

Add change log entry:

```markdown
## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{new_version}} | {{date}} | {{author}} | {{changes}} |
| {{prev_version}} | {{prev_date}} | {{prev_author}} | {{prev_changes}} |
```

### 7. Save Updated Document

Save to: `{output_folder}/planning-artifacts/ai/memory-tiers-design.md`

---

## Verification

- [ ] All targeted sections modified
- [ ] ADR created for significant changes
- [ ] Cross-references updated
- [ ] Document consistency verified
- [ ] **CRITICAL:** Isolation requirements preserved
- [ ] **CRITICAL:** Compliance requirements maintained
- [ ] Version history updated
- [ ] Document saved to correct location

---

## Outputs

- Updated memory tier design document
- ADR(s) for changes
- Change log entry

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes meet quality criteria.

---

## Workflow Complete

Edit mode is complete. The following changes were applied:
- {{list of changes}}

Run Validate mode to verify changes meet QG-M3 quality gate requirements.
