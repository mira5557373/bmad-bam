# Step 4: Validate Isolation

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

Verify module isolation, dependency integrity, and tenant boundary enforcement.

---

## Prerequisites

- Facade contracts verified (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,local-dev,tenant-context-propagation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

## Module Isolation Validation

### Dependency Integrity

- [ ] **Consumed facades declared**
  - All external module dependencies listed
  - Version or contract reference provided
  - Purpose of each dependency documented

- [ ] **Consumed events declared**
  - All subscribed events listed
  - Event source module identified
  - Handler responsibility documented

- [ ] **No circular dependencies**
  - Module does not depend on modules that depend on it
  - Dependency graph is acyclic
  - If cycle detected, document resolution strategy

- [ ] **No forbidden imports**
  - No direct access to other modules' internal packages
  - All cross-module access through facades
  - No shared database tables (except shared kernel)

### Tenant Isolation

- [ ] **Data isolation**
  - All queries filter by `tenant_id`
  - No cross-tenant data access possible
  - Tenant context propagated through all layers

- [ ] **Memory isolation** (if AI-enabled)
  - Memory tiers respect tenant boundaries
  - No cross-tenant memory leakage
  - Tenant-specific memory scoped correctly

- [ ] **Event isolation**
  - Published events include `tenant_id`
  - Event consumers filter by tenant
  - No tenant ID in event routing keys (security)

### Published Events Validation

- [ ] **Events defined with schemas**
  - Each published event has payload schema
  - All events include `tenant_id` in payload
  - Event naming follows conventions (past tense)

- [ ] **Publishing rules documented**
  - When each event is published
  - Consistency guarantees (at-least-once, exactly-once)
  - Ordering requirements

## Isolation Verification Matrix

```markdown
| Isolation Type | Check | Status | Finding |
|----------------|-------|--------|---------|
| Module boundaries | No internal imports | PASS/FAIL | {detail} |
| Module boundaries | Facade-only access | PASS/FAIL | {detail} |
| Dependencies | No cycles | PASS/FAIL | {detail} |
| Tenant data | tenant_id filtering | PASS/FAIL | {detail} |
| Tenant memory | Scope isolation | PASS/FAIL | {detail} |
| Events | tenant_id in payload | PASS/FAIL | {detail} |
```

## Blocking Issues

Flag as BLOCKING if:
- Circular dependencies detected
- Internal package imports across modules
- Missing `tenant_id` in events
- Cross-tenant data access possible

**Verify current best practices with web search:**
Search the web: "validate isolation best practices {date}"
Search the web: "validate isolation enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After validating isolation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into dependency graph or tenant isolation specifics
- **P (Party Mode)**: Bring security architect and platform engineer perspectives on isolation
- **C (Continue)**: Accept isolation validation and proceed to quality gates
- **[Specific refinements]**: Describe areas requiring additional isolation analysis

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: dependency graph, tenant isolation rules, event schemas
- Process enhanced insights on isolation boundaries and security
- Ask user: "Accept this detailed isolation analysis? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module and tenant isolation for security compliance"
- Process security architect and platform engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save isolation verification matrix to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-run-quality-gates.md`

---

## Verification

- [ ] Dependencies declared and acyclic
- [ ] No forbidden imports detected
- [ ] Data isolation enforced
- [ ] Memory isolation verified (if AI-enabled)
- [ ] Event isolation confirmed
- [ ] Published events have schemas with tenant_id
- [ ] Blocking issues documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Isolation verification matrix
- Dependency graph analysis

---

## Next Step

Proceed to `step-05-c-run-quality-gates.md` to execute final quality gate checks.
