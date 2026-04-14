# Step 9: Documentation

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

Create documentation standards for the prompt catalog, including prompt documentation templates, usage guidelines, best practices library, and training materials to ensure consistent and effective prompt management.

---

## Prerequisites

- Step 8 completed: Access control defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: documentation
- **Web research (if available):** Search for AI documentation best practices

---

## Inputs

- Access control design from Step 8
- All previous step outputs
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Prompt Documentation Template

Establish standard documentation structure:

| Section | Description | Required |
|---------|-------------|----------|
| Overview | Purpose and use case | YES |
| Input Schema | Expected input format | YES |
| Output Schema | Response format | YES |
| Variables | Template variables | YES |
| Examples | Input/output examples | YES |
| Constraints | Limitations and edge cases | YES |
| Model Requirements | Supported models | YES |
| Performance | Expected latency/cost | NO |
| Related Prompts | Dependencies/alternatives | NO |

| Documentation Field | Format | Validation |
|--------------------|--------|------------|
| description | Markdown | Min 50 chars |
| examples | JSON array | Min 2 examples |
| schema | JSON Schema | Valid schema |
| tags | String array | 3-10 tags |

### 2. Define Usage Guidelines

Establish guidelines for prompt usage:

| Guideline Category | Content | Audience |
|-------------------|---------|----------|
| When to Use | Appropriate use cases | All users |
| When NOT to Use | Anti-patterns and alternatives | All users |
| Integration Guide | How to integrate with agents | Developers |
| Customization | How to extend/modify | Advanced users |
| Troubleshooting | Common issues and fixes | All users |

| Usage Level | Description | Documentation Depth |
|-------------|-------------|-------------------|
| Basic | Standard invocation | Quick start |
| Intermediate | Variable customization | Full guide |
| Advanced | Chain composition | Reference docs |
| Expert | Extension and modification | API reference |

### 3. Define Best Practices Library

Establish best practices documentation:

| Best Practice Category | Topics | Update Frequency |
|-----------------------|--------|-----------------|
| Prompt Engineering | Structure, context, examples | Quarterly |
| Performance | Token optimization, caching | Quarterly |
| Safety | Guardrails, content filtering | Monthly |
| Testing | Golden datasets, regression | Quarterly |
| Multi-Tenant | Isolation, customization | Quarterly |

| Practice Document | Structure | Maintainer |
|------------------|-----------|------------|
| Design Patterns | Problem/Solution/Example | AI Team |
| Anti-Patterns | Problem/Why Bad/Alternative | AI Team |
| Case Studies | Context/Implementation/Results | Product Team |
| Tutorials | Step-by-step guides | Tech Writers |

### 4. Define Change Log Requirements

Establish change documentation:

| Change Log Field | Description | Required |
|-----------------|-------------|----------|
| version | Semantic version | YES |
| date | Change date | YES |
| author | Change author | YES |
| type | BREAKING/FEATURE/FIX/DOCS | YES |
| description | What changed | YES |
| migration | Migration steps if breaking | If BREAKING |
| related_issues | Linked issues/tickets | NO |

| Change Notification | Audience | Channel |
|--------------------|----------|---------|
| Breaking Changes | All users of prompt | Email + In-app |
| New Features | Interested users | Changelog + Release notes |
| Bug Fixes | Affected users | Changelog |
| Documentation | Subscribers | RSS/Digest |

### 5. Define Training Materials

Establish training documentation:

| Training Type | Format | Audience |
|--------------|--------|----------|
| Onboarding | Interactive tutorial | New users |
| Developer Guide | Reference documentation | Developers |
| Admin Guide | Operations manual | Admins |
| Best Practices | Video + Written | All users |
| Certification | Assessment + Badge | Power users |

| Training Module | Duration | Prerequisites |
|-----------------|----------|---------------|
| Catalog Basics | 30 min | None |
| Prompt Creation | 1 hour | Catalog Basics |
| Testing & QA | 1 hour | Prompt Creation |
| A/B Testing | 45 min | Testing & QA |
| Admin Operations | 2 hours | All above |

**Verify current best practices with web search:**
Search the web: "AI prompt documentation standards enterprise {date}"
Search the web: "LLM prompt engineering training materials {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the documentation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into documentation governance
- **P (Party Mode)**: Bring tech writer and product perspectives
- **C (Continue)**: Accept documentation standards and finalize catalog design
- **[Specific refinements]**: Describe documentation concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: templates, guidelines, training materials
- Process enhanced insights on documentation completeness
- Ask user: "Accept these refined documentation decisions? (y/n)"
- If yes, integrate into documentation specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review documentation standards for prompt catalog"
- Process tech writer and product perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save documentation standards to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Generate final prompt catalog specification
- Mark Create mode complete

---

## Soft Gate Checkpoint

**Steps 1-9 complete the prompt catalog design.**

Present summary of all completed design decisions:

1. **Catalog Requirements**: Organizational structure, metadata standards
2. **Prompt Taxonomy**: Classification hierarchy, risk categorization
3. **Tenant Isolation**: Ownership model, visibility controls
4. **Versioning Strategy**: Semantic versioning, deprecation policy
5. **Testing Framework**: Unit tests, regression, golden datasets
6. **A/B Testing**: Experiment configuration, statistical framework
7. **Performance Tracking**: Metrics, cost attribution, alerting
8. **Access Control**: RBAC, API keys, audit logging
9. **Documentation**: Templates, guidelines, training

Ask for confirmation before generating final output.

---

## Verification

- [ ] Prompt documentation template defined
- [ ] Usage guidelines comprehensive
- [ ] Best practices library structured
- [ ] Change log requirements specified
- [ ] Training materials outlined
- [ ] All 9 steps completed
- [ ] Patterns align with pattern registry

---

## Outputs

- Final prompt catalog specification: `{output_folder}/planning-artifacts/prompt-catalog-spec.md`
- Documentation standards document
- Training curriculum outline
- **Load template:** `{project-root}/_bmad/bam/templates/prompt-catalog-template.md`

---

## Next Step

Create workflow complete. Prompt catalog specification ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode is complete. The prompt catalog specification has been generated.

- Run **Edit mode** to modify specific sections
- Run **Validate mode** to verify against QG-M3 criteria
