# Step 3: Verify Facade Contracts

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

Validate the module's public facade design and contract compliance.

---

## Prerequisites

- Bounded context validated (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

## Public Facade Validation

### QG-M2: Facade Completeness

- [ ] **Facade class defined**
  - Single public facade per module
  - Clear naming convention: `{ModuleName}Facade`

- [ ] **All methods tenant-scoped**
  - Every public method accepts tenant context
  - No methods that operate across tenants
  - Tenant parameter is first or context object

- [ ] **Method signatures complete**
  - Input parameters documented
  - Return types specified
  - Async/sync behavior declared

### DTO Validation

- [ ] **Input DTOs defined**
  - Each facade method has typed input
  - Validation rules documented
  - Required vs optional fields clear

- [ ] **Output DTOs defined**
  - Return types are DTOs, not entities
  - No entity leakage through facade
  - Pagination patterns followed for lists

### Error Contract Compliance

- [ ] **Error types defined**
  - Module-specific error types documented
  - Errors follow master architecture error contract
  - Error codes are unique within module

- [ ] **Error handling documented**
  - Expected errors listed per method
  - Recovery guidance provided
  - Tenant context preserved in errors

### Master Architecture Alignment

- [ ] **Facade template followed**
  - Structure matches master architecture facade template
  - Required methods implemented (if specified)
  - Naming conventions consistent

## Contract Verification

For each facade method:

```markdown
| Method | Tenant-Scoped | Input DTO | Output DTO | Errors | Status |
|--------|---------------|-----------|------------|--------|--------|
| {name} | YES/NO | {dto} | {dto} | {list} | PASS/FAIL |
```

## Blocking Issues

Flag as BLOCKING if:
- No public facade defined
- Methods not tenant-scoped
- Entity leakage (entities returned instead of DTOs)
- Error contract not followed

**Verify current best practices with web search:**
Search the web: "verify facade contracts best practices {date}"
Search the web: "verify facade contracts enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After verifying facade contracts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific facade methods or contract details
- **P (Party Mode)**: Bring API designer and security architect perspectives on contracts
- **C (Continue)**: Accept facade verification and proceed to isolation validation
- **[Specific refinements]**: Describe areas requiring additional contract review

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: facade definition, DTOs, error contracts, method signatures
- Process enhanced insights on contract design and tenant scoping
- Ask user: "Accept this detailed facade analysis? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade contracts for compliance and security"
- Process API designer and security architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save facade contract validation results to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-validate-isolation.md`

---

## Soft Gate Checkpoint

**Steps 1-3 complete the contract verification phase.**

Present summary of:
- Bounded context validation results
- Facade completeness assessment
- DTO and error contract compliance

Ask for confirmation before proceeding to isolation validation.

---

## Verification

- [ ] Public facade class defined
- [ ] All methods tenant-scoped
- [ ] Input/output DTOs defined
- [ ] Error contract compliance verified
- [ ] Master architecture alignment confirmed
- [ ] Blocking issues documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Facade contract validation results
- Method verification matrix

---

## Next Step

Proceed to `step-04-c-validate-isolation.md` to verify module and tenant isolation.
