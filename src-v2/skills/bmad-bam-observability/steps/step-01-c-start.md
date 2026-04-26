# Step 01: Initialize Observability Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Load tenant model, tier configurations, and identify observability pillars
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Tenant isolation strategy, tier definitions, platform architecture
- 🚫 Do NOT: Design specific metrics/logs/traces yet - that comes in later steps
- 🔍 Use web search: Verify observability patterns against current best practices
- ⚠️ Gate: QG-OC (Observability Completeness)

---

## Purpose

Initialize tenant-aware observability design by loading context, understanding tenant isolation requirements, and identifying the three observability pillars (metrics, logs, traces) that will form the foundation of the design.

---

## Prerequisites

- Tenant model defined (RLS, schema-per-tenant, or database-per-tenant)
- Master architecture document exists (recommended)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- User requirements for observability scope
- Tenant model configuration from `module.yaml` or master architecture
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Tier definitions (FREE, PRO, ENTERPRISE)

---

## Actions

### 1. Load Tenant Model Context

Reference tenant model from configuration:

| Tenant Model | Observability Implications |
|--------------|---------------------------|
| `row-level-security` | Shared infrastructure, tenant_id labels on all signals |
| `schema-per-tenant` | Schema-level namespacing in metrics/logs |
| `database-per-tenant` | Database-level isolation, dedicated metric streams possible |

### 2. Load Tier Configuration

Define tier-specific observability requirements:

| Tier | Retention | Dashboard Access | Custom Alerts | SLO Monitoring |
|------|-----------|-----------------|---------------|----------------|
| FREE | 7 days | Basic | No | Platform SLO only |
| PRO | 30 days | Full | Yes | Shared SLO |
| ENTERPRISE | 90+ days | Full + Custom | Yes + Webhooks | Dedicated SLO |

### 3. Identify Observability Pillars

Document the three pillars to design:

```yaml
observability_pillars:
  metrics:
    purpose: "Quantitative measurement of system behavior"
    tenant_attribution: "tenant_id label on all tenant-scoped metrics"
    cardinality_concern: "High-cardinality labels (user_id, request_id) must be avoided"
    
  logs:
    purpose: "Event-driven context for debugging and audit"
    tenant_attribution: "Structured fields: tenant.id, tenant.slug, tenant.tier"
    pii_concern: "Sensitive data must be redacted or hashed"
    
  traces:
    purpose: "Distributed request correlation across services"
    tenant_attribution: "Baggage propagation with tenant context"
    sampling_concern: "Tier-based sampling rates for cost management"
```

### 4. Define Tenant Dimension Catalog

Core dimensions that must be present across all signals:

| Dimension | Type | Required | Scope | Cardinality |
|-----------|------|----------|-------|-------------|
| `tenant_id` | string | Always | All signals | Medium (~10K) |
| `tenant_slug` | string | Always | All signals | Medium (~10K) |
| `tenant_tier` | enum | Always | All signals | Low (3 values) |
| `tenant_region` | string | If multi-region | All signals | Low (~10) |
| `user_id` | string | Request-scoped | Logs/traces only | High (~1M) |
| `request_id` | string | Request-scoped | Logs/traces only | Very high |
| `agent_id` | string | Agent calls | All signals | Low (~100) |

**Verify current best practices with web search:**
Search the web: "multi-tenant observability best practices {date}"
Search the web: "tenant attribution metrics logs traces SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After loading context and identifying pillars, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tenant model implications or tier requirements
- **P (Party Mode)**: Bring SRE and platform architect perspectives on observability scope
- **C (Continue)**: Accept observability foundation and proceed to metrics design
- **[Specific refinements]**: Describe specific context to clarify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant model, tier definitions, dimension catalog
- Process enhanced insights on observability scope
- Ask user: "Accept this detailed context analysis? (y/n)"
- If yes, integrate into foundation document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review observability initialization for tenant-aware design"
- Process SRE and platform architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save observability foundation to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-analyze.md`

---

## Verification

- [ ] Tenant model loaded and implications understood
- [ ] Tier configuration documented
- [ ] Three observability pillars identified
- [ ] Tenant dimension catalog defined
- [ ] Cardinality concerns documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Observability foundation context
- Tenant dimension catalog
- Tier-specific requirements matrix

---

## Next Step

Proceed to `step-02-c-analyze.md` to design metrics collection strategy.
