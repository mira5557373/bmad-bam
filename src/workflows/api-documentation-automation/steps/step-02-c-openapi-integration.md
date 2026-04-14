# Step 2: OpenAPI Integration

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

Configure OpenAPI specification management including source strategy, validation, enrichment, and automated generation from code.

---

## Prerequisites

- Step 1 completed (doc generation strategy defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: openapi`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: api-design`

---


## Inputs

- Doc generation strategy from Step 1
- Existing OpenAPI specs (if available)
- Codebase structure
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

- Define OpenAPI spec source strategy:
  | Approach | Description | Best For |
  |----------|-------------|----------|
  | Code-first | Generate spec from code annotations | Rapid development |
  | Spec-first | Write spec, generate code stubs | API-first design |
  | Hybrid | Manual spec with code-generated sections | Complex APIs |

- Configure spec validation and linting:
  | Tool | Purpose | Integration Point |
  |------|---------|-------------------|
  | Spectral | OpenAPI linting | Pre-commit hook, CI |
  | openapi-spec-validator | Spec validation | Build step |
  | Swagger Editor | Interactive validation | Developer tool |
  | Redocly CLI | Bundling + validation | CI pipeline |

- Design spec enrichment with examples:
  | Enrichment | Source | Automation |
  |------------|--------|------------|
  | Request examples | Test fixtures | Semi-automated |
  | Response examples | Mock data | Automated |
  | Error examples | Error catalog | Automated |
  | Authentication | Auth docs | Manual |
  | Rate limits | Config | Automated |

- Set up automated spec generation from code:
  | Language | Tool | Configuration |
  |----------|------|---------------|
  | Python/FastAPI | FastAPI built-in | Auto-generate |
  | Python/Django | drf-spectacular | Schema generation |
  | Node/Express | swagger-jsdoc | JSDoc annotations |
  | Go | swag | Comment annotations |
  | Java/Spring | springdoc-openapi | Annotation processing |

- Define spec organization:
  | Component | Location | Management |
  |-----------|----------|------------|
  | Main spec | `/api/openapi.yaml` | Git versioned |
  | Components | `/api/components/` | Modular schemas |
  | Examples | `/api/examples/` | Separate files |
  | Bundled | `/docs/api.json` | Build output |

**Verify current best practices with web search:**
Search the web: "OpenAPI specification management best practices {date}"
Search the web: "code-first vs spec-first API development {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the OpenAPI integration design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into spec source strategy and tooling
- **P (Party Mode)**: Bring analyst and architect perspectives for OpenAPI review
- **C (Continue)**: Accept OpenAPI integration and proceed to versioning approach
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: source strategy, validation tools, enrichment approach
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into OpenAPI integration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review OpenAPI integration: {summary of source strategy and tooling}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save OpenAPI integration to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-versioning-approach.md`

---

## Verification

- [ ] Spec source strategy defined (code-first/spec-first/hybrid)
- [ ] Validation and linting tools configured
- [ ] Example enrichment approach documented
- [ ] Code generation tools selected per language
- [ ] Spec organization structure defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Spec source strategy documentation
- Validation tool configuration
- Enrichment workflow
- Code generation setup
- Spec organization guidelines

---

## Next Step

Proceed to `step-03-c-versioning-approach.md` to define versioning and deprecation strategy.
