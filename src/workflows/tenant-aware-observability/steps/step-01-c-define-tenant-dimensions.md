# Step 1: Define Tenant Dimensions

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Define the tenant-related dimensions that must be present in all observability signals.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability,tenant-isolation

---


## Inputs

- User requirements and constraints for tenant aware observability
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define the tenant-related dimensions that must be present in all observability signals:

## Core Tenant Dimensions

| Dimension | Type | Description | Required |
|-----------|------|-------------|----------|
| tenant_id | string | Unique tenant identifier | Always |
| tenant_slug | string | Human-readable tenant identifier | Always |
| tenant_tier | enum | FREE/PRO/ENTERPRISE | Always |
| tenant_region | string | Data residency region | If applicable |
| tenant_status | enum | ACTIVE/SUSPENDED/etc. | Optional |

## Request Context Dimensions

| Dimension | Type | Description | Scope |
|-----------|------|-------------|-------|
| user_id | string | User within tenant | Request |
| session_id | string | User session identifier | Request |
| agent_id | string | Agent handling request | Request |
| conversation_id | string | Conversation identifier | Request |
| request_id | string | Unique request trace ID | Request |

## Resource Attribution Dimensions

| Dimension | Type | Description | Use Case |
|-----------|------|-------------|----------|
| resource_type | string | Type of resource consumed | Billing attribution |
| operation_type | string | Type of operation performed | Cost analysis |
| module_name | string | Platform module name | Resource tracking |

## Dimension Propagation Rules

```yaml
dimension_propagation:
  # Always injected from TenantContext
  auto_inject:
    - tenant_id
    - tenant_slug
    - tenant_tier
    
  # Extracted from request context
  request_extract:
    - user_id (from JWT)
    - session_id (from session cookie/header)
    - request_id (generated or from X-Request-ID)
    
  # Derived from runtime context
  runtime_derive:
    - agent_id (from agent execution context)
    - conversation_id (from conversation state)
```

## Dimension Cardinality Management

High-cardinality dimensions require special handling:

| Dimension | Cardinality | Strategy |
|-----------|-------------|----------|
| tenant_id | Medium (~10K) | Direct use |
| user_id | High (~1M) | Hash for metrics, full for logs |
| request_id | Very High | Logs/traces only, not metrics |
| conversation_id | High | Logs/traces only |

**Rule:** Never use high-cardinality dimensions as metric labels. Use them only in logs and trace attributes.

**Verify current best practices with web search:**
Search the web: "observability tenant dimensions tenant lifecycle {date}"
Search the web: "multi-tenant metrics dimensions multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After defining tenant dimensions, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cardinality management or dimension propagation
- **P (Party Mode)**: Bring SRE and platform architect perspectives on dimension design
- **C (Continue)**: Accept tenant dimensions and proceed to metric aggregation design
- **[Specific refinements]**: Describe additional dimensions to consider

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant dimensions, cardinality analysis, propagation rules
- Process enhanced insights on dimension design
- Ask user: "Accept this detailed dimension analysis? (y/n)"
- If yes, integrate into dimension catalog
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant dimension design for observability"
- Process SRE and platform architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant dimension catalog to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-metric-aggregation.md`

---

## Verification

- [ ] Core tenant dimensions defined
- [ ] Request context dimensions identified
- [ ] Resource attribution dimensions specified
- [ ] Propagation rules established
- [ ] Cardinality managed appropriately
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant dimension catalog
- Propagation rules document

---

## Next Step

Proceed to `step-02-c-design-metric-aggregation.md` to define metric strategy.
