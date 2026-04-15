# Step 2: Tenant Model Decisions

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Establish the foundational tenant model that governs data isolation, context propagation, and lifecycle management across all modules.

---

## Prerequisites

- Discovery complete (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

**Verify current best practices with web search:**
Search the web: "tenant isolation best practices {date}"
Search the web: "tenant isolation multi-tenant SaaS {date}"

Reference web research findings in your analysis.
_Source: [URL]_ for key findings.

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Select Isolation Strategy

Using decision criteria from `tenant-models.csv`:

| Model | When to Use | Complexity |
|-------|-------------|------------|
| Row-Level Security | <1000 tenants, cost-sensitive | Low |
| Schema-per-tenant | Regulated industries, 100-1000 tenants | Medium |
| Database-per-tenant | Enterprise tier, maximum isolation | High |

Document trade-offs and tier mapping.

### 2. Define TenantContext Structure

- Required fields: `tenant_id`, `tenant_slug`, `tier`, `status`
- Optional fields: `settings`, `feature_flags`, `quotas`
- Propagation mechanism (async context, request headers)
- Validation rules for context integrity

### 3. Document Lifecycle States

- **Provisioning**: initial setup, resource allocation
- **Active**: normal operation
- **Suspended**: temporary access restriction
- **Archived**: read-only, reduced storage
- **Deleted**: data purge, resource cleanup

### 4. Create Isolation Matrix

Classify each asset type and specify isolation level:

| Asset Type | Isolation Level | Cross-Tenant Access |
|------------|-----------------|---------------------|
| Data | {shared/pooled/dedicated} | {never/admin-only/explicit-share} |
| Cache | {shared/pooled/dedicated} | {never/admin-only/explicit-share} |
| Logs | {shared/pooled/dedicated} | {never/admin-only/explicit-share} |
| Memory | {shared/pooled/dedicated} | {never/admin-only/explicit-share} |
| Tools | {shared/pooled/dedicated} | {never/admin-only/explicit-share} |
| Jobs | {shared/pooled/dedicated} | {never/admin-only/explicit-share} |
| Vectors | {shared/pooled/dedicated} | {never/admin-only/explicit-share} |
| Analytics | {shared/pooled/dedicated} | {never/admin-only/explicit-share} |

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant model analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into isolation requirements and compliance needs
- **P (Party Mode)**: Bring security architect and platform architect perspectives
- **C (Continue)**: Accept tenant model decisions and proceed to AI runtime
- **[Specific refinements]**: Describe what you'd like to adjust

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant model selection, compliance requirements, scale expectations
- Process enhanced insights on isolation trade-offs
- Ask user: "Accept these refined decisions? (y/n)"
- If yes, integrate into tenant model ADR
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant isolation strategy: {selected model} with {compliance requirements}"
- Process security and platform architecture perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant model decisions to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-ai-runtime-decisions.md`

---

## Verification

- [ ] Isolation strategy selected and documented
- [ ] TenantContext structure defined
- [ ] Lifecycle states documented
- [ ] Isolation matrix completed for all asset types
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant model ADR with isolation strategy selection
- TenantContext interface definition
- Lifecycle state machine diagram
- Isolation matrix spreadsheet
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-isolation-matrix.md`

---

## Next Step

Proceed to `step-03-c-ai-runtime-decisions.md` to establish AI agent orchestration model.
