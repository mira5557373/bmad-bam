# BAM Conventions Checklist

Generated: 2026-04-24
Purpose: Ensure all conventions are preserved during consolidation

---

## Overview

This checklist documents all BAM conventions that MUST be preserved in consolidated domain guides. During manual consolidation, verify each convention appears in the appropriate target guide.

---

## 1. Tenant Context Conventions

### Runtime Context Pattern

| Convention | Format | Example | Preserve In |
|------------|--------|---------|-------------|
| Current tenant accessor | `app.current_tenant` | `app.current_tenant.id` | tenant-patterns-guide.md |
| Tenant context type | `TenantContext` | `ctx: TenantContext` | tenant-patterns-guide.md |
| Request context | `request.tenant` | `request.tenant.tier` | tenant-patterns-guide.md |

### Cache Key Format

| Convention | Format | Example | Preserve In |
|------------|--------|---------|-------------|
| Standard cache key | `tenant:{id}:{namespace}:{key}` | `tenant:abc123:users:list` | state-patterns-guide.md |
| Session cache | `session:{tenant}:{session_id}` | `session:abc123:sess_xyz` | state-patterns-guide.md |
| Rate limit key | `ratelimit:{tenant}:{endpoint}` | `ratelimit:abc123:/api/v1/users` | scaling-patterns-guide.md |

### File Path Format

| Convention | Format | Example | Preserve In |
|------------|--------|---------|-------------|
| Tenant file storage | `tenants/{id}/{category}/{filename}` | `tenants/abc123/uploads/doc.pdf` | data-patterns-guide.md |
| Tenant config | `config/tenants/{id}/settings.yaml` | `config/tenants/abc123/settings.yaml` | tenant-patterns-guide.md |
| Tenant logs | `logs/{tenant_id}/{date}/{service}.log` | `logs/abc123/2026-04-24/api.log` | observability-patterns-guide.md |

### HTTP Headers

| Convention | Header Name | Example Value | Preserve In |
|------------|-------------|---------------|-------------|
| Tenant identification | `X-Tenant-ID` | `abc123` | tenant-patterns-guide.md |
| Tenant tier | `X-Tenant-Tier` | `enterprise` | tenant-patterns-guide.md |
| Request correlation | `X-Request-ID` | `req_xyz789` | observability-patterns-guide.md |
| Trace context | `X-Trace-ID` | `trace_abc` | observability-patterns-guide.md |

### Database Conventions

| Convention | Column/Pattern | Example | Preserve In |
|------------|----------------|---------|-------------|
| RLS tenant column | `tenant_id` | `WHERE tenant_id = current_tenant()` | tenant-patterns-guide.md |
| Schema naming | `tenant_{id}` | `SET search_path TO tenant_abc123` | tenant-patterns-guide.md |
| Connection string | `tenant_db_{id}` | `postgresql://tenant_db_abc123` | tenant-patterns-guide.md |

---

## 2. Quality Gate Conventions

### Gate Naming Pattern

| Gate ID | Phase | Name | Preserve In |
|---------|-------|------|-------------|
| QG-D1 | Discovery | Discovery Gate | discovery-patterns-guide.md |
| QG-PL1 | Planning | Planning Gate | discovery-patterns-guide.md |
| QG-F1 | Foundation | Foundation Gate | gate-verification-patterns-guide.md |
| QG-M1 | Module | Module Architecture Gate | gate-verification-patterns-guide.md |
| QG-M2 | Module | Tenant Isolation Gate | gate-verification-patterns-guide.md |
| QG-M3 | Module | Agent Runtime Gate | gate-verification-patterns-guide.md |
| QG-I1 | Integration | Convergence Gate | gate-verification-patterns-guide.md |
| QG-I2 | Integration | Tenant Safety Gate | gate-verification-patterns-guide.md |
| QG-I3 | Integration | Agent Safety Gate | gate-verification-patterns-guide.md |
| QG-P1 | Production | Production Gate | gate-verification-patterns-guide.md |

### Gate Outcome Convention

| Outcome | Meaning | Action | Preserve In |
|---------|---------|--------|-------------|
| PASS | All criteria met | Proceed to next phase | gate-verification-patterns-guide.md |
| CONDITIONAL | Non-critical gaps | Proceed with mitigation plan | gate-verification-patterns-guide.md |
| FAIL | Critical check fails | Enter recovery protocol | gate-verification-patterns-guide.md |
| WAIVED | Non-critical waived | Proceed with justification | gate-verification-patterns-guide.md |

---

## 3. Pattern Registry Conventions

### Section Anchor Format

| Convention | Format | Example | Preserve In |
|------------|--------|---------|-------------|
| Section anchor | `§{pattern-id}` | `§tenant-rls` | All domain guides |
| Anchor in URL | `#{pattern-id}` | `tenant-patterns-guide.md#tenant-rls` | architecture-patterns-guide.md |
| Cross-reference | `See §{pattern-id}` | `See §agent-tracing` | All domain guides |

### Pattern ID Naming

| Convention | Format | Example | Preserve In |
|------------|--------|---------|-------------|
| Pattern ID | `{domain}-{pattern}` | `tenant-rls`, `agent-tracing` | All domain guides |
| Hyphenated (not underscore) | `word-word-word` | `mcp-server-isolation` | All domain guides |
| Category prefix | `{category}-*` | `ai-*`, `tenant-*`, `mcp-*` | Pattern registry |

### CSV Column Conventions

