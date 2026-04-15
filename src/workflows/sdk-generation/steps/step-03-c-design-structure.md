# Step 3: Design SDK Structure

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Design the package structure, client initialization patterns, and documentation approach for each target SDK language.

## Prerequisites

- Step 2 completed: Generator configuration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: package-structure
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: documentation

---

## Inputs

- Output from Steps 1-2 (OpenAPI analysis, generator config)
- Language-specific conventions
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "SDK package structure best practices {date}"
Search the web: "API client initialization patterns {date}"

_Source: [URL]_

### 1. Define Package Structure

| Language | Root Package | Sub-packages | Distribution |
|----------|--------------|--------------|--------------|
| TypeScript | @company/api-sdk | client, models, auth | npm |
| Python | company-api-sdk | client, models, auth | PyPI |
| Go | github.com/company/api-sdk | client, models | Go modules |
| Java | com.company.sdk | client, models, auth | Maven Central |
| C# | Company.Api.Sdk | Client, Models, Auth | NuGet |

### 2. Design Client Initialization

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Builder | Fluent configuration | Complex setup |
| Factory | Pre-configured instances | Common scenarios |
| Singleton | Global client | Simple apps |
| Scoped | Per-request context | Multi-tenant |

### 3. Plan Model Mapping

| OpenAPI Type | Language Mapping | Validation |
|--------------|------------------|------------|
| string | Native string | Length, pattern |
| integer | int/long | Range |
| object | Class/Struct | Required fields |
| array | List/Array | Item validation |
| enum | Enum type | Value validation |

### 4. Create Usage Examples

| Example Category | Coverage |
|------------------|----------|
| Quick Start | Basic client setup and first call |
| Authentication | All auth schemes with examples |
| CRUD Operations | Create, read, update, delete |
| Error Handling | Exception handling patterns |
| Pagination | List operations with paging |
| Tenant Context | Multi-tenant scenarios |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the SDK structure design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into package structure and patterns
- **P (Party Mode)**: Bring analyst and architect perspectives for structure review
- **C (Continue)**: Accept structure design and proceed to SDK generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass structure context: packages, initialization, models, examples
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into structure design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SDK structure design: {summary of packages and patterns}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save structure design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-generate-sdk.md`

---

## Verification

- [ ] Package structure defined for all languages
- [ ] Client initialization patterns selected
- [ ] Model mapping rules documented
- [ ] Usage examples planned
- [ ] Patterns align with pattern registry

## Outputs

- SDK structure specification per language
- Client initialization patterns
- Usage example outline

## Next Step

Proceed to `step-04-c-generate-sdk.md` to execute SDK generation.
