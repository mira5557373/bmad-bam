# Step 1: Doc Generation Strategy

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

Select documentation generation tools and define the overall structure and workflow for automated API documentation generation.

---

## Prerequisites

- Project context available (optional)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: documentation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: api`

---


## Inputs

- User requirements for documentation
- Existing API structure (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

- Select documentation generation tools:
  | Tool | Use Case | Strengths | Considerations |
  |------|----------|-----------|----------------|
  | Redoc | OpenAPI rendering | Beautiful output, single page | Static only |
  | Swagger UI | Interactive docs | Try-it-out, widespread | Heavier bundle |
  | Stoplight | Full platform | Design + docs | Commercial |
  | Docusaurus | Custom docs site | Flexible, React-based | More setup |
  | Mintlify | Modern docs | Beautiful, AI features | Commercial |
  | ReadMe | Developer portal | Full featured | Commercial |

- Define documentation structure:
  | Section | Content | Automation Level |
  |---------|---------|-----------------|
  | Getting Started | Auth, quickstart | Semi-automated |
  | API Reference | Endpoints, schemas | Fully automated |
  | Guides | Use case tutorials | Manual with templates |
  | SDKs | SDK docs | Auto-generated |
  | Changelog | Version history | CI/CD automated |
  | Examples | Code samples | Semi-automated |

- Design code comment to documentation flow:
  1. Annotate code with doc comments (docstrings, JSDoc)
  2. Extract annotations during build
  3. Generate OpenAPI spec from code
  4. Transform spec to documentation
  5. Publish to static site

- Configure static site generation:
  | Config | Value | Purpose |
  |--------|-------|---------|
  | Build trigger | On merge to main | Production updates |
  | Preview | On PR | Review changes |
  | Hosting | CDN (Cloudflare, Vercel) | Global distribution |
  | Search | Algolia DocSearch | Documentation search |

**Verify current best practices with web search:**
Search the web: "API documentation generation tools comparison {date}"
Search the web: "OpenAPI documentation best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the doc generation strategy above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tool selection and structure decisions
- **P (Party Mode)**: Bring analyst and architect perspectives for strategy review
- **C (Continue)**: Accept doc generation strategy and proceed to OpenAPI integration
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass model context: tool selection, structure, generation flow
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into strategy
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review doc generation strategy: {summary of tools and structure}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save doc generation strategy to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-openapi-integration.md`

---

## Verification

- [ ] Documentation tool selected
- [ ] Documentation structure defined
- [ ] Code-to-docs flow designed
- [ ] Static site configuration complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Tool selection rationale
- Documentation structure specification
- Code-to-docs workflow
- Static site configuration
- **Load template:** `{project-root}/_bmad/bam/data/templates/api-documentation-template.md`

---

## Next Step

Proceed to `step-02-c-openapi-integration.md` to configure OpenAPI spec management.
