# BAM RLS Documentation Context

**When to load:** During documentation phase for tenant isolation, security documentation, or API docs.

**Integrates with:** Tech Writer agents

---

## Core Concepts for RLS Documentation

### What to Document

| Topic | Audience | Content |
|-------|----------|---------|
| RLS Overview | All developers | How tenant isolation works |
| Policy Reference | Backend devs | Policy syntax, patterns |
| Testing Guide | QA engineers | How to verify isolation |
| Admin Guide | Platform admins | Bypass procedures, audit |
| Compliance | Security/Legal | Isolation guarantees |

### RLS Policy Documentation Template

```markdown
## Policy: {table_name}_tenant_isolation

**Purpose:** Restrict row access to current tenant only.

**Enforcement:** PostgreSQL Row-Level Security

**Trigger:** All SELECT, INSERT, UPDATE, DELETE operations

**Context Required:**
- `app.current_tenant` - Tenant UUID from session

**Bypass Conditions:**
- Platform admin role (audit logged)
- System operations (no tenant context)

**Testing:**
1. Insert data as Tenant A
2. Query as Tenant B
3. Verify zero rows returned
```

---

## Application Guidelines

1. **Document every RLS policy** - What, why, how
2. **Include bypass procedures** - Secure and audited
3. **Testing instructions** - How to verify isolation
4. **Compliance mapping** - Which regulations addressed
5. **Troubleshooting** - Common issues and fixes

---

## Integration with BAM Workflows

- Tech Writer workflows with BAM extension
- `bmad-bam-tenant-model-isolation` → Generate policy docs
