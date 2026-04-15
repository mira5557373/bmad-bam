# Step 1: Catalog Requirements

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define the foundational requirements for the prompt catalog, including organizational structure, discovery capabilities, and integration requirements that will guide all subsequent design decisions.

---

## Prerequisites

- Master architecture document loaded
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: prompt-management
- **Web research (if available):** Search for current prompt catalog best practices

---

## Inputs

- User requirements and constraints for prompt catalog
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Organizational Structure

Determine how prompts will be organized within the catalog:

| Structure Element | Description | Example |
|-------------------|-------------|---------|
| Root Collections | Top-level groupings | agents/, workflows/, templates/ |
| Category Hierarchy | Nested organization | agents/customer-support/routing |
| Namespace Convention | Naming standards | {tenant}.{module}.{agent}.{prompt} |
| Virtual Collections | Dynamic groupings | by-model, by-risk-level, recently-updated |

### 2. Define Tenant-Specific Requirements

Capture multi-tenant catalog requirements:

| Requirement | Scope | Description |
|-------------|-------|-------------|
| Tenant Isolation | REQUIRED | Each tenant sees only their prompts + shared |
| Custom Collections | OPTIONAL | Tenant-defined organizational structure |
| Import/Export | OPTIONAL | Bulk prompt migration capabilities |
| Inheritance Model | REQUIRED | How tenant prompts extend platform defaults |

### 3. Design Search and Discovery

Define how users find prompts in the catalog:

| Capability | Implementation | Priority |
|------------|----------------|----------|
| Full-text Search | Prompt content and metadata | HIGH |
| Faceted Filtering | By category, model, status | HIGH |
| Tag-based Discovery | Custom and auto-generated tags | MEDIUM |
| Semantic Search | Embedding-based similarity | LOW |
| Usage Analytics | Popular and effective prompts | MEDIUM |

### 4. Define Metadata Standards

Specify required and optional metadata fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| prompt_id | string | YES | Unique identifier |
| name | string | YES | Human-readable name |
| description | string | YES | Purpose and usage |
| category | enum | YES | Classification category |
| tags | array | YES | Searchable keywords |
| model_compatibility | array | YES | Supported LLM models |
| owner_tenant_id | string | YES | Owning tenant |
| visibility | enum | YES | PUBLIC/TENANT/PRIVATE |
| created_at | timestamp | YES | Creation timestamp |
| updated_at | timestamp | YES | Last modification |
| deprecated | boolean | YES | Deprecation status |

### 5. Identify Integration Points

Map catalog integration with AI runtime:

| Integration | Direction | Purpose |
|-------------|-----------|---------|
| Agent Runtime | Catalog -> Runtime | Prompt resolution at execution |
| Version Control | Bidirectional | Prompt versioning and history |
| Testing Framework | Catalog -> Tests | Automated prompt validation |
| Monitoring | Runtime -> Catalog | Usage and performance feedback |
| Admin Portal | Portal -> Catalog | Management interface |

**Verify current best practices with web search:**
Search the web: "LLM prompt library management best practices {date}"
Search the web: "prompt catalog architecture multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the catalog requirements analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into catalog complexity and edge cases
- **P (Party Mode)**: Bring AI architect and DevOps perspectives on catalog design
- **C (Continue)**: Accept requirements and proceed to prompt taxonomy
- **[Specific refinements]**: Describe catalog concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: organizational structure, metadata standards, integration requirements
- Process enhanced insights on catalog trade-offs
- Ask user: "Accept these refined catalog decisions? (y/n)"
- If yes, integrate into requirements specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review prompt catalog requirements for multi-tenant AI platform"
- Process AI architect and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save catalog requirements to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-prompt-taxonomy.md`

---

## Verification

- [ ] Organizational structure defined
- [ ] Tenant-specific requirements captured
- [ ] Search and discovery capabilities specified
- [ ] Metadata standards documented
- [ ] Integration points identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Prompt catalog requirements specification
- Organizational structure definition
- Metadata schema proposal
- **Load template:** `{project-root}/_bmad/bam/data/templates/prompt-catalog-template.md`

---

## Next Step

Proceed to `step-02-c-prompt-taxonomy.md` to design prompt classification system.
