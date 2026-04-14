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

## Documentation Structure

### Developer Documentation

When documenting RLS for developers, include these essential sections:

1. **Architecture Overview**: Explain how RLS fits into the overall tenant isolation strategy. Describe the relationship between the tenant context, middleware, and database policies.

2. **Policy Syntax Reference**: Provide complete syntax examples for creating, altering, and dropping RLS policies. Include examples for different operation types (SELECT, INSERT, UPDATE, DELETE).

3. **Common Patterns**: Document reusable patterns like tenant_id filtering, role-based exceptions, and cross-tenant admin access. Each pattern should include code examples and use cases.

4. **Performance Considerations**: Document index requirements for RLS predicate columns, explain how RLS affects query planning, and provide guidance on avoiding common performance pitfalls.

5. **Migration Guide**: Explain how to add RLS to existing tables, including data backfill strategies and zero-downtime migration approaches.

### Operations Documentation

For platform operators, document:

1. **Monitoring and Alerting**: How to detect RLS policy failures, cross-tenant access attempts, and performance degradation. Include Prometheus/Grafana dashboard examples.

2. **Bypass Procedures**: Step-by-step guide for authorized bypasses with proper audit logging. Include approval workflows and emergency procedures.

3. **Troubleshooting Runbook**: Common issues like missing tenant context, policy conflicts, and permission errors. Each issue should have symptoms, diagnosis steps, and resolution procedures.

---

## Application Guidelines

1. **Document every RLS policy** - What, why, how
2. **Include bypass procedures** - Secure and audited
3. **Testing instructions** - How to verify isolation
4. **Compliance mapping** - Which regulations addressed
5. **Troubleshooting** - Common issues and fixes

### Documentation Quality Checklist

- [ ] All policies have clear purpose statements
- [ ] Code examples are tested and working
- [ ] Bypass procedures include audit requirements
- [ ] Testing instructions cover positive and negative cases
- [ ] Compliance sections map to specific regulation clauses

---

## Integration with BAM Workflows

- Tech Writer workflows with BAM extension
- `bmad-bam-tenant-model-isolation` → Generate policy docs

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **RLS patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `rls-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "PostgreSQL row-level security multi-tenant {date}"
- Search: "RLS policy performance optimization {date}"
- Search: "tenant isolation RLS vs schema separation {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| How detailed should RLS policy documentation be? | Document purpose, trigger, context, bypass, and testing for every policy | Comprehensive docs prevent security gaps and enable proper auditing and maintenance |
| Who should document RLS bypass procedures? | Security team authors, with platform admin review | Bypass is high-risk; requires security expertise and operational accountability |
| When to include code examples in RLS docs? | Always include working, tested examples for each policy pattern | Reduces implementation errors; accelerates developer onboarding |
| How to document RLS performance considerations? | Include index requirements and query plan impact for each policy | Prevents production performance issues; helps developers make informed tradeoffs |
| What compliance mapping is required? | Map each RLS policy to specific regulation clauses it addresses | Essential for audits; demonstrates intentional compliance design |

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Design RLS policies for tenant isolation
- `bmad-bam-security-review` - Validate RLS policy implementation and coverage
- `bmad-bam-tenant-onboarding-design` - Document RLS context setup during onboarding
- `bmad-bam-tenant-data-export` - Document data access under RLS constraints
