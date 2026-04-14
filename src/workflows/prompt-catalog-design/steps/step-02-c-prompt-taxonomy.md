# Step 2: Prompt Taxonomy

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

Design a comprehensive prompt classification system that enables effective organization, discovery, and governance of prompts across the multi-tenant platform.

---

## Prerequisites

- Step 1 completed: Catalog requirements defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: prompt-management
- **Web research (if available):** Search for prompt taxonomy patterns

---

## Inputs

- Catalog requirements from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Existing prompt classification standards (if any)

---

## Actions

### 1. Define Category Hierarchy

Establish the primary classification structure:

| Level 1 | Level 2 | Level 3 | Description |
|---------|---------|---------|-------------|
| System | Core | Identity | Agent identity and persona |
| System | Core | Guardrails | Safety and boundary prompts |
| System | Core | Routing | Task routing and dispatch |
| User | Templates | Input | User input templates |
| User | Templates | Output | Response formatting |
| User | Few-Shot | Examples | In-context learning examples |
| Chain | Reasoning | CoT | Chain-of-thought prompts |
| Chain | Reasoning | ReAct | Reasoning + acting prompts |
| Chain | Composition | Synthesis | Multi-step synthesis |

### 2. Define Use Case Classification

Map prompts to business use cases:

| Use Case | Description | Typical Categories |
|----------|-------------|-------------------|
| Customer Support | Handle customer inquiries | Routing, Response, Escalation |
| Content Generation | Create text content | Templates, Formatting, Style |
| Data Analysis | Analyze and summarize data | Extraction, Summary, Insights |
| Code Generation | Write and review code | Templates, Review, Documentation |
| Research | Information gathering | Search, Synthesis, Citation |

### 3. Define Model Compatibility Tagging

Specify how model compatibility is tracked:

| Tag Format | Description | Example |
|------------|-------------|---------|
| Model Family | Broad compatibility | gpt-4, claude-3, llama-3 |
| Model Version | Specific version | gpt-4-turbo-2024-04-09 |
| Capability Tier | Performance level | reasoning, basic, vision |
| Context Window | Size requirements | 4k, 32k, 128k, unlimited |
| Feature Support | Special features | tools, vision, code |

### 4. Define Risk and Compliance Classification

Establish risk categorization:

| Risk Level | Description | Review Requirements |
|------------|-------------|---------------------|
| CRITICAL | PII handling, financial decisions | Legal + Security + AI Ethics |
| HIGH | Customer-facing, automated decisions | Security + AI Ethics |
| MEDIUM | Internal operations, content generation | AI Ethics review |
| LOW | Development, testing, documentation | Standard review |

| Compliance Tag | Regulations | Special Handling |
|----------------|-------------|-----------------|
| PII | GDPR, CCPA | Data minimization, audit trail |
| FINANCIAL | SOX, PCI | Approval workflow, versioning |
| HEALTHCARE | HIPAA | PHI restrictions, access control |
| GENERAL | None specific | Standard governance |

### 5. Define Language and Locale Support

Specify internationalization approach:

| Locale Strategy | Description | Implementation |
|-----------------|-------------|----------------|
| Base Language | Primary prompt language | en-US as default |
| Translations | Localized variants | prompt_id + locale suffix |
| Fallback Chain | Missing locale handling | es-MX -> es -> en-US |
| RTL Support | Right-to-left languages | Layout adaptation markers |

| Locale Field | Format | Example |
|--------------|--------|---------|
| Language Code | ISO 639-1 | en, es, de, fr, ja, zh |
| Region Code | ISO 3166-1 | US, GB, MX, DE, JP, CN |
| Combined | BCP 47 | en-US, es-MX, zh-Hans-CN |

**Verify current best practices with web search:**
Search the web: "LLM prompt classification taxonomy best practices {date}"
Search the web: "AI prompt risk categorization enterprise {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the taxonomy design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into taxonomy edge cases and governance
- **P (Party Mode)**: Bring domain expert and compliance perspectives
- **C (Continue)**: Accept taxonomy and proceed to tenant isolation
- **[Specific refinements]**: Describe taxonomy concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: category hierarchy, risk classification, locale strategy
- Process enhanced insights on taxonomy completeness
- Ask user: "Accept these refined taxonomy decisions? (y/n)"
- If yes, integrate into taxonomy specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review prompt taxonomy for multi-tenant AI platform"
- Process domain expert and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save prompt taxonomy to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-isolation.md`

---

## Verification

- [ ] Category hierarchy complete and consistent
- [ ] Use case classification covers platform needs
- [ ] Model compatibility tagging specified
- [ ] Risk and compliance classification defined
- [ ] Language and locale support documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Prompt taxonomy specification
- Category hierarchy definition
- Risk classification matrix
- Locale support strategy

---

## Next Step

Proceed to `step-03-c-tenant-isolation.md` to design tenant isolation for prompts.
