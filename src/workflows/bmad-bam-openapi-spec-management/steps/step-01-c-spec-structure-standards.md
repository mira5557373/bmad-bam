# Step 1: Spec Structure Standards

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

Define OpenAPI specification structure and organization standards for consistent API documentation.

---

## Prerequisites

- Understanding of API requirements
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-design`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---


## Inputs

- User requirements and constraints for OpenAPI specification management
- API versioning requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define OpenAPI specification structure and organization:

## OpenAPI Version Selection

| Version | Features | Recommendation |
|---------|----------|----------------|
| OpenAPI 3.0.x | Stable, wide tooling support | Use for broad compatibility |
| OpenAPI 3.1.x | JSON Schema alignment, webhooks | Use for modern APIs |

## File Organization

```yaml
file_organization:
  strategy: modular  # single-file | modular
  
  modular_structure:
    root: openapi/
    components:
      - openapi/openapi.yaml          # Root spec with $ref
      - openapi/paths/                # Path definitions
      - openapi/components/schemas/   # Schema definitions
      - openapi/components/responses/ # Response definitions
      - openapi/components/parameters/# Parameter definitions
      - openapi/components/security/  # Security schemes
```

## Naming Conventions

```yaml
naming_conventions:
  paths:
    format: kebab-case
    tenant_pattern: /api/v{version}/tenants/{tenant_id}/resources
    
  operations:
    format: camelCase
    pattern: "{verb}{Resource}"  # getUsers, createOrder
    
  schemas:
    format: PascalCase
    request_suffix: Request    # CreateUserRequest
    response_suffix: Response  # UserResponse
    
  parameters:
    format: camelCase
    common:
      - tenant_id
      - page
      - limit
      - sort
```

## Tenant-Aware Patterns

| Pattern | Use Case | Example |
|---------|----------|---------|
| Path tenant_id | Explicit tenant scope | `/tenants/{tenant_id}/users` |
| Header tenant_id | Implicit from auth | `X-Tenant-ID: {tenant_id}` |
| JWT claim | Token-based | `tenant_id` in JWT payload |

## Security Scheme Definitions

```yaml
security_schemes:
  oauth2:
    type: oauth2
    flows:
      authorizationCode:
        authorizationUrl: /oauth/authorize
        tokenUrl: /oauth/token
        scopes:
          read: Read access
          write: Write access
          admin: Admin access
          
  apiKey:
    type: apiKey
    in: header
    name: X-API-Key
    
  bearerAuth:
    type: http
    scheme: bearer
    bearerFormat: JWT
```

## Common Response Schemas

```yaml
common_responses:
  Error:
    type: object
    properties:
      error:
        type: string
      message:
        type: string
      code:
        type: string
      tenant_id:
        type: string
      request_id:
        type: string
        
  PaginatedResponse:
    type: object
    properties:
      data:
        type: array
      meta:
        type: object
        properties:
          total:
            type: integer
          page:
            type: integer
          limit:
            type: integer
```

**Verify current best practices with web search:**
Search the web: "OpenAPI 3.1 best practices {date}"
Search the web: "OpenAPI multi-tenant API design patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the spec structure standards above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into structure requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for structure analysis
- **C (Continue)**: Accept structure standards and proceed to version control workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass structure context: OpenAPI version, organization, naming conventions
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into structure summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review OpenAPI structure standards for specification management: {summary of standards}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save structure standards summary to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-version-control-workflow.md`

---

## Verification

- [ ] OpenAPI version selected
- [ ] File organization defined
- [ ] Naming conventions established
- [ ] Tenant-aware patterns documented
- [ ] Security schemes defined
- [ ] Common responses specified
- [ ] Patterns align with pattern registry

---

## Outputs

- OpenAPI version selection rationale
- File organization structure
- Naming convention guidelines
- Security scheme definitions

---

## Next Step

Proceed to `step-02-c-version-control-workflow.md` to establish version control workflow.
