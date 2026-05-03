# Step 11: Apply Changes to MCP Configuration

## MANDATORY EXECUTION RULES

- 🛑 NEVER modify configuration without explicit user change requests
- 📖 Preserve ALL unchanged content exactly as-is
- ⏸️ Confirm changes with user before saving

---

## YOUR TASK

Apply the user's selected changes to the MCP configuration document loaded in step-10. Validate consistency, update version, and save.

---

## Apply Sequence

### 1. Capture Change Requests

Gather specific changes:

| Change Category | Impact Level |
|-----------------|--------------|
| Server Scope | HIGH - affects deployment |
| Isolation Strategy | HIGH - affects tenant isolation |
| Auth Method | MEDIUM - affects security |
| Tool Categories | LOW - additive change |
| Rate Limits | LOW - operational change |

### 2. Validate Consistency

Before applying, validate:

| Check | Criteria |
|-------|----------|
| Isolation | Tools scoped to tenant context |
| Auth | Method compatible with isolation |
| Discovery | Endpoint configured |

### 3. Apply Changes

Update the configuration sections:

| Section | When to Update |
|---------|----------------|
| Frontmatter | Always (version, date) |
| Server Architecture | If scope changes |
| Tool Discovery | If categories change |
| Tenant Isolation | If isolation changes |
| Authentication | If auth method changes |
| Change Log | Always |

### 4. Present Summary

```markdown
## Change Summary

**Document:** mcp-server-config.md
**Previous Version:** {old_version}
**New Version:** {new_version}

### Changes Applied

1. {change 1 description}
2. {change 2 description}

Confirm these changes are correct before saving?
```

### 5. Save Document

**Save to:** `{output_folder}/planning-artifacts/mcp-server-config.md`

---

## SUCCESS METRICS

- ✅ All requested changes captured
- ✅ Consistency validation passed
- ✅ Version updated
- ✅ Change Log entry added
- ✅ User confirmed changes
- ✅ Document saved

---

## NEXT STEP

Edit mode complete. Run Validate mode (steps 20-22) to verify configuration.
