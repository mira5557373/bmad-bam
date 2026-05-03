# Step 11: Apply Changes to RAG Configuration

## MANDATORY EXECUTION RULES

- NEVER modify configuration without explicit user change requests
- Preserve ALL unchanged content exactly as-is
- Confirm changes with user before saving

---

## YOUR TASK

Apply the user's selected changes to the RAG pipeline configuration document loaded in step-10. Validate consistency, update version, and save.

---

## Apply Sequence

### 1. Capture Change Requests

Gather specific changes:

| Change Category | Impact Level |
|-----------------|--------------|
| Vector Store | HIGH - affects storage infrastructure |
| Tenant Isolation | HIGH - affects data isolation |
| Chunking Strategy | MEDIUM - affects retrieval quality |
| Embedding Model | MEDIUM - requires re-embedding |
| Retrieval Settings | LOW - operational tuning |
| Tier Limits | LOW - quota adjustment |

### 2. Validate Consistency

Before applying, validate:

| Check | Criteria |
|-------|----------|
| Isolation | Tenant isolation model compatible with vector store |
| Embedding | Dimensions match vector store configuration |
| Retrieval | Filters include tenant_id scope |

### 3. Apply Changes

Update the configuration sections:

| Section | When to Update |
|---------|----------------|
| Frontmatter | Always (version, date) |
| Vector Store | If provider or settings change |
| Tenant Isolation | If isolation model changes |
| Chunking Strategy | If strategy changes |
| Embedding Model | If model changes |
| Retrieval Pipeline | If retrieval settings change |
| Change Log | Always |

### 4. Present Summary

```markdown
## Change Summary

**Document:** rag-pipeline-config.md
**Previous Version:** {old_version}
**New Version:** {new_version}

### Changes Applied

1. {change 1 description}
2. {change 2 description}

### Re-embedding Required

{yes/no - if embedding model or dimensions changed}

Confirm these changes are correct before saving?
```

### 5. Save Document

**Save to:** `{output_folder}/planning-artifacts/rag-pipeline-config.md`

---

## SUCCESS METRICS

- All requested changes captured
- Consistency validation passed
- Version updated
- Change Log entry added
- User confirmed changes
- Document saved

---

## NEXT STEP

Edit mode complete. Run Validate mode (steps 20-22) to verify configuration.
