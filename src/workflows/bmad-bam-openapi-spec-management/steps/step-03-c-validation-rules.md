# Step 3: Validation Rules

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

Create validation pipeline for API specification quality and compliance.

---

## Prerequisites

- Steps 1-2 completed (Structure Standards, Version Control)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-validation`

---


## Inputs

- Structure standards from Step 1
- Version control workflow from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Create validation pipeline for API specifications:

## Structural Validation

```yaml
structural_validation:
  tool: spectral  # or swagger-cli, redocly
  
  checks:
    - OpenAPI schema compliance
    - Valid $ref references
    - Required fields present
    - Valid JSON/YAML syntax
    
  severity: error
```

## Linting Rules

```yaml
linting_rules:
  naming:
    - rule: operation-operationId-camel-case
      severity: warning
    - rule: path-keys-kebab-case
      severity: error
    - rule: schema-names-pascal-case
      severity: warning
      
  descriptions:
    - rule: operation-description
      severity: warning
    - rule: parameter-description
      severity: warning
    - rule: schema-property-description
      severity: info
      
  structure:
    - rule: no-trailing-slash
      severity: error
    - rule: paths-kebab-case
      severity: error
    - rule: no-path-versioning
      severity: warning
```

## Security Validation

```yaml
security_validation:
  rules:
    - rule: operation-security-defined
      message: All operations must have security defined
      severity: error
      
    - rule: servers-https-only
      message: All servers must use HTTPS
      severity: error
      
    - rule: sensitive-data-in-header
      message: No sensitive data in query parameters
      severity: error
      
    - rule: authentication-required
      message: Public endpoints must be explicitly marked
      severity: warning
```

## Tenant Isolation Validation

```yaml
tenant_validation:
  rules:
    - rule: tenant-context-present
      message: Tenant context must be in path, header, or JWT
      check: |
        Every operation handling tenant data must include:
        - Path parameter: tenant_id
        - OR Header: X-Tenant-ID
        - OR Security scheme with tenant claim
      severity: error
      
    - rule: no-cross-tenant-references
      message: Operations must not reference other tenant data
      severity: error
      
    - rule: tenant-scoped-responses
      message: Response schemas should include tenant_id
      severity: warning
```

## Breaking Change Detection

```yaml
breaking_change_detection:
  tool: oasdiff  # or openapi-diff
  
  detect:
    - Removed endpoints
    - Removed parameters
    - Removed response fields
    - Changed parameter types
    - New required parameters
    - Changed authentication
    
  action:
    - Block merge to main
    - Require version bump
    - Generate migration guide
```

## Custom Platform Rules

```yaml
custom_rules:
  pagination:
    - rule: collection-pagination
      message: Collection endpoints must support pagination
      check: GET operations returning arrays have page/limit params
      severity: warning
      
  error_responses:
    - rule: standard-error-format
      message: Error responses must use standard format
      check: 4xx/5xx responses reference ErrorResponse schema
      severity: error
      
  rate_limiting:
    - rule: rate-limit-headers
      message: Document rate limit response headers
      check: 429 responses include Retry-After header
      severity: warning
```

## Validation Pipeline

```yaml
validation_pipeline:
  stages:
    - name: syntax
      tools: [yaml-lint, json-lint]
      
    - name: structure
      tools: [spectral, swagger-cli validate]
      
    - name: lint
      tools: [spectral with custom rules]
      
    - name: security
      tools: [spectral security ruleset]
      
    - name: tenant
      tools: [custom tenant validator]
      
    - name: breaking
      tools: [oasdiff]
      condition: on PR to main
```

**Verify current best practices with web search:**
Search the web: "OpenAPI linting best practices {date}"
Search the web: "API specification validation tools {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the validation rules above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for validation analysis
- **C (Continue)**: Accept validation rules and proceed to publishing pipeline
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: rules, checks, pipeline stages
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API validation rules and pipeline: {summary of validation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation rules to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-publishing-pipeline.md`

---

## Verification

- [ ] Structural validation defined
- [ ] Linting rules established
- [ ] Security validation configured
- [ ] Tenant isolation checks created
- [ ] Breaking change detection set up
- [ ] Custom rules documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation rule configuration
- Spectral ruleset file
- CI/CD validation pipeline config

---

## Next Step

Proceed to `step-04-c-publishing-pipeline.md` to design publishing pipeline.
