# Step 4: Publishing Pipeline

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

Design specification publishing workflow for documentation and SDK generation.

---

## Prerequisites

- Steps 1-3 completed (Structure Standards, Version Control, Validation Rules)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-publishing`

---


## Inputs

- Structure standards from Step 1
- Version control workflow from Step 2
- Validation rules from Step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Design specification publishing workflow:

## Build Pipeline

```yaml
build_pipeline:
  trigger:
    - push to main
    - tag creation
    - manual dispatch
    
  stages:
    - name: validate
      steps:
        - Run structural validation
        - Run linting
        - Run security checks
        
    - name: bundle
      steps:
        - Bundle multi-file specs
        - Resolve $ref references
        - Generate single-file output
        
    - name: transform
      steps:
        - Add version metadata
        - Inject environment URLs
        - Generate version-specific specs
```

## Documentation Generation

```yaml
documentation:
  tools:
    primary: redoc
    alternative: swagger-ui
    
  redoc_config:
    theme:
      colors:
        primary: '#your-brand-color'
      typography:
        fontFamily: 'Inter, sans-serif'
    options:
      hideDownloadButton: false
      expandResponses: '200,201'
      sortPropsAlphabetically: true
      
  output:
    - HTML static site
    - PDF for offline
    - Markdown for wiki
```

## SDK Generation

```yaml
sdk_generation:
  tool: openapi-generator
  
  languages:
    - typescript-fetch
    - python
    - go
    - java
    
  config:
    typescript:
      npmName: '@company/api-client'
      npmVersion: auto  # From spec version
      supportsES6: true
      
    python:
      packageName: company_api
      packageVersion: auto
      
  publishing:
    npm: '@company/api-client'
    pypi: company-api
    maven: com.company:api-client
```

## Multi-Environment Publishing

```yaml
environments:
  development:
    url: https://api.dev.example.com
    auto_deploy: true
    retention: 30 days
    
  staging:
    url: https://api.staging.example.com
    auto_deploy: true
    retention: 90 days
    
  production:
    url: https://api.example.com
    auto_deploy: false  # Manual approval
    retention: forever
    
  deployment:
    strategy: immutable
    versioned_paths: /docs/v{version}/
```

## Version Hosting

```yaml
version_hosting:
  structure:
    latest: /docs/api/
    versioned: /docs/api/v{major}/
    all_versions: /docs/api/versions/
    
  routing:
    default: latest stable
    version_selector: true
    deprecated_banner: true
    
  retention:
    major_versions: 3
    minor_versions: all (within major)
    patch_versions: latest only
```

## API Portal Integration

```yaml
api_portal:
  platform: backstage  # or readme, stoplight, rapidapi
  
  features:
    - Interactive API explorer
    - SDK downloads
    - Authentication setup guide
    - Tenant-specific examples
    - Rate limit display
    - Usage metrics
    
  integration:
    - Sync spec on publish
    - Auto-update changelogs
    - Link to SDK packages
    - Connect to status page
```

## CI/CD Configuration

```yaml
ci_cd:
  github_actions:
    - name: api-spec-publish
      on:
        push:
          branches: [main]
          paths: ['openapi/**']
      jobs:
        validate:
          - Run validation pipeline
        publish:
          - Generate documentation
          - Deploy to hosting
          - Generate SDKs
          - Publish packages
```

**Verify current best practices with web search:**
Search the web: "API documentation publishing pipeline {date}"
Search the web: "OpenAPI SDK generation best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the publishing pipeline above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into publishing requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for pipeline analysis
- **C (Continue)**: Accept publishing pipeline and finalize OpenAPI Spec Management design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass publishing context: documentation, SDKs, environments
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into publishing summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API publishing pipeline design: {summary of pipeline}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save publishing pipeline to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final OpenAPI Spec Management document
- Output to `{output_folder}/planning-artifacts/api/openapi-spec-management.md`

---

## Verification

- [ ] Build pipeline defined
- [ ] Documentation generation configured
- [ ] SDK generation set up
- [ ] Multi-environment publishing planned
- [ ] Version hosting structured
- [ ] API portal integration designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Build pipeline configuration
- Documentation generation config
- SDK generation templates
- Complete OpenAPI Spec Management document
- **Load template:** `{project-root}/_bmad/bam/templates/openapi-management-template.md`

---

## Workflow Complete

The OpenAPI Spec Management design is complete. The output document has been generated at `{output_folder}/planning-artifacts/api/openapi-spec-management.md`.
