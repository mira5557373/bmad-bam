# Step 2: Define Contracts

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

Create formal contract definitions for each identified interface between internal components.

## Prerequisites

- Internal interfaces identified (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "internal contract definition API integration patterns {date}"
Search the web: "service contract design {date}"

_Source: [URL]_

### 1. Define Contract Metadata

For each contract, document:

| Field | Description |
|-------|-------------|
| Contract name | Unique identifier |
| Version | Semantic version number |
| Provider | Module/component that implements |
| Consumers | List of consuming modules |
| Stability | stable / beta / deprecated |

### 2. Specify Method Signatures

Using patterns from knowledge fragments:
- Define input types with validation rules
- Define output types with optional field markers
- Ensure TenantContext is required parameter
- Document async behavior (Promise return types)

### 3. Define Data Types

For each contract method:

| Type Category | Requirements |
|---------------|--------------|
| Input schemas | Field names, types, validation rules |
| Output schemas | Required vs optional fields |
| Error types | Error codes, messages, categories |
| Pagination | Cursor/offset patterns if applicable |

### 4. Document Behavior Contracts

For each method:

| Aspect | Specification |
|--------|---------------|
| Pre-conditions | What must be true before call |
| Post-conditions | What will be true after call |
| Invariants | What remains unchanged |
| Side effects | Events emitted, audit logs, etc. |

### 5. Establish Versioning Strategy

Document versioning approach:
- Semantic versioning for breaking changes
- Additive changes within minor versions
- Deprecation timeline for old versions
- Multi-version support requirements

### 6. Create Contract Documentation

For each contract method, include:
- Purpose and use case
- Parameter descriptions
- Return value descriptions
- Error conditions and handling
- Usage examples (reference knowledge)

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

**[A]pprove** - Contract definitions approved, proceed to boundary specification
**[P]ause** - Save progress, review method signatures and data types
**[C]oncern** - Discuss contract structure, versioning, or behavior specifications

Select an option:

---

## Soft Gate Checkpoint

**Steps 1-2 complete the contract definition phase.**

Present summary of:
- Formal contract definitions with metadata
- Method signatures and data type specifications
- Behavior contracts (pre/post conditions, invariants)

Ask for confirmation before proceeding to boundary specification.

---

## Verification

- [ ] All contracts have complete metadata
- [ ] Method signatures follow knowledge patterns
- [ ] Data types fully specified
- [ ] Behavior contracts documented
- [ ] Versioning strategy defined
- [ ] Documentation complete
- [ ] Patterns align with pattern registry

## Outputs

- Formal contract definitions
- Data type specifications
- Behavior contract documentation
- **Load template:** `{project-root}/_bmad/bam/templates/internal-contract-spec.md`
- **Load template:** `{project-root}/_bmad/bam/templates/event-schema-template.md`

## Next Step

Proceed to `step-03-c-specify-boundaries.md` to implement contract providers.
