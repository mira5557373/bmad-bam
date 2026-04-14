# Step 2: Configure SDK Generators

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

Select and configure code generators for each target programming language with appropriate authentication helpers and error handling.

## Prerequisites

- Step 1 completed: OpenAPI analysis
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: sdk-patterns
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: error-handling

---

## Inputs

- Output from Step 1 (OpenAPI analysis)
- Target programming languages
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "openapi-generator vs autorest SDK generation {date}"
Search the web: "SDK authentication wrapper patterns {date}"

_Source: [URL]_

### 1. Select Code Generators

| Language | Generator | Version | Template Customization |
|----------|-----------|---------|------------------------|
| TypeScript | openapi-generator | Latest | axios/fetch client |
| Python | openapi-generator | Latest | httpx async support |
| Go | openapi-generator | Latest | net/http native |
| Java | openapi-generator | Latest | OkHttp/RestTemplate |
| C# | autorest | Latest | HttpClient |

### 2. Configure Authentication Helpers

| Auth Type | Helper Pattern | Token Storage | Refresh Strategy |
|-----------|---------------|---------------|------------------|
| API Key | ApiKeyAuth class | Config/Env | Manual rotation |
| OAuth2 | OAuth2Client class | Secure store | Auto refresh |
| JWT | JwtAuthHandler | Memory/Secure | Pre-expiry refresh |

### 3. Design Error Handling

| Error Category | SDK Behavior | Retry Strategy |
|----------------|--------------|----------------|
| 4xx Client | Throw typed exception | No retry |
| 429 Rate Limit | Throw with retry-after | Exponential backoff |
| 5xx Server | Throw with context | Configurable retry |
| Network | Throw connection error | Circuit breaker |

### 4. Plan Tenant Context Propagation

| Context Element | Injection Point | Configuration |
|-----------------|-----------------|---------------|
| Tenant ID | Request header | Required init param |
| Correlation ID | Request header | Auto-generated |
| User Context | Bearer token | Optional |

---

## Soft Gate Checkpoint

**Steps 1-2 complete the analysis and configuration phase.**

Present summary of:
- Generator selection per language
- Authentication helper design
- Error handling strategy

Ask for confirmation before proceeding to SDK structure design.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the generator configuration above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into generator options and customization
- **P (Party Mode)**: Bring analyst and architect perspectives for generator review
- **C (Continue)**: Accept configuration and proceed to SDK structure design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass configuration context: generators, auth helpers, error handling
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review SDK generator configuration: {summary of generators and auth}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save generator configuration to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-structure.md`

---

## Verification

- [ ] Code generators selected for all target languages
- [ ] Authentication helpers designed per scheme
- [ ] Error handling strategy defined
- [ ] Tenant context propagation planned
- [ ] Patterns align with pattern registry

## Outputs

- Generator configuration document
- Authentication helper specifications
- Error handling strategy

## Next Step

Proceed to `step-03-c-design-structure.md` to design SDK package structure.
