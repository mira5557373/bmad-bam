# Step 11: Apply Changes to Platform Architecture

## MANDATORY EXECUTION RULES

- NEVER modify architecture without explicit user change requests
- Preserve ALL unchanged content exactly as-is
- Confirm changes with user before saving

---

## YOUR TASK

Apply the user's selected changes to the platform architecture document loaded in step-10. Validate consistency, update version, and save.

---

## Apply Sequence

### 1. Capture Change Requests

Gather specific changes:

| Change Category | Impact Level |
|-----------------|--------------|
| Plugin Isolation | HIGH - affects security model |
| White-label Tiers | HIGH - affects customer experience |
| Partner API Tiers | MEDIUM - affects integrations |
| Marketplace Structure | MEDIUM - affects ecosystem |
| Extension Points | LOW - additive change |
| Governance | LOW - process change |

### 2. Validate Consistency

Before applying, validate:

| Check | Criteria |
|-------|----------|
| Plugin Isolation | Plugins scoped to tenant context |
| Partner Access | API respects tenant boundaries |
| White-label | No cross-tenant branding leakage |
| Marketplace | Listings respect visibility rules |

### 3. Apply Changes

Update the architecture sections:

| Section | When to Update |
|---------|----------------|
| Frontmatter | Always (version, date) |
| Platform Strategy | If approach changes |
| Plugin Architecture | If plugin system changes |
| White-Label Configuration | If tiers change |
| API Marketplace | If structure changes |
| Partner API | If tiers change |
| Change Log | Always |

### 4. Present Summary

```markdown
## Change Summary

**Document:** platform-architecture.md
**Previous Version:** {old_version}
**New Version:** {new_version}

### Changes Applied

1. {change 1 description}
2. {change 2 description}

Confirm these changes are correct before saving?
```

### 5. Save Document

**Save to:** `{output_folder}/planning-artifacts/platform-architecture.md`

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

Edit mode complete. Run Validate mode (step-22-v-report.md) to verify architecture.
