# Step 4: Generate SDK Code

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

Execute code generators, add authentication wrappers, implement tenant context helpers, and generate comprehensive SDK documentation.

## Prerequisites

- Steps 1-3 completed: Analysis, configuration, structure design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: code-generation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: documentation

---

## Inputs

- Output from Steps 1-3
- Generator configurations
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "SDK documentation generation tools {date}"
Search the web: "API client testing strategies {date}"

_Source: [URL]_

### 1. Execute Generators

| Language | Generator Command | Output Path |
|----------|-------------------|-------------|
| TypeScript | openapi-generator generate -g typescript-axios | sdk/typescript |
| Python | openapi-generator generate -g python | sdk/python |
| Go | openapi-generator generate -g go | sdk/go |
| Java | openapi-generator generate -g java | sdk/java |
| C# | autorest --csharp | sdk/csharp |

### 2. Add Authentication Wrappers

| Language | Auth Module | Features |
|----------|-------------|----------|
| TypeScript | src/auth/ | ApiKeyAuth, OAuth2Client, JwtHandler |
| Python | auth/ | ApiKeyAuth, OAuth2Client, JwtHandler |
| Go | auth/ | ApiKeyAuth, OAuth2Client, JwtHandler |
| Java | auth/ | ApiKeyAuth, OAuth2Client, JwtHandler |
| C# | Auth/ | ApiKeyAuth, OAuth2Client, JwtHandler |

### 3. Implement Tenant Context Helpers

| Helper | Functionality |
|--------|---------------|
| TenantContextInterceptor | Auto-inject tenant headers |
| TenantScopedClient | Pre-configured per tenant |
| TenantConfigLoader | Load tenant-specific settings |

### 4. Generate Documentation

| Doc Type | Tool | Output |
|----------|------|--------|
| API Reference | TypeDoc/Sphinx/godoc | Auto-generated |
| Quick Start | Manual | Getting started guide |
| Examples | Manual | Code samples |
| Changelog | Generated | Version history |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the SDK generation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into generated SDK review
- **P (Party Mode)**: Bring QA and architect perspectives for SDK validation
- **C (Continue)**: Complete Create mode - workflow finished
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass generation context: output files, auth wrappers, documentation
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, finalize SDK generation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review generated SDK packages: {summary of outputs}"
- Process collaborative analysis from QA and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save SDK generation results
- Create mode complete

---

## Verification

- [ ] SDKs generated for all target languages
- [ ] Authentication wrappers implemented
- [ ] Tenant context helpers added
- [ ] Documentation generated
- [ ] Patterns align with pattern registry

## Outputs

- Generated SDK packages per language
- Authentication module implementations
- Tenant context helpers
- SDK documentation

## Next Step

Workflow complete. Present SDK Generation results with documentation to user for review and approval.
