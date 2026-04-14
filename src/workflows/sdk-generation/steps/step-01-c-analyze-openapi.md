# Step 1: Analyze OpenAPI Specification

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

Parse and analyze the OpenAPI specification to understand API surface, authentication schemes, and tenant context requirements for SDK generation.

## Prerequisites

- OpenAPI specification file exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: api-versioning

---

## Inputs

- OpenAPI specification file path
- Target programming languages for SDK generation
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "OpenAPI SDK generation best practices {date}"
Search the web: "multi-language SDK code generation tools {date}"

_Source: [URL]_

### 1. Parse OpenAPI Specification

| Analysis Area | Details to Extract |
|---------------|-------------------|
| API Info | Title, version, description, servers |
| Endpoints | Paths, methods, parameters, responses |
| Models | Schemas, required fields, validation |
| Authentication | Security schemes, scopes, flows |

### 2. Catalog API Surface

| Endpoint Category | Count | Tenant Context | Auth Required |
|-------------------|-------|----------------|---------------|
| CRUD Operations | | Yes/No | Yes/No |
| Search/Query | | Yes/No | Yes/No |
| Batch Operations | | Yes/No | Yes/No |
| Admin Operations | | Yes/No | Yes/No |

### 3. Map Authentication Schemes

| Scheme | Type | Implementation Notes |
|--------|------|---------------------|
| API Key | Header/Query | Key rotation support |
| OAuth2 | Authorization Code/Client Credentials | Token refresh |
| JWT | Bearer | Tenant claims extraction |

### 4. Identify Tenant Context Requirements

| Context Element | Source | SDK Handling |
|-----------------|--------|--------------|
| Tenant ID | Header/Path/Token | Auto-inject |
| Tenant Config | Runtime | Lazy load |
| Tenant Tier | Token claims | Feature gating |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the OpenAPI analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into API surface and authentication patterns
- **P (Party Mode)**: Bring analyst and architect perspectives for API review
- **C (Continue)**: Accept OpenAPI analysis and proceed to generator configuration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass analysis context: endpoints, models, authentication schemes
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review OpenAPI specification for SDK generation: {summary of API surface}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save OpenAPI analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-configure-generators.md`

---

## Verification

- [ ] OpenAPI specification parsed successfully
- [ ] All endpoints cataloged with tenant context mapping
- [ ] Authentication schemes identified and documented
- [ ] Tenant context requirements mapped
- [ ] Patterns align with pattern registry

## Outputs

- OpenAPI analysis document
- Endpoint catalog with tenant context
- Authentication scheme mapping

## Next Step

Proceed to `step-02-c-configure-generators.md` to configure SDK generators.
