# Step 4: Document Contract

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

Create comprehensive contract documentation for implementation and consumption.

## Prerequisites

- Boundaries specified (Step 3)
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
Search the web: "contract documentation API integration patterns {date}"
Search the web: "API documentation contract design {date}"

_Source: [URL]_

Create comprehensive contract documentation:

## Documentation Structure

**Contract Overview:**
```markdown
# Contract: {ContractName}

## Overview
Brief description of the contract's purpose and scope.

## Version
- Current: v1.2.0
- Stability: Stable
- Deprecation: None

## Provider
- Module: {ModuleName}
- Owner: {TeamName}

## Consumers
- {ConsumerModule1}
- {ConsumerModule2}
```

**Method Documentation:**
```markdown
## Methods

### methodName

**Purpose:** Brief description

**Signature:**
\`\`\`typescript
methodName(input: InputType, context: TenantContext): Promise<OutputType>
\`\`\`

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| input | InputType | Yes | ... |
| context | TenantContext | Yes | Tenant context for isolation |

**Returns:** OutputType
- field1: Description
- field2: Description

**Errors:**
| Code | Description | Recovery |
|------|-------------|----------|
| CONTRACT_001 | Description | Retry/fail |

**Example:**
\`\`\`typescript
const result = await contract.methodName(
  { field: value },
  tenantContext
);
\`\`\`
```

## Contract Test Specification

Document required tests:
- Provider tests (unit tests for implementation)
- Consumer tests (mock-based integration tests)
- Contract tests (shared test cases)

## Change History

Maintain changelog:
- Version, date, changes, migration notes

Output: Complete contract documentation file and test specifications.

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

**[A]pprove** - Documentation approved, submit for validation
**[P]ause** - Save progress, review documentation completeness
**[C]oncern** - Discuss documentation structure, examples, or test specifications

Select an option:

---

## Verification

- [ ] Documentation structure complete
- [ ] Method documentation thorough
- [ ] Test specifications defined
- [ ] Change history documented
- [ ] Patterns align with pattern registry

## Outputs

- Complete contract documentation
- Test specifications
- Change history template
- **Load template:** `{project-root}/_bmad/bam/templates/internal-contract-spec.md`

## Next Step

Submit contract for validation via `bmad-bam-validate-internal-contract`.
