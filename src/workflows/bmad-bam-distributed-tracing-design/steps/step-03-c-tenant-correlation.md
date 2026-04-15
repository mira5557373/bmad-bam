# Step 3: Tenant Correlation

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

Ensure every trace in the system carries tenant identification, enabling tenant-scoped trace queries, isolation verification, and compliance with multi-tenant observability requirements.

---

## Prerequisites

- Step 2 completed (context propagation defined)
- Tenant model available from `tenant-model-isolation` workflow
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: observability`

---


## Inputs

- Context propagation design from Step 2
- Tenant model and isolation matrix
- Audit logging requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

- Define tenant span attributes:
  | Attribute | Type | Description | Cardinality |
  |-----------|------|-------------|-------------|
  | `tenant.id` | string | Unique tenant identifier | High (unbounded) |
  | `tenant.tier` | string | Subscription tier | Low (FREE/PRO/ENTERPRISE) |
  | `tenant.plan` | string | Plan name | Medium |
  | `tenant.region` | string | Data residency region | Low |

- Design tenant context injection middleware:
  - Extract tenant from JWT claims
  - Add tenant attributes to current span
  - Propagate tenant context to child spans
  - Handle missing tenant context (system/admin operations)

- Create correlation patterns:
  | Log Type | Correlation Field | Trace Link |
  |----------|-------------------|------------|
  | Application logs | `trace_id`, `span_id` | Direct correlation |
  | Audit events | `trace_id`, `tenant_id` | Event-trace link |
  | Security logs | `trace_id`, `actor_id` | Actor-trace link |
  | Error reports | `trace_id` | Error-trace link |

- Define span enrichment:
  - Add tenant tier for sampling decisions
  - Include plan features for debugging
  - Add organization hierarchy for enterprise tenants
  - Mark system vs tenant-initiated operations

- Design tenant-scoped trace queries:
  - Query by `tenant.id` for support investigations
  - Query by `tenant.tier` for tier-specific analysis
  - Cross-tenant queries restricted to admin operations

**Soft Gate:** Steps 1-3 complete the tracing architecture design. Present a summary of OpenTelemetry configuration, propagation patterns, and tenant correlation. Ask for confirmation before proceeding to sampling strategies.

**Verify current best practices with web search:**
Search the web: "multi-tenant distributed tracing correlation {date}"
Search the web: "OpenTelemetry tenant context attributes {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant correlation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tenant attribute cardinality and query patterns
- **P (Party Mode)**: Bring analyst and architect perspectives for correlation review
- **C (Continue)**: Accept tenant correlation and proceed to sampling strategies
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant attributes, correlation patterns, query requirements
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into correlation design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant correlation: {summary of attributes and correlation patterns}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant correlation to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-sampling-strategies.md`

---

## Verification

- [ ] Tenant span attributes defined with cardinality analysis
- [ ] Tenant context injection middleware designed
- [ ] Log-trace correlation patterns documented
- [ ] Span enrichment strategy complete
- [ ] Tenant-scoped query patterns defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant span attribute schema
- Context injection middleware specification
- Correlation pattern documentation
- Span enrichment guidelines
- Query pattern examples

---

## Next Step

Proceed to `step-04-c-sampling-strategies.md` to define tier-based sampling policies.