| Column | Purpose | Format | Preserve In |
|--------|---------|--------|-------------|
| `pattern_id` | Unique identifier | kebab-case | Pattern registry |
| `consolidated_guide` | Target guide | `{domain}-patterns-guide.md` | Pattern registry |
| `section_anchor` | Section link | pattern_id with hyphens | Pattern registry |
| `phase` | BMAD phase | discovery/planning/foundation/solutioning/integration/production/anytime | Pattern registry |

---

## 4. Naming Conventions

### Agent Guide Naming

| Convention | Format | Example | Preserve In |
|------------|--------|---------|-------------|
| Pattern catalog | `{domain}-patterns.md` | `scaling-patterns.md` | Original guides |
| Concept overview | `{domain}.md` | `ai-runtime.md` | Original guides |
| How-to guide | `{domain}-guide.md` | `white-labeling-guide.md` | Original guides |
| Consolidated guide | `{domain}-patterns-guide.md` | `tenant-patterns-guide.md` | Target guides |

### Template Naming

| Convention | Format | Example | Preserve In |
|------------|--------|---------|-------------|
| Template suffix | `-template.md` | `master-architecture-template.md` | Templates folder |
| Sidecar prefix | `sidecar-*` | `sidecar-architecture-decisions.md` | Templates folder |

### Workflow Naming

| Convention | Format | Example | Preserve In |
|------------|--------|---------|-------------|
| Kebab-case | `word-word-word` | `tenant-model-isolation` | Workflows folder |
| Verb-noun pattern | `{action}-{subject}` | `create-master-architecture` | Workflows folder |

---

## 5. Code Block Conventions

### Language Tags

| Language | Tag | Preserve In |
|----------|-----|-------------|
| TypeScript | ` ```typescript ` | All guides with TS code |
| Python | ` ```python ` | All guides with Python code |
| SQL | ` ```sql ` | Data/tenant guides |
| YAML | ` ```yaml ` | Config/operations guides |
| Bash | ` ```bash ` | Operations guides |
| PromQL | ` ```promql ` | Observability guides |

### Code Block Context

| Convention | Format | Preserve In |
|------------|--------|-------------|
| Multi-tenant context | Shows `tenant_id` parameter | All code examples |
| Error handling | Try/catch with tenant context | Reliability guides |
| Logging with tenant | `logger.info({tenant_id, ...})` | Observability guides |

---

## 6. Table Conventions

### Decision Matrix Format

| Convention | Columns | Preserve In |
|------------|---------|-------------|
| Pattern selection | Situation, Recommendation, Rationale | All guides |
| When to use | Use Case, Pattern, Why | All guides |
| Comparison | Option A, Option B, Trade-offs | Architecture guides |

### Gate Checklist Format

| Convention | Columns | Preserve In |
|------------|---------|-------------|
| Verification | Check, Status, Notes | Gate guides |
| Criteria | Criterion, Required, Verification | Gate guides |

---

## 7. Cross-Reference Conventions

### Internal References

| Convention | Format | Example |
|------------|--------|---------|
| Pattern reference | `See §{pattern-id}` | `See §tenant-rls` |
| Guide reference | `See {guide-name}` | `See tenant-patterns-guide.md` |
| Section reference | `{guide}#{section}` | `ai-runtime-patterns-guide.md#agent-tracing` |

### External References

| Convention | Format | Example |
|------------|--------|---------|
| Web research | `Search the web: "{query} {date}"` | `Search the web: "PostgreSQL RLS 2026"` |
| Pattern registry | `Load patterns: {file} → filter: {id}` | `Load patterns: bam-patterns.csv → filter: tenant-*` |

---

## 8. Phase Mapping Conventions

### BMAD Phase Mapping

| BAM Phase | BMAD Phase | Numeric |
|-----------|------------|---------|
| discovery | 1-discovery | 1 |
| planning | 2-planning | 2 |
| foundation | 3-solutioning | 3 |
| solutioning | 3-solutioning | 3 |
| integration | 4-implementation | 4 |
| implementation | 4-implementation | 4 |
| quality | 5-quality | 5 |
| operations | 6-operations | 6 |
| anytime | N/A | N/A |

---

## Verification Checklist

For each consolidated domain guide, verify:

### Tenant Conventions
- [ ] `app.current_tenant` pattern documented
- [ ] Cache key format `tenant:{id}:{namespace}:{key}` preserved
- [ ] File path format `tenants/{id}/{category}/{filename}` preserved
- [ ] HTTP headers (`X-Tenant-ID`, etc.) documented
- [ ] RLS `tenant_id` column pattern preserved

### Quality Gate Conventions
- [ ] All referenced QG-* gates documented
- [ ] Gate outcomes (PASS/CONDITIONAL/FAIL/WAIVED) explained
- [ ] Recovery protocol referenced

### Pattern Registry Conventions
- [ ] Section anchors use `§{pattern-id}` format
- [ ] Pattern IDs use kebab-case
- [ ] Cross-references use `See §{pattern-id}` format

### Code Conventions
- [ ] All code blocks have language tags
- [ ] Multi-tenant context shown in examples
- [ ] Error handling includes tenant context

### Table Conventions
- [ ] Decision matrices preserved
- [ ] Gate checklists maintain format
- [ ] Comparison tables complete

---

## Task Status

**Task 1.5: BAM Conventions Checklist - COMPLETE**

- Date: 2026-04-24
- Categories documented: 8
- Conventions identified: 50+
- Verification checklist: 15 items
