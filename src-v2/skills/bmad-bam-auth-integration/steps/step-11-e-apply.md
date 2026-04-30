# Step 11: Apply Authentication Changes

## Purpose

Apply modifications to existing authentication architecture while maintaining security and tenant isolation.

## Actions

### 1. Apply Changes by Component

**For SSO Changes (ZAS):**
- Update protocol configurations
- Modify attribute mappings
- Add/remove IdP support

**For OAuth Changes (ZAO):**
- Update grant types
- Modify token settings
- Add/remove scopes

**For API Key Changes (ZAK):**
- Update rotation policies
- Modify permission scopes
- Change rate limits

**For Session Changes (ZAM):**
- Update timeout policies
- Modify isolation settings
- Change logout behavior

### 2. Validate Changes

- [ ] Changes don't break existing integrations
- [ ] Tenant isolation maintained
- [ ] Security controls preserved
- [ ] Backward compatibility where required

### 3. Update Documentation

Update `{output_folder}/planning-artifacts/auth-integration.md` with:
- Changed sections
- Version increment
- Change log entry

### 4. Migration Considerations

If changes require migration:

| Component | Migration Type | Downtime | Rollback Plan |
|-----------|----------------|----------|---------------|
| | | | |

## Outputs

- Updated auth-integration.md
- Migration plan (if needed)
- Change log

## Quality Gate

Submit for **QG-S4** revalidation if security-impacting changes.
