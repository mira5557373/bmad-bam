# Step 3: Tenant Isolation Review

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

Perform a detailed security review of tenant isolation mechanisms, evaluating the effectiveness of the chosen tenant model and identifying gaps.

---

## Prerequisites

- Step 2 completed: Threat model with tenant-related threats
- Master architecture with `{tenant_model}` resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Review Tenant Model Security

Evaluate security of the chosen tenant model:

**Row-Level Security (RLS) Review:**

| Check | Status | Finding |
|-------|--------|---------|
| RLS enabled on all tenant tables | Pass/Fail | {details} |
| tenant_id NOT NULL constraint | Pass/Fail | {details} |
| Default deny policy | Pass/Fail | {details} |
| Policy bypass protection | Pass/Fail | {details} |
| Superuser RLS enforcement | Pass/Fail | {details} |

**Schema-per-Tenant Review:**

| Check | Status | Finding |
|-------|--------|---------|
| Schema isolation verified | Pass/Fail | {details} |
| Cross-schema query prevention | Pass/Fail | {details} |
| Schema search_path security | Pass/Fail | {details} |
| Connection pool isolation | Pass/Fail | {details} |

**Database-per-Tenant Review:**

| Check | Status | Finding |
|-------|--------|---------|
| Connection string isolation | Pass/Fail | {details} |
| Credential rotation | Pass/Fail | {details} |
| Network isolation | Pass/Fail | {details} |
| Backup isolation | Pass/Fail | {details} |

### 2. Review Data Access Patterns

Audit data access patterns for isolation leaks:

| Access Pattern | Isolation Check | Risk |
|----------------|-----------------|------|
| Direct queries | tenant_id in WHERE | {risk} |
| Joins | tenant_id propagation | {risk} |
| Aggregations | Cross-tenant aggregation | {risk} |
| Exports | Tenant-scoped exports | {risk} |
| Backups | Tenant-isolated restore | {risk} |

### 3. Review Shared Resources

Identify risks in shared resources:

| Resource | Shared | Isolation Mechanism | Risk |
|----------|--------|---------------------|------|
| Cache (Redis) | Yes/No | Key prefix with tenant_id | {risk} |
| File storage | Yes/No | Path prefix with tenant_id | {risk} |
| Message queues | Yes/No | Tenant-scoped queues | {risk} |
| Search index | Yes/No | Tenant filter | {risk} |
| Logging | Yes/No | Tenant_id in all logs | {risk} |

### 4. Review API Isolation

Verify API-level tenant isolation:

| Check | Status | Finding |
|-------|--------|---------|
| Tenant_id extracted from JWT | Pass/Fail | {details} |
| Tenant_id injected in request context | Pass/Fail | {details} |
| No tenant_id in request parameters | Pass/Fail | {details} |
| Response scoped to tenant | Pass/Fail | {details} |
| Rate limiting per tenant | Pass/Fail | {details} |

### 5. Review Background Job Isolation

Verify tenant isolation in async processing:

| Check | Status | Finding |
|-------|--------|---------|
| Jobs include tenant_id | Pass/Fail | {details} |
| Worker sets tenant context | Pass/Fail | {details} |
| Job results tenant-scoped | Pass/Fail | {details} |
| Failed job cleanup isolated | Pass/Fail | {details} |

---

## Soft Gate Checkpoint

**Steps 1-3 complete the tenant isolation security review.**

Present summary of tenant model security, data access patterns, and shared resource risks. Ask for confirmation before proceeding to AI safety review.

**Verify current best practices with web search:**
Search the web: "tenant isolation review best practices {date}"
Search the web: "tenant isolation review enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant isolation review above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific isolation concerns
- **P (Party Mode)**: Bring DBA and security perspectives on isolation
- **C (Continue)**: Accept tenant isolation review and proceed to AI safety review
- **[Specific refinements]**: Describe isolation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant model security, data access patterns, shared resources
- Process enhanced insights on isolation completeness
- Ask user: "Accept these refined isolation findings? (y/n)"
- If yes, integrate into isolation review
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant isolation security for multi-tenant platform"
- Process DBA and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant isolation review to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-ai-safety-review.md`

---

## Verification

- [ ] Tenant model security reviewed
- [ ] Data access patterns audited
- [ ] Shared resources analyzed
- [ ] API isolation verified
- [ ] Background job isolation verified
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant isolation security report
- Finding list for isolation gaps
- Risk assessment for shared resources

---

## Next Step

Proceed to `step-04-c-ai-safety-review.md` to review AI agent safety.
