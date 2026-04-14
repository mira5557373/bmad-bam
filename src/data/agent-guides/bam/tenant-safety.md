# BAM Tenant Safety Guide

**When to load:** During Phase 5 (Quality) when verifying tenant safety controls,
or when user mentions tenant isolation, cross-tenant security, or multi-tenant safety.

**Integrates with:** Security Architect, Platform Architect, QA Engineer (TEA)

---

## Core Concepts

### Tenant Safety Dimensions

Tenant safety verification covers four dimensions:

1. **Data Isolation** - No cross-tenant data access possible
2. **Resource Boundaries** - Per-tenant limits enforced
3. **AI Context Separation** - Complete memory/context isolation
4. **Attack Prevention** - Cross-tenant attacks blocked

### Isolation Verification Matrix

| Layer | Isolation Method | Test Type |
|-------|------------------|-----------|
| Database | RLS | Cross-tenant query |
| Cache | Namespacing | Key enumeration |
| Object Storage | Path isolation | Traversal test |
| Vector Store | Tenant namespace | Semantic search |
| AI Memory | Context scoping | Memory extraction |
| Compute | Containerization | Escape test |

### Cross-Tenant Attack Vectors

| Attack Category | Vectors | Defense |
|-----------------|---------|---------|
| Direct Access | IDOR, ID enumeration | Tenant validation |
| Session Attacks | Hijacking, cookie tampering | Secure sessions |
| AI Attacks | Prompt injection, memory extraction | Guardrails |
| Infrastructure | Container escape, SSRF | Network isolation |
| Side-Channel | Timing, cache | Constant-time ops |

### TEA Integration

Tenant safety verification (QG-I2) requires TEA handoff:

1. BAM produces isolation test criteria
2. TEA executes `tea-trace` verification
3. TEA reports results back
4. BAM makes gate decision

## Application Guidelines

When verifying tenant safety:

1. **Audit all data stores** - Every layer must be isolated
2. **Test cross-tenant attacks** - Actually attempt attacks
3. **Verify AI context** - Memory and RAG isolation critical
4. **Confirm resource limits** - Noisy neighbor prevention

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Any cross-tenant access | FAIL gate immediately | Critical violation |
| Minor resource leak | CONDITIONAL with fix | Non-data issue |
| AI memory leakage | FAIL gate | Data exposure risk |
| Side-channel possible | CONDITIONAL | Risk-based decision |

## Related Workflows

- `bmad-bam-tenant-safety` - Tenant safety verification
- `bmad-bam-tenant-model-isolation` - Isolation design
- `bmad-bam-convergence-verification` - Integration testing

## Related Patterns

Load decision criteria and `web_queries` column from pattern registry:

- **Tenant isolation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`
- **Testing patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-isolation`

Use the `web_queries` column from pattern registry for current best practices.

### Web Research

Use these queries for current best practices:

- Search: "multi-tenant isolation testing {date}"
- Search: "cross-tenant attack prevention {date}"
- Search: "AI context isolation patterns {date}"
- Search: "tenant safety verification SaaS {date}"
